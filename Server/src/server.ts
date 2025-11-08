import http from "http";
import app from "./app";
import { logger } from "./infrastructure/utils/logger";
import { connectRedis } from "./infrastructure/config/redis";
import { connectDB } from "./infrastructure/config/connectDB";
import { checkEnv, config } from "./infrastructure/config/env";
import { initRateLimits } from "./infrastructure/rateLimit";


const PORT = config.port;

const server = http.createServer(app);

checkEnv();
await connectDB();
await connectRedis();
initRateLimits()

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} 🎥`);
});
