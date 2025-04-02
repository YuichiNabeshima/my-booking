import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { CustomerRepositoryDTO } from '../dtos/CustomerRepositoryDTO';

export interface ICustomerRepository<
  DTO = CustomerRepositoryDTO,
  WhereUniqueInput = Prisma.CustomerWhereUniqueInput,
  WhereInput = Prisma.CustomerWhereInput,
  CreateManyInput = Prisma.CustomerCreateManyInput,
  UpdateInput = Prisma.CustomerUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}