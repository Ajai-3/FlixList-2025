import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

interface MediaProps {
  media?: any;
}

const Footer: React.FC<MediaProps> = ({ media }) => {
  const defaultBgImage = "/zMrk2G3XsnfYKiIp1NEfdtvDyBH.jpg";
  const imagePath = media?.backdrop_path || defaultBgImage;
  const imageUrl = `https://image.tmdb.org/t/p/original${imagePath}`;

  const quickLinks = [
    { name: "Home", path: "#" },
    { name: "Movies", path: "#" },
    { name: "Series", path: "#" },
    { name: "Anime", path: "#" },
    { name: "My List", path: "#" },
  ];

  const contactInfo = [
    { icon: <FiMail />, text: "support@flixlist.com" },
    { icon: <FiPhone />, text: "+1 (555) 123-4567" },
    { icon: <FiMapPin />, text: "123 Movie Lane, Hollywood, CA" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, path: "#", label: "Facebook" },
    { icon: <FaTwitter />, path: "#", label: "Twitter" },
    { icon: <FaInstagram />, path: "#", label: "Instagram" },
  ];

  return (
    <footer className="relative w-full text-white pt-16 px-16 pb-2 overflow-hidden bg-black mt-32">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 15%, rgba(0,0,0,0.8) 10%, rgba(0,0,0,0.7) 50%), url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.95,
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto relative z-10 flex flex-col items-center py-6">
        <div
          className="w-full flex justify-between relative z-50 animate-fade-in mb-0"
        >
          {/* Logo & Social */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-4xl font-bold mb-4 tracking-wider">FlixList</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your ultimate destination for discovering movies and TV shows.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.path}
                  aria-label={link.label}
                  className="text-gray-400 hover:text-main-color-2 text-2xl transition-all duration-300 hover:scale-125 hover:text-white"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-semibold mb-4 z-50">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="transition-transform duration-200 hover:scale-105">
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-main-color-2 transition-colors items-center gap-2 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li
                  key={index}
                  className="text-gray-400 flex items-center gap-3 hover:text-main-color-2 transition-colors"
                >
                  <span className="text-main-color-2">{info.icon}</span>
                  {info.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section: Large Text (Centered in flow) */}
        <div
          className="relative flex items-center justify-center animate-fade-in my-0"
          style={{ animationDelay: '1s' }}
        >
          <div className="relative">
            <h1
              className="text-5xl md:text-[340px] font-extrabold uppercase tracking-wide leading-none relative select-none"
            >
              {/* Text with image background */}
              <span
                className="absolute inset-0 text-transparent bg-clip-text"
                style={{
                  backgroundImage: `url('${imageUrl}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  backgroundAttachment: "fixed",
                  filter: "contrast(1.1) brightness(1.1)",
                }}
              >
                FlixList
              </span>

              {/* Text with stroke/border effect */}
              <div className="relative inline-block group">
                <span
                  className="block text-transparent transition-all duration-700 ease-in-out"
                  style={{
                    WebkitTextStroke: "2px rgba(128, 128, 128, 0.15)",
                  }}
                >
                  FlixList
                </span>

                <span
                  className="absolute top-0 left-0 text-transparent transition-all duration-1000 ease-out clip-path-top group-hover:clip-path-full"
                  style={{
                    WebkitTextStroke: "2px rgba(200, 200, 200, 0.3)",
                   }}
                >
                  FlixList
                </span>
              </div>
            </h1>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div
          className="text-center text-gray-500 text-sm animate-fade-in"
          style={{ animationDelay: '1.5s' }}
        >
          <p>© {new Date().getFullYear()} FlixList. All rights reserved.</p>
          <p>
            Powered by TMDB API. This product uses the TMDB API but is not
            endorsed or certified by TMDB.
          </p>
        </div>
      </div>
      <style>{`
        .clip-path-top {
          clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
        }
        .group:hover .clip-path-full {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
