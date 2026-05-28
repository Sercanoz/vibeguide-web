"use client";

import { useState, useRef, useEffect } from "react";
import { useT } from "./LanguageProvider";
import { localeMeta, locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-vg-border bg-white text-sm font-bold hover:border-vg-primary transition-colors"
        aria-label="Change language"
      >
        <img src={`https://flagcdn.com/w20/${localeMeta[locale].flagCode}.png`} width={20} height={15} alt={localeMeta[locale].label} className="rounded-sm" />
        <span className="uppercase text-xs tracking-wide">{locale}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white border border-vg-border shadow-xl overflow-hidden z-50">
          {locales.map((l: Locale) => {
            const selected = l === locale;
            return (
              <button
                key={l}
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-left transition-colors ${
                  selected
                    ? "bg-vg-primary/10 text-vg-primary"
                    : "hover:bg-vg-bg-soft text-vg-ink"
                }`}
              >
                <img src={`https://flagcdn.com/w20/${localeMeta[l].flagCode}.png`} width={20} height={15} alt={localeMeta[l].label} className="rounded-sm" />
                <span className="flex-1">{localeMeta[l].label}</span>
                {selected && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.5 8.5L6.5 11.5L12.5 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
