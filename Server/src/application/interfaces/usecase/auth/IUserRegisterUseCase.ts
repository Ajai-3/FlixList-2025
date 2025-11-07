import { UserRegisterDTO, UserResponseDTO } from "../../dto/auth/UserRegisterDTO";

export interface IUserRegisterUseCase {
  execute(data: UserRegisterDTO): Promise<UserResponseDTO>;
}
