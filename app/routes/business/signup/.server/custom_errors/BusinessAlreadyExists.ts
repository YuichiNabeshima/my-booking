import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';

export class BusinessAlreadyExists extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'BUSINESS_ALREADY_EXISTS', details);
  }
}
