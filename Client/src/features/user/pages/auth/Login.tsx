import React, { useState } from 'react';
import { Eye, EyeOff, Popcorn, Film, Clapperboard, Star, Ticket, Video, Camera, Users, Heart, Calendar } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 relative overflow-hidden">
      {/* More Movie Icons in Random Places */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Clapperboard className="absolute top-8 left-8 w-22 h-22 text-white animate-float" />
        <Film className="absolute top-12 right-12 w-18 h-18 text-white animate-float" style={{ animationDelay: '1.2s' }} />
        <Star className="absolute top-36 left-16 w-20 h-20 text-white animate-float" style={{ animationDelay: '2.1s' }} />
        <Ticket className="absolute bottom-32 right-16 w-16 h-16 text-white animate-float" style={{ animationDelay: '1.8s' }} />
        <Video className="absolute bottom-24 left-20 w-18 h-18 text-white animate-float" style={{ animationDelay: '0.7s' }} />
        <Popcorn className="absolute top-44 right-20 w-14 h-14 text-white animate-float" style={{ animationDelay: '2.8s' }} />
        <Camera className="absolute bottom-12 left-12 w-24 h-24 text-white animate-float" style={{ animationDelay: '3.2s' }} />
        <Users className="absolute bottom-16 right-20 w-22 h-22 text-white animate-float" style={{ animationDelay: '1.5s' }} />
        <Heart className="absolute top-24 left-28 w-16 h-16 text-white animate-float" style={{ animationDelay: '2.4s' }} />
        <Calendar className="absolute top-52 right-28 w-18 h-18 text-white animate-float" style={{ animationDelay: '1.9s' }} />
        <Star className="absolute bottom-28 left-24 w-26 h-26 text-white animate-float" style={{ animationDelay: '0.9s' }} />
        <Film className="absolute top-20 right-36 w-20 h-20 text-white animate-float" style={{ animationDelay: '2.6s' }} />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Popcorn className="w-12 h-12 text-main-color-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-main-color-2 to-main-color-1 bg-clip-text text-transparent ml-3">
              FlixList
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Welcome Back</p>
          <p className="text-gray-500 text-sm mt-2">Continue your movie journey</p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main-color-2 focus:border-transparent"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main-color-2 focus:border-transparent pr-12"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-main-color-2"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password - INCLUDED */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-main-color-2 bg-gray-700 border-gray-600 rounded focus:ring-main-color-2"
                />
                <label htmlFor="remember" className="ml-3 text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="/forgot-password" className="text-sm text-main-color-1 hover:text-main-color-2 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-main-color-2 to-main-color-1 text-gray-900 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-main-color-2/25 transform hover:scale-[1.02] transition-all text-lg"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">Or continue with</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Social Login - INCLUDED */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white hover:bg-gray-800 hover:border-main-color-1 transition-all">
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl text-white hover:bg-gray-800 hover:border-main-color-2 transition-all">
              <span className="text-sm font-medium">Twitter</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-main-color-2 hover:text-main-color-1 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;