import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';

export class CookieNotFoundError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'COOKIE_NOT_FOUND', details);
  }
}
