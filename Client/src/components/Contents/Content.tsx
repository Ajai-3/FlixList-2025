import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { motion } from "framer-motion";
import LeftArrowButton from "./LeftArrowButton";
import RightArrowButton from "./RightArrowButton";
import ViewAllButton from "./ViewAllButton";
import {
  fetchNowPlaying,
  fetchTopMovies,
  fetchTvSeries,
  fetchAnime,
} from "../../api/TmdbApi.ts";
interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  language: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: string;
  original_language: string;
  poster_path: string;
}

const Content: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);
  const [anime, setAnime] = useState<Movie[]>([]);

  const mediaSections = [
    { heading: "Popular Movies", data: nowPlaying },
    { heading: "Top Trending", data: topMovies },
    { heading: "Top Series to Watch", data: series },
    { heading: "Anime Picks for You", data: anime },
  ];

  useEffect(() => {
    const shuffleArray = <T,>(array: T[]): T[] => {
      return [...array].sort(() => Math.random() - 0.5);
    };

    const getData = async () => {
      try {
        const [nowPlayingRes, topMoviesRes, seriesRes, animeRes] =
          await Promise.all([
            fetchNowPlaying(),
            fetchTopMovies(),
            fetchTvSeries(),
            fetchAnime(),
          ]);

        const shuffledNowPlaying = shuffleArray(
          nowPlayingRes.data.results as Movie[]
        );
        const shuffledTopMovies = shuffleArray(
          topMoviesRes.data.results as Movie[]
        );
        const shuffledSeries = shuffleArray(seriesRes.data.results as Movie[]);
        const shuffledAnime = shuffleArray(animeRes.data.results as Movie[]);

        setNowPlaying(shuffledNowPlaying);
        setTopMovies(shuffledTopMovies);
        setSeries(shuffledSeries);
        setAnime(shuffledAnime);

        console.log("Now Playing:", shuffledNowPlaying);
        console.log("Top Movies:", shuffledTopMovies);
        console.log("Series:", shuffledSeries);
        console.log("Anime:", shuffledAnime);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    getData();
  }, []);

  return (
    <div className="relative -mt-40 px-10">
      {mediaSections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
        >
          <div className="flex justify-between items-center ">
            <h1 className="text-3xl mx-4 font-semibold">{section.heading}</h1>
            <div className="flex gap-2">
              <LeftArrowButton />
              <RightArrowButton />
              <ViewAllButton />
            </div>
          </div>
          <div className="overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-8 mt-4 mx-4 mb-20 w-max">
              {section.data.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Content;
