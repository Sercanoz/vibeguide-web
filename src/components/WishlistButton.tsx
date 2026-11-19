"use client";

import { usePathname, useRouter } from "next/navigation";
import { useT } from "@/components/LanguageProvider";
import { toggleWishlist, useWishlist } from "@/lib/wishlist";

const L: Record<string, { add: string; remove: string }> = {
  en: { add: "Save to favorites", remove: "Remove from favorites" },
  tr: { add: "Favorilere ekle", remove: "Favorilerden çıkar" },
};

/** Kalp butonu — tur kartı fotoğrafının sağ üstünde veya tur başlığının yanında. */
export default function WishlistButton({ tourId, variant = "overlay" }: { tourId: number; variant?: "overlay" | "inline" }) {
  const { authed, ids } = useWishlist();
  const { locale } = useT();
  const l = L[locale] ?? L.en;
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const saved = ids.has(tourId);

  async function onClick() {
    if (authed === false) { router.push(`/login?next=${encodeURIComponent(pathname)}`); return; }
    if (authed === null) return; // oturum durumu henüz bilinmiyor
    await toggleWishlist(tourId);
  }

  const base = variant === "overlay"
    ? "absolute right-2 top-2 z-[1] h-9 w-9 bg-white/90 shadow-sm backdrop-blur hover:bg-white"
    : "h-10 w-10 border border-neutral-300 hover:border-neutral-900";
  return (
    <button type="button" onClick={onClick} aria-pressed={saved} aria-label={saved ? l.remove : l.add} title={saved ? l.remove : l.add}
      className={`flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${base}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill={saved ? "#E11D48" : "none"} stroke={saved ? "#E11D48" : "#0A0A0F"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
