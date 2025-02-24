import { createSessionStorage } from "react-router";
import Memcached from "memcached";
import { v4 as uuidv4 } from "uuid";

// Memcached configuration
const memcached = new Memcached("localhost:11211");

interface DatabaseSessionStorageOptions {
  cookie: {
    name: string;
    httpOnly: boolean;
    maxAge?: number;
    secure?: boolean;
    sameSite?: boolean | "lax" | "strict" | "none";
    path?: string;
  };
  host: string;
  port: number;
}

interface SessionData {
  [key: string]: any;
}

// Create session storage
export function createMemcachedSessionStorage({
  cookie,
}: DatabaseSessionStorageOptions) {
  return createSessionStorage<SessionData>({
    cookie,

    async createData(data, expires) {
      const id = generateSessionId(); // Create unique id
      const ttl = expires
        ? Math.floor((expires.getTime() - Date.now()) / 1000)
        : 86400; // Expiration date (seconds)

      await new Promise((resolve, reject) => {
        memcached.set(id, data, ttl, (err) => {
          if (err) reject(err);
          else resolve(id);
        });
      });

      return id;
    },

    async readData(id) {
      return await new Promise((resolve, reject) => {
        memcached.get(id, (err, data) => {
          if (err) reject(err);
          else resolve(data || null);
        });
      });
    },

    async updateData(id, data, expires) {
      const ttl = expires
        ? Math.floor((expires.getTime() - Date.now()) / 1000)
        : 86400;

      await new Promise((resolve, reject) => {
        memcached.replace(id, data, ttl, (err) => {
          if (err) reject(err);
          else resolve(null);
        });
      });
    },

    async deleteData(id) {
      await new Promise((resolve, reject) => {
        memcached.del(id, (err) => {
          if (err) reject(err);
          else resolve(null);
        });
      });
    },
  });
}

// Function for session ID generation
function generateSessionId(): string {
  return uuidv4();
}
