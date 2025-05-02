import React from "react";
import MediaButton from "./MediaButton";
import CheckIcon from "@mui/icons-material/Check";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { languageMap } from "../../constants/LanguageMap";
import { GiLemon } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ReplyIcon from "@mui/icons-material/Reply";

interface MediaProps {
  media: any;
}

const Details: React.FC<MediaProps> = ({ media }) => {
  let count = Math.floor(Math.random() * 9) + 1;
  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatVoteCount = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="flex absolute top-36 px-32 items-end">
      <div className="flex flex-col gap-2 flex-none">
        <img
          src={`https://image.tmdb.org/t/p/w1280${media.poster_path}`}
          alt={media.title}
          className="w-[320px] rounded-3xl shrink-0 cursor-pointer"
        />
        <MediaButton
          name={"ADD TO WATCHLISHT"}
          icon={<CheckIcon />}
          color={"bg-green-200"}
        />
        <MediaButton
          name={"MARK AS WATCHED"}
          icon={<MenuOpenIcon />}
          color={"bg-blue-200"}
        />
      </div>
      <div className="px-20 mb-10">
        <div className="flex items-center justify-between py-10">
          <button className="p-2 bg-main-color-2 rounded-md flex items-center gap-2">
            WATCH TRAILER
            <YouTubeIcon />
          </button>
          <button className="bg-main-color-2 p-2 rounded-md"><ReplyIcon /></button>
        </div>
        <h1 className="text-5xl font-semibold">{media.title || media.name}</h1>
        <div className="flex gap-4 py-4 text-gray-300 font-medium">
          {media.genres.map((genre, i) => (
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
            <p className="px-2 bg-white/50 rounded-full">
              {media.first_air_date }
            </p>
          </div>
        </div>
        <div className="text-md tracking-wider font-light text-gray-400">
          <p>{media.overview}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Details;
