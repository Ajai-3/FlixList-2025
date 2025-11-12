//# ============================================================================
//# SESSION
//# ============================================================================
export const sessionLimit = {
  windowMin: 1,
  max: 15,
  message: 'Too many refresh attempts.',
  keyGen: (req: any) => `user:login:${req.ip}:${req.body.email ?? 'anon'}`
};

//# ============================================================================
//# USER
//# ============================================================================
export const userLoginLimit = {
  windowMin: 1,
  max: 10,
  message: 'Too many login attempts.',
  keyGen: (req: any) => `user:login:${req.ip}:${req.body.email ?? 'anon'}`
};

export const userRegisterLimit = {
  windowMin: 1,
  max: 5,
  message: 'Registration attempts exceeded.',
  keyGen: (req: any) => `user:reg:${req.ip}`
};

export const userVerifyOtpLimit = {
  windowMin: 1,
  max: 5,
  message: 'Too many OTP verifications.',
  keyGen: (req: any) => `user:otp-verify:${req.ip}:${req.body.email ?? 'anon'}`
};

export const userResendOtpLimit = {
  windowMin: 1,
  max: 3,
  message: 'Too many OTP resend requests.',
  keyGen: (req: any) => `user:otp-resend:${req.ip}:${req.body.email ?? 'anon'}`
};

export const userLogoutLimit = {
  windowMin: 1,
  max: 30,
  message: 'Logout spam detected.',
  keyGen: (req: any) => `user:logout:${req.ip}`
};

//# ============================================================================
//# ADMIN
//# ============================================================================
export const adminLoginLimit = {
  windowMin: 1,
  max: 5,
  message: 'Too many admin login attempts.',
  keyGen: (req: any) => `admin:login:${req.ip}:${req.body.email ?? 'anon'}`
};

export const adminLogoutLimit = {
  windowMin: 1,
  max: 30,
  message: 'Admin logout spam detected.',
  keyGen: (req: any) => `admin:logout:${req.ip}`
};