import { BaseRepository } from "~/.server/repositories/base/BaseRepository";
import type { BusinessRepositoryDTO } from "~/.server/repositories/dtos/BusinessRepositoryDTO";
import type { IBusinessRepository } from "~/.server/repositories/interfaces/IBusinessRepository";

export class BusinessRepositoryMock
  extends BaseRepository<{ TModel: Partial<BusinessRepositoryDTO> } >
  implements Partial<IBusinessRepository<Partial<BusinessRepositoryDTO>>> {

  async fetch(args: unknown): Promise<Partial<BusinessRepositoryDTO> | null> {
    void args;

    return {
      id: 1,
      name: 'Sample Store',
    };
  }
}