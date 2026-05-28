"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { i18n, type Locale, locales } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof i18n)[Locale];
  ready: boolean;
};

const LanguageCtx = createContext<Ctx | null>(null);

function getCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)vg_locale=([^;]*)/);
  const val = match ? decodeURIComponent(match[1]) : null;
  return val && (locales as readonly string[]).includes(val) ? (val as Locale) : null;
}

function setBrowserLocale(l: Locale) {
  // 1 year expiry, SameSite=Lax
  document.cookie = `vg_locale=${encodeURIComponent(l)};max-age=31536000;path=/;SameSite=Lax`;
  localStorage.setItem("vg_locale", l);
  document.documentElement.lang = l;
}

function detectInitialLocale(): Locale {
  // 1. cookie (fastest, no flash if middleware reads it — future use)
  const cookie = getCookieLocale();
  if (cookie) return cookie;
  // 2. localStorage fallback
  const stored = localStorage.getItem("vg_locale");
  if (stored && (locales as readonly string[]).includes(stored)) return stored as Locale;
  // 3. browser language
  const browser = navigator.language?.slice(0, 2).toLowerCase();
  if (browser && (locales as readonly string[]).includes(browser)) return browser as Locale;
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start with "en" for SSR, immediately correct on first client paint
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const detected = detectInitialLocale();
    setLocaleState(detected);
    document.documentElement.lang = detected;
    setReady(true);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    setBrowserLocale(l);
  };

  return (
    <LanguageCtx.Provider value={{ locale, setLocale, t: i18n[locale], ready }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
