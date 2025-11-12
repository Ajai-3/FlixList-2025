import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "./user.routes";
// import { adminRoutes } from "./admin.routes";
import { publicRoutes } from "./public.routes";


export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      ...userRoutes,
      // ...adminRoutes,
      ...publicRoutes,
    ],
  },
]);
