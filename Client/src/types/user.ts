export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role?: "user" | "admin";
}