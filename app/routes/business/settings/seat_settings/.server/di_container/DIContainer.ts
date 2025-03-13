import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import type { ILoaderService } from "../interfaces/ILoaderService";
import { DI_TYPES } from "./DI_TYPES";
import { LoaderService } from "../services/LoaderService";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import type { CourseRepositoryDTO } from "~/.server/repositories/dtos/CourseRepositoryDTO";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { CourseRepositoryMock } from "../mocks/CourseRepositoryMock";
import type { IActionService } from "../interfaces/IActionService";
import { ActionService } from "../services/ActionService";
import type { IUpdateBookingCapacityService } from "../interfaces/IUpdateBookingCapacityService";
import { UpdateBookingCapacityService } from "../services/UpdateBookingCapacityService";

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService);
    this.container.bind<IUpdateBookingCapacityService>(DI_TYPES.UpdateBookingCapacityService).to(UpdateBookingCapacityService);
  }

  bindMock() {
    this.container.rebind<ICourseRepository<Partial<CourseRepositoryDTO>>>(GLOBAL_DI_TYPES.CourseRepository).to(CourseRepositoryMock);
  }
}

export const diContainer = new DIContainer();