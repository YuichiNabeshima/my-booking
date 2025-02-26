import { compare } from "@node-rs/bcrypt";
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from "../dtos/ActionServiceDTO";
import type { IActionService } from "../interfaces/IActionService";
import { inject } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import { BusinessNotFoundError } from "~/.server/custom_errors/repositories/BusinessNotFoundError";
import { PasswordInvalidError } from "../custom_errors/PasswordInvalidError";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";

export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.SessionStorageService) private sessionStorageService: ISessionStorageService,
  ) {}

  async execute(args: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const { email, password } = args;

    const business = await this.businessRepository.fetch({ email });

    if (!business) {
      throw new BusinessNotFoundError('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, business.password);

    if (!isPasswordValid) {
      throw new PasswordInvalidError('Invalid credentials.')
    }

    const session = await this.sessionStorageService.getSession();
    session.set('id', business.id);
    const setCookieHeader = await this.sessionStorageService.commitSession(session);

    return {
      cookie: setCookieHeader,
    };
  }
}