import axiosInstance from "./AxiosInstance";


export const searchMedia = async (query: string, year?: string) => {
    try {
      if (!query.trim()) {
        throw new Error("Empty search query");
      }

      const params: any = {
        query: query,
        include_adult: false
      };
  
      if (year) {
        params.year = year;
      }
  
      const res = await axiosInstance.get("/search/multi", {
        params,
      });

      if (!res.data?.results) {
        throw new Error("Invalid API response structure");
      }
  
      return res.data.results;
    } catch (error) {
      console.error("Error searching TMDB:", error);
      throw error;
    }
  };