import { IOtpService } from "../interfaces/services/IOtpService";
import { injectable, inject } from "inversify";
import { TYPES } from "../../infrastructure/invercify/types";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject(TYPES.IOtpRepository) private readonly _otpRepo: IOtpRepository
  ) {}

  generateNumericOtp(length = 6): string {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0");
  }

  async sendOtp(userId: string): Promise<string> {
    const otp = this.generateNumericOtp(6);
    await this._otpRepo.createOtp(userId, otp);
    console.log(otp);
    // TODO: Send via SMS/Email (example call)
    // await smsService.send(userPhone, otp);
    return otp;
  }

  async verifyOtp(userId: string, otp: string): Promise<boolean> {
    return await this._otpRepo.verifyOtp(userId, otp);
  }

  async canResendOtp(userId: string): Promise<boolean> {
    const lastSent = await this._otpRepo.getLastOtpTime(userId);
    if (!lastSent) return true;

    const diffMs = Date.now() - lastSent.getTime();
    const WAIT_TIME = 60 * 1000;
    return diffMs >= WAIT_TIME;
  }
}
