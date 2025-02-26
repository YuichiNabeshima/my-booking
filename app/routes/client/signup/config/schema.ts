import { z } from "zod";
import { SIGNUP_FORM } from "./const";


export const schema = z 
  .object({
    [SIGNUP_FORM.NAME]: z
      .string()
      ,
    [SIGNUP_FORM.EMAIL]: z
      .string()
      .email()
      ,
    [SIGNUP_FORM.PASSWORD]: z
      .string()
      ,
    [SIGNUP_FORM.PASSWORD_CONFIRM]: z
      .string()
      ,
  })
  .refine(val => val[SIGNUP_FORM.PASSWORD] === val[SIGNUP_FORM.PASSWORD_CONFIRM], {
    message: 'Password do not match.',
    path: [SIGNUP_FORM.PASSWORD_CONFIRM],
  })
  ;