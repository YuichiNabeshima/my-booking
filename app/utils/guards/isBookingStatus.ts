import { BOOKING_STATUS } from '~/constants/enums/BOOKING_STATUS';
import type { BookingStatus } from '~/types/enums/BookingStatus';

export function isBookingStatus(status: string): status is BookingStatus {
  return Object.keys(BOOKING_STATUS).some((val) => val === status);
}
