import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { BusinessRepositoryDTO } from "../dtos/BusinessRepositoryDTO";
import type { IBusinessRepository } from "../interfaces/IBusinessRepository";

@injectable()
export class BusinessRepository extends BaseRepository<
  BusinessRepositoryDTO,
  Prisma.BusinessWhereUniqueInput,
  Prisma.BusinessWhereInput,
  Prisma.BusinessCreateInput,
  Prisma.BusinessUpdateInput,
  Prisma.BusinessDelegate
> implements IBusinessRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.BusinessDelegate>>,
  ) {
    super({
      modelName: 'business',
      transactionManager,
    });
  }
}
