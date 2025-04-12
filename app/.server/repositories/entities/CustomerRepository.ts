import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/core/transaction/ITransactionManager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { CustomerRepositoryDTO } from "../dtos/CustomerRepositoryDTO";
import type { ICustomerRepository } from "../interfaces/ICustomerRepository";

@injectable()
export class CustomerRepository extends BaseRepository<
  {
    TModel: CustomerRepositoryDTO;
    WhereUniqueInput: Prisma.CustomerWhereUniqueInput;
    WhereInput: Prisma.CustomerWhereInput;
    CreateManyInput: Prisma.CustomerCreateManyInput;
    UpdateInput: Prisma.CustomerUpdateInput;
    TModelDelegate: Prisma.CustomerDelegate;
  }
> implements ICustomerRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.CustomerDelegate>>,
  ) {
    super({
      modelName: 'customer',
      transactionManager,
    });
  }
}
