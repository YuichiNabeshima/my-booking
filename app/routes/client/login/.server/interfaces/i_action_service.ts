import type { HandleActionArgsDTO, HandleActionResultDTO } from "../dtos/action_service_dto";

export interface IActionService {
  handleAction(args: HandleActionArgsDTO): Promise<HandleActionResultDTO>;
}