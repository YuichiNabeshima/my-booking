import type { BOOKING_STATUS } from '~/constants/enums/BOOKING_STATUS';

export type BookingStatus = keyof typeof BOOKING_STATUS;
