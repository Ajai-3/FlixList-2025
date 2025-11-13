import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/invercify/types";
import { IOtpService } from "../../interfaces/services/IOtpService";
import { ConflictError } from "../../../domain/errors/ConflictError";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { getDeviceType } from "../../../infrastructure/utils/device";
import { VerifyOtpDTO } from "../../interfaces/dto/auth/VerifyOtpDTO";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { UserSessionDTO } from "../../interfaces/dto/auth/UserSessionDTO";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";
import { VerifyOtpResponseDTO } from "../../interfaces/dto/auth/VerifyOtpResponseDTO";

@injectable()
export class VerifyPendingUserUseCase {
  constructor(
    @inject(TYPES.IOtpService) private readonly _otpService: IOtpService,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
    @inject(TYPES.ITokenService) private readonly _tokenService: ITokenService,
    @inject(TYPES.ISessionRepository)
    private readonly _sessionRepo: ISessionRepository
  ) {}

  async execute(dto: VerifyOtpDTO): Promise<VerifyOtpResponseDTO> {
    const { email, otp, ipAddress, userAgent } = dto;

    const user = await this._userRepo.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isValidOtp = await this._otpService.verifyOtp(user.id, otp);

    if (!isValidOtp) {
      throw new ConflictError("Invalid OTP");
    }

    await this._userRepo.update(user.id, {
      isVerified: true,
      status: "active",
    });

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

    return { accessToken, refreshToken };
  }
}
