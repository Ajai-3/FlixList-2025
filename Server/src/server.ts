import http from "http";
import { logger } from "./infrastructure/utils/logger";
import { connectRedis } from "./infrastructure/config/redis";
import { connectDB } from "./infrastructure/config/connectDB";
import { checkEnv, config } from "./infrastructure/config/env";
import { initRateLimits } from "./infrastructure/rateLimit";


const PORT = config.port;


checkEnv();
await connectDB();
await connectRedis();
initRateLimits()

const { default: app } = await import("./app");  

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} 🎥`);
});
