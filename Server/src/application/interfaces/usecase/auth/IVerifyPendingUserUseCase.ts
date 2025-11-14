import { VerifyOtpDTO } from "../../dto/auth/VerifyOtpDTO";
import { UserResponseDTO } from "../../dto/auth/UserResponseDTO";

export interface IVerifyPendingUserUseCase {
  execute(dto: VerifyOtpDTO): Promise<UserResponseDTO>;
}
