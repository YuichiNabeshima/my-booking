import { inject, injectable } from 'inversify';

import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBookingCapacityRepository } from '~/.server/repositories/interfaces/IBookingCapacityRepository';

import { BaseBatch } from '../BaseBatch';

@injectable()
export class Issue3 extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.BookingCapacityRepository)
    private bookingCapacityRepository: IBookingCapacityRepository,
  ) {
    super();
  }

  async run() {
    const bookingCapacities = await this.bookingCapacityRepository.fetchAll();

    for (const capacity of bookingCapacities) {
      await this.bookingCapacityRepository.update({
        where: { id: capacity.id },
        data: {
          time_0_1: 0,
          time_1_2: 0,
          time_2_3: 0,
          time_3_4: 0,
          time_4_5: 0,
          time_5_6: 0,
          time_6_7: 0,
          time_7_8: 0,
          time_8_9: 0,
          time_9_10: 0,
          time_10_11: 0,
          time_14_15: 0,
          time_15_16: 0,
          time_16_17: 0,
          time_22_23: 0,
          time_23_24: 0,
        },
      });
    }
  }
}
