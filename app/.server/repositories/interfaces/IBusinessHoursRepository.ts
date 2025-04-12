import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BusinessHoursRepositoryDTO } from '../dtos/BusinessHoursRepositoryDTO';

export interface IBusinessHoursRepository<
  DTO = BusinessHoursRepositoryDTO,
  WhereUniqueInput = Prisma.BusinessHoursWhereUniqueInput,
  WhereInput = Prisma.BusinessHoursWhereInput,
  CreateManyInput = Prisma.BusinessHoursCreateManyInput,
  UpdateInput = Prisma.BusinessHoursUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}