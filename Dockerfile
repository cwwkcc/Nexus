FROM node:22-alpine AS base
WORKDIR /app

RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

# Whole repo in one layer — nothing to individually forget.
# Requires a .dockerignore excluding node_modules, .git, .next, dist, etc.
COPY . .

RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm --filter @nexus/db exec prisma generate

RUN pnpm --filter @nexus/tokens build
RUN pnpm --filter @nexus/contracts build
RUN pnpm --filter @nexus/env build
RUN pnpm --filter @nexus/config build
RUN pnpm --filter @nexus/api build

ENV NODE_OPTIONS=--max-old-space-size=3072

# ---- web ----
FROM base AS web-build
RUN pnpm --filter @nexus/web build

FROM node:22-alpine AS web-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=web-build /app/apps/web/.next/standalone ./
COPY --from=web-build /app/apps/web/.next/static ./.next/static
COPY --from=web-build /app/apps/web/public ./public
EXPOSE 3000
CMD ["node", "server.js"]

# ---- admin ----
FROM base AS admin-build
RUN pnpm --filter @nexus/admin build

FROM node:22-alpine AS admin-runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=admin-build /app/apps/admin/.next/standalone ./
COPY --from=admin-build /app/apps/admin/.next/static ./.next/static
COPY --from=admin-build /app/apps/admin/public ./public
EXPOSE 3000
CMD ["node", "server.js"]

# ---- migrate ----
# Not added yet — apps/migrate has no real source code as of this build,
# only a leftover Dockerfile copied from admin. Once it's a real app,
# add a "migrate-build" + "migrate-runner" pair here following the same
# pattern as web/admin above.