import React, { useState } from 'react';
import { Popcorn, Film, Clapperboard, Star, Ticket, Video, Camera, Users, Heart, Calendar, Shield } from 'lucide-react';

const OTPPage: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('OTP submitted:', otp.join(''));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 relative overflow-hidden">
      {/* Movie Icons Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Film className="absolute top-8 left-8 w-16 h-16 text-white animate-float" />
        <Clapperboard className="absolute top-16 right-12 w-18 h-18 text-white animate-float" style={{ animationDelay: '1s' }} />
        <Star className="absolute top-42 left-12 w-14 h-14 text-white animate-float" style={{ animationDelay: '2s' }} />
        <Ticket className="absolute bottom-36 right-12 w-12 h-12 text-white animate-float" style={{ animationDelay: '1.5s' }} />
        <Video className="absolute bottom-24 left-16 w-14 h-14 text-white animate-float" style={{ animationDelay: '0.5s' }} />
        <Camera className="absolute bottom-16 left-12 w-18 h-18 text-white animate-float" style={{ animationDelay: '3s' }} />
        <Users className="absolute bottom-20 right-16 w-16 h-16 text-white animate-float" style={{ animationDelay: '1.2s' }} />
        <Heart className="absolute top-28 left-26 w-12 h-12 text-white animate-float" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-main-color-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-main-color-2 to-main-color-1 bg-clip-text text-transparent ml-3">
              FlixList
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Enter Verification Code</p>
          <p className="text-gray-500 text-sm mt-2">We sent a 6-digit code to your email</p>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between space-x-2">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 text-center text-white bg-gray-900/80 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-main-color-2 focus:border-transparent text-lg font-bold"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-main-color-2 to-main-color-1 text-gray-900 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-main-color-2/25 transform hover:scale-[1.02] transition-all text-lg"
            >
              Verify Code
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Didn't receive code?{' '}
              <button className="text-main-color-1 hover:text-main-color-2 font-semibold">
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;