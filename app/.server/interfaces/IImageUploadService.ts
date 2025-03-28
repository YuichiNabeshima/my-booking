export interface IImageUploaderService {
  upload(file: File, path?: string): Promise<string>;
}