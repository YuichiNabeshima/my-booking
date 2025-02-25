import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/lib/firebase";
import type { HandleActionArgsDTO, HandleActionResultDTO } from "../dtos/action_service_dto";
import type { IActionService } from "../interfaces/i_action_service";
import { NoEmailError } from "../custom_errors/no_email_error";

export class ActionService implements IActionService {
  constructor() {}

  async handleAction(args: HandleActionArgsDTO): Promise<HandleActionResultDTO> {
    const { email, password } = args;

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const emailResult = userCredential.user.email;

    if (!emailResult) {
      throw new NoEmailError('This client does not have an email address.');
    }

    return {
      email: emailResult,
    };
  }
}