import { Request } from "express";

//# ============================================================================
//# USER
//# ============================================================================
export const userLoginLimit = {
  windowMin: 10,
  max: 10,
  message: 'Too many login attempts.',
  keyGen: (req: Request) => `user:login:${req.ip}:${req.body?.email ?? 'anon'}`
};

export const userRegisterLimit = {
  windowMin: 10,
  max: 6,
  message: 'Registration attempts exceeded.',
  keyGen: (req: Request) => `user:reg:${req.ip}`
};

export const userVerifyOtpLimit = {
  windowMin: 5,
  max: 5,
  message: 'Too many OTP verifications.',
  keyGen: (req: Request) => `user:otp-verify:${req.ip}:${req.body?.email ?? 'anon'}`
};

export const userResendOtpLimit = {
  windowMin: 2,
  max: 3,
  message: 'Too many OTP resend requests.',
  keyGen: (req: Request) => `user:otp-resend:${req.ip}:${req.body?.email ?? 'anon'}`
};

export const userForgotPasswordLimit = {
  windowMin: 10,
  max: 6,       
  message: 'Too many password reset requests. Please try again later.',
  keyGen: (req: Request) => `user:forgot-pass:${req.ip}:${req.body?.identifier ?? 'anon'}`
};

export const userResetPasswordLimit = {
  windowMin: 5,
  max: 5,       
  message: 'Too many password reset attempts. Please try again later.',
  keyGen: (req: Request) => `user:reset-pass:${req.ip}:${req.body?.token ? 'token' : 'anon'}`
};

export const userLogoutLimit = {
  windowMin: 10,
  max: 30,
  message: 'Logout spam detected.',
  keyGen: (req: Request) => `user:logout:${req.ip}`
};
