import React from "react";
import { motion } from "framer-motion";
import banner1 from "../../assets/Bnners/banner-1.webp";

const Hero: React.FC = () => {
  return (
    <motion.div className="relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, type: "spring", stiffness: 200, }}
    >
      <div className="w-full h-screen bg-cover bg-center relative">
        <img
          src={banner1}
          alt="Banner"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </motion.div>
  );
};

export default Hero;
