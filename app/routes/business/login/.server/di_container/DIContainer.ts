import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import { ActionService } from "../services/ActionService";
import type { IActionService } from "../interfaces/IActionService";
import { DI_TYPES } from "./DI_TYPES";

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService);
  }
}

export const diContainer = new DIContainer();