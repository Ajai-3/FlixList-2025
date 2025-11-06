import { Document, Schema, model } from "mongoose";
import { User, Role } from "../../domain/entities/User.entities";

export interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"] as Role[], default: "user" },
    avatarKey: { type: String, default: null },
  },
  { timestamps: true }
);


export const UserModel = model<UserDocument>("User", UserSchema)