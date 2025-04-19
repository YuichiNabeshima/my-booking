import { Prisma } from '@prisma/client';

import type { IBaseRepository } from '../base/IBaseRepository';
import type { EmailQueueRepositoryDTO } from '../dtos/EmailQueueRepositoryDTO';

// eslint-disable-next-line
export interface IEmailQueueRepository<
  DTO = EmailQueueRepositoryDTO,
  WhereUniqueInput = Prisma.EmailQueueWhereUniqueInput,
  WhereInput = Prisma.EmailQueueWhereInput,
  CreateManyInput = Prisma.EmailQueueCreateManyInput,
  UpdateInput = Prisma.EmailQueueUpdateInput,
> extends IBaseRepository<DTO, WhereUniqueInput, WhereInput, CreateManyInput, UpdateInput> {}
