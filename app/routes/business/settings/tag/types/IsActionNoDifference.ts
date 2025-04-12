import type { Submission } from "@conform-to/react";
import type { STATUS } from "../constants/STATUS";

export interface IsActionNoDifference {
  status: typeof STATUS.NO_DIFFERENCE;
  lastResult: Submission<string>;
}