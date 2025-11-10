import React, { useState } from "react";
import { motion } from "framer-motion";
import banner1 from "../../../../assets/Bnners/banner-1.webp";

interface MediaProps {
  media: any;
}

const Hero: React.FC<MediaProps> = ({ media }) => {
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setImageError(true);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
    >
      <div className="w-full h-screen bg-cover bg-center relative overflow-hidden">
        {/* Loading state */}
        {loading && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-800/40 flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-main-color-2 border-t-main-color-2 rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm mt-2">Loading media...</p>
            </div>
          </motion.div>
        )}

        {/* Fallback image in case of error */}
        {imageError && (
          <motion.img
            src={banner1}
            alt="Fallback Banner"
            className="w-full h-full object-cover opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Main image */}
        {!imageError && (
          <motion.img
            src={
              media?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
                : banner1
            }
            alt="Banner"
            className="w-full h-full object-cover opacity-70"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{
              opacity: loading ? 0 : 0.7,
              scale: loading ? 1.05 : 1,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default Hero;