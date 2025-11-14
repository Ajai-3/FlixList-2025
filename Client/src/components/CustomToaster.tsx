import React from "react";
import { Toaster } from "react-hot-toast";

const CustomToaster: React.FC = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "rgba(255, 255, 255, 0.08)",
          color: "#f4f4f5",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "1rem",
          fontSize: "0.875rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px) saturate(150%)",
          WebkitBackdropFilter: "blur(12px) saturate(150%)",
          transition: "all 0.3s ease",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "rgba(255,255,255, 0.8)",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "rgba(255,255,255,0.8)",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
