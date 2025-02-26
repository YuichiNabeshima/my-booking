import { redirect } from "react-router";
import type { Route } from "./+types/route";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/DIContainer";
import type { IActionService } from "./.server/interfaces/IActionService";
import { CustomBaseError } from "~/.server/core/errors/custom_base_error";
import { parseWithZod } from "@conform-to/zod";
import { schema } from "./config/schema/schema";
import { STATUS } from "./constants/STATUS";
import type { IAuthRedirectService } from "~/.server/services/auth/auth_redirect_service/IAuthRedirectService";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  const container = diContainer.getContainer();
  const authRedirectService = container.get<IAuthRedirectService>(GLOBAL_DI_TYPES.AuthRedirectService);

  try {
    const { status } = await authRedirectService.execute({ cookie });

    if (status === STATUS.AUTHENTICATED) {
      return redirect('/business/dashboard/');
    }
  } catch (error) {
    return {
      status: STATUS.FAILED,
    }
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const { cookie } = await actionService.execute({ email, password });

    return redirect('/business/dashboard', {
      headers: {
        'Set-Cookie': cookie,
      },
    });

  } catch (error) {
    if (error instanceof CustomBaseError) {
      return {
        status: STATUS.FAILED,
        lastResult: submission.reply(),
      };
    }

    throw new Response("Internal Server Error", { status: 500 });
  }
}

export default function Route() {
  return <Page />;
}