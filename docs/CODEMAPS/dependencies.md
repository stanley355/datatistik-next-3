<!-- Generated: 2026-09-02 | Files scanned: 154 | Token estimate: ~315 -->

# Dependencies

## Package graph

`package.json` is the only manifest: private package `datatistik-next-3`. There is no `pnpm-workspace.yaml`, Turbo configuration, workspace dependency, or internal package edge. `bun.lock` is the committed lockfile.

## Runtime groups

| Concern | Libraries |
| --- | --- |
| Framework | `next`, `react`, `react-dom` |
| Remote state/tables | `@tanstack/react-query`, `@tanstack/react-table` |
| Forms/validation/env | `react-hook-form`, `@hookform/resolvers`, `zod`, `@t3-oss/env-nextjs` |
| UI/styling | `@base-ui/react`, `shadcn`, `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css` |
| Interaction/media | `lucide-react`, `react-icons`, `embla-carousel-react`, `sonner`, `next-themes` |
| Locale/query helpers | `negotiator`, `@formatjs/intl-localematcher`, `qs`, `date-fns` |
| Analytics | `@next/third-parties` |

`zustand` is installed but no source import was detected. Type-only packages and ESLint/TypeScript/Tailwind/Husky form the development toolchain.

## External services

- Better Auth-compatible service: `NEXT_PUBLIC_BETTER_AUTH_URL`.
- Commerce service for products, carts, search records, and S3 upload mediation: `NEXT_PUBLIC_API_URL`.
- Google Analytics: optional `NEXT_PUBLIC_GA_ID`.
- Remote product/category images: Next/image or browser requests to stored endpoints.
- Docker Hub: GitHub Actions pushes the `delifunds-next` image.

## Build and deployment graph

`bun install` → `next build` → standalone Next output → Bun slim runtime invoking Node-compatible `server.js`.

`package.json` scripts: `dev`, `build`, `start`, `lint`, `prepare`. There is no test script. `docker-compose.yaml` injects `.env`, exposes `3000`, and attaches a bridge network. Public environment values are supplied as Docker build args in CI; runtime composition also supplies `.env`.
