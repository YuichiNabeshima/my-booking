import { CustomBaseError } from "../custom_base_error";

export class InvalidTimeFormatError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'INVALID_TIME_FORMAT', details);
  }
}