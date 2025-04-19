import { STATUS } from '../../constants/STATUS';
import type { DataKind, IsSuccess } from '../../types/DataKind';

export function isSuceess(data: DataKind): data is IsSuccess {
  if (data.status === STATUS.SUCCESS) {
    return true;
  }
  return false;
}
