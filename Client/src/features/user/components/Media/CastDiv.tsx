import React, { useState } from "react";
import { motion } from "framer-motion";

interface CastMember {
  member: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  };
}

const CastDiv: React.FC<CastMember> = ({ member }) => {
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
      className="cursor-pointer flex-shrink-0"
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 10 },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative h-56 w-36 rounded-xl overflow-hidden bg-gray-800 shadow-lg">
        {/* Loading State */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-800/80 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
          >
            <motion.div
              className="w-8 h-8 border-2 border-main-color-2 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* Actual Image */}
        {!imageError && member.profile_path ? (
          <motion.img
            src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
            className="absolute inset-0 w-full h-full object-cover"
            alt={member.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: loading ? 0 : 1,
              scale: loading ? 0.95 : 1,
            }}
            transition={{
              opacity: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.7, ease: "easeOut" },
            }}
          />
        ) : (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            No Image
          </motion.div>
        )}
      </div>

      {/* Cast Info */}
      <motion.div
        className="mt-2 w-36"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-md font-medium truncate text-white">
          {member.name}
        </h1>
        <h2 className="text-sm text-gray-400 truncate">{member.character}</h2>
      </motion.div>
    </motion.div>
  );
};

export default CastDiv;
