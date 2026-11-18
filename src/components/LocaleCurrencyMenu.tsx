"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LanguageProvider";
import { useCurrency } from "./CurrencyProvider";
import { localeMeta, locales, type Locale } from "@/lib/i18n";
import { CURRENCIES, currencyInfo } from "@/lib/currency";

// Navbar'da dil + para birimi tek butonda (Airbnb/GYG tarzı): "🌐 EN · €".
// Panel iki bölüm: dil ızgarası + para birimi ızgarası. Ayrı LanguageSwitcher /
// CurrencySwitcher bileşenleri yerine geçer (bar'daki öğe sayısını azaltır).
export default function LocaleCurrencyMenu() {
  const { locale, setLocale } = useT();
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cur = currencyInfo(currency) ?? CURRENCIES[0];
  const tr = locale === "tr";

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const item = (selected: boolean) =>
    `flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
      selected ? "bg-neutral-900 text-white font-semibold" : "text-[#0A0A0F] hover:bg-neutral-100"
    }`;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={tr ? "Dil ve para birimi" : "Language and currency"}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-neutral-800 hover:bg-black/[0.04] hover:text-black transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="uppercase">{locale}</span>
        <span className="text-neutral-400" aria-hidden="true">·</span>
        <span>{cur.symbol}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={tr ? "Dil ve para birimi" : "Language and currency"}
          className="absolute right-0 top-full mt-2 z-50 w-[min(440px,calc(100vw-2rem))] max-h-[75vh] overflow-y-auto rounded-xl border border-black/[0.08] bg-white p-4 shadow-lg"
        >
          <p className="mb-2 px-1 text-xs font-semibold text-neutral-500">{tr ? "Dil" : "Language"}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {locales.map((l: Locale) => (
              <button
                key={l}
                type="button"
                onClick={() => { setLocale(l); setOpen(false); }}
                className={item(l === locale)}
              >
                <span className="truncate">{localeMeta[l].label}</span>
              </button>
            ))}
          </div>

          <p className="mt-4 mb-2 px-1 text-xs font-semibold text-neutral-500">{tr ? "Para birimi" : "Currency"}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {CURRENCIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => { setCurrency(c.code); setOpen(false); }}
                className={item(c.code === currency)}
                title={c.name}
              >
                <span className="w-8 shrink-0 font-semibold">{c.code}</span>
                <span className={c.code === currency ? "text-white/70" : "text-neutral-500"}>{c.symbol}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 px-1 text-[11px] leading-4 text-neutral-500">
            {tr ? "Fiyatlar yaklaşıktır. Ödeme TRY olarak alınır." : "Prices are approximate. Charged in TRY."}
          </p>
        </div>
      )}
    </div>
  );
}
