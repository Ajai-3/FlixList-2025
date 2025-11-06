import { Types } from "mongoose";

export class UserSession {
  constructor(
    public userId: Types.ObjectId,  
    public device: string,
    public ipAddress?: string,
    public userAgent?: string,
    public lastActivity?: Date,    
    public createdAt?: Date,      
    public updatedAt?: Date,      
  ) {}
}