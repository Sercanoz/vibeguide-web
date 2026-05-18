"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LanguageProvider";
import type { Locale } from "@/lib/i18n";

const OPTIONS: { code: Locale; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "el", flag: "🇬🇷", label: "Ελληνικά" },
  { code: "bg", flag: "🇧🇬", label: "Български" },
  { code: "sr", flag: "🇷🇸", label: "Српски" },
  { code: "hr", flag: "🇭🇷", label: "Hrvatski" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
];

export default function LocaleSwitcher() {
  const { locale, setLocale } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = OPTIONS.find((o) => o.code === locale) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold shadow-sm hover:bg-neutral-50"
        aria-label="Select language"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-xs text-neutral-400">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 max-h-96 w-44 overflow-y-auto rounded-2xl border border-neutral-100 bg-white shadow-xl">
          {OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => {
                setLocale(opt.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold hover:bg-neutral-50 ${
                opt.code === locale ? "bg-neutral-100" : ""
              }`}
            >
              <span className="text-lg">{opt.flag}</span>
              <span>{opt.label}</span>
              {opt.code === locale && (
                <span className="ml-auto text-xs text-green-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
