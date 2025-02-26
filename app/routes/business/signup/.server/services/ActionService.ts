import { inject, injectable } from "inversify";
import { STATUS } from "~/constants/STATUS";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import { BusinessAlreadyExists } from "../custom_errors/BusinessAlreadyExists";
import type { HandleActionArgsDTO, HandleActionResultDTO } from "../dtos/ActionServiceDTO";
import type { IActionService } from "../interfaces/IActionService";
import { hash } from "@node-rs/bcrypt";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.SessionStorageService) private sessionStorageService: ISessionStorageService,
  ){}

  async handleAction(args: HandleActionArgsDTO): Promise<HandleActionResultDTO> {
    const { name, email, password } = args;

    const existingBusiness = await this.businessRepository.fetch({ email });

    if (existingBusiness) {
      throw new BusinessAlreadyExists('This business already exsits.');
    }

    const hashedPassword = await hash(password, 10);

    const business = await this.businessRepository.create({ name, email, password: hashedPassword });

    const session = await this.sessionStorageService.getSession();
    session.set('id', business.id);
    const setCookieHeader = await this.sessionStorageService.commitSession(session);

    return {
      status: STATUS.SUCCESS,
      cookie: setCookieHeader,
    };
  }
}