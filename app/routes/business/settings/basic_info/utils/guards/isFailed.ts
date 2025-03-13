import type { IsFailed, LoaderDTO } from "../../.server/dtos/LoaderDTO";
import { STATUS } from "../../constants/STATUS";

export function isFailed(data: LoaderDTO): data is IsFailed {
  return data.status === STATUS.FAILED;
}