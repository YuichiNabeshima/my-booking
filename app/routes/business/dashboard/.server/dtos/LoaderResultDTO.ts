import type { STATUS } from "../../constants/STATUS";
import type { Booking } from "../../types/Booking";
import type { Stats } from "../../types/Stats";

export interface IsSuccess {
  status: typeof STATUS.SUCCESS;
  businessName: string;
  stats: Stats;
  bookings: Booking[];
}

export interface IsFailed {
  status: typeof STATUS.FAILED;
}

export type LoaderResultDTO = IsSuccess | IsFailed | Response;