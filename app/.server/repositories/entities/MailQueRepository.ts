import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import type { PascalToCamelCase } from '../base/BaseRepository';
import { BaseRepository } from '../base/BaseRepository';
import type { MailQueRepositoryDTO } from '../dtos/MailQueRepositoryDTO';
import type { IMailQueRepository } from '../interfaces/IMailQueRepository';

@injectable()
export class MailQueRepository
  extends BaseRepository<{
    TModel: MailQueRepositoryDTO;
    WhereUniqueInput: Prisma.MailQueWhereUniqueInput;
    WhereInput: Prisma.MailQueWhereInput;
    CreateManyInput: Prisma.MailQueCreateManyInput;
    UpdateInput: Prisma.MailQueUpdateInput;
    TModelDelegate: Prisma.MailQueDelegate;
  }>
  implements IMailQueRepository
{
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager)
    transactionManager: ITransactionManager<
      Record<PascalToCamelCase<Prisma.ModelName>, Prisma.MailQueDelegate>
    >,
  ) {
    super({
      modelName: 'mailQue',
      transactionManager,
    });
  }
}
