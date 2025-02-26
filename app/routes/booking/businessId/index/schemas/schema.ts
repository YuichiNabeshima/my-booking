import { z } from "zod";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";
import { INTENT_KIND } from "../constants/INTENT_KIND";
import { FORM_NAME } from "../constants/FORM_NAME";

export const scheduleSchema = z
  .object({
    [FORM_NAME.NUMBER_OF_GUESTS]: z
      .number()
      .max(4)
      ,
    [FORM_NAME.CUSTOMER_KIND]: z
      .enum([CUSTOMER_KIND.SINGLE, CUSTOMER_KIND.GROUP])
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
      .enum([INTENT_KIND.CONFIRM, INTENT_KIND.FINISH])
      ,
  })
  ;
