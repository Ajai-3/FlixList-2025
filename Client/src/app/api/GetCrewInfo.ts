import axiosInstance from "./AxiosInstance";

export const getCrewInfo = async (mediaType: "movie" | "tv", id: string) => {
  try {
    const endpoint = `/${mediaType}/${id}/credits`;
    const res = await axiosInstance.get(endpoint);
    const crew = res.data.crew;

    const directors = crew.filter((member: any) => {
      const job = member.job?.toLowerCase();
      return (
        job === "director" ||
        job === "series director" ||
        (mediaType === "tv" && (
          job.includes("director") ||
          job === "showrunner" ||
          job === "creator" ||
          job === "executive producer"
        ))
      );
    });

    const writers = crew.filter((member: any) => {
      const job = member.job?.toLowerCase();
      const dept = member.department?.toLowerCase();
      
      if (["writer", "screenplay", "author", "story"].includes(job)) {
        return true;
      }
    
      if (mediaType === "tv") {
        return (
          dept === "writing" ||
          job.includes("writer") ||
          job === "creator" ||
          job === "developer" ||
          job === "story editor" ||
          job === "teleplay" ||
          job === "written by" ||
          job === "script" ||
          job === "script editor" ||
          job === "executive producer" 
        );
      }
      
      return false;
    });

    const uniqueNames = (arr: any[]) => {
      const seen = new Set();
      return arr.filter(item => {
        const key = item.name.toLowerCase();
        return seen.has(key) ? false : seen.add(key);
      });
    };

    return {
      directors: uniqueNames(directors).map((d: any) => d.name),
      writers: uniqueNames(writers).map((w: any) => w.name),
    };
  } catch (error) {
    console.error("Error fetching crew info:", error);
    return { directors: [], writers: [] };
  }
};