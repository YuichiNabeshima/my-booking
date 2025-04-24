import jwt from 'jsonwebtoken';

import type { Time } from '~/types/Time';
import type { CreateBookingConfirmationDataTokenPayload } from '~/utils/createBookingConfirmationDataToken.server';

import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { DIContainer } from './.server/di_container/DIContainer';
import type { IActionService } from './.server/interfaces/IActionService';
import type { ILoaderService } from './.server/interfaces/ILoaderService';
import type { Route } from './+types/route';
import { Page } from './components/Page';
import { STATUS } from './constants/STATUS';

export async function loader({ request, params }: Route.LoaderArgs) {
  const businessUuid = params.businessUuid;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return {
      status: STATUS.FAILED,
    };
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const data = await loaderService.execute({ businessUuid, token });

    return {
      status: STATUS.SUCCESS,
      data,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        status: STATUS.TOKEN_EXPIRED,
      };
    }

    return {
      status: STATUS.FAILED,
    };
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  const businessUuid = params.businessUuid;
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return {
      status: STATUS.FAILED,
    };
  }

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const { guests, kind, course, date, time, name, email } = jwt.verify(
      token,
      process.env.TOKEN_KEY as string,
    ) as CreateBookingConfirmationDataTokenPayload;

    const result = await actionService.execute({
      fullName: name,
      email,
      businessUuid,
      date,
      time: time as Time,
      courseId: course,
      customerKind: kind,
      numberOfguests: Number(guests),
    });

    return result;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        status: STATUS.TOKEN_EXPIRED,
      };
    }

    return {
      status: STATUS.FAILED,
    };
  }
}

export default function Route() {
  return <Page />;
}
