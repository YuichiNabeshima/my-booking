import type { ActionDTO, IsActionSuccess } from '../../.server/dtos/ActionDTO';
import { STATUS } from '../../constants/STATUS';

export function isActionSuccess(data?: ActionDTO): data is IsActionSuccess {
  return data?.status === STATUS.SUCCESS;
}
