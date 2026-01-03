import React, { useState } from 'react';

interface SeriesDivProps {
  season: {
    poster_path: string | null;
    name: string;
    season_number: number;
    episode_count: number;
  };
  onClick: () => void;
}

const SeriesDiv: React.FC<SeriesDivProps> = ({ season, onClick }) => {
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
    <div
      className="relative w-36 cursor-pointer animate-fade-in hover:scale-105 transition-transform duration-300"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-56 w-36 rounded-xl overflow-hidden bg-gray-800 shadow-lg">
        {/* Loading State */}
        {loading && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-800/80 z-10 animate-fade-in"
          >
            <div
              className="w-8 h-8 border-2 border-main-color-2 border-t-transparent rounded-full animate-spin"
            />
          </div>
        )}

        {/* Actual Image */}
        {!imageError && season.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            alt={seasonDisplayName}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-700 text-gray-400 animate-fade-in"
          >
            No Image
          </div>
        )}
      </div>

      {/* Season Info */}
      <div 
        className="mt-2 animate-fade-in delay-200"
      >
        <div className="flex justify-between items-center w-36">
          <p className="font-medium truncate text-white text-sm">{seasonDisplayName}</p>
          <p className="text-gray-400 text-xs whitespace-nowrap">
            {season.episode_count} {season.episode_count === 1 ? 'Episode' : 'Episodes'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeriesDiv;