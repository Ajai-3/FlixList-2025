import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "../components/Media/LoadingSkeleton";
import axiosInstance from "@/app/api/AxiosInstance";
import Hero from "@/components/home/Hero/Hero";
import Details from "../components/Media/Details";
import MediaMetaInfo from "../components/Media/MediaMetaInfo";
import Series from "../components/Media/Series";
import Cast from "../components/Media/Cast";
import { getCast } from "@/app/api/GetCast";
import Footer from "@/components/common/Footer/Footer";
import MediaViewer from "../components/Media/MediaViewer";


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


  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerSeason, setViewerSeason] = useState<number | undefined>(undefined);

  const openViewer = (seasonNumber?: number) => {
    setViewerSeason(seasonNumber);
    setIsViewerOpen(true);
  };

  return (

    <div
      className="animate-fade-in transition-opacity duration-300"
    >
      {isLoading || !media ? (
        <LoadingSkeleton />
      ) : (
        <div>
          <Hero media={media} />
            <Details media={media} onPlay={() => openViewer()} />
            <MediaMetaInfo media={media} />
            {media.seasons ? <Series media={media} onSeasonClick={openViewer} /> : ""}
            <Cast cast={cast} />
            <Footer media={media} />
            
            <MediaViewer 
              media={media}
              isOpen={isViewerOpen}
              onClose={() => setIsViewerOpen(false)}
              initialSeason={viewerSeason}
            />

        </div>
      )}
    </div>
  );
};

export default MediaDetail;
