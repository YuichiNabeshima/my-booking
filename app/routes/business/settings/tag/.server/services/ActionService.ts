import { inject, injectable } from 'inversify';

import { InvalidAuthError } from '~/.server/core/custom_error/errors/InvalidAuthError';
import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';
import { GLOBAL_DI_TYPES } from '~/.server/di_container/GLOBAL_DI_TYPES';
import type { IBusinessTagRepository } from '~/.server/repositories/interfaces/IBusinessTagRepository';

import { mapValueToDbKey } from '../../utils/mapValueToDbKey';
import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';
import type { IActionService } from '../interfaces/IActionService';

@injectable()
export class ActionService implements IActionService {
  constructor(
    @inject(GLOBAL_DI_TYPES.SessionStorageManager)
    private SessionStorageManager: ISessionStorageManager,
    @inject(GLOBAL_DI_TYPES.BusinessTagRepository)
    private businessTagRepository: IBusinessTagRepository,
  ) {}

  async execute({ cookie, tags: newTags }: ActionServiceArgsDTO): Promise<ActionServiceResultDTO> {
    const session = await this.SessionStorageManager.getSession(cookie);

    if (!session?.data || !session.data.id) {
      throw new InvalidAuthError('Invalid auth.');
    }

    const tags = await this.businessTagRepository.fetchAll({ business_id: session.data.id });
    const newTagsMapedToDb = newTags.map((tag) => mapValueToDbKey(tag));

    const hasChanged = (
      original: { name: string; time_duration?: number } | undefined,
      updated: { name: string; time_duration?: number },
    ) => {
      if (original?.name !== updated.name) {
        return true;
      }
      if (original?.time_duration !== updated.time_duration) {
        return true;
      }
      return false;
    };

    const toRegister = newTagsMapedToDb.filter((item) => item.id === undefined);
    const toUpdate = newTagsMapedToDb.filter(
      (item) =>
        item.id !== undefined &&
        hasChanged(
          tags.find((original) => original.id === item.id),
          item,
        ),
    );

    const toDelete = tags.filter((tag) => !newTagsMapedToDb.some((newtag) => newtag.id === tag.id));

    if (toRegister.length === 0 && toUpdate.length === 0 && toDelete.length === 0) {
      return false;
    }

    toRegister.forEach(async (tag) => {
      await this.businessTagRepository.create({ name: tag.name, business_id: session.data.id });
    });

    toUpdate.forEach(async (tag) => {
      await this.businessTagRepository.update({ where: { id: tag.id }, data: { name: tag.name } });
    });

    toDelete.forEach(async (tag) => {
      await this.businessTagRepository.remove({ id: tag.id });
    });

    return true;
  }
}
