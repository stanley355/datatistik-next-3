<!-- Generated: 2026-09-02 | Files scanned: 154 | Token estimate: ~431 -->

# Frontend

## Route tree

Route groups `(public)` and `(admin)` organize layouts but do not appear in URLs.

```text
/
└─ redirect → /id
/{language}                         public home
├─ search                           product search
├─ account                          session/account
├─ auth/
│  ├─ login
│  ├─ register
│  ├─ forgot-password
│  ├─ reset-password?token=...
│  └─ verify-email?token=...
├─ products
│  ├─ [slug]                        numeric product ID is slug prefix
│  └─ carts                         protected cart
└─ admin                            protected, admin role
   └─ products
      ├─ new
      └─ [id]
```

## Layout and component hierarchy

- `app/layout.tsx` → `TanstackQueryProvider` → `ThemeProvider` → route content + `Toaster`.
- Public layout → desktop navigation + page + mobile bottom navigation + footer + Google Analytics.
- Admin layout → `SidebarProvider` + admin sidebar + admin navigation + page.
- Pages are thin entry points; feature UI lives beside each route under `_components/`.
- `components/ui/` contains reusable Base UI/shadcn primitives; `components/custom-ui/` contains app-specific loading, error, and theme controls.

Major feature roots: `home/_components/Home`, `search/_components/Search`, `products/_components/ProductList`, `products/[slug]/_components/DynamicProduct`, `products/carts/_components/Carts`, account/auth forms, and admin product list/create/edit flows.

## State and data fetching

- TanStack Query owns remote session, product, cart, and upload state. Default query staleness is 60 seconds; one browser `QueryClient` is reused.
- `hooks/*` exports query/mutation option factories; feature components call `useQuery`/`useMutation` and invalidate through the query client.
- `hooks/language.ts` derives UI locale from the URL and persists product-content language in `localStorage`.
- `hooks/currency.ts` persists RMB/IDR selection in `localStorage`; custom events synchronize same-tab consumers and storage events synchronize tabs.
- React Hook Form + Zod drive registration and admin product forms. No Zustand store is implemented despite the installed dependency.

## Styling and tests

Tailwind CSS 4 enters through `app/globals.css`; `components.json` configures the shadcn `base-vega` style, CSS variables, and path aliases. Icons come from Lucide/React Icons; carousel behavior uses Embla; notifications use Sonner.

No frontend unit, integration, component, or end-to-end tests were detected.
