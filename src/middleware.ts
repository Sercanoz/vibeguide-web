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
    // SEO: nonce KALDIRILDI (request-başına değişip layout'u dinamik SSR'a zorluyordu).
    // ANCAK: Next.js App Router hydration/streaming için nonce'suz INLINE script kullanıyor
    // (<script>self.__next_f.push(...)</script>). Nonce yokken bunların çalışması için
    // 'unsafe-inline' ŞART — aksi halde CSP bu script'leri bloklar → React hydrate olamaz
    // → tüm client JS ölür (menü/buton çalışmaz). Statik render korunuyor, karşılığında
    // script-src'de 'unsafe-inline' (kendi inline script'imiz zaten yok, hepsi self-host;
    // bu yalnız Next.js'in kendi hydration inline'ları için).
    "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
    "img-src 'self' data: blob: https://images.unsplash.com https://static.independent.co.uk https://encrypted-tbn0.gstatic.com https://flagcdn.com https://haritaapitest-production.up.railway.app https://firebasestorage.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com",
    "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firebaseappcheck.googleapis.com https://content-firebaseappcheck.googleapis.com https://haritaapitest-production.up.railway.app wss://haritaapitest-production.up.railway.app https://www.google-analytics.com https://region1.google-analytics.com https://open.er-api.com https://www.google.com https://www.gstatic.com",
    "font-src 'self' https://cdn.jsdelivr.net",
    // App Check reCAPTCHA v3 gizli bir google.com iframe açar — frame-src'de izin ver.
    // 3DS ACS sayfaları kimi bankada iframe içinde açılır → form-action ile aynı hostlar.
    "frame-src https://vibeguide-2da83.firebaseapp.com https://accounts.google.com https://www.google.com https://www.gstatic.com https://recaptcha.google.com https://*.tami.com.tr https://*.vakifbank.com.tr https://*.garanti.com.tr https://*.garantibbva.com.tr https://*.isbank.com.tr https://*.yapikredi.com.tr https://*.akbank.com https://*.ziraatbank.com.tr https://*.halkbank.com.tr https://*.qnbfinansbank.com https://*.denizbank.com https://*.teb.com.tr https://*.ingbank.com.tr https://*.kuveytturk.com.tr https://*.turkiyefinans.com.tr https://*.mastercard.com https://*.visa.com",
    "object-src 'none'",
    "base-uri 'self'",
    // 3DS: TAMİ'den gelen banka formu kullanıcıyı bankanın 3D gateway'ine POST eder.
    // Zincir tek domain değil (TAMİ → acquirer gateway → kartı çıkaran banka ACS →
    // bizim callback). Bilinen host'lar + TR banka domain'leri açık olmalı, yoksa
    // tarayıcı formu bloklar ve ödeme "Ödeme Adımına Geç"te takılır.
    [
      "form-action 'self'",
      "https://paymentapi.tami.com.tr https://portal.tami.com.tr",
      "https://haritaapitest-production.up.railway.app",
      "https://inbound.apigateway.vakifbank.com.tr https://*.vakifbank.com.tr",
      "https://*.garanti.com.tr https://*.garantibbva.com.tr",
      "https://*.isbank.com.tr https://*.yapikredi.com.tr https://*.akbank.com",
      "https://*.ziraatbank.com.tr https://*.halkbank.com.tr https://*.qnbfinansbank.com",
      "https://*.denizbank.com https://*.teb.com.tr https://*.ingbank.com.tr",
      "https://*.sekerbank.com.tr https://*.albarakaturk.com.tr https://*.kuveytturk.com.tr",
      "https://*.vakifkatilim.com.tr https://*.ziraatkatilim.com.tr https://*.turkiyefinans.com.tr",
      "https://*.mastercard.com https://*.visa.com https://*.troyodeme.com",
    ].join(" "),
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

// 3DS ara sayfası için CSP.
//
// Bu sayfa bankanın kendi HTML'ini taşır; sayfa üzerinde kontrolümüz yok:
// banka scripti kendi CDN'inden yükleyebilir, kullanıcıyı ACS'ine POST eder,
// bazı bankalar araya kendi iframe'ini koyar. Hangi domain zincirinin
// kullanılacağı karta göre değiştiği için allowlist tutulamaz → script/form/
// frame https: serbest.
//
// frame-ancestors YOK: banka onayı sonrası callback bizim success sayfamıza
// dönüyor ve bazı akışlarda bu dönüş banka çerçevesi içinde gerçekleşiyor;
// 'none' koyunca "bağlanmayı reddetti" ile ödeme sonrası ekran kilitleniyordu.
// Riski sınırlı: sayfa tek kullanımlık, üzerinde form/kullanıcı verisi yok.
const THREE_DS_CSP = [
  "default-src 'self' https:",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https:",
  "form-action 'self' https:",
  "frame-src 'self' https:",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

export function middleware(request: NextRequest) {
  // Nonce/x-pathname üretimi KALDIRILDI (SEO: layout artık headers() okumuyor,
  // statik render ediliyor). Middleware yalnız CSP header + /admin koruması yapıyor —
  // bu response-header işlemi sayfa render'ını dinamikleştirmez.
  const response = NextResponse.next();

  // /payment/3ds: bankanın 3DS HTML'ini taşıyan ara sayfa. İçerik tamamen
  // banka/TAMİ tarafından üretilir ve kullanıcıyı bankanın ACS'ine POST eder;
  // hangi banka domain'ine gideceği karta göre değişir (tüm TR bankaları +
  // acquirer zinciri), bu yüzden allowlist pratikte tutulamaz — form-action
  // burada serbest bırakılır. Sayfada bizim uygulama JS'imiz koşmaz, kullanıcı
  // verisi tutulmaz; kart doğrulaması bankanın kendi sayfasında yapılır.
  // /payment/3ds, /payment/success, /payment/failed — 3DS akışının sayfaları.
  // success/failed'ın da gevşek CSP alması ŞART: banka onayı sonrası callback
  // bu sayfalara döner ve dönüş bazı bankalarda kendi çerçeveleri içinde olur;
  // ana CSP'nin frame-ancestors 'none' kuralı bu dönüşü "bağlanmayı reddetti"
  // ile blokluyor ve kullanıcı ödeme çekildiği halde sonuç ekranını göremiyordu.
  if (request.nextUrl.pathname.startsWith("/payment/")) {
    response.headers.set("Content-Security-Policy", THREE_DS_CSP);
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }

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
