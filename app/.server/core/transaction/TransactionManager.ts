import { AsyncLocalStorage } from 'node:async_hooks';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import { prisma } from '~/lib/prisma/client';
import type { ITransactionManager } from './ITransactionManager';

@injectable()
export class TransactionManager implements ITransactionManager<PrismaClient> {
  private asyncLocalStorage = new AsyncLocalStorage<PrismaClient>();

  constructor() {
    if (!prisma) throw new Error('PrismaClient must be initialized before using PrismaTransactionManager');
  }

  async execute<T>(callback: () => Promise<T>): Promise<T> {
    return prisma.$transaction(async (tx) => {
      return this.asyncLocalStorage.run(tx as PrismaClient, callback);
    });
  }

  getClient(): PrismaClient {
    const client = this.asyncLocalStorage.getStore();
    if (client) {
      return client;
    }
    return prisma;
  }
}
