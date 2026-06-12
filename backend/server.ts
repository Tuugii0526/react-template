import { serve } from "bun";
import { join, normalize } from "node:path";

const isProd = process.env.NODE_ENV === "production";
const distDir = join(import.meta.dir, "..", "dist");

const server = serve({
  port: 3000,

  routes: {
    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  // In development, Vite (port 5173) serves the frontend and proxies /api here,
  // so the backend is API-only. In production, serve the built static assets
  // from dist/ with an SPA fallback to index.html.
  async fetch(req) {
    if (!isProd) {
      return new Response("Not found", { status: 404 });
    }

    const url = new URL(req.url);
    // Prevent path traversal: resolve within distDir and verify containment.
    const filePath = normalize(join(distDir, url.pathname));
    if (filePath.startsWith(distDir)) {
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file);
      }
    }

    // SPA fallback for client-side routes.
    return new Response(Bun.file(join(distDir, "index.html")));
  },
});

console.log(`🚀 API server running at ${server.url}`);
if (isProd) console.log(`📦 Serving static build from ${distDir}`);
