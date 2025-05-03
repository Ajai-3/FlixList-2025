import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SeriesDivProps {
  season: {
    poster_path: string | null;
    name: string;
    season_number: number;
    episode_count: number;
  };
}

const SeriesDiv: React.FC<SeriesDivProps> = ({ season }) => {
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

  const seasonDisplayName = season.name === "Specials" 
    ? "Specials" 
    : `Season ${season.season_number}`;

  return (
    <motion.div
      className="relative w-44"
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative h-60 rounded-xl overflow-hidden bg-gray-800 shadow-lg">
        {/* Loading State */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-800/80 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.3, ease: "easeInOut" }
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
        {!imageError && season.poster_path ? (
          <motion.img
            src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
            className="absolute inset-0 w-full h-full object-cover"
            alt={seasonDisplayName}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: loading ? 0 : 1,
              scale: loading ? 0.95 : 1
            }}
            transition={{ 
              opacity: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.7, ease: "easeOut" }
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

      {/* Season Info */}
      <motion.div 
        className="mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center">
          <p className="font-medium truncate text-white">{seasonDisplayName}</p>
          <p className="text-gray-400 text-sm whitespace-nowrap">
            {season.episode_count} {season.episode_count === 1 ? 'Episode' : 'Episodes'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SeriesDiv;