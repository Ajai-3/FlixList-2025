import React, { useState } from "react";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { languageMap } from "@/app/constants/LanguageMap";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: {
    id: number;
    name?: string;
    poster_path: string;
    title: string;
    original_language: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setTimeout(() => setLoading(false), 100);
  };

  const rating = movie.vote_average;
  let ratingColor: string;

  if (rating >= 8) {
    ratingColor = "text-green-500";
  } else if (rating >= 6) {
    ratingColor = "text-yellow-500";
  } else if (rating >= 4) {
    ratingColor = "text-orange-500";
  } else {
    ratingColor = "text-red-500";
  }

  const getType = (media: any): "movie" | "series" | "anime" => {
    if (media.title || media.release_date) {
      return "movie";
    }
    return "series";
  };

  const handleDetails = () => {
    const type = getType(movie);
    if (movie.poster_path) {
      const img = new Image();
      img.src = `https://image.tmdb.org/t/p/w1280${movie.poster_path}`;
    }
    navigate(`/media/${type}/${movie.id}`);
  };

  return (
    <motion.div
      onClick={handleDetails}
      className="relative shrink-0 rounded-xl cursor-pointer w-48"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 200, damping: 8 },
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, type: "tween" }}
    >
      <div className="overflow-hidden rounded-xl relative">
        {/* Loading Skeleton - Using a more subtle loading animation */}
        {loading && (
          <motion.div
            className="absolute inset-0 bg-gray-900 z-10"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 border-2 border-main-color-2 border-t-transparent rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          className="relative w-full h-72"
          initial={{ opacity: 0 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          <motion.img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title || movie.name || "Movie poster"}
            className="w-full h-full object-cover rounded-xl"
            initial={{ scale: 0.98 }}
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            onLoad={handleImageLoad}
          />
        </motion.div>

        {/* Bottom Gradient */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-gray-900 to-transparent rounded-b-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: loading ? 0 : 1,
            transition: { delay: 0.3 },
          }}
        />

        {/* Bookmark Button */}
        <motion.div
          className="absolute top-2 right-2 p-1 bg-gray-900/80 rounded-full z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: loading ? 0 : 1,
            transition: { delay: 0.4 },
          }}
        >
          <BookmarksIcon className="text-white" fontSize="small" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 m-2 z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: loading ? 20 : 0,
            opacity: loading ? 0 : 1,
            transition: {
              delay: 0.5,
              duration: 0.5,
              ease: "easeOut",
            },
          }}
        >
          <div className="text-xs flex gap-2 flex-wrap">
            <p className="bg-black/50 px-2 rounded-full">
              {languageMap[movie.original_language] || movie.original_language}
            </p>
            <p className="bg-black/50 px-2 rounded-full">
              {movie.release_date?.split("-")[0] ||
                movie.first_air_date?.split("-")[0]}
            </p>
            <div
              className={`flex items-center bg-black/50 px-2 rounded-full font-semibold ${ratingColor}`}
            >
              <StarIcon sx={{ fontSize: 15, marginRight: 0.3 }} />
              {rating.toFixed(1)}
            </div>
          </div>
          <p className="w-full truncate text-lg font-semibold tracking-wider mt-1">
            {movie.title || movie.name}
          </p>
        </motion.div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-green-500/20 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

export default MovieCard;
