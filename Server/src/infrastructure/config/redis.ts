import { config } from "./env";
import { createClient } from "redis";
import { logger } from "../utils/logger";

const redisClient = createClient({
  url: config.redis_url,
});

redisClient.on("error", (err) => logger.info(`Redis Client Error ${err}`));

export const connectRedis = async () => {
  await redisClient.connect();
  logger.info("Connected to Redis!");
};

export const disconnectRedis = () => {
   redisClient.destroy();
   logger.info('redis client disconnected');
};

export default redisClient;
