"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { i18n, type Locale, locales } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof i18n)[Locale];
};

const LanguageCtx = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Hydrate from localStorage or browser language
    const stored = localStorage.getItem("vg_locale") as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
      document.documentElement.lang = stored;
      return;
    }
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    if (browser && (locales as readonly string[]).includes(browser)) {
      setLocaleState(browser as Locale);
      document.documentElement.lang = browser;
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("vg_locale", l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageCtx.Provider value={{ locale, setLocale, t: i18n[locale] }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}
