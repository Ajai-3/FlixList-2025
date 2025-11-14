  import { inject, injectable } from "inversify";
  import { UserMapper } from "../../mappers/UserMapper";
  import { TYPES } from "../../../infrastructure/invercify/types";
  import { IOtpService } from "../../interfaces/services/IOtpService";
  import { NotFoundError } from "../../../domain/errors/NotFoundError";
  import { getDeviceType } from "../../../infrastructure/utils/device";
  import { VerifyOtpDTO } from "../../interfaces/dto/auth/VerifyOtpDTO";
  import { ITokenService } from "../../interfaces/services/ITokenService";
  import { BadrequestError } from "../../../domain/errors/BadrequestError";
  import { UserSessionDTO } from "../../interfaces/dto/auth/UserSessionDTO";
  import { UserResponseDTO } from "../../interfaces/dto/auth/UserResponseDTO";
  import { IUserRepository } from "../../../domain/repositories/IUserRepository";
  import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";
  import { IVerifyPendingUserUseCase } from "../../interfaces/usecase/auth/IVerifyPendingUserUseCase";

  @injectable()
  export class VerifyPendingUserUseCase implements IVerifyPendingUserUseCase {
    constructor(
      @inject(TYPES.IOtpService) private readonly _otpService: IOtpService,
      @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
      @inject(TYPES.ITokenService) private readonly _tokenService: ITokenService,
      @inject(TYPES.ISessionRepository)
      private readonly _sessionRepo: ISessionRepository
    ) {}

    async execute(dto: VerifyOtpDTO): Promise<UserResponseDTO> {
      const { email, otp, ipAddress, userAgent } = dto;

      let user = await this._userRepo.findByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (user.isVerified && user.status === "active") {
        throw new BadrequestError("User already verified, please login");
      }

      const isValidOtp = await this._otpService.verifyOtp(user.id, otp);

      if (!isValidOtp) {
        throw new BadrequestError("Invalid OTP");
      }

      user = await this._userRepo.update(user.id, {
        isVerified: true,
        status: "active",
      });

      if (!user) {
        throw new NotFoundError("User not found");
      }
      
      const sessionDto: UserSessionDTO = {
        userId: user.id,
        ipAddress: ipAddress,
        userAgent: userAgent,
        device: getDeviceType(userAgent),
        lastActivity: new Date(),
      };

      await this._sessionRepo.create(sessionDto);

      const payload = { id: user.id, role: user.role };
      const accessToken = this._tokenService.generateToken(payload, "access");
      const refreshToken = this._tokenService.generateToken(payload, "refresh");

      return UserMapper.toResponseDTO(user, { accessToken, refreshToken });
    }
  }
