export type Role = "user" | "admin";
export type Status = "active" | "pending" | "banned" | "suspented"

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public username: string,
    public password: string,
    public role: Role = "user",
    public isVerified: boolean,
    public status: Status = "pending",
    public avatarKey?: string | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
