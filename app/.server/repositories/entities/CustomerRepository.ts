import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { CustomerRepositoryDTO } from "../dtos/CustomerRepositoryDTO";
import type { ICustomerRepository } from "../interfaces/ICustomerRepository";

@injectable()
export class CustomerRepository extends BaseRepository<
  CustomerRepositoryDTO,
  Prisma.CustomerWhereUniqueInput,
  Prisma.CustomerWhereInput,
  Prisma.CustomerCreateInput,
  Prisma.CustomerUpdateInput,
  Prisma.CustomerDelegate
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
