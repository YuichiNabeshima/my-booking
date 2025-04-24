import type { BookingStatus } from '~/types/enums/BookingStatus';
import type { Time } from '~/types/Time';

export interface Booking {
  id: number;
  status: BookingStatus;
  name: string;
  email: string;
  startTime: Time;
  endTime: Time;
  numberOfguests: number;
  courseLabel: string;
  customerKind: string;
  note?: string;
}
