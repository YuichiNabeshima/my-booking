import { injectable } from 'inversify';

import { BaseRepository } from '~/.server/repositories/base/BaseRepository';
import type { BookingRepositoryDTO } from '~/.server/repositories/dtos/BookingRepositoryDTO';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';
import { CUSTOMER_KIND } from '~/constants/CUSTOMER_KIND';

@injectable()
export class BookingRepositoryMock
  extends BaseRepository<{ TModel: Partial<BookingRepositoryDTO> }>
  implements Partial<IBookingRepository<Partial<BookingRepositoryDTO>>>
{
  async fetchAll(args?: unknown): Promise<Partial<BookingRepositoryDTO>[]> {
    void args;

    return [
      {
        start: '12:00',
        customer_id: 1,
        course_id: 1,
        number_of_guests: 1,
        customer_kind: CUSTOMER_KIND.SINGLE,
      },
      {
        start: '13:00',
        customer_id: 1,
        course_id: 1,
        number_of_guests: 1,
        customer_kind: CUSTOMER_KIND.SINGLE,
      },
      {
        start: '15:00',
        customer_id: 1,
        course_id: 1,
        number_of_guests: 1,
        customer_kind: CUSTOMER_KIND.SINGLE,
      },
    ];
  }
}
