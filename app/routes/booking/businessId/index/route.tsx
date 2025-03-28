import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/route";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";
import type { CustomerKind } from "~/types/CustomerKind";
import { isTime } from "~/utils/guards/isTime";
import { Page } from "./components/Page";
import { scheduleSchema } from "./schemas/schema";
import { FORM_NAME } from "./constants/FORM_NAME";
import { INTENT_KIND } from "./constants/INTENT_KIND";
import { STATUS } from "./constants/STATUS";
import { diContainer } from "./.server/di_container/DIContainer";
import { DI_TYPES } from "./.server/di_container/DI_TYPES";
import type { IActionService } from "./.server/interfaces/IActionService";
import type { ActionResultDTO } from "./.server/dtos/ActionResultDTO";
import './style.css';
import type { ILoaderService } from "./.server/interfaces/ILoaderService";
import { CustomBaseError } from "~/.server/core/errors/custom_base_error";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Booking detail" },
    { name: "description", content: "" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const { businessId } = params;

  // diContainer.bindMock();
  const container = diContainer.getContainer();
  const loaderService = container.get<ILoaderService>(DI_TYPES.LoaderService);

  try {
    const { courses, images } = await loaderService.execute({ businessId: Number(businessId) });

    return {
      status: STATUS.SUCCESS,
      courses,
      images,
    };
  } catch (error) {
    if (error instanceof CustomBaseError || error instanceof Error) {
      return {
        status: STATUS.FAILED,
      };
    }
  }
}

export async function action({ request, params }: Route.ActionArgs): Promise<ActionResultDTO> {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: scheduleSchema } );

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

  const container = diContainer.getContainer();
  const actionService = container.get<IActionService>(DI_TYPES.ActionService);

  try {
    const { mail } = await actionService.handleAction({
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
    return {
      status: STATUS.FAILED,
      lastResult: submission.reply(),
    };
  }
}

export default function Route() {
  return <Page />;
}
