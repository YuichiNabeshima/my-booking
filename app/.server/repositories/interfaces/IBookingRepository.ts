import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { BookingRepositoryDTO } from '../dtos/BookingRepositoryDTO';

export interface IBookingRepository<
  DTO = BookingRepositoryDTO,
  WhereUniqueInput = Prisma.BookingWhereUniqueInput,
  WhereInput = Prisma.BookingWhereInput,
  CreateManyInput = Prisma.BookingCreateManyInput,
  UpdateInput = Prisma.BookingUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}