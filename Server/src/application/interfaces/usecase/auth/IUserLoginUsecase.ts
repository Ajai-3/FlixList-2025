import { LoginDTO } from "../../dto/auth/LoginDTO";
import { UserResponseDTO } from "../../dto/auth/UserResponseDTO";

export interface IUserLoginUseCase {
    execute(dto: LoginDTO): Promise<UserResponseDTO>
}