import { BaseDIContainer } from "~/.server/di_container/base_di_container";
import { ActionService } from "../services/action_service";
import type { IActionService } from "../interfaces/i_action_service";
import { TYPES } from "./types";

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<IActionService>(TYPES.ActionService).to(ActionService);
  }
}

export const diContainer = new DIContainer();