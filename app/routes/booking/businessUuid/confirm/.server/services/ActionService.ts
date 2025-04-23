import { inject, injectable } from 'inversify';

import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import { CourseNotFoundError } from '~/.server/core/custom_error/errors/repositories/CourseNotFoundError';
import { CustomerNotFoundError } from '~/.server/core/custom_error/errors/repositories/CustomerNotFoundError';
import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { CustomerRepositoryDTO } from '~/.server/repositories/dtos/CustomerRepositoryDTO';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';
import type { ICustomerRepository } from '~/.server/repositories/interfaces/ICustomerRepository';
import type { IEmailQueueRepository } from '~/.server/repositories/interfaces/IEmailQueueRepository';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import { MY_BOOKING } from '~/constants/MY_BOOKING';

import { STATUS } from '../../constants/STATUS';
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.CustomerRepository) private customerRepository: ICustomerRepository,
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
    @inject(GLOBAL_DI_TYPES.BookingRepository) private bookingRepository: IBookingRepository,
    @inject(GLOBAL_DI_TYPES.EmailQueueRepository)
    private emailQueueRepository: IEmailQueueRepository,
  ) {}

  async execute({
    fullName,
    email,
    businessUuid,
    date,
    time,
    courseId,
    customerKind,
    numberOfguests,
  }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const business = await this.businessRepository.fetch({ uuid: businessUuid });
    const course = await this.courseRepository.fetch({ id: courseId });

    if (!business) {
      throw new BusinessNotFoundError('Business not found.');
    }

    if (!course) {
      throw new CourseNotFoundError('Course not found.');
    }

    const subject = `Booking Confirmation - ${business.name}`;
    const body = `
Dear ${fullName},

Thank you for your reservation at ${business.name}. We are pleased to confirm your booking details:

Date: ${new Date(date).toLocaleDateString()}
Time: ${time}
Number of guests: ${numberOfguests}
Course: ${course.name} (${course.time_duration} minutes)
Seat type: ${customerKind === CUSTOMER_KIND.SINGLE ? 'Bar sheet' : 'Table sheet'}

We look forward to welcoming you to ${
      business.name
    }. If you need to make any changes to your reservation, please contact us at least 24 hours before your scheduled time.

Best regards,
The My Booking Team
`;

    const customerExists = await this.customerRepository.fetch({ email });

    // Begin transaction
    return await this.transactionManager.execute<ActionServiceResultDTO>(async () => {
      let customer: CustomerRepositoryDTO | null = null;

      if (customerExists) {
        customer = await this.customerRepository.update({
          where: { id: customerExists.id },
          data: { name: fullName },
        });
      } else {
        await this.customerRepository.create({ name: fullName, email });
        customer = await this.customerRepository.fetch({ email });
      }

      if (!customer) {
        throw new CustomerNotFoundError('Customer not found.');
      }

      await this.bookingRepository.create({
        business_id: business.id,
        date,
        start: time,
        course_id: courseId,
        customer_kind: customerKind,
        number_of_guests: numberOfguests,
        customer_id: customer.id,
      });

      await this.emailQueueRepository.create({ to: email, from: MY_BOOKING.EMAIL, subject, body });

      return {
        status: STATUS.SUCCESS,
        mail: {
          subject: subject,
          body: body,
        },
      };
    });
  }
}
