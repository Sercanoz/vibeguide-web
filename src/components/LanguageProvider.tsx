"use client";

import { createContext, useContext, useState } from "react";
import { i18n, type Locale, locales } from "@/lib/i18n";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof i18n)[Locale];
  ready: boolean;
};

const LanguageCtx = createContext<Ctx | null>(null);

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    // persist in cookie (1 year) + localStorage
    document.cookie = `vg_locale=${encodeURIComponent(l)};max-age=31536000;path=/;SameSite=Lax`;
    localStorage.setItem("vg_locale", l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageCtx.Provider value={{ locale, setLocale, t: i18n[locale], ready: true }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export function useT() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useT must be used inside LanguageProvider");
  return ctx;
}

// Re-export for middleware / server use
export { locales };
