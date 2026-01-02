import apiClient from "@/app/api/axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (identifier: string) => {
      const res = await apiClient.post("/auth/user/forgot-password", { identifier });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password reset email sent. Please check your email.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};