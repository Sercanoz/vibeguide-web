// Tur / rehber dilleri — ISO 639-1 kodları. Tek kaynak: hem admin multi-select
// hem katalog/detay gösteriminde kod → isim çevirisi için kullanılır.
// DB tablosu yok: diller pratikte değişmez, comma-separated string olarak saklanır.

export type LanguageOption = {
  code: string; // ISO 639-1, küçük harf
  name: string; // İngilizce ad (admin İngilizce)
  flag: string; // bayrak emoji (gösterim için)
};

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "bg", name: "Bulgarian", flag: "🇧🇬" },
  { code: "sr", name: "Serbian", flag: "🇷🇸" },
  { code: "hr", name: "Croatian", flag: "🇭🇷" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "fa", name: "Persian", flag: "🇮🇷" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "ms", name: "Malay", flag: "🇲🇾" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "az", name: "Azerbaijani", flag: "🇦🇿" },
  { code: "ka", name: "Georgian", flag: "🇬🇪" },
  { code: "hy", name: "Armenian", flag: "🇦🇲" },
  { code: "sq", name: "Albanian", flag: "🇦🇱" },
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

/** Koda karşılık dil bilgisi; bilinmiyorsa kodu olduğu gibi ada koyar. */
export function languageByCode(code: string): LanguageOption {
  return (
    BY_CODE.get(code.toLowerCase()) ?? { code, name: code.toUpperCase(), flag: "🏳️" }
  );
}

/** "en,tr" → "English, Turkish" (gösterim için). */
export function languageNames(csv: string | null | undefined): string {
  return parseLanguageCodes(csv)
    .map((c) => languageByCode(c).name)
    .join(", ");
}
