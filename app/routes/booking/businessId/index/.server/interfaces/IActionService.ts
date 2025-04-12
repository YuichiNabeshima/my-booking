import type { HandleActionArgsDTO, HandleActionResultDTO } from "../dtos/ActionServiceDTO";

export interface IActionService {
  execute(args: HandleActionArgsDTO): Promise<HandleActionResultDTO>;
}