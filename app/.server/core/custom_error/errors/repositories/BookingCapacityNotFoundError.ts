import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';

export class BookingCapacityNotFoundError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'BOOKING_CAPACITY_NOT_FOUND', details);
  }
}
