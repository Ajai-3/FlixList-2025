import { StepForward } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Banner */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 flex-col justify-center items-center text-center p-10 md:p-16">
        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6 cursor-pointer hover:bg-emerald-500/80">
          <StepForward className="w-12 h-12 text-2xl font-bold text-white" />
        </div>

        <h2 className="text-4xl md:text-4xl font-bold text-white mb-6 leading-snug">
          Discover, Track & Enjoy Movies
        </h2>
        <p className="text-emerald-100 mb-8 max-w-md leading-relaxed">
          FlixList helps you explore movies, save favorites, track your
          watchlist, and see what’s trending.
        </p>
        <a
          href="/about-update"
          className="text-emerald-300 font-semibold hover:underline"
        >
          Why the change? Get the full story
        </a>
      </div>

      <div className="md:w-1/2 min-h-screen flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
