import type { AuthRedirectServiceArgsDTO, AuthRedirectServiceResultDTO } from "./AuthRedirectServiceDTO";

export interface IAuthRedirectService {
  execute(args: AuthRedirectServiceArgsDTO): Promise<AuthRedirectServiceResultDTO>;
}