// Sentry — sunucu ve edge tarafı hata takibi.
// SENTRY_DSN (ya da NEXT_PUBLIC_SENTRY_DSN) tanımlı değilse kapalıdır.
import * as Sentry from "@sentry/nextjs";

export async function register() {
  const dsn = process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;
  Sentry.init({
    dsn,
    enabled: !!dsn,
    environment: process.env.SENTRY_ENV ?? process.env.NODE_ENV,
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
    tracesSampleRate: 0.1,
  });
}

// Server Component, route handler ve middleware hatalarını yakalar.
export const onRequestError = Sentry.captureRequestError;
