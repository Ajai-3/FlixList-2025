import { Request, Response, NextFunction } from "express";
import { ISessionController } from "../../interfaces/auth/ISessionController.js";

export class SessionController implements ISessionController {
  constructor() {}

  //# ================================================================================================================
  //# BOOTSTRAP
  //# ================================================================================================================
  //# GET /api/v1/auth/bootstrap
  //# Returns user/admin info and access token if session is valid
  //# ================================================================================================================
  bootstrap = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
    } catch (error) {
      next(error);
    }
  };

  //# ================================================================================================================
  //# REFRESH TOKEN
  //# ================================================================================================================
  //# GET /api/v1/auth/refresh-token
  //# Returns a new access token using the refresh token in HTTP-only cookie
  //# ================================================================================================================
  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
