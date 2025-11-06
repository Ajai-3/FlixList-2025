import pino from "pino";
import { config } from "../config/env";

const isProd = config.isProd === "production";

export const logger = pino({
  level: isProd ? "info" : "debug", 
  transport: isProd
    ? undefined 
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
});
