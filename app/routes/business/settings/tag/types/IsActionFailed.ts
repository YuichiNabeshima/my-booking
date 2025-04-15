import type { Submission } from '@conform-to/react';

import type { STATUS } from '../constants/STATUS';

export interface IsActionFailed {
  status: typeof STATUS.FAILED;
  lastResult: Submission<string>;
}
