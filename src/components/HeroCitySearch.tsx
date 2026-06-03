"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { uiExtra } from "@/lib/ui-extra-i18n";

type TourLite = {
  city: string;
  provinceName?: string | null;
  provinceSlug?: string | null;
};

type Destination = {
  label: string; // gösterilecek ad (İstanbul)
  slug: string;  // /tours?city=<slug>  (provinceSlug yoksa label'ın kendisi)
  count: number; // bu destinasyondaki tur sayısı
};

const RECENT_KEY = "vg_recent_city";

// Pin ikonu (bar + dropdown'da ortak kullanılıyor).
function PinIcon({ size = 20, color = "#6C4CF1" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// Şehir baş harfiyle gradyan avatar — dropdown'da görsel ayrım için.
function CityAvatar({ label }: { label: string }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#EC4899] text-sm font-black text-white shrink-0">
      {label.charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * Hero üstündeki ortalı destinasyon arama barı. Sadece GERÇEK turu olan şehirleri
 * gösterir (boş sonuç olmaz). Seçim → /tours?city=<slug>. Boş "Explore" → tüm turlar.
 */
export default function HeroCitySearch() {
  const router = useRouter();
  const { locale } = useT();
  const ux = uiExtra[locale] ?? uiExtra.en;
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [hintIdx, setHintIdx] = useState(0);
  const [recent, setRecent] = useState<Destination | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Turları çek → benzersiz destinasyon listesi üret.
  useEffect(() => {
    let alive = true;
    fetch(`${API_BASE_URL}/api/tours?locale=${locale}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((tours: TourLite[]) => {
        if (!alive || !Array.isArray(tours)) return;
        const map = new Map<string, Destination>();
        for (const t of tours) {
          const label = (t.provinceName || t.city || "").trim();
          if (!label) continue;
          const slug = (t.provinceSlug || label).toLowerCase();
          const ex = map.get(slug);
          if (ex) ex.count++;
          else map.set(slug, { label, slug, count: 1 });
        }
        setDestinations(
          Array.from(map.values()).sort((a, b) => b.count - a.count)
        );
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [locale]);

  // Son aranan şehri oku.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as Destination);
    } catch {
      /* noop */
    }
  }, []);

  // Dışarı tıklayınca kapat.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Rotating placeholder — sadece kullanıcı yazmıyorken döner.
  const hints = useMemo(() => {
    const top = destinations.slice(0, 3).map((d) => `${ux.searchTryPrefix} ${d.label}…`);
    return [ux.searchWhereTo, ...top, ux.searchTryFood].filter(Boolean);
  }, [destinations, ux]);

  useEffect(() => {
    if (query) return; // yazarken durdur
    const id = setInterval(() => setHintIdx((i) => (i + 1) % hints.length), 2600);
    return () => clearInterval(id);
  }, [query, hints.length]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? destinations.filter((d) => d.label.toLowerCase().includes(q))
      : destinations;
    return list.slice(0, 6);
  }, [query, destinations]);

  // Boşken en üstte "Recent" satırı (hâlâ geçerli bir destinasyonsa).
  const recentValid =
    !query && recent && destinations.some((d) => d.slug === recent.slug)
      ? recent
      : null;

  function go(dest?: Destination) {
    const target = dest ?? matches[active] ?? matches[0];
    if (!target) {
      router.push("/tours"); // boş → tüm turlar
      return;
    }
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(target));
    } catch {
      /* noop */
    }
    router.push(`/tours?city=${encodeURIComponent(target.slug)}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  // NOT: Eskiden destinasyon yüklenene kadar `return null` ile gizleniyordu →
  // sayfa statikleşince (API client-side gecikince) kutu "geç beliriyor" hissi
  // veriyordu. Artık kutu HER ZAMAN render edilir; öneriler API gelince zenginleşir.
  return (
    <div className="relative z-20 mx-auto w-full max-w-2xl" ref={boxRef}>
      <p className="text-center text-sm font-semibold text-neutral-800 mb-3">
        {ux.searchSubtitle}
      </p>

      <div
        className={`flex items-center gap-2 rounded-full border bg-white/90 backdrop-blur-sm p-1.5 pl-5 transition-all ${
          open
            ? "border-[#6C4CF1]/50 shadow-[0_8px_40px_rgba(108,76,241,0.18)]"
            : "border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        }`}
      >
        <PinIcon />

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={hints[hintIdx] ?? ux.searchWhereTo}
          className="flex-1 min-w-0 bg-transparent py-3 text-[15px] font-medium text-[#0A0A0F] placeholder:text-neutral-800 focus:outline-none"
          aria-label="Search destination"
        />

        <button
          onClick={() => go()}
          className="shrink-0 rounded-full bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899] px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
          style={{ boxShadow: "0 4px 20px rgba(108,76,241,0.35)" }}
        >
          {ux.explore}
        </button>
      </div>

      {/* Suggestions dropdown */}
      {open && (matches.length > 0 || recentValid) && (
        <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-xl">
          {recentValid && (
            <button
              onClick={() => go(recentValid)}
              className="flex w-full items-center justify-between gap-3 border-b border-black/[0.04] px-5 py-3 text-left transition-colors hover:bg-neutral-50"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                </span>
                <span className="text-sm font-bold text-[#0A0A0F]">{recentValid.label}</span>
              </span>
              <span className="text-xs font-semibold text-neutral-800">{locale === "tr" ? "Son" : "Recent"}</span>
            </button>
          )}
          {matches.map((d, i) => (
            <button
              key={d.slug}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(d)}
              className={`flex w-full items-center justify-between gap-3 px-5 py-3 text-left transition-colors ${
                i === active ? "bg-[#6C4CF1]/[0.06]" : "hover:bg-neutral-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <CityAvatar label={d.label} />
                <span className="text-sm font-bold text-[#0A0A0F]">{d.label}</span>
              </span>
              <span className="text-xs font-semibold text-neutral-800">
                {d.count} {locale === "tr" ? "tur" : (d.count === 1 ? "tour" : "tours")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
