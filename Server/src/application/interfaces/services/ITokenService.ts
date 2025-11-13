import { JwtPayload } from "jsonwebtoken";

export type TokenType = "access" | "refresh" | "email";

export interface TokenPayload extends JwtPayload {
  id?: string;
  role?: string;
  email?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ITokenService {
  generateToken(payload: TokenPayload, type: TokenType): string;
  verifyToken(token: string, type: TokenType): TokenPayload;
  decodeToken(token: string): TokenPayload | null;
}
