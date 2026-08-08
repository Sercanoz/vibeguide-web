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

function buildCsp(): string {
  return [
    "default-src 'self'",
    // SEO: nonce KALDIRILDI (nonce request-başına değişip layout'u dinamik SSR'a
    // zorluyordu → tüm site cache'lenmiyordu). Artık inline script YOK — gtag/consent
    // + auth-flash /vg-init.js'e (self-host) taşındı, JSON-LD zaten çalıştırılabilir
    // kod değil (data). script-src 'self' + host allowlist yeterli; 'unsafe-inline'
    // YOK. Bu sayede CSP statik → middleware yalnız /admin için çalışıyor, sayfa
    // render'ı statikleşiyor.
    "script-src 'self' https://www.google.com https://www.gstatic.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "img-src 'self' data: blob: https://images.unsplash.com https://static.independent.co.uk https://encrypted-tbn0.gstatic.com https://flagcdn.com https://haritaapitest-production.up.railway.app https://firebasestorage.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebaseappcheck.googleapis.com https://content-firebaseappcheck.googleapis.com https://haritaapitest-production.up.railway.app wss://haritaapitest-production.up.railway.app https://www.google-analytics.com https://region1.google-analytics.com https://open.er-api.com https://www.google.com https://www.gstatic.com",
    "font-src 'self' https://cdn.jsdelivr.net",
    // App Check reCAPTCHA v3 gizli bir google.com iframe açar — frame-src'de izin ver.
    "frame-src https://vibeguide-2da83.firebaseapp.com https://accounts.google.com https://www.google.com https://www.gstatic.com https://recaptcha.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function middleware(request: NextRequest) {
  // Nonce/x-pathname üretimi KALDIRILDI (SEO: layout artık headers() okumuyor,
  // statik render ediliyor). Middleware yalnız CSP header + /admin koruması yapıyor —
  // bu response-header işlemi sayfa render'ını dinamikleştirmez.
  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", buildCsp());

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
