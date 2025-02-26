import { CustomBaseError } from "~/.server/server_utils/logger/custom_base_error";

export class ClientAlreadyExists extends CustomBaseError {
  constructor(message: string, details: unknown = null) {
    super(message, 400, 'CLIENT_ALREADY_EXISTS', details);
  }
}