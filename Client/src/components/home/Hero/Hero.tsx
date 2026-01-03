import React, { useState } from "react";
import banner1 from "../../../public/assets/banners/banner-1.webp";

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
    <div className="relative animate-slide-up">
      <div className="w-full h-screen bg-cover bg-center relative overflow-hidden">
        {/* Loading state */}
        {loading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-gray-800/40 flex items-center justify-center animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-main-color-2 border-t-main-color-2 rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm mt-2">Loading media...</p>
            </div>
          </div>
        )}

        {/* Fallback image in case of error */}
        {imageError && (
          <img
            src={banner1}
            alt="Fallback Banner"
            className="w-full h-full object-cover opacity-70 animate-fade-in"
          />
        )}

        {/* Main image */}
        {!imageError && (
          <img
            src={
              media?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${media.backdrop_path}`
                : banner1
            }
            alt="Banner"
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              loading ? "opacity-0 scale-105" : "opacity-70 scale-100"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent animate-fade-in delay-300" />
      </div>
    </div>
  );
};

export default Hero;