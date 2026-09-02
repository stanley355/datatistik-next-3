<!-- Generated: 2026-09-02 | Files scanned: 154 | Token estimate: ~320 -->

# Data

## Persistence boundary

No database schema, ORM, SQL, migration, seed, row-level policy, or local persistence service is tracked in this repository. Durable records are owned by the external APIs addressed by `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL`.

## Transport models

`lib/types/` defines client-side contracts:

- `api.ts` — `Api<T>`, paginated envelopes, and pagination metadata.
- `auth.ts` — `User` and `Session`; user role/ban fields support UI and proxy checks.
- `products.ts` — product, `id|en|cn` localization, options/values, price additions, image metadata, and availability.
- `carts.ts` — cart identity, user/product references, quantity, and selected localized options.
- `s3.ts` — object endpoint, bucket, and key.
- `user-search.ts` — keyword record with optional user association.

These TypeScript types document expected JSON but do not validate API responses at runtime.

## Validation and browser stores

- `lib/env.ts` validates public environment values with Zod.
- `app/[language]/(public)/auth/register/_libs/form-schema.ts` validates registration and password confirmation.
- `app/[language]/(admin)/admin/products/new/_components/form/schema.tsx` validates localized product content, price, images, options, and availability; the edit flow reuses the new-product form structure.
- TanStack Query holds remote-response cache in memory.
- Browser `localStorage` holds `currency` and `productLanguage`; no other client store implementation was detected.

## Static data

- `lib/constant/categories.ts` — display categories with remote image URLs.
- `lib/constant/taobao-products.ts` — hard-coded sample/source product records.
- `lib/types/languages.ts` — supported locales: `id`, `en`, `cn`.
- `lib/types/currencies.ts` — supported currencies: `RMB`, `IDR`.

No migrations, seeds, or data-policy files are present.
