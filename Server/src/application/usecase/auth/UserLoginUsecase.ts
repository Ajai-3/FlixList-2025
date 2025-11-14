import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { UserMapper } from "../../mappers/UserMapper";
import { LoginDTO } from "../../interfaces/dto/auth/LoginDTO";
import { TYPES } from "../../../infrastructure/invercify/types";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { BadrequestError } from "../../../domain/errors/BadrequestError";
import { UserResponseDTO } from "../../interfaces/dto/auth/UserResponseDTO";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUserLoginUseCase } from "../../interfaces/usecase/auth/IUserLoginUsecase";
import { ISessionRepository } from "../../../domain/repositories/ISessionRepository";

@injectable()
export class UserLoginUseCase implements IUserLoginUseCase {
  constructor(
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
    @inject(TYPES.ITokenService) private readonly _tokenService: ITokenService,
    @inject(TYPES.ISessionRepository)
    private readonly _sessionRepo: ISessionRepository
  ) {}

  async execute(dto: LoginDTO): Promise<UserResponseDTO> {
    const { identifier, password } = dto;

    console.log(identifier, password);

    const user = await this._userRepo.findByEmailOrUsername(identifier);
    if (!user) {
      console.log("User not found");
      throw new BadrequestError("Invalid email or password");
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      console.log("Password not match");
      throw new BadrequestError("Invalid email or password");
    }

    const payload = { id: user.id, role: user.role };
    const accessToken = this._tokenService.generateToken(payload, "access");
    const refreshToken = this._tokenService.generateToken(payload, "refresh");

    return UserMapper.toResponseDTO(user, { accessToken, refreshToken });
  }
}
