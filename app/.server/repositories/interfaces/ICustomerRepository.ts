import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { CustomerRepositoryDTO } from '../dtos/CustomerRepositoryDTO';

export interface ICustomerRepository<
  DTO = CustomerRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.CustomerWhereUniqueInput,
  Prisma.CustomerWhereInput,
  Prisma.CustomerCreateInput,
  Prisma.CustomerUpdateInput
> {}