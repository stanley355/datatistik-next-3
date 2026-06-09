// middleware.ts or proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { authGetSession, isAuthError } from "@/lib/api";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { LANGUAGES } from "./lib/types/languages";

const defaultLocale = "id";
const protectedRoutes = ["/account", "/admin"];

function getBrowserLocale(request: NextRequest): string {
  // Convert Next.js headers to a plain object for Negotiator
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Get ordered list of preferred languages from the browser
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    // Match the browser's preferences against your supported locales
    return match(languages, LANGUAGES, defaultLocale);
  } catch (error: unknown) {
    console.error("[proxy] getBrowserLocale: ", error);
    return defaultLocale;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ---------------------------------------------------------
  // 1. Localization Check (Applies to ALL pages)
  // ---------------------------------------------------------
  const pathnameHasLocale = LANGUAGES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    const referer = request.headers.get("referer");
    let detectedLocale = defaultLocale;

    if (referer) {
      const refererUrl = new URL(referer);
      // Extract locale from referer pathname (e.g., "/en/admin" -> "en")
      const refererLocale = LANGUAGES.find(
        (locale) =>
          refererUrl.pathname.startsWith(`/${locale}/`) ||
          refererUrl.pathname === `/${locale}`,
      );
      if (refererLocale) {
        detectedLocale = refererLocale;
      }
    } else {
      // external link fallback
      detectedLocale = getBrowserLocale(request);
    }
    // Redirect if there is no locale (prefixes with default 'id')
    request.nextUrl.pathname = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // ---------------------------------------------------------
  // 2. Session & Auth Check (Applies only to specific pages)
  // ---------------------------------------------------------
  // Strip the locale prefix from the pathname to accurately check protected routes
  // e.g., "/en/admin/dashboard" becomes "/admin/dashboard"
  const pathnameWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "");

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathnameWithoutLocale.startsWith(`${route}/`) ||
      pathnameWithoutLocale === route,
  );

  if (isProtectedRoute) {
    // Check for the user session
    const session = await authGetSession({
      cookie: request.headers.get("cookie"),
    });

    if (!session || isAuthError(session)) {
      // Redirect to login, preserving the localized path if necessary
      return NextResponse.redirect(
        new URL(`/${defaultLocale}/auth/login`, request.url),
      );
    }

    // Role check for admin routes
    if (
      session.user.role !== "admin" &&
      pathnameWithoutLocale.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    }
  }

  // If everything passes, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
