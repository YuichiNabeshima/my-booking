import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import type { ILoaderService } from "../interfaces/ILoaderService";
import { DI_TYPES } from "./DI_TYPES";
import { LoaderService } from "../services/LoaderService";

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
  }
}