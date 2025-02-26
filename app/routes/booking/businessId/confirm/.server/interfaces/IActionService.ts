import type { ActionServiceArgsDTO, ActionServiceResultDTO } from "../dtos/ActionServiceDTO";

export interface IActionService {
  handleAction(args: ActionServiceArgsDTO): Promise<ActionServiceResultDTO>;
}