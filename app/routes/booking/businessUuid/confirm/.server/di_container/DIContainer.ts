import { BaseDIContainer } from '~/.server/di_container/BaseDIContainer';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { BusinessRepositoryDTO } from '~/.server/repositories/dtos/BusinessRepositoryDTO';
import type { CourseRepositoryDTO } from '~/.server/repositories/dtos/CourseRepositoryDTO';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';

import type { IActionService } from '../interfaces/IActionService';
import type { ILoaderService } from '../interfaces/ILoaderService';
import { BusinessRepositoryMock } from '../mocks/BusinessRepositoryMock';
import { CourseRepositoryMock } from '../mocks/CourseRepositoryMock';
import { ActionService } from '../services/ActionService';
import { LoaderService } from '../services/LoaderService';
import { DI_TYPES } from './DI_TYPES';

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService);
  }

  bindMock() {
    this.container
      .rebind<Partial<IBusinessRepository<Partial<BusinessRepositoryDTO>>>>(
        GLOBAL_DI_TYPES.BusinessRepository,
      )
      .to(BusinessRepositoryMock);
    this.container
      .rebind<ICourseRepository<Partial<CourseRepositoryDTO>>>(GLOBAL_DI_TYPES.CourseRepository)
      .to(CourseRepositoryMock);
  }
}
