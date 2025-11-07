import { Request, Response, NextFunction } from "express";

export interface IUserAuthController {
     userLogin(req: Request, res: Response, next: NextFunction): Promise<Response | void>
     userRegister(req: Request, res: Response, next: NextFunction): Promise<Response | void>
     userLogout(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}