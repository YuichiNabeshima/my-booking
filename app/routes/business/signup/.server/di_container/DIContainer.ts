import { BaseDIContainer } from "~/.server/di_container/BaseDIContainer";
import { ActionService } from "../services/ActionService";
import { DI_TYPES } from "./ID_TYPES";
import type { IActionService } from "../interfaces/IActionService";

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService)
  }
}

export const diContainer = new DIContainer();