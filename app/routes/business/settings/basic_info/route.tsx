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

  const name = submission.value[FORM_NAME.NAME];
  const email = submission.value[FORM_NAME.EMAIL];
  const capacity_of_group = submission.value[FORM_NAME.CAPACITY_OF_GROUP];
  const cuisine_kind = submission.value[FORM_NAME.CUISINE_KIND];
  const price_level = submission.value[FORM_NAME.PRICE_LEVEL];
  const neighborhood = submission.value[FORM_NAME.NEIGHBORHOOD];
  const zip_code = submission.value[FORM_NAME.ZIP_CODE];
  const address = submission.value[FORM_NAME.ADDRESS];
  const tel = submission.value[FORM_NAME.TEL];
  const total_seats = submission.value[FORM_NAME.TOTAL_SEATS];
  const payment_method = submission.value[FORM_NAME.PAYMENT_METHOD];
  const parking = submission.value[FORM_NAME.PARKING];
  const description = submission.value[FORM_NAME.DESCRIPTION];
  const business_hours_note = submission.value[FORM_NAME.BUSINESS_HOURS_NOTE];
  const is_published = submission.value[FORM_NAME.IS_PUBLISHED];

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
      is_published,
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
