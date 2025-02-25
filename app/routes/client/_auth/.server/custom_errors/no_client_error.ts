import { CustomBaseError } from "~/.server/server_utils/logger/custom_base_error";

export class NoClientError extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'NO_CLIENT', details);
  }
}