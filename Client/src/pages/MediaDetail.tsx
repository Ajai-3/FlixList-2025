import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Details from "../components/Media/Details";
import MediaMetaInfo from "../components/Media/MediaMetaInfo";
import Series from "../components/Media/Series";
import { motion } from "framer-motion";

const MediaDetail: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [media, setMedia] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      setIsLoading(true);
      try {
        let response;
        if (type === "movie") {
          response = await axiosInstance.get(`/movie/${id}`);
        } else if (type === "series") {
          response = await axiosInstance.get(`/tv/${id}`);
        }
        if (response) {
          setMedia(response.data);
        }
      } catch (error) {
        console.error("Error fetching media details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id && type) {
      fetchMediaDetails();
    }
  }, [type, id]);


  const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="w-full h-[500px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
      </div>
      <div className="flex px-32 -mt-40 relative">
        <div className="w-[320px] h-[480px] rounded-3xl bg-gray-800 animate-pulse"></div>
        <div className="px-20 w-full">
          <div className="h-10 w-40 bg-gray-800 rounded-md mt-10 mb-10 animate-pulse"></div>
          <div className="h-14 w-3/4 bg-gray-800 rounded-md mb-6 animate-pulse"></div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-800 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
          <div className="h-32 w-full bg-gray-800 rounded-md mt-10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isLoading || !media ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <Navbar />
          <Hero media={media} />
          <Details media={media} />
          {media.seasons ? <Series media={media} /> : ""}
          <MediaMetaInfo media={media} />
          <Footer />
        </div>
      )}
    </motion.div>
  );
};

export default MediaDetail;
