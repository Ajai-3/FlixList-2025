export const TYPES = {
  // Repositories
  ICacheClient: Symbol.for("ICacheClient"),
  IOtpRepository: Symbol.for("IOtpRepository"),
  IBaseRepository: Symbol.for("IBaseRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  ISessionRepository: Symbol.for("ISessionRepository"),

  // Services
  IOtpService: Symbol.for("IOtpService"),
  ITokenService: Symbol.for("ITokenService"),
  IEmailService: Symbol.for("IEmailService"),

  // Use-Cases

  // Auth
  IResendOtpUseCase: Symbol.for("IResendOtpUseCase"),
  IUserLoginUseCase: Symbol.for("IUserLoginUseCase"),
  IUserRegisterUseCase: Symbol.for("IUserRegisterUseCase"),
  IResetPasswordUseCase: Symbol.for("IResetPasswordUseCase"),
  IForgotPasswordUseCase: Symbol.for("IForgotPasswordUseCase"),
  IVerifyPendingUserUseCase: Symbol.for("IVerifyPendingUserUseCase"),

  // Controller
  ISessionController: Symbol.for("ISessionController"),
  IUserAuthController: Symbol.for("IUserAuthController"),
  IAdminAuthController: Symbol.for("IAdminAuthController"),
};
