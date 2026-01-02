import apiClient from "@/api/axios";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "@/redux/slices/userSlice";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";

interface OtpResponse {
  message?: string;
  accessToken: string;
  user: User
}

export const useOtpMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationKey: ["otp"],
    mutationFn: async (otp: string): Promise<OtpResponse> => {
      const email = localStorage.getItem("pending_email");
      if (!email) throw new Error("No email found. Restart verification.");

      const res = await apiClient.post("/auth/user/verify-otp", { email,otp });
      return res.data.data;
    },
    onSuccess: (data) => {
      dispatch(setUser({ accessToken: data.accessToken, user: data.user }));
      navigate("/");
      toast.success(data?.message || "OTP verified successfully");
    },
    onError: (error) => {
      const message = error.message || "Login failed. Please try again.";
      toast.error(message || "OTP verification failed");
    },
  });
};