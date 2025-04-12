import { BaseRepository } from "~/.server/repositories/base/BaseRepository";
import type { BookingRepositoryDTO } from "~/.server/repositories/dtos/BookingRepositoryDTO";
import type { IBookingRepository } from "~/.server/repositories/interfaces/IBookingRepository";
import { CUSTOMER_KIND } from "~/constants/CUSTOMER_KIND";
import type { CustomerKind } from "~/types/enums/CustomerKind";

export class BookingRepositoryMock extends BaseRepository<{ TModel: Partial<BookingRepositoryDTO> }> implements IBookingRepository<Partial<BookingRepositoryDTO>> {
  async fetchAll(args: { customer_kind: CustomerKind }): Promise<BookingRepositoryDTO[]> {
    if (args.customer_kind === CUSTOMER_KIND.SINGLE) {
      return [
        {
          id: 1,
          date: new Date('2025-03-10'),
          start: '20:00',
          customer_id: 1,
          business_id: 1,
          course_id: 1,
          number_of_guests: 2,
          customer_kind: CUSTOMER_KIND.SINGLE,
        }
      ];
    }
    return [
      {
        id: 1,
        date: new Date('2025-03-10'),
        start: '20:00',
        customer_id: 1,
        business_id: 1,
        course_id: 1,
        number_of_guests: 2,
        customer_kind: CUSTOMER_KIND.GROUP,
      },
      {
        id: 1,
        date: new Date('2025-03-10'),
        start: '11:00',
        customer_id: 2,
        business_id: 1,
        course_id: 1,
        number_of_guests: 4,
        customer_kind: CUSTOMER_KIND.GROUP,
      },
      {
        id: 1,
        date: new Date('2025-03-10'),
        start: '11:00',
        customer_id: 3,
        business_id: 1,
        course_id: 1,
        number_of_guests: 3,
        customer_kind: CUSTOMER_KIND.GROUP,
      },
    ];
  }
}