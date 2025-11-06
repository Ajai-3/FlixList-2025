import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import MediaDetail from "./pages/MediaDetail";
import { AnimatePresence } from "framer-motion";
import UserManagementPanel from "./assets/UserManagementPanel";

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/media/:type/:id" element={<MediaDetail />} />
        <Route path="/test" element={<UserManagementPanel />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
