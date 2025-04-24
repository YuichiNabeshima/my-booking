import type { BookingStatus } from '~/types/enums/BookingStatus';

export interface ActionServiceArgsDTO {
  bookingId: number;
  status: BookingStatus;
}

export type ActionServiceResultDTO = BookingStatus | null;
