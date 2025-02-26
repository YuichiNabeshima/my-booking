import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BusinessRepositoryDTO } from '../dtos/BusinessRepositoryDTO';

export interface IBusinessRepository<
  DTO = BusinessRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.BusinessWhereUniqueInput,
  Prisma.BusinessWhereInput,
  Prisma.BusinessCreateInput,
  Prisma.BusinessUpdateInput
> {}
  