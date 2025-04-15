import { compare } from '@node-rs/bcrypt';
import { inject } from 'inversify';

import { BusinessNotFoundError } from '~/.server/core/custom_error/errors/repositories/BusinessNotFoundError';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessRepository } from '~/.server/repositories/interfaces/IBusinessRepository';

import { PasswordInvalidError } from '../custom_errors/PasswordInvalidError';
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.BusinessRepository) private businessRepository: IBusinessRepository,
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
  ) {}

  async execute(args: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const { email, password } = args;

    const business = await this.businessRepository.fetch({ email });

    if (!business) {
      throw new BusinessNotFoundError('Invalid credentials.');
    }

    const isPasswordValid = await compare(password, business.password);

    if (!isPasswordValid) {
      throw new PasswordInvalidError('Invalid credentials.');
    }

    const session = await this.SessionStorageManager.getSession();
    session.set('id', business.id);
    const setCookieHeader = await this.SessionStorageManager.commitSession(session);

    return {
      cookie: setCookieHeader,
    };
  }
}
