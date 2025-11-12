import apiClient from "../api/axios";
import { useQuery } from "@tanstack/react-query";

export const useBootstrap = () => {
  return useQuery({
    queryKey: ["bootstrap"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/bootstrap");
      return data;
    },
   staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60 * 24,
    retry: false,
    refetchOnWindowFocus: false, 
    refetchOnMount: false,
  });
};
