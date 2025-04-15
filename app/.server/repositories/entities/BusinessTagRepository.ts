import { Prisma } from '@prisma/client';
import { inject, injectable } from 'inversify';

import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';

import type { PascalToCamelCase } from '../base/BaseRepository';
import { BaseRepository } from '../base/BaseRepository';
import type { BusinessTagRepositoryDTO } from '../dtos/BusinessTagRepositoryDTO';
import type { IBusinessTagRepository } from '../interfaces/IBusinessTagRepository';

@injectable()
export class BusinessTagRepository
  extends BaseRepository<{
    TModel: BusinessTagRepositoryDTO;
    WhereUniqueInput: Prisma.BusinessTagWhereUniqueInput;
    WhereInput: Prisma.BusinessTagWhereInput;
    CreateManyInput: Prisma.BusinessTagCreateManyInput;
    UpdateInput: Prisma.BusinessTagUpdateInput;
    TModelDelegate: Prisma.BusinessTagDelegate;
  }>
  implements IBusinessTagRepository
{
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager)
    transactionManager: ITransactionManager<
      Record<PascalToCamelCase<Prisma.ModelName>, Prisma.BusinessTagDelegate>
    >,
  ) {
    super({
      modelName: 'businessTag',
      transactionManager,
    });
  }
}
