import axiosInstance from "./AxiosInstance";

export const searchMedia = async (query: string, year?: string) => {
    try {
      const params: any = {
        query: query,
      };
  
      if (year) {
        params.year = year;
      }
  
      const res = await axiosInstance.get("/search/multi", {
        params,
      });
  
      return res.data.results;
    } catch (error) {
      console.error("Error searching TMDB:", error);
      return [];
    }
  };
  