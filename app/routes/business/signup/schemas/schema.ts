import { z } from "zod";
import { FORM_NAME } from "../constants/FORM_NAME";

export const schema = z 
  .object({
    [FORM_NAME.NAME]: z
      .string()
      ,
    [FORM_NAME.EMAIL]: z
      .string()
      .email()
      ,
    [FORM_NAME.PASSWORD]: z
      .string()
      ,
    [FORM_NAME.PASSWORD_CONFIRM]: z
      .string()
      ,
  })
  .refine(val => val[FORM_NAME.PASSWORD] === val[FORM_NAME.PASSWORD_CONFIRM], {
    message: 'Password do not match.',
    path: [FORM_NAME.PASSWORD_CONFIRM],
  })
  ;