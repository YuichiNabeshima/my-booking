import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { MailLogRepositoryDTO } from '../dtos/MailLogRepositoryDTO';

export interface IMailLogRepository<
  DTO = MailLogRepositoryDTO,
  WhereUniqueInput = Prisma.MailLogWhereUniqueInput,
  WhereInput = Prisma.MailLogWhereInput,
  CreateManyInput = Prisma.MailLogCreateManyInput,
  UpdateInput = Prisma.MailLogUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}