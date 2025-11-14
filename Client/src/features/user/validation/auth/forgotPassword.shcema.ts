import { z } from "zod";

export const forgotPasswordSchema = z.object({
  identifier: z.string().trim().min(3, "Email or username is required"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
