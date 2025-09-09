import { create } from "zustand";
import { api } from "../services/api";
import axios from "axios";
import type { User } from "@/types/auth";
import { toast } from "react-toastify";
import { SessionManager } from "../utils/sessionManager";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  restoreSession: () => void;
  fetchUserProfile: () => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // ===== LOGIN =====
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });

    const toastId = toast.loading("Signing in...");

    try {
      const { data } = await api.post("/auth/login", { email, password });

      // Check if we got both tokens
      const accessToken = data.token || data.accessToken;
      const refreshToken = data.refreshToken;

      if (!accessToken) {
        throw new Error("No access token received");
      }

      set({ user: data.user, token: accessToken, loading: false });

      // Persist tokens and user info
      localStorage.setItem("adminToken", accessToken);
      localStorage.setItem("loginTime", Date.now().toString());

      // Store refresh token if provided
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      localStorage.setItem("adminRole", data.user.role);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      // Set login time for session management
      SessionManager.setLoginTime();

      // Set default Authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      console.log("Login successful, tokens stored");
      toast.update(toastId, {
        render: "Welcome back!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return true;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      console.error("Login error:", err);
      set({ loading: false, error: message });
      toast.update(toastId, {
        render: `Login failed: ${message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return false;
    }
  },

  // ===== LOGOUT =====
  logout: () => {
    set({ user: null, token: null });

    // Clear all stored data using SessionManager
    SessionManager.clearSession();

    delete api.defaults.headers.common["Authorization"];

    toast.info("You have been logged out");

    // Redirect to login
    window.location.href = "/owner/login";
  },

  // ===== RESTORE SESSION =====
  restoreSession: () => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole");
    const userString = localStorage.getItem("adminUser");

    if (!token || role !== "admin" || !userString) {
      console.log("No valid session to restore");
      return;
    }

    try {
      const user = JSON.parse(userString);

      // Set auth header
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Restore state
      set({ user, token });

      console.log("Session restored successfully");
    } catch (error) {
      console.error("Failed to restore session:", error);

      // Clear corrupted data
      set({ user: null, token: null });
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("refreshToken");
    }
  },

  // ===== FETCH USER PROFILE =====
  fetchUserProfile: async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.log("No token available for profile fetch");
      return;
    }

    try {
      // Set auth header
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log(
        "Fetching user profile from:",
        api.defaults.baseURL + "/auth/me"
      );

      const { data } = await api.get("/auth/me");

      if (data.user) {
        // Update user state and localStorage
        set({ user: data.user });
        localStorage.setItem("adminUser", JSON.stringify(data.user));
        localStorage.setItem("adminRole", data.user.role);

        console.log("User profile fetched successfully:", data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);

      if (axios.isAxiosError(error)) {
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
        console.error("Response headers:", error.response?.headers);

        if (error.response?.status === 401) {
          // Token is invalid, logout user
          set({ user: null, token: null });
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminRole");
          localStorage.removeItem("adminUser");
          localStorage.removeItem("refreshToken");
          delete api.defaults.headers.common["Authorization"];

          toast.error("Session expired. Please login again.");
          window.location.href = "/owner/login";
        } else {
          toast.error(
            "Failed to fetch user profile. Please try refreshing the page."
          );
        }
      }
    }
  },

  // ===== UPDATE PASSWORD =====
  updatePassword: async (currentPassword: string, newPassword: string) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast.error("No authentication token found");
      return false;
    }

    set({ loading: true, error: null });
    const toastId = toast.loading("Updating password...");

    try {
      // Set auth header
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log(
        "Updating password to:",
        api.defaults.baseURL + "/auth/update-password"
      );

      const { data } = await api.put("/auth/update-password", {
        currentPassword,
        newPassword,
      });

      if (data.success) {
        set({ loading: false });
        toast.update(toastId, {
          render: "Password updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        return true;
      } else {
        throw new Error(data.message || "Failed to update password");
      }
    } catch (err: unknown) {
      let message = "Failed to update password";

      if (axios.isAxiosError(err)) {
        console.error("Password update error response:", err.response?.data);
        console.error("Password update error status:", err.response?.status);
        message = err.response?.data?.message || message;
      }

      console.error("Password update error:", err);
      set({ loading: false, error: message });
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
      return false;
    }
  },
}));
