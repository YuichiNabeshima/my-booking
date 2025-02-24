import { z } from "zod";
import { BOOKING_TYPE } from "~/config/enums/bookingType";
import { INTENT_TYPE } from "./const";
import { FORM_NAME } from "./const";

export const scheduleSchema = z
  .object({
    [FORM_NAME.NUMBER_OF_GUESTS]: z
      .number()
      .max(4)
      ,
    [FORM_NAME.TYPE]: z
      .enum([BOOKING_TYPE.SINGLE, BOOKING_TYPE.GROUP])
      ,
    [FORM_NAME.COURSE]: z
      .number(),
    [FORM_NAME.DATE]: z
      .string()
      ,
    [FORM_NAME.SCHEDULE]: z
      .string()
      ,
    [FORM_NAME.INTENT]: z
      .enum([INTENT_TYPE.CONFIRM, INTENT_TYPE.FINISH])
      ,
  })
  ;
