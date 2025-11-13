import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL || "",
  redis_url: process.env.REDIS_URL,
  frontend_url: process.env.FRONTEND_URL || "",
  isProd: process.env.NODE_ENV ?? "development",

  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
    accessTokenExpiry: (process.env.ACCESS_TOKEN_EXPIRY ||
      "5m") as jwt.SignOptions["expiresIn"],
    refreshTokenExpiry: (process.env.REFRESH_TOKEN_EXPIRY ||
      "30d") as jwt.SignOptions["expiresIn"],
  },

  emailToken: {
    secret: process.env.EMAIL_TOKEN_SECRET || "",
    expiresIn: (process.env.EMAIL_TOKEN_EXPIRY ||
      "5m") as jwt.SignOptions["expiresIn"],
  },

  email: {
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    user: process.env.EMAIL_USER || "artchain001@gmail.com",
    pass: process.env.EMAIL_PASS || "tocq irpj hbbb ettz",
    fromName: process.env.EMAIL_FROM_NAME || "ArtChain",
    fromAddress: process.env.EMAIL_FROM_ADDRESS || "artchain001@gmail.com",
    secure: process.env.EMAIL_SECURE === "true",
  },
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
