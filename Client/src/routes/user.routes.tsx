import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const MediaDetail = lazy(() => import("@/features/media/pages/MediaDetail"));

export const userRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/media/:type/:id",
    element: <MediaDetail />,
  },
];

