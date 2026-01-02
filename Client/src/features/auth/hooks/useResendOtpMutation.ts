import apiClient from "@/app/api/axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await apiClient.post("/auth/user/resend-otp", { email });
      return res.data;
    },
    onSuccess: () => {
      toast.success("OTP resent successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
