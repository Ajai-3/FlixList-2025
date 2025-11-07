export interface IResendOtpUseCase {
  execute(userId: string): Promise<{ success: boolean }>;
}
