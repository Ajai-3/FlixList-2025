import React, { useEffect, useState, useRef } from "react";
import MovieCard from "./MovieCard";
import LeftArrowButton from "./LeftArrowButton";
import RightArrowButton from "./RightArrowButton";
import ViewAllButton from "./ViewAllButton";
import {
  fetchNowPlaying,
  fetchTopMovies,
  fetchTvSeries,
  fetchAnime,
} from "@/app/api/TmdbApi";

interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  language: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  original_language: string;
  poster_path: string;
}

const Content: React.FC = () => {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);
  const [anime, setAnime] = useState<Movie[]>([]);
  const [loading, setLoading] = useState({
    nowPlaying: true,
    topMovies: true,
    series: true,
    anime: true,
  });

  const nowPlayingRef = useRef<HTMLDivElement>(null);
  const topMoviesRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<HTMLDivElement>(null);
  const animeRef = useRef<HTMLDivElement>(null);

const handleScroll = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement | null>) => {
  if (ref.current) {
    const cardWidth = 224;
    const gap = 40;        
    const cardsPerScroll = 3;

    const scrollAmount = (cardWidth + gap) * cardsPerScroll;

    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};


  const mediaSections = [
    {
      heading: "Popular Movies",
      data: nowPlaying,
      loading: loading.nowPlaying,
      ref: nowPlayingRef,
    },
    {
      heading: "Top Trending",
      data: topMovies,
      loading: loading.topMovies,
      ref: topMoviesRef,
    },
    {
      heading: "Top Series to Watch",
      data: series,
      loading: loading.series,
      ref: seriesRef,
    },
    {
      heading: "Anime Picks for You",
      data: anime,
      loading: loading.anime,
      ref: animeRef,
    },
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

        setNowPlaying(shuffleArray(nowPlayingRes.data.results as Movie[]));
        setLoading((prev) => ({ ...prev, nowPlaying: false }));

        setTopMovies(shuffleArray(topMoviesRes.data.results as Movie[]));
        setLoading((prev) => ({ ...prev, topMovies: false }));

        setSeries(shuffleArray(seriesRes.data.results as Movie[]));
        setLoading((prev) => ({ ...prev, series: false }));

        setAnime(shuffleArray(animeRes.data.results as Movie[]));
        setLoading((prev) => ({ ...prev, anime: false }));
      } catch (err) {
        console.error("Error fetching data: ", err);
        setLoading({
          nowPlaying: false,
          topMovies: false,
          series: false,
          anime: false,
        });
      }
    };

    getData();
  }, []);

  // Skeleton loader component
  const MovieCardSkeleton = () => (
    <div className="relative shrink-0 rounded-xl w-48 h-72 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      <div className="absolute bottom-0 left-0 right-0 m-2">
        <div className="flex gap-2">
          <div className="h-4 bg-gray-800 rounded-full w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded-full w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-800 rounded-full w-1/4 animate-pulse" />
        </div>
        <div className="h-4 bg-gray-800 rounded-full w-3/4 mt-2 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="relative -mt-56 px-10">
      {mediaSections.map((section, i) => (
        <div
          key={i}
          className="animate-fade-in"
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl mx-4 font-semibold">{section.heading}</h1>
            <div className="flex gap-2">
              <LeftArrowButton
                onClick={() => handleScroll("left", section.ref)}
              />
              <RightArrowButton
                onClick={() => handleScroll("right", section.ref)}
              />
              <ViewAllButton />
            </div>
          </div>
          <div className="relative">
            <div
              ref={section.ref}
              className="flex gap-6 mt-2 mx-4 p-4 mb-16 overflow-x-auto scrollbar-hidden"
              style={{ scrollBehavior: "smooth" }}
            >

              {section.loading ? (
                Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <MovieCardSkeleton key={`skeleton-${i}-${index}`} />
                  ))
              ) : section.data.length > 0 ? (
                section.data.map((movie, index) => (
                  <MovieCard key={index} movie={movie} />
                ))
              ) : (
                <div className="text-gray-400 italic">
                  No {section.heading.toLowerCase()} available
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;