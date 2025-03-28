import type { LoaderDTO } from "../../.server/dtos/LoaderDTO";
import { STATUS } from "../../constants/STATUS";
import type { IsLoaderSuccess } from "../../types/IsLoaderSuccesss";

export function isLoaderSuccess(args: LoaderDTO): args is IsLoaderSuccess {
  return args.status === STATUS.SUCCESS;
}