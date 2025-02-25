import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "~/.server/di_container/types";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/base_repository";
import type { PascalToCamelCase } from "../base/base_repository";
import type { ClientDTO } from "../dtos/client_dto";
import type { IClientRepository } from "../interfaces/i_client_repository";

@injectable()
export class ClientRepository extends BaseRepository<
  ClientDTO,
  Prisma.ClientWhereInput,
  Prisma.ClientWhereUniqueInput,
  Prisma.ClientCreateInput,
  Prisma.ClientUpdateInput,
  Prisma.ClientDelegate
> implements IClientRepository {
  constructor(
    @inject(TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.ClientDelegate>>,
  ) {
    super({
      modelName: 'client',
      transactionManager,
    });
  }
}
