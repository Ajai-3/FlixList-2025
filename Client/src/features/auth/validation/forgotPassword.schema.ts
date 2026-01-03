import { z } from "zod";

export const forgotPasswordSchema = z.object({
  identifier: z.string().min(1, { message: "Email or username is required" }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
