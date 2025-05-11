import axiosInstance from "./AxiosInstance.ts";

const randomPage = Math.floor(Math.random() * 10) + 1;
const randomPage1 = Math.floor(Math.random() * 8) + 1;
const randomPage2 = Math.floor(Math.random() * 4) + 1;

export const fetchNowPlaying = () =>
  axiosInstance.get("/movie/popular", {
    params: { page: randomPage2, timestamp: Date.now() },
  });
export const fetchTopMovies = () =>
  axiosInstance.get("/discover/movie", {
    params: {
      page: randomPage1,
      sort_by: "vote_average.desc",
      "vote_count.gte": 100,
      "primary_release_date.gte": "2015-01-01",
    },
  });
export const fetchTvSeries = () =>
  axiosInstance.get("/discover/tv", {
    params: {
      page: randomPage,
      sort_by: "popularity.desc",
      "vote_average.gte": 7.5,
      "vote_count.gte": 100,
      "first_air_date.gte": "2015-01-01",
      with_runtime: "30|60",
      without_genres: "16,10770",
    },
  });

export const fetchAnime = () =>
  axiosInstance.get("/discover/tv", {
    params: {
      page: randomPage,
      with_original_language: ["ja", "ko", "zh"].join("|"),
      with_genres: "16",
      sort_by: "popularity.desc",
      "vote_count.gte": 50,
      "first_air_date.gte": "2010-01-01",
    },
  });
