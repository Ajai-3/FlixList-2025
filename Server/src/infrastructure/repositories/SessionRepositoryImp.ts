import { injectable } from "inversify";
import { BaseRepositoryImp } from "./BaseRepositoryImp";
import { UserSessionModel } from "../models/UserSessionModel";
import { UserSession } from "../../domain/entities/UserSession";
import { ISessionRepository } from "../../domain/repositories/ISessionRepository";

@injectable()
export class SessionRepositoryImp extends BaseRepositoryImp<UserSession> implements ISessionRepository {
  constructor() {
    super(UserSessionModel);
  }

  async findByUserId(userId: string) {
    const sessions = await this.model.find({ userId });
    return this.mapDbArrayToDomain(sessions);
  }

  async deleteByUserId(userId: string) {
    const result = await this.model.deleteMany({ userId });
    return result.deletedCount ?? 0;
  }
}
