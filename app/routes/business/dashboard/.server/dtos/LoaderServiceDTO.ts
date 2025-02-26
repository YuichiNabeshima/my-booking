import type { Booking } from "../../types/Booking";

export interface LoaderServiceArgsDTO {
  cookie: string,
  dates: [Date] | [Date, Date] | [];
}

export interface LoaderServiceResultDTO {
  bookings: Booking[];
}