import { redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/route";
import { Page } from "./components/Page";
import { schema } from "./schemas/schema";
import { diContainer } from "./.server/di_container/DIContainer";
import { DI_TYPES } from "./.server/di_container/ID_TYPES";
import type { IActionService } from "./.server/interfaces/IActionService";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { STATUS as AUTH_STATUS } from "~/.server/core/auth/constants/STATUS";
import { STATUS } from "./constants/STATUS";
import type { IAuthStateChecker } from "~/.server/core/auth/IAuthStateChecker";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  const container = diContainer.getContainer();
  const authStateChecker = container.get<IAuthStateChecker>(GLOBAL_DI_TYPES.AuthStateChecker);

  try {
    const { status } = await authStateChecker.execute({ cookie });

    if (status === AUTH_STATUS.AUTHENTICATED) {
      return redirect('/business/dashboard');
    }
  } catch (error) {
    console.log(error);
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

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const result = await actionService.handleAction({ name, email, password });

    return redirect('/business/dashboard', {
      headers: {
        'Set-Cookie': result.cookie,
      },
    })

  } catch(error) {
    return {
      status: STATUS.FAILED,
    };
  }
}

export default function Route() {
  return <Page />;
}