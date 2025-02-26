import type { Time } from "~/types/Time";

export interface Booking {
  name: string;
  startTime: Time;
  endTime: Time;
  numberOfguests: number;
  courseLabel: string; 
  customerKind: string;
  note?: string;
}