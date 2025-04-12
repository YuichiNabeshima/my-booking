import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/core/transaction/ITransactionManager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { BusinessHoursRepositoryDTO } from "../dtos/BusinessHoursRepositoryDTO";
import type { IBusinessHoursRepository } from "../interfaces/IBusinessHoursRepository";

@injectable()
export class BusinessHoursRepository extends BaseRepository<
  {
    TModel: BusinessHoursRepositoryDTO;
    WhereUniqueInput: Prisma.BusinessHoursWhereUniqueInput;
    WhereInput: Prisma.BusinessHoursWhereInput;
    CreateManyInput: Prisma.BusinessHoursCreateManyInput;
    UpdateInput: Prisma.BusinessHoursUpdateInput;
    TModelDelegate: Prisma.BusinessHoursDelegate;
  }
> implements IBusinessHoursRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.BusinessHoursDelegate>>,
  ) {
    super({
      modelName: 'businessHours',
      transactionManager,
    });
  }
}
