import type { RedisClientType } from 'redis';
import { createClient } from 'redis';

export class QueueLoop {
  private redis!: RedisClientType;
  constructor() {}

  async init() {
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
    await redisClient
      .connect()
      .then(() => console.log('Connected to Redis successfully'))
      .catch((err) => {
        console.error('Failed to connect to Redis:', err);
      });
    this.redis = redisClient;
  }

  async addQueue(key: string, values: string[]) {
    if (values.length) {
      await this.redis.sAdd(key, values);
    }
  }

  async popValues<T>(key: string, length: number = 50) {
    const results = await this.redis.sPop(key, length);
    if (!results) return [];

    console.log('count: ', results.length);
    return results as T[];
  }

  async clear(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async quit() {
    await this.redis.quit();
  }
}
