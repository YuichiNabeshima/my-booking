import { inject, injectable } from 'inversify';

import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';

import { BaseBatch } from '../BaseBatch';

@injectable()
export class TestBatch extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
  ) {
    super();
  }

  async run() {
    console.log('params:', this.params);

    const business = await this.businessRepository.fetch({ id: Number(this.params[0]) });
    console.log('business', business);

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('finish');
      }, 3000);
    });
  }
}
