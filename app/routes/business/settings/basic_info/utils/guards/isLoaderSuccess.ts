import type { IsSuccess, LoaderDTO } from '../../.server/dtos/LoaderDTO';

export function isLoaderSuccess(data: LoaderDTO): data is IsSuccess {
  return !!data;
}
