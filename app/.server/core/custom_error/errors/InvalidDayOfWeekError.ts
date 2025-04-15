import { CustomBaseError } from '../custom_base_error';

export class InvalidDayOfWeekError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'INVALID_DAY_OF_WEEK', details);
  }
}
