import { inject, injectable } from 'inversify';

import { CustomerNotFoundError } from '~/.server/core/custom_error/errors/repositories/CustomerNotFoundError';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { CustomerRepositoryDTO } from '~/.server/repositories/dtos/CustomerRepositoryDTO';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';
import type { ICustomerRepository } from '~/.server/repositories/interfaces/ICustomerRepository';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';
import type { CustomerKind } from '~/types/enums/CustomerKind';

import { BaseBatch } from '../BaseBatch';
import { QueueLoop } from '../QueueLoop';

const KEY = 'GenerateDummyBooking';

const VANCOUVER_CUSTOMERS = [
  { name: 'Emma Thompson', email: 'emma.thompson@vancouver.ca' },
  { name: 'Liam Chen', email: 'liam.chen@vancouver.ca' },
  { name: 'Sophia Patel', email: 'sophia.patel@vancouver.ca' },
  { name: 'Noah Singh', email: 'noah.singh@vancouver.ca' },
  { name: 'Olivia Wong', email: 'olivia.wong@vancouver.ca' },
  { name: 'Ethan Kim', email: 'ethan.kim@vancouver.ca' },
  { name: 'Ava Lee', email: 'ava.lee@vancouver.ca' },
  { name: 'Mason Garcia', email: 'mason.garcia@vancouver.ca' },
  { name: 'Isabella Martinez', email: 'isabella.martinez@vancouver.ca' },
  { name: 'Lucas Brown', email: 'lucas.brown@vancouver.ca' },
  { name: 'Mia Anderson', email: 'mia.anderson@vancouver.ca' },
  { name: 'Benjamin Wilson', email: 'benjamin.wilson@vancouver.ca' },
  { name: 'Charlotte Taylor', email: 'charlotte.taylor@vancouver.ca' },
  { name: 'William Moore', email: 'william.moore@vancouver.ca' },
  { name: 'Amelia Clark', email: 'amelia.clark@vancouver.ca' },
  { name: 'James Rodriguez', email: 'james.rodriguez@vancouver.ca' },
  { name: 'Harper Lewis', email: 'harper.lewis@vancouver.ca' },
  { name: 'Alexander Hall', email: 'alexander.hall@vancouver.ca' },
  { name: 'Evelyn Young', email: 'evelyn.young@vancouver.ca' },
  { name: 'Michael Allen', email: 'michael.allen@vancouver.ca' },
] as const;

const LUNCH_START_TIME = ['11:00', '11:15', '11:30', '11:45', '12:00', '12:15'] as const;

const DINNER_START_TIME = ['17:00', '17:15', '17:30', '17:45', '18:00', '18:15'] as const;

const ids = Array.from({ length: 24 }, (_, i) => String(i + 1));

@injectable()
export class GenerateDummyBooking extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.BookingRepository) private bookingRepository: IBookingRepository,
    @inject(GLOBAL_DI_TYPES.CustomerRepository) private customerRepository: ICustomerRepository,
    @inject(GLOBAL_DI_TYPES.CourseRepository) private courseRepository: ICourseRepository,
  ) {
    super();
  }

  async run() {
    // const param = this.params;
    const dateParam = this.params[0];
    // const businessId = Number(this.params[1]);

    const queueClient = new QueueLoop();
    await queueClient.init();
    await queueClient.addQueue(KEY, ids);

    while (true) {
      const ids = await queueClient.popValues(KEY, 1);
      if (ids.length === 0) break;

      const businessId = Number(ids[0]);
      const courses = await this.courseRepository.fetchAll({ business_id: businessId });
      const date = new Date(dateParam);

      for (let i = 0; i < 2; i++) {
        const course = courses[Math.floor(Math.random() * courses.length)];

        const randomCustomer =
          VANCOUVER_CUSTOMERS[Math.floor(Math.random() * VANCOUVER_CUSTOMERS.length)];
        const customer = await this.customerRepository.fetch({ email: randomCustomer.email });

        let bookingCustomer: CustomerRepositoryDTO | null = null;
        if (!customer) {
          await this.customerRepository.create({
            name: randomCustomer.name,
            email: randomCustomer.email,
          });
          bookingCustomer = await this.customerRepository.fetch({ email: randomCustomer.email });
        } else {
          bookingCustomer = customer;
        }

        if (!bookingCustomer) {
          throw new CustomerNotFoundError('Customer not found.');
        }

        if (course.time_duration === 90) {
          await this.bookingRepository.create({
            business_id: businessId,
            date,
            start: LUNCH_START_TIME[Math.floor(Math.random() * LUNCH_START_TIME.length)],
            course_id: course.id,
            customer_kind: Object.keys(CUSTOMER_KIND)[
              Math.floor(Math.random() * Object.keys(CUSTOMER_KIND).length)
            ] as CustomerKind,
            number_of_guests: [1, 2][Math.floor(Math.random() * 2)],
            customer_id: bookingCustomer.id,
          });
        } else {
          await this.bookingRepository.create({
            business_id: businessId,
            date,
            start: DINNER_START_TIME[Math.floor(Math.random() * DINNER_START_TIME.length)],
            course_id: course.id,
            customer_kind: Object.keys(CUSTOMER_KIND)[
              Math.floor(Math.random() * Object.keys(CUSTOMER_KIND).length)
            ] as CustomerKind,
            number_of_guests: [1, 2][Math.floor(Math.random() * 2)],
            customer_id: bookingCustomer.id,
          });
        }
      }
    }
    await queueClient.clear(KEY);
    await queueClient.quit();
  }
}
