"use client";

// Tur detayı rezervasyon kartındaki ay takvimi. Müsait günler seçilebilir, müsait
// olmayanlar soluk + üstü çizili. Veri: GET /api/tours/{id}/availability (gün bazında
// bool; kural rehber seçim ekranıyla aynı). Veri gelmezse (eski backend / ağ hatası)
// tüm gelecek günler seçilebilir — rezervasyon akışı asla kilitlenmez.

type Avail = Record<string, boolean>;

const L: Record<string, { prev: string; next: string; none: string; loading: string; unavailable: string; legend: string }> = {
  en: { prev: "Previous month", next: "Next month", none: "No available dates this month — try next month.", loading: "Checking availability…", unavailable: "No guide available", legend: "Available dates are selectable" },
  tr: { prev: "Önceki ay", next: "Sonraki ay", none: "Bu ay müsait gün yok — sonraki aya bak.", loading: "Müsaitlik kontrol ediliyor…", unavailable: "Müsait rehber yok", legend: "Müsait günler seçilebilir" },
};

export function ymd(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function AvailabilityCalendar({
  month, onMonth, avail, loading, failed, value, onChange, locale, idPrefix,
}: {
  month: Date;              // görünen ayın 1'i
  onMonth: (m: Date) => void;
  avail: Avail;             // yüklenen günler
  loading: boolean;
  failed: boolean;          // veri alınamadı → tüm gelecek günler açık
  value: string;            // seçili "YYYY-MM-DD"
  onChange: (v: string) => void;
  locale: string;
  idPrefix: string;
}) {
  const l = L[locale] ?? L.en;
  const dl = locale === "tr" ? "tr-TR" : locale;
  const today = ymd(new Date());
  const thisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const y = month.getFullYear(), m = month.getMonth();
  const daysIn = new Date(y, m + 1, 0).getDate();
  const lead = (new Date(y, m, 1).getDay() + 6) % 7; // Pazartesi başlangıç
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 1 + i).toLocaleDateString(dl, { weekday: "narrow" }));
  const title = month.toLocaleDateString(dl, { month: "long", year: "numeric" });

  const cells = Array.from({ length: daysIn }, (_, i) => {
    const key = ymd(new Date(y, m, i + 1));
    const past = key < today;
    // geçmiş → kapalı; veri alınamadı → açık; veri geldiyse ona göre; yükleniyorsa bekle (kapalı)
    const ok = past ? false : failed ? true : key in avail ? avail[key] : false;
    return { key, day: i + 1, past, ok };
  });
  const anyOpen = cells.some((c) => c.ok);

  const navBtn = "flex h-8 w-8 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button type="button" className={navBtn} aria-label={l.prev} disabled={month <= thisMonth}
          onClick={() => onMonth(new Date(y, m - 1, 1))}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <p className="text-sm font-semibold capitalize text-neutral-900" aria-live="polite">{title}</p>
        <button type="button" className={navBtn} aria-label={l.next} onClick={() => onMonth(new Date(y, m + 1, 1))}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center" role="grid" aria-label={title} aria-busy={loading}>
        {weekdays.map((w, i) => (
          <span key={i} className="pb-1 text-[11px] font-medium uppercase text-neutral-400" aria-hidden="true">{w}</span>
        ))}
        {Array.from({ length: lead }, (_, i) => <span key={`l${i}`} />)}
        {cells.map((c) => {
          const selected = c.key === value;
          return (
            <button
              key={c.key}
              id={`${idPrefix}-${c.key}`}
              type="button"
              disabled={!c.ok}
              onClick={() => onChange(c.key)}
              aria-pressed={selected}
              aria-label={`${c.key}${!c.ok && !c.past ? ` — ${l.unavailable}` : ""}`}
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm tabular-nums transition-colors ${
                selected
                  ? "bg-neutral-900 font-semibold text-white"
                  : c.ok
                    ? "font-medium text-neutral-900 hover:bg-neutral-100"
                    : "cursor-not-allowed text-neutral-300 line-through decoration-neutral-300"
              }`}
            >
              {c.day}
            </button>
          );
        })}
      </div>
      <p className="mt-2 min-h-[1.25rem] text-xs text-neutral-500" aria-live="polite">
        {loading ? l.loading : !anyOpen && !failed ? l.none : !failed ? l.legend : ""}
      </p>
    </div>
  );
}
