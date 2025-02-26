import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { MailQueRepositoryDTO } from '../dtos/MailQueRepositoryDTO';

export interface IMailQueRepository<
  DTO = MailQueRepositoryDTO,
> extends IBaseRepository<
  DTO,
  Prisma.MailQueWhereUniqueInput,
  Prisma.MailQueWhereInput,
  Prisma.MailQueCreateInput,
  Prisma.MailQueUpdateInput
> {}