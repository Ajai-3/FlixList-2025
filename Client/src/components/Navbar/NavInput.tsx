import React from "react";
import { motion } from "framer-motion";

const NavInput: React.FC = () => {
  return (
    <>
      <motion.input
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 1 * 0.1,
          type: "spring",
          stiffness: 200,
        }}
        className="bg-black/70 outline-none border border-gray-500 p-[10px] rounded-md w-96"
        type="text"
        placeholder="Search movies"
        whileFocus={{
            scale: 1.03,
            borderColor: "#00e90e",
            boxShadow: "0 0 10px rgba(0, 233, 14, 0.5)", 
            transition: { duration: 0.3, type: "spring" },
          }}
      />
    </>
  );
};

export default NavInput;
