import { redirect } from "react-router";
import type { Route } from "./+types/route";
import { Page } from "./components/Page";
import { parseWithZod } from "@conform-to/zod";
import { schema } from "./schemas/schema";
import { STATUS } from "./constants/STATUS";
import { DIContainer } from "./.server/di_container/DIContainer";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import type { IActionService } from "./.server/interfaces/IActionService";
import { InvalidAuthError } from "~/.server/custom_errors/InvalidAuthError";

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const { images } = await loaderService.execute({ cookie });

    if (!images.length) {
      return null;
    }

    return {
      images
    };
  } catch (error) {
    return null;
  }
}

export async function action({ request }: Route.ActionArgs ) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const formData = await request.clone().formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);
  const images = submission.value.images.map(image => ({ id: image.id, caption: image.caption, file: image.file }));

  try {
    const result = await actionService.execute({ cookie, images });
  } catch (error) {
    if (error instanceof InvalidAuthError) {
      return redirect('/business/login');
    }
    console.log(error);

    return {
      status: STATUS.FAILED,
    };
  }
}

export default function Component() {
  return <Page />;
}
