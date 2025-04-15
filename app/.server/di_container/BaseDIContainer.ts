// External libraries
import { Container } from 'inversify';

import { Logger } from '~/.server/core/logger/Logger';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import type { ITransactionManager } from '~/.server/core/transaction/ITransactionManager';
import { TransactionManager } from '~/.server/core/transaction/TransactionManager';

// Other implementations and type definitions
import { AuthStateChecker } from '../core/auth/AuthStateChecker';
import type { IAuthStateChecker } from '../core/auth/IAuthStateChecker';
import type { IImageStorage } from '../core/image_storage/IImageStorage';
import { ImageStorage } from '../core/image_storage/ImageStorage';
import type { ILogger } from '../core/logger/ILogger';
import { SessionStorageManager } from '../core/session/SessionStorageManager';
// Repository implementations
import { BookingCapacityRepository } from '../repositories/entities/BookingCapacityRepository';
import { BookingRepository } from '../repositories/entities/BookingRepository';
import { BusinessHoursRepository } from '../repositories/entities/BusinessHoursRepository';
import { BusinessPictureRepository } from '../repositories/entities/BusinessPictureRepository';
import { BusinessRepository } from '../repositories/entities/BusinessRepository';
import { BusinessTagRepository } from '../repositories/entities/BusinessTagRepository';
import { CourseRepository } from '../repositories/entities/CourseRepository';
import { CustomerRepository } from '../repositories/entities/CustomerRepository';
import { MailLogRepository } from '../repositories/entities/MailLogRepository';
import { MailQueRepository } from '../repositories/entities/MailQueRepository';
// Repository interfaces
import type { IBookingCapacityRepository } from '../repositories/interfaces/IBookingCapacityRepository';
import type { IBookingRepository } from '../repositories/interfaces/IBookingRepository';
import type { IBusinessHoursRepository } from '../repositories/interfaces/IBusinessHoursRepository';
import type { IBusinessPictureRepository } from '../repositories/interfaces/IBusinessPictureRepository';
import type { IBusinessRepository } from '../repositories/interfaces/IBusinessRepository';
import type { IBusinessTagRepository } from '../repositories/interfaces/IBusinessTagRepository';
import type { ICourseRepository } from '../repositories/interfaces/ICourseRepository';
import type { ICustomerRepository } from '../repositories/interfaces/ICustomerRepository';
import type { IMailLogRepository } from '../repositories/interfaces/IMailLogRepository';
import type { IMailQueRepository } from '../repositories/interfaces/IMailQueRepository';
// Local type definitions and implementations
import { GLOBAL_DI_TYPES } from './GLOBAL_DI_TYPES';

export class BaseDIContainer {
  constructor(protected container: Container = new Container()) {
    this.container.bind<ILogger>(GLOBAL_DI_TYPES.Logger).to(Logger);
    this.container
      .bind<ITransactionManager>(GLOBAL_DI_TYPES.TransactionManager)
      .to(TransactionManager);
    this.container
      .bind<ISessionStorageManager>(GLOBAL_DI_TYPES.SessionStorageManager)
      .to(SessionStorageManager);
    this.container.bind<IAuthStateChecker>(GLOBAL_DI_TYPES.AuthStateChecker).to(AuthStateChecker);
    this.container.bind<IImageStorage>(GLOBAL_DI_TYPES.ImageStorage).to(ImageStorage);

    // Repositories
    this.container
      .bind<IBusinessRepository>(GLOBAL_DI_TYPES.BusinessRepository)
      .to(BusinessRepository);
    this.container
      .bind<IBookingRepository>(GLOBAL_DI_TYPES.BookingRepository)
      .to(BookingRepository);
    this.container
      .bind<IBookingCapacityRepository>(GLOBAL_DI_TYPES.BookingCapacityRepository)
      .to(BookingCapacityRepository);
    this.container.bind<ICourseRepository>(GLOBAL_DI_TYPES.CourseRepository).to(CourseRepository);
    this.container
      .bind<ICustomerRepository>(GLOBAL_DI_TYPES.CustomerRepository)
      .to(CustomerRepository);
    this.container
      .bind<IMailQueRepository>(GLOBAL_DI_TYPES.MailQueRepository)
      .to(MailQueRepository);
    this.container
      .bind<IMailLogRepository>(GLOBAL_DI_TYPES.MailLogRepository)
      .to(MailLogRepository);
    this.container
      .bind<IBusinessPictureRepository>(GLOBAL_DI_TYPES.BusinessPictureRepository)
      .to(BusinessPictureRepository);
    this.container
      .bind<IBusinessTagRepository>(GLOBAL_DI_TYPES.BusinessTagRepository)
      .to(BusinessTagRepository);
    this.container
      .bind<IBusinessHoursRepository>(GLOBAL_DI_TYPES.BusinessHoursRepostory)
      .to(BusinessHoursRepository);
  }

  public getContainer() {
    return this.container;
  }
}
