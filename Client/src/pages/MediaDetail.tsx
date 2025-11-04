import React, { useEffect, useState } from "react";
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
import Cast from "../components/Media/Cast";
import { getCast } from "../api/GetCast";

const MediaDetail: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [media, setMedia] = useState<any>();
  const [cast, setCast] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      if (!id || !type) return;

      setIsLoading(true);
      try {
        const mediaType = type === "movie" ? "movie" : "tv";

        const [response, cast] = await Promise.all([
          axiosInstance.get(`/${mediaType}/${id}`),
          getCast(mediaType, id),
        ]);

        setMedia(response.data);
        setCast(cast);

        console.log(response.data);
        console.log(cast);
      } catch (error) {
        console.error("Error fetching media details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaDetails();
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
            <MediaMetaInfo media={media} />
            {media.seasons ? <Series media={media} /> : ""}
            <Cast cast={cast} />
          <Footer media={media} />
        </div>
      )}
    </motion.div>
  );
};

export default MediaDetail;
