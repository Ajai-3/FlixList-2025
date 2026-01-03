import React, { useState } from "react";
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
    <div
      onClick={handleDetails}
      className="relative shrink-0 rounded-xl cursor-pointer w-48 group transition-transform duration-300 hover:scale-105 active:scale-95 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-xl relative">
        {/* Loading Skeleton */}
        {loading && (
          <div
            className="absolute inset-0 bg-gray-900 z-10 animate-fade-in"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-6 h-6 border-2 border-main-color-2 border-t-transparent rounded-full animate-spin"
              />
            </div>
          </div>
        )}

        <div
          className={`relative w-full h-72 transition-opacity duration-500 ease-in-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={movie.title || movie.name || "Movie poster"}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 ease-out group-hover:scale-105"
            onLoad={handleImageLoad}
          />
        </div>

        {/* Bottom Gradient */}
        <div
          className={`absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-gray-900 to-transparent rounded-b-xl transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          style={{ transitionDelay: '300ms' }}
        />

        {/* Bookmark Button */}
        <div
          className={`absolute top-2 right-2 p-1 bg-gray-900/80 rounded-full z-20 transition-all duration-200 hover:scale-110 active:scale-90 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          style={{ transitionDelay: '400ms' }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <BookmarksIcon className="text-white" fontSize="small" />
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 m-2 z-10 transition-all duration-500 ease-out ${
            loading ? "translate-y-5 opacity-0" : "translate-y-0 opacity-100"
          }`}
          style={{ transitionDelay: '500ms' }}
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
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className={`absolute inset-0 bg-green-500/20 rounded-xl pointer-events-none transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default MovieCard;
