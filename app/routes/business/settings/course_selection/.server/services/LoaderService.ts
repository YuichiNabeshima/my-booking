import { inject, injectable } from 'inversify';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBookingCapacityRepository } from '~/.server/repositories/interfaces/IBookingCapacityRepository';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';

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
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
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

    const courses = (await this.courseRepository.fetchAll({ business_id: business.id })).map(
      (course) => ({
        id: course.id,
        label: course.name,
        duration: course.time_duration,
      }),
    );

    return {
      courses,
    };
  }
}
