import { injectable } from 'inversify';
import type { Session } from 'react-router';
import { createCookie, createSessionStorage } from 'react-router';
import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

import type { ISessionStorageManager } from '~/.server/core/session/ISessionStorageManager';

@injectable()
export class SessionStorageManager implements ISessionStorageManager {
  private redis: RedisClientType;
  private sessionStorage;

  constructor() {
    const redisClient = createClient({
      url: process.env.REDIS_ENDPOINT,
      ...(process.env.NODE_ENV === 'production' && {
        password: process.env.REDIS_PASSWORD,
        socket: {
          tls: true,
          reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
        },
      }),
    }) as unknown as RedisClientType;
    redisClient.connect();
    this.redis = redisClient;

    const sessionCookie = createCookie('session', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      secrets: [process.env.SESSION_SECRET as string],
    });

    this.sessionStorage = createSessionStorage({
      cookie: sessionCookie,
      createData: async (data: Record<string, unknown>, expires?: Date) => {
        const sessionId = crypto.randomUUID();
        await this.redis.set(sessionId, JSON.stringify(data), {
          PX: expires ? expires.getTime() - Date.now() : 1000 * 60 * 60 * 24, // 24hours
        });
        return sessionId;
      },
      readData: async (id: string) => {
        const data = await this.redis.get(id);
        return data ? JSON.parse(data) : null;
      },
      updateData: async (id: string, data: Record<string, unknown>) => {
        await this.redis.set(id, JSON.stringify(data));
      },
      deleteData: async (id: string) => {
        await this.redis.del(id);
      },
    });
  }

  async getSession(cookieHeader?: string) {
    return await this.sessionStorage.getSession(cookieHeader);
  }

  async commitSession(session: Session) {
    return await this.sessionStorage.commitSession(session);
  }

  async destroySession(session: Session) {
    return await this.sessionStorage.destroySession(session);
  }
}
