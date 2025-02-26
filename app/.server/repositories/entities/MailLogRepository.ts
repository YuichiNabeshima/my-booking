import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { MailLogRepositoryDTO } from "../dtos/MailLogRepositoryDTO";
import type { IMailLogRepository } from "../interfaces/IMailLogRepository";

@injectable()
export class MailLogRepository extends BaseRepository<
  MailLogRepositoryDTO,
  Prisma.MailLogWhereUniqueInput,
  Prisma.MailLogWhereInput,
  Prisma.MailLogCreateInput,
  Prisma.MailLogUpdateInput,
  Prisma.MailLogDelegate
> implements IMailLogRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.MailLogDelegate>>,
  ) {
    super({
      modelName: 'mailLog',
      transactionManager,
    });
  }
}
