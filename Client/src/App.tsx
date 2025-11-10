import React, { Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import UserRoutes from "./routes/user/UserRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";
import { Routes, Route, useLocation } from "react-router-dom";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/media/:type/:id" element={<MediaDetail />} />
      </Routes> */}

      <Suspense fallback={<h1>loading</h1>}>
        <Routes>
          {/* User Routes */}
          {UserRoutes}

          {/* Admin Routes */}
          {AdminRoutes}

          {/* 404 */}
          <Route path="*" element={<h1> Not found</h1>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default App;
