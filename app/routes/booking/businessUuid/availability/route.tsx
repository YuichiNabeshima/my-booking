import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';
import { AVAILABILITY_PARAMS } from '~/constants/AVAILABLITY_PARAMS';
import { STATUS } from '~/constants/STATUS';
import { isCustomerKind } from '~/utils/guards/isCustomerKind';

import type { Route } from '../index/+types/route';
import { DI_TYPES } from './.server/di_container/DI_TYPES';
import { DIContainer } from './.server/di_container/DIContainer';
import type { LoaderServiceResultDTO } from './.server/dtos/LoaderServiceDTO';
import type { ILoaderService } from './.server/interfaces/ILoaderService';

const IS_FAILED = {
  status: STATUS.FAILED,
};

export type Availability = LoaderServiceResultDTO;

export async function loader({ request, params }: Route.LoaderArgs) {
  const { businessUuid } = params;
  const url = new URL(request.url);
  const customerKind = url.searchParams.get(AVAILABILITY_PARAMS.CUSTOMER_KIND);
  const courseId = url.searchParams.get(AVAILABILITY_PARAMS.COURSE_ID);
  const dateStr = url.searchParams.get(AVAILABILITY_PARAMS.DATE);

  if (!customerKind || !courseId || !dateStr) return IS_FAILED;

  if (!isCustomerKind(customerKind)) return IS_FAILED;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return IS_FAILED;

  const courseIdNum = Number(courseId);

  if (isNaN(courseIdNum)) return IS_FAILED;

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const data = await loaderService.execute({
      businessUuid,
      customerKind,
      courseId: courseIdNum,
      date,
    });
    return data;
  } catch (error) {
    if (error instanceof CustomBaseError) {
      return {
        status: STATUS.FAILED,
        message: error.message,
      };
    }
  }
}
