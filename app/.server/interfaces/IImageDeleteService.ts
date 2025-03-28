export interface IImageDeleteService {
  delete(key: string): Promise<boolean>;
}