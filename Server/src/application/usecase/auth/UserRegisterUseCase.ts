import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { Role } from "../../../domain/entities/User.entities";
import { TYPES } from "../../../infrastructure/invercify/types";
import { IOtpService } from "../../../domain/service/IOtpService";
import { ConflictError } from "../../../domain/errors/ConflictError";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { IUserRegisterUseCase } from "../../interfaces/usecase/auth/IUserRegisterUseCase";
import {
  UserRegisterDTO,
  UserResponseDTO,
} from "../../interfaces/dto/auth/UserRegisterDTO";

@injectable()
export class UserRegisterUseCase implements IUserRegisterUseCase {
  constructor(
    @inject(TYPES.IOtpService) private readonly _otpService: IOtpService,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository
  ) {}

  async execute(data: UserRegisterDTO): Promise<UserResponseDTO> {
    const { name, username, email, password } = data;

    let user = await this._userRepo.findByEmail(email);

    if (user?.isVerified && user.status === "active") {
      if (user.username === username) {
        throw new ConflictError("Username already exists");
      }

      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      user = await this._userRepo.create({
        name,
        username,
        email,
        role: "user" as Role,
        password: hashedPassword,
        isVerified: false,
        status: "pending",
      });

      await this._otpService.sendOtp(user.id);
    } else if (!user.isVerified) {
      user = await this._userRepo.update(user.id, {
        name,
        username,
        password: hashedPassword,
      });

      const canSend = await this._otpService.canResendOtp(user.id);
      if (!canSend)
        throw new ConflictError("Please wait before requesting OTP again");

      await this._otpService.sendOtp(user.id);
    }

    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  }
}
