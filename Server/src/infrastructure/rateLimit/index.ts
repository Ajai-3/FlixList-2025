import * as userCfg from "./rules/user";
import * as adminCfg from "./rules/admin";
import { createLimit } from "./createLimit";
import * as sessionCfg from "./rules/session";
import { testLimitConfig } from "./rules/test";
import { globalLimitConfig } from "./rules/global";
import { RateLimitRequestHandler } from "express-rate-limit";

type LimitRegistry = {
  testLimit: RateLimitRequestHandler;
  globalLimit: RateLimitRequestHandler;

  // Session
  session: RateLimitRequestHandler;

  // User
  userLogin: RateLimitRequestHandler;
  userLogout: RateLimitRequestHandler;
  userRegister: RateLimitRequestHandler;
  userVerifyOtp: RateLimitRequestHandler;
  userResendOtp: RateLimitRequestHandler;
  userResetPasswordLimit: RateLimitRequestHandler;
  userForgotPasswordLimit: RateLimitRequestHandler;

  // Admin
  adminLogin: RateLimitRequestHandler;
  adminLogout: RateLimitRequestHandler;
};

export const limits = {} as LimitRegistry;

export const initRateLimits = () => {
  limits.globalLimit = createLimit(globalLimitConfig);
  limits.testLimit = createLimit(testLimitConfig);

  // Session
  limits.session = createLimit(sessionCfg.sessionLimit);

  // User
  limits.userLogin = createLimit(userCfg.userLoginLimit);
  limits.userRegister = createLimit(userCfg.userRegisterLimit);
  limits.userVerifyOtp = createLimit(userCfg.userVerifyOtpLimit);
  limits.userResendOtp = createLimit(userCfg.userResendOtpLimit);
  limits.userResetPasswordLimit = createLimit(userCfg.userResetPasswordLimit);
  limits.userForgotPasswordLimit = createLimit(userCfg.userForgotPasswordLimit);
  limits.userLogout = createLimit(userCfg.userLogoutLimit);

  // Admin
  limits.adminLogin = createLimit(adminCfg.adminLoginLimit);
  limits.adminLogout = createLimit(adminCfg.adminLogoutLimit);
};
