import { Document, Schema, model } from "mongoose";
import { deviceType, UserSession } from "../../domain/entities/UserSession";

export interface IUserSessionDocument extends Omit<UserSession, "id"> {}

const UserSessionSchema = new Schema<IUserSessionDocument>(
  {
    userId: { type: String, required: true },
    device: {
      type: String,
      enum: ["desktop", "mobile", "tablet", "unknown"] as deviceType[],
      default: "unknown",
      required: true,
    },
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
