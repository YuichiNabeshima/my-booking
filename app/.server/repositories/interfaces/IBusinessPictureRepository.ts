import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BusinessPictureRepositoryDTO } from '../dtos/BusinessPictureRepositoryDTO'; 

export interface IBusinessPictureRepository<
  DTO = BusinessPictureRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.BusinessPictureWhereUniqueInput,
  Prisma.BusinessPictureWhereInput,
  Prisma.BusinessPictureCreateInput,
  Prisma.BusinessPictureUpdateInput
> {}