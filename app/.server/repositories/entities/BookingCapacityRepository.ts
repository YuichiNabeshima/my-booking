import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { BookingCapacityRepositoryDTO } from "../dtos/BookingCapacityRepositoryDTO";
import type { IBookingCapacityRepository } from "../interfaces/IBookingCapacityRepository";

@injectable()
export class BookingCapacityRepository extends BaseRepository<
  {
    TModel: BookingCapacityRepositoryDTO;
    WhereUniqueInput: Prisma.BookingCapacityWhereUniqueInput;
    WhereInput: Prisma.BookingCapacityWhereInput;
    CreateManyInput: Prisma.BookingCapacityCreateManyInput;
    UpdateInput: Prisma.BookingCapacityUpdateInput;
    TModelDelegate: Prisma.BookingCapacityDelegate;
  }
> implements IBookingCapacityRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.BookingCapacityDelegate>>,
  ) {
    super({
      modelName: 'bookingCapacity',
      transactionManager,
    });
  }
}
