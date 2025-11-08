import { config } from './env';
import { createClient } from 'redis';
import { logger } from '../utils/logger';

const redisClient = createClient({ url: config.redis_url });

redisClient.on('error', (e) => logger.error('[Redis] error:', e));

export const connectRedis = async () => {
  if (!redisClient.isOpen) await redisClient.connect();
  logger.info('Connected to Redis!');
};

export const disconnectRedis = async () => {
  await redisClient.disconnect();
  logger.info('Redis disconnected');
};

export const getRedis = () => redisClient; 

export default redisClient;