import type { STATUS } from "../constants/STATUS";
import type { Course } from "./Course";

export interface IsActionSuccess {
  status: typeof STATUS.SUCCESS;
  courses: Course[];
}