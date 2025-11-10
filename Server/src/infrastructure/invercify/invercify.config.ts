import { TYPES } from "./types";
import { Container } from "inversify";

// Repositories
import { OtpRepositoryImp } from "../repositories/OtpRepositoryImp";
import { UserRepositoryImp } from "../repositories/UserRepositoryImp";

import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

// Service
import { IOtpService } from "../../domain/service/IOtpService";

import { OtpService } from "../../application/services/OtpService";

// Use-Case
import { ICacheClient } from "../../domain/repositories/ICacheClient";
import { IResendOtpUseCase } from "../../application/interfaces/usecase/auth/IResendOtpUseCase";
import { IUserRegisterUseCase } from "../../application/interfaces/usecase/auth/IUserRegisterUseCase";
import { IVerifyPendingUserUseCase } from "../../application/interfaces/usecase/auth/IVerifyPendingUserUseCase";

import { RedisCacheService } from "../cache/RedisCacheService ";
import { ResendOtpUseCase } from "../../application/usecase/auth/ResendOtpUseCase";
import { UserRegisterUseCase } from "../../application/usecase/auth/UserRegisterUseCase";
import { VerifyPendingUserUseCase } from "../../application/usecase/auth/VerifyPendingUserUseCase";

// Controllers
import { IRefreshController } from "../../presentation/interfaces/auth/IRefreshController";
import { IUserAuthController } from "../../presentation/interfaces/auth/IUserAuthController";
import { IAdminAuthController } from "../../presentation/interfaces/auth/IAdminAuthController";

import { RefreshController } from "../../presentation/controllers/auth/RefreshController";
import { UserAuthController } from "../../presentation/controllers/auth/UserAuthController";
import { AdminAuthController } from "../../presentation/controllers/auth/AdminAuthController";

const container = new Container();

// Repositories
container.bind<IOtpRepository>(TYPES.IOtpRepository).to(OtpRepositoryImp);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryImp);

container.bind<ICacheClient>(TYPES.ICacheClient).to(RedisCacheService).inSingletonScope();


// Use-Case
container.bind<IResendOtpUseCase>(TYPES.IResendOtpUseCase).to(ResendOtpUseCase)
container.bind<IUserRegisterUseCase>(TYPES.IUserRegisterUseCase).to(UserRegisterUseCase)
container.bind<IVerifyPendingUserUseCase>(TYPES.IVerifyPendingUserUseCase).to(VerifyPendingUserUseCase)

// Service
container.bind<IOtpService>(TYPES.IOtpService).to(OtpService)


// Controller
container.bind<IRefreshController>(TYPES.IRefreshController).to(RefreshController);
container.bind<IUserAuthController>(TYPES.IUserAuthController).to(UserAuthController);
container.bind<IAdminAuthController>(TYPES.IAdminAuthController).to(AdminAuthController);


export { container }