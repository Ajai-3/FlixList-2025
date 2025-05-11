import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "../components/Media/LoadingSkeleton";
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
