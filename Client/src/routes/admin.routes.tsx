import { lazy } from "react";
import AdminLayout from "@/features/admin/layout/AdminLayout";

const Dashboard = lazy(() => import("@/features/admin/pages/Dashboard"));

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
];
