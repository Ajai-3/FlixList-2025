import { Document, Schema, model } from "mongoose";
import { UserSession } from '../../domain/entities/UserSession.entities';


export interface IUserSessionDocument extends Omit<UserSession, 'id'> {}

const UserSessionSchema = new Schema<IUserSessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    device: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    lastActivity: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UserSessionModel = model<IUserSessionDocument>(
  "UserSession",
  UserSessionSchema
);
