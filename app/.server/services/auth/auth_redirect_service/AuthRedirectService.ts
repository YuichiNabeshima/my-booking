import { inject, injectable } from "inversify";
import type { IAuthRedirectService } from "./IAuthRedirectService";
import type { AuthRedirectServiceArgsDTO, AuthRedirectServiceResultDTO } from "./AuthRedirectServiceDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { STATUS } from "./constants/STATUS";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";

@injectable()
export class AuthRedirectService implements IAuthRedirectService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageService) private sessionStorageService: ISessionStorageService,
  ) {}

  async execute({ cookie }: AuthRedirectServiceArgsDTO): Promise<AuthRedirectServiceResultDTO> {
    if (!cookie) {
      return {
        status: STATUS.UNAUTHENTICATED,
      };
    }

    const session = await this.sessionStorageService.getSession(cookie);

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