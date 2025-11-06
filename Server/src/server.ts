import http from "http";
import app from "./app";
import { config } from "./infrastructure/config/env";
import { logger } from "./infrastructure/utils/logger";
import { connectDB } from "./infrastructure/config/connectDB";

const PORT = config.port;

const server = http.createServer(app);

connectDB();

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT} 🎥`);
});
