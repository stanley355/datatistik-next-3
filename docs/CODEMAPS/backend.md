<!-- Generated: 2026-09-02 | Files scanned: 154 | Token estimate: ~358 -->

# Backend Surface

## Local request boundary

No `app/**/route.ts`, `middleware.ts`, server actions, controllers, services, repositories, queues, or local database access were detected.

`proxy.ts` is the Next.js request-time boundary:

- Matches all non-static/non-API paths.
- Negotiates `id`, `en`, or `cn` from the referrer/browser; defaults to `id`.
- Calls the external auth session endpoint with the incoming cookie for `/account`, `/admin`, and `/products/carts`.
- Redirects unauthenticated traffic to `/id/auth/login`; restricts `/admin` to `user.role === "admin"`.

## External API clients

All clients return parsed JSON and log network failures; authenticated writes use `credentials: "include"`.

| Client | Base | Operations |
| --- | --- | --- |
| `lib/api/auth.ts` | `NEXT_PUBLIC_BETTER_AUTH_URL/api/auth` | email sign-up/sign-in, verification, password reset, session, sign-out |
| `lib/api/products.ts` | `NEXT_PUBLIC_API_URL/products` | list/filter, get by ID, create, update |
| `lib/api/carts.ts` | `NEXT_PUBLIC_API_URL/carts` | create, list by user, update, delete |
| `lib/api/s3.ts` | `NEXT_PUBLIC_API_URL/s3` | multipart image upload at `/images` |
| `lib/api/user_search.ts` | `NEXT_PUBLIC_API_URL/user-search` | record a search keyword and optional user ID |

`lib/api/index.ts` is the public barrel. `hooks/auth.ts`, `hooks/products.ts`, `hooks/carts.ts`, and `hooks/s3.ts` wrap clients in TanStack Query option factories; they are client orchestration, not server endpoints.

## Environment and trust boundaries

`lib/env.ts` validates four public build/runtime values with `@t3-oss/env-nextjs` + Zod: auth URL, API URL, optional Google Analytics ID, and RMB→IDR rate. No server-only secret schema exists here.

External boundaries are the auth service, commerce API, object-storage upload API, and Google Analytics. The app forwards browser cookies to auth/commerce endpoints; authorization enforcement beyond `proxy.ts` belongs to those services.
