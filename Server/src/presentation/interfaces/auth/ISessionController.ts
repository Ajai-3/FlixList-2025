import { Request, Response, NextFunction } from "express";

export interface ISessionController {
  bootstrap: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
  refreshToken: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
}
