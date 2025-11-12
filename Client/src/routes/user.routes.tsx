import { lazy } from "react";
import AuthLayout from "@/features/user/layouts/AuthLayout";

const Home = lazy(() => import("@/features/user/pages/Home"));
const Login = lazy(() => import("@/features/user/pages/auth/Login"));
const SignUp = lazy(() => import("@/features/user/pages/auth/SignUp"));
const OTPPage = lazy(() => import("@/features/user/pages/auth/OTPPage"));
const ForgotPassword = lazy(
  () => import("@/features/user/pages/auth/ForgotPassword")
);
const MediaDetail = lazy(() => import("@/features/user/pages/MediaDetail"));

export const userRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/media/:type/:id",
    element: <MediaDetail />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "verify-otp", element: <OTPPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
];
