import cors from "cors";
import express from "express";
import { limits } from "./infrastructure/rateLimit";
import { config } from "./infrastructure/config/env";
import userRoutes from "./presentation/routes/user/user.routes";
import authRoutes from "./presentation/routes/auth/auth.routes";
import mediaRoutes from "./presentation/routes/user/media.routes";
import adminRoutes from "./presentation/routes/admin/admin.routes";
import { errorHandler } from "./presentation/middlewares/errorHandler";
import { requestLogger } from "./presentation/middlewares/requestLogger";

const app = express();

app.use(cors({
  origin: config.frontend_url, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);

app.use(requestLogger);

app.use(limits.globalLimit);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

export default app;
