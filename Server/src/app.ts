import express from "express";
import userRoutes from "./presentation/routes/user/user.routes";
import authRoutes from "./presentation/routes/auth/auth.routes";
import mediaRoutes from "./presentation/routes/user/media.routes";
import adminRoutes from "./presentation/routes/admin/admin.routes";
import { errorHandler } from "./presentation/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1); 

// app.get("/", (req, res) => {
//   const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
//   console.log(`User IP Address: ${userIP}`);
//   res.send(`Your IP address is: ${userIP}`);
// });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

export default app;
