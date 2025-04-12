import { CustomBaseError } from "~/.server/core/custom_error/custom_base_error";

export class TokenNotFoundError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'TOKEN_NOT_FOUND', details);
  }
}