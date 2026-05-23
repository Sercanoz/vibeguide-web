"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LanguageProvider";
import type { Locale } from "@/lib/i18n";

const OPTIONS: { code: Locale; fi: string; label: string }[] = [
  { code: "en", fi: "gb", label: "English" },
  { code: "tr", fi: "tr", label: "Türkçe" },
  { code: "de", fi: "de", label: "Deutsch" },
  { code: "fr", fi: "fr", label: "Français" },
  { code: "ru", fi: "ru", label: "Русский" },
  { code: "es", fi: "es", label: "Español" },
  { code: "pt", fi: "pt", label: "Português" },
  { code: "it", fi: "it", label: "Italiano" },
  { code: "nl", fi: "nl", label: "Nederlands" },
  { code: "pl", fi: "pl", label: "Polski" },
  { code: "uk", fi: "ua", label: "Українська" },
  { code: "ro", fi: "ro", label: "Română" },
  { code: "el", fi: "gr", label: "Ελληνικά" },
  { code: "bg", fi: "bg", label: "Български" },
  { code: "sr", fi: "rs", label: "Српски" },
  { code: "hr", fi: "hr", label: "Hrvatski" },
  { code: "ko", fi: "kr", label: "한국어" },
  { code: "ja", fi: "jp", label: "日本語" },
  { code: "zh", fi: "cn", label: "中文" },
  { code: "ar", fi: "sa", label: "العربية" },
  { code: "id", fi: "id", label: "Indonesia" },
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
        <span className={`fi fi-${current.fi} rounded-sm`} style={{ width: 20, height: 15, display: "inline-block" }} />
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
              <span className={`fi fi-${opt.fi} rounded-sm shrink-0`} style={{ width: 22, height: 16, display: "inline-block" }} />
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
