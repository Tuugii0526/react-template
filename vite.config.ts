import { fileURLToPath, URL } from "node:url";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	// The React app and its index.html live in `frontend/`.
	root: "frontend",
	plugins: [
		// Must come before the react plugin. Generates `frontend/routeTree.gen.ts`
		// from the file-based routes in `frontend/routes/`.
		// Paths are resolved relative to Vite's `root` (frontend/).
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "routes",
			generatedRouteTree: "routeTree.gen.ts",
		}),
		react(),
	],
	resolve: {
		alias: {
			// `@` maps to the app source root (frontend/), mirroring tsconfig paths.
			"@": fileURLToPath(new URL("./frontend", import.meta.url)),
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
