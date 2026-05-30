// Tur / rehber dilleri — ISO 639-1 kodları. Tek kaynak: hem admin multi-select
// hem katalog/detay gösteriminde kod → isim + bayrak için kullanılır.
// Bayraklar `flag-icons` kütüphanesiyle gösterilir (emoji DEĞİL — bazı OS'larda çıkmaz):
//   <span className={`fi fi-${fi}`} />
// `fi` = flag-icons ülke kodu (ISO 3166-1 alpha-2, küçük harf).
// Liste sitenin dil çubuğu (LocaleSwitcher) ile aynı dilleri kapsar.

export type LanguageOption = {
  code: string; // ISO 639-1, küçük harf (dil kodu)
  name: string; // gösterilecek ad (kendi dilinde — dil çubuğuyla aynı)
  fi: string;   // flag-icons ülke kodu (ISO 3166-1 alpha-2)
};

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", fi: "gb" },
  { code: "tr", name: "Türkçe", fi: "tr" },
  { code: "de", name: "Deutsch", fi: "de" },
  { code: "fr", name: "Français", fi: "fr" },
  { code: "ru", name: "Русский", fi: "ru" },
  { code: "es", name: "Español", fi: "es" },
  { code: "pt", name: "Português", fi: "pt" },
  { code: "it", name: "Italiano", fi: "it" },
  { code: "nl", name: "Nederlands", fi: "nl" },
  { code: "pl", name: "Polski", fi: "pl" },
  { code: "uk", name: "Українська", fi: "ua" },
  { code: "ro", name: "Română", fi: "ro" },
  { code: "el", name: "Ελληνικά", fi: "gr" },
  { code: "bg", name: "Български", fi: "bg" },
  { code: "sr", name: "Српски", fi: "rs" },
  { code: "hr", name: "Hrvatski", fi: "hr" },
  { code: "ko", name: "한국어", fi: "kr" },
  { code: "ja", name: "日本語", fi: "jp" },
  { code: "zh", name: "中文", fi: "cn" },
  { code: "ar", name: "العربية", fi: "sa" },
  { code: "id", name: "Indonesia", fi: "id" },
];

const BY_CODE = new Map(LANGUAGES.map((l) => [l.code, l]));

/** "en,tr,de" → ["en","tr","de"] (trim + boşları ele + küçük harf). */
export function parseLanguageCodes(csv: string | null | undefined): string[] {
  if (!csv) return [];
  return csv
    .split(",")
    .map((c) => c.trim().toLowerCase())
    .filter((c) => c.length > 0);
}

/** ["en","tr"] → "en,tr" */
export function joinLanguageCodes(codes: string[]): string {
  return codes.join(",");
}

/** Koda karşılık dil bilgisi; bilinmiyorsa kodu olduğu gibi ada koyar (bayraksız). */
export function languageByCode(code: string): LanguageOption {
  return (
    BY_CODE.get(code.toLowerCase()) ?? { code, name: code.toUpperCase(), fi: "" }
  );
}

/** "en,tr" → "English, Türkçe" (gösterim için). */
export function languageNames(csv: string | null | undefined): string {
  return parseLanguageCodes(csv)
    .map((c) => languageByCode(c).name)
    .join(", ");
}
