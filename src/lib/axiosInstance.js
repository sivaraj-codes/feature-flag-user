import axios from "axios";
import { PUBLIC_PATHS } from "../shared/constants";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || "Something went wrong";
    if (
      err.response?.status === 401 &&
      !err.config?.url?.includes("/auth/me") &&
      !PUBLIC_PATHS.includes(window.location.pathname)
    ) {
      window.location.href = "/auth";
    }
    return Promise.reject(new Error(message));
  },
);
