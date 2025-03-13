import { STATUS } from "../../constants/STATUS";
import type { IsLoaderSuccess } from "../../types/IsLoaderSuccess";
import type { LoaderDTO } from "../../.server/dtos/LoaderDTO";

export function isLoaderSuccess(data: LoaderDTO): data is IsLoaderSuccess {
  return data.status === STATUS.SUCCESS;
}