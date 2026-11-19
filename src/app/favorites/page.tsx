"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import TourCard, { TourCardSkeleton, type TourCardData } from "@/components/TourCard";
import { useT } from "@/components/LanguageProvider";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { useWishlist } from "@/lib/wishlist";

// Favorilerim — GET /api/wishlist (en son eklenen üstte). Giriş gerekli.
// Kart üzerindeki kalpten çıkarılan tur, ortak store sayesinde listeden anında düşer.

const L: Record<string, { title: string; sub: string; empty: string; emptySub: string; browse: string }> = {
  en: { title: "Favorites", sub: "Tours you saved for later.", empty: "No favorites yet", emptySub: "Tap the heart on any tour to save it here.", browse: "Browse tours" },
  tr: { title: "Favorilerim", sub: "Sonra bakmak için kaydettiğin turlar.", empty: "Henüz favorin yok", emptySub: "Bir turun kalbine dokun, buraya kaydedilsin.", browse: "Turlara göz at" },
};

export default function FavoritesPage() {
  const { locale } = useT();
  const l = L[locale] ?? L.en;
  const router = useRouter();
  const { authed, ids } = useWishlist();
  const [tours, setTours] = useState<TourCardData[] | null>(null);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (u) => {
      if (!u) { router.replace(`/login?next=${encodeURIComponent("/favorites")}`); return; }
      try {
        const res = await fetch(`${API_BASE_URL}/api/wishlist`, { headers: await buildAuthHeaders() });
        setTours(res.ok ? await res.json() : []);
      } catch {
        setTours([]);
      }
    });
    return () => unsub();
  }, [router]);

  // Store'dan çıkarılanları anında gizle (sunucu listesi sayfa açılışında çekildi).
  // Store, oturum açıkken favori id'lerini tutar (authed=true olduğu anda dolu gelir).
  const visible = tours?.filter((t) => authed !== true || ids.has(t.id)) ?? null;

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <h1 className="font-display text-4xl font-normal tracking-[-0.01em] md:text-5xl">{l.title}</h1>
        <p className="mt-3 text-neutral-600">{l.sub}</p>

        {visible === null ? (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => <TourCardSkeleton key={i} />)}
          </div>
        ) : visible.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center">
            <p className="font-semibold">{l.empty}</p>
            <p className="mt-1 text-sm text-neutral-600">{l.emptySub}</p>
            <Link href="/tours" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#5B3FD9] px-6 text-sm font-semibold text-white hover:bg-[#4A32B8]">
              {l.browse}
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((t) => <TourCard key={t.id} tour={t} locale={locale} />)}
          </div>
        )}
      </div>
      <MainFooter />
    </main>
  );
}
