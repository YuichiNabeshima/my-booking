import type { Submission } from '@conform-to/react';

import type { STATUS } from '../../constants/STATUS';

export interface IsActionSuccess {
  status: typeof STATUS.SUCCESS;
  name: string;
  email: string;
}

export interface IsActionFailed {
  status: typeof STATUS.FAILED;
  lastResult: Submission<string>;
}

export interface IsActionNoDifference {
  status: typeof STATUS.NO_DIFFERENCE;
  lastResult: Submission<string>;
}

export type ActionDTO = IsActionSuccess | IsActionFailed | IsActionNoDifference;
