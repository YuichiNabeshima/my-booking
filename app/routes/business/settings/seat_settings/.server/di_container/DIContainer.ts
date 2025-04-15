import { BaseDIContainer } from '~/.server/di_container/BaseDIContainer';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { CourseRepositoryDTO } from '~/.server/repositories/dtos/CourseRepositoryDTO';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';

import type { IActionService } from '../interfaces/IActionService';
import type { ILoaderService } from '../interfaces/ILoaderService';
import type { IUpdateBookingCapacityService } from '../interfaces/IUpdateBookingCapacityService';
import { CourseRepositoryMock } from '../mocks/CourseRepositoryMock';
import { ActionService } from '../services/ActionService';
import { LoaderService } from '../services/LoaderService';
import { UpdateBookingCapacityService } from '../services/UpdateBookingCapacityService';
import { DI_TYPES } from './DI_TYPES';

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService);
    this.container
      .bind<IUpdateBookingCapacityService>(DI_TYPES.UpdateBookingCapacityService)
      .to(UpdateBookingCapacityService);
  }

  bindMock() {
    this.container
      .rebind<ICourseRepository<Partial<CourseRepositoryDTO>>>(GLOBAL_DI_TYPES.CourseRepository)
      .to(CourseRepositoryMock);
  }
}

export const diContainer = new DIContainer();
