FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/config/package.json ./packages/config/
COPY packages/ui/package.json ./packages/ui/
COPY packages/contracts/package.json ./packages/contracts/
COPY packages/database/package.json ./packages/database/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY apps/web ./apps/web
COPY packages/config ./packages/config
COPY packages/ui ./packages/ui
COPY packages/contracts ./packages/contracts
COPY packages/database ./packages/database

# Build web app
RUN pnpm --filter @nexus/web build

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built app
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
