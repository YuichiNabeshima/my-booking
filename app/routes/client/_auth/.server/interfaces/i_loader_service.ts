import type { GetLoaderDataDTO } from "../dtos/loader_service_dto";

export interface ILoaderService {
  getLoaderData(): Promise<GetLoaderDataDTO>;
}