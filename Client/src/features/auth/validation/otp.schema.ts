import { z } from "zod";

export const otpSchema = z
  .object({
    otp1: z
      .string()
      .min(1, "All OTP fields are required")
      .regex(/^\d$/, "Must be a number"),
    otp2: z
      .string()
      .min(1, "All OTP fields are required")
      .regex(/^\d$/, "Must be a number"),
    otp3: z
      .string()
      .min(1, "All OTP fields are required")
      .regex(/^\d$/, "Must be a number"),
    otp4: z
      .string()
      .min(1, "All OTP fields are required")
      .regex(/^\d$/, "Must be a number"),
    otp5: z
      .string()
      .min(1, "All OTP fields are required")
      .regex(/^\d$/, "Must be a number"),
    otp6: z
      .string()
      .min(1, "All OTP fields are required")
      .regex(/^\d$/, "Must be a number"),
  })
  .refine((data) => Object.values(data).every((v) => /^\d$/.test(v)), {
    message: "All OTP fields are required and must be numbers",
  });

export type OtpInput = z.infer<typeof otpSchema>;
