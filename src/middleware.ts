import { NextRequest, NextResponse } from "next/server";

/**
 * Güvenlik middleware'i:
 *  1) Her istek için CSP nonce üretir → inline script'ler nonce ile çalışır,
 *     böylece script-src'den 'unsafe-inline' ve 'unsafe-eval' kaldırılabilir.
 *  2) /admin/* yollarına ek (defansif) bir katman: bu rotalar arama motorlarına
 *     ve cache'e kapatılır. Asıl yetki kontrolü AdminAuthGuard (client) +
 *     backend RequireAdmin policy ile yapılır; bu sadece derinlemesine savunma.
 *
 * Not: CSP statik header'dan buraya taşındı çünkü nonce request başına değişir.
 */

function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    // 'strict-dynamic': nonce'lu script'in yüklediği alt-script'lere güvenir;
    // 'unsafe-inline'/'unsafe-eval' kaldırıldı. https: fallback eski tarayıcılar için.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https: 'unsafe-inline'`,
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "img-src 'self' data: blob: https://images.unsplash.com https://static.independent.co.uk https://encrypted-tbn0.gstatic.com https://flagcdn.com https://haritaapitest-production.up.railway.app https://firebasestorage.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://haritaapitest-production.up.railway.app wss://haritaapitest-production.up.railway.app https://www.google-analytics.com https://region1.google-analytics.com https://open.er-api.com",
    "font-src 'self' https://cdn.jsdelivr.net",
    "frame-src https://vibeguide-2da83.firebaseapp.com https://accounts.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  // Request başına rastgele nonce (base64). crypto, edge runtime'da global.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Nonce'u downstream'e (layout, RSC) header ile aktar.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", buildCsp(nonce));

  // /admin/* → indexlenmesin, cache'lenmesin (defansif).
  if (request.nextUrl.pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store, max-age=0");
  }

  return response;
}

export const config = {
  // Statik asset'ler ve görselleri CSP nonce işleminden muaf tut (gereksiz).
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|txt|xml|woff2?)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
