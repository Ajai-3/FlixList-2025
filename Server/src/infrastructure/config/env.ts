import dotenv from "dotenv";
import { logger } from "../utils/logger";
dotenv.config();

export const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  isProd: process.env.NODE_ENV ?? "development",
} as const;

export function checkEnv() {
  const missing: string[] = [];
  for (const key in config) {
    const typedKey = key as keyof typeof config;
    if (config[typedKey] === undefined || config[typedKey] === null) {
      missing.push(key);
    }
  }
  return missing;
}
