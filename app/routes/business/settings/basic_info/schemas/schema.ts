import { z } from 'zod';

import { FORM_NAME } from '../constants/FORM_NAME';

export const schema = z.object({
  [FORM_NAME.NAME]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.EMAIL]: z
    .string()
    .email()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.CAPACITY_OF_GROUP]: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.CUISINE_KIND]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.PRICE_LEVEL]: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.NEIGHBORHOOD]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.ZIP_CODE]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.ADDRESS]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.TEL]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.TOTAL_SEATS]: z
    .number()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.PAYMENT_METHOD]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.PARKING]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.DESCRIPTION]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
  [FORM_NAME.BUSINESS_HOURS_NOTE]: z
    .string()
    .nullable()
    .optional()
    .transform((val) => val || null),
});
