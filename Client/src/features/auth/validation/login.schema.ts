import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().trim().min(3, "Email or username is required"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
