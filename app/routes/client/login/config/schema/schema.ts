import { z } from "zod";
import { LOGIN_FORM } from "../const/login_form";


export const schema = z
  .object({
    [LOGIN_FORM.EMAIL]: z
      .string()
      .email()
      ,
    [LOGIN_FORM.PASSWORD]: z
      .string()
      ,
  })
  ;