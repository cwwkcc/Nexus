A curriculum for a single developer to build the entire Nexus platform at a production level. Covers everything from design tokens to deployment.

---

## 1. Core Web Fundamentals

|Topic|Why needed|
|---|---|
|HTML5 semantics|Every component must be accessible and SEO‑friendly.|
|CSS (modern)|Flexbox, Grid, custom properties, `clamp()`, `@layer`, `@keyframes`.|
|JavaScript (ES2022+)|Async/await, modules, closures, event loop, proxies (for state).|
|HTTP/HTTPS|Status codes, headers (caching, CORS), cookies, secure flags.|
|REST & GraphQL concepts|Even if you use tRPC, you need to understand request/response patterns.|
|Web accessibility (WCAG 2.1 AA)|ARIA, keyboard navigation, focus management, colour contrast.|
|Responsive design|Mobile‑first, breakpoints, `srcset`, `sizes`, touch targets.|

---

## 2. Design System & UI Engineering

|Topic|Why needed|
|---|---|
|Design tokens|CSS custom properties, JSON structure, syncing with Tailwind.|
|Tailwind CSS|Utility‑first, custom presets, plugin creation, `tailwind-merge`.|
|CSS architecture|BEM or equivalent, theming, preventing specificity wars.|
|Component patterns|Compound components, render props, polymorphic `as` prop.|
|Framer Motion|AnimatePresence, variants, layout animations, gesture handling, `useReducedMotion`.|
|GSAP|Timeline‑based animations for the hero load and crest drawing — not optional; the crest drawing animation (Engineering Roadmap Tasks 3.18 and 8.1) depends on it specifically.|
|Tiptap|Rich text editor used in `apps/admin` for news posts and announcements. ProseMirror concepts underneath, JSON output format, building custom extensions/toolbar buttons.|
|SVG manipulation|Manual path editing, `viewBox`, responsive SVGs, inline vs img.|
|Typography systems|Modular scale, web font loading strategies, fallback fonts, Sinhala script support.|
|Colour theory|Contrast ratios, semantic colour naming, accessible palettes.|

---

## 3. TypeScript

|Topic|Why needed|
|---|---|
|Basic types|`string`, `number`, `boolean`, arrays, tuples, `any` (avoid), `unknown`.|
|Advanced types|Unions, intersections, generics, conditional types, `satisfies`.|
|Type narrowing|`typeof`, `instanceof`, type predicates, discriminated unions.|
|Utility types|`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`, `Awaited`.|
|Declaration merging|Extending global interfaces (e.g., `Window`).|
|Type-safe APIs|Inferring types from Prisma or tRPC.|

---

## 4. React (v19) & Next.js (App Router)

|Topic|Why needed|
|---|---|
|React fundamentals|Components, props, state, effects, context, refs, portals.|
|Hooks in depth|`useCallback`, `useMemo`, `useReducer`, `useLayoutEffect`, custom hooks.|
|React 19 features|`use`, `useOptimistic`, `useFormStatus`, Actions, Server Components.|
|Next.js App Router|File‑based routing, layouts, error boundaries, loading UI, `notFound()`.|
|Server Components|Async components, streaming, `cookies()`, `headers()`, `fetch` caching.|
|Client Components|`'use client'`, hydration, interactive parts.|
|Data fetching|`fetch` with cache tags, `unstable_cache`, server actions, `useQuery` (optional).|
|Metadata & SEO|`generateMetadata`, Open Graph, JSON‑LD, sitemap.|
|Middleware|Rewrites, redirects, authentication, locale detection.|
|Image optimisation|`next/image`, `sizes`, remote patterns, WebP conversion.|
|Internationalisation|`next-intl` – routing, messages, date/number formatting, Sinhala line‑height.|
|Environment variables|`NEXT_PUBLIC_*`, runtime vs build‑time, validation with Zod.|

---

## 5. Styling & Token Management

|Topic|Why needed|
|---|---|
|PostCSS|Autoprefixer, custom plugins, Tailwind integration.|
|Tailwind config|Extending theme, `presets`, overriding core plugins.|
|Custom Tailwind classes|Using `@layer utilities` for complex gradients.|
|CSS‑in‑JS alternatives|Not used – but know why you chose Tailwind.|
|Design token generation|Scripts that read token JSON and output CSS vars + Tailwind classes.|
|Responsive variants|`sm:`, `md:`, `lg:` breakpoints matched to your `screens`.|
|Dark mode (not used)|But know how to implement if needed.|

