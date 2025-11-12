import express, { RequestHandler } from "express";
import { TYPES } from "../../../infrastructure/invercify/types";
import { limits } from "../../../infrastructure/rateLimit/index";
import { container } from "../../../infrastructure/invercify/invercify.config";
import { IUserAuthController } from "../../interfaces/auth/IUserAuthController";
import { IAdminAuthController } from "./../../interfaces/auth/IAdminAuthController";
import { ISessionController } from "../../interfaces/auth/ISessionController";

const router = express.Router();

const userAuth = container.get<IUserAuthController>(TYPES.IUserAuthController);
const sessionAuth = container.get<ISessionController>(TYPES.ISessionController);
const adminAuth = container.get<IAdminAuthController>(
  TYPES.IAdminAuthController
);

// SESSION ROUTES
router.get("/bootstrap", limits.session, sessionAuth.bootstrap as RequestHandler)
router.get("/refresh-token", limits.session, sessionAuth.refreshToken as RequestHandler)

// USER AUTH ROUTES
router.post("/user/login", limits.userLogin, userAuth.userLogin as RequestHandler);
router.post("/user/verify-otp", limits.userVerifyOtp, userAuth.verifyOtp as RequestHandler);
router.post("/user/resend-otp", limits.userResendOtp, userAuth.resendOtp as RequestHandler);
router.post("/user/register", limits.userRegister, userAuth.userRegister as RequestHandler);
router.post("/user/logout", limits.userLogout, userAuth.userLogout as RequestHandler);

// ADMIN AUTH ROUTES
router.post("/admin/login", limits.adminLogin, adminAuth.adminLogin as RequestHandler);
router.post("/admin/logout", limits.adminLogout, adminAuth.adminLogout as RequestHandler);

export default router;
