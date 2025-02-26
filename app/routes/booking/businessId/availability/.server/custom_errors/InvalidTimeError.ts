import { CustomBaseError } from "~/.server/core/errors/custom_base_error";

export class InvalidTimeError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'INVALID_TIME', details);
  }
}