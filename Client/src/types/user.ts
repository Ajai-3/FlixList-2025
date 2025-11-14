export interface User {
  id: string;
  name: string;
  status: string;
  username: string;
  avatarKey?: string;
  isVerified: boolean;
  role?: "user" | "admin";
}