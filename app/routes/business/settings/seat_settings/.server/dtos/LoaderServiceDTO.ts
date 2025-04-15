import type { BookingLimit } from '../../types/BookingLimit';

export interface LoaderServiceArgsDTO {
  cookie: string;
}

export type LoaderServiceResultDTO = BookingLimit | null;
