import { PrismaClient } from '@prisma/client';

export interface ITransactionManager<Client = PrismaClient> {
  execute<T>(callback: () => Promise<T>): Promise<T>;
  getClient(): Client;
}
