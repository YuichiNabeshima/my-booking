import { inject, injectable } from 'inversify';
import { v4 as uuid } from 'uuid';

import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';

import { BaseBatch } from '../BaseBatch';

@injectable()
export class Issue1 extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
  ) {
    super();
  }

  async run() {
    const businesses = await this.businessRepository.fetchAll();

    businesses.forEach(async (business) => {
      await this.businessRepository.update({ where: { id: business.id }, data: { uuid: uuid() } });
    });
  }
}
