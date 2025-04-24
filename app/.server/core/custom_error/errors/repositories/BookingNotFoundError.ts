import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';

export class BookingNotFoundError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'BOOKING_NOT_FOUND', details);
  }
}
