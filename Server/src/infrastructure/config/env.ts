import dotenv from "dotenv";
import { logger } from "../utils/logger";
dotenv.config();

export const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL || "",
  redis_url: process.env.REDIS_URL,
  isProd: process.env.NODE_ENV ?? "development",
} as const;

export function checkEnv() {
  const missing: string[] = [];
  for (const key in config) {
    const typedKey = key as keyof typeof config;
    if (!config[typedKey]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }
}
