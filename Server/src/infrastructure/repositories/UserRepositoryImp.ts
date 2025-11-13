import { injectable } from "inversify";
import { UserModel } from "../models/UserModel";
import { BaseRepositoryImp } from "./BaseRepositoryImp";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

@injectable()
export class UserRepositoryImp
  extends BaseRepositoryImp<User>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ email });
    return this.mapDbToDomain(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.model.findOne({ username });
    return this.mapDbToDomain(user);
  }

  async findByRole(role: "user" | "admin"): Promise<User[]> {
    const users = await this.model.find({ role });
    return this.mapDbArrayToDomain(users);
  }

  async findByEmailOrUsername(identifier: string) {
    const user = await this.model.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    return this.mapDbToDomain(user);
  }
}
