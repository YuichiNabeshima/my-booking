import { STATUS } from "../../constants/STATUS";
import type { ActionDTO } from "../../.server/dtos/ActionDTO";
import type { IsActionFailed } from "../../types/IsActionFailed";

export function isActionFailed(args?: ActionDTO): args is IsActionFailed {
  return args?.status === STATUS.FAILED;
}