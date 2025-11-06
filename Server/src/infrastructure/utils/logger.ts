import pino from "pino";
import { config } from "../config/env";

const createLogger = () => {
  const isProd = config.isProd === "production";

  return pino({
    level: isProd ? "info" : "debug",
    transport: !isProd
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  });
};

export const logger = createLogger();
