// 1.  USER  -------------------------------------------------
export const userLoginLimit = {
  windowMin: 15,
  max: 5,
  message: 'Too many login attempts.',
  keyGen: (req: any) => `user:login:${req.ip}:${req.body.email ?? 'anon'}`
};

export const userRegisterLimit = {
  windowMin: 10,
  max: 3,
  message: 'Registration attempts exceeded.',
  keyGen: (req: any) => `user:reg:${req.ip}`
};

export const userVerifyOtpLimit = {
  windowMin: 2,
  max: 3,
  message: 'Too many OTP verifications.',
  keyGen: (req: any) => `user:otp-verify:${req.ip}:${req.body.email ?? 'anon'}`
};

export const userResendOtpLimit = {
  windowMin: 2,
  max: 3,
  message: 'Too many OTP resend requests.',
  keyGen: (req: any) => `user:otp-resend:${req.ip}:${req.body.email ?? 'anon'}`
};

export const userLogoutLimit = {
  windowMin: 1,
  max: 60,
  message: 'Logout spam detected.',
  keyGen: (req: any) => `user:logout:${req.ip}`
};

// 2.  ADMIN  ------------------------------------------------
export const adminLoginLimit = {
  windowMin: 15,
  max: 5,
  message: 'Too many admin login attempts.',
  keyGen: (req: any) => `admin:login:${req.ip}:${req.body.email ?? 'anon'}`
};

export const adminLogoutLimit = {
  windowMin: 1,
  max: 60,
  message: 'Admin logout spam detected.',
  keyGen: (req: any) => `admin:logout:${req.ip}`
};