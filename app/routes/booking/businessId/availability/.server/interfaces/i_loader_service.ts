import type { GetLoaderDataArgsDTO, GetLoaderDataDTO } from "../dtos/loader_service_dto";

export interface ILoaderService {
  getLoaderData(args: GetLoaderDataArgsDTO): Promise<GetLoaderDataDTO>;
}