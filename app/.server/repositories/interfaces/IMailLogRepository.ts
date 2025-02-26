import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { MailLogRepositoryDTO } from '../dtos/MailLogRepositoryDTO';

export interface IMailLogRepository<
  DTO = MailLogRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.MailLogWhereUniqueInput,
  Prisma.MailLogWhereInput,
  Prisma.MailLogCreateInput,
  Prisma.MailLogUpdateInput
> {}