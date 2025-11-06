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
  const [selectedProvider, setSelectedProvider] = useState<string>("vidking");

  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);

  const [hoveringPoster, setHoveringPoster] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [showEpisodeSelection, setShowEpisodeSelection] = useState(false);

  // Define ONLY working streaming providers
  const streamingProviders = {
    vidking: {
      name: "VidKing",
      movie: (id: string) => `https://www.vidking.net/embed/movie/${id}`,
      tv: (id: string, s: number, e: number) =>
        `https://www.vidking.net/embed/tv/${id}/${s}/${e}`,
      color: "bg-blue-500",
      quality: "HD",
      icon: "👑",
      working: true,
    },
    vidsrc: {
      name: "VidSrc",
      movie: (id: string) => `https://vidsrc.win/movie.html?id=${id}`,
      tv: (id: string, s: number, e: number) =>
        `https://vidsrc.win/tv.html?id=${id}&s=${s}&e=${e}`,
      color: "bg-green-500",
      quality: "HD",
      icon: "🎬",
      working: true,
    },
    vidsrcme: {
      name: "VidSrc.me",
      movie: (id: string) => `https://vidsrc.me/movie/latest/${id}`,
      tv: (id: string, s: number, e: number) =>
        `https://vidsrc.me/tv/latest/${id}/${s}/${e}`,
      color: "bg-purple-500",
      quality: "HD",
      icon: "📺",
      working: true,
    },
  };

  // ✅ Generate player URL based on selected provider
  const generatePlayerUrl = (
    seasonNumber?: number,
    episodeNumber?: number
  ): string => {
    const provider =
      streamingProviders[selectedProvider as keyof typeof streamingProviders];

    if (!media.first_air_date) {
      return provider.movie(media.id);
    } else {
      return provider.tv(media.id, seasonNumber!, episodeNumber!);
    }
  };

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

        // Auto-select first season
        if (validSeasons.length > 0 && selectedSeason === null) {
          setSelectedSeason(validSeasons[0].season_number);
        }
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

            // Auto-select first season
            if (validSeasons.length > 0 && selectedSeason === null) {
              setSelectedSeason(validSeasons[0].season_number);
            }
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

  // ✅ Start playing with selected provider
  const startPlaying = (seasonNumber?: number, episodeNumber?: number) => {
    const url = generatePlayerUrl(seasonNumber, episodeNumber);
    setPlayerUrl(url);
    setShowPlayerModal(false);
    setShowVideoPlayer(true);
  };

  // ✅ Open provider selection
  const openProviderSelection = (episode?: any) => {
    setSelectedEpisode(episode);
    setShowEpisodeSelection(false);
    setShowPlayerModal(true);
  };

  // ✅ Open episode selection or provider selection based on media type
  const handlePlayClick = () => {
    if (media.first_air_date) {
      // For TV shows: show episode selection first
      setShowEpisodeSelection(true);
    } else {
      // For movies: directly show provider selection
      setShowPlayerModal(true);
    }
  };

  // ✅ Confirm and play after provider selection
  const confirmAndPlay = () => {
    if (selectedEpisode) {
      startPlaying(selectedSeason!, selectedEpisode.episode_number);
    } else if (!media.first_air_date) {
      startPlaying();
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
                onClick={handlePlayClick}
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

      {/* ✅ MODAL: Episode Selection (FIRST FOR TV SHOWS) */}
      {showEpisodeSelection && media.first_air_date && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-7xl h-[90vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col border border-gray-600 shadow-xl">
            {/* Header */}
            <div className="flex-shrink-0 px-6 py-4 bg-gray-800 border-b border-gray-600">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-600">
                    <img
                      src={getImageUrl(media.poster_path, "w300")}
                      alt={media.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {media.name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Select season and episode to watch
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEpisodeSelection(false)}
                  className="text-gray-400 hover:text-white transition-colors duration-150 p-2 rounded-lg hover:bg-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex min-h-0">
              {/* Seasons Sidebar */}
              <div className="w-80 bg-gray-800 border-r border-gray-600 overflow-y-auto">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">
                    Seasons
                  </h3>
                  <div className="space-y-4">
                    {seasons.length > 0 ? (
                      seasons.map((season) => (
                        <button
                          key={season.id}
                          onClick={() =>
                            setSelectedSeason(season.season_number)
                          }
                          className={`w-full text-left rounded-xl transition-all duration-200 overflow-hidden border-2 ${
                            selectedSeason === season.season_number
                              ? "border-blue-500 bg-blue-500/10 shadow-lg"
                              : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-600/50"
                          }`}
                        >
                          <div className="flex">
                            {/* Season Image */}
                            <div className="w-28 h-36 flex-shrink-0">
                              <img
                                src={
                                  getImageUrl(season.poster_path, "w300") ||
                                  getImageUrl(media.poster_path, "w300")
                                }
                                alt={season.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = getImageUrl(
                                    media.poster_path,
                                    "w300"
                                  );
                                }}
                              />
                            </div>

                            {/* Season Info */}
                            <div className="flex-1 p-4">
                              <div
                                className={`font-bold text-lg mb-2 ${
                                  selectedSeason === season.season_number
                                    ? "text-blue-400"
                                    : "text-white"
                                }`}
                              >
                                {season.name}
                              </div>
                              <div className="text-gray-300 text-sm mb-1">
                                {season.episode_count} episodes
                              </div>
                              {season.air_date && (
                                <div className="text-gray-400 text-xs">
                                  {new Date(season.air_date).getFullYear()}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                        Loading seasons...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Episodes Main Content - With Images */}
              <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
                {/* Season Header */}
                {selectedSeason !== null && (
                  <div className="flex-shrink-0 px-6 py-4 bg-gray-800/30 border-b border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {seasons.find(
                            (s) => s.season_number === selectedSeason
                          )?.name || `Season ${selectedSeason}`}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                          {seasons.find(
                            (s) => s.season_number === selectedSeason
                          )?.episode_count || 0}{" "}
                          episodes
                        </p>
                      </div>
                      {episodes.length > 0 && (
                        <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                          {episodes.length} episodes
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Episodes Grid - With Images */}
                <div className="flex-1 overflow-y-auto">
                  {selectedSeason !== null && (
                    <div className="p-6">
                      {episodesLoading ? (
                        <div className="text-center py-16">
                          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                          <p className="text-gray-400">Loading episodes...</p>
                        </div>
                      ) : episodes.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                          No episodes available for this season
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {episodes.map((episode) => (
                            <div
                              key={episode.id}
                              className="bg-gray-800 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors duration-150 cursor-pointer"
                            >

                              <div className="flex justify-between">
                              <div className="flex-shrink-0 rounded overflow-hidden mr-4">
                                  <img
                                    src={
                                      getImageUrl(episode.still_path, "w200") ||
                                      getImageUrl(media.backdrop_path, "w200")
                                    }
                                    alt={episode.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.src = getImageUrl(
                                        media.backdrop_path,
                                        "w300"
                                      );
                                    }}
                                  />
                                </div>
                              <div className="flex p-4">
                                {/* Episode Image */}
                                

                                {/* Episode Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h4 className="font-semibold text-white text-base line-clamp-1">
                                      {episode.name ||
                                        `Episode ${episode.episode_number}`}
                                    </h4>
                                    {episode.vote_average > 0 && (
                                      <div className="flex items-center gap-1 bg-gray-700 rounded px-2 py-1 flex-shrink-0">
                                        <svg
                                          className="w-3 h-3 text-yellow-400"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="text-xs font-medium text-white">
                                          {episode.vote_average.toFixed(1)}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                                    <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                      Episode {episode.episode_number}
                                    </div>
                                    {episode.air_date && (
                                      <span>
                                        {new Date(
                                          episode.air_date
                                        ).toLocaleDateString()}
                                      </span>
                                    )}
                                    {episode.runtime && (
                                      <span>• {episode.runtime}m</span>
                                    )}
                                  </div>

                                  {episode.overview && (
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                      {episode.overview}
                                    </p>
                                  )}
                                </div>

                                {/* Play Button - DOES NOT CLOSE MODAL */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openProviderSelection(episode);
                                  }}
                                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-150 text-sm font-medium flex items-center gap-2 flex-shrink-0 self-center"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                  Play
                                </button>
                              </div>
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
        </div>
      )}

      {/* ✅ MODAL: Provider Selection (SECOND STEP) */}
      {showPlayerModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Select Streaming Provider
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {selectedEpisode
                      ? `${media.name} - S${selectedSeason} E${selectedEpisode.episode_number}: ${selectedEpisode.name}`
                      : `${media.title || media.name}`}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowPlayerModal(false);
                    setSelectedEpisode(null);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-200 ml-4"
                >
                  ✕
                </button>
              </div>

              {/* Provider Selection Grid */}
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(streamingProviders).map(([key, provider]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedProvider(key)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedProvider === key
                          ? "border-main-color-2 bg-main-color-2/20 shadow-lg"
                          : "border-gray-600 bg-gray-800/80 hover:border-gray-400"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-3">{provider.icon}</div>
                        <div
                          className={`text-base font-bold mb-2 ${
                            selectedProvider === key
                              ? "text-main-color-2"
                              : "text-white"
                          }`}
                        >
                          {provider.name}
                        </div>
                        <div className="mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              selectedProvider === key
                                ? "bg-main-color-2 text-black"
                                : "bg-gray-700 text-gray-300"
                            }`}
                          >
                            {provider.quality}
                          </span>
                        </div>
                        <div className="text-xs text-green-400 font-medium">
                          ✓ Working
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={confirmAndPlay}
                  className="bg-main-color-2 hover:bg-main-color-2/90 text-black px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg"
                >
                  ▶ Play Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Video Player Modal - Full Screen with Only Close Button */}
      {showVideoPlayer && playerUrl && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <button
            className="absolute top-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold transition shadow-lg"
            onClick={() => {
              setShowVideoPlayer(false);
              setPlayerUrl(null);
              setSelectedEpisode(null);
            }}
          >
            ✕
          </button>

          <iframe
            src={playerUrl}
            title="Video Player"
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            sandbox="allow-scripts allow-same-origin allow-presentation"
          />
        </div>
      )}
    </>
  );
};

export default Details;
