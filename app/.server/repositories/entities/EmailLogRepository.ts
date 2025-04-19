import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import type { PascalToCamelCase } from '../base/BaseRepository';
import { BaseRepository } from '../base/BaseRepository';
import type { EmailLogRepositoryDTO } from '../dtos/EmailLogRepositoryDTO';
import type { IEmailLogRepository } from '../interfaces/IEmailLogRepository';

@injectable()
export class EmailLogRepository
  extends BaseRepository<{
    TModel: EmailLogRepositoryDTO;
    WhereUniqueInput: Prisma.EmailLogWhereUniqueInput;
    WhereInput: Prisma.EmailLogWhereInput;
    CreateManyInput: Prisma.EmailLogCreateManyInput;
    UpdateInput: Prisma.EmailLogUpdateInput;
    TModelDelegate: Prisma.EmailLogDelegate;
  }>
  implements IEmailLogRepository
{
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager)
    transactionManager: ITransactionManager<
      Record<PascalToCamelCase<Prisma.ModelName>, Prisma.EmailLogDelegate>
    >,
  ) {
    super({
      modelName: 'emailLog',
      transactionManager,
    });
  }
}
