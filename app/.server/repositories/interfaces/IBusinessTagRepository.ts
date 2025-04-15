import { Prisma } from '@prisma/client';

import type { IBaseRepository } from '../base/IBaseRepository';
import type { BusinessTagRepositoryDTO } from '../dtos/BusinessTagRepositoryDTO';

// eslint-disable-next-line
export interface IBusinessTagRepository<
  DTO = BusinessTagRepositoryDTO,
  WhereUniqueInput = Prisma.BusinessTagWhereUniqueInput,
  WhereInput = Prisma.BusinessTagWhereInput,
  CreateManyInput = Prisma.BusinessTagCreateManyInput,
  UpdateInput = Prisma.BusinessTagUpdateInput,
> extends IBaseRepository<DTO, WhereUniqueInput, WhereInput, CreateManyInput, UpdateInput> {}
