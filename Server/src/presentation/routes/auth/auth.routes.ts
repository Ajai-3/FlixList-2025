import express from "express";
import { TYPES } from "../../../infrastructure/invercify/types";
import { limits } from "../../../infrastructure/rateLimit/index";
import container from "../../../infrastructure/invercify/invercify.config";
import { IUserAuthController } from "../../interfaces/auth/IUserAuthController";


const router = express.Router();

const userAuthController = container.get<IUserAuthController>(
  TYPES.IUserAuthController
);

router.get("/test", limits.testLimit, (req, res) =>
  res.json({ yourIp: req.ip })
);
router.post("/user/register", userAuthController.userRegister);

export default router;
