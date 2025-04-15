import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'react-router';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { DIContainer } from './.server/di_container/DIContainer';
import type { IActionService } from './.server/interfaces/IActionService';
import type { ILoaderService } from './.server/interfaces/ILoaderService';
import type { Route } from './+types/route';
import { Page } from './components/Page';
import { STATUS } from './constants/STATUS';
import { schema } from './schemas/schema';

export async function loader({ request }: Route.LoaderArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const { images } = await loaderService.execute({ cookie });

    if (!images.length) {
      return null;
    }

    return {
      images,
    };
  } catch (error) {
    logger.error(error as Error);
    return null;
  }
}

export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const formData = await request.clone().formData();
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
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  const images = submission.value.images.map((image) => ({
    id: image.id,
    caption: image.caption,
    isMv: image.is_mv === 'true',
    isGallery: image.is_gallery === 'true',
    file: image.file,
  }));

  try {
    await actionService.execute({ cookie, images });
  } catch (error) {
    logger.error(error as Error);
    if (error instanceof InvalidAuthError) {
      throw redirect('/business/login');
    }

    return {
      status: STATUS.FAILED,
    };
  }
}

export default function Component() {
  return <Page />;
}
