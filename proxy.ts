// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { authGetSession, isAuthError } from "@/lib/api";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  // Check for the user session
  // const allHeaders = request.headers;
  const session = await authGetSession({
    cookie: request.headers.get("cookie"),
  });

  if (!session || isAuthError(session)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Specify which routes this proxy applies to
export const config = {
  matcher: [
    "/account/:path*", // Matches /account and /account/settings, etc.
    "/admin/:path*",
  ],
};
