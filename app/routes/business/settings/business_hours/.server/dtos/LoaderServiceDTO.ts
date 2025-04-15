import type { BusinessHoursRepositoryDTO } from '~/.server/repositories/dtos/BusinessHoursRepositoryDTO';

export interface LoaderServiceArgsDTO {
  cookie: string;
}

export interface LoaderServiceResult {
  businessHours: BusinessHoursRepositoryDTO[];
}

export type LoaderServiceResultDTO = LoaderServiceResult;
