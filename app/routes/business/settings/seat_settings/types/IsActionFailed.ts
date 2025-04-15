import type { STATUS } from '../constants/STATUS';

export interface IsActionFailed {
  status: typeof STATUS.FAILED;
}
