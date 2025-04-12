import { inject, injectable } from "inversify";
import type { IAuthStateChecker } from "./IAuthStateChecker";
import type { AuthStateCheckerArgsDTO, AuthStateCheckerResultDTO } from "./AuthStateCheckerDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { STATUS } from "./constants/STATUS";
import type { ISessionStorageManager } from "~/.server/core/session/ISessionStorageManager";

@injectable()
export class AuthStateChecker implements IAuthStateChecker {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager) private SessionStorageManager: ISessionStorageManager,
  ) {}

  async execute({ cookie }: AuthStateCheckerArgsDTO): Promise<AuthStateCheckerResultDTO> {
    if (!cookie) {
      return {
        status: STATUS.UNAUTHENTICATED,
      };
    }

    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      return {
        status: STATUS.UNAUTHENTICATED,
      };
    }

    return {
      status: STATUS.AUTHENTICATED,
    };
  }
} 