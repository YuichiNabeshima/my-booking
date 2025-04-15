import type { BookingLimit } from '../../types/BookingLimit';

export interface UpdateBookingCapacityServiceArgsDTO {
  businessId: number;
  bookingLimit: BookingLimit;
}
