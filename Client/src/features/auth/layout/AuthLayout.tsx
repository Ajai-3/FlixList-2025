import React from "react";
import { Link, Outlet } from "react-router-dom";
import banner from "../../../public/assets/banners/netflix-banner.jpg";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img src={banner} alt="banner" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black" />

        <div className="absolute inset-0 flex justify-end items-center pr-16">
          <div className="text-right max-w-md text-white">
            <h2 className="text-5xl font-extrabold mb-4 leading-snug text-shadow-lg">
              Discover, Track & Enjoy Movies
            </h2>

            <p className="text-emerald-200 text-lg mb-6 leading-relaxed text-shadow-sm">
              FlixList helps you explore movies, save favorites, track your
              watchlist, and see what's trending.
            </p>

            <Link
              to="/about-update"
              className="inline-block px-4 py-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 font-semibold hover:bg-emerald-500/40 hover:text-white rounded transition-all duration-300"
            >
              Why the change? Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Auth Pages */}
      <div className="md:w-1/2 min-h-screen flex justify-center items-center p-6 relative bg-black">
        <img
          src={banner}
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30 md:opacity-0"
        />

        <div className="absolute inset-0 bg-black/40 md:bg-transparent"></div>

        {/* Form Content */}
        <div className="relative z-10 w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
