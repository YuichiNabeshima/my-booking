import type { BookingLimit } from '../../types/BookingLimit';

export interface LoaderServiceArgsDTO {
  cookie: string;
}

export interface LoaderServiceResultDTO extends BookingLimit {
  businessHours: {
    day_of_week: string;
    hours_kind: string;
    is_open: boolean;
    open_time: string;
    close_time: string;
  }[];
}
