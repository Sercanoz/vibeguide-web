// Sentry — tarayıcı tarafı hata takibi.
// NEXT_PUBLIC_SENTRY_DSN tanımlı değilse Sentry tamamen kapalıdır (hiçbir istek gitmez).
// Kişisel veri ve ödeme verisi gönderilmez (dataCollection); oturum kaydı (replay) kapalı.
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn,
  enabled: !!dsn,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENV ?? process.env.NODE_ENV,
  // Kişisel veri ve ödeme verisi GÖNDERİLMEZ: istek/yanıt gövdesi (kart bilgisi
  // pay-3ds gövdesinde), header, cookie, query string ve kullanıcı bilgisi kapalı.
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: false,
    httpBodies: [],
    urlQueryParams: false,
    databaseQueryData: false,
    stackFrameVariables: false,
  },
  // Performans izleme: isteklerin %10'u. Ücretsiz kotayı korumak için düşük tutulur.
  tracesSampleRate: 0.1,
  // Tarayıcı eklentileri ve ağ kesintilerinden gelen gürültü.
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    "Non-Error promise rejection captured",
    /Failed to fetch/,
    /Load failed/,
    /NetworkError/,
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
