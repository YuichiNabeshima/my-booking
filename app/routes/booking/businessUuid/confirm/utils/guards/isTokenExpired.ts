import { STATUS } from '../../constants/STATUS';
import type { DataKind, IsTokenExpired } from '../../types/DataKind';

export function isTokenExpired(data: DataKind): data is IsTokenExpired {
  if (data.status === STATUS.TOKEN_EXPIRED) {
    return true;
  }
  return false;
}
