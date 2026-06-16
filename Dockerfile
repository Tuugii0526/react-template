# syntax=docker/dockerfile:1

# Single multi-stage image (mirrors whistler3's deploy shape): build the React
# frontend with Vite, then run the Bun/Hono backend, which serves the built SPA
# from dist/ PLUS the /api routes from one process.

FROM oven/bun:1.3.14-slim AS base
WORKDIR /app

# --- install all deps (incl. dev — needed by the build) ---
FROM base AS install
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
	bun install --frozen-lockfile

# --- build the frontend (tsc -b && vite build -> /app/dist) ---
FROM install AS build
COPY . .
ENV NODE_ENV=production
RUN bun run build

# --- production-only deps (no devDependencies) ---
FROM base AS prod-deps
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
	bun install --frozen-lockfile --production

# --- final runtime image ---
FROM base AS release
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
# tsconfig files let Bun resolve the backend's "@api/*" path alias at runtime.
COPY package.json tsconfig.json tsconfig.base.json ./
COPY backend ./backend

EXPOSE 3000
CMD ["bun", "run", "prod"]

