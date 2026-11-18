// Gezilecek yer verisindeki `city` alanı İngilizce tutuluyor (tur eşleştirme anahtarı).
// Görünen ad için dile göre yerel karşılık. Listede olmayan dil/şehir → olduğu gibi.
const LABELS: Record<string, Record<string, string>> = {
  tr: { Istanbul: "İstanbul", Ephesus: "Efes", Cappadocia: "Kapadokya" },
  de: { Cappadocia: "Kappadokien" },
  fr: { Cappadocia: "Cappadoce", Ephesus: "Éphèse" },
  es: { Cappadocia: "Capadocia", Ephesus: "Éfeso", Istanbul: "Estambul" },
  it: { Ephesus: "Efeso" },
  pt: { Cappadocia: "Capadócia", Ephesus: "Éfeso" },
  nl: { Cappadocia: "Cappadocië", Ephesus: "Efeze" },
  pl: { Cappadocia: "Kapadocja", Ephesus: "Efez", Istanbul: "Stambuł" },
  ru: { Istanbul: "Стамбул", Ephesus: "Эфес", Cappadocia: "Каппадокия", Antalya: "Анталья", "İzmir": "Измир", Pamukkale: "Памуккале", "Selçuk": "Сельчук", Bodrum: "Бодрум", "Şanlıurfa": "Шанлыурфа" },
  ar: { Istanbul: "إسطنبول", Ephesus: "أفسس", Cappadocia: "كابادوكيا", Antalya: "أنطاليا", "İzmir": "إزمير", Pamukkale: "باموكالي", Bodrum: "بودروم" },
};

export function cityLabel(city: string, lang: string): string {
  return LABELS[lang]?.[city] ?? city;
}
