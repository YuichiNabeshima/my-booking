import type { STATUS } from '../constants/STATUS';
import type { BookingLimit } from './BookingLimit';

export interface IsLoaderSuccess {
  status: typeof STATUS.SUCCESS;
  bookingLimit: BookingLimit;
}
