import React, { useState } from "react";
import MediaButton from "./MediaButton";
import CheckIcon from "@mui/icons-material/Check";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { languageMap } from "../../constants/LanguageMap";
import { GiLemon } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ReplyIcon from "@mui/icons-material/Reply";
import { formatRuntime } from "../../utils/formatRuntime";
import { formatVoteCount } from "../../utils/formatVoteCount";
import { formatReleaseDate } from "../../utils/formatDate";

interface MediaProps {
  media: any;
}
// interface seris {
//   seaso
// }

const Details: React.FC<MediaProps> = ({ media }) => {
  const [loading, setLoading] = useState(true);

  let count = Math.floor(Math.random() * 9) + 1;

  let totalEpisods = 0;
  if (media.first_air_date) {
    for (let ep of media.seasons) {
      totalEpisods += ep.episode_count;
    }
  }

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="flex absolute top-40 px-20 items-end">
      <div className="flex flex-col gap-2 flex-none">
        <div className="relative w-[350px] h-[520px] rounded-3xl overflow-hidden">
          {loading && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700/10 to-gray-800/20 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-main-color-2 rounded-full animate-ping"></div>
            </div>
          )}
          <img
            src={`https://image.tmdb.org/t/p/w1280${media.poster_path}`}
            alt={media.title}
            className={`w-full h-full object-cover rounded-3xl transform transition-all duration-1000 ease-out ${
              loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
            onLoad={handleImageLoad}
          />
        </div>

        <MediaButton
          name={"ADD TO WATCHLISHT"}
          icon={<MenuOpenIcon />}
          color={"bg-green-200"}
        />
        <MediaButton
          name={"MARK AS WATCHED"}
          icon={<CheckIcon />}
          color={"bg-blue-200"}
        />
      </div>
      <div className="px-20 mb-10">
        <div className="flex items-center justify-between py-10">
          <button className="p-2 bg-main-color-2 rounded-md flex items-center gap-2">
            WATCH TRAILER
            <YouTubeIcon />
          </button>
          <button className="bg-main-color-2 p-2 rounded-md">
            <ReplyIcon />
          </button>
        </div>
        <h1 className="text-5xl font-semibold">{media.title || media.name}</h1>
        <div className="flex gap-4 py-4 text-gray-300 font-medium">
          {media.genres.map((genre: any, i: any) => (
            <li key={i} className="list-none">
              {genre.name}
            </li>
          ))}
        </div>
        <div className="flex flex-col gap-4 py-6">
          <div>
            <div className="flex gap-2 items-center text-xl">
              <div className="flex gap-2">
                <IoIosHeart className="text-3xl text-red-600" />
                <p className="">70%</p>
                <p className="text-gray-400 text-sm text-start">1.5k</p>
              </div>
              <div className="bg-yellow-600 text-black font-semibold px-1 rounded-sm">
                IMDB
              </div>
              <div className="flex items-start gap-2">
                {media.vote_average.toFixed(1)}{" "}
                <p className="flex text-sm text-start text-gray-400">
                  {formatVoteCount(media.vote_count)}
                </p>
                <GiLemon className="text-xl text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="bg-green-700 px-2 rounded-full flex gap-2">
              <p>WATCH COUNT</p> <p className="text-black">|</p> {count}
            </div>
            <p className="px-2 bg-white/50 rounded-full">
              {languageMap[media.original_language]}
            </p>
            {media.runtime ? (
              <p className="px-2 bg-white/50 rounded-full">
                {formatRuntime(media.runtime)}
              </p>
            ) : (
              <></>
            )}
            {!media.first_air_date && !media.release_date ? (
  <p className="px-2 bg-white/50 rounded-full">Coming Soon</p>
) : (
  (media.first_air_date || media.release_date) &&
  (new Date(media.first_air_date || media.release_date) > new Date() ? (
    <>
      <p className="px-2 bg-white/50 rounded-full">
        {formatReleaseDate(media.first_air_date || media.release_date)}
      </p>
      <p className="px-2 bg-white/50 rounded-full">Coming Soon</p>
    </>
  ) : (
    <p className="px-2 bg-white/50 rounded-full">
      {formatReleaseDate(media.first_air_date || media.release_date)}
    </p>
  ))
)}

            {media.first_air_date && (
              <div className="flex gap-4">
                <p className="px-2 bg-white/50 rounded-full">
                  {
                    media.seasons.filter(
                      (s: any) => s.season_number !== 0 && s.episode_count !== 0
                    ).length
                  }{" "}
                  Season
                </p>
                <p className="px-2 bg-white/50 rounded-full">
                  {totalEpisods} Episods
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="text-md tracking-wider font-light text-gray-400">
          <p>
            {media.overview.length > 750
              ? media.overview.slice(0, 750) + "..."
              : media.overview}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Details;
