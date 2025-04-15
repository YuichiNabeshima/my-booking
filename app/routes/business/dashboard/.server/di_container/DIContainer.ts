import { BaseDIContainer } from '~/.server/di_container/BaseDIContainer';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { BookingRepositoryDTO } from '~/.server/repositories/dtos/BookingRepositoryDTO';
import type { BusinessRepositoryDTO } from '~/.server/repositories/dtos/BusinessRepositoryDTO';
import type { CourseRepositoryDTO } from '~/.server/repositories/dtos/CourseRepositoryDTO';
import type { CustomerRepositoryDTO } from '~/.server/repositories/dtos/CustomerRepositoryDTO';
import type { IBookingRepository } from '~/.server/repositories/interfaces/IBookingRepository';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';
import type { ICourseRepository } from '~/.server/repositories/interfaces/ICourseRepository';
import type { ICustomerRepository } from '~/.server/repositories/interfaces/ICustomerRepository';

import type { ILoaderService } from '../interfaces/ILoaderService';
import { BookingRepositoryMock } from '../mocks/BookingRepositoryMock';
import { BusinessRepositoryMock } from '../mocks/BusinessRepositoryMock';
import { CourseRepositoryMock } from '../mocks/CourseRepositoryMock';
import { CustomerRepositoryMock } from '../mocks/CustomerRepositoryMock';
import { LoaderService } from '../services/LoaderService';
import { DI_TYPES } from './DI_TYPES';

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
  }

  bindMock() {
    this.container
      .rebind<Partial<IBusinessRepository<Partial<BusinessRepositoryDTO>>>>(
        GLOBAL_DI_TYPES.BusinessRepository,
      )
      .to(BusinessRepositoryMock);
    this.container
      .rebind<IBookingRepository<Partial<BookingRepositoryDTO>>>(GLOBAL_DI_TYPES.BookingRepository)
      .to(BookingRepositoryMock);
    this.container
      .rebind<ICourseRepository<Partial<CourseRepositoryDTO>>>(GLOBAL_DI_TYPES.CourseRepository)
      .to(CourseRepositoryMock);
    this.container
      .rebind<ICustomerRepository<Partial<CustomerRepositoryDTO>>>(
        GLOBAL_DI_TYPES.CustomerRepository,
      )
      .to(CustomerRepositoryMock);
  }
}

export const diContainer = new DIContainer();
