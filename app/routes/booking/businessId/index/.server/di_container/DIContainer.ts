import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import { DI_TYPES } from "./DI_TYPES";
import { ActionService } from "../services/ActionService";
import { LoaderService } from "../services/LoaderService";
import type { IActionService } from "../interfaces/IActionService";
import type { ILoaderService } from "../interfaces/ILoaderService";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { CourseRepositoryMock } from "../mocks/CourseRepositoryMock";
import type { CourseRepositoryDTO } from "~/.server/repositories/dtos/CourseRepositoryDTO";

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService);
  }

  bindMock() {
    this.container.rebind<ICourseRepository<Partial<CourseRepositoryDTO>>>(GLOBAL_DI_TYPES.CourseRepository).to(CourseRepositoryMock);
  }
}