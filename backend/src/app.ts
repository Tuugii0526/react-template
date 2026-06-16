import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import routes from "./routes";

const app = new OpenAPIHono();

app.use("*", logger());

app.route("/", routes);

app.onError((err, c) => {
  return c.json(
    {
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    },
    500,
  );
});

if (process.env.NODE_ENV === "development") {
  app
    .doc("/api/openapi.json", {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "React Template API",
      },
    })
    .get(
      "/api/docs",
      swaggerUI({
        url: "/api/openapi.json",
      }),
    );
}

// In development the Vite dev server (port 5173) serves the frontend and proxies
// /api here. In production serve the built static assets from dist/ with an SPA
// fallback to index.html. dist/ lives at the repo root (vite outDir "../dist"),
// resolved relative to the process cwd.
if (process.env.NODE_ENV !== "development") {
  app.get("*", serveStatic({ root: "./dist" }));
  app.get(serveStatic({ path: "./dist/index.html" }));
}

export default app;
