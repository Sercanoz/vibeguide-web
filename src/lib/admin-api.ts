"use client";

import { fbAuth, getIdToken, getAppCheckToken } from "./firebase-client";
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

export type ModerationReport = {
  id: number;
  reporterId: number;
  reportedUserId: number;
  reason: string;
  details: string | null;
  status: string;
  createdAt: string;
};

export type LanguagePricing = {
  code: string;
  displayName: string;
  multiplier: number;
  isRare: boolean;
  isActive: boolean;
};

export type AdminPool = {
  id: number;
  tourTitle: string;
  scheduledAt: string;
  participantCount: number;
  capacity: number;
  guideName: string | null;
  status: string;
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

export type TourInclude = {
  id: number;
  label: string;
  isIncluded: boolean;
  ord: number;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error?: string };

export async function authedFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResult<T>> {
  const user = fbAuth().currentUser;
  const token = await getIdToken(user);
  if (!token) return { ok: false, status: 401, error: "not_signed_in" };

  // App Check token (varsa) — backend AppCheck:Enabled olduğunda gerekir.
  const appCheck = await getAppCheckToken();

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(appCheck ? { "X-Firebase-AppCheck": appCheck } : {}),
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

export type PlaceTranslationRow = {
  placeId: number;
  locale: string;
  name: string;
  description: string | null;
  isMachineTranslated: boolean;
  updatedAt: string;
};

export type PlaceRow = {
  id: number;
  name: string;
  description: string | null;
  ord: number;
  translations: PlaceTranslationRow[];
};

export type TourPlacesDetail = {
  places: PlaceRow[];
  supportedLocales: string[];
  isTranslateConfigured: boolean;
};

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

export type TourSettings = {
  id: number;
  title: string;
  description: string | null;
  city: string;
  category: string | null;
  durationMinutes: number;
  minPoolParticipants?: number;
  basePrice: number;
  compareAtPrice: number | null;
  currency: string;
  coverPhotoUrl: string | null;
  languagesOffered: string | null;
  meetingPointText: string | null;
  meetingPointLat: number | null;
  meetingPointLng: number | null;
  badges: string | null;
  rating: number | null;
  reviewCount: number;
  countryId: number | null;
  provinceId: number | null;
  districtId: number | null;
  status: string;
  pricingTiers?: { participantCount: number; guideAmount: number }[];
};

export type TourImportantInfo = {
  id: number;
  label: string;
  ord: number;
};

export type TourPhoto = {
  id: number;
  url: string;
  caption: string | null;
  ord: number;
};

export const adminApi = {
  listTours: () => authedFetch<TourListRow[]>("/api/admin/translations/tours"),

  createTour: (body: {
    title: string;
    city: string;
    category?: string;
    durationMinutes: number;
    basePrice: number;
    currency: string;
    status: string;
  }) =>
    authedFetch<{ id: number }>("/api/admin/tours", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  getTourSettings: (id: number) =>
    authedFetch<TourSettings>(`/api/admin/tours/${id}`),
  updateTourSettings: (id: number, body: Partial<TourSettings>) =>
    authedFetch<{ id: number }>(`/api/admin/tours/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
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

  // ════════ TOUR PLACE TRANSLATIONS ════════
  getTourPlaces: (tourId: number) =>
    authedFetch<TourPlacesDetail>(`/api/admin/translations/tours/${tourId}/places`),
  addPlace: (tourId: number, name: string, description?: string) =>
    authedFetch<{ id: number }>(`/api/admin/tours/${tourId}/places`, {
      method: "POST",
      body: JSON.stringify({ name, description: description || null }),
    }),
  deletePlace: (tourId: number, placeId: number) =>
    authedFetch(`/api/admin/tours/${tourId}/places/${placeId}`, { method: "DELETE" }),
  upsertPlaceTranslation: (
    placeId: number,
    locale: string,
    body: { name: string; description?: string | null }
  ) =>
    authedFetch<{ ok: true }>(`/api/admin/translations/places/${placeId}`, {
      method: "PUT",
      body: JSON.stringify({ locale, ...body }),
    }),
  deletePlaceTranslation: (placeId: number, locale: string) =>
    authedFetch<{ ok: true }>(
      `/api/admin/translations/places/${placeId}/${locale}`,
      { method: "DELETE" }
    ),
  autoTranslatePlaces: (
    tourId: number,
    body: { sourceLocale: string; targetLocales?: string[]; overwriteHuman?: boolean }
  ) =>
    authedFetch<{ written: string[]; skipped: string[]; failed: string[] }>(
      `/api/admin/translations/tours/${tourId}/places/auto-translate`,
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
        languages: string | null;
        city: string | null;
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
  updateGuideLanguages: (userId: number, languages: string) =>
    authedFetch<{ ok: true; languages: string }>(`/api/admin/translations/guides/${userId}/languages`, {
      method: "PATCH",
      body: JSON.stringify({ languages }),
    }),
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

  // ════════ APPLICATIONS ════════

  listApplications: async (
    status: "Pending" | "Approved" | "Rejected"
  ): Promise<ApiResult<GuideApplication[]>> => {
    const res = await authedFetch<AdminApplicationListItemRaw[]>(
      `/api/admin/applications?status=${status}`
    );
    if (!res.ok) return res;
    return {
      ok: true,
      data: res.data.map((a) => ({
        id: a.applicationId,
        userId: a.userId,
        fullName: a.fullName,
        email: a.email,
        status: a.status as GuideApplication["status"],
        appliedAt: a.createdAtUtc,
        // Kokart ön + arka, 2 foto.
        kycPhotoUrls: [a.badgeFrontUrl, a.badgeBackUrl].filter(
          (u): u is string => !!u
        ),
        rejectionReason: null,
      })),
    };
  },

  approveApplication: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/applications/${id}/approve`, { method: "POST" }),

  rejectApplication: (id: number, reason: string) =>
    authedFetch<{ ok: true }>(`/api/admin/applications/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),

  // ════════ USERS ════════

  listUsers: (params?: { role?: string; q?: string; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params?.role) qs.set("role", params.role);
    if (params?.q) qs.set("q", params.q);
    if (params?.limit) qs.set("limit", String(params.limit));
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return authedFetch<AdminUser[]>(`/api/admin/users${query}`);
  },

  changeUserRole: (id: number, role: "Tourist" | "Guide" | "Admin") =>
    authedFetch<{ ok: true }>(`/api/admin/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    }),

  // Booking'e manuel rehber ata (yalnız Pending/Confirmed). autoConfirm=true → Confirmed'a çeker.
  assignBookingGuide: (bookingId: number, guideId: number, autoConfirm = true) =>
    authedFetch<{ id: number; guideId: number; status: string }>(
      `/api/admin/bookings/${bookingId}/guide`,
      { method: "PUT", body: JSON.stringify({ guideId, autoConfirm }) }
    ),

  deleteUser: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/users/${id}`, { method: "DELETE" }),

  // ════════ LOCATIONS (country → province → district) ════════
  listCountries: () =>
    authedFetch<{ id: number; code: string; name: string; flag: string | null }[]>("/api/locations/countries"),
  listProvinces: (countryId: number) =>
    authedFetch<{ id: number; name: string }[]>(`/api/locations/provinces?countryId=${countryId}`),
  listDistricts: (provinceId: number) =>
    authedFetch<{ id: number; name: string }[]>(`/api/locations/districts?provinceId=${provinceId}`),

  // ── admin location management ──
  locationTree: () =>
    authedFetch<LocationTreeCountry[]>("/api/admin/locations/tree"),
  addProvince: (countryId: number, name: string) =>
    authedFetch<{ id: number; name: string; slug: string }>("/api/admin/locations/provinces", {
      method: "POST", body: JSON.stringify({ countryId, name }),
    }),
  addDistrict: (provinceId: number, name: string) =>
    authedFetch<{ id: number; name: string; slug: string }>("/api/admin/locations/districts", {
      method: "POST", body: JSON.stringify({ provinceId, name }),
    }),
  deleteProvince: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/locations/provinces/${id}`, { method: "DELETE" }),
  deleteDistrict: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/locations/districts/${id}`, { method: "DELETE" }),
  importTurkey: () =>
    authedFetch<{ ok: true; addedProvinces: number; addedDistricts: number }>("/api/admin/locations/import-turkey", { method: "POST" }),

  // ════════ EMAIL SUBSCRIBERS (lead capture) ════════
  listSubscribers: (limit = 500) =>
    authedFetch<{ total: number; rows: SubscriberRow[] }>(`/api/admin/subscribers?limit=${limit}`),
  deleteSubscriber: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/subscribers/${id}`, { method: "DELETE" }),

  // ════════ TOUR REVIEWS (public, QR) ════════

  listTourReviews: (status: string = "pending") =>
    authedFetch<TourReviewRow[]>(`/api/admin/tour-reviews?status=${status}`),
  approveTourReview: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/tour-reviews/${id}/approve`, { method: "POST" }),
  rejectTourReview: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/tour-reviews/${id}/reject`, { method: "POST" }),
  deleteTourReview: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/tour-reviews/${id}`, { method: "DELETE" }),

  // ════════ PAYOUTS ════════

  processWeeklyPayouts: () =>
    authedFetch<{ processed: number; totalAmount: number } | { ok: true }>(
      "/api/payouts/admin/process-week",
      { method: "POST" }
    ),

  // ════════ MODERATION REPORTS ════════

  listReports: (status?: string) =>
    authedFetch<ModerationReport[]>(
      `/api/admin/reports${status ? `?status=${status}` : ""}`
    ),

  actionReport: (id: number, action: "dismiss" | "warn" | "ban", note?: string) =>
    authedFetch<{ ok: true }>(`/api/admin/reports/${id}/action`, {
      method: "POST",
      body: JSON.stringify({ action, note }),
    }),

  // ════════ DEAD-LETTER (new endpoint) ════════

  listDeadLettersV2: (limit = 50, offset = 0) =>
    authedFetch<{ count: number; items: DeadLetterItem[] }>(
      `/api/admin/notification-dead-letter?limit=${limit}&offset=${offset}`
    ),

  retryDeadLetter: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/notification-dead-letter/${id}/retry`, {
      method: "POST",
    }),

  deleteDeadLetterV2: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/notification-dead-letter/${id}`, {
      method: "DELETE",
    }),

  // ════════ LANGUAGE PRICING ════════

  listLanguagePricing: () =>
    authedFetch<LanguagePricing[]>("/api/language-pricing"),

  updateLanguagePricing: (
    code: string,
    body: { displayName: string; multiplier: number; isRare: boolean; isActive: boolean }
  ) =>
    authedFetch<{ ok: true }>(`/api/language-pricing/${code}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteLanguagePricing: (code: string) =>
    authedFetch<{ ok: true }>(`/api/language-pricing/${code}`, {
      method: "DELETE",
    }),

  // ════════ POOL MANAGEMENT ════════

  listAdminPools: (status?: string) =>
    authedFetch<AdminPool[]>(
      `/api/admin/pools${status ? `?status=${status}` : ""}`
    ),

  cancelPool: (id: number, reason: string) =>
    authedFetch<{ ok: true }>(`/api/admin/pools/${id}/cancel`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }),

  lockPool: (id: number) =>
    authedFetch<{ ok: true }>(`/api/admin/pools/${id}/lock`, {
      method: "POST",
    }),

  // ════════ PHOTOS ════════

  listPhotos: (tourId: number) =>
    authedFetch<TourPhoto[]>(`/api/admin/tours/${tourId}/photos`),

  addPhoto: (tourId: number, body: { url: string; caption?: string; ord?: number }) =>
    authedFetch<{ id: number }>(`/api/admin/tours/${tourId}/photos`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updatePhoto: (tourId: number, photoId: number, body: { url?: string; caption?: string; ord?: number }) =>
    authedFetch<{ ok: true }>(`/api/admin/tours/${tourId}/photos/${photoId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deletePhoto: (tourId: number, photoId: number) =>
    authedFetch<{ ok: true }>(`/api/admin/tours/${tourId}/photos/${photoId}`, {
      method: "DELETE",
    }),

  // ════════ IMPORTANT INFO ════════

  listImportantInfo: (tourId: number) =>
    authedFetch<TourImportantInfo[]>(`/api/admin/tours/${tourId}/important-info`),

  addImportantInfo: (tourId: number, body: { label: string; ord?: number }) =>
    authedFetch<{ id: number }>(`/api/admin/tours/${tourId}/important-info`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateImportantInfo: (tourId: number, infoId: number, body: { label: string; ord?: number }) =>
    authedFetch<{ ok: true }>(`/api/admin/tours/${tourId}/important-info/${infoId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteImportantInfo: (tourId: number, infoId: number) =>
    authedFetch<{ ok: true }>(`/api/admin/tours/${tourId}/important-info/${infoId}`, {
      method: "DELETE",
    }),

  // ════════ TOUR INCLUDES ════════

  listIncludes: (tourId: number) =>
    authedFetch<TourInclude[]>(`/api/admin/tours/${tourId}/includes`),

  addInclude: (tourId: number, body: { label: string; isIncluded: boolean; ord?: number }) =>
    authedFetch<{ id: number }>(`/api/admin/tours/${tourId}/includes`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  updateInclude: (tourId: number, includeId: number, body: { label: string; isIncluded: boolean; ord?: number }) =>
    authedFetch<{ ok: true }>(`/api/admin/tours/${tourId}/includes/${includeId}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  deleteInclude: (tourId: number, includeId: number) =>
    authedFetch<{ ok: true }>(`/api/admin/tours/${tourId}/includes/${includeId}`, {
      method: "DELETE",
    }),
};

export type SubscriberRow = {
  id: number;
  email: string;
  promoCode: string | null;
  source: string | null;
  locale: string | null;
  createdAt: string;
};

export type LocationTreeCountry = {
  id: number;
  code: string;
  name: string;
  flag: string | null;
  provinces: {
    id: number;
    name: string;
    slug: string | null;
    districts: { id: number; name: string; slug: string | null }[];
  }[];
};

export type TourReviewRow = {
  id: number;
  tourId: number;
  tourTitle: string | null;
  fullName: string;
  nationality: string | null;
  rating: number;
  comment: string | null;
  status: string;
  createdAt: string;
};

export type GuideApplication = {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedAt: string;
  kycPhotoUrls: string[];
  rejectionReason?: string | null;
};

// Backend'in /api/admin/applications için döndürdüğü ham şekil (camelCase).
type AdminApplicationListItemRaw = {
  applicationId: number;
  userId: number;
  firebaseUid: string;
  email: string;
  fullName: string;
  phoneNumber: string | null;
  badgeFrontUrl: string;
  badgeBackUrl: string;
  status: string;
  createdAtUtc: string;
};

export type AdminUser = {
  id: number;
  fullName: string;
  email: string;
  role: "Tourist" | "Guide" | "Admin";
  createdAt: string;
};
