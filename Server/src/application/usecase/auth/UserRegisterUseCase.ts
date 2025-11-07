import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { Role } from "../../../domain/entities/User.entities";
import { TYPES } from "../../../infrastructure/invercify/types";
import { IOtpService } from "../../../domain/service/IOtpService";
import { ConflictError } from "../../../domain/errors/ConflictError";
import { BadrequestError } from "../../../domain/errors/BadrequestError";
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

    const user = await this._userRepo.findByEmail(email);

    // ──► already verified and active → conflict
    if (user?.isVerified && user.status === "active") {
      if (user.username === username) {
        throw new ConflictError("Username already exists");
      }
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      const newUser = await this._userRepo.create({
        name,
        username,
        email,
        role: "user" as Role,
        password: hashedPassword,
        isVerified: false,
        status: "pending",
      });

      await this._otpService.sendOtp(newUser.id);
      return { id: newUser.id, name: newUser.name, username: newUser.username };
    }

    // user exists but is not verified → update and resend OTP
    const updatedUser = await this._userRepo.update(user.id, {
      name,
      email,
      username,
      password: hashedPassword,
    });

    if (!updatedUser) {
      throw new BadrequestError("Failed to update user");
    }

    const canSend = await this._otpService.canResendOtp(updatedUser.id);
    if (!canSend) {
      throw new BadrequestError("Please wait before requesting OTP again");
    }

    await this._otpService.sendOtp(updatedUser.id);
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      username: updatedUser.username,
    };
  }
}
