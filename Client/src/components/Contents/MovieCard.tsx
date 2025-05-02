import React from "react";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { languageMap } from "../../constants/LanguageMap.ts";

interface MovieCardProps {
  movie: {
    id: number;
    name?: string,
    poster_path: string;
    title: string;
    language: string;
    original_language: string
    release_date?: string;
    first_air_date?: string;
    vote_average: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const rating = parseFloat(movie.vote_average);
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

  return (
    <motion.div
      className="relative shrink-0 rounded-xl cursor-pointer"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 255, 0, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 200, damping: 8 },
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 200 }}
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          className="w-56 h-80 rounded-xl object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-gray-900 to-transparent rounded-b-xl"></div>
      </div>
      <div className="absolute flex items-center top-2 right-2 text-sm rounded-full">
        <BookmarksIcon />
      </div>
      <div className="absolute bottom-0 left-0 right-0 m-2">
        <div className="text-xs flex gap-2">
          <p className="bg-black/50 px-2 rounded-full">{languageMap[movie.original_language]}</p>{" "}
          <p className="bg-black/50 px-2 rounded-full">
            {movie.release_date
              ? movie.release_date.split("-")[0]
              : movie.first_air_date?.split("-")[0]}
          </p>
          <div
            className={`flex items-center bg-black/50 px-2 rounded-full font-semibold tracking-wider ${ratingColor}`}
          >
            <StarIcon sx={{ fontSize: 15, marginRight: 0.3 }} />
            {parseFloat(movie.vote_average).toFixed(1)}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="w-50 truncate text-xl font-semibold tracking-wider">
            {movie.title ? movie.title : movie.name}
          </p>{" "}
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
