import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../../infrastructure/invercify/types";
import { HttpStatus } from "../../../infrastructure/constants/HttpStatus";
import { IUserAuthController } from "../../interfaces/auth/IUserAuthController";
import { UserRegisterDTO } from "./../../../application/interfaces/dto/auth/UserRegisterDTO";
import { IResendOtpUseCase } from "../../../application/interfaces/usecase/auth/IResendOtpUseCase";
import { IUserRegisterUseCase } from "../../../application/interfaces/usecase/auth/IUserRegisterUseCase";
import { IVerifyPendingUserUseCase } from "../../../application/interfaces/usecase/auth/IVerifyPendingUserUseCase";

@injectable()
export class UserAuthController implements IUserAuthController {
  constructor(
    @inject(TYPES.IResendOtpUseCase)
    private readonly _resendOtpUseCase: IResendOtpUseCase,
    @inject(TYPES.IUserRegisterUseCase)
    private readonly _userRegisterUseCase: IUserRegisterUseCase,
    @inject(TYPES.IVerifyPendingUserUseCase)
    private readonly _verifyPendingUserUseCase: IVerifyPendingUserUseCase
  ) {}

  //# ================================================================================================================
  //# USER LOGIN
  //# ================================================================================================================
  //# POST /api/v1/user/auth/login
  //# Request body: { username or email, password }
  //# This controller allow the user to login to their account
  //# ================================================================================================================
  userLogin = async (
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
  //# USER REGISTER
  //# ================================================================================================================
  //# POST /api/v1/user/auth/register
  //# Request body: { name, username, email, password }
  //# This controller allow the user to create new account.
  //# ================================================================================================================
  userRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, username, email, password } = req.body;

      const dto: UserRegisterDTO = { name, username, email, password };

      const user = await this._userRegisterUseCase.execute(dto);

      return res.status(HttpStatus.OK).json({
        message: "OTP sent to your email",
        userId: user.id,
      });
    } catch (error) {
      return next(error);
    }
  };

  //# ================================================================================================================
  //# USER VERIFICATION
  //# ================================================================================================================
  //# POST /api/v1/user/auth/verify
  //# Request body: { userId, otp }
  //# This controller allow the user to verify their account through the otp.
  //# ================================================================================================================
  verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId, otp } = req.body;

      await this._verifyPendingUserUseCase.execute(userId, otp);

      return res.status(200).json({ message: "User verified successfully" });
    } catch (error) {
      next(error);
    }
  };

  //# ================================================================================================================
  //# RESEND OTP
  //# ================================================================================================================
  //# POST /api/v1/user/auth/resend-otp
  //# Request body: { userId }
  //# This controller allow the user to get new opt after a time limit.
  //# ================================================================================================================
  resendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.body;

      await this._resendOtpUseCase.execute(userId);

      return res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
      next(error);
    }
  };

  //# ================================================================================================================
  //# USER LOGOUT
  //# ================================================================================================================
  //# POST /api/v1/user/auth/logout
  //# Request: Authorization token must be sent in headers (e.g., Bearer token)
  //# This controller allow the loggined user to logout.
  //# ================================================================================================================
  userLogout = async (
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
  //# ADMIN LOGIN
  //# ================================================================================================================
  //# POST /api/v1/admin/auth/login
  //# Request body: { username or email, password }
  //# This controller allow the admin to login to their account
  //# ================================================================================================================
  //   userLogin = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //     } catch (error) {
  //       next(error);
  //     }
  //   };
}
