import { CustomBaseError } from "~/.server/server_utils/logger/custom_base_error";

export class NoEmailError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 500, 'NO_EMAIL', details);
  }
}