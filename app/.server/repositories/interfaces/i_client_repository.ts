import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/i_base_repository';
import type { ClientDTO } from '../dtos/client_dto';

export interface IClientRepository<
  ClientWhereInput = Prisma.ClientWhereInput,
  ClientWhereUniqueInput = Prisma.ClientWhereUniqueInput,
  ClientCreateInput = Prisma.ClientCreateInput,
  ClientUpdateInput = Prisma.ClientUpdateInput,
> extends IBaseRepository<
  ClientDTO,
  ClientWhereInput,
  ClientWhereUniqueInput,
  ClientCreateInput,
  ClientUpdateInput
> { }
  