import { lazy } from "react";
import { Route } from "react-router-dom";
import AuthLayout from "../../features/user/layouts/user/AuthLayout";
const Home = lazy(() => import("../../features/user/pages/Home"));
const Login = lazy(() => import("../../features/user/pages/auth/Login"));
const SignUp = lazy(() => import("../../features/user/pages/auth/SignUp"));
const OTPPage = lazy(() => import("../../features/user/pages/auth/OTPPage"));
const ForgotPassword = lazy(
  () => import("../../features/user/pages/auth/ForgotPassword")
);
const MediaDetail = lazy(() => import("../../features/user/pages/MediaDetail"));

const UserRoutes = (
  <>
    <Route path="/auth" element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="verify-otp" element={<OTPPage />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
    </Route>

    <Route path="/" element={<Home />} />
    <Route path="/media/:type/:id" element={<MediaDetail />} />
  </>
);

export default UserRoutes;
