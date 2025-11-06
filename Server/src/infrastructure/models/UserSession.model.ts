import { Document, Schema, model } from "mongoose";
import { UserSession } from './../../domain/entities/UserSession.entities';


export interface UserSessionDocument extends UserSession, Document {}

const UserSessionSchema = new Schema<UserSessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    device: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    lastActivity: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const UserSessionModel = model<UserSessionDocument>(
  "UserSession",
  UserSessionSchema
);
