import type { STATUS } from "../../constants/STATUS";
import type { IsLoaderSuccess } from "../../types/IsLoaderSuccesss";

interface IsFailed {
  status: typeof STATUS.FAILED;
}

export type LoaderDTO = IsLoaderSuccess | IsFailed;