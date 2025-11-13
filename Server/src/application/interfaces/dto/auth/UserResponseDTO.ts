import { Status } from "../../../../domain/entities/User";

export interface UserResponseDTO {
  user: {
    id: string;
    name: string;
    status: Status;
    username: string;
    isVerified: boolean;
    avatarKey?: string | null;
  };
  accessToken?: string;
  refreshToken?: string;
}
