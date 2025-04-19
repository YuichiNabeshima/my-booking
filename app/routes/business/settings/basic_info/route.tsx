import { parseWithZod } from '@conform-to/zod';
import { redirect } from 'react-router';

import type { ILogger } from '~/.server/core/logger/ILogger';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { diContainer } from './.server/di_container/DIContainer';
import type { LoaderDTO } from './.server/dtos/LoaderDTO';
import type { IActionService } from './.server/interfaces/IActionService';
import type { ILoaderService } from './.server/interfaces/ILoaderService';
import type { Route } from './+types/route';
import { Page } from './components/Page';
import { FORM_NAME } from './constants/FORM_NAME';
import { STATUS } from './constants/STATUS';
import { schema } from './schemas/schema';

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderDTO> {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    throw redirect('/business/login');
  }

  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const data = await loaderService.execute({ cookie });
    return data;
  } catch (error) {
    logger.error(error as Error);
    return null;
  }
}

export async function action({ request }: Route.ActionArgs) {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    throw redirect('/business/login');
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
  const capacity_of_group = formData.get(FORM_NAME.CAPACITY_OF_GROUP) as string;
  const cuisine_kind = formData.get(FORM_NAME.CUISINE_KIND) as string;
  const price_level = formData.get(FORM_NAME.PRICE_LEVEL) as string;
  const neighborhood = formData.get(FORM_NAME.NEIGHBORHOOD) as string;
  const zip_code = formData.get(FORM_NAME.ZIP_CODE) as string;
  const address = formData.get(FORM_NAME.ADDRESS) as string;
  const tel = formData.get(FORM_NAME.TEL) as string;
  const total_seats = formData.get(FORM_NAME.TOTAL_SEATS) as string;
  const payment_method = formData.get(FORM_NAME.PAYMENT_METHOD) as string;
  const parking = formData.get(FORM_NAME.PARKING) as string;
  const description = formData.get(FORM_NAME.DESCRIPTION) as string;
  const business_hours_note = formData.get(FORM_NAME.BUSINESS_HOURS_NOTE) as string;

  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const result = await actionService.execute({
      cookie,
      name,
      email,
      capacity_of_group,
      cuisine_kind,
      price_level,
      neighborhood,
      zip_code,
      address,
      tel,
      total_seats,
      payment_method,
      parking,
      description,
      business_hours_note,
    });

    if (!result) {
      return {
        status: STATUS.NO_DIFFERENCE,
        lastResult: submission.reply(),
      };
    }

    return {
      status: STATUS.SUCCESS,
      result,
    };
  } catch (error) {
    logger.error(error as Error);
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }
}

export default function Route() {
  return <Page />;
}
