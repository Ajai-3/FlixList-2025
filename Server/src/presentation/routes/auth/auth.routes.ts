import express from "express";
import { TYPES } from "../../../infrastructure/invercify/types";
import container from "../../../infrastructure/invercify/invercify.config";
import { IUserAuthController } from "../../interfaces/auth/IUserAuthController";

const router = express.Router();

const userAuthController = container.get<IUserAuthController>(TYPES.IUserAuthController)

router.post("/user/register", userAuthController.userRegister)


export default router;

