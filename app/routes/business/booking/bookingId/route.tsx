import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import { isBookingStatus } from '~/utils/guards/isBookingStatus';

import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { DIContainer } from './.server/di_container/DIContainer';
import type { IActionService } from './.server/interfaces/IActionService';
import type { ILoaderService } from './.server/interfaces/ILoaderService';
import type { Route } from './+types/route';
import { Page } from './components/Page';

export async function loader({ params }: Route.LoaderArgs) {
  const bookingId = Number(params.bookingId);

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const data = await loaderService.execute({ bookingId });
    return data;
  } catch (error) {
    logger.error(error as Error);
    return null;
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  const bookingId = Number(params.bookingId);
  const formData = await request.formData();
  const status = formData.get('status') as string;

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  if (!isBookingStatus(status)) {
    return null;
  }

  try {
    const data = await actionService.execute({ bookingId, status });
    return data;
  } catch (error) {
    logger.error(error as Error);
    return null;
  }
}

export default function Route() {
  return <Page />;
}
