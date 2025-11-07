export interface IOtpRepository {
  deleteOtp(userId: string): Promise<void>;
  getLastOtpTime(userId: string): Promise<Date | null>;
  createOtp(userId: string, otp: string): Promise<void>;
  verifyOtp(userId: string, otp: string): Promise<boolean>;
}
