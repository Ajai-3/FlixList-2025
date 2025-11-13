import * as authCfg from "./rules/auth";
import { createLimit } from "./createLimit";
import { testLimitConfig } from "./rules/test";
import { globalLimitConfig } from "./rules/global";
import { RateLimitRequestHandler } from "express-rate-limit";

type LimitRegistry = {
  globalLimit: RateLimitRequestHandler;
  testLimit: RateLimitRequestHandler;

  // auth
  session: RateLimitRequestHandler;
  userLogin: RateLimitRequestHandler;
  userRegister: RateLimitRequestHandler;
  userVerifyOtp: RateLimitRequestHandler;
  userResendOtp: RateLimitRequestHandler;
  userResetPasswordLimit: RateLimitRequestHandler;
  userForgotPasswordLimit: RateLimitRequestHandler;
  userLogout: RateLimitRequestHandler;
  adminLogin: RateLimitRequestHandler;
  adminLogout: RateLimitRequestHandler;
};

export const limits = {} as LimitRegistry;

export const initRateLimits = () => {
  limits.globalLimit = createLimit(globalLimitConfig);
  limits.testLimit = createLimit(testLimitConfig);

  // auth – turn configs into middleware
  limits.session = createLimit(authCfg.sessionLimit);
  limits.userLogin = createLimit(authCfg.userLoginLimit);
  limits.userRegister = createLimit(authCfg.userRegisterLimit);
  limits.userVerifyOtp = createLimit(authCfg.userVerifyOtpLimit);
  limits.userResendOtp = createLimit(authCfg.userResendOtpLimit);
  limits.userResetPasswordLimit = createLimit(authCfg.userResetPasswordLimit);
  limits.userForgotPasswordLimit = createLimit(authCfg.userForgotPasswordLimit);
  limits.userLogout = createLimit(authCfg.userLogoutLimit);
  limits.adminLogin = createLimit(authCfg.adminLoginLimit);
  limits.adminLogout = createLimit(authCfg.adminLogoutLimit);
};
