import type { z } from 'zod';

import type { schema } from '../../schemas/schema';

export interface ActionServiceArgsDTO {
  cookie: string;
  inputData: z.infer<typeof schema>;
}

export type ActionServiceResultDTO = boolean;
