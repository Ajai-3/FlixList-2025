import redisClient from '../config/redis';
import { RedisStore } from 'rate-limit-redis';
import { RateLimitRequestHandler, rateLimit } from 'express-rate-limit';
import { Request } from 'express';

type Opts = {
  windowMin: number;
  max: number;
  message: string;
  keyGen?: (req: Request) => string | Promise<string>;
  prefix?: string;
};

export function createLimit(opts: Opts): RateLimitRequestHandler {
  if (!redisClient.isOpen) {
    throw new Error('Redis client must be connected before creating rate-limit store');
  }

  return rateLimit({
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
      prefix: opts.prefix ?? 'rl:',
    }),
    windowMs: opts.windowMin * 60 * 1000,
    max: opts.max,
    message: { success: false, message: opts.message },
    keyGenerator: opts.keyGen
      ? async (req: Request) => await opts.keyGen!(req)
      : (req: Request) => req.ip || '127.0.0.1',
    standardHeaders: true,
    legacyHeaders: false,
  });
}