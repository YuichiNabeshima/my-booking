import type { ActionServiceArgsDTO, ActionServiceResultDTO } from '../dtos/ActionServiceDTO';

export interface IActionService {
  execute(args: ActionServiceArgsDTO): Promise<ActionServiceResultDTO>;
}
