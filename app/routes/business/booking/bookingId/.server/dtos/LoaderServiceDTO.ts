import type { BookingStatus } from '~/types/enums/BookingStatus';
import type { CustomerKind } from '~/types/enums/CustomerKind';

export interface LoaderServiceArgsDTO {
  bookingId: number;
}

export interface LoaderServiceResultDTO {
  status: BookingStatus;
  name: string;
  email: string;
  numberOfGuests: number;
  customerKind: CustomerKind;
  course: string;
  date: string;
  time: string;
}
