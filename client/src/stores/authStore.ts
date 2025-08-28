import { create } from "zustand";
import { api } from "../services/api";
import axios from "axios";
import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  restoreSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  // ===== LOGIN =====
  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
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

      // Store refresh token if provided
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      localStorage.setItem("adminRole", data.user.role);
      localStorage.setItem("adminUser", JSON.stringify(data.user));

      // Set default Authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      console.log("Login successful, tokens stored");
      return true;
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      console.error("Login error:", err);
      set({ loading: false, error: message });
      return false;
    }
  },

  // ===== LOGOUT =====
  logout: () => {
    set({ user: null, token: null });

    // Clear all stored data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token"); // Clean up legacy token
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminUser");

    delete api.defaults.headers.common["Authorization"];

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
}));
