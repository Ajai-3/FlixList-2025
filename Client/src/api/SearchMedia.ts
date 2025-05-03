import axiosInstance from "./AxiosInstance";

export const searchMedia = async (query: string) => {
  try {
    const res = await axiosInstance.get("/search/multi", {
      params: {
        query: query,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Error searching TMDB:", error);
    return [];
  }
};
