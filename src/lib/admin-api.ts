"use client";

import { fbAuth, getIdToken } from "./firebase-client";
import { API_BASE_URL } from "./api";

export type BookingDispute = {
  bookingId: number;
  tourTitle: string;
  scheduledAt: string;
  touristName: string;
  guideName: string;
  status: string;
  price: number;
  currency: string | null;
  refundStatus: string | null;
  guideMarkedNoShowAt: string | null;
  touristReportedGuideNoShowAt: string | null;
  noShowOutcome: string | null;
  cancelReason: string | null;
};

export type PoolDispute = {
  participantId: number;
  poolId: number;
  tourTitle: string;
  scheduledAt: string;
  touristName: string;
  guideName: string;
  status: string;
  holdAmount: number;
  actualAmount: number | null;
  refundAmount: number | null;
  guideMarkedNoShowAt: string | null;
  touristReportedGuideNoShowAt: string | null;
};

export type AdminStats = {
  users: { tourist: number; guide: number; pendingGuide: number; admin: number };
  tours: { total: number; active: number };
  pools: { open: number; locked: number };
  last30Days: {
    bookings: number;
    revenue: number;
    topTours: { tourId: number; title: string; bookings: number }[];
  };
  generatedAt: string;
};

export type DeadLetterItem = {
  id: number;
  userId: number;
  title: string;
  body: string;
  type: string;
  retryCount: number;
  lastError: string | null;
  createdAtUtc: string;
  sentAtUtc: string | null;
};

export type GuidePerf = {
  guideUserId: number;
  fullName: string;
  city: string | null;
  rating: number | null;
  totalReviews: number;
  totalBookings: number;
  completedBookings: number;
  totalEarnings: number;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error?: string };

async function authedFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResult<T>> {
  const user = fbAuth().currentUser;
  const token = await getIdToken(user);
  if (!token) return { ok: false, status: 401, error: "not_signed_in" };

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch (e) {
    return { ok: false, status: 0, error: (e as Error).message };
  }

  if (!res.ok) {
    let err: string | undefined;
    try {
      const body = await res.json();
      err = body?.error ?? body?.title ?? res.statusText;
    } catch {
      err = res.statusText;
    }
    return { ok: false, status: res.status, error: err };
  }

  if (res.status === 204) return { ok: true, data: undefined as T };
  const data = (await res.json()) as T;
  return { ok: true, data };
}

// ════════ TOURS ════════

export type TourListRow = {
  id: number;
  title: string;
  city: string;
  status: string;
  translations: Record<string, "human" | "machine">;
  supportedLocales: string[];
};

export type TourTranslationRow = {
  tourId: number;
  locale: string;
  title: string;
  summary: string | null;
  description: string | null;
  highlights: string | null;
  isMachineTranslated: boolean;
  updatedAt: string;
};

export type TourDetail = {
  tour: {
    id: number;
    title: string;
    description: string | null;
    city: string;
    category: string | null;
    canonicalLocale: string;
  };
  translations: TourTranslationRow[];
  supportedLocales: string[];
  isTranslateConfigured: boolean;
};

export const adminApi = {
  listTours: () => authedFetch<TourListRow[]>("/api/admin/translations/tours"),
  getTour: (id: number) =>
    authedFetch<TourDetail>(`/api/admin/translations/tours/${id}`),
  upsertTourTranslation: (
    id: number,
    locale: string,
    body: {
      title: string;
      summary?: string | null;
      description?: string | null;
      highlights?: string | null;
    }
  ) =>
    authedFetch<{ ok: true }>(`/api/admin/translations/tours/${id}`, {
      method: "PUT",
      body: JSON.stringify({ locale, ...body }),
    }),
  deleteTourTranslation: (id: number, locale: string) =>
    authedFetch<{ ok: true }>(
      `/api/admin/translations/tours/${id}/${locale}`,
      { method: "DELETE" }
    ),
  autoTranslateTour: (
    id: number,
    body: { sourceLocale: string; targetLocales?: string[]; overwriteHuman?: boolean }
  ) =>
    authedFetch<{ written: string[]; skipped: string[]; failed: string[] }>(
      `/api/admin/translations/tours/${id}/auto-translate`,
      { method: "POST", body: JSON.stringify(body) }
    ),

  // ════════ GUIDES ════════

  listGuides: () =>
    authedFetch<
      {
        userId: number;
        fullName: string;
        city: string | null;
        bioPreview: string;
        translations: Record<string, "human" | "machine">;
        supportedLocales: string[];
      }[]
    >("/api/admin/translations/guides"),
  getGuide: (userId: number) =>
    authedFetch<{
      guide: {
        userId: number;
        fullName: string;
        canonicalBio: string | null;
        canonicalLocale: string;
      };
      translations: {
        guideUserId: number;
        locale: string;
        bio: string;
        isMachineTranslated: boolean;
        updatedAt: string;
      }[];
      supportedLocales: string[];
    }>(`/api/admin/translations/guides/${userId}`),
  upsertGuideBio: (userId: number, locale: string, bio: string) =>
    authedFetch<{ ok: true }>(`/api/admin/translations/guides/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ locale, bio }),
    }),
  deleteGuideBio: (userId: number, locale: string) =>
    authedFetch<{ ok: true }>(
      `/api/admin/translations/guides/${userId}/${locale}`,
      { method: "DELETE" }
    ),
  autoTranslateGuide: (
    userId: number,
    body: { sourceLocale: string; targetLocales?: string[]; overwriteHuman?: boolean }
  ) =>
    authedFetch<{ written: string[]; skipped: string[]; failed: string[] }>(
      `/api/admin/translations/guides/${userId}/auto-translate`,
      { method: "POST", body: JSON.stringify(body) }
    ),

  // ════════ STATS ════════

  getStats: () =>
    authedFetch<AdminStats>("/api/admin/stats"),

  // ════════ GUIDE PERFORMANCE ════════

  listGuidePerformance: () =>
    authedFetch<GuidePerf[]>("/api/admin/stats/guides/performance"),

  // ════════ DEAD-LETTER NOTIFICATIONS ════════

  listDeadLetters: (limit = 100) =>
    authedFetch<{ count: number; items: DeadLetterItem[] }>(
      `/api/admin/stats/notifications/dead-letters?limit=${limit}`
    ),

  deleteDeadLetter: (id: number) =>
    authedFetch<{ ok: true }>(
      `/api/admin/stats/notifications/dead-letters/${id}`,
      { method: "DELETE" }
    ),

  // ════════ DISPUTES ════════

  listBookingDisputes: () =>
    authedFetch<{ count: number; disputes: BookingDispute[] }>("/api/admin/booking-disputes"),

  resolveBookingDispute: (
    bookingId: number,
    resolution: "refund_tourist" | "uphold_guide" | "dismiss"
  ) =>
    authedFetch<{ ok: true }>(
      `/api/admin/booking-disputes/${bookingId}/resolve`,
      { method: "POST", body: JSON.stringify({ decision: resolution }) }
    ),

  listPoolDisputes: () =>
    authedFetch<{ count: number; disputes: PoolDispute[] }>("/api/admin/pools/disputes"),

  resolvePoolDispute: (
    participantId: number,
    resolution: "refund_tourist" | "uphold_guide" | "dismiss"
  ) =>
    authedFetch<{ ok: true }>(
      `/api/admin/pools/disputes/${participantId}/resolve`,
      { method: "POST", body: JSON.stringify({ decision: resolution }) }
    ),
};
