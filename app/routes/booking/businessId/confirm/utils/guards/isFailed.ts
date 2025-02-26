import { STATUS } from "../../constants/STATUS";
import type { DataKind, IsFailed } from "../../types/DataKind";

export function isFailed(data: DataKind): data is IsFailed {
  if (data.status === STATUS.FAILED) {
    return true;
  }
  return false;
}