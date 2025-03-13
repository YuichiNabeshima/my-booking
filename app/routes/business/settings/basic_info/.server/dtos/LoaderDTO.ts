import type { STATUS } from "../../constants/STATUS";

export interface IsSuccess {
  status: typeof STATUS.SUCCESS;
  name: string;
  email: string;
}

export interface IsFailed {
  status: typeof STATUS.FAILED;
}

export type LoaderDTO = IsSuccess | IsFailed | Response;