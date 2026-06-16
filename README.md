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
bun run build   # vite build → dist/
bun run prod    # NODE_ENV=production bun backend/src/index.ts
```

In production the Bun server (http://localhost:3000) serves the static `dist/` build **and**
the `/api/*` routes from a single process.

## Docker

A single multi-stage `Dockerfile` builds the frontend and runs the backend, which serves the
SPA + API from one process. `docker-compose.yml` runs that `app` image alongside a Postgres
`db` service (built from `db/Dockerfile`).

```bash
cp .env.example .env      # optional — compose has sensible defaults
docker compose up --build # app on :3000, postgres on :5432
docker compose down       # add -v to also drop the db volume
```

The backend receives `DATABASE_URL` (pointing at the `db` service) but does not query the DB
yet — the database is wired as infrastructure only. SQL placed in `db/initdb/` runs once on
first volume init.

> Note: if host port 3000 is taken, run `PORT=3005 docker compose up` (remaps app to 3005).

## API

The backend is a [Hono](https://hono.dev) app using `OpenAPIHono`. Routes live under
`backend/src/modules/<feature>/routes/`. In development, the OpenAPI spec is served at
`/api/openapi.json` and Swagger UI at `/api/docs`. The frontend talks to the API through a
type-safe RPC client (`backend/src/lib/rpc.ts`, consumed via `frontend/lib/api.ts`).

## Structure

- `frontend/` — React app (Vite `root`). Entry: `frontend/index.html` → `frontend/frontend.tsx`.
- `backend/src/` — Hono API server: `index.ts` (Bun.serve), `app.ts` (middleware + static `dist/`
  serving in production), `routes.ts`, and `modules/`.
- `vite.config.ts` — Vite config: `@` / `@api` aliases, `/api` dev proxy, build output to `dist/`.
