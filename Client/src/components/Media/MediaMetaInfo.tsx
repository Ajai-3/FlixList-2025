import React, { useEffect, useState } from "react";
import { formatReleaseDate } from "../../utils/formatDate";
import MetaInfoDiv from "./MetaInfoDiv";
import { countryMap } from "../../constants/countryMap";
import { languageMap } from "../../constants/LanguageMap";
import { formatRuntime } from "../../utils/formatRuntime";
import { getCrewInfo } from "../../api/GetCrewInfo";

interface MediaDetailsProps {
  media: any;
}

const MediaMetaInfo: React.FC<MediaDetailsProps> = ({ media }) => {
  const [crew, setCrew] = useState<{ directors: string[]; writers: string[] }>({
    directors: ["Loading..."],
    writers: ["Loading..."],
  });

  const [isLoading, setIsLoading] = useState(true);
  let totalEpisodes = 0;

  if (media.first_air_date) {
    for (let ep of media.seasons) {
      totalEpisodes += ep.episode_count;
    }
  }

  const getType = (media: any): "movie" | "tv" => {
    if (media.title || media.release_date) return "movie";
    return "tv";
  };

  useEffect(() => {
    if (!media?.id) return;

    const fetchCrew = async () => {
      setIsLoading(true);
      try {
        const type = getType(media);
        const result = await getCrewInfo(type, media.id.toString());
        setCrew(result);
      } catch (error) {
        console.error("Failed to fetch crew:", error);
        setCrew({
          directors: ["Not available"],
          writers: ["Not available"],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrew();
  }, [media]);

  const displayDirectors =
    crew.directors.length > 0 ? crew.directors : ["No director information"];

  const displayWriters =
    crew.writers.length > 0 ? crew.writers : ["No writer information"];

  return (
    <div className="flex flex-col justify-center items-center mb-6">
      <div className="min-[300px]">
        <h1 className="text-3xl font-medium mb-4 self-start">Details</h1>
        <div className="flex gap-16">
          <div>
            <MetaInfoDiv
              name={"Original Title"}
              value={media.original_title || media.original_name}
            />
            <MetaInfoDiv
              name={"Release Date"}
              value={formatReleaseDate(
                media.release_date || media.first_air_date
              )}
            />

            <MetaInfoDiv
              name="Director"
              value={
                <div>
                  {isLoading
                    ? "Loading..."
                    : displayDirectors
                        .slice(0, 3)
                        .map((director, i) => <div key={i}>{director}</div>)}
                </div>
              }
            />
            <MetaInfoDiv
              name={"Country"}
              value={
                media.origin_country?.[0]
                  ? countryMap[media.origin_country[0]]
                  : "N/A"
              }
            />
            <MetaInfoDiv
              name="Spoken Languages"
              value={
                media.spoken_languages.length > 0
                  ? media.spoken_languages.map((lan: any, i: any) => (
                      <div key={i}>{lan.english_name}</div>
                    ))
                  : languageMap[media.original_language] ||
                    media.original_language
              }
            />
          </div>

          <div>
            {media.runtime || media.runtime === 0 ? (
              <MetaInfoDiv
                name={"Run Time"}
                value={formatRuntime(media.runtime)}
              />
            ) : (
              <MetaInfoDiv
                name={"Duration"}
                value={`${
                  media.seasons && media.seasons.length > 0
                    ? `${media.seasons.length} Seasons, ${media.seasons.reduce(
                        (total: number, season: { episode_count: number }) =>
                          total + season.episode_count,
                        0
                      )} Episodes`
                    : `No Seasons or Episodes Available`
                }`}
              />
            )}

            <MetaInfoDiv
              name={"Language"}
              value={
                languageMap[media.original_language] || media.original_language
              }
            />
            <MetaInfoDiv
              name="Writer"
              value={
                <div>
                  {isLoading
                    ? "Loading..."
                    : displayWriters.slice(0, 3).map((writer, i) => (
                        <div key={i} className="flex">
                          {writer}
                        </div>
                      ))}
                </div>
              }
            />

            <MetaInfoDiv
              name={"Genre"}
              value={
                <div>
                  {media.genres?.map((genre: any, i: number) => (
                    <div key={i}>{genre.name}</div>
                  ))}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaMetaInfo;
