import { BaseDIContainer } from '~/.server/di_container/BaseDIContainer';

import type { IActionService } from '../interfaces/IActionService';
import { ActionService } from '../services/ActionService';
import { DI_TYPES } from './ID_TYPES';

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService);
  }
}
