import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { BusinessPictureRepositoryDTO } from "../dtos/BusinessPictureRepositoryDTO";
import type { IBusinessPictureRepository } from "../interfaces/IBusinessPictureRepository";

@injectable()
export class BusinessPictureRepository extends BaseRepository<
  {
    TModel: BusinessPictureRepositoryDTO;
    WhereUniqueInput: Prisma.BusinessPictureWhereUniqueInput;
    WhereInput: Prisma.BusinessPictureWhereInput;
    CreateManyInput: Prisma.BusinessPictureCreateManyInput;
    UpdateInput: Prisma.BusinessPictureUpdateInput;
    TModelDelegate: Prisma.BusinessPictureDelegate;
  }
> implements IBusinessPictureRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.BusinessPictureDelegate>>,
  ) {
    super({
      modelName: 'businessPicture',
      transactionManager,
    });
  }
}
