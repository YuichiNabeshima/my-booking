import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { IBookingRepository } from "~/.server/repositories/interfaces/IBookingRepository";
import type { IBookingCapacityRepository } from "~/.server/repositories/interfaces/IBookingCapacityRepository";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import { BookingTracker } from "../usecases/BookingTracker";
import type { GetLoaderDataArgsDTO, GetLoaderDataDTO } from "../dtos/loader_service_dto";
import type { ILoaderService } from "../interfaces/i_loader_service";
import { CourseNotFoundError } from "../../../../../../.server/custom_errors/repositories/CourseNotFoundError";
import { DAY_OF_WEEK_ARRAY } from "~/constants/DAY_OF_WEEK";
import { isDayOfWeek } from "~/utils/guards/isDayOfWeek";
import { InvalidDayOfWeekError } from "~/.server/custom_errors/InvalidDayOfWeekError";
import { BookingCapacityNotFoundError } from "~/.server/custom_errors/repositories/BookingCapacityNotFoundError";
import { BookingCapacityManager } from "../usecases/BookingCapacityManager";
import { BookingAvailabilityChecker } from "../usecases/BookingAvailabilityChecker";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BookingRepository) private bookingRepository: IBookingRepository,
    @inject(GLOBAL_DI_TYPES.BookingCapacityRepository) private bookingCapacityRepository: IBookingCapacityRepository,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
  ){}
  async getLoaderData(args: GetLoaderDataArgsDTO): Promise<GetLoaderDataDTO> {
    const { businessId, customerKind, courseId, date } = args;

    const bookings = await this.bookingRepository.fetchAll({ business_id: businessId, date, customer_kind: customerKind });

    const bookingTracker = new BookingTracker();

    for (let i = 0; i < bookings.length; i++) {
      const course = await this.courseRepository.fetch({ id: courseId });

      if (!course) {
        throw new CourseNotFoundError('Course not found.');
      }
      bookingTracker.addBooking(bookings[i].start, course.time_duration, bookings[i].customer_kind === CUSTOMER_KIND.SINGLE ? bookings[i].number_of_guests : null);
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
      }
    });

    if (!bookingCapacity) {
      throw new BookingCapacityNotFoundError('Booking capacity not found.');
    }

    const bookingCapacityManager = new BookingCapacityManager(bookingCapacity);

    const bookingAvailabilityChecker = new BookingAvailabilityChecker(bookingTracker, bookingCapacityManager);

    return { avaliability: bookingAvailabilityChecker.getAllAvailabilities() };
  }
}