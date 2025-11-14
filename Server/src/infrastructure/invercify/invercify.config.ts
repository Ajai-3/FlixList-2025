import { TYPES } from "./types";
import { Container } from "inversify";

// Repositories
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ISessionRepository } from "../../domain/repositories/ISessionRepository";

import { OtpRepositoryImp } from "../repositories/OtpRepositoryImp";
import { UserRepositoryImp } from "../repositories/UserRepositoryImp";
import { SessionRepositoryImp } from "../repositories/SessionRepositoryImp";

// Service
import { IOtpService } from "../../application/interfaces/services/IOtpService";
import { ITokenService } from "../../application/interfaces/services/ITokenService";
import { IEmailService } from "../../application/interfaces/services/IEmailService";

import { OtpService } from "../../application/services/OtpService";
import { TokenService } from "../../application/services/TokenService";
import { EmailService } from "../../application/services/EmailService";
// Use-Case
import { ICacheClient } from "../../domain/repositories/ICacheClient";
import { IResendOtpUseCase } from "../../application/interfaces/usecase/auth/IResendOtpUseCase";
import { IUserLoginUseCase } from "../../application/interfaces/usecase/auth/IUserLoginUsecase";
import { IUserRegisterUseCase } from "../../application/interfaces/usecase/auth/IUserRegisterUseCase";
import { IResetPasswordUseCase } from "../../application/interfaces/usecase/auth/IResetPasswordUseCase";
import { IForgotPasswordUseCase } from "../../application/interfaces/usecase/auth/IForgotPasswordUseCase";
import { IVerifyPendingUserUseCase } from "../../application/interfaces/usecase/auth/IVerifyPendingUserUseCase";

import { RedisCacheService } from "../cache/RedisCacheService ";
import { UserLoginUseCase } from "../../application/usecase/auth/UserLoginUseCase";
import { ResendOtpUseCase } from "../../application/usecase/auth/ResendOtpUseCase";
import { UserRegisterUseCase } from "../../application/usecase/auth/UserRegisterUseCase";
import { ForgotPasswordUseCase } from "../../application/usecase/auth/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/usecase/auth/ResetForgotPasswordUseCase";
import { VerifyPendingUserUseCase } from "../../application/usecase/auth/VerifyPendingUserUseCase";

// Controllers
import { ISessionController } from "../../presentation/interfaces/auth/ISessionController";
import { IUserAuthController } from "../../presentation/interfaces/auth/IUserAuthController";
import { IAdminAuthController } from "../../presentation/interfaces/auth/IAdminAuthController";

import { SessionController } from "../../presentation/controllers/auth/SessionController";
import { UserAuthController } from "../../presentation/controllers/auth/UserAuthController";
import { AdminAuthController } from "../../presentation/controllers/auth/AdminAuthController";

const container = new Container();

// Repositories
container
  .bind<ICacheClient>(TYPES.ICacheClient)
  .to(RedisCacheService)
  .inSingletonScope();
container
  .bind<IOtpRepository>(TYPES.IOtpRepository)
  .to(OtpRepositoryImp)
  .inSingletonScope();
container
  .bind<IUserRepository>(TYPES.IUserRepository)
  .to(UserRepositoryImp)
  .inSingletonScope();
container
  .bind<ISessionRepository>(TYPES.ISessionRepository)
  .to(SessionRepositoryImp)
  .inSingletonScope();

// Service
container
  .bind<IOtpService>(TYPES.IOtpService)
  .to(OtpService)
  .inSingletonScope();
container
  .bind<ITokenService>(TYPES.ITokenService)
  .to(TokenService)
  .inSingletonScope();
container
  .bind<IEmailService>(TYPES.IEmailService)
  .to(EmailService)
  .inSingletonScope();

// Use-Case
// Auth
container.bind<IResendOtpUseCase>(TYPES.IResendOtpUseCase).to(ResendOtpUseCase);
container.bind<IUserLoginUseCase>(TYPES.IUserLoginUseCase).to(UserLoginUseCase);
container
  .bind<IUserRegisterUseCase>(TYPES.IUserRegisterUseCase)
  .to(UserRegisterUseCase);
container
  .bind<IForgotPasswordUseCase>(TYPES.IForgotPasswordUseCase)
  .to(ForgotPasswordUseCase);
container
  .bind<IVerifyPendingUserUseCase>(TYPES.IVerifyPendingUserUseCase)
  .to(VerifyPendingUserUseCase);
container
  .bind<IResetPasswordUseCase>(TYPES.IResetPasswordUseCase)
  .to(ResetPasswordUseCase);

// Controller
container
  .bind<ISessionController>(TYPES.ISessionController)
  .to(SessionController);
container
  .bind<IUserAuthController>(TYPES.IUserAuthController)
  .to(UserAuthController);
container
  .bind<IAdminAuthController>(TYPES.IAdminAuthController)
  .to(AdminAuthController);

export { container };               
