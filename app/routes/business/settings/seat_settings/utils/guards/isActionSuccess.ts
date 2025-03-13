import { STATUS } from "../../constants/STATUS";
import type { ActionDTO } from "../../.server/dtos/ActionDTO";
import type { IsActionSuccess } from "../../types/IsActionSuccess";

export function isActionSuccess(args?: ActionDTO): args is IsActionSuccess {
  return args?.status === STATUS.SUCCESS;
}