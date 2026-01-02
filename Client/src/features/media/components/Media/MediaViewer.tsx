import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/api/AxiosInstance";

interface MediaViewerProps {
  media: any;
  initialSeason?: number;
  isOpen: boolean;
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({
  media,
  initialSeason,
  isOpen,
  onClose,
}) => {
  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(
    initialSeason || null
  );
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [episodesLoading, setEpisodesLoading] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [playerUrl, setPlayerUrl] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("vidking");
  
  // Streaming Providers
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

  // Sync initialSeason when it changes or opens
  useEffect(() => {
    if (isOpen && initialSeason !== undefined) {
      setSelectedSeason(initialSeason);
    }
  }, [isOpen, initialSeason]);

  // Fetch Seasons
  useEffect(() => {
    if (!media?.id) return;

    if (media.first_air_date && Array.isArray(media.seasons)) {
        const validSeasons = media.seasons.filter(
          (s: any) => s.season_number >= 0 && (s.episode_count ?? 0) > 0
        );
        setSeasons(validSeasons);
        
        // Auto-select first season if none selected
        if (validSeasons.length > 0 && selectedSeason === null && !initialSeason) {
            setSelectedSeason(validSeasons[0].season_number);
        }
    } else if (media.first_air_date) {
         // Fallback fetch
         const fetchSeasons = async () => {
            try {
              const response = await axiosInstance.get(`/tv/${media.id}`, {
                params: { language: "en-US" },
              });
              const validSeasons = (response.data.seasons || []).filter(
                (s: any) => s.season_number >= 0 && (s.episode_count ?? 0) > 0
              );
              setSeasons(validSeasons);
  
              if (validSeasons.length > 0 && selectedSeason === null && !initialSeason) {
                setSelectedSeason(validSeasons[0].season_number);
              }
            } catch (err) {
              console.error("Seasons fetch failed:", err);
            }
          };
          fetchSeasons();
    }
  }, [media?.id, media?.seasons, media?.first_air_date, initialSeason]);


    // Fetch Episodes
    useEffect(() => {
        if (!selectedSeason || !media?.id || !media?.first_air_date) {
            if (media?.first_air_date) setEpisodes([]); // Only clear for TV
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
            setEpisodes(response.data.episodes || []);
        } catch (err) {
            console.error("Episode fetch failed:", err);
            setEpisodes([]);
        } finally {
            setEpisodesLoading(false);
        }
        };

        fetchEpisodes();
    }, [selectedSeason, media?.id]);

  const generatePlayerUrl = (season?: number, episode?: number) => {
    const provider = streamingProviders[selectedProvider as keyof typeof streamingProviders];
    if (!media.first_air_date) {
        return provider.movie(media.id);
    } else {
        return provider.tv(media.id, season!, episode!);
    }
  };

  const getImageUrl = (path: string | null, size: string = "w500") => {
    if (path) return `https://image.tmdb.org/t/p/${size}${path}`;
    return media.poster_path
      ? `https://image.tmdb.org/t/p/${size}${media.poster_path}`
      : "/placeholder-image.jpg";
  };

  const openProviderSelection = (episode?: any) => {
    setSelectedEpisode(episode);
    setShowPlayerModal(true);
  };

    const startPlaying = () => {
        const url = generatePlayerUrl(selectedSeason!, selectedEpisode?.episode_number);
        setPlayerUrl(url);
        setShowPlayerModal(false);
        setShowVideoPlayer(true);
    }

    // Auto-open provider selection for movies
    useEffect(() => {
        if(isOpen && !media.first_air_date){
            setShowPlayerModal(true);
        }
    }, [isOpen, media.first_air_date]);


  if (!isOpen) return null;

  // If Movie, we skip the episode selector and go straight to provider modal (handled by effect/state)
  // But we need to render the Provider Modal and Video Player outside the "Episode Selector" view if needed.

  const isTvShow = !!media.first_air_date;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
       {/* Episode Selection Modal (TV Only) */}
       {isTvShow && !showPlayerModal && !showVideoPlayer && (
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
                  onClick={onClose}
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
                          onClick={() => setSelectedSeason(season.season_number)}
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
                      ))) : (
                        <div className="text-center py-8 text-gray-400">Loading seasons...</div>
                      )}
                   </div>
                </div>
              </div>

               {/* Episodes List */}
               <div className="flex-1 flex flex-col min-h-0 bg-gray-900">
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
                                        <div className="flex-shrink-0 rounded overflow-hidden mr-4 w-48">
                                            <img 
                                                src={getImageUrl(episode.still_path, "w300")}
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
                                        <div className="flex p-4 flex-1">
                                             <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-white text-base line-clamp-1 mb-2">
                                                    {episode.name || `Episode ${episode.episode_number}`}
                                                </h4>
                                                <p className="text-gray-400 text-sm line-clamp-2">{episode.overview}</p>
                                             </div>
                                               <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openProviderSelection(episode);
                                                }}
                                                className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-150 text-sm font-medium flex items-center gap-2 flex-shrink-0 self-center"
                                                >
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

       {/* Provider Selection Modal */}
         {showPlayerModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
           <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
                <div className="p-6">
                     <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">Select Streaming Provider</h2>
                            <p className="text-gray-300 text-sm">
                                {selectedEpisode ? `${media.name} - S${selectedSeason} E${selectedEpisode.episode_number}` : media.title}
                            </p>
                        </div>
                        <button onClick={() => setShowPlayerModal(false)} className="bg-white/20 hover:bg-white/30 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">✕</button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {Object.entries(streamingProviders).map(([key, provider]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedProvider(key)}
                                className={`p-4 rounded-xl border-2 transition-all ${selectedProvider === key ? "border-main-color-2 bg-main-color-2/20" : "border-gray-600 bg-gray-800"}`}
                            >
                                <div className="text-center">
                                    <div className="text-3xl mb-3">{provider.icon}</div>
                                    <div className={`font-bold ${selectedProvider === key ? "text-main-color-2" : "text-white"}`}>{provider.name}</div>
                                </div>
                            </button>
                        ))}
                     </div>

                     <div className="text-center">
                        <button onClick={startPlaying} className="bg-main-color-2 text-black px-8 py-3 rounded-xl font-bold text-lg">▶ Play Now</button>
                     </div>
                </div>
           </div>
        </div>
      )}

      {/* Video Player */}
       {showVideoPlayer && playerUrl && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
           <button 
            className="absolute top-6 right-6 z-50 bg-red-600 text-white w-12 h-12 rounded-full font-bold"
            onClick={() => {
                setShowVideoPlayer(false);
                setPlayerUrl(null);
                // If TV show, maybe return to episode selection? For now close all or stay in provider?
                // Use props.onClose to close everything?
                 // Or just close player.
            }}
           >✕</button>
            <iframe 
                src={playerUrl} 
                className="w-full h-full" 
                allowFullScreen 
                allow="autoplay; fullscreen; picture-in-picture"
            />
        </div>
       )}

    </div>
  );
};

export default MediaViewer;
