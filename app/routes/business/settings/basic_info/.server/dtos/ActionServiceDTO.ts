import type { BusinessRepositoryDTO } from "~/.server/repositories/dtos/BusinessRepositoryDTO";

export interface ActionServiceArgsDTO {
  cookie: string;
  name: string;
  email: string;
}

export type ActionServiceResultDTO = BusinessRepositoryDTO | null;