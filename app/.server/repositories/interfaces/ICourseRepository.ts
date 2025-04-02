import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { CourseRepositoryDTO } from '../dtos/CourseRepositoryDTO';

export interface ICourseRepository<
  DTO = CourseRepositoryDTO,
  WhereUniqueInput = Prisma.CourseWhereUniqueInput,
  WhereInput = Prisma.CourseWhereInput,
  CreateManyInput = Prisma.CourseCreateManyInput,
  UpdateInput = Prisma.CourseUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}