import React, { useState } from "react";

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
    <div
      className="cursor-pointer flex-shrink-0 animate-fade-in hover:scale-105 transition-transform duration-300"
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
        {!imageError && member.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            alt={member.name}
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

      {/* Cast Info */}
      <div
        className="mt-2 w-36 animate-fade-in delay-200"
      >
        <h1 className="text-md font-medium truncate text-white">
          {member.name}
        </h1>
        <h2 className="text-sm text-gray-400 truncate">{member.character}</h2>
      </div>
    </div>
  );
};

export default CastDiv;
