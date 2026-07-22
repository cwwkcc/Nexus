FROM node:22-alpine
WORKDIR /app

RUN corepack enable pnpm && corepack prepare pnpm@10.32.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/database/package.json ./packages/database/
COPY packages/contracts/package.json ./packages/contracts/

RUN pnpm install --frozen-lockfile --filter @nexus/db... --ignore-scripts

COPY packages/database ./packages/database
COPY packages/contracts ./packages/contracts

RUN pnpm --filter @nexus/db exec prisma generate

CMD ["pnpm", "--filter", "@nexus/db", "db:migrate:deploy"]