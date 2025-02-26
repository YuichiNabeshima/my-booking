import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BookingCapacityRepositoryDTO } from '../dtos/BookingCapacityRepositoryDTO';

export interface IBookingCapacityRepository<
  DTO = BookingCapacityRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.BookingCapacityWhereUniqueInput,
  Prisma.BookingCapacityWhereInput,
  Prisma.BookingCapacityCreateInput,
  Prisma.BookingCapacityUpdateInput
> {}