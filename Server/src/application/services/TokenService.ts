import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../../infrastructure/config/env";
import { ITokenService, TokenPayload, TokenType } from "../../application/interfaces/services/ITokenService";

export class TokenService implements ITokenService {
  generateToken(payload: TokenPayload, type: TokenType): string {
    const { secret, expiresIn } = this.getTokenConfig(type);
    return jwt.sign(payload, secret, { expiresIn });
  }

  verifyToken(token: string, type: TokenType): TokenPayload {
    const { secret } = this.getTokenConfig(type);

    try {
      return jwt.verify(token, secret) as TokenPayload;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }
  
  decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }

  private getTokenConfig(type: TokenType): { secret: string; expiresIn: SignOptions["expiresIn"] } {
    switch (type) {
      case "access":
        return { secret: config.jwt.accessTokenSecret, expiresIn: config.jwt.accessTokenExpiry };
      case "refresh":
        return { secret: config.jwt.refreshTokenSecret, expiresIn: config.jwt.refreshTokenExpiry };
      case "email":
        return { secret: config.emailToken.secret, expiresIn: config.emailToken.expiresIn };
      default:
        throw new Error(`Invalid token type: ${type}`);
    }
  }
}
