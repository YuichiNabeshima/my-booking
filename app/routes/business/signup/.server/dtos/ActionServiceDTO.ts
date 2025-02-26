import { STATUS } from "~/constants/STATUS";

export interface HandleActionArgsDTO {
  name: string;
  email: string;
  password: string;
}

export interface HandleActionResultDTO {
  status: typeof STATUS.SUCCESS;
  cookie: string;
}