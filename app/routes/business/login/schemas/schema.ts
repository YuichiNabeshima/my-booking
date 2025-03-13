import { z } from "zod";
import { FORM_NAME } from "../constants/FORM_NAME";


export const schema = z
  .object({
    [FORM_NAME.EMAIL]: z
      .string()
      .email()
      ,
    [FORM_NAME.PASSWORD]: z
      .string()
      ,
  })
  ;