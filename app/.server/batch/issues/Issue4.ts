import { inject, injectable } from 'inversify';

import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';

import { BaseBatch } from '../BaseBatch';

@injectable()
export class Issue4 extends BaseBatch {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.TransactionManager) private transactionManager: ITransactionManager,
  ) {
    super();
  }

  async run() {
    const businesses = await this.businessRepository.fetchAll();

    await this.transactionManager.execute(async () => {
      for (const business of businesses) {
        await this.businessRepository.update({
          where: { id: business.id },
          data: { is_published: true },
        });
      }
    });
  }
}
