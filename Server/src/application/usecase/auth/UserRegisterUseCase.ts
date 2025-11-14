import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { Role } from "../../../domain/entities/User";
import { TYPES } from "../../../infrastructure/invercify/types";
import { IOtpService } from "../../interfaces/services/IOtpService";
import { ConflictError } from "../../../domain/errors/ConflictError";
import { BadrequestError } from "../../../domain/errors/BadrequestError";
import { UserRegisterDTO } from "../../interfaces/dto/auth/UserRegisterDTO";
import { UserResponseDTO } from "../../interfaces/dto/auth/UserResponseDTO";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { generateUsername } from "../../../infrastructure/utils/generateUsername";
import { IUserRegisterUseCase } from "../../interfaces/usecase/auth/IUserRegisterUseCase";
import { UserMapper } from "../../mappers/UserMapper";
import { IEmailService } from "../../interfaces/services/IEmailService";

@injectable()
export class UserRegisterUseCase implements IUserRegisterUseCase {
  constructor(
    @inject(TYPES.IOtpService) private readonly _otpService: IOtpService,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
    @inject(TYPES.IEmailService) private readonly _emailService: IEmailService,
  ) {}

  async execute(dto: UserRegisterDTO): Promise<UserResponseDTO> {
    const { name, email, password } = dto;

    const user = await this._userRepo.findByEmail(email);

    // ──► already verified and active → conflict
    if (user?.isVerified && user.status === "active") {
      throw new ConflictError("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let username = generateUsername(name);

    const existUsername = await this._userRepo.findByUsername(username);

    if (existUsername) {
      throw new ConflictError("Username already exists");
    }

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
      return UserMapper.toResponseDTO(newUser);
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
      throw new BadrequestError(
        "Too many OTP requests. Wait for the cooldown to finish before trying again."
      );
    }

    await this._otpService.sendOtp(updatedUser.id);
    return UserMapper.toResponseDTO(updatedUser);
  }
}
