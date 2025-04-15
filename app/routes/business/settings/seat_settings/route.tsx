import './components/seat_table/seat-table.css';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'react-router';

import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { DIContainer } from './.server/di_container/DIContainer';
import type { LoaderDTO } from './.server/dtos/LoaderDTO';
import type { IActionService } from './.server/interfaces/IActionService';
import type { ILoaderService } from './.server/interfaces/ILoaderService';
import type { Route } from './+types/route';
import { Page } from './components/Page';
import { STATUS } from './constants/STATUS';
import { schema } from './schemas/schema';
import type { BookingLimit } from './types/BookingLimit';

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderDTO> {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const data = await loaderService.execute({ cookie });

    if (!data) {
      return redirect('/business/login');
    }

    return {
      status: STATUS.SUCCESS,
      bookingLimit: data,
    };
  } catch (error) {
    logger.error(error as Error);
    return redirect('/business/login');
  }
}

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

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const result = await actionService.execute({
      cookie,
      bookingLimit: submission.value as unknown as BookingLimit,
    });

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
    logger.error(error as Error);
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }
}

export default function Layout() {
  return <Page />;
}
