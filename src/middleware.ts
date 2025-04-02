import { routing } from "@/lib/i18n/routing";
import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

const handleI18nRouting = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()",
  );

  return response;
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
    {
      source:
        "/((?!api|_next/static|_next/image|favicon\\.ico|monitoring|robots\\.txt|sitemap\\.xml|manifest\\.json|ads\\.txt|humans\\.txt)$)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
    "/(en|fr)/:path*",
  ],
};
