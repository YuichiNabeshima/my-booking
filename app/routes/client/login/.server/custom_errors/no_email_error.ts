import { CustomBaseError } from "~/.server/core/errors/custom_base_error";

export class NoEmailError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 500, 'NO_EMAIL', details);
  }
}