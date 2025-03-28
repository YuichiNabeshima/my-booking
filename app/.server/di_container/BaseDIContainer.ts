import { Container } from "inversify";
import { GLOBAL_DI_TYPES } from "./GLOBAL_DI_TYPES";
import { Logger } from "~/.server/server_utils/logger/logger";
import { TransactionManager } from "~/.server/core/transaction/transaction_manager";
import { SessionStorageService } from "../services/session/SessionStorageService";
import type { ILogger } from "../interfaces/i_logger";
import type { ITransactionManager } from "../interfaces/i_transaction_manager";
import type { ISessionStorageService } from "../interfaces/ISessionStorageService";
import type { IAuthRedirectService } from "../services/auth/auth_redirect_service/IAuthRedirectService";
import { AuthRedirectService } from "../services/auth/auth_redirect_service/AuthRedirectService";

// Repositories
import { BusinessRepository } from "../repositories/entities/BusinessRepository";
import type { IBusinessRepository } from "../repositories/interfaces/IBusinessRepository";
import { BookingRepository } from "../repositories/entities/BookingRepository";
import type { IBookingRepository } from "../repositories/interfaces/IBookingRepository";
import { BookingCapacityRepository } from "../repositories/entities/BookingCapacityRepository";
import type { IBookingCapacityRepository } from "../repositories/interfaces/IBookingCapacityRepository";
import { CourseRepository } from "../repositories/entities/CourseRepository";
import type { ICourseRepository } from "../repositories/interfaces/ICourseRepository";
import type { IMailQueRepository } from "../repositories/interfaces/IMailQueRepository";
import { MailQueRepository } from "../repositories/entities/MailQueRepository";
import type { IMailLogRepository } from "../repositories/interfaces/IMailLogRepository";
import { MailLogRepository } from "../repositories/entities/MailLogRepository";
import type { ICustomerRepository } from "../repositories/interfaces/ICustomerRepository";
import { CustomerRepository } from "../repositories/entities/CustomerRepository";
import type { IBusinessPictureRepository } from "../repositories/interfaces/IBusinessPictureRepository";
import { BusinessPictureRepository } from "../repositories/entities/BusinessPictureRepository";
import type { IImageUploaderService } from "../interfaces/IImageUploadService";
import { ImageUploaderService } from "../services/image_handler/ImageUploaderService";
import type { IImageGetService } from "../interfaces/IImageGetService";
import { ImageGetService } from "../services/image_handler/ImageGetService";
import type { IImageDeleteService } from "../interfaces/IImageDeleteService";
import { ImageDeleteService } from "../services/image_handler/ImageDeleteService";

export class BaseDIContainer {
  constructor(
    protected container: Container = new Container(),
  ) {
    this.container.bind<ILogger>(GLOBAL_DI_TYPES.Logger).to(Logger);
    this.container.bind<ITransactionManager>(GLOBAL_DI_TYPES.TransactionManager).to(TransactionManager);
    this.container.bind<ISessionStorageService>(GLOBAL_DI_TYPES.SessionStorageService).to(SessionStorageService);
    this.container.bind<IAuthRedirectService>(GLOBAL_DI_TYPES.AuthRedirectService).to(AuthRedirectService);
    this.container.bind<IImageUploaderService>(GLOBAL_DI_TYPES.ImageUploaderService).to(ImageUploaderService);
    this.container.bind<IImageGetService>(GLOBAL_DI_TYPES.ImageGetService).to(ImageGetService);
    this.container.bind<IImageDeleteService>(GLOBAL_DI_TYPES.ImageDeleteService).to(ImageDeleteService);

    // Repositories
    this.container.bind<IBusinessRepository>(GLOBAL_DI_TYPES.BusinessRepository).to(BusinessRepository);
    this.container.bind<IBookingRepository>(GLOBAL_DI_TYPES.BookingRepository).to(BookingRepository);
    this.container.bind<IBookingCapacityRepository>(GLOBAL_DI_TYPES.BookingCapacityRepository).to(BookingCapacityRepository);
    this.container.bind<ICourseRepository>(GLOBAL_DI_TYPES.CourseRepository).to(CourseRepository);
    this.container.bind<ICustomerRepository>(GLOBAL_DI_TYPES.CustomerRepository).to(CustomerRepository);
    this.container.bind<IMailQueRepository>(GLOBAL_DI_TYPES.MailQueRepository).to(MailQueRepository);
    this.container.bind<IMailLogRepository>(GLOBAL_DI_TYPES.MailLogRepository).to(MailLogRepository);
    this.container.bind<IBusinessPictureRepository>(GLOBAL_DI_TYPES.BusinessPictureRepository).to(BusinessPictureRepository);
  }

  public getContainer() {
    return this.container;
  }
}
