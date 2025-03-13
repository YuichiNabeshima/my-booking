import { AVAILABILITY_PARAMS } from "~/constants/AVAILABLITY_PARAMS";
import type { Route } from "../index/+types/route";
import { STATUS } from "~/constants/STATUS";
import { diContainer } from "./.server/di_container/DIContainer";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import { isCustomerKind } from "~/utils/guards/isCustomerKind";
import { CustomBaseError } from "~/.server/core/errors/custom_base_error";
import type { LoaderServiceResultDTO } from "./.server/dtos/LoaderServiceDTO";

const IS_FAILED = {
  status: STATUS.FAILED,
};

export type Availability = LoaderServiceResultDTO;

export async function loader({ request, params }: Route.LoaderArgs) {
  const { businessId } = params;
  const url = new URL(request.url);
  const customerKind = url.searchParams.get(AVAILABILITY_PARAMS.CUSTOMER_KIND);
  const courseId = url.searchParams.get(AVAILABILITY_PARAMS.COURSE_ID);
  const dateStr = url.searchParams.get(AVAILABILITY_PARAMS.DATE);

  if (!customerKind || !courseId || !dateStr) return IS_FAILED;

  if (!isCustomerKind(customerKind)) return IS_FAILED;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return IS_FAILED;

  const businessIdNum = Number(businessId);
  const courseIdNum = Number(courseId);

  if (isNaN(businessIdNum)) return IS_FAILED;

  if (isNaN(courseIdNum)) return IS_FAILED;


  diContainer.bindMockRepository();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const data = await loaderService.execute({
      businessId: businessIdNum ,
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