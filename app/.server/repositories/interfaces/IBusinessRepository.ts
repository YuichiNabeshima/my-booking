import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BusinessRepositoryDTO } from '../dtos/BusinessRepositoryDTO';
import type { BusinessTagRepositoryDTO } from '../dtos/BusinessTagRepositoryDTO';
import type { FetchBusinessesArgs, FilterCondition } from '../types/BusinessRepositoryTypes';
import type { BusinessInfo } from '~/routes/booking/businessId/index/.server/dtos/LoaderServiceDTO';
import type { BusinessPictureRepositoryDTO } from '../dtos/BusinessPictureRepositoryDTO';

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
    business_picture: BusinessPictureRepositoryDTO[];
  })[]>;
  getTotalCount(params: FilterCondition): Promise<number>;
  fetchInfo({ id }: { id: number }): Promise<BusinessInfo>;
}
  