import { inject, injectable } from 'inversify';

import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessHoursRepository } from '~/.server/repositories/interfaces/IBusinessHoursRepository';
import { DAY_OF_WEEK } from '~/constants/DAY_OF_WEEK';

import { BaseBatch } from '../BaseBatch';

@injectable()
export class Issue2 extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessHoursRepostory)
    private businessHoursRepository: IBusinessHoursRepository,
  ) {
    super();
  }

  async run() {
    const businessHoursList = await this.businessHoursRepository.fetchAll();

    businessHoursList.forEach(async (businessHours) => {
      if (businessHours.day_of_week === DAY_OF_WEEK.MON) {
        await this.businessHoursRepository.remove({ id: businessHours.id });
      }
    });
  }
}
