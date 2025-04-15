import { inject, injectable } from 'inversify';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import { InvalidTimeFormatError } from '~/.server/core/custom_error/errors/InvalidTimeFormatError';
import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import { CourseNotFoundError } from '~/.server/core/custom_error/errors/repositories/CourseNotFoundError';
import { CustomerNotFoundError } from '~/.server/core/custom_error/errors/repositories/CustomerNotFoundError';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';
import type { ICustomerRepository } from '~/.server/repositories/interfaces/ICustomerRepository';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import { isTime } from '~/utils/guards/isTime';
import { minutesToTimeFormat } from '~/utils/minutesToTimeFormat';

import type { Booking } from '../../types/Booking';
import { getDatesBetween } from '../../utils/getDatesBetween';
import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from '../dtos/LoaderServiceDTO';
import type { ILoaderService } from '../interfaces/ILoaderService';

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.BookingRepository) private bookingRepository: IBookingRepository,
    @inject(GLOBAL_DI_TYPES.CustomerRepository) private customerRepository: ICustomerRepository,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
  ) {}

  async execute({ cookie, dates }: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Authenticated failed.');
    }

    const business = await this.businessRepository.fetch({ id: session.data.id });

    if (!business) {
      throw new BusinessNotFoundError('Business not found.');
    }

    const dateRange =
      dates.length === 2
        ? getDatesBetween(dates[0], dates[1])
        : dates.length === 1
        ? dates
        : [new Date()];

    const bookingList = await this.bookingRepository.fetchAll({
      business_id: business.id,
      date: { in: dateRange },
    });

    const bookingsPromise = bookingList.map(async (booking): Promise<Booking> => {
      const customer = await this.customerRepository.fetch({ id: booking.customer_id });
      const course = await this.courseRepository.fetch({ id: booking.course_id });

      if (!customer) {
        throw new CustomerNotFoundError('Customer not found.');
      }

      if (!course) {
        throw new CourseNotFoundError('Course not found.');
      }

      if (!isTime(booking.start)) {
        throw new InvalidTimeFormatError('Start time is invalid format.');
      }

      const [h, m] = booking.start.split(':');
      const hoursToMinutes = Number(h) * 60;
      const minutes = Number(m);
      const totalMinutes = hoursToMinutes + minutes + course.time_duration;
      const totalMinutesToTime = minutesToTimeFormat(totalMinutes);

      return {
        name: customer.name,
        startTime: booking.start,
        endTime: totalMinutesToTime,
        numberOfguests: booking.number_of_guests,
        courseLabel: `${course.name} (${course.time_duration}min)`,
        customerKind: booking.customer_kind === CUSTOMER_KIND.SINGLE ? 'Bar Sheet' : 'Table Sheet',
      };
    });

    const bookings = await Promise.all(bookingsPromise);

    const numberOfBookings = bookings.length;

    const totalGuests = bookings.reduce((prev, current) => {
      return prev + current.numberOfguests;
    }, 0);

    const totalBarSheets = bookings.reduce((prev, current) => {
      return current.customerKind === 'Bar Sheet' ? prev + 1 : prev;
    }, 0);

    const totalTableSheets = bookings.reduce((prev, current) => {
      return current.customerKind === 'Table Sheet' ? prev + 1 : prev;
    }, 0);

    return {
      businessName: business.name,
      stats: {
        numberOfBookings,
        totalGuests,
        totalBarSheets,
        totalTableSheets,
      },
      bookings: bookings,
    };
  }
}
