import { ResetForgotPasswordDTO } from "../../dto/auth/ResetForgotPasswordDTO";

export interface IResetPasswordUseCase {
  execute(dto: ResetForgotPasswordDTO): Promise<void>;
}