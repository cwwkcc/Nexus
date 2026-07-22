FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/tokens/package.json ./packages/tokens/
COPY packages/env/package.json ./packages/env/
COPY packages/config/package.json ./packages/config/
COPY packages/contracts/package.json ./packages/contracts/
COPY packages/api/package.json ./packages/api/
COPY packages/database/package.json ./packages/database/
COPY packages/ui/package.json ./packages/ui/

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY apps/web ./apps/web
COPY packages/tokens ./packages/tokens
COPY packages/env ./packages/env
COPY packages/config ./packages/config
COPY packages/contracts ./packages/contracts
COPY packages/api ./packages/api
COPY packages/database ./packages/database
COPY packages/ui ./packages/ui

RUN pnpm --filter @nexus/db exec prisma generate

# Matches the real root `prebuild` order
RUN pnpm --filter @nexus/tokens build
RUN pnpm --filter @nexus/contracts exec tsc -p tsconfig.lib.json
RUN pnpm --filter @nexus/env build
RUN pnpm --filter @nexus/config build
RUN pnpm --filter @nexus/api exec tsc -p tsconfig.lib.json

ENV NODE_OPTIONS=--max-old-space-size=3072
RUN pnpm --filter @nexus/web build