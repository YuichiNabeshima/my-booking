import type { STATUS } from "./constants/STATUS";

export interface AuthRedirectServiceArgsDTO {
  cookie: string | null;
}

export interface AuthRedirectServiceResultDTO {
  status: keyof typeof STATUS;
}