import React from 'react';
import { motion } from 'framer-motion'; // Import framer motion

interface NavButtonProps {
  name: string;
  bgColor: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ name, bgColor }) => {
  return (
    <motion.button
      className={`px-4 py-2 rounded-md font-semibold tracking-wider text-md mx-1 ${bgColor ? "bg-main-color-2 text-white" : "bg-transparent text-main-color-2"}`}
      whileHover={{
        scale: 1.1,
        transition: { type: "spring", stiffness: 200, damping: 10 }, 
      }}
      whileTap={{
        scale: 0.95, 
        transition: { type: "spring", stiffness: 200, damping: 10 }, 
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 1 * 0.1, type: "spring", stiffness: 200 }}
    >
      {name}
    </motion.button>
  );
};

export default NavButton;
