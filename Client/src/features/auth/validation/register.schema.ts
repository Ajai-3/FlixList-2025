import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3, "Name is required"),
  email: z.email().trim().min(3, "Email is required"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
