import type { Route } from "./+types/route";
import type { LoaderResultDTO } from "./.server/dtos/LoaderResultDTO";
import { Page } from "./components/Page";
import { diContainer } from "./.server/di_container/DIContainer";
import { STATUS } from "./constants/STATUS";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";
import { isValidDatesArray } from "./utils/guards/isValidDatesArray";
import { redirect } from "react-router";

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderResultDTO> {
  const url = new URL(request.url);
  const datesParam = url.searchParams.getAll('dates');
  const datesArray = datesParam.map(date => new Date(date));

  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return redirect('/business/login');
  }

  const dates = isValidDatesArray(datesArray) ? datesArray : [new Date()] as [Date];

  diContainer.bindMock();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const { bookings } = await loaderService.execute({ cookie, dates });

    return {
      status: STATUS.SUCCESS,
      bookings,
    };

  } catch (error) {
    if (error instanceof Error) {
      return {
        status: STATUS.FAILED,
      }
    }

    throw new Response('Internal Server Error', { status: 500 });
  }
}

export default function Route() {
  return <Page />;
}