export type deviceType = "desktop" | "mobile" | "tablet" | "unknown"

export class UserSession {
  constructor(
    public id: string,
    public userId: string,  
    public device: deviceType = "unknown",
    public ipAddress?: string,
    public userAgent?: string,
    public lastActivity?: Date,    
    public createdAt?: Date,      
    public updatedAt?: Date,      
  ) {}
}