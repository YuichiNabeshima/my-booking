import type { IsActionFailed } from "../../types/IsActionFailed";
import type { IsActionNoDifference } from "../../types/IsActionNoDifference";
import type { IsActionSuccess } from "../../types/IsActionSuccess";

export type ActionDTO = IsActionSuccess | IsActionNoDifference | IsActionFailed;