"use client";

import { useSyncExternalStore } from "react";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { track } from "@/lib/analytics";

// Favoriler (backend: /api/wishlist). Tüm kartlar tek store'u paylaşır →
// sayfada kaç kart olursa olsun favori id'leri oturum başına bir kez çekilir.
// authed=false iken kalp tıklaması giriş sayfasına yönlendirilir (çağıran karar verir).

type State = { authed: boolean | null; ids: Set<number> };
let state: State = { authed: null, ids: new Set() };
const listeners = new Set<() => void>();
let started = false;

function emit(next: State) { state = next; listeners.forEach((l) => l()); }

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  fbAuth().onAuthStateChanged(async (u) => {
    if (!u) { emit({ authed: false, ids: new Set() }); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/api/wishlist/ids`, { headers: await buildAuthHeaders() });
      const ids: number[] = res.ok ? await res.json() : [];
      emit({ authed: true, ids: new Set(ids) });
    } catch {
      emit({ authed: true, ids: new Set() });
    }
  });
}

function subscribe(l: () => void) { start(); listeners.add(l); return () => { listeners.delete(l); }; }
const getSnapshot = () => state;
const SERVER: State = { authed: null, ids: new Set() };
const getServerSnapshot = () => SERVER;

export function useWishlist() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** İyimser güncelleme; istek başarısızsa geri alınır. "auth" → giriş gerekli. */
export async function toggleWishlist(tourId: number): Promise<"ok" | "auth" | "error"> {
  if (!state.authed) return "auth";
  const had = state.ids.has(tourId);
  const ids = new Set(state.ids);
  if (had) ids.delete(tourId); else ids.add(tourId);
  emit({ ...state, ids });
  try {
    const res = await fetch(`${API_BASE_URL}/api/wishlist/${tourId}`, {
      method: had ? "DELETE" : "POST",
      headers: await buildAuthHeaders(),
    });
    if (!res.ok) throw new Error(String(res.status));
    if (!had) track("add_to_wishlist", { items: [{ item_id: String(tourId) }] });
    return "ok";
  } catch {
    const back = new Set(state.ids);
    if (had) back.add(tourId); else back.delete(tourId);
    emit({ ...state, ids: back });
    return "error";
  }
}
