import type { HandleActionArgsDTO, HandleActionResultDTO } from '../dtos/ActionServiceDTO';

export interface IActionService {
  handleAction(args: HandleActionArgsDTO): Promise<HandleActionResultDTO>;
}
