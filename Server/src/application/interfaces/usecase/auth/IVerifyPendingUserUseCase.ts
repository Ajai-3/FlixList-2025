import { VerifyOtpDTO } from "../../dto/auth/VerifyOtpDTO";
import { VerifyOtpResponseDTO } from "../../dto/auth/VerifyOtpResponseDTO";

export interface IVerifyPendingUserUseCase {
  execute(dto: VerifyOtpDTO): Promise<VerifyOtpResponseDTO>;
}
