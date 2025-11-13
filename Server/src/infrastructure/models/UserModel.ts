import { Document, Schema, model } from "mongoose";
import { User, Role, Status } from "../../domain/entities/User";
import { boolean } from "zod";

export interface IUserDocument extends Omit<User, "id"> {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, require: true, default: false },
    role: { type: String, enum: ["user", "admin"] as Role[], default: "user" },
    status: {
      type: String,
      enum: ["active", "pending", "banned", "suspented"] as Status[],
      default: "active",
    },
    avatarKey: { type: String, default: null },
  },
  { timestamps: true }
);

export const UserModel = model<IUserDocument>("User", UserSchema);
