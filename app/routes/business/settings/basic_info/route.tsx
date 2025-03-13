import { redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/route";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/DIContainer";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import { STATUS } from "./constants/STATUS";
import type { LoaderDTO } from "./.server/dtos/LoaderDTO";
import { schema } from "./schemas/schema";
import type { IActionService } from "./.server/interfaces/IActionService";
import { FORM_NAME } from "./constants/FORM_NAME";

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderDTO> {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const data = await loaderService.execute({ cookie });

    return {
      status: STATUS.SUCCESS,
      ...data
    };
  } catch (error) {
    return {
      status: STATUS.FAILED,
    };
  }
}

/**
 * Action function
 */
export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }

  const name = formData.get(FORM_NAME.NAME) as string;
  const email = formData.get(FORM_NAME.EMAIL) as string;

  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const result = await actionService.execute({ cookie, name, email});

    if (!result) {
      return {
        status: STATUS.NO_DIFERRENCE,
        lastResult: submission.reply(),
      };
    }

    return {
      status: STATUS.SUCCESS,
      result,
    };

  } catch (error) {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }
}

export default function Route() {
  return <Page />;
}