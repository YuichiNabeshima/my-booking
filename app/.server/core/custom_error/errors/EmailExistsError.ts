import { CustomBaseError } from "../custom_base_error";

export class EmailExistsError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'EMAIL_EXISTS', details);
  }
}