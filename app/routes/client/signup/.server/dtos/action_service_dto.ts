import { STATUS } from "~/config/const/status";

export interface HandleActionArgsDTO {
  name: string;
  email: string;
  password: string;
}

export interface HandleActionResultDTO {
  status: typeof STATUS.REDIRECT;
  redirectTo: string;
}