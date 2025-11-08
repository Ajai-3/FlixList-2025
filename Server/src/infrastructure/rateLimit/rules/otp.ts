import { createLimit } from '../createLimit';

export const otpLimit = createLimit({
  windowMin: 2,
  max: 3,
  message: 'Too many OTP requests.',
  keyGen: (req) => `otp:${req.ip}:${req.body.email ?? 'anon'}`,
});