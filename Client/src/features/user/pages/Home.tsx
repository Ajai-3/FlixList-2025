import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Content from "../components/Contents/Content";
import Footer from "../components/Footer/Footer";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <Hero media={{ backdrop_path: null }} />
      <Content />
      <Footer media={{ backdrop_path: null }} />
    </motion.div>
  );
};

export default Home;
