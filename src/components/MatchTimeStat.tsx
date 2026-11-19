"use client";

import { useEffect, useState } from "react";
import { clientFetch } from "@/lib/api";

// Gerçek medyan eşleşme süresi (son 30 gün, GET /api/guides/match-time).
// Backend yeterli örnek yoksa (n<20) medianSeconds=null döner → hiçbir şey gösterilmez.
// Sabit "60 saniye" iddiası yerine ölçülen değer.

const LABEL: Record<string, string> = {
  en: "Median match time, last 30 days",
  tr: "Son 30 günde ortalama eşleşme süresi",
  de: "Mittlere Vermittlungszeit, letzte 30 Tage",
  es: "Tiempo medio de conexión, últimos 30 días",
  fr: "Délai médian de mise en relation, 30 derniers jours",
  it: "Tempo mediano di abbinamento, ultimi 30 giorni",
  ru: "Медианное время подбора за 30 дней",
};

function fmt(sec: number, locale: string): string {
  try {
    if (sec < 90) return new Intl.NumberFormat(locale, { style: "unit", unit: "second", unitDisplay: "long" }).format(sec);
    return new Intl.NumberFormat(locale, { style: "unit", unit: "minute", unitDisplay: "long" }).format(Math.round(sec / 60));
  } catch {
    return sec < 90 ? `${sec} s` : `${Math.round(sec / 60)} min`;
  }
}

export default function MatchTimeStat({ locale }: { locale: string }) {
  const [sec, setSec] = useState<number | null>(null);
  useEffect(() => {
    let alive = true;
    clientFetch("/api/guides/match-time")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { medianSeconds: number | null } | null) => { if (alive && d?.medianSeconds) setSec(d.medianSeconds); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  if (sec == null) return null;
  return (
    <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-neutral-700">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
      <span>{LABEL[locale] ?? LABEL.en}: <strong className="font-semibold text-neutral-900">{fmt(sec, locale)}</strong></span>
    </p>
  );
}
