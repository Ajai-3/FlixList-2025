import { AppError } from "../../domain/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../infrastructure/utils/logger";
import { HttpStatus } from "../../infrastructure/constants/HttpStatus";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  logger.error(err); 
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};