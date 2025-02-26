import type { CustomerKind } from "~/types/CustomerKind";
import type { Time } from "~/types/Time";

export interface BookingDetails {
  numberOfGuests: number;
  customerKind: CustomerKind;
  courseId: number;
  date: Date;
  time: Time;
}