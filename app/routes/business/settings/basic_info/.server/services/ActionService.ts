import { inject, injectable } from "inversify";
import type { IActionService } from "../interfaces/IActionService";
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from "../dtos/ActionServiceDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ISessionStorageService } from "~/.server/interfaces/ISessionStorageService";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import { InvalidAuthError } from "~/.server/custom_errors/InvalidAuthError";
import { BusinessNotFoundError } from "~/.server/custom_errors/repositories/BusinessNotFoundError";
import { EmailExistsError } from "~/.server/custom_errors/EmailExistsError";
import type { BusinessRepositoryDTO } from "~/.server/repositories/dtos/BusinessRepositoryDTO";

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageService) private sessionStorageService: ISessionStorageService,
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
  ) {}

  async execute({ cookie, name, email }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.sessionStorageService.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const business = await this.businessRepository.fetch({ id: session.data.id });

    if (!business) {
      throw new BusinessNotFoundError('Business not found.');
    }

    const updateData: Partial<BusinessRepositoryDTO> = {};

    if (name !== business.name) {
      updateData.name = name;
    }

    if (email !== business.email) {
      updateData.email = email;
    }

    if (Object.keys(updateData).length === 0) {
      return null;
    }

    if (updateData.email) {
      const emailExists = await this.businessRepository.fetch({ email });

      if (emailExists) {
        throw new EmailExistsError('This email already exists.');
      }
    }

    return await this.businessRepository.update({where: { id: session.data.id }, data: updateData });
  }
}