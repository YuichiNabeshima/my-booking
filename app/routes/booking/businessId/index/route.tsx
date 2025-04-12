import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/route";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";
import { isTime } from "~/utils/guards/isTime";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ILogger } from "~/.server/core/logger/ILogger";
import type { CustomerKind } from "~/types/enums/CustomerKind";
import { Page } from "./components/Page";
import { FORM_NAME } from "./constants/FORM_NAME";
import { INTENT_KIND } from "./constants/INTENT_KIND";
import { STATUS } from "./constants/STATUS";
import { schema } from "./schemas/schema";
import { DIContainer } from "./.server/di_container/DIContainer";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import type { ILoaderService } from "./.server/interfaces/ILoaderService";
import type { IActionService } from "./.server/interfaces/IActionService";
import type { ActionResultDTO } from "./.server/dtos/ActionResultDTO";
import './style.css';

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.business.name} - My Reservation` },
    { name: "description", content: `${data?.business?.description} - My Reservation` },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { businessId } = params;

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const { courses, images, business } = await loaderService.execute({ businessId: Number(businessId) });

    return {
      courses,
      images,
      business,
    };
  } catch (error) {
    logger.error(error as Error);
    return null;
  }
}

export async function action({ request, params }: Route.ActionArgs): Promise<ActionResultDTO> {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema } );

  if (submission.status !== 'success') {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }

  const numberOfGuests = formData.get(FORM_NAME.NUMBER_OF_GUESTS) as string;
  const customerKind   = formData.get(FORM_NAME.CUSTOMER_KIND) as string;
  const courseId       = formData.get(FORM_NAME.COURSE) as string;
  const date           = formData.get(FORM_NAME.DATE) as string;
  const time           = formData.get(FORM_NAME.SCHEDULE) as string;
  const intent         = formData.get(FORM_NAME.INTENT) as string;

  if (!isTime(time)) {
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }

  if (intent === INTENT_KIND.CONFIRM) {
    return {
      status: STATUS.CONFIRMED,
      lastResult: submission.reply(),
      bookingDetails: {
        numberOfGuests: Number(numberOfGuests),
        customerKind: customerKind === CUSTOMER_KIND.SINGLE ? CUSTOMER_KIND.SINGLE : CUSTOMER_KIND.GROUP as CustomerKind,
        courseId: Number(courseId),
        date: new Date(date),
        time,
      },
    };
  }

  const fullName = formData.get(FORM_NAME.FULL_NAME) as string;
  const email    = formData.get(FORM_NAME.EMAIL) as string;

  const url = request.url;
  const businessId = params.businessId;

  const diContainer = new DIContainer();
  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);
  const logger = container.get<ILogger>(GLOBAL_DI_TYPES.Logger);

  try {
    const { mail } = await actionService.execute({
      numberOfGuests: Number(numberOfGuests),
      customerKind: customerKind === CUSTOMER_KIND.SINGLE ? CUSTOMER_KIND.SINGLE : CUSTOMER_KIND.GROUP as CustomerKind,
      courseId: Number(courseId),
      date: new Date(date),
      time,
      fullName,
      email,
      businessId: Number(businessId),
      url,
    });

    return {
      status: STATUS.FINISHED,
      mail: mail,
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
