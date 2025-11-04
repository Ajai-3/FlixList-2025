import React, { useEffect, useState } from "react";
import MediaButton from "./MediaButton";
import CheckIcon from "@mui/icons-material/Check";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ReplyIcon from "@mui/icons-material/Reply";
import { GiLemon } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import { languageMap } from "../../constants/LanguageMap";
import { formatRuntime } from "../../utils/formatRuntime";
import { formatVoteCount } from "../../utils/formatVoteCount";
import { formatReleaseDate } from "../../utils/formatDate";
import axiosInstance from "../../api/AxiosInstance";

interface MediaProps {
  media: any;
}

const Details: React.FC<MediaProps> = ({ media }) => {
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [playerUrl, setPlayerUrl] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<number>(1); // 1: Player 1, 2: Player 2

  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);

  const [hoveringPoster, setHoveringPoster] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<{
    season: number;
    episode: number;
  } | null>(null);

  // ✅ Fetch trailer from TMDB using axiosInstance
  useEffect(() => {
    if (!media?.id) return;

    const fetchTrailer = async () => {
      try {
        const type = media.first_air_date ? "tv" : "movie";
        const response = await axiosInstance.get(
          `/${type}/${media.id}/videos`,
          {
            params: { language: "en-US" },
          }
        );

        const videos = response.data.results || [];

        // Find trailer - comprehensive search
        const trailer =
          videos.find(
            (v: any) =>
              v.site === "YouTube" &&
              v.type === "Trailer" &&
              v.official === true
          ) ||
          videos.find(
            (v: any) => v.site === "YouTube" && v.type === "Trailer"
          ) ||
          videos.find(
            (v: any) =>
              v.site === "YouTube" && v.type.toLowerCase().includes("trailer")
          ) ||
          videos.find(
            (v: any) =>
              v.site === "YouTube" && v.type.toLowerCase().includes("teaser")
          ) ||
          videos.find((v: any) => v.site === "YouTube");

        setTrailerKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error("Trailer fetch failed:", err);
        setTrailerKey(null);
      }
    };

    fetchTrailer();
  }, [media?.id, media?.first_air_date]);

  // ✅ Set seasons directly from TMDB response
  useEffect(() => {
    if (media?.first_air_date) {
      if (Array.isArray(media.seasons)) {
        const validSeasons = media.seasons.filter(
          (s: any) => s.season_number >= 0 && (s.episode_count ?? 0) > 0
        );
        setSeasons(validSeasons);
      } else {
        // Fallback: fetch seasons if not in media prop
        const fetchSeasons = async () => {
          try {
            const response = await axiosInstance.get(`/tv/${media.id}`, {
              params: { language: "en-US" },
            });
            const validSeasons = (response.data.seasons || []).filter(
              (s: any) => s.season_number >= 0 && (s.episode_count ?? 0) > 0
            );
            setSeasons(validSeasons);
          } catch (err) {
            console.error("Seasons fetch failed:", err);
            setSeasons([]);
          }
        };
        fetchSeasons();
      }
    } else {
      setSeasons([]);
    }
  }, [media?.id, media?.first_air_date, media?.seasons]);

  // ✅ Fetch episodes when a season is selected using axiosInstance
  useEffect(() => {
    if (!selectedSeason || !media?.id || !media?.first_air_date) {
      setEpisodes([]);
      return;
    }

    const fetchEpisodes = async () => {
      setEpisodesLoading(true);
      try {
        const response = await axiosInstance.get(
          `/tv/${media.id}/season/${selectedSeason}`,
          {
            params: { language: "en-US" },
          }
        );
        const episodesData = response.data.episodes || [];
        setEpisodes(episodesData);
      } catch (err) {
        console.error("Episode fetch failed:", err);
        setEpisodes([]);
      } finally {
        setEpisodesLoading(false);
      }
    };

    fetchEpisodes();
  }, [selectedSeason, media?.id]);

  const handleImageLoad = () => setLoading(false);

  // ✅ Generate player URLs based on selected player
  const generatePlayerUrl = (
    seasonNumber?: number,
    episodeNumber?: number
  ): string => {
    if (selectedPlayer === 1) {
      // Player 1 (VidKing)
      if (!media.first_air_date) {
        return `https://www.vidking.net/embed/movie/${media.id}`;
      }
      return `https://www.vidking.net/embed/tv/${media.id}/${seasonNumber}/${episodeNumber}`;
    } else {
      // Player 2 (Vidsrc)
      if (!media.first_air_date) {
        return `https://vidsrc.win/movie.html?id=${media.id}`;
      }
      return `https://vidsrc.win/tv.html?id=${media.id}&s=${seasonNumber}&e=${episodeNumber}`;
    }
  };

  // ✅ Open player modal (movie or episode)
  const openPlayerModal = () => {
    if (!media.first_air_date) {
      // For movies: show player selection modal directly
      setShowPlayerModal(true);
    } else {
      // For TV shows: show season/episode selector directly (NO player selection)
      setShowPlayerModal(true);

      // Auto-select first season if available and no season selected (for TV shows)
      if (seasons.length > 0 && selectedSeason === null) {
        const firstSeason = seasons.find((s) => s.season_number >= 0);
        if (firstSeason) {
          setSelectedSeason(firstSeason.season_number);
        }
      }
    }
  };

  // ✅ Start playing with selected player
  const startPlaying = (seasonNumber?: number, episodeNumber?: number) => {
    const url = generatePlayerUrl(seasonNumber, episodeNumber);
    setPlayerUrl(url);
    setShowPlayerModal(false);
    setShowVideoPlayer(true);
  };

  // ✅ Play episode (for TV shows - show player selection when episode is clicked)
  const playEpisode = (seasonNumber: number, episodeNumber: number) => {
    // Store the selected episode
    setSelectedEpisode({ season: seasonNumber, episode: episodeNumber });
    // Show player selection modal
    setShowPlayerModal(true);
  };

  // ✅ Confirm player selection and play episode
  const confirmPlayerAndPlay = () => {
    if (selectedEpisode) {
      const url = generatePlayerUrl(
        selectedEpisode.season,
        selectedEpisode.episode
      );
      setPlayerUrl(url);
      setShowPlayerModal(false);
      setShowVideoPlayer(true);
      setSelectedEpisode(null);
    }
  };

  // ✅ Get proper image URL with fallback
  const getImageUrl = (path: string | null, size: string = "w500") => {
    if (path) {
      return `https://image.tmdb.org/t/p/${size}${path}`;
    }
    return media.poster_path
      ? `https://image.tmdb.org/t/p/${size}${media.poster_path}`
      : "/placeholder-image.jpg";
  };

  const count = Math.floor(Math.random() * 9) + 1;

  const totalEpisodes =
    media.seasons?.reduce(
      (sum: number, s: any) => sum + (s.episode_count || 0),
      0
    ) || 0;

  return (
    <>
      <div className="flex absolute px-20 top-36 items-end gap-16">
        {/* Poster */}
        <div
          className="flex flex-col gap-3 flex-none"
          onMouseEnter={() => setHoveringPoster(true)}
          onMouseLeave={() => setHoveringPoster(false)}
        >
          <div className="relative w-[310px] h-[470px] rounded-3xl overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-gray-800/20 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-main-color-2 rounded-full animate-ping"></div>
              </div>
            )}
            <img
              src={getImageUrl(media.poster_path, "w500")}
              alt={media.name || media.title}
              onLoad={handleImageLoad}
              className={`w-full h-full object-cover rounded-3xl transition-all duration-700 ${
                loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />

            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                hoveringPoster ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                onClick={openPlayerModal}
                className="bg-main-color-2/90 hover:bg-main-color-2 px-5 py-3 rounded-full flex items-center gap-3 text-white text-lg z-20 shadow-lg"
              >
                ▶ Play
              </button>
            </div>
          </div>

          <MediaButton
            name="ADD TO WATCHLIST"
            icon={<MenuOpenIcon />}
            color="bg-green-200"
          />
          <MediaButton
            name="MARK AS WATCHED"
            icon={<CheckIcon />}
            color="bg-blue-200"
          />
        </div>

        {/* Info */}
        <div className="px-10 mb-10 flex flex-col w-full">
          <div className="flex items-center gap-4 py-10">
            <button
              className="p-2 bg-main-color-2 rounded-md flex items-center gap-2 hover:bg-main-color-2/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setShowTrailer(true)}
              disabled={!trailerKey}
            >
              WATCH TRAILER <YouTubeIcon />
            </button>
            <button className="p-2 bg-main-color-2 rounded-md flex items-center gap-2 hover:bg-main-color-2/80 transition">
              <ReplyIcon />
            </button>
          </div>

          <h1 className="text-5xl font-semibold mb-3">
            {media.name || media.title}
          </h1>

          <div className="flex gap-4 py-4 text-gray-300 font-medium flex-wrap">
            {media.genres?.map((g: any, i: number) => (
              <li key={i} className="list-none">
                {g.name}
              </li>
            ))}
          </div>

          <div className="flex flex-col gap-4 py-6">
            <div className="flex gap-2 items-center text-xl flex-wrap">
              <IoIosHeart className="text-2xl text-red-600" />
              <p>70%</p>
              <p className="text-gray-400 text-sm">1.5k</p>
              <div className="bg-yellow-600 text-black font-semibold px-1 rounded-sm">
                IMDB
              </div>
              <div className="flex items-center gap-2">
                {(media.vote_average ?? 0).toFixed(1)}
                <p className="text-sm text-gray-400">
                  {formatVoteCount(media.vote_count)}
                </p>
                <GiLemon className="text-xl text-yellow-400" />
              </div>
            </div>

            <div className="flex gap-4 text-xs flex-wrap">
              <div className="bg-green-700 px-2 rounded-full flex gap-2">
                <p>WATCH COUNT</p>
                <p className="text-black">|</p>
                {count}
              </div>
              <p className="px-2 bg-white/50 rounded-full">
                {languageMap[media.original_language]}
              </p>
              {media.runtime && (
                <p className="px-2 bg-white/50 rounded-full">
                  {formatRuntime(media.runtime)}
                </p>
              )}
              <p className="px-2 bg-white/50 rounded-full">
                {formatReleaseDate(media.release_date || media.first_air_date)}
              </p>
              {media.first_air_date && (
                <>
                  <p className="px-2 bg-white/50 rounded-full">
                    {seasons.length} Seasons
                  </p>
                  <p className="px-2 bg-white/50 rounded-full">
                    {totalEpisodes} Episodes
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="text-md tracking-wider font-light text-gray-400">
            <p>
              {media.overview?.length > 750
                ? media.overview.slice(0, 750) + "..."
                : media.overview}
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Trailer Modal with YouTube */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl h-[70vh] bg-black rounded-xl overflow-hidden">
            {trailerKey ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                title="YouTube Trailer"
                className="rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-white text-lg">
                Trailer not available
              </div>
            )}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold hover:bg-gray-200 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ✅ MODAL 1: Player Selection (for Movies and when episode is selected) */}
      {showPlayerModal && (selectedEpisode || !media.first_air_date) && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">
                  {selectedEpisode
                    ? `Play Episode ${selectedEpisode.episode}`
                    : "Select Player"}
                </h2>
                <button
                  onClick={() => {
                    setShowPlayerModal(false);
                    setSelectedEpisode(null);
                  }}
                  className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-gray-200 transition"
                >
                  ✕
                </button>
              </div>

              {/* Player Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Choose Player
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setSelectedPlayer(1);
                      if (!media.first_air_date || selectedEpisode) {
                        confirmPlayerAndPlay();
                      }
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedPlayer === 1
                        ? "border-main-color-2 bg-main-color-2/20"
                        : "border-gray-600 bg-gray-800 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold mb-2 ${
                          selectedPlayer === 1
                            ? "text-main-color-2"
                            : "text-white"
                        }`}
                      >
                        Player 1
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedPlayer === 1
                            ? "bg-main-color-2 text-black"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {selectedPlayer === 1 ? "Selected" : "Select"}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedPlayer(2);
                      if (!media.first_air_date || selectedEpisode) {
                        confirmPlayerAndPlay();
                      }
                    }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedPlayer === 2
                        ? "border-main-color-2 bg-main-color-2/20"
                        : "border-gray-600 bg-gray-800 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-2xl font-bold mb-2 ${
                          selectedPlayer === 2
                            ? "text-main-color-2"
                            : "text-white"
                        }`}
                      >
                        Player 2
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedPlayer === 2
                            ? "bg-main-color-2 text-black"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        {selectedPlayer === 2 ? "Selected" : "Select"}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* For Movies - Direct Play Button */}
              {!media.first_air_date && !selectedEpisode && (
                <div className="text-center">
                  <button
                    onClick={() => startPlaying()}
                    className="bg-main-color-2 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-main-color-2/90 transition"
                  >
                    ▶ Start Watching on Player {selectedPlayer}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ ENHANCED MODAL: Season & Episode Selection (Premium Design) */}
      {showPlayerModal && media.first_air_date && !selectedEpisode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-2">
          <div className="relative w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-gray-700/50">
            {/* Enhanced Header */}
            <div className="flex-shrink-0 px-4 py-3">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Select Episode
                  </h2>
                  <p className="text-gray-400">
                    Choose your season and episode
                  </p>
                </div>
                <button
                  onClick={() => setShowPlayerModal(false)}
                  className="bg-black/80 backdrop-blur-2xl text-white w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4">
                {/* Enhanced Seasons Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                      <span className="w-3 h-8 bg-main-color-2 rounded-full"></span>
                      Seasons
                    </h3>
                    {selectedSeason !== null && (
                      <span className="text-main-color-2 font-semibold text-lg">
                        {seasons.find((s) => s.season_number === selectedSeason)
                          ?.name || `Season ${selectedSeason}`}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-8 overflow-x-auto pb-4 pt-4 px-2">
                    {seasons.length > 0 ? (
                      seasons.map((season) => (
                        <button
                          key={season.id}
                          onClick={() =>
                            setSelectedSeason(season.season_number)
                          }
                          className={`flex-shrink-0 w-52 transition-all duration-500 transform ${
                            selectedSeason === season.season_number
                              ? "scale-105 ring-4 rounded-xl ring-main-color-2 shadow-2xl"
                              : "hover:scale-105 hover:shadow-xl"
                          }`}
                        >
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50">
                            <div className="relative overflow-hidden">
                              <img
                                src={getImageUrl(season.poster_path, "w342")}
                                alt={season.name}
                                className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = getImageUrl(
                                    media.poster_path,
                                    "w342"
                                  );
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                              {selectedSeason === season.season_number && (
                                <div className="absolute inset-0 bg-main-color-2/10 flex items-center justify-center">
                                  <div className="w-16 h-16 bg-gradient-to-r from-main-color-2 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                                    <div className="w-0 h-0 border-l-[16px] border-l-black border-y-[8px] border-y-transparent ml-1"></div>
                                  </div>
                                </div>
                              )}

                              <div className="absolute bottom-4 left-4 right-4">
                                <div className="font-bold text-xl text-white mb-1 drop-shadow-lg">
                                  {season.name}
                                </div>
                                <div className="text-gray-200 text-sm font-medium drop-shadow-lg">
                                  {season.episode_count} episodes
                                </div>
                              </div>

                              {/* Season Number Badge */}
                              <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-bold border border-white/20">
                                S{season.season_number}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full py-16 text-gray-400">
                        <div className="w-24 h-24 border-4 border-gray-600 border-t-main-color-2 rounded-full animate-spin mb-6"></div>
                        <div className="text-xl font-semibold">
                          Loading seasons...
                        </div>
                        <div className="text-sm mt-2">Please wait a moment</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Episodes Section */}
                {selectedSeason !== null && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
                          <span className="w-3 h-8 bg-main-color-2 rounded-full"></span>
                          Episodes - Season {selectedSeason}
                        </h3>
                        <p className="text-gray-400">
                          Select an episode to start watching
                        </p>
                      </div>
                      {episodes.length > 0 && (
                        <div className="px-4 py-2 rounded-full border border-gray-700">
                          <span className="text-main-color-2 font-bold text-lg">
                            {episodes.length}{" "}
                            {episodes.length === 1 ? "episode" : "episodes"}
                          </span>
                        </div>
                      )}
                    </div>

                    {episodesLoading ? (
                      <div className="flex flex-col items-center justify-center py-20 bg-gray-800/30 rounded-3xl border border-gray-700/50">
                        <div className="w-20 h-20 border-4 border-gray-600 border-t-main-color-2 rounded-full animate-spin mb-6"></div>
                        <div className="text-2xl font-semibold text-gray-300 mb-2">
                          Loading Episodes
                        </div>
                        <div className="text-gray-400">
                          Getting season {selectedSeason} ready...
                        </div>
                      </div>
                    ) : episodes.length === 0 ? (
                      <div className="text-center py-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50">
                        <div className="text-6xl mb-6">🎬</div>
                        <div className="text-2xl font-bold text-white mb-3">
                          No Episodes Available
                        </div>
                        <div className="text-gray-400 max-w-md mx-auto">
                          This season doesn't have any episodes available yet.
                          Please check back later.
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {episodes.map((episode) => (
                          <div
                            key={episode.id}
                            className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 hover:border-main-color-2/70 shadow-lg hover:shadow-2xl"
                          >
                            <div className="relative overflow-hidden">
                              <img
                                src={getImageUrl(episode.still_path, "w500")}
                                alt={episode.name}
                                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = getImageUrl(
                                    media.poster_path,
                                    "w500"
                                  );
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                              {/* Episode Number */}
                              <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/20 shadow-lg">
                                E
                                {episode.episode_number
                                  .toString()
                                  .padStart(2, "0")}
                              </div>

                              {/* Runtime */}
                              {episode.runtime && (
                                <div className="absolute top-4 right-4 bg-main-color-2 text-black px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                                  {episode.runtime}m
                                </div>
                              )}

                              {/* Air Date */}
                              {episode.air_date && (
                                <div className="absolute bottom-4 left-4 bg-black/70 text-gray-300 px-3 py-1 rounded-lg text-xs border border-white/10">
                                  {new Date(
                                    episode.air_date
                                  ).toLocaleDateString()}
                                </div>
                              )}
                            </div>

                            <div className="p-2">
                              <h4 className="font-bold text-xl mb-3 text-white line-clamp-2 leading-tight group-hover:text-main-color-2 transition-colors">
                                {episode.name ||
                                  `Episode ${episode.episode_number}`}
                              </h4>

                              {episode.overview ? (
                                <p className="text-gray-300 text-sm line-clamp-3 mb-6 leading-relaxed">
                                  {episode.overview}
                                </p>
                              ) : (
                                <p className="text-gray-500 text-sm italic mb-6">
                                  No description available
                                </p>
                              )}

                              <button
                                onClick={() =>
                                  playEpisode(
                                    selectedSeason,
                                    episode.episode_number
                                  )
                                }
                                className="w-full bg-gradient-to-r from-main-color-2 to-yellow-400 text-black py-2 rounded-xl font-bold text-lg flex items-center justify-center gap-3 group/btn"
                              >
                                <span className="text-xl transition-transform group-hover/btn:scale-110">
                                  ▶
                                </span>
                                <span>Play Episode</span>
                              </button>

                              {/* Rating */}
                              {episode.vote_average > 0 && (
                                <div className="flex items-center justify-center mt-4 text-sm text-gray-400">
                                  <span className="text-yellow-400 mr-1">
                                    ★
                                  </span>
                                  {episode.vote_average.toFixed(1)} rating
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Video Player Modal */}
      {showVideoPlayer && playerUrl && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="relative w-full h-[100vh] bg-gray-900 rounded-xl overflow-hidden">
            {/* Player Iframe */}
            <iframe
              src={playerUrl}
              title="Video Player"
              width="100%"
              height="100%"
              className="rounded-xl"
              allow="autoplay; fullscreen"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />

            {/* Close Button Only */}
            <button
              className="absolute top-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold hover:bg-gray-200 transition z-50"
              onClick={() => {
                setShowVideoPlayer(false);
                setPlayerUrl(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
