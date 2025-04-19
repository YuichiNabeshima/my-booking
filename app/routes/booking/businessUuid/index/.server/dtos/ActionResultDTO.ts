import type { SubmissionResult } from '@conform-to/react';

import { STATUS } from '../../constants/STATUS';
import type { BookingDetails } from '../../types/BookingDetails';
import type { MailResult } from '../../types/MailResult';

interface IsFailed {
  status: typeof STATUS.FAILED;
  lastResult: SubmissionResult<string[]>;
}

interface IsConfirmed {
  status: typeof STATUS.CONFIRMED;
  lastResult: SubmissionResult<string[]>;
  bookingDetails: BookingDetails;
}

interface IsFinished {
  status: typeof STATUS.FINISHED;
  mail: MailResult;
}

export type ActionResultDTO = IsFailed | IsConfirmed | IsFinished;
