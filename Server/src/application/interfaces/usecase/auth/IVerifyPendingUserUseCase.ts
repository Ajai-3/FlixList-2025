export interface IVerifyPendingUserUseCase {
  execute(userId: string, otp: string): Promise<{ success: boolean }>;
}
