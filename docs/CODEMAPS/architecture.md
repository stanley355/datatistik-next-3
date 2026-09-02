<!-- Generated: 2026-09-02 | Files scanned: 154 | Token estimate: ~350 -->

# Architecture

## Shape and boundaries

- Single-package Next.js 16 / React 19 / TypeScript application; no workspace or internal package graph.
- `app/` — App Router entry points, locale-prefixed public/admin route groups, and route-local UI.
- `components/` — shared providers plus shadcn-style UI primitives.
- `hooks/` — TanStack Query option factories and browser-only language/currency behavior.
- `lib/api/` — typed `fetch` clients for external auth and commerce APIs.
- `lib/types/`, `lib/constant/` — transport models and static catalog data.
- `proxy.ts` — locale negotiation plus session/role gates before protected routes.

## Entry points and flow

`app/layout.tsx` → TanStack Query provider → theme provider → page tree + toast host.

`app/page.tsx` → redirects `/` to `/id`. `proxy.ts` adds an `id|en|cn` prefix when absent, then protects `/account`, `/admin`, and `/products/carts`; non-admin users cannot enter `/admin`.

Typical data path:

`page.tsx` → route-local client component → `hooks/*` query/mutation options → `lib/api/*` → `NEXT_PUBLIC_BETTER_AUTH_URL` or `NEXT_PUBLIC_API_URL` → JSON result → TanStack Query cache → UI.

The repository has no local API route handlers, server actions, service/repository layer, database schema, or migrations. Persistence and authentication live behind external HTTP APIs.

## Runtime and delivery

- Development: `bun|npm run dev` → Next.js dev server.
- Quality/build: `eslint` and `next build`; no automated test files or test script detected.
- `next.config.ts` emits standalone output.
- `Dockerfile` builds with Bun, then runs `.next/standalone/server.js` on port 3000.
- `.github/workflows/main.yaml` builds/pushes the production image to Docker Hub on `main`; `docker-compose.yaml` runs that image with `.env` and a bridge network.
