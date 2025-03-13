import type { BookingLimit } from "../../types/BookingLimit";

export interface ActionServiceArgsDTO {
  cookie: string;
  bookingLimit: BookingLimit;
}

export type ActionServiceResultDTO = boolean;