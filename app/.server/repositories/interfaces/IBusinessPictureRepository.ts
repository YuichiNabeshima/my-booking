import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BusinessPictureRepositoryDTO } from '../dtos/BusinessPictureRepositoryDTO';

export interface IBusinessPictureRepository<
  DTO = BusinessPictureRepositoryDTO,
  WhereUniqueInput = Prisma.BusinessPictureWhereUniqueInput,
  WhereInput = Prisma.BusinessPictureWhereInput,
  CreateManyInput = Prisma.BusinessPictureCreateManyInput,
  UpdateInput = Prisma.BusinessPictureUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}