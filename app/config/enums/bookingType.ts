export const BOOKING_TYPE = {
  SINGLE: 'SINGLE',
  GROUP: 'GROUP',
} as const;

export const BOOKING_TYPE_ARRAY = [BOOKING_TYPE.SINGLE, BOOKING_TYPE.GROUP];

export type BookingType = (typeof BOOKING_TYPE)[keyof typeof BOOKING_TYPE];