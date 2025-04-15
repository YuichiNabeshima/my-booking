import { CustomBaseError } from '~/.server/core/custom_error/custom_base_error';

export class PasswordInvalidError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'PASSWORD_INVALID', details);
  }
}
