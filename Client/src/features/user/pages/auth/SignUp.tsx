import React, { useState } from 'react';
import { Eye, EyeOff, Popcorn, Film, Clapperboard, Star, Ticket, Video, Camera, Users, Heart, Calendar } from 'lucide-react';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up data:', formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 relative overflow-hidden">
      {/* More Movie Icons in Random Places */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Film className="absolute top-4 left-4 w-20 h-20 text-white animate-float" />
        <Clapperboard className="absolute top-10 right-8 w-24 h-24 text-white animate-float" style={{ animationDelay: '1s' }} />
        <Star className="absolute top-40 left-10 w-16 h-16 text-white animate-float" style={{ animationDelay: '2s' }} />
        <Ticket className="absolute bottom-40 right-12 w-14 h-14 text-white animate-float" style={{ animationDelay: '1.5s' }} />
        <Video className="absolute bottom-20 left-20 w-18 h-18 text-white animate-float" style={{ animationDelay: '0.5s' }} />
        <Popcorn className="absolute top-32 right-20 w-12 h-12 text-white animate-float" style={{ animationDelay: '2.5s' }} />
        <Camera className="absolute bottom-10 left-12 w-22 h-22 text-white animate-float" style={{ animationDelay: '3s' }} />
        <Users className="absolute bottom-16 right-16 w-20 h-20 text-white animate-float" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute top-24 left-32 w-14 h-14 text-white animate-float" style={{ animationDelay: '1.8s' }} />
        <Calendar className="absolute top-52 right-32 w-16 h-16 text-white animate-float" style={{ animationDelay: '2.2s' }} />
        <Star className="absolute bottom-32 left-28 w-24 h-24 text-white animate-float" style={{ animationDelay: '0.8s' }} />
        <Film className="absolute top-16 right-40 w-18 h-18 text-white animate-float" style={{ animationDelay: '2.8s' }} />
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Popcorn className="w-12 h-12 text-main-color-1" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-main-color-1 to-main-color-2 bg-clip-text text-transparent ml-3">
              FlixList
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Track Your Movie Journey</p>
          <p className="text-gray-500 text-sm mt-2">Join millions of movie enthusiasts</p>
        </div>

        {/* Signup Form */}
        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main-color-1 focus:border-transparent"
                placeholder="Username"
                required
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main-color-1 focus:border-transparent"
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
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main-color-1 focus:border-transparent pr-12"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-main-color-1"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-gray-900/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-main-color-1 focus:border-transparent pr-12"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-main-color-1"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-main-color-1 to-main-color-2 text-gray-900 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-main-color-1/25 transform hover:scale-[1.02] transition-all text-lg"
            >
              Create Account
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
              Already have an account?{' '}
              <a href="/login" className="text-main-color-1 hover:text-main-color-2 font-semibold">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;