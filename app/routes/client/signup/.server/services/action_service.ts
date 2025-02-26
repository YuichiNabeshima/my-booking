import { createUserWithEmailAndPassword } from "firebase/auth";
import { inject, injectable } from "inversify";
import { auth } from "~/lib/firebase";
import type { IClientRepository } from "~/.server/repositories/interfaces/i_client_repository";
import { STATUS } from "~/config/const/status";
import { ClientAlreadyExists } from "../custom_errors/client_already_exists";
import { TYPES } from "../di_container/types";
import type { HandleActionArgsDTO, HandleActionResultDTO } from "../dtos/action_service_dto";
import type { IActionService } from "../interfaces/i_action_service";

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(TYPES.ClientRepository) private clientRepository: IClientRepository,
  ){}

  async handleAction(args: HandleActionArgsDTO): Promise<HandleActionResultDTO> {
    const { name, email, password } = args;

    const client = await this.clientRepository.fetch({ email });

    if (client) {
      throw new ClientAlreadyExists('This client already exsits.');
    }

    await createUserWithEmailAndPassword(auth, email, password);

    await this.clientRepository.create({
      name,
      email,
    });

    return {
      status: STATUS.REDIRECT,
      redirectTo: '/client/',
    };
  }
}