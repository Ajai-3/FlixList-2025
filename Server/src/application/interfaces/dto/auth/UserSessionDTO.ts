export interface UserSessionDTO {
  userId: string;
  ipAddress: string;
  userAgent: string;
  device: "desktop" | "mobile" | "tablet" | "unknown";
  lastActivity?: Date;
}
