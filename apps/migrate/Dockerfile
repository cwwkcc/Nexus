FROM node:22-alpine
WORKDIR /app

# Install pnpm
RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

# Copy only the files needed for the database package
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/database/package.json ./packages/database/

# Install only the database package dependencies (skip postinstall - schema not yet available)
RUN pnpm install --frozen-lockfile --filter @nexus/db... --ignore-scripts

# Copy database source (Prisma schema + migrations)
COPY packages/database ./packages/database

# Generate Prisma client now that schema is present
RUN pnpm --filter @nexus/db exec prisma generate

CMD ["pnpm", "--filter", "@nexus/db", "migrate:deploy"]
