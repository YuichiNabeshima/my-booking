import type { STATUS } from "../../constants/STATUS";
import type { CourseFromLoader } from "./LoaderServiceDTO";

interface IsSuccess {
  status: typeof STATUS.SUCCESS;
  courses: CourseFromLoader;
}

interface IsFailed {
  status: typeof STATUS.FAILED;
}

export type LoaderResultDTO = IsSuccess | IsFailed;