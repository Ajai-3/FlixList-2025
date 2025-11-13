import { IBaseRepository } from "./IBaseRepository";
import { User } from "../entities/User";

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByRole(role: "user" | "admin"): Promise<User[]>;
  findByUsername(username: string): Promise<User | null>;
  findByEmailOrUsername(identifier: string): Promise<User | null>;
}
