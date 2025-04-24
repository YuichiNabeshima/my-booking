import { inject, injectable } from 'inversify';

import { BookingNotFoundError } from '~/.server/core/custom_error/errors/repositories/BookingNotFoundError';
import { CourseNotFoundError } from '~/.server/core/custom_error/errors/repositories/CourseNotFoundError';
import { CustomerNotFoundError } from '~/.server/core/custom_error/errors/repositories/CustomerNotFoundError';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';
import type { ICustomerRepository } from '~/.server/repositories/interfaces/ICustomerRepository';

import type { LoaderServiceArgsDTO } from '../dtos/LoaderServiceDTO';
import type { ILoaderService } from '../interfaces/ILoaderService';

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BookingRepository) private bookingRepository: IBookingRepository,
    @inject(GLOBAL_DI_TYPES.CustomerRepository) private customerRepository: ICustomerRepository,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
  ) {}

  async execute({ bookingId }: LoaderServiceArgsDTO) {
    const booking = await this.bookingRepository.fetch({ id: bookingId });
    const customer = await this.customerRepository.fetch({ id: booking?.customer_id });
    const course = await this.courseRepository.fetch({ id: booking?.course_id });

    if (!booking) {
      throw new BookingNotFoundError('Booking not found.');
    }

    if (!customer) {
      throw new CustomerNotFoundError('Customer not found.');
    }

    if (!course) {
      throw new CourseNotFoundError('Course not found.');
    }

    return {
      status: booking.status,
      name: customer.name,
      email: customer.email,
      numberOfGuests: booking.number_of_guests,
      customerKind: booking.customer_kind,
      course: `${course.name} (${course.time_duration}min)`,
      date: booking.date.toISOString().slice(0, 10),
      time: `${booking.start} - `,
    };
  }
}
