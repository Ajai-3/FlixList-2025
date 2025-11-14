import { injectable, inject } from "inversify";
import { TYPES } from "../../infrastructure/invercify/types";
import { IOtpService } from "../interfaces/services/IOtpService";
import { NotFoundError } from "../../domain/errors/NotFoundError";
import { IEmailService } from "../interfaces/services/IEmailService";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject(TYPES.IOtpRepository) private readonly _otpRepo: IOtpRepository,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
    @inject(TYPES.IEmailService) private readonly _emailService: IEmailService
  ) {}

  generateNumericOtp(length = 6): string {
    return Math.floor(Math.random() * Math.pow(10, length))
      .toString()
      .padStart(length, "0");
  }

  async sendOtp(userId: string): Promise<string> {
    const user = await this._userRepo.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    const otp = this.generateNumericOtp(6);
    await this._otpRepo.createOtp(userId, otp);

    await this._emailService.sendMail({
      to: user.email,
      subject: `OTP for ${user.name || "User"}`,
      html: `
        <p>Hello ${user.name || "User"},</p>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>${process.env.FRONTEND_URL}/auth/verify-otp</p>
        <p>Please enter this OTP to complete your verification.</p>
        <p>If you didn’t request this, please ignore this email.</p>
      `,
    });

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
