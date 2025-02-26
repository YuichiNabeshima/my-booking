import type { STATUS } from "../../constants/STATUS";
import type { LoaderServiceResultDTO } from "./LoaderServiceDTO";

interface IsSuccess {
  status: typeof STATUS.SUCCESS;
  data: LoaderServiceResultDTO;
}

interface IsFailed {
  status: typeof STATUS.FAILED;
}

interface IsTokenExpired {
  status: typeof STATUS.TOKEN_EXPIRED;
}

export type LoaderResultDTO = IsSuccess | IsFailed | IsTokenExpired;