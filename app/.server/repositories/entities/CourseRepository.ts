import { Prisma } from "@prisma/client";
import { inject, injectable } from "inversify";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { ITransactionManager } from "~/.server/core/transaction/ITransactionManager";
import { BaseRepository } from "../base/BaseRepository";
import type { PascalToCamelCase } from "../base/BaseRepository";
import type { CourseRepositoryDTO } from "../dtos/CourseRepositoryDTO";
import type { ICourseRepository } from "../interfaces/ICourseRepository";

@injectable()
export class CourseRepository extends BaseRepository<
  {
    TModel: CourseRepositoryDTO;
    WhereUniqueInput: Prisma.CourseWhereUniqueInput;
    WhereInput: Prisma.CourseWhereInput;
    CreateManyInput: Prisma.CourseCreateManyInput;
    UpdateInput: Prisma.CourseUpdateInput;
    TModelDelegate: Prisma.CourseDelegate;
  }
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
