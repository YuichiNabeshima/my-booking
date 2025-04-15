import { BaseDIContainer } from '~/.server/di_container/BaseDIContainer';

class DIContainer extends BaseDIContainer {
  constructor() {
    super();
  }
}

export const diContainer = new DIContainer();
