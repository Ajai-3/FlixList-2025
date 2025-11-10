import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { searchMedia } from "../../../../api/SearchMedia";
import { languageMap } from "../../../../constants/LanguageMap";
import { getRatingColor } from "../../../../utils/getRatingColor";
import { useNavigate } from "react-router-dom";

const NavInput: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setError(null); 
  }, []);

  const handleResultClick = useCallback((mediaType: string, id: number) => {
    setResults([]);
    setHasSearched(false);
    navigate(`/media/${mediaType === "tv" ? "series" : "movie"}/${id}`);
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        setError(null);
        try {
          const data = await searchMedia(searchQuery);
          if (!data) {
            throw new Error("No data returned from API");
          }
          setResults(data);
          setHasSearched(true);
        } catch (error) {
          console.error("Search error:", error);
          setError("Failed to fetch results");
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setSearchQuery("");
        setHasSearched(false);
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResults = useMemo(() => {
    return results
      .filter(media => 
        media.poster_path && 
        (media.media_type === "movie" || media.media_type === "tv")
      )
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  }, [results]);

  const inputVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: 0.1, type: "spring", stiffness: 200 }
    },
    focus: {
      scale: 1.03,
      borderColor: "#00e90e",
      boxShadow: "0 0 10px rgba(0, 233, 14, 0.5)",
      transition: { duration: 0.3, type: "spring" }
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <motion.input
          whileFocus="focus"
          variants={inputVariants}
          className="bg-black/70 relative outline-none border border-gray-500 p-[10px] rounded-md w-96"
          type="text"
          placeholder="Search...."
          value={searchQuery}
          onChange={handleSearch}
        />
        {isLoading && (
          <motion.div
            className="absolute right-3 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-5 h-5 border-2 border-main-color-2 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </motion.div>

      {searchQuery && (filteredResults.length > 0 || hasSearched || error) && (
        <motion.div
          className="absolute scrollbar-hidden bg-black/95 w-96 max-h-[500px] mt-1 overflow-y-auto rounded-md shadow-lg z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {error ? (
            <div className="p-4 text-center text-red-400">
              {error}
            </div>
          ) : isLoading ? (
            <div className="flex justify-center items-center h-20">
              <div className="w-6 h-6 border-2 border-main-color-2 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((media) => (
              <motion.div
                key={`${media.id}-${media.media_type}`}
                className="flex gap-4 p-3 hover:bg-gray-800/50 transition-colors cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleResultClick(media.media_type, media.id)}
              >
                <div className="w-24 shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${media.poster_path}`}
                    className="w-24 h-32 object-cover rounded-md"
                    alt={media.name || media.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-poster.jpg';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {media.name || media.title}
                  </p>
                  <p className="text-gray-400 text-xs mb-1">
                    {media.media_type} •{" "}
                    {media.first_air_date?.split("-")[0] ||
                      media.release_date?.split("-")[0] ||
                      "Unknown"}
                  </p>
                  <div className="flex gap-2 items-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getRatingColor(media.vote_average)}`}>
                      {media.vote_average.toFixed(1)}
                    </span>
                    <span className="text-xs bg-white/20 px-2 rounded-full">
                      {languageMap[media.original_language] || media.original_language}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              No results found for "{searchQuery}"
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default NavInput;