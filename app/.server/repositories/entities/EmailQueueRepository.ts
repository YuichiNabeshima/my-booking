import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import type { PascalToCamelCase } from '../base/BaseRepository';
import { BaseRepository } from '../base/BaseRepository';
import type { EmailQueueRepositoryDTO } from '../dtos/EmailQueueRepositoryDTO';
import type { IEmailQueueRepository } from '../interfaces/IEmailQueueRepository';

@injectable()
export class EmailQueueRepository
  extends BaseRepository<{
    TModel: EmailQueueRepositoryDTO;
    WhereUniqueInput: Prisma.EmailQueueWhereUniqueInput;
    WhereInput: Prisma.EmailQueueWhereInput;
    CreateManyInput: Prisma.EmailQueueCreateManyInput;
    UpdateInput: Prisma.EmailQueueUpdateInput;
    TModelDelegate: Prisma.EmailQueueDelegate;
  }>
  implements IEmailQueueRepository
{
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager)
    transactionManager: ITransactionManager<
      Record<PascalToCamelCase<Prisma.ModelName>, Prisma.EmailQueueDelegate>
    >,
  ) {
    super({
      modelName: 'emailQueue',
      transactionManager,
    });
  }
}
