import { AppError } from "../../domain/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../infrastructure/utils/logger";
import { HttpStatus } from "../../infrastructure/constants/HttpStatus";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.log("[ERROR-HANDLER] original error:", err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
    return;
  }
  logger.error(err);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal Server Error",
  });
};
