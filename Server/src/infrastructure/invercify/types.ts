export const TYPES = {
  // Repositories
  ICacheClient: Symbol.for("ICacheClient"),
  IOtpRepository: Symbol.for("IOtpRepository"),
  IBaseRepository: Symbol.for("IBaseRepository"),
  IUserRepository: Symbol.for("IUserRepository"),
  
  // Services
  IOtpService: Symbol.for("IOtpService"),
  
  // Use-Cases
  IResendOtpUseCase: Symbol.for("IResendOtpUseCase"),
  IUserRegisterUseCase: Symbol.for("IUserRegisterUseCase"),
  IVerifyPendingUserUseCase: Symbol.for("IVerifyPendingUserUseCase"),
  
  // Controller
  ISessionController: Symbol.for("ISessionController"),
  IUserAuthController: Symbol.for("IUserAuthController"),
  IAdminAuthController: Symbol.for("IAdminAuthController"),
};
