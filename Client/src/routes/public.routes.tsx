import { lazy } from "react";
import NotFound from "@/components/NotFound";

// const About = lazy(() => import("@/features/public/pages/About"));
// const Contact = lazy(() => import("@/features/public/pages/Contact"));

export const publicRoutes = [
//   { path: "/about", element: <About /> },
//   { path: "/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
];
