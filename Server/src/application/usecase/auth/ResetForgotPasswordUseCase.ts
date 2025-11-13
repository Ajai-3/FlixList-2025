import bcrypt from "bcryptjs";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../infrastructure/invercify/types";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { ITokenService } from "../../interfaces/services/ITokenService";
import { ICacheClient } from "../../../domain/repositories/ICacheClient";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { ResetForgotPasswordDTO } from "../../interfaces/dto/auth/ResetForgotPasswordDTO";
import { IResetPasswordUseCase } from "../../interfaces/usecase/auth/IResetPasswordUseCase";
import { BadrequestError } from "../../../domain/errors/BadrequestError";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject(TYPES.ICacheClient) private readonly _cacheClient: ICacheClient,
    @inject(TYPES.IUserRepository) private readonly _userRepo: IUserRepository,
    @inject(TYPES.ITokenService) private readonly _tokenService: ITokenService
  ) {}

  async execute(dto: ResetForgotPasswordDTO): Promise<void> {
    const { token, newPassword, ipAddress, userAgent } = dto;

    const payload = this._tokenService.verifyToken(token, "email");
    if (!payload?.userId) throw new BadrequestError("Invalid token payload");

    const user = await this._userRepo.findById(payload.userId);
    if (!user) throw new NotFoundError("User not found");

    const storedToken = await this._cacheClient.get(`reset:${payload.userId}`);
    if (!storedToken || storedToken !== token)
      throw new BadrequestError("Invalid or expired token");

    // Verify device and IP match
    if (payload.ipAddress !== ipAddress || payload.userAgent !== userAgent)
      throw new BadrequestError("Device or location mismatch");

    const isOldPass = await bcrypt.compare(newPassword, user.password)
    if(isOldPass) throw new BadrequestError("New password cannot be the same as the old one.")

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this._userRepo.update(user.id, { password: hashedPassword });

    // Invalidate token immediately
    await this._cacheClient.del(`reset:${payload.userId}`);
  }
}
