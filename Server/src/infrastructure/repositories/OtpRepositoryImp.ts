import { TYPES } from "../invercify/types";
import { injectable, inject } from "inversify";
import { ICacheClient } from "../../domain/repositories/ICacheClient";
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";

@injectable()
export class OtpRepositoryImp implements IOtpRepository {
  constructor(
    @inject(TYPES.ICacheClient) private readonly _cache: ICacheClient
  ) {}

  private otpKey(userId: string) {
    return `otp:user:${userId}`;
  }

  private otpTimeKey(userId: string) {
    return `otp:user:time:${userId}`;
  }

  async createOtp(userId: string, otp: string): Promise<void> {
    await this._cache.setEx(this.otpKey(userId), 300, otp);
    await this._cache.setEx(this.otpTimeKey(userId), 300, Date.now().toString());
  }

  async verifyOtp(userId: string, otp: string): Promise<boolean> {
    const storedOtp = await this._cache.get(this.otpKey(userId));
    if (storedOtp === otp) {
      await this.deleteOtp(userId);
      return true;
    }
    return false;
  }

  async getLastOtpTime(userId: string): Promise<Date | null> {
    const timestamp = await this._cache.get(this.otpTimeKey(userId));
    if (!timestamp) return null;
    return new Date(Number(timestamp));
  }

  async deleteOtp(userId: string): Promise<void> {
    await this._cache.del(this.otpKey(userId));
    await this._cache.del(this.otpTimeKey(userId));
  }
}
