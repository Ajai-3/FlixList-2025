import { UserRegisterDTO } from "../../dto/auth/UserRegisterDTO";
import { UserResponseDTO } from "../../dto/auth/UserResponseDTO";

export interface IUserRegisterUseCase {
  execute(data: UserRegisterDTO): Promise<UserResponseDTO>;
}
