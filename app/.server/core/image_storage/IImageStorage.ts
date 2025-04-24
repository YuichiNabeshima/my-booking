export interface IImageStorage {
  getImageUrl(key: string): string;
  upload(file: File, path?: string): Promise<string>;
  delete(key: string): Promise<boolean>;
  listKeys(path?: string): Promise<string[]>;
}
