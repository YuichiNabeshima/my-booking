import type { IsSuccess, LoaderDTO } from "../../.server/dtos/LoaderDTO";
import { STATUS } from "../../constants/STATUS";

export function isLoaderSuccess(data: LoaderDTO): data is IsSuccess {
  return data.status === STATUS.SUCCESS;
}