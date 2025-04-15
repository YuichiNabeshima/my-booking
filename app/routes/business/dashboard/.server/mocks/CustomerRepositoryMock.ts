import { BaseRepository } from '~/.server/repositories/base/BaseRepository';
import type { CustomerRepositoryDTO } from '~/.server/repositories/dtos/CustomerRepositoryDTO';
import type { ICustomerRepository } from '~/.server/repositories/interfaces/ICustomerRepository';

export class CustomerRepositoryMock
  extends BaseRepository<{ TModel: Partial<CustomerRepositoryDTO> }>
  implements ICustomerRepository<Partial<CustomerRepositoryDTO>>
{
  async fetch(args: unknown): Promise<Partial<CustomerRepositoryDTO> | null> {
    void args;
    return {
      name: 'Yuichi Nabeshima',
      email: 'yuichi.nabeshima@test.com',
    };
  }
}
