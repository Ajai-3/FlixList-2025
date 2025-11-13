import { User } from "../../domain/entities/User";
import { UserResponseDTO } from "../interfaces/dto/auth/UserResponseDTO";

export class UserMapper {
  static toResponseDTO(
    user: User,
    tokens?: { accessToken?: string; refreshToken?: string }
  ): UserResponseDTO {
    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        avatarKey: user.avatarKey,
        status: user.status,
        isVerified: user.isVerified,
      },
      accessToken: tokens?.accessToken,
      refreshToken: tokens?.refreshToken,
    };
  }
}
