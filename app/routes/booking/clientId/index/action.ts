import { parseWithZod } from "@conform-to/zod";
import type { Route } from "./+types/route";
import { scheduleSchema } from "./config/schema";
import { FORM_NAME, INTENT_TYPE } from "./config/const";
import { ensureString } from "~/utils/ensureString";
import { BOOKING_TYPE, type BookingType } from "~/config/enums/bookingType";

export async function _action({ request, params }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: scheduleSchema } );

  if (submission.status !== 'success') {
    return {
      status: 'is-error',
      lastResult: submission.reply(),
    };
  }

  const numberOfGuests = ensureString(formData.get(FORM_NAME.NUMBER_OF_GUESTS));
  const type           = ensureString(formData.get(FORM_NAME.TYPE));
  const course         = ensureString(formData.get(FORM_NAME.COURSE));
  const date           = ensureString(formData.get(FORM_NAME.DATE));
  const schedule       = ensureString(formData.get(FORM_NAME.SCHEDULE));
  const intent         = ensureString(formData.get(FORM_NAME.INTENT));

  if (intent === INTENT_TYPE.CONFIRM) {
    return {
      status: 'is-confirm',
      lastResult: submission.reply(),
      bookingDetails: {
        numberOfGuests: Number(numberOfGuests),
        type: type === BOOKING_TYPE.SINGLE ? BOOKING_TYPE.SINGLE : BOOKING_TYPE.GROUP as BookingType,
        course,
        date: new Date(date),
        schedule,
      },
    };
  }

  const url = request.url;
  const clientId = params.clientId;
  const token = 'dummy_token';

  return {
    status: 'is-finish',
    lastResult: submission.reply(),
    mail: {
      subject: 'Mail title',
      body: `Please confirm your booking from a link below.
      URL:
      ${url}/booking/${clientId}/confirm?token=${token}
      `,
    }
  };
}