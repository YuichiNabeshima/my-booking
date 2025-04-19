import { Prisma } from '@prisma/client';

import type { IBaseRepository } from '../base/IBaseRepository';
import type { EmailLogRepositoryDTO } from '../dtos/EmailLogRepositoryDTO';

// eslint-disable-next-line
export interface IEmailLogRepository<
  DTO = EmailLogRepositoryDTO,
  WhereUniqueInput = Prisma.EmailLogWhereUniqueInput,
  WhereInput = Prisma.EmailLogWhereInput,
  CreateManyInput = Prisma.EmailLogCreateManyInput,
  UpdateInput = Prisma.EmailLogUpdateInput,
> extends IBaseRepository<DTO, WhereUniqueInput, WhereInput, CreateManyInput, UpdateInput> {}
