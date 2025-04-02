import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { BookingRepositoryDTO } from "../dtos/BookingRepositoryDTO";
import type { IBookingRepository } from "../interfaces/IBookingRepository";

@injectable()
export class BookingRepository extends BaseRepository<
  {
    TModel: BookingRepositoryDTO;
    WhereUniqueInput: Prisma.BookingWhereUniqueInput;
    WhereInput: Prisma.BookingWhereInput;
    CreateManyInput: Prisma.BookingCreateManyInput;
    UpdateInput: Prisma.BookingUpdateInput;
    TModelDelegate: Prisma.BookingDelegate;
  }
> implements IBookingRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.BookingDelegate>>,
  ) {
    super({
      modelName: 'booking',
      transactionManager,
    });
  }
}
