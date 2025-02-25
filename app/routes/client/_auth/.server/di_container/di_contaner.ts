import { BaseDIContainer } from "~/.server/di_container/base_di_container";
import { TYPES } from "./types";
import type { ILoaderService } from "../interfaces/i_loader_service";
import { LoaderService } from "../services/loader_service";

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<ILoaderService>(TYPES.LoaderService).to(LoaderService);
  }
}

export const diContainer = new DIContainer();