FROM node:22-alpine
WORKDIR /app

# Install pnpm
RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

# Copy only the files needed for the database package
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/database/package.json ./packages/database/

# Install only the database package dependencies
RUN pnpm install --frozen-lockfile --filter @nexus/database...

# Copy database source (Prisma schema + migrations)
COPY packages/database ./packages/database

CMD ["pnpm", "--filter", "@nexus/database", "migrate:deploy"]
