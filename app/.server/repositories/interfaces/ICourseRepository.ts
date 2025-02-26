import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { CourseRepositoryDTO } from '../dtos/CourseRepositoryDTO';

export interface ICourseRepository<
  DTO = CourseRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.CourseWhereUniqueInput,
  Prisma.CourseWhereInput,
  Prisma.CourseCreateInput,
  Prisma.CourseUpdateInput
> {}