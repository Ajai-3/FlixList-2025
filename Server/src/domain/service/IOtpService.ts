export interface IOtpService {
  sendOtp(userId: string): Promise<string>;
  generateNumericOtp(length?: number): string;
  canResendOtp(userId: string): Promise<boolean>;
  verifyOtp(userId: string, otp: string): Promise<boolean>;
}
