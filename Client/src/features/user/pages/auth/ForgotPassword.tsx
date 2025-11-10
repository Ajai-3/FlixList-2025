import React, { useState } from 'react';
import { Popcorn, Film, Clapperboard, Star, Ticket, Video, Camera, Users, Heart, Calendar, Mail } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password for:', email);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 relative overflow-hidden">
      {/* Movie Icons Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Film className="absolute top-6 left-6 w-18 h-18 text-white animate-float" />
        <Clapperboard className="absolute top-14 right-10 w-20 h-20 text-white animate-float" style={{ animationDelay: '1s' }} />
        <Star className="absolute top-38 left-14 w-16 h-16 text-white animate-float" style={{ animationDelay: '2s' }} />
        <Ticket className="absolute bottom-34 right-14 w-14 h-14 text-white animate-float" style={{ animationDelay: '1.5s' }} />
        <Video className="absolute bottom-22 left-18 w-16 h-16 text-white animate-float" style={{ animationDelay: '0.5s' }} />
        <Camera className="absolute bottom-14 left-14 w-20 h-20 text-white animate-float" style={{ animationDelay: '3s' }} />
        <Users className="absolute bottom-18 right-18 w-18 h-18 text-white animate-float" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute top-26 left-30 w-14 h-14 text-white animate-float" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-12 h-12 text-main-color-1" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-main-color-1 to-main-color-2 bg-clip-text text-transparent ml-3">
              FlixList
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Reset Your Password</p>
          <p className="text-gray-500 text-sm mt-2">Enter your email to receive reset instructions</p>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main-color-1 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-main-color-1 to-main-color-2 text-gray-900 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-main-color-1/25 transform hover:scale-[1.02] transition-all text-lg"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Remember your password?{' '}
              <a href="/login" className="text-main-color-1 hover:text-main-color-2 font-semibold">
                Back to login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;