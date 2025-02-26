import { CustomBaseError } from "~/.server/core/errors/custom_base_error";

export class NoClientError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'NO_CLIENT', details);
  }
}