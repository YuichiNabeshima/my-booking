import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BookingRepositoryDTO } from '../dtos/BookingRepositoryDTO';

export interface IBookingRepository<
  DTO = BookingRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.BookingWhereUniqueInput,
  Prisma.BookingWhereInput,
  Prisma.BookingCreateInput,
  Prisma.BookingUpdateInput
> {}