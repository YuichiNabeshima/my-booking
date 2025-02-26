import { Container } from "inversify";
import { Logger } from "~/.server/server_utils/logger/logger";
import { TransactionManager } from "~/.server/core/transaction/transaction_manager";
import type { ILogger } from "../interfaces/i_logger";
import type { ITransactionManager } from "../interfaces/i_transaction_manager";

// Repositories
import { ClientRepository } from "../repositories/entities/client_repository";
import { GLOBAL_DI_TYPES } from "./global_di_types";
import type { IClientRepository } from "../repositories/interfaces/i_client_repository";

export class BaseDIContainer {
  constructor(
    protected container: Container = new Container(),
  ) {
    this.container.bind<ILogger>(GLOBAL_DI_TYPES.Logger).to(Logger);
    this.container.bind<ITransactionManager>(GLOBAL_DI_TYPES.TransactionManager).to(TransactionManager);

    this.container.bind<IClientRepository>(GLOBAL_DI_TYPES.ClientRepository).to(ClientRepository);
  }

  public getContainer() {
    return this.container;
  }
}
