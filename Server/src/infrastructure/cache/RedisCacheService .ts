import { injectable } from "inversify";
import redisClient from "../config/redis";
import { ICacheClient } from "../../domain/repositories/ICacheClient";

@injectable()
export class RedisCacheService implements ICacheClient {
  async setEx(key: string, ttl: number, value: string): Promise<void> {
    await redisClient.setEx(key, ttl, value);
  }

  async get(key: string): Promise<string | null> {
    return await redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await redisClient.del(key);
  }
}
