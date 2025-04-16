import type { BusinessHoursRepositoryDTO } from '~/.server/repositories/dtos/BusinessHoursRepositoryDTO';

import type { Booking } from '../../types/Booking';
import type { Stats } from '../../types/Stats';

export interface LoaderServiceArgsDTO {
  cookie: string;
  dates: [Date] | [Date, Date] | [];
}

export interface LoaderServiceResultDTO {
  businessName: string;
  stats: Stats;
  bookings: Booking[];
  businessHours: BusinessHoursRepositoryDTO[];
}
