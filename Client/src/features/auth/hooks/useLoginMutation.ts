import apiClient from "@/app/api/axios";
import { User } from "@/app/types/user";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/app/redux/hooks";
import { setUser } from "@/app/redux/slices/userSlice";
import { useMutation } from "@tanstack/react-query";

interface LoginPayload {
  identifier: string;
  password: string;
}

interface LoginResponse {
  user: User;
  accessToken: string;
}

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: LoginPayload): Promise<LoginResponse> => {
      const res = await apiClient.post("/auth/user/login", payload);
      return res.data.data;
    },
    onSuccess: (data) => {
      dispatch(setUser({ accessToken: data.accessToken, user: data.user }));
      console.log(data);
      toast.success(`Welcome back, ${data.user.name}!`);
    },
    onError: (error: any) => {
      const message = error.message || "Login failed. Please try again.";
      toast.error(message);
    },
    retry: false,
  });
};
