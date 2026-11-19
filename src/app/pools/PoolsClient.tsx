"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";
import { useT } from "@/components/LanguageProvider";

/** Backend PoolToDto ile aynı alanlar. */
interface Pool {
  id: number;
  tourId: number;
  tourTitle: string;
  guideName?: string | null;
  scheduledAt: string;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  currency: string;
  currentPricePerPerson: number;
  bestPricePerPerson: number;
  lockAt: string;
  status: string;
  language?: string | null;
}

/** Liste yanıtı `{ dto, lat, lng }` sarmalıyla geliyor. */
interface PoolRow {
  dto: Pool;
  lat?: number | null;
  lng?: number | null;
}

// Metinler EN + TR; diğer diller EN'e düşer.
const L: Record<string, {
  title: string; intro: string; loadError: string; signInTitle: string; signInSub: string; signIn: string;
  emptyTitle: string; emptySub: string; browse: string; joined: (n: number, max: number) => string;
  closed: string; spotsLeft: (n: number) => string; perPersonNow: string; asLowAs: string;
}> = {
  en: {
    title: "Group tours",
    intro: "Join an open group and share the cost. The more travellers join, the less each person pays. Payment is collected once the group is complete and the final price is set.",
    loadError: "Could not load group tours. Please try again.",
    signInTitle: "Sign in to see open groups", signInSub: "Group tours are available to registered travellers.", signIn: "Sign in",
    emptyTitle: "No open groups right now", emptySub: "Browse tours and start your own group — others can join you.", browse: "Browse tours",
    joined: (n, max) => `${n}/${max} joined`, closed: "Closed — payment in progress",
    spotsLeft: (n) => `${n} spot${n === 1 ? "" : "s"} left`, perPersonNow: "per person now", asLowAs: "as low as",
  },
  tr: {
    title: "Grup turları",
    intro: "Açık bir gruba katıl, maliyeti paylaş. Katılan gezgin arttıkça kişi başı fiyat düşer. Ödeme, grup tamamlanıp son fiyat belli olunca alınır.",
    loadError: "Grup turları yüklenemedi. Lütfen tekrar dene.",
    signInTitle: "Açık grupları görmek için giriş yap", signInSub: "Grup turları kayıtlı gezginlere açıktır.", signIn: "Giriş yap",
    emptyTitle: "Şu an açık grup yok", emptySub: "Turlara göz at ve kendi grubunu başlat — başkaları da katılabilir.", browse: "Turlara göz at",
    joined: (n, max) => `${n}/${max} katıldı`, closed: "Kapandı — ödeme sürüyor",
    spotsLeft: (n) => `${n} yer kaldı`, perPersonNow: "şu an kişi başı", asLowAs: "en düşük",
  },
};

function fmtDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PoolsClient() {
  const { locale } = useT();
  const l = L[locale] ?? L.en;
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // null = Firebase oturumu henüz çözülmedi.
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged((u) => setSignedIn(!!u));
    return () => unsub();
  }, []);

  useEffect(() => {
    // Backend /api/pools giriş istiyor (RequireRegistered). Eskiden token'sız
    // çağrılıyordu → her istek 401, liste kimse için açılmıyordu. Oturum
    // çözülene kadar bekle; giriş yoksa istek atma, giriş daveti göster.
    if (signedIn === null) return;
    if (!signedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- oturum yok: yükleme göstergesini kapat (istek atılmaz)
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const headers = await buildAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/api/pools`, { headers });
        if (!res.ok) throw new Error(String(res.status));
        const raw = (await res.json()) as PoolRow[] | Pool[];
        if (cancelled) return;
        // Liste `{dto,...}` sarmalıyla dönüyor; savunmacı olarak ikisini de karşıla.
        const list = (raw as PoolRow[]).map((r) =>
          r && typeof r === "object" && "dto" in r ? r.dto : (r as unknown as Pool),
        );
        setPools(list.filter(Boolean));
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [signedIn]);

  const emptyBox = "mt-10 rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center";
  const primary = "mt-5 inline-flex h-11 items-center rounded-full bg-[#5B3FD9] px-6 text-sm font-semibold text-white hover:bg-[#4A32B8]";

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar />
      <div className="px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-normal tracking-[-0.01em] md:text-5xl">{l.title}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-neutral-600">{l.intro}</p>

          {loading && (
            <div className="mt-10 space-y-3" aria-busy="true">
              {[0, 1, 2].map((i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-neutral-100" />)}
            </div>
          )}

          {error && (
            <div role="alert" className="mt-10 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{l.loadError}</div>
          )}

          {!loading && signedIn === false && (
            <div className={emptyBox}>
              <p className="font-semibold">{l.signInTitle}</p>
              <p className="mt-1 text-sm text-neutral-600">{l.signInSub}</p>
              <Link href={`/login?next=${encodeURIComponent("/pools")}`} className={primary}>{l.signIn}</Link>
            </div>
          )}

          {!loading && signedIn && !error && pools.length === 0 && (
            <div className={emptyBox}>
              <p className="font-semibold">{l.emptyTitle}</p>
              <p className="mt-1 text-sm text-neutral-600">{l.emptySub}</p>
              <Link href="/tours" className={primary}>{l.browse}</Link>
            </div>
          )}

          <div className="mt-8 space-y-3">
            {pools.map((p) => {
              const spotsLeft = Math.max(0, p.maxParticipants - p.currentParticipants);
              const locked = p.status === "locked";
              return (
                <Link key={p.id} href={`/pools/${p.id}`}
                  className="block rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-neutral-900">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{p.tourTitle}</p>
                      <p className="mt-1 text-sm text-neutral-600">
                        {fmtDate(p.scheduledAt, locale)}
                        {p.guideName ? ` · ${p.guideName}` : ""}
                        {p.language ? ` · ${p.language.toUpperCase()}` : ""}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-600">
                        {l.joined(p.currentParticipants, p.maxParticipants)}
                        {locked ? (
                          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">{l.closed}</span>
                        ) : spotsLeft <= 2 ? (
                          <span className="rounded-md bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">{l.spotsLeft(spotsLeft)}</span>
                        ) : null}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-semibold"><Price amount={p.currentPricePerPerson} currency={p.currency} /></p>
                      <p className="text-xs text-neutral-500">{l.perPersonNow}</p>
                      {p.bestPricePerPerson > 0 && p.bestPricePerPerson < p.currentPricePerPerson && (
                        <p className="mt-1 text-xs font-semibold text-emerald-700">
                          {l.asLowAs} <Price amount={p.bestPricePerPerson} currency={p.currency} />
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <MainFooter />
    </main>
  );
}
