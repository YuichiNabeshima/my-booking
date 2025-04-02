import { Prisma } from '@prisma/client';
import type { IBaseRepository } from '../base/IBaseRepository';
import type { MailQueRepositoryDTO } from '../dtos/MailQueRepositoryDTO';

export interface IMailQueRepository<
  DTO = MailQueRepositoryDTO,
  WhereUniqueInput = Prisma.MailQueWhereUniqueInput,
  WhereInput = Prisma.MailQueWhereInput,
  CreateManyInput = Prisma.MailQueCreateManyInput,
  UpdateInput = Prisma.MailQueUpdateInput,
> extends IBaseRepository<
  DTO,
  WhereUniqueInput,
  WhereInput,
  CreateManyInput,
  UpdateInput
> {}