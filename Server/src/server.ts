import http from "http";
import app from "./app";
import { logger } from "./infrastructure/utils/logger";
import { connectDB } from "./infrastructure/config/connectDB";
import { checkEnv, config } from "./infrastructure/config/env";

const PORT = config.port;

const server = http.createServer(app);

checkEnv();
connectDB();

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} 🎥`);
});
