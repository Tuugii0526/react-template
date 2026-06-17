# bun-react-template

A React frontend built with **Vite**, backed by a **Bun** API server. Bun is the runtime and
package manager; Vite handles frontend dev (Fast Refresh) and production builds.

## Install

```bash
bun install
```

## Develop

- **web** — Vite dev server at http://localhost:5173 (React + Fast Refresh)
- **api** — Bun API server at http://localhost:3000 (`/api/*` routes)


## Build & run for production

```bash
bun run build   # vite build → dist/
bun run prod    # NODE_ENV=production bun backend/src/index.ts
```

In production the Bun server (http://localhost:3000) serves the static `dist/` build **and**
the `/api/*` routes from a single process.
