import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BookingCapacityRepositoryDTO } from '../dtos/BookingCapacityRepositoryDTO';

export interface IBookingCapacityRepository<
  DTO = BookingCapacityRepositoryDTO,
  WhereUniqueInput = Prisma.BookingCapacityWhereUniqueInput,
  WhereInput = Prisma.BookingCapacityWhereInput,
  CreateManyInput = Prisma.BookingCapacityCreateManyInput,
  UpdateInput = Prisma.BookingCapacityUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}