import { Request, Response, NextFunction } from "express";
import { logger } from "../../infrastructure/utils/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
};
