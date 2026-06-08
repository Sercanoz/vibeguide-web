export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://haritaapitest-production.up.railway.app";

/// Server-side (SSR/SEO) backend fetch'leri için. Tarayıcı App Check token'ı
/// üretemediğinden, server çağrıları gizli bir server token taşır.
/// APPCHECK_SERVER_TOKEN server-only env'dir (NEXT_PUBLIC DEĞİL → tarayıcıya sızmaz).
/// Backend AppCheck:Enabled değilse token yoksa da çalışır (no-op).
export function serverFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const serverToken = process.env.APPCHECK_SERVER_TOKEN;
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(serverToken ? { "X-Server-Token": serverToken } : {}),
      ...(init?.headers ?? {}),
    },
  });
}

/// Client-side PUBLIC (auth gerektirmeyen) backend fetch'leri için.
/// App Check token'ını (varsa) otomatik ekler. `.then()` zincirleriyle uyumlu:
/// `clientFetch(path, init).then(...)`. Backend AppCheck:Enabled değilse no-op.
/// Authenticated çağrılar için bunu DEĞİL, buildAuthHeaders / authedFetch kullan.
export async function clientFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  // Dinamik import: firebase-client browser-only; api.ts SSR'da da import edilir.
  const { getAppCheckToken } = await import("./firebase-client");
  const appCheck = await getAppCheckToken();
  return fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(appCheck ? { "X-Firebase-AppCheck": appCheck } : {}),
      ...(init?.headers ?? {}),
    },
  });
}

export type TripActiveResponse = {
  status: "active";
  touristName: string;
  tourTitle: string | null;
  guideName: string | null;
  scheduledAt: string | null;
  bookingStatus: number; // BookingStatus enum value
  location: {
    guideLat: number;
    guideLng: number;
    touristLat: number;
    touristLng: number;
    distanceMeters: number;
    eta: string | null;
    tourStarted: boolean;
  } | null;
  expiresAt: string | null;
};

export type TripEndedResponse = {
  status: "ended";
  touristName: string;
  tourTitle: string | null;
};

export type TripResponse = TripActiveResponse | TripEndedResponse;

export async function fetchPublicTrip(
  token: string
): Promise<{ ok: true; data: TripResponse } | { ok: false; status: number }> {
  try {
    const res = await serverFetch(`/api/public/trips/${token}`, {
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, status: res.status };
    const data = (await res.json()) as TripResponse;
    return { ok: true, data };
  } catch {
    return { ok: false, status: 0 };
  }
}
