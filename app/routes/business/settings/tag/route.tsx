import { redirect } from "react-router";
import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/route";
import { Page } from "./components/Page";
import { DIContainer } from "./.server/di_container/DIContainer";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import { STATUS } from "./constants/STATUS";
import type { LoaderDTO } from "./.server/dtos/LoaderDTO";
import { schema } from "./schemas/schema";
import type { IActionService } from "./.server/interfaces/IActionService";
import { CookieNotFoundError } from "~/.server/core/custom_error/errors/CookieNotFoundError";

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderDTO> {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    throw redirect('/business/login');
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const data = await loaderService.execute({ cookie });

    return {
      status: STATUS.SUCCESS,
      ...data
    };
  } catch (error) {
    return null;
  }
}

/**
 * action 
 */
export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    throw new CookieNotFoundError('Cookie not found.');
  }

  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const result = await actionService.execute({ cookie, tags: submission.value.tags })

    if (!result) {
      return {
        status: STATUS.NO_DIFFERENCE,
        lastResult: submission.reply(),
      };
    }

    return {
      status: STATUS.SUCCESS,
    };
  } catch (error) {
    console.error(error);
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }
}

export default function Route() {
  return <Page />;
}