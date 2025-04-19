import { BaseDIContainer } from '~/.server/di_container/BaseDIContainer';

import { TestBatch } from '../common/TestBatch';
import { BATCH_DI_TYPES } from './BATCH_DI_TYPES';

export class DIContainer extends BaseDIContainer {
  constructor() {
    super();
    this.container.bind(BATCH_DI_TYPES.testBatch).to(TestBatch);
  }
}
