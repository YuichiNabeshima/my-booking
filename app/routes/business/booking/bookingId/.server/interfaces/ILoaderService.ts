import type { LoaderServiceArgsDTO, LoaderServiceResultDTO } from '../dtos/LoaderServiceDTO';

export interface ILoaderService {
  execute(args: LoaderServiceArgsDTO): Promise<LoaderServiceResultDTO>;
}
