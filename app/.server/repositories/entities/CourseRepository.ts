import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/interfaces/i_transaction_manager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { CourseRepositoryDTO } from "../dtos/CourseRepositoryDTO";
import type { ICourseRepository } from "../interfaces/ICourseRepository";

@injectable()
export class CourseRepository extends BaseRepository<
  CourseRepositoryDTO,
  Prisma.CourseWhereUniqueInput,
  Prisma.CourseWhereInput,
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput,
  Prisma.CourseDelegate
> implements ICourseRepository {
  constructor(
    @inject(GLOBAL_DI_TYPES.TransactionManager) transactionManager: ITransactionManager<Record<PascalToCamelCase<Prisma.ModelName>, Prisma.CourseDelegate>>,
  ) {
    super({
      modelName: 'course',
      transactionManager,
    });
  }
}
