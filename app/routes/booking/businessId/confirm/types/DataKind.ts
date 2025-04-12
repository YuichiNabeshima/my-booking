import type { STATUS } from "../constants/STATUS";

export interface IsSuccess {
  status: typeof STATUS.SUCCESS;
}

export interface IsTokenExpired {
  status: typeof STATUS.TOKEN_EXPIRED;
}

export interface IsFailed {
  status: typeof STATUS.FAILED;
}

export type DataKind = IsSuccess | IsTokenExpired | IsFailed;