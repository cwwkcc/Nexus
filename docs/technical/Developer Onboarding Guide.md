# Developer Onboarding Guide

## Welcome to the Nexus Project

Nexus is the official digital institution of C.W.W. Kannangara Central College. This guide will help you get started with development as quickly as possible.

---

## Before You Start

### What You Need

- **Node.js 18+** — Download from nodejs.org
- **pnpm 8+** — Install via `npm install -g pnpm`
- **Docker** — For running PostgreSQL locally
- **Git** — For version control
- **A code editor** — VS Code recommended (with TypeScript and Tailwind extensions)
- **A `@cwwkcc.lk` email** — For admin authentication (Google Workspace)

### What to Read First

| Document                      | Why                   |
| ----------------------------- | --------------------- |
| [README.md]()                 | Project overview      |
| [Engineering-Roadmap.md]()    | Complete build plan   |
| [Feature-Registry.md]()       | Complete feature list |
| [Technical-Architecture.md]() | System architecture   |
| [Design-System-Summary.md]()  | Visual identity       |

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/cwwkcc/nexus.git
cd nexus
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

```bash
# Create .env.local for web app
cp apps/web/.env.example apps/web/.env.local

# Create .env.local for admin app
cp apps/admin/.env.example apps/admin/.env.local
```

Fill in the required values:

- `DATABASE_URL` — Local PostgreSQL connection string
- `NEXTAUTH_SECRET` — Generate via `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000`
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` — From Google Cloud Console (ask a team member)

### 4. Set Up the Database

```bash
# Start PostgreSQL via Docker
docker compose up -d postgres

# Run migrations
cd packages/database
pnpm prisma migrate dev --name init

# Seed the database
pnpm prisma db seed
```

### 5. Start Development Servers

```bash
# Start both apps with Turbopack
pnpm dev

# Or start individually
pnpm dev:web   # Public site on http://localhost:3000
pnpm dev:admin # Admin panel on http://localhost:3001
```

---

## Project Structure

```

```

---

## Development Workflow

### Adding a New Page

1. Create a new route folder in `apps/web/src/app/[locale]/`
2. Add the page component (server component by default)
3. Add translations to `apps/web/src/i18n/messages/`
4. Update the navigation if needed

### Adding a New Component

1. Add component to `packages/ui/src/components/`
2. Export from `packages/ui/index.ts`
3. Add storybook story (if using Storybook)
4. Write tests if it has complex logic

### Adding a New API Endpoint

1. Add procedure to the appropriate router in `packages/api/src/routers/`
2. Add or reuse a schema in `packages/contracts/src/` — under `blocks/` for a content block type, `school/` or `content/` for a domain entity, `core/` for a shared primitive
3. Use `protectedProcedure` or `adminProcedure` for authenticated endpoints

### Running Commands

```bash
# Lint
pnpm lint

# Typecheck
pnpm typecheck

# Build all packages and apps
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

---

## Common Development Tasks

### Working with Translations

```bash
# Add a new translation key
# 1. Edit the English JSON file
# 2. Add placeholder entries to Sinhala and Tamil JSON files
# 3. Run the type check to ensure all keys exist
```

### Working with the Database

```bash
# Generate Prisma client after schema changes
cd packages/database
pnpm prisma generate

# Create a migration
pnpm prisma migrate dev --name <migration-name>

# Reset the database
pnpm prisma db push --force-reset
pnpm prisma db seed
```

### Adding a New Environment Variable

1. Add to `apps/web/.env.example` and `apps/admin/.env.example`
2. Add to GitHub repository secrets
3. Add to Hetzner server environment file
4. Document in `docs/operations/Environment Variables.md`

---

## Coding Standards

### TypeScript

- Use strict mode — no `any` without a very good reason
- Infer types from Zod schemas using `z.infer<>`
- Export types from `packages/contracts` rather than redefining them

### Components

- Use design tokens exclusively — no hardcoded values
- Add proper accessibility attributes (aria labels, roles)
- Handle loading, error, and empty states
- Use the `cn` utility for conditional classes

### Styling

- Use Tailwind utility classes
- Reference design tokens via `var(--token-name)`
- No `backdrop-filter` — use glass tokens instead

### Git Commits

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Keep commits focused and atomic
- Write descriptive commit messages

---

## Architecture Decision Records

The project uses ADRs to document important technical decisions. Before making a significant architectural change, review the existing ADRs in `docs/adr/`:

| ADR     | Topic                          |
| ------- | ------------------------------ |
| ADR-001 | Monorepo Architecture          |
| ADR-002 | Next.js App Router             |
| ADR-003 | PostgreSQL Selection           |
| ADR-004 | tRPC Selection                 |
| ADR-005 | Zod Contracts Strategy         |
| ADR-006 | R2 Storage Selection           |
| ADR-007 | Analytics Strategy             |
| ADR-008 | Multilingual Font Architecture |
| ADR-009 | ContentEntry Architecture      |

If you need to change a decision, write a new ADR explaining the reversal.

---

## Getting Help

- Ask the KITS team on WhatsApp / Teams
- Check the documentation in `docs/`
- Search the repository for similar implementations
- Review the Feature Registry and Engineering Roadmap

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**
