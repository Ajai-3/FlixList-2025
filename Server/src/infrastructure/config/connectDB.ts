import mongoose from "mongoose";
import { config } from "./env";
import { logger } from "../utils/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.db_url);
    logger.info("✅ DataBase connected successfully");
  } catch (error) {
    logger.error(`❌ Failed to connect DB ${error}`);
    process.exit(1);
  }
};
