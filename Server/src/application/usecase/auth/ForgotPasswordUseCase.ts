import { inject, injectable } from "inversify";
import { config } from "../../../infrastructure/config/env";
import { TYPES } from "../../../infrastructure/invercify/types";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { IEmailService } from "../../interfaces/services/IEmailService";
import { ICacheClient } from "../../../domain/repositories/ICacheClient";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ForgotPasswordDTO } from "../../interfaces/dto/auth/ForgotPasswordDTO";
import { IForgotPasswordUseCase } from "../../interfaces/usecase/auth/IForgotPasswordUseCase";
import { BadrequestError } from "../../../domain/errors/BadrequestError";

@injectable()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    @inject(TYPES.ICacheClient) private readonly _cacheClient: ICacheClient,
    @inject(TYPES.IEmailService) private readonly _emailService: IEmailService,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
    @inject(TYPES.ITokenService)
    private readonly _tokenService: ITokenService
  ) {}

  async execute(dto: ForgotPasswordDTO): Promise<void> {
    const { identifier, ipAddress, userAgent } = dto;

    console.log(dto)

    const user = await this._userRepo.findByEmailOrUsername(identifier);
    if (!user) throw new NotFoundError("User not found");

    const cooldownKey = `reset_cooldown:${user.id}`;
    const tokenKey = `reset:${user.id}`;

    const isCooling = await this._cacheClient.get(cooldownKey);
    if (isCooling)
      throw new BadrequestError("Please wait before requesting another reset link.");

    const payload = {
      id: user.id,
      email: user.email,
      ipAddress,
      userAgent,
    };

    const token = this._tokenService.generateToken(payload, "email");

    const resetLink = `${config.frontend_url}/reset-password?token=${token}`;


    await this._cacheClient.setEx(tokenKey, 600, token);

    await this._cacheClient.setEx(cooldownKey, 120, "true");

    await this._emailService.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name || "User"},</p>
        <p>You requested to reset your password. Click below to continue:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn’t request this, ignore this email.</p>
      `,
    });
  }
}
