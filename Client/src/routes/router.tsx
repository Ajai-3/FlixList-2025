import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./user.routes";
import { adminRoutes } from "./admin.routes";
import { authRoutes } from "./auth.routes";
import { publicRoutes } from "./public.routes";


import UserLayout from "@/layouts/UserLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        children: [
          ...userRoutes,
          // ...adminRoutes,
          ...publicRoutes,
        ],
      },
    ],
  },
]);
