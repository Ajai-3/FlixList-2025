import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../../../infrastructure/invercify/types";
import { HttpStatus } from "../../../infrastructure/constants/HttpStatus";
import { LoginDTO } from "../../../application/interfaces/dto/auth/LoginDTO";
import { IUserAuthController } from "../../interfaces/auth/IUserAuthController";
import { VerifyOtpDTO } from "../../../application/interfaces/dto/auth/VerifyOtpDTO";
import { UserRegisterDTO } from "./../../../application/interfaces/dto/auth/UserRegisterDTO";
import { ForgotPasswordDTO } from "../../../application/interfaces/dto/auth/ForgotPasswordDTO";
import { IResendOtpUseCase } from "../../../application/interfaces/usecase/auth/IResendOtpUseCase";
import { IUserLoginUseCase } from "../../../application/interfaces/usecase/auth/IUserLoginUsecase";
import { IUserRegisterUseCase } from "../../../application/interfaces/usecase/auth/IUserRegisterUseCase";
import { ResetForgotPasswordDTO } from "../../../application/interfaces/dto/auth/ResetForgotPasswordDTO";
import { IResetPasswordUseCase } from "../../../application/interfaces/usecase/auth/IResetPasswordUseCase";
import { IForgotPasswordUseCase } from "../../../application/interfaces/usecase/auth/IForgotPasswordUseCase";
import { IVerifyPendingUserUseCase } from "../../../application/interfaces/usecase/auth/IVerifyPendingUserUseCase";

@injectable()
export class UserAuthController implements IUserAuthController {
  constructor(
    @inject(TYPES.IResendOtpUseCase)
    private readonly _resendOtpUseCase: IResendOtpUseCase,
    @inject(TYPES.IUserLoginUseCase)
    private readonly _userLoginUseCase: IUserLoginUseCase,
    @inject(TYPES.IUserRegisterUseCase)
    private readonly _userRegisterUseCase: IUserRegisterUseCase,
    @inject(TYPES.IResetPasswordUseCase)
    private readonly _resetPasswordUseCase: IResetPasswordUseCase,
    @inject(TYPES.IForgotPasswordUseCase)
    private readonly _forgotPasswordUseCase: IForgotPasswordUseCase,
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
      const { identifier, password } = req.body;

      const dto: LoginDTO = { identifier, password };
      const { user, accessToken, refreshToken } =
        await this._userLoginUseCase.execute(dto);

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/api/v1/auth/refresh-token",
      });

      return res
        .status(HttpStatus.OK)
        .json({ message: "Login Successfull", data: { user, accessToken } });
    } catch (error) {
      return next(error);
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
      const { name, email, password } = req.body;

      const dto: UserRegisterDTO = { name, email, password };

      const { user } = await this._userRegisterUseCase.execute(dto);

      return res.status(HttpStatus.OK).json({
        message: "OTP sent to your email",
      });
    } catch (error) {
      return next(error);
    }
  };

  //# ================================================================================================================
  //# USER VERIFICATION
  //# ================================================================================================================
  //# POST /api/v1/user/auth/verify
  //# Request body: { email, otp }
  //# This controller allow the user to verify their account through the otp.
  //# ================================================================================================================
  verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, otp } = req.body;

      const ipAddress = req.ip as string;
      const userAgent = req.headers["user-agent"] as string;

      const dto: VerifyOtpDTO = { email, otp, ipAddress, userAgent };
      const { accessToken, refreshToken } =
        await this._verifyPendingUserUseCase.execute(dto);

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        path: "/api/v1/auth/refresh-token",
      });

      return res
        .status(HttpStatus.OK)
        .json({ message: "User verified successfully", accessToken });
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
      const { email } = req.body;

      await this._resendOtpUseCase.execute(email);

      return res
        .status(HttpStatus.OK)
        .json({ message: "OTP resent successfully" });
    } catch (error) {
      next(error);
    }
  };

  //# ================================================================================================================
  //# USER FORGOT PASSWORD
  //# ================================================================================================================
  //# POST /api/v1/user/auth/forgot-password
  //# Request Body: { identifier } (email, username)
  //# This controller allow the loggined user to logout.
  //# ================================================================================================================
  forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { identifier } = req.body;

      const ipAddress = req.ip as string;
      const userAgent = req.headers["user-agent"] as string;

      const dto: ForgotPasswordDTO = { identifier, ipAddress, userAgent };
      await this._forgotPasswordUseCase.execute(dto);

      return res
        .status(HttpStatus.OK)
        .json({ message: "Verification link sented" });
    } catch (error) {
      next(error);
    }
  };

  //# ================================================================================================================
  //# RESET FORGOT PASSWORD
  //# ================================================================================================================
  //# POST /api/v1/user/auth/forgot-password
  //# Request Body: { identifier } (email, username)
  //# This controller allow the loggined user to logout.
  //# ================================================================================================================
  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { token, newPassword } = req.body;

      const ipAddress = req.ip as string;
      const userAgent = req.headers["user-agent"] as string;

      const dto: ResetForgotPasswordDTO = {
        token,
        newPassword,
        ipAddress,
        userAgent,
      };
      await this._resetPasswordUseCase.execute(dto);

      return res
        .status(HttpStatus.OK)
        .json({ message: "Password reset successfully" });
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
}
