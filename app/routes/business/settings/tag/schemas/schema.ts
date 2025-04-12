import { z } from "zod";
import { FORM_NAME } from "../constants/FORM_NAME";

export const schema = z
  .object({
    tags: 
      z.object({
        [FORM_NAME.ID]: z
          .number()
          .optional()
          ,
        [FORM_NAME.LABEL]: z
          .string()
          ,
      }).array(),
    
  })
;