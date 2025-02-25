import { inject, injectable } from "inversify";
import { auth } from "~/lib/firebase";
import type { ILoaderService } from "../interfaces/i_loader_service";
import type { GetLoaderDataDTO } from "../dtos/loader_service_dto";
import { TYPES as REPOSITORY_TYPES } from "~/.server/di_container/types";
import type { IClientRepository } from "~/.server/repositories/interfaces/i_client_repository";
import { NoClientError } from "../custom_errors/no_client_error";

@injectable()
export class LoaderService implements ILoaderService {
  constructor(
    @inject(REPOSITORY_TYPES.ClientRepository) private clientRepository: IClientRepository,
  ){}

  async getLoaderData(): Promise<GetLoaderDataDTO> {
    const userCredential = auth.currentUser;

    if (!userCredential?.email) {
      return {
        status: 'redirect',
        redirectTo: '/client/login/',
      };
    }

    const client = await this.clientRepository.fetch({ email: userCredential.email });

    if (!client) {
      throw new NoClientError('No client.');
    }

    return {
      status: 'authenticated',
      client: {
        id: client.id,
        email: client.email,
        name: client.name,
      },
    };
  }
}