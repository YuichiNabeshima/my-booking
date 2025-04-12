import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import { GLOBAL_DI_TYPES } from "~/.server/di_container/GLOBAL_DI_TYPES";
import type { BusinessRepositoryDTO } from "~/.server/repositories/dtos/BusinessRepositoryDTO";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";
import type { IImageStorage } from "~/.server/core/image_storage/IImageStorage";
import { BusinessRepositoryMock } from "../mocks/BusinessRepositoryMock";
import { ImageStorageMock } from "../mocks/ImageStorageMock";
import { LoaderService } from "../services/LoaderService";
import type { ILoaderService } from "../interfaces/ILoaderService";
import { DI_TYPES } from "./DI_TYPES";

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
  }

  bindMock() {
    this.container.rebind<Partial<IBusinessRepository<Partial<BusinessRepositoryDTO>>>>(GLOBAL_DI_TYPES.BusinessRepository).to(BusinessRepositoryMock);
    this.container.rebind<Partial<IImageStorage>>(GLOBAL_DI_TYPES.ImageStorage).to(ImageStorageMock);
  }
}