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
  })
;