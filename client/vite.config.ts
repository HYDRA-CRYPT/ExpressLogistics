import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ui: [
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
          ],
          utils: ["axios", "date-fns", "clsx"],
        },
      },
      onwarn(warning, warn) {
        // Suppress specific warnings that can cause Vercel builds to fail
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        if (warning.code === "INVALID_ANNOTATION") {
          return;
        }
        warn(warning);
      },
    },
    target: "es2020",
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
});
