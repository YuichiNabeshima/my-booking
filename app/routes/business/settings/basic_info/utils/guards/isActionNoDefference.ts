import type { IsActionNoDifference, ActionDTO } from "../../.server/dtos/ActionDTO";
import { STATUS } from "../../constants/STATUS";

export function isActionNoDifference(data?: ActionDTO): data is IsActionNoDifference {
  return data?.status === STATUS.NO_DIFERRENCE;
}