---

## 6. Node.js & Backend (within Next.js)

|Topic|Why needed|
|---|---|
|Node.js runtime|Event loop, streams, `fs`, `path`, child processes.|
|Server actions|Form submissions, data mutations, revalidation.|
|API routes|REST endpoints for external services (Resend, R2 callbacks).|
|Middleware (Node)|Logging, rate limiting, security headers.|
|Environment configuration|`.env.local`, `process.env`, validation.|
|File uploads|Handling `multipart/form-data`, streaming to R2.|
|Error handling|Try/catch, global error pages, Sentry integration.|

---

## 7. Database & Prisma (PostgreSQL)

|Topic|Why needed|
|---|---|
|Relational databases|Tables, relationships (one‑to‑many, many‑to‑many), indexes, foreign keys.|
|PostgreSQL specifics|JSONB, full‑text search, migrations, transactions, connection pooling.|
|Prisma ORM|Schema definition, migrations, Prisma Client, type safety, raw queries.|
|Prisma with Next.js|Global client singleton, serverless compatibility, edge adapters.|
|Data validation|Zod schemas that mirror Prisma types (for forms and API).|
|Query optimisation|`select`, `include`, `where`, `orderBy`, pagination (`skip`/`take`, cursor).|
|Database migrations|`prisma migrate dev`, squashing migrations, production apply.|
|Connection management|`DATABASE_URL`, connection limits, Prisma Data Proxy (optional).|

---

## 8. File Storage & CDN (Cloudflare R2)

|Topic|Why needed|
|---|---|
|Object storage basics|Buckets, access keys, public vs private, presigned URLs.|
|AWS S3 SDK (v3)|`@aws-sdk/client-s3`, `Upload`, `PutObjectCommand`, `GetObjectCommand`.|
|Presigned URLs|Generate temporary upload URLs for admin forms.|
|Image optimisation pipeline|Sharp (resize, convert to WebP, strip metadata) before upload.|
|Caching strategies|`Cache-Control` headers, ETags, Cloudflare edge caching.|
|Custom domain|`assets.cwwkcc.lk` pointing to R2 bucket.|

---

## 9. Authentication & Authorisation (Admin)

|Topic|Why needed|
|---|---|
|Auth.js (NextAuth)|Google provider as the primary sign-in method, restricted to `@cwwkcc.lk` — domain verification in the `signIn` callback, JWT sessions, database adapter for Prisma.|
|Invite-based access|Why successful Google sign-in alone isn't enough — the `User` table, not the school's Google directory, is what actually grants access.|
|Break-glass account & TOTP|Credentials provider, bcrypt password hashing, and TOTP (RFC 6238) — but only for the one seeded recovery account, not for everyday admin sign-in.|
|Role‑based access|Admin vs editor roles, middleware checks.|
|Session management|Cookie attributes (`HttpOnly`, `Secure`, `SameSite`), refresh tokens.|
|CSRF protection|Built into Next.js form actions, but understand the concept.|

---

## 10. Email (Resend)

|Topic|Why needed|
|---|---|
|Transactional email|SMTP vs API, deliverability, SPF/DKIM.|
|Resend API|Sending emails, attachments, templates.|
|React Email|Building email components, responsive HTML emails.|
|Rate limiting|Prevent form spam (5 per hour per IP).|

---

## 11. Monorepo & Build Tools

|Topic|Why needed|
|---|---|
|pnpm|Workspaces, `pnpm-workspace.yaml`, `node_modules` structure, `pnpm-lock.yaml`.|
|Nx|Task orchestration, caching, affected commands, `nx.json`.|
|Turborepo (optional)|Understand how Nx compares.|
|Shared packages|Local package linking (`@nexus/*`), `exports` field, `typesVersions`.|
|Build pipelines|`build`, `dev`, `typecheck`, `lint` scripts across apps.|
|Path aliases|`@nexus/ui`, `@/*` in Next.js.|

---

## 12. Testing

|Topic|Why needed|
|---|---|
|Unit testing|Vitest or Jest – test utilities, hooks, components in isolation.|
|Integration testing|Test interactions between components and API routes.|
|End‑to‑end|Playwright or Cypress – critical user journeys (apply, news, results).|
|Accessibility testing|axe, `jest-axe`, `@axe-core/playwright`.|
|Lighthouse CI|Performance budgets, automated regression.|

---

## 13. DevOps & Deployment (Hetzner + Docker)

|Topic|Why needed|
|---|---|
|Linux basics (Ubuntu)|SSH, `systemd`, `journalctl`, `cron`, `ufw`.|
|Docker|Dockerfile, `.dockerignore`, multi‑stage builds, volumes, networking.|
|Docker Compose|Service definitions, environment variables, `depends_on`, healthchecks.|
|Reverse proxy|Caddy or nginx – virtual hosts, SSL termination, WebSocket support.|
|SSL certificates|Let’s Encrypt, automatic renewal, Caddy’s built‑in manager.|
|Process management|Docker handles it – no PM2 needed.|
|Environment secrets|`.env` files on server, never in Git.|
|Database backups|`pg_dump` cron job, off‑site storage (R2).|
|Monitoring|UptimeRobot, Sentry, Prometheus (optional), logging with `docker logs`.|
|CI/CD|GitHub Actions: build Docker image, push to registry (optional), SSH deploy.|

---

## 14. Security

|Topic|Why needed|
|---|---|
|OWASP Top 10|Injections, broken auth, sensitive exposure, XSS, CSRF.|
|Next.js security|`next.config.js` headers, `x-frame-options`, CSP.|
|SQL injection|Prisma parameterised queries – safe by default.|
|Environment variables|Server‑only secrets, `NEXT_PUBLIC_` rules.|
|Data validation|Zod on both client and server.|
|Rate limiting|`@upstash/ratelimit` or custom in‑memory.|
|GDPR / privacy|Cookie consent, analytics opt‑out, data minimisation.|

---

## 15. Performance Optimisation

|Topic|Why needed|
|---|---|
|Core Web Vitals|LCP, INP, CLS – how to measure and fix.|
|Image optimisation|`next/image`, WebP, lazy loading, responsive `sizes`.|
|Code splitting|Dynamic imports (`next/dynamic`), route groups.|
|Bundle analysis|`@next/bundle-analyzer`, `nx build --stats`.|
|Caching strategies|`fetch` with `force-cache`, ISR, `stale-while-revalidate`.|
|Database query optimisation|`prisma` – select only needed fields, use indexes.|
|Font loading|`font-display: swap`, preload only critical fonts.|

---

## 16. Project & Time Management

|Topic|Why needed|
|---|---|
|Version control|Git – branching strategy, conventional commits, rebase vs merge.|
|Code reviews|Review checklist (accessibility, token usage, performance).|
|Documentation|Write as you build – keep `docs/` updated.|
|Task breakdown|Break epic (e.g., "Admin panel") into 1‑day tasks.|
|Estimation|Learn to estimate not in hours but in confidence levels.|

---

## Realistic Learning Path (6–12 months)

If you are learning while building, here is a suggested order:

1. **HTML, CSS, JavaScript** – 2 months
2. **React + Next.js (basics)** – 1 month
3. **Tailwind + design tokens** – 2 weeks
4. **TypeScript** – 2 weeks (integrate gradually)
5. **Prisma + PostgreSQL** – 2 weeks
6. **Build the public homepage** – 2 weeks (static first)
7. **Add the admin panel** – 3 weeks (simple CRUD)
8. **Deploy on Hetzner with Docker** – 1 week
9. **Accessibility + performance audits** – 1 week
10. **Polish & launch** – 2 weeks

That totals ~5 months of full‑time effort, or 10 months part‑time. Adjust based on prior experience.

---

## Final Advice

You do not need to master everything before you start. **Learn just enough to build the next feature.** The documentation you already wrote is your compass – it tells you what decisions were made and why.

If you ever feel overwhelmed, focus on **one vertical slice**:

Build a single page (e.g., "News") with:

- Public display (`apps/web`)
- Admin form (`apps/admin`)
- Database table (`Prisma`)
- Image upload (`R2`)
- Production deployment (Docker)

Once that works, repeat for every other content type.

You've already done the hardest part: designing the system. Now you just build it piece by piece.