import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/invercify/types";
import { IOtpService } from "../../interfaces/services/IOtpService";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { BadrequestError } from "../../../domain/errors/BadrequestError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IResendOtpUseCase } from "../../interfaces/usecase/auth/IResendOtpUseCase";

@injectable()
export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    @inject(TYPES.IOtpService) private readonly _otpService: IOtpService,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository
  ) {}

  async execute(email: string): Promise<{ success: boolean }> {
    const user = await this._userRepo.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");
    if (user.isVerified) throw new BadrequestError("User is already verified, please login.");

    const canSend = await this._otpService.canResendOtp(user.id);
    if (!canSend)
      throw new BadrequestError("Please wait before requesting OTP again");

    await this._otpService.sendOtp(user.id);

    return { success: true };
  }
}
