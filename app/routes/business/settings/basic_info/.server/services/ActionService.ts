import { inject, injectable } from 'inversify';

import { EmailExistsError } from '~/.server/core/custom_error/errors/EmailExistsError';
import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { BusinessRepositoryDTO } from '~/.server/repositories/dtos/BusinessRepositoryDTO';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { CuisineKind } from '~/types/enums/CuisineKind';
import type { Neighborhood } from '~/types/enums/Neighborhood';

import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
  ) {}

  async execute({ cookie, ...formData }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const business = await this.businessRepository.fetch({ id: session.data.id });

    if (!business) {
      throw new BusinessNotFoundError('Business not found.');
    }

    const updateData = this.createUpdateData(formData, business);

    if (Object.keys(updateData).length === 0) {
      return null;
    }

    if (updateData.email) {
      await this.validateEmail(updateData.email);
    }

    return await this.transactionManager.execute(async () => {
      return await this.businessRepository.update({
        where: { id: session.data.id },
        data: updateData,
      });
    });
  }

  private createUpdateData(
    formData: Omit<ActionServiceArgsDTO, 'cookie'>,
    business: BusinessRepositoryDTO,
  ): Partial<BusinessRepositoryDTO> {
    const updateData: Record<string, unknown> = {};

    const fieldsToCompare = [
      { key: 'name', value: formData.name },
      { key: 'email', value: formData.email },
      { key: 'cuisine_kind', value: formData.cuisine_kind as CuisineKind },
      { key: 'price_level', value: formData.price_level ? Number(formData.price_level) : null },
      { key: 'neighborhood', value: formData.neighborhood as Neighborhood },
      { key: 'zip_code', value: formData.zip_code },
      { key: 'address', value: formData.address },
      { key: 'tel', value: formData.tel },
      { key: 'total_seats', value: formData.total_seats ? Number(formData.total_seats) : null },
      { key: 'payment_method', value: formData.payment_method },
      { key: 'parking', value: formData.parking },
      { key: 'description', value: formData.description },
      { key: 'business_hours_note', value: formData.business_hours_note },
    ];

    for (const { key, value } of fieldsToCompare) {
      if (value !== business[key as keyof BusinessRepositoryDTO]) {
        updateData[key] = value;
      }
    }

    return updateData as Partial<BusinessRepositoryDTO>;
  }

  private async validateEmail(email: string): Promise<void> {
    const emailExists = await this.businessRepository.fetch({ email });
    if (emailExists) {
      throw new EmailExistsError('This email already exists.');
    }
  }
}
