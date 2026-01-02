import { lazy } from "react";
import AuthLayout from "@/features/auth/layout/AuthLayout";

const Login = lazy(() => import("@/features/auth/pages/Login"));
const SignUp = lazy(() => import("@/features/auth/pages/SignUp"));
const OTPPage = lazy(() => import("@/features/auth/pages/OTPPage"));
const ForgotPassword = lazy(
  () => import("@/features/auth/pages/ForgotPassword")
);
const ResetPassword = lazy(
  () => import("@/features/auth/pages/ResetPassword")
);

export const authRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "verify-otp", element: <OTPPage /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
];
