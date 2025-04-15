import type { AuthStateCheckerArgsDTO, AuthStateCheckerResultDTO } from './AuthStateCheckerDTO';

export interface IAuthStateChecker {
  execute(args: AuthStateCheckerArgsDTO): Promise<AuthStateCheckerResultDTO>;
}
