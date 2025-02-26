import type { STATUS } from "../../constants/STATUS";
import type { Booking } from "../../types/Booking";

interface IsSuccess {
  status: typeof STATUS.SUCCESS;
  bookings: Booking[];
}

interface IsFailed {
  status: typeof STATUS.FAILED;
}

export type LoaderResultDTO = IsSuccess | IsFailed | Response;