import React from "react";
import Hero from "@/components/home/Hero/Hero";
import Content from "@/components/home/Contents/Content";
import Footer from "@/components/common/Footer/Footer";

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in transition-opacity duration-300">
      <Hero media={{ backdrop_path: null }} />
      <Content />
      <Footer media={{ backdrop_path: null }} />
    </div>
  );
};

export default Home;
