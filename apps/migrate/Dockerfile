FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

# Whole repo in one layer — nothing to individually forget.
# Requires a .dockerignore excluding node_modules, .git, .next, dist, etc.
COPY . .

RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm --filter @nexus/db exec prisma generate

# Matches the real root `prebuild` script's order exactly:
RUN pnpm --filter @nexus/tokens build
RUN pnpm --filter @nexus/contracts exec tsc -p tsconfig.lib.json
RUN pnpm --filter @nexus/env build
RUN pnpm --filter @nexus/config build
RUN pnpm --filter @nexus/api exec tsc -p tsconfig.lib.json

ENV NODE_OPTIONS=--max-old-space-size=3072
RUN pnpm --filter @nexus/admin build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/apps/admin/.next/standalone ./
COPY --from=builder /app/apps/admin/.next/static ./.next/static
COPY --from=builder /app/apps/admin/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
