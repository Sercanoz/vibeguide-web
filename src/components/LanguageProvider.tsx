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

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Middleware (x-locale header) kalktığı için dili client'ta belirle:
  // mount'ta kullanıcının kayıtlı tercihini (cookie/localStorage), yoksa tarayıcı
  // dilini oku. SSR çıktısı hep "en" → statik/cache'lenebilir; hidrasyonla dil oturur.
  useEffect(() => {
    const saved =
      (typeof localStorage !== "undefined" && localStorage.getItem("vg_locale")) ||
      document.cookie.match(/(?:^|;\s*)vg_locale=([^;]+)/)?.[1];
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    const pick = [saved && decodeURIComponent(saved), browser].find(
      (l): l is Locale => !!l && (locales as readonly string[]).includes(l)
    );
    if (pick && pick !== locale) {
      setLocaleState(pick);
      document.documentElement.lang = pick;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
