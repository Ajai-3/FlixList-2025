import { UserSession } from "../entities/UserSession";
import { IBaseRepository } from "./IBaseRepository";

export interface ISessionRepository extends IBaseRepository<UserSession> {
  findByUserId(userId: string): Promise<UserSession[]>;
  deleteByUserId(userId: string): Promise<any>;
}
