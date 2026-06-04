"use client";

import Link from "next/link";
import { MODE_CONTENT_I18N } from "@/lib/modes-i18n";
import type { Locale } from "@/lib/i18n";

// Hero sol-alt: 3 mod kısayol kartı (VibeNow / VibeSquad / VibeAsk).
// Alt yazılar = ilgili modun tagline'ı (modes-i18n'den, tüm dillerde çevrili).
// Renkler kullanıcının gönderdiği görsele göre: amber / emerald / mor.

type Card = {
  slug: "vibenow" | "vibesquad" | "vibeask";
  name: string;
  color: string; // ikon + arka plan tonu
  icon: React.ReactNode;
};

function tagline(slug: string, locale: Locale): string {
  const m = MODE_CONTENT_I18N[slug];
  return (m?.[locale] ?? m?.en)?.tagline ?? "";
}

const CARDS: Card[] = [
  {
    slug: "vibenow",
    name: "VibeNow",
    color: "#F59E0B", // amber
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    slug: "vibesquad",
    name: "VibeSquad",
    color: "#059669", // emerald
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    slug: "vibeask",
    name: "VibeAsk",
    color: "#6C4CF1", // mor
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2c.5 3 2.5 5 5.5 5.5C14.5 8 12.5 10 12 13c-.5-3-2.5-5-5.5-5.5C9.5 7 11.5 5 12 2z" />
      </svg>
    ),
  },
];

export default function HeroModeCards({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch justify-start gap-3 w-full sm:w-auto">
      {CARDS.map((c) => (
        <Link
          key={c.slug}
          href={`/${c.slug}`}
          className="group flex w-full sm:w-56 shrink-0 items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.18)] ring-1 ring-white/40 transition-transform hover:scale-[1.03] active:scale-95"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${c.color}1A`, color: c.color }}
          >
            {c.icon}
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-black leading-tight text-[#0A0A0F]">
              {c.name}
            </span>
            <span className="block text-[10px] leading-snug text-neutral-600">
              {tagline(c.slug, locale)}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
