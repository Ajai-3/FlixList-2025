// src/infrastructure/rateLimit/index.ts
import { createLimit } from "./createLimit";
import { testLimitConfig } from "./rules/test";
import { RateLimitRequestHandler } from "express-rate-limit";

type LimitRegistry = {
  testLimit?: RateLimitRequestHandler;
};

export const limits: LimitRegistry = {}; 

export const initRateLimits = () => {
  limits.testLimit = createLimit(testLimitConfig);
};
