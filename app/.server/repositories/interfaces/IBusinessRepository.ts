import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BusinessRepositoryDTO } from '../dtos/BusinessRepositoryDTO';
import type { BusinessTagRepositoryDTO } from '../dtos/BusinessTagRepositoryDTO';
import type { FetchBusinessesArgs, FilterCondition } from '../types/BusinessRepositoryTypes';

export interface IBusinessRepository<
  DTO = BusinessRepositoryDTO,
  WhereUniqueInput = Prisma.BusinessWhereUniqueInput,
  WhereInput = Prisma.BusinessWhereInput,
  CreateManyInput = Prisma.BusinessCreateManyInput,
  UpdateInput = Prisma.BusinessUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {
  fetchBusinesses(args: FetchBusinessesArgs): Promise<(DTO & {
    business_tag: BusinessTagRepositoryDTO[];
  })[]>;
  getTotalCount(params: FilterCondition): Promise<number>;
}
  