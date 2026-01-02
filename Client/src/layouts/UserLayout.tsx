import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";

const UserLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
