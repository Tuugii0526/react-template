import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  // The React app and its index.html live in `frontend/`.
  root: "frontend",
  plugins: [react()],
  resolve: {
    alias: {
      // Mirrors the `@/*` path in tsconfig.json (maps to the project root).
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  server: {
    port: 5173,
    proxy: {
      // Forward API requests to the Bun backend (see backend/server.ts).
      "/api": "http://localhost:3000",
    },
  },
  build: {
    // Output to <root>/dist, relative to `frontend/`.
    outDir: "../dist",
    emptyOutDir: true,
  },
});
