import { z } from 'zod';

import { FORM_NAME } from '../constants/FORM_NAME';

export const schema = z.object({
  courses: z
    .object({
      [FORM_NAME.ID]: z.number().optional(),
      [FORM_NAME.LABEL]: z.string(),
      [FORM_NAME.DURATION]: z.number().refine((value) => value % 15 === 0, {
        message: 'Invalid duration.',
      }),
    })
    .array(),
});
