import { CustomBaseError } from "~/.server/core/errors/custom_base_error";

export class BusinessNotFoundError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'BUSINESS_NOT_FOUND', details);
  }
}