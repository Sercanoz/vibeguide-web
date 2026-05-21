"use client";

import { fbAuth, getIdToken } from "./firebase-client";
import { API_BASE_URL } from "./api";

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
};
