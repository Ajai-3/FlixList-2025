import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/invercify/types";
import { IOtpService } from "../../../domain/service/IOtpService";
import { ConflictError } from "../../../domain/errors/ConflictError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

@injectable()
export class VerifyPendingUserUseCase {
  constructor(
      @inject(TYPES.IOtpService) private readonly _otpService: IOtpService,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
  ) {}

  async execute(userId: string, otp: string): Promise<{ success: boolean }> {

    const isValidOtp = await this._otpService.verifyOtp(userId, otp);

    if (!isValidOtp) {
      throw new ConflictError("Invalid OTP");
    }

    await this._userRepo.update(userId, { isVerified: true, status: "active" });

    return { success: true };
  }
}
