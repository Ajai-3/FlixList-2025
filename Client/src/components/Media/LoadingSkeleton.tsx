import React from 'react'
import Navbar from '../Navbar/Navbar';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative">
      <Navbar />

      <div className="flex absolute top-36 px-32 items-end w-full">
        {/* Poster Skeleton */}
        <div className="flex flex-col gap-3 flex-none">
          <div className="w-[320px] h-[480px] rounded-3xl bg-gray-800 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-10 w-full bg-gray-800 rounded-md animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="px-20 mb-10 w-full">
          {/* Button skeletons */}
          <div className="flex items-center justify-between py-10">
            <div className="w-48 h-10 bg-gray-800 rounded-md animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-800 rounded-md animate-pulse"></div>
          </div>

          {/* Title */}
          <div className="h-14 w-3/4 bg-gray-800 rounded-md mb-6 animate-pulse"></div>

          {/* Genres */}
          <div className="flex gap-4 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-20 bg-gray-800 rounded-full animate-pulse"></div>
            ))}
          </div>

          {/* Info tags */}
          <div className="flex flex-col gap-4 py-6">
            <div className="flex gap-2 items-center">
              <div className="w-24 h-6 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="w-12 h-6 bg-gray-800 rounded-full animate-pulse"></div>
              <div className="w-28 h-6 bg-gray-800 rounded-full animate-pulse"></div>
            </div>

            <div className="flex gap-4 text-sm">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-gray-800 rounded-full w-28 h-8 animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2 mt-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-full h-4 bg-gray-800 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;