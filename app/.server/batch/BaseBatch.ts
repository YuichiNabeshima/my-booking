import { injectable } from 'inversify';

@injectable()
export abstract class BaseBatch {
  public params: string[] = [];

  constructor() {}

  abstract run(): Promise<void>;
}
