import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';

export class CustomerNotFoundError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'CUSTOMER_NOT_FOUND', details);
  }
}
