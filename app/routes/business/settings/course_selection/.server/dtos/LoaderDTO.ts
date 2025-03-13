import type { STATUS } from "../../constants/STATUS";
import type { Course } from "../../types/Course";

export interface IsSuccess {
  status: typeof STATUS.SUCCESS;
  courses: Course[],
}

export type LoaderDTO = IsSuccess | null | Response;