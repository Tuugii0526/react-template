# bun-react-template

A React frontend built with **Vite**, backed by a **Bun** API server. Bun is the runtime and
package manager; Vite handles frontend dev (Fast Refresh) and production builds.

## Install

```bash
bun install
```

## Develop

```bash
bun dev
```

Runs `scripts/dev.ts`, a small Bun script that starts both servers and shuts
them down together (no extra dependency):

- **web** — Vite dev server at http://localhost:5173 (React + Fast Refresh)
- **api** — Bun API server at http://localhost:3000 (`/api/*` routes)

Vite proxies `/api` requests to the Bun backend, so you only need to open
http://localhost:5173. To run them individually: `bun dev:web` / `bun dev:api`.

## Build & run for production

```bash
bun build   # vite build → dist/
bun start   # NODE_ENV=production bun backend/server.ts
```

In production the Bun server (http://localhost:3000) serves the static `dist/` build **and**
the `/api/*` routes from a single process.

## Structure

- `frontend/` — React app (Vite `root`). Entry: `frontend/index.html` → `frontend/frontend.tsx`.
- `backend/server.ts` — Bun API server (+ static `dist/` serving in production).
- `vite.config.ts` — Vite config: `@` alias, `/api` dev proxy, build output to `dist/`.
