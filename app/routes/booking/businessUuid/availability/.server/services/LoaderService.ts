import { inject, injectable } from 'inversify';

import { InvalidDayOfWeekError } from '~/.server/core/custom_error/errors/InvalidDayOfWeekError';
import { BookingCapacityNotFoundError } from '~/.server/core/custom_error/errors/repositories/BookingCapacityNotFoundError';
import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import { CourseNotFoundError } from '~/.server/core/custom_error/errors/repositories/CourseNotFoundError';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBookingCapacityRepository } from '~/.server/repositories/interfaces/IBookingCapacityRepository';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import { DAY_OF_WEEK_ARRAY } from '~/constants/DAY_OF_WEEK';
import { isDayOfWeek } from '~/utils/guards/isDayOfWeek';

import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from '../dtos/LoaderServiceDTO';
import type { ILoaderService } from '../interfaces/ILoaderService';
import { BookingAvailabilityCheckerService } from './BookingAvailabilityCheckerService';
import { BookingCapacityManagerService } from './BookingCapacityManagerService';
import { BookingTrackerService } from './BookingTrackerService';

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BookingRepository) private bookingRepository: IBookingRepository,
    @inject(GLOBAL_DI_TYPES.BookingCapacityRepository)
    private bookingCapacityRepository: IBookingCapacityRepository,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
  ) {}
  async execute(args: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const { businessUuid, customerKind, courseId, date } = args;

    const business = await this.businessRepository.fetch({ uuid: businessUuid });

    if (!business) {
      throw new BusinessNotFoundError('Business not found.');
    }

    const businessId = business.id;

    const bookings = await this.bookingRepository.fetchAll({
      business_id: businessId,
      date,
      customer_kind: customerKind,
    });

    const bookingTracker = new BookingTrackerService();

    for (let i = 0; i < bookings.length; i++) {
      const course = await this.courseRepository.fetch({ id: courseId });

      if (!course) {
        throw new CourseNotFoundError('Course not found.');
      }
      bookingTracker.addBooking(
        bookings[i].start,
        course.time_duration,
        bookings[i].customer_kind === CUSTOMER_KIND.SINGLE ? bookings[i].number_of_guests : null,
      );
    }

    const dayOfWeek = DAY_OF_WEEK_ARRAY[date.getDay()];

    if (!isDayOfWeek(dayOfWeek)) {
      throw new InvalidDayOfWeekError('Invalid day of week.');
    }

    const bookingCapacity = await this.bookingCapacityRepository.fetch({
      business_id_day_customer_kind: {
        business_id: businessId,
        customer_kind: customerKind,
        day: dayOfWeek,
      },
    });

    if (!bookingCapacity) {
      throw new BookingCapacityNotFoundError('Booking capacity not found.');
    }

    const bookingCapacityManager = new BookingCapacityManagerService(bookingCapacity);

    const bookingAvailabilityChecker = new BookingAvailabilityCheckerService(
      bookingTracker,
      bookingCapacityManager,
    );

    return { avaliability: bookingAvailabilityChecker.getAllAvailabilities() };
  }
}
