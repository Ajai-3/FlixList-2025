export interface ResetForgotPasswordDTO {
  token: string;
  ipAddress: string;
  userAgent: string;
  newPassword: string;
}
