// src/services/api.ts
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

// Use environment variable for base URL, fallback to current origin for production
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://aegis-express-api.onrender.com/api" // Use absolute URL for production
    : "http://localhost:5000/api");

// --- Token Manager (FIXED) ---
const tokenManager = {
  get accessToken() {
    // Try both keys for backward compatibility
    return localStorage.getItem("adminToken") || localStorage.getItem("token");
  },
  get refreshToken() {
    return localStorage.getItem("refreshToken");
  },
  get loginTime() {
    const time = localStorage.getItem("loginTime");
    return time ? parseInt(time) : null;
  },
  setTokens(access: string, refresh?: string) {
    localStorage.setItem("adminToken", access);
    localStorage.setItem("loginTime", Date.now().toString());
    if (refresh) {
      localStorage.setItem("refreshToken", refresh);
    }
  },
  clear() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token"); // Clean up both
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("loginTime");
  },
  getSessionAge() {
    const loginTime = this.loginTime;
    if (!loginTime) return null;
    return (Date.now() - loginTime) / 1000 / 60; // Return age in minutes
  },
  isSessionExpired(maxAgeMinutes: number = 60) {
    const age = this.getSessionAge();
    return age ? age > maxAgeMinutes : true;
  },
};

// --- Axios Instance ---
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // 60 seconds for delivery creation with PDF/email
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Include credentials for CORS
});

// --- Refresh Logic ---
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else if (token) prom.resolve(token);
  });
  failedQueue = [];
};

// --- Request Interceptor ---
api.interceptors.request.use(
  (config) => {
    const token = tokenManager.accessToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor ---
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Don't try to refresh tokens for login, refresh, or other auth endpoints
    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/register");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      // Already refreshing? Queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = tokenManager.refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { token: newToken, refreshToken: newRefresh } = data;
        tokenManager.setTokens(newToken, newRefresh);

        // Update defaults & retry queued requests
        api.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return api({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError, null);
        tokenManager.clear();

        // Redirect to login only if not already on auth pages
        if (
          window.location.pathname !== "/owner/login" &&
          !window.location.pathname.includes("/auth")
        ) {
          window.location.href = "/owner/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
