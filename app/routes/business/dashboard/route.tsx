import { redirect } from 'react-router';

import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { DIContainer } from './.server/di_container/DIContainer';
import type { LoaderResultDTO } from './.server/dtos/LoaderResultDTO';
import type { ILoaderService } from './.server/interfaces/ILoaderService';
import type { Route } from './+types/route';
import { Page } from './components/Page';
import { STATUS } from './constants/STATUS';
import { isValidDatesArray } from './utils/guards/isValidDatesArray';

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderResultDTO> {
  const url = new URL(request.url);
  const datesParam = url.searchParams.getAll('dates');
  const datesArray = datesParam.map((date) => new Date(date));

  const cookie = request.headers.get('cookie');

  if (!cookie) {
    throw redirect('/business/login');
  }

  const dates = isValidDatesArray(datesArray) ? datesArray : ([new Date()] as [Date]);

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const { businessName, bookings, stats, businessHours } = await loaderService.execute({
      cookie,
      dates,
    });

    return {
      status: STATUS.SUCCESS,
      businessName,
      stats,
      bookings,
      businessHours,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: STATUS.FAILED,
      };
    }

    throw new Response('Internal Server Error', { status: 500 });
  }
}

export default function Route() {
  return <Page />;
}
