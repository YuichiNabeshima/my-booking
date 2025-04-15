import type { IsSuccess, LoaderResultDTO } from '../../.server/dtos/LoaderResultDTO';
import { STATUS } from '../../constants/STATUS';

export function isSuccess(data: LoaderResultDTO): data is IsSuccess {
  return data?.status === STATUS.SUCCESS;
}
