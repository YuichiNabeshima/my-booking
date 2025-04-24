import { BaseDIContainer } from '~/.server/di_container/BaseDIContainer';

import type { IActionService } from '../interfaces/IActionService';
import type { ILoaderService } from '../interfaces/ILoaderService';
import { ActionService } from '../services/ActionService';
import { LoaderService } from '../services/LoaderService';
import { DI_TYPES } from './DI_TYPES';

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();

    this.container.bind<ILoaderService>(DI_TYPES.LoaderService).to(LoaderService);
    this.container.bind<IActionService>(DI_TYPES.ActionService).to(ActionService);
  }
}
