import { inject, injectable } from "inversify";
import { InvalidAuthError } from "~/.server/core/custom_error/errors/InvalidAuthError";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { IBusinessHoursRepository } from "~/.server/repositories/interfaces/IBusinessHoursRepository";
import type { ISessionStorageManager } from "~/.server/core/session/ISessionStorageManager";
import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from "../dtos/LoaderServiceDTO";
import type { ILoaderService } from "../interfaces/ILoaderService";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager) private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.BusinessHoursRepostory) private businessHoursRepository: IBusinessHoursRepository,
  ) {}

  async execute({ cookie }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const businessId = session.data.id as number;

    const businessHours = await this.businessHoursRepository.fetchAll({ business_id: businessId });
    return {
      businessHours
    };
  }
}