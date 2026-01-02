import apiClient from "@/app/api/axios"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"

interface RegisterPayload {
  name: string,
  email: string,
  password: string
}

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async (payload: RegisterPayload): Promise<any> => {
      const data = apiClient.post("/auth/user/register", payload)
      return data
    },
    onSuccess: () => {
      toast.success("Otp sended to you email");
    },
    onError: (error) => {
      const message = error.message || "Sign up failed. Please try again.";
      toast.error(message);
    },
    retry: false
  })
}