import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import type { ILoaderService } from "../interfaces/i_loader_service";
import { DI_TYPES } from "./di_types";
import { LoaderService } from "../services/loader_service";
import type { IBookingCapacityRepository } from "~/.server/repositories/interfaces/IBookingCapacityRepository";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { BookingCapacityRepositoryMock } from "../mocks/BookingCapacityRepositoryMock";
import type { IBookingRepository } from "~/.server/repositories/interfaces/IBookingRepository";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import { BookingRepositoryMock } from "../mocks/BookingRepositoryMock";
import { CourseRepositoryMock } from "../mocks/CourseRepositoryMock";

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
  }

  bindMockRepository() {
    this.container.rebind<Partial<IBookingCapacityRepository<void, void, void, void>>>(GLOBAL_DI_TYPES.BookingCapacityRepository).to(BookingCapacityRepositoryMock);
    this.container.rebind<Partial<IBookingRepository<unknown, void, void, void>>>(GLOBAL_DI_TYPES.BookingRepository).to(BookingRepositoryMock);
    this.container.rebind<Partial<ICourseRepository<void, void, void, void>>>(GLOBAL_DI_TYPES.CourseRepository).to(CourseRepositoryMock);
  }
}

export const diContainer = new DIContainer();