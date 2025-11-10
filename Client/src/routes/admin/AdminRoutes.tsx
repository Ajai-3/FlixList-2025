import { lazy } from "react";
import { Route } from "react-router-dom";
const Home = lazy(() => import("../../features/user/pages/Home"))
const MediaDetail = lazy(() => import("../../features/user/pages/MediaDetail"))


const UserRoutes = (
  <>

  <Route path="/" element={<Home />} />
        <Route path="/media/:type/:id" element={<MediaDetail />} />
  </>
)

export default UserRoutes