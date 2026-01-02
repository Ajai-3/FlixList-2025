import axios, { AxiosError, AxiosInstance, AxiosResponse, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { logout, setAccessToken } from "../redux/slices/userSlice";
import { adminLogout, setAdminAccessToken } from "../redux/slices/adminSlice";

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
    _noRetry?: boolean;
  }
}

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const token = state.admin.accessToken || state.user.accessToken || null;

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`, config.data || "");
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  async (error: AxiosError & { config?: InternalAxiosRequestConfig }) => {
    if (!error.response) {
      return Promise.reject({
        status: 503,
        message: error.message.includes("timeout") ? "Request timed out" : "Network error",
        fullError: error,
      });
    }

    const originalRequest = error.config;
    const state = store.getState();
    const isAdmin = state.admin.isAuthenticated;

    if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await apiClient.get("/auth/refresh-token", { _noRetry: true });
        const newToken = (refreshResponse.data as any)?.accessToken;
        if (!newToken) throw new Error("No accessToken returned from refresh");

        if (isAdmin) store.dispatch(setAdminAccessToken(newToken));
        else store.dispatch(setAccessToken(newToken));

        if (!originalRequest.headers) originalRequest.headers = new AxiosHeaders();
        originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        isAdmin ? store.dispatch(adminLogout()) : store.dispatch(logout());
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    console.error(`❌`, error.response.data);

    return Promise.reject({
      status: error.response.status,
      message: (error.response.data as any)?.message || "Request failed",
      fullError: error.response,
    });
  }
);

export default apiClient;