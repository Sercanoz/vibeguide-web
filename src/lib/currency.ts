// Para birimi gösterimi — TRY'de saklanır/tahsil edilir; turist seçtiği parada
// "≈" yaklaşık değer görür. Kur: ECB (Frankfurter API, ücretsiz, anahtarsız),
// günde bir cache'lenir. Gösterim amaçlı; gerçek tahsilat hep TRY.

export type CurrencyInfo = {
  code: string;   // ISO 4217
  symbol: string; // seçici için
  name: string;
  fi: string;     // flag-icons ülke kodu
};

export const BASE_CURRENCY = "TRY";

// Türkiye'ye en çok turist gelen ülkelerin para birimleri.
export const CURRENCIES: CurrencyInfo[] = [
  { code: "TRY", symbol: "₺", name: "Türk Lirası", fi: "tr" },
  { code: "EUR", symbol: "€", name: "Euro", fi: "eu" },
  { code: "USD", symbol: "$", name: "US Dollar", fi: "us" },
  { code: "GBP", symbol: "£", name: "British Pound", fi: "gb" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", fi: "ru" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", fi: "sa" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", fi: "ae" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", fi: "jp" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", fi: "cn" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc", fi: "ch" },
  { code: "CAD", symbol: "$", name: "Canadian Dollar", fi: "ca" },
  { code: "AUD", symbol: "$", name: "Australian Dollar", fi: "au" },
  { code: "PLN", symbol: "zł", name: "Polish Złoty", fi: "pl" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", fi: "in" },
];

const BY_CODE = new Map(CURRENCIES.map((c) => [c.code, c]));
export function currencyInfo(code: string): CurrencyInfo | undefined {
  return BY_CODE.get(code);
}

export type Rates = Record<string, number>; // 1 TRY = rates[code] birim

const CACHE_KEY = "vg_fx_rates_v2";
const TTL_MS = 12 * 60 * 60 * 1000; // 12 saat

type Cached = { ts: number; rates: Rates };

/** ECB kurlarını çeker (1 TRY = X). Cache geçerliyse onu döner. Hata → null. */
export async function loadRates(): Promise<Rates | null> {
  // 1) Cache
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const c = JSON.parse(raw) as Cached;
      if (Date.now() - c.ts < TTL_MS && c.rates && c.rates.TRY === 1) {
        return c.rates;
      }
    }
  } catch {
    /* noop */
  }

  // 2) Ağdan çek — open.er-api.com (TRY destekli, CORS'lu, ücretsiz, anahtarsız).
  //    Yanıt: { result:"success", rates: { TRY:1, USD:x, EUR:y, ... } } (1 TRY = X)
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/TRY", {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      result?: string;
      rates?: Record<string, number>;
    };
    if (data.result !== "success" || !data.rates) return null;
    const rates: Rates = { ...data.rates, TRY: 1 };
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), rates }));
    } catch {
      /* noop */
    }
    return rates;
  } catch {
    return null;
  }
}

/** `from` parasındaki tutarı `to` parasına çevir. Kur yoksa null. */
export function convert(
  amount: number,
  from: string,
  to: string,
  rates: Rates | null
): number | null {
  if (!rates) return null;
  if (from === to) return amount;
  const rFrom = rates[from];
  const rTo = rates[to];
  if (!rFrom || !rTo) return null;
  // amount(from) → TRY → to
  const inTry = amount / rFrom;
  return inTry * rTo;
}

/** Intl ile düzgün para formatı (sembol + yerel ayar). */
export function formatMoney(amount: number, code: string, locale = "en"): string {
  const noDecimals = ["TRY", "JPY", "RUB", "INR"].includes(code);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: code,
      maximumFractionDigits: noDecimals ? 0 : 2,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    const info = currencyInfo(code);
    return `${info?.symbol ?? ""}${Math.round(amount)}`;
  }
}

/** Tarayıcı diline göre ilk para birimi tahmini (yoksa TRY). */
export function detectCurrency(): string {
  if (typeof navigator === "undefined") return "TRY";
  const lang = (navigator.language || "en").toLowerCase();
  const region = lang.split("-")[1];
  const byRegion: Record<string, string> = {
    tr: "TRY", us: "USD", gb: "GBP", de: "EUR", fr: "EUR", es: "EUR",
    it: "EUR", nl: "EUR", at: "EUR", ie: "EUR", pt: "EUR", gr: "EUR",
    ru: "RUB", sa: "SAR", ae: "AED", jp: "JPY", cn: "CNY", ch: "CHF",
    ca: "CAD", au: "AUD", pl: "PLN", in: "INR",
  };
  if (region && byRegion[region]) return byRegion[region];
  const byLang: Record<string, string> = {
    tr: "TRY", en: "USD", de: "EUR", fr: "EUR", es: "EUR", it: "EUR",
    nl: "EUR", ru: "RUB", ar: "SAR", ja: "JPY", zh: "CNY", pl: "PLN",
  };
  return byLang[lang.split("-")[0]] ?? "TRY";
}
