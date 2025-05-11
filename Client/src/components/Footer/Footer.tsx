import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

interface MediaProps {
  media?: any;
}

const Footer: React.FC<MediaProps> = ({ media }) => {
  const defaultBgImage = "/wi7poYZy9b4CqmPMod0n1su8Quo.jpg";
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

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="relative w-full text-white pt-16 pb-6 overflow-hidden bg-black mt-32">
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
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="flex justify-between absolute left-0 right-0 z-50"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Logo & Social */}
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4 tracking-wider">FlixList</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your ultimate destination for discovering movies and TV shows.
            </p>
            <div className="flex space-x-5">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.path}
                  aria-label={link.label}
                  className="text-gray-400 hover:text-main-color-2 text-2xl transition-all duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-4 z-50">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ scale: 1.05 }}>
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-main-color-2 transition-colors items-center gap-2 block"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
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
          </motion.div>
        </motion.div>

        {/* Text Masking Effect - Using same background as parent */}
        <motion.div
          className="relative top-28 flex items-center justify-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-5xl mt-8 mb-4 md:text-[380px] font-extrabold uppercase tracking-wide text-transparent bg-clip-text leading-tight"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundAttachment: "fixed",
              filter: "contrast(1.1) brightness(1.1)",
            }}
            initial={{ opacity: 0.4, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              backgroundPosition: "50% center",
              transition: { duration: 3 },
            }}
          >
            FlixList
          </motion.h1>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="text-center text-gray-500 text-sm space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} FlixList. All rights reserved.</p>
          <p>
            Powered by TMDB API. This product uses the TMDB API but is not
            endorsed or certified by TMDB.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
