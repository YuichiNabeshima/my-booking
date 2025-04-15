import { CustomBaseError } from '../custom_base_error';

export class InvalidAuthError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'INVALID_AUTH_FORMAT', details);
  }
}
