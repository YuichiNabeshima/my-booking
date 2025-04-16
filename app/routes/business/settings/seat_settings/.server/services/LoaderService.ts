import { inject, injectable } from 'inversify';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBookingCapacityRepository } from '~/.server/repositories/interfaces/IBookingCapacityRepository';
import type { IBusinessHoursRepository } from '~/.server/repositories/interfaces/IBusinessHoursRepository';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';

import { transformToBookingLimit } from '../../utils/transformToBookingLimit.server';
import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from '../dtos/LoaderServiceDTO';
import type { ILoaderService } from '../interfaces/ILoaderService';

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.BookingCapacityRepository)
    private bookingCapacityRepository: IBookingCapacityRepository,
    @inject(GLOBAL_DI_TYPES.BusinessHoursRepostory)
    private businessHoursRepository: IBusinessHoursRepository,
  ) {}

  async execute({ cookie }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Authenticated faled.');
    }

    const business = await this.businessRepository.fetch({ id: session.data.id });

    if (!business) {
      throw new BusinessNotFoundError('Business not found.');
    }

    const bookingCapacities = await this.bookingCapacityRepository.fetchAll({
      business_id: business.id,
    });

    const businessHours = await this.businessHoursRepository.fetchAll({ business_id: business.id });

    const bookingLimit = transformToBookingLimit(bookingCapacities);
    const businessHoursFiltered = businessHours
      .filter(
        (
          hour,
        ): hour is typeof hour & { hours_kind: string; open_time: string; close_time: string } =>
          hour.hours_kind !== null && hour.open_time !== null && hour.close_time !== null,
      )
      .map((hour) => ({
        day_of_week: hour.day_of_week,
        hours_kind: hour.hours_kind,
        is_open: hour.is_open,
        open_time: hour.open_time,
        close_time: hour.close_time,
      }));

    return {
      ...bookingLimit,
      businessHours: businessHoursFiltered,
    };
  }
}
