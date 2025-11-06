export type Role = "user" | "admin"

export class User {
  constructor(
    public name: string,
    public email: string,
    public username: string,
    public password: string,
    public role: Role = "user",
    public avatarKey?: string | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
