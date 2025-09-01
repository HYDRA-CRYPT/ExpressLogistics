import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // forward /api to backend at localhost:5000 during dev
      "/api": {
        target: "http://localhost:5000/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
