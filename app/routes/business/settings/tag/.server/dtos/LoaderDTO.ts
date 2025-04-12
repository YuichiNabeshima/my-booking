import type { STATUS } from "../../constants/STATUS";
import type { Tag } from "../../types/Tag";

export interface IsSuccess {
  status: typeof STATUS.SUCCESS;
  tags: Tag[],
}

export type LoaderDTO = IsSuccess | null;