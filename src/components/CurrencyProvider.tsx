"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  loadRates,
  convert,
  formatMoney,
  detectCurrency,
  BASE_CURRENCY,
  type Rates,
} from "@/lib/currency";

type Ctx = {
  currency: string;
  setCurrency: (c: string) => void;
  ready: boolean; // kurlar yüklendi mi
  /** Bir baz-para tutarını seçili paraya çevirip formatlar. Çevrilemezse null. */
  display: (amount: number, base?: string) => string | null;
};

const CurrencyCtx = createContext<Ctx | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>(BASE_CURRENCY);
  const [rates, setRates] = useState<Rates | null>(null);

  // İlk yük: kayıtlı seçim veya dile göre tahmin + kurları çek.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("vg_currency");
    } catch {
      /* noop */
    }
    setCurrencyState(saved || detectCurrency());
    loadRates().then((r) => setRates(r));
  }, []);

  const setCurrency = useCallback((c: string) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("vg_currency", c);
    } catch {
      /* noop */
    }
  }, []);

  const display = useCallback(
    (amount: number, base: string = BASE_CURRENCY): string | null => {
      // Seçili para baz ile aynıysa çeviri yok (mevcut davranış korunur).
      if (currency === base) return null;
      const converted = convert(amount, base, currency, rates);
      if (converted == null) return null;
      return formatMoney(converted, currency);
    },
    [currency, rates]
  );

  return (
    <CurrencyCtx.Provider
      value={{ currency, setCurrency, ready: rates != null, display }}
    >
      {children}
    </CurrencyCtx.Provider>
  );
}

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyCtx);
  if (!ctx) {
    // Provider yoksa güvenli no-op (hiçbir şey bozulmaz).
    return {
      currency: BASE_CURRENCY,
      setCurrency: () => {},
      ready: false,
      display: () => null,
    };
  }
  return ctx;
}
