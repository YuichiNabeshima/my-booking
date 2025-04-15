import type { ActionDTO } from '../../.server/dtos/ActionDTO';
import { STATUS } from '../../constants/STATUS';
import type { IsActionNoDifference } from '../../types/IsActionNoDifference';

export function isActionNodiffrence(args?: ActionDTO): args is IsActionNoDifference {
  return args?.status === STATUS.NO_DIFFERENCE;
}
