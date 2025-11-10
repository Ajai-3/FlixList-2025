import { injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../../infrastructure/constants/HttpStatus";
import { IAdminAuthController } from "../../interfaces/auth/IAdminAuthController";

@injectable()
export class AdminAuthController implements IAdminAuthController {
  constructor() {}

  //# ================================================================================================================
  //# ADMIN LOGIN
  //# ================================================================================================================
  //# POST /api/v1/admin/auth/login
  //# Request body: { username or email, password }
  //# This controller allow the admin to login to their account
  //# ================================================================================================================
  adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      return res.status(HttpStatus.OK).json({ message: "Admin logged in successfully" });
    } catch (error) {
      next(error);
    }
  };

  //# ================================================================================================================
  //# ADMIN LOGOUT
  //# ================================================================================================================
  //# POST /api/v1/admin/auth/logout
  //# Request: Authorization token must be sent in headers (e.g., Bearer token)
  //# This controller helps the admin to logout from their account
  //# ================================================================================================================
  adminLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      return res.status(HttpStatus.OK).json({ message: "Admin logged in successfully" });
    } catch (error) {
      next(error);
    }
  };
}
