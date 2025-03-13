import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import type { ILoaderService } from "../interfaces/ILoaderService";
import { DI_TYPES } from "./DI_TYPES";
import { LoaderService } from "../services/LoaderService";
import type { IBookingCapacityRepository } from "~/.server/repositories/interfaces/IBookingCapacityRepository";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import { BookingCapacityRepositoryMock } from "../mocks/BookingCapacityRepositoryMock";
import type { ICourseRepository } from "~/.server/repositories/interfaces/ICourseRepository";
import type { IBookingRepository } from "~/.server/repositories/interfaces/IBookingRepository";
import { BookingRepositoryMock } from "../mocks/BookingRepositoryMock";
import { CourseRepositoryMock } from "../mocks/CourseRepositoryMock";
import type { BookingCapacityRepositoryDTO } from "~/.server/repositories/dtos/BookingCapacityRepositoryDTO";
import type { BookingRepositoryDTO } from "~/.server/repositories/dtos/BookingRepositoryDTO";
import type { CourseRepositoryDTO } from "~/.server/repositories/dtos/CourseRepositoryDTO";

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
  }

  bindMockRepository() {
    this.container.rebind<IBookingCapacityRepository<Partial<BookingCapacityRepositoryDTO>>>(GLOBAL_DI_TYPES.BookingCapacityRepository).to(BookingCapacityRepositoryMock);
    this.container.rebind<IBookingRepository<Partial<BookingRepositoryDTO>>>(GLOBAL_DI_TYPES.BookingRepository).to(BookingRepositoryMock);
    this.container.rebind<ICourseRepository<Partial<CourseRepositoryDTO>>>(GLOBAL_DI_TYPES.CourseRepository).to(CourseRepositoryMock);
  }
}

export const diContainer = new DIContainer();