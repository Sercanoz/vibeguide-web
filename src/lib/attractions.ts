// Landmark / atraksiyon SEO sayfaları için içerik — dile göre.
// Amaç: "Αγία Σοφία / Айя-София / آيا صوفيا / Ayasofya" gibi yerel-dil aramalarında
// Google'da çıkmak. Her dil AYRI taranabilir URL'de sunulur (/attractions/<lang>/<slug>),
// hreflang ile birbirine bağlanır. Çeviri client-side değil — sunucu-render.

export const ATTRACTION_LANGS = [
  "en",
  "de",
  "ru",
  "ar",
  "es",
  "fr",
  "el",
  "tr",
  "it",
  "pl",
  "nl",
] as const;
export type AttractionLang = (typeof ATTRACTION_LANGS)[number];

// Mekan sayfası bölüm başlıkları (dile göre) — highlights/FAQ/other-landmarks
// için lokalize H2. İçerikte alan yok; şablon geneli, tek yerden.
export const ATTR_HEADINGS: Record<AttractionLang, { highlights: string; faq: string; more: string }> = {
  en: { highlights: "Highlights", faq: "Frequently asked questions", more: "More to explore" },
  de: { highlights: "Höhepunkte", faq: "Häufig gestellte Fragen", more: "Mehr entdecken" },
  ru: { highlights: "Главное", faq: "Часто задаваемые вопросы", more: "Что ещё посмотреть" },
  ar: { highlights: "أبرز المعالم", faq: "الأسئلة الشائعة", more: "المزيد للاستكشاف" },
  es: { highlights: "Lo más destacado", faq: "Preguntas frecuentes", more: "Más que explorar" },
  fr: { highlights: "Points forts", faq: "Questions fréquentes", more: "À découvrir aussi" },
  el: { highlights: "Κυριότερα σημεία", faq: "Συχνές ερωτήσεις", more: "Ανακαλύψτε περισσότερα" },
  tr: { highlights: "Öne çıkanlar", faq: "Sıkça sorulan sorular", more: "Keşfedilecek daha fazlası" },
  it: { highlights: "In evidenza", faq: "Domande frequenti", more: "Altro da esplorare" },
  pl: { highlights: "Najważniejsze", faq: "Najczęściej zadawane pytania", more: "Więcej do odkrycia" },
  nl: { highlights: "Hoogtepunten", faq: "Veelgestelde vragen", more: "Meer om te ontdekken" },
};

export const RTL_LANGS: ReadonlySet<AttractionLang> = new Set(["ar"]);

export type AttractionContent = {
  name: string; // landmark adı, o dilde (H1 + başlıkta)
  metaTitle: string;
  metaDescription: string;
  intro: string[]; // 1-2 kısa paragraf
  highlights: { title: string; desc: string }[];
  // "Ziyaret planı" bölümü (opsiyonel): nasıl gidilir / bilet / saat / en iyi zaman.
  // İçerik derinliği + transactional keyword (tickets/opening hours/best time).
  planningHeading?: string;
  planningParagraphs?: string[];
  faqs: { q: string; a: string }[];
  toursHeading: string;
  ctaTitle: string;
  ctaSub: string;
};

export type Attraction = {
  slug: string;
  city: string; // tur eşleştirmesi için (görsel ad)
  citySlug: string; // /api/tours?city=<slug>
  emoji: string;
  image: string;
  lat: number;
  lng: number;
  i18n: Record<AttractionLang, AttractionContent>;
};

// İstanbul landmark'larında dilden dile ortak metinler (tur başlığı + CTA alt metni).
// Her içerik bloğuna spread edilir, tekrarı azaltır.
const IST: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: {
    toursHeading: "Istanbul tours with local guides",
    ctaSub: "Download VibeGuide free and match with a verified Istanbul guide in 60 seconds.",
  },
  de: {
    toursHeading: "Istanbul-Touren mit lokalen Guides",
    ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften Istanbul-Guide.",
  },
  ru: {
    toursHeading: "Экскурсии по Стамбулу с местными гидами",
    ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного гида в Стамбуле за 60 секунд.",
  },
  ar: {
    toursHeading: "جولات إسطنبول مع مرشدين محليين",
    ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد موثّق في إسطنبول خلال 60 ثانية.",
  },
  es: {
    toursHeading: "Tours de Estambul con guías locales",
    ctaSub: "Descarga VibeGuide gratis y encuentra un guía verificado en Estambul en 60 segundos.",
  },
  fr: {
    toursHeading: "Visites d'Istanbul avec guides locaux",
    ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide vérifié à Istanbul en 60 secondes.",
  },
  el: {
    toursHeading: "Ξεναγήσεις στην Κωνσταντινούπολη με ντόπιους ξεναγούς",
    ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ξεναγό στην Κωνσταντινούπολη σε 60 δευτερόλεπτα.",
  },
  tr: {
    toursHeading: "Yerel rehberlerle İstanbul turları",
    ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede doğrulanmış bir İstanbul rehberiyle eşleş.",
  },
  it: {
    toursHeading: "Tour di Istanbul con guide locali",
    ctaSub: "Scarica VibeGuide gratis e trova una guida verificata a Istanbul in 60 secondi.",
  },
  pl: {
    toursHeading: "Wycieczki po Stambule z lokalnymi przewodnikami",
    ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego przewodnika w Stambule w 60 sekund.",
  },
  nl: {
    toursHeading: "Tours door Istanbul met lokale gidsen",
    ctaSub: "Download VibeGuide gratis en vind een geverifieerde gids in Istanbul in 60 seconden.",
  },
};

// Efes (İzmir / Selçuk) ortak metinleri.
const EPH: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: { toursHeading: "Ephesus tours with local guides", ctaSub: "Download VibeGuide free and match with a verified local guide for Ephesus in 60 seconds." },
  de: { toursHeading: "Ephesos-Touren mit lokalen Guides", ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften lokalen Guide für Ephesos." },
  ru: { toursHeading: "Экскурсии в Эфес с местными гидами", ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного местного гида в Эфесе за 60 секунд." },
  ar: { toursHeading: "جولات أفسس مع مرشدين محليين", ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد محلي موثّق في أفسس خلال 60 ثانية." },
  es: { toursHeading: "Tours de Éfeso con guías locales", ctaSub: "Descarga VibeGuide gratis y encuentra un guía local verificado para Éfeso en 60 segundos." },
  fr: { toursHeading: "Visites d'Éphèse avec guides locaux", ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide local vérifié pour Éphèse en 60 secondes." },
  el: { toursHeading: "Ξεναγήσεις στην Έφεσο με ντόπιους ξεναγούς", ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ντόπιο ξεναγό στην Έφεσο σε 60 δευτερόλεπτα." },
  tr: { toursHeading: "Yerel rehberlerle Efes turları", ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede Efes için doğrulanmış yerel bir rehberle eşleş." },
  it: { toursHeading: "Tour di Efeso con guide locali", ctaSub: "Scarica VibeGuide gratis e trova una guida locale verificata per Efeso in 60 secondi." },
  pl: { toursHeading: "Wycieczki po Efezie z lokalnymi przewodnikami", ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego lokalnego przewodnika po Efezie w 60 sekund." },
  nl: { toursHeading: "Tours door Efeze met lokale gidsen", ctaSub: "Download VibeGuide gratis en vind een geverifieerde lokale gids voor Efeze in 60 seconden." },
};

// Kapadokya (Nevşehir / Göreme) ortak metinleri.
const CAP: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: { toursHeading: "Cappadocia tours with local guides", ctaSub: "Download VibeGuide free and match with a verified Cappadocia guide in 60 seconds." },
  de: { toursHeading: "Kappadokien-Touren mit lokalen Guides", ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften Kappadokien-Guide." },
  ru: { toursHeading: "Экскурсии по Каппадокии с местными гидами", ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного гида в Каппадокии за 60 секунд." },
  ar: { toursHeading: "جولات كابادوكيا مع مرشدين محليين", ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد موثّق في كابادوكيا خلال 60 ثانية." },
  es: { toursHeading: "Tours de Capadocia con guías locales", ctaSub: "Descarga VibeGuide gratis y encuentra un guía verificado en Capadocia en 60 segundos." },
  fr: { toursHeading: "Visites de Cappadoce avec guides locaux", ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide vérifié en Cappadoce en 60 secondes." },
  el: { toursHeading: "Ξεναγήσεις στην Καππαδοκία με ντόπιους ξεναγούς", ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ξεναγό στην Καππαδοκία σε 60 δευτερόλεπτα." },
  tr: { toursHeading: "Yerel rehberlerle Kapadokya turları", ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede doğrulanmış bir Kapadokya rehberiyle eşleş." },
  it: { toursHeading: "Tour della Cappadocia con guide locali", ctaSub: "Scarica VibeGuide gratis e trova una guida verificata in Cappadocia in 60 secondi." },
  pl: { toursHeading: "Wycieczki po Kapadocji z lokalnymi przewodnikami", ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego przewodnika w Kapadocji w 60 sekund." },
  nl: { toursHeading: "Tours door Cappadocië met lokale gidsen", ctaSub: "Download VibeGuide gratis en vind een geverifieerde gids in Cappadocië in 60 seconden." },
};

// İzmir / Bergama (Pergamon) ortak metinleri.
const IZM: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: { toursHeading: "İzmir tours with local guides", ctaSub: "Download VibeGuide free and match with a verified İzmir guide in 60 seconds." },
  de: { toursHeading: "İzmir-Touren mit lokalen Guides", ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften İzmir-Guide." },
  ru: { toursHeading: "Экскурсии по Измиру с местными гидами", ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного гида в Измире за 60 секунд." },
  ar: { toursHeading: "جولات إزمير مع مرشدين محليين", ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد موثّق في إزمير خلال 60 ثانية." },
  es: { toursHeading: "Tours de Esmirna con guías locales", ctaSub: "Descarga VibeGuide gratis y encuentra un guía verificado en Esmirna en 60 segundos." },
  fr: { toursHeading: "Visites d'İzmir avec guides locaux", ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide vérifié à İzmir en 60 secondes." },
  el: { toursHeading: "Ξεναγήσεις στη Σμύρνη με ντόπιους ξεναγούς", ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ξεναγό στη Σμύρνη σε 60 δευτερόλεπτα." },
  tr: { toursHeading: "Yerel rehberlerle İzmir turları", ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede doğrulanmış bir İzmir rehberiyle eşleş." },
  it: { toursHeading: "Tour di Smirne con guide locali", ctaSub: "Scarica VibeGuide gratis e trova una guida verificata a Smirne in 60 secondi." },
  pl: { toursHeading: "Wycieczki po Izmirze z lokalnymi przewodnikami", ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego przewodnika w Izmirze w 60 sekund." },
  nl: { toursHeading: "İzmir-tours met lokale gidsen", ctaSub: "Download VibeGuide gratis en vind een geverifieerde gids in İzmir in 60 seconden." },
};

// Antalya (Aspendos / Kaleiçi) ortak metinleri.
const ANT: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: { toursHeading: "Antalya tours with local guides", ctaSub: "Download VibeGuide free and match with a verified Antalya guide in 60 seconds." },
  de: { toursHeading: "Antalya-Touren mit lokalen Guides", ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften Antalya-Guide." },
  ru: { toursHeading: "Экскурсии по Анталье с местными гидами", ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного гида в Анталье за 60 секунд." },
  ar: { toursHeading: "جولات أنطاليا مع مرشدين محليين", ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد موثّق في أنطاليا خلال 60 ثانية." },
  es: { toursHeading: "Tours de Antalya con guías locales", ctaSub: "Descarga VibeGuide gratis y encuentra un guía verificado en Antalya en 60 segundos." },
  fr: { toursHeading: "Visites d'Antalya avec guides locaux", ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide vérifié à Antalya en 60 secondes." },
  el: { toursHeading: "Ξεναγήσεις στην Αττάλεια με ντόπιους ξεναγούς", ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ξεναγό στην Αττάλεια σε 60 δευτερόλεπτα." },
  tr: { toursHeading: "Yerel rehberlerle Antalya turları", ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede doğrulanmış bir Antalya rehberiyle eşleş." },
  it: { toursHeading: "Tour di Antalya con guide locali", ctaSub: "Scarica VibeGuide gratis e trova una guida verificata ad Antalya in 60 secondi." },
  pl: { toursHeading: "Wycieczki po Antalyi z lokalnymi przewodnikami", ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego przewodnika w Antalyi w 60 sekund." },
  nl: { toursHeading: "Antalya-tours met lokale gidsen", ctaSub: "Download VibeGuide gratis en vind een geverifieerde gids in Antalya in 60 seconden." },
};

// Pamukkale / Hierapolis (Denizli) ortak metinleri.
const PAM: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: { toursHeading: "Pamukkale tours with local guides", ctaSub: "Download VibeGuide free and match with a verified Pamukkale guide in 60 seconds." },
  de: { toursHeading: "Pamukkale-Touren mit lokalen Guides", ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften Pamukkale-Guide." },
  ru: { toursHeading: "Экскурсии по Памуккале с местными гидами", ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного гида в Памуккале за 60 секунд." },
  ar: { toursHeading: "جولات باموكالي مع مرشدين محليين", ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد موثّق في باموكالي خلال 60 ثانية." },
  es: { toursHeading: "Tours de Pamukkale con guías locales", ctaSub: "Descarga VibeGuide gratis y encuentra un guía verificado en Pamukkale en 60 segundos." },
  fr: { toursHeading: "Visites de Pamukkale avec guides locaux", ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide vérifié à Pamukkale en 60 secondes." },
  el: { toursHeading: "Ξεναγήσεις στο Παμούκαλε με ντόπιους ξεναγούς", ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ξεναγό στο Παμούκαλε σε 60 δευτερόλεπτα." },
  tr: { toursHeading: "Yerel rehberlerle Pamukkale turları", ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede doğrulanmış bir Pamukkale rehberiyle eşleş." },
  it: { toursHeading: "Tour di Pamukkale con guide locali", ctaSub: "Scarica VibeGuide gratis e trova una guida verificata a Pamukkale in 60 secondi." },
  pl: { toursHeading: "Wycieczki po Pamukkale z lokalnymi przewodnikami", ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego przewodnika w Pamukkale w 60 sekund." },
  nl: { toursHeading: "Pamukkale-tours met lokale gidsen", ctaSub: "Download VibeGuide gratis en vind een geverifieerde gids in Pamukkale in 60 seconden." },
};

// Bodrum (kale + antik Halikarnas) ortak metinleri.
const BOD: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: { toursHeading: "Bodrum tours with local guides", ctaSub: "Download VibeGuide free and match with a verified Bodrum guide in 60 seconds." },
  de: { toursHeading: "Bodrum-Touren mit lokalen Guides", ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften Bodrum-Guide." },
  ru: { toursHeading: "Экскурсии по Бодруму с местными гидами", ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного гида в Бодруме за 60 секунд." },
  ar: { toursHeading: "جولات بودروم مع مرشدين محليين", ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد موثّق في بودروم خلال 60 ثانية." },
  es: { toursHeading: "Tours de Bodrum con guías locales", ctaSub: "Descarga VibeGuide gratis y encuentra un guía verificado en Bodrum en 60 segundos." },
  fr: { toursHeading: "Visites de Bodrum avec guides locaux", ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide vérifié à Bodrum en 60 secondes." },
  el: { toursHeading: "Ξεναγήσεις στο Μπόντρουμ με ντόπιους ξεναγούς", ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ξεναγό στο Μπόντρουμ σε 60 δευτερόλεπτα." },
  tr: { toursHeading: "Yerel rehberlerle Bodrum turları", ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede doğrulanmış bir Bodrum rehberiyle eşleş." },
  it: { toursHeading: "Tour di Bodrum con guide locali", ctaSub: "Scarica VibeGuide gratis e trova una guida verificata a Bodrum in 60 secondi." },
  pl: { toursHeading: "Wycieczki po Bodrum z lokalnymi przewodnikami", ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego przewodnika w Bodrum w 60 sekund." },
  nl: { toursHeading: "Bodrum-tours met lokale gidsen", ctaSub: "Download VibeGuide gratis en vind een geverifieerde gids in Bodrum in 60 seconden." },
};

// Şanlıurfa / Göbeklitepe ortak metinleri.
const SAN: Record<AttractionLang, { toursHeading: string; ctaSub: string }> = {
  en: { toursHeading: "Şanlıurfa & Göbeklitepe tours with local guides", ctaSub: "Download VibeGuide free and match with a verified local guide in Şanlıurfa in 60 seconds." },
  de: { toursHeading: "Şanlıurfa- & Göbeklitepe-Touren mit lokalen Guides", ctaSub: "Lade VibeGuide kostenlos und finde in 60 Sekunden einen geprüften lokalen Guide in Şanlıurfa." },
  ru: { toursHeading: "Экскурсии по Шанлыурфе и Гёбекли-Тепе с местными гидами", ctaSub: "Скачайте VibeGuide бесплатно и найдите проверенного гида в Шанлыурфе за 60 секунд." },
  ar: { toursHeading: "جولات شانلي أورفا وغوبكلي تبه مع مرشدين محليين", ctaSub: "حمّل VibeGuide مجانًا واعثر على مرشد محلي موثّق في شانلي أورفا خلال 60 ثانية." },
  es: { toursHeading: "Tours de Şanlıurfa y Göbeklitepe con guías locales", ctaSub: "Descarga VibeGuide gratis y encuentra un guía local verificado en Şanlıurfa en 60 segundos." },
  fr: { toursHeading: "Visites de Şanlıurfa et Göbeklitepe avec guides locaux", ctaSub: "Téléchargez VibeGuide gratuitement et trouvez un guide local vérifié à Şanlıurfa en 60 secondes." },
  el: { toursHeading: "Ξεναγήσεις στη Σανλιούρφα και το Γκιομπεκλί Τεπέ με ντόπιους ξεναγούς", ctaSub: "Κατέβασε δωρεάν το VibeGuide και βρες πιστοποιημένο ντόπιο ξεναγό στη Σανλιούρφα σε 60 δευτερόλεπτα." },
  tr: { toursHeading: "Yerel rehberlerle Şanlıurfa & Göbeklitepe turları", ctaSub: "VibeGuide'ı ücretsiz indir, 60 saniyede Şanlıurfa'da doğrulanmış yerel bir rehberle eşleş." },
  it: { toursHeading: "Tour di Şanlıurfa e Göbeklitepe con guide locali", ctaSub: "Scarica VibeGuide gratis e trova una guida locale verificata a Şanlıurfa in 60 secondi." },
  pl: { toursHeading: "Wycieczki po Şanlıurfie i Göbeklitepe z lokalnymi przewodnikami", ctaSub: "Pobierz VibeGuide za darmo i znajdź zweryfikowanego lokalnego przewodnika w Şanlıurfie w 60 sekund." },
  nl: { toursHeading: "Şanlıurfa- & Göbeklitepe-tours met lokale gidsen", ctaSub: "Download VibeGuide gratis en vind een geverifieerde lokale gids in Şanlıurfa in 60 seconden." },
};

export const ATTRACTIONS: Attraction[] = [
  // ─────────────────────────────── HAGIA SOPHIA ───────────────────────────────
  {
    slug: "hagia-sophia",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🕌",
    image:
      "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1600",
    lat: 41.008587,
    lng: 28.97996,
    i18n: {
      en: {
        name: "Hagia Sophia",
        metaTitle: "Hagia Sophia Tours & Local Guides",
        metaDescription:
          "Explore Hagia Sophia in Istanbul with a verified local guide. Skip the confusion, hear 1,500 years of Byzantine and Ottoman history from a real expert.",
        intro: [
          "Hagia Sophia is the soul of Istanbul — a Byzantine cathedral, an Ottoman mosque, and a monument that has watched over the city for nearly 1,500 years. Its vast dome, golden mosaics and layered history reward those who understand what they are looking at.",
          "With a VibeGuide local expert you skip the guesswork. Hear the stories behind the mosaics, the Viking graffiti, and the building that redefined architecture — at your pace, in your language.",
        ],
        highlights: [
          { title: "The Great Dome", desc: "55 metres high and, for 1,000 years, the largest in the world." },
          { title: "Byzantine Mosaics", desc: "Gold-leaf images of emperors and saints, hidden for centuries." },
          { title: "Layered History", desc: "Cathedral, mosque, museum, mosque again — every era left a mark." },
        ],
        faqs: [
          { q: "Do I need a guide for Hagia Sophia?", a: "It's open to all, but the history is invisible without context. A local guide turns a beautiful room into 1,500 years of stories — and helps you avoid the busiest hours." },
          { q: "Is Hagia Sophia free to visit?", a: "Entry rules change over time. A VibeGuide guide tells you the current situation and the best time to go before you book." },
          { q: "How long does a visit take?", a: "Most guided visits run 1–2 hours, often combined with the Blue Mosque and Sultanahmet square nearby." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Hagia Sophia sits in the heart of Sultanahmet, the old city, and could not be easier to reach. Take the T1 tram to the Sultanahmet stop and you are just a short walk from the entrance. It stands directly across the square from the Blue Mosque, with Topkapi Palace and the Basilica Cistern all within a few minutes on foot, so it slots naturally into a day exploring the historic peninsula.",
          "Come early in the morning if you can. The soft light pouring through the upper windows is at its most beautiful just after opening, and the vast prayer hall is far quieter before the midday tour groups arrive. Spring and autumn offer the most comfortable weather and thinner crowds than high summer. Remember it is now a working mosque, so it closes to tourists during the five daily prayers.",
          "Entry is free, but this is a place of worship, so dress modestly with shoulders and knees covered, and women should bring a headscarf. Once inside it is easy to feel lost beneath the immense dome without knowing what you are looking at. A licensed VibeGuide local guide arranges your timing around the prayer schedule, helps you avoid the busiest hours, and brings the Byzantine mosaics and centuries of layered history to life.",
        ],
        ctaTitle: "See Hagia Sophia with a local",
        ...IST.en,
      },
      de: {
        name: "Hagia Sophia",
        metaTitle: "Hagia Sophia Touren & lokale Guides",
        metaDescription:
          "Entdecke die Hagia Sophia in Istanbul mit einem geprüften lokalen Guide. 1.500 Jahre byzantinische und osmanische Geschichte von einem echten Experten.",
        intro: [
          "Die Hagia Sophia ist die Seele Istanbuls — byzantinische Kathedrale, osmanische Moschee und ein Monument, das seit fast 1.500 Jahren über die Stadt wacht. Ihre gewaltige Kuppel, die goldenen Mosaike und die vielschichtige Geschichte belohnen alle, die verstehen, was sie sehen.",
          "Mit einem lokalen VibeGuide-Experten sparst du dir das Rätselraten. Höre die Geschichten hinter den Mosaiken, den Wikinger-Graffiti und dem Bau, der die Architektur neu definierte — in deinem Tempo, in deiner Sprache.",
        ],
        highlights: [
          { title: "Die große Kuppel", desc: "55 Meter hoch und 1.000 Jahre lang die größte der Welt." },
          { title: "Byzantinische Mosaike", desc: "Goldene Bilder von Kaisern und Heiligen, jahrhundertelang verborgen." },
          { title: "Vielschichtige Geschichte", desc: "Kathedrale, Moschee, Museum, wieder Moschee — jede Epoche hinterließ Spuren." },
        ],
        faqs: [
          { q: "Brauche ich einen Guide für die Hagia Sophia?", a: "Sie ist für alle zugänglich, aber die Geschichte bleibt ohne Kontext unsichtbar. Ein lokaler Guide macht aus einem schönen Raum 1.500 Jahre Geschichten — und hilft dir, die vollsten Stunden zu meiden." },
          { q: "Ist der Eintritt in die Hagia Sophia frei?", a: "Die Eintrittsregeln ändern sich. Ein VibeGuide-Guide nennt dir die aktuelle Lage und die beste Besuchszeit, bevor du buchst." },
          { q: "Wie lange dauert ein Besuch?", a: "Die meisten geführten Besuche dauern 1–2 Stunden, oft kombiniert mit der nahen Blauen Moschee und dem Sultanahmet-Platz." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Die Hagia Sophia liegt im Herzen von Sultanahmet, der Altstadt, und ist denkbar einfach zu erreichen. Nimm die T1-Straßenbahn bis zur Haltestelle Sultanahmet, von dort sind es nur wenige Schritte bis zum Eingang. Sie steht direkt gegenüber der Blauen Moschee, und der Topkapı-Palast sowie die Cisterna Basilica liegen nur Minuten entfernt, sodass sie sich mühelos in einen Tag auf der historischen Halbinsel einfügt.",
          "Komm möglichst früh am Morgen. Das weiche Licht, das durch die oberen Fenster fällt, ist kurz nach der Öffnung am schönsten, und der riesige Gebetsraum ist deutlich ruhiger, bevor mittags die Reisegruppen eintreffen. Frühling und Herbst bieten das angenehmste Wetter und weniger Andrang als der Hochsommer. Denk daran: Sie ist heute eine aktive Moschee und bleibt während der fünf täglichen Gebete für Touristen geschlossen.",
          "Der Eintritt ist frei, doch dies ist ein Gebetsort. Kleide dich zurückhaltend mit bedeckten Schultern und Knien, und Frauen sollten ein Kopftuch mitbringen. Im Inneren fühlt man sich unter der gewaltigen Kuppel schnell verloren, ohne zu wissen, was man sieht. Ein lizenzierter VibeGuide-Guide vor Ort stimmt deinen Besuch auf die Gebetszeiten ab, hilft dir, die vollsten Stunden zu meiden, und erweckt die byzantinischen Mosaike und die vielschichtige Geschichte zum Leben.",
        ],
        ctaTitle: "Erlebe die Hagia Sophia mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Айя-София",
        metaTitle: "Айя-София: экскурсии с местными гидами",
        metaDescription:
          "Посетите Айя-Софию в Стамбуле с проверенным местным гидом. 1500 лет византийской и османской истории от настоящего эксперта.",
        intro: [
          "Айя-София — душа Стамбула: византийский собор, османская мечеть и памятник, что почти 1500 лет хранит город. Огромный купол, золотые мозаики и многослойная история раскрываются тем, кто понимает, на что смотрит.",
          "С местным экспертом VibeGuide не нужно гадать. Услышьте истории за мозаиками, граффити викингов и зданием, изменившим архитектуру — в своём ритме и на своём языке.",
        ],
        highlights: [
          { title: "Великий купол", desc: "55 метров в высоту — тысячу лет самый большой в мире." },
          { title: "Византийские мозаики", desc: "Золотые образы императоров и святых, скрытые веками." },
          { title: "Слои истории", desc: "Собор, мечеть, музей и снова мечеть — каждая эпоха оставила след." },
        ],
        faqs: [
          { q: "Нужен ли гид для Айя-Софии?", a: "Вход открыт всем, но без контекста история невидима. Местный гид превращает красивый зал в 1500 лет историй и помогает избежать часов пик." },
          { q: "Вход в Айя-Софию бесплатный?", a: "Правила входа меняются. Гид VibeGuide подскажет актуальную ситуацию и лучшее время для визита до бронирования." },
          { q: "Сколько длится посещение?", a: "Обычно экскурсия занимает 1–2 часа, часто вместе с Голубой мечетью и площадью Султанахмет рядом." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Собор Святой Софии находится в самом сердце Султанахмета, старого города, и добраться до него совсем несложно. Доезжайте на трамвае T1 до остановки Sultanahmet, и вход окажется всего в паре минут ходьбы. Он стоит прямо напротив Голубой мечети, а дворец Топкапы и цистерна Базилика находятся в нескольких минутах пешком, так что он естественно вписывается в день прогулки по историческому полуострову.",
          "Приходите пораньше утром, если получится. Мягкий свет, льющийся сквозь верхние окна, особенно красив сразу после открытия, а огромный молитвенный зал гораздо спокойнее, пока к полудню не подошли туристические группы. Весна и осень дарят самую приятную погоду и меньше народа, чем разгар лета. Помните, что теперь это действующая мечеть и она закрыта для туристов во время пяти ежедневных молитв.",
          "Вход бесплатный, но это место молитвы, поэтому одевайтесь скромно, прикрыв плечи и колени, а женщинам стоит взять платок. Внутри легко растеряться под огромным куполом, не понимая, на что смотришь. Лицензированный местный гид VibeGuide подстроит ваше посещение под расписание молитв, поможет избежать самых людных часов и оживит византийские мозаики и многовековую напластованную историю.",
        ],
        ctaTitle: "Увидеть Айя-Софию с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "آيا صوفيا",
        metaTitle: "جولات آيا صوفيا مع مرشدين محليين",
        metaDescription:
          "اكتشف آيا صوفيا في إسطنبول مع مرشد محلي موثّق. 1500 عام من التاريخ البيزنطي والعثماني من خبير حقيقي.",
        intro: [
          "آيا صوفيا هي روح إسطنبول — كاتدرائية بيزنطية، ومسجد عثماني، ومَعلَم يحرس المدينة منذ نحو 1500 عام. قبتها الضخمة وفسيفساؤها الذهبية وتاريخها المتعدد الطبقات تكافئ من يفهم ما يراه.",
          "مع خبير محلي من VibeGuide لا داعي للتخمين. استمع إلى القصص خلف الفسيفساء، وكتابات الفايكنغ، والمبنى الذي أعاد تعريف العمارة — على إيقاعك وبلغتك.",
        ],
        highlights: [
          { title: "القبة العظيمة", desc: "بارتفاع 55 مترًا، وكانت الأكبر في العالم لألف عام." },
          { title: "الفسيفساء البيزنطية", desc: "صور ذهبية للأباطرة والقديسين، ظلّت مخفية لقرون." },
          { title: "تاريخ متعدد الطبقات", desc: "كاتدرائية، مسجد، متحف، ثم مسجد من جديد — كل عصر ترك أثره." },
        ],
        faqs: [
          { q: "هل أحتاج إلى مرشد لزيارة آيا صوفيا؟", a: "المكان مفتوح للجميع، لكن التاريخ يبقى خفيًا دون سياق. المرشد المحلي يحوّل القاعة الجميلة إلى 1500 عام من القصص، ويساعدك على تجنّب أوقات الزحام." },
          { q: "هل دخول آيا صوفيا مجاني؟", a: "تتغيّر قواعد الدخول مع الوقت. يخبرك مرشد VibeGuide بالوضع الحالي وأفضل وقت للزيارة قبل الحجز." },
          { q: "كم تستغرق الزيارة؟", a: "تستغرق معظم الجولات 1–2 ساعة، وغالبًا تُدمج مع المسجد الأزرق وساحة السلطان أحمد القريبة." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "تقع آيا صوفيا في قلب حي السلطان أحمد بالمدينة القديمة، والوصول إليها في غاية السهولة. استقل ترام T1 حتى محطة السلطان أحمد، ولن يفصلك عن المدخل سوى مسافة قصيرة سيرًا على الأقدام. تنتصب مباشرة مقابل المسجد الأزرق عبر الساحة، بينما يقع قصر توبكابي وصهريج البازيليك على بُعد دقائق مشيًا، فتنسجم بطبيعتها ضمن يوم لاستكشاف شبه الجزيرة التاريخية.",
          "تعال في الصباح الباكر إن استطعت. فالضوء الناعم المتسلل من النوافذ العلوية يبلغ أجمل حالاته بُعيد الافتتاح، وتكون قاعة الصلاة الشاسعة أكثر هدوءًا قبل وصول المجموعات السياحية عند الظهيرة. يمنحك الربيع والخريف أفضل طقس وأقل ازدحامًا من ذروة الصيف. وتذكّر أنها اليوم مسجد عامل، لذا تُغلق أمام الزوار خلال الصلوات الخمس اليومية.",
          "الدخول مجاني، لكنه مكان للعبادة، فارتدِ ملابس محتشمة تغطي الكتفين والركبتين، وينبغي للنساء إحضار غطاء للرأس. وما إن تدخل حتى يسهل أن تشعر بالتِّيه تحت القبة الهائلة دون أن تدرك ما تراه. يرتّب لك مرشد VibeGuide المحلي المرخّص توقيت زيارتك حول مواعيد الصلاة، ويساعدك على تجنّب أكثر الساعات ازدحامًا، ويُحيي أمامك الفسيفساء البيزنطية وطبقات التاريخ المتراكمة عبر القرون.",
        ],
        ctaTitle: "زر آيا صوفيا مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Santa Sofía",
        metaTitle: "Tours de Santa Sofía con guías locales",
        metaDescription:
          "Descubre Santa Sofía en Estambul con un guía local verificado. 1.500 años de historia bizantina y otomana de la mano de un experto real.",
        intro: [
          "Santa Sofía es el alma de Estambul: catedral bizantina, mezquita otomana y un monumento que vela por la ciudad desde hace casi 1.500 años. Su enorme cúpula, sus mosaicos dorados y su historia en capas recompensan a quien entiende lo que mira.",
          "Con un experto local de VibeGuide te ahorras las dudas. Escucha las historias tras los mosaicos, el grafiti vikingo y el edificio que redefinió la arquitectura — a tu ritmo y en tu idioma.",
        ],
        highlights: [
          { title: "La gran cúpula", desc: "55 metros de altura y, durante 1.000 años, la mayor del mundo." },
          { title: "Mosaicos bizantinos", desc: "Imágenes en pan de oro de emperadores y santos, ocultas durante siglos." },
          { title: "Historia en capas", desc: "Catedral, mezquita, museo y de nuevo mezquita — cada época dejó su huella." },
        ],
        faqs: [
          { q: "¿Necesito un guía para Santa Sofía?", a: "Está abierta a todos, pero la historia es invisible sin contexto. Un guía local convierte una sala bella en 1.500 años de relatos y te ayuda a evitar las horas más llenas." },
          { q: "¿La entrada a Santa Sofía es gratuita?", a: "Las normas de entrada cambian con el tiempo. Un guía de VibeGuide te dice la situación actual y la mejor hora para ir antes de reservar." },
          { q: "¿Cuánto dura la visita?", a: "La mayoría de las visitas guiadas duran 1–2 horas, a menudo combinadas con la Mezquita Azul y la plaza de Sultanahmet, muy cerca." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Santa Sofía se encuentra en el corazón de Sultanahmet, la ciudad vieja, y llegar no puede ser más sencillo. Toma el tranvía T1 hasta la parada Sultanahmet y estarás a un breve paseo de la entrada. Se alza justo enfrente de la Mezquita Azul, al otro lado de la plaza, y el Palacio de Topkapi y la Cisterna Basílica quedan a pocos minutos a pie, así que encaja de forma natural en un día por la península histórica.",
          "Ven temprano por la mañana si puedes. La luz suave que entra por las ventanas superiores es más hermosa justo después de la apertura, y la inmensa sala de oración está mucho más tranquila antes de que lleguen los grupos al mediodía. La primavera y el otoño ofrecen el clima más agradable y menos gente que en pleno verano. Recuerda que hoy es una mezquita en uso y cierra al turismo durante los cinco rezos diarios.",
          "La entrada es gratuita, pero es un lugar de culto, así que vístete con recato cubriendo hombros y rodillas, y las mujeres deben llevar un pañuelo para la cabeza. Una vez dentro, es fácil sentirse perdido bajo la enorme cúpula sin saber qué estás mirando. Un guía local titulado de VibeGuide ajusta tu horario a los rezos, te ayuda a evitar las horas de más gentío y da vida a los mosaicos bizantinos y a siglos de historia superpuesta.",
        ],
        ctaTitle: "Visita Santa Sofía con un local",
        ...IST.es,
      },
      fr: {
        name: "Sainte-Sophie",
        metaTitle: "Visites de Sainte-Sophie avec guides locaux",
        metaDescription:
          "Découvrez Sainte-Sophie à Istanbul avec un guide local vérifié. 1 500 ans d'histoire byzantine et ottomane par un véritable expert.",
        intro: [
          "Sainte-Sophie est l'âme d'Istanbul : cathédrale byzantine, mosquée ottomane et monument qui veille sur la ville depuis près de 1 500 ans. Son immense coupole, ses mosaïques dorées et son histoire en strates récompensent ceux qui comprennent ce qu'ils regardent.",
          "Avec un expert local VibeGuide, fini les devinettes. Écoutez les récits derrière les mosaïques, les graffitis vikings et l'édifice qui a redéfini l'architecture — à votre rythme et dans votre langue.",
        ],
        highlights: [
          { title: "La grande coupole", desc: "55 mètres de haut et, pendant 1 000 ans, la plus grande du monde." },
          { title: "Mosaïques byzantines", desc: "Images à la feuille d'or d'empereurs et de saints, cachées des siècles durant." },
          { title: "Histoire en strates", desc: "Cathédrale, mosquée, musée, à nouveau mosquée — chaque époque a laissé sa marque." },
        ],
        faqs: [
          { q: "Ai-je besoin d'un guide pour Sainte-Sophie ?", a: "Le lieu est ouvert à tous, mais l'histoire reste invisible sans contexte. Un guide local transforme une belle salle en 1 500 ans de récits et vous aide à éviter les heures d'affluence." },
          { q: "L'entrée à Sainte-Sophie est-elle gratuite ?", a: "Les règles d'entrée évoluent. Un guide VibeGuide vous indique la situation actuelle et le meilleur moment pour la visite avant de réserver." },
          { q: "Combien de temps dure la visite ?", a: "La plupart des visites guidées durent 1 à 2 heures, souvent combinées avec la Mosquée Bleue et la place Sultanahmet, toutes proches." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Sainte-Sophie se dresse au cœur de Sultanahmet, la vieille ville, et rien n'est plus simple que d'y aller. Prenez le tramway T1 jusqu'à l'arrêt Sultanahmet, l'entrée n'est plus qu'à quelques pas. Elle fait face à la Mosquée Bleue, de l'autre côté de la place, tandis que le palais de Topkapi et la Citerne Basilique se trouvent à quelques minutes à pied, ce qui l'intègre naturellement à une journée sur la péninsule historique.",
          "Venez tôt le matin si vous le pouvez. La lumière douce qui filtre par les fenêtres hautes est la plus belle juste après l'ouverture, et l'immense salle de prière est bien plus paisible avant l'arrivée des groupes à la mi-journée. Le printemps et l'automne offrent le climat le plus agréable et moins de monde qu'en plein été. Souvenez-vous qu'il s'agit désormais d'une mosquée en activité, fermée aux touristes pendant les cinq prières quotidiennes.",
          "L'entrée est gratuite, mais c'est un lieu de culte : habillez-vous sobrement, épaules et genoux couverts, et les femmes doivent prévoir un foulard. Une fois à l'intérieur, on se sent vite perdu sous l'immense coupole sans savoir ce que l'on regarde. Un guide local agréé VibeGuide cale votre visite sur l'horaire des prières, vous aide à éviter les heures d'affluence et fait revivre les mosaïques byzantines et des siècles d'histoire superposée.",
        ],
        ctaTitle: "Visitez Sainte-Sophie avec un local",
        ...IST.fr,
      },
      el: {
        name: "Αγία Σοφία",
        metaTitle: "Ξεναγήσεις στην Αγία Σοφία με ντόπιους ξεναγούς",
        metaDescription:
          "Εξερεύνησε την Αγία Σοφία στην Κωνσταντινούπολη με πιστοποιημένο ντόπιο ξεναγό. 1.500 χρόνια βυζαντινής και οθωμανικής ιστορίας από έναν πραγματικό ειδικό.",
        intro: [
          "Η Αγία Σοφία είναι η ψυχή της Κωνσταντινούπολης — βυζαντινός καθεδρικός, οθωμανικό τζαμί και μνημείο που φυλά την πόλη σχεδόν 1.500 χρόνια. Ο τεράστιος τρούλος, τα χρυσά ψηφιδωτά και η πολυεπίπεδη ιστορία ανταμείβουν όποιον καταλαβαίνει τι κοιτάζει.",
          "Με έναν ντόπιο ειδικό του VibeGuide δεν χρειάζεται να μαντεύεις. Άκου τις ιστορίες πίσω από τα ψηφιδωτά, τα γκράφιτι των Βίκινγκ και το κτίριο που επαναπροσδιόρισε την αρχιτεκτονική — με τον δικό σου ρυθμό, στη γλώσσα σου.",
        ],
        highlights: [
          { title: "Ο μεγάλος τρούλος", desc: "Ύψος 55 μέτρα — για 1.000 χρόνια ο μεγαλύτερος στον κόσμο." },
          { title: "Βυζαντινά ψηφιδωτά", desc: "Χρυσές μορφές αυτοκρατόρων και αγίων, κρυμμένες για αιώνες." },
          { title: "Πολυεπίπεδη ιστορία", desc: "Καθεδρικός, τζαμί, μουσείο, ξανά τζαμί — κάθε εποχή άφησε το σημάδι της." },
        ],
        faqs: [
          { q: "Χρειάζομαι ξεναγό για την Αγία Σοφία;", a: "Είναι ανοιχτή σε όλους, αλλά η ιστορία μένει αόρατη χωρίς πλαίσιο. Ένας ντόπιος ξεναγός μετατρέπει έναν όμορφο χώρο σε 1.500 χρόνια ιστοριών και σε βοηθά να αποφύγεις τις ώρες αιχμής." },
          { q: "Είναι δωρεάν η είσοδος στην Αγία Σοφία;", a: "Οι κανόνες εισόδου αλλάζουν. Ένας ξεναγός του VibeGuide σου λέει την τρέχουσα κατάσταση και την καλύτερη ώρα πριν κλείσεις." },
          { q: "Πόσο διαρκεί η επίσκεψη;", a: "Οι περισσότερες ξεναγήσεις διαρκούν 1–2 ώρες, συχνά σε συνδυασμό με το Μπλε Τζαμί και την πλατεία Σουλταναχμέτ δίπλα." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Η Αγία Σοφία βρίσκεται στην καρδιά του Σουλταναχμέτ, της παλιάς πόλης, και η πρόσβαση δεν θα μπορούσε να είναι πιο εύκολη. Πάρτε το τραμ T1 μέχρι τη στάση Sultanahmet και θα βρεθείτε λίγα βήματα από την είσοδο. Στέκεται ακριβώς απέναντι από το Μπλε Τζαμί, ενώ το Ανάκτορο Τοπκαπί και η Κινστέρνα Βασιλική απέχουν λίγα λεπτά με τα πόδια, οπότε εντάσσεται φυσικά σε μια μέρα στην ιστορική χερσόνησο.",
          "Ελάτε νωρίς το πρωί αν μπορείτε. Το απαλό φως που χύνεται από τα ψηλά παράθυρα είναι πιο όμορφο αμέσως μετά το άνοιγμα, και η τεράστια αίθουσα προσευχής είναι πολύ πιο ήσυχη πριν φτάσουν το μεσημέρι τα γκρουπ. Η άνοιξη και το φθινόπωρο προσφέρουν τον πιο ευχάριστο καιρό και λιγότερο κόσμο από την καρδιά του καλοκαιριού. Θυμηθείτε πως σήμερα είναι ενεργό τζαμί και κλείνει για τους τουρίστες κατά τις πέντε καθημερινές προσευχές.",
          "Η είσοδος είναι δωρεάν, όμως είναι χώρος λατρείας, γι' αυτό ντυθείτε σεμνά με καλυμμένους ώμους και γόνατα, και οι γυναίκες καλό είναι να έχουν μαντίλα. Μόλις μπείτε, εύκολα νιώθετε χαμένοι κάτω από τον τεράστιο τρούλο χωρίς να ξέρετε τι κοιτάτε. Ένας αδειούχος τοπικός ξεναγός της VibeGuide προσαρμόζει την επίσκεψή σας στο ωράριο των προσευχών, σας βοηθά να αποφύγετε τις πιο πολύβουες ώρες και ζωντανεύει τα βυζαντινά ψηφιδωτά και αιώνες ιστορίας.",
        ],
        ctaTitle: "Δες την Αγία Σοφία με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Ayasofya",
        metaTitle: "Ayasofya Turları & Yerel Rehberler",
        metaDescription:
          "Ayasofya'yı doğrulanmış bir yerel rehberle gez. 1.500 yıllık Bizans ve Osmanlı tarihini gerçek bir uzmandan dinle.",
        intro: [
          "Ayasofya İstanbul'un ruhudur — Bizans katedrali, Osmanlı camii ve şehri yaklaşık 1.500 yıldır izleyen bir anıt. Devasa kubbesi, altın mozaikleri ve katman katman tarihi, ne baktığını anlayanları ödüllendirir.",
          "VibeGuide yerel uzmanıyla tahmin yürütmene gerek kalmaz. Mozaiklerin, Viking yazıtlarının ve mimariyi yeniden tanımlayan yapının ardındaki hikâyeleri kendi temponda, kendi dilinde dinle.",
        ],
        highlights: [
          { title: "Büyük Kubbe", desc: "55 metre yükseklikte ve 1.000 yıl boyunca dünyanın en büyüğü." },
          { title: "Bizans Mozaikleri", desc: "İmparator ve azizlerin altın varaklı tasvirleri, yüzyıllarca gizli kaldı." },
          { title: "Katmanlı Tarih", desc: "Katedral, cami, müze, yine cami — her dönem iz bıraktı." },
        ],
        faqs: [
          { q: "Ayasofya için rehbere ihtiyacım var mı?", a: "Herkese açık ama bağlam olmadan tarih görünmez. Yerel rehber güzel bir mekânı 1.500 yıllık hikâyeye dönüştürür ve en kalabalık saatlerden kaçınmana yardım eder." },
          { q: "Ayasofya'ya giriş ücretsiz mi?", a: "Giriş kuralları zamanla değişiyor. Bir VibeGuide rehberi, rezervasyondan önce güncel durumu ve en iyi ziyaret saatini söyler." },
          { q: "Ziyaret ne kadar sürer?", a: "Çoğu rehberli ziyaret 1–2 saat sürer, çoğu zaman yakındaki Sultanahmet Camii ve meydanla birleştirilir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Ayasofya, eski şehrin kalbi Sultanahmet'te yer alır ve ulaşımı son derece kolaydır. T1 tramvayına binip Sultanahmet durağında inin; giriş yalnızca kısa bir yürüyüş mesafesinde. Meydanın tam karşısında Sultanahmet Camii, birkaç dakikalık yürüyüş uzağında ise Topkapı Sarayı ve Yerebatan Sarnıcı bulunur; böylece tarihi yarımadayı gezdiğiniz bir güne doğal olarak yerleşir.",
          "Mümkünse sabah erken saatte gelin. Üst pencerelerden süzülen yumuşak ışık açılıştan hemen sonra en güzel halindedir ve devasa ibadet alanı, öğlene doğru turist grupları gelmeden çok daha sakindir. İlkbahar ve sonbahar, yaz ortasına göre hem daha keyifli hava hem de daha az kalabalık sunar. Unutmayın, burası artık faal bir camidir ve beş vakit namaz süresince ziyaretçilere kapalıdır.",
          "Giriş ücretsizdir, ancak burası bir ibadethanedir; omuzları ve dizleri örten sade bir kıyafet giyin, kadınlar başörtüsü bulundursun. İçeri girince, ne gördüğünüzü bilmeden o muazzam kubbenin altında kolayca kaybolmuş hissedebilirsiniz. Ruhsatlı bir VibeGuide yerel rehberi ziyaretinizi namaz vakitlerine göre ayarlar, en kalabalık saatlerden kaçınmanıza yardım eder ve Bizans mozaikleriyle yüzyılların iç içe geçmiş tarihini canlandırır.",
        ],
        ctaTitle: "Ayasofya'yı bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Basilica di Santa Sofia",
        metaTitle: "Tour di Santa Sofia con guide locali",
        metaDescription:
          "Esplora Santa Sofia a Istanbul con una guida locale verificata. Niente confusione: ascolta 1.500 anni di storia bizantina e ottomana da un vero esperto.",
        intro: [
          "Santa Sofia è l'anima di Istanbul: cattedrale bizantina, moschea ottomana e monumento che veglia sulla città da quasi 1.500 anni. La sua immensa cupola, i mosaici dorati e la storia stratificata premiano chi capisce ciò che ha davanti.",
          "Con un esperto locale di VibeGuide non devi tirare a indovinare. Ascolta le storie dietro i mosaici, i graffiti vichinghi e l'edificio che ha ridefinito l'architettura — al tuo ritmo e nella tua lingua.",
        ],
        highlights: [
          { title: "La grande cupola", desc: "Alta 55 metri e, per 1.000 anni, la più grande del mondo." },
          { title: "Mosaici bizantini", desc: "Immagini in foglia d'oro di imperatori e santi, nascoste per secoli." },
          { title: "Storia stratificata", desc: "Cattedrale, moschea, museo e di nuovo moschea — ogni epoca ha lasciato il segno." },
        ],
        faqs: [
          { q: "Serve una guida per Santa Sofia?", a: "È aperta a tutti, ma senza contesto la storia resta invisibile. Una guida locale trasforma una bella sala in 1.500 anni di racconti e ti aiuta a evitare le ore più affollate." },
          { q: "L'ingresso a Santa Sofia è gratuito?", a: "Le regole d'ingresso cambiano nel tempo. Una guida VibeGuide ti dice la situazione attuale e il momento migliore per andare prima che tu prenoti." },
          { q: "Quanto dura la visita?", a: "La maggior parte delle visite guidate dura 1–2 ore, spesso abbinate alla vicina Moschea Blu e alla piazza di Sultanahmet." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Santa Sofia sorge nel cuore di Sultanahmet, la città vecchia, e raggiungerla è quanto di più semplice. Prendi il tram T1 fino alla fermata Sultanahmet e l'ingresso sarà a pochi passi. Si erge proprio di fronte alla Moschea Blu, dall'altra parte della piazza, mentre il Palazzo Topkapi e la Cisterna Basilica distano pochi minuti a piedi, così da inserirsi con naturalezza in una giornata dedicata alla penisola storica.",
          "Vieni di mattina presto, se puoi. La luce morbida che filtra dalle finestre alte è più bella subito dopo l'apertura, e l'immensa sala di preghiera è molto più tranquilla prima dell'arrivo dei gruppi a mezzogiorno. La primavera e l'autunno offrono il clima più piacevole e meno folla rispetto alla piena estate. Ricorda che oggi è una moschea in funzione e chiude ai turisti durante le cinque preghiere quotidiane.",
          "L'ingresso è gratuito, ma è un luogo di culto: vestiti in modo sobrio con spalle e ginocchia coperte, e le donne portino un foulard per il capo. Una volta dentro è facile sentirsi persi sotto l'enorme cupola senza sapere cosa si sta guardando. Una guida locale abilitata di VibeGuide organizza la visita attorno agli orari delle preghiere, ti aiuta a evitare le ore più affollate e dà vita ai mosaici bizantini e a secoli di storia stratificata.",
        ],
        ctaTitle: "Scopri Santa Sofia con un locale",
        ...IST.it,
      },
      pl: {
        name: "Hagia Sophia",
        metaTitle: "Hagia Sophia — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Hagię Sophię w Stambule z zweryfikowanym lokalnym przewodnikiem. Bez chaosu — poznaj 1500 lat historii bizantyjskiej i osmańskiej od prawdziwego eksperta.",
        intro: [
          "Hagia Sophia to dusza Stambułu — bizantyjska katedra, osmański meczet i zabytek, który czuwa nad miastem od niemal 1500 lat. Ogromna kopuła, złote mozaiki i wielowarstwowa historia nagradzają tych, którzy rozumieją, na co patrzą.",
          "Z lokalnym ekspertem VibeGuide nie musisz niczego zgadywać. Poznaj historie kryjące się za mozaikami, wikińskie graffiti i budowlę, która na nowo zdefiniowała architekturę — we własnym tempie i w swoim języku.",
        ],
        highlights: [
          { title: "Wielka kopuła", desc: "Wysoka na 55 metrów i przez 1000 lat największa na świecie." },
          { title: "Bizantyjskie mozaiki", desc: "Złocone wizerunki cesarzy i świętych, ukryte przez stulecia." },
          { title: "Wielowarstwowa historia", desc: "Katedra, meczet, muzeum i znów meczet — każda epoka zostawiła ślad." },
        ],
        faqs: [
          { q: "Czy potrzebuję przewodnika w Hagii Sophii?", a: "Wstęp jest dla wszystkich, ale bez kontekstu historia pozostaje niewidzialna. Lokalny przewodnik zamienia piękną salę w 1500 lat opowieści i pomaga uniknąć najbardziej zatłoczonych godzin." },
          { q: "Czy wstęp do Hagii Sophii jest bezpłatny?", a: "Zasady wstępu z czasem się zmieniają. Przewodnik VibeGuide powie Ci, jak jest teraz i kiedy najlepiej się wybrać, zanim zarezerwujesz." },
          { q: "Ile trwa zwiedzanie?", a: "Większość wycieczek z przewodnikiem trwa 1–2 godziny, często łączonych z pobliskim Błękitnym Meczetem i placem Sultanahmet." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Hagia Sophia leży w sercu Sultanahmet, starego miasta, a dotarcie do niej nie mogłoby być prostsze. Wsiądź w tramwaj T1 do przystanku Sultanahmet, a od wejścia dzieli cię już tylko krótki spacer. Stoi dokładnie naprzeciw Błękitnego Meczetu, po drugiej stronie placu, natomiast Pałac Topkapi i Cysterna Bazyliki są o kilka minut pieszo, więc naturalnie wpisuje się w dzień zwiedzania historycznego półwyspu.",
          "Przyjdź wczesnym rankiem, jeśli możesz. Miękkie światło wpadające przez górne okna jest najpiękniejsze zaraz po otwarciu, a ogromna sala modlitewna jest znacznie spokojniejsza, zanim w południe pojawią się wycieczki. Wiosna i jesień dają najprzyjemniejszą pogodę i mniejszy tłok niż w pełni lata. Pamiętaj, że dziś jest to czynny meczet i zamyka się dla turystów podczas pięciu codziennych modlitw.",
          "Wstęp jest bezpłatny, ale to miejsce kultu, więc ubierz się skromnie, zakrywając ramiona i kolana, a kobiety powinny mieć chustę na głowę. W środku łatwo poczuć się zagubionym pod ogromną kopułą, nie wiedząc, na co się patrzy. Licencjonowany lokalny przewodnik VibeGuide dopasuje twoją wizytę do godzin modlitw, pomoże ominąć najbardziej zatłoczone pory i ożywi bizantyjskie mozaiki oraz wieki nawarstwionej historii.",
        ],
        ctaTitle: "Zobacz Hagię Sophię z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Hagia Sophia",
        metaTitle: "Hagia Sophia-tours & lokale gidsen",
        metaDescription:
          "Verken de Hagia Sophia in Istanbul met een geverifieerde lokale gids. Geen verwarring — hoor 1.500 jaar Byzantijnse en Ottomaanse geschiedenis van een echte expert.",
        intro: [
          "De Hagia Sophia is de ziel van Istanbul — een Byzantijnse kathedraal, een Ottomaanse moskee en een monument dat al bijna 1.500 jaar over de stad waakt. De enorme koepel, de gouden mozaïeken en de gelaagde geschiedenis belonen wie begrijpt waar hij naar kijkt.",
          "Met een lokale VibeGuide-expert hoef je niet te gissen. Hoor de verhalen achter de mozaïeken, de Vikinggraffiti en het gebouw dat de architectuur opnieuw definieerde — in jouw tempo en in jouw taal.",
        ],
        highlights: [
          { title: "De grote koepel", desc: "55 meter hoog en 1.000 jaar lang de grootste ter wereld." },
          { title: "Byzantijnse mozaïeken", desc: "Bladgouden beelden van keizers en heiligen, eeuwenlang verborgen." },
          { title: "Gelaagde geschiedenis", desc: "Kathedraal, moskee, museum en opnieuw moskee — elk tijdperk liet zijn sporen na." },
        ],
        faqs: [
          { q: "Heb ik een gids nodig voor de Hagia Sophia?", a: "Ze is voor iedereen toegankelijk, maar zonder context blijft de geschiedenis onzichtbaar. Een lokale gids maakt van een mooie zaal 1.500 jaar verhalen — en helpt je de drukste uren te vermijden." },
          { q: "Is de Hagia Sophia gratis te bezoeken?", a: "De toegangsregels veranderen met de tijd. Een VibeGuide-gids vertelt je de actuele situatie en het beste moment om te gaan voordat je boekt." },
          { q: "Hoe lang duurt een bezoek?", a: "De meeste rondleidingen duren 1–2 uur, vaak gecombineerd met de nabijgelegen Blauwe Moskee en het Sultanahmet-plein." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Hagia Sophia ligt in het hart van Sultanahmet, de oude stad, en is bijzonder eenvoudig te bereiken. Neem de T1-tram tot halte Sultanahmet en de ingang ligt op korte loopafstand. Ze staat recht tegenover de Blauwe Moskee, aan de overkant van het plein, terwijl het Topkapipaleis en de Basilica Cisterne op enkele minuten lopen liggen, zodat ze vanzelf past in een dag over het historische schiereiland.",
          "Kom 's ochtends vroeg als het kan. Het zachte licht dat door de bovenramen valt is het mooist vlak na opening, en de enorme gebedsruimte is veel rustiger voordat rond het middaguur de reisgroepen arriveren. Lente en herfst bieden het aangenaamste weer en minder drukte dan het hoogseizoen. Denk eraan dat het nu een werkende moskee is en tijdens de vijf dagelijkse gebeden gesloten is voor toeristen.",
          "De toegang is gratis, maar het is een gebedsplaats, dus kleed je bescheiden met bedekte schouders en knieën, en vrouwen nemen best een hoofddoek mee. Eenmaal binnen voel je je snel verloren onder de immense koepel zonder te weten waar je naar kijkt. Een erkende lokale VibeGuide-gids stemt je bezoek af op de gebedstijden, helpt je de drukste uren te vermijden en brengt de Byzantijnse mozaïeken en eeuwen gelaagde geschiedenis tot leven.",
        ],
        ctaTitle: "Bezoek de Hagia Sophia met een local",
        ...IST.nl,
      },

    },
  },

  // ─────────────────────────────── TOPKAPI PALACE ─────────────────────────────
  {
    slug: "topkapi-palace",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🏰",
    image:
      "https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=1600",
    lat: 41.011577,
    lng: 28.983416,
    i18n: {
      en: {
        name: "Topkapi Palace",
        metaTitle: "Topkapi Palace Tours & Local Guides",
        metaDescription:
          "Discover Topkapi Palace, the heart of the Ottoman Empire, with a verified Istanbul guide. Harem, treasury, sacred relics and Bosphorus views explained.",
        intro: [
          "For 400 years Topkapi Palace was the residence of the Ottoman sultans and the centre of an empire. Today its courtyards, the Harem, the Treasury and the sacred relics tell the story of a dynasty that ruled three continents.",
          "A VibeGuide local makes sense of the sprawl — where the power sat, which gate meant what, and the human stories behind the jewels — so you leave understanding, not just photographing.",
        ],
        highlights: [
          { title: "The Harem", desc: "The private world of the sultan's family — tiled, secretive, unforgettable." },
          { title: "Imperial Treasury", desc: "The Topkapi Dagger and the 86-carat Spoonmaker's Diamond." },
          { title: "Bosphorus Terraces", desc: "Where sultans watched the sea where Europe meets Asia." },
        ],
        faqs: [
          { q: "Is the Harem included in the ticket?", a: "The Harem usually needs a separate ticket. Your VibeGuide guide explains what's worth it and arranges the route for you." },
          { q: "How much time do I need?", a: "Plan 2–3 hours. The palace is large; a guide keeps you to the highlights without the fatigue." },
          { q: "Is it near Hagia Sophia?", a: "Yes — Topkapi, Hagia Sophia and the Blue Mosque sit within a short walk in Sultanahmet." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Topkapi Palace crowns Seraglio Point in Sultanahmet, at the tip of the old city where the Bosphorus meets the Golden Horn. Take the T1 tram to the Sultanahmet stop and follow the path behind Hagia Sophia; the gate is a short, pleasant walk uphill. Since it sits right beside Hagia Sophia and the Blue Mosque, the palace slots easily into the same day exploring the historic peninsula.",
          "Arrive right at opening to walk the courtyards before the tour groups fill them. Mornings offer the calmest atmosphere and the best light over the Bosphorus terraces, and the palace grounds are especially lovely in spring and autumn. Give yourself two to three hours to do it justice, more if you linger in the Treasury. Check the weekly closing day before you go, as the palace shuts one day midweek.",
          "This is a ticketed site, and the Harem requires a separate ticket well worth adding for its tiled chambers and imperial rooms. The complex sprawls across four courtyards with pavilions, kitchens and collections that are easy to rush past without knowing their stories. A licensed VibeGuide local guide arranges your tickets and timing, leads you through in a sensible order, and reveals the layers of Ottoman court life behind the walls.",
        ],
        ctaTitle: "Walk Topkapi with a local",
        ...IST.en,
      },
      de: {
        name: "Topkapı-Palast",
        metaTitle: "Topkapı-Palast Touren & lokale Guides",
        metaDescription:
          "Entdecke den Topkapı-Palast, das Herz des Osmanischen Reiches, mit einem geprüften Istanbul-Guide. Harem, Schatzkammer, heilige Reliquien und Bosporus-Blick erklärt.",
        intro: [
          "400 Jahre lang war der Topkapı-Palast Residenz der osmanischen Sultane und Zentrum eines Weltreichs. Heute erzählen seine Höfe, der Harem, die Schatzkammer und die heiligen Reliquien die Geschichte einer Dynastie, die drei Kontinente beherrschte.",
          "Ein VibeGuide-Local bringt Ordnung in die Weitläufigkeit — wo die Macht saß, was welches Tor bedeutete und die menschlichen Geschichten hinter den Juwelen — damit du verstehst, statt nur zu fotografieren.",
        ],
        highlights: [
          { title: "Der Harem", desc: "Die private Welt der Sultansfamilie — gekachelt, geheimnisvoll, unvergesslich." },
          { title: "Schatzkammer", desc: "Der Topkapı-Dolch und der 86-karätige Löffelmacher-Diamant." },
          { title: "Bosporus-Terrassen", desc: "Wo Sultane auf das Meer blickten, an dem Europa auf Asien trifft." },
        ],
        faqs: [
          { q: "Ist der Harem im Ticket enthalten?", a: "Der Harem braucht meist ein separates Ticket. Dein VibeGuide-Guide erklärt, was sich lohnt, und plant die Route für dich." },
          { q: "Wie viel Zeit brauche ich?", a: "Plane 2–3 Stunden. Der Palast ist groß; ein Guide führt dich zu den Höhepunkten ohne Erschöpfung." },
          { q: "Liegt er nahe der Hagia Sophia?", a: "Ja — Topkapı, Hagia Sophia und die Blaue Moschee liegen in Sultanahmet nur wenige Gehminuten auseinander." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Topkapı-Palast krönt die Seraglio-Spitze in Sultanahmet, an der Spitze der Altstadt, wo der Bosporus auf das Goldene Horn trifft. Nimm die T1-Straßenbahn bis zur Haltestelle Sultanahmet und folge dem Weg hinter der Hagia Sophia; das Tor erreichst du nach einem kurzen, angenehmen Aufstieg. Da er direkt neben Hagia Sophia und Blauer Moschee liegt, fügt sich der Palast mühelos in denselben Tag auf der historischen Halbinsel ein.",
          "Komm genau zur Öffnung, um die Höfe zu durchqueren, bevor die Reisegruppen sie füllen. Der Morgen bietet die ruhigste Atmosphäre und das schönste Licht über den Bosporus-Terrassen, und das Palastgelände ist im Frühling und Herbst besonders reizvoll. Plane zwei bis drei Stunden ein, um ihm gerecht zu werden, mehr, wenn du in der Schatzkammer verweilst. Prüfe vorher den wöchentlichen Schließtag, denn der Palast bleibt an einem Wochentag geschlossen.",
          "Dies ist eine kostenpflichtige Stätte, und der Harem erfordert ein eigenes Ticket, das sich für seine gefliesten Gemächer und kaiserlichen Räume lohnt. Die Anlage erstreckt sich über vier Höfe mit Pavillons, Küchen und Sammlungen, an denen man ohne ihre Geschichten leicht vorbeieilt. Ein lizenzierter VibeGuide-Guide vor Ort besorgt Tickets und Timing, führt dich in sinnvoller Reihenfolge hindurch und enthüllt die Schichten des osmanischen Hoflebens hinter den Mauern.",
        ],
        ctaTitle: "Erkunde Topkapı mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Дворец Топкапы",
        metaTitle: "Дворец Топкапы: экскурсии с местными гидами",
        metaDescription:
          "Откройте дворец Топкапы, сердце Османской империи, с проверенным гидом в Стамбуле. Гарем, сокровищница, священные реликвии и виды на Босфор.",
        intro: [
          "400 лет дворец Топкапы был резиденцией османских султанов и центром империи. Сегодня его дворы, Гарем, Сокровищница и священные реликвии рассказывают историю династии, правившей тремя континентами.",
          "Местный гид VibeGuide наведёт порядок в этом лабиринте — где сидела власть, что значили ворота и какие человеческие истории стоят за драгоценностями — чтобы вы ушли с пониманием, а не только с фото.",
        ],
        highlights: [
          { title: "Гарем", desc: "Частный мир семьи султана — изразцы, тайны, незабываемо." },
          { title: "Сокровищница", desc: "Кинжал Топкапы и 86-каратный «Алмаз ложечника»." },
          { title: "Террасы Босфора", desc: "Откуда султаны смотрели на пролив, где Европа встречает Азию." },
        ],
        faqs: [
          { q: "Гарем входит в билет?", a: "Обычно Гарем требует отдельного билета. Гид VibeGuide объяснит, что стоит того, и выстроит маршрут." },
          { q: "Сколько нужно времени?", a: "Закладывайте 2–3 часа. Дворец большой; гид проведёт по главному без усталости." },
          { q: "Это рядом с Айя-Софией?", a: "Да — Топкапы, Айя-София и Голубая мечеть в Султанахмете в нескольких минутах ходьбы." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Дворец Топкапы венчает мыс Сарайбурну в Султанахмете, на краю старого города, где Босфор встречается с Золотым Рогом. Доезжайте на трамвае T1 до остановки Sultanahmet и идите по дорожке за Святой Софией; до ворот ведёт короткий приятный подъём. Поскольку он расположен прямо рядом со Святой Софией и Голубой мечетью, дворец легко вписывается в тот же день на историческом полуострове.",
          "Приходите точно к открытию, чтобы пройти по дворам до того, как их заполнят туристические группы. Утро дарит самую спокойную атмосферу и лучший свет над босфорскими террасами, а территория дворца особенно хороша весной и осенью. Отведите два-три часа, чтобы всё осмотреть, и больше, если задержитесь в Сокровищнице. Уточните заранее выходной день, так как дворец закрыт один день в середине недели.",
          "Это платный объект, а для Гарема нужен отдельный билет, который стоит взять ради изразцовых покоев и императорских залов. Комплекс раскинулся на четыре двора с павильонами, кухнями и коллекциями, мимо которых легко промчаться, не зная их историй. Лицензированный местный гид VibeGuide оформит билеты и время, проведёт вас в разумном порядке и раскроет пласты османской придворной жизни за этими стенами.",
        ],
        ctaTitle: "Пройти по Топкапы с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "قصر توبكابي",
        metaTitle: "جولات قصر توبكابي مع مرشدين محليين",
        metaDescription:
          "اكتشف قصر توبكابي، قلب الإمبراطورية العثمانية، مع مرشد موثّق في إسطنبول. الحريم والخزينة والآثار المقدسة وإطلالات البوسفور بشرحٍ كامل.",
        intro: [
          "لمدة 400 عام كان قصر توبكابي مقرًّا لسلاطين العثمانيين ومركزًا لإمبراطورية. واليوم تروي ساحاته والحريم والخزينة والآثار المقدسة قصة سلالة حكمت ثلاث قارات.",
          "يرتّب لك مرشد VibeGuide المحلي هذا المكان الواسع — أين كان مقرّ السلطة، وماذا يعني كل باب، والقصص الإنسانية خلف الجواهر — لتغادر بفهمٍ لا بمجرد صور.",
        ],
        highlights: [
          { title: "الحريم", desc: "العالم الخاص لعائلة السلطان — قيشاني، غامض، لا يُنسى." },
          { title: "الخزينة الإمبراطورية", desc: "خنجر توبكابي وألماسة صانع الملاعق عيار 86 قيراطًا." },
          { title: "شُرفات البوسفور", desc: "حيث كان السلاطين يطلّون على المضيق حيث تلتقي أوروبا بآسيا." },
        ],
        faqs: [
          { q: "هل الحريم مشمول بالتذكرة؟", a: "غالبًا يحتاج الحريم تذكرة منفصلة. يشرح لك مرشد VibeGuide ما يستحق ويرتّب المسار." },
          { q: "كم من الوقت أحتاج؟", a: "خصّص 2–3 ساعات. القصر كبير؛ يقودك المرشد إلى الأبرز دون إرهاق." },
          { q: "هل هو قريب من آيا صوفيا؟", a: "نعم — توبكابي وآيا صوفيا والمسجد الأزرق على مسافة قصيرة سيرًا في السلطان أحمد." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يتوّج قصر توبكابي رأس السرايا في حي السلطان أحمد، عند طرف المدينة القديمة حيث يلتقي البوسفور بالقرن الذهبي. استقل ترام T1 حتى محطة السلطان أحمد واتبع الممر خلف آيا صوفيا؛ فالبوابة على مسافة صعود قصير ولطيف. ولأنه يقع تمامًا بجوار آيا صوفيا والمسجد الأزرق، يندرج القصر بسهولة ضمن اليوم نفسه لاستكشاف شبه الجزيرة التاريخية.",
          "احرص على الوصول مع الافتتاح لتتجول في الأفنية قبل أن تملأها المجموعات السياحية. يمنحك الصباح أهدأ أجواء وأجمل ضوء فوق شرفات البوسفور، وتبدو حدائق القصر أخّاذة بوجه خاص في الربيع والخريف. خصّص ساعتين إلى ثلاث لتفيه حقه، وأكثر إن أطلت في الخزينة. وتحقّق من يوم الإغلاق الأسبوعي قبل ذهابك، إذ يُغلق القصر يومًا واحدًا في منتصف الأسبوع.",
          "الدخول بتذكرة، ويتطلب الحرملك تذكرة منفصلة تستحق الإضافة لما فيه من غرف مكسوّة بالبلاط وأجنحة إمبراطورية. يمتد المجمّع عبر أربعة أفنية تضم أجنحة ومطابخ ومجموعات يسهل تجاوزها مسرعًا دون معرفة حكاياتها. يرتّب لك مرشد VibeGuide المحلي المرخّص التذاكر والتوقيت، ويقودك وفق ترتيب منطقي، ويكشف لك طبقات حياة البلاط العثماني خلف الأسوار.",
        ],
        ctaTitle: "تجوّل في توبكابي مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Palacio de Topkapi",
        metaTitle: "Tours del Palacio de Topkapi con guías locales",
        metaDescription:
          "Descubre el Palacio de Topkapi, el corazón del Imperio otomano, con un guía verificado en Estambul. Harén, tesoro, reliquias sagradas y vistas del Bósforo.",
        intro: [
          "Durante 400 años el Palacio de Topkapi fue la residencia de los sultanes otomanos y el centro de un imperio. Hoy sus patios, el Harén, el Tesoro y las reliquias sagradas cuentan la historia de una dinastía que gobernó tres continentes.",
          "Un local de VibeGuide da sentido a la inmensidad — dónde residía el poder, qué significaba cada puerta y las historias humanas tras las joyas — para que salgas comprendiendo, no solo fotografiando.",
        ],
        highlights: [
          { title: "El Harén", desc: "El mundo privado de la familia del sultán — azulejos, secretos, inolvidable." },
          { title: "Tesoro imperial", desc: "La Daga de Topkapi y el Diamante del Cucharero de 86 quilates." },
          { title: "Terrazas del Bósforo", desc: "Donde los sultanes contemplaban el estrecho entre Europa y Asia." },
        ],
        faqs: [
          { q: "¿El Harén está incluido en la entrada?", a: "El Harén suele requerir entrada aparte. Tu guía de VibeGuide te explica qué merece la pena y organiza la ruta." },
          { q: "¿Cuánto tiempo necesito?", a: "Calcula 2–3 horas. El palacio es grande; un guía te lleva a lo esencial sin agotarte." },
          { q: "¿Está cerca de Santa Sofía?", a: "Sí — Topkapi, Santa Sofía y la Mezquita Azul están a poca distancia a pie en Sultanahmet." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "El Palacio de Topkapi corona la Punta del Serrallo en Sultanahmet, en el extremo de la ciudad vieja, donde el Bósforo se encuentra con el Cuerno de Oro. Toma el tranvía T1 hasta la parada Sultanahmet y sigue el sendero por detrás de Santa Sofía; la puerta queda tras una subida corta y agradable. Como está justo al lado de Santa Sofía y la Mezquita Azul, el palacio encaja sin problema en el mismo día por la península histórica.",
          "Llega justo a la apertura para recorrer los patios antes de que los llenen los grupos. Las mañanas ofrecen el ambiente más tranquilo y la mejor luz sobre las terrazas del Bósforo, y los jardines del palacio lucen especialmente bellos en primavera y otoño. Reserva de dos a tres horas para hacerle justicia, más si te demoras en el Tesoro. Consulta el día de cierre semanal antes de ir, pues el palacio cierra un día entre semana.",
          "Es un recinto de pago, y el Harén requiere una entrada aparte que vale la pena por sus salas alicatadas y estancias imperiales. El conjunto se extiende por cuatro patios con pabellones, cocinas y colecciones que es fácil pasar de largo sin conocer sus historias. Un guía local titulado de VibeGuide gestiona tus entradas y horarios, te lleva en un orden lógico y desvela las capas de la vida cortesana otomana tras los muros.",
        ],
        ctaTitle: "Recorre Topkapi con un local",
        ...IST.es,
      },
      fr: {
        name: "Palais de Topkapı",
        metaTitle: "Visites du Palais de Topkapı avec guides locaux",
        metaDescription:
          "Découvrez le Palais de Topkapı, cœur de l'Empire ottoman, avec un guide vérifié à Istanbul. Harem, trésor, reliques sacrées et vues sur le Bosphore expliqués.",
        intro: [
          "Pendant 400 ans, le Palais de Topkapı fut la résidence des sultans ottomans et le centre d'un empire. Aujourd'hui, ses cours, le Harem, le Trésor et les reliques sacrées racontent l'histoire d'une dynastie qui régna sur trois continents.",
          "Un local VibeGuide donne du sens à l'immensité — où siégeait le pouvoir, ce que signifiait chaque porte et les histoires humaines derrière les joyaux — pour repartir en ayant compris, pas seulement photographié.",
        ],
        highlights: [
          { title: "Le Harem", desc: "Le monde privé de la famille du sultan — faïences, secrets, inoubliable." },
          { title: "Trésor impérial", desc: "Le poignard de Topkapı et le Diamant du Cuilleron de 86 carats." },
          { title: "Terrasses du Bosphore", desc: "Où les sultans contemplaient le détroit entre l'Europe et l'Asie." },
        ],
        faqs: [
          { q: "Le Harem est-il inclus dans le billet ?", a: "Le Harem demande souvent un billet séparé. Votre guide VibeGuide vous dit ce qui en vaut la peine et organise l'itinéraire." },
          { q: "Combien de temps faut-il ?", a: "Comptez 2 à 3 heures. Le palais est vaste ; un guide vous mène à l'essentiel sans fatigue." },
          { q: "Est-ce près de Sainte-Sophie ?", a: "Oui — Topkapı, Sainte-Sophie et la Mosquée Bleue sont à quelques minutes à pied dans Sultanahmet." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Le palais de Topkapi couronne la pointe du Sérail à Sultanahmet, à l'extrémité de la vieille ville, là où le Bosphore rejoint la Corne d'Or. Prenez le tramway T1 jusqu'à l'arrêt Sultanahmet et suivez le chemin derrière Sainte-Sophie ; la porte se gagne au terme d'une courte et agréable montée. Comme il jouxte Sainte-Sophie et la Mosquée Bleue, le palais s'intègre sans peine à la même journée sur la péninsule historique.",
          "Arrivez dès l'ouverture pour parcourir les cours avant que les groupes ne les envahissent. Le matin offre l'ambiance la plus paisible et la plus belle lumière sur les terrasses du Bosphore, et les jardins du palais sont particulièrement charmants au printemps et à l'automne. Comptez deux à trois heures pour lui rendre justice, davantage si vous vous attardez au Trésor. Vérifiez le jour de fermeture hebdomadaire avant de venir, car le palais ferme un jour en semaine.",
          "Le site est payant, et le Harem exige un billet distinct qui vaut l'ajout pour ses salles carrelées et ses appartements impériaux. Le complexe se déploie sur quatre cours avec pavillons, cuisines et collections que l'on dépasse vite sans en connaître les histoires. Un guide local agréé VibeGuide gère vos billets et votre horaire, vous mène dans un ordre judicieux et révèle les strates de la vie de cour ottomane derrière les murs.",
        ],
        ctaTitle: "Parcourez Topkapı avec un local",
        ...IST.fr,
      },
      el: {
        name: "Ανάκτορο Τοπκαπί",
        metaTitle: "Ξεναγήσεις στο Ανάκτορο Τοπκαπί με ντόπιους ξεναγούς",
        metaDescription:
          "Ανακάλυψε το Ανάκτορο Τοπκαπί, την καρδιά της Οθωμανικής Αυτοκρατορίας, με πιστοποιημένο ξεναγό στην Κωνσταντινούπολη. Χαρέμι, θησαυροφυλάκιο, ιερά κειμήλια και θέα στον Βόσπορο.",
        intro: [
          "Για 400 χρόνια το Ανάκτορο Τοπκαπί ήταν η κατοικία των Οθωμανών σουλτάνων και το κέντρο μιας αυτοκρατορίας. Σήμερα οι αυλές του, το Χαρέμι, το Θησαυροφυλάκιο και τα ιερά κειμήλια αφηγούνται την ιστορία μιας δυναστείας που κυβέρνησε τρεις ηπείρους.",
          "Ένας ντόπιος του VibeGuide βάζει τάξη στην απεραντοσύνη — πού έδρευε η εξουσία, τι σήμαινε κάθε πύλη και οι ανθρώπινες ιστορίες πίσω από τα κοσμήματα — για να φύγεις έχοντας καταλάβει, όχι μόνο φωτογραφίσει.",
        ],
        highlights: [
          { title: "Το Χαρέμι", desc: "Ο ιδιωτικός κόσμος της οικογένειας του σουλτάνου — πλακάκια, μυστικά, αξέχαστο." },
          { title: "Αυτοκρατορικό Θησαυροφυλάκιο", desc: "Το εγχειρίδιο του Τοπκαπί και το διαμάντι 86 καρατίων." },
          { title: "Βεράντες του Βοσπόρου", desc: "Όπου οι σουλτάνοι κοιτούσαν τα στενά όπου η Ευρώπη συναντά την Ασία." },
        ],
        faqs: [
          { q: "Το Χαρέμι περιλαμβάνεται στο εισιτήριο;", a: "Το Χαρέμι συνήθως θέλει ξεχωριστό εισιτήριο. Ο ξεναγός του VibeGuide σου εξηγεί τι αξίζει και οργανώνει τη διαδρομή." },
          { q: "Πόσο χρόνο χρειάζομαι;", a: "Υπολόγισε 2–3 ώρες. Το ανάκτορο είναι μεγάλο· ένας ξεναγός σε κρατά στα κυριότερα χωρίς κούραση." },
          { q: "Είναι κοντά στην Αγία Σοφία;", a: "Ναι — Τοπκαπί, Αγία Σοφία και Μπλε Τζαμί είναι με τα πόδια κοντά στο Σουλταναχμέτ." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Ανάκτορο Τοπκαπί στεφανώνει το ακρωτήριο του Σεραγιού στο Σουλταναχμέτ, στην άκρη της παλιάς πόλης, εκεί που ο Βόσπορος συναντά τον Κεράτιο Κόλπο. Πάρτε το τραμ T1 μέχρι τη στάση Sultanahmet και ακολουθήστε το μονοπάτι πίσω από την Αγία Σοφία· η πύλη βρίσκεται μετά από ένα σύντομο, ευχάριστο ανηφορικό περπάτημα. Καθώς γειτονεύει με την Αγία Σοφία και το Μπλε Τζαμί, το ανάκτορο εντάσσεται εύκολα στην ίδια μέρα στην ιστορική χερσόνησο.",
          "Φτάστε ακριβώς με το άνοιγμα για να περπατήσετε τις αυλές πριν τις γεμίσουν τα γκρουπ. Τα πρωινά προσφέρουν την πιο ήρεμη ατμόσφαιρα και το ωραιότερο φως πάνω από τις βεράντες του Βοσπόρου, ενώ οι κήποι του ανακτόρου είναι ιδιαίτερα όμορφοι την άνοιξη και το φθινόπωρο. Αφήστε δύο με τρεις ώρες για να το τιμήσετε, περισσότερες αν αργήσετε στο Θησαυροφυλάκιο. Ελέγξτε την εβδομαδιαία ημέρα κλεισίματος πριν πάτε, καθώς το ανάκτορο κλείνει μία μέρα μεσοβδόμαδα.",
          "Ο χώρος έχει εισιτήριο, και το Χαρέμι απαιτεί ξεχωριστό εισιτήριο που αξίζει να προσθέσετε για τα διακοσμημένα με πλακίδια δωμάτια και τα αυτοκρατορικά διαμερίσματα. Το συγκρότημα απλώνεται σε τέσσερις αυλές με περίπτερα, κουζίνες και συλλογές που εύκολα προσπερνάτε χωρίς να ξέρετε τις ιστορίες τους. Ένας αδειούχος τοπικός ξεναγός της VibeGuide τακτοποιεί εισιτήρια και ώρες, σας οδηγεί με λογική σειρά και αποκαλύπτει τις πτυχές της οθωμανικής αυλικής ζωής πίσω από τα τείχη.",
        ],
        ctaTitle: "Περπάτα στο Τοπκαπί με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Topkapı Sarayı",
        metaTitle: "Topkapı Sarayı Turları & Yerel Rehberler",
        metaDescription:
          "Osmanlı'nın kalbi Topkapı Sarayı'nı doğrulanmış bir İstanbul rehberiyle keşfet. Harem, hazine, kutsal emanetler ve Boğaz manzarası anlatımıyla.",
        intro: [
          "Topkapı Sarayı 400 yıl boyunca Osmanlı padişahlarının ikametgâhı ve bir imparatorluğun merkeziydi. Bugün avluları, Harem, Hazine ve kutsal emanetler üç kıtaya hükmeden bir hanedanın hikâyesini anlatır.",
          "VibeGuide yerel rehberi bu geniş alanı anlamlandırır — gücün nerede oturduğunu, hangi kapının ne anlama geldiğini ve mücevherlerin ardındaki insan hikâyelerini — böylece sadece fotoğraf çekerek değil, anlayarak ayrılırsın.",
        ],
        highlights: [
          { title: "Harem", desc: "Padişah ailesinin özel dünyası — çiniler, sırlar, unutulmaz." },
          { title: "Hazine Dairesi", desc: "Topkapı Hançeri ve 86 kıratlık Kaşıkçı Elması." },
          { title: "Boğaz Terasları", desc: "Padişahların Avrupa ile Asya'nın buluştuğu boğazı izlediği yer." },
        ],
        faqs: [
          { q: "Harem bilete dâhil mi?", a: "Harem genellikle ayrı bilet ister. VibeGuide rehberin neyin değdiğini açıklar ve rotayı senin için ayarlar." },
          { q: "Ne kadar zaman gerekir?", a: "2–3 saat ayır. Saray büyük; rehber seni yormadan önemli yerlere götürür." },
          { q: "Ayasofya'ya yakın mı?", a: "Evet — Topkapı, Ayasofya ve Sultanahmet Camii Sultanahmet'te yürüme mesafesinde." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Topkapı Sarayı, Sultanahmet'te Sarayburnu'nu taçlandırır; eski şehrin ucunda, Boğaz'ın Haliç'le buluştuğu noktadadır. T1 tramvayına binip Sultanahmet durağında inin ve Ayasofya'nın arkasındaki yolu izleyin; kapıya kısa ve keyifli bir yokuşun sonunda varırsınız. Ayasofya ve Sultanahmet Camii'nin hemen yanında yer aldığından, saray tarihi yarımadayı gezdiğiniz aynı güne kolayca sığar.",
          "Avluları turist grupları doldurmadan gezmek için tam açılışta gelin. Sabahlar en dingin atmosferi ve Boğaz teraslarının üzerindeki en güzel ışığı sunar; saray bahçeleri özellikle ilkbahar ve sonbaharda çok güzeldir. Hakkını vermek için kendinize iki üç saat ayırın, Hazine'de oyalanırsanız daha fazlası gerekir. Gitmeden önce haftalık kapanış gününü kontrol edin, çünkü saray hafta içi bir gün kapalıdır.",
          "Burası biletli bir yerdir ve Harem, çinili odaları ve hükümdar daireleriyle eklemeye değecek ayrı bir bilet gerektirir. Kompleks, hikâyelerini bilmeden hızla geçilebilecek köşkler, mutfaklar ve koleksiyonlarla dört avluya yayılır. Ruhsatlı bir VibeGuide yerel rehberi biletlerinizi ve zamanlamanızı ayarlar, sizi mantıklı bir sırayla gezdirir ve duvarların ardındaki Osmanlı saray yaşamının katmanlarını gözler önüne serer.",
        ],
        ctaTitle: "Topkapı'yı bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Palazzo Topkapı",
        metaTitle: "Tour del Palazzo Topkapı con guide locali",
        metaDescription:
          "Scopri il Palazzo Topkapı, cuore dell'Impero ottomano, con una guida verificata di Istanbul. Harem, tesoro, reliquie sacre e vista sul Bosforo spiegati.",
        intro: [
          "Per 400 anni il Palazzo Topkapı è stato la residenza dei sultani ottomani e il centro di un impero. Oggi i suoi cortili, l'Harem, il Tesoro e le reliquie sacre raccontano la storia di una dinastia che governò tre continenti.",
          "Un locale di VibeGuide dà senso a questo labirinto — dove risiedeva il potere, cosa significava ogni porta e le storie umane dietro i gioielli — così te ne vai con la comprensione, non solo con le foto.",
        ],
        highlights: [
          { title: "L'Harem", desc: "Il mondo privato della famiglia del sultano — piastrellato, segreto, indimenticabile." },
          { title: "Tesoro imperiale", desc: "Il Pugnale di Topkapı e il Diamante del Cucchiaio da 86 carati." },
          { title: "Terrazze sul Bosforo", desc: "Dove i sultani osservavano il mare in cui l'Europa incontra l'Asia." },
        ],
        faqs: [
          { q: "L'Harem è incluso nel biglietto?", a: "L'Harem di solito richiede un biglietto a parte. La tua guida VibeGuide ti spiega cosa vale la pena e organizza il percorso per te." },
          { q: "Di quanto tempo ho bisogno?", a: "Prevedi 2–3 ore. Il palazzo è vasto; una guida ti tiene sui punti salienti senza affaticarti." },
          { q: "È vicino a Santa Sofia?", a: "Sì — Topkapı, Santa Sofia e la Moschea Blu si trovano a breve distanza a piedi a Sultanahmet." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Il Palazzo Topkapi corona la Punta del Serraglio a Sultanahmet, all'estremità della città vecchia, dove il Bosforo incontra il Corno d'Oro. Prendi il tram T1 fino alla fermata Sultanahmet e segui il sentiero dietro Santa Sofia; il portone si raggiunge dopo una breve e piacevole salita. Trovandosi proprio accanto a Santa Sofia e alla Moschea Blu, il palazzo si inserisce con facilità nella stessa giornata dedicata alla penisola storica.",
          "Arriva proprio all'apertura per attraversare i cortili prima che i gruppi li riempiano. Le mattine offrono l'atmosfera più tranquilla e la luce migliore sulle terrazze del Bosforo, e i giardini del palazzo sono particolarmente belli in primavera e autunno. Concediti due o tre ore per rendergli giustizia, di più se ti soffermi nel Tesoro. Verifica il giorno di chiusura settimanale prima di andare, poiché il palazzo chiude un giorno infrasettimanale.",
          "È un sito a pagamento, e l'Harem richiede un biglietto separato che vale la pena aggiungere per le sale rivestite di piastrelle e gli appartamenti imperiali. Il complesso si estende su quattro cortili con padiglioni, cucine e collezioni davanti a cui è facile passare in fretta senza conoscerne le storie. Una guida locale abilitata di VibeGuide organizza biglietti e orari, ti conduce in un ordine sensato e svela gli strati della vita di corte ottomana dietro le mura.",
        ],
        ctaTitle: "Visita Topkapı con un locale",
        ...IST.it,
      },
      pl: {
        name: "Pałac Topkapı",
        metaTitle: "Pałac Topkapı — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Odkryj Pałac Topkapı, serce Imperium Osmańskiego, z zweryfikowanym przewodnikiem ze Stambułu. Harem, skarbiec, święte relikwie i widoki na Bosfor z wyjaśnieniem.",
        intro: [
          "Przez 400 lat Pałac Topkapı był rezydencją sułtanów osmańskich i centrum imperium. Dziś jego dziedzińce, Harem, Skarbiec i święte relikwie opowiadają historię dynastii, która władała trzema kontynentami.",
          "Lokalny przewodnik VibeGuide porządkuje ten rozległy kompleks — gdzie zasiadała władza, co oznaczała każda brama i jakie ludzkie historie kryją się za klejnotami — dzięki czemu wychodzisz z wiedzą, a nie tylko ze zdjęciami.",
        ],
        highlights: [
          { title: "Harem", desc: "Prywatny świat rodziny sułtana — wyłożony kafelkami, tajemniczy, niezapomniany." },
          { title: "Skarbiec cesarski", desc: "Sztylet Topkapı i 86-karatowy Diament Łyżkarza." },
          { title: "Tarasy nad Bosforem", desc: "Gdzie sułtani spoglądali na morze, w którym Europa spotyka Azję." },
        ],
        faqs: [
          { q: "Czy Harem jest wliczony w bilet?", a: "Harem zwykle wymaga osobnego biletu. Twój przewodnik VibeGuide wyjaśni, co warto zobaczyć, i ułoży dla Ciebie trasę." },
          { q: "Ile czasu potrzebuję?", a: "Zaplanuj 2–3 godziny. Pałac jest ogromny; przewodnik prowadzi Cię przez najważniejsze miejsca bez zmęczenia." },
          { q: "Czy to blisko Hagii Sophii?", a: "Tak — Topkapı, Hagia Sophia i Błękitny Meczet leżą w niewielkiej odległości spacerem w dzielnicy Sultanahmet." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Pałac Topkapi wieńczy Cypel Seraju w Sultanahmet, na krańcu starego miasta, tam gdzie Bosfor spotyka się ze Złotym Rogiem. Wsiądź w tramwaj T1 do przystanku Sultanahmet i podążaj ścieżką za Hagią Sophią; do bramy prowadzi krótkie, przyjemne podejście. Ponieważ leży tuż obok Hagii Sophii i Błękitnego Meczetu, pałac z łatwością mieści się w tym samym dniu zwiedzania historycznego półwyspu.",
          "Przyjdź dokładnie na otwarcie, aby przejść przez dziedzińce, zanim wypełnią je wycieczki. Poranki dają najspokojniejszą atmosferę i najlepsze światło nad tarasami Bosforu, a ogrody pałacu są szczególnie urocze wiosną i jesienią. Zarezerwuj dwie do trzech godzin, by oddać mu sprawiedliwość, a więcej, jeśli zatrzymasz się w Skarbcu. Sprawdź cotygodniowy dzień zamknięcia przed wizytą, gdyż pałac jest nieczynny jeden dzień w środku tygodnia.",
          "To obiekt biletowany, a Harem wymaga osobnego biletu, który warto dokupić dla jego wykładanych płytkami komnat i cesarskich sal. Kompleks rozciąga się na cztery dziedzińce z pawilonami, kuchniami i kolekcjami, które łatwo minąć w pośpiechu, nie znając ich historii. Licencjonowany lokalny przewodnik VibeGuide załatwia bilety i harmonogram, prowadzi cię w sensownej kolejności i odsłania warstwy osmańskiego życia dworskiego za murami.",
        ],
        ctaTitle: "Zwiedź Topkapı z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Topkapı-paleis",
        metaTitle: "Topkapı-paleis-tours & lokale gidsen",
        metaDescription:
          "Ontdek het Topkapı-paleis, het hart van het Ottomaanse Rijk, met een geverifieerde gids uit Istanbul. Harem, schatkamer, heilige relikwieën en uitzicht op de Bosporus uitgelegd.",
        intro: [
          "400 jaar lang was het Topkapı-paleis de residentie van de Ottomaanse sultans en het centrum van een rijk. Vandaag vertellen de binnenhoven, de Harem, de Schatkamer en de heilige relikwieën het verhaal van een dynastie die over drie continenten heerste.",
          "Een lokale VibeGuide brengt orde in het uitgestrekte geheel — waar de macht zetelde, wat elke poort betekende en de menselijke verhalen achter de juwelen — zodat je met begrip vertrekt, niet alleen met foto's.",
        ],
        highlights: [
          { title: "De Harem", desc: "De privéwereld van de familie van de sultan — betegeld, geheimzinnig, onvergetelijk." },
          { title: "Keizerlijke schatkamer", desc: "De Topkapı-dolk en de 86-karaats Lepelmakersdiamant." },
          { title: "Terrassen aan de Bosporus", desc: "Waar sultans uitkeken over de zee waar Europa Azië ontmoet." },
        ],
        faqs: [
          { q: "Zit de Harem bij het ticket inbegrepen?", a: "De Harem vereist meestal een apart ticket. Je VibeGuide-gids legt uit wat de moeite waard is en regelt de route voor je." },
          { q: "Hoeveel tijd heb ik nodig?", a: "Reken op 2–3 uur. Het paleis is groot; een gids houdt je bij de hoogtepunten zonder vermoeidheid." },
          { q: "Ligt het dicht bij de Hagia Sophia?", a: "Ja — Topkapı, de Hagia Sophia en de Blauwe Moskee liggen op korte loopafstand in Sultanahmet." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Het Topkapipaleis bekroont de Serail-punt in Sultanahmet, aan de tip van de oude stad, waar de Bosporus de Gouden Hoorn ontmoet. Neem de T1-tram tot halte Sultanahmet en volg het pad achter de Hagia Sophia; de poort bereik je na een korte, aangename klim. Doordat het pal naast de Hagia Sophia en de Blauwe Moskee ligt, past het paleis moeiteloos in dezelfde dag over het historische schiereiland.",
          "Kom precies bij opening om de binnenplaatsen te belopen voordat de reisgroepen ze vullen. Ochtenden bieden de rustigste sfeer en het mooiste licht over de Bosporus-terrassen, en de paleistuinen zijn vooral in lente en herfst prachtig. Trek twee tot drie uur uit om het recht te doen, meer als je in de Schatkamer blijft hangen. Controleer de wekelijkse sluitingsdag vooraf, want het paleis is doordeweeks één dag gesloten.",
          "Dit is een betaalde locatie, en de Harem vereist een apart ticket dat de moeite waard is voor de betegelde vertrekken en keizerlijke zalen. Het complex strekt zich uit over vier binnenplaatsen met paviljoenen, keukens en collecties waar je zonder hun verhalen makkelijk langs snelt. Een erkende lokale VibeGuide-gids regelt je tickets en timing, leidt je in een logische volgorde rond en onthult de lagen van het Ottomaanse hofleven achter de muren.",
        ],
        ctaTitle: "Wandel door Topkapı met een local",
        ...IST.nl,
      },

    },
  },

  // ─────────────────────────────── BASILICA CISTERN ───────────────────────────
  {
    slug: "basilica-cistern",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🏛️",
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1600",
    lat: 41.008407,
    lng: 28.977787,
    i18n: {
      en: {
        name: "Basilica Cistern",
        metaTitle: "Basilica Cistern (Yerebatan) Tours & Local Guides",
        metaDescription:
          "Descend into the Basilica Cistern, Istanbul's underground palace of water. See the Medusa heads and 336 columns with a verified local guide.",
        intro: [
          "Beneath the streets of Sultanahmet lies the Basilica Cistern — a 1,500-year-old underground reservoir of 336 marble columns, dim light and dripping echoes. The Byzantines built it to water the Great Palace; today it's one of Istanbul's most atmospheric spaces.",
          "A VibeGuide local explains the upside-down Medusa heads, why columns were recycled from older temples, and the legends that grew in the dark — turning a short visit into a real story.",
        ],
        highlights: [
          { title: "The Medusa Heads", desc: "Two ancient Medusa faces, placed sideways and upside-down — nobody fully knows why." },
          { title: "336 Columns", desc: "Recycled from older Roman ruins, each slightly different." },
          { title: "The Atmosphere", desc: "Cool, dim and echoing — a film-set come to life beneath the city." },
        ],
        faqs: [
          { q: "Is the Basilica Cistern worth it?", a: "Absolutely — it's short but unforgettable, and the history makes it far richer. A guide points out details most visitors walk past." },
          { q: "How long is the visit?", a: "Usually 30–45 minutes, easy to combine with Hagia Sophia and the Blue Mosque next door." },
          { q: "Is it accessible?", a: "There are walkways above the water, but some steps. Your guide tells you what to expect in advance." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Basilica Cistern sits in the heart of Sultanahmet, barely a minute's walk from Hagia Sophia and the Blue Mosque. The easiest approach is the T1 tram to the Sultanahmet stop, from where the entrance is a short, flat walk. If you are already exploring the old city's main square, you can simply stroll from one sight to the next.",
          "The cistern stays cool and dim whatever the weather, which makes it a welcome escape on hot summer afternoons. Even so, the middle of the day brings the biggest crowds, so arriving early or later in the afternoon gives you calmer walkways. Its restored lighting looks striking at any hour, and there is no bad season to descend into this underground world.",
          "Entry is ticketed, and you follow raised walkways above the water past hundreds of columns to the famous Medusa heads at the far end. Expect an atmospheric, echoing space that rewards slow exploration. A licensed VibeGuide local guide can arrange your ticket, time your visit around the crowds, and bring the Byzantine history to life as you move through the shadows.",
        ],
        ctaTitle: "Explore the Cistern with a local",
        ...IST.en,
      },
      de: {
        name: "Cisterna Basilica",
        metaTitle: "Cisterna Basilica (Yerebatan) Touren & lokale Guides",
        metaDescription:
          "Steige hinab in die Cisterna Basilica, Istanbuls unterirdischen Wasserpalast. Sieh die Medusenköpfe und 336 Säulen mit einem geprüften lokalen Guide.",
        intro: [
          "Unter den Straßen von Sultanahmet liegt die Cisterna Basilica — ein 1.500 Jahre altes unterirdisches Reservoir mit 336 Marmorsäulen, gedämpftem Licht und tropfenden Echos. Die Byzantiner bauten sie zur Wasserversorgung des Großen Palastes; heute ist sie einer der stimmungsvollsten Orte Istanbuls.",
          "Ein VibeGuide-Local erklärt die umgedrehten Medusenköpfe, warum Säulen aus älteren Tempeln wiederverwendet wurden und die Legenden, die im Dunkeln wuchsen — und macht aus einem kurzen Besuch eine echte Geschichte.",
        ],
        highlights: [
          { title: "Die Medusenköpfe", desc: "Zwei antike Medusengesichter, seitlich und kopfüber — niemand weiß genau warum." },
          { title: "336 Säulen", desc: "Aus älteren römischen Ruinen wiederverwendet, jede etwas anders." },
          { title: "Die Atmosphäre", desc: "Kühl, gedämpft und hallend — eine Filmkulisse unter der Stadt." },
        ],
        faqs: [
          { q: "Lohnt sich die Cisterna Basilica?", a: "Unbedingt — kurz, aber unvergesslich, und die Geschichte macht sie viel reicher. Ein Guide zeigt Details, an denen die meisten vorbeigehen." },
          { q: "Wie lange dauert der Besuch?", a: "Meist 30–45 Minuten, gut mit Hagia Sophia und der Blauen Moschee nebenan zu verbinden." },
          { q: "Ist sie barrierefrei?", a: "Es gibt Stege über dem Wasser, aber einige Stufen. Dein Guide sagt dir vorab, was dich erwartet." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Die Cisterna Basilica liegt mitten in Sultanahmet, nur eine Minute zu Fuß von der Hagia Sophia und der Blauen Moschee entfernt. Am einfachsten erreichst du sie mit der Straßenbahn T1 bis zur Haltestelle Sultanahmet, von der aus der Eingang in wenigen Schritten auf ebenem Weg zu finden ist. Wer die Altstadt ohnehin erkundet, spaziert bequem von einer Sehenswürdigkeit zur nächsten.",
          "Die Zisterne bleibt bei jedem Wetter kühl und dämmrig und ist damit ein willkommener Rückzugsort an heißen Sommernachmittagen. Trotzdem herrscht mittags der größte Andrang, sodass ein früher Vormittag oder der späte Nachmittag ruhigere Wege verspricht. Die restaurierte Beleuchtung wirkt zu jeder Stunde eindrucksvoll, und es gibt keine schlechte Jahreszeit für den Abstieg in diese unterirdische Welt.",
          "Der Eintritt ist kostenpflichtig, und du folgst erhöhten Stegen über dem Wasser vorbei an Hunderten Säulen bis zu den berühmten Medusenköpfen am hinteren Ende. Dich erwartet ein atmosphärischer, von Echos erfüllter Raum, der langsames Entdecken belohnt. Ein lizenzierter VibeGuide vor Ort besorgt dein Ticket, plant deinen Besuch rund um die Stoßzeiten und erweckt die byzantinische Geschichte im Halbdunkel zum Leben.",
        ],
        ctaTitle: "Entdecke die Zisterne mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Цистерна Базилика",
        metaTitle: "Цистерна Базилика (Йеребатан): экскурсии с гидами",
        metaDescription:
          "Спуститесь в Цистерну Базилику, подземный водный дворец Стамбула. Увидьте головы Медузы и 336 колонн с проверенным местным гидом.",
        intro: [
          "Под улицами Султанахмета лежит Цистерна Базилика — подземный резервуар возрастом 1500 лет: 336 мраморных колонн, приглушённый свет и капающее эхо. Византийцы построили её для снабжения Большого дворца водой; сегодня это одно из самых атмосферных мест Стамбула.",
          "Местный гид VibeGuide объяснит перевёрнутые головы Медузы, почему колонны взяты из старых храмов и какие легенды родились во тьме — превращая короткий визит в настоящую историю.",
        ],
        highlights: [
          { title: "Головы Медузы", desc: "Два древних лика Медузы — боком и вверх ногами; точная причина неизвестна." },
          { title: "336 колонн", desc: "Взяты из более древних римских руин, каждая немного иная." },
          { title: "Атмосфера", desc: "Прохладно, сумрачно и гулко — киношная декорация под городом." },
        ],
        faqs: [
          { q: "Стоит ли идти в Цистерну Базилику?", a: "Безусловно — коротко, но незабываемо, а история делает её намного богаче. Гид покажет детали, мимо которых проходят почти все." },
          { q: "Сколько длится визит?", a: "Обычно 30–45 минут, легко совместить с Айя-Софией и Голубой мечетью рядом." },
          { q: "Есть ли доступ для всех?", a: "Над водой проложены дорожки, но есть ступени. Гид заранее расскажет, чего ожидать." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Цистерна Базилика находится в самом сердце Султанахмета, всего в минуте ходьбы от Святой Софии и Голубой мечети. Проще всего добраться на трамвае T1 до остановки Sultanahmet, от которой до входа ведёт короткая ровная дорога. Если вы уже гуляете по главной площади старого города, достаточно перейти пешком от одной достопримечательности к другой.",
          "Внутри цистерны всегда прохладно и сумрачно независимо от погоды, поэтому она становится приятным укрытием в жаркие летние дни. И всё же в середине дня здесь больше всего людей, так что ранним утром или ближе к вечеру дорожки заметно спокойнее. Обновлённая подсветка выглядит эффектно в любой час, и нет плохого сезона, чтобы спуститься в этот подземный мир.",
          "Вход платный, и вы идёте по приподнятым мосткам над водой мимо сотен колонн к знаменитым головам Медузы в дальнем конце. Вас ждёт атмосферное, полное эха пространство, которое вознаграждает неспешный осмотр. Лицензированный местный гид VibeGuide оформит билет, подберёт время в обход толп и оживит византийскую историю, пока вы движетесь в полумраке.",
        ],
        ctaTitle: "Исследовать Цистерну с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "صهريج البازيليك",
        metaTitle: "جولات صهريج البازيليك (يره باطان) مع مرشدين",
        metaDescription:
          "انزل إلى صهريج البازيليك، قصر إسطنبول المائي تحت الأرض. شاهد رأسَي ميدوسا و336 عمودًا مع مرشد محلي موثّق.",
        intro: [
          "تحت شوارع السلطان أحمد يقع صهريج البازيليك — خزان مياه تحت الأرض عمره 1500 عام، يضم 336 عمودًا رخاميًا وضوءًا خافتًا وصدى قطرات الماء. بناه البيزنطيون لتزويد القصر الكبير بالماء؛ واليوم هو من أكثر أماكن إسطنبول أجواءً.",
          "يشرح لك مرشد VibeGuide المحلي رأسَي ميدوسا المقلوبين، ولماذا أُعيد استخدام الأعمدة من معابد أقدم، والأساطير التي وُلدت في الظلام — فيحوّل زيارة قصيرة إلى قصة حقيقية.",
        ],
        highlights: [
          { title: "رأسا ميدوسا", desc: "وجهان قديمان لميدوسا، أحدهما جانبي والآخر مقلوب — والسبب لا يزال لغزًا." },
          { title: "336 عمودًا", desc: "أُعيد استخدامها من أطلال رومانية أقدم، كل عمود مختلف قليلًا." },
          { title: "الأجواء", desc: "بارد وخافت ويتردد فيه الصدى — كأنه ديكور سينمائي تحت المدينة." },
        ],
        faqs: [
          { q: "هل يستحق صهريج البازيليك الزيارة؟", a: "بالتأكيد — قصير لكنه لا يُنسى، والتاريخ يجعله أغنى بكثير. يشير المرشد إلى تفاصيل يفوتها معظم الزوار." },
          { q: "كم تستغرق الزيارة؟", a: "عادة 30–45 دقيقة، يسهل دمجها مع آيا صوفيا والمسجد الأزرق المجاورين." },
          { q: "هل المكان مهيّأ للجميع؟", a: "توجد ممرات فوق الماء لكن بعض الدرجات. يخبرك مرشدك مسبقًا بما تتوقعه." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع صهريج البازيليك في قلب منطقة السلطان أحمد، على بُعد دقيقة واحدة سيرًا من آيا صوفيا والمسجد الأزرق. أسهل طريقة للوصول هي عبر الترام T1 حتى محطة السلطان أحمد، ومنها يكون المدخل على مسافة قصيرة ومستوية. وإذا كنت تتجول أصلًا في الساحة الرئيسية للمدينة القديمة، فيمكنك ببساطة التنقل سيرًا بين المعالم.",
          "يبقى الصهريج باردًا وخافت الإضاءة مهما كان الطقس، ما يجعله ملاذًا مريحًا في ظهيرات الصيف الحارة. ومع ذلك يشهد منتصف النهار أكبر ازدحام، لذا يمنحك الوصول باكرًا أو في وقت متأخر من العصر ممرات أكثر هدوءًا. تبدو الإضاءة المُرمَّمة مبهرة في أي ساعة، ولا يوجد موسم سيئ للنزول إلى هذا العالم الجوفي.",
          "الدخول مقابل تذكرة، وتسير على ممرات مرتفعة فوق الماء بين مئات الأعمدة وصولًا إلى رأسي ميدوسا الشهيرين في الطرف البعيد. توقّع فضاءً آسرًا يتردد فيه الصدى ويكافئ الاستكشاف المتأني. يستطيع مرشد VibeGuide المحلي المرخّص أن يحجز تذكرتك، وأن ينظّم توقيت زيارتك بعيدًا عن الزحام، وأن يُحيي التاريخ البيزنطي وأنت تتنقل بين الظلال.",
        ],
        ctaTitle: "استكشف الصهريج مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Cisterna Basílica",
        metaTitle: "Tours de la Cisterna Basílica (Yerebatan) con guías",
        metaDescription:
          "Desciende a la Cisterna Basílica, el palacio de agua subterráneo de Estambul. Ve las cabezas de Medusa y 336 columnas con un guía local verificado.",
        intro: [
          "Bajo las calles de Sultanahmet se encuentra la Cisterna Basílica — un depósito subterráneo de 1.500 años con 336 columnas de mármol, luz tenue y ecos de goteo. Los bizantinos la construyeron para abastecer de agua al Gran Palacio; hoy es uno de los espacios más atmosféricos de Estambul.",
          "Un local de VibeGuide explica las cabezas de Medusa invertidas, por qué se reutilizaron columnas de templos antiguos y las leyendas que crecieron en la oscuridad — convirtiendo una visita breve en una historia real.",
        ],
        highlights: [
          { title: "Las cabezas de Medusa", desc: "Dos rostros antiguos de Medusa, de lado y boca abajo — nadie sabe del todo por qué." },
          { title: "336 columnas", desc: "Reutilizadas de ruinas romanas más antiguas, cada una algo distinta." },
          { title: "La atmósfera", desc: "Fresca, tenue y con eco — un set de cine bajo la ciudad." },
        ],
        faqs: [
          { q: "¿Vale la pena la Cisterna Basílica?", a: "Sin duda — breve pero inolvidable, y la historia la enriquece mucho. Un guía señala detalles que casi todos pasan por alto." },
          { q: "¿Cuánto dura la visita?", a: "Suele ser de 30–45 minutos, fácil de combinar con Santa Sofía y la Mezquita Azul al lado." },
          { q: "¿Es accesible?", a: "Hay pasarelas sobre el agua, pero algunos escalones. Tu guía te dice qué esperar de antemano." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "La Cisterna Basílica se encuentra en pleno Sultanahmet, a apenas un minuto a pie de Santa Sofía y la Mezquita Azul. La forma más sencilla de llegar es el tranvía T1 hasta la parada de Sultanahmet, desde donde la entrada queda a un corto paseo llano. Si ya estás recorriendo la plaza principal de la ciudad vieja, basta con caminar de un monumento a otro.",
          "La cisterna se mantiene fresca y en penumbra haga el tiempo que haga, lo que la convierte en un refugio agradable en las tardes calurosas de verano. Aun así, el mediodía concentra la mayor afluencia, por lo que llegar temprano o al final de la tarde te deja pasarelas más tranquilas. Su iluminación restaurada resulta impactante a cualquier hora, y no hay mala temporada para descender a este mundo subterráneo.",
          "La entrada requiere ticket y recorres pasarelas elevadas sobre el agua entre cientos de columnas hasta las famosas cabezas de Medusa del fondo. Te espera un espacio atmosférico y lleno de ecos que premia la exploración pausada. Un guía local titulado de VibeGuide puede gestionar tu entrada, ajustar el horario para evitar las aglomeraciones y dar vida a la historia bizantina mientras avanzas entre las sombras.",
        ],
        ctaTitle: "Explora la Cisterna con un local",
        ...IST.es,
      },
      fr: {
        name: "Citerne Basilique",
        metaTitle: "Visites de la Citerne Basilique (Yerebatan) avec guides",
        metaDescription:
          "Descendez dans la Citerne Basilique, le palais d'eau souterrain d'Istanbul. Voyez les têtes de Méduse et 336 colonnes avec un guide local vérifié.",
        intro: [
          "Sous les rues de Sultanahmet se trouve la Citerne Basilique — un réservoir souterrain vieux de 1 500 ans, avec 336 colonnes de marbre, une lumière tamisée et des échos de gouttes. Les Byzantins l'ont bâtie pour alimenter le Grand Palais ; c'est aujourd'hui l'un des lieux les plus envoutants d'Istanbul.",
          "Un local VibeGuide explique les têtes de Méduse renversées, pourquoi des colonnes furent récupérées de temples plus anciens et les légendes nées dans l'obscurité — transformant une courte visite en véritable récit.",
        ],
        highlights: [
          { title: "Les têtes de Méduse", desc: "Deux visages antiques de Méduse, de côté et à l'envers — personne ne sait vraiment pourquoi." },
          { title: "336 colonnes", desc: "Récupérées de ruines romaines plus anciennes, chacune un peu différente." },
          { title: "L'atmosphère", desc: "Fraîche, tamisée et résonnante — un décor de cinéma sous la ville." },
        ],
        faqs: [
          { q: "La Citerne Basilique vaut-elle le détour ?", a: "Absolument — courte mais inoubliable, et l'histoire la rend bien plus riche. Un guide montre des détails que presque tous ignorent." },
          { q: "Combien de temps dure la visite ?", a: "En général 30 à 45 minutes, facile à combiner avec Sainte-Sophie et la Mosquée Bleue à côté." },
          { q: "Est-ce accessible ?", a: "Des passerelles surplombent l'eau, mais il y a quelques marches. Votre guide vous prévient à l'avance." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "La Citerne Basilique se trouve au cœur de Sultanahmet, à une minute à peine de Sainte-Sophie et de la Mosquée bleue. Le plus simple est de prendre le tramway T1 jusqu'à l'arrêt Sultanahmet, d'où l'entrée se rejoint par une courte marche à plat. Si vous parcourez déjà la grande place de la vieille ville, il suffit de flâner d'un monument à l'autre.",
          "La citerne reste fraîche et tamisée quel que soit le temps, ce qui en fait un refuge bienvenu lors des chaudes après-midi d'été. Le milieu de journée attire toutefois le plus de monde, si bien qu'une arrivée matinale ou en fin d'après-midi vous offre des passerelles plus calmes. Son éclairage restauré est saisissant à toute heure, et aucune saison ne se prête mal à cette descente souterraine.",
          "L'entrée est payante et vous suivez des passerelles surélevées au-dessus de l'eau, entre des centaines de colonnes, jusqu'aux célèbres têtes de Méduse tout au fond. Attendez-vous à un espace envoûtant et empli d'échos qui récompense une exploration lente. Un guide local agréé VibeGuide peut réserver votre billet, caler votre visite en dehors de l'affluence et faire revivre l'histoire byzantine tandis que vous avancez dans la pénombre.",
        ],
        ctaTitle: "Explorez la Citerne avec un local",
        ...IST.fr,
      },
      el: {
        name: "Βασιλική Κινστέρνα",
        metaTitle: "Ξεναγήσεις στη Βασιλική Κινστέρνα (Γερεμπατάν)",
        metaDescription:
          "Κατέβα στη Βασιλική Κινστέρνα, το υπόγειο παλάτι νερού της Κωνσταντινούπολης. Δες τα κεφάλια της Μέδουσας και 336 κίονες με πιστοποιημένο ντόπιο ξεναγό.",
        intro: [
          "Κάτω από τους δρόμους του Σουλταναχμέτ βρίσκεται η Βασιλική Κινστέρνα — μια υπόγεια δεξαμενή 1.500 ετών με 336 μαρμάρινους κίονες, αμυδρό φως και ήχους νερού. Οι Βυζαντινοί την έχτισαν για να υδρεύεται το Μέγα Παλάτι· σήμερα είναι από τους πιο ατμοσφαιρικούς χώρους της πόλης.",
          "Ένας ντόπιος του VibeGuide εξηγεί τα ανάποδα κεφάλια της Μέδουσας, γιατί οι κίονες ήρθαν από παλαιότερους ναούς και τους θρύλους που γεννήθηκαν στο σκοτάδι — κάνοντας μια σύντομη επίσκεψη πραγματική ιστορία.",
        ],
        highlights: [
          { title: "Τα κεφάλια της Μέδουσας", desc: "Δύο αρχαία πρόσωπα Μέδουσας, πλάγια και ανάποδα — κανείς δεν ξέρει ακριβώς γιατί." },
          { title: "336 κίονες", desc: "Από παλαιότερα ρωμαϊκά ερείπια, ο καθένας λίγο διαφορετικός." },
          { title: "Η ατμόσφαιρα", desc: "Δροσερά, αμυδρά και με ηχώ — σκηνικό ταινίας κάτω από την πόλη." },
        ],
        faqs: [
          { q: "Αξίζει η Βασιλική Κινστέρνα;", a: "Οπωσδήποτε — σύντομη αλλά αξέχαστη, και η ιστορία την κάνει πολύ πλουσιότερη. Ο ξεναγός δείχνει λεπτομέρειες που οι περισσότεροι προσπερνούν." },
          { q: "Πόσο διαρκεί η επίσκεψη;", a: "Συνήθως 30–45 λεπτά, εύκολα σε συνδυασμό με την Αγία Σοφία και το Μπλε Τζαμί δίπλα." },
          { q: "Είναι προσβάσιμη;", a: "Υπάρχουν διάδρομοι πάνω από το νερό, αλλά και κάποια σκαλιά. Ο ξεναγός σου λέει εκ των προτέρων τι να περιμένεις." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Η Βασιλική Κινστέρνα βρίσκεται στην καρδιά του Σουλταναχμέτ, μόλις ένα λεπτό με τα πόδια από την Αγία Σοφία και το Μπλε Τζαμί. Ο πιο εύκολος τρόπος να φτάσετε είναι με το τραμ T1 μέχρι τη στάση Sultanahmet, από όπου η είσοδος απέχει λίγα βήματα σε επίπεδο δρόμο. Αν ήδη περιηγείστε στην κεντρική πλατεία της παλιάς πόλης, απλώς περπατήστε από το ένα αξιοθέατο στο άλλο.",
          "Η κινστέρνα παραμένει δροσερή και σκοτεινή όποιος κι αν είναι ο καιρός, γεγονός που την κάνει ευχάριστο καταφύγιο τα ζεστά καλοκαιρινά απογεύματα. Παρ' όλα αυτά, το μεσημέρι συγκεντρώνει τον περισσότερο κόσμο, οπότε μια πρωινή ή αργά απογευματινή άφιξη σας χαρίζει πιο ήσυχα περάσματα. Ο ανακαινισμένος φωτισμός εντυπωσιάζει κάθε ώρα, και δεν υπάρχει κακή εποχή για την κάθοδο σε αυτόν τον υπόγειο κόσμο.",
          "Η είσοδος απαιτεί εισιτήριο και ακολουθείτε υπερυψωμένους διαδρόμους πάνω από το νερό, ανάμεσα σε εκατοντάδες κίονες, μέχρι τα περίφημα κεφάλια της Μέδουσας στο βάθος. Περιμένετε έναν ατμοσφαιρικό χώρο γεμάτο ηχώ που ανταμείβει την αργή εξερεύνηση. Ένας αδειούχος τοπικός ξεναγός της VibeGuide μπορεί να κανονίσει το εισιτήριό σας, να προσαρμόσει τον χρόνο της επίσκεψης μακριά από τον συνωστισμό και να ζωντανέψει τη βυζαντινή ιστορία καθώς προχωράτε μέσα στις σκιές.",
        ],
        ctaTitle: "Εξερεύνησε την Κινστέρνα με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Yerebatan Sarnıcı",
        metaTitle: "Yerebatan Sarnıcı Turları & Yerel Rehberler",
        metaDescription:
          "İstanbul'un yer altı su sarayı Yerebatan Sarnıcı'na in. Medusa başlarını ve 336 sütunu doğrulanmış bir yerel rehberle gör.",
        intro: [
          "Sultanahmet'in sokaklarının altında Yerebatan Sarnıcı uzanır — 336 mermer sütunlu, loş ışıklı ve damla yankılı 1.500 yıllık bir yer altı su deposu. Bizanslılar Büyük Saray'a su sağlamak için yaptı; bugün İstanbul'un en atmosferik mekânlarından biri.",
          "VibeGuide yerel rehberi ters Medusa başlarını, sütunların neden daha eski tapınaklardan devşirildiğini ve karanlıkta büyüyen efsaneleri anlatır — kısa bir ziyareti gerçek bir hikâyeye dönüştürür.",
        ],
        highlights: [
          { title: "Medusa Başları", desc: "İki antik Medusa yüzü, yan ve ters yerleştirilmiş — nedeni hâlâ tam bilinmiyor." },
          { title: "336 Sütun", desc: "Daha eski Roma kalıntılarından devşirilmiş, her biri biraz farklı." },
          { title: "Atmosfer", desc: "Serin, loş ve yankılı — şehrin altında bir film platosu." },
        ],
        faqs: [
          { q: "Yerebatan Sarnıcı değer mi?", a: "Kesinlikle — kısa ama unutulmaz, ve tarihi onu çok daha zengin kılıyor. Rehber, çoğu ziyaretçinin geçtiği detayları gösterir." },
          { q: "Ziyaret ne kadar sürer?", a: "Genelde 30–45 dakika; yan taraftaki Ayasofya ve Sultanahmet Camii ile birleştirmesi kolay." },
          { q: "Erişime uygun mu?", a: "Suyun üzerinde yürüyüş yolları var ama birkaç basamak da var. Rehberin önceden ne beklemen gerektiğini söyler." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Yerebatan Sarnıcı, Sultanahmet'in tam kalbinde, Ayasofya ve Sultanahmet Camii'ne yalnızca bir dakikalık yürüme mesafesinde yer alır. En kolay ulaşım, T1 tramvayıyla Sultanahmet durağına inmek; giriş buradan kısa ve düz bir yürüyüş kadar uzaktadır. Zaten eski şehrin ana meydanını geziyorsanız, bir yapıdan diğerine rahatça yürüyebilirsiniz.",
          "Sarnıç, hava nasıl olursa olsun serin ve loş kalır; bu da onu sıcak yaz öğleden sonralarında ferah bir sığınağa dönüştürür. Yine de en kalabalık saatler öğle vaktidir, bu yüzden erken saatte ya da öğleden sonranın sonunda gelmek size daha sakin yürüyüş yolları bırakır. Yenilenen aydınlatma her saat etkileyici görünür ve bu yeraltı dünyasına inmek için kötü bir mevsim yoktur.",
          "Giriş biletlidir ve suyun üzerindeki yükseltilmiş platformlarda yüzlerce sütunun arasından geçerek en uçtaki ünlü Medusa başlarına ulaşırsınız. Yankılarla dolu, yavaş keşfi ödüllendiren atmosferik bir mekân sizi bekler. Lisanslı bir VibeGuide yerel rehberi biletinizi ayarlayabilir, ziyaretinizi kalabalıktan uzak bir saate göre planlayabilir ve gölgelerin arasında ilerlerken Bizans tarihini canlandırabilir.",
        ],
        ctaTitle: "Sarnıcı bir yerelle keşfet",
        ...IST.tr,
      },
      it: {
        name: "Cisterna Basilica",
        metaTitle: "Tour della Cisterna Basilica (Yerebatan) con guide locali",
        metaDescription:
          "Scendi nella Cisterna Basilica, il palazzo d'acqua sotterraneo di Istanbul. Ammira le teste di Medusa e le 336 colonne con una guida locale verificata.",
        intro: [
          "Sotto le strade di Sultanahmet si nasconde la Cisterna Basilica — un serbatoio sotterraneo di 1.500 anni con 336 colonne di marmo, luce soffusa ed echi di gocce. I bizantini la costruirono per rifornire d'acqua il Gran Palazzo; oggi è uno degli spazi più suggestivi di Istanbul.",
          "Un locale di VibeGuide ti spiega le teste di Medusa capovolte, perché le colonne furono recuperate da templi più antichi e le leggende cresciute nel buio — trasformando una breve visita in una vera storia.",
        ],
        highlights: [
          { title: "Le teste di Medusa", desc: "Due antichi volti di Medusa, posti di lato e capovolti — nessuno sa del tutto perché." },
          { title: "336 colonne", desc: "Recuperate da rovine romane più antiche, ognuna leggermente diversa." },
          { title: "L'atmosfera", desc: "Fresca, in penombra e piena di echi — un set cinematografico che prende vita sotto la città." },
        ],
        faqs: [
          { q: "Vale la pena visitare la Cisterna Basilica?", a: "Assolutamente — è breve ma indimenticabile, e la storia la rende molto più ricca. Una guida ti mostra dettagli che la maggior parte dei visitatori ignora." },
          { q: "Quanto dura la visita?", a: "Di solito 30–45 minuti, facile da abbinare a Santa Sofia e alla Moschea Blu lì accanto." },
          { q: "È accessibile?", a: "Ci sono passerelle sopra l'acqua, ma anche qualche gradino. La tua guida ti dice cosa aspettarti in anticipo." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "La Cisterna Basilica si trova nel cuore di Sultanahmet, a un minuto scarso a piedi da Santa Sofia e dalla Moschea Blu. Il modo più semplice per arrivare è il tram T1 fino alla fermata Sultanahmet, da cui l'ingresso dista una breve passeggiata in piano. Se stai già esplorando la piazza principale della città vecchia, ti basta spostarti a piedi da un monumento all'altro.",
          "La cisterna resta fresca e in penombra con qualsiasi tempo, il che la rende un rifugio gradito nei caldi pomeriggi estivi. Ciononostante, è a metà giornata che si concentra la maggiore affluenza, perciò arrivare presto o nel tardo pomeriggio ti lascia passerelle più tranquille. L'illuminazione restaurata è suggestiva a ogni ora e non esiste una brutta stagione per scendere in questo mondo sotterraneo.",
          "L'ingresso è a pagamento e si percorrono passerelle rialzate sull'acqua tra centinaia di colonne fino alle celebri teste di Medusa in fondo. Ti aspetta uno spazio suggestivo e pieno di echi che premia l'esplorazione lenta. Una guida locale abilitata di VibeGuide può procurarti il biglietto, calibrare la visita lontano dalla ressa e dare vita alla storia bizantina mentre avanzi tra le ombre.",
        ],
        ctaTitle: "Esplora la Cisterna con un locale",
        ...IST.it,
      },
      pl: {
        name: "Cysterna Bazyliki",
        metaTitle: "Cysterna Bazyliki (Yerebatan) — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zejdź do Cysterny Bazyliki, podziemnego pałacu wody w Stambule. Zobacz głowy Meduzy i 336 kolumn z zweryfikowanym lokalnym przewodnikiem.",
        intro: [
          "Pod ulicami Sultanahmet kryje się Cysterna Bazyliki — liczący 1500 lat podziemny zbiornik z 336 marmurowymi kolumnami, przyćmionym światłem i echem kapiącej wody. Bizantyjczycy zbudowali ją, by zaopatrywać w wodę Wielki Pałac; dziś to jedno z najbardziej klimatycznych miejsc Stambułu.",
          "Lokalny przewodnik VibeGuide wyjaśnia odwrócone głowy Meduzy, dlaczego kolumny odzyskano ze starszych świątyń oraz legendy, które narodziły się w mroku — zamieniając krótką wizytę w prawdziwą opowieść.",
        ],
        highlights: [
          { title: "Głowy Meduzy", desc: "Dwie antyczne twarze Meduzy, ustawione bokiem i do góry nogami — nikt do końca nie wie dlaczego." },
          { title: "336 kolumn", desc: "Odzyskane ze starszych rzymskich ruin, każda nieco inna." },
          { title: "Atmosfera", desc: "Chłodna, przyćmiona i pełna echa — filmowa sceneria ożywająca pod miastem." },
        ],
        faqs: [
          { q: "Czy warto odwiedzić Cysternę Bazyliki?", a: "Zdecydowanie — jest krótka, ale niezapomniana, a historia czyni ją znacznie bogatszą. Przewodnik wskazuje szczegóły, które większość zwiedzających mija obojętnie." },
          { q: "Ile trwa zwiedzanie?", a: "Zwykle 30–45 minut, łatwo połączyć z Hagią Sophią i Błękitnym Meczetem tuż obok." },
          { q: "Czy jest dostępna dla osób z ograniczoną mobilnością?", a: "Nad wodą prowadzą pomosty, ale są też schody. Przewodnik z góry powie Ci, czego się spodziewać." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Cysterna Bazyliki znajduje się w samym sercu Sultanahmet, zaledwie minutę spacerem od Hagia Sophia i Błękitnego Meczetu. Najłatwiej dotrzeć tu tramwajem T1 do przystanku Sultanahmet, skąd do wejścia prowadzi krótka, płaska droga. Jeśli i tak zwiedzasz główny plac starego miasta, wystarczy przejść pieszo od jednego zabytku do drugiego.",
          "Cysterna pozostaje chłodna i mroczna bez względu na pogodę, co czyni ją miłym schronieniem w upalne letnie popołudnia. Mimo to największy tłok panuje w środku dnia, więc przyjście wcześnie rano lub późnym popołudniem zapewnia spokojniejsze pomosty. Odnowione oświetlenie robi wrażenie o każdej porze, a nie ma złej pory roku na zejście do tego podziemnego świata.",
          "Wstęp jest biletowany, a zwiedzanie prowadzi podwyższonymi pomostami nad wodą, wśród setek kolumn, aż do słynnych głów Meduzy na końcu. Czeka Cię pełna ech, nastrojowa przestrzeń, która nagradza powolne zwiedzanie. Licencjonowany lokalny przewodnik VibeGuide załatwi bilet, dopasuje porę wizyty z dala od tłumów i ożywi bizantyjską historię, gdy będziesz przemierzać cienie.",
        ],
        ctaTitle: "Odkryj Cysternę z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Basilica-cisterne",
        metaTitle: "Basilica-cisterne (Yerebatan)-tours & lokale gidsen",
        metaDescription:
          "Daal af in de Basilica-cisterne, het ondergrondse waterpaleis van Istanbul. Zie de Medusakoppen en 336 zuilen met een geverifieerde lokale gids.",
        intro: [
          "Onder de straten van Sultanahmet ligt de Basilica-cisterne — een 1.500 jaar oud ondergronds waterreservoir met 336 marmeren zuilen, gedempt licht en druppelende echo's. De Byzantijnen bouwden haar om het Grote Paleis van water te voorzien; vandaag is het een van de meest sfeervolle plekken van Istanbul.",
          "Een lokale VibeGuide legt de omgekeerde Medusakoppen uit, waarom zuilen werden hergebruikt uit oudere tempels en de legenden die in het donker ontstonden — en maakt van een kort bezoek een echt verhaal.",
        ],
        highlights: [
          { title: "De Medusakoppen", desc: "Twee antieke Medusagezichten, zijwaarts en ondersteboven geplaatst — niemand weet volledig waarom." },
          { title: "336 zuilen", desc: "Hergebruikt uit oudere Romeinse ruïnes, elk net iets anders." },
          { title: "De sfeer", desc: "Koel, schemerig en galmend — een filmset die tot leven komt onder de stad." },
        ],
        faqs: [
          { q: "Is de Basilica-cisterne de moeite waard?", a: "Absoluut — kort maar onvergetelijk, en de geschiedenis maakt het veel rijker. Een gids wijst details aan die de meeste bezoekers voorbijlopen." },
          { q: "Hoe lang duurt het bezoek?", a: "Meestal 30–45 minuten, makkelijk te combineren met de Hagia Sophia en de Blauwe Moskee ernaast." },
          { q: "Is het toegankelijk?", a: "Er zijn looppaden boven het water, maar ook enkele treden. Je gids vertelt je vooraf wat je kunt verwachten." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Basilica Cisterne ligt in het hart van Sultanahmet, op nauwelijks een minuut lopen van de Hagia Sophia en de Blauwe Moskee. Het eenvoudigst reis je met tram T1 tot de halte Sultanahmet, vanwaar de ingang op een korte, vlakke wandeling ligt. Verken je toch al het centrale plein van de oude stad, dan loop je gemakkelijk van de ene bezienswaardigheid naar de andere.",
          "De cisterne blijft koel en schemerig, wat het weer ook doet, waardoor het een welkome toevlucht is op warme zomermiddagen. Toch is het rond het middaguur het drukst, dus vroeg in de ochtend of laat in de middag heb je rustigere looppaden. De gerestaureerde verlichting oogt op elk uur indrukwekkend, en er is geen slecht seizoen om af te dalen in deze ondergrondse wereld.",
          "De toegang is met kaartje en je volgt verhoogde loopbruggen boven het water, langs honderden zuilen, tot de beroemde Medusakoppen achterin. Verwacht een sfeervolle, galmende ruimte die traag ontdekken beloont. Een erkende lokale VibeGuide-gids regelt je ticket, stemt je bezoek af op de rustige uren en brengt de Byzantijnse geschiedenis tot leven terwijl je door de schaduwen loopt.",
        ],
        ctaTitle: "Verken de cisterne met een local",
        ...IST.nl,
      },

    },
  },

  // ─────────────────────────────── BLUE MOSQUE ────────────────────────────────
  {
    slug: "blue-mosque",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🕌",
    image:
      "https://images.unsplash.com/photo-1591721042162-c0f6d2c0c5e5?q=80&w=1600",
    lat: 41.005407,
    lng: 28.976777,
    i18n: {
      en: {
        name: "Blue Mosque",
        metaTitle: "Blue Mosque (Sultanahmet) Tours & Local Guides",
        metaDescription:
          "Visit the Blue Mosque in Istanbul with a verified local guide. Six minarets, 20,000 İznik tiles and a working mosque — visited respectfully and explained.",
        intro: [
          "The Blue Mosque — Sultanahmet Mosque — faces Hagia Sophia across a garden square, six minarets rising over the old city. Inside, more than 20,000 hand-painted İznik tiles give the prayer hall its famous blue glow.",
          "It's a living mosque, not a museum. A VibeGuide local helps you visit respectfully — timing around prayers, dress, etiquette — and reveals the rivalry and ambition behind its construction.",
        ],
        highlights: [
          { title: "Six Minarets", desc: "A bold choice in 1616 that once rivalled Mecca itself." },
          { title: "20,000 İznik Tiles", desc: "Hand-painted blues and greens that name the mosque." },
          { title: "Cascading Domes", desc: "A pyramid of half-domes that defines the Istanbul skyline." },
        ],
        faqs: [
          { q: "Can tourists enter the Blue Mosque?", a: "Yes, outside prayer times, with modest dress. A guide handles the timing and etiquette so your visit is smooth and respectful." },
          { q: "Do I need to cover my head?", a: "Women cover their hair inside; scarves are usually available. Your guide tells you exactly what to bring." },
          { q: "Is it close to Hagia Sophia?", a: "They face each other across Sultanahmet square — a two-minute walk apart." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Blue Mosque stands in Sultanahmet, facing Hagia Sophia across a garden square, and reaching it is effortless. Take the T1 tram to the Sultanahmet stop and walk a couple of minutes into the square. With Hagia Sophia, Topkapi Palace, the Hippodrome and the Basilica Cistern all within easy strolling distance, the mosque fits perfectly into a walk through the old city's most famous quarter.",
          "Aim for early morning or late afternoon, when the light is gentle and the İznik tiles inside glow with a softer blue. These hours are also calmer, avoiding the midday rush. Spring and autumn bring the most pleasant weather and lighter crowds than high summer. As an active place of worship, the mosque closes to visitors during the five daily prayers, so plan your arrival between prayer times.",
          "Entry is free, but this is a living mosque with a strict dress code: cover shoulders and knees, remove your shoes at the door, and women cover their hair, with scarves provided at the entrance. Inside, the sheer scale and the tens of thousands of tiles can be overwhelming without context. A licensed VibeGuide local guide times your visit around the prayers, handles the etiquette, and explains the six minarets, the domes and the tilework in vivid detail.",
        ],
        ctaTitle: "Visit the Blue Mosque with a local",
        ...IST.en,
      },
      de: {
        name: "Blaue Moschee",
        metaTitle: "Blaue Moschee (Sultanahmet) Touren & lokale Guides",
        metaDescription:
          "Besuche die Blaue Moschee in Istanbul mit einem geprüften lokalen Guide. Sechs Minarette, 20.000 İznik-Fliesen und eine aktive Moschee — respektvoll erklärt.",
        intro: [
          "Die Blaue Moschee — Sultanahmet-Moschee — steht der Hagia Sophia über einen Gartenplatz hinweg gegenüber, sechs Minarette über der Altstadt. Im Inneren verleihen über 20.000 handbemalte İznik-Fliesen dem Gebetssaal sein berühmtes blaues Leuchten.",
          "Sie ist eine lebendige Moschee, kein Museum. Ein VibeGuide-Local hilft dir, respektvoll zu besuchen — Timing um die Gebete, Kleidung, Etikette — und enthüllt Rivalität und Ehrgeiz hinter ihrem Bau.",
        ],
        highlights: [
          { title: "Sechs Minarette", desc: "Eine kühne Wahl von 1616, die einst Mekka selbst Konkurrenz machte." },
          { title: "20.000 İznik-Fliesen", desc: "Handbemalte Blau- und Grüntöne, die der Moschee ihren Namen geben." },
          { title: "Kaskadierende Kuppeln", desc: "Eine Pyramide aus Halbkuppeln, die Istanbuls Skyline prägt." },
        ],
        faqs: [
          { q: "Dürfen Touristen die Blaue Moschee betreten?", a: "Ja, außerhalb der Gebetszeiten und in dezenter Kleidung. Ein Guide regelt Timing und Etikette für einen reibungslosen, respektvollen Besuch." },
          { q: "Muss ich mein Haar bedecken?", a: "Frauen bedecken drinnen ihr Haar; Tücher sind meist verfügbar. Dein Guide sagt dir genau, was du mitbringen solltest." },
          { q: "Liegt sie nahe der Hagia Sophia?", a: "Sie stehen einander am Sultanahmet-Platz gegenüber — zwei Gehminuten entfernt." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Die Blaue Moschee steht in Sultanahmet und blickt über einen Gartenplatz hinweg auf die Hagia Sophia; die Anreise ist mühelos. Nimm die T1-Straßenbahn bis zur Haltestelle Sultanahmet und gehe ein paar Minuten in den Platz hinein. Mit Hagia Sophia, Topkapı-Palast, dem Hippodrom und der Cisterna Basilica in bequemer Gehweite fügt sich die Moschee perfekt in einen Spaziergang durch das berühmteste Viertel der Altstadt ein.",
          "Ziele auf den frühen Morgen oder späten Nachmittag, wenn das Licht sanft ist und die İznik-Fliesen im Inneren in einem weicheren Blau leuchten. Diese Stunden sind auch ruhiger und meiden den Mittagsansturm. Frühling und Herbst bringen das angenehmste Wetter und weniger Andrang als der Hochsommer. Als aktiver Gebetsort schließt die Moschee während der fünf täglichen Gebete für Besucher, plane deine Ankunft also zwischen den Gebetszeiten.",
          "Der Eintritt ist frei, doch dies ist eine lebendige Moschee mit strengem Kleidercode: bedecke Schultern und Knie, zieh am Eingang die Schuhe aus, und Frauen bedecken ihr Haar, wobei am Eingang Tücher bereitliegen. Drinnen können die schiere Größe und die zehntausenden Fliesen ohne Erklärung überwältigen. Ein lizenzierter VibeGuide-Guide vor Ort legt deinen Besuch um die Gebete herum, kümmert sich um die Etikette und erläutert die sechs Minarette, die Kuppeln und die Fliesenkunst anschaulich.",
        ],
        ctaTitle: "Besuche die Blaue Moschee mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Голубая мечеть",
        metaTitle: "Голубая мечеть (Султанахмет): экскурсии с гидами",
        metaDescription:
          "Посетите Голубую мечеть в Стамбуле с проверенным местным гидом. Шесть минаретов, 20 000 изникских изразцов и действующая мечеть — с уважением и объяснением.",
        intro: [
          "Голубая мечеть — мечеть Султанахмет — смотрит на Айя-Софию через сад-площадь, шесть минаретов поднимаются над старым городом. Внутри более 20 000 расписанных вручную изникских изразцов дарят молитвенному залу его знаменитое синее сияние.",
          "Это действующая мечеть, а не музей. Местный гид VibeGuide поможет посетить её уважительно — время вокруг молитв, одежда, этикет — и раскроет соперничество и амбиции, стоявшие за её постройкой.",
        ],
        highlights: [
          { title: "Шесть минаретов", desc: "Смелый выбор 1616 года, что когда-то соперничал с самой Меккой." },
          { title: "20 000 изразцов Изника", desc: "Расписанные вручную синие и зелёные тона, давшие мечети имя." },
          { title: "Каскад куполов", desc: "Пирамида полукуполов, определяющая силуэт Стамбула." },
        ],
        faqs: [
          { q: "Можно ли туристам входить в Голубую мечеть?", a: "Да, вне времени молитв и в скромной одежде. Гид возьмёт на себя время и этикет, чтобы визит был гладким и уважительным." },
          { q: "Нужно ли покрывать голову?", a: "Женщины покрывают волосы внутри; платки обычно есть на месте. Гид точно скажет, что взять с собой." },
          { q: "Это рядом с Айя-Софией?", a: "Они стоят друг напротив друга на площади Султанахмет — две минуты пешком." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Голубая мечеть стоит в Султанахмете, обращённая к Святой Софии через садовую площадь, и добраться до неё проще простого. Доезжайте на трамвае T1 до остановки Sultanahmet и пройдите пару минут вглубь площади. Со Святой Софией, дворцом Топкапы, Ипподромом и цистерной Базилика в лёгкой пешей доступности мечеть идеально вписывается в прогулку по самому знаменитому кварталу старого города.",
          "Планируйте раннее утро или поздний день, когда свет мягкий, а изникские изразцы внутри светятся более нежной синевой. В эти часы и спокойнее, без полуденного наплыва. Весна и осень приносят самую приятную погоду и меньше народа, чем разгар лета. Как действующее место молитвы, мечеть закрыта для посетителей во время пяти ежедневных молитв, поэтому планируйте приход между их временами.",
          "Вход бесплатный, но это живая мечеть со строгим дресс-кодом: прикройте плечи и колени, снимите обувь у входа, а женщины покрывают волосы, платки выдают при входе. Внутри сам масштаб и десятки тысяч изразцов могут ошеломить без пояснений. Лицензированный местный гид VibeGuide подстроит визит под молитвы, возьмёт на себя правила этикета и живо расскажет о шести минаретах, куполах и изразцовом убранстве.",
        ],
        ctaTitle: "Посетить Голубую мечеть с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "المسجد الأزرق",
        metaTitle: "جولات المسجد الأزرق (السلطان أحمد) مع مرشدين",
        metaDescription:
          "زر المسجد الأزرق في إسطنبول مع مرشد محلي موثّق. ست مآذن و20 ألف بلاطة إزنيق ومسجد عامل — بزيارة محترمة وشرح وافٍ.",
        intro: [
          "المسجد الأزرق — مسجد السلطان أحمد — يقابل آيا صوفيا عبر ساحة حديقة، وست مآذن تعلو المدينة القديمة. في الداخل، أكثر من 20 ألف بلاطة إزنيق مرسومة يدويًا تمنح قاعة الصلاة توهجها الأزرق الشهير.",
          "إنه مسجد عامل وليس متحفًا. يساعدك مرشد VibeGuide المحلي على الزيارة باحترام — التوقيت حول الصلوات، واللباس، والآداب — ويكشف لك التنافس والطموح وراء بنائه.",
        ],
        highlights: [
          { title: "ست مآذن", desc: "اختيار جريء عام 1616 نافس يومًا مكة نفسها." },
          { title: "20 ألف بلاطة إزنيق", desc: "أزرق وأخضر مرسوم يدويًا، منه اكتسب المسجد اسمه." },
          { title: "قباب متدرّجة", desc: "هرم من أنصاف القباب يرسم أفق إسطنبول." },
        ],
        faqs: [
          { q: "هل يُسمح للسياح بدخول المسجد الأزرق؟", a: "نعم، خارج أوقات الصلاة وبلباس محتشم. يتولى المرشد التوقيت والآداب لتكون زيارتك سلسة ومحترمة." },
          { q: "هل عليّ تغطية رأسي؟", a: "تغطي النساء شعرهن في الداخل، وعادةً تتوفر أوشحة. يخبرك مرشدك تمامًا بما تحضره." },
          { q: "هل هو قريب من آيا صوفيا؟", a: "يتقابلان عبر ساحة السلطان أحمد — على بُعد دقيقتين سيرًا." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع المسجد الأزرق في حي السلطان أحمد، مقابلًا لآيا صوفيا عبر ساحة تتخللها حديقة، والوصول إليه لا يكلّف عناءً. استقل ترام T1 حتى محطة السلطان أحمد ثم امشِ دقيقتين داخل الساحة. ومع وجود آيا صوفيا وقصر توبكابي والميدان القديم وصهريج البازيليك على مسافة نزهة قصيرة، يندمج المسجد تمامًا ضمن جولة في أشهر أحياء المدينة القديمة.",
          "استهدف الصباح الباكر أو نهاية العصر، حين يكون الضوء لطيفًا وتتوهج بلاطات إزنيق في الداخل بزرقة أكثر نعومة. هذه الساعات أهدأ أيضًا وتتفادى زحمة الظهيرة. يجلب الربيع والخريف أفضل طقس وازدحامًا أقل من ذروة الصيف. وبوصفه مكان عبادة عاملًا، يُغلق المسجد أمام الزوار خلال الصلوات الخمس، فخطّط لوصولك بين أوقات الصلاة.",
          "الدخول مجاني، لكنه مسجد حيّ بقواعد لباس صارمة: غطِّ الكتفين والركبتين، واخلع حذاءك عند الباب، وتغطي النساء شعورهن، وتتوفر الأغطية عند المدخل. في الداخل قد تُبهرك الضخامة وعشرات الآلاف من البلاطات دون سياق يشرحها. يضبط لك مرشد VibeGuide المحلي المرخّص زيارتك حول أوقات الصلاة، ويتكفّل بآداب المكان، ويشرح لك المآذن الست والقباب وفن البلاط بتفصيل حيّ.",
        ],
        ctaTitle: "زر المسجد الأزرق مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Mezquita Azul",
        metaTitle: "Tours de la Mezquita Azul (Sultanahmet) con guías",
        metaDescription:
          "Visita la Mezquita Azul en Estambul con un guía local verificado. Seis minaretes, 20.000 azulejos de İznik y una mezquita en activo — con respeto y explicación.",
        intro: [
          "La Mezquita Azul — Mezquita de Sultanahmet — mira a Santa Sofía a través de una plaza ajardinada, con seis minaretes alzándose sobre la ciudad vieja. Dentro, más de 20.000 azulejos de İznik pintados a mano dan a la sala de oración su famoso brillo azul.",
          "Es una mezquita viva, no un museo. Un local de VibeGuide te ayuda a visitarla con respeto — horarios en torno a los rezos, vestimenta, etiqueta — y te revela la rivalidad y ambición tras su construcción.",
        ],
        highlights: [
          { title: "Seis minaretes", desc: "Una elección audaz de 1616 que llegó a rivalizar con la propia Meca." },
          { title: "20.000 azulejos de İznik", desc: "Azules y verdes pintados a mano que dan nombre a la mezquita." },
          { title: "Cúpulas en cascada", desc: "Una pirámide de semicúpulas que define el perfil de Estambul." },
        ],
        faqs: [
          { q: "¿Pueden entrar los turistas a la Mezquita Azul?", a: "Sí, fuera de las horas de oración y con ropa modesta. Un guía gestiona el horario y la etiqueta para una visita fluida y respetuosa." },
          { q: "¿Debo cubrirme la cabeza?", a: "Las mujeres se cubren el pelo dentro; suele haber pañuelos disponibles. Tu guía te dice exactamente qué llevar." },
          { q: "¿Está cerca de Santa Sofía?", a: "Se miran frente a frente en la plaza de Sultanahmet — a dos minutos a pie." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "La Mezquita Azul se alza en Sultanahmet, frente a Santa Sofía al otro lado de una plaza ajardinada, y llegar es facilísimo. Toma el tranvía T1 hasta la parada Sultanahmet y camina un par de minutos hacia la plaza. Con Santa Sofía, el Palacio de Topkapi, el Hipódromo y la Cisterna Basílica a un cómodo paseo, la mezquita encaja a la perfección en un recorrido por el barrio más famoso de la ciudad vieja.",
          "Apunta a primera hora de la mañana o al final de la tarde, cuando la luz es suave y los azulejos de İznik del interior brillan con un azul más tenue. Esas horas son también más tranquilas y evitan el bullicio del mediodía. La primavera y el otoño traen el clima más agradable y menos gente que en pleno verano. Como lugar de culto en uso, la mezquita cierra al turismo durante los cinco rezos diarios, así que planifica tu llegada entre ellos.",
          "La entrada es gratuita, pero es una mezquita viva con un código de vestimenta estricto: cubre hombros y rodillas, descálzate en la puerta y las mujeres cubren el cabello, con pañuelos disponibles en la entrada. Dentro, la escala y las decenas de miles de azulejos pueden abrumar sin contexto. Un guía local titulado de VibeGuide organiza tu visita en torno a los rezos, se encarga de la etiqueta y te explica los seis minaretes, las cúpulas y la azulejería con todo detalle.",
        ],
        ctaTitle: "Visita la Mezquita Azul con un local",
        ...IST.es,
      },
      fr: {
        name: "Mosquée Bleue",
        metaTitle: "Visites de la Mosquée Bleue (Sultanahmet) avec guides",
        metaDescription:
          "Visitez la Mosquée Bleue à Istanbul avec un guide local vérifié. Six minarets, 20 000 carreaux d'İznik et une mosquée en activité — avec respect et explications.",
        intro: [
          "La Mosquée Bleue — mosquée de Sultanahmet — fait face à Sainte-Sophie de part et d'autre d'une place-jardin, six minarets s'élevant sur la vieille ville. À l'intérieur, plus de 20 000 carreaux d'İznik peints à la main donnent à la salle de prière son célèbre éclat bleu.",
          "C'est une mosquée vivante, pas un musée. Un local VibeGuide vous aide à la visiter avec respect — horaires autour des prières, tenue, étiquette — et révèle la rivalité et l'ambition derrière sa construction.",
        ],
        highlights: [
          { title: "Six minarets", desc: "Un choix audacieux de 1616 qui rivalisa un temps avec La Mecque elle-même." },
          { title: "20 000 carreaux d'İznik", desc: "Bleus et verts peints à la main qui donnent son nom à la mosquée." },
          { title: "Coupoles en cascade", desc: "Une pyramide de demi-coupoles qui dessine la silhouette d'Istanbul." },
        ],
        faqs: [
          { q: "Les touristes peuvent-ils entrer dans la Mosquée Bleue ?", a: "Oui, hors des heures de prière et en tenue modeste. Un guide gère les horaires et l'étiquette pour une visite fluide et respectueuse." },
          { q: "Dois-je me couvrir la tête ?", a: "Les femmes couvrent leurs cheveux à l'intérieur ; des foulards sont généralement fournis. Votre guide vous dit exactement quoi apporter." },
          { q: "Est-ce près de Sainte-Sophie ?", a: "Elles se font face sur la place Sultanahmet — à deux minutes à pied." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "La Mosquée Bleue se dresse à Sultanahmet, face à Sainte-Sophie de l'autre côté d'une place-jardin, et s'y rendre est un jeu d'enfant. Prenez le tramway T1 jusqu'à l'arrêt Sultanahmet et marchez deux minutes vers la place. Avec Sainte-Sophie, le palais de Topkapi, l'Hippodrome et la Citerne Basilique à quelques pas, la mosquée s'inscrit parfaitement dans une promenade à travers le quartier le plus célèbre de la vieille ville.",
          "Visez tôt le matin ou en fin d'après-midi, quand la lumière est douce et que les faïences d'İznik brillent d'un bleu plus tendre à l'intérieur. Ces heures sont aussi plus calmes et évitent l'affluence de la mi-journée. Le printemps et l'automne offrent le climat le plus agréable et moins de monde qu'en plein été. Lieu de culte en activité, la mosquée ferme aux visiteurs pendant les cinq prières quotidiennes : prévoyez d'arriver entre deux prières.",
          "L'entrée est gratuite, mais c'est une mosquée vivante au code vestimentaire strict : couvrez épaules et genoux, retirez vos chaussures à la porte, et les femmes couvrent leurs cheveux, des foulards étant fournis à l'entrée. À l'intérieur, l'immensité et les dizaines de milliers de faïences peuvent déconcerter sans repères. Un guide local agréé VibeGuide cale votre visite sur les prières, gère l'étiquette et vous explique en détail les six minarets, les coupoles et le décor de faïence.",
        ],
        ctaTitle: "Visitez la Mosquée Bleue avec un local",
        ...IST.fr,
      },
      el: {
        name: "Μπλε Τζαμί",
        metaTitle: "Ξεναγήσεις στο Μπλε Τζαμί (Σουλταναχμέτ)",
        metaDescription:
          "Επισκέψου το Μπλε Τζαμί στην Κωνσταντινούπολη με πιστοποιημένο ντόπιο ξεναγό. Έξι μιναρέδες, 20.000 πλακάκια İznik και ένα ενεργό τζαμί — με σεβασμό και επεξήγηση.",
        intro: [
          "Το Μπλε Τζαμί — Τζαμί του Σουλταναχμέτ — αντικρίζει την Αγία Σοφία πάνω από μια πλατεία-κήπο, με έξι μιναρέδες να υψώνονται πάνω από την παλιά πόλη. Μέσα, πάνω από 20.000 ζωγραφισμένα στο χέρι πλακάκια İznik δίνουν στην αίθουσα προσευχής τη φημισμένη γαλάζια λάμψη της.",
          "Είναι ζωντανό τζαμί, όχι μουσείο. Ένας ντόπιος του VibeGuide σε βοηθά να το επισκεφθείς με σεβασμό — ώρες γύρω από τις προσευχές, ένδυση, εθιμοτυπία — και αποκαλύπτει την άμιλλα και τη φιλοδοξία πίσω από την κατασκευή του.",
        ],
        highlights: [
          { title: "Έξι μιναρέδες", desc: "Μια τολμηρή επιλογή του 1616 που κάποτε συναγωνίστηκε την ίδια τη Μέκκα." },
          { title: "20.000 πλακάκια İznik", desc: "Γαλάζια και πράσινα ζωγραφισμένα στο χέρι που έδωσαν το όνομα στο τζαμί." },
          { title: "Κλιμακωτοί τρούλοι", desc: "Μια πυραμίδα ημιτρούλων που ορίζει τον ορίζοντα της Κωνσταντινούπολης." },
        ],
        faqs: [
          { q: "Μπορούν οι τουρίστες να μπουν στο Μπλε Τζαμί;", a: "Ναι, εκτός ωρών προσευχής και με σεμνό ντύσιμο. Ο ξεναγός φροντίζει τον χρόνο και την εθιμοτυπία για μια ομαλή και σεβαστική επίσκεψη." },
          { q: "Πρέπει να καλύψω το κεφάλι μου;", a: "Οι γυναίκες καλύπτουν τα μαλλιά τους μέσα· συνήθως υπάρχουν μαντίλια. Ο ξεναγός σου λέει ακριβώς τι να φέρεις." },
          { q: "Είναι κοντά στην Αγία Σοφία;", a: "Αντικρίζονται στην πλατεία Σουλταναχμέτ — δύο λεπτά με τα πόδια." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Μπλε Τζαμί βρίσκεται στο Σουλταναχμέτ, απέναντι από την Αγία Σοφία, με μια κηπευτική πλατεία ανάμεσά τους, και η πρόσβαση είναι πανεύκολη. Πάρτε το τραμ T1 μέχρι τη στάση Sultanahmet και περπατήστε δυο λεπτά μέσα στην πλατεία. Με την Αγία Σοφία, το Ανάκτορο Τοπκαπί, τον Ιππόδρομο και την Κινστέρνα Βασιλική σε άνετη απόσταση βάδην, το τζαμί εντάσσεται τέλεια σε μια βόλτα στην πιο ξακουστή συνοικία της παλιάς πόλης.",
          "Στοχεύστε νωρίς το πρωί ή αργά το απόγευμα, όταν το φως είναι απαλό και τα πλακίδια Ιζνίκ μέσα λάμπουν με ένα πιο τρυφερό μπλε. Αυτές οι ώρες είναι και πιο ήρεμες, αποφεύγοντας το μεσημεριανό συνωστισμό. Η άνοιξη και το φθινόπωρο φέρνουν τον πιο ευχάριστο καιρό και λιγότερο κόσμο από την καρδιά του καλοκαιριού. Ως ενεργός χώρος λατρείας, το τζαμί κλείνει για τους επισκέπτες κατά τις πέντε προσευχές, γι' αυτό προγραμματίστε την άφιξή σας ενδιάμεσα.",
          "Η είσοδος είναι δωρεάν, όμως είναι ζωντανό τζαμί με αυστηρό κώδικα ένδυσης: καλύψτε ώμους και γόνατα, βγάλτε τα παπούτσια σας στην πόρτα, και οι γυναίκες καλύπτουν τα μαλλιά τους, ενώ μαντίλες διατίθενται στην είσοδο. Μέσα, η κλίμακα και οι δεκάδες χιλιάδες πλακίδια μπορεί να σας κατακλύσουν χωρίς επεξήγηση. Ένας αδειούχος τοπικός ξεναγός της VibeGuide ρυθμίζει την επίσκεψη γύρω από τις προσευχές, φροντίζει την εθιμοτυπία και εξηγεί τους έξι μιναρέδες, τους τρούλους και τη διακόσμηση με ζωντάνια.",
        ],
        ctaTitle: "Επισκέψου το Μπλε Τζαμί με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Sultanahmet Camii",
        metaTitle: "Sultanahmet Camii Turları & Yerel Rehberler",
        metaDescription:
          "İstanbul'da Sultanahmet Camii'ni (Mavi Cami) doğrulanmış bir yerel rehberle ziyaret et. Altı minare, 20.000 İznik çinisi ve ibadete açık bir cami — saygıyla ve anlatımla.",
        intro: [
          "Sultanahmet Camii — Mavi Cami — bir bahçe meydanının karşısından Ayasofya'ya bakar, altı minaresi eski şehrin üzerinde yükselir. İçeride, 20.000'den fazla el boyaması İznik çinisi ibadet salonuna ünlü mavi parıltısını verir.",
          "Burası bir müze değil, ibadete açık bir camidir. VibeGuide yerel rehberi saygıyla ziyaret etmene yardım eder — namaz vakitleri, kıyafet, adap — ve yapımının ardındaki rekabet ile hırsı anlatır.",
        ],
        highlights: [
          { title: "Altı Minare", desc: "1616'da cesur bir tercih; bir zamanlar Mekke ile yarıştı." },
          { title: "20.000 İznik Çinisi", desc: "Camiye adını veren el boyaması maviler ve yeşiller." },
          { title: "Kademeli Kubbeler", desc: "İstanbul siluetini belirleyen yarım kubbelerden bir piramit." },
        ],
        faqs: [
          { q: "Turistler Sultanahmet Camii'ne girebilir mi?", a: "Evet, namaz vakitleri dışında ve sade kıyafetle. Rehber, ziyaretin akıcı ve saygılı olması için zamanlamayı ve adabı ayarlar." },
          { q: "Başımı örtmem gerekir mi?", a: "Kadınlar içeride saçlarını örter; genelde örtü temin edilir. Rehberin tam olarak ne getirmen gerektiğini söyler." },
          { q: "Ayasofya'ya yakın mı?", a: "Sultanahmet meydanında karşılıklı dururlar — iki dakikalık yürüme mesafesi." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Sultanahmet Camii, bir bahçe meydanının karşısında Ayasofya'ya bakar ve ulaşımı zahmetsizdir. T1 tramvayına binip Sultanahmet durağında inin, meydanın içine doğru birkaç dakika yürüyün. Ayasofya, Topkapı Sarayı, At Meydanı ve Yerebatan Sarnıcı rahat yürüme mesafesindeyken cami, eski şehrin en ünlü semtindeki bir yürüyüşe kusursuzca uyar.",
          "Işığın yumuşak olduğu ve içerideki İznik çinilerinin daha dingin bir maviyle parladığı sabahın erken saatlerini ya da öğleden sonranın sonunu hedefleyin. Bu saatler aynı zamanda daha sakindir ve öğle kalabalığını atlatır. İlkbahar ve sonbahar, yaz ortasına göre daha hoş bir hava ve daha az izdiham getirir. Faal bir ibadethane olarak cami, beş vakit namaz süresince ziyarete kapanır; bu yüzden gelişinizi namaz araları için planlayın.",
          "Giriş ücretsizdir, ancak burası katı bir kıyafet kuralı olan yaşayan bir camidir: omuzları ve dizleri örtün, kapıda ayakkabılarınızı çıkarın; kadınlar saçlarını örter, girişte örtü verilir. İçeride, ölçek ve on binlerce çini bir bağlam olmadan insanı kolayca ezebilir. Ruhsatlı bir VibeGuide yerel rehberi ziyaretinizi namaz vakitlerine göre ayarlar, görgü kurallarını üstlenir ve altı minareyi, kubbeleri ve çini işçiliğini capcanlı bir dille anlatır.",
        ],
        ctaTitle: "Sultanahmet Camii'ni bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Moschea Blu",
        metaTitle: "Tour della Moschea Blu (Sultanahmet) con guide locali",
        metaDescription:
          "Visita la Moschea Blu a Istanbul con una guida locale verificata. Sei minareti, 20.000 piastrelle di İznik e una moschea attiva — visitata con rispetto e spiegata.",
        intro: [
          "La Moschea Blu — Moschea di Sultanahmet — si affaccia su Santa Sofia oltre una piazza-giardino, con sei minareti che si ergono sulla città vecchia. All'interno, oltre 20.000 piastrelle di İznik dipinte a mano donano alla sala di preghiera il suo celebre bagliore azzurro.",
          "È una moschea viva, non un museo. Un locale di VibeGuide ti aiuta a visitarla con rispetto — orari attorno alle preghiere, abbigliamento, etichetta — e svela la rivalità e l'ambizione dietro la sua costruzione.",
        ],
        highlights: [
          { title: "Sei minareti", desc: "Una scelta audace nel 1616 che un tempo rivaleggiò con la stessa Mecca." },
          { title: "20.000 piastrelle di İznik", desc: "Blu e verdi dipinti a mano che danno il nome alla moschea." },
          { title: "Cupole a cascata", desc: "Una piramide di semicupole che definisce lo skyline di Istanbul." },
        ],
        faqs: [
          { q: "I turisti possono entrare nella Moschea Blu?", a: "Sì, fuori dagli orari di preghiera e con abbigliamento sobrio. Una guida gestisce orari ed etichetta perché la tua visita sia serena e rispettosa." },
          { q: "Devo coprirmi la testa?", a: "Le donne si coprono i capelli all'interno; di solito sono disponibili dei foulard. La tua guida ti dice esattamente cosa portare." },
          { q: "È vicina a Santa Sofia?", a: "Si affacciano l'una sull'altra attraverso la piazza di Sultanahmet — a due minuti a piedi di distanza." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "La Moschea Blu sorge a Sultanahmet, di fronte a Santa Sofia oltre una piazza-giardino, e raggiungerla non richiede alcuno sforzo. Prendi il tram T1 fino alla fermata Sultanahmet e cammina un paio di minuti verso la piazza. Con Santa Sofia, il Palazzo Topkapi, l'Ippodromo e la Cisterna Basilica a comoda distanza a piedi, la moschea si inserisce alla perfezione in una passeggiata nel quartiere più celebre della città vecchia.",
          "Punta al mattino presto o al tardo pomeriggio, quando la luce è morbida e le piastrelle di İznik all'interno brillano di un azzurro più tenue. Sono anche le ore più tranquille, che evitano la ressa di mezzogiorno. La primavera e l'autunno portano il clima più piacevole e meno folla rispetto alla piena estate. Essendo un luogo di culto attivo, la moschea chiude ai visitatori durante le cinque preghiere quotidiane, quindi pianifica l'arrivo tra una preghiera e l'altra.",
          "L'ingresso è gratuito, ma è una moschea viva con un rigido codice di abbigliamento: copri spalle e ginocchia, togli le scarpe all'ingresso e le donne coprono i capelli, con foulard forniti all'entrata. All'interno la scala imponente e le decine di migliaia di piastrelle possono disorientare senza contesto. Una guida locale abilitata di VibeGuide organizza la visita attorno alle preghiere, gestisce l'etichetta e ti spiega nel dettaglio i sei minareti, le cupole e le decorazioni in ceramica.",
        ],
        ctaTitle: "Visita la Moschea Blu con un locale",
        ...IST.it,
      },
      pl: {
        name: "Błękitny Meczet",
        metaTitle: "Błękitny Meczet (Sultanahmet) — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Odwiedź Błękitny Meczet w Stambule z zweryfikowanym lokalnym przewodnikiem. Sześć minaretów, 20 000 płytek z İznik i czynny meczet — zwiedzany z szacunkiem i objaśniony.",
        intro: [
          "Błękitny Meczet — Meczet Sultanahmet — stoi naprzeciw Hagii Sophii po drugiej stronie ogrodowego placu, a sześć minaretów wznosi się nad starym miastem. W środku ponad 20 000 ręcznie malowanych płytek z İznik nadaje sali modlitewnej słynną błękitną poświatę.",
          "To żywy meczet, a nie muzeum. Lokalny przewodnik VibeGuide pomaga zwiedzać go z szacunkiem — dobór pory wokół modlitw, strój, etykieta — i odsłania rywalizację oraz ambicję stojące za jego budową.",
        ],
        highlights: [
          { title: "Sześć minaretów", desc: "Śmiały wybór w 1616 roku, który niegdyś rywalizował z samą Mekką." },
          { title: "20 000 płytek z İznik", desc: "Ręcznie malowane błękity i zielenie, od których meczet wziął nazwę." },
          { title: "Kaskada kopuł", desc: "Piramida półkopuł, która definiuje panoramę Stambułu." },
        ],
        faqs: [
          { q: "Czy turyści mogą wejść do Błękitnego Meczetu?", a: "Tak, poza godzinami modlitwy i w skromnym stroju. Przewodnik zajmuje się doborem pory i etykietą, aby wizyta była płynna i pełna szacunku." },
          { q: "Czy muszę zakryć głowę?", a: "Kobiety zakrywają włosy w środku; chusty są zwykle dostępne na miejscu. Przewodnik dokładnie powie Ci, co zabrać." },
          { q: "Czy to blisko Hagii Sophii?", a: "Stoją naprzeciw siebie po dwóch stronach placu Sultanahmet — dwie minuty spacerem." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Błękitny Meczet stoi w Sultanahmet, naprzeciw Hagii Sophii, po drugiej stronie ogrodowego placu, a dotarcie do niego jest bezproblemowe. Wsiądź w tramwaj T1 do przystanku Sultanahmet i przejdź kilka minut w głąb placu. Z Hagią Sophią, Pałacem Topkapi, Hipodromem i Cysterną Bazyliki w wygodnym zasięgu spaceru meczet doskonale wpisuje się w wędrówkę po najsłynniejszej dzielnicy starego miasta.",
          "Celuj we wczesny ranek lub późne popołudnie, gdy światło jest łagodne, a płytki z İznika w środku lśnią delikatniejszym błękitem. To także spokojniejsze godziny, pozwalające ominąć południowy tłok. Wiosna i jesień przynoszą najprzyjemniejszą pogodę i mniejszy tłok niż w pełni lata. Jako czynne miejsce kultu meczet zamyka się dla zwiedzających podczas pięciu codziennych modlitw, więc zaplanuj przybycie między nimi.",
          "Wstęp jest bezpłatny, ale to żywy meczet z surowym kodeksem ubioru: zakryj ramiona i kolana, zdejmij buty przy wejściu, a kobiety nakrywają włosy, przy czym chusty dostępne są przy wejściu. W środku sama skala i dziesiątki tysięcy płytek mogą przytłoczyć bez kontekstu. Licencjonowany lokalny przewodnik VibeGuide dopasuje wizytę do modlitw, zadba o etykietę i barwnie objaśni sześć minaretów, kopuły oraz zdobienia z płytek.",
        ],
        ctaTitle: "Odwiedź Błękitny Meczet z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Blauwe Moskee",
        metaTitle: "Blauwe Moskee (Sultanahmet)-tours & lokale gidsen",
        metaDescription:
          "Bezoek de Blauwe Moskee in Istanbul met een geverifieerde lokale gids. Zes minaretten, 20.000 İznik-tegels en een actieve moskee — respectvol bezocht en uitgelegd.",
        intro: [
          "De Blauwe Moskee — Sultanahmet-moskee — staat tegenover de Hagia Sophia aan een tuinplein, met zes minaretten die boven de oude stad uitrijzen. Binnen geven meer dan 20.000 handgeschilderde İznik-tegels de gebedshal zijn beroemde blauwe gloed.",
          "Het is een levende moskee, geen museum. Een lokale VibeGuide helpt je respectvol te bezoeken — timing rond de gebeden, kleding, etiquette — en onthult de rivaliteit en ambitie achter de bouw.",
        ],
        highlights: [
          { title: "Zes minaretten", desc: "Een gedurfde keuze in 1616 die ooit wedijverde met Mekka zelf." },
          { title: "20.000 İznik-tegels", desc: "Handgeschilderde blauw- en groentinten die de moskee haar naam geven." },
          { title: "Cascade van koepels", desc: "Een piramide van halve koepels die de skyline van Istanbul bepaalt." },
        ],
        faqs: [
          { q: "Mogen toeristen de Blauwe Moskee binnen?", a: "Ja, buiten gebedstijden en met bescheiden kleding. Een gids regelt de timing en etiquette zodat je bezoek soepel en respectvol verloopt." },
          { q: "Moet ik mijn hoofd bedekken?", a: "Vrouwen bedekken hun haar binnen; sjaals zijn er meestal beschikbaar. Je gids vertelt je precies wat je moet meenemen." },
          { q: "Ligt het dicht bij de Hagia Sophia?", a: "Ze staan tegenover elkaar aan het Sultanahmet-plein — op twee minuten lopen van elkaar." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Blauwe Moskee staat in Sultanahmet, tegenover de Hagia Sophia aan de overkant van een tuinplein, en ernaartoe gaan is moeiteloos. Neem de T1-tram tot halte Sultanahmet en loop een paar minuten het plein op. Met de Hagia Sophia, het Topkapipaleis, het Hippodroom en de Basilica Cisterne op comfortabele loopafstand past de moskee perfect in een wandeling door de beroemdste wijk van de oude stad.",
          "Mik op de vroege ochtend of de late namiddag, wanneer het licht zacht is en de İznik-tegels binnen in een tederder blauw oplichten. Die uren zijn ook rustiger en vermijden de drukte rond het middaguur. Lente en herfst brengen het aangenaamste weer en minder drukte dan het hoogseizoen. Als actieve gebedsplaats sluit de moskee voor bezoekers tijdens de vijf dagelijkse gebeden, dus plan je aankomst tussen de gebeden in.",
          "De toegang is gratis, maar het is een levende moskee met een strikte kledingcode: bedek schouders en knieën, doe je schoenen uit bij de deur, en vrouwen bedekken hun haar, waarbij bij de ingang doeken beschikbaar zijn. Binnen kunnen de schaal en de tienduizenden tegels overweldigen zonder context. Een erkende lokale VibeGuide-gids stemt je bezoek af op de gebeden, regelt de etiquette en legt de zes minaretten, de koepels en het tegelwerk levendig uit.",
        ],
        ctaTitle: "Bezoek de Blauwe Moskee met een local",
        ...IST.nl,
      },

    },
  },

  // ─────────────────────────────────── EPHESUS ────────────────────────────────
  {
    slug: "ephesus",
    city: "Ephesus",
    citySlug: "izmir",
    emoji: "🏛️",
    image:
      "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?q=80&w=1600",
    lat: 37.939872,
    lng: 27.340995,
    i18n: {
      en: {
        name: "Ephesus",
        metaTitle: "Ephesus Tours & Local Guides",
        metaDescription:
          "Walk ancient Ephesus near Selçuk, İzmir with a verified local guide. The Library of Celsus, the Great Theatre and marble streets — brought to life.",
        intro: [
          "Ephesus was one of the greatest cities of the ancient world — a Roman metropolis of a quarter-million people, where Mark Antony walked and St Paul preached. Its marble streets, the towering Library of Celsus and a theatre for 25,000 still stand near Selçuk.",
          "A VibeGuide local turns ruins into a living city — who lived here, where they bathed, shopped and worshipped — so the stones tell their story instead of staying silent.",
        ],
        highlights: [
          { title: "Library of Celsus", desc: "A two-storey marble façade, once home to 12,000 scrolls." },
          { title: "Great Theatre", desc: "Seating for 25,000 — still used for events today." },
          { title: "Terrace Houses", desc: "Mosaic-floored homes of the Roman elite, under cover." },
        ],
        faqs: [
          { q: "Where is Ephesus?", a: "Near Selçuk in İzmir province, about an hour from İzmir city and close to Kuşadası port." },
          { q: "How long do I need?", a: "Plan 2–3 hours on site; a guide keeps you in the shade and out of the crowds." },
          { q: "Is it good for cruise passengers?", a: "Yes — it's a classic shore excursion from Kuşadası. A local guide makes the most of limited time." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Ephesus lies near the town of Selçuk in İzmir province, on the Aegean coast of western Turkey. It is remarkably easy to reach: roughly a 20-minute drive from the Kuşadası cruise port and about an hour from İzmir, with Selçuk itself just a few minutes away by taxi or dolmuş minibus. The site has two entrances, an upper and a lower gate, and many visitors walk downhill between them.",
          "Ephesus is vast and offers very little shade, so timing matters as much as anything. Aim for early morning soon after opening or the late afternoon, when the light softens and the marble cools; avoid the harsh midday hours, especially in summer. Spring and autumn are the most comfortable seasons. Whenever you come, bring water, a hat and sturdy shoes, and allow two to three hours to see it properly.",
          "This is a ticketed archaeological site, and the beautifully preserved Terrace Houses require a separate ticket that is well worth it. There is a great deal to take in, from the Library of Celsus to the grand theatre, and by law only a licensed guide may lead you through the ruins. A licensed VibeGuide local guide handles tickets and timing, finds the shaded corners, and turns scattered stones into a vivid, living city.",
        ],
        ctaTitle: "Walk Ephesus with a local",
        ...EPH.en,
      },
      de: {
        name: "Ephesos",
        metaTitle: "Ephesos Touren & lokale Guides",
        metaDescription:
          "Erkunde das antike Ephesos bei Selçuk, İzmir mit einem geprüften lokalen Guide. Celsus-Bibliothek, großes Theater und Marmorstraßen — zum Leben erweckt.",
        intro: [
          "Ephesos war eine der größten Städte der Antike — eine römische Metropole mit einer Viertelmillion Menschen, wo Mark Anton wandelte und der Apostel Paulus predigte. Seine Marmorstraßen, die hoch aufragende Celsus-Bibliothek und ein Theater für 25.000 stehen noch bei Selçuk.",
          "Ein VibeGuide-Local verwandelt Ruinen in eine lebendige Stadt — wer hier lebte, wo man badete, einkaufte und betete — damit die Steine ihre Geschichte erzählen, statt zu schweigen.",
        ],
        highlights: [
          { title: "Celsus-Bibliothek", desc: "Eine zweistöckige Marmorfassade, einst Heimat von 12.000 Schriftrollen." },
          { title: "Großes Theater", desc: "Platz für 25.000 — bis heute für Veranstaltungen genutzt." },
          { title: "Hanghäuser", desc: "Mosaikböden der römischen Elite, überdacht." },
        ],
        faqs: [
          { q: "Wo liegt Ephesos?", a: "Bei Selçuk in der Provinz İzmir, etwa eine Stunde von der Stadt İzmir und nahe dem Hafen Kuşadası." },
          { q: "Wie viel Zeit brauche ich?", a: "Plane 2–3 Stunden vor Ort; ein Guide hält dich im Schatten und abseits der Menge." },
          { q: "Ist es gut für Kreuzfahrtgäste?", a: "Ja — ein klassischer Landausflug von Kuşadası. Ein lokaler Guide nutzt die knappe Zeit optimal." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Ephesus liegt nahe der Stadt Selçuk in der Provinz İzmir, an der Ägäisküste im Westen der Türkei. Es ist bemerkenswert leicht zu erreichen: rund 20 Autominuten vom Kreuzfahrthafen Kuşadası und etwa eine Stunde von İzmir entfernt, während Selçuk selbst nur wenige Minuten mit dem Taxi oder Dolmuş-Minibus entfernt ist. Die Stätte hat zwei Eingänge, ein oberes und ein unteres Tor, und viele Besucher gehen bergab zwischen ihnen hindurch.",
          "Ephesus ist weitläufig und bietet nur sehr wenig Schatten, daher ist das richtige Timing entscheidend. Ziele auf den frühen Morgen kurz nach der Öffnung oder den späten Nachmittag, wenn das Licht weicher wird und der Marmor abkühlt; meide die harten Mittagsstunden, besonders im Sommer. Frühling und Herbst sind die angenehmsten Jahreszeiten. Wann immer du kommst, nimm Wasser, einen Hut und festes Schuhwerk mit und plane zwei bis drei Stunden ein, um alles in Ruhe zu sehen.",
          "Dies ist eine kostenpflichtige archäologische Stätte, und die wunderbar erhaltenen Hanghäuser erfordern ein separates Ticket, das sich absolut lohnt. Es gibt sehr viel zu entdecken, von der Celsus-Bibliothek bis zum großen Theater, und gesetzlich darf dich nur ein lizenzierter Guide durch die Ruinen führen. Ein lizenzierter VibeGuide-Guide vor Ort kümmert sich um Tickets und Zeitplanung, findet die schattigen Ecken und verwandelt verstreute Steine in eine lebendige, atmende Stadt.",
        ],
        ctaTitle: "Erkunde Ephesos mit einem Local",
        ...EPH.de,
      },
      ru: {
        name: "Эфес",
        metaTitle: "Эфес: экскурсии с местными гидами",
        metaDescription:
          "Пройдите по античному Эфесу близ Сельчука (Измир) с проверенным местным гидом. Библиотека Цельса, Большой театр и мраморные улицы — оживают.",
        intro: [
          "Эфес был одним из величайших городов древности — римской метрополией на четверть миллиона жителей, где ступал Марк Антоний и проповедовал апостол Павел. Его мраморные улицы, высокая Библиотека Цельса и театр на 25 000 мест по-прежнему стоят близ Сельчука.",
          "Местный гид VibeGuide превращает руины в живой город — кто здесь жил, где мылись, торговали и молились — чтобы камни рассказали свою историю, а не молчали.",
        ],
        highlights: [
          { title: "Библиотека Цельса", desc: "Двухэтажный мраморный фасад, когда-то хранивший 12 000 свитков." },
          { title: "Большой театр", desc: "На 25 000 мест — и сегодня используется для мероприятий." },
          { title: "Террасные дома", desc: "Дома римской знати с мозаичными полами, под навесом." },
        ],
        faqs: [
          { q: "Где находится Эфес?", a: "Близ Сельчука в провинции Измир, около часа от города Измир и рядом с портом Кушадасы." },
          { q: "Сколько нужно времени?", a: "Закладывайте 2–3 часа; гид проведёт в тени и вдали от толпы." },
          { q: "Подходит ли для круизных пассажиров?", a: "Да — классическая экскурсия из Кушадасы. Местный гид максимально использует ограниченное время." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Эфес находится недалеко от города Сельчук в провинции Измир, на эгейском побережье западной Турции. Добраться сюда на удивление просто: примерно 20 минут езды от круизного порта Кушадасы и около часа от Измира, а сам Сельчук — всего в нескольких минутах на такси или маршрутке-долмуше. У памятника два входа, верхние и нижние ворота, и многие посетители проходят между ними под уклон вниз.",
          "Эфес огромен и почти лишён тени, поэтому выбор времени важен не меньше всего остального. Стремитесь прийти ранним утром сразу после открытия или ближе к вечеру, когда свет смягчается, а мрамор остывает; избегайте жёстких полуденных часов, особенно летом. Весна и осень — самые комфортные сезоны. Когда бы вы ни приехали, берите воду, шляпу и прочную обувь и закладывайте два-три часа, чтобы осмотреть всё как следует.",
          "Это платный археологический памятник, а прекрасно сохранившиеся Террасные дома требуют отдельного билета, который вполне того стоит. Здесь есть на что посмотреть — от библиотеки Цельса до огромного театра, и по закону вести вас по руинам может только лицензированный гид. Лицензированный местный гид VibeGuide берёт на себя билеты и тайминг, находит тенистые уголки и превращает разбросанные камни в яркий, живой город.",
        ],
        ctaTitle: "Пройти по Эфесу с местным гидом",
        ...EPH.ru,
      },
      ar: {
        name: "أفسس",
        metaTitle: "جولات أفسس مع مرشدين محليين",
        metaDescription:
          "تجوّل في أفسس القديمة قرب سلجوق بإزمير مع مرشد محلي موثّق. مكتبة سيلسوس والمسرح الكبير والشوارع الرخامية تنبض بالحياة.",
        intro: [
          "كانت أفسس من أعظم مدن العالم القديم — حاضرة رومانية بربع مليون نسمة، مشى فيها مارك أنطونيو ووعظ فيها القديس بولس. لا تزال شوارعها الرخامية ومكتبة سيلسوس الشاهقة ومسرح يتسع لـ25 ألفًا قائمة قرب سلجوق.",
          "يحوّل مرشد VibeGuide المحلي الأطلال إلى مدينة حية — من سكنها، وأين استحموا وتسوّقوا وتعبّدوا — لتروي الحجارة قصتها بدل أن تصمت.",
        ],
        highlights: [
          { title: "مكتبة سيلسوس", desc: "واجهة رخامية من طابقين، ضمّت يومًا 12 ألف مخطوطة." },
          { title: "المسرح الكبير", desc: "يتسع لـ25 ألفًا — ولا يزال يُستخدم للفعاليات." },
          { title: "بيوت المدرّجات", desc: "منازل النخبة الرومانية بأرضيات فسيفسائية، تحت سقف واقٍ." },
        ],
        faqs: [
          { q: "أين تقع أفسس؟", a: "قرب سلجوق في ولاية إزمير، نحو ساعة من مدينة إزمير وقريبة من ميناء كوش أداسي." },
          { q: "كم من الوقت أحتاج؟", a: "خصّص 2–3 ساعات في الموقع؛ يبقيك المرشد في الظل وبعيدًا عن الزحام." },
          { q: "هل تناسب ركاب الرحلات البحرية؟", a: "نعم — رحلة ساحلية كلاسيكية من كوش أداسي. يستثمر المرشد المحلي الوقت المحدود بأفضل شكل." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "تقع أفسس قرب بلدة سلجوق في محافظة إزمير، على ساحل بحر إيجه غربي تركيا. والوصول إليها سهل على نحو لافت: نحو 20 دقيقة بالسيارة من ميناء كوش أداسي للرحلات البحرية، ونحو ساعة من إزمير، بينما لا تبعد سلجوق نفسها سوى دقائق قليلة بسيارة أجرة أو حافلة الدولموش الصغيرة. للموقع مدخلان، بوابة عليا وأخرى سفلى، وكثير من الزوار يسيرون منحدرين بينهما.",
          "أفسس واسعة الأرجاء ولا تكاد تقدّم ظلًّا، لذا فإن اختيار التوقيت لا يقلّ أهمية عن أي شيء آخر. اقصدها في الصباح الباكر بُعيد الافتتاح أو في وقت متأخر من العصر، حين يلين الضوء ويبرد الرخام، وتجنّب ساعات الظهيرة القاسية خاصة في الصيف. الربيع والخريف أكثر الفصول راحة. ومتى جئت، احمل الماء وقبعة وحذاءً متينًا، واحسب ساعتين إلى ثلاث لرؤيتها كما ينبغي.",
          "هذا موقع أثري بتذكرة دخول، وتتطلّب بيوت المصاطب البديعة الحفظ تذكرة منفصلة تستحقّ ثمنها. وهناك الكثير لتتأمّله، من مكتبة كلسوس إلى المسرح الكبير، ولا يجوز قانونًا أن يرشدك بين الأطلال سوى مرشد مرخّص. ويتولّى مرشد VibeGuide المحلي المرخّص أمر التذاكر والتوقيت، ويعثر على الأركان المظللة، ويحوّل الحجارة المتناثرة إلى مدينة نابضة بالحياة.",
        ],
        ctaTitle: "تجوّل في أفسس مع مرشد محلي",
        ...EPH.ar,
      },
      es: {
        name: "Éfeso",
        metaTitle: "Tours de Éfeso con guías locales",
        metaDescription:
          "Recorre la antigua Éfeso cerca de Selçuk, İzmir con un guía local verificado. La Biblioteca de Celso, el Gran Teatro y calles de mármol cobran vida.",
        intro: [
          "Éfeso fue una de las mayores ciudades del mundo antiguo — una metrópoli romana de un cuarto de millón de habitantes, donde caminó Marco Antonio y predicó San Pablo. Sus calles de mármol, la imponente Biblioteca de Celso y un teatro para 25.000 siguen en pie cerca de Selçuk.",
          "Un local de VibeGuide convierte las ruinas en una ciudad viva — quién vivía aquí, dónde se bañaban, compraban y rezaban — para que las piedras cuenten su historia en vez de callar.",
        ],
        highlights: [
          { title: "Biblioteca de Celso", desc: "Una fachada de mármol de dos pisos, hogar de 12.000 rollos." },
          { title: "Gran Teatro", desc: "Aforo para 25.000 — aún se usa para eventos." },
          { title: "Casas Adosadas", desc: "Hogares de la élite romana con suelos de mosaico, cubiertos." },
        ],
        faqs: [
          { q: "¿Dónde está Éfeso?", a: "Cerca de Selçuk, en la provincia de İzmir, a una hora de la ciudad de İzmir y cerca del puerto de Kuşadası." },
          { q: "¿Cuánto tiempo necesito?", a: "Calcula 2–3 horas en el sitio; un guía te mantiene a la sombra y lejos de las multitudes." },
          { q: "¿Es bueno para cruceristas?", a: "Sí — una excursión clásica desde Kuşadası. Un guía local aprovecha al máximo el tiempo limitado." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Éfeso se encuentra cerca de la localidad de Selçuk, en la provincia de İzmir, en la costa egea del oeste de Turquía. Es sorprendentemente fácil de alcanzar: a unos 20 minutos en coche del puerto de cruceros de Kuşadası y alrededor de una hora de İzmir, mientras que la propia Selçuk queda a pocos minutos en taxi o en dolmuş, el minibús local. El recinto tiene dos entradas, una puerta alta y otra baja, y muchos visitantes caminan cuesta abajo entre ambas.",
          "Éfeso es enorme y ofrece muy poca sombra, así que la hora importa tanto como todo lo demás. Procura ir a primera hora de la mañana, poco después de abrir, o al final de la tarde, cuando la luz se suaviza y el mármol se refresca; evita las horas duras del mediodía, sobre todo en verano. La primavera y el otoño son las estaciones más cómodas. Vayas cuando vayas, lleva agua, sombrero y calzado resistente, y reserva de dos a tres horas para verlo bien.",
          "Es un yacimiento arqueológico de pago, y las Casas Adosadas, magníficamente conservadas, requieren una entrada aparte que merece mucho la pena. Hay muchísimo que asimilar, desde la Biblioteca de Celso hasta el gran teatro, y por ley solo un guía autorizado puede acompañarte entre las ruinas. Un guía local de VibeGuide con licencia se encarga de las entradas y los horarios, encuentra los rincones con sombra y convierte las piedras dispersas en una ciudad viva y vívida.",
        ],
        ctaTitle: "Recorre Éfeso con un local",
        ...EPH.es,
      },
      fr: {
        name: "Éphèse",
        metaTitle: "Visites d'Éphèse avec guides locaux",
        metaDescription:
          "Parcourez l'antique Éphèse près de Selçuk, İzmir avec un guide local vérifié. La Bibliothèque de Celsus, le Grand Théâtre et les rues de marbre prennent vie.",
        intro: [
          "Éphèse fut l'une des plus grandes villes du monde antique — une métropole romaine d'un quart de million d'habitants, où marcha Marc Antoine et prêcha saint Paul. Ses rues de marbre, l'imposante Bibliothèque de Celsus et un théâtre de 25 000 places se dressent encore près de Selçuk.",
          "Un local VibeGuide transforme les ruines en cité vivante — qui y vivait, où l'on se baignait, faisait ses courses et priait — pour que les pierres racontent leur histoire au lieu de se taire.",
        ],
        highlights: [
          { title: "Bibliothèque de Celsus", desc: "Une façade de marbre à deux étages, jadis riche de 12 000 rouleaux." },
          { title: "Grand Théâtre", desc: "25 000 places — encore utilisé pour des événements." },
          { title: "Maisons en terrasses", desc: "Demeures de l'élite romaine aux sols de mosaïque, abritées." },
        ],
        faqs: [
          { q: "Où se trouve Éphèse ?", a: "Près de Selçuk, dans la province d'İzmir, à environ une heure de la ville d'İzmir et près du port de Kuşadası." },
          { q: "Combien de temps faut-il ?", a: "Comptez 2 à 3 heures sur place ; un guide vous garde à l'ombre et hors de la foule." },
          { q: "Est-ce adapté aux croisiéristes ?", a: "Oui — une excursion classique depuis Kuşadası. Un guide local optimise un temps limité." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Éphèse se situe près de la ville de Selçuk, dans la province d'İzmir, sur la côte égéenne de l'ouest de la Turquie. L'accès est remarquablement facile : à environ 20 minutes de route du port de croisière de Kuşadası et à une heure environ d'İzmir, tandis que Selçuk même n'est qu'à quelques minutes en taxi ou en dolmuş, le minibus local. Le site compte deux entrées, une porte haute et une porte basse, et beaucoup de visiteurs descendent à pied de l'une à l'autre.",
          "Éphèse est immense et offre très peu d'ombre, si bien que le choix de l'heure compte autant que tout le reste. Visez le petit matin, peu après l'ouverture, ou la fin d'après-midi, quand la lumière s'adoucit et que le marbre se rafraîchit ; évitez les heures brûlantes de midi, surtout en été. Le printemps et l'automne sont les saisons les plus agréables. Quel que soit le moment, emportez de l'eau, un chapeau et de bonnes chaussures, et comptez deux à trois heures pour bien en profiter.",
          "C'est un site archéologique payant, et les Maisons en terrasse, superbement conservées, nécessitent un billet séparé qui en vaut largement la peine. Il y a énormément à découvrir, de la bibliothèque de Celsus au grand théâtre, et la loi n'autorise qu'un guide agréé à vous mener parmi les ruines. Un guide local VibeGuide agréé s'occupe des billets et du timing, déniche les coins ombragés et transforme des pierres éparses en une cité vivante et éclatante.",
        ],
        ctaTitle: "Parcourez Éphèse avec un local",
        ...EPH.fr,
      },
      el: {
        name: "Έφεσος",
        metaTitle: "Ξεναγήσεις στην Έφεσο με ντόπιους ξεναγούς",
        metaDescription:
          "Περπάτησε στην αρχαία Έφεσο κοντά στο Σελτσούκ της Σμύρνης με πιστοποιημένο ντόπιο ξεναγό. Η Βιβλιοθήκη του Κέλσου, το Μέγα Θέατρο και οι μαρμάρινοι δρόμοι ζωντανεύουν.",
        intro: [
          "Η Έφεσος ήταν μία από τις μεγαλύτερες πόλεις του αρχαίου κόσμου — ρωμαϊκή μητρόπολη ενός τετάρτου του εκατομμυρίου, όπου περπάτησε ο Μάρκος Αντώνιος και κήρυξε ο Απόστολος Παύλος. Οι μαρμάρινοι δρόμοι της, η επιβλητική Βιβλιοθήκη του Κέλσου και ένα θέατρο 25.000 θέσεων στέκουν ακόμη κοντά στο Σελτσούκ.",
          "Ένας ντόπιος του VibeGuide μετατρέπει τα ερείπια σε ζωντανή πόλη — ποιοι ζούσαν εδώ, πού λούζονταν, ψώνιζαν και λάτρευαν — ώστε οι πέτρες να πουν την ιστορία τους αντί να σωπαίνουν.",
        ],
        highlights: [
          { title: "Βιβλιοθήκη του Κέλσου", desc: "Διώροφη μαρμάρινη πρόσοψη, κάποτε με 12.000 παπύρους." },
          { title: "Μέγα Θέατρο", desc: "Χωρητικότητα 25.000 — χρησιμοποιείται ακόμη για εκδηλώσεις." },
          { title: "Σπίτια των Πλαγιών", desc: "Κατοικίες της ρωμαϊκής ελίτ με ψηφιδωτά δάπεδα, στεγασμένες." },
        ],
        faqs: [
          { q: "Πού βρίσκεται η Έφεσος;", a: "Κοντά στο Σελτσούκ, στην επαρχία της Σμύρνης, περίπου μία ώρα από την πόλη και κοντά στο λιμάνι Κουσάντασι." },
          { q: "Πόσο χρόνο χρειάζομαι;", a: "Υπολόγισε 2–3 ώρες· ο ξεναγός σε κρατά στη σκιά και μακριά από το πλήθος." },
          { q: "Είναι καλό για επιβάτες κρουαζιέρας;", a: "Ναι — κλασική εκδρομή από το Κουσάντασι. Ο ντόπιος ξεναγός αξιοποιεί στο έπακρο τον περιορισμένο χρόνο." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Η Έφεσος βρίσκεται κοντά στην κωμόπολη Σελτσούκ, στην επαρχία της Σμύρνης, στην αιγαιακή ακτή της δυτικής Τουρκίας. Η πρόσβαση είναι εντυπωσιακά εύκολη: περίπου 20 λεπτά με το αυτοκίνητο από το λιμάνι κρουαζιέρας του Κουσάντασι και περίπου μία ώρα από τη Σμύρνη, ενώ το ίδιο το Σελτσούκ απέχει μόλις λίγα λεπτά με ταξί ή με το τοπικό μινιμπάς ντολμούς. Ο χώρος έχει δύο εισόδους, μια πάνω και μια κάτω πύλη, και πολλοί επισκέπτες κατηφορίζουν με τα πόδια ανάμεσά τους.",
          "Η Έφεσος είναι απέραντη και προσφέρει ελάχιστη σκιά, οπότε η ώρα μετράει όσο οτιδήποτε άλλο. Στοχεύστε στο νωρίς το πρωί, λίγο μετά το άνοιγμα, ή αργά το απόγευμα, όταν το φως απαλύνει και το μάρμαρο δροσίζει· αποφύγετε τις σκληρές μεσημεριανές ώρες, ιδίως το καλοκαίρι. Η άνοιξη και το φθινόπωρο είναι οι πιο άνετες εποχές. Όποτε κι αν πάτε, πάρτε νερό, καπέλο και γερά παπούτσια, και υπολογίστε δύο με τρεις ώρες για να τη δείτε όπως πρέπει.",
          "Πρόκειται για αρχαιολογικό χώρο με εισιτήριο, και τα υπέροχα διατηρημένα Σπίτια των Αναβαθμίδων απαιτούν ξεχωριστό εισιτήριο που αξίζει πραγματικά. Υπάρχουν πάρα πολλά να δείτε, από τη Βιβλιοθήκη του Κέλσου έως το μεγάλο θέατρο, και σύμφωνα με τον νόμο μόνο αδειούχος ξεναγός μπορεί να σας οδηγήσει μέσα στα ερείπια. Ένας αδειούχος τοπικός ξεναγός της VibeGuide αναλαμβάνει εισιτήρια και ώρες, βρίσκει τις σκιερές γωνιές και μετατρέπει τις σκόρπιες πέτρες σε μια ζωντανή, παλλόμενη πόλη.",
        ],
        ctaTitle: "Περπάτα στην Έφεσο με έναν ντόπιο",
        ...EPH.el,
      },
      tr: {
        name: "Efes",
        metaTitle: "Efes Turları & Yerel Rehberler",
        metaDescription:
          "İzmir Selçuk yakınındaki antik Efes'i doğrulanmış bir yerel rehberle gez. Celsus Kütüphanesi, Büyük Tiyatro ve mermer caddeler canlanıyor.",
        intro: [
          "Efes antik dünyanın en büyük şehirlerinden biriydi — çeyrek milyon nüfuslu bir Roma metropolü; Marcus Antonius'un yürüdüğü, Aziz Pavlus'un vaaz verdiği yer. Mermer caddeleri, yükselen Celsus Kütüphanesi ve 25.000 kişilik tiyatrosu hâlâ Selçuk yakınında ayakta.",
          "VibeGuide yerel rehberi harabeleri yaşayan bir şehre dönüştürür — burada kimler yaşadı, nerede yıkandılar, alışveriş yaptılar ve ibadet ettiler — böylece taşlar susmak yerine hikâyesini anlatır.",
        ],
        highlights: [
          { title: "Celsus Kütüphanesi", desc: "İki katlı mermer cephe; bir zamanlar 12.000 rulo barındırdı." },
          { title: "Büyük Tiyatro", desc: "25.000 kişilik — bugün hâlâ etkinliklerde kullanılıyor." },
          { title: "Yamaç Evleri", desc: "Roma seçkinlerinin mozaik döşeli evleri, çatı altında." },
        ],
        faqs: [
          { q: "Efes nerede?", a: "İzmir'in Selçuk ilçesi yakınında; İzmir şehrine yaklaşık bir saat, Kuşadası limanına yakın." },
          { q: "Ne kadar zaman gerekir?", a: "Sahada 2–3 saat ayır; rehber seni gölgede ve kalabalıktan uzak tutar." },
          { q: "Kruvaziyer yolcuları için uygun mu?", a: "Evet — Kuşadası'ndan klasik bir liman turu. Yerel rehber kısıtlı zamanı en iyi şekilde değerlendirir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Efes, Türkiye'nin batısındaki Ege kıyısında, İzmir iline bağlı Selçuk ilçesinin yakınında yer alır. Ulaşımı şaşırtıcı derecede kolaydır: Kuşadası kruvaziyer limanından arabayla yaklaşık 20 dakika, İzmir'den ise yaklaşık bir saat uzaklıktadır; Selçuk'un kendisi ise taksi veya dolmuşla sadece birkaç dakika mesafededir. Ören yerinin biri üst biri alt olmak üzere iki girişi vardır ve birçok ziyaretçi ikisinin arasında yokuş aşağı yürür.",
          "Efes çok geniştir ve neredeyse hiç gölge sunmaz; bu yüzden zamanlama en az her şey kadar önemlidir. Açılıştan hemen sonra sabahın erken saatlerini ya da ışığın yumuşadığı ve mermerin serinlediği ikindi sonunu hedefleyin; özellikle yazın öğle vaktinin kavurucu saatlerinden kaçının. İlkbahar ve sonbahar en rahat mevsimlerdir. Ne zaman giderseniz gidin, yanınıza su, şapka ve sağlam ayakkabı alın ve gereğince gezmek için iki-üç saat ayırın.",
          "Burası biletli bir arkeolojik alandır ve muhteşem korunmuş Yamaç Evler için değmeye fazlasıyla değecek ayrı bir bilet gerekir. Celsus Kütüphanesi'nden büyük tiyatroya kadar görülecek çok şey vardır ve yasa gereği sizi harabeler arasında yalnızca lisanslı bir rehber gezdirebilir. Lisanslı bir VibeGuide yerel rehberi bilet ve zamanlama işini üstlenir, gölgeli köşeleri bulur ve dağınık taşları canlı, yaşayan bir şehre dönüştürür.",
        ],
        ctaTitle: "Efes'i bir yerelle gez",
        ...EPH.tr,
      },
      it: {
        name: "Efeso",
        metaTitle: "Tour di Efeso e guide locali",
        metaDescription:
          "Percorri l'antica Efeso vicino a Selçuk, İzmir con una guida locale verificata. La Biblioteca di Celso, il Grande Teatro e le vie di marmo prendono vita.",
        intro: [
          "Efeso fu una delle più grandi città del mondo antico — una metropoli romana di un quarto di milione di abitanti, dove camminò Marco Antonio e predicò San Paolo. Le sue vie di marmo, l'imponente Biblioteca di Celso e un teatro da 25.000 posti si ergono ancora vicino a Selçuk.",
          "Un local di VibeGuide trasforma le rovine in una città viva — chi ci abitava, dove ci si lavava, si faceva la spesa e si pregava — così le pietre raccontano la loro storia invece di tacere.",
        ],
        highlights: [
          { title: "Biblioteca di Celso", desc: "Una facciata di marmo a due piani, un tempo custode di 12.000 rotoli." },
          { title: "Grande Teatro", desc: "Capienza di 25.000 posti — ancora oggi usato per eventi." },
          { title: "Case a Terrazza", desc: "Dimore dell'élite romana con pavimenti a mosaico, al coperto." },
        ],
        faqs: [
          { q: "Dove si trova Efeso?", a: "Vicino a Selçuk, nella provincia di İzmir, a circa un'ora dalla città di İzmir e non lontano dal porto di Kuşadası." },
          { q: "Quanto tempo serve?", a: "Prevedi 2–3 ore sul sito; una guida ti tiene all'ombra e lontano dalla folla." },
          { q: "È adatto ai passeggeri delle crociere?", a: "Sì — è una classica escursione a terra da Kuşadası. Una guida locale sfrutta al meglio il tempo limitato." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Efeso si trova vicino alla cittadina di Selçuk, nella provincia di İzmir, sulla costa egea della Turchia occidentale. È sorprendentemente facile da raggiungere: circa 20 minuti d'auto dal porto crociere di Kuşadası e circa un'ora da İzmir, mentre Selçuk stessa dista appena pochi minuti in taxi o con il dolmuş, il minibus locale. Il sito ha due ingressi, una porta alta e una bassa, e molti visitatori percorrono a piedi il tratto in discesa tra le due.",
          "Efeso è vastissima e offre pochissima ombra, perciò scegliere l'ora conta quanto tutto il resto. Punta al mattino presto, poco dopo l'apertura, o al tardo pomeriggio, quando la luce si addolcisce e il marmo si rinfresca; evita le ore afose di mezzogiorno, soprattutto d'estate. La primavera e l'autunno sono le stagioni più piacevoli. In qualunque momento tu vada, porta acqua, un cappello e scarpe robuste, e metti in conto due o tre ore per vederla come si deve.",
          "È un sito archeologico a pagamento, e le Case a Terrazza, splendidamente conservate, richiedono un biglietto a parte che vale davvero la pena. C'è moltissimo da ammirare, dalla Biblioteca di Celso al grande teatro, e per legge solo una guida autorizzata può condurti tra le rovine. Una guida locale VibeGuide autorizzata pensa ai biglietti e ai tempi, trova gli angoli in ombra e trasforma le pietre sparse in una città viva e vibrante.",
        ],
        ctaTitle: "Percorri Efeso con un local",
        ...EPH.it,
      },
      pl: {
        name: "Efez",
        metaTitle: "Wycieczki po Efezie i lokalni przewodnicy",
        metaDescription:
          "Przejdź się po starożytnym Efezie koło Selçuk w İzmirze z zweryfikowanym lokalnym przewodnikiem. Biblioteka Celsusa, Wielki Teatr i marmurowe ulice ożywają.",
        intro: [
          "Efez był jednym z największych miast starożytnego świata — rzymską metropolią liczącą ćwierć miliona mieszkańców, po której stąpał Marek Antoniusz i w której nauczał św. Paweł. Jego marmurowe ulice, strzelista Biblioteka Celsusa i teatr na 25 000 widzów wciąż stoją koło Selçuk.",
          "Lokalny przewodnik VibeGuide zmienia ruiny w żywe miasto — kto tu mieszkał, gdzie się kąpano, robiono zakupy i modlono — tak by kamienie opowiedziały swoją historię, zamiast milczeć.",
        ],
        highlights: [
          { title: "Biblioteka Celsusa", desc: "Dwukondygnacyjna marmurowa fasada, niegdyś mieszcząca 12 000 zwojów." },
          { title: "Wielki Teatr", desc: "Miejsca dla 25 000 widzów — do dziś wykorzystywany na wydarzenia." },
          { title: "Domy Tarasowe", desc: "Domy rzymskiej elity z mozaikowymi podłogami, pod zadaszeniem." },
        ],
        faqs: [
          { q: "Gdzie leży Efez?", a: "Koło Selçuk w prowincji İzmir, około godziny od miasta İzmir i blisko portu Kuşadası." },
          { q: "Ile czasu potrzebuję?", a: "Zaplanuj 2–3 godziny na miejscu; przewodnik prowadzi cię w cieniu i z dala od tłumów." },
          { q: "Czy nadaje się dla pasażerów rejsów?", a: "Tak — to klasyczna wycieczka z portu Kuşadası. Lokalny przewodnik maksymalnie wykorzystuje ograniczony czas." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Efez leży w pobliżu miasteczka Selçuk w prowincji İzmir, na egejskim wybrzeżu zachodniej Turcji. Dojazd jest zaskakująco łatwy: około 20 minut jazdy samochodem od portu wycieczkowego w Kuşadası i mniej więcej godzina od İzmiru, podczas gdy samo Selçuk dzieli od stanowiska zaledwie kilka minut taksówką lub lokalnym minibusem dolmuş. Stanowisko ma dwa wejścia, bramę górną i dolną, a wielu zwiedzających przechodzi między nimi z górki.",
          "Efez jest ogromny i daje bardzo mało cienia, więc pora dnia liczy się tak samo jak wszystko inne. Celuj we wczesny ranek, tuż po otwarciu, albo w późne popołudnie, gdy światło łagodnieje, a marmur stygnie; unikaj dokuczliwych godzin południowych, zwłaszcza latem. Wiosna i jesień to najbardziej komfortowe pory roku. Kiedykolwiek przyjdziesz, weź wodę, kapelusz i solidne buty oraz zarezerwuj dwie do trzech godzin, by zobaczyć wszystko jak należy.",
          "To płatne stanowisko archeologiczne, a pięknie zachowane Domy Tarasowe wymagają osobnego biletu, który zdecydowanie się opłaca. Jest tu mnóstwo do obejrzenia, od Biblioteki Celsusa po wielki teatr, a zgodnie z prawem oprowadzać cię po ruinach może wyłącznie licencjonowany przewodnik. Licencjonowany lokalny przewodnik VibeGuide zajmuje się biletami i harmonogramem, znajduje zacienione zakątki i zamienia rozrzucone kamienie w tętniące życiem miasto.",
        ],
        ctaTitle: "Przejdź się po Efezie z lokalnym przewodnikiem",
        ...EPH.pl,
      },
      nl: {
        name: "Efeze",
        metaTitle: "Efeze-tours en lokale gidsen",
        metaDescription:
          "Wandel door het antieke Efeze bij Selçuk, İzmir met een geverifieerde lokale gids. De Bibliotheek van Celsus, het Grote Theater en marmeren straten komen tot leven.",
        intro: [
          "Efeze was een van de grootste steden van de antieke wereld — een Romeinse metropool van een kwart miljoen mensen, waar Marcus Antonius liep en de apostel Paulus predikte. De marmeren straten, de torenhoge Bibliotheek van Celsus en een theater voor 25.000 staan nog altijd bij Selçuk.",
          "Een local van VibeGuide maakt van ruïnes een levende stad — wie hier woonde, waar men baadde, winkelde en aanbad — zodat de stenen hun verhaal vertellen in plaats van te zwijgen.",
        ],
        highlights: [
          { title: "Bibliotheek van Celsus", desc: "Een marmeren gevel van twee verdiepingen, ooit thuis van 12.000 boekrollen." },
          { title: "Grote Theater", desc: "Plaats voor 25.000 — vandaag de dag nog gebruikt voor evenementen." },
          { title: "Terrashuizen", desc: "Woningen van de Romeinse elite met mozaïekvloeren, overdekt." },
        ],
        faqs: [
          { q: "Waar ligt Efeze?", a: "Bij Selçuk in de provincie İzmir, ongeveer een uur van de stad İzmir en dicht bij de haven van Kuşadası." },
          { q: "Hoeveel tijd heb ik nodig?", a: "Reken op 2–3 uur ter plaatse; een gids houdt je in de schaduw en uit de drukte." },
          { q: "Is het geschikt voor cruisepassagiers?", a: "Ja — een klassieke excursie vanaf Kuşadası. Een lokale gids haalt het meeste uit beperkte tijd." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Efeze ligt vlak bij het stadje Selçuk in de provincie İzmir, aan de Egeïsche kust van West-Turkije. Het is opvallend makkelijk te bereiken: ongeveer 20 minuten rijden vanaf de cruisehaven van Kuşadası en zo'n uur vanaf İzmir, terwijl Selçuk zelf slechts een paar minuten met de taxi of de lokale dolmuş-minibus is. De site heeft twee ingangen, een boven- en een benedenpoort, en veel bezoekers lopen ertussen bergafwaarts.",
          "Efeze is uitgestrekt en biedt maar heel weinig schaduw, dus het tijdstip telt net zo zwaar als al het andere. Mik op de vroege ochtend, kort na openingstijd, of de late namiddag, wanneer het licht zachter wordt en het marmer afkoelt; vermijd de felle middaguren, vooral in de zomer. De lente en de herfst zijn de aangenaamste seizoenen. Wanneer je ook komt, neem water, een hoed en stevige schoenen mee en reken op twee tot drie uur om alles goed te zien.",
          "Dit is een archeologische site met toegangskaart, en de prachtig bewaarde Hellingshuizen vragen een apart ticket dat het meer dan waard is. Er is heel veel te zien, van de Bibliotheek van Celsus tot het grote theater, en volgens de wet mag alleen een erkende gids je door de ruïnes leiden. Een erkende lokale VibeGuide-gids regelt de tickets en de timing, vindt de schaduwrijke hoeken en maakt van verspreide stenen een levende, sprankelende stad.",
        ],
        ctaTitle: "Wandel door Efeze met een local",
        ...EPH.nl,
      },

    },
  },

  // ────────────────────────────────── CAPPADOCIA ──────────────────────────────
  {
    slug: "cappadocia",
    city: "Cappadocia",
    citySlug: "nevsehir",
    emoji: "🎈",
    image:
      "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=1600",
    lat: 38.643056,
    lng: 34.828889,
    i18n: {
      en: {
        name: "Cappadocia",
        metaTitle: "Cappadocia Tours & Local Guides",
        metaDescription:
          "Explore Cappadocia with a verified local guide. Hot-air balloons, fairy chimneys, cave churches and underground cities in Göreme and beyond.",
        intro: [
          "Cappadocia is a landscape from a dream — valleys of 'fairy chimneys', rock-cut churches painted a thousand years ago, and whole cities carved underground. At dawn, hundreds of hot-air balloons rise over Göreme in one of the world's great sights.",
          "A VibeGuide local knows which valley catches the best light, which cave church survived, and where the crowds aren't — turning a famous photo into a real understanding of the place.",
        ],
        highlights: [
          { title: "Hot-Air Balloons", desc: "Dawn flights over the valleys — the image that defines Cappadocia." },
          { title: "Göreme Open-Air Museum", desc: "Byzantine cave churches with frescoes carved into rock." },
          { title: "Underground Cities", desc: "Derinkuyu and Kaymaklı — entire towns hidden below ground." },
        ],
        faqs: [
          { q: "Where is Cappadocia?", a: "In central Anatolia, around Göreme and Nevşehir, reachable by flight to Kayseri or Nevşehir." },
          { q: "Are balloon flights guaranteed?", a: "They depend on weather and are booked separately. A guide helps you plan the rest around them." },
          { q: "How many days do I need?", a: "Two days covers the highlights comfortably; a local guide makes even one day count." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Cappadocia sits in Central Anatolia, in Nevsehir province, with the small town of Goreme at its heart. Most travellers fly into Nevsehir (NAV) or the larger Kayseri (ASR) airport, then continue by shuttle or car for the final stretch. The region is compact enough to explore from a single base, and its otherworldly valleys of fairy chimneys begin almost the moment you arrive.",
          "Spring and autumn are ideal, with mild days and soft light that flatters the rock landscape. Summer brings heat and larger crowds, while winter drapes the fairy chimneys in snow for a quieter, magical scene. Early mornings are golden here, especially at dawn when hot-air balloons rise over the valleys, weather permitting. Plan around two days to see the highlights without rushing.",
          "Major sights such as the Goreme Open-Air Museum and the underground cities are ticketed, and balloon flights are booked separately and depend on the weather. A licensed VibeGuide local guide helps you time the balloon experience, find the best valleys for walking and photos, and understand the frescoed churches and cave dwellings you might otherwise walk straight past.",
        ],
        ctaTitle: "Discover Cappadocia with a local",
        ...CAP.en,
      },
      de: {
        name: "Kappadokien",
        metaTitle: "Kappadokien Touren & lokale Guides",
        metaDescription:
          "Entdecke Kappadokien mit einem geprüften lokalen Guide. Heißluftballons, Feenkamine, Höhlenkirchen und unterirdische Städte in Göreme und Umgebung.",
        intro: [
          "Kappadokien ist eine Landschaft wie aus einem Traum — Täler voller „Feenkamine“, vor tausend Jahren bemalte Felsenkirchen und ganze unterirdisch gegrabene Städte. Im Morgengrauen steigen Hunderte Heißluftballons über Göreme auf — eines der großen Schauspiele der Welt.",
          "Ein VibeGuide-Local weiß, welches Tal das beste Licht fängt, welche Höhlenkirche erhalten ist und wo die Menge nicht ist — und macht aus einem berühmten Foto echtes Verständnis.",
        ],
        highlights: [
          { title: "Heißluftballons", desc: "Flüge im Morgengrauen über die Täler — das Bild Kappadokiens." },
          { title: "Freilichtmuseum Göreme", desc: "Byzantinische Höhlenkirchen mit Fresken im Fels." },
          { title: "Unterirdische Städte", desc: "Derinkuyu und Kaymaklı — ganze Städte unter der Erde." },
        ],
        faqs: [
          { q: "Wo liegt Kappadokien?", a: "In Zentralanatolien, um Göreme und Nevşehir, erreichbar per Flug nach Kayseri oder Nevşehir." },
          { q: "Sind Ballonflüge garantiert?", a: "Sie hängen vom Wetter ab und werden separat gebucht. Ein Guide hilft, den Rest darum herum zu planen." },
          { q: "Wie viele Tage brauche ich?", a: "Zwei Tage decken die Höhepunkte bequem ab; ein lokaler Guide macht selbst einen Tag wertvoll." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Kappadokien liegt in Zentralanatolien, in der Provinz Nevsehir, mit dem kleinen Ort Goreme als Herzstueck. Die meisten Reisenden fliegen nach Nevsehir (NAV) oder zum groesseren Flughafen Kayseri (ASR) und legen die letzte Strecke per Shuttle oder Mietwagen zurueck. Die Region ist so kompakt, dass sich alles von einem einzigen Standort aus erkunden laesst, und die surrealen Taeler mit ihren Feenkaminen beginnen fast direkt nach der Ankunft.",
          "Fruehling und Herbst sind ideal, mit milden Tagen und weichem Licht, das die Felslandschaft besonders schoen zur Geltung bringt. Der Sommer bringt Hitze und mehr Besucher, waehrend der Winter die Feenkamine in Schnee huellt und eine stille, zauberhafte Kulisse schafft. Die fruehen Morgenstunden sind hier golden, vor allem bei Sonnenaufgang, wenn die Heissluftballons ueber die Taeler steigen, sofern das Wetter mitspielt. Plane etwa zwei Tage ein.",
          "Wichtige Sehenswuerdigkeiten wie das Freilichtmuseum von Goreme und die unterirdischen Staedte sind kostenpflichtig, und Ballonfahrten werden separat gebucht und haengen vom Wetter ab. Ein lizenzierter VibeGuide-Guide vor Ort hilft dir, den besten Zeitpunkt fuer die Ballonfahrt zu finden, die schoensten Taeler zum Wandern und Fotografieren zu entdecken und die Fresken der Hoehlenkirchen zu verstehen, an denen du sonst vielleicht achtlos vorbeigehst.",
        ],
        ctaTitle: "Entdecke Kappadokien mit einem Local",
        ...CAP.de,
      },
      ru: {
        name: "Каппадокия",
        metaTitle: "Каппадокия: экскурсии с местными гидами",
        metaDescription:
          "Откройте Каппадокию с проверенным местным гидом. Воздушные шары, «дымоходы фей», пещерные церкви и подземные города в Гёреме и окрестностях.",
        intro: [
          "Каппадокия — пейзаж из сна: долины «дымоходов фей», вырубленные в скале церкви, расписанные тысячу лет назад, и целые подземные города. На рассвете сотни воздушных шаров поднимаются над Гёреме — одно из величайших зрелищ мира.",
          "Местный гид VibeGuide знает, какая долина ловит лучший свет, какая пещерная церковь уцелела и где нет толп — превращая знаменитое фото в настоящее понимание места.",
        ],
        highlights: [
          { title: "Воздушные шары", desc: "Полёты на рассвете над долинами — образ Каппадокии." },
          { title: "Музей под открытым небом Гёреме", desc: "Византийские пещерные церкви с фресками в скале." },
          { title: "Подземные города", desc: "Деринкую и Каймаклы — целые города под землёй." },
        ],
        faqs: [
          { q: "Где находится Каппадокия?", a: "В центральной Анатолии, вокруг Гёреме и Невшехира; добраться можно рейсом до Кайсери или Невшехира." },
          { q: "Гарантированы ли полёты на шарах?", a: "Они зависят от погоды и бронируются отдельно. Гид поможет спланировать остальное вокруг них." },
          { q: "Сколько дней нужно?", a: "Два дня покрывают главное с комфортом; местный гид сделает ценным даже один день." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Каппадокия находится в Центральной Анатолии, в провинции Невшехир, а её сердцем является небольшой городок Гёреме. Большинство путешественников прилетают в Невшехир (NAV) или в более крупный аэропорт Кайсери (ASR), а затем добираются до места на трансфере или автомобиле. Регион достаточно компактен, чтобы осматривать его из одной точки, а фантастические долины с каминами фей открываются почти сразу по прибытии.",
          "Весна и осень идеальны: мягкие дни и рассеянный свет особенно красиво подчёркивают скалистый ландшафт. Лето приносит жару и больше туристов, а зима укрывает камины фей снегом, создавая тихую и волшебную картину. Раннее утро здесь золотое, особенно на рассвете, когда воздушные шары поднимаются над долинами, если позволяет погода. Заложите около двух дней, чтобы всё увидеть без спешки.",
          "Главные достопримечательности, такие как музей под открытым небом в Гёреме и подземные города, посещаются по билетам, а полёты на шаре бронируются отдельно и зависят от погоды. Лицензированный местный гид VibeGuide поможет выбрать удачное время для полёта, найти лучшие долины для прогулок и фотографий и понять фрески пещерных церквей, мимо которых иначе легко пройти.",
        ],
        ctaTitle: "Открыть Каппадокию с местным гидом",
        ...CAP.ru,
      },
      ar: {
        name: "كابادوكيا",
        metaTitle: "جولات كابادوكيا مع مرشدين محليين",
        metaDescription:
          "استكشف كابادوكيا مع مرشد محلي موثّق. مناطيد الهواء الساخن، والمداخن الجنّية، والكنائس الصخرية، والمدن تحت الأرض في غوريمه وما حولها.",
        intro: [
          "كابادوكيا منظر من الأحلام — وديان من «المداخن الجنّية»، وكنائس محفورة في الصخر زُيّنت قبل ألف عام، ومدن كاملة نُحتت تحت الأرض. عند الفجر ترتفع مئات المناطيد فوق غوريمه في أحد أعظم مشاهد العالم.",
          "يعرف مرشد VibeGuide المحلي أي وادٍ يلتقط أفضل ضوء، وأي كنيسة صخرية صمدت، وأين يقلّ الزحام — فيحوّل صورة شهيرة إلى فهم حقيقي للمكان.",
        ],
        highlights: [
          { title: "مناطيد الهواء الساخن", desc: "رحلات الفجر فوق الوديان — صورة كابادوكيا." },
          { title: "متحف غوريمه المفتوح", desc: "كنائس صخرية بيزنطية بجداريات منحوتة في الصخر." },
          { title: "المدن تحت الأرض", desc: "ديرينكويو وكايماكلي — مدن كاملة تحت الأرض." },
        ],
        faqs: [
          { q: "أين تقع كابادوكيا؟", a: "في وسط الأناضول، حول غوريمه ونوشهير، ويمكن الوصول بالطيران إلى قيصري أو نوشهير." },
          { q: "هل رحلات المناطيد مضمونة؟", a: "تعتمد على الطقس وتُحجز بشكل منفصل. يساعدك المرشد على تنظيم الباقي حولها." },
          { q: "كم يومًا أحتاج؟", a: "يومان يغطيان الأبرز براحة؛ والمرشد المحلي يجعل حتى يوم واحد ثمينًا." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "تقع كابادوكيا في وسط الأناضول ضمن محافظة نوشهير، وتقع بلدة غوريمه الصغيرة في قلبها. يصل معظم المسافرين جوًا إلى مطار نوشهير (NAV) أو مطار قيصري (ASR) الأكبر، ثم يكملون المسافة الأخيرة بحافلة نقل أو سيارة. المنطقة صغيرة بما يكفي لاستكشافها من مكان إقامة واحد، وتبدأ الوديان الساحرة بمداخنها الصخرية العجيبة بالظهور فور وصولك تقريبًا.",
          "الربيع والخريف هما الأمثل، بأيام معتدلة وضوء ناعم يبرز جمال التضاريس الصخرية. يجلب الصيف الحرارة وأعدادًا أكبر من الزوار، بينما يكسو الشتاء المداخن الصخرية بالثلوج ليخلق مشهدًا هادئًا وساحرًا. ساعات الصباح الباكر ذهبية هنا، خاصة عند الفجر حين ترتفع مناطيد الهواء الساخن فوق الوديان إذا سمح الطقس. خصّص نحو يومين لرؤية أبرز المعالم دون عجلة.",
          "تتطلب المعالم الرئيسية مثل متحف غوريمه المفتوح والمدن تحت الأرض تذاكر دخول، بينما تُحجز رحلات المناطيد بشكل منفصل وتعتمد على الطقس. يساعدك مرشد VibeGuide المحلي المرخّص على اختيار التوقيت المناسب لتجربة المنطاد، والوصول إلى أجمل الوديان للمشي والتصوير، وفهم اللوحات الجدارية في الكنائس الصخرية والمساكن الكهفية التي قد تمر بجانبها دون أن تلاحظها.",
        ],
        ctaTitle: "اكتشف كابادوكيا مع مرشد محلي",
        ...CAP.ar,
      },
      es: {
        name: "Capadocia",
        metaTitle: "Tours de Capadocia con guías locales",
        metaDescription:
          "Explora Capadocia con un guía local verificado. Globos aerostáticos, chimeneas de hadas, iglesias rupestres y ciudades subterráneas en Göreme y alrededores.",
        intro: [
          "Capadocia es un paisaje de ensueño — valles de 'chimeneas de hadas', iglesias excavadas en la roca pintadas hace mil años y ciudades enteras talladas bajo tierra. Al amanecer, cientos de globos se elevan sobre Göreme en uno de los grandes espectáculos del mundo.",
          "Un local de VibeGuide sabe qué valle capta la mejor luz, qué iglesia rupestre se conserva y dónde no hay multitudes — convirtiendo una foto famosa en una comprensión real del lugar.",
        ],
        highlights: [
          { title: "Globos aerostáticos", desc: "Vuelos al amanecer sobre los valles — la imagen de Capadocia." },
          { title: "Museo al aire libre de Göreme", desc: "Iglesias rupestres bizantinas con frescos tallados en la roca." },
          { title: "Ciudades subterráneas", desc: "Derinkuyu y Kaymaklı — pueblos enteros bajo tierra." },
        ],
        faqs: [
          { q: "¿Dónde está Capadocia?", a: "En Anatolia central, alrededor de Göreme y Nevşehir; se llega en avión a Kayseri o Nevşehir." },
          { q: "¿Están garantizados los vuelos en globo?", a: "Dependen del clima y se reservan aparte. Un guía te ayuda a planificar el resto a su alrededor." },
          { q: "¿Cuántos días necesito?", a: "Dos días cubren lo esencial con calma; un guía local hace que incluso un día valga la pena." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Capadocia se encuentra en Anatolia Central, en la provincia de Nevsehir, con el pequeno pueblo de Goreme en su corazon. La mayoria de los viajeros vuelan a Nevsehir (NAV) o al aeropuerto mas grande de Kayseri (ASR), y luego completan el ultimo tramo en traslado o coche. La region es lo bastante compacta como para explorarla desde una sola base, y sus valles de chimeneas de hadas aparecen casi nada mas llegar.",
          "La primavera y el otono son ideales, con dias templados y una luz suave que realza el paisaje rocoso. El verano trae calor y mas gente, mientras que el invierno cubre las chimeneas de hadas de nieve para crear una escena tranquila y magica. Las primeras horas de la manana son doradas aqui, sobre todo al amanecer, cuando los globos aerostaticos se elevan sobre los valles si el tiempo lo permite. Reserva unos dos dias.",
          "Los principales lugares, como el Museo al Aire Libre de Goreme y las ciudades subterraneas, requieren entrada, y los vuelos en globo se reservan aparte y dependen del clima. Un guia local titulado de VibeGuide te ayuda a elegir el mejor momento para el globo, encontrar los valles mas bonitos para caminar y fotografiar, y comprender los frescos de las iglesias rupestres y las viviendas excavadas que de otro modo pasarias por alto.",
        ],
        ctaTitle: "Descubre Capadocia con un local",
        ...CAP.es,
      },
      fr: {
        name: "Cappadoce",
        metaTitle: "Visites de Cappadoce avec guides locaux",
        metaDescription:
          "Explorez la Cappadoce avec un guide local vérifié. Montgolfières, cheminées de fées, églises rupestres et villes souterraines à Göreme et alentour.",
        intro: [
          "La Cappadoce est un paysage de rêve — vallées de « cheminées de fées », églises taillées dans la roche peintes il y a mille ans et villes entières creusées sous terre. À l'aube, des centaines de montgolfières s'élèvent au-dessus de Göreme, l'un des grands spectacles du monde.",
          "Un local VibeGuide sait quelle vallée capte la meilleure lumière, quelle église rupestre a survécu et où la foule n'est pas — transformant une photo célèbre en véritable compréhension du lieu.",
        ],
        highlights: [
          { title: "Montgolfières", desc: "Vols à l'aube au-dessus des vallées — l'image de la Cappadoce." },
          { title: "Musée en plein air de Göreme", desc: "Églises rupestres byzantines aux fresques taillées dans la roche." },
          { title: "Villes souterraines", desc: "Derinkuyu et Kaymaklı — des villes entières sous terre." },
        ],
        faqs: [
          { q: "Où se trouve la Cappadoce ?", a: "En Anatolie centrale, autour de Göreme et Nevşehir, accessible en avion vers Kayseri ou Nevşehir." },
          { q: "Les vols en montgolfière sont-ils garantis ?", a: "Ils dépendent de la météo et se réservent à part. Un guide vous aide à organiser le reste autour." },
          { q: "Combien de jours faut-il ?", a: "Deux jours couvrent l'essentiel tranquillement ; un guide local rend même une journée précieuse." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "La Cappadoce se situe en Anatolie centrale, dans la province de Nevsehir, avec le petit bourg de Goreme en son coeur. La plupart des voyageurs atterrissent a Nevsehir (NAV) ou au plus grand aeroport de Kayseri (ASR), puis parcourent le dernier troncon en navette ou en voiture. La region est assez compacte pour etre exploree depuis un seul point de chute, et ses vallees de cheminees de fees se devoilent presque des l'arrivee.",
          "Le printemps et l'automne sont ideaux, avec des journees douces et une lumiere tamisee qui sublime le paysage rocheux. L'ete apporte chaleur et affluence, tandis que l'hiver recouvre les cheminees de fees de neige pour offrir une scene paisible et feerique. Les premieres heures du matin sont dorees ici, surtout a l'aube, quand les montgolfieres s'elevent au-dessus des vallees, si la meteo le permet. Prevoyez environ deux jours.",
          "Les sites majeurs, comme le musee en plein air de Goreme et les cites souterraines, sont payants, et les vols en montgolfiere se reservent a part et dependent de la meteo. Un guide local agree VibeGuide vous aide a choisir le bon moment pour le vol, a reperer les plus belles vallees pour la marche et la photo, et a comprendre les fresques des eglises rupestres et les habitations troglodytiques que vous risqueriez sinon de manquer.",
        ],
        ctaTitle: "Découvrez la Cappadoce avec un local",
        ...CAP.fr,
      },
      el: {
        name: "Καππαδοκία",
        metaTitle: "Ξεναγήσεις στην Καππαδοκία με ντόπιους ξεναγούς",
        metaDescription:
          "Εξερεύνησε την Καππαδοκία με πιστοποιημένο ντόπιο ξεναγό. Αερόστατα, «καμινάδες των ξωτικών», βραχώδεις εκκλησίες και υπόγειες πόλεις στο Γκαϊρεμέ και πέρα.",
        intro: [
          "Η Καππαδοκία είναι ένα τοπίο ονείρου — κοιλάδες με «καμινάδες των ξωτικών», εκκλησίες λαξευμένες στον βράχο ζωγραφισμένες πριν χίλια χρόνια και ολόκληρες υπόγειες πόλεις. Την αυγή, εκατοντάδες αερόστατα υψώνονται πάνω από το Γκαϊρεμέ σε ένα από τα μεγάλα θεάματα του κόσμου.",
          "Ένας ντόπιος του VibeGuide ξέρει ποια κοιλάδα πιάνει το καλύτερο φως, ποια βραχώδης εκκλησία σώθηκε και πού δεν έχει κόσμο — μετατρέποντας μια διάσημη φωτογραφία σε πραγματική κατανόηση του τόπου.",
        ],
        highlights: [
          { title: "Αερόστατα", desc: "Πτήσεις την αυγή πάνω από τις κοιλάδες — η εικόνα της Καππαδοκίας." },
          { title: "Υπαίθριο Μουσείο Γκαϊρεμέ", desc: "Βυζαντινές βραχώδεις εκκλησίες με τοιχογραφίες στον βράχο." },
          { title: "Υπόγειες Πόλεις", desc: "Ντερίνκουγιου και Καϊμακλί — ολόκληρες πόλεις κάτω από τη γη." },
        ],
        faqs: [
          { q: "Πού βρίσκεται η Καππαδοκία;", a: "Στην κεντρική Ανατολία, γύρω από το Γκαϊρεμέ και το Νέβσεχιρ· προσβάσιμη με πτήση προς Καισάρεια ή Νέβσεχιρ." },
          { q: "Είναι εγγυημένες οι πτήσεις αερόστατου;", a: "Εξαρτώνται από τον καιρό και κλείνονται ξεχωριστά. Ο ξεναγός σε βοηθά να οργανώσεις τα υπόλοιπα γύρω τους." },
          { q: "Πόσες μέρες χρειάζομαι;", a: "Δύο μέρες καλύπτουν άνετα τα κυριότερα· ένας ντόπιος ξεναγός κάνει ακόμη και μία μέρα να μετράει." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Η Καππαδοκία βρίσκεται στην κεντρική Ανατολία, στην επαρχία Νεβσεχίρ, με τη μικρή κωμόπολη Γκιόρεμε στην καρδιά της. Οι περισσότεροι ταξιδιώτες πετούν προς το Νεβσεχίρ (NAV) ή το μεγαλύτερο αεροδρόμιο της Καισάρειας (ASR) και διανύουν το τελευταίο κομμάτι με μεταφορά ή αυτοκίνητο. Η περιοχή είναι αρκετά συμπαγής ώστε να εξερευνηθεί από μία βάση, και οι εξωπραγματικές κοιλάδες με τις καμινάδες των νεράιδων εμφανίζονται σχεδόν αμέσως μόλις φτάσετε.",
          "Η άνοιξη και το φθινόπωρο είναι ιδανικά, με ήπιες μέρες και απαλό φως που αναδεικνύει το βραχώδες τοπίο. Το καλοκαίρι φέρνει ζέστη και περισσότερο κόσμο, ενώ ο χειμώνας ντύνει τις καμινάδες με χιόνι για μια ήσυχη, μαγική εικόνα. Οι πρώτες πρωινές ώρες είναι χρυσές εδώ, ειδικά την αυγή, όταν τα αερόστατα υψώνονται πάνω από τις κοιλάδες, αν το επιτρέπει ο καιρός. Υπολογίστε περίπου δύο ημέρες.",
          "Τα κύρια αξιοθέατα, όπως το Υπαίθριο Μουσείο του Γκιόρεμε και οι υπόγειες πόλεις, απαιτούν εισιτήριο, ενώ οι πτήσεις με αερόστατο κλείνονται ξεχωριστά και εξαρτώνται από τον καιρό. Ένας αδειούχος τοπικός ξεναγός της VibeGuide σας βοηθά να επιλέξετε την κατάλληλη ώρα για το αερόστατο, να βρείτε τις ωραιότερες κοιλάδες για περπάτημα και φωτογραφία, και να κατανοήσετε τις τοιχογραφίες των βραχωδών εκκλησιών.",
        ],
        ctaTitle: "Ανακάλυψε την Καππαδοκία με έναν ντόπιο",
        ...CAP.el,
      },
      tr: {
        name: "Kapadokya",
        metaTitle: "Kapadokya Turları & Yerel Rehberler",
        metaDescription:
          "Kapadokya'yı doğrulanmış bir yerel rehberle keşfet. Sıcak hava balonları, peri bacaları, kaya kiliseleri ve Göreme çevresinde yer altı şehirleri.",
        intro: [
          "Kapadokya rüyadan bir manzara — 'peri bacası' vadileri, bin yıl önce boyanmış kayaya oyma kiliseler ve yer altına kazılmış koca şehirler. Şafakta yüzlerce sıcak hava balonu Göreme'nin üzerinde yükselir; dünyanın en büyük manzaralarından biri.",
          "VibeGuide yerel rehberi hangi vadinin en iyi ışığı yakaladığını, hangi kaya kilisesinin ayakta kaldığını ve kalabalığın olmadığı yerleri bilir — ünlü bir fotoğrafı, mekânın gerçek anlamına dönüştürür.",
        ],
        highlights: [
          { title: "Sıcak Hava Balonları", desc: "Vadiler üzerinde şafak uçuşları — Kapadokya'nın simgesi." },
          { title: "Göreme Açık Hava Müzesi", desc: "Kayaya oyulmuş, freskli Bizans kaya kiliseleri." },
          { title: "Yer Altı Şehirleri", desc: "Derinkuyu ve Kaymaklı — yer altında koca kasabalar." },
        ],
        faqs: [
          { q: "Kapadokya nerede?", a: "İç Anadolu'da, Göreme ve Nevşehir çevresinde; Kayseri veya Nevşehir'e uçuşla ulaşılır." },
          { q: "Balon uçuşları garanti mi?", a: "Havaya bağlı ve ayrı rezerve edilir. Rehber, gerisini bunun etrafında planlamana yardım eder." },
          { q: "Kaç gün gerekir?", a: "İki gün öne çıkanları rahatça kapsar; yerel rehber tek günü bile değerli kılar." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Kapadokya, İç Anadolu'da Nevşehir ilinde yer alır ve kalbinde küçük Göreme kasabası bulunur. Çoğu gezgin Nevşehir (NAV) ya da daha büyük Kayseri (ASR) havalimanına uçar, ardından son bölümü servis veya arabayla tamamlar. Bölge tek bir konaklama noktasından keşfedilecek kadar derli topludur ve peribacalarının süslediği masalsı vadiler siz varır varmaz karşınıza çıkmaya başlar.",
          "İlkbahar ve sonbahar idealdir; ılıman günler ve yumuşak ışık kayalık manzarayı en güzel haliyle ortaya koyar. Yaz sıcak ve kalabalıktır, kış ise peribacalarını karla örterek sessiz ve büyülü bir tablo sunar. Sabahın erken saatleri burada altın değerindedir, özellikle hava uygunsa sıcak hava balonlarının vadiler üzerinde yükseldiği şafak vakti. Acele etmeden görmek için yaklaşık iki gün ayırın.",
          "Göreme Açık Hava Müzesi ve yeraltı şehirleri gibi başlıca noktalar biletlidir; balon turları ise ayrı olarak rezerve edilir ve havaya bağlıdır. Ruhsatlı bir yerel VibeGuide rehberi, balon deneyiminin zamanlamasını ayarlamanıza, yürüyüş ve fotoğraf için en güzel vadileri bulmanıza ve yoksa fark etmeden geçebileceğiniz kaya kiliselerindeki freskleri anlamanıza yardımcı olur.",
        ],
        ctaTitle: "Kapadokya'yı bir yerelle keşfet",
        ...CAP.tr,
      },
      it: {
        name: "Cappadocia",
        metaTitle: "Tour della Cappadocia e guide locali",
        metaDescription:
          "Esplora la Cappadocia con una guida locale verificata. Mongolfiere, camini delle fate, chiese rupestri e città sotterranee a Göreme e dintorni.",
        intro: [
          "La Cappadocia è un paesaggio da sogno — valli di 'camini delle fate', chiese scavate nella roccia e affrescate mille anni fa, e intere città scolpite nel sottosuolo. All'alba, centinaia di mongolfiere si alzano su Göreme in uno dei grandi spettacoli del mondo.",
          "Un local di VibeGuide sa quale valle cattura la luce migliore, quale chiesa rupestre si è conservata e dove non c'è folla — trasformando una foto famosa in una vera comprensione del luogo.",
        ],
        highlights: [
          { title: "Mongolfiere", desc: "Voli all'alba sopra le valli — l'immagine che rappresenta la Cappadocia." },
          { title: "Museo all'aperto di Göreme", desc: "Chiese rupestri bizantine con affreschi scavati nella roccia." },
          { title: "Città sotterranee", desc: "Derinkuyu e Kaymaklı — intere città nascoste sottoterra." },
        ],
        faqs: [
          { q: "Dove si trova la Cappadocia?", a: "Nell'Anatolia centrale, intorno a Göreme e Nevşehir, raggiungibile in volo a Kayseri o Nevşehir." },
          { q: "I voli in mongolfiera sono garantiti?", a: "Dipendono dal meteo e si prenotano a parte. Una guida ti aiuta a pianificare il resto intorno a essi." },
          { q: "Quanti giorni servono?", a: "Due giorni coprono con calma i punti salienti; una guida locale rende prezioso anche un solo giorno." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "La Cappadocia si trova nell'Anatolia centrale, nella provincia di Nevsehir, con la piccola cittadina di Goreme nel suo cuore. La maggior parte dei viaggiatori atterra a Nevsehir (NAV) o al piu grande aeroporto di Kayseri (ASR), per poi percorrere l'ultimo tratto in navetta o in auto. La regione e abbastanza compatta da esplorare da un'unica base, e le sue valli di camini delle fate compaiono quasi appena si arriva.",
          "Primavera e autunno sono ideali, con giornate miti e una luce morbida che esalta il paesaggio roccioso. L'estate porta caldo e piu visitatori, mentre l'inverno ricopre i camini delle fate di neve creando una scena silenziosa e magica. Le prime ore del mattino qui sono dorate, soprattutto all'alba, quando le mongolfiere si alzano sopra le valli, tempo permettendo. Metti in conto circa due giorni.",
          "I luoghi principali, come il Museo all'aperto di Goreme e le citta sotterranee, sono a pagamento, mentre i voli in mongolfiera si prenotano a parte e dipendono dal meteo. Una guida locale abilitata VibeGuide ti aiuta a scegliere il momento giusto per la mongolfiera, a individuare le valli piu belle per camminare e fotografare, e a comprendere gli affreschi delle chiese rupestri e le abitazioni scavate nella roccia.",
        ],
        ctaTitle: "Scopri la Cappadocia con un local",
        ...CAP.it,
      },
      pl: {
        name: "Kapadocja",
        metaTitle: "Wycieczki po Kapadocji i lokalni przewodnicy",
        metaDescription:
          "Zwiedzaj Kapadocję ze zweryfikowanym lokalnym przewodnikiem. Balony na ogrzane powietrze, kominy wróżek, skalne kościoły i podziemne miasta w Göreme i okolicy.",
        intro: [
          "Kapadocja to krajobraz jak ze snu — doliny 'kominów wróżek', wykute w skale kościoły pomalowane tysiąc lat temu i całe miasta wydrążone pod ziemią. O świcie setki balonów na ogrzane powietrze wznoszą się nad Göreme w jednym z największych widowisk świata.",
          "Lokalny przewodnik VibeGuide wie, która dolina łapie najlepsze światło, który skalny kościół przetrwał i gdzie nie ma tłumów — zamieniając słynne zdjęcie w prawdziwe zrozumienie miejsca.",
        ],
        highlights: [
          { title: "Balony na ogrzane powietrze", desc: "Loty o świcie nad dolinami — obraz, który definiuje Kapadocję." },
          { title: "Muzeum na wolnym powietrzu w Göreme", desc: "Bizantyjskie skalne kościoły z freskami wykutymi w skale." },
          { title: "Podziemne miasta", desc: "Derinkuyu i Kaymaklı — całe miasta ukryte pod ziemią." },
        ],
        faqs: [
          { q: "Gdzie leży Kapadocja?", a: "W centralnej Anatolii, wokół Göreme i Nevşehir, dostępna samolotem do Kayseri lub Nevşehir." },
          { q: "Czy loty balonem są gwarantowane?", a: "Zależą od pogody i rezerwuje się je osobno. Przewodnik pomoże zaplanować resztę wokół nich." },
          { q: "Ile dni potrzebuję?", a: "Dwa dni spokojnie obejmują najważniejsze atrakcje; lokalny przewodnik sprawia, że liczy się nawet jeden dzień." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Kapadocja leży w środkowej Anatolii, w prowincji Nevşehir, a jej sercem jest niewielkie miasteczko Göreme. Większość podróżnych przylatuje do Nevşehiru (NAV) lub na większe lotnisko w Kayseri (ASR), a ostatni odcinek pokonuje transferem lub samochodem. Region jest na tyle zwarty, że można go zwiedzać z jednej bazy, a nieziemskie doliny z kominami wróżek pojawiają się niemal zaraz po przyjeździe.",
          "Wiosna i jesień są idealne, z łagodnymi dniami i miękkim światłem, które podkreśla skalisty krajobraz. Lato przynosi upał i większe tłumy, a zima okrywa kominy wróżek śniegiem, tworząc cichą, magiczną scenerię. Wczesne poranki są tu złote, zwłaszcza o świcie, gdy balony na ogrzane powietrze unoszą się nad dolinami, o ile pozwala pogoda. Zaplanuj około dwóch dni.",
          "Główne atrakcje, takie jak Muzeum na Wolnym Powietrzu w Göreme i podziemne miasta, są biletowane, a loty balonem rezerwuje się osobno i zależą od pogody. Licencjonowany lokalny przewodnik VibeGuide pomoże ci dobrać dogodną porę na lot balonem, znaleźć najpiękniejsze doliny na spacery i zdjęcia oraz zrozumieć freski skalnych kościołów i domostwa wykute w skale.",
        ],
        ctaTitle: "Odkryj Kapadocję z lokalnym przewodnikiem",
        ...CAP.pl,
      },
      nl: {
        name: "Cappadocië",
        metaTitle: "Cappadocië-tours en lokale gidsen",
        metaDescription:
          "Ontdek Cappadocië met een geverifieerde lokale gids. Heteluchtballonnen, feeënschoorstenen, rotskerken en ondergrondse steden in Göreme en omgeving.",
        intro: [
          "Cappadocië is een landschap als uit een droom — valleien vol 'feeënschoorstenen', duizend jaar geleden beschilderde rotskerken en hele steden uitgehouwen onder de grond. Bij dageraad stijgen honderden heteluchtballonnen op boven Göreme, een van de grote schouwspelen ter wereld.",
          "Een local van VibeGuide weet welke vallei het mooiste licht vangt, welke rotskerk bewaard is gebleven en waar de drukte niet is — en maakt van een beroemde foto een echt begrip van de plek.",
        ],
        highlights: [
          { title: "Heteluchtballonnen", desc: "Vluchten bij dageraad boven de valleien — het beeld van Cappadocië." },
          { title: "Openluchtmuseum Göreme", desc: "Byzantijnse rotskerken met in de rots uitgehouwen fresco's." },
          { title: "Ondergrondse steden", desc: "Derinkuyu en Kaymaklı — hele steden verborgen onder de grond." },
        ],
        faqs: [
          { q: "Waar ligt Cappadocië?", a: "In Centraal-Anatolië, rond Göreme en Nevşehir, bereikbaar per vlucht naar Kayseri of Nevşehir." },
          { q: "Zijn ballonvluchten gegarandeerd?", a: "Ze zijn afhankelijk van het weer en worden apart geboekt. Een gids helpt je de rest eromheen te plannen." },
          { q: "Hoeveel dagen heb ik nodig?", a: "Twee dagen dekken de hoogtepunten comfortabel; een lokale gids maakt zelfs één dag waardevol." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Cappadocie ligt in Centraal-Anatolie, in de provincie Nevsehir, met het kleine stadje Goreme als middelpunt. De meeste reizigers vliegen naar Nevsehir (NAV) of de grotere luchthaven van Kayseri (ASR) en leggen het laatste stuk af met een shuttle of auto. De regio is compact genoeg om vanuit een uitvalsbasis te verkennen, en de bovenaardse valleien met feeenschoorstenen duiken bijna meteen na aankomst op.",
          "Lente en herfst zijn ideaal, met milde dagen en zacht licht dat het rotslandschap prachtig doet uitkomen. De zomer brengt hitte en meer drukte, terwijl de winter de feeenschoorstenen in sneeuw hult voor een stil en magisch tafereel. De vroege ochtenduren zijn hier goud waard, vooral bij zonsopgang wanneer de heteluchtballonnen boven de valleien opstijgen, als het weer het toelaat. Reken op ongeveer twee dagen.",
          "Belangrijke bezienswaardigheden zoals het Openluchtmuseum van Goreme en de ondergrondse steden zijn tegen betaling, en ballonvluchten boek je apart en zijn afhankelijk van het weer. Een erkende lokale VibeGuide-gids helpt je de ballonvlucht goed te timen, de mooiste valleien voor wandelingen en foto's te vinden en de fresco's van de rotskerken en grotwoningen te begrijpen die je anders zou missen.",
        ],
        ctaTitle: "Ontdek Cappadocië met een local",
        ...CAP.nl,
      },

    },
  },
  {
    slug: "dolmabahce-palace",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🏛️",
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1600",
    lat: 41.03917,
    lng: 29.00069,
    i18n: {
      en: {
        name: "Dolmabahçe Palace",
        metaTitle: "Dolmabahçe Palace Tours & Local Guides",
        metaDescription:
          "Visit Dolmabahçe Palace on the Bosphorus with a verified Istanbul guide. Gold ceilings, the world's largest crystal chandelier, and the room where Atatürk died.",
        intro: [
          "Dolmabahçe Palace is the most opulent chapter of the late Ottoman story. Built between 1843 and 1856 for Sultan Abdülmecid I by the Balyan architects, it replaced medieval Topkapı as the imperial residence — a deliberately European statement in Baroque, Rococo and Neoclassical style, with 285 rooms, 46 halls and 6 hammams stretched along the European shore of the Bosphorus.",
          "With a VibeGuide local expert the excess makes sense. Entry follows a guided route, so a real guide is the difference between a corridor of gilded rooms and the true story — 14 tons of gold, a 4.5-ton chandelier, and the exact minute a nation stopped its clocks.",
        ],
        highlights: [
          { title: "The Ceremonial Hall", desc: "Home to a 4.5-ton Bohemian crystal chandelier with 750 lamps — a gift from Queen Victoria and the largest of its kind on Earth." },
          { title: "The Crystal Staircase", desc: "Banisters cut entirely from Baccarat crystal, beneath ceilings gilded with 14 tons of gold." },
          { title: "Atatürk's Room", desc: "The founder of modern Turkey died here on 10 November 1938 at 09:05 — the palace clocks are still set to that moment." },
        ],
        faqs: [
          { q: "Do I need a guide for Dolmabahçe Palace?", a: "Entry is by guided route, and the Selamlık, Harem and Ceremonial Hall each hide stories you'd walk straight past. A VibeGuide local turns the gilding into a narrative and helps you skip the longest queues." },
          { q: "Why are all the clocks set to 09:05?", a: "Atatürk died in the palace at 09:05 on 10 November 1938. Many of Dolmabahçe's clocks are traditionally kept at that time in his memory." },
          { q: "How long does a visit take?", a: "Most guided visits run 1–2 hours between the Selamlık, Harem and waterfront gardens, and pair beautifully with a Bosphorus cruise afterwards." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Dolmabahçe Palace stretches along the Bosphorus shore in Beşiktaş, on the European side. The simplest way to arrive is the T1 tram to its final stop at Kabataş, followed by a short walk along the water to the ornate gates. Buses and ferries also serve the area, and the seafront setting makes the final approach a pleasant one.",
          "The palace opens to visitors on a set schedule, and mornings are the calmest time to explore before tour groups fill the halls. It historically closes one day a week, so check the weekly closing day before you go. Spring and autumn bring mild weather ideal for combining the interior with the gardens and the Bosphorus views outside.",
          "Entry is ticketed and the visit follows a guided route through richly decorated rooms. The Selamlık and the Harem are separate sections with separate tickets, so decide in advance how much you want to see. A licensed VibeGuide local guide can arrange your tickets, help you choose between the sections, and explain the Ottoman history behind the crystal, gold and grand staircases.",
        ],
        ctaTitle: "See Dolmabahçe with a local",
        ...IST.en,
      },
      de: {
        name: "Dolmabahçe-Palast",
        metaTitle: "Dolmabahçe-Palast Touren & lokale Guides",
        metaDescription:
          "Besuche den Dolmabahçe-Palast am Bosporus mit einem geprüften Istanbul-Guide. Goldene Decken, der größte Kristalllüster der Welt und Atatürks Sterbezimmer.",
        intro: [
          "Der Dolmabahçe-Palast ist das prunkvollste Kapitel der späten Osmanenzeit. Zwischen 1843 und 1856 für Sultan Abdülmecid I. von den Balyan-Architekten erbaut, löste er das mittelalterliche Topkapı als Residenz ab — ein bewusst europäisches Statement in Barock, Rokoko und Klassizismus, mit 285 Zimmern, 46 Sälen und 6 Hammams am europäischen Bosporus-Ufer.",
          "Mit einem lokalen VibeGuide-Experten ergibt der Überfluss einen Sinn. Der Besuch folgt einem geführten Rundgang — ein echter Guide macht aus einer Flucht vergoldeter Räume die wahre Geschichte: 14 Tonnen Gold, ein 4,5 Tonnen schwerer Lüster und die genaue Minute, in der eine Nation ihre Uhren anhielt.",
        ],
        highlights: [
          { title: "Der Zeremoniensaal", desc: "Hier hängt ein 4,5 Tonnen schwerer böhmischer Kristalllüster mit 750 Lampen — ein Geschenk von Königin Victoria und der größte seiner Art weltweit." },
          { title: "Die Kristalltreppe", desc: "Geländer vollständig aus Baccarat-Kristall, unter Decken, die mit 14 Tonnen Gold vergoldet sind." },
          { title: "Atatürks Zimmer", desc: "Der Gründer der modernen Türkei starb hier am 10. November 1938 um 09:05 Uhr — die Uhren des Palastes stehen bis heute auf diesem Moment." },
        ],
        faqs: [
          { q: "Brauche ich einen Guide für den Dolmabahçe-Palast?", a: "Der Zutritt erfolgt über einen geführten Rundgang, und Selamlık, Harem und Zeremoniensaal bergen jeweils Geschichten, an denen man sonst vorbeiläuft. Ein lokaler VibeGuide macht aus der Vergoldung eine Erzählung und hilft dir, die längsten Schlangen zu meiden." },
          { q: "Warum stehen alle Uhren auf 09:05?", a: "Atatürk starb am 10. November 1938 um 09:05 Uhr im Palast. Viele Uhren im Dolmabahçe werden zu seinem Gedenken traditionell auf diese Zeit gestellt." },
          { q: "Wie lange dauert ein Besuch?", a: "Die meisten geführten Besuche dauern 1–2 Stunden zwischen Selamlık, Harem und den Uferparks — und lassen sich danach wunderbar mit einer Bosporus-Fahrt verbinden." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Dolmabahçe-Palast erstreckt sich am Bosporusufer im Stadtteil Beşiktaş auf der europäischen Seite. Am einfachsten kommst du mit der Straßenbahn T1 bis zur Endhaltestelle Kabataş und gehst von dort ein kurzes Stück am Wasser entlang zu den prächtigen Toren. Auch Busse und Fähren bedienen die Gegend, und die Lage direkt am Meer macht den letzten Weg besonders angenehm.",
          "Der Palast empfängt Besucher zu festen Zeiten, und der Vormittag ist am ruhigsten, bevor Reisegruppen die Säle füllen. Traditionell bleibt er an einem Tag pro Woche geschlossen, prüfe daher vorab den wöchentlichen Schließtag. Frühling und Herbst bringen mildes Wetter, ideal, um das Innere mit den Gärten und dem Bosporusblick draußen zu verbinden.",
          "Der Eintritt ist kostenpflichtig, und der Rundgang folgt einer geführten Route durch reich geschmückte Räume. Selamlık und Harem sind getrennte Bereiche mit eigenen Tickets, entscheide also im Voraus, wie viel du sehen möchtest. Ein lizenzierter VibeGuide vor Ort besorgt deine Tickets, hilft bei der Wahl zwischen den Bereichen und erklärt die osmanische Geschichte hinter Kristall, Gold und den prunkvollen Treppen.",
        ],
        ctaTitle: "Erlebe Dolmabahçe mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Дворец Долмабахче",
        metaTitle: "Дворец Долмабахче: экскурсии с местными гидами",
        metaDescription:
          "Посетите дворец Долмабахче на Босфоре с проверенным гидом в Стамбуле. Золотые потолки, крупнейшая хрустальная люстра в мире и комната, где умер Ататюрк.",
        intro: [
          "Дворец Долмабахче — самая пышная глава поздней Османской истории. Построенный в 1843–1856 годах для султана Абдул-Меджида I архитекторами Бальян, он сменил средневековый Топкапы в роли резиденции — намеренно европейское заявление в стиле барокко, рококо и классицизма: 285 комнат, 46 залов и 6 хаммамов вдоль европейского берега Босфора.",
          "С местным экспертом VibeGuide вся эта роскошь обретает смысл. Осмотр идёт по экскурсионному маршруту, и настоящий гид — это разница между анфиладой позолоченных залов и живой историей: 14 тонн золота, люстра в 4,5 тонны и та самая минута, когда целая страна остановила часы.",
        ],
        highlights: [
          { title: "Церемониальный зал", desc: "Здесь висит богемская хрустальная люстра весом 4,5 тонны с 750 лампами — подарок королевы Виктории и крупнейшая в мире." },
          { title: "Хрустальная лестница", desc: "Перила целиком из хрусталя Баккара — под потолками, позолоченными 14 тоннами золота." },
          { title: "Комната Ататюрка", desc: "Основатель современной Турции умер здесь 10 ноября 1938 года в 09:05 — часы дворца до сих пор показывают это время." },
        ],
        faqs: [
          { q: "Нужен ли гид для дворца Долмабахче?", a: "Вход только по экскурсионному маршруту, а Селамлык, Гарем и Церемониальный зал хранят истории, мимо которых легко пройти. Местный гид VibeGuide превращает позолоту в рассказ и помогает избежать самых длинных очередей." },
          { q: "Почему все часы показывают 09:05?", a: "Ататюрк умер во дворце 10 ноября 1938 года в 09:05. Многие часы Долмабахче по традиции держат на этом времени в его память." },
          { q: "Сколько длится посещение?", a: "Обычно экскурсия занимает 1–2 часа между Селамлыком, Гаремом и прибрежными садами и прекрасно сочетается с прогулкой по Босфору после." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Дворец Долмабахче тянется вдоль берега Босфора в районе Бешикташ на европейской стороне. Проще всего добраться на трамвае T1 до конечной остановки Kabataş, а оттуда пройти немного вдоль воды к нарядным воротам. Район также обслуживают автобусы и паромы, а расположение у самого моря делает последний отрезок пути особенно приятным.",
          "Дворец принимает посетителей по установленному расписанию, и утро — самое спокойное время, пока залы не заполнили туристические группы. По традиции один день в неделю он закрыт, поэтому заранее уточните еженедельный выходной. Весна и осень дарят мягкую погоду, идеальную, чтобы совместить осмотр интерьеров с садами и видами на Босфор снаружи.",
          "Вход платный, а осмотр проходит по экскурсионному маршруту через богато украшенные залы. Селамлык и Гарем — отдельные части с отдельными билетами, так что заранее решите, сколько хотите увидеть. Лицензированный местный гид VibeGuide оформит билеты, поможет выбрать между секциями и расскажет об османской истории, скрытой за хрусталём, золотом и парадными лестницами.",
        ],
        ctaTitle: "Увидеть Долмабахче с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "قصر دولمة باهتشة",
        metaTitle: "جولات قصر دولمة باهتشة مع مرشدين محليين",
        metaDescription:
          "زر قصر دولمة باهتشة على البوسفور مع مرشد موثّق في إسطنبول. أسقف مذهّبة، وأكبر ثريا كريستالية في العالم، والغرفة التي توفي فيها أتاتورك.",
        intro: [
          "قصر دولمة باهتشة هو الفصل الأكثر فخامة في تاريخ الدولة العثمانية المتأخر. شُيّد بين عامي 1843 و1856 للسلطان عبد المجيد الأول على يد معماريي عائلة باليان، ليحل محل قصر توپكاپي القديم كمقر للسلطنة — بيان أوروبي مقصود بأسلوب الباروك والروكوكو والكلاسيكية الجديدة، يضم 285 غرفة و46 قاعة و6 حمّامات على الضفة الأوروبية للبوسفور.",
          "مع خبير محلي من VibeGuide يصبح لهذا البذخ معنى. الزيارة تسير وفق مسار مُرشَد، والمرشد الحقيقي هو الفرق بين رواق من الغرف المذهّبة وبين القصة الحقيقية — 14 طنًا من الذهب، وثريا تزن 4.5 طن، واللحظة التي أوقفت فيها أمة عقارب ساعاتها.",
        ],
        highlights: [
          { title: "قاعة الاحتفالات", desc: "تحتضن ثريا كريستالية بوهيمية تزن 4.5 طن بـ750 مصباحًا — هدية من الملكة فيكتوريا وأكبر ثريا من نوعها في العالم." },
          { title: "السلّم الكريستالي", desc: "درابزين منحوت بالكامل من كريستال باكارا، تحت أسقف مطلية بـ14 طنًا من الذهب." },
          { title: "غرفة أتاتورك", desc: "توفي مؤسس تركيا الحديثة هنا في 10 نوفمبر 1938 عند الساعة 09:05 — ولا تزال ساعات القصر مضبوطة على تلك اللحظة." },
        ],
        faqs: [
          { q: "هل أحتاج إلى مرشد لزيارة قصر دولمة باهتشة؟", a: "الدخول يكون عبر مسار مُرشَد، وكل من السلاملك والحرم وقاعة الاحتفالات يخفي قصصًا قد تمر بها دون أن تنتبه. المرشد المحلي من VibeGuide يحوّل الذهب إلى حكاية ويساعدك على تجنّب أطول الطوابير." },
          { q: "لماذا كل الساعات مضبوطة على 09:05؟", a: "توفي أتاتورك في القصر عند الساعة 09:05 يوم 10 نوفمبر 1938. وتُضبط كثير من ساعات دولمة باهتشة تقليديًا على هذا الوقت تخليدًا لذكراه." },
          { q: "كم تستغرق الزيارة؟", a: "تستغرق معظم الجولات المرشدة 1–2 ساعة بين السلاملك والحرم والحدائق المطلة على الماء، وتتكامل بشكل رائع مع جولة بحرية في البوسفور بعدها." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يمتد قصر دولمة بهجة على ضفة البوسفور في حي بشكتاش على الجانب الأوروبي. أسهل طريقة للوصول هي عبر الترام T1 حتى محطته الأخيرة في كاباتاش، ثم السير مسافة قصيرة بمحاذاة الماء إلى البوابات المزخرفة. كما تخدم المنطقة الحافلات والعبّارات، ويجعل الموقع المطل على البحر آخر جزء من الطريق ممتعًا.",
          "يستقبل القصر الزوار وفق جدول محدد، والصباح هو أهدأ الأوقات قبل أن تملأ المجموعات السياحية القاعات. وقد جرت العادة أن يُغلق يومًا واحدًا في الأسبوع، لذا تحقّق من يوم الإغلاق الأسبوعي قبل الذهاب. يجلب الربيع والخريف طقسًا معتدلًا مثاليًا للجمع بين الداخل والحدائق وإطلالات البوسفور في الخارج.",
          "الدخول مقابل تذكرة، وتسير الجولة وفق مسار مرشد عبر غرف غنية الزخارف. السلاملك والحرملك قسمان منفصلان بتذكرتين منفصلتين، لذا قرّر مسبقًا حجم ما تريد رؤيته. يستطيع مرشد VibeGuide المحلي المرخّص أن يحجز تذاكرك، وأن يساعدك في الاختيار بين القسمين، وأن يشرح التاريخ العثماني الكامن خلف الكريستال والذهب والسلالم الفخمة.",
        ],
        ctaTitle: "زر دولمة باهتشة مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Palacio de Dolmabahçe",
        metaTitle: "Tours del Palacio de Dolmabahçe con guías locales",
        metaDescription:
          "Visita el Palacio de Dolmabahçe en el Bósforo con un guía verificado de Estambul. Techos dorados, la mayor lámpara de cristal del mundo y la sala donde murió Atatürk.",
        intro: [
          "El Palacio de Dolmabahçe es el capítulo más suntuoso del ocaso otomano. Construido entre 1843 y 1856 para el sultán Abdülmecid I por los arquitectos Balyan, sustituyó al medieval Topkapı como residencia imperial — una declaración deliberadamente europea en estilo barroco, rococó y neoclásico, con 285 habitaciones, 46 salones y 6 hammams a lo largo de la orilla europea del Bósforo.",
          "Con un experto local de VibeGuide, tanto lujo cobra sentido. La entrada sigue un recorrido guiado, así que un guía de verdad marca la diferencia entre una sucesión de salas doradas y la historia real: 14 toneladas de oro, una lámpara de 4,5 toneladas y el minuto exacto en que una nación detuvo sus relojes.",
        ],
        highlights: [
          { title: "El Salón Ceremonial", desc: "Alberga una lámpara de cristal de Bohemia de 4,5 toneladas con 750 luces — un regalo de la reina Victoria y la mayor de su clase en el mundo." },
          { title: "La Escalera de Cristal", desc: "Barandillas talladas íntegramente en cristal de Baccarat, bajo techos dorados con 14 toneladas de oro." },
          { title: "La habitación de Atatürk", desc: "El fundador de la Turquía moderna murió aquí el 10 de noviembre de 1938 a las 09:05 — los relojes del palacio siguen marcando ese instante." },
        ],
        faqs: [
          { q: "¿Necesito un guía para el Palacio de Dolmabahçe?", a: "La entrada es por recorrido guiado, y el Selamlık, el Harén y el Salón Ceremonial esconden historias que pasarías de largo. Un guía local de VibeGuide convierte el oro en relato y te ayuda a evitar las colas más largas." },
          { q: "¿Por qué todos los relojes marcan las 09:05?", a: "Atatürk murió en el palacio a las 09:05 del 10 de noviembre de 1938. Muchos relojes de Dolmabahçe se mantienen tradicionalmente en esa hora en su memoria." },
          { q: "¿Cuánto dura la visita?", a: "La mayoría de las visitas guiadas duran 1–2 horas entre el Selamlık, el Harén y los jardines junto al agua, y combinan de maravilla con un crucero por el Bósforo después." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "El Palacio de Dolmabahçe se extiende a orillas del Bósforo, en el barrio de Beşiktaş, en el lado europeo. La forma más sencilla de llegar es el tranvía T1 hasta su parada final en Kabataş, seguido de un corto paseo junto al agua hasta las suntuosas puertas. También hay autobuses y ferris en la zona, y el entorno frente al mar hace muy agradable el tramo final.",
          "El palacio recibe visitas en un horario fijo, y las mañanas son el momento más tranquilo antes de que los grupos llenen las salas. Tradicionalmente cierra un día a la semana, así que comprueba el día de cierre semanal antes de ir. La primavera y el otoño ofrecen un clima suave, ideal para combinar el interior con los jardines y las vistas del Bósforo en el exterior.",
          "La entrada requiere ticket y la visita sigue un recorrido guiado por salas ricamente decoradas. El Selamlık y el Harem son secciones separadas con entradas distintas, así que decide de antemano cuánto quieres ver. Un guía local titulado de VibeGuide puede gestionar tus entradas, ayudarte a elegir entre las secciones y explicar la historia otomana tras el cristal, el oro y las grandes escalinatas.",
        ],
        ctaTitle: "Visita Dolmabahçe con un local",
        ...IST.es,
      },
      fr: {
        name: "Palais de Dolmabahçe",
        metaTitle: "Visites du Palais de Dolmabahçe avec guides locaux",
        metaDescription:
          "Visitez le Palais de Dolmabahçe sur le Bosphore avec un guide vérifié d'Istanbul. Plafonds dorés, le plus grand lustre en cristal du monde et la chambre où mourut Atatürk.",
        intro: [
          "Le Palais de Dolmabahçe est le chapitre le plus fastueux de la fin de l'Empire ottoman. Bâti entre 1843 et 1856 pour le sultan Abdülmecid Ier par les architectes Balyan, il a remplacé le médiéval Topkapı comme résidence impériale — un manifeste délibérément européen de style baroque, rococo et néoclassique, avec 285 pièces, 46 salles et 6 hammams le long de la rive européenne du Bosphore.",
          "Avec un expert local VibeGuide, toute cette démesure prend un sens. La visite suit un parcours guidé : un vrai guide fait la différence entre une enfilade de salons dorés et la véritable histoire — 14 tonnes d'or, un lustre de 4,5 tonnes et la minute précise où une nation a arrêté ses horloges.",
        ],
        highlights: [
          { title: "La Salle des Cérémonies", desc: "Elle abrite un lustre en cristal de Bohême de 4,5 tonnes à 750 lampes — un cadeau de la reine Victoria et le plus grand de son genre au monde." },
          { title: "L'Escalier de Cristal", desc: "Des rampes taillées entièrement dans le cristal de Baccarat, sous des plafonds dorés à 14 tonnes d'or." },
          { title: "La chambre d'Atatürk", desc: "Le fondateur de la Turquie moderne y est mort le 10 novembre 1938 à 09h05 — les horloges du palais indiquent toujours cet instant." },
        ],
        faqs: [
          { q: "Ai-je besoin d'un guide pour le Palais de Dolmabahçe ?", a: "L'entrée se fait par un parcours guidé, et le Selamlık, le Harem et la Salle des Cérémonies cachent chacun des récits que l'on manque sans explication. Un guide local VibeGuide transforme la dorure en histoire et vous aide à éviter les plus longues files." },
          { q: "Pourquoi toutes les horloges indiquent-elles 09h05 ?", a: "Atatürk est mort au palais à 09h05 le 10 novembre 1938. De nombreuses horloges de Dolmabahçe sont traditionnellement maintenues à cette heure en sa mémoire." },
          { q: "Combien de temps dure la visite ?", a: "La plupart des visites guidées durent 1 à 2 heures entre le Selamlık, le Harem et les jardins au bord de l'eau, et se marient à merveille avec une croisière sur le Bosphore ensuite." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Le palais de Dolmabahçe s'étire le long du Bosphore, dans le quartier de Beşiktaş, sur la rive européenne. Le plus simple est de prendre le tramway T1 jusqu'à son terminus de Kabataş, puis de marcher un court instant au bord de l'eau jusqu'aux portes richement ouvragées. Des bus et des ferries desservent aussi le secteur, et le cadre en bord de mer rend l'approche finale très agréable.",
          "Le palais accueille les visiteurs selon des horaires fixes, et le matin reste le moment le plus calme avant que les groupes ne remplissent les salles. Il ferme traditionnellement un jour par semaine, vérifiez donc le jour de fermeture hebdomadaire avant de venir. Le printemps et l'automne offrent un climat doux, idéal pour associer l'intérieur aux jardins et aux vues sur le Bosphore à l'extérieur.",
          "L'entrée est payante et la visite suit un parcours guidé à travers des salles richement décorées. Le Selamlık et le Harem sont des sections distinctes avec des billets séparés, décidez donc à l'avance de ce que vous voulez voir. Un guide local agréé VibeGuide peut réserver vos billets, vous aider à choisir entre les sections et raconter l'histoire ottomane derrière le cristal, l'or et les escaliers monumentaux.",
        ],
        ctaTitle: "Visitez Dolmabahçe avec un local",
        ...IST.fr,
      },
      el: {
        name: "Παλάτι Ντολμάμπαχτσε",
        metaTitle: "Ξεναγήσεις στο Παλάτι Ντολμάμπαχτσε με ντόπιους ξεναγούς",
        metaDescription:
          "Επισκέψου το Παλάτι Ντολμάμπαχτσε στον Βόσπορο με πιστοποιημένο ξεναγό στην Κωνσταντινούπολη. Χρυσές οροφές, ο μεγαλύτερος κρυστάλλινος πολυέλαιος στον κόσμο και το δωμάτιο όπου πέθανε ο Ατατούρκ.",
        intro: [
          "Το Παλάτι Ντολμάμπαχτσε είναι το πιο πολυτελές κεφάλαιο της ύστερης οθωμανικής ιστορίας. Χτισμένο μεταξύ 1843 και 1856 για τον σουλτάνο Αμπντουλμετζίτ Α΄ από τους αρχιτέκτονες Μπαλιάν, αντικατέστησε το μεσαιωνικό Τοπ Καπί ως αυτοκρατορική κατοικία — μια σκόπιμα ευρωπαϊκή δήλωση σε στιλ μπαρόκ, ροκοκό και νεοκλασικισμού, με 285 δωμάτια, 46 αίθουσες και 6 χαμάμ κατά μήκος της ευρωπαϊκής όχθης του Βοσπόρου.",
          "Με έναν ντόπιο ειδικό του VibeGuide, όλη αυτή η υπερβολή αποκτά νόημα. Η είσοδος γίνεται με καθορισμένη ξενάγηση, κι έτσι ένας πραγματικός ξεναγός είναι η διαφορά ανάμεσα σε μια σειρά επίχρυσων δωματίων και στην αληθινή ιστορία — 14 τόνοι χρυσού, ένας πολυέλαιος 4,5 τόνων και η ακριβής στιγμή που ένα έθνος σταμάτησε τα ρολόγια του.",
        ],
        highlights: [
          { title: "Η Αίθουσα Τελετών", desc: "Φιλοξενεί έναν βοημικό κρυστάλλινο πολυέλαιο 4,5 τόνων με 750 λαμπτήρες — δώρο της βασίλισσας Βικτωρίας και ο μεγαλύτερος του είδους του στον κόσμο." },
          { title: "Η Κρυστάλλινη Σκάλα", desc: "Κάγκελα σκαλισμένα ολόκληρα από κρύσταλλο Baccarat, κάτω από οροφές επιχρυσωμένες με 14 τόνους χρυσού." },
          { title: "Το δωμάτιο του Ατατούρκ", desc: "Ο ιδρυτής της σύγχρονης Τουρκίας πέθανε εδώ στις 10 Νοεμβρίου 1938 στις 09:05 — τα ρολόγια του παλατιού δείχνουν ακόμη εκείνη τη στιγμή." },
        ],
        faqs: [
          { q: "Χρειάζομαι ξεναγό για το Παλάτι Ντολμάμπαχτσε;", a: "Η είσοδος γίνεται με καθορισμένη ξενάγηση, και το Σελαμλίκ, το Χαρέμι και η Αίθουσα Τελετών κρύβουν το καθένα ιστορίες που θα προσπερνούσες. Ένας ντόπιος ξεναγός του VibeGuide μετατρέπει το χρυσάφι σε αφήγηση και σε βοηθά να αποφύγεις τις μεγαλύτερες ουρές." },
          { q: "Γιατί όλα τα ρολόγια δείχνουν 09:05;", a: "Ο Ατατούρκ πέθανε στο παλάτι στις 09:05 της 10ης Νοεμβρίου 1938. Πολλά ρολόγια του Ντολμάμπαχτσε διατηρούνται παραδοσιακά σε εκείνη την ώρα στη μνήμη του." },
          { q: "Πόσο διαρκεί η επίσκεψη;", a: "Οι περισσότερες ξεναγήσεις διαρκούν 1–2 ώρες ανάμεσα στο Σελαμλίκ, το Χαρέμι και τους παραλιακούς κήπους, και συνδυάζονται υπέροχα με μια κρουαζιέρα στον Βόσπορο μετά." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Ανάκτορο Ντολμάμπαχτσε απλώνεται στην ακτή του Βοσπόρου, στη συνοικία Μπεσίκτας, στην ευρωπαϊκή πλευρά. Ο πιο εύκολος τρόπος να φτάσετε είναι με το τραμ T1 μέχρι την τελευταία στάση στο Καμπατάς και έπειτα ένα σύντομο περπάτημα δίπλα στο νερό ως τις περίτεχνες πύλες. Την περιοχή εξυπηρετούν επίσης λεωφορεία και φέρι, ενώ το παραθαλάσσιο σκηνικό κάνει την τελική διαδρομή ιδιαίτερα ευχάριστη.",
          "Το ανάκτορο δέχεται επισκέπτες σε καθορισμένο ωράριο, και το πρωί είναι η πιο ήσυχη ώρα προτού γεμίσουν οι αίθουσες με γκρουπ. Παραδοσιακά παραμένει κλειστό μία ημέρα την εβδομάδα, γι' αυτό ελέγξτε την εβδομαδιαία ημέρα κλεισίματος πριν πάτε. Η άνοιξη και το φθινόπωρο φέρνουν ήπιο καιρό, ιδανικό για να συνδυάσετε το εσωτερικό με τους κήπους και τη θέα στον Βόσπορο έξω.",
          "Η είσοδος απαιτεί εισιτήριο και η επίσκεψη ακολουθεί καθορισμένη ξενάγηση μέσα από πλούσια διακοσμημένες αίθουσες. Το Σελαμλίκ και το Χαρέμι είναι ξεχωριστά τμήματα με ξεχωριστά εισιτήρια, οπότε αποφασίστε εκ των προτέρων πόσα θέλετε να δείτε. Ένας αδειούχος τοπικός ξεναγός της VibeGuide μπορεί να κανονίσει τα εισιτήριά σας, να σας βοηθήσει να επιλέξετε ανάμεσα στα τμήματα και να εξηγήσει την οθωμανική ιστορία πίσω από το κρύσταλλο, τον χρυσό και τις μεγαλοπρεπείς σκάλες.",
        ],
        ctaTitle: "Δες το Ντολμάμπαχτσε με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Dolmabahçe Sarayı",
        metaTitle: "Dolmabahçe Sarayı Turları & Yerel Rehberler",
        metaDescription:
          "Dolmabahçe Sarayı'nı Boğaz kıyısında doğrulanmış bir İstanbul rehberiyle gez. Altın tavanlar, dünyanın en büyük kristal avizesi ve Atatürk'ün vefat ettiği oda.",
        intro: [
          "Dolmabahçe Sarayı, geç Osmanlı hikâyesinin en görkemli bölümüdür. 1843–1856 arasında Sultan Abdülmecid için Balyan mimarlarınca inşa edildi ve orta çağdan kalma Topkapı'nın yerine hükümdar konutu oldu — Barok, Rokoko ve Neoklasik üsluplu, bilinçli biçimde Avrupai bir duruş; Boğaz'ın Avrupa yakası boyunca 285 oda, 46 salon ve 6 hamam.",
          "VibeGuide yerel uzmanıyla bu ihtişam anlam kazanır. Giriş rehberli güzergâhla yapılır; gerçek bir rehber, yaldızlı odalar dizisiyle gerçek hikâye arasındaki farktır — 14 ton altın, 4,5 tonluk bir avize ve bütün bir milletin saatlerini durdurduğu o an.",
        ],
        highlights: [
          { title: "Muayede Salonu", desc: "750 ampullü, 4,5 ton ağırlığında Bohemya kristal avizesine ev sahipliği yapar — Kraliçe Victoria'nın armağanı ve dünyanın türünün en büyüğü." },
          { title: "Kristal Merdiven", desc: "Tümüyle Baccarat kristalinden oyulmuş küpeşteler, 14 ton altınla yaldızlanmış tavanların altında." },
          { title: "Atatürk'ün Odası", desc: "Modern Türkiye'nin kurucusu burada 10 Kasım 1938'de saat 09:05'te vefat etti — sarayın saatleri hâlâ o ana ayarlı." },
        ],
        faqs: [
          { q: "Dolmabahçe Sarayı için rehbere ihtiyacım var mı?", a: "Giriş rehberli güzergâhla yapılır; Selamlık, Harem ve Muayede Salonu'nun her biri fark etmeden geçeceğin hikâyeler saklar. VibeGuide yerel rehberi yaldızı anlatıya dönüştürür ve en uzun kuyruklardan kaçınmana yardım eder." },
          { q: "Neden bütün saatler 09:05'i gösteriyor?", a: "Atatürk sarayda 10 Kasım 1938'de saat 09:05'te vefat etti. Dolmabahçe'deki birçok saat, anısına geleneksel olarak bu saatte tutulur." },
          { q: "Ziyaret ne kadar sürer?", a: "Çoğu rehberli ziyaret Selamlık, Harem ve deniz kıyısı bahçeleri arasında 1–2 saat sürer ve ardından bir Boğaz turuyla çok iyi bütünleşir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Dolmabahçe Sarayı, Avrupa yakasında Beşiktaş semtinde Boğaz kıyısı boyunca uzanır. En kolay ulaşım, T1 tramvayıyla son durak Kabataş'a inmek ve oradan su kenarında kısa bir yürüyüşle görkemli kapılara varmaktır. Bölgeye otobüs ve vapur da işler; deniz kenarındaki konum son bölümü keyifli bir yürüyüşe dönüştürür.",
          "Saray ziyaretçileri belirli bir programa göre kabul eder ve turlar salonları doldurmadan önce en sakin zaman sabah saatleridir. Geleneksel olarak haftada bir gün kapalıdır, bu yüzden gitmeden önce haftalık kapanış gününü kontrol edin. İlkbahar ve sonbahar, iç mekânı dışarıdaki bahçeler ve Boğaz manzarasıyla birleştirmek için ideal, ılıman bir hava sunar.",
          "Giriş biletlidir ve ziyaret, zengin süslemeli odalar arasından rehberli bir güzergâhı izler. Selamlık ve Harem ayrı bölümlerdir ve ayrı biletleri vardır, bu yüzden ne kadarını görmek istediğinize önceden karar verin. Lisanslı bir VibeGuide yerel rehberi biletlerinizi ayarlayabilir, bölümler arasında seçim yapmanıza yardımcı olabilir ve kristal, altın ve görkemli merdivenlerin ardındaki Osmanlı tarihini anlatabilir.",
        ],
        ctaTitle: "Dolmabahçe'yi bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Palazzo di Dolmabahçe",
        metaTitle: "Tour del Palazzo di Dolmabahçe con guide locali",
        metaDescription:
          "Visita il Palazzo di Dolmabahçe sul Bosforo con una guida verificata di Istanbul. Soffitti dorati, il più grande lampadario di cristallo al mondo e la stanza dove morì Atatürk.",
        intro: [
          "Il Palazzo di Dolmabahçe è il capitolo più sontuoso del tardo Impero ottomano. Costruito tra il 1843 e il 1856 per il sultano Abdülmecid I dagli architetti Balyan, sostituì il medievale Topkapı come residenza imperiale — una dichiarazione volutamente europea in stile barocco, rococò e neoclassico, con 285 stanze, 46 sale e 6 hammam lungo la sponda europea del Bosforo.",
          "Con un esperto locale VibeGuide tanto sfarzo acquista senso. L'ingresso segue un percorso guidato, quindi una vera guida è la differenza tra una fila di sale dorate e la storia autentica — 14 tonnellate d'oro, un lampadario di 4,5 tonnellate e il minuto esatto in cui una nazione fermò i suoi orologi.",
        ],
        highlights: [
          { title: "La Sala delle Cerimonie", desc: "Ospita un lampadario in cristallo di Boemia da 4,5 tonnellate con 750 luci — un dono della regina Vittoria e il più grande del suo genere al mondo." },
          { title: "La Scala di Cristallo", desc: "Ringhiere intagliate interamente nel cristallo di Baccarat, sotto soffitti dorati con 14 tonnellate d'oro." },
          { title: "La stanza di Atatürk", desc: "Il fondatore della Turchia moderna morì qui il 10 novembre 1938 alle 09:05 — gli orologi del palazzo segnano ancora quell'istante." },
        ],
        faqs: [
          { q: "Serve una guida per il Palazzo di Dolmabahçe?", a: "L'ingresso avviene con percorso guidato, e il Selamlık, l'Harem e la Sala delle Cerimonie nascondono ciascuno storie che altrimenti supereresti senza accorgertene. Una guida locale VibeGuide trasforma le dorature in racconto e ti aiuta a evitare le code più lunghe." },
          { q: "Perché tutti gli orologi segnano le 09:05?", a: "Atatürk morì nel palazzo alle 09:05 del 10 novembre 1938. Molti orologi di Dolmabahçe vengono tenuti tradizionalmente a quell'ora in sua memoria." },
          { q: "Quanto dura la visita?", a: "La maggior parte delle visite guidate dura 1–2 ore tra il Selamlık, l'Harem e i giardini sul mare, e si abbina magnificamente a una crociera sul Bosforo dopo." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Il Palazzo di Dolmabahçe si estende lungo la riva del Bosforo, nel quartiere di Beşiktaş, sul lato europeo. Il modo più semplice per arrivare è il tram T1 fino al capolinea di Kabataş, seguito da una breve passeggiata in riva all'acqua fino ai portali riccamente decorati. La zona è servita anche da autobus e traghetti, e la posizione sul mare rende molto piacevole il tratto finale.",
          "Il palazzo accoglie i visitatori con orari fissi, e la mattina è il momento più tranquillo prima che i gruppi riempiano le sale. Tradizionalmente resta chiuso un giorno alla settimana, quindi verifica il giorno di chiusura settimanale prima di andare. Primavera e autunno offrono un clima mite, ideale per unire gli interni ai giardini e alle vedute sul Bosforo all'esterno.",
          "L'ingresso è a pagamento e la visita segue un percorso guidato tra sale sfarzosamente decorate. Il Selamlık e l'Harem sono sezioni separate con biglietti distinti, quindi decidi in anticipo quanto vuoi vedere. Una guida locale abilitata di VibeGuide può procurarti i biglietti, aiutarti a scegliere tra le sezioni e raccontare la storia ottomana dietro il cristallo, l'oro e le scale monumentali.",
        ],
        ctaTitle: "Visita Dolmabahçe con un locale",
        ...IST.it,
      },
      pl: {
        name: "Pałac Dolmabahçe",
        metaTitle: "Pałac Dolmabahçe — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Pałac Dolmabahçe nad Bosforem z zweryfikowanym przewodnikiem w Stambule. Złocone sufity, największy kryształowy żyrandol świata i pokój, w którym zmarł Atatürk.",
        intro: [
          "Pałac Dolmabahçe to najbardziej przepychowy rozdział późnej historii osmańskiej. Wzniesiony w latach 1843–1856 dla sułtana Abdülmecida I przez architektów z rodu Balyan, zastąpił średniowieczny Topkapı jako rezydencja imperialna — celowo europejski manifest w stylu barokowym, rokokowym i klasycystycznym, z 285 pokojami, 46 salami i 6 hammamami wzdłuż europejskiego brzegu Bosforu.",
          "Z lokalnym ekspertem VibeGuide ten nadmiar nabiera sensu. Zwiedzanie odbywa się wyznaczoną trasą z przewodnikiem, więc prawdziwy przewodnik to różnica między amfiladą złoconych sal a autentyczną historią — 14 ton złota, żyrandol ważący 4,5 tony i dokładna minuta, w której naród zatrzymał swoje zegary.",
        ],
        highlights: [
          { title: "Sala Ceremonialna", desc: "Mieści czeski kryształowy żyrandol o wadze 4,5 tony z 750 lampkami — dar królowej Wiktorii i największy tego rodzaju na świecie." },
          { title: "Kryształowe schody", desc: "Balustrady wykute w całości z kryształu Baccarat, pod sufitami złoconymi 14 tonami złota." },
          { title: "Pokój Atatürka", desc: "Twórca współczesnej Turcji zmarł tu 10 listopada 1938 roku o 09:05 — zegary pałacu wciąż wskazują ten moment." },
        ],
        faqs: [
          { q: "Czy potrzebuję przewodnika w Pałacu Dolmabahçe?", a: "Wstęp odbywa się wyznaczoną trasą z przewodnikiem, a Selamlık, Harem i Sala Ceremonialna kryją historie, które łatwo minąć. Lokalny przewodnik VibeGuide zamienia złocenia w opowieść i pomaga ominąć najdłuższe kolejki." },
          { q: "Dlaczego wszystkie zegary wskazują 09:05?", a: "Atatürk zmarł w pałacu o 09:05 dnia 10 listopada 1938 roku. Wiele zegarów w Dolmabahçe tradycyjnie zatrzymano na tej godzinie ku jego pamięci." },
          { q: "Ile trwa zwiedzanie?", a: "Większość wizyt z przewodnikiem trwa 1–2 godziny między Selamlıkiem, Haremem i nadbrzeżnymi ogrodami, a potem świetnie łączy się z rejsem po Bosforze." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Pałac Dolmabahçe rozciąga się wzdłuż brzegu Bosforu w dzielnicy Beşiktaş, po europejskiej stronie. Najłatwiej dojechać tramwajem T1 do jego pętli w Kabataş, a stamtąd przejść krótki odcinek wzdłuż wody do bogato zdobionych bram. Rejon obsługują też autobusy i promy, a nadmorskie położenie sprawia, że ostatni fragment drogi jest przyjemny.",
          "Pałac przyjmuje zwiedzających według ustalonych godzin, a poranek to najspokojniejsza pora, zanim sale wypełnią się wycieczkami. Tradycyjnie jest nieczynny jeden dzień w tygodniu, więc sprawdź cotygodniowy dzień zamknięcia przed wizytą. Wiosna i jesień przynoszą łagodną pogodę, idealną, by połączyć wnętrza z ogrodami i widokami na Bosfor na zewnątrz.",
          "Wstęp jest biletowany, a zwiedzanie odbywa się wyznaczoną trasą z przewodnikiem przez bogato zdobione sale. Selamlık i Harem to osobne części z osobnymi biletami, więc zdecyduj z góry, ile chcesz zobaczyć. Licencjonowany lokalny przewodnik VibeGuide załatwi bilety, pomoże wybrać między częściami i opowie o osmańskiej historii kryjącej się za kryształem, złotem i okazałymi schodami.",
        ],
        ctaTitle: "Zobacz Dolmabahçe z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Dolmabahçe-paleis",
        metaTitle: "Dolmabahçe-paleis tours & lokale gidsen",
        metaDescription:
          "Bezoek het Dolmabahçe-paleis aan de Bosporus met een geverifieerde gids in Istanbul. Gouden plafonds, 's werelds grootste kristallen kroonluchter en de kamer waar Atatürk stierf.",
        intro: [
          "Het Dolmabahçe-paleis is het meest weelderige hoofdstuk uit de late Ottomaanse geschiedenis. Gebouwd tussen 1843 en 1856 voor sultan Abdülmecid I door de architecten Balyan, verving het het middeleeuwse Topkapı als keizerlijke residentie — een bewust Europees statement in barok, rococo en neoclassicistische stijl, met 285 kamers, 46 zalen en 6 hammams langs de Europese oever van de Bosporus.",
          "Met een lokale VibeGuide-expert krijgt al die overdaad betekenis. Het bezoek volgt een vaste route met gids, dus een echte gids is het verschil tussen een reeks vergulde kamers en het ware verhaal — 14 ton goud, een kroonluchter van 4,5 ton en het exacte moment waarop een natie haar klokken stilzette.",
        ],
        highlights: [
          { title: "De Ceremoniezaal", desc: "Herbergt een Boheemse kristallen kroonluchter van 4,5 ton met 750 lampen — een geschenk van koningin Victoria en de grootste in zijn soort ter wereld." },
          { title: "De Kristallen Trap", desc: "Leuningen volledig gesneden uit Baccarat-kristal, onder plafonds verguld met 14 ton goud." },
          { title: "Atatürks kamer", desc: "De grondlegger van het moderne Turkije stierf hier op 10 november 1938 om 09:05 — de klokken van het paleis staan nog altijd op dat moment." },
        ],
        faqs: [
          { q: "Heb ik een gids nodig voor het Dolmabahçe-paleis?", a: "De toegang gaat via een vaste route met gids, en de Selamlık, de Harem en de Ceremoniezaal verbergen elk verhalen waar je anders langsloopt. Een lokale VibeGuide-gids maakt van het verguldsel een verhaal en helpt je de langste rijen te vermijden." },
          { q: "Waarom staan alle klokken op 09:05?", a: "Atatürk stierf in het paleis om 09:05 op 10 november 1938. Veel klokken in Dolmabahçe worden ter nagedachtenis traditioneel op dat tijdstip gehouden." },
          { q: "Hoe lang duurt een bezoek?", a: "De meeste rondleidingen duren 1–2 uur tussen de Selamlık, de Harem en de tuinen aan het water, en zijn daarna prachtig te combineren met een boottocht over de Bosporus." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Het Dolmabahçe-paleis strekt zich uit langs de oever van de Bosporus in de wijk Beşiktaş, aan de Europese kant. Het eenvoudigst reis je met tram T1 tot het eindpunt Kabataş, gevolgd door een korte wandeling langs het water naar de sierlijke poorten. Ook bussen en veerboten bedienen de omgeving, en de ligging aan zee maakt het laatste stukje bijzonder aangenaam.",
          "Het paleis ontvangt bezoekers op vaste tijden, en de ochtend is het rustigst voordat groepen de zalen vullen. Van oudsher is het één dag per week gesloten, dus controleer de wekelijkse sluitingsdag voordat je gaat. Lente en herfst brengen mild weer, ideaal om het interieur te combineren met de tuinen en de uitzichten over de Bosporus buiten.",
          "De toegang is met kaartje en het bezoek volgt een begeleide route door rijk versierde zalen. De Selamlık en de Harem zijn aparte delen met aparte kaartjes, dus bepaal vooraf hoeveel je wilt zien. Een erkende lokale VibeGuide-gids regelt je tickets, helpt je kiezen tussen de delen en vertelt over de Ottomaanse geschiedenis achter het kristal, het goud en de statige trappen.",
        ],
        ctaTitle: "Bekijk Dolmabahçe met een local",
        ...IST.nl,
      },
    },
  },
  {
    slug: "galata-tower",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🗼",
    image:
      "https://images.unsplash.com/photo-1774434923581-91ed9d8ee79b?q=80&w=1600",
    lat: 41.0256,
    lng: 28.9744,
    i18n: {
      en: {
        name: "Galata Tower",
        metaTitle: "Galata Tower Tours & Local Guides",
        metaDescription:
          "Climb the Galata Tower in Istanbul with a verified local guide. Beat the queues, catch the sunset and hear the story of the Genoese tower over the Golden Horn.",
        intro: [
          "The Galata Tower has crowned the skyline of Beyoğlu since 1348, when the Genoese raised it as the \"Christea Turris\" — the Tower of Christ — at the top of their walled colony. Nearly 67 metres of medieval stone rise over nine floors to a top gallery with a full 360° sweep across the Golden Horn, the historic peninsula and the Bosphorus beyond.",
          "It is a place wrapped in legend: in the 17th century Hezarfen Ahmed Çelebi is said to have strapped on wings and glided from the tower all the way across the Bosphorus to Üsküdar. With a VibeGuide local you time your climb to dodge the worst queues, arrive for the golden hour and hear the tales that the view alone can't tell.",
        ],
        highlights: [
          { title: "360° Panorama", desc: "From the top gallery the whole city unfolds — Golden Horn, old city and both shores of the Bosphorus." },
          { title: "Genoese Landmark", desc: "Built in 1348 as the \"Tower of Christ\", it has watched over Galata for nearly seven centuries." },
          { title: "The Flight Legend", desc: "Hezarfen Ahmed Çelebi is said to have flown from here across the strait on home-made wings." },
        ],
        faqs: [
          { q: "Is there a queue for the Galata Tower?", a: "Often, especially at sunset. A local guide helps you pick the right hour and handles the timing so you spend less time waiting and more time enjoying the view." },
          { q: "When is the best time to go up?", a: "Late afternoon into sunset is magical, when the light turns gold over the water. Your guide can plan the day around it." },
          { q: "How long does a visit take?", a: "The climb and the view take about 45 minutes to an hour, easily combined with a walk through Galata and Karaköy nearby." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Galata Tower rises above the Karaköy and Galata district in Beyoğlu, on the northern side of the Golden Horn. Many visitors reach Karaköy by tram or metro and then climb the steep, characterful streets on foot. For an easier ascent, the historic Tünel funicular carries you up the hill, leaving only a short walk to the tower.",
          "The tower is famous for its panoramic views, and the queue is longest in the hour before sunset when everyone hopes for the same golden photo. Arriving earlier in the day means shorter lines and gentler light for photographs. The surrounding lanes, full of cafes and workshops, are worth exploring whenever you visit.",
          "Entry is ticketed, and an elevator takes you most of the way up before a final flight of stairs reaches the panoramic gallery that circles the top. Expect a compact walkway with sweeping views over the old city, the Bosphorus and the Golden Horn. A licensed VibeGuide local guide can secure your ticket, steer you clear of the sunset crush, and point out the landmarks spread below.",
        ],
        ctaTitle: "See the Galata Tower with a local",
        ...IST.en,
      },
      de: {
        name: "Galataturm",
        metaTitle: "Galataturm Touren & lokale Guides",
        metaDescription:
          "Erklimme den Galataturm in Istanbul mit einem geprüften lokalen Guide. Umgehe die Warteschlangen, erlebe den Sonnenuntergang und höre die Geschichte des genuesischen Turms.",
        intro: [
          "Der Galataturm krönt die Silhouette von Beyoğlu seit 1348, als die Genuesen ihn als \"Christea Turris\" — den Turm Christi — an der Spitze ihrer Kolonie errichteten. Fast 67 Meter mittelalterlicher Stein steigen über neun Stockwerke zu einer Aussichtsgalerie mit vollem 360°-Rundblick über das Goldene Horn, die historische Halbinsel und den Bosporus.",
          "Der Turm ist von Legenden umwoben: Im 17. Jahrhundert soll Hezarfen Ahmed Çelebi mit selbstgebauten Flügeln vom Turm über den Bosporus bis nach Üsküdar geflogen sein. Mit einem VibeGuide-Local planst du deinen Aufstieg so, dass du die längsten Warteschlangen meidest, zur goldenen Stunde ankommst und die Geschichten hörst, die der Ausblick allein nicht erzählt.",
        ],
        highlights: [
          { title: "360°-Panorama", desc: "Von der Galerie öffnet sich die ganze Stadt — Goldenes Horn, Altstadt und beide Ufer des Bosporus." },
          { title: "Genuesisches Wahrzeichen", desc: "1348 als \"Turm Christi\" erbaut, wacht er seit fast sieben Jahrhunderten über Galata." },
          { title: "Die Flug-Legende", desc: "Hezarfen Ahmed Çelebi soll von hier mit selbstgebauten Flügeln über die Meerenge geflogen sein." },
        ],
        faqs: [
          { q: "Muss man am Galataturm anstehen?", a: "Oft, besonders zum Sonnenuntergang. Ein lokaler Guide hilft dir, die richtige Stunde zu wählen, und übernimmt das Timing, damit du weniger wartest und mehr genießt." },
          { q: "Wann geht man am besten hinauf?", a: "Der späte Nachmittag bis zum Sonnenuntergang ist magisch, wenn das Licht über dem Wasser golden wird. Dein Guide plant den Tag darum herum." },
          { q: "Wie lange dauert ein Besuch?", a: "Aufstieg und Ausblick dauern etwa 45 Minuten bis eine Stunde, gut kombinierbar mit einem Bummel durch Galata und Karaköy." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Galata-Turm ragt über dem Viertel Karaköy und Galata in Beyoğlu auf, nördlich des Goldenen Horns. Viele Besucher erreichen Karaköy mit Straßenbahn oder Metro und steigen dann zu Fuß durch die steilen, charaktervollen Gassen hinauf. Bequemer geht es mit der historischen Standseilbahn Tünel, die dich den Hügel hinaufbringt, sodass nur ein kurzer Weg bis zum Turm bleibt.",
          "Der Turm ist für seine Panoramablicke berühmt, und die Schlange ist in der Stunde vor Sonnenuntergang am längsten, wenn alle dasselbe goldene Foto erhoffen. Früher am Tag anzukommen bedeutet kürzere Wartezeiten und weicheres Licht für Aufnahmen. Die umliegenden Gassen voller Cafés und Werkstätten lohnen sich zu jeder Tageszeit.",
          "Der Eintritt ist kostenpflichtig, und ein Aufzug bringt dich fast bis nach oben, ehe eine letzte Treppe zur umlaufenden Aussichtsgalerie führt. Dich erwartet ein schmaler Rundgang mit weiten Blicken über die Altstadt, den Bosporus und das Goldene Horn. Ein lizenzierter VibeGuide vor Ort besorgt dein Ticket, hält dich vom Sonnenuntergangsgedränge fern und zeigt dir die Sehenswürdigkeiten, die sich unter dir ausbreiten.",
        ],
        ctaTitle: "Erlebe den Galataturm mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Галатская башня",
        metaTitle: "Галатская башня: экскурсии с местными гидами",
        metaDescription:
          "Поднимитесь на Галатскую башню в Стамбуле с проверенным местным гидом. Обойдите очереди, встретьте закат и узнайте историю генуэзской башни над Золотым Рогом.",
        intro: [
          "Галатская башня венчает силуэт Бейоглу с 1348 года, когда генуэзцы возвели её как «Christea Turris» — Башню Христа — на вершине своей колонии. Почти 67 метров средневекового камня поднимаются на девять этажей к верхней галерее с полным круговым обзором на 360° — на Золотой Рог, исторический полуостров и Босфор.",
          "Башня окутана легендами: в XVII веке Хезарфен Ахмед Челеби, по преданию, надел крылья и перелетел с башни через Босфор до самого Ускюдара. С местным гидом VibeGuide вы подберёте время подъёма так, чтобы избежать длинных очередей, застать золотой час и услышать истории, которые не расскажет один лишь вид.",
        ],
        highlights: [
          { title: "Панорама 360°", desc: "С верхней галереи открывается весь город — Золотой Рог, старый город и оба берега Босфора." },
          { title: "Генуэзский символ", desc: "Построенная в 1348 году как «Башня Христа», она хранит Галату почти семь веков." },
          { title: "Легенда о полёте", desc: "Говорят, Хезарфен Ахмед Челеби перелетел отсюда через пролив на самодельных крыльях." },
        ],
        faqs: [
          { q: "Есть ли очередь на Галатскую башню?", a: "Часто, особенно на закате. Местный гид поможет выбрать удачный час и возьмёт на себя тайминг, чтобы вы меньше стояли и больше любовались видом." },
          { q: "Когда лучше подниматься?", a: "Ближе к вечеру и на закате волшебно, когда свет над водой становится золотым. Гид спланирует день вокруг этого момента." },
          { q: "Сколько длится визит?", a: "Подъём и обзор занимают около 45 минут — часа, легко сочетаются с прогулкой по Галате и Каракёю рядом." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Галатская башня возвышается над районом Каракёй и Галата в Бейоглу, к северу от бухты Золотой Рог. Многие добираются до Каракёй на трамвае или метро, а затем поднимаются пешком по крутым колоритным улочкам. Проще подняться на историческом фуникулёре Тюнель, который довезёт вас вверх по склону, оставив лишь короткий путь до башни.",
          "Башня славится панорамными видами, и очередь длиннее всего в час перед закатом, когда все надеются на один и тот же золотистый кадр. Приход раньше днём означает более короткие очереди и мягкий свет для фотографий. Окрестные переулки, полные кафе и мастерских, стоит исследовать в любое время.",
          "Вход платный: лифт поднимает почти до самого верха, а последний пролёт лестницы выводит на круговую смотровую галерею. Вас ждёт узкая площадка с широкими видами на старый город, Босфор и Золотой Рог. Лицензированный местный гид VibeGuide оформит билет, уведёт вас от закатной толчеи и покажет достопримечательности, раскинувшиеся внизу.",
        ],
        ctaTitle: "Подняться на Галатскую башню с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "برج غلطة",
        metaTitle: "جولات برج غلطة مع مرشدين محليين",
        metaDescription:
          "اصعد إلى برج غلطة في إسطنبول مع مرشد محلي موثّق. تجنّب الطوابير، والتقط لحظة الغروب، واستمع إلى قصة البرج الجنوي المطل على القرن الذهبي.",
        intro: [
          "يتوّج برج غلطة أفق بيوغلو منذ عام 1348، حين شيّده الجنويون باسم «كريستيا توريس» — برج المسيح — على قمة مستعمرتهم المسوّرة. نحو 67 مترًا من الحجر القروسطي ترتفع عبر تسعة طوابق إلى شرفة علوية تطل بزاوية 360 درجة كاملة على القرن الذهبي وشبه الجزيرة التاريخية والبوسفور.",
          "إنه مكان تكتنفه الأساطير: في القرن السابع عشر يُقال إن هزارفن أحمد جلبي شدّ جناحين وطار من البرج عبر البوسفور حتى أسكودار. مع مرشد محلي من VibeGuide تختار توقيت صعودك لتتفادى أسوأ الطوابير، وتصل في الساعة الذهبية، وتسمع الحكايات التي لا يرويها المنظر وحده.",
        ],
        highlights: [
          { title: "بانوراما 360 درجة", desc: "من الشرفة العليا تنكشف المدينة كلها — القرن الذهبي والمدينة القديمة وضفتا البوسفور." },
          { title: "معلَم جنوي", desc: "بُني عام 1348 باسم «برج المسيح»، ويحرس غلطة منذ نحو سبعة قرون." },
          { title: "أسطورة الطيران", desc: "يُقال إن هزارفن أحمد جلبي طار من هنا عبر المضيق بجناحين صنعهما بنفسه." },
        ],
        faqs: [
          { q: "هل هناك طابور لصعود برج غلطة؟", a: "غالبًا، خاصة عند الغروب. المرشد المحلي يساعدك على اختيار الساعة المناسبة ويتولّى التوقيت لتنتظر أقل وتستمتع بالمنظر أكثر." },
          { q: "ما أفضل وقت للصعود؟", a: "من بعد الظهر حتى الغروب وقت ساحر، حين يتحوّل الضوء فوق الماء إلى ذهبي. يمكن لمرشدك أن يرتّب اليوم حوله." },
          { q: "كم تستغرق الزيارة؟", a: "يستغرق الصعود والمشاهدة نحو 45 دقيقة إلى ساعة، وتُدمج بسهولة مع جولة في غلطة وكاراكوي القريبتين." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يرتفع برج غلطة فوق حيّ كاراكوي وغلطة في بيوغلو، شمالي القرن الذهبي. يصل كثير من الزوار إلى كاراكوي بالترام أو المترو ثم يصعدون سيرًا عبر الأزقة المنحدرة ذات الطابع الخاص. وللصعود الأيسر، يقلّك قطار النفق التاريخي (تونيل) إلى أعلى التل، فلا يبقى سوى مسافة قصيرة إلى البرج.",
          "يشتهر البرج بإطلالاته البانورامية، ويكون الطابور أطول ما يكون في الساعة التي تسبق الغروب حين يأمل الجميع في التقاط الصورة الذهبية نفسها. الوصول باكرًا في النهار يعني طوابير أقصر وضوءًا ألطف للتصوير. أما الأزقة المحيطة المليئة بالمقاهي والورش فتستحق الاستكشاف في أي وقت.",
          "الدخول مقابل تذكرة، ويأخذك مصعد إلى معظم الارتفاع قبل درج أخير يصل إلى الشرفة البانورامية التي تحيط بالقمة. توقّع ممرًا ضيقًا يطلّ على المدينة القديمة والبوسفور والقرن الذهبي. يستطيع مرشد VibeGuide المحلي المرخّص أن يؤمّن تذكرتك، وأن يبعدك عن زحام الغروب، وأن يشير إلى المعالم المنتشرة تحتك.",
        ],
        ctaTitle: "زر برج غلطة مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Torre de Gálata",
        metaTitle: "Tours de la Torre de Gálata con guías locales",
        metaDescription:
          "Sube a la Torre de Gálata en Estambul con un guía local verificado. Evita las colas, disfruta del atardecer y escucha la historia de la torre genovesa sobre el Cuerno de Oro.",
        intro: [
          "La Torre de Gálata corona el perfil de Beyoğlu desde 1348, cuando los genoveses la levantaron como \"Christea Turris\" — la Torre de Cristo — en lo alto de su colonia amurallada. Casi 67 metros de piedra medieval se elevan por nueve pisos hasta una galería superior con una vista de 360° sobre el Cuerno de Oro, la península histórica y el Bósforo.",
          "Es un lugar envuelto en leyendas: en el siglo XVII se dice que Hezarfen Ahmed Çelebi se ató unas alas y voló desde la torre cruzando el Bósforo hasta Üsküdar. Con un local de VibeGuide eliges la hora de subir para esquivar las peores colas, llegar en la hora dorada y oír las historias que la vista por sí sola no cuenta.",
        ],
        highlights: [
          { title: "Panorámica de 360°", desc: "Desde la galería superior se despliega toda la ciudad: el Cuerno de Oro, la ciudad vieja y ambas orillas del Bósforo." },
          { title: "Emblema genovés", desc: "Construida en 1348 como \"Torre de Cristo\", vela por Gálata desde hace casi siete siglos." },
          { title: "La leyenda del vuelo", desc: "Se dice que Hezarfen Ahmed Çelebi voló desde aquí cruzando el estrecho con alas caseras." },
        ],
        faqs: [
          { q: "¿Hay cola en la Torre de Gálata?", a: "A menudo, sobre todo al atardecer. Un guía local te ayuda a elegir la hora adecuada y se ocupa de los tiempos para que esperes menos y disfrutes más." },
          { q: "¿Cuál es la mejor hora para subir?", a: "El final de la tarde hacia el atardecer es mágico, cuando la luz se vuelve dorada sobre el agua. Tu guía puede planear el día en torno a ese momento." },
          { q: "¿Cuánto dura la visita?", a: "La subida y la vista llevan unos 45 minutos a una hora, fáciles de combinar con un paseo por Gálata y Karaköy, muy cerca." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "La Torre de Gálata se alza sobre el barrio de Karaköy y Gálata, en Beyoğlu, al norte del Cuerno de Oro. Muchos visitantes llegan a Karaköy en tranvía o metro y luego suben a pie por las empinadas y pintorescas callejuelas. Para una subida más cómoda, el histórico funicular Tünel te lleva colina arriba, dejando solo un corto paseo hasta la torre.",
          "La torre es famosa por sus vistas panorámicas, y la cola es más larga en la hora previa al atardecer, cuando todos esperan la misma foto dorada. Llegar más temprano en el día significa filas más cortas y una luz más suave para las fotos. Las callejuelas de alrededor, llenas de cafés y talleres, merecen un paseo a cualquier hora.",
          "La entrada requiere ticket y un ascensor te sube casi todo el camino antes de un último tramo de escaleras que llega a la galería panorámica que rodea la cima. Te espera una pasarela estrecha con amplias vistas sobre la ciudad vieja, el Bósforo y el Cuerno de Oro. Un guía local titulado de VibeGuide puede conseguir tu entrada, apartarte del gentío del atardecer y señalarte los monumentos que se extienden abajo.",
        ],
        ctaTitle: "Visita la Torre de Gálata con un local",
        ...IST.es,
      },
      fr: {
        name: "Tour de Galata",
        metaTitle: "Visites de la Tour de Galata avec guides locaux",
        metaDescription:
          "Montez à la Tour de Galata à Istanbul avec un guide local vérifié. Évitez les files, profitez du coucher de soleil et découvrez l'histoire de la tour génoise.",
        intro: [
          "La Tour de Galata couronne l'horizon de Beyoğlu depuis 1348, quand les Génois l'érigèrent sous le nom de « Christea Turris » — la Tour du Christ — au sommet de leur colonie fortifiée. Près de 67 mètres de pierre médiévale s'élèvent sur neuf étages jusqu'à une galerie panoramique offrant une vue à 360° sur la Corne d'Or, la péninsule historique et le Bosphore.",
          "C'est un lieu nimbé de légende : au XVIIe siècle, Hezarfen Ahmed Çelebi aurait attaché des ailes et volé depuis la tour à travers le Bosphore jusqu'à Üsküdar. Avec un local VibeGuide, vous choisissez l'heure de la montée pour éviter les pires files, arriver à l'heure dorée et écouter les récits que la vue seule ne raconte pas.",
        ],
        highlights: [
          { title: "Panorama à 360°", desc: "Depuis la galerie, toute la ville se déploie : la Corne d'Or, la vieille ville et les deux rives du Bosphore." },
          { title: "Emblème génois", desc: "Bâtie en 1348 comme « Tour du Christ », elle veille sur Galata depuis près de sept siècles." },
          { title: "La légende du vol", desc: "Hezarfen Ahmed Çelebi aurait volé d'ici à travers le détroit avec des ailes fabriquées à la main." },
        ],
        faqs: [
          { q: "Y a-t-il la queue à la Tour de Galata ?", a: "Souvent, surtout au coucher du soleil. Un guide local vous aide à choisir la bonne heure et gère le timing pour que vous attendiez moins et profitiez plus." },
          { q: "Quel est le meilleur moment pour monter ?", a: "La fin d'après-midi jusqu'au coucher du soleil est magique, quand la lumière devient dorée sur l'eau. Votre guide peut organiser la journée autour de ce moment." },
          { q: "Combien de temps dure la visite ?", a: "La montée et la vue prennent 45 minutes à une heure, faciles à combiner avec une balade dans Galata et Karaköy, tout proches." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "La tour de Galata domine le quartier de Karaköy et de Galata, à Beyoğlu, au nord de la Corne d'Or. Beaucoup de visiteurs rejoignent Karaköy en tramway ou en métro, puis montent à pied par les ruelles pentues et pleines de caractère. Pour une ascension plus douce, le funiculaire historique Tünel vous hisse en haut de la colline, ne laissant qu'une courte marche jusqu'à la tour.",
          "La tour est réputée pour ses vues panoramiques, et la file est la plus longue dans l'heure qui précède le coucher du soleil, quand tout le monde espère le même cliché doré. Arriver plus tôt dans la journée, c'est moins d'attente et une lumière plus douce pour les photos. Les ruelles alentour, pleines de cafés et d'ateliers, méritent une flânerie à toute heure.",
          "L'entrée est payante et un ascenseur vous mène presque au sommet avant une dernière volée de marches qui débouche sur la galerie panoramique ceinturant le faîte. Attendez-vous à une coursive étroite offrant de vastes vues sur la vieille ville, le Bosphore et la Corne d'Or. Un guide local agréé VibeGuide peut obtenir votre billet, vous éviter la cohue du coucher de soleil et vous montrer les monuments déployés en contrebas.",
        ],
        ctaTitle: "Visitez la Tour de Galata avec un local",
        ...IST.fr,
      },
      el: {
        name: "Πύργος του Γαλατά",
        metaTitle: "Ξεναγήσεις στον Πύργο του Γαλατά με ντόπιους ξεναγούς",
        metaDescription:
          "Ανέβα στον Πύργο του Γαλατά στην Κωνσταντινούπολη με πιστοποιημένο ντόπιο ξεναγό. Απόφυγε τις ουρές, ζήσε το ηλιοβασίλεμα και άκου την ιστορία του γενουατικού πύργου.",
        intro: [
          "Ο Πύργος του Γαλατά στεφανώνει τον ορίζοντα του Μπέιογλου από το 1348, όταν οι Γενουάτες τον έχτισαν ως «Christea Turris» — τον Πύργο του Χριστού — στην κορυφή της τειχισμένης αποικίας τους. Σχεδόν 67 μέτρα μεσαιωνικής πέτρας υψώνονται σε εννέα ορόφους ως μια πάνω γαλαρία με πλήρη θέα 360° στον Κεράτιο Κόλπο, την ιστορική χερσόνησο και τον Βόσπορο.",
          "Είναι ένα μέρος τυλιγμένο στον θρύλο: τον 17ο αιώνα ο Χεζάρφεν Αχμέτ Τσελεμπί λέγεται πως έδεσε φτερά και πέταξε από τον πύργο πάνω από τον Βόσπορο ως το Ουσκουντάρ. Με έναν ντόπιο του VibeGuide επιλέγεις την ώρα της ανάβασης για να αποφύγεις τις χειρότερες ουρές, να φτάσεις στη χρυσή ώρα και να ακούσεις τις ιστορίες που η θέα από μόνη της δεν λέει.",
        ],
        highlights: [
          { title: "Πανόραμα 360°", desc: "Από τη γαλαρία ξεδιπλώνεται όλη η πόλη — Κεράτιος Κόλπος, παλιά πόλη και οι δύο ακτές του Βοσπόρου." },
          { title: "Γενουατικό ορόσημο", desc: "Χτισμένος το 1348 ως «Πύργος του Χριστού», φυλά τον Γαλατά σχεδόν επτά αιώνες." },
          { title: "Ο θρύλος της πτήσης", desc: "Ο Χεζάρφεν Αχμέτ Τσελεμπί λέγεται πως πέταξε από εδώ πάνω από το στενό με χειροποίητα φτερά." },
        ],
        faqs: [
          { q: "Έχει ουρά ο Πύργος του Γαλατά;", a: "Συχνά, ειδικά στο ηλιοβασίλεμα. Ένας ντόπιος ξεναγός σε βοηθά να διαλέξεις τη σωστή ώρα και αναλαμβάνει τον συγχρονισμό, ώστε να περιμένεις λιγότερο και να απολαμβάνεις περισσότερο." },
          { q: "Ποια είναι η καλύτερη ώρα για ανάβαση;", a: "Το αργό απόγευμα προς το ηλιοβασίλεμα είναι μαγικό, όταν το φως γίνεται χρυσό πάνω από το νερό. Ο ξεναγός σου μπορεί να στήσει τη μέρα γύρω από αυτό." },
          { q: "Πόσο διαρκεί η επίσκεψη;", a: "Η ανάβαση και η θέα παίρνουν περίπου 45 λεπτά με μία ώρα, εύκολα σε συνδυασμό με μια βόλτα στον Γαλατά και το Καράκιοϊ δίπλα." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Ο Πύργος του Γαλατά υψώνεται πάνω από τη συνοικία Καρακιόι και Γαλατά, στο Μπέιογλου, βόρεια του Κεράτιου Κόλπου. Πολλοί επισκέπτες φτάνουν στο Καρακιόι με τραμ ή μετρό και έπειτα ανηφορίζουν με τα πόδια στα απόκρημνα, γραφικά σοκάκια. Για πιο εύκολη ανάβαση, το ιστορικό τελεφερίκ Τούνελ σας ανεβάζει τον λόφο, αφήνοντας μόνο ένα σύντομο περπάτημα ως τον πύργο.",
          "Ο πύργος φημίζεται για την πανοραμική του θέα, και η ουρά είναι μεγαλύτερη την ώρα πριν από το ηλιοβασίλεμα, όταν όλοι ελπίζουν στην ίδια χρυσή φωτογραφία. Η άφιξη νωρίτερα μέσα στην ημέρα σημαίνει μικρότερες ουρές και πιο απαλό φως για λήψεις. Τα γύρω δρομάκια, γεμάτα καφέ και εργαστήρια, αξίζουν μια βόλτα οποιαδήποτε ώρα.",
          "Η είσοδος απαιτεί εισιτήριο και ένα ασανσέρ σας ανεβάζει σχεδόν ως την κορυφή, πριν από μια τελευταία σκάλα που καταλήγει στην πανοραμική γαλαρία που περιτρέχει την κορυφή. Περιμένετε έναν στενό διάδρομο με απέραντη θέα στην παλιά πόλη, τον Βόσπορο και τον Κεράτιο Κόλπο. Ένας αδειούχος τοπικός ξεναγός της VibeGuide μπορεί να εξασφαλίσει το εισιτήριό σας, να σας κρατήσει μακριά από τον συνωστισμό του ηλιοβασιλέματος και να σας δείξει τα αξιοθέατα που απλώνονται από κάτω.",
        ],
        ctaTitle: "Δες τον Πύργο του Γαλατά με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Galata Kulesi",
        metaTitle: "Galata Kulesi Turları & Yerel Rehberler",
        metaDescription:
          "Galata Kulesi'ne doğrulanmış bir yerel rehberle çık. Kuyrukları aş, gün batımını yakala ve Haliç'e bakan Ceneviz kulesinin hikâyesini dinle.",
        intro: [
          "Galata Kulesi, Cenevizlilerin surlu kolonilerinin tepesinde \"Christea Turris\" — İsa Kulesi — olarak yükselttikleri 1348'den beri Beyoğlu'nun siluetini taçlandırır. Yaklaşık 67 metrelik ortaçağ taşı, dokuz kat boyunca Haliç'e, tarihi yarımadaya ve Boğaz'a tam 360° bakan üst galeriye uzanır.",
          "Efsanelerle örülü bir yer: 17. yüzyılda Hezarfen Ahmed Çelebi'nin kanat takıp kuleden Boğaz'ı aşarak Üsküdar'a uçtuğu anlatılır. VibeGuide yerel rehberiyle çıkış saatini en uzun kuyrukları atlatacak, altın saate yetişecek ve manzaranın tek başına anlatamadığı hikâyeleri duyacak şekilde ayarlarsın.",
        ],
        highlights: [
          { title: "360° Panorama", desc: "Üst galeriden tüm şehir açılır — Haliç, tarihi yarımada ve Boğaz'ın iki yakası." },
          { title: "Ceneviz Simgesi", desc: "1348'de \"İsa Kulesi\" olarak inşa edildi ve yaklaşık yedi yüzyıldır Galata'yı gözler." },
          { title: "Uçuş Efsanesi", desc: "Hezarfen Ahmed Çelebi'nin buradan kendi yaptığı kanatlarla boğazı aşıp uçtuğu söylenir." },
        ],
        faqs: [
          { q: "Galata Kulesi'nde kuyruk oluyor mu?", a: "Sık sık, özellikle gün batımında. Yerel rehber doğru saati seçmene yardım eder ve zamanlamayı üstlenir; böylece daha az bekler, manzaranın tadını daha çok çıkarırsın." },
          { q: "Çıkmak için en iyi zaman ne?", a: "Öğleden sonranın sonundan gün batımına kadar büyülüdür, ışık suyun üzerinde altına dönerken. Rehberin günü bu ana göre planlayabilir." },
          { q: "Ziyaret ne kadar sürer?", a: "Çıkış ve manzara yaklaşık 45 dakika ile bir saat sürer; yakındaki Galata ve Karaköy gezisiyle rahatça birleşir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Galata Kulesi, Haliç'in kuzeyinde, Beyoğlu'ndaki Karaköy ve Galata semtinin üzerinde yükselir. Çoğu ziyaretçi Karaköy'e tramvay ya da metroyla gelir, ardından dik ve karakterli sokaklardan yürüyerek yukarı çıkar. Daha kolay bir çıkış için tarihi Tünel füniküleri sizi tepeye taşır ve kuleye yalnızca kısa bir yürüyüş kalır.",
          "Kule panoramik manzarasıyla ünlüdür ve sıra en çok gün batımından önceki saatte uzar; çünkü herkes aynı altın rengi kareyi umar. Gün içinde daha erken gelmek, daha kısa sıralar ve fotoğraflar için daha yumuşak bir ışık demektir. Kafeler ve atölyelerle dolu çevredeki ara sokaklar ise her saatte gezmeye değer.",
          "Giriş biletlidir; bir asansör sizi neredeyse tepeye kadar çıkarır, son bir merdiven ise zirveyi saran panoramik galeriye ulaştırır. Eski şehir, Boğaz ve Haliç üzerinde geniş manzaralar sunan dar bir gezinti yolu sizi bekler. Lisanslı bir VibeGuide yerel rehberi biletinizi ayarlayabilir, sizi gün batımı kalabalığından uzak tutabilir ve aşağıda uzanan simgeleri tek tek gösterebilir.",
        ],
        ctaTitle: "Galata Kulesi'ni bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Torre di Galata",
        metaTitle: "Tour della Torre di Galata con guide locali",
        metaDescription:
          "Sali sulla Torre di Galata a Istanbul con una guida locale verificata. Salta le code, goditi il tramonto e ascolta la storia della torre genovese sul Corno d'Oro.",
        intro: [
          "La Torre di Galata domina lo skyline di Beyoğlu dal 1348, quando i Genovesi la eressero come \"Christea Turris\" — la Torre di Cristo — in cima alla loro colonia fortificata. Quasi 67 metri di pietra medievale salgono per nove piani fino a una galleria panoramica con una vista a 360° sul Corno d'Oro, la penisola storica e il Bosforo.",
          "È un luogo avvolto nella leggenda: nel XVII secolo si narra che Hezarfen Ahmed Çelebi si legò delle ali e volò dalla torre attraverso il Bosforo fino a Üsküdar. Con un local di VibeGuide scegli l'ora della salita per evitare le code peggiori, arrivare nell'ora dorata e ascoltare le storie che il panorama da solo non racconta.",
        ],
        highlights: [
          { title: "Panorama a 360°", desc: "Dalla galleria si apre tutta la città: il Corno d'Oro, la città vecchia e le due rive del Bosforo." },
          { title: "Simbolo genovese", desc: "Costruita nel 1348 come \"Torre di Cristo\", veglia su Galata da quasi sette secoli." },
          { title: "La leggenda del volo", desc: "Si dice che Hezarfen Ahmed Çelebi volò da qui attraverso lo stretto con ali costruite a mano." },
        ],
        faqs: [
          { q: "C'è la fila alla Torre di Galata?", a: "Spesso, soprattutto al tramonto. Una guida locale ti aiuta a scegliere l'ora giusta e gestisce i tempi, così aspetti meno e godi di più." },
          { q: "Qual è l'ora migliore per salire?", a: "Il tardo pomeriggio verso il tramonto è magico, quando la luce si fa dorata sull'acqua. La tua guida può organizzare la giornata attorno a quel momento." },
          { q: "Quanto dura la visita?", a: "La salita e la vista richiedono circa 45 minuti-un'ora, facili da abbinare a una passeggiata tra Galata e Karaköy, lì vicino." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "La Torre di Galata si erge sopra il quartiere di Karaköy e Galata, a Beyoğlu, a nord del Corno d'Oro. Molti visitatori raggiungono Karaköy in tram o metro e poi salgono a piedi per le ripide e caratteristiche stradine. Per una salita più comoda, la storica funicolare Tünel ti porta in cima alla collina, lasciando solo una breve passeggiata fino alla torre.",
          "La torre è celebre per le sue vedute panoramiche, e la fila è più lunga nell'ora prima del tramonto, quando tutti sperano nella stessa foto dorata. Arrivare presto durante il giorno significa code più brevi e una luce più morbida per gli scatti. Le viuzze circostanti, piene di caffè e botteghe, meritano una passeggiata a qualsiasi ora.",
          "L'ingresso è a pagamento e un ascensore ti porta quasi in cima, prima di un'ultima rampa di scale che raggiunge la galleria panoramica che circonda la sommità. Ti aspetta un camminamento stretto con ampie vedute sulla città vecchia, il Bosforo e il Corno d'Oro. Una guida locale abilitata di VibeGuide può procurarti il biglietto, tenerti lontano dalla ressa del tramonto e indicarti i monumenti che si estendono in basso.",
        ],
        ctaTitle: "Scopri la Torre di Galata con un locale",
        ...IST.it,
      },
      pl: {
        name: "Wieża Galata",
        metaTitle: "Wieża Galata — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Wejdź na Wieżę Galata w Stambule ze zweryfikowanym lokalnym przewodnikiem. Omiń kolejki, złap zachód słońca i poznaj historię genueńskiej wieży nad Złotym Rogiem.",
        intro: [
          "Wieża Galata wieńczy panoramę Beyoğlu od 1348 roku, gdy Genueńczycy wznieśli ją jako „Christea Turris” — Wieżę Chrystusa — na szczycie swojej otoczonej murami kolonii. Blisko 67 metrów średniowiecznego kamienia wznosi się przez dziewięć pięter do górnej galerii z pełnym widokiem 360° na Złoty Róg, historyczny półwysep i Bosfor.",
          "To miejsce owiane legendą: w XVII wieku Hezarfen Ahmed Çelebi miał przypiąć skrzydła i przelecieć z wieży nad Bosforem aż do Üsküdaru. Z lokalnym przewodnikiem VibeGuide dobierzesz godzinę wejścia tak, by ominąć najgorsze kolejki, zdążyć na złotą godzinę i usłyszeć historie, których sam widok nie opowie.",
        ],
        highlights: [
          { title: "Panorama 360°", desc: "Z górnej galerii rozpościera się całe miasto — Złoty Róg, stare miasto i oba brzegi Bosforu." },
          { title: "Genueński symbol", desc: "Zbudowana w 1348 roku jako „Wieża Chrystusa”, czuwa nad Galatą od niemal siedmiu wieków." },
          { title: "Legenda o locie", desc: "Podobno Hezarfen Ahmed Çelebi przeleciał stąd nad cieśniną na własnoręcznie zrobionych skrzydłach." },
        ],
        faqs: [
          { q: "Czy do Wieży Galata są kolejki?", a: "Często, zwłaszcza o zachodzie słońca. Lokalny przewodnik pomoże wybrać właściwą godzinę i zajmie się rozplanowaniem czasu, byś mniej czekał, a więcej podziwiał." },
          { q: "Kiedy najlepiej wejść na górę?", a: "Późne popołudnie i zachód słońca są magiczne, gdy światło nad wodą robi się złote. Przewodnik może ułożyć dzień wokół tej chwili." },
          { q: "Ile trwa zwiedzanie?", a: "Wejście i widok zajmują około 45 minut do godziny, łatwo połączyć je ze spacerem po Galacie i pobliskim Karaköy." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Wieża Galata wznosi się nad dzielnicą Karaköy i Galata w Beyoğlu, na północ od Złotego Rogu. Wielu odwiedzających dojeżdża do Karaköy tramwajem lub metrem, a następnie wspina się pieszo stromymi, klimatycznymi uliczkami. Dla wygodniejszego podejścia historyczna kolejka Tünel wywiezie Cię na wzgórze, pozostawiając już tylko krótki spacer do wieży.",
          "Wieża słynie z panoramicznych widoków, a kolejka jest najdłuższa w godzinie przed zachodem słońca, gdy wszyscy liczą na to samo złociste zdjęcie. Przyjście wcześniej w ciągu dnia oznacza krótsze kolejki i łagodniejsze światło do zdjęć. Okoliczne zaułki, pełne kawiarni i pracowni, warto zwiedzić o każdej porze.",
          "Wstęp jest biletowany, a winda wywozi Cię niemal na sam szczyt, przed ostatnim biegiem schodów prowadzącym na panoramiczną galerię okalającą wierzchołek. Czeka Cię wąski taras z rozległymi widokami na stare miasto, Bosfor i Złoty Róg. Licencjonowany lokalny przewodnik VibeGuide zdobędzie Twój bilet, odsunie Cię od zachodowego tłoku i wskaże zabytki rozpościerające się w dole.",
        ],
        ctaTitle: "Zobacz Wieżę Galata z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Galatatoren",
        metaTitle: "Galatatoren-tours & lokale gidsen",
        metaDescription:
          "Beklim de Galatatoren in Istanbul met een geverifieerde lokale gids. Ontwijk de rijen, geniet van de zonsondergang en hoor het verhaal van de Genuese toren.",
        intro: [
          "De Galatatoren bekroont de skyline van Beyoğlu sinds 1348, toen de Genuezen hem optrokken als \"Christea Turris\" — de Toren van Christus — bovenaan hun ommuurde kolonie. Bijna 67 meter middeleeuwse steen rijst over negen verdiepingen naar een bovengalerij met een volledig 360°-uitzicht over de Gouden Hoorn, het historische schiereiland en de Bosporus.",
          "Het is een plek vol legende: in de 17e eeuw zou Hezarfen Ahmed Çelebi vleugels hebben aangebonden en vanaf de toren over de Bosporus tot Üsküdar zijn gevlogen. Met een local van VibeGuide kies je het tijdstip van je klim om de ergste rijen te ontwijken, op het gouden uur aan te komen en de verhalen te horen die het uitzicht alleen niet vertelt.",
        ],
        highlights: [
          { title: "360°-panorama", desc: "Vanaf de galerij ontvouwt de hele stad zich — Gouden Hoorn, oude stad en beide oevers van de Bosporus." },
          { title: "Genuees baken", desc: "Gebouwd in 1348 als \"Toren van Christus\", waakt hij al bijna zeven eeuwen over Galata." },
          { title: "De vlieglegende", desc: "Hezarfen Ahmed Çelebi zou vanaf hier met zelfgemaakte vleugels over de zeestraat zijn gevlogen." },
        ],
        faqs: [
          { q: "Is er een rij bij de Galatatoren?", a: "Vaak, vooral bij zonsondergang. Een lokale gids helpt je het juiste uur te kiezen en regelt de timing, zodat je minder wacht en meer geniet van het uitzicht." },
          { q: "Wanneer kun je het best omhoog?", a: "Het late middaguur tot zonsondergang is magisch, wanneer het licht boven het water goud kleurt. Je gids kan de dag daaromheen plannen." },
          { q: "Hoe lang duurt een bezoek?", a: "De klim en het uitzicht kosten zo'n 45 minuten tot een uur, makkelijk te combineren met een wandeling door Galata en het nabije Karaköy." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Galatatoren rijst op boven de wijk Karaköy en Galata in Beyoğlu, ten noorden van de Gouden Hoorn. Veel bezoekers reizen met tram of metro naar Karaköy en klimmen vervolgens te voet door de steile, karaktervolle straatjes omhoog. Voor een makkelijkere klim brengt de historische Tünel-kabelbaan je de heuvel op, zodat er nog maar een korte wandeling naar de toren rest.",
          "De toren is beroemd om zijn panoramische uitzichten, en de rij is het langst in het uur voor zonsondergang, wanneer iedereen op dezelfde gouden foto hoopt. Vroeger op de dag komen betekent kortere rijen en zachter licht voor foto's. De omliggende steegjes, vol cafés en werkplaatsen, zijn op elk moment een wandeling waard.",
          "De toegang is met kaartje en een lift brengt je bijna helemaal naar boven, voor een laatste trap naar de panoramische galerij die de top omringt. Verwacht een smal looppad met weidse uitzichten over de oude stad, de Bosporus en de Gouden Hoorn. Een erkende lokale VibeGuide-gids regelt je ticket, houdt je weg van de zonsondergangsdrukte en wijst je de bezienswaardigheden aan die zich beneden uitstrekken.",
        ],
        ctaTitle: "Bezoek de Galatatoren met een local",
        ...IST.nl,
      },
    },
  },
  {
    slug: "grand-bazaar",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🛍️",
    image:
      "https://images.unsplash.com/photo-1568592014308-076036f4f4b4?q=80&w=1600",
    lat: 41.0106,
    lng: 28.968,
    i18n: {
      en: {
        name: "Grand Bazaar",
        metaTitle: "Grand Bazaar Tours & Local Guides",
        metaDescription:
          "Explore Istanbul's Grand Bazaar with a verified local guide. Navigate 4,000 shops, haggle with confidence and find honest artisans instead of tourist traps.",
        intro: [
          "The Grand Bazaar is one of the oldest and largest covered markets on earth — a labyrinth begun under Mehmed the Conqueror between 1455 and 1461, grown over the centuries into more than sixty covered streets and around 4,000 shops. Carpets and kilims, gold and jewellery, ceramics, spices, lanterns and leather spill from every doorway beneath its painted vaults.",
          "Haggling here is expected — it's half the fun — but the maze swallows newcomers whole. A VibeGuide local walks you through the right lanes, keeps you clear of tourist-trap prices, introduces you to honest artisans and translates both the language and the ritual of the bargain.",
        ],
        highlights: [
          { title: "4,000 Shops", desc: "Over sixty covered streets of carpets, gold, ceramics, spices, lanterns and leather." },
          { title: "The Art of Haggling", desc: "Bargaining is expected and part of the fun — a guide keeps the price honest." },
          { title: "Living History", desc: "A covered market begun in the 1450s under Mehmed the Conqueror, still trading today." },
        ],
        faqs: [
          { q: "Do I need a guide for the Grand Bazaar?", a: "You won't get lost forever, but you may overpay. A local guide knows the honest artisans, the fair price and the shortcuts through the maze." },
          { q: "Is haggling really expected?", a: "Yes — it's part of the culture. Start low, stay friendly, and let your guide show you where the ritual ends and a fair deal begins." },
          { q: "How long should I plan?", a: "Most guided visits run 1–2 hours and pair naturally with the nearby Spice Bazaar and the streets of Fatih." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Grand Bazaar (Kapalıçarşı) sits in the Fatih district of the old city, right beside Beyazıt. The easiest way to arrive is the T1 tram to the \"Beyazıt-Kapalıçarşı\" stop, which leaves you at one of the main gates. It is an easy, flat walk from Sultanahmet and the Blue Mosque, so many visitors simply stroll over after seeing the nearby monuments.",
          "Entry is free and the market is open every day except Sundays. It is busiest around midday, when tour groups and cruise passengers fill the lanes, so arriving soon after opening gives you calmer aisles and more patient shopkeepers. Because the whole bazaar is covered, it stays comfortable in any season, making it a reliable choice on hot summer afternoons or rainy winter days alike.",
          "As one of the world's oldest and largest covered markets, with around 4,000 shops along more than 60 streets, the bazaar rewards those who take their time. Haggling is expected and part of the fun, but first prices can be steep for newcomers. A licensed VibeGuide local guide helps you navigate the maze, steer clear of tourist-trap stalls, and reach honest shops where the quality and the price are both fair.",
        ],
        ctaTitle: "Explore the Grand Bazaar with a local",
        ...IST.en,
      },
      de: {
        name: "Großer Basar",
        metaTitle: "Großer Basar Touren & lokale Guides",
        metaDescription:
          "Entdecke Istanbuls Großen Basar mit einem geprüften lokalen Guide. Finde dich zwischen 4.000 Läden zurecht, handle sicher und triff ehrliche Handwerker statt Touristenfallen.",
        intro: [
          "Der Große Basar ist einer der ältesten und größten überdachten Märkte der Welt — ein Labyrinth, das unter Mehmed dem Eroberer zwischen 1455 und 1461 begann und über die Jahrhunderte zu mehr als sechzig überdachten Gassen mit rund 4.000 Läden wuchs. Teppiche und Kelims, Gold und Schmuck, Keramik, Gewürze, Laternen und Leder quellen unter den bemalten Gewölben aus jeder Tür.",
          "Feilschen gehört hier dazu — es ist der halbe Spaß — doch das Gassengewirr verschluckt Neulinge im Nu. Ein VibeGuide-Local führt dich durch die richtigen Gassen, hält dich von Touristenfallen fern, stellt dir ehrliche Handwerker vor und übersetzt sowohl die Sprache als auch das Ritual des Handelns.",
        ],
        highlights: [
          { title: "4.000 Läden", desc: "Über sechzig überdachte Gassen voller Teppiche, Gold, Keramik, Gewürze, Laternen und Leder." },
          { title: "Die Kunst des Feilschens", desc: "Handeln wird erwartet und macht Spaß — ein Guide hält den Preis fair." },
          { title: "Lebendige Geschichte", desc: "Ein überdachter Markt aus den 1450ern unter Mehmed dem Eroberer, bis heute in Betrieb." },
        ],
        faqs: [
          { q: "Brauche ich einen Guide für den Großen Basar?", a: "Verloren gehst du nicht für immer, aber du zahlst leicht zu viel. Ein lokaler Guide kennt die ehrlichen Handwerker, den fairen Preis und die Abkürzungen durch das Labyrinth." },
          { q: "Wird wirklich gehandelt?", a: "Ja — das gehört zur Kultur. Fang niedrig an, bleib freundlich, und dein Guide zeigt dir, wo das Ritual endet und ein fairer Deal beginnt." },
          { q: "Wie viel Zeit sollte ich einplanen?", a: "Die meisten geführten Besuche dauern 1–2 Stunden und lassen sich gut mit dem nahen Gewürzbasar und den Gassen von Fatih verbinden." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Große Basar (Kapalıçarşı) liegt im Stadtteil Fatih der Altstadt, direkt neben Beyazıt. Am einfachsten erreichst du ihn mit der Straßenbahn T1 bis zur Haltestelle \"Beyazıt-Kapalıçarşı\", die dich an einem der Haupttore absetzt. Von Sultanahmet und der Blauen Moschee ist es ein bequemer, ebener Fußweg, sodass viele Besucher nach der Besichtigung der nahen Sehenswürdigkeiten einfach hinüberschlendern.",
          "Der Eintritt ist frei und der Markt ist täglich außer sonntags geöffnet. Am vollsten ist es gegen Mittag, wenn Reisegruppen und Kreuzfahrtgäste die Gassen füllen; wer kurz nach der Öffnung kommt, findet ruhigere Gänge und geduldigere Händler. Da der gesamte Basar überdacht ist, bleibt es zu jeder Jahreszeit angenehm und eignet sich ebenso für heiße Sommernachmittage wie für regnerische Wintertage.",
          "Als einer der ältesten und größten überdachten Märkte der Welt, mit rund 4.000 Läden entlang von über 60 Straßen, belohnt der Basar alle, die sich Zeit nehmen. Feilschen wird erwartet und gehört zum Vergnügen, doch die ersten Preise können für Neulinge hoch sein. Ein lizenzierter VibeGuide-Guide vor Ort hilft dir durch das Labyrinth, hält dich von Touristenfallen fern und führt dich zu ehrlichen Läden, in denen Qualität und Preis stimmen.",
        ],
        ctaTitle: "Entdecke den Großen Basar mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Гранд-базар",
        metaTitle: "Гранд-базар: экскурсии с местными гидами",
        metaDescription:
          "Исследуйте Гранд-базар Стамбула с проверенным местным гидом. Пройдите 4000 лавок, уверенно торгуйтесь и находите честных мастеров вместо туристических ловушек.",
        intro: [
          "Гранд-базар — один из старейших и крупнейших крытых рынков мира: лабиринт, заложенный при Мехмеде Завоевателе между 1455 и 1461 годами и разросшийся за века до более чем шестидесяти крытых улиц и примерно 4000 лавок. Ковры и килимы, золото и украшения, керамика, специи, фонари и кожа льются из каждой двери под расписными сводами.",
          "Торг здесь ожидаем — это половина удовольствия, — но лабиринт проглатывает новичков целиком. Местный гид VibeGuide проведёт вас нужными рядами, убережёт от цен для туристов, познакомит с честными мастерами и переведёт и язык, и сам ритуал торга.",
        ],
        highlights: [
          { title: "4000 лавок", desc: "Более шестидесяти крытых улиц с коврами, золотом, керамикой, специями, фонарями и кожей." },
          { title: "Искусство торга", desc: "Торговаться принято, и это весело — гид удержит цену честной." },
          { title: "Живая история", desc: "Крытый рынок, заложенный в 1450-х при Мехмеде Завоевателе, торгует и сегодня." },
        ],
        faqs: [
          { q: "Нужен ли гид на Гранд-базаре?", a: "Навсегда вы не потеряетесь, но легко переплатите. Местный гид знает честных мастеров, справедливую цену и короткие пути через лабиринт." },
          { q: "Действительно ли принято торговаться?", a: "Да, это часть культуры. Начинайте с низкой цены, будьте дружелюбны, а гид покажет, где заканчивается ритуал и начинается честная сделка." },
          { q: "Сколько времени закладывать?", a: "Обычно экскурсия занимает 1–2 часа и естественно сочетается с соседним Египетским базаром и улицами Фатиха." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Гранд-базар (Капалычарши) находится в районе Фатих в старом городе, прямо рядом с Баязитом. Проще всего добраться на трамвае T1 до остановки \"Beyazıt-Kapalıçarşı\", которая выходит к одним из главных ворот. От Султанахмета и Голубой мечети сюда ведёт удобная и ровная пешеходная дорога, поэтому многие путешественники просто заходят на базар после осмотра соседних памятников.",
          "Вход свободный, рынок работает ежедневно, кроме воскресенья. Больше всего людей около полудня, когда переулки заполняют туристические группы и пассажиры круизов, поэтому визит вскоре после открытия подарит вам более спокойные ряды и более терпеливых продавцов. Поскольку весь базар крытый, здесь комфортно в любой сезон — и в жаркий летний день, и в дождливый зимний.",
          "Один из старейших и крупнейших крытых рынков мира, с примерно 4000 лавками вдоль более чем 60 улиц, базар вознаграждает тех, кто никуда не спешит. Торг здесь уместен и является частью удовольствия, но первые цены для новичков могут оказаться завышенными. Лицензированный местный гид VibeGuide поможет вам разобраться в этом лабиринте, обойти стороной туристические ловушки и найти честные лавки, где справедливы и качество, и цена.",
        ],
        ctaTitle: "Исследовать Гранд-базар с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "البازار الكبير",
        metaTitle: "جولات البازار الكبير مع مرشدين محليين",
        metaDescription:
          "اكتشف البازار الكبير في إسطنبول مع مرشد محلي موثّق. تنقّل بين 4000 متجر، وساوم بثقة، واعثر على حرفيين صادقين بدل فخاخ السياح.",
        intro: [
          "البازار الكبير من أقدم وأكبر الأسواق المسقوفة في العالم — متاهة بدأت في عهد محمد الفاتح بين عامي 1455 و1461، ونمت عبر القرون إلى أكثر من ستين شارعًا مسقوفًا ونحو 4000 متجر. السجاد والكليم والذهب والمجوهرات والخزف والتوابل والفوانيس والجلود تفيض من كل باب تحت أقواسه المزخرفة.",
          "المساومة هنا متوقّعة — وهي نصف المتعة — لكن المتاهة تبتلع القادمين الجدد. مرشد محلي من VibeGuide يقودك عبر الممرات الصحيحة، ويبعدك عن أسعار السياح، ويعرّفك على حرفيين صادقين، ويترجم اللغة وطقس المساومة معًا.",
        ],
        highlights: [
          { title: "4000 متجر", desc: "أكثر من ستين شارعًا مسقوفًا من السجاد والذهب والخزف والتوابل والفوانيس والجلود." },
          { title: "فنّ المساومة", desc: "المساومة متوقّعة وممتعة — والمرشد يبقي السعر عادلًا." },
          { title: "تاريخ حيّ", desc: "سوق مسقوف بدأ في خمسينيات القرن الخامس عشر في عهد محمد الفاتح، وما زال يعمل حتى اليوم." },
        ],
        faqs: [
          { q: "هل أحتاج إلى مرشد في البازار الكبير؟", a: "لن تضيع إلى الأبد، لكنك قد تدفع أكثر من اللازم. المرشد المحلي يعرف الحرفيين الصادقين والسعر العادل والطرق المختصرة عبر المتاهة." },
          { q: "هل المساومة متوقّعة فعلًا؟", a: "نعم، إنها جزء من الثقافة. ابدأ بسعر منخفض وابقَ ودودًا، ودع مرشدك يريك أين ينتهي الطقس ويبدأ الاتفاق العادل." },
          { q: "كم من الوقت أخصّص؟", a: "تستغرق معظم الجولات 1–2 ساعة، وتتكامل بطبيعتها مع سوق التوابل القريب وأزقّة الفاتح." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع البازار الكبير (كابالي تشارشي) في حي الفاتح بالمدينة القديمة، إلى جوار بايزيد مباشرة. وأسهل طريقة للوصول هي عبر ترام T1 حتى محطة \"Beyazıt-Kapalıçarşı\"، التي تُنزلك عند أحد البوابات الرئيسية. والمسير من السلطان أحمد والمسجد الأزرق سهل ومستوٍ، لذا يكتفي كثير من الزوار بالتنزّه إلى البازار بعد مشاهدة المعالم القريبة.",
          "الدخول مجاني، والسوق مفتوح كل يوم عدا الأحد. ويكون الازدحام أشدّه قرب منتصف النهار حين تملأ المجموعات السياحية وركاب الرحلات البحرية الممرات، لذا فإن الوصول بُعيد الافتتاح يمنحك ممرات أهدأ وباعة أكثر صبرًا. ولأن البازار كله مسقوف، يبقى جوّه لطيفًا في كل فصل، فهو خيار موثوق في ظهيرة الصيف الحارة وفي أيام الشتاء الممطرة على السواء.",
          "بوصفه واحدًا من أقدم الأسواق المسقوفة وأكبرها في العالم، بنحو 4000 متجر على امتداد أكثر من 60 شارعًا، يكافئ البازار من يمنح نفسه بعض الوقت. والمساومة متوقّعة وجزء من المتعة، لكن الأسعار الأولى قد تكون مبالغًا فيها للوافدين الجدد. ويساعدك مرشد VibeGuide المحلي المرخّص على شقّ طريقك في المتاهة، وتجنّب فخاخ السياح، والوصول إلى متاجر صادقة تجتمع فيها الجودة والسعر العادل.",
        ],
        ctaTitle: "اكتشف البازار الكبير مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Gran Bazar",
        metaTitle: "Tours del Gran Bazar con guías locales",
        metaDescription:
          "Explora el Gran Bazar de Estambul con un guía local verificado. Recorre 4.000 tiendas, regatea con seguridad y encuentra artesanos honestos en lugar de trampas para turistas.",
        intro: [
          "El Gran Bazar es uno de los mercados cubiertos más antiguos y grandes del mundo: un laberinto iniciado bajo Mehmed el Conquistador entre 1455 y 1461, que a lo largo de los siglos creció hasta más de sesenta calles cubiertas y unas 4.000 tiendas. Alfombras y kilims, oro y joyas, cerámica, especias, faroles y cuero se desbordan por cada puerta bajo sus bóvedas pintadas.",
          "Aquí se espera que regatees — es parte de la diversión —, pero el laberinto se traga a los novatos. Un local de VibeGuide te lleva por las calles adecuadas, te aleja de los precios para turistas, te presenta a artesanos honestos y traduce tanto el idioma como el ritual del regateo.",
        ],
        highlights: [
          { title: "4.000 tiendas", desc: "Más de sesenta calles cubiertas de alfombras, oro, cerámica, especias, faroles y cuero." },
          { title: "El arte de regatear", desc: "Regatear se espera y es divertido — un guía mantiene el precio justo." },
          { title: "Historia viva", desc: "Un mercado cubierto iniciado en la década de 1450 bajo Mehmed el Conquistador, activo aún hoy." },
        ],
        faqs: [
          { q: "¿Necesito un guía para el Gran Bazar?", a: "No te perderás para siempre, pero es fácil pagar de más. Un guía local conoce a los artesanos honestos, el precio justo y los atajos por el laberinto." },
          { q: "¿De verdad se espera regatear?", a: "Sí, es parte de la cultura. Empieza bajo, mantente amable y deja que tu guía te enseñe dónde acaba el ritual y empieza un trato justo." },
          { q: "¿Cuánto tiempo debo reservar?", a: "La mayoría de las visitas guiadas duran 1–2 horas y se combinan de forma natural con el cercano Bazar de las Especias y las calles de Fatih." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "El Gran Bazar (Kapalıçarşı) se encuentra en el distrito de Fatih, en el casco antiguo, justo al lado de Beyazıt. La forma más sencilla de llegar es en el tranvía T1 hasta la parada \"Beyazıt-Kapalıçarşı\", que te deja en una de las puertas principales. Desde Sultanahmet y la Mezquita Azul hay un paseo cómodo y llano, así que muchos visitantes simplemente se acercan tras ver los monumentos cercanos.",
          "La entrada es gratuita y el mercado abre todos los días excepto los domingos. El mayor gentío se da hacia el mediodía, cuando los grupos y los pasajeros de crucero llenan los pasillos, de modo que llegar poco después de la apertura te ofrece callejones más tranquilos y comerciantes más pacientes. Como todo el bazar está cubierto, resulta agradable en cualquier estación, tanto en las tardes calurosas de verano como en los días lluviosos de invierno.",
          "Como uno de los mercados cubiertos más antiguos y grandes del mundo, con unas 4.000 tiendas repartidas por más de 60 calles, el bazar recompensa a quien se toma su tiempo. Regatear se espera y forma parte de la diversión, pero los primeros precios pueden ser elevados para los recién llegados. Un guía local de VibeGuide con licencia te ayuda a orientarte en el laberinto, evitar las trampas para turistas y llegar a tiendas honestas donde la calidad y el precio son justos.",
        ],
        ctaTitle: "Explora el Gran Bazar con un local",
        ...IST.es,
      },
      fr: {
        name: "Grand Bazar",
        metaTitle: "Visites du Grand Bazar avec guides locaux",
        metaDescription:
          "Explorez le Grand Bazar d'Istanbul avec un guide local vérifié. Parcourez 4 000 boutiques, marchandez en confiance et trouvez des artisans honnêtes plutôt que des pièges à touristes.",
        intro: [
          "Le Grand Bazar est l'un des plus anciens et vastes marchés couverts du monde : un labyrinthe amorcé sous Mehmed le Conquérant entre 1455 et 1461, agrandi au fil des siècles en plus de soixante rues couvertes et près de 4 000 boutiques. Tapis et kilims, or et bijoux, céramiques, épices, lanternes et cuir débordent de chaque porte sous ses voûtes peintes.",
          "Ici, marchander est attendu — c'est la moitié du plaisir —, mais le dédale engloutit les nouveaux venus. Un local VibeGuide vous mène dans les bonnes ruelles, vous écarte des prix pour touristes, vous présente des artisans honnêtes et traduit à la fois la langue et le rituel du marchandage.",
        ],
        highlights: [
          { title: "4 000 boutiques", desc: "Plus de soixante rues couvertes de tapis, d'or, de céramiques, d'épices, de lanternes et de cuir." },
          { title: "L'art de marchander", desc: "Le marchandage est attendu et amusant — un guide garde le prix honnête." },
          { title: "Histoire vivante", desc: "Un marché couvert amorcé dans les années 1450 sous Mehmed le Conquérant, toujours en activité." },
        ],
        faqs: [
          { q: "Ai-je besoin d'un guide pour le Grand Bazar ?", a: "Vous ne serez pas perdu à jamais, mais vous risquez de trop payer. Un guide local connaît les artisans honnêtes, le juste prix et les raccourcis du labyrinthe." },
          { q: "Faut-il vraiment marchander ?", a: "Oui, cela fait partie de la culture. Commencez bas, restez aimable, et laissez votre guide vous montrer où finit le rituel et où commence un marché équitable." },
          { q: "Combien de temps prévoir ?", a: "La plupart des visites guidées durent 1 à 2 heures et se marient naturellement avec le Bazar égyptien voisin et les rues de Fatih." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Le Grand Bazar (Kapalıçarşı) se trouve dans le quartier de Fatih, au cœur de la vieille ville, juste à côté de Beyazıt. Le plus simple est de prendre le tramway T1 jusqu'à l'arrêt \"Beyazıt-Kapalıçarşı\", qui vous dépose devant l'une des portes principales. Depuis Sultanahmet et la Mosquée bleue, la marche est facile et plate, si bien que beaucoup de visiteurs s'y rendent simplement à pied après avoir vu les monuments voisins.",
          "L'entrée est gratuite et le marché ouvre tous les jours sauf le dimanche. L'affluence est à son comble vers midi, lorsque les groupes et les passagers de croisière emplissent les allées ; venir peu après l'ouverture vous offre des ruelles plus calmes et des marchands plus patients. Comme tout le bazar est couvert, il reste agréable en toute saison, aussi bien lors des chaudes après-midi d'été que des journées pluvieuses d'hiver.",
          "Comptant parmi les marchés couverts les plus anciens et les plus vastes du monde, avec près de 4 000 boutiques réparties sur plus de 60 rues, le bazar récompense ceux qui prennent leur temps. Le marchandage est attendu et fait partie du jeu, mais les premiers prix peuvent être élevés pour les néophytes. Un guide local VibeGuide agréé vous aide à vous repérer dans le labyrinthe, à éviter les pièges à touristes et à trouver des boutiques honnêtes où la qualité et le prix sont justes.",
        ],
        ctaTitle: "Explorez le Grand Bazar avec un local",
        ...IST.fr,
      },
      el: {
        name: "Μεγάλη Αγορά",
        metaTitle: "Ξεναγήσεις στη Μεγάλη Αγορά με ντόπιους ξεναγούς",
        metaDescription:
          "Εξερεύνησε τη Μεγάλη Αγορά της Κωνσταντινούπολης με πιστοποιημένο ντόπιο ξεναγό. Περπάτα ανάμεσα σε 4.000 μαγαζιά, παζάρεψε με άνεση και βρες τίμιους τεχνίτες αντί για παγίδες τουριστών.",
        intro: [
          "Η Μεγάλη Αγορά είναι μία από τις παλαιότερες και μεγαλύτερες σκεπαστές αγορές του κόσμου — ένας λαβύρινθος που ξεκίνησε επί Μωάμεθ του Πορθητή μεταξύ 1455 και 1461 και μεγάλωσε στους αιώνες σε πάνω από εξήντα σκεπαστούς δρόμους και περίπου 4.000 μαγαζιά. Χαλιά και κιλίμια, χρυσός και κοσμήματα, κεραμικά, μπαχαρικά, φανάρια και δέρμα ξεχειλίζουν από κάθε πόρτα κάτω από τις ζωγραφιστές καμάρες.",
          "Το παζάρι εδώ αναμένεται — είναι η μισή διασκέδαση — αλλά ο λαβύρινθος καταπίνει τους αρχάριους. Ένας ντόπιος του VibeGuide σε οδηγεί στα σωστά σοκάκια, σε κρατά μακριά από τιμές για τουρίστες, σου συστήνει τίμιους τεχνίτες και μεταφράζει και τη γλώσσα και το τελετουργικό του παζαριού.",
        ],
        highlights: [
          { title: "4.000 μαγαζιά", desc: "Πάνω από εξήντα σκεπαστοί δρόμοι με χαλιά, χρυσό, κεραμικά, μπαχαρικά, φανάρια και δέρμα." },
          { title: "Η τέχνη του παζαριού", desc: "Το παζάρεμα αναμένεται και έχει πλάκα — ο ξεναγός κρατά την τιμή τίμια." },
          { title: "Ζωντανή ιστορία", desc: "Μια σκεπαστή αγορά που ξεκίνησε τη δεκαετία του 1450 επί Μωάμεθ του Πορθητή, ενεργή ακόμη σήμερα." },
        ],
        faqs: [
          { q: "Χρειάζομαι ξεναγό για τη Μεγάλη Αγορά;", a: "Δεν θα χαθείς για πάντα, αλλά μπορεί να πληρώσεις παραπάνω. Ένας ντόπιος ξεναγός ξέρει τους τίμιους τεχνίτες, τη σωστή τιμή και τα περάσματα μέσα στον λαβύρινθο." },
          { q: "Αναμένεται πράγματι παζάρι;", a: "Ναι, είναι μέρος της κουλτούρας. Ξεκίνα χαμηλά, μείνε φιλικός, και άσε τον ξεναγό σου να σου δείξει πού τελειώνει το τελετουργικό και αρχίζει μια δίκαιη συμφωνία." },
          { q: "Πόσο χρόνο να υπολογίσω;", a: "Οι περισσότερες ξεναγήσεις διαρκούν 1–2 ώρες και συνδυάζονται φυσικά με το κοντινό Παζάρι Μπαχαρικών και τα σοκάκια του Φατίχ." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Μεγάλο Παζάρι (Kapalıçarşı) βρίσκεται στη συνοικία Φατίχ της παλιάς πόλης, ακριβώς δίπλα στο Μπεγιαζίτ. Ο ευκολότερος τρόπος να φτάσετε είναι με το τραμ T1 έως τη στάση \"Beyazıt-Kapalıçarşı\", που σας αφήνει σε μία από τις κύριες πύλες. Από το Σουλταναχμέτ και το Μπλε Τζαμί η διαδρομή είναι άνετη και επίπεδη, γι' αυτό πολλοί επισκέπτες απλώς περπατούν ως εκεί αφού δουν τα κοντινά μνημεία.",
          "Η είσοδος είναι δωρεάν και η αγορά λειτουργεί κάθε μέρα εκτός Κυριακής. Ο μεγαλύτερος συνωστισμός είναι γύρω στο μεσημέρι, όταν τα γκρουπ και οι επιβάτες των κρουαζιερόπλοιων γεμίζουν τα δρομάκια, οπότε η άφιξη λίγο μετά το άνοιγμα σας χαρίζει πιο ήρεμους διαδρόμους και πιο υπομονετικούς εμπόρους. Επειδή όλο το παζάρι είναι στεγασμένο, παραμένει ευχάριστο σε κάθε εποχή, τόσο τα ζεστά καλοκαιρινά απογεύματα όσο και τις βροχερές χειμωνιάτικες μέρες.",
          "Ως μία από τις παλαιότερες και μεγαλύτερες στεγασμένες αγορές του κόσμου, με περίπου 4.000 καταστήματα σε πάνω από 60 δρόμους, το παζάρι ανταμείβει όσους αφιερώνουν χρόνο. Το παζάρεμα είναι αναμενόμενο και μέρος της διασκέδασης, όμως οι πρώτες τιμές μπορεί να είναι τσουχτερές για τους αρχάριους. Ένας αδειούχος τοπικός ξεναγός της VibeGuide σας βοηθά να κινηθείτε στον λαβύρινθο, να αποφύγετε τις παγίδες για τουρίστες και να φτάσετε σε τίμια μαγαζιά όπου η ποιότητα και η τιμή είναι δίκαιες.",
        ],
        ctaTitle: "Εξερεύνησε τη Μεγάλη Αγορά με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Kapalıçarşı",
        metaTitle: "Kapalıçarşı Turları & Yerel Rehberler",
        metaDescription:
          "İstanbul Kapalıçarşı'yı doğrulanmış bir yerel rehberle gez. 4.000 dükkânda yolunu bul, güvenle pazarlık et ve turist tuzağı yerine dürüst ustaları keşfet.",
        intro: [
          "Kapalıçarşı dünyanın en eski ve en büyük kapalı çarşılarından biri — Fatih Sultan Mehmed döneminde 1455 ile 1461 arasında başlayan, yüzyıllar içinde altmıştan fazla kapalı sokağa ve yaklaşık 4.000 dükkâna büyüyen bir labirent. Halılar ve kilimler, altın ve mücevher, seramik, baharat, fener ve deri; boyalı kubbelerin altında her kapıdan taşar.",
          "Burada pazarlık beklenir — işin yarısı keyfidir — ama labirent acemileri bir çırpıda yutar. VibeGuide yerel rehberi seni doğru sokaklardan geçirir, turist fiyatlarından uzak tutar, dürüst ustalarla tanıştırır ve hem dili hem de pazarlığın ritüelini çevirir.",
        ],
        highlights: [
          { title: "4.000 Dükkân", desc: "Altmıştan fazla kapalı sokakta halı, altın, seramik, baharat, fener ve deri." },
          { title: "Pazarlık Sanatı", desc: "Pazarlık beklenir ve keyiflidir — rehber fiyatı dürüst tutar." },
          { title: "Yaşayan Tarih", desc: "1450'lerde Fatih Sultan Mehmed döneminde başlayan kapalı çarşı, bugün hâlâ iş başında." },
        ],
        faqs: [
          { q: "Kapalıçarşı için rehbere ihtiyacım var mı?", a: "Sonsuza dek kaybolmazsın ama kolayca fazla ödersin. Yerel rehber dürüst ustaları, adil fiyatı ve labirentin kestirmelerini bilir." },
          { q: "Gerçekten pazarlık bekleniyor mu?", a: "Evet, kültürün parçası. Düşükten başla, güler yüzlü kal ve rehberin sana ritüelin nerede bitip adil pazarlığın nerede başladığını göstersin." },
          { q: "Ne kadar zaman ayırmalıyım?", a: "Çoğu rehberli gezi 1–2 saat sürer ve yakındaki Mısır Çarşısı ile Fatih sokaklarıyla doğal biçimde birleşir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Kapalıçarşı, eski şehirdeki Fatih ilçesinde, Beyazıt'ın hemen yanında yer alır. En kolay ulaşım, sizi ana kapılardan birine bırakan \"Beyazıt-Kapalıçarşı\" durağına giden T1 tramvayıdır. Sultanahmet ve Sultanahmet Camii'nden çarşıya rahat ve düz bir yürüyüşle varılır; bu yüzden birçok ziyaretçi yakındaki anıtları gezdikten sonra buraya yürüyerek geçer.",
          "Girişi ücretsizdir ve çarşı pazar günleri dışında her gün açıktır. En kalabalık saatler, tur gruplarının ve gemi yolcularının sokakları doldurduğu öğle vaktidir; açılıştan hemen sonra gelmek size daha sakin geçitler ve daha sabırlı esnaf sunar. Tüm çarşı kapalı olduğundan her mevsim rahat kalır; sıcak yaz öğleden sonralarında da yağmurlu kış günlerinde de güvenli bir seçimdir.",
          "Yaklaşık 4.000 dükkânı ve 60'tan fazla sokağıyla dünyanın en eski ve en büyük kapalı çarşılarından biri olan Kapalıçarşı, vakit ayıranları ödüllendirir. Pazarlık beklenen bir şeydir ve işin keyfinin parçasıdır, ancak ilk fiyatlar yeni gelenler için yüksek olabilir. Lisanslı bir VibeGuide yerel rehberi labirentte yolunuzu bulmanıza, turist tuzağı tezgâhlardan uzak durmanıza ve kalitenin de fiyatın da adil olduğu dürüst dükkânlara ulaşmanıza yardımcı olur.",
        ],
        ctaTitle: "Kapalıçarşı'yı bir yerelle keşfet",
        ...IST.tr,
      },
      it: {
        name: "Gran Bazar",
        metaTitle: "Tour del Gran Bazar con guide locali",
        metaDescription:
          "Esplora il Gran Bazar di Istanbul con una guida locale verificata. Attraversa 4.000 negozi, contratta con sicurezza e trova artigiani onesti invece delle trappole per turisti.",
        intro: [
          "Il Gran Bazar è uno dei mercati coperti più antichi e grandi del mondo: un labirinto avviato sotto Maometto il Conquistatore tra il 1455 e il 1461, cresciuto nei secoli in oltre sessanta strade coperte e circa 4.000 negozi. Tappeti e kilim, oro e gioielli, ceramiche, spezie, lanterne e cuoio traboccano da ogni porta sotto le sue volte dipinte.",
          "Qui contrattare è previsto — è metà del divertimento — ma il dedalo inghiotte i nuovi arrivati. Un local di VibeGuide ti guida per i vicoli giusti, ti tiene lontano dai prezzi da turista, ti presenta artigiani onesti e traduce sia la lingua sia il rituale della trattativa.",
        ],
        highlights: [
          { title: "4.000 negozi", desc: "Oltre sessanta strade coperte di tappeti, oro, ceramiche, spezie, lanterne e cuoio." },
          { title: "L'arte di contrattare", desc: "Contrattare è previsto ed è divertente — una guida mantiene il prezzo onesto." },
          { title: "Storia viva", desc: "Un mercato coperto avviato negli anni 1450 sotto Maometto il Conquistatore, ancora attivo oggi." },
        ],
        faqs: [
          { q: "Serve una guida per il Gran Bazar?", a: "Non ti perderai per sempre, ma è facile pagare troppo. Una guida locale conosce gli artigiani onesti, il prezzo giusto e le scorciatoie nel labirinto." },
          { q: "Si contratta davvero?", a: "Sì, fa parte della cultura. Parti basso, resta cordiale e lascia che la tua guida ti mostri dove finisce il rituale e comincia un affare equo." },
          { q: "Quanto tempo devo prevedere?", a: "La maggior parte delle visite guidate dura 1–2 ore e si abbina naturalmente al vicino Bazar delle Spezie e alle vie di Fatih." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Il Gran Bazar (Kapalıçarşı) si trova nel quartiere di Fatih, nel cuore della città vecchia, proprio accanto a Beyazıt. Il modo più semplice per arrivarci è il tram T1 fino alla fermata \"Beyazıt-Kapalıçarşı\", che ti lascia davanti a uno degli ingressi principali. Da Sultanahmet e dalla Moschea Blu la passeggiata è comoda e pianeggiante, così molti visitatori raggiungono il bazar a piedi dopo aver visto i monumenti vicini.",
          "L'ingresso è gratuito e il mercato è aperto tutti i giorni tranne la domenica. L'affluenza è massima verso mezzogiorno, quando i gruppi e i passeggeri delle crociere riempiono i vicoli, perciò arrivare poco dopo l'apertura regala corridoi più tranquilli e commercianti più pazienti. Poiché l'intero bazar è coperto, resta piacevole in ogni stagione, sia nei caldi pomeriggi estivi sia nelle piovose giornate invernali.",
          "Essendo uno dei mercati coperti più antichi e grandi del mondo, con circa 4.000 botteghe lungo oltre 60 strade, il bazar premia chi si prende il proprio tempo. Contrattare è previsto e fa parte del divertimento, ma i primi prezzi possono risultare alti per chi è alle prime armi. Una guida locale VibeGuide autorizzata ti aiuta a orientarti nel labirinto, a evitare le trappole per turisti e a raggiungere botteghe oneste dove qualità e prezzo sono entrambi equi.",
        ],
        ctaTitle: "Esplora il Gran Bazar con un locale",
        ...IST.it,
      },
      pl: {
        name: "Wielki Bazar",
        metaTitle: "Wielki Bazar — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Wielki Bazar w Stambule ze zweryfikowanym lokalnym przewodnikiem. Przejdź 4000 sklepów, targuj się pewnie i znajdź uczciwych rzemieślników zamiast pułapek na turystów.",
        intro: [
          "Wielki Bazar to jeden z najstarszych i największych krytych targów na świecie — labirynt rozpoczęty za Mehmeda Zdobywcy w latach 1455–1461, który przez wieki rozrósł się do ponad sześćdziesięciu krytych uliczek i około 4000 sklepów. Dywany i kilimy, złoto i biżuteria, ceramika, przyprawy, lampiony i skóra wylewają się z każdych drzwi pod malowanymi sklepieniami.",
          "Targowanie się jest tu oczekiwane — to połowa zabawy — ale labirynt połyka nowicjuszy w całości. Lokalny przewodnik VibeGuide poprowadzi Cię właściwymi uliczkami, uchroni od cen dla turystów, przedstawi uczciwych rzemieślników i przetłumaczy zarówno język, jak i sam rytuał targu.",
        ],
        highlights: [
          { title: "4000 sklepów", desc: "Ponad sześćdziesiąt krytych uliczek z dywanami, złotem, ceramiką, przyprawami, lampionami i skórą." },
          { title: "Sztuka targowania", desc: "Targowanie jest oczekiwane i zabawne — przewodnik pilnuje uczciwej ceny." },
          { title: "Żywa historia", desc: "Kryty targ rozpoczęty w latach 50. XV wieku za Mehmeda Zdobywcy, działający do dziś." },
        ],
        faqs: [
          { q: "Czy potrzebuję przewodnika na Wielkim Bazarze?", a: "Nie zgubisz się na zawsze, ale łatwo przepłacisz. Lokalny przewodnik zna uczciwych rzemieślników, właściwą cenę i skróty przez labirynt." },
          { q: "Czy naprawdę trzeba się targować?", a: "Tak, to część kultury. Zacznij nisko, bądź uprzejmy i pozwól przewodnikowi pokazać, gdzie kończy się rytuał, a zaczyna uczciwa transakcja." },
          { q: "Ile czasu zaplanować?", a: "Większość wycieczek z przewodnikiem trwa 1–2 godziny i naturalnie łączy się z pobliskim Bazarem Egipskim oraz uliczkami Fatih." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Wielki Bazar (Kapalıçarşı) leży w dzielnicy Fatih na starym mieście, tuż obok Beyazıt. Najłatwiej dotrzeć tu tramwajem T1 do przystanku \"Beyazıt-Kapalıçarşı\", który wysadza pasażerów przy jednej z głównych bram. Od Sultanahmet i Błękitnego Meczetu prowadzi wygodna, płaska trasa spacerowa, dlatego wielu zwiedzających po prostu przechodzi tu pieszo po obejrzeniu pobliskich zabytków.",
          "Wstęp jest bezpłatny, a bazar jest otwarty codziennie z wyjątkiem niedziel. Największy tłok panuje w okolicach południa, gdy uliczki wypełniają grupy wycieczkowe i pasażerowie rejsów, więc przyjście krótko po otwarciu zapewnia spokojniejsze alejki i bardziej cierpliwych sprzedawców. Ponieważ cały bazar jest zadaszony, jest przyjemnie o każdej porze roku, zarówno w upalne letnie popołudnia, jak i w deszczowe zimowe dni.",
          "Jako jeden z najstarszych i największych krytych targów świata, z około 4000 sklepów przy ponad 60 uliczkach, bazar nagradza tych, którzy nie spieszą się. Targowanie jest tu oczekiwane i stanowi część zabawy, ale pierwsze ceny bywają wysokie dla nowicjuszy. Licencjonowany lokalny przewodnik VibeGuide pomoże ci odnaleźć się w labiryncie, ominąć pułapki na turystów i trafić do uczciwych sklepów, w których zarówno jakość, jak i cena są sprawiedliwe.",
        ],
        ctaTitle: "Zwiedź Wielki Bazar z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Grote Bazaar",
        metaTitle: "Grote Bazaar-tours & lokale gidsen",
        metaDescription:
          "Verken de Grote Bazaar van Istanbul met een geverifieerde lokale gids. Baan je weg door 4.000 winkels, onderhandel met vertrouwen en vind eerlijke ambachtslieden in plaats van toeristenvallen.",
        intro: [
          "De Grote Bazaar is een van de oudste en grootste overdekte markten ter wereld — een doolhof dat onder Mehmed de Veroveraar tussen 1455 en 1461 begon en door de eeuwen heen uitgroeide tot ruim zestig overdekte straten en zo'n 4.000 winkels. Tapijten en kelims, goud en sieraden, keramiek, specerijen, lantaarns en leer puilen uit elke deur onder de beschilderde gewelven.",
          "Afdingen wordt hier verwacht — het is de halve pret — maar het doolhof slokt nieuwelingen in één keer op. Een local van VibeGuide loodst je door de juiste steegjes, houdt je weg van toeristenprijzen, stelt je voor aan eerlijke ambachtslieden en vertaalt zowel de taal als het ritueel van het onderhandelen.",
        ],
        highlights: [
          { title: "4.000 winkels", desc: "Ruim zestig overdekte straten met tapijten, goud, keramiek, specerijen, lantaarns en leer." },
          { title: "De kunst van het afdingen", desc: "Onderhandelen wordt verwacht en is leuk — een gids houdt de prijs eerlijk." },
          { title: "Levende geschiedenis", desc: "Een overdekte markt begonnen in de jaren 1450 onder Mehmed de Veroveraar, nog altijd in bedrijf." },
        ],
        faqs: [
          { q: "Heb ik een gids nodig voor de Grote Bazaar?", a: "Je raakt niet voorgoed verdwaald, maar je betaalt al snel te veel. Een lokale gids kent de eerlijke ambachtslieden, de juiste prijs en de sluiproutes door het doolhof." },
          { q: "Wordt er echt afgedongen?", a: "Ja, het hoort bij de cultuur. Begin laag, blijf vriendelijk en laat je gids je tonen waar het ritueel eindigt en een eerlijke deal begint." },
          { q: "Hoeveel tijd moet ik inplannen?", a: "De meeste rondleidingen duren 1–2 uur en combineren natuurlijk met de nabije Egyptische Bazaar en de straten van Fatih." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Grote Bazaar (Kapalıçarşı) ligt in de wijk Fatih in de oude stad, vlak naast Beyazıt. De makkelijkste manier om er te komen is met tram T1 tot de halte \"Beyazıt-Kapalıçarşı\", die je bij een van de hoofdpoorten afzet. Vanaf Sultanahmet en de Blauwe Moskee is het een prettige, vlakke wandeling, zodat veel bezoekers na de nabijgelegen monumenten gewoon naar de bazaar toe lopen.",
          "De toegang is gratis en de markt is elke dag open, behalve op zondag. Het is het drukst rond het middaguur, wanneer reisgezelschappen en cruisepassagiers de steegjes vullen; kort na openingstijd arriveren geeft je rustigere gangpaden en geduldiger handelaren. Omdat de hele bazaar overdekt is, blijft het in elk seizoen aangenaam, zowel op hete zomermiddagen als op regenachtige winterdagen.",
          "Als een van de oudste en grootste overdekte markten ter wereld, met zo'n 4.000 winkels langs meer dan 60 straten, beloont de bazaar wie de tijd neemt. Afdingen wordt verwacht en hoort bij het plezier, maar de eerste prijzen kunnen voor nieuwkomers hoog zijn. Een erkende lokale VibeGuide-gids helpt je door het doolhof, houdt je weg bij toeristenvallen en brengt je naar eerlijke winkels waar zowel de kwaliteit als de prijs eerlijk zijn.",
        ],
        ctaTitle: "Verken de Grote Bazaar met een local",
        ...IST.nl,
      },
    },
  },
  {
    slug: "bosphorus",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🚢",
    image:
      "https://images.unsplash.com/photo-1640301998084-c9b80babd03c?q=80&w=1600",
    lat: 41.0766,
    lng: 29.0575,
    i18n: {
      en: {
        name: "The Bosphorus",
        metaTitle: "Bosphorus Cruise Tours & Local Guides",
        metaDescription:
          "Cruise the Bosphorus in Istanbul with a verified local guide. Glide past Ottoman palaces, waterfront yalıs and the Maiden's Tower, and hear the story of each shore.",
        intro: [
          "The Bosphorus is the strait that splits a continent — the winding channel dividing Europe from Asia and linking the Black Sea to the Sea of Marmara. A classic boat tour glides past Ottoman palaces like Dolmabahçe, Beylerbeyi and Çırağan, the graceful wooden waterfront mansions known as yalıs, the Maiden's Tower on its islet, Rumeli Fortress and beneath the great suspension bridges.",
          "The sunset cruise is one of Istanbul's iconic experiences, but from the water it's hard to tell one palace from the next. With a VibeGuide local aboard, you learn which is which, whose story belongs to which shore, and why this ribbon of water shaped an empire.",
        ],
        highlights: [
          { title: "Palaces from the Water", desc: "Dolmabahçe, Beylerbeyi and Çırağan line the shores in Ottoman splendour." },
          { title: "Two Continents", desc: "Europe on one bank, Asia on the other, joined by the great suspension bridges." },
          { title: "Yalıs & the Maiden's Tower", desc: "Historic wooden waterfront mansions and the little tower that guards the strait." },
        ],
        faqs: [
          { q: "Is a Bosphorus cruise worth it with a guide?", a: "From the water the palaces blur together. A local guide names each one, tells its story and points out the details you'd otherwise sail right past." },
          { q: "When is the best time to cruise?", a: "Sunset is iconic, when the light glows on the palaces and bridges. Your guide can help you pick the hour and the right kind of boat." },
          { q: "How long is a typical cruise?", a: "Tours range from about 1.5 to 3 hours depending on how far up the strait you go, easily paired with a walk along the waterfront." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Bosphorus is the storied strait that divides Istanbul between Europe and Asia, so you experience it best from the water. Boat tours depart from several waterfront hubs, most conveniently Eminönü, Kabataş and Beşiktaş, all reachable by tram, ferry or a short walk from the old city. From these piers you can join a scheduled cruise or step aboard a private boat within minutes of arriving.",
          "There is a boat for every hour of the day, but the golden light of late afternoon and sunset is the most iconic time to be on deck. Summer brings warm, lively evenings, while spring and autumn offer clearer air and thinner crowds. Whatever the season, the strait is breezy and cooler than the shore, so bring a light layer and dress for the wind even on sunny days.",
          "Public ferries are cheap, frequent and wonderfully scenic, while private or guided boats give you flexibility over route and timing. Along the way you glide past Ottoman palaces, elegant waterside yalı mansions, Rumeli Fortress and the great suspension bridges. A licensed VibeGuide local guide helps you choose the right boat for your group and brings the shoreline to life with the stories behind each palace, fortress and neighbourhood you pass.",
        ],
        ctaTitle: "Cruise the Bosphorus with a local",
        ...IST.en,
      },
      de: {
        name: "Bosporus",
        metaTitle: "Bosporus-Bootstouren & lokale Guides",
        metaDescription:
          "Erkunde den Bosporus in Istanbul mit einem geprüften lokalen Guide. Gleite an osmanischen Palästen, Yalıs am Ufer und dem Mädchenturm vorbei und höre die Geschichte jedes Ufers.",
        intro: [
          "Der Bosporus ist die Meerenge, die einen Kontinent teilt — der gewundene Kanal, der Europa von Asien trennt und das Schwarze Meer mit dem Marmarameer verbindet. Eine klassische Bootstour gleitet vorbei an osmanischen Palästen wie Dolmabahçe, Beylerbeyi und Çırağan, den anmutigen hölzernen Ufervillen, den Yalıs, dem Mädchenturm auf seinem Inselchen, der Festung Rumeli und unter den großen Hängebrücken hindurch.",
          "Die Sonnenuntergangsfahrt ist eines der ikonischen Erlebnisse Istanbuls, doch vom Wasser aus lässt sich ein Palast kaum vom nächsten unterscheiden. Mit einem VibeGuide-Local an Bord erfährst du, welcher welcher ist, wessen Geschichte zu welchem Ufer gehört und warum dieses Band aus Wasser ein Imperium prägte.",
        ],
        highlights: [
          { title: "Paläste vom Wasser aus", desc: "Dolmabahçe, Beylerbeyi und Çırağan säumen die Ufer in osmanischem Glanz." },
          { title: "Zwei Kontinente", desc: "Europa am einen Ufer, Asien am anderen, verbunden durch die großen Hängebrücken." },
          { title: "Yalıs & Mädchenturm", desc: "Historische hölzerne Ufervillen und der kleine Turm, der die Meerenge bewacht." },
        ],
        faqs: [
          { q: "Lohnt sich eine Bosporus-Fahrt mit Guide?", a: "Vom Wasser verschwimmen die Paläste. Ein lokaler Guide benennt jeden, erzählt seine Geschichte und zeigt dir Details, an denen du sonst vorbeiführest." },
          { q: "Wann fährt man am besten?", a: "Der Sonnenuntergang ist ikonisch, wenn das Licht auf Palästen und Brücken glüht. Dein Guide hilft bei der Wahl der Stunde und des richtigen Bootes." },
          { q: "Wie lange dauert eine Fahrt?", a: "Touren dauern etwa 1,5 bis 3 Stunden, je nachdem, wie weit du die Meerenge hinauffährst, gut kombinierbar mit einem Spaziergang am Ufer." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Bosporus ist die sagenumwobene Meerenge, die Istanbul zwischen Europa und Asien teilt, und am besten erlebst du ihn vom Wasser aus. Bootstouren starten an mehreren Anlegern, am bequemsten in Eminönü, Kabataş und Beşiktaş, die alle per Straßenbahn, Fähre oder einem kurzen Fußweg aus der Altstadt erreichbar sind. Von diesen Piers kannst du eine planmäßige Rundfahrt buchen oder wenige Minuten nach der Ankunft an Bord eines privaten Bootes gehen.",
          "Es gibt zu jeder Tageszeit ein Boot, doch das goldene Licht des späten Nachmittags und des Sonnenuntergangs ist der ikonischste Moment an Deck. Der Sommer bringt warme, lebhafte Abende, während Frühling und Herbst klarere Luft und weniger Andrang bieten. Zu jeder Jahreszeit ist es auf der Meerenge windig und kühler als am Ufer, nimm also eine leichte Jacke mit und kleide dich selbst an sonnigen Tagen windfest.",
          "Öffentliche Fähren sind günstig, häufig und herrlich malerisch, während private oder geführte Boote dir Freiheit bei Route und Zeit lassen. Unterwegs gleitest du an osmanischen Palästen, eleganten Yalı-Villen am Wasser, der Festung Rumeli Hisarı und den großen Hängebrücken vorbei. Ein lizenzierter VibeGuide-Guide vor Ort hilft dir, das passende Boot für deine Gruppe zu wählen, und erweckt das Ufer mit den Geschichten hinter jedem Palast, jeder Festung und jedem Viertel zum Leben.",
        ],
        ctaTitle: "Erkunde den Bosporus mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Босфор",
        metaTitle: "Босфор: прогулки на катере с местными гидами",
        metaDescription:
          "Пройдите по Босфору в Стамбуле с проверенным местным гидом. Скользите мимо османских дворцов, прибрежных ялы и Девичьей башни и узнайте историю каждого берега.",
        intro: [
          "Босфор — пролив, разделяющий континент: извилистый канал, что отделяет Европу от Азии и связывает Чёрное море с Мраморным. Классическая прогулка на катере скользит мимо османских дворцов — Долмабахче, Бейлербейи и Чыраган, изящных деревянных прибрежных особняков-ялы, Девичьей башни на островке, крепости Румели и под огромными висячими мостами.",
          "Закатный круиз — одно из культовых впечатлений Стамбула, но с воды один дворец не отличить от другого. С местным гидом VibeGuide на борту вы поймёте, где какой, чья история принадлежит какому берегу и почему эта лента воды сформировала целую империю.",
        ],
        highlights: [
          { title: "Дворцы с воды", desc: "Долмабахче, Бейлербейи и Чыраган выстроились по берегам в османском великолепии." },
          { title: "Два континента", desc: "Европа на одном берегу, Азия на другом, соединённые огромными висячими мостами." },
          { title: "Ялы и Девичья башня", desc: "Исторические деревянные особняки у воды и башенка, что стережёт пролив." },
        ],
        faqs: [
          { q: "Стоит ли круиз по Босфору с гидом?", a: "С воды дворцы сливаются. Местный гид назовёт каждый, расскажет его историю и укажет детали, мимо которых вы бы просто проплыли." },
          { q: "Когда лучше отправляться?", a: "Закат культовое время, когда свет играет на дворцах и мостах. Гид поможет выбрать час и подходящий катер." },
          { q: "Сколько длится обычный круиз?", a: "Прогулки длятся примерно от 1,5 до 3 часов в зависимости от того, как далеко вы поднимаетесь по проливу; легко сочетаются с прогулкой по набережной." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Босфор — легендарный пролив, разделяющий Стамбул между Европой и Азией, и лучше всего он раскрывается с воды. Прогулочные катера отправляются с нескольких набережных причалов, удобнее всего от Эминёню, Кабаташа и Бешикташа, до которых легко добраться на трамвае, пароме или пешком из старого города. От этих причалов можно присоединиться к рейсу по расписанию или подняться на борт частной лодки уже через несколько минут после прибытия.",
          "Лодка найдётся для любого часа дня, но золотой свет позднего дня и заката — самое культовое время находиться на палубе. Лето дарит тёплые оживлённые вечера, а весна и осень — более чистый воздух и меньше людей. В любой сезон на проливе ветрено и прохладнее, чем на берегу, поэтому берите лёгкую одежду и одевайтесь с учётом ветра даже в солнечные дни.",
          "Городские паромы недороги, ходят часто и удивительно живописны, тогда как частные или экскурсионные катера дают свободу в выборе маршрута и времени. По пути вы проплываете мимо османских дворцов, изящных прибрежных особняков-яли, крепости Румелихисар и величественных подвесных мостов. Лицензированный местный гид VibeGuide поможет выбрать подходящую лодку для вашей компании и оживит побережье рассказами о каждом дворце, крепости и квартале, мимо которых вы проходите.",
        ],
        ctaTitle: "Прокатиться по Босфору с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "مضيق البوسفور",
        metaTitle: "جولات بحرية في البوسفور مع مرشدين محليين",
        metaDescription:
          "أبحر في مضيق البوسفور بإسطنبول مع مرشد محلي موثّق. مُرّ بالقصور العثمانية واليالي على الضفاف وبرج الفتاة، واستمع إلى قصة كل ضفة.",
        intro: [
          "البوسفور هو المضيق الذي يشطر قارّة — القناة المتعرّجة التي تفصل أوروبا عن آسيا وتصل البحر الأسود ببحر مرمرة. تنساب الجولة البحرية الكلاسيكية بمحاذاة قصور عثمانية مثل دولمة بهجة وبيلربيي وتشيراغان، والقصور الخشبية الرشيقة على الضفاف المعروفة باسم «اليالي»، وبرج الفتاة على جزيرته، وقلعة روملي، وتحت الجسور المعلّقة العظيمة.",
          "رحلة الغروب من أيقونات إسطنبول، لكن من الماء يصعب تمييز قصر عن آخر. مع مرشد محلي من VibeGuide على متن القارب، تعرف أيّها أيّ، وأيّ قصة تخصّ أيّ ضفة، ولماذا صاغ هذا الشريط المائي إمبراطورية بأكملها.",
        ],
        highlights: [
          { title: "القصور من الماء", desc: "دولمة بهجة وبيلربيي وتشيراغان تصطفّ على الضفاف ببهاء عثماني." },
          { title: "قارّتان", desc: "أوروبا على ضفة وآسيا على الأخرى، تربطهما الجسور المعلّقة العظيمة." },
          { title: "اليالي وبرج الفتاة", desc: "قصور خشبية تاريخية على الماء والبرج الصغير الذي يحرس المضيق." },
        ],
        faqs: [
          { q: "هل تستحق جولة البوسفور مع مرشد؟", a: "من الماء تتشابه القصور. المرشد المحلي يسمّي كل واحد، ويروي قصته، ويشير إلى تفاصيل كنت ستمرّ بها دون أن تنتبه." },
          { q: "ما أفضل وقت للإبحار؟", a: "الغروب وقت أيقوني، حين يتوهّج الضوء على القصور والجسور. يساعدك مرشدك على اختيار الساعة ونوع القارب المناسب." },
          { q: "كم تستغرق الجولة عادةً؟", a: "تتراوح الجولات بين نحو ساعة ونصف وثلاث ساعات حسب مدى صعودك في المضيق، وتُدمج بسهولة مع نزهة على الواجهة البحرية." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "البوسفور هو المضيق الشهير الذي يقسم إسطنبول بين أوروبا وآسيا، ولذا فإن أفضل طريقة لاختباره هي من الماء. تنطلق الجولات البحرية من عدة أرصفة على الواجهة المائية، وأيسرها إمينونو وقباطاش وبشيكتاش، وكلها يمكن الوصول إليها بالترام أو العبّارة أو بمسير قصير من المدينة القديمة. ومن هذه الأرصفة يمكنك الانضمام إلى رحلة منتظمة أو ركوب قارب خاص بعد وصولك بدقائق.",
          "هناك قارب في كل ساعة من النهار، لكن الضوء الذهبي في أواخر العصر وعند الغروب هو أكثر الأوقات رمزية للوقوف على سطح المركب. يجلب الصيف أمسيات دافئة نابضة بالحياة، بينما يقدّم الربيع والخريف هواءً أصفى وزحامًا أقلّ. وفي كل فصل يكون المضيق أكثر رياحًا وبرودة من الشاطئ، فاحمل معك طبقة خفيفة والبس ما يقيك الريح حتى في الأيام المشمسة.",
          "العبّارات العامة رخيصة ومتكررة وبديعة المناظر، في حين تمنحك القوارب الخاصة أو المصحوبة بمرشد مرونة في المسار والتوقيت. وعلى طول الطريق تنساب أمام القصور العثمانية، والقصور المائية الأنيقة (يالي)، وقلعة روملي، والجسور المعلّقة الكبرى. ويساعدك مرشد VibeGuide المحلي المرخّص على اختيار القارب المناسب لمجموعتك، ويبعث الحياة في الساحل بالحكايات الكامنة وراء كل قصر وقلعة وحيّ تمرّ به.",
        ],
        ctaTitle: "أبحر في البوسفور مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "El Bósforo",
        metaTitle: "Cruceros por el Bósforo con guías locales",
        metaDescription:
          "Navega el Bósforo en Estambul con un guía local verificado. Pasa junto a palacios otomanos, yalıs a la orilla y la Torre de la Doncella, y escucha la historia de cada margen.",
        intro: [
          "El Bósforo es el estrecho que parte un continente: el sinuoso canal que separa Europa de Asia y une el mar Negro con el mar de Mármara. Un crucero clásico se desliza junto a palacios otomanos como Dolmabahçe, Beylerbeyi y Çırağan, las elegantes mansiones de madera a la orilla llamadas yalıs, la Torre de la Doncella en su islote, la Fortaleza de Rumeli y bajo los grandes puentes colgantes.",
          "El crucero al atardecer es una de las experiencias icónicas de Estambul, pero desde el agua cuesta distinguir un palacio del siguiente. Con un local de VibeGuide a bordo aprendes cuál es cuál, qué historia pertenece a cada margen y por qué esta cinta de agua dio forma a un imperio.",
        ],
        highlights: [
          { title: "Palacios desde el agua", desc: "Dolmabahçe, Beylerbeyi y Çırağan bordean las orillas con esplendor otomano." },
          { title: "Dos continentes", desc: "Europa en una orilla, Asia en la otra, unidas por los grandes puentes colgantes." },
          { title: "Yalıs y la Torre de la Doncella", desc: "Históricas mansiones de madera junto al agua y la pequeña torre que guarda el estrecho." },
        ],
        faqs: [
          { q: "¿Vale la pena un crucero por el Bósforo con guía?", a: "Desde el agua los palacios se confunden. Un guía local nombra cada uno, cuenta su historia y señala los detalles que de otro modo pasarías de largo." },
          { q: "¿Cuál es la mejor hora para navegar?", a: "El atardecer es icónico, cuando la luz brilla sobre palacios y puentes. Tu guía te ayuda a elegir la hora y el tipo de barco adecuado." },
          { q: "¿Cuánto dura un crucero típico?", a: "Los tours van de 1,5 a 3 horas según lo lejos que subas por el estrecho, fáciles de combinar con un paseo por la orilla." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "El Bósforo es el legendario estrecho que divide Estambul entre Europa y Asia, así que se disfruta mejor desde el agua. Los paseos en barco salen de varios embarcaderos, los más cómodos Eminönü, Kabataş y Beşiktaş, todos accesibles en tranvía, ferri o con un breve paseo desde el casco antiguo. Desde estos muelles puedes unirte a un crucero programado o subir a bordo de un barco privado pocos minutos después de llegar.",
          "Hay un barco para cada hora del día, pero la luz dorada de la última tarde y el atardecer es el momento más icónico para estar en cubierta. El verano trae tardes cálidas y animadas, mientras que la primavera y el otoño ofrecen aire más limpio y menos gente. Sea cual sea la estación, el estrecho es ventoso y más fresco que la orilla, así que lleva una capa ligera y vístete para el viento incluso en días soleados.",
          "Los ferris públicos son baratos, frecuentes y maravillosamente pintorescos, mientras que los barcos privados o guiados te dan libertad de ruta y horario. Por el camino te deslizas junto a palacios otomanos, elegantes mansiones ribereñas yalı, la Fortaleza de Rumeli y los grandes puentes colgantes. Un guía local de VibeGuide con licencia te ayuda a elegir el barco adecuado para tu grupo y da vida a la orilla con las historias que hay detrás de cada palacio, fortaleza y barrio que dejas atrás.",
        ],
        ctaTitle: "Navega el Bósforo con un local",
        ...IST.es,
      },
      fr: {
        name: "Le Bosphore",
        metaTitle: "Croisières sur le Bosphore avec guides locaux",
        metaDescription:
          "Naviguez sur le Bosphore à Istanbul avec un guide local vérifié. Longez les palais ottomans, les yalıs au bord de l'eau et la Tour de Léandre, et découvrez l'histoire de chaque rive.",
        intro: [
          "Le Bosphore est le détroit qui fend un continent : le chenal sinueux qui sépare l'Europe de l'Asie et relie la mer Noire à la mer de Marmara. Une croisière classique longe des palais ottomans comme Dolmabahçe, Beylerbeyi et Çırağan, les gracieuses demeures de bois au bord de l'eau appelées yalıs, la Tour de Léandre sur son îlot, la forteresse de Roumélie et passe sous les grands ponts suspendus.",
          "La croisière au coucher du soleil est l'une des expériences emblématiques d'Istanbul, mais depuis l'eau il est difficile de distinguer un palais du suivant. Avec un local VibeGuide à bord, vous apprenez lequel est lequel, quelle histoire appartient à quelle rive et pourquoi ce ruban d'eau a façonné un empire.",
        ],
        highlights: [
          { title: "Les palais depuis l'eau", desc: "Dolmabahçe, Beylerbeyi et Çırağan bordent les rives dans leur splendeur ottomane." },
          { title: "Deux continents", desc: "L'Europe sur une rive, l'Asie sur l'autre, reliées par les grands ponts suspendus." },
          { title: "Yalıs & Tour de Léandre", desc: "D'historiques demeures de bois au bord de l'eau et la petite tour qui garde le détroit." },
        ],
        faqs: [
          { q: "Une croisière sur le Bosphore vaut-elle le coup avec un guide ?", a: "Depuis l'eau, les palais se confondent. Un guide local nomme chacun, raconte son histoire et pointe les détails que vous dépasseriez sinon sans les voir." },
          { q: "Quel est le meilleur moment pour naviguer ?", a: "Le coucher de soleil est emblématique, quand la lumière embrase palais et ponts. Votre guide vous aide à choisir l'heure et le bon type de bateau." },
          { q: "Combien de temps dure une croisière ?", a: "Les tours durent de 1h30 à 3 heures selon la distance parcourue dans le détroit, faciles à combiner avec une promenade au bord de l'eau." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Le Bosphore est le détroit légendaire qui partage Istanbul entre l'Europe et l'Asie ; on l'apprécie donc le mieux depuis l'eau. Les croisières partent de plusieurs embarcadères, les plus pratiques étant Eminönü, Kabataş et Beşiktaş, tous accessibles en tramway, en ferry ou après une courte marche depuis la vieille ville. Depuis ces quais, vous pouvez rejoindre une croisière régulière ou monter à bord d'un bateau privé quelques minutes après votre arrivée.",
          "Il y a un bateau à chaque heure de la journée, mais la lumière dorée de la fin d'après-midi et du coucher du soleil est le moment le plus emblématique pour être sur le pont. L'été offre des soirées chaudes et animées, tandis que le printemps et l'automne apportent un air plus limpide et moins de monde. Quelle que soit la saison, le détroit est venteux et plus frais que la rive, alors emportez une couche légère et habillez-vous pour le vent même par temps ensoleillé.",
          "Les ferries publics sont bon marché, fréquents et merveilleusement pittoresques, tandis que les bateaux privés ou guidés vous laissent libres de l'itinéraire et des horaires. En chemin, vous glissez devant des palais ottomans, d'élégantes demeures yalı au bord de l'eau, la forteresse de Rumeli et les grands ponts suspendus. Un guide local VibeGuide agréé vous aide à choisir le bon bateau pour votre groupe et fait revivre le rivage grâce aux histoires qui se cachent derrière chaque palais, forteresse et quartier que vous longez.",
        ],
        ctaTitle: "Naviguez sur le Bosphore avec un local",
        ...IST.fr,
      },
      el: {
        name: "Βόσπορος",
        metaTitle: "Κρουαζιέρες στον Βόσπορο με ντόπιους ξεναγούς",
        metaDescription:
          "Πλεύσε στον Βόσπορο της Κωνσταντινούπολης με πιστοποιημένο ντόπιο ξεναγό. Προσπέρασε οθωμανικά ανάκτορα, παραθαλάσσια γιαλιά και τον Πύργο της Κόρης, και άκου την ιστορία κάθε ακτής.",
        intro: [
          "Ο Βόσπορος είναι το στενό που σχίζει μια ήπειρο — το φιδίσιο κανάλι που χωρίζει την Ευρώπη από την Ασία και ενώνει τη Μαύρη Θάλασσα με τη Θάλασσα του Μαρμαρά. Μια κλασική κρουαζιέρα γλιστρά δίπλα σε οθωμανικά ανάκτορα όπως το Ντολμάμπαχτσε, το Μπεϊλέρμπεϊ και το Τσιράγαν, τα κομψά ξύλινα παραθαλάσσια αρχοντικά που λέγονται γιαλιά, τον Πύργο της Κόρης στη νησίδα του, το Φρούριο Ρούμελι και κάτω από τις μεγάλες κρεμαστές γέφυρες.",
          "Η κρουαζιέρα του ηλιοβασιλέματος είναι από τις εμβληματικές εμπειρίες της Κωνσταντινούπολης, όμως από το νερό δύσκολα ξεχωρίζεις το ένα ανάκτορο από το άλλο. Με έναν ντόπιο του VibeGuide στο πλοίο, μαθαίνεις ποιο είναι ποιο, ποια ιστορία ανήκει σε ποια ακτή και γιατί αυτή η κορδέλα νερού διαμόρφωσε μια αυτοκρατορία.",
        ],
        highlights: [
          { title: "Ανάκτορα από το νερό", desc: "Το Ντολμάμπαχτσε, το Μπεϊλέρμπεϊ και το Τσιράγαν στολίζουν τις ακτές με οθωμανική λαμπρότητα." },
          { title: "Δύο ήπειροι", desc: "Η Ευρώπη στη μία όχθη, η Ασία στην άλλη, ενωμένες με τις μεγάλες κρεμαστές γέφυρες." },
          { title: "Γιαλιά & Πύργος της Κόρης", desc: "Ιστορικά ξύλινα παραθαλάσσια αρχοντικά και ο μικρός πύργος που φυλά το στενό." },
        ],
        faqs: [
          { q: "Αξίζει η κρουαζιέρα στον Βόσπορο με ξεναγό;", a: "Από το νερό τα ανάκτορα μπερδεύονται. Ένας ντόπιος ξεναγός ονομάζει το καθένα, λέει την ιστορία του και δείχνει λεπτομέρειες που αλλιώς θα προσπερνούσες." },
          { q: "Ποια είναι η καλύτερη ώρα για πλεύση;", a: "Το ηλιοβασίλεμα είναι εμβληματικό, όταν το φως λάμπει σε ανάκτορα και γέφυρες. Ο ξεναγός σου βοηθά να διαλέξεις την ώρα και το σωστό σκάφος." },
          { q: "Πόσο διαρκεί μια τυπική κρουαζιέρα;", a: "Οι εκδρομές κυμαίνονται από 1,5 έως 3 ώρες, ανάλογα με το πόσο ανεβαίνεις στο στενό, και συνδυάζονται εύκολα με μια βόλτα στην παραλία." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Ο Βόσπορος είναι το θρυλικό στενό που χωρίζει την Κωνσταντινούπολη ανάμεσα στην Ευρώπη και την Ασία, γι' αυτό τον απολαμβάνετε καλύτερα από το νερό. Οι κρουαζιέρες ξεκινούν από αρκετές παραλιακές αποβάθρες, με πιο βολικές το Εμινονού, το Καμπατάς και το Μπεσίκτας, όλες προσβάσιμες με τραμ, φεριμπότ ή με σύντομο περπάτημα από την παλιά πόλη. Από αυτές τις προβλήτες μπορείτε να ενταχθείτε σε προγραμματισμένη κρουαζιέρα ή να επιβιβαστείτε σε ιδιωτικό σκάφος λίγα λεπτά μετά την άφιξή σας.",
          "Υπάρχει σκάφος για κάθε ώρα της ημέρας, αλλά το χρυσό φως του αργά απογεύματος και του ηλιοβασιλέματος είναι η πιο εμβληματική στιγμή για να βρίσκεστε στο κατάστρωμα. Το καλοκαίρι φέρνει ζεστά, ζωντανά βράδια, ενώ η άνοιξη και το φθινόπωρο προσφέρουν καθαρότερο αέρα και λιγότερο κόσμο. Όποια κι αν είναι η εποχή, στο στενό φυσάει και κάνει πιο δροσερά απ' ό,τι στην ακτή, γι' αυτό πάρτε μαζί σας κάτι ελαφρύ και ντυθείτε για τον άνεμο ακόμη και τις ηλιόλουστες μέρες.",
          "Τα δημόσια φεριμπότ είναι φθηνά, συχνά και υπέροχα γραφικά, ενώ τα ιδιωτικά ή τα σκάφη με ξεναγό σας δίνουν ευελιξία σε διαδρομή και ώρα. Στην πορεία γλιστράτε δίπλα από οθωμανικά παλάτια, κομψά παραθαλάσσια αρχοντικά γιαλί, το φρούριο Ρουμελί και τις μεγάλες κρεμαστές γέφυρες. Ένας αδειούχος τοπικός ξεναγός της VibeGuide σας βοηθά να διαλέξετε το κατάλληλο σκάφος για την παρέα σας και ζωντανεύει την ακτογραμμή με τις ιστορίες πίσω από κάθε παλάτι, φρούριο και γειτονιά που προσπερνάτε.",
        ],
        ctaTitle: "Πλεύσε στον Βόσπορο με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Boğaziçi",
        metaTitle: "Boğaziçi Tekne Turları & Yerel Rehberler",
        metaDescription:
          "İstanbul Boğazı'nda doğrulanmış bir yerel rehberle gez. Osmanlı saraylarının, sahildeki yalıların ve Kız Kulesi'nin önünden geç, her kıyının hikâyesini dinle.",
        intro: [
          "Boğaziçi bir kıtayı ikiye bölen boğazdır — Avrupa'yı Asya'dan ayıran, Karadeniz'i Marmara'ya bağlayan kıvrımlı su yolu. Klasik bir tekne turu; Dolmabahçe, Beylerbeyi ve Çırağan gibi Osmanlı saraylarının, yalı denen zarif ahşap sahil konaklarının, adacığındaki Kız Kulesi'nin, Rumeli Hisarı'nın önünden ve büyük asma köprülerin altından süzülür.",
          "Gün batımı turu İstanbul'un ikonik deneyimlerinden biridir ama sudan bakınca bir sarayı diğerinden ayırmak zordur. Teknede bir VibeGuide yerel rehberiyle hangisinin hangisi olduğunu, hangi hikâyenin hangi kıyıya ait olduğunu ve bu su şeridinin bir imparatorluğu neden şekillendirdiğini öğrenirsin.",
        ],
        highlights: [
          { title: "Sudan Saraylar", desc: "Dolmabahçe, Beylerbeyi ve Çırağan Osmanlı ihtişamıyla kıyıları süsler." },
          { title: "İki Kıta", desc: "Bir yakada Avrupa, diğerinde Asya; büyük asma köprülerle birleşir." },
          { title: "Yalılar & Kız Kulesi", desc: "Tarihi ahşap sahil konakları ve boğazı gözleyen küçük kule." },
        ],
        faqs: [
          { q: "Rehberli bir Boğaz turu değer mi?", a: "Sudan bakınca saraylar birbirine karışır. Yerel rehber her birini adlandırır, hikâyesini anlatır ve fark etmeden geçeceğin ayrıntıları gösterir." },
          { q: "Tur için en iyi zaman ne?", a: "Gün batımı ikoniktir; ışık saraylara ve köprülere vururken. Rehberin saati ve doğru tekne türünü seçmene yardım eder." },
          { q: "Tipik bir tur ne kadar sürer?", a: "Boğazda ne kadar yukarı çıktığına göre turlar yaklaşık 1,5 ile 3 saat arasında değişir; sahil yürüyüşüyle kolayca birleşir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Boğaziçi, İstanbul'u Avrupa ve Asya olarak ikiye ayıran efsanevi boğazdır; bu yüzden onu en iyi sudan deneyimlersiniz. Tekne turları birkaç sahil iskelesinden kalkar; en pratikleri Eminönü, Kabataş ve Beşiktaş'tır ve hepsine tramvay, vapur ya da eski şehirden kısa bir yürüyüşle ulaşılır. Bu iskelelerden tarifeli bir tura katılabilir veya varışınızdan birkaç dakika sonra özel bir tekneye binebilirsiniz.",
          "Günün her saati için bir tekne vardır, ancak güvertede olmanın en ikonik zamanı ikindi sonu ve gün batımının altın ışığıdır. Yaz, sıcak ve hareketli akşamlar getirirken ilkbahar ve sonbahar daha berrak bir hava ve daha az kalabalık sunar. Mevsim ne olursa olsun boğaz rüzgârlıdır ve kıyıdan serindir; bu yüzden yanınıza ince bir kat alın ve güneşli günlerde bile rüzgâra göre giyinin.",
          "Şehir hatları vapurları ucuz, sık ve son derece manzaralıdır; özel veya rehberli tekneler ise rota ve zamanlamada esneklik sağlar. Yol boyunca Osmanlı saraylarının, zarif kıyı yalılarının, Rumeli Hisarı'nın ve büyük asma köprülerin önünden süzülürsünüz. Lisanslı bir VibeGuide yerel rehberi grubunuza uygun tekneyi seçmenize yardımcı olur ve geçtiğiniz her sarayın, hisarın ve semtin ardındaki hikâyelerle kıyıyı canlandırır.",
        ],
        ctaTitle: "Boğaziçi'ni bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Il Bosforo",
        metaTitle: "Crociere sul Bosforo con guide locali",
        metaDescription:
          "Naviga il Bosforo a Istanbul con una guida locale verificata. Sfila davanti a palazzi ottomani, yalı sull'acqua e la Torre della Fanciulla, e ascolta la storia di ogni sponda.",
        intro: [
          "Il Bosforo è lo stretto che divide un continente: il canale sinuoso che separa l'Europa dall'Asia e collega il Mar Nero al Mar di Marmara. Una classica crociera scivola davanti a palazzi ottomani come Dolmabahçe, Beylerbeyi e Çırağan, alle eleganti dimore di legno sull'acqua chiamate yalı, alla Torre della Fanciulla sul suo isolotto, alla Fortezza di Rumeli e sotto i grandi ponti sospesi.",
          "La crociera al tramonto è una delle esperienze iconiche di Istanbul, ma dall'acqua è difficile distinguere un palazzo dall'altro. Con un local di VibeGuide a bordo scopri quale sia quale, quale storia appartenga a quale sponda e perché questo nastro d'acqua abbia plasmato un impero.",
        ],
        highlights: [
          { title: "Palazzi dall'acqua", desc: "Dolmabahçe, Beylerbeyi e Çırağan costeggiano le sponde nello splendore ottomano." },
          { title: "Due continenti", desc: "L'Europa su una riva, l'Asia sull'altra, unite dai grandi ponti sospesi." },
          { title: "Yalı e Torre della Fanciulla", desc: "Storiche dimore di legno sull'acqua e la piccola torre che veglia sullo stretto." },
        ],
        faqs: [
          { q: "Vale la pena una crociera sul Bosforo con guida?", a: "Dall'acqua i palazzi si confondono. Una guida locale nomina ciascuno, ne racconta la storia e indica i dettagli che altrimenti supereresti senza notarli." },
          { q: "Qual è il momento migliore per navigare?", a: "Il tramonto è iconico, quando la luce risplende su palazzi e ponti. La tua guida ti aiuta a scegliere l'ora e il tipo di barca giusto." },
          { q: "Quanto dura una crociera tipica?", a: "I tour vanno da circa 1,5 a 3 ore secondo quanto risali lo stretto, facili da abbinare a una passeggiata lungo l'acqua." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Il Bosforo è il leggendario stretto che divide Istanbul tra Europa e Asia, perciò lo si vive al meglio dall'acqua. Le gite in barca partono da diversi moli lungo la riva, i più comodi Eminönü, Kabataş e Beşiktaş, tutti raggiungibili in tram, traghetto o con una breve passeggiata dalla città vecchia. Da questi pontili puoi unirti a una crociera regolare o salire a bordo di una barca privata pochi minuti dopo l'arrivo.",
          "C'è una barca per ogni ora del giorno, ma la luce dorata del tardo pomeriggio e del tramonto è il momento più iconico per stare in coperta. L'estate porta serate calde e vivaci, mentre primavera e autunno offrono un'aria più limpida e meno folla. In qualsiasi stagione lo stretto è ventoso e più fresco della riva, quindi porta uno strato leggero e vestiti per il vento anche nelle giornate di sole.",
          "I traghetti pubblici sono economici, frequenti e splendidamente panoramici, mentre le barche private o guidate ti danno libertà su percorso e orario. Lungo il tragitto scivoli davanti a palazzi ottomani, eleganti dimore yalı sull'acqua, la Fortezza di Rumeli e i grandi ponti sospesi. Una guida locale VibeGuide autorizzata ti aiuta a scegliere la barca giusta per il tuo gruppo e dà vita alla costa con le storie dietro ogni palazzo, fortezza e quartiere che oltrepassi.",
        ],
        ctaTitle: "Naviga il Bosforo con un locale",
        ...IST.it,
      },
      pl: {
        name: "Bosfor",
        metaTitle: "Rejsy po Bosforze z lokalnymi przewodnikami",
        metaDescription:
          "Popłyń po Bosforze w Stambule ze zweryfikowanym lokalnym przewodnikiem. Mijaj osmańskie pałace, nadbrzeżne yalı i Wieżę Panny, i poznaj historię każdego brzegu.",
        intro: [
          "Bosfor to cieśnina, która rozcina kontynent — kręty kanał oddzielający Europę od Azji i łączący Morze Czarne z Morzem Marmara. Klasyczny rejs sunie obok osmańskich pałaców, takich jak Dolmabahçe, Beylerbeyi i Çırağan, obok wdzięcznych drewnianych nadbrzeżnych rezydencji zwanych yalı, Wieży Panny na jej wysepce, Twierdzy Rumeli i pod wielkimi mostami wiszącymi.",
          "Rejs o zachodzie słońca to jedno z ikonicznych przeżyć Stambułu, ale z wody trudno odróżnić jeden pałac od drugiego. Z lokalnym przewodnikiem VibeGuide na pokładzie dowiesz się, który jest który, czyja historia należy do którego brzegu i dlaczego ta wstęga wody ukształtowała imperium.",
        ],
        highlights: [
          { title: "Pałace od strony wody", desc: "Dolmabahçe, Beylerbeyi i Çırağan zdobią brzegi w osmańskim przepychu." },
          { title: "Dwa kontynenty", desc: "Europa na jednym brzegu, Azja na drugim, połączone wielkimi mostami wiszącymi." },
          { title: "Yalı i Wieża Panny", desc: "Historyczne drewniane rezydencje nad wodą i mała wieża strzegąca cieśniny." },
        ],
        faqs: [
          { q: "Czy rejs po Bosforze z przewodnikiem się opłaca?", a: "Z wody pałace się zlewają. Lokalny przewodnik nazwie każdy, opowie jego historię i wskaże szczegóły, które inaczej byś minął." },
          { q: "Kiedy najlepiej płynąć?", a: "Zachód słońca jest ikoniczny, gdy światło rozświetla pałace i mosty. Przewodnik pomoże wybrać godzinę i właściwy rodzaj łodzi." },
          { q: "Ile trwa typowy rejs?", a: "Wycieczki trwają od około 1,5 do 3 godzin, zależnie od tego, jak daleko płyniesz w górę cieśniny, i łatwo łączą się ze spacerem wzdłuż nabrzeża." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Bosfor to owiana legendami cieśnina, która dzieli Stambuł między Europę a Azję, dlatego najlepiej poznać go od strony wody. Rejsy wypływają z kilku nadbrzeżnych przystani, najwygodniej z Eminönü, Kabataş i Beşiktaş, do których dojedziesz tramwajem, promem lub dojdziesz krótkim spacerem ze starego miasta. Z tych pomostów możesz dołączyć do rejsu według rozkładu albo wejść na pokład prywatnej łodzi już kilka minut po przybyciu.",
          "Łódź znajdzie się o każdej porze dnia, ale złote światło późnego popołudnia i zachodu słońca to najbardziej kultowy moment, by być na pokładzie. Lato przynosi ciepłe, tętniące życiem wieczory, a wiosna i jesień oferują czystsze powietrze i mniejsze tłumy. Bez względu na porę roku na cieśninie wieje i jest chłodniej niż na brzegu, więc zabierz lekką warstwę odzieży i ubierz się na wiatr nawet w słoneczne dni.",
          "Promy publiczne są tanie, kursują często i zachwycają widokami, natomiast łodzie prywatne lub z przewodnikiem dają swobodę wyboru trasy i godziny. Po drodze przepływasz obok osmańskich pałaców, eleganckich nadwodnych rezydencji yalı, twierdzy Rumeli i wielkich mostów wiszących. Licencjonowany lokalny przewodnik VibeGuide pomoże ci wybrać odpowiednią łódź dla twojej grupy i ożywi wybrzeże opowieściami kryjącymi się za każdym mijanym pałacem, twierdzą i dzielnicą.",
        ],
        ctaTitle: "Popłyń po Bosforze z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "De Bosporus",
        metaTitle: "Bosporus-cruises & lokale gidsen",
        metaDescription:
          "Vaar over de Bosporus in Istanbul met een geverifieerde lokale gids. Glijd langs Ottomaanse paleizen, yalı's aan het water en de Meisjestoren, en hoor het verhaal van elke oever.",
        intro: [
          "De Bosporus is de zeestraat die een continent splijt — de kronkelende geul die Europa van Azië scheidt en de Zwarte Zee met de Zee van Marmara verbindt. Een klassieke boottocht glijdt langs Ottomaanse paleizen als Dolmabahçe, Beylerbeyi en Çırağan, de sierlijke houten waterkantvilla's die yalı's heten, de Meisjestoren op haar eilandje, het Rumeli-fort en onder de grote hangbruggen door.",
          "De zonsondergangcruise is een van de iconische ervaringen van Istanbul, maar vanaf het water is het ene paleis nauwelijks van het andere te onderscheiden. Met een local van VibeGuide aan boord leer je welk paleis welk is, welk verhaal bij welke oever hoort en waarom dit lint van water een rijk vormgaf.",
        ],
        highlights: [
          { title: "Paleizen vanaf het water", desc: "Dolmabahçe, Beylerbeyi en Çırağan sieren de oevers in Ottomaanse pracht." },
          { title: "Twee continenten", desc: "Europa aan de ene oever, Azië aan de andere, verbonden door de grote hangbruggen." },
          { title: "Yalı's & de Meisjestoren", desc: "Historische houten waterkantvilla's en het torentje dat de zeestraat bewaakt." },
        ],
        faqs: [
          { q: "Is een Bosporus-cruise met gids de moeite waard?", a: "Vanaf het water lopen de paleizen door elkaar. Een lokale gids benoemt elk paleis, vertelt het verhaal en wijst de details aan die je anders voorbij zou varen." },
          { q: "Wanneer kun je het best varen?", a: "De zonsondergang is iconisch, wanneer het licht op paleizen en bruggen gloeit. Je gids helpt je het uur en het juiste type boot te kiezen." },
          { q: "Hoe lang duurt een typische cruise?", a: "Tochten duren zo'n 1,5 tot 3 uur, afhankelijk van hoe ver je de zeestraat op vaart, makkelijk te combineren met een wandeling langs het water." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Bosporus is de befaamde zeestraat die Istanbul tussen Europa en Azië verdeelt, dus je beleeft hem het best vanaf het water. Boottochten vertrekken vanaf verschillende steigers aan het water, het handigst vanaf Eminönü, Kabataş en Beşiktaş, allemaal bereikbaar met de tram, de veerboot of een korte wandeling vanuit de oude stad. Vanaf deze aanlegplaatsen kun je aansluiten bij een geregelde cruise of enkele minuten na aankomst aan boord stappen van een privéboot.",
          "Er is een boot voor elk uur van de dag, maar het gouden licht van de late namiddag en de zonsondergang is het meest iconische moment om aan dek te zijn. De zomer brengt warme, levendige avonden, terwijl de lente en de herfst helderder lucht en minder drukte bieden. In welk seizoen dan ook is het op de zeestraat winderig en koeler dan aan de oever, dus neem een dunne laag mee en kleed je op de wind, zelfs op zonnige dagen.",
          "Openbare veerboten zijn goedkoop, rijden vaak en zijn heerlijk schilderachtig, terwijl privéboten of boten met gids je vrijheid geven over route en tijdstip. Onderweg glijd je langs Ottomaanse paleizen, elegante yalı-villa's aan het water, het fort Rumeli en de grote hangbruggen. Een erkende lokale VibeGuide-gids helpt je de juiste boot voor je gezelschap te kiezen en brengt de kust tot leven met de verhalen achter elk paleis, fort en wijk die je passeert.",
        ],
        ctaTitle: "Vaar over de Bosporus met een local",
        ...IST.nl,
      },
    },
  },
  {
    slug: "aspendos",
    city: "Antalya",
    citySlug: "antalya",
    emoji: "🎭",
    image:
      "https://images.unsplash.com/photo-1674715577456-49ae7a6945a8?q=80&w=1600",
    lat: 36.939,
    lng: 31.172,
    i18n: {
      en: {
        name: "Aspendos",
        metaTitle: "Aspendos Roman Theatre Tours & Local Guides",
        metaDescription:
          "Visit Aspendos near Antalya with a verified local guide. Stand in the best-preserved Roman theatre in the world and hear how its acoustics still work after 1,800 years.",
        intro: [
          "Aspendos is the best-preserved Roman theatre in the world — built in the 2nd century AD under Marcus Aurelius by the architect Zenon, and still able to seat some 15,000 to 20,000 people. Whisper on the stage and the back row hears you: its acoustics remain astonishing after nearly 1,800 years.",
          "With a VibeGuide local expert you don't just look at old stone. You learn how the theatre worked, why it survived intact, and what to notice in the nearby Roman aqueduct — at your pace, in your language, roughly 45 km east of Antalya near Serik.",
        ],
        highlights: [
          { title: "Perfect Acoustics", desc: "A word spoken on stage still reaches the highest tier, no microphone needed." },
          { title: "Intact Roman Design", desc: "The stage building and seating survive almost complete — rare anywhere in the world." },
          { title: "Opera & Ballet Festival", desc: "Each summer the ancient theatre fills again for the Aspendos International Festival." },
        ],
        faqs: [
          { q: "Why is Aspendos so famous?", a: "It's the best-preserved Roman theatre anywhere, and its acoustics still work — a guide shows you exactly where to stand to test them." },
          { q: "How far is Aspendos from Antalya?", a: "About 45 km east, near Serik — an easy day trip your VibeGuide guide can help you plan around the crowds and the heat." },
          { q: "Is there more to see nearby?", a: "Yes — a Roman aqueduct stands close by, and a guide can add it and the surrounding sites to your visit." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Aspendos lies about 45 kilometres east of Antalya in southern Turkey, near the town of Serik. Most visitors arrive by car or on an organised tour from Antalya, making it an easy half-day outing along the Mediterranean coast. The site is best known for its Roman theatre, which rises above the surrounding plain and is reached by a short walk from the car park.",
          "Middays here are hot, especially in summer, so mornings are the best time to explore in relative comfort and softer light. Spring and autumn bring pleasant temperatures and thinner crowds, while summer evenings come alive during the site's opera and ballet festival. Whenever you go, bring water and sun protection, as there is little shade around the ancient stones.",
          "The theatre is ticketed and celebrated as the best-preserved Roman theatre in the world, its stage building and seating remarkably intact. A licensed VibeGuide local guide brings its acoustics and history to life and can pair your visit with nearby ancient sites such as Side and Perge, helping you understand how these cities connected across the Pamphylian plain and making the most of a single day.",
        ],
        ctaTitle: "See Aspendos with a local",
        ...ANT.en,
      },
      de: {
        name: "Aspendos",
        metaTitle: "Aspendos Theater Touren & lokale Guides",
        metaDescription:
          "Besuche Aspendos bei Antalya mit einem geprüften lokalen Guide. Steh im besterhaltenen römischen Theater der Welt und erlebe, wie seine Akustik nach 1.800 Jahren noch wirkt.",
        intro: [
          "Aspendos ist das besterhaltene römische Theater der Welt — im 2. Jahrhundert n. Chr. unter Marc Aurel vom Architekten Zenon erbaut und noch heute für etwa 15.000 bis 20.000 Menschen ausgelegt. Flüstere auf der Bühne, und die hinterste Reihe hört dich: Die Akustik bleibt nach fast 1.800 Jahren verblüffend.",
          "Mit einem lokalen VibeGuide-Experten betrachtest du nicht nur alte Steine. Du erfährst, wie das Theater funktionierte, warum es unversehrt blieb und worauf du beim nahen römischen Aquädukt achten solltest — in deinem Tempo, in deiner Sprache, rund 45 km östlich von Antalya bei Serik.",
        ],
        highlights: [
          { title: "Perfekte Akustik", desc: "Ein Wort auf der Bühne erreicht noch die oberste Reihe, ganz ohne Mikrofon." },
          { title: "Intakte römische Bauweise", desc: "Bühnengebäude und Zuschauerränge sind fast vollständig erhalten — weltweit selten." },
          { title: "Opern- & Ballettfestival", desc: "Jeden Sommer füllt sich das antike Theater beim Internationalen Aspendos-Festival wieder." },
        ],
        faqs: [
          { q: "Warum ist Aspendos so berühmt?", a: "Es ist das besterhaltene römische Theater überhaupt, und seine Akustik wirkt noch — ein Guide zeigt dir genau, wo du das ausprobierst." },
          { q: "Wie weit ist Aspendos von Antalya entfernt?", a: "Etwa 45 km östlich, bei Serik — ein leichter Tagesausflug, den dein VibeGuide-Guide um Menschenmassen und Hitze herum planen hilft." },
          { q: "Gibt es in der Nähe mehr zu sehen?", a: "Ja — ein römisches Aquädukt steht ganz in der Nähe, und ein Guide bindet es und die umliegenden Stätten in deinen Besuch ein." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Aspendos liegt etwa 45 Kilometer oestlich von Antalya im Sueden der Tuerkei, nahe der Stadt Serik. Die meisten Besucher kommen mit dem Auto oder auf einer organisierten Tour von Antalya, was einen unkomplizierten Halbtagesausflug entlang der Mittelmeerkueste ermoeglicht. Beruehmt ist die Staette vor allem fuer ihr roemisches Theater, das sich ueber die umliegende Ebene erhebt und in wenigen Gehminuten vom Parkplatz aus erreichbar ist.",
          "Die Mittagsstunden sind hier heiss, besonders im Sommer, daher ist der Morgen die beste Zeit, um alles bei angenehmerem Klima und weicherem Licht zu erkunden. Fruehling und Herbst bringen milde Temperaturen und weniger Besucher, waehrend die Sommerabende waehrend des Opern- und Ballettfestivals der Staette zum Leben erwachen. Wann immer du kommst, nimm Wasser und Sonnenschutz mit, denn Schatten gibt es kaum.",
          "Das Theater ist kostenpflichtig und gilt als das besterhaltene roemische Theater der Welt, mit erstaunlich intaktem Buehnengebaeude und Zuschauerraengen. Ein lizenzierter VibeGuide-Guide vor Ort erweckt seine Akustik und Geschichte zum Leben und kann deinen Besuch mit nahe gelegenen antiken Staetten wie Side und Perge verbinden, sodass du verstehst, wie diese Staedte in der pamphylischen Ebene zusammenhingen.",
        ],
        ctaTitle: "Erlebe Aspendos mit einem Local",
        ...ANT.de,
      },
      ru: {
        name: "Аспендос",
        metaTitle: "Аспендос: экскурсии с местными гидами",
        metaDescription:
          "Посетите Аспендос под Анталией с проверенным местным гидом. Встаньте в лучше всего сохранившемся римском театре мира и услышьте, как его акустика работает спустя 1800 лет.",
        intro: [
          "Аспендос — лучше всего сохранившийся римский театр в мире. Он построен во II веке н. э. при Марке Аврелии архитектором Зеноном и до сих пор вмещает около 15 000–20 000 человек. Шепните на сцене — и вас услышат в последнем ряду: акустика поражает почти 1800 лет спустя.",
          "С местным экспертом VibeGuide вы не просто смотрите на старые камни. Вы узнаёте, как работал театр, почему он уцелел и на что обратить внимание у соседнего римского акведука — в своём ритме и на своём языке, примерно в 45 км к востоку от Анталии, возле Серика.",
        ],
        highlights: [
          { title: "Идеальная акустика", desc: "Слово со сцены слышно в верхнем ряду — без всякого микрофона." },
          { title: "Цельная римская архитектура", desc: "Сцена и ряды сидений сохранились почти полностью — большая редкость в мире." },
          { title: "Фестиваль оперы и балета", desc: "Каждое лето античный театр вновь наполняется на Международном фестивале в Аспендосе." },
        ],
        faqs: [
          { q: "Чем знаменит Аспендос?", a: "Это лучше всех сохранившийся римский театр, и его акустика по-прежнему работает — гид покажет, где именно встать, чтобы это проверить." },
          { q: "Как далеко Аспендос от Анталии?", a: "Около 45 км к востоку, возле Серика — лёгкая поездка на день, которую гид VibeGuide поможет спланировать в обход толп и жары." },
          { q: "Есть ли что посмотреть рядом?", a: "Да — поблизости стоит римский акведук, и гид добавит его и окрестные памятники к вашему визиту." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Аспендос находится примерно в 45 километрах к востоку от Антальи на юге Турции, рядом с городом Серик. Большинство посетителей приезжают на машине или в составе организованного тура из Антальи, что делает поездку удобной на полдня вдоль средиземноморского побережья. Место прежде всего известно римским театром, который возвышается над окружающей равниной и находится в нескольких минутах ходьбы от парковки.",
          "Полуденные часы здесь жаркие, особенно летом, поэтому утро — лучшее время для осмотра в относительном комфорте и при мягком свете. Весна и осень приносят приятную температуру и меньше туристов, а летними вечерами место оживает во время фестиваля оперы и балета. Когда бы вы ни приехали, возьмите воду и защиту от солнца, ведь тени среди древних камней почти нет.",
          "Театр посещается по билету и славится как наиболее сохранившийся римский театр в мире, с удивительно целыми сценой и зрительскими рядами. Лицензированный местный гид VibeGuide оживит его акустику и историю и может объединить визит с ближайшими античными городами, такими как Сиде и Перге, помогая понять, как эти города были связаны на Памфилийской равнине.",
        ],
        ctaTitle: "Увидеть Аспендос с местным гидом",
        ...ANT.ru,
      },
      ar: {
        name: "أسبندوس",
        metaTitle: "جولات مسرح أسبندوس الروماني مع مرشدين محليين",
        metaDescription:
          "زر أسبندوس قرب أنطاليا مع مرشد محلي موثّق. قف في أفضل مسرح روماني محفوظ في العالم واسمع كيف ما زالت صوتياته تعمل بعد 1800 عام.",
        intro: [
          "أسبندوس هو أفضل مسرح روماني محفوظ في العالم — بُني في القرن الثاني الميلادي في عهد ماركوس أوريليوس على يد المعماري زينون، وما زال يتّسع لنحو 15,000 إلى 20,000 شخص. اهمس على المسرح فيسمعك الصف الأخير: صوتياته تبقى مذهلة بعد نحو 1800 عام.",
          "مع خبير محلي من VibeGuide لا تكتفي بالنظر إلى حجارة قديمة. تتعلّم كيف كان المسرح يعمل، ولماذا بقي سليمًا، وما الذي تلاحظه في القناة المائية الرومانية القريبة — على إيقاعك وبلغتك، على بُعد نحو 45 كم شرق أنطاليا قرب سِريك.",
        ],
        highlights: [
          { title: "صوتيات مثالية", desc: "كلمة تُقال على المسرح تصل إلى أعلى صف دون أي ميكروفون." },
          { title: "تصميم روماني كامل", desc: "بناء المسرح والمدرّجات محفوظان شبه كاملين — أمر نادر في أي مكان بالعالم." },
          { title: "مهرجان الأوبرا والباليه", desc: "كل صيف يمتلئ المسرح القديم من جديد في مهرجان أسبندوس الدولي." },
        ],
        faqs: [
          { q: "لماذا يشتهر أسبندوس؟", a: "إنه أفضل مسرح روماني محفوظ على الإطلاق، وصوتياته ما زالت تعمل — يريك المرشد أين تقف بالضبط لتجربتها." },
          { q: "كم يبعد أسبندوس عن أنطاليا؟", a: "نحو 45 كم شرقًا قرب سِريك — رحلة يوم سهلة يساعدك مرشد VibeGuide على تنظيمها بعيدًا عن الزحام والحر." },
          { q: "هل هناك ما يُشاهد في الجوار؟", a: "نعم — تقف قناة مائية رومانية قريبة، ويمكن للمرشد أن يضيفها والمواقع المحيطة إلى زيارتك." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "تقع أسبندوس على بُعد نحو 45 كيلومترًا شرق أنطاليا جنوب تركيا، بالقرب من بلدة سيريك. يصل معظم الزوار بالسيارة أو ضمن جولة منظمة من أنطاليا، مما يجعلها نزهة سهلة لنصف يوم على طول ساحل البحر المتوسط. يشتهر الموقع قبل كل شيء بمسرحه الروماني الذي يرتفع فوق السهل المحيط ويمكن الوصول إليه بمشي قصير من موقف السيارات.",
          "تكون ساعات الظهيرة هنا حارة، خاصة في الصيف، لذا فالصباح هو أفضل وقت للاستكشاف براحة نسبية وضوء أنعم. يجلب الربيع والخريف درجات حرارة لطيفة وازدحامًا أقل، بينما تنبض أمسيات الصيف بالحياة خلال مهرجان الأوبرا والباليه في الموقع. في أي وقت تزور، احمل الماء وواقيًا من الشمس، فالظل نادر بين الأحجار القديمة.",
          "يتطلب المسرح تذكرة دخول ويُحتفى به بوصفه أفضل مسرح روماني محفوظ في العالم، ببنية مسرحه ومدرجاته السليمة بشكل مذهل. يبعث مرشد VibeGuide المحلي المرخّص الحياة في صوتياته وتاريخه، ويمكنه أن يضم إلى زيارتك مواقع أثرية قريبة مثل سيدي وبيرغه، مساعدًا إياك على فهم كيف ارتبطت هذه المدن عبر سهل بامفيليا.",
        ],
        ctaTitle: "زر أسبندوس مع مرشد محلي",
        ...ANT.ar,
      },
      es: {
        name: "Aspendos",
        metaTitle: "Tours del Teatro Romano de Aspendos con guías locales",
        metaDescription:
          "Visita Aspendos cerca de Antalya con un guía local verificado. Ponte de pie en el teatro romano mejor conservado del mundo y escucha cómo su acústica aún funciona tras 1.800 años.",
        intro: [
          "Aspendos es el teatro romano mejor conservado del mundo — construido en el siglo II d. C. bajo Marco Aurelio por el arquitecto Zenón, y aún con capacidad para unas 15.000 a 20.000 personas. Susurra en el escenario y la última fila te oye: su acústica sigue asombrando casi 1.800 años después.",
          "Con un experto local de VibeGuide no solo miras piedras antiguas. Aprendes cómo funcionaba el teatro, por qué sobrevivió intacto y qué observar en el cercano acueducto romano — a tu ritmo y en tu idioma, a unos 45 km al este de Antalya, junto a Serik.",
        ],
        highlights: [
          { title: "Acústica perfecta", desc: "Una palabra dicha en el escenario llega a la grada más alta, sin micrófono." },
          { title: "Diseño romano intacto", desc: "El edificio escénico y las gradas se conservan casi completos — algo raro en el mundo." },
          { title: "Festival de Ópera y Ballet", desc: "Cada verano el teatro antiguo se llena de nuevo en el Festival Internacional de Aspendos." },
        ],
        faqs: [
          { q: "¿Por qué es tan famoso Aspendos?", a: "Es el teatro romano mejor conservado que existe, y su acústica aún funciona — un guía te muestra exactamente dónde ponerte para comprobarla." },
          { q: "¿A qué distancia está Aspendos de Antalya?", a: "A unos 45 km al este, junto a Serik — una excursión fácil de un día que tu guía de VibeGuide te ayuda a planear evitando el gentío y el calor." },
          { q: "¿Hay más que ver cerca?", a: "Sí — un acueducto romano se alza muy cerca, y un guía puede añadirlo junto con los sitios de alrededor a tu visita." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Aspendos se encuentra a unos 45 kilometros al este de Antalya, en el sur de Turquia, cerca de la localidad de Serik. La mayoria de los visitantes llegan en coche o en una excursion organizada desde Antalya, lo que la convierte en una salida comoda de medio dia por la costa mediterranea. El lugar es conocido sobre todo por su teatro romano, que se alza sobre la llanura circundante y se alcanza con un breve paseo desde el aparcamiento.",
          "El mediodia aqui es caluroso, sobre todo en verano, por lo que la manana es el mejor momento para explorar con relativa comodidad y una luz mas suave. La primavera y el otono traen temperaturas agradables y menos gente, mientras que las noches de verano cobran vida durante el festival de opera y ballet del recinto. Vayas cuando vayas, lleva agua y proteccion solar, pues apenas hay sombra.",
          "El teatro requiere entrada y es celebre por ser el teatro romano mejor conservado del mundo, con su escenario y sus gradas asombrosamente intactos. Un guia local titulado de VibeGuide da vida a su acustica y su historia, y puede combinar tu visita con yacimientos antiguos cercanos como Side y Perge, ayudandote a entender como se conectaban estas ciudades por la llanura de Panfilia.",
        ],
        ctaTitle: "Visita Aspendos con un local",
        ...ANT.es,
      },
      fr: {
        name: "Aspendos",
        metaTitle: "Visites du théâtre romain d'Aspendos avec guides locaux",
        metaDescription:
          "Visitez Aspendos près d'Antalya avec un guide local vérifié. Tenez-vous dans le théâtre romain le mieux conservé du monde et écoutez son acoustique fonctionner encore après 1 800 ans.",
        intro: [
          "Aspendos est le théâtre romain le mieux conservé du monde — construit au IIe siècle apr. J.-C. sous Marc Aurèle par l'architecte Zénon, et pouvant encore accueillir quelque 15 000 à 20 000 personnes. Chuchotez sur la scène et le dernier rang vous entend : l'acoustique reste stupéfiante près de 1 800 ans plus tard.",
          "Avec un expert local VibeGuide, vous ne regardez pas seulement de vieilles pierres. Vous comprenez comment le théâtre fonctionnait, pourquoi il a survécu intact et quoi observer sur l'aqueduc romain voisin — à votre rythme et dans votre langue, à environ 45 km à l'est d'Antalya, près de Serik.",
        ],
        highlights: [
          { title: "Acoustique parfaite", desc: "Un mot dit sur scène atteint encore le gradin le plus haut, sans micro." },
          { title: "Architecture romaine intacte", desc: "Le mur de scène et les gradins subsistent presque entiers — chose rare au monde." },
          { title: "Festival d'opéra et de ballet", desc: "Chaque été, le théâtre antique se remplit à nouveau pour le Festival international d'Aspendos." },
        ],
        faqs: [
          { q: "Pourquoi Aspendos est-il si célèbre ?", a: "C'est le théâtre romain le mieux conservé qui soit, et son acoustique fonctionne toujours — un guide vous montre exactement où vous placer pour l'essayer." },
          { q: "À quelle distance Aspendos est-il d'Antalya ?", a: "Environ 45 km à l'est, près de Serik — une excursion facile à la journée que votre guide VibeGuide vous aide à planifier en évitant la foule et la chaleur." },
          { q: "Y a-t-il autre chose à voir à proximité ?", a: "Oui — un aqueduc romain se dresse tout près, et un guide peut l'ajouter avec les sites alentour à votre visite." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Aspendos se trouve a environ 45 kilometres a l'est d'Antalya, dans le sud de la Turquie, pres de la ville de Serik. La plupart des visiteurs arrivent en voiture ou lors d'une excursion organisee depuis Antalya, ce qui en fait une sortie facile d'une demi-journee le long de la cote mediterraneenne. Le site est surtout connu pour son theatre romain, qui domine la plaine environnante et s'atteint par une courte marche depuis le parking.",
          "Les heures de midi y sont chaudes, surtout en ete, si bien que le matin est le meilleur moment pour explorer dans un confort relatif et une lumiere plus douce. Le printemps et l'automne offrent des temperatures agreables et moins de monde, tandis que les soirees d'ete s'animent lors du festival d'opera et de ballet du site. Quel que soit le moment, emportez de l'eau et une protection solaire, car l'ombre est rare.",
          "Le theatre est payant et repute comme le theatre romain le mieux conserve au monde, avec son mur de scene et ses gradins remarquablement intacts. Un guide local agree VibeGuide fait revivre son acoustique et son histoire, et peut associer votre visite a des sites antiques voisins comme Side et Perge, vous aidant a comprendre comment ces cites etaient reliees a travers la plaine de Pamphylie.",
        ],
        ctaTitle: "Découvrez Aspendos avec un local",
        ...ANT.fr,
      },
      el: {
        name: "Άσπενδος",
        metaTitle: "Ξεναγήσεις στο Ρωμαϊκό Θέατρο της Ασπένδου με ντόπιους ξεναγούς",
        metaDescription:
          "Επισκέψου την Άσπενδο κοντά στην Αττάλεια με πιστοποιημένο ντόπιο ξεναγό. Στάσου στο καλύτερα διατηρημένο ρωμαϊκό θέατρο του κόσμου και άκου την ακουστική του να λειτουργεί μετά από 1.800 χρόνια.",
        intro: [
          "Η Άσπενδος είναι το καλύτερα διατηρημένο ρωμαϊκό θέατρο του κόσμου — χτισμένο τον 2ο αιώνα μ.Χ. επί Μάρκου Αυρηλίου από τον αρχιτέκτονα Ζήνωνα, και ακόμη χωρά περίπου 15.000 έως 20.000 θεατές. Ψιθύρισε στη σκηνή και σε ακούει η τελευταία σειρά: η ακουστική παραμένει εκπληκτική σχεδόν 1.800 χρόνια μετά.",
          "Με έναν ντόπιο ειδικό του VibeGuide δεν κοιτάς απλώς παλιές πέτρες. Μαθαίνεις πώς λειτουργούσε το θέατρο, γιατί σώθηκε ακέραιο και τι να προσέξεις στο κοντινό ρωμαϊκό υδραγωγείο — με τον δικό σου ρυθμό, στη γλώσσα σου, περίπου 45 χλμ. ανατολικά της Αττάλειας, κοντά στο Σέρικ.",
        ],
        highlights: [
          { title: "Τέλεια ακουστική", desc: "Μια λέξη στη σκηνή φτάνει ως την ψηλότερη σειρά, χωρίς μικρόφωνο." },
          { title: "Ακέραιη ρωμαϊκή αρχιτεκτονική", desc: "Το κτίριο της σκηνής και τα εδώλια σώζονται σχεδόν πλήρη — σπάνιο οπουδήποτε στον κόσμο." },
          { title: "Φεστιβάλ όπερας και μπαλέτου", desc: "Κάθε καλοκαίρι το αρχαίο θέατρο ξαναγεμίζει για το Διεθνές Φεστιβάλ Ασπένδου." },
        ],
        faqs: [
          { q: "Γιατί είναι τόσο διάσημη η Άσπενδος;", a: "Είναι το καλύτερα διατηρημένο ρωμαϊκό θέατρο που υπάρχει, και η ακουστική του δουλεύει ακόμη — ένας ξεναγός σου δείχνει ακριβώς πού να σταθείς για να τη δοκιμάσεις." },
          { q: "Πόσο απέχει η Άσπενδος από την Αττάλεια;", a: "Περίπου 45 χλμ. ανατολικά, κοντά στο Σέρικ — μια εύκολη ημερήσια εκδρομή που ο ξεναγός VibeGuide σε βοηθά να οργανώσεις μακριά από τον συνωστισμό και τη ζέστη." },
          { q: "Υπάρχει κάτι άλλο να δεις εκεί κοντά;", a: "Ναι — ένα ρωμαϊκό υδραγωγείο στέκει πολύ κοντά, και ένας ξεναγός μπορεί να το προσθέσει μαζί με τους γύρω χώρους στην επίσκεψή σου." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Η Άσπενδος βρίσκεται περίπου 45 χιλιόμετρα ανατολικά της Αττάλειας, στη νότια Τουρκία, κοντά στην πόλη Σέρικ. Οι περισσότεροι επισκέπτες φτάνουν με αυτοκίνητο ή με οργανωμένη εκδρομή από την Αττάλεια, κάτι που την καθιστά μια εύκολη ημιήμερη εξόρμηση κατά μήκος της μεσογειακής ακτής. Ο χώρος είναι κυρίως γνωστός για το ρωμαϊκό του θέατρο, που υψώνεται πάνω από τη γύρω πεδιάδα και προσεγγίζεται με σύντομο περπάτημα από το πάρκινγκ.",
          "Οι μεσημεριανές ώρες εδώ είναι ζεστές, ειδικά το καλοκαίρι, οπότε το πρωί είναι η καλύτερη στιγμή για εξερεύνηση με σχετική άνεση και απαλότερο φως. Η άνοιξη και το φθινόπωρο φέρνουν ευχάριστες θερμοκρασίες και λιγότερο κόσμο, ενώ τα καλοκαιρινά βράδια ζωντανεύουν κατά τη διάρκεια του φεστιβάλ όπερας και μπαλέτου. Όποτε κι αν πάτε, πάρτε νερό και αντηλιακή προστασία, καθώς η σκιά είναι λιγοστή.",
          "Το θέατρο απαιτεί εισιτήριο και φημίζεται ως το καλύτερα διατηρημένο ρωμαϊκό θέατρο στον κόσμο, με το κτίριο της σκηνής και τα εδώλια εκπληκτικά ακέραια. Ένας αδειούχος τοπικός ξεναγός της VibeGuide ζωντανεύει την ακουστική και την ιστορία του και μπορεί να συνδυάσει την επίσκεψή σας με κοντινούς αρχαίους χώρους όπως η Σίδη και η Πέργη, βοηθώντας σας να καταλάβετε πώς συνδέονταν αυτές οι πόλεις στην πεδιάδα της Παμφυλίας.",
        ],
        ctaTitle: "Δες την Άσπενδο με έναν ντόπιο",
        ...ANT.el,
      },
      tr: {
        name: "Aspendos",
        metaTitle: "Aspendos Antik Tiyatrosu Turları & Yerel Rehberler",
        metaDescription:
          "Antalya yakınındaki Aspendos'u doğrulanmış bir yerel rehberle gez. Dünyanın en iyi korunmuş Roma tiyatrosunda dur ve 1.800 yıl sonra hâlâ işleyen akustiğini dinle.",
        intro: [
          "Aspendos dünyanın en iyi korunmuş Roma tiyatrosudur — MS 2. yüzyılda Marcus Aurelius döneminde mimar Zenon tarafından yapıldı ve hâlâ yaklaşık 15.000–20.000 kişi alabiliyor. Sahnede fısılda, en arka sıra seni duysun: akustiği neredeyse 1.800 yıl sonra bile hayret verici.",
          "VibeGuide yerel uzmanıyla yalnızca eski taşlara bakmazsın. Tiyatronun nasıl çalıştığını, neden sağlam kaldığını ve yakındaki Roma su kemerinde neye dikkat edeceğini öğrenirsin — kendi temponda, kendi dilinde, Antalya'nın yaklaşık 45 km doğusunda, Serik yakınında.",
        ],
        highlights: [
          { title: "Kusursuz Akustik", desc: "Sahnede söylenen bir söz en üst sıraya ulaşır, mikrofona gerek yok." },
          { title: "Bozulmamış Roma Tasarımı", desc: "Sahne binası ve oturma sıraları neredeyse eksiksiz durur — dünyada nadir." },
          { title: "Opera ve Bale Festivali", desc: "Her yaz antik tiyatro, Uluslararası Aspendos Festivali'yle yeniden dolar." },
        ],
        faqs: [
          { q: "Aspendos neden bu kadar ünlü?", a: "Var olan en iyi korunmuş Roma tiyatrosudur ve akustiği hâlâ çalışır — rehber, denemek için tam olarak nerede duracağını gösterir." },
          { q: "Aspendos Antalya'ya ne kadar uzak?", a: "Serik yakınında, yaklaşık 45 km doğuda — VibeGuide rehberinin kalabalık ve sıcaktan kaçınarak planlamana yardım ettiği kolay bir günübirlik gezi." },
          { q: "Yakınlarda görülecek başka yer var mı?", a: "Evet — hemen yakında bir Roma su kemeri var; rehber onu ve çevredeki yerleri ziyaretine ekleyebilir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Aspendos, Türkiye'nin güneyinde Antalya'nın yaklaşık 45 kilometre doğusunda, Serik ilçesi yakınında yer alır. Çoğu ziyaretçi Antalya'dan arabayla ya da düzenli bir turla gelir; bu da onu Akdeniz kıyısı boyunca kolay bir yarım günlük gezi haline getirir. Sit alanı en çok, çevredeki ovanın üzerinde yükselen ve otoparktan kısa bir yürüyüşle ulaşılan Roma tiyatrosuyla tanınır.",
          "Buradaki öğle saatleri, özellikle yazın sıcaktır; bu yüzden sabah, göreceli bir rahatlık ve daha yumuşak ışıkla gezmek için en iyi zamandır. İlkbahar ve sonbahar hoş sıcaklıklar ve daha az kalabalık getirir; yaz akşamları ise sit alanındaki opera ve bale festivaliyle canlanır. Ne zaman giderseniz gidin, yanınıza su ve güneş koruması alın, çünkü antik taşların çevresinde pek gölge yoktur.",
          "Tiyatro biletlidir ve dünyanın en iyi korunmuş Roma tiyatrosu olarak ünlüdür; sahne binası ve oturma sıraları şaşırtıcı ölçüde sağlamdır. Ruhsatlı bir yerel VibeGuide rehberi, tiyatronun akustiğini ve tarihini canlandırır ve ziyaretinizi Side ve Perge gibi yakındaki antik kentlerle birleştirerek bu kentlerin Pamfilya ovasında nasıl bağlandığını anlamanıza yardımcı olur.",
        ],
        ctaTitle: "Aspendos'u bir yerelle gez",
        ...ANT.tr,
      },
      it: {
        name: "Aspendos",
        metaTitle: "Tour del Teatro Romano di Aspendos con guide locali",
        metaDescription:
          "Visita Aspendos vicino ad Antalya con una guida locale verificata. Entra nel teatro romano meglio conservato al mondo e ascolta la sua acustica funzionare ancora dopo 1.800 anni.",
        intro: [
          "Aspendos è il teatro romano meglio conservato al mondo — costruito nel II secolo d.C. sotto Marco Aurelio dall'architetto Zenone, e ancora capace di ospitare circa 15.000-20.000 persone. Sussurra sul palco e l'ultima fila ti sente: la sua acustica resta sbalorditiva quasi 1.800 anni dopo.",
          "Con un esperto locale di VibeGuide non guardi soltanto vecchie pietre. Scopri come funzionava il teatro, perché è sopravvissuto intatto e cosa notare nel vicino acquedotto romano — al tuo ritmo e nella tua lingua, a circa 45 km a est di Antalya, presso Serik.",
        ],
        highlights: [
          { title: "Acustica perfetta", desc: "Una parola detta sul palco raggiunge ancora l'ultima gradinata, senza microfono." },
          { title: "Struttura romana intatta", desc: "L'edificio scenico e le gradinate si conservano quasi completi — cosa rara al mondo." },
          { title: "Festival di Opera e Balletto", desc: "Ogni estate l'antico teatro torna a riempirsi per il Festival Internazionale di Aspendos." },
        ],
        faqs: [
          { q: "Perché Aspendos è così famoso?", a: "È il teatro romano meglio conservato che esista, e la sua acustica funziona ancora — una guida ti mostra esattamente dove metterti per provarla." },
          { q: "Quanto dista Aspendos da Antalya?", a: "Circa 45 km a est, presso Serik — una facile gita in giornata che la tua guida VibeGuide ti aiuta a organizzare evitando folla e caldo." },
          { q: "C'è altro da vedere nei dintorni?", a: "Sì — un acquedotto romano si erge lì vicino, e una guida può aggiungerlo con i siti circostanti alla tua visita." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Aspendos si trova a circa 45 chilometri a est di Antalya, nel sud della Turchia, vicino alla cittadina di Serik. La maggior parte dei visitatori arriva in auto o con un tour organizzato da Antalya, il che ne fa una comoda gita di mezza giornata lungo la costa mediterranea. Il sito e noto soprattutto per il suo teatro romano, che si erge sopra la pianura circostante e si raggiunge con una breve passeggiata dal parcheggio.",
          "Le ore centrali qui sono calde, soprattutto d'estate, quindi la mattina e il momento migliore per esplorare con relativa comodita e una luce piu morbida. Primavera e autunno portano temperature gradevoli e meno gente, mentre le sere d'estate si animano durante il festival di opera e balletto del sito. In qualsiasi momento tu vada, porta acqua e protezione solare, perche l'ombra e scarsa.",
          "Il teatro e a pagamento ed e celebrato come il teatro romano meglio conservato al mondo, con l'edificio scenico e la cavea straordinariamente intatti. Una guida locale abilitata VibeGuide da vita alla sua acustica e alla sua storia e puo abbinare la visita a siti antichi vicini come Side e Perge, aiutandoti a capire come queste citta fossero collegate attraverso la pianura della Panfilia.",
        ],
        ctaTitle: "Scopri Aspendos con un locale",
        ...ANT.it,
      },
      pl: {
        name: "Aspendos",
        metaTitle: "Aspendos — teatr rzymski, wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Aspendos koło Antalyi z zweryfikowanym lokalnym przewodnikiem. Stań w najlepiej zachowanym teatrze rzymskim świata i usłysz, jak jego akustyka działa po 1800 latach.",
        intro: [
          "Aspendos to najlepiej zachowany teatr rzymski na świecie — wzniesiony w II wieku n.e. za Marka Aureliusza przez architekta Zenona i wciąż mieszczący około 15 000–20 000 widzów. Szepnij na scenie, a usłyszy cię ostatni rząd: akustyka pozostaje zdumiewająca po niemal 1800 latach.",
          "Z lokalnym ekspertem VibeGuide nie patrzysz tylko na stare kamienie. Dowiadujesz się, jak działał teatr, dlaczego przetrwał w całości i na co zwrócić uwagę przy pobliskim rzymskim akwedukcie — we własnym tempie i w swoim języku, około 45 km na wschód od Antalyi, koło Serik.",
        ],
        highlights: [
          { title: "Idealna akustyka", desc: "Słowo wypowiedziane na scenie dociera do najwyższego rzędu, bez mikrofonu." },
          { title: "Nienaruszona rzymska konstrukcja", desc: "Budynek sceny i widownia zachowały się niemal w całości — rzadkość na świecie." },
          { title: "Festiwal opery i baletu", desc: "Każdego lata antyczny teatr znów się zapełnia podczas Międzynarodowego Festiwalu w Aspendos." },
        ],
        faqs: [
          { q: "Dlaczego Aspendos jest tak sławny?", a: "To najlepiej zachowany teatr rzymski, jaki istnieje, a jego akustyka wciąż działa — przewodnik pokaże ci dokładnie, gdzie stanąć, by ją sprawdzić." },
          { q: "Jak daleko jest Aspendos od Antalyi?", a: "Około 45 km na wschód, koło Serik — łatwa jednodniowa wycieczka, którą przewodnik VibeGuide pomoże zaplanować z dala od tłumów i upału." },
          { q: "Czy w pobliżu jest coś jeszcze do zobaczenia?", a: "Tak — tuż obok stoi rzymski akwedukt, a przewodnik może dołączyć go wraz z okolicznymi zabytkami do twojej wizyty." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Aspendos leży około 45 kilometrów na wschód od Antalyi na południu Turcji, w pobliżu miasteczka Serik. Większość odwiedzających przybywa samochodem lub w ramach zorganizowanej wycieczki z Antalyi, co czyni je łatwą półdniową wyprawą wzdłuż wybrzeża Morza Śródziemnego. Miejsce znane jest przede wszystkim z rzymskiego teatru, który wznosi się nad okoliczną równiną i do którego dochodzi się krótkim spacerem z parkingu.",
          "Południe bywa tu upalne, zwłaszcza latem, dlatego poranek to najlepsza pora na zwiedzanie w względnym komforcie i łagodniejszym świetle. Wiosna i jesień przynoszą przyjemne temperatury i mniejsze tłumy, a letnie wieczory ożywają podczas festiwalu opery i baletu. Kiedykolwiek się wybierzesz, zabierz wodę i ochronę przeciwsłoneczną, bo wśród starożytnych kamieni jest niewiele cienia.",
          "Teatr jest biletowany i słynie jako najlepiej zachowany rzymski teatr na świecie, z zadziwiająco nienaruszoną sceną i widownią. Licencjonowany lokalny przewodnik VibeGuide ożywia jego akustykę i historię oraz może połączyć twoją wizytę z pobliskimi starożytnymi stanowiskami, takimi jak Side i Perge, pomagając zrozumieć, jak miasta te łączyły się na równinie pamfilijskiej.",
        ],
        ctaTitle: "Zobacz Aspendos z lokalnym przewodnikiem",
        ...ANT.pl,
      },
      nl: {
        name: "Aspendos",
        metaTitle: "Aspendos Romeins Theater-tours & lokale gidsen",
        metaDescription:
          "Bezoek Aspendos bij Antalya met een geverifieerde lokale gids. Sta in het best bewaarde Romeinse theater ter wereld en hoor hoe de akoestiek na 1.800 jaar nog werkt.",
        intro: [
          "Aspendos is het best bewaarde Romeinse theater ter wereld — gebouwd in de 2e eeuw n.Chr. onder Marcus Aurelius door architect Zenon, en nog altijd geschikt voor zo'n 15.000 tot 20.000 mensen. Fluister op het toneel en de achterste rij hoort je: de akoestiek blijft na bijna 1.800 jaar verbluffend.",
          "Met een lokale VibeGuide-expert kijk je niet alleen naar oude stenen. Je leert hoe het theater werkte, waarom het gaaf bleef en waar je op moet letten bij het nabije Romeinse aquaduct — in jouw tempo en in jouw taal, ongeveer 45 km ten oosten van Antalya, bij Serik.",
        ],
        highlights: [
          { title: "Perfecte akoestiek", desc: "Een woord op het toneel bereikt nog de bovenste rij, zonder microfoon." },
          { title: "Gaaf Romeins ontwerp", desc: "Het toneelgebouw en de tribunes zijn bijna compleet bewaard — zeldzaam waar ook ter wereld." },
          { title: "Opera- & balletfestival", desc: "Elke zomer stroomt het antieke theater weer vol voor het Internationale Aspendos-festival." },
        ],
        faqs: [
          { q: "Waarom is Aspendos zo beroemd?", a: "Het is het best bewaarde Romeinse theater dat er is, en de akoestiek werkt nog — een gids laat je precies zien waar je moet staan om het te testen." },
          { q: "Hoe ver is Aspendos van Antalya?", a: "Ongeveer 45 km naar het oosten, bij Serik — een makkelijke dagtrip die je VibeGuide-gids helpt plannen buiten de drukte en de hitte om." },
          { q: "Is er in de buurt meer te zien?", a: "Ja — vlakbij staat een Romeins aquaduct, en een gids kan het samen met de omliggende plekken aan je bezoek toevoegen." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Aspendos ligt ongeveer 45 kilometer ten oosten van Antalya in het zuiden van Turkije, nabij het stadje Serik. De meeste bezoekers komen met de auto of op een georganiseerde tour vanuit Antalya, waardoor het een makkelijk uitstapje van een halve dag langs de mediterrane kust is. De site staat vooral bekend om zijn Romeinse theater, dat boven de omringende vlakte uitrijst en met een korte wandeling vanaf de parkeerplaats te bereiken is.",
          "De middaguren zijn hier heet, vooral in de zomer, dus de ochtend is de beste tijd om alles met relatief comfort en zachter licht te verkennen. Lente en herfst brengen aangename temperaturen en minder drukte, terwijl de zomeravonden tot leven komen tijdens het opera- en balletfestival van de site. Wanneer je ook gaat, neem water en zonbescherming mee, want er is weinig schaduw.",
          "Het theater is tegen betaling en wordt geroemd als het best bewaarde Romeinse theater ter wereld, met een opmerkelijk gaaf toneelgebouw en gestoelte. Een erkende lokale VibeGuide-gids brengt de akoestiek en geschiedenis tot leven en kan je bezoek combineren met nabijgelegen antieke sites zoals Side en Perge, zodat je begrijpt hoe deze steden met elkaar verbonden waren over de vlakte van Pamphylie.",
        ],
        ctaTitle: "Bezoek Aspendos met een local",
        ...ANT.nl,
      },
    },
  },
  {
    slug: "kaleici",
    city: "Antalya",
    citySlug: "antalya",
    emoji: "🏘️",
    image:
      "https://images.unsplash.com/photo-1690098520669-aa8bf6889a0a?q=80&w=1600",
    lat: 36.8841,
    lng: 30.7056,
    i18n: {
      en: {
        name: "Kaleiçi (Old Town)",
        metaTitle: "Kaleiçi Antalya Old Town Tours & Local Guides",
        metaDescription:
          "Wander Kaleiçi, Antalya's old town, with a verified local guide. Cobbled Ottoman lanes, Hadrian's Gate and a Roman harbour — the stories behind every corner.",
        intro: [
          "Kaleiçi is Antalya's atmospheric old town — a maze of cobbled lanes lined with restored Ottoman-Greek houses, boutique hotels and cafés, all wrapped around a Roman-era harbour. It's the kind of place where every archway hides a story.",
          "With a VibeGuide local expert you don't just wander and hope. Walk through Hadrian's Gate, look up at the fluted Yivli Minaret, watch the sun set from Hıdırlık Tower and end with a boat trip from the old marina — at your pace, in your language.",
        ],
        highlights: [
          { title: "Hadrian's Gate", desc: "A triple marble arch built in 130 AD for Emperor Hadrian's visit to the city." },
          { title: "Yivli Minaret", desc: "The fluted brick minaret that has become the symbol of Antalya's skyline." },
          { title: "The Roman Harbour", desc: "The old marina below the walls — perfect for a sunset boat trip." },
        ],
        faqs: [
          { q: "What is there to do in Kaleiçi?", a: "Walk the Ottoman lanes, see Hadrian's Gate and Hıdırlık Tower, then take a harbour boat trip — a local guide ties it all into one easy route." },
          { q: "Is Kaleiçi walkable?", a: "Yes, it's compact and best explored on foot; a guide keeps you off the tourist-trap streets and onto the beautiful ones." },
          { q: "When is the best time to visit?", a: "Late afternoon into sunset is magical, especially from Hıdırlık Tower — your VibeGuide guide can time it perfectly." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Kaleici is Antalya's historic old town, tucked between the modern city and the sea. The easiest way in is the Antray tram, stepping off at the Ismetpasa or Kaleici stops, or simply walking down from the centre. Once you pass through Hadrian's Gate the streets turn to cobblestones and cars fall away, so the whole quarter is best explored slowly on foot.",
          "The old town rewards an unhurried visit in the late afternoon, when the light softens over the Roman harbour and the lanes glow golden. Sunset from Hidirlik Tower or the harbour wall is a local favourite. Summer middays can be hot and busy, so mornings and evenings are kinder; spring and autumn bring gentler temperatures and thinner crowds throughout the day.",
          "Wandering Kaleici's cobbled lanes is free, and there is no single gate or ticket to enter the quarter itself. You can stroll past the Yivli Minaret, the old harbour and the Ottoman houses at your own pace, and a boat trip from the marina makes a lovely add-on. A licensed VibeGuide local guide brings the hidden courtyards and back streets to life with the stories behind them.",
        ],
        ctaTitle: "Explore Kaleiçi with a local",
        ...ANT.en,
      },
      de: {
        name: "Kaleiçi (Altstadt)",
        metaTitle: "Kaleiçi Antalya Altstadt Touren & lokale Guides",
        metaDescription:
          "Erkunde Kaleiçi, die Altstadt von Antalya, mit einem geprüften lokalen Guide. Osmanische Kopfsteingassen, das Hadrianstor und ein römischer Hafen — die Geschichten hinter jeder Ecke.",
        intro: [
          "Kaleiçi ist die stimmungsvolle Altstadt von Antalya — ein Labyrinth aus Kopfsteingassen mit restaurierten osmanisch-griechischen Häusern, Boutique-Hotels und Cafés, alles rund um einen römischen Hafen. Ein Ort, an dem jeder Torbogen eine Geschichte verbirgt.",
          "Mit einem lokalen VibeGuide-Experten schlenderst du nicht nur auf gut Glück. Geh durch das Hadrianstor, blick hinauf zum kannelierten Yivli-Minarett, sieh den Sonnenuntergang vom Hıdırlık-Turm und schließe mit einer Bootsfahrt vom alten Hafen ab — in deinem Tempo, in deiner Sprache.",
        ],
        highlights: [
          { title: "Das Hadrianstor", desc: "Ein dreifacher Marmorbogen, 130 n. Chr. zum Besuch von Kaiser Hadrian errichtet." },
          { title: "Yivli-Minarett", desc: "Das kannelierte Ziegelminarett, zum Wahrzeichen der Silhouette von Antalya geworden." },
          { title: "Der römische Hafen", desc: "Der alte Hafen unter den Mauern — ideal für eine Bootsfahrt zum Sonnenuntergang." },
        ],
        faqs: [
          { q: "Was kann man in Kaleiçi unternehmen?", a: "Durch die osmanischen Gassen gehen, das Hadrianstor und den Hıdırlık-Turm sehen, dann eine Hafenrundfahrt machen — ein lokaler Guide fügt alles zu einer leichten Route zusammen." },
          { q: "Kann man Kaleiçi zu Fuß erkunden?", a: "Ja, es ist kompakt und zu Fuß am schönsten; ein Guide hält dich fern von Touristenfallen und führt dich zu den schönen Ecken." },
          { q: "Wann besucht man Kaleiçi am besten?", a: "Der späte Nachmittag bis zum Sonnenuntergang ist magisch, besonders vom Hıdırlık-Turm — dein VibeGuide-Guide plant den perfekten Zeitpunkt." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Kaleici ist die historische Altstadt von Antalya, eingebettet zwischen der modernen Stadt und dem Meer. Am einfachsten kommst du mit der Antray-Tram an, aussteigen an den Haltestellen Ismetpasa oder Kaleici, oder du laeufst einfach vom Zentrum hinunter. Sobald du durch das Hadrianstor trittst, wird das Pflaster kopfsteinig und die Autos verschwinden, sodass sich das ganze Viertel am besten gemuetlich zu Fuss erkunden laesst.",
          "Die Altstadt entfaltet ihren Zauber vor allem am spaeten Nachmittag, wenn das Licht ueber dem roemischen Hafen weicher wird und die Gassen golden leuchten. Der Sonnenuntergang vom Hidirlik-Turm oder der Hafenmauer ist bei Einheimischen beliebt. Die Mittagsstunden im Sommer koennen heiss und voll sein, Morgen und Abend sind angenehmer; Fruehling und Herbst bringen mildere Temperaturen und weniger Andrang.",
          "Durch die Kopfsteinpflastergassen von Kaleici zu schlendern ist kostenlos, und es gibt kein einzelnes Tor oder Ticket, um das Viertel selbst zu betreten. Du kannst am Yivli-Minarett, am alten Hafen und an den osmanischen Haeusern in deinem eigenen Tempo vorbeigehen, und eine Bootstour vom Yachthafen ist eine schoene Ergaenzung. Ein lizenzierter VibeGuide-Guide vor Ort erweckt die verborgenen Hoefe und Seitengassen mit ihren Geschichten zum Leben.",
        ],
        ctaTitle: "Entdecke Kaleiçi mit einem Local",
        ...ANT.de,
      },
      ru: {
        name: "Калеичи",
        metaTitle: "Старый город Калеичи в Анталии: экскурсии с местными гидами",
        metaDescription:
          "Пройдитесь по Калеичи, старому городу Анталии, с проверенным местным гидом. Мощёные османские улочки, ворота Адриана и римская гавань — история за каждым углом.",
        intro: [
          "Калеичи — атмосферный старый город Анталии: лабиринт мощёных улочек с отреставрированными османско-греческими домами, бутик-отелями и кафе, окружающими гавань римских времён. Здесь за каждой аркой прячется своя история.",
          "С местным экспертом VibeGuide вы не просто бродите наугад. Пройдите через ворота Адриана, поднимите взгляд на рифлёный минарет Йивли, встретьте закат с башни Хыдырлык и завершите прогулку лодочной поездкой из старой гавани — в своём ритме и на своём языке.",
        ],
        highlights: [
          { title: "Ворота Адриана", desc: "Тройная мраморная арка, построенная в 130 году к визиту императора Адриана." },
          { title: "Минарет Йивли", desc: "Рифлёный кирпичный минарет, ставший символом силуэта Анталии." },
          { title: "Римская гавань", desc: "Старая пристань под стенами — идеальна для лодочной прогулки на закате." },
        ],
        faqs: [
          { q: "Что делать в Калеичи?", a: "Пройтись по османским улочкам, увидеть ворота Адриана и башню Хыдырлык, а затем прокатиться на лодке из гавани — местный гид соберёт всё в один удобный маршрут." },
          { q: "Можно ли обойти Калеичи пешком?", a: "Да, район компактный и лучше всего исследуется пешком; гид уводит вас от туристических ловушек к самым красивым улицам." },
          { q: "Когда лучше приходить?", a: "Вечер к закату — волшебное время, особенно с башни Хыдырлык; гид VibeGuide подберёт идеальный момент." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Калеичи - это исторический старый город Антальи, зажатый между современными кварталами и морем. Проще всего добраться на трамвае Antray, выйдя на остановке Исметпаша или Калеичи, либо просто спуститься пешком из центра. Как только вы пройдете через ворота Адриана, улицы становятся мощеными, а машины исчезают, поэтому весь квартал лучше всего осматривать неспешно пешком.",
          "Старый город раскрывается лучше всего при неторопливой прогулке ближе к вечеру, когда свет мягко ложится на римскую гавань, а переулки светятся золотом. Закат с башни Хыдырлык или у стен гавани особенно любят местные. Летом в полдень бывает жарко и многолюдно, так что утро и вечер приятнее; весна и осень дарят мягкую погоду и меньше туристов в течение всего дня.",
          "Прогулки по мощеным улочкам Калеичи бесплатны, и нет единых ворот или билета для входа в сам квартал. Вы можете в своем темпе пройти мимо минарета Йивли, старой гавани и османских домов, а морская прогулка из марины станет прекрасным дополнением. Лицензированный местный гид VibeGuide оживит скрытые дворики и переулки историями, которые за ними стоят.",
        ],
        ctaTitle: "Исследовать Калеичи с местным гидом",
        ...ANT.ru,
      },
      ar: {
        name: "كاليتشي",
        metaTitle: "جولات مدينة كاليتشي القديمة في أنطاليا مع مرشدين محليين",
        metaDescription:
          "تجوّل في كاليتشي، مدينة أنطاليا القديمة، مع مرشد محلي موثّق. أزقّة عثمانية مرصوفة، وبوابة هادريان، وميناء روماني — القصص وراء كل زاوية.",
        intro: [
          "كاليتشي هي مدينة أنطاليا القديمة الساحرة — متاهة من الأزقّة المرصوفة تحيط بها بيوت عثمانية-يونانية مُرمّمة وفنادق صغيرة ومقاهٍ، وكلها تلتفّ حول ميناء يعود إلى العصر الروماني. مكان يخبّئ فيه كل قوس حكاية.",
          "مع خبير محلي من VibeGuide لا تتجوّل على غير هدى. اعبر بوابة هادريان، وارفع نظرك إلى مئذنة يِيڤلي المضلّعة، وشاهد الغروب من برج هيدرلِك، واختم بجولة بحرية من الميناء القديم — على إيقاعك وبلغتك.",
        ],
        highlights: [
          { title: "بوابة هادريان", desc: "قوس رخامي ثلاثي بُني عام 130م بمناسبة زيارة الإمبراطور هادريان للمدينة." },
          { title: "مئذنة يِيڤلي", desc: "المئذنة الآجرّية المضلّعة التي صارت رمزًا لأفق أنطاليا." },
          { title: "الميناء الروماني", desc: "المرسى القديم أسفل الأسوار — مثالي لجولة بحرية عند الغروب." },
        ],
        faqs: [
          { q: "ماذا يمكن أن أفعل في كاليتشي؟", a: "امشِ في الأزقّة العثمانية، وشاهد بوابة هادريان وبرج هيدرلِك، ثم اركب جولة بحرية من الميناء — يجمع لك المرشد المحلي كل ذلك في مسار واحد سهل." },
          { q: "هل يمكن التجوّل في كاليتشي مشيًا؟", a: "نعم، فهي مدمجة وأجمل ما تُكتشف سيرًا على الأقدام؛ يُبعدك المرشد عن الشوارع السياحية المزدحمة ويقودك إلى أجملها." },
          { q: "ما أفضل وقت للزيارة؟", a: "ما بعد العصر حتى الغروب وقت ساحر، خصوصًا من برج هيدرلِك — يضبط لك مرشد VibeGuide التوقيت تمامًا." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "كاليتشي هي البلدة القديمة التاريخية في أنطاليا، تمتد بين المدينة الحديثة والبحر. أسهل طريقة للوصول هي ترام Antray بالنزول عند محطتي إسمت باشا أو كاليتشي، أو ببساطة السير نزولاً من وسط المدينة. وبمجرد أن تمر عبر بوابة هادريان تتحول الشوارع إلى حصى مرصوفة وتختفي السيارات، لذا فإن استكشاف الحي كله سيراً على الأقدام بمهل هو الأفضل.",
          "تكشف البلدة القديمة عن سحرها في زيارة متأنية بعد الظهيرة، حين يلين الضوء فوق الميناء الروماني وتتوهج الأزقة بلون ذهبي. غروب الشمس من برج هيديرليك أو من سور الميناء مفضّل لدى السكان المحليين. قد يكون منتصف النهار صيفاً حاراً ومزدحماً، فالصباح والمساء ألطف؛ ويجلب الربيع والخريف حرارة معتدلة وازدحاماً أقل طوال اليوم.",
          "التجوّل في أزقة كاليتشي المرصوفة مجاني، ولا توجد بوابة واحدة أو تذكرة لدخول الحي نفسه. يمكنك المرور بمئذنة يڤلي والميناء القديم والبيوت العثمانية على مهلك، ورحلة بحرية من المارينا إضافة رائعة. يبثّ مرشد VibeGuide المحلي المرخّص الحياة في الأفنية الخفية والأزقة الجانبية عبر الحكايات التي تقف وراءها.",
        ],
        ctaTitle: "استكشف كاليتشي مع مرشد محلي",
        ...ANT.ar,
      },
      es: {
        name: "Kaleiçi (Casco Antiguo)",
        metaTitle: "Tours del casco antiguo de Kaleiçi en Antalya con guías locales",
        metaDescription:
          "Pasea por Kaleiçi, el casco antiguo de Antalya, con un guía local verificado. Callejuelas otomanas empedradas, la Puerta de Adriano y un puerto romano — la historia tras cada esquina.",
        intro: [
          "Kaleiçi es el evocador casco antiguo de Antalya — un laberinto de callejuelas empedradas con casas otomano-griegas restauradas, hoteles boutique y cafés, todo alrededor de un puerto de época romana. Es un lugar donde cada arco esconde una historia.",
          "Con un experto local de VibeGuide no vagas al azar. Cruza la Puerta de Adriano, alza la vista al acanalado Minarete Yivli, contempla el atardecer desde la Torre Hıdırlık y termina con un paseo en barco desde el viejo puerto — a tu ritmo y en tu idioma.",
        ],
        highlights: [
          { title: "Puerta de Adriano", desc: "Un triple arco de mármol erigido en el año 130 para la visita del emperador Adriano." },
          { title: "Minarete Yivli", desc: "El minarete de ladrillo acanalado, convertido en símbolo del perfil de Antalya." },
          { title: "El puerto romano", desc: "El viejo muelle bajo las murallas — perfecto para un paseo en barco al atardecer." },
        ],
        faqs: [
          { q: "¿Qué se puede hacer en Kaleiçi?", a: "Recorrer las callejuelas otomanas, ver la Puerta de Adriano y la Torre Hıdırlık, y luego dar un paseo en barco por el puerto — un guía local lo une todo en una ruta fácil." },
          { q: "¿Se puede recorrer Kaleiçi a pie?", a: "Sí, es compacto y se disfruta mejor caminando; un guía te aparta de las calles trampa y te lleva a las más bonitas." },
          { q: "¿Cuál es el mejor momento para visitarlo?", a: "El atardecer es mágico, sobre todo desde la Torre Hıdırlık — tu guía de VibeGuide puede calcular el momento perfecto." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Kaleici es el casco antiguo historico de Antalya, encajado entre la ciudad moderna y el mar. La forma mas facil de llegar es el tranvia Antray, bajando en las paradas de Ismetpasa o Kaleici, o simplemente caminando desde el centro. En cuanto cruzas la Puerta de Adriano las calles se vuelven adoquinadas y los coches desaparecen, asi que el barrio entero se disfruta mejor recorriendolo con calma a pie.",
          "El casco antiguo recompensa una visita pausada a ultima hora de la tarde, cuando la luz se suaviza sobre el puerto romano y las callejuelas brillan doradas. La puesta de sol desde la Torre Hidirlik o la muralla del puerto es una de las favoritas de los locales. El mediodia de verano puede ser caluroso y concurrido, asi que la manana y la tarde son mas amables; primavera y otono traen temperaturas suaves y menos gente.",
          "Pasear por las calles empedradas de Kaleici es gratis, y no hay una unica puerta ni entrada para acceder al barrio en si. Puedes pasar junto al Minarete Yivli, el viejo puerto y las casas otomanas a tu ritmo, y un paseo en barco desde la marina es un anadido encantador. Un guia local titulado de VibeGuide da vida a los patios escondidos y a las callejuelas con las historias que hay detras.",
        ],
        ctaTitle: "Explora Kaleiçi con un local",
        ...ANT.es,
      },
      fr: {
        name: "Kaleiçi (Vieille Ville)",
        metaTitle: "Visites de la vieille ville de Kaleiçi à Antalya avec guides locaux",
        metaDescription:
          "Flânez dans Kaleiçi, la vieille ville d'Antalya, avec un guide local vérifié. Ruelles ottomanes pavées, porte d'Hadrien et port romain — l'histoire derrière chaque coin de rue.",
        intro: [
          "Kaleiçi est la vieille ville pleine de charme d'Antalya — un dédale de ruelles pavées bordées de maisons ottomanes-grecques restaurées, d'hôtels de charme et de cafés, le tout autour d'un port d'époque romaine. Un lieu où chaque arche cache une histoire.",
          "Avec un expert local VibeGuide, vous ne flânez pas au hasard. Passez sous la porte d'Hadrien, levez les yeux vers le minaret cannelé Yivli, admirez le coucher de soleil depuis la tour Hıdırlık et terminez par une balade en bateau depuis le vieux port — à votre rythme et dans votre langue.",
        ],
        highlights: [
          { title: "Porte d'Hadrien", desc: "Un triple arc de marbre édifié en 130 apr. J.-C. pour la visite de l'empereur Hadrien." },
          { title: "Minaret Yivli", desc: "Le minaret de brique cannelé, devenu le symbole de la silhouette d'Antalya." },
          { title: "Le port romain", desc: "Le vieux port au pied des remparts — parfait pour une balade en bateau au coucher du soleil." },
        ],
        faqs: [
          { q: "Que faire à Kaleiçi ?", a: "Parcourir les ruelles ottomanes, voir la porte d'Hadrien et la tour Hıdırlık, puis faire une promenade en bateau depuis le port — un guide local relie le tout en un itinéraire facile." },
          { q: "Peut-on visiter Kaleiçi à pied ?", a: "Oui, le quartier est compact et se découvre au mieux à pied ; un guide vous éloigne des rues à touristes pour vous mener aux plus belles." },
          { q: "Quel est le meilleur moment pour visiter ?", a: "La fin d'après-midi jusqu'au coucher de soleil est magique, surtout depuis la tour Hıdırlık — votre guide VibeGuide en règle le timing parfait." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Kaleici est la vieille ville historique d'Antalya, blottie entre la cite moderne et la mer. Le plus simple est de prendre le tramway Antray et de descendre aux arrets Ismetpasa ou Kaleici, ou tout simplement de descendre a pied depuis le centre. Des que vous franchissez la Porte d'Hadrien, les rues se font paves et les voitures disparaissent, si bien que le quartier se decouvre au mieux tranquillement a pied.",
          "La vieille ville se savoure lors d'une visite sans hate en fin d'apres-midi, quand la lumiere s'adoucit sur le port romain et que les ruelles se parent d'or. Le coucher de soleil depuis la Tour Hidirlik ou le mur du port est un rendez-vous prise des habitants. Les midis d'ete peuvent etre chauds et bondes, le matin et le soir sont plus doux ; le printemps et l'automne offrent des temperatures clementes et moins de monde.",
          "Flaner dans les ruelles pavees de Kaleici est gratuit, et aucune porte ni billet unique n'est requis pour entrer dans le quartier lui-meme. Vous pouvez passer devant le Minaret Yivli, le vieux port et les maisons ottomanes a votre rythme, et une balade en bateau depuis la marina est un joli complement. Un guide local agree VibeGuide fait revivre les cours cachees et les ruelles a travers les histoires qui s'y rattachent.",
        ],
        ctaTitle: "Explorez Kaleiçi avec un local",
        ...ANT.fr,
      },
      el: {
        name: "Καλεϊτσί",
        metaTitle: "Ξεναγήσεις στην Παλιά Πόλη Καλεϊτσί της Αττάλειας με ντόπιους ξεναγούς",
        metaDescription:
          "Περπάτησε στο Καλεϊτσί, την παλιά πόλη της Αττάλειας, με πιστοποιημένο ντόπιο ξεναγό. Πλακόστρωτα οθωμανικά σοκάκια, η Πύλη του Αδριανού και ένα ρωμαϊκό λιμάνι — οι ιστορίες πίσω από κάθε γωνιά.",
        intro: [
          "Το Καλεϊτσί είναι η ατμοσφαιρική παλιά πόλη της Αττάλειας — ένας λαβύρινθος από πλακόστρωτα σοκάκια με αναστηλωμένα οθωμανικά-ελληνικά σπίτια, μπουτίκ ξενοδοχεία και καφέ, όλα γύρω από ένα λιμάνι ρωμαϊκής εποχής. Ένα μέρος όπου κάθε καμάρα κρύβει μια ιστορία.",
          "Με έναν ντόπιο ειδικό του VibeGuide δεν περιπλανιέσαι στην τύχη. Πέρνα από την Πύλη του Αδριανού, σήκωσε το βλέμμα στον ραβδωτό μιναρέ Γιβλί, δες το ηλιοβασίλεμα από τον Πύργο Χιντιρλίκ και κλείσε με μια βαρκάδα από το παλιό λιμάνι — με τον δικό σου ρυθμό, στη γλώσσα σου.",
        ],
        highlights: [
          { title: "Πύλη του Αδριανού", desc: "Τριπλή μαρμάρινη αψίδα χτισμένη το 130 μ.Χ. για την επίσκεψη του αυτοκράτορα Αδριανού." },
          { title: "Μιναρές Γιβλί", desc: "Ο ραβδωτός πλίνθινος μιναρές που έγινε σύμβολο του ορίζοντα της Αττάλειας." },
          { title: "Το ρωμαϊκό λιμάνι", desc: "Το παλιό λιμάνι κάτω από τα τείχη — ιδανικό για βαρκάδα στο ηλιοβασίλεμα." },
        ],
        faqs: [
          { q: "Τι να κάνω στο Καλεϊτσί;", a: "Περπάτα στα οθωμανικά σοκάκια, δες την Πύλη του Αδριανού και τον Πύργο Χιντιρλίκ, και μετά κάνε βαρκάδα από το λιμάνι — ένας ντόπιος ξεναγός τα ενώνει όλα σε μια εύκολη διαδρομή." },
          { q: "Γίνεται να το περπατήσω;", a: "Ναι, είναι συμπαγές και το απολαμβάνεις καλύτερα με τα πόδια· ένας ξεναγός σε κρατά μακριά από τους τουριστικούς δρόμους-παγίδες και σε πάει στους ωραίους." },
          { q: "Πότε είναι η καλύτερη ώρα για επίσκεψη;", a: "Το απόγευμα προς το ηλιοβασίλεμα είναι μαγικό, ειδικά από τον Πύργο Χιντιρλίκ — ο ξεναγός VibeGuide ρυθμίζει τέλεια τον χρόνο." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Καλεϊτσί είναι η ιστορική παλιά πόλη της Αττάλειας, χωμένη ανάμεσα στη σύγχρονη πόλη και τη θάλασσα. Ο ευκολότερος τρόπος πρόσβασης είναι το τραμ Antray, κατεβαίνοντας στις στάσεις Ισμέτπασα ή Καλεϊτσί, ή απλώς με τα πόδια από το κέντρο. Μόλις περάσετε την Πύλη του Αδριανού οι δρόμοι γίνονται καλντερίμι και τα αυτοκίνητα εξαφανίζονται, οπότε όλη η συνοικία απολαμβάνεται καλύτερα με χαλαρό περπάτημα.",
          "Η παλιά πόλη ανταμείβει μια χωρίς βιασύνη επίσκεψη αργά το απόγευμα, όταν το φως μαλακώνει πάνω από το ρωμαϊκό λιμάνι και τα σοκάκια λάμπουν χρυσαφένια. Το ηλιοβασίλεμα από τον Πύργο Χιντιρλίκ ή το τείχος του λιμανιού είναι αγαπημένο των ντόπιων. Τα καλοκαιρινά μεσημέρια μπορεί να είναι ζεστά και πολυσύχναστα, οπότε το πρωί και το βράδυ είναι πιο ήπια. Άνοιξη και φθινόπωρο φέρνουν ήπιες θερμοκρασίες και λιγότερο κόσμο.",
          "Η βόλτα στα λιθόστρωτα σοκάκια του Καλεϊτσί είναι δωρεάν, και δεν υπάρχει ενιαία πύλη ή εισιτήριο για να μπείτε στην ίδια τη συνοικία. Μπορείτε να περάσετε από τον Μιναρέ Γιβλί, το παλιό λιμάνι και τα οθωμανικά σπίτια με τον δικό σας ρυθμό, ενώ μια βαρκάδα από τη μαρίνα είναι υπέροχη προσθήκη. Ένας αδειούχος ντόπιος ξεναγός της VibeGuide ζωντανεύει τις κρυμμένες αυλές και τα στενά με τις ιστορίες πίσω τους.",
        ],
        ctaTitle: "Εξερεύνησε το Καλεϊτσί με έναν ντόπιο",
        ...ANT.el,
      },
      tr: {
        name: "Kaleiçi",
        metaTitle: "Antalya Kaleiçi Turları & Yerel Rehberler",
        metaDescription:
          "Antalya'nın eski şehri Kaleiçi'ni doğrulanmış bir yerel rehberle gez. Arnavut kaldırımlı Osmanlı sokakları, Hadrian Kapısı ve bir Roma limanı — her köşenin ardındaki hikâyeler.",
        intro: [
          "Kaleiçi, Antalya'nın atmosferik eski şehridir — restore edilmiş Osmanlı-Rum evleri, butik oteller ve kafelerle çevrili arnavut kaldırımlı sokakların labirenti, hepsi Roma dönemi bir limanın etrafında. Her kemerin bir hikâye sakladığı bir yer.",
          "VibeGuide yerel uzmanıyla rastgele dolaşmazsın. Hadrian Kapısı'ndan geç, yivli Yivli Minare'ye bak, Hıdırlık Kulesi'nden gün batımını izle ve eski marinadan tekne turuyla bitir — kendi temponda, kendi dilinde.",
        ],
        highlights: [
          { title: "Hadrian Kapısı", desc: "İmparator Hadrian'ın şehri ziyareti için MS 130'da yapılan üç gözlü mermer takı." },
          { title: "Yivli Minare", desc: "Antalya siluetinin simgesi hâline gelen yivli tuğla minare." },
          { title: "Roma Limanı", desc: "Surların altındaki eski marina — gün batımı tekne turu için birebir." },
        ],
        faqs: [
          { q: "Kaleiçi'nde ne yapılır?", a: "Osmanlı sokaklarında yürü, Hadrian Kapısı ve Hıdırlık Kulesi'ni gör, sonra limandan tekne turuna çık — yerel rehber hepsini tek kolay rotada birleştirir." },
          { q: "Kaleiçi yürünerek gezilir mi?", a: "Evet, küçük ve derli topludur, en iyi yürüyerek keşfedilir; rehber seni turist tuzağı sokaklardan uzak tutup güzel olanlara götürür." },
          { q: "En iyi ziyaret zamanı ne zaman?", a: "İkindiden gün batımına doğru büyülüdür, özellikle Hıdırlık Kulesi'nden — VibeGuide rehberin zamanlamayı kusursuz ayarlar." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Kaleici, Antalya'nin modern sehir ile deniz arasina sıkışmış tarihi eski kentidir. Ulaşmanın en kolay yolu, Ismetpaşa ya da Kaleici duraklarında inebileceğiniz Antray tramvayı ya da doğrudan merkezden yürüyerek inmektir. Hadrian Kapısı'ndan geçtiğiniz anda sokaklar arnavut kaldırımına dönüşür ve araçlar geride kalır, bu yüzden bütün mahalle en iyi yavaşça yürüyerek keşfedilir.",
          "Eski kent, geç öğleden sonra acele etmeden gezildiğinde tüm güzelliğini sunar; ışık Roma limanının üzerinde yumuşarken sokaklar altın rengine bürünür. Hıdırlık Kulesi'nden ya da liman duvarından izlenen gün batımı yerlilerin gözdesidir. Yaz öğlenleri sıcak ve kalabalık olabilir, bu yüzden sabah ve akşam daha keyiflidir; ilkbahar ve sonbahar ise gün boyu ılıman hava ve daha az kalabalık getirir.",
          "Kaleici'nin arnavut kaldırımlı sokaklarında dolaşmak ücretsizdir ve mahalleye girmek için tek bir kapı ya da bilet yoktur. Yivli Minare'nin, eski limanın ve Osmanlı evlerinin önünden kendi temponuzda geçebilir, marinadan kalkan bir tekne turunu da güzel bir ek olarak ekleyebilirsiniz. Lisanslı bir VibeGuide yerel rehberi, gizli avluları ve arka sokakları ardındaki hikayelerle canlandırır.",
        ],
        ctaTitle: "Kaleiçi'ni bir yerelle keşfet",
        ...ANT.tr,
      },
      it: {
        name: "Kaleiçi (Città Vecchia)",
        metaTitle: "Tour della città vecchia di Kaleiçi ad Antalya con guide locali",
        metaDescription:
          "Passeggia per Kaleiçi, la città vecchia di Antalya, con una guida locale verificata. Vicoli ottomani lastricati, la Porta di Adriano e un porto romano — le storie dietro ogni angolo.",
        intro: [
          "Kaleiçi è la suggestiva città vecchia di Antalya — un dedalo di vicoli lastricati fiancheggiati da case ottomano-greche restaurate, hotel di charme e caffè, tutto attorno a un porto di epoca romana. Un luogo dove ogni arco nasconde una storia.",
          "Con un esperto locale di VibeGuide non vaghi a caso. Attraversa la Porta di Adriano, alza lo sguardo al minareto scanalato Yivli, ammira il tramonto dalla Torre Hıdırlık e concludi con un giro in barca dal vecchio porticciolo — al tuo ritmo e nella tua lingua.",
        ],
        highlights: [
          { title: "Porta di Adriano", desc: "Un triplice arco di marmo eretto nel 130 d.C. per la visita dell'imperatore Adriano." },
          { title: "Minareto Yivli", desc: "Il minareto in mattoni scanalato, divenuto simbolo del profilo di Antalya." },
          { title: "Il porto romano", desc: "Il vecchio porticciolo sotto le mura — perfetto per un giro in barca al tramonto." },
        ],
        faqs: [
          { q: "Cosa si può fare a Kaleiçi?", a: "Percorrere i vicoli ottomani, vedere la Porta di Adriano e la Torre Hıdırlık, poi fare un giro in barca dal porto — una guida locale unisce tutto in un itinerario semplice." },
          { q: "Si può girare Kaleiçi a piedi?", a: "Sì, è compatta e si gode al meglio camminando; una guida ti tiene lontano dalle vie trappola per turisti e ti porta in quelle più belle." },
          { q: "Qual è il momento migliore per la visita?", a: "Il tardo pomeriggio verso il tramonto è magico, soprattutto dalla Torre Hıdırlık — la tua guida VibeGuide sa calcolare il momento perfetto." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Kaleici e il centro storico di Antalya, incastonato tra la citta moderna e il mare. Il modo piu semplice per arrivarci e il tram Antray, scendendo alle fermate Ismetpasa o Kaleici, oppure semplicemente a piedi dal centro. Non appena si varca la Porta di Adriano le strade diventano acciottolate e le auto spariscono, cosi l'intero quartiere si scopre al meglio passeggiando con calma.",
          "Il centro storico ripaga una visita senza fretta nel tardo pomeriggio, quando la luce si ammorbidisce sul porto romano e i vicoli si tingono d'oro. Il tramonto dalla Torre Hidirlik o dalle mura del porto e un classico amato dai locali. I mezzogiorni estivi possono essere caldi e affollati, percio mattina e sera sono piu piacevoli; primavera e autunno regalano temperature miti e meno gente durante tutta la giornata.",
          "Passeggiare tra i vicoli acciottolati di Kaleici e gratuito, e non c'e un unico ingresso o biglietto per accedere al quartiere in se. Puoi passare accanto al Minareto Yivli, al vecchio porto e alle case ottomane con i tuoi tempi, e una gita in barca dalla marina e un bel complemento. Una guida locale abilitata VibeGuide fa rivivere i cortili nascosti e le stradine con le storie che vi si celano.",
        ],
        ctaTitle: "Esplora Kaleiçi con un locale",
        ...ANT.it,
      },
      pl: {
        name: "Kaleiçi (Stare Miasto)",
        metaTitle: "Kaleiçi — stare miasto Antalyi, wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Przejdź się po Kaleiçi, starym mieście Antalyi, z zweryfikowanym lokalnym przewodnikiem. Brukowane osmańskie uliczki, Brama Hadriana i rzymski port — historie za każdym rogiem.",
        intro: [
          "Kaleiçi to klimatyczne stare miasto Antalyi — labirynt brukowanych uliczek z odrestaurowanymi osmańsko-greckimi domami, butikowymi hotelami i kawiarniami, a wszystko wokół portu z czasów rzymskich. Miejsce, gdzie każdy łuk kryje jakąś opowieść.",
          "Z lokalnym ekspertem VibeGuide nie błądzisz na oślep. Przejdź przez Bramę Hadriana, spójrz w górę na żłobkowany minaret Yivli, popatrz na zachód słońca z Wieży Hıdırlık i zakończ rejsem łódką ze starej mariny — we własnym tempie i w swoim języku.",
        ],
        highlights: [
          { title: "Brama Hadriana", desc: "Potrójny marmurowy łuk wzniesiony w 130 r. n.e. na wizytę cesarza Hadriana." },
          { title: "Minaret Yivli", desc: "Żłobkowany ceglany minaret, który stał się symbolem panoramy Antalyi." },
          { title: "Rzymski port", desc: "Stara marina pod murami — idealna na rejs o zachodzie słońca." },
        ],
        faqs: [
          { q: "Co robić w Kaleiçi?", a: "Przejść osmańskimi uliczkami, zobaczyć Bramę Hadriana i Wieżę Hıdırlık, a potem popłynąć łódką z portu — lokalny przewodnik łączy to w jedną wygodną trasę." },
          { q: "Czy Kaleiçi da się zwiedzać pieszo?", a: "Tak, jest zwarte i najlepiej poznaje się je na piechotę; przewodnik omija turystyczne pułapki i prowadzi cię na najładniejsze uliczki." },
          { q: "Kiedy najlepiej je odwiedzić?", a: "Późne popołudnie ku zachodowi słońca jest magiczne, zwłaszcza z Wieży Hıdırlık — przewodnik VibeGuide dobierze idealny moment." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Kaleici to historyczna starowka Antalyi, wcisnieta miedzy nowoczesne miasto a morze. Najlatwiej dotrzec tu tramwajem Antray, wysiadajac na przystankach Ismetpasa lub Kaleici, albo po prostu schodzac pieszo z centrum. Gdy tylko przejdziesz przez Bramę Hadriana, ulice zmieniaja sie w brukowane zaulki, a samochody znikaja, wiec cala dzielnice najlepiej zwiedzac spokojnie na piechote.",
          "Starowka najpiekniej prezentuje sie podczas niespiesznego spaceru poznym popoludniem, gdy swiatlo mieknie nad rzymskim portem, a uliczki nabieraja zlocistej barwy. Zachod slonca z Wiezy Hidirlik lub z murow portowych to ulubiony widok mieszkancow. Letnie poludnia potrafia byc upalne i tloczne, wiec ranek i wieczor sa przyjemniejsze; wiosna i jesien przynosza lagodne temperatury i mniej ludzi przez caly dzien.",
          "Spacer brukowanymi uliczkami Kaleici jest bezplatny i nie ma zadnej pojedynczej bramy ani biletu, by wejsc do samej dzielnicy. Mozesz w swoim tempie mijac Minaret Yivli, stary port i osmanskie kamienice, a rejs lodzia z mariny to urocze dopelnienie. Licencjonowany lokalny przewodnik VibeGuide ozywia ukryte dziedzince i boczne uliczki historiami, ktore sie za nimi kryja.",
        ],
        ctaTitle: "Odkryj Kaleiçi z lokalnym przewodnikiem",
        ...ANT.pl,
      },
      nl: {
        name: "Kaleiçi (Oude Stad)",
        metaTitle: "Kaleiçi Antalya Oude Stad-tours & lokale gidsen",
        metaDescription:
          "Dwaal door Kaleiçi, de oude stad van Antalya, met een geverifieerde lokale gids. Geplaveide Ottomaanse steegjes, de Poort van Hadrianus en een Romeinse haven — de verhalen achter elke hoek.",
        intro: [
          "Kaleiçi is de sfeervolle oude stad van Antalya — een doolhof van geplaveide steegjes met gerestaureerde Ottomaans-Griekse huizen, boetiekhotels en cafés, alles rond een haven uit de Romeinse tijd. Een plek waar elke boog een verhaal verbergt.",
          "Met een lokale VibeGuide-expert dwaal je niet zomaar rond. Loop door de Poort van Hadrianus, kijk omhoog naar de gecanneleerde Yivli-minaret, zie de zon ondergaan vanaf de Hıdırlık-toren en sluit af met een boottocht vanuit de oude jachthaven — in jouw tempo en in jouw taal.",
        ],
        highlights: [
          { title: "Poort van Hadrianus", desc: "Een drievoudige marmeren boog, in 130 n.Chr. opgericht voor het bezoek van keizer Hadrianus." },
          { title: "Yivli-minaret", desc: "De gecanneleerde bakstenen minaret, uitgegroeid tot symbool van de skyline van Antalya." },
          { title: "De Romeinse haven", desc: "De oude jachthaven onder de muren — perfect voor een boottocht bij zonsondergang." },
        ],
        faqs: [
          { q: "Wat is er te doen in Kaleiçi?", a: "Door de Ottomaanse steegjes lopen, de Poort van Hadrianus en de Hıdırlık-toren zien, en dan een boottocht vanuit de haven maken — een lokale gids rijgt het aaneen tot één makkelijke route." },
          { q: "Is Kaleiçi te belopen?", a: "Ja, het is compact en het mooist te voet te verkennen; een gids houdt je weg van de toeristenvalstraatjes en leidt je naar de mooiste." },
          { q: "Wanneer kun je het best gaan?", a: "De late namiddag richting zonsondergang is magisch, vooral vanaf de Hıdırlık-toren — je VibeGuide-gids timet het perfect." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Kaleici is de historische oude stad van Antalya, weggestopt tussen de moderne stad en de zee. Je komt er het makkelijkst met de Antray-tram, uitstappen bij de haltes Ismetpasa of Kaleici, of gewoon te voet vanuit het centrum naar beneden. Zodra je door de Poort van Hadrianus loopt worden de straten kasseien en verdwijnen de auto's, dus de hele wijk verken je het best rustig te voet.",
          "De oude stad komt het mooist tot haar recht bij een ontspannen bezoek in de late namiddag, wanneer het licht verzacht boven de Romeinse haven en de steegjes goudkleurig oplichten. De zonsondergang vanaf de Hidirlik-toren of de havenmuur is een favoriet van de locals. Zomerse middagen kunnen heet en druk zijn, dus ochtend en avond zijn aangenamer; lente en herfst brengen zachte temperaturen en minder drukte.",
          "Ronddwalen door de kasseienstraatjes van Kaleici is gratis, en er is geen enkele poort of toegangsbewijs nodig om de wijk zelf te betreden. Je kunt op je eigen tempo langs de Yivli-minaret, de oude haven en de Ottomaanse huizen wandelen, en een boottocht vanuit de jachthaven is een leuke aanvulling. Een erkende lokale VibeGuide-gids brengt de verborgen binnenplaatsen en achterstraatjes tot leven met de verhalen erachter.",
        ],
        ctaTitle: "Verken Kaleiçi met een local",
        ...ANT.nl,
      },
    },
  },
  {
    slug: "pergamon",
    city: "İzmir",
    citySlug: "izmir",
    emoji: "🏛️",
    image:
      "https://images.unsplash.com/photo-1715080271610-c177c424aa6d?q=80&w=1600",
    lat: 39.1324,
    lng: 27.184,
    i18n: {
      en: {
        name: "Pergamon",
        metaTitle: "Pergamon (Bergama) Ancient City Tours & Local Guides",
        metaDescription:
          "Explore Pergamon, a UNESCO World Heritage ancient city near İzmir, with a verified local guide. The steepest theatre of antiquity, a legendary library and the Asklepion healing centre.",
        intro: [
          "Pergamon — Bergama today — was one of the great cities of the ancient world, first Greek and then Roman, and now a UNESCO World Heritage Site. Its Acropolis crowns a steep hill above the plain, home to the Temple of Trajan, the altar of Zeus and the steepest theatre of the ancient world, cut dramatically into the slope for around 10,000 spectators.",
          "With a VibeGuide local expert the ruins come alive. Hear how the Library of Pergamon rivalled Alexandria and gave us parchment, then descend to the Asklepion healing centre and the vast Red Basilica (Kızıl Avlu) — at your pace, in your language, about an hour from Kuşadası or İzmir.",
        ],
        highlights: [
          { title: "The Steep Theatre", desc: "The steepest theatre of the ancient world, carved into the hillside for some 10,000 spectators." },
          { title: "The Great Library", desc: "Second only to Alexandria — here parchment (charta pergamena) was perfected." },
          { title: "The Asklepion", desc: "One of antiquity's most famous healing centres, on the plain below the acropolis." },
        ],
        faqs: [
          { q: "Where is Pergamon?", a: "In the town of Bergama, İzmir province — about an hour from Kuşadası or İzmir, and an easy day trip a local guide can plan for you." },
          { q: "How much time do I need?", a: "The Acropolis, Asklepion and Red Basilica each deserve time; a half-day with a guide covers the highlights comfortably." },
          { q: "Is a guide worth it at Pergamon?", a: "Absolutely — the library, the altar of Zeus and the healing rituals are stories, not signs; a guide brings the empty ruins back to life." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Pergamon lies in the town of Bergama in Izmir province, roughly an hour from Kusadasi or Izmir and easily reached by car or coach. The ancient Acropolis crowns a steep hill above the town, which you can reach by the Akropolis cable car (teleferik) or by road. The Asklepion healing sanctuary and the Red Basilica are separate stops down in Bergama itself, an easy addition to the day.",
          "Mornings are the sweet spot here: the air is cooler, the light is clear over the hilltop ruins, and the crowds are still thin before the tour groups arrive. The terrain is steep and sun-exposed, so summer afternoons can be tiring, while spring and autumn offer the most comfortable walking weather. Whenever you come, sturdy comfortable shoes and water make the climb far more enjoyable.",
          "Pergamon is a ticketed UNESCO World Heritage site, with the Acropolis, the Asklepion and the Red Basilica each worth entering. Expect grand terraces, a steep theatre and wide views over the plain. A licensed VibeGuide local guide ties the scattered ruins into one story, from the acropolis and the cable-car approach to the Asklepion, so the stones make sense rather than blur together.",
        ],
        ctaTitle: "See Pergamon with a local",
        ...IZM.en,
      },
      de: {
        name: "Pergamon",
        metaTitle: "Pergamon (Bergama) Antike Stadt Touren & lokale Guides",
        metaDescription:
          "Entdecke Pergamon, eine antike Stadt und UNESCO-Welterbe bei İzmir, mit einem geprüften lokalen Guide. Das steilste Theater der Antike, eine legendäre Bibliothek und das Asklepieion.",
        intro: [
          "Pergamon — heute Bergama — war eine der großen Städte der Antike, zuerst griechisch, dann römisch, und ist heute UNESCO-Welterbe. Seine Akropolis krönt einen steilen Hügel über der Ebene, mit dem Trajan-Tempel, dem Zeusaltar und dem steilsten Theater der antiken Welt, dramatisch in den Hang gebaut für rund 10.000 Zuschauer.",
          "Mit einem lokalen VibeGuide-Experten erwachen die Ruinen zum Leben. Höre, wie die Bibliothek von Pergamon mit Alexandria wetteiferte und uns das Pergament schenkte, steig dann hinab zum Asklepieion und zur riesigen Roten Basilika (Kızıl Avlu) — in deinem Tempo, in deiner Sprache, etwa eine Stunde von Kuşadası oder İzmir.",
        ],
        highlights: [
          { title: "Das steile Theater", desc: "Das steilste Theater der Antike, für rund 10.000 Zuschauer in den Hang gehauen." },
          { title: "Die große Bibliothek", desc: "Nur Alexandria voraus — hier wurde das Pergament (charta pergamena) perfektioniert." },
          { title: "Das Asklepieion", desc: "Eines der berühmtesten Heilzentren der Antike, in der Ebene unter der Akropolis." },
        ],
        faqs: [
          { q: "Wo liegt Pergamon?", a: "In der Stadt Bergama, Provinz İzmir — etwa eine Stunde von Kuşadası oder İzmir und ein leichter Tagesausflug, den dir ein lokaler Guide plant." },
          { q: "Wie viel Zeit brauche ich?", a: "Akropolis, Asklepieion und Rote Basilika verdienen je ihre Zeit; ein halber Tag mit Guide deckt die Höhepunkte bequem ab." },
          { q: "Lohnt sich in Pergamon ein Guide?", a: "Absolut — die Bibliothek, der Zeusaltar und die Heilrituale sind Geschichten, keine Schilder; ein Guide erweckt die leeren Ruinen wieder." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Pergamon liegt in der Stadt Bergama in der Provinz Izmir, etwa eine Stunde von Kusadasi oder Izmir entfernt und bequem mit dem Auto oder Bus zu erreichen. Die antike Akropolis kroent einen steilen Huegel ueber der Stadt, den du mit der Akropolis-Seilbahn (Teleferik) oder ueber die Strasse erreichst. Das Heilzentrum Asklepion und die Rote Basilika sind eigene Stationen unten in Bergama, eine leichte Ergaenzung zum Tag.",
          "Der Morgen ist hier die beste Zeit: Die Luft ist kuehler, das Licht ueber den Ruinen auf dem Huegel ist klar und die Menschenmengen sind noch duenn, bevor die Reisegruppen eintreffen. Das Gelaende ist steil und sonnig, sodass Sommernachmittage anstrengend sein koennen, waehrend Fruehling und Herbst das angenehmste Wetter zum Gehen bieten. Wann auch immer du kommst, machen feste bequeme Schuhe und Wasser den Aufstieg deutlich schoener.",
          "Pergamon ist eine kostenpflichtige UNESCO-Welterbestaette, bei der sich Akropolis, Asklepion und Rote Basilika jeweils lohnen. Erwarte grosse Terrassen, ein steiles Theater und weite Blicke ueber die Ebene. Ein lizenzierter VibeGuide-Guide vor Ort verbindet die verstreuten Ruinen zu einer Geschichte, von der Akropolis und dem Seilbahn-Aufstieg bis zum Asklepion, sodass die Steine Sinn ergeben statt zu verschwimmen.",
        ],
        ctaTitle: "Erlebe Pergamon mit einem Local",
        ...IZM.de,
      },
      ru: {
        name: "Пергам",
        metaTitle: "Пергам (Бергама): экскурсии по древнему городу с местными гидами",
        metaDescription:
          "Осмотрите Пергам — древний город и объект ЮНЕСКО под Измиром — с проверенным местным гидом. Самый крутой театр античности, легендарная библиотека и лечебный Асклепион.",
        intro: [
          "Пергам — сегодня Бергама — был одним из великих городов древнего мира, сначала греческим, затем римским, а ныне — объект Всемирного наследия ЮНЕСКО. Его акрополь венчает крутой холм над равниной: храм Траяна, алтарь Зевса и самый крутой театр античности, эффектно врезанный в склон примерно на 10 000 зрителей.",
          "С местным экспертом VibeGuide руины оживают. Услышьте, как Пергамская библиотека соперничала с Александрийской и подарила миру пергамент, а затем спуститесь к лечебному Асклепиону и огромной Красной базилике (Кызыл Авлу) — в своём ритме и на своём языке, примерно в часе от Кушадасы или Измира.",
        ],
        highlights: [
          { title: "Крутой театр", desc: "Самый крутой театр античности, врезанный в склон примерно на 10 000 зрителей." },
          { title: "Великая библиотека", desc: "Уступала лишь Александрийской — здесь довели до совершенства пергамент (charta pergamena)." },
          { title: "Асклепион", desc: "Один из самых знаменитых лечебных центров древности, на равнине под акрополем." },
        ],
        faqs: [
          { q: "Где находится Пергам?", a: "В городе Бергама, провинция Измир — примерно в часе от Кушадасы или Измира, лёгкая поездка на день, которую спланирует местный гид." },
          { q: "Сколько времени нужно?", a: "Акрополь, Асклепион и Красная базилика заслуживают времени; полдня с гидом спокойно охватывают главное." },
          { q: "Стоит ли брать гида в Пергаме?", a: "Безусловно — библиотека, алтарь Зевса и целебные ритуалы — это истории, а не таблички; гид вновь оживляет пустые руины." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Пергам находится в городе Бергама провинции Измир, примерно в часе езды от Кушадасы или Измира, и до него легко добраться на машине или автобусе. Древний Акрополь венчает крутой холм над городом, куда можно подняться на канатной дороге Akropolis (телеферик) или по дороге. Лечебный центр Асклепион и Красная базилика - отдельные точки внизу, в самой Бергаме, и их легко добавить к дню.",
          "Утро здесь - лучшее время: воздух прохладнее, свет над руинами на вершине холма чистый, а туристов еще мало, пока не приехали экскурсионные группы. Местность крутая и открытая солнцу, поэтому летние послеобеденные часы могут утомлять, тогда как весна и осень дарят самую комфортную погоду для прогулок. Когда бы вы ни приехали, удобная прочная обувь и вода сделают подъем гораздо приятнее.",
          "Пергам - платный объект Всемирного наследия ЮНЕСКО, где стоит зайти и на Акрополь, и в Асклепион, и в Красную базилику. Вас ждут величественные террасы, крутой театр и широкие виды на равнину. Лицензированный местный гид VibeGuide связывает разбросанные руины в единую историю - от акрополя и подъема на канатной дороге до Асклепиона, так что камни обретают смысл, а не сливаются в одно.",
        ],
        ctaTitle: "Увидеть Пергам с местным гидом",
        ...IZM.ru,
      },
      ar: {
        name: "برغامة",
        metaTitle: "جولات مدينة برغامة (بيرغاما) الأثرية مع مرشدين محليين",
        metaDescription:
          "اكتشف برغامة، المدينة الأثرية المُدرجة على قائمة اليونسكو قرب إزمير، مع مرشد محلي موثّق. أشد مسارح العصور القديمة انحدارًا، ومكتبة أسطورية، ومركز الأسكليبيون للاستشفاء.",
        intro: [
          "برغامة — بيرغاما اليوم — كانت من كبريات مدن العالم القديم، يونانية أولًا ثم رومانية، وهي اليوم موقع تراث عالمي لليونسكو. تتوّج أكروبوليسها تلّة شديدة الانحدار فوق السهل، وفيها معبد تراجان، ومذبح زيوس، وأشدّ مسارح العالم القديم انحدارًا، محفورًا بشكل مثير في المنحدر ليتّسع لنحو 10,000 متفرّج.",
          "مع خبير محلي من VibeGuide تدبّ الحياة في الأطلال. اسمع كيف نافست مكتبة برغامة مكتبة الإسكندرية وأهدتنا الرَّق، ثم انزل إلى مركز الأسكليبيون للاستشفاء والبازيليك الحمراء الضخمة (كيزيل أڤلو) — على إيقاعك وبلغتك، على بُعد نحو ساعة من كوشآداسي أو إزمير.",
        ],
        highlights: [
          { title: "المسرح شديد الانحدار", desc: "أشدّ مسارح العصور القديمة انحدارًا، محفور في سفح التلّة ليتّسع لنحو 10,000 متفرّج." },
          { title: "المكتبة العظيمة", desc: "لم يسبقها إلا مكتبة الإسكندرية — هنا أُتقن صنع الرَّق (شارتا برغامينا)." },
          { title: "الأسكليبيون", desc: "من أشهر مراكز الاستشفاء في العصور القديمة، في السهل أسفل الأكروبوليس." },
        ],
        faqs: [
          { q: "أين تقع برغامة؟", a: "في مدينة بيرغاما بمحافظة إزمير — على بُعد نحو ساعة من كوشآداسي أو إزمير، ورحلة يوم سهلة يخطّط لها المرشد المحلي." },
          { q: "كم من الوقت أحتاج؟", a: "يستحق كل من الأكروبوليس والأسكليبيون والبازيليك الحمراء وقتًا؛ نصف يوم مع مرشد يغطّي أبرز المعالم بأريحية." },
          { q: "هل يستحق الأمر مرشدًا في برغامة؟", a: "بلا شك — المكتبة ومذبح زيوس وطقوس الاستشفاء قصص لا لافتات؛ المرشد يعيد الحياة إلى الأطلال الخاوية." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "تقع بيرغامون في بلدة بيرغاما بمحافظة إزمير، على بُعد ساعة تقريباً من كوش أداسي أو إزمير، ويسهل الوصول إليها بالسيارة أو الحافلة. تتوّج الأكروبوليس القديمة تلة شديدة الانحدار فوق البلدة، ويمكنك الصعود إليها بتلفريك الأكروبوليس أو عبر الطريق. أما مركز الشفاء أسكليبيون والبازيليكا الحمراء فهما محطتان منفصلتان في بيرغاما نفسها، وإضافة سهلة لليوم.",
          "الصباح هنا هو الوقت الأمثل: الهواء أبرد، والضوء صافٍ فوق أطلال قمة التلة، والزحام لا يزال خفيفاً قبل وصول المجموعات السياحية. التضاريس شديدة الانحدار ومعرّضة للشمس، لذا قد تكون فترات ما بعد الظهر صيفاً مُتعِبة، بينما يمنح الربيع والخريف ألطف أجواء للسير. أياً كان وقت زيارتك، فإن حذاءً مريحاً متيناً والماء يجعلان الصعود أكثر متعة بكثير.",
          "بيرغامون موقع للتراث العالمي لليونسكو بتذكرة، وتستحق كلٌّ من الأكروبوليس والأسكليبيون والبازيليكا الحمراء الدخول إليها. توقّع مدرّجات مهيبة ومسرحاً شديد الانحدار وإطلالات واسعة على السهل. يربط مرشد VibeGuide المحلي المرخّص الأطلال المتناثرة في حكاية واحدة، من الأكروبوليس ومسار التلفريك إلى الأسكليبيون، فتصبح الحجارة مفهومة بدل أن تختلط ببعضها.",
        ],
        ctaTitle: "زر برغامة مع مرشد محلي",
        ...IZM.ar,
      },
      es: {
        name: "Pérgamo",
        metaTitle: "Tours de la antigua ciudad de Pérgamo (Bergama) con guías locales",
        metaDescription:
          "Descubre Pérgamo, ciudad antigua y Patrimonio de la Humanidad cerca de Esmirna, con un guía local verificado. El teatro más empinado de la Antigüedad, una biblioteca legendaria y el Asclepión.",
        intro: [
          "Pérgamo — hoy Bergama — fue una de las grandes ciudades del mundo antiguo, primero griega y luego romana, y hoy Patrimonio de la Humanidad de la UNESCO. Su acrópolis corona una colina escarpada sobre la llanura, con el Templo de Trajano, el altar de Zeus y el teatro más empinado del mundo antiguo, tallado espectacularmente en la ladera para unos 10.000 espectadores.",
          "Con un experto local de VibeGuide las ruinas cobran vida. Escucha cómo la Biblioteca de Pérgamo rivalizó con Alejandría y nos dio el pergamino, y luego baja al Asclepión y a la enorme Basílica Roja (Kızıl Avlu) — a tu ritmo y en tu idioma, a una hora de Kuşadası o Esmirna.",
        ],
        highlights: [
          { title: "El teatro empinado", desc: "El teatro más empinado del mundo antiguo, tallado en la ladera para unos 10.000 espectadores." },
          { title: "La gran biblioteca", desc: "Solo superada por Alejandría — aquí se perfeccionó el pergamino (charta pergamena)." },
          { title: "El Asclepión", desc: "Uno de los centros de curación más famosos de la Antigüedad, en la llanura bajo la acrópolis." },
        ],
        faqs: [
          { q: "¿Dónde está Pérgamo?", a: "En la localidad de Bergama, provincia de Esmirna — a una hora de Kuşadası o Esmirna, una excursión de un día fácil que un guía local puede planear." },
          { q: "¿Cuánto tiempo necesito?", a: "La acrópolis, el Asclepión y la Basílica Roja merecen su tiempo; media jornada con guía cubre lo esencial con holgura." },
          { q: "¿Vale la pena un guía en Pérgamo?", a: "Sin duda — la biblioteca, el altar de Zeus y los rituales de curación son relatos, no carteles; un guía devuelve la vida a las ruinas vacías." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Pergamo se encuentra en la localidad de Bergama, en la provincia de Izmir, a alrededor de una hora de Kusadasi o Izmir y de facil acceso en coche o autobus. La antigua Acropolis corona una empinada colina sobre el pueblo, a la que puedes subir con el teleferico Akropolis o por carretera. El santuario de sanacion Asklepion y la Basilica Roja son paradas aparte en la propia Bergama, un anadido comodo para la jornada.",
          "La manana es el mejor momento aqui: el aire es mas fresco, la luz sobre las ruinas de la cima es limpia y aun hay poca gente antes de que lleguen los grupos. El terreno es empinado y expuesto al sol, asi que las tardes de verano pueden cansar, mientras que primavera y otono ofrecen el clima mas agradable para caminar. Vengas cuando vengas, un calzado comodo y firme y agua hacen la subida mucho mas llevadera.",
          "Pergamo es un sitio Patrimonio de la Humanidad de la UNESCO con entrada, y merece la pena acceder a la Acropolis, el Asklepion y la Basilica Roja. Espera grandes terrazas, un teatro muy empinado y amplias vistas sobre la llanura. Un guia local titulado de VibeGuide enlaza las ruinas dispersas en un solo relato, desde la acropolis y la subida en teleferico hasta el Asklepion, para que las piedras cobren sentido en vez de confundirse.",
        ],
        ctaTitle: "Visita Pérgamo con un local",
        ...IZM.es,
      },
      fr: {
        name: "Pergame",
        metaTitle: "Visites de la cité antique de Pergame (Bergama) avec guides locaux",
        metaDescription:
          "Découvrez Pergame, cité antique classée à l'UNESCO près d'Izmir, avec un guide local vérifié. Le théâtre le plus pentu de l'Antiquité, une bibliothèque légendaire et l'Asklépieion.",
        intro: [
          "Pergame — Bergama aujourd'hui — fut l'une des grandes cités du monde antique, d'abord grecque puis romaine, et désormais site du patrimoine mondial de l'UNESCO. Son acropole couronne une colline abrupte au-dessus de la plaine, avec le temple de Trajan, l'autel de Zeus et le théâtre le plus pentu du monde antique, taillé spectaculairement dans la pente pour près de 10 000 spectateurs.",
          "Avec un expert local VibeGuide, les ruines reprennent vie. Écoutez comment la bibliothèque de Pergame rivalisa avec Alexandrie et nous donna le parchemin, puis descendez vers l'Asklépieion, centre de guérison, et l'immense Basilique Rouge (Kızıl Avlu) — à votre rythme et dans votre langue, à environ une heure de Kuşadası ou d'Izmir.",
        ],
        highlights: [
          { title: "Le théâtre pentu", desc: "Le théâtre le plus pentu du monde antique, taillé dans le versant pour quelque 10 000 spectateurs." },
          { title: "La grande bibliothèque", desc: "Seconde après Alexandrie — c'est ici que fut perfectionné le parchemin (charta pergamena)." },
          { title: "L'Asklépieion", desc: "L'un des centres de guérison les plus célèbres de l'Antiquité, dans la plaine sous l'acropole." },
        ],
        faqs: [
          { q: "Où se trouve Pergame ?", a: "Dans la ville de Bergama, province d'Izmir — à environ une heure de Kuşadası ou d'Izmir, une excursion à la journée facile qu'un guide local peut organiser." },
          { q: "Combien de temps faut-il ?", a: "L'acropole, l'Asklépieion et la Basilique Rouge méritent chacun du temps ; une demi-journée avec un guide couvre confortablement les points forts." },
          { q: "Un guide vaut-il la peine à Pergame ?", a: "Absolument — la bibliothèque, l'autel de Zeus et les rituels de guérison sont des récits, pas des panneaux ; un guide redonne vie aux ruines désertes." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Pergame se trouve dans la ville de Bergama, dans la province d'Izmir, a environ une heure de Kusadasi ou d'Izmir et facilement accessible en voiture ou en autocar. L'antique Acropole couronne une colline escarpee au-dessus de la ville, que l'on rejoint par le teleferique Akropolis ou par la route. Le sanctuaire de guerison Asklepion et la Basilique Rouge sont des etapes distinctes dans Bergama meme, un complement aise pour la journee.",
          "Le matin est le moment ideal ici : l'air est plus frais, la lumiere sur les ruines du sommet est limpide et la foule reste clairsemee avant l'arrivee des groupes. Le terrain est escarpe et expose au soleil, si bien que les apres-midi d'ete peuvent etre eprouvants, tandis que le printemps et l'automne offrent le climat le plus agreable pour marcher. Quel que soit le moment, de bonnes chaussures confortables et de l'eau rendent la montee bien plus plaisante.",
          "Pergame est un site du patrimoine mondial de l'UNESCO avec billet, et l'Acropole, l'Asklepion et la Basilique Rouge valent chacun la visite. Attendez-vous a de vastes terrasses, un theatre tres pentu et de larges vues sur la plaine. Un guide local agree VibeGuide relie les ruines dispersees en un seul recit, de l'acropole et de la montee en teleferique jusqu'a l'Asklepion, pour que les pierres prennent sens au lieu de se confondre.",
        ],
        ctaTitle: "Découvrez Pergame avec un local",
        ...IZM.fr,
      },
      el: {
        name: "Πέργαμος",
        metaTitle: "Ξεναγήσεις στην αρχαία πόλη Πέργαμο (Μπεργκαμά) με ντόπιους ξεναγούς",
        metaDescription:
          "Εξερεύνησε την Πέργαμο, αρχαία πόλη και Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO κοντά στη Σμύρνη, με πιστοποιημένο ντόπιο ξεναγό. Το πιο απόκρημνο θέατρο της αρχαιότητας, θρυλική βιβλιοθήκη και το Ασκληπιείο.",
        intro: [
          "Η Πέργαμος — σήμερα Μπεργκαμά — υπήρξε μια από τις μεγάλες πόλεις του αρχαίου κόσμου, πρώτα ελληνική και έπειτα ρωμαϊκή, και σήμερα Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO. Η Ακρόπολή της στεφανώνει έναν απόκρημνο λόφο πάνω από την πεδιάδα, με τον Ναό του Τραϊανού, τον βωμό του Δία και το πιο απόκρημνο θέατρο του αρχαίου κόσμου, σκαλισμένο εντυπωσιακά στην πλαγιά για περίπου 10.000 θεατές.",
          "Με έναν ντόπιο ειδικό του VibeGuide τα ερείπια ζωντανεύουν. Άκου πώς η Βιβλιοθήκη της Περγάμου συναγωνιζόταν την Αλεξάνδρεια και μας χάρισε την περγαμηνή, κι έπειτα κατέβα στο Ασκληπιείο και στη θεόρατη Κόκκινη Βασιλική (Κιζίλ Αβλού) — με τον δικό σου ρυθμό, στη γλώσσα σου, περίπου μία ώρα από το Κουσάντασι ή τη Σμύρνη.",
        ],
        highlights: [
          { title: "Το απόκρημνο θέατρο", desc: "Το πιο απόκρημνο θέατρο του αρχαίου κόσμου, σκαλισμένο στην πλαγιά για περίπου 10.000 θεατές." },
          { title: "Η μεγάλη βιβλιοθήκη", desc: "Δεύτερη μόνο μετά την Αλεξάνδρεια — εδώ τελειοποιήθηκε η περγαμηνή (charta pergamena)." },
          { title: "Το Ασκληπιείο", desc: "Ένα από τα πιο φημισμένα κέντρα ίασης της αρχαιότητας, στην πεδιάδα κάτω από την ακρόπολη." },
        ],
        faqs: [
          { q: "Πού βρίσκεται η Πέργαμος;", a: "Στην πόλη Μπεργκαμά, επαρχία Σμύρνης — περίπου μία ώρα από το Κουσάντασι ή τη Σμύρνη, μια εύκολη ημερήσια εκδρομή που οργανώνει ένας ντόπιος ξεναγός." },
          { q: "Πόσο χρόνο χρειάζομαι;", a: "Η Ακρόπολη, το Ασκληπιείο και η Κόκκινη Βασιλική αξίζουν χρόνο· ένα μισό απόγευμα με ξεναγό καλύπτει άνετα τα κυριότερα." },
          { q: "Αξίζει ξεναγός στην Πέργαμο;", a: "Οπωσδήποτε — η βιβλιοθήκη, ο βωμός του Δία και οι τελετές ίασης είναι ιστορίες, όχι πινακίδες· ένας ξεναγός ξαναζωντανεύει τα άδεια ερείπια." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Η Πέργαμος βρίσκεται στην πόλη Μπεργκαμά της επαρχίας Σμύρνης, περίπου μία ώρα από το Κουσάντασι ή τη Σμύρνη, και είναι εύκολα προσβάσιμη με αυτοκίνητο ή πούλμαν. Η αρχαία Ακρόπολη στέφει έναν απότομο λόφο πάνω από την πόλη, όπου ανεβαίνετε με το τελεφερίκ της Ακρόπολης ή οδικώς. Το θεραπευτήριο Ασκληπιείο και η Κόκκινη Βασιλική είναι ξεχωριστές στάσεις μέσα στη Μπεργκαμά, μια εύκολη προσθήκη στην ημέρα.",
          "Το πρωί είναι η ιδανική ώρα εδώ: ο αέρας είναι πιο δροσερός, το φως πάνω από τα ερείπια της κορυφής είναι καθαρό και ο κόσμος παραμένει λίγος πριν φτάσουν τα γκρουπ. Το έδαφος είναι απότομο και εκτεθειμένο στον ήλιο, οπότε τα καλοκαιρινά απογεύματα μπορεί να είναι κουραστικά, ενώ άνοιξη και φθινόπωρο προσφέρουν τον πιο ευχάριστο καιρό για περπάτημα. Όποτε κι αν έρθετε, στέρεα άνετα παπούτσια και νερό κάνουν την ανάβαση πολύ πιο απολαυστική.",
          "Η Πέργαμος είναι μνημείο Παγκόσμιας Κληρονομιάς της UNESCO με εισιτήριο, και αξίζει να μπείτε στην Ακρόπολη, στο Ασκληπιείο και στην Κόκκινη Βασιλική. Περιμένετε επιβλητικά άνδηρα, ένα απόκρημνο θέατρο και ανοιχτή θέα στην πεδιάδα. Ένας αδειούχος ντόπιος ξεναγός της VibeGuide δένει τα διάσπαρτα ερείπια σε μία ιστορία, από την ακρόπολη και την άνοδο με το τελεφερίκ έως το Ασκληπιείο, ώστε οι πέτρες να αποκτούν νόημα αντί να μπερδεύονται.",
        ],
        ctaTitle: "Δες την Πέργαμο με έναν ντόπιο",
        ...IZM.el,
      },
      tr: {
        name: "Bergama (Pergamon)",
        metaTitle: "Bergama (Pergamon) Antik Kenti Turları & Yerel Rehberler",
        metaDescription:
          "İzmir yakınındaki UNESCO Dünya Mirası antik kent Bergama'yı doğrulanmış bir yerel rehberle keşfet. Antik çağın en dik tiyatrosu, efsanevi bir kütüphane ve Asklepion sağlık merkezi.",
        intro: [
          "Pergamon — bugünkü Bergama — antik dünyanın büyük kentlerinden biriydi; önce Yunan, sonra Roma, bugün ise UNESCO Dünya Mirası. Akropolü, ovanın üzerinde dik bir tepeyi taçlandırır: Trajan Tapınağı, Zeus Sunağı ve antik dünyanın en dik tiyatrosu, yamaca çarpıcı biçimde oyulmuş, yaklaşık 10.000 seyirci için.",
          "VibeGuide yerel uzmanıyla harabeler canlanır. Bergama Kütüphanesi'nin İskenderiye ile nasıl yarıştığını ve bize parşömeni kazandırdığını dinle, sonra Asklepion sağlık merkezine ve devasa Kızıl Avlu'ya (Kızıl Bazilika) in — kendi temponda, kendi dilinde, Kuşadası veya İzmir'e yaklaşık bir saat.",
        ],
        highlights: [
          { title: "Dik Tiyatro", desc: "Antik dünyanın en dik tiyatrosu, yamaca oyulmuş, yaklaşık 10.000 seyirci için." },
          { title: "Büyük Kütüphane", desc: "Yalnızca İskenderiye'nin gerisinde — parşömen (charta pergamena) burada mükemmelleştirildi." },
          { title: "Asklepion", desc: "Antik çağın en ünlü sağlık merkezlerinden biri, akropolün altındaki ovada." },
        ],
        faqs: [
          { q: "Bergama nerede?", a: "İzmir iline bağlı Bergama ilçesinde — Kuşadası veya İzmir'e yaklaşık bir saat, yerel rehberin planlayabileceği kolay bir günübirlik gezi." },
          { q: "Ne kadar zaman gerekir?", a: "Akropol, Asklepion ve Kızıl Avlu ayrı ayrı zaman ister; rehberle yarım gün, öne çıkanları rahatça kapsar." },
          { q: "Bergama'da rehber değer mi?", a: "Kesinlikle — kütüphane, Zeus Sunağı ve şifa ritüelleri tabela değil hikâyedir; rehber, boş harabelere yeniden hayat verir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Pergamon, Izmir'e bağlı Bergama ilçesinde yer alır; Kuşadası ya da Izmir'e yaklaşık bir saat uzaklıktadır ve araba veya otobüsle kolayca ulaşılır. Antik Akropolis, kentin üzerindeki dik bir tepeyi taçlandırır; buraya Akropolis teleferiği ile ya da karayoluyla çıkabilirsiniz. Şifa merkezi Asklepion ve Kızıl Avlu (Kızıl Bazilika) ise Bergama'nın içinde ayrı duraklardır ve güne kolayca eklenir.",
          "Sabah saatleri burada en ideal zamandır: hava daha serin, tepedeki kalıntıların üzerindeki ışık berrak ve tur grupları gelmeden önce kalabalık henüz seyrektir. Arazi diktir ve güneşe açıktır, bu yüzden yaz öğleden sonraları yorucu olabilirken ilkbahar ve sonbahar yürümek için en konforlu havayı sunar. Ne zaman gelirseniz gelin, sağlam ve rahat ayakkabılar ile su, tırmanışı çok daha keyifli kılar.",
          "Pergamon biletli bir UNESCO Dünya Mirası alanıdır; Akropolis, Asklepion ve Kızıl Avlu'nun her biri girmeye değer. Görkemli teraslar, dik bir tiyatro ve ovaya bakan geniş manzaralar sizi bekler. Lisanslı bir VibeGuide yerel rehberi, akropolisten teleferik çıkışına ve Asklepion'a kadar dağınık kalıntıları tek bir hikayede birleştirir; böylece taşlar birbirine karışmak yerine anlam kazanır.",
        ],
        ctaTitle: "Bergama'yı bir yerelle gez",
        ...IZM.tr,
      },
      it: {
        name: "Pergamo",
        metaTitle: "Tour dell'antica città di Pergamo (Bergama) con guide locali",
        metaDescription:
          "Esplora Pergamo, antica città Patrimonio dell'Umanità UNESCO vicino a Smirne, con una guida locale verificata. Il teatro più ripido dell'antichità, una biblioteca leggendaria e l'Asklepion.",
        intro: [
          "Pergamo — oggi Bergama — fu una delle grandi città del mondo antico, prima greca e poi romana, e oggi Patrimonio dell'Umanità UNESCO. La sua acropoli corona una collina ripida sopra la pianura, con il Tempio di Traiano, l'altare di Zeus e il teatro più ripido del mondo antico, scavato in modo spettacolare nel pendio per circa 10.000 spettatori.",
          "Con un esperto locale di VibeGuide le rovine prendono vita. Ascolta come la Biblioteca di Pergamo rivaleggiò con Alessandria e ci diede la pergamena, poi scendi all'Asklepion, centro di guarigione, e all'immensa Basilica Rossa (Kızıl Avlu) — al tuo ritmo e nella tua lingua, a circa un'ora da Kuşadası o Smirne.",
        ],
        highlights: [
          { title: "Il teatro ripido", desc: "Il teatro più ripido del mondo antico, scavato nel pendio per circa 10.000 spettatori." },
          { title: "La grande biblioteca", desc: "Seconda solo ad Alessandria — qui fu perfezionata la pergamena (charta pergamena)." },
          { title: "L'Asklepion", desc: "Uno dei centri di guarigione più celebri dell'antichità, nella pianura sotto l'acropoli." },
        ],
        faqs: [
          { q: "Dove si trova Pergamo?", a: "Nella cittadina di Bergama, provincia di Smirne — a circa un'ora da Kuşadası o Smirne, una comoda gita in giornata che una guida locale può organizzare." },
          { q: "Quanto tempo serve?", a: "Acropoli, Asklepion e Basilica Rossa meritano ciascuno del tempo; mezza giornata con una guida copre agevolmente i punti salienti." },
          { q: "Vale la pena una guida a Pergamo?", a: "Assolutamente — la biblioteca, l'altare di Zeus e i rituali di guarigione sono racconti, non cartelli; una guida ridà vita alle rovine deserte." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Pergamo si trova nella cittadina di Bergama, in provincia di Izmir, a circa un'ora da Kusadasi o Izmir e facilmente raggiungibile in auto o in pullman. L'antica Acropoli corona una collina ripida sopra il paese, cui si sale con la funivia Akropolis (teleferik) oppure su strada. Il santuario di guarigione Asklepion e la Basilica Rossa sono tappe distinte nella stessa Bergama, un'aggiunta comoda alla giornata.",
          "La mattina e il momento migliore qui: l'aria e piu fresca, la luce sulle rovine in cima e limpida e la folla e ancora rada prima dell'arrivo dei gruppi. Il terreno e ripido ed esposto al sole, quindi i pomeriggi estivi possono essere faticosi, mentre primavera e autunno offrono il clima piu piacevole per camminare. In qualsiasi periodo tu venga, scarpe comode e robuste e dell'acqua rendono la salita molto piu gradevole.",
          "Pergamo e un sito Patrimonio dell'Umanita UNESCO a pagamento, e vale la pena entrare all'Acropoli, all'Asklepion e alla Basilica Rossa. Aspettati grandi terrazze, un teatro ripidissimo e ampie vedute sulla pianura. Una guida locale abilitata VibeGuide lega le rovine sparse in un unico racconto, dall'acropoli e dalla salita in funivia fino all'Asklepion, cosi le pietre acquistano senso invece di confondersi.",
        ],
        ctaTitle: "Scopri Pergamo con un locale",
        ...IZM.it,
      },
      pl: {
        name: "Pergamon",
        metaTitle: "Pergamon (Bergama) — starożytne miasto, wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Pergamon, starożytne miasto wpisane na listę UNESCO koło Izmiru, z zweryfikowanym lokalnym przewodnikiem. Najbardziej strome teatr antyku, legendarna biblioteka i Asklepion.",
        intro: [
          "Pergamon — dziś Bergama — był jednym z wielkich miast starożytnego świata, najpierw greckim, potem rzymskim, a obecnie jest obiektem światowego dziedzictwa UNESCO. Jego akropol wieńczy strome wzgórze nad równiną: Świątynia Trajana, ołtarz Zeusa i najbardziej strome teatr świata antycznego, efektownie wykuty w zboczu dla około 10 000 widzów.",
          "Z lokalnym ekspertem VibeGuide ruiny ożywają. Posłuchaj, jak Biblioteka Pergamońska rywalizowała z Aleksandrią i dała nam pergamin, a potem zejdź do uzdrowiskowego Asklepionu i ogromnej Czerwonej Bazyliki (Kızıl Avlu) — we własnym tempie i w swoim języku, około godziny od Kuşadası lub Izmiru.",
        ],
        highlights: [
          { title: "Strome teatr", desc: "Najbardziej strome teatr świata antycznego, wykuty w zboczu dla około 10 000 widzów." },
          { title: "Wielka biblioteka", desc: "Ustępowała tylko Aleksandrii — tu udoskonalono pergamin (charta pergamena)." },
          { title: "Asklepion", desc: "Jeden z najsłynniejszych ośrodków uzdrawiania antyku, na równinie pod akropolem." },
        ],
        faqs: [
          { q: "Gdzie leży Pergamon?", a: "W miejscowości Bergama, prowincja Izmir — około godziny od Kuşadası lub Izmiru, łatwa jednodniowa wycieczka, którą zaplanuje lokalny przewodnik." },
          { q: "Ile czasu potrzebuję?", a: "Akropol, Asklepion i Czerwona Bazylika — każde zasługuje na chwilę; pół dnia z przewodnikiem swobodnie obejmuje to, co najważniejsze." },
          { q: "Czy w Pergamonie warto wziąć przewodnika?", a: "Zdecydowanie — biblioteka, ołtarz Zeusa i rytuały uzdrawiania to opowieści, nie tablice; przewodnik przywraca życie pustym ruinom." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Pergamon lezy w miasteczku Bergama w prowincji Izmir, okolo godziny drogi od Kusadasi lub Izmiru, latwo dostepny samochodem lub autokarem. Starozytny Akropol wienczy strome wzgorze nad miastem, na ktore wjedziesz kolejka linowa Akropolis (teleferik) albo droga. Osrodek uzdrowiskowy Asklepion i Czerwona Bazylika to osobne punkty w samej Bergamie, latwe do dolaczenia do planu dnia.",
          "Poranek jest tu najlepsza pora: powietrze jest chlodniejsze, swiatlo nad ruinami na szczycie czyste, a tlum wciaz niewielki, zanim dotra wycieczki. Teren jest stromy i wystawiony na slonce, wiec letnie popoludnia bywaja meczace, podczas gdy wiosna i jesien daja najprzyjemniejsza pogode na spacer. Kiedykolwiek przyjedziesz, solidne wygodne buty i woda sprawiaja, ze podejscie jest znacznie przyjemniejsze.",
          "Pergamon to biletowany obiekt Swiatowego Dziedzictwa UNESCO, a Akropol, Asklepion i Czerwona Bazylika - kazde z nich warto zwiedzic. Czekaja na ciebie okazale tarasy, bardzo stromy teatr i rozlegle widoki na rownine. Licencjonowany lokalny przewodnik VibeGuide splata rozproszone ruiny w jedna opowiesc, od akropolu i podejscia kolejka linowa po Asklepion, tak by kamienie nabraly sensu, zamiast zlewac sie w jedno.",
        ],
        ctaTitle: "Zobacz Pergamon z lokalnym przewodnikiem",
        ...IZM.pl,
      },
      nl: {
        name: "Pergamon",
        metaTitle: "Pergamon (Bergama) Oude Stad-tours & lokale gidsen",
        metaDescription:
          "Ontdek Pergamon, een antieke stad en UNESCO-werelderfgoed bij Izmir, met een geverifieerde lokale gids. Het steilste theater van de oudheid, een legendarische bibliotheek en het Asklepion.",
        intro: [
          "Pergamon — nu Bergama — was een van de grote steden van de oude wereld, eerst Grieks en daarna Romeins, en tegenwoordig UNESCO-werelderfgoed. De Akropolis kroont een steile heuvel boven de vlakte, met de Trajanustempel, het altaar van Zeus en het steilste theater van de oude wereld, spectaculair in de helling uitgehakt voor zo'n 10.000 toeschouwers.",
          "Met een lokale VibeGuide-expert komen de ruïnes tot leven. Hoor hoe de Bibliotheek van Pergamon wedijverde met Alexandrië en ons het perkament gaf, daal daarna af naar het geneescentrum Asklepion en de enorme Rode Basiliek (Kızıl Avlu) — in jouw tempo en in jouw taal, ongeveer een uur van Kuşadası of Izmir.",
        ],
        highlights: [
          { title: "Het steile theater", desc: "Het steilste theater van de oude wereld, in de helling uitgehakt voor zo'n 10.000 toeschouwers." },
          { title: "De grote bibliotheek", desc: "Alleen Alexandrië ging voor — hier werd het perkament (charta pergamena) vervolmaakt." },
          { title: "Het Asklepion", desc: "Een van de beroemdste geneescentra van de oudheid, op de vlakte onder de akropolis." },
        ],
        faqs: [
          { q: "Waar ligt Pergamon?", a: "In de stad Bergama, provincie Izmir — ongeveer een uur van Kuşadası of Izmir, een makkelijke dagtrip die een lokale gids voor je plant." },
          { q: "Hoeveel tijd heb ik nodig?", a: "De Akropolis, het Asklepion en de Rode Basiliek verdienen elk hun tijd; een halve dag met een gids dekt de hoogtepunten comfortabel." },
          { q: "Is een gids het waard in Pergamon?", a: "Zeker — de bibliotheek, het altaar van Zeus en de geneesrituelen zijn verhalen, geen bordjes; een gids blaast de lege ruïnes weer leven in." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Pergamon ligt in het stadje Bergama in de provincie Izmir, ongeveer een uur van Kusadasi of Izmir en makkelijk te bereiken met de auto of touringcar. De antieke Akropolis kroont een steile heuvel boven het stadje, die je bereikt met de Akropolis-kabelbaan (teleferik) of over de weg. Het geneeskundige heiligdom Asklepion en de Rode Basiliek zijn aparte stops in Bergama zelf, een makkelijke aanvulling op de dag.",
          "De ochtend is hier het beste moment: de lucht is koeler, het licht over de ruines op de heuveltop is helder en de drukte is nog gering voordat de groepen arriveren. Het terrein is steil en zonnig, dus zomermiddagen kunnen vermoeiend zijn, terwijl lente en herfst het aangenaamste wandelweer bieden. Wanneer je ook komt, stevige comfortabele schoenen en water maken de klim een stuk aangenamer.",
          "Pergamon is een UNESCO-werelderfgoedlocatie met toegangskaart, en de Akropolis, het Asklepion en de Rode Basiliek zijn elk de moeite van het betreden waard. Verwacht grootse terrassen, een steil theater en weidse uitzichten over de vlakte. Een erkende lokale VibeGuide-gids rijgt de verspreide ruines aaneen tot een verhaal, van de akropolis en de kabelbaan tot het Asklepion, zodat de stenen betekenis krijgen in plaats van in elkaar over te lopen.",
        ],
        ctaTitle: "Bezoek Pergamon met een local",
        ...IZM.nl,
      },
    },
  },
  {
    slug: "pamukkale",
    city: "Pamukkale",
    citySlug: "pamukkale",
    emoji: "🏞️",
    image:
      "https://images.unsplash.com/photo-1779952747150-0fe7c299332b?q=80&w=1600",
    lat: 37.9137,
    lng: 29.1187,
    i18n: {
      en: {
        name: "Pamukkale",
        metaTitle: "Pamukkale & Hierapolis Tours with Local Guides",
        metaDescription:
          "Discover Pamukkale, the UNESCO 'Cotton Castle', with a verified local guide. Walk the white travertines, explore ancient Hierapolis and swim in Cleopatra's Pool.",
        intro: [
          "Pamukkale — the 'Cotton Castle' — is one of Turkey's most surreal sights: a hillside of dazzling white travertine terraces, carved over millennia by calcium-rich thermal water cascading down and petrifying into pools that look like frozen cotton. It is a UNESCO World Heritage Site in Denizli, and you walk it barefoot, ankle-deep in warm mineral water.",
          "Just above the terraces stands Hierapolis, a Greco-Roman spa city with a grand theatre, one of Anatolia's largest necropolises and the thermal Antique Pool where you swim among toppled Roman columns. With a VibeGuide local you get the timing right, understand what you're seeing and make the long trip truly worth it.",
        ],
        highlights: [
          { title: "White Travertine Terraces", desc: "Blinding-white calcium pools cascading down the hill — walk them barefoot in warm spring water." },
          { title: "Ancient Hierapolis", desc: "A Greco-Roman spa city above the terraces: theatre, vast necropolis, Temple of Apollo and the sacred Plutonium." },
          { title: "Cleopatra's Antique Pool", desc: "Swim in warm thermal water among ancient Roman columns toppled by an earthquake." },
        ],
        faqs: [
          { q: "Do I need a guide for Pamukkale?", a: "You can wander alone, but Pamukkale and Hierapolis are two sites in one — thermal geology and a Roman city. A local guide connects them, times your visit around the crowds and glare, and makes a long day trip flow." },
          { q: "When is the best time to visit Pamukkale?", a: "Early morning or late afternoon. Midday sun makes the white terraces blinding and the crowds peak; sunset over the pools is spectacular. A guide plans the day around this." },
          { q: "How far is Pamukkale from the coast?", a: "It's about 19 km from Denizli and a long day trip from Antalya, Bodrum, Kuşadası or Marmaris. A guide handles the distance and timing so the drive is worth it." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Pamukkale lies in Denizli province in southwestern Turkey, about 19 kilometres from the city of Denizli. You can fly into Denizli (DNZ) or reach it as a day trip from the coast, and many visitors combine it with a wider tour of the region. The dazzling white terraces sit on a hillside above the plain, visible from a distance and easy to reach by car or organised transfer.",
          "Midday can be blinding and hot, with the white travertines reflecting the sun, so early morning or late afternoon is far more comfortable and rewarding. Those hours also bring softer light for photographs and thinner crowds on the terraces. It makes a long but memorable day trip from Antalya, Bodrum, Kusadasi or Izmir, so start early to enjoy the site at its calmest.",
          "The white travertines and the ancient city of Hierapolis share a single ticket, and you walk barefoot along the terraces to protect them, while Cleopatra's Antique Pool carries a separate fee. A licensed VibeGuide local guide helps you make sense of the terraces and the sprawling ruins of Hierapolis, from its theatre to its necropolis, and points you to the best spots and times for the mineral pools.",
        ],
        ctaTitle: "See Pamukkale with a local",
        ...PAM.en,
      },
      de: {
        name: "Pamukkale",
        metaTitle: "Pamukkale & Hierapolis Touren mit lokalen Guides",
        metaDescription:
          "Entdecke Pamukkale, das UNESCO-'Baumwollschloss', mit einem geprüften lokalen Guide. Laufe über die weißen Travertine, erkunde Hierapolis und bade im Kleopatra-Pool.",
        intro: [
          "Pamukkale — das 'Baumwollschloss' — ist einer der surrealsten Anblicke der Türkei: ein Hang aus strahlend weißen Travertin-Terrassen, über Jahrtausende von kalkreichem Thermalwasser geformt, das herabfließt und zu Becken erstarrt, die wie gefrorene Baumwolle wirken. Ein UNESCO-Welterbe in Denizli — du läufst barfuß, knöcheltief im warmen Mineralwasser.",
          "Direkt über den Terrassen liegt Hierapolis, eine griechisch-römische Kurstadt mit großem Theater, einer der größten Nekropolen Anatoliens und dem Thermalbecken 'Antiker Pool', in dem du zwischen umgestürzten römischen Säulen schwimmst. Mit einem VibeGuide-Local stimmst du das Timing ab, verstehst, was du siehst, und der lange Ausflug lohnt sich wirklich.",
        ],
        highlights: [
          { title: "Weiße Travertin-Terrassen", desc: "Blendend weiße Kalkbecken, die den Hang hinabfließen — barfuß im warmen Quellwasser." },
          { title: "Antikes Hierapolis", desc: "Eine griechisch-römische Kurstadt über den Terrassen: Theater, riesige Nekropole, Apollon-Tempel und das heilige Plutonium." },
          { title: "Kleopatras Antiker Pool", desc: "Bade im warmen Thermalwasser zwischen antiken römischen Säulen, die ein Erdbeben umwarf." },
        ],
        faqs: [
          { q: "Brauche ich einen Guide für Pamukkale?", a: "Du kannst allein umherlaufen, aber Pamukkale und Hierapolis sind zwei Stätten in einer — Thermalgeologie und eine römische Stadt. Ein lokaler Guide verbindet beides, plant um Menschenmengen und Blendung herum und lässt den langen Ausflug fließen." },
          { q: "Wann besucht man Pamukkale am besten?", a: "Früh am Morgen oder am späten Nachmittag. Die Mittagssonne macht die weißen Terrassen blendend, die Menschenmengen sind am größten; der Sonnenuntergang über den Becken ist spektakulär. Ein Guide plant den Tag danach." },
          { q: "Wie weit ist Pamukkale von der Küste entfernt?", a: "Etwa 19 km von Denizli und ein langer Tagesausflug von Antalya, Bodrum, Kuşadası oder Marmaris. Ein Guide übernimmt Distanz und Timing, damit sich die Fahrt lohnt." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Pamukkale liegt in der Provinz Denizli im Suedwesten der Tuerkei, etwa 19 Kilometer von der Stadt Denizli entfernt. Du kannst nach Denizli (DNZ) fliegen oder es als Tagesausflug von der Kueste aus erreichen, und viele Besucher verbinden es mit einer groesseren Rundreise durch die Region. Die strahlend weissen Terrassen liegen an einem Hang ueber der Ebene, schon von Weitem sichtbar und bequem mit Auto oder Transfer zu erreichen.",
          "Die Mittagszeit kann blendend hell und heiss sein, da die weissen Sinterterrassen die Sonne reflektieren; der fruehe Morgen oder spaete Nachmittag ist deutlich angenehmer und lohnender. In diesen Stunden gibt es weicheres Licht fuer Fotos und weniger Menschen auf den Terrassen. Als Tagesausflug von Antalya, Bodrum, Kusadasi oder Izmir ist es lang, aber unvergesslich, also brich frueh auf.",
          "Die weissen Sinterterrassen und die antike Stadt Hierapolis teilen sich ein Ticket, und du laeufst barfuss ueber die Terrassen, um sie zu schonen, waehrend fuer den Antiken Pool der Kleopatra eine separate Gebuehr anfaellt. Ein lizenzierter VibeGuide-Guide vor Ort hilft dir, die Terrassen und die weitlaeufigen Ruinen von Hierapolis vom Theater bis zur Nekropole zu verstehen und zeigt dir die besten Plaetze und Zeiten fuer die Mineralbecken.",
        ],
        ctaTitle: "Erlebe Pamukkale mit einem Local",
        ...PAM.de,
      },
      ru: {
        name: "Памуккале",
        metaTitle: "Памуккале и Иераполис: экскурсии с местными гидами",
        metaDescription:
          "Откройте Памуккале, «Хлопковый замок» из списка ЮНЕСКО, с проверенным местным гидом. Пройдите по белым травертинам, осмотрите Иераполис и искупайтесь в бассейне Клеопатры.",
        intro: [
          "Памуккале — «Хлопковый замок» — одно из самых сюрреалистичных мест Турции: склон из ослепительно белых травертиновых террас, за тысячелетия сотворённых богатой кальцием термальной водой, что стекает вниз и застывает бассейнами, похожими на замёрзший хлопок. Это объект Всемирного наследия ЮНЕСКО в Денизли, и вы идёте по нему босиком, по щиколотку в тёплой минеральной воде.",
          "Прямо над террасами стоит Иераполис — греко-римский курортный город с большим театром, одним из крупнейших некрополей Анатолии и термальным Античным бассейном, где вы плаваете среди рухнувших римских колонн. С местным гидом VibeGuide вы верно рассчитаете время, поймёте, на что смотрите, и долгая поездка по-настоящему окупится.",
        ],
        highlights: [
          { title: "Белые травертиновые террасы", desc: "Ослепительно белые кальциевые чаши, стекающие по склону — идите по ним босиком в тёплой воде источников." },
          { title: "Древний Иераполис", desc: "Греко-римский курорт над террасами: театр, огромный некрополь, храм Аполлона и священный Плутоний." },
          { title: "Античный бассейн Клеопатры", desc: "Купайтесь в тёплой термальной воде среди античных римских колонн, поваленных землетрясением." },
        ],
        faqs: [
          { q: "Нужен ли гид в Памуккале?", a: "Гулять можно и самому, но Памуккале и Иераполис — две достопримечательности в одной: термальная геология и римский город. Местный гид свяжет их, спланирует визит в обход толп и слепящего солнца и сделает долгую поездку удобной." },
          { q: "Когда лучше посещать Памуккале?", a: "Ранним утром или ближе к вечеру. Полуденное солнце делает белые террасы слепящими, а толпы — самыми плотными; закат над бассейнами великолепен. Гид спланирует день с учётом этого." },
          { q: "Как далеко Памуккале от побережья?", a: "Около 19 км от Денизли и долгая однодневная поездка из Анталии, Бодрума, Кушадасы или Мармариса. Гид возьмёт на себя расстояние и время, чтобы дорога того стоила." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Памуккале находится в провинции Денизли на юго-западе Турции, примерно в 19 километрах от города Денизли. Можно прилететь в Денизли (DNZ) или добраться сюда на однодневную поездку с побережья, и многие путешественники совмещают визит с более широким туром по региону. Ослепительно белые террасы расположены на склоне над равниной, видны издалека и легко достижимы на машине или трансфере.",
          "В полдень здесь может быть ослепительно ярко и жарко, ведь белый травертин отражает солнце, поэтому раннее утро или поздний день гораздо приятнее и выгоднее. В эти часы свет мягче для фотографий, а на террасах меньше людей. Это долгая, но запоминающаяся поездка из Антальи, Бодрума, Кушадасы или Измира, так что выезжайте пораньше.",
          "Белые травертины и античный город Иераполис объединены одним билетом, а по террасам ходят босиком, чтобы их сберечь; за античный бассейн Клеопатры взимается отдельная плата. Лицензированный местный гид VibeGuide поможет разобраться в террасах и обширных руинах Иераполиса, от театра до некрополя, и подскажет лучшие места и время для минеральных бассейнов.",
        ],
        ctaTitle: "Увидеть Памуккале с местным гидом",
        ...PAM.ru,
      },
      ar: {
        name: "باموكالي",
        metaTitle: "جولات باموكالي وهيرابوليس مع مرشدين محليين",
        metaDescription:
          "اكتشف باموكالي، «قلعة القطن» المدرجة في اليونسكو، مع مرشد محلي موثّق. امشِ على المصاطب البيضاء، واستكشف هيرابوليس القديمة، واسبح في حوض كليوباترا.",
        intro: [
          "باموكالي — «قلعة القطن» — من أكثر المشاهد سرياليةً في تركيا: تلّة من مصاطب الترافرتين البيضاء الباهرة، نحتتها عبر آلاف السنين مياهٌ حرارية غنية بالكالسيوم تنساب وتتحجّر أحواضًا تبدو كالقطن المتجمّد. إنه موقع تراث عالمي لليونسكو في دنيزلي، وتمشي عليه حافي القدمين، والماء المعدني الدافئ يبلغ الكاحل.",
          "فوق المصاطب مباشرةً تقوم هيرابوليس، مدينة استشفاء يونانية رومانية بمسرح ضخم، وواحدة من أكبر مقابر الأناضول، وحوض الآثار الحراري حيث تسبح بين أعمدة رومانية مطروحة أرضًا. مع مرشد محلي من VibeGuide تضبط التوقيت، وتفهم ما تراه، وتصبح الرحلة الطويلة تستحق العناء حقًا.",
        ],
        highlights: [
          { title: "مصاطب الترافرتين البيضاء", desc: "أحواض كلسية بيضاء باهرة تنساب على التلة — امشِ عليها حافيًا في ماء الينابيع الدافئ." },
          { title: "هيرابوليس القديمة", desc: "مدينة استشفاء يونانية رومانية فوق المصاطب: مسرح، ومقبرة شاسعة، ومعبد أبولو، والبلوتونيوم المقدّس." },
          { title: "حوض كليوباترا الأثري", desc: "اسبح في ماء حراري دافئ بين أعمدة رومانية قديمة أسقطها زلزال." },
        ],
        faqs: [
          { q: "هل أحتاج إلى مرشد في باموكالي؟", a: "يمكنك التجوّل وحدك، لكن باموكالي وهيرابوليس موقعان في واحد — جيولوجيا حرارية ومدينة رومانية. المرشد المحلي يربط بينهما، ويوقّت زيارتك بعيدًا عن الزحام والوهج، ويجعل رحلة اليوم الطويلة سلسة." },
          { q: "ما أفضل وقت لزيارة باموكالي؟", a: "الصباح الباكر أو نهاية العصر. شمس الظهيرة تجعل المصاطب البيضاء مبهرة والزحام في ذروته؛ وغروب الشمس فوق الأحواض ساحر. المرشد ينظّم اليوم على هذا الأساس." },
          { q: "كم تبعد باموكالي عن الساحل؟", a: "نحو 19 كم من دنيزلي، ورحلة يوم طويلة من أنطاليا أو بودروم أو كوشأداسي أو مرمريس. المرشد يتكفّل بالمسافة والتوقيت لتستحق الرحلة عناءها." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "تقع باموكالي في محافظة دنيزلي جنوب غرب تركيا، على بُعد نحو 19 كيلومترًا من مدينة دنيزلي. يمكنك الوصول جوًا إلى مطار دنيزلي (DNZ) أو القدوم في رحلة يوم واحد من الساحل، ويجمع كثير من الزوار بينها وبين جولة أوسع في المنطقة. تقع المدرجات البيضاء المبهرة على منحدر يعلو السهل، وتُرى من بعيد ويسهل الوصول إليها بالسيارة أو بوسيلة نقل منظمة.",
          "قد يكون منتصف النهار شديد السطوع والحرارة، إذ تعكس المدرجات الجيرية البيضاء أشعة الشمس، لذا فالصباح الباكر أو نهاية بعد الظهر أكثر راحة ومتعة بكثير. توفر هذه الساعات أيضًا ضوءًا أنعم للتصوير وازدحامًا أقل على المدرجات. إنها رحلة يوم طويلة لكنها لا تُنسى من أنطاليا أو بودروم أو كوشاداسي أو إزمير، فابدأ مبكرًا.",
          "تشترك المدرجات البيضاء ومدينة هيرابوليس القديمة في تذكرة واحدة، وتمشي حافي القدمين على المدرجات للحفاظ عليها، بينما لبركة كليوباترا الأثرية رسم منفصل. يساعدك مرشد VibeGuide المحلي المرخّص على فهم المدرجات وأطلال هيرابوليس الشاسعة، من مسرحها إلى مقبرتها، ويرشدك إلى أفضل الأماكن والأوقات للبرك المعدنية.",
        ],
        ctaTitle: "زر باموكالي مع مرشد محلي",
        ...PAM.ar,
      },
      es: {
        name: "Pamukkale",
        metaTitle: "Tours de Pamukkale y Hierápolis con guías locales",
        metaDescription:
          "Descubre Pamukkale, el 'Castillo de Algodón' de la UNESCO, con un guía local verificado. Camina por las travertinas blancas, explora Hierápolis y báñate en la Piscina de Cleopatra.",
        intro: [
          "Pamukkale — el 'Castillo de Algodón' — es una de las estampas más surrealistas de Turquía: una ladera de deslumbrantes terrazas de travertino blanco, esculpidas durante milenios por el agua termal rica en calcio que cae y se petrifica en pozas que parecen algodón congelado. Es Patrimonio Mundial de la UNESCO en Denizli, y se recorre descalzo, con el agua mineral tibia hasta el tobillo.",
          "Justo sobre las terrazas se alza Hierápolis, una ciudad-balneario grecorromana con un gran teatro, una de las mayores necrópolis de Anatolia y la termal Piscina Antigua, donde nadas entre columnas romanas derribadas. Con un local de VibeGuide aciertas con los horarios, entiendes lo que ves y la larga excursión merece de veras la pena.",
        ],
        highlights: [
          { title: "Terrazas de travertino blanco", desc: "Pozas de calcio de un blanco cegador que caen por la ladera — camínalas descalzo en agua termal tibia." },
          { title: "Hierápolis antigua", desc: "Una ciudad-balneario grecorromana sobre las terrazas: teatro, enorme necrópolis, Templo de Apolo y el sagrado Plutonio." },
          { title: "Piscina Antigua de Cleopatra", desc: "Nada en agua termal tibia entre columnas romanas antiguas derribadas por un terremoto." },
        ],
        faqs: [
          { q: "¿Necesito un guía para Pamukkale?", a: "Puedes recorrerlo solo, pero Pamukkale y Hierápolis son dos sitios en uno: geología termal y una ciudad romana. Un guía local los conecta, planifica la visita esquivando multitudes y reflejos, y hace fluida la larga excursión." },
          { q: "¿Cuál es la mejor hora para visitar Pamukkale?", a: "A primera hora o al final de la tarde. El sol del mediodía vuelve cegadoras las terrazas blancas y la multitud es máxima; el atardecer sobre las pozas es espectacular. Un guía organiza el día en torno a esto." },
          { q: "¿A qué distancia está Pamukkale de la costa?", a: "A unos 19 km de Denizli y una larga excursión de un día desde Antalya, Bodrum, Kuşadası o Marmaris. Un guía se ocupa de la distancia y los tiempos para que el viaje valga la pena." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Pamukkale se encuentra en la provincia de Denizli, en el suroeste de Turquia, a unos 19 kilometros de la ciudad de Denizli. Puedes volar a Denizli (DNZ) o llegar en una excursion de un dia desde la costa, y muchos visitantes lo combinan con un recorrido mas amplio por la region. Las deslumbrantes terrazas blancas se asientan en una ladera sobre la llanura, visibles desde lejos y faciles de alcanzar en coche o traslado organizado.",
          "El mediodia puede resultar cegador y caluroso, ya que los travertinos blancos reflejan el sol, asi que la primera hora de la manana o el final de la tarde es mucho mas comodo y gratificante. Esas horas ofrecen ademas una luz mas suave para las fotos y menos gente en las terrazas. Es una excursion larga pero memorable desde Antalya, Bodrum, Kusadasi o Izmir, asi que sal temprano.",
          "Los travertinos blancos y la antigua ciudad de Hierapolis comparten una sola entrada, y se camina descalzo por las terrazas para protegerlas, mientras que la Piscina Antigua de Cleopatra tiene una tarifa aparte. Un guia local titulado de VibeGuide te ayuda a entender las terrazas y las extensas ruinas de Hierapolis, desde su teatro hasta su necropolis, y te indica los mejores lugares y momentos para las piscinas minerales.",
        ],
        ctaTitle: "Visita Pamukkale con un local",
        ...PAM.es,
      },
      fr: {
        name: "Pamukkale",
        metaTitle: "Visites de Pamukkale et Hiérapolis avec guides locaux",
        metaDescription:
          "Découvrez Pamukkale, le 'Château de coton' de l'UNESCO, avec un guide local vérifié. Marchez sur les travertins blancs, explorez Hiérapolis et baignez-vous dans la Piscine de Cléopâtre.",
        intro: [
          "Pamukkale — le 'Château de coton' — est l'un des spectacles les plus surréalistes de Turquie : un versant de terrasses de travertin d'un blanc éclatant, sculptées pendant des millénaires par une eau thermale riche en calcium qui ruisselle et se pétrifie en vasques semblables à du coton figé. C'est un site du patrimoine mondial de l'UNESCO à Denizli, et on le parcourt pieds nus, l'eau minérale tiède jusqu'aux chevilles.",
          "Juste au-dessus des terrasses se dresse Hiérapolis, cité thermale gréco-romaine avec un grand théâtre, l'une des plus vastes nécropoles d'Anatolie et la Piscine antique thermale où l'on nage parmi des colonnes romaines effondrées. Avec un local VibeGuide, vous choisissez le bon moment, comprenez ce que vous voyez et cette longue excursion en vaut vraiment la peine.",
        ],
        highlights: [
          { title: "Terrasses de travertin blanc", desc: "Des vasques calcaires d'un blanc aveuglant qui dévalent le versant — parcourez-les pieds nus dans l'eau de source tiède." },
          { title: "Hiérapolis antique", desc: "Une cité thermale gréco-romaine au-dessus des terrasses : théâtre, vaste nécropole, temple d'Apollon et le sacré Plutonium." },
          { title: "Piscine antique de Cléopâtre", desc: "Nagez dans une eau thermale tiède parmi d'antiques colonnes romaines renversées par un séisme." },
        ],
        faqs: [
          { q: "Ai-je besoin d'un guide pour Pamukkale ?", a: "Vous pouvez flâner seul, mais Pamukkale et Hiérapolis sont deux sites en un : géologie thermale et cité romaine. Un guide local les relie, cale la visite hors des foules et de l'éblouissement, et fluidifie cette longue journée." },
          { q: "Quel est le meilleur moment pour visiter Pamukkale ?", a: "Tôt le matin ou en fin d'après-midi. Le soleil de midi rend les terrasses blanches aveuglantes et la foule est à son comble ; le coucher de soleil sur les vasques est spectaculaire. Un guide organise la journée en conséquence." },
          { q: "À quelle distance Pamukkale est-il de la côte ?", a: "À environ 19 km de Denizli et une longue excursion depuis Antalya, Bodrum, Kuşadası ou Marmaris. Un guide gère la distance et le timing pour que le trajet en vaille la peine." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Pamukkale se situe dans la province de Denizli, au sud-ouest de la Turquie, a environ 19 kilometres de la ville de Denizli. Vous pouvez atterrir a Denizli (DNZ) ou vous y rendre lors d'une excursion depuis la cote, et de nombreux visiteurs l'associent a un circuit plus large dans la region. Les eblouissantes terrasses blanches reposent sur un versant dominant la plaine, visibles de loin et faciles d'acces en voiture ou en transfert organise.",
          "La mi-journee peut etre eblouissante et chaude, car les travertins blancs reflechissent le soleil ; le petit matin ou la fin d'apres-midi est bien plus agreable et gratifiant. Ces heures offrent aussi une lumiere plus douce pour les photos et moins de monde sur les terrasses. C'est une excursion longue mais memorable depuis Antalya, Bodrum, Kusadasi ou Izmir, alors partez tot.",
          "Les travertins blancs et l'antique cite de Hierapolis partagent un meme billet, et l'on marche pieds nus sur les terrasses pour les preserver, tandis que la Piscine antique de Cleopatre est payante a part. Un guide local agree VibeGuide vous aide a decrypter les terrasses et les vastes ruines de Hierapolis, de son theatre a sa necropole, et vous indique les meilleurs endroits et moments pour les bassins mineraux.",
        ],
        ctaTitle: "Découvrez Pamukkale avec un local",
        ...PAM.fr,
      },
      el: {
        name: "Παμούκαλε",
        metaTitle: "Ξεναγήσεις στο Παμούκαλε & στην Ιεράπολη με ντόπιους ξεναγούς",
        metaDescription:
          "Ανακάλυψε το Παμούκαλε, το «Βαμβακένιο Κάστρο» της UNESCO, με πιστοποιημένο ντόπιο ξεναγό. Περπάτησε στους λευκούς τραβερτίνες, εξερεύνησε την αρχαία Ιεράπολη και κολύμπησε στην Πισίνα της Κλεοπάτρας.",
        intro: [
          "Το Παμούκαλε — το «Βαμβακένιο Κάστρο» — είναι ένα από τα πιο σουρεαλιστικά θεάματα της Τουρκίας: μια πλαγιά με εκτυφλωτικά λευκές αναβαθμίδες τραβερτίνη, σμιλεμένες επί χιλιετίες από ιαματικό νερό πλούσιο σε ασβέστιο που κυλά και απολιθώνεται σε λιμνούλες που μοιάζουν με παγωμένο βαμβάκι. Είναι Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO στο Ντενιζλί, και το περπατάς ξυπόλυτος, με το ζεστό μεταλλικό νερό ως τον αστράγαλο.",
          "Ακριβώς πάνω από τις αναβαθμίδες υψώνεται η Ιεράπολη, μια ελληνορωμαϊκή λουτρόπολη με μεγάλο θέατρο, μία από τις μεγαλύτερες νεκροπόλεις της Ανατολίας και την ιαματική Αρχαία Πισίνα, όπου κολυμπάς ανάμεσα σε πεσμένους ρωμαϊκούς κίονες. Με έναν ντόπιο του VibeGuide πετυχαίνεις τον σωστό χρόνο, καταλαβαίνεις τι βλέπεις και το μεγάλο ταξίδι αξίζει πραγματικά.",
        ],
        highlights: [
          { title: "Λευκές αναβαθμίδες τραβερτίνη", desc: "Εκτυφλωτικά λευκές ασβεστολιθικές λιμνούλες που κυλούν στην πλαγιά — περπάτησέ τες ξυπόλυτος στο ζεστό νερό της πηγής." },
          { title: "Αρχαία Ιεράπολη", desc: "Μια ελληνορωμαϊκή λουτρόπολη πάνω από τις αναβαθμίδες: θέατρο, τεράστια νεκρόπολη, Ναός του Απόλλωνα και το ιερό Πλουτώνιο." },
          { title: "Αρχαία Πισίνα της Κλεοπάτρας", desc: "Κολύμπησε σε ζεστό ιαματικό νερό ανάμεσα σε αρχαίους ρωμαϊκούς κίονες που έριξε σεισμός." },
        ],
        faqs: [
          { q: "Χρειάζομαι ξεναγό για το Παμούκαλε;", a: "Μπορείς να περιπλανηθείς μόνος, αλλά το Παμούκαλε και η Ιεράπολη είναι δύο μνημεία σε ένα — ιαματική γεωλογία και ρωμαϊκή πόλη. Ένας ντόπιος ξεναγός τα συνδέει, ρυθμίζει την επίσκεψη μακριά από πλήθος και θάμβος και κάνει τη μεγάλη μέρα να κυλά." },
          { q: "Πότε είναι η καλύτερη ώρα για το Παμούκαλε;", a: "Νωρίς το πρωί ή αργά το απόγευμα. Ο μεσημβρινός ήλιος κάνει τις λευκές αναβαθμίδες εκτυφλωτικές και το πλήθος κορυφώνεται· το ηλιοβασίλεμα πάνω από τις λιμνούλες είναι μαγευτικό. Ένας ξεναγός οργανώνει τη μέρα γύρω από αυτό." },
          { q: "Πόσο απέχει το Παμούκαλε από τις ακτές;", a: "Περίπου 19 χλμ. από το Ντενιζλί και μια μεγάλη ημερήσια εκδρομή από Αττάλεια, Μπόντρουμ, Κουσάντασι ή Μαρμαρίδα. Ένας ξεναγός αναλαμβάνει απόσταση και χρόνο, ώστε να αξίζει το ταξίδι." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Παμούκαλε βρίσκεται στην επαρχία Ντενιζλί, στα νοτιοδυτικά της Τουρκίας, περίπου 19 χιλιόμετρα από την πόλη Ντενιζλί. Μπορείτε να πετάξετε στο Ντενιζλί (DNZ) ή να φτάσετε με ημερήσια εκδρομή από την ακτή, ενώ πολλοί επισκέπτες το συνδυάζουν με μια ευρύτερη περιήγηση στην περιοχή. Τα εκθαμβωτικά λευκά αναβαθμίδια βρίσκονται σε μια πλαγιά πάνω από την πεδιάδα, ορατά από μακριά και εύκολα προσβάσιμα με αυτοκίνητο ή μεταφορά.",
          "Το μεσημέρι μπορεί να είναι εκτυφλωτικό και ζεστό, καθώς τα λευκά τραβερτίνη αντανακλούν τον ήλιο, οπότε το νωρίς το πρωί ή αργά το απόγευμα είναι πολύ πιο άνετο και ανταποδοτικό. Εκείνες οι ώρες προσφέρουν επίσης απαλότερο φως για φωτογραφίες και λιγότερο κόσμο. Είναι μια μακρά αλλά αξέχαστη ημερήσια εκδρομή από την Αττάλεια, το Μπόντρουμ, το Κουσάντασι ή τη Σμύρνη, γι' αυτό ξεκινήστε νωρίς.",
          "Τα λευκά τραβερτίνη και η αρχαία πόλη της Ιεράπολης μοιράζονται ένα εισιτήριο, και περπατάτε ξυπόλυτοι στα αναβαθμίδια για να τα προστατεύσετε, ενώ η Αρχαία Πισίνα της Κλεοπάτρας έχει ξεχωριστό αντίτιμο. Ένας αδειούχος τοπικός ξεναγός της VibeGuide σας βοηθά να κατανοήσετε τα αναβαθμίδια και τα εκτεταμένα ερείπια της Ιεράπολης, από το θέατρο ως τη νεκρόπολη, και σας δείχνει τα καλύτερα σημεία και ώρες για τις ιαματικές πισίνες.",
        ],
        ctaTitle: "Δες το Παμούκαλε με έναν ντόπιο",
        ...PAM.el,
      },
      tr: {
        name: "Pamukkale",
        metaTitle: "Pamukkale & Hierapolis Turları & Yerel Rehberler",
        metaDescription:
          "UNESCO'nun 'Pamuk Kalesi' Pamukkale'yi doğrulanmış bir yerel rehberle keşfet. Beyaz travertenlerde yürü, antik Hierapolis'i gez ve Kleopatra Havuzu'nda yüz.",
        intro: [
          "Pamukkale — 'Pamuk Kalesi' — Türkiye'nin en gerçeküstü manzaralarından biri: kalsiyum yüklü termal suyun binlerce yıl boyunca aşağı akıp donarak dondurulmuş pamuğu andıran havuzlar oluşturduğu, göz kamaştırıcı beyaz traverten teraslarından bir yamaç. Denizli'de bir UNESCO Dünya Mirası'dır ve üzerinde çıplak ayakla, ılık mineralli suda bilek boyu yürürsün.",
          "Terasların hemen üstünde, büyük tiyatrosu, Anadolu'nun en büyük nekropollerinden biri ve devrilmiş Roma sütunları arasında yüzdüğün termal Antik Havuz'uyla Greko-Romen kaplıca kenti Hierapolis yükselir. VibeGuide yerel rehberiyle zamanlamayı tutturur, ne gördüğünü anlar ve uzun yolculuğu gerçekten değerli kılarsın.",
        ],
        highlights: [
          { title: "Beyaz Traverten Terasları", desc: "Yamaçtan aşağı akan göz kamaştırıcı beyaz kalsiyum havuzları — ılık kaynak suyunda çıplak ayakla yürü." },
          { title: "Antik Hierapolis", desc: "Terasların üstünde Greko-Romen bir kaplıca kenti: tiyatro, devasa nekropol, Apollon Tapınağı ve kutsal Plutonium." },
          { title: "Kleopatra Antik Havuzu", desc: "Depremle devrilmiş antik Roma sütunları arasında ılık termal suda yüz." },
        ],
        faqs: [
          { q: "Pamukkale için rehbere ihtiyacım var mı?", a: "Tek başına gezebilirsin ama Pamukkale ile Hierapolis tek yerde iki sit — termal jeoloji ve bir Roma kenti. Yerel rehber ikisini bağlar, ziyaretini kalabalık ve göz alıcı ışıktan uzağa ayarlar ve uzun günü akıcı kılar." },
          { q: "Pamukkale'yi ziyaret için en iyi zaman ne?", a: "Sabah erken ya da öğleden sonra geç saatler. Öğle güneşi beyaz terasları göz alır ve kalabalık tavan yapar; havuzların üzerindeki gün batımı muhteşemdir. Rehber günü buna göre planlar." },
          { q: "Pamukkale sahile ne kadar uzak?", a: "Denizli'ye yaklaşık 19 km; Antalya, Bodrum, Kuşadası ya da Marmaris'ten uzun bir günübirlik gezi. Rehber mesafe ve zamanlamayı üstlenir, böylece yol değer." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Pamukkale, Türkiye'nin güneybatısında Denizli ilinde, Denizli şehrine yaklaşık 19 kilometre uzaklıkta yer alır. Denizli (DNZ) havalimanına uçabilir ya da sahilden günübirlik gelebilirsiniz; birçok ziyaretçi burayı bölgedeki daha geniş bir turla birleştirir. Göz kamaştıran beyaz travertenler ovanın üzerindeki bir yamaçta uzanır, uzaktan görülür ve arabayla veya düzenli transferle kolayca ulaşılır.",
          "Öğle saatleri göz kamaştırıcı ve sıcak olabilir, çünkü beyaz travertenler güneşi yansıtır; bu yüzden sabahın erken saatleri ya da öğleden sonranın sonu çok daha rahat ve keyiflidir. Bu saatler fotoğraf için daha yumuşak bir ışık ve teraslarda daha az kalabalık sunar. Antalya, Bodrum, Kuşadası ya da İzmir'den uzun ama unutulmaz bir günübirlik gezidir, o yüzden erken yola çıkın.",
          "Beyaz travertenler ve antik Hierapolis kenti tek biletle gezilir; terasları korumak için üzerlerinde yalınayak yürürsünüz, Kleopatra Antik Havuzu ise ayrı ücretlidir. Ruhsatlı bir yerel VibeGuide rehberi, terasları ve tiyatrosundan nekropolüne kadar Hierapolis'in geniş kalıntılarını anlamanıza yardımcı olur ve mineral havuzları için en iyi yerleri ve saatleri gösterir.",
        ],
        ctaTitle: "Pamukkale'yi bir yerelle gez",
        ...PAM.tr,
      },
      it: {
        name: "Pamukkale",
        metaTitle: "Tour di Pamukkale e Hierapolis con guide locali",
        metaDescription:
          "Scopri Pamukkale, il 'Castello di Cotone' dell'UNESCO, con una guida locale verificata. Cammina sui travertini bianchi, esplora l'antica Hierapolis e nuota nella Piscina di Cleopatra.",
        intro: [
          "Pamukkale — il 'Castello di Cotone' — è uno degli spettacoli più surreali della Turchia: un pendio di abbaglianti terrazze di travertino bianco, scolpite per millenni dall'acqua termale ricca di calcio che scende e si pietrifica in vasche simili a cotone congelato. È Patrimonio Mondiale UNESCO a Denizli, e lo si percorre a piedi nudi, con l'acqua minerale tiepida fino alla caviglia.",
          "Proprio sopra le terrazze sorge Hierapolis, città termale greco-romana con un grande teatro, una delle più vaste necropoli dell'Anatolia e la termale Piscina Antica, dove nuoti tra colonne romane rovesciate. Con un local di VibeGuide azzecchi i tempi, capisci ciò che vedi e la lunga gita ne vale davvero la pena.",
        ],
        highlights: [
          { title: "Terrazze di travertino bianco", desc: "Vasche di calcio di un bianco accecante che scendono lungo il pendio — percorrile a piedi nudi nell'acqua sorgiva tiepida." },
          { title: "Antica Hierapolis", desc: "Una città termale greco-romana sopra le terrazze: teatro, immensa necropoli, Tempio di Apollo e il sacro Plutonium." },
          { title: "Piscina Antica di Cleopatra", desc: "Nuota in acqua termale tiepida tra antiche colonne romane rovesciate da un terremoto." },
        ],
        faqs: [
          { q: "Serve una guida per Pamukkale?", a: "Puoi girarci da solo, ma Pamukkale e Hierapolis sono due siti in uno — geologia termale e una città romana. Una guida locale li collega, pianifica la visita evitando folla e riverbero e rende scorrevole la lunga giornata." },
          { q: "Qual è il momento migliore per visitare Pamukkale?", a: "Di prima mattina o nel tardo pomeriggio. Il sole di mezzogiorno rende accecanti le terrazze bianche e la folla è al culmine; il tramonto sulle vasche è spettacolare. Una guida organizza la giornata di conseguenza." },
          { q: "Quanto dista Pamukkale dalla costa?", a: "Circa 19 km da Denizli e una lunga gita di un giorno da Antalya, Bodrum, Kuşadası o Marmaris. Una guida gestisce distanza e tempi perché il viaggio valga la pena." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Pamukkale si trova nella provincia di Denizli, nel sud-ovest della Turchia, a circa 19 chilometri dalla citta di Denizli. Puoi atterrare a Denizli (DNZ) o raggiungerla in gita giornaliera dalla costa, e molti visitatori la abbinano a un tour piu ampio della regione. Le abbaglianti terrazze bianche si adagiano su un pendio sopra la pianura, visibili da lontano e facili da raggiungere in auto o con un transfer organizzato.",
          "Il mezzogiorno puo essere accecante e caldo, perche i travertini bianchi riflettono il sole, quindi il mattino presto o il tardo pomeriggio e molto piu piacevole e gratificante. In quelle ore la luce e piu morbida per le foto e ci sono meno persone sulle terrazze. E una gita lunga ma indimenticabile da Antalya, Bodrum, Kusadasi o Izmir, percio parti presto.",
          "I travertini bianchi e l'antica citta di Hierapolis condividono un unico biglietto, e si cammina a piedi nudi sulle terrazze per proteggerle, mentre la Piscina Antica di Cleopatra ha una tariffa a parte. Una guida locale abilitata VibeGuide ti aiuta a interpretare le terrazze e le vaste rovine di Hierapolis, dal teatro alla necropoli, e ti indica i posti e i momenti migliori per le piscine minerali.",
        ],
        ctaTitle: "Scopri Pamukkale con un locale",
        ...PAM.it,
      },
      pl: {
        name: "Pamukkale",
        metaTitle: "Pamukkale i Hierapolis — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Odkryj Pamukkale, wpisany na listę UNESCO 'Bawełniany Zamek', z zweryfikowanym lokalnym przewodnikiem. Przejdź po białych trawertynach, zwiedź antyczne Hierapolis i wykąp się w Basenie Kleopatry.",
        intro: [
          "Pamukkale — 'Bawełniany Zamek' — to jeden z najbardziej surrealistycznych widoków Turcji: zbocze olśniewająco białych trawertynowych tarasów, rzeźbionych przez tysiąclecia przez bogatą w wapń wodę termalną, która spływa i kamienieje w baseny przypominające zmrożoną bawełnę. To obiekt światowego dziedzictwa UNESCO w Denizli, po którym chodzi się boso, po kostki w ciepłej wodzie mineralnej.",
          "Tuż nad tarasami wznosi się Hierapolis, grecko-rzymskie miasto uzdrowiskowe z wielkim teatrem, jedną z największych nekropolii Anatolii i termalnym Antycznym Basenem, w którym pływasz wśród przewróconych rzymskich kolumn. Z lokalnym przewodnikiem VibeGuide trafiasz z porą, rozumiesz to, co widzisz, a długa wycieczka naprawdę się opłaca.",
        ],
        highlights: [
          { title: "Białe tarasy trawertynowe", desc: "Oślepiająco białe wapienne baseny spływające po zboczu — przejdź je boso w ciepłej wodzie źródlanej." },
          { title: "Antyczne Hierapolis", desc: "Grecko-rzymskie miasto uzdrowiskowe nad tarasami: teatr, ogromna nekropolia, Świątynia Apollina i święte Plutonium." },
          { title: "Antyczny Basen Kleopatry", desc: "Popływaj w ciepłej wodzie termalnej wśród antycznych rzymskich kolumn przewróconych przez trzęsienie ziemi." },
        ],
        faqs: [
          { q: "Czy potrzebuję przewodnika w Pamukkale?", a: "Możesz zwiedzać sam, ale Pamukkale i Hierapolis to dwa miejsca w jednym — geologia termalna i rzymskie miasto. Lokalny przewodnik je łączy, planuje wizytę z dala od tłumów i oślepiającego słońca i sprawia, że długi dzień płynie." },
          { q: "Kiedy najlepiej odwiedzić Pamukkale?", a: "Wczesnym rankiem lub późnym popołudniem. Południowe słońce sprawia, że białe tarasy oślepiają, a tłum jest największy; zachód słońca nad basenami jest zjawiskowy. Przewodnik planuje dzień pod tym kątem." },
          { q: "Jak daleko jest Pamukkale od wybrzeża?", a: "Około 19 km od Denizli i długa jednodniowa wycieczka z Antalyi, Bodrum, Kuşadası lub Marmaris. Przewodnik ogarnia dystans i czas, by wyjazd był wart zachodu." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Pamukkale leży w prowincji Denizli na południowym zachodzie Turcji, około 19 kilometrów od miasta Denizli. Można przylecieć do Denizli (DNZ) albo dotrzeć tu na jednodniową wycieczkę z wybrzeża, a wielu odwiedzających łączy je z szerszym objazdem regionu. Olśniewająco białe tarasy leżą na zboczu ponad równiną, widoczne z daleka i łatwo dostępne samochodem lub zorganizowanym transferem.",
          "Południe bywa oślepiające i upalne, bo białe trawertyny odbijają słońce, więc wczesny ranek lub późne popołudnie jest znacznie przyjemniejsze i bardziej satysfakcjonujące. O tych porach światło jest łagodniejsze do zdjęć, a na tarasach mniej ludzi. To długa, ale niezapomniana wycieczka z Antalyi, Bodrum, Kuşadası czy Izmiru, dlatego wyrusz wcześnie.",
          "Białe trawertyny i starożytne miasto Hierapolis obejmuje jeden bilet, a po tarasach chodzi się boso, aby je chronić, natomiast Antyczny Basen Kleopatry wymaga osobnej opłaty. Licencjonowany lokalny przewodnik VibeGuide pomoże ci zrozumieć tarasy i rozległe ruiny Hierapolis, od teatru po nekropolię, oraz wskaże najlepsze miejsca i pory na baseny mineralne.",
        ],
        ctaTitle: "Zobacz Pamukkale z lokalnym przewodnikiem",
        ...PAM.pl,
      },
      nl: {
        name: "Pamukkale",
        metaTitle: "Pamukkale- & Hierapolis-tours met lokale gidsen",
        metaDescription:
          "Ontdek Pamukkale, het UNESCO-'Katoenkasteel', met een geverifieerde lokale gids. Loop over de witte travertijnen, verken het antieke Hierapolis en zwem in het Cleopatra-bad.",
        intro: [
          "Pamukkale — het 'Katoenkasteel' — is een van de meest surrealistische taferelen van Turkije: een helling van verblindend witte travertijnterrassen, over millennia uitgehouwen door kalkrijk thermaalwater dat naar beneden stroomt en versteent tot poelen die op bevroren katoen lijken. Het is UNESCO-werelderfgoed in Denizli, en je loopt er blootsvoets, tot je enkels in het warme mineraalwater.",
          "Vlak boven de terrassen ligt Hierapolis, een Grieks-Romeinse kuurstad met een groot theater, een van de grootste necropolissen van Anatolië en het thermale Antieke Bad, waar je zwemt tussen omgevallen Romeinse zuilen. Met een local van VibeGuide kies je het juiste moment, begrijp je wat je ziet en is de lange trip het echt waard.",
        ],
        highlights: [
          { title: "Witte travertijnterrassen", desc: "Verblindend witte kalkpoelen die langs de helling stromen — loop er blootsvoets doorheen in warm bronwater." },
          { title: "Antiek Hierapolis", desc: "Een Grieks-Romeinse kuurstad boven de terrassen: theater, uitgestrekte necropolis, Apollotempel en het heilige Plutonium." },
          { title: "Antieke Bad van Cleopatra", desc: "Zwem in warm thermaalwater tussen antieke Romeinse zuilen die door een aardbeving zijn omgevallen." },
        ],
        faqs: [
          { q: "Heb ik een gids nodig voor Pamukkale?", a: "Je kunt er alleen rondlopen, maar Pamukkale en Hierapolis zijn twee locaties in één — thermale geologie en een Romeinse stad. Een lokale gids verbindt ze, plant je bezoek rond drukte en felle zon en laat de lange dag soepel verlopen." },
          { q: "Wat is de beste tijd om Pamukkale te bezoeken?", a: "Vroeg in de ochtend of laat in de middag. De middagzon maakt de witte terrassen verblindend en de drukte piekt; de zonsondergang boven de poelen is spectaculair. Een gids plant de dag hieromheen." },
          { q: "Hoe ver ligt Pamukkale van de kust?", a: "Ongeveer 19 km van Denizli en een lange dagtrip vanuit Antalya, Bodrum, Kuşadası of Marmaris. Een gids regelt afstand en timing zodat de rit de moeite waard is." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Pamukkale ligt in de provincie Denizli in het zuidwesten van Turkije, ongeveer 19 kilometer van de stad Denizli. Je kunt naar Denizli (DNZ) vliegen of het als dagtrip vanaf de kust bereiken, en veel bezoekers combineren het met een bredere rondreis door de regio. De verblindend witte terrassen liggen op een helling boven de vlakte, van veraf zichtbaar en gemakkelijk te bereiken met de auto of een georganiseerde transfer.",
          "Het middaguur kan verblindend en heet zijn, omdat de witte travertijnen de zon weerkaatsen, dus de vroege ochtend of late namiddag is veel aangenamer en de moeite waard. Die uren bieden ook zachter licht voor foto's en minder drukte op de terrassen. Het is een lange maar onvergetelijke dagtrip vanuit Antalya, Bodrum, Kusadasi of Izmir, dus vertrek vroeg.",
          "De witte travertijnen en de antieke stad Hierapolis delen een ticket, en je loopt op blote voeten over de terrassen om ze te beschermen, terwijl het Antieke Bad van Cleopatra een aparte toegangsprijs heeft. Een erkende lokale VibeGuide-gids helpt je de terrassen en de uitgestrekte ruines van Hierapolis te begrijpen, van het theater tot de necropolis, en wijst je de beste plekken en tijdstippen voor de mineraalbaden.",
        ],
        ctaTitle: "Bezoek Pamukkale met een local",
        ...PAM.nl,
      },
    },
  },
  {
    slug: "suleymaniye-mosque",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🕌",
    image:
      "https://images.unsplash.com/photo-1710162518260-1d200de27e1f?q=80&w=1600",
    lat: 41.0165,
    lng: 28.9639,
    i18n: {
      en: {
        name: "Süleymaniye Mosque",
        metaTitle: "Süleymaniye Mosque Tours & Local Guides",
        metaDescription:
          "Visit the Süleymaniye Mosque with a verified Istanbul guide. Mimar Sinan's masterpiece on the Third Hill, the tombs of Süleyman and Hürrem, and a panoramic terrace over the Golden Horn.",
        intro: [
          "The Süleymaniye Mosque crowns Istanbul's Third Hill above the Golden Horn, the imperial masterpiece of Mimar Sinan. Built between 1550 and 1557 for Sultan Süleyman the Magnificent, it balances a vast central dome on four minarets and a serene, light-filled prayer hall — the confident heart of classical Ottoman architecture at the height of the empire's power.",
          "With a VibeGuide local expert the complex reads like a story rather than a monument. A real guide connects the dome and the courtyard to the sultan who built it and the architect who defied gravity, then leads you to the garden tombs of Süleyman and his wife Hürrem — and to a terrace with one of the finest free views in the city.",
        ],
        highlights: [
          { title: "Sinan's great dome", desc: "A soaring central dome nearly 53 metres high, engineered so light and sound flow through the hall — the moment that sealed Mimar Sinan's genius." },
          { title: "The imperial tombs", desc: "In the garden behind the mosque stand the domed tombs of Süleyman the Magnificent and his wife Hürrem Sultan (Roxelana), richly tiled inside." },
          { title: "The panoramic terrace", desc: "The mosque's outer terrace opens onto a sweeping view over the Golden Horn and the domes of the old city — and it costs nothing." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Süleymaniye Mosque sits above the Grand Bazaar quarter on the Third Hill. The easiest approach is the T1 tram to Beyazıt or Laleli, followed by a short uphill walk through the university district; ferries to Eminönü and a climb from the Golden Horn are a scenic alternative. The lanes around the mosque are full of traditional bean restaurants and tea gardens.",
          "As a working mosque it welcomes visitors outside the five daily prayers, and it closes to tourists for a short time during each prayer and for longer at Friday midday. Early morning and late afternoon are the calmest, and the terrace is unforgettable near sunset. Even in peak season it stays far less crowded than the Blue Mosque.",
          "Entry is free and there is no ticket to buy. Dress modestly — shoulders and knees covered, and a head covering for women; you remove your shoes and carry them in a bag. A licensed VibeGuide local guide times your visit around the prayer schedule, explains the etiquette so you feel at ease, and unpacks the history behind Sinan's dome and the imperial tombs.",
        ],
        faqs: [
          { q: "Do I need a ticket for the Süleymaniye Mosque?", a: "No. It is a working mosque and entry is free. Visitors are welcome outside the five daily prayer times, and a VibeGuide local can plan your arrival so the mosque is open and calm." },
          { q: "What should I wear inside?", a: "Dress modestly with shoulders and knees covered; women cover their hair with a scarf, and everyone removes their shoes at the door. Scarves are usually available to borrow at the entrance if you need one." },
          { q: "Is it better than the Blue Mosque?", a: "It is Mimar Sinan's masterpiece and usually far less crowded, with a panoramic terrace the Blue Mosque lacks. Many guides consider it the finer building — a VibeGuide local can show you why." },
          { q: "How long does a visit take?", a: "Most visits run 45 minutes to an hour between the prayer hall, the tombs and the terrace, and pair naturally with the nearby Grand Bazaar or a walk down to the Golden Horn." },
        ],
        ctaTitle: "See Süleymaniye with a local",
        ...IST.en,
      },
      de: {
        name: "Süleymaniye-Moschee",
        metaTitle: "Süleymaniye-Moschee Touren & lokale Guides",
        metaDescription:
          "Besuche die Süleymaniye-Moschee mit einem geprüften Istanbul-Guide. Mimar Sinans Meisterwerk auf dem dritten Hügel, die Grabmäler von Süleyman und Hürrem und eine Panoramaterrasse über dem Goldenen Horn.",
        intro: [
          "Die Süleymaniye-Moschee krönt Istanbuls dritten Hügel über dem Goldenen Horn — das kaiserliche Meisterwerk von Mimar Sinan. Zwischen 1550 und 1557 für Sultan Süleyman den Prächtigen erbaut, balanciert sie eine gewaltige Zentralkuppel auf vier Minaretten und einem lichtdurchfluteten Gebetssaal — das selbstbewusste Herz der klassischen osmanischen Baukunst auf dem Höhepunkt der Macht des Reiches.",
          "Mit einem lokalen VibeGuide-Experten wird die Anlage zur Geschichte statt zum bloßen Denkmal. Ein echter Guide verbindet Kuppel und Hof mit dem Sultan, der sie erbauen ließ, und dem Architekten, der die Schwerkraft überlistete, und führt dich zu den Gartengräbern von Süleyman und seiner Frau Hürrem — und zu einer Terrasse mit einem der schönsten kostenlosen Ausblicke der Stadt.",
        ],
        highlights: [
          { title: "Sinans große Kuppel", desc: "Eine aufstrebende Zentralkuppel von fast 53 Metern Höhe, so konstruiert, dass Licht und Klang durch den Saal fließen — der Moment, der Mimar Sinans Genie besiegelte." },
          { title: "Die kaiserlichen Grabmäler", desc: "Im Garten hinter der Moschee stehen die Kuppelgräber von Süleyman dem Prächtigen und seiner Frau Hürrem Sultan (Roxelane), innen reich mit Fliesen geschmückt." },
          { title: "Die Panoramaterrasse", desc: "Die äußere Terrasse der Moschee öffnet sich zu einem weiten Blick über das Goldene Horn und die Kuppeln der Altstadt — und kostet nichts." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Die Süleymaniye-Moschee liegt oberhalb des Großen Basars auf dem dritten Hügel. Am einfachsten kommst du mit der Straßenbahn T1 bis Beyazıt oder Laleli und gehst dann ein kurzes Stück bergauf durch das Universitätsviertel; Fähren nach Eminönü und ein Aufstieg vom Goldenen Horn sind eine landschaftlich reizvolle Alternative. In den Gassen rund um die Moschee gibt es traditionelle Bohnenrestaurants und Teegärten.",
          "Als aktive Moschee empfängt sie Besucher außerhalb der fünf täglichen Gebete und bleibt Touristen während jedes Gebets kurz und freitagmittags länger verschlossen. Der frühe Morgen und der späte Nachmittag sind am ruhigsten, und die Terrasse ist bei Sonnenuntergang unvergesslich. Selbst in der Hochsaison bleibt sie weit weniger überlaufen als die Blaue Moschee.",
          "Der Eintritt ist frei, es gibt kein Ticket. Kleide dich dezent — Schultern und Knie bedeckt, für Frauen ein Kopftuch; die Schuhe ziehst du aus und trägst sie in einer Tüte. Ein lizenzierter VibeGuide vor Ort legt deinen Besuch um die Gebetszeiten, erklärt die Etikette, damit du dich wohlfühlst, und entschlüsselt die Geschichte hinter Sinans Kuppel und den kaiserlichen Grabmälern.",
        ],
        faqs: [
          { q: "Brauche ich ein Ticket für die Süleymaniye-Moschee?", a: "Nein. Es ist eine aktive Moschee, der Eintritt ist frei. Besucher sind außerhalb der fünf täglichen Gebetszeiten willkommen, und ein VibeGuide vor Ort plant deine Ankunft so, dass die Moschee offen und ruhig ist." },
          { q: "Was soll ich drinnen tragen?", a: "Kleide dich dezent mit bedeckten Schultern und Knien; Frauen bedecken ihr Haar mit einem Tuch, und alle ziehen am Eingang die Schuhe aus. Am Eingang kann man sich meist ein Tuch leihen, falls du keins hast." },
          { q: "Ist sie besser als die Blaue Moschee?", a: "Sie ist Mimar Sinans Meisterwerk und meist weit weniger überlaufen, mit einer Panoramaterrasse, die der Blauen Moschee fehlt. Viele Guides halten sie für das schönere Bauwerk — ein VibeGuide vor Ort zeigt dir, warum." },
          { q: "Wie lange dauert ein Besuch?", a: "Die meisten Besuche dauern 45 Minuten bis eine Stunde zwischen Gebetssaal, Grabmälern und Terrasse und lassen sich gut mit dem nahen Großen Basar oder einem Spaziergang zum Goldenen Horn verbinden." },
        ],
        ctaTitle: "Erlebe Süleymaniye mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Мечеть Сулеймание",
        metaTitle: "Мечеть Сулеймание: экскурсии с местными гидами",
        metaDescription:
          "Посетите мечеть Сулеймание с проверенным гидом в Стамбуле. Шедевр Мимара Синана на Третьем холме, гробницы Сулеймана и Хюррем и панорамная терраса над Золотым Рогом.",
        intro: [
          "Мечеть Сулеймание венчает Третий холм Стамбула над Золотым Рогом — имперский шедевр Мимара Синана. Построенная в 1550–1557 годах для султана Сулеймана Великолепного, она удерживает огромный центральный купол на четырёх минаретах и залитый светом молитвенный зал — уверенное сердце классической османской архитектуры на пике могущества империи.",
          "С местным экспертом VibeGuide комплекс читается как история, а не просто памятник. Настоящий гид связывает купол и двор с султаном, который её построил, и зодчим, что бросил вызов гравитации, а затем ведёт вас к садовым гробницам Сулеймана и его жены Хюррем — и на террасу с одним из лучших бесплатных видов города.",
        ],
        highlights: [
          { title: "Большой купол Синана", desc: "Взмывающий центральный купол высотой почти 53 метра, устроенный так, что свет и звук струятся сквозь зал — миг, закрепивший гений Мимара Синана." },
          { title: "Имперские гробницы", desc: "В саду за мечетью стоят купольные гробницы Сулеймана Великолепного и его жены Хюррем Султан (Роксоланы), богато украшенные изразцами внутри." },
          { title: "Панорамная терраса", desc: "Внешняя терраса мечети открывает широкий вид на Золотой Рог и купола старого города — и это бесплатно." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Мечеть Сулеймание стоит над кварталом Гранд-базара на Третьем холме. Проще всего добраться на трамвае T1 до остановки Beyazıt или Laleli, а оттуда подняться пешком через университетский квартал; паромы до Эминёню и подъём от Золотого Рога — живописная альтернатива. В переулках вокруг мечети полно традиционных фасолевых ресторанчиков и чайных садов.",
          "Как действующая мечеть она принимает посетителей вне пяти ежедневных молитв и закрывается для туристов ненадолго во время каждой молитвы и дольше в пятницу в полдень. Раннее утро и поздний день самые спокойные, а терраса незабываема на закате. Даже в разгар сезона здесь гораздо свободнее, чем в Голубой мечети.",
          "Вход бесплатный, билет не нужен. Одевайтесь скромно — плечи и колени закрыты, женщинам платок на голову; обувь снимают и несут в пакете. Лицензированный местный гид VibeGuide подстроит визит под расписание молитв, объяснит этикет, чтобы вы чувствовали себя свободно, и раскроет историю купола Синана и имперских гробниц.",
        ],
        faqs: [
          { q: "Нужен ли билет в мечеть Сулеймание?", a: "Нет. Это действующая мечеть, вход бесплатный. Посетителей ждут вне пяти ежедневных молитв, и местный гид VibeGuide спланирует прибытие так, чтобы мечеть была открыта и спокойна." },
          { q: "Что надеть внутри?", a: "Одевайтесь скромно: плечи и колени закрыты; женщины покрывают волосы платком, а обувь все снимают у входа. У входа обычно можно взять платок напрокат, если своего нет." },
          { q: "Она лучше Голубой мечети?", a: "Это шедевр Мимара Синана, и обычно здесь куда свободнее, а панорамной террасы у Голубой мечети нет. Многие гиды считают её более совершенным зданием — местный гид VibeGuide покажет почему." },
          { q: "Сколько длится посещение?", a: "Обычно визит занимает от 45 минут до часа между молитвенным залом, гробницами и террасой и хорошо сочетается с соседним Гранд-базаром или прогулкой к Золотому Рогу." },
        ],
        ctaTitle: "Увидеть Сулеймание с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "جامع السليمانية",
        metaTitle: "جولات جامع السليمانية مع مرشدين محليين",
        metaDescription:
          "زر جامع السليمانية مع مرشد موثّق في إسطنبول. تحفة المعمار سنان على التل الثالث، وضريحا سليمان وخُرّم، وشرفة بانورامية تطل على القرن الذهبي.",
        intro: [
          "يتوّج جامع السليمانية التل الثالث في إسطنبول فوق القرن الذهبي، وهو التحفة السلطانية للمعمار سنان. شُيّد بين عامي 1550 و1557 للسلطان سليمان القانوني، وهو يوازن قبة مركزية هائلة على أربع مآذن وقاعة صلاة غارقة في الضوء — القلب الواثق للعمارة العثمانية الكلاسيكية في أوج قوة الإمبراطورية.",
          "مع خبير محلي من VibeGuide يُقرأ المجمّع كقصة لا كمجرد أثر. المرشد الحقيقي يربط القبة والصحن بالسلطان الذي بناه والمعمار الذي تحدّى الجاذبية، ثم يقودك إلى ضريحي سليمان وزوجته خُرّم في الحديقة — وإلى شرفة تطل على أحد أجمل المناظر المجانية في المدينة.",
        ],
        highlights: [
          { title: "قبة سنان الكبرى", desc: "قبة مركزية شامخة يبلغ ارتفاعها نحو 53 مترًا، صُمّمت ليتدفق الضوء والصوت عبر القاعة — اللحظة التي رسّخت عبقرية المعمار سنان." },
          { title: "الأضرحة السلطانية", desc: "في الحديقة خلف الجامع يقوم ضريحا سليمان القانوني وزوجته خُرّم سلطان (روكسلانة) بقبتيهما، وهما مزيّنان بالقيشاني الغني من الداخل." },
          { title: "الشرفة البانورامية", desc: "تنفتح الشرفة الخارجية للجامع على منظر واسع للقرن الذهبي وقباب المدينة القديمة — دون أي رسوم." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع جامع السليمانية فوق حيّ البازار الكبير على التل الثالث. أسهل وصول هو بالترام T1 إلى محطة بايزيد أو لاليلي، ثم صعود قصير سيرًا عبر حي الجامعة؛ كما أن العبّارات إلى إمينونو والصعود من القرن الذهبي بديل خلاب. أزقة الجامع مليئة بمطاعم الفاصولياء التقليدية وحدائق الشاي.",
          "بوصفه جامعًا عاملًا يستقبل الزوار خارج أوقات الصلوات الخمس، ويُغلق أمام السياح لفترة قصيرة أثناء كل صلاة ولفترة أطول ظهر الجمعة. الصباح الباكر وآخر النهار أهدأ الأوقات، والشرفة لا تُنسى قرب الغروب. وحتى في ذروة الموسم يبقى أقل ازدحامًا بكثير من الجامع الأزرق.",
          "الدخول مجاني ولا تذكرة تُشترى. البس بحشمة — الكتفان والركبتان مغطّاة، وغطاء رأس للنساء؛ تخلع حذاءك وتحمله في كيس. يستطيع مرشد VibeGuide المحلي المرخّص أن ينظّم زيارتك حول مواقيت الصلاة، وأن يشرح آداب الدخول لتشعر بالراحة، وأن يفكّ لك تاريخ قبة سنان والأضرحة السلطانية.",
        ],
        faqs: [
          { q: "هل أحتاج تذكرة لجامع السليمانية؟", a: "لا. إنه جامع عامل والدخول مجاني. يُرحَّب بالزوار خارج أوقات الصلوات الخمس، ويستطيع مرشد VibeGuide المحلي أن يخطّط وصولك بحيث يكون الجامع مفتوحًا وهادئًا." },
          { q: "ماذا ألبس في الداخل؟", a: "البس بحشمة مع تغطية الكتفين والركبتين؛ تغطّي النساء شعرهن بوشاح، ويخلع الجميع أحذيتهم عند الباب. عادةً ما تتوفر أوشحة للاستعارة عند المدخل إن احتجت." },
          { q: "هل هو أفضل من الجامع الأزرق؟", a: "إنه تحفة المعمار سنان وعادةً أقل ازدحامًا بكثير، وله شرفة بانورامية يفتقر إليها الجامع الأزرق. يعدّه كثير من المرشدين المبنى الأجمل — ومرشد VibeGuide المحلي يريك السبب." },
          { q: "كم تستغرق الزيارة؟", a: "تستغرق معظم الزيارات من 45 دقيقة إلى ساعة بين قاعة الصلاة والأضرحة والشرفة، وتتكامل بسهولة مع البازار الكبير القريب أو نزهة إلى القرن الذهبي." },
        ],
        ctaTitle: "زر السليمانية مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Mezquita de Solimán",
        metaTitle: "Tours de la Mezquita de Solimán con guías locales",
        metaDescription:
          "Visita la Mezquita de Solimán con un guía verificado de Estambul. La obra maestra de Mimar Sinan en la Tercera Colina, las tumbas de Solimán y Hürrem y una terraza panorámica sobre el Cuerno de Oro.",
        intro: [
          "La Mezquita de Solimán corona la Tercera Colina de Estambul, sobre el Cuerno de Oro, la obra maestra imperial de Mimar Sinan. Construida entre 1550 y 1557 para el sultán Solimán el Magnífico, equilibra una enorme cúpula central sobre cuatro minaretes y una sala de oración serena y llena de luz — el corazón seguro de la arquitectura otomana clásica en el apogeo del imperio.",
          "Con un experto local de VibeGuide el conjunto se lee como una historia y no como un simple monumento. Un guía de verdad conecta la cúpula y el patio con el sultán que la mandó erigir y el arquitecto que desafió la gravedad, y luego te lleva a las tumbas ajardinadas de Solimán y su esposa Hürrem — y a una terraza con una de las mejores vistas gratuitas de la ciudad.",
        ],
        highlights: [
          { title: "La gran cúpula de Sinan", desc: "Una cúpula central que se eleva casi 53 metros, diseñada para que la luz y el sonido fluyan por la sala — el momento que selló el genio de Mimar Sinan." },
          { title: "Las tumbas imperiales", desc: "En el jardín tras la mezquita se alzan las tumbas abovedadas de Solimán el Magnífico y su esposa Hürrem Sultan (Roxelana), ricamente alicatadas por dentro." },
          { title: "La terraza panorámica", desc: "La terraza exterior de la mezquita se abre a una amplia vista sobre el Cuerno de Oro y las cúpulas de la ciudad vieja — y no cuesta nada." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "La Mezquita de Solimán se alza sobre el barrio del Gran Bazar, en la Tercera Colina. La forma más fácil de llegar es el tranvía T1 hasta Beyazıt o Laleli, seguido de una corta subida a pie por el distrito universitario; los ferris a Eminönü y una cuesta desde el Cuerno de Oro son una alternativa pintoresca. Las callejuelas en torno a la mezquita están llenas de restaurantes tradicionales de alubias y jardines de té.",
          "Como mezquita en funcionamiento recibe visitas fuera de las cinco oraciones diarias y cierra al turismo un rato durante cada oración y más tiempo el mediodía del viernes. La primera hora de la mañana y el final de la tarde son los momentos más tranquilos, y la terraza es inolvidable cerca del atardecer. Incluso en temporada alta está mucho menos concurrida que la Mezquita Azul.",
          "La entrada es gratuita y no hay que comprar ticket. Viste con recato — hombros y rodillas cubiertos, y un pañuelo en la cabeza para las mujeres; te quitas los zapatos y los llevas en una bolsa. Un guía local titulado de VibeGuide organiza tu visita en torno al horario de oración, te explica la etiqueta para que estés cómodo y desvela la historia tras la cúpula de Sinan y las tumbas imperiales.",
        ],
        faqs: [
          { q: "¿Necesito entrada para la Mezquita de Solimán?", a: "No. Es una mezquita en activo y la entrada es gratuita. Se admite a los visitantes fuera de las cinco oraciones diarias, y un guía local de VibeGuide puede planear tu llegada para que la mezquita esté abierta y tranquila." },
          { q: "¿Qué debo llevar dentro?", a: "Viste con recato, con hombros y rodillas cubiertos; las mujeres se cubren el pelo con un pañuelo y todos se quitan los zapatos en la puerta. Suele haber pañuelos prestados en la entrada por si necesitas uno." },
          { q: "¿Es mejor que la Mezquita Azul?", a: "Es la obra maestra de Mimar Sinan y suele estar mucho menos concurrida, con una terraza panorámica de la que carece la Mezquita Azul. Muchos guías la consideran el edificio más logrado — un guía local de VibeGuide te enseñará por qué." },
          { q: "¿Cuánto dura la visita?", a: "La mayoría de las visitas dura de 45 minutos a una hora entre la sala de oración, las tumbas y la terraza, y se combina de forma natural con el cercano Gran Bazar o un paseo hasta el Cuerno de Oro." },
        ],
        ctaTitle: "Visita Solimán con un local",
        ...IST.es,
      },
      fr: {
        name: "Mosquée de Soliman",
        metaTitle: "Visites de la Mosquée de Soliman avec guides locaux",
        metaDescription:
          "Visitez la Mosquée de Soliman avec un guide vérifié d'Istanbul. Le chef-d'œuvre de Mimar Sinan sur la Troisième Colline, les tombeaux de Soliman et Hürrem et une terrasse panoramique sur la Corne d'Or.",
        intro: [
          "La Mosquée de Soliman couronne la Troisième Colline d'Istanbul, au-dessus de la Corne d'Or, le chef-d'œuvre impérial de Mimar Sinan. Édifiée entre 1550 et 1557 pour le sultan Soliman le Magnifique, elle équilibre une immense coupole centrale sur quatre minarets et une salle de prière sereine, inondée de lumière — le cœur assuré de l'architecture ottomane classique à l'apogée de la puissance de l'empire.",
          "Avec un expert local VibeGuide, le complexe se lit comme un récit plutôt que comme un simple monument. Un vrai guide relie la coupole et la cour au sultan qui l'a fait bâtir et à l'architecte qui a défié la gravité, puis vous mène aux tombeaux, dans le jardin, de Soliman et de son épouse Hürrem — et à une terrasse offrant l'une des plus belles vues gratuites de la ville.",
        ],
        highlights: [
          { title: "La grande coupole de Sinan", desc: "Une coupole centrale culminant à près de 53 mètres, conçue pour que la lumière et le son circulent dans la salle — le moment qui scella le génie de Mimar Sinan." },
          { title: "Les tombeaux impériaux", desc: "Dans le jardin derrière la mosquée s'élèvent les tombeaux à coupole de Soliman le Magnifique et de son épouse Hürrem Sultan (Roxelane), richement carrelés à l'intérieur." },
          { title: "La terrasse panoramique", desc: "La terrasse extérieure de la mosquée s'ouvre sur une vaste vue de la Corne d'Or et des coupoles de la vieille ville — et elle est gratuite." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "La Mosquée de Soliman domine le quartier du Grand Bazar, sur la Troisième Colline. Le plus simple est de prendre le tramway T1 jusqu'à Beyazıt ou Laleli, puis de monter à pied un court instant à travers le quartier universitaire ; les ferries pour Eminönü et une montée depuis la Corne d'Or offrent une alternative pittoresque. Les ruelles autour de la mosquée regorgent de restaurants de haricots traditionnels et de jardins de thé.",
          "Mosquée en activité, elle accueille les visiteurs en dehors des cinq prières quotidiennes et ferme aux touristes brièvement pendant chaque prière et plus longuement le vendredi midi. Tôt le matin et en fin d'après-midi sont les moments les plus calmes, et la terrasse est inoubliable au coucher du soleil. Même en pleine saison, elle reste bien moins fréquentée que la Mosquée Bleue.",
          "L'entrée est gratuite et il n'y a pas de billet à acheter. Habillez-vous sobrement — épaules et genoux couverts, et un foulard sur la tête pour les femmes ; vous retirez vos chaussures et les portez dans un sac. Un guide local agréé VibeGuide cale votre visite sur les horaires de prière, explique les usages pour que vous soyez à l'aise et dévoile l'histoire derrière la coupole de Sinan et les tombeaux impériaux.",
        ],
        faqs: [
          { q: "Faut-il un billet pour la Mosquée de Soliman ?", a: "Non. C'est une mosquée en activité et l'entrée est gratuite. Les visiteurs sont les bienvenus en dehors des cinq prières quotidiennes, et un guide local VibeGuide peut planifier votre arrivée pour que la mosquée soit ouverte et calme." },
          { q: "Comment dois-je m'habiller à l'intérieur ?", a: "Habillez-vous sobrement, épaules et genoux couverts ; les femmes couvrent leurs cheveux d'un foulard et chacun retire ses chaussures à l'entrée. On peut généralement emprunter un foulard à l'entrée si besoin." },
          { q: "Est-elle mieux que la Mosquée Bleue ?", a: "C'est le chef-d'œuvre de Mimar Sinan, en général bien moins fréquenté, avec une terrasse panoramique que la Mosquée Bleue n'a pas. Beaucoup de guides la jugent plus aboutie — un guide local VibeGuide vous montrera pourquoi." },
          { q: "Combien de temps dure la visite ?", a: "La plupart des visites durent de 45 minutes à une heure entre la salle de prière, les tombeaux et la terrasse, et se marient naturellement avec le Grand Bazar tout proche ou une descente vers la Corne d'Or." },
        ],
        ctaTitle: "Visitez Soliman avec un local",
        ...IST.fr,
      },
      el: {
        name: "Τζαμί Σουλεϊμανιγιέ",
        metaTitle: "Ξεναγήσεις στο Τζαμί Σουλεϊμανιγιέ με ντόπιους ξεναγούς",
        metaDescription:
          "Επισκέψου το Τζαμί Σουλεϊμανιγιέ με πιστοποιημένο ξεναγό στην Κωνσταντινούπολη. Το αριστούργημα του Μιμάρ Σινάν στον Τρίτο Λόφο, οι τάφοι του Σουλεϊμάν και της Χιουρέμ και μια πανοραμική βεράντα πάνω από τον Κεράτιο.",
        intro: [
          "Το Τζαμί Σουλεϊμανιγιέ στέφει τον Τρίτο Λόφο της Κωνσταντινούπολης πάνω από τον Κεράτιο Κόλπο — το αυτοκρατορικό αριστούργημα του Μιμάρ Σινάν. Χτισμένο μεταξύ 1550 και 1557 για τον σουλτάνο Σουλεϊμάν τον Μεγαλοπρεπή, ισορροπεί έναν τεράστιο κεντρικό τρούλο πάνω σε τέσσερις μιναρέδες και μια γαλήνια, γεμάτη φως αίθουσα προσευχής — η αυτοπεποίθηση της κλασικής οθωμανικής αρχιτεκτονικής στο απόγειο της δύναμης της αυτοκρατορίας.",
          "Με έναν ντόπιο ειδικό του VibeGuide το συγκρότημα διαβάζεται σαν ιστορία κι όχι σαν απλό μνημείο. Ένας πραγματικός ξεναγός συνδέει τον τρούλο και την αυλή με τον σουλτάνο που το έχτισε και τον αρχιτέκτονα που αψήφησε τη βαρύτητα, κι έπειτα σε οδηγεί στους τάφους του Σουλεϊμάν και της συζύγου του Χιουρέμ στον κήπο — και σε μια βεράντα με μία από τις ωραιότερες δωρεάν θέες της πόλης.",
        ],
        highlights: [
          { title: "Ο μεγάλος τρούλος του Σινάν", desc: "Ένας κεντρικός τρούλος που υψώνεται σχεδόν 53 μέτρα, σχεδιασμένος ώστε το φως και ο ήχος να ρέουν μέσα στην αίθουσα — η στιγμή που σφράγισε την ιδιοφυΐα του Μιμάρ Σινάν." },
          { title: "Οι αυτοκρατορικοί τάφοι", desc: "Στον κήπο πίσω από το τζαμί στέκουν οι θολωτοί τάφοι του Σουλεϊμάν του Μεγαλοπρεπούς και της συζύγου του Χιουρέμ Σουλτάν (Ροξελάνης), πλούσια διακοσμημένοι με πλακίδια στο εσωτερικό." },
          { title: "Η πανοραμική βεράντα", desc: "Η εξωτερική βεράντα του τζαμιού ανοίγεται σε μια απέραντη θέα προς τον Κεράτιο και τους τρούλους της παλιάς πόλης — και δεν κοστίζει τίποτα." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Τζαμί Σουλεϊμανιγιέ βρίσκεται πάνω από τη συνοικία του Μεγάλου Παζαριού, στον Τρίτο Λόφο. Ο ευκολότερος τρόπος να φτάσετε είναι με το τραμ T1 μέχρι το Μπαγιαζίτ ή το Λαλελί κι έπειτα ένα σύντομο ανηφορικό περπάτημα μέσα από την πανεπιστημιακή συνοικία· τα φέρι προς το Εμινονού και η ανάβαση από τον Κεράτιο είναι μια γραφική εναλλακτική. Τα σοκάκια γύρω από το τζαμί είναι γεμάτα παραδοσιακά εστιατόρια με φασόλια και τσαγκάδικα.",
          "Ως ενεργό τζαμί δέχεται επισκέπτες εκτός των πέντε καθημερινών προσευχών και κλείνει για τους τουρίστες για λίγο σε κάθε προσευχή και για περισσότερο το μεσημέρι της Παρασκευής. Το νωρίς το πρωί και αργά το απόγευμα είναι τα πιο ήσυχα, και η βεράντα είναι αξέχαστη κοντά στο ηλιοβασίλεμα. Ακόμη και στην αιχμή της σεζόν παραμένει πολύ λιγότερο γεμάτο από το Μπλε Τζαμί.",
          "Η είσοδος είναι δωρεάν και δεν υπάρχει εισιτήριο. Ντυθείτε σεμνά — ώμοι και γόνατα καλυμμένα, και μαντίλα στο κεφάλι για τις γυναίκες· βγάζετε τα παπούτσια σας και τα κρατάτε σε μια σακούλα. Ένας αδειούχος τοπικός ξεναγός της VibeGuide προσαρμόζει την επίσκεψή σας γύρω από το πρόγραμμα των προσευχών, εξηγεί την εθιμοτυπία για να νιώσετε άνετα και ξεδιπλώνει την ιστορία πίσω από τον τρούλο του Σινάν και τους αυτοκρατορικούς τάφους.",
        ],
        faqs: [
          { q: "Χρειάζομαι εισιτήριο για το Τζαμί Σουλεϊμανιγιέ;", a: "Όχι. Είναι ενεργό τζαμί και η είσοδος είναι δωρεάν. Οι επισκέπτες είναι ευπρόσδεκτοι εκτός των πέντε καθημερινών προσευχών, και ένας ντόπιος ξεναγός της VibeGuide μπορεί να σχεδιάσει την άφιξή σας ώστε το τζαμί να είναι ανοιχτό και ήσυχο." },
          { q: "Τι να φορέσω μέσα;", a: "Ντυθείτε σεμνά, με καλυμμένους ώμους και γόνατα· οι γυναίκες καλύπτουν τα μαλλιά με μαντίλα και όλοι βγάζουν τα παπούτσια στην πόρτα. Συνήθως υπάρχουν μαντίλες προς δανεισμό στην είσοδο αν χρειαστείτε." },
          { q: "Είναι καλύτερο από το Μπλε Τζαμί;", a: "Είναι το αριστούργημα του Μιμάρ Σινάν και συνήθως πολύ λιγότερο γεμάτο, με μια πανοραμική βεράντα που δεν έχει το Μπλε Τζαμί. Πολλοί ξεναγοί το θεωρούν το αρτιότερο κτίριο — ένας ντόπιος ξεναγός της VibeGuide θα σας δείξει γιατί." },
          { q: "Πόσο διαρκεί η επίσκεψη;", a: "Οι περισσότερες επισκέψεις κρατούν 45 λεπτά έως μία ώρα ανάμεσα στην αίθουσα προσευχής, τους τάφους και τη βεράντα, και συνδυάζονται φυσικά με το κοντινό Μεγάλο Παζάρι ή μια βόλτα ως τον Κεράτιο." },
        ],
        ctaTitle: "Δες το Σουλεϊμανιγιέ με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Süleymaniye Camii",
        metaTitle: "Süleymaniye Camii Turları & Yerel Rehberler",
        metaDescription:
          "Süleymaniye Camii'ni doğrulanmış bir İstanbul rehberiyle gez. Haliç'e bakan üçüncü tepede Mimar Sinan'ın başyapıtı, Süleyman ve Hürrem'in türbeleri ve şehre bakan panoramik teras.",
        intro: [
          "Süleymaniye Camii, Haliç'in üstünde İstanbul'un üçüncü tepesini taçlandırır; Mimar Sinan'ın hükümdar başyapıtıdır. 1550–1557 arasında Kanuni Sultan Süleyman için inşa edilen yapı, devasa merkezî kubbesini dört minare ve ışıkla dolu, dingin bir harim üzerinde dengeler — imparatorluğun gücünün zirvesinde klasik Osmanlı mimarisinin kendinden emin kalbi.",
          "VibeGuide yerel uzmanıyla külliye bir anıt değil, bir hikâye gibi okunur. Gerçek bir rehber kubbeyi ve avluyu, camiyi yaptıran padişaha ve yerçekimine meydan okuyan mimara bağlar; sonra sizi bahçedeki Süleyman ile eşi Hürrem'in türbelerine ve şehrin en güzel ücretsiz manzaralarından birine bakan bir terasa götürür.",
        ],
        highlights: [
          { title: "Sinan'ın büyük kubbesi", desc: "Neredeyse 53 metre yükselen merkezî kubbe, ışığın ve sesin harim boyunca akacağı biçimde tasarlandı — Mimar Sinan'ın dehasını mühürleyen an." },
          { title: "Hükümdar türbeleri", desc: "Caminin arkasındaki bahçede Kanuni Sultan Süleyman ile eşi Hürrem Sultan'ın (Roksolana) kubbeli türbeleri yer alır; içleri zengin çinilerle bezelidir." },
          { title: "Panoramik teras", desc: "Caminin dış terası Haliç'e ve eski şehrin kubbelerine uzanan geniş bir manzaraya açılır — hem de ücretsizdir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Süleymaniye Camii, üçüncü tepede Kapalıçarşı semtinin üzerinde yükselir. En kolay ulaşım, T1 tramvayıyla Beyazıt ya da Laleli'ye inip üniversite semtinden kısa bir yokuş yürüyüşüdür; Eminönü'ne vapur ve Haliç'ten tırmanış da manzaralı bir alternatiftir. Caminin çevresindeki sokaklar geleneksel kuru fasulye lokantaları ve çay bahçeleriyle doludur.",
          "İbadete açık bir cami olarak beş vakit namaz dışında ziyaretçi kabul eder; her namaz vaktinde kısa, cuma öğlesinde daha uzun süre turistlere kapanır. Erken sabah ve ikindi sonrası en sakin saatlerdir, teras ise gün batımına yakın unutulmazdır. En yoğun sezonda bile Sultanahmet Camii'nden çok daha tenha kalır.",
          "Giriş ücretsizdir, bilet yoktur. Sade giyinin — omuzlar ve dizler kapalı, kadınlar için baş örtüsü; ayakkabılarınızı çıkarıp poşette taşırsınız. Lisanslı bir VibeGuide yerel rehberi ziyaretinizi namaz vakitlerine göre ayarlar, rahat edesiniz diye görgü kurallarını anlatır ve Sinan'ın kubbesiyle hükümdar türbelerinin ardındaki tarihi açar.",
        ],
        faqs: [
          { q: "Süleymaniye Camii için bilet gerekir mi?", a: "Hayır. İbadete açık bir camidir ve giriş ücretsizdir. Ziyaretçiler beş vakit namaz dışında hoş karşılanır; VibeGuide yerel rehberi varışınızı caminin açık ve sakin olacağı bir zamana ayarlayabilir." },
          { q: "İçeride ne giymeliyim?", a: "Omuzlar ve dizler kapalı, sade giyinin; kadınlar saçını bir eşarpla örter ve herkes kapıda ayakkabılarını çıkarır. İhtiyaç olursa girişte genellikle ödünç eşarp bulunur." },
          { q: "Sultanahmet Camii'nden daha mı iyi?", a: "Burası Mimar Sinan'ın başyapıtıdır ve genellikle çok daha tenhadır; Sultanahmet'te olmayan panoramik bir terası vardır. Birçok rehber onu daha üstün bir yapı sayar — VibeGuide yerel rehberi nedenini gösterir." },
          { q: "Ziyaret ne kadar sürer?", a: "Çoğu ziyaret harim, türbeler ve teras arasında 45 dakika ila bir saat sürer ve yakındaki Kapalıçarşı ya da Haliç'e inen bir yürüyüşle doğal biçimde birleşir." },
        ],
        ctaTitle: "Süleymaniye'yi bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Moschea di Solimano",
        metaTitle: "Tour della Moschea di Solimano con guide locali",
        metaDescription:
          "Visita la Moschea di Solimano con una guida verificata di Istanbul. Il capolavoro di Mimar Sinan sulla Terza Collina, le tombe di Solimano e Hürrem e una terrazza panoramica sul Corno d'Oro.",
        intro: [
          "La Moschea di Solimano corona la Terza Collina di Istanbul, sopra il Corno d'Oro, il capolavoro imperiale di Mimar Sinan. Costruita tra il 1550 e il 1557 per il sultano Solimano il Magnifico, bilancia un'enorme cupola centrale su quattro minareti e una sala di preghiera serena e piena di luce — il cuore sicuro dell'architettura ottomana classica all'apice della potenza dell'impero.",
          "Con un esperto locale VibeGuide il complesso si legge come un racconto e non come un semplice monumento. Una vera guida collega la cupola e il cortile al sultano che la fece erigere e all'architetto che sfidò la gravità, poi ti conduce alle tombe nel giardino di Solimano e della moglie Hürrem — e a una terrazza con una delle più belle vedute gratuite della città.",
        ],
        highlights: [
          { title: "La grande cupola di Sinan", desc: "Una cupola centrale alta quasi 53 metri, progettata perché luce e suono scorrano nella sala — il momento che suggellò il genio di Mimar Sinan." },
          { title: "Le tombe imperiali", desc: "Nel giardino dietro la moschea sorgono le tombe a cupola di Solimano il Magnifico e della moglie Hürrem Sultan (Roxelana), riccamente rivestite di piastrelle all'interno." },
          { title: "La terrazza panoramica", desc: "La terrazza esterna della moschea si apre su un'ampia veduta del Corno d'Oro e delle cupole della città vecchia — ed è gratuita." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "La Moschea di Solimano si erge sopra il quartiere del Gran Bazar, sulla Terza Collina. Il modo più semplice per arrivare è il tram T1 fino a Beyazıt o Laleli, seguito da una breve salita a piedi attraverso il quartiere universitario; i traghetti per Eminönü e una risalita dal Corno d'Oro sono un'alternativa pittoresca. I vicoli intorno alla moschea sono pieni di trattorie tradizionali di fagioli e giardini da tè.",
          "Essendo una moschea in funzione accoglie i visitatori al di fuori delle cinque preghiere quotidiane e chiude ai turisti per poco durante ogni preghiera e più a lungo il venerdì a mezzogiorno. Il mattino presto e il tardo pomeriggio sono i momenti più tranquilli, e la terrazza è indimenticabile verso il tramonto. Anche in alta stagione resta molto meno affollata della Moschea Blu.",
          "L'ingresso è gratuito e non c'è alcun biglietto da comprare. Vestiti in modo sobrio — spalle e ginocchia coperte e un foulard in testa per le donne; ti togli le scarpe e le porti in un sacchetto. Una guida locale abilitata di VibeGuide organizza la visita attorno all'orario delle preghiere, spiega l'etichetta perché tu sia a tuo agio e svela la storia dietro la cupola di Sinan e le tombe imperiali.",
        ],
        faqs: [
          { q: "Serve un biglietto per la Moschea di Solimano?", a: "No. È una moschea in funzione e l'ingresso è gratuito. I visitatori sono benvenuti al di fuori delle cinque preghiere quotidiane, e una guida locale VibeGuide può pianificare il tuo arrivo perché la moschea sia aperta e tranquilla." },
          { q: "Come devo vestirmi dentro?", a: "Vesti in modo sobrio, con spalle e ginocchia coperte; le donne coprono i capelli con un foulard e tutti si tolgono le scarpe all'ingresso. All'entrata di solito si possono prendere in prestito dei foulard se ti servono." },
          { q: "È meglio della Moschea Blu?", a: "È il capolavoro di Mimar Sinan e di solito molto meno affollata, con una terrazza panoramica che la Moschea Blu non ha. Molte guide la considerano l'edificio più riuscito — una guida locale VibeGuide ti mostrerà perché." },
          { q: "Quanto dura la visita?", a: "La maggior parte delle visite dura dai 45 minuti a un'ora tra sala di preghiera, tombe e terrazza, e si abbina naturalmente al vicino Gran Bazar o a una passeggiata fino al Corno d'Oro." },
        ],
        ctaTitle: "Visita Solimano con un locale",
        ...IST.it,
      },
      pl: {
        name: "Meczet Sulejmana",
        metaTitle: "Meczet Sulejmana — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Meczet Sulejmana z zweryfikowanym przewodnikiem w Stambule. Arcydzieło Mimara Sinana na Trzecim Wzgórzu, grobowce Sulejmana i Hürrem oraz panoramiczny taras nad Złotym Rogiem.",
        intro: [
          "Meczet Sulejmana wieńczy Trzecie Wzgórze Stambułu nad Złotym Rogiem — imperialne arcydzieło Mimara Sinana. Wzniesiony w latach 1550–1557 dla sułtana Sulejmana Wspaniałego, równoważy ogromną kopułę centralną na czterech minaretach i pełną światła, spokojną salę modlitwy — pewne siebie serce klasycznej architektury osmańskiej u szczytu potęgi imperium.",
          "Z lokalnym ekspertem VibeGuide kompleks czyta się jak opowieść, a nie zwykły zabytek. Prawdziwy przewodnik łączy kopułę i dziedziniec z sułtanem, który go wzniósł, i architektem, który rzucił wyzwanie grawitacji, a potem prowadzi cię do ogrodowych grobowców Sulejmana i jego żony Hürrem — oraz na taras z jednym z najpiękniejszych darmowych widoków w mieście.",
        ],
        highlights: [
          { title: "Wielka kopuła Sinana", desc: "Wznosząca się na niemal 53 metry kopuła centralna, zaprojektowana tak, by światło i dźwięk płynęły przez salę — moment, który przypieczętował geniusz Mimara Sinana." },
          { title: "Grobowce sułtańskie", desc: "W ogrodzie za meczetem stoją kopułowe grobowce Sulejmana Wspaniałego i jego żony Hürrem Sultan (Roksolany), bogato wyłożone kaflami w środku." },
          { title: "Panoramiczny taras", desc: "Zewnętrzny taras meczetu otwiera się na rozległy widok na Złoty Róg i kopuły starego miasta — i nic nie kosztuje." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Meczet Sulejmana wznosi się nad dzielnicą Wielkiego Bazaru, na Trzecim Wzgórzu. Najłatwiej dojechać tramwajem T1 do Beyazıt lub Laleli, a stamtąd wejść pod górę krótkim spacerem przez dzielnicę uniwersytecką; promy do Eminönü i podejście od Złotego Rogu to malownicza alternatywa. Uliczki wokół meczetu pełne są tradycyjnych jadłodajni z fasolą i herbaciarni.",
          "Jako czynny meczet przyjmuje zwiedzających poza pięcioma codziennymi modlitwami i zamyka się dla turystów na krótko podczas każdej modlitwy oraz na dłużej w piątkowe południe. Wczesny ranek i późne popołudnie są najspokojniejsze, a taras bywa niezapomniany o zachodzie słońca. Nawet w szczycie sezonu jest znacznie mniej tłoczno niż w Błękitnym Meczecie.",
          "Wstęp jest bezpłatny i nie trzeba kupować biletu. Ubierz się skromnie — zakryte ramiona i kolana, a dla kobiet chusta na głowę; zdejmujesz buty i niesiesz je w torbie. Licencjonowany lokalny przewodnik VibeGuide dostosuje twoją wizytę do rozkładu modlitw, wyjaśni zasady, byś czuł się swobodnie, i odsłoni historię kryjącą się za kopułą Sinana i grobowcami sułtańskimi.",
        ],
        faqs: [
          { q: "Czy potrzebuję biletu do Meczetu Sulejmana?", a: "Nie. To czynny meczet, a wstęp jest bezpłatny. Zwiedzających przyjmuje się poza pięcioma codziennymi modlitwami, a lokalny przewodnik VibeGuide zaplanuje twoje przybycie tak, by meczet był otwarty i spokojny." },
          { q: "Co powinienem założyć w środku?", a: "Ubierz się skromnie, z zakrytymi ramionami i kolanami; kobiety nakrywają włosy chustą, a wszyscy zdejmują buty przy wejściu. Przy wejściu zwykle można pożyczyć chustę, jeśli jej potrzebujesz." },
          { q: "Czy jest lepszy niż Błękitny Meczet?", a: "To arcydzieło Mimara Sinana i zwykle znacznie mniej zatłoczone, z panoramicznym tarasem, którego nie ma Błękitny Meczet. Wielu przewodników uważa go za doskonalszą budowlę — lokalny przewodnik VibeGuide pokaże ci dlaczego." },
          { q: "Ile trwa zwiedzanie?", a: "Większość wizyt trwa od 45 minut do godziny między salą modlitwy, grobowcami i tarasem i naturalnie łączy się z pobliskim Wielkim Bazarem lub spacerem do Złotego Rogu." },
        ],
        ctaTitle: "Zobacz Meczet Sulejmana z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Süleymaniye-moskee",
        metaTitle: "Süleymaniye-moskee tours & lokale gidsen",
        metaDescription:
          "Bezoek de Süleymaniye-moskee met een geverifieerde gids in Istanbul. Het meesterwerk van Mimar Sinan op de Derde Heuvel, de graven van Süleyman en Hürrem en een panoramaterras boven de Gouden Hoorn.",
        intro: [
          "De Süleymaniye-moskee kroont de Derde Heuvel van Istanbul boven de Gouden Hoorn — het keizerlijke meesterwerk van Mimar Sinan. Gebouwd tussen 1550 en 1557 voor sultan Süleyman de Grote, balanceert ze een enorme centrale koepel op vier minaretten en een serene, lichte gebedszaal — het zelfverzekerde hart van de klassieke Ottomaanse bouwkunst op het hoogtepunt van de macht van het rijk.",
          "Met een lokale VibeGuide-expert leest het complex als een verhaal in plaats van een monument. Een echte gids verbindt de koepel en de binnenplaats met de sultan die haar liet bouwen en de architect die de zwaartekracht tartte, en leidt je dan naar de tuingraven van Süleyman en zijn vrouw Hürrem — en naar een terras met een van de mooiste gratis uitzichten van de stad.",
        ],
        highlights: [
          { title: "Sinans grote koepel", desc: "Een centrale koepel die bijna 53 meter oprijst, zo ontworpen dat licht en geluid door de zaal stromen — het moment dat het genie van Mimar Sinan bezegelde." },
          { title: "De keizerlijke graven", desc: "In de tuin achter de moskee staan de koepelgraven van Süleyman de Grote en zijn vrouw Hürrem Sultan (Roxelana), van binnen rijk betegeld." },
          { title: "Het panoramaterras", desc: "Het buitenterras van de moskee opent op een weids uitzicht over de Gouden Hoorn en de koepels van de oude stad — en het kost niets." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Süleymaniye-moskee verrijst boven de wijk van de Grote Bazaar, op de Derde Heuvel. Het eenvoudigst reis je met tram T1 tot Beyazıt of Laleli, gevolgd door een korte klim te voet door de universiteitswijk; veerboten naar Eminönü en een klim vanaf de Gouden Hoorn zijn een schilderachtig alternatief. De straatjes rond de moskee zitten vol traditionele bonenrestaurants en theetuinen.",
          "Als werkende moskee ontvangt ze bezoekers buiten de vijf dagelijkse gebeden en sluit ze kort voor toeristen tijdens elk gebed en langer op vrijdagmiddag. De vroege ochtend en late namiddag zijn het rustigst, en het terras is onvergetelijk rond zonsondergang. Zelfs in het hoogseizoen blijft ze veel minder druk dan de Blauwe Moskee.",
          "De toegang is gratis en er is geen kaartje te kopen. Kleed je bescheiden — schouders en knieën bedekt, en een hoofddoek voor vrouwen; je doet je schoenen uit en draagt ze in een tasje. Een erkende lokale VibeGuide-gids stemt je bezoek af op de gebedstijden, legt de etiquette uit zodat je je op je gemak voelt en ontrafelt de geschiedenis achter Sinans koepel en de keizerlijke graven.",
        ],
        faqs: [
          { q: "Heb ik een kaartje nodig voor de Süleymaniye-moskee?", a: "Nee. Het is een werkende moskee en de toegang is gratis. Bezoekers zijn welkom buiten de vijf dagelijkse gebedstijden, en een lokale VibeGuide-gids kan je aankomst plannen zodat de moskee open en rustig is." },
          { q: "Wat moet ik binnen dragen?", a: "Kleed je bescheiden met bedekte schouders en knieën; vrouwen bedekken hun haar met een doek en iedereen doet de schoenen uit bij de deur. Bij de ingang zijn meestal doeken te leen als je er een nodig hebt." },
          { q: "Is ze beter dan de Blauwe Moskee?", a: "Het is het meesterwerk van Mimar Sinan en meestal veel minder druk, met een panoramaterras dat de Blauwe Moskee niet heeft. Veel gidsen vinden het het fraaiere gebouw — een lokale VibeGuide-gids laat je zien waarom." },
          { q: "Hoe lang duurt een bezoek?", a: "De meeste bezoeken duren 45 minuten tot een uur tussen de gebedszaal, de graven en het terras, en laten zich natuurlijk combineren met de nabije Grote Bazaar of een wandeling naar de Gouden Hoorn." },
        ],
        ctaTitle: "Bekijk Süleymaniye met een local",
        ...IST.nl,
      },
    },
  },
  {
    slug: "spice-bazaar",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🌶️",
    image:
      "https://images.unsplash.com/photo-1629212093570-ff59255e89e0?q=80&w=1600",
    lat: 41.0165,
    lng: 28.9704,
    i18n: {
      en: {
        name: "Spice Bazaar",
        metaTitle: "Spice Bazaar (Egyptian Bazaar) Tours & Local Guides",
        metaDescription:
          "Explore Istanbul's Spice Bazaar with a verified local guide. Heaped spices, saffron, Turkish delight and teas in a 17th-century covered market beside the New Mosque in Eminönü.",
        intro: [
          "The Spice Bazaar — the Mısır Çarşısı, or Egyptian Bazaar — is Istanbul's most fragrant market, a 17th-century L-shaped hall of vaulted arcades in the heart of Eminönü. Built in the 1660s as part of the New Mosque complex, it was funded by trade with Ottoman Egypt, and to this day its stalls overflow with pyramids of spice, saffron, dried fruit, nuts and tea.",
          "With a VibeGuide local expert the crowd and the colour make sense. A real guide walks you past the tourist traps to honest, long-standing vendors, tells you what real saffron and pure Turkish delight should cost, and lets you taste before you buy — turning a chaotic aisle into a relaxed morning of flavours and stories.",
        ],
        highlights: [
          { title: "Mountains of spice", desc: "Cones of paprika, sumac, cumin and cinnamon rise beside jars of deep-red saffron — the scents that gave the bazaar its name and its fame." },
          { title: "Turkish delight & sweets", desc: "Trays of lokum in every flavour, from pomegranate and pistachio to rose, sit beside dried apricots, figs and honeyed nuts — most stalls offer a taste." },
          { title: "Teas & the New Mosque", desc: "Apple tea, herbal blends and coffee fill the air, and the great domed Yeni Cami rises right beside the bazaar's main gate." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Spice Bazaar sits in Eminönü, right beside the New Mosque and a two-minute walk from the Galata Bridge and the Bosphorus ferry piers. The easiest arrival is the T1 tram to the Eminönü stop, or a ferry across the Golden Horn; the waterfront setting makes it easy to fold into a day along the old city's shore.",
          "The bazaar is busiest in the middle of the day, so an early-morning visit is calmer and lets you talk to vendors before the crowds arrive. It runs on a daily schedule and gets especially lively at weekends. Spring and autumn are pleasant, but the covered hall stays welcoming in any weather.",
          "Entry is free and there is nothing to book — you simply walk in. Prices are rarely fixed, so a little friendly haggling is expected, and quality varies from stall to stall. A licensed VibeGuide local guide steers you to trusted vendors, helps you judge real saffron from dyed, and negotiates fair prices while you taste your way through the market.",
        ],
        faqs: [
          { q: "Is the Spice Bazaar free to enter?", a: "Yes, entry is completely free and there is nothing to book. A VibeGuide local can meet you at the gate and guide you to the most trustworthy vendors inside." },
          { q: "Should I haggle at the Spice Bazaar?", a: "Prices are rarely fixed, so polite bargaining is normal and expected. A local guide knows the fair rate for saffron, lokum and tea and negotiates for you so you don't overpay." },
          { q: "How is it different from the Grand Bazaar?", a: "The Spice Bazaar is smaller, more fragrant and focused on food — spices, sweets, teas and nuts — while the Grand Bazaar is a vast maze of jewellery, carpets and crafts. Many visitors do both in one day." },
          { q: "When is the best time to go?", a: "Mornings are the calmest, before tour groups and shoppers fill the aisles. Weekdays are quieter than weekends, and a VibeGuide local can time your visit for the best experience." },
        ],
        ctaTitle: "See the Spice Bazaar with a local",
        ...IST.en,
      },
      de: {
        name: "Ägyptischer Basar",
        metaTitle: "Ägyptischer Basar (Gewürzbasar) Touren & lokale Guides",
        metaDescription:
          "Erkunde Istanbuls Gewürzbasar mit einem geprüften lokalen Guide. Berge von Gewürzen, Safran, Lokum und Tee in einer überdachten Markthalle aus dem 17. Jahrhundert neben der Neuen Moschee in Eminönü.",
        intro: [
          "Der Ägyptische Basar — der Mısır Çarşısı, der Gewürzbasar — ist Istanbuls duftendster Markt, eine L-förmige Halle mit gewölbten Arkaden aus dem 17. Jahrhundert im Herzen von Eminönü. In den 1660er-Jahren als Teil der Neuen-Moschee-Anlage errichtet, wurde er aus dem Handel mit dem osmanischen Ägypten finanziert, und bis heute quellen seine Stände über von Gewürzpyramiden, Safran, Trockenfrüchten, Nüssen und Tee.",
          "Mit einem lokalen VibeGuide-Experten ergeben Gedränge und Farbenpracht einen Sinn. Ein echter Guide führt dich an den Touristenfallen vorbei zu ehrlichen, alteingesessenen Händlern, sagt dir, was echter Safran und reines Lokum kosten sollten, und lässt dich probieren, bevor du kaufst — so wird aus einer chaotischen Gasse ein entspannter Vormittag voller Aromen und Geschichten.",
        ],
        highlights: [
          { title: "Berge von Gewürzen", desc: "Kegel aus Paprika, Sumach, Kreuzkümmel und Zimt türmen sich neben Gläsern mit tiefrotem Safran — die Düfte, die dem Basar Namen und Ruhm gaben." },
          { title: "Lokum & Süßigkeiten", desc: "Tabletts mit Lokum in jeder Sorte, von Granatapfel und Pistazie bis Rose, stehen neben getrockneten Aprikosen, Feigen und honigüberzogenen Nüssen — die meisten Stände bieten eine Kostprobe." },
          { title: "Tee & die Neue Moschee", desc: "Apfeltee, Kräutermischungen und Kaffee erfüllen die Luft, und die große Kuppel der Yeni Cami erhebt sich direkt neben dem Haupttor des Basars." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Ägyptische Basar liegt in Eminönü, direkt neben der Neuen Moschee und zwei Gehminuten von der Galata-Brücke und den Bosporus-Fähranlegern entfernt. Am einfachsten kommst du mit der Straßenbahn T1 bis zur Haltestelle Eminönü oder mit der Fähre über das Goldene Horn; die Lage am Wasser macht ihn leicht in einen Tag entlang des Altstadtufers einzubauen.",
          "Am belebtesten ist der Basar mittags, ein Besuch am frühen Morgen ist also ruhiger und lässt dich mit den Händlern reden, bevor die Menge kommt. Er hat täglich geöffnet und wird besonders am Wochenende lebhaft. Frühling und Herbst sind angenehm, doch die überdachte Halle bleibt bei jedem Wetter einladend.",
          "Der Eintritt ist frei und man muss nichts buchen — du gehst einfach hinein. Preise sind selten festgelegt, ein wenig freundliches Feilschen wird also erwartet, und die Qualität schwankt von Stand zu Stand. Ein lizenzierter VibeGuide vor Ort führt dich zu vertrauenswürdigen Händlern, hilft dir, echten Safran von gefärbtem zu unterscheiden, und handelt faire Preise aus, während du dich durch den Markt probierst.",
        ],
        faqs: [
          { q: "Ist der Eintritt in den Ägyptischen Basar frei?", a: "Ja, der Eintritt ist völlig frei und man muss nichts buchen. Ein VibeGuide vor Ort kann dich am Tor treffen und dich zu den vertrauenswürdigsten Händlern im Inneren führen." },
          { q: "Sollte ich im Ägyptischen Basar feilschen?", a: "Preise sind selten festgelegt, höfliches Handeln ist also normal und erwünscht. Ein lokaler Guide kennt den fairen Preis für Safran, Lokum und Tee und verhandelt für dich, damit du nicht zu viel zahlst." },
          { q: "Wie unterscheidet er sich vom Großen Basar?", a: "Der Ägyptische Basar ist kleiner, duftender und auf Lebensmittel ausgerichtet — Gewürze, Süßigkeiten, Tees und Nüsse — während der Große Basar ein riesiges Labyrinth aus Schmuck, Teppichen und Kunsthandwerk ist. Viele Besucher machen beides an einem Tag." },
          { q: "Wann besucht man ihn am besten?", a: "Der Morgen ist am ruhigsten, bevor Reisegruppen und Käufer die Gänge füllen. Wochentage sind ruhiger als Wochenenden, und ein VibeGuide vor Ort legt deinen Besuch aufs beste Erlebnis." },
        ],
        ctaTitle: "Erlebe den Gewürzbasar mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Египетский базар",
        metaTitle: "Египетский базар (рынок специй): экскурсии с местными гидами",
        metaDescription:
          "Исследуйте стамбульский Египетский базар с проверенным местным гидом. Горы специй, шафран, лукум и чаи в крытом рынке XVII века рядом с Новой мечетью в Эминёню.",
        intro: [
          "Египетский базар — Мысыр Чаршысы, рынок специй — самый ароматный рынок Стамбула, Г-образный зал сводчатых аркад XVII века в сердце Эминёню. Построенный в 1660-е годы как часть комплекса Новой мечети, он финансировался торговлей с османским Египтом, и по сей день его прилавки ломятся от пирамид пряностей, шафрана, сухофруктов, орехов и чая.",
          "С местным экспертом VibeGuide толчея и краски обретают смысл. Настоящий гид проведёт вас мимо туристических ловушек к честным, старейшим торговцам, подскажет, сколько должны стоить настоящий шафран и чистый лукум, и даст попробовать перед покупкой — превращая хаотичный ряд в спокойное утро вкусов и историй.",
        ],
        highlights: [
          { title: "Горы специй", desc: "Конусы паприки, сумаха, зиры и корицы высятся рядом с банками тёмно-красного шафрана — ароматы, что дали базару имя и славу." },
          { title: "Лукум и сладости", desc: "Подносы с лукумом всех вкусов — от граната и фисташки до розы — стоят рядом с сушёными абрикосами, инжиром и орехами в меду; на большинстве прилавков дадут попробовать." },
          { title: "Чаи и Новая мечеть", desc: "Яблочный чай, травяные смеси и кофе наполняют воздух, а большая купольная Йени Джами возвышается прямо у главных ворот базара." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Египетский базар стоит в Эминёню, прямо рядом с Новой мечетью, в двух минутах ходьбы от Галатского моста и причалов босфорских паромов. Проще всего добраться на трамвае T1 до остановки Eminönü или на пароме через Золотой Рог; расположение у воды позволяет легко вписать его в день вдоль берега старого города.",
          "Базар оживлённее всего в середине дня, поэтому визит ранним утром спокойнее и даёт поговорить с торговцами до наплыва людей. Он работает ежедневно и особенно оживает по выходным. Весна и осень приятны, но крытый зал гостеприимен в любую погоду.",
          "Вход бесплатный и ничего бронировать не нужно — вы просто заходите. Цены редко фиксированы, так что немного дружелюбного торга ожидаемо, а качество разнится от прилавка к прилавку. Лицензированный местный гид VibeGuide направит вас к надёжным торговцам, поможет отличить настоящий шафран от крашеного и договорится о честной цене, пока вы пробуете рынок на вкус.",
        ],
        faqs: [
          { q: "Вход на Египетский базар бесплатный?", a: "Да, вход совершенно бесплатный и ничего бронировать не нужно. Местный гид VibeGuide может встретить вас у ворот и провести к самым надёжным торговцам внутри." },
          { q: "Нужно ли торговаться на Египетском базаре?", a: "Цены редко фиксированы, поэтому вежливый торг нормален и ожидаем. Местный гид знает справедливую цену на шафран, лукум и чай и торгуется за вас, чтобы вы не переплатили." },
          { q: "Чем он отличается от Гранд-базара?", a: "Египетский базар меньше, ароматнее и посвящён еде — специи, сладости, чаи и орехи, — тогда как Гранд-базар это огромный лабиринт украшений, ковров и ремёсел. Многие обходят оба за один день." },
          { q: "Когда лучше всего идти?", a: "Утро спокойнее всего, пока туристические группы и покупатели не заполнили ряды. Будни тише выходных, а местный гид VibeGuide подберёт время для лучших впечатлений." },
        ],
        ctaTitle: "Увидеть Египетский базар с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "بازار التوابل",
        metaTitle: "جولات بازار التوابل (السوق المصري) مع مرشدين محليين",
        metaDescription:
          "اكتشف بازار التوابل في إسطنبول مع مرشد محلي موثّق. أكوام التوابل والزعفران والملبن والشاي في سوق مسقوف من القرن السابع عشر بجوار الجامع الجديد في إمينونو.",
        intro: [
          "بازار التوابل — مصر چارشيسي، أو السوق المصري — هو أكثر أسواق إسطنبول عطرًا، قاعة على شكل حرف L من أروقة معقودة تعود إلى القرن السابع عشر في قلب إمينونو. شُيّد في ستينيات القرن السابع عشر كجزء من مجمّع الجامع الجديد، ومُوِّل من تجارة مصر العثمانية، وحتى اليوم تفيض بسطاته بأهرام التوابل والزعفران والفواكه المجففة والمكسّرات والشاي.",
          "مع خبير محلي من VibeGuide يصبح للزحام والألوان معنى. المرشد الحقيقي يقودك بعيدًا عن مصائد السياح إلى بائعين أمناء عريقين، ويخبرك بما ينبغي أن يكلّفه الزعفران الحقيقي والملبن الخالص، ويتيح لك التذوّق قبل الشراء — فيحوّل ممرًا فوضويًا إلى صباح هادئ من النكهات والحكايات.",
        ],
        highlights: [
          { title: "جبال من التوابل", desc: "أقماع من البابريكا والسمّاق والكمّون والقرفة ترتفع بجوار أوعية من الزعفران الأحمر الداكن — العطور التي منحت البازار اسمه وشهرته." },
          { title: "الملبن والحلويات", desc: "صواني من الملبن بكل نكهة، من الرمان والفستق إلى الورد، تجاور المشمش المجفف والتين والمكسّرات بالعسل — ومعظم البسطات تقدّم مذاقًا." },
          { title: "الشاي والجامع الجديد", desc: "شاي التفاح والخلطات العشبية والقهوة تملأ الهواء، وترتفع قبة الجامع الجديد الكبيرة تمامًا بجوار البوابة الرئيسية للبازار." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع بازار التوابل في إمينونو، تمامًا بجوار الجامع الجديد وعلى بعد دقيقتين سيرًا من جسر غلطة وأرصفة عبّارات البوسفور. أسهل وصول هو بالترام T1 إلى محطة إمينونو، أو بعبّارة عبر القرن الذهبي؛ ويجعل الموقع على الماء من السهل دمجه في يوم على طول ساحل المدينة القديمة.",
          "يبلغ البازار أوجّ ازدحامه في منتصف النهار، لذا فإن زيارة الصباح الباكر أهدأ وتتيح لك محادثة الباعة قبل توافد الحشود. يعمل يوميًا وينبض بالحياة خاصةً في عطلة نهاية الأسبوع. الربيع والخريف لطيفان، لكن القاعة المسقوفة تبقى مرحّبة في أي طقس.",
          "الدخول مجاني ولا شيء يُحجَز — تدخل ببساطة. الأسعار نادرًا ما تكون ثابتة، لذا يُتوقّع بعض المساومة الودّية، وتتفاوت الجودة من بسطة إلى أخرى. يقودك مرشد VibeGuide المحلي المرخّص إلى باعة موثوقين، ويساعدك على تمييز الزعفران الحقيقي من المصبوغ، ويتفاوض على أسعار عادلة بينما تتذوّق طريقك عبر السوق.",
        ],
        faqs: [
          { q: "هل الدخول إلى بازار التوابل مجاني؟", a: "نعم، الدخول مجاني تمامًا ولا شيء يُحجَز. يستطيع مرشد VibeGuide المحلي لقاءك عند البوابة وإرشادك إلى أكثر الباعة ثقةً في الداخل." },
          { q: "هل عليّ المساومة في بازار التوابل؟", a: "الأسعار نادرًا ما تكون ثابتة، لذا فالمساومة المهذّبة أمر طبيعي ومتوقَّع. المرشد المحلي يعرف السعر العادل للزعفران والملبن والشاي ويفاوض عنك كي لا تدفع أكثر من اللازم." },
          { q: "كيف يختلف عن البازار الكبير؟", a: "بازار التوابل أصغر وأكثر عطرًا ويتركّز على الطعام — توابل وحلويات وشاي ومكسّرات — بينما البازار الكبير متاهة واسعة من المجوهرات والسجّاد والحرف. كثيرون يزورون الاثنين في يوم واحد." },
          { q: "ما أفضل وقت للذهاب؟", a: "الصباح أهدأ الأوقات، قبل أن تملأ المجموعات السياحية والمتسوقون الممرات. أيام الأسبوع أهدأ من العطلة، ويستطيع مرشد VibeGuide المحلي ضبط توقيت زيارتك لأفضل تجربة." },
        ],
        ctaTitle: "زر بازار التوابل مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Bazar de las Especias",
        metaTitle: "Tours del Bazar de las Especias (Bazar Egipcio) con guías locales",
        metaDescription:
          "Descubre el Bazar de las Especias de Estambul con un guía local verificado. Montañas de especias, azafrán, delicias turcas y tés en un mercado cubierto del siglo XVII junto a la Mezquita Nueva en Eminönü.",
        intro: [
          "El Bazar de las Especias — el Mısır Çarşısı, o Bazar Egipcio — es el mercado más aromático de Estambul, una sala en forma de L de arcadas abovedadas del siglo XVII en el corazón de Eminönü. Construido en la década de 1660 como parte del complejo de la Mezquita Nueva, se financió con el comercio del Egipto otomano, y hasta hoy sus puestos rebosan pirámides de especias, azafrán, fruta seca, frutos secos y té.",
          "Con un experto local de VibeGuide, el gentío y el color cobran sentido. Un guía de verdad te lleva más allá de las trampas para turistas hasta vendedores honestos de toda la vida, te dice cuánto deberían costar el azafrán auténtico y las delicias turcas puras, y te deja probar antes de comprar — convirtiendo un pasillo caótico en una mañana tranquila de sabores e historias.",
        ],
        highlights: [
          { title: "Montañas de especias", desc: "Conos de pimentón, zumaque, comino y canela se alzan junto a tarros de azafrán rojo intenso — los aromas que dieron al bazar su nombre y su fama." },
          { title: "Delicias turcas y dulces", desc: "Bandejas de lokum de todos los sabores, de granada y pistacho a rosa, junto a orejones, higos y frutos secos con miel — casi todos los puestos ofrecen una cata." },
          { title: "Tés y la Mezquita Nueva", desc: "El té de manzana, las mezclas de hierbas y el café llenan el aire, y la gran cúpula de la Yeni Cami se alza justo al lado de la puerta principal del bazar." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "El Bazar de las Especias se encuentra en Eminönü, justo al lado de la Mezquita Nueva y a dos minutos a pie del Puente de Gálata y los embarcaderos de los ferris del Bósforo. Lo más fácil es el tranvía T1 hasta la parada de Eminönü, o un ferri por el Cuerno de Oro; su ubicación junto al agua permite encajarlo con facilidad en un día por la orilla de la ciudad vieja.",
          "El bazar está más concurrido a mediodía, así que una visita a primera hora es más tranquila y te deja hablar con los vendedores antes de que llegue la multitud. Abre a diario y se anima especialmente los fines de semana. La primavera y el otoño son agradables, pero la sala cubierta resulta acogedora con cualquier clima.",
          "La entrada es gratuita y no hay que reservar nada — simplemente entras. Los precios rara vez son fijos, así que se espera un poco de regateo amable, y la calidad varía de un puesto a otro. Un guía local titulado de VibeGuide te lleva a vendedores de confianza, te ayuda a distinguir el azafrán auténtico del teñido y negocia precios justos mientras te abres paso probando el mercado.",
        ],
        faqs: [
          { q: "¿Es gratis entrar al Bazar de las Especias?", a: "Sí, la entrada es totalmente gratuita y no hay que reservar nada. Un guía local de VibeGuide puede recibirte en la puerta y llevarte a los vendedores más fiables del interior." },
          { q: "¿Debo regatear en el Bazar de las Especias?", a: "Los precios rara vez son fijos, así que regatear con educación es normal y esperado. Un guía local conoce el precio justo del azafrán, el lokum y el té y negocia por ti para que no pagues de más." },
          { q: "¿En qué se diferencia del Gran Bazar?", a: "El Bazar de las Especias es más pequeño, más aromático y centrado en la comida — especias, dulces, tés y frutos secos — mientras que el Gran Bazar es un enorme laberinto de joyería, alfombras y artesanía. Muchos visitantes hacen ambos en un día." },
          { q: "¿Cuál es la mejor hora para ir?", a: "Las mañanas son las más tranquilas, antes de que los grupos y los compradores llenen los pasillos. Entre semana hay menos gente que los fines de semana, y un guía local de VibeGuide puede fijar tu visita para la mejor experiencia." },
        ],
        ctaTitle: "Visita el Bazar de las Especias con un local",
        ...IST.es,
      },
      fr: {
        name: "Bazar aux Épices",
        metaTitle: "Visites du Bazar aux Épices (Bazar Égyptien) avec guides locaux",
        metaDescription:
          "Découvrez le Bazar aux Épices d'Istanbul avec un guide local vérifié. Montagnes d'épices, safran, loukoums et thés dans un marché couvert du XVIIe siècle près de la Nouvelle Mosquée à Eminönü.",
        intro: [
          "Le Bazar aux Épices — le Mısır Çarşısı, ou Bazar Égyptien — est le marché le plus parfumé d'Istanbul, une halle en L aux arcades voûtées du XVIIe siècle au cœur d'Eminönü. Bâti dans les années 1660 dans le cadre du complexe de la Nouvelle Mosquée, il fut financé par le commerce avec l'Égypte ottomane, et aujourd'hui encore ses étals débordent de pyramides d'épices, de safran, de fruits secs, de noix et de thé.",
          "Avec un expert local VibeGuide, la foule et les couleurs prennent tout leur sens. Un vrai guide vous conduit au-delà des pièges à touristes vers des marchands honnêtes de longue date, vous dit ce que devraient coûter le vrai safran et le loukoum pur, et vous fait goûter avant d'acheter — transformant une allée chaotique en une matinée paisible de saveurs et de récits.",
        ],
        highlights: [
          { title: "Des montagnes d'épices", desc: "Des cônes de paprika, de sumac, de cumin et de cannelle s'élèvent près de bocaux de safran rouge intense — les parfums qui ont donné au bazar son nom et sa renommée." },
          { title: "Loukoums et douceurs", desc: "Des plateaux de loukoums de toutes les saveurs, de la grenade et la pistache à la rose, côtoient abricots secs, figues et noix au miel — la plupart des étals offrent une dégustation." },
          { title: "Thés et la Nouvelle Mosquée", desc: "Le thé à la pomme, les mélanges d'herbes et le café emplissent l'air, et la grande coupole de la Yeni Cami se dresse juste à côté de la porte principale du bazar." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Le Bazar aux Épices se trouve à Eminönü, juste à côté de la Nouvelle Mosquée et à deux minutes à pied du pont de Galata et des embarcadères des ferries du Bosphore. Le plus simple est le tramway T1 jusqu'à l'arrêt Eminönü, ou un ferry à travers la Corne d'Or ; sa situation au bord de l'eau permet de l'intégrer facilement à une journée le long de la rive de la vieille ville.",
          "Le bazar est le plus fréquenté en milieu de journée : une visite tôt le matin est donc plus calme et vous permet d'échanger avec les marchands avant l'arrivée de la foule. Il ouvre tous les jours et s'anime surtout le week-end. Le printemps et l'automne sont agréables, mais la halle couverte reste accueillante par tous les temps.",
          "L'entrée est gratuite et il n'y a rien à réserver — il suffit d'entrer. Les prix sont rarement fixes, un peu de marchandage cordial est donc attendu, et la qualité varie d'un étal à l'autre. Un guide local agréé VibeGuide vous mène vers des marchands de confiance, vous aide à distinguer le vrai safran du teint et négocie des prix justes pendant que vous goûtez le marché.",
        ],
        faqs: [
          { q: "L'entrée du Bazar aux Épices est-elle gratuite ?", a: "Oui, l'entrée est entièrement gratuite et il n'y a rien à réserver. Un guide local VibeGuide peut vous accueillir à la porte et vous mener vers les marchands les plus fiables à l'intérieur." },
          { q: "Faut-il marchander au Bazar aux Épices ?", a: "Les prix sont rarement fixes, un marchandage poli est donc normal et attendu. Un guide local connaît le juste prix du safran, du loukoum et du thé et négocie pour vous afin que vous ne payiez pas trop cher." },
          { q: "En quoi diffère-t-il du Grand Bazar ?", a: "Le Bazar aux Épices est plus petit, plus parfumé et centré sur l'alimentation — épices, douceurs, thés et noix — tandis que le Grand Bazar est un vaste dédale de bijoux, de tapis et d'artisanat. Beaucoup de visiteurs font les deux en une journée." },
          { q: "Quel est le meilleur moment pour y aller ?", a: "Les matinées sont les plus calmes, avant que les groupes et les acheteurs n'envahissent les allées. La semaine est plus tranquille que le week-end, et un guide local VibeGuide peut caler votre visite pour la meilleure expérience." },
        ],
        ctaTitle: "Visitez le Bazar aux Épices avec un local",
        ...IST.fr,
      },
      el: {
        name: "Αγορά Μπαχαρικών",
        metaTitle: "Ξεναγήσεις στην Αγορά Μπαχαρικών (Αιγυπτιακή Αγορά) με ντόπιους ξεναγούς",
        metaDescription:
          "Εξερεύνησε την Αγορά Μπαχαρικών της Κωνσταντινούπολης με πιστοποιημένο ντόπιο ξεναγό. Βουνά μπαχαρικών, σαφράν, λουκούμια και τσάγια σε μια σκεπαστή αγορά του 17ου αιώνα δίπλα στο Νέο Τζαμί, στο Εμινονού.",
        intro: [
          "Η Αγορά Μπαχαρικών — το Μισίρ Τσαρσί, ή Αιγυπτιακή Αγορά — είναι η πιο μυρωδάτη αγορά της Κωνσταντινούπολης, μια αίθουσα σε σχήμα Γ με θολωτές στοές του 17ου αιώνα στην καρδιά του Εμινονού. Χτισμένη τη δεκαετία του 1660 ως μέρος του συγκροτήματος του Νέου Τζαμιού, χρηματοδοτήθηκε από το εμπόριο με την οθωμανική Αίγυπτο, και ως σήμερα οι πάγκοι της ξεχειλίζουν από πυραμίδες μπαχαρικών, σαφράν, αποξηραμένα φρούτα, ξηρούς καρπούς και τσάι.",
          "Με έναν ντόπιο ειδικό του VibeGuide το πλήθος και το χρώμα αποκτούν νόημα. Ένας πραγματικός ξεναγός σε οδηγεί πέρα από τις παγίδες για τουρίστες σε τίμιους, παλιούς εμπόρους, σου λέει πόσο πρέπει να κοστίζουν το αληθινό σαφράν και το γνήσιο λουκούμι, και σε αφήνει να δοκιμάσεις πριν αγοράσεις — μετατρέποντας έναν χαοτικό διάδρομο σε ένα ήρεμο πρωινό γεύσεων και ιστοριών.",
        ],
        highlights: [
          { title: "Βουνά μπαχαρικών", desc: "Κώνοι από πάπρικα, σουμάκ, κύμινο και κανέλα υψώνονται δίπλα σε βάζα βαθυκόκκινου σαφράν — τα αρώματα που έδωσαν στην αγορά το όνομα και τη φήμη της." },
          { title: "Λουκούμια και γλυκά", desc: "Δίσκοι με λουκούμια κάθε γεύσης, από ρόδι και φιστίκι ως τριαντάφυλλο, δίπλα σε αποξηραμένα βερίκοκα, σύκα και καρύδια με μέλι — οι περισσότεροι πάγκοι προσφέρουν μια γεύση." },
          { title: "Τσάγια και το Νέο Τζαμί", desc: "Το τσάι μήλου, τα μείγματα βοτάνων και ο καφές γεμίζουν τον αέρα, και ο μεγάλος τρούλος του Γενί Τζαμί υψώνεται ακριβώς δίπλα στην κεντρική πύλη της αγοράς." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Η Αγορά Μπαχαρικών βρίσκεται στο Εμινονού, ακριβώς δίπλα στο Νέο Τζαμί και δύο λεπτά με τα πόδια από τη Γέφυρα του Γαλατά και τις αποβάθρες των φέρι του Βοσπόρου. Ο ευκολότερος τρόπος να φτάσετε είναι με το τραμ T1 μέχρι τη στάση Εμινονού, ή με φέρι μέσω του Κεράτιου· η παραθαλάσσια θέση της την κάνει εύκολο κομμάτι μιας ημέρας κατά μήκος της ακτής της παλιάς πόλης.",
          "Η αγορά έχει τη μεγαλύτερη κίνηση το μεσημέρι, οπότε μια πρωινή επίσκεψη είναι πιο ήρεμη και σας επιτρέπει να μιλήσετε με τους εμπόρους πριν φτάσει το πλήθος. Λειτουργεί καθημερινά και ζωντανεύει ιδιαίτερα τα σαββατοκύριακα. Η άνοιξη και το φθινόπωρο είναι ευχάριστα, όμως η σκεπαστή αίθουσα παραμένει φιλόξενη με κάθε καιρό.",
          "Η είσοδος είναι δωρεάν και δεν χρειάζεται κράτηση — απλώς μπαίνετε. Οι τιμές σπάνια είναι σταθερές, οπότε λίγο φιλικό παζάρι είναι αναμενόμενο, και η ποιότητα διαφέρει από πάγκο σε πάγκο. Ένας αδειούχος τοπικός ξεναγός της VibeGuide σας οδηγεί σε έμπιστους εμπόρους, σας βοηθά να ξεχωρίσετε το αληθινό σαφράν από το βαμμένο και διαπραγματεύεται δίκαιες τιμές καθώς δοκιμάζετε την αγορά.",
        ],
        faqs: [
          { q: "Είναι δωρεάν η είσοδος στην Αγορά Μπαχαρικών;", a: "Ναι, η είσοδος είναι εντελώς δωρεάν και δεν χρειάζεται κράτηση. Ένας ντόπιος ξεναγός της VibeGuide μπορεί να σας συναντήσει στην πύλη και να σας οδηγήσει στους πιο αξιόπιστους εμπόρους μέσα." },
          { q: "Πρέπει να παζαρέψω στην Αγορά Μπαχαρικών;", a: "Οι τιμές σπάνια είναι σταθερές, οπότε το ευγενικό παζάρι είναι φυσιολογικό και αναμενόμενο. Ένας ντόπιος ξεναγός ξέρει τη δίκαιη τιμή για σαφράν, λουκούμι και τσάι και διαπραγματεύεται για εσάς ώστε να μην πληρώσετε παραπάνω." },
          { q: "Σε τι διαφέρει από το Μεγάλο Παζάρι;", a: "Η Αγορά Μπαχαρικών είναι μικρότερη, πιο μυρωδάτη και εστιασμένη στο φαγητό — μπαχαρικά, γλυκά, τσάγια και ξηρούς καρπούς — ενώ το Μεγάλο Παζάρι είναι ένας τεράστιος λαβύρινθος από κοσμήματα, χαλιά και χειροτεχνίες. Πολλοί επισκέπτες κάνουν και τα δύο σε μία μέρα." },
          { q: "Ποια είναι η καλύτερη ώρα για επίσκεψη;", a: "Τα πρωινά είναι τα πιο ήρεμα, πριν γεμίσουν τους διαδρόμους τα γκρουπ και οι αγοραστές. Οι καθημερινές είναι πιο ήσυχες από τα σαββατοκύριακα, και ένας ντόπιος ξεναγός της VibeGuide μπορεί να ρυθμίσει την επίσκεψή σας για την καλύτερη εμπειρία." },
        ],
        ctaTitle: "Δες την Αγορά Μπαχαρικών με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Mısır Çarşısı",
        metaTitle: "Mısır Çarşısı Turları & Yerel Rehberler",
        metaDescription:
          "İstanbul'un Mısır Çarşısı'nı doğrulanmış bir yerel rehberle gez. Eminönü'nde Yeni Cami'nin yanındaki 17. yüzyıldan kalma kapalı çarşıda baharat tepeleri, safran, lokum ve çaylar.",
        intro: [
          "Mısır Çarşısı — baharat çarşısı — İstanbul'un en mis kokulu pazarıdır; Eminönü'nün kalbinde, 17. yüzyıldan kalma, L biçiminde tonozlu revaklardan oluşan bir çarşı. 1660'larda Yeni Cami külliyesinin parçası olarak inşa edildi ve Osmanlı Mısır'ıyla yapılan ticaretle finanse edildi; bugün de tezgâhları baharat piramitleri, safran, kuru meyve, kuruyemiş ve çayla taşar.",
          "VibeGuide yerel uzmanıyla kalabalık da renk de anlam kazanır. Gerçek bir rehber sizi turist tuzaklarından geçirip dürüst, köklü esnafa götürür; gerçek safranın ve saf lokumun ne etmesi gerektiğini söyler ve almadan önce tattırır — kaotik bir koridoru tatların ve hikâyelerin dolu olduğu sakin bir sabaha çevirir.",
        ],
        highlights: [
          { title: "Baharat dağları", desc: "Kırmızıbiber, sumak, kimyon ve tarçın külahları, koyu kırmızı safran kavanozlarının yanında yükselir — çarşıya adını ve ününü veren kokular." },
          { title: "Lokum ve tatlılar", desc: "Nardan Antep fıstığına, gülden her çeşit lokum tepsileri; kuru kayısı, incir ve ballı kuruyemişlerin yanı başında durur — çoğu tezgâh tattırır." },
          { title: "Çaylar ve Yeni Cami", desc: "Elma çayı, bitki karışımları ve kahve havayı doldurur; Yeni Cami'nin büyük kubbesi çarşının ana kapısının hemen yanında yükselir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Mısır Çarşısı Eminönü'nde, Yeni Cami'nin hemen yanında; Galata Köprüsü ve Boğaz vapur iskelelerine iki dakika yürüme mesafesinde yer alır. En kolay ulaşım T1 tramvayıyla Eminönü durağına inmek ya da Haliç'i geçen bir vapurdur; deniz kenarındaki konumu, onu eski şehir kıyısı boyunca bir güne kolayca eklemenizi sağlar.",
          "Çarşı en çok gün ortasında kalabalıklaşır; bu yüzden erken sabah ziyareti daha sakindir ve kalabalık gelmeden esnafla sohbet etmenize izin verir. Her gün açıktır ve özellikle hafta sonları hareketlenir. İlkbahar ve sonbahar keyiflidir, ama kapalı çarşı her havada davetkâr kalır.",
          "Giriş ücretsizdir ve rezervasyon gerekmez — öylece girersiniz. Fiyatlar nadiren sabittir, bu yüzden biraz dostça pazarlık beklenir ve kalite tezgâhtan tezgâha değişir. Lisanslı bir VibeGuide yerel rehberi sizi güvenilir esnafa yönlendirir, gerçek safranı boyalıdan ayırmanıza yardım eder ve siz çarşıyı tada tada gezerken adil fiyatlar için pazarlık eder.",
        ],
        faqs: [
          { q: "Mısır Çarşısı'na giriş ücretsiz mi?", a: "Evet, giriş tümüyle ücretsizdir ve rezervasyon gerekmez. VibeGuide yerel rehberi sizi kapıda karşılayıp içerideki en güvenilir esnafa götürebilir." },
          { q: "Mısır Çarşısı'nda pazarlık etmeli miyim?", a: "Fiyatlar nadiren sabittir, bu yüzden nazik bir pazarlık normaldir ve beklenir. Yerel rehber safranın, lokumun ve çayın adil fiyatını bilir ve fazla ödemeyesiniz diye sizin adınıza pazarlık eder." },
          { q: "Kapalıçarşı'dan farkı ne?", a: "Mısır Çarşısı daha küçük, daha kokulu ve yiyeceğe odaklıdır — baharat, tatlı, çay ve kuruyemiş — Kapalıçarşı ise takı, halı ve el sanatlarından oluşan devasa bir labirenttir. Birçok ziyaretçi ikisini bir günde gezer." },
          { q: "Gitmek için en iyi zaman ne?", a: "Sabahlar en sakin zamandır; turlar ve alışverişçiler koridorları doldurmadan önce. Hafta içi hafta sonundan daha tenhadır ve VibeGuide yerel rehberi en iyi deneyim için ziyaretinizi zamanlayabilir." },
        ],
        ctaTitle: "Mısır Çarşısı'nı bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Bazar delle Spezie",
        metaTitle: "Tour del Bazar delle Spezie (Bazar Egiziano) con guide locali",
        metaDescription:
          "Scopri il Bazar delle Spezie di Istanbul con una guida locale verificata. Montagne di spezie, zafferano, lokum e tè in un mercato coperto del XVII secolo accanto alla Moschea Nuova a Eminönü.",
        intro: [
          "Il Bazar delle Spezie — il Mısır Çarşısı, o Bazar Egiziano — è il mercato più profumato di Istanbul, una sala a L di arcate a volta del XVII secolo nel cuore di Eminönü. Costruito negli anni 1660 come parte del complesso della Moschea Nuova, fu finanziato dal commercio con l'Egitto ottomano, e ancora oggi le sue bancarelle traboccano di piramidi di spezie, zafferano, frutta secca, noci e tè.",
          "Con un esperto locale VibeGuide la folla e i colori acquistano senso. Una vera guida ti porta oltre le trappole per turisti verso venditori onesti di lunga data, ti dice quanto dovrebbero costare lo zafferano vero e il lokum puro e ti fa assaggiare prima di comprare — trasformando una corsia caotica in una mattinata tranquilla di sapori e racconti.",
        ],
        highlights: [
          { title: "Montagne di spezie", desc: "Coni di paprica, sommacco, cumino e cannella si ergono accanto a vasi di zafferano rosso intenso — i profumi che hanno dato al bazar il nome e la fama." },
          { title: "Lokum e dolci", desc: "Vassoi di lokum di ogni gusto, dal melograno e pistacchio alla rosa, accanto ad albicocche secche, fichi e noci al miele — quasi tutte le bancarelle offrono un assaggio." },
          { title: "Tè e la Moschea Nuova", desc: "Il tè alla mela, le miscele di erbe e il caffè riempiono l'aria, e la grande cupola della Yeni Cami si erge proprio accanto alla porta principale del bazar." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Il Bazar delle Spezie si trova a Eminönü, proprio accanto alla Moschea Nuova e a due minuti a piedi dal Ponte di Galata e dai moli dei traghetti sul Bosforo. Il modo più semplice è il tram T1 fino alla fermata di Eminönü, o un traghetto attraverso il Corno d'Oro; la posizione sull'acqua lo rende facile da inserire in una giornata lungo la riva della città vecchia.",
          "Il bazar è più affollato a metà giornata, quindi una visita di prima mattina è più tranquilla e ti permette di parlare con i venditori prima dell'arrivo della folla. È aperto tutti i giorni e si anima soprattutto nei fine settimana. Primavera e autunno sono piacevoli, ma la sala coperta resta accogliente con qualsiasi tempo.",
          "L'ingresso è gratuito e non c'è nulla da prenotare — basta entrare. I prezzi sono raramente fissi, quindi un po' di cordiale contrattazione è prevista, e la qualità varia da bancarella a bancarella. Una guida locale abilitata di VibeGuide ti conduce da venditori fidati, ti aiuta a distinguere lo zafferano vero da quello tinto e negozia prezzi equi mentre assaggi il mercato.",
        ],
        faqs: [
          { q: "L'ingresso al Bazar delle Spezie è gratuito?", a: "Sì, l'ingresso è del tutto gratuito e non c'è nulla da prenotare. Una guida locale VibeGuide può accoglierti alla porta e condurti dai venditori più affidabili all'interno." },
          { q: "Devo contrattare al Bazar delle Spezie?", a: "I prezzi sono raramente fissi, quindi una contrattazione garbata è normale e prevista. Una guida locale conosce il giusto prezzo di zafferano, lokum e tè e tratta per te così non paghi troppo." },
          { q: "In cosa differisce dal Gran Bazar?", a: "Il Bazar delle Spezie è più piccolo, più profumato e incentrato sul cibo — spezie, dolci, tè e noci — mentre il Gran Bazar è un vasto labirinto di gioielli, tappeti e artigianato. Molti visitatori fanno entrambi in un giorno." },
          { q: "Qual è il momento migliore per andarci?", a: "Le mattine sono le più tranquille, prima che gruppi e acquirenti riempiano le corsie. I giorni feriali sono più calmi dei fine settimana, e una guida locale VibeGuide può programmare la tua visita per la migliore esperienza." },
        ],
        ctaTitle: "Visita il Bazar delle Spezie con un locale",
        ...IST.it,
      },
      pl: {
        name: "Bazar Egipski",
        metaTitle: "Bazar Egipski (Bazar Korzenny) — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Odkryj stambulski Bazar Egipski z zweryfikowanym lokalnym przewodnikiem. Góry przypraw, szafran, lokum i herbaty w krytej hali z XVII wieku obok Nowego Meczetu w Eminönü.",
        intro: [
          "Bazar Egipski — Mısır Çarşısı, czyli bazar korzenny — to najbardziej pachnący targ Stambułu, siedemnastowieczna hala w kształcie litery L ze sklepionymi arkadami w sercu Eminönü. Wzniesiony w latach 60. XVII wieku jako część kompleksu Nowego Meczetu, finansowany był z handlu z osmańskim Egiptem, a do dziś jego stragany uginają się od piramid przypraw, szafranu, suszonych owoców, orzechów i herbaty.",
          "Z lokalnym ekspertem VibeGuide tłum i barwy nabierają sensu. Prawdziwy przewodnik prowadzi cię obok pułapek na turystów do uczciwych, wieloletnich sprzedawców, mówi, ile powinny kosztować prawdziwy szafran i czyste lokum, i pozwala spróbować przed zakupem — zamieniając chaotyczną alejkę w spokojny poranek smaków i opowieści.",
        ],
        highlights: [
          { title: "Góry przypraw", desc: "Stożki papryki, sumaku, kminu i cynamonu wznoszą się obok słojów ciemnoczerwonego szafranu — zapachy, które dały bazarowi nazwę i sławę." },
          { title: "Lokum i słodycze", desc: "Tace lokum we wszystkich smakach, od granatu i pistacji po różę, stoją obok suszonych moreli, fig i orzechów w miodzie — większość straganów częstuje próbką." },
          { title: "Herbaty i Nowy Meczet", desc: "Herbata jabłkowa, mieszanki ziołowe i kawa wypełniają powietrze, a wielka kopuła Yeni Cami wznosi się tuż obok głównej bramy bazaru." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Bazar Egipski leży w Eminönü, tuż obok Nowego Meczetu i dwie minuty spacerem od mostu Galata oraz przystani promów bosforskich. Najłatwiej dojechać tramwajem T1 do przystanku Eminönü albo promem przez Złoty Róg; nadmorskie położenie sprawia, że łatwo wpleść go w dzień wzdłuż brzegu starego miasta.",
          "Bazar jest najtłoczniejszy w środku dnia, więc wizyta wczesnym rankiem jest spokojniejsza i pozwala porozmawiać ze sprzedawcami, zanim nadejdą tłumy. Działa codziennie i ożywa zwłaszcza w weekendy. Wiosna i jesień są przyjemne, ale kryta hala pozostaje przytulna przy każdej pogodzie.",
          "Wstęp jest bezpłatny i nie trzeba nic rezerwować — po prostu wchodzisz. Ceny rzadko bywają stałe, więc odrobina życzliwego targowania jest oczekiwana, a jakość różni się od straganu do straganu. Licencjonowany lokalny przewodnik VibeGuide zaprowadzi cię do zaufanych sprzedawców, pomoże odróżnić prawdziwy szafran od barwionego i wynegocjuje uczciwe ceny, gdy będziesz smakować bazar.",
        ],
        faqs: [
          { q: "Czy wstęp na Bazar Egipski jest bezpłatny?", a: "Tak, wstęp jest całkowicie bezpłatny i nie trzeba nic rezerwować. Lokalny przewodnik VibeGuide może spotkać się z tobą przy bramie i zaprowadzić do najbardziej godnych zaufania sprzedawców w środku." },
          { q: "Czy powinienem się targować na Bazarze Egipskim?", a: "Ceny rzadko są stałe, więc uprzejme targowanie jest normalne i oczekiwane. Lokalny przewodnik zna uczciwą cenę szafranu, lokum i herbaty i negocjuje za ciebie, byś nie przepłacił." },
          { q: "Czym różni się od Wielkiego Bazaru?", a: "Bazar Egipski jest mniejszy, bardziej pachnący i skupiony na jedzeniu — przyprawy, słodycze, herbaty i orzechy — podczas gdy Wielki Bazar to ogromny labirynt biżuterii, dywanów i rękodzieła. Wielu odwiedzających robi oba w jeden dzień." },
          { q: "Kiedy najlepiej się wybrać?", a: "Poranki są najspokojniejsze, zanim wycieczki i kupujący wypełnią alejki. Dni powszednie są cichsze niż weekendy, a lokalny przewodnik VibeGuide może dobrać porę wizyty tak, by wrażenia były najlepsze." },
        ],
        ctaTitle: "Zobacz Bazar Egipski z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Egyptische Bazaar",
        metaTitle: "Egyptische Bazaar (Kruidenbazaar) tours & lokale gidsen",
        metaDescription:
          "Verken de Kruidenbazaar van Istanbul met een geverifieerde lokale gids. Bergen kruiden, saffraan, lokum en thee in een overdekte markt uit de 17e eeuw naast de Nieuwe Moskee in Eminönü.",
        intro: [
          "De Egyptische Bazaar — de Mısır Çarşısı, of Kruidenbazaar — is de meest geurige markt van Istanbul, een L-vormige hal met gewelfde arcades uit de 17e eeuw in het hart van Eminönü. Gebouwd in de jaren 1660 als deel van het complex van de Nieuwe Moskee, werd hij bekostigd uit de handel met Ottomaans Egypte, en tot op vandaag puilen zijn kramen uit van piramides kruiden, saffraan, gedroogd fruit, noten en thee.",
          "Met een lokale VibeGuide-expert krijgen de drukte en de kleuren betekenis. Een echte gids leidt je voorbij de toeristenvallen naar eerlijke, gevestigde verkopers, vertelt je wat echte saffraan en pure lokum horen te kosten, en laat je proeven voor je koopt — zo wordt een chaotisch gangpad een ontspannen ochtend vol smaken en verhalen.",
        ],
        highlights: [
          { title: "Bergen kruiden", desc: "Kegels van paprika, sumak, komijn en kaneel rijzen op naast potten dieprode saffraan — de geuren die de bazaar zijn naam en faam gaven." },
          { title: "Lokum en zoetigheid", desc: "Bladen lokum in elke smaak, van granaatappel en pistache tot roos, staan naast gedroogde abrikozen, vijgen en noten in honing — de meeste kramen bieden een proefje." },
          { title: "Thee en de Nieuwe Moskee", desc: "Appelthee, kruidenmengsels en koffie vullen de lucht, en de grote koepel van de Yeni Cami rijst op vlak naast de hoofdpoort van de bazaar." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Egyptische Bazaar ligt in Eminönü, vlak naast de Nieuwe Moskee en op twee minuten lopen van de Galatabrug en de veersteigers over de Bosporus. Het eenvoudigst reis je met tram T1 tot de halte Eminönü, of met een veerboot over de Gouden Hoorn; de ligging aan het water maakt hem makkelijk in te passen in een dag langs de oever van de oude stad.",
          "De bazaar is het drukst midden op de dag, dus een bezoek in de vroege ochtend is rustiger en laat je met de verkopers praten voor de menigte komt. Hij is dagelijks open en wordt vooral in het weekend levendig. Lente en herfst zijn aangenaam, maar de overdekte hal blijft in elk weer gastvrij.",
          "De toegang is gratis en er valt niets te reserveren — je loopt gewoon naar binnen. Prijzen liggen zelden vast, dus een beetje vriendelijk afdingen wordt verwacht, en de kwaliteit verschilt van kraam tot kraam. Een erkende lokale VibeGuide-gids brengt je naar betrouwbare verkopers, helpt je echte saffraan van gekleurde te onderscheiden en onderhandelt over eerlijke prijzen terwijl jij je een weg proeft door de markt.",
        ],
        faqs: [
          { q: "Is de toegang tot de Egyptische Bazaar gratis?", a: "Ja, de toegang is volledig gratis en er valt niets te reserveren. Een lokale VibeGuide-gids kan je bij de poort ontmoeten en je naar de meest betrouwbare verkopers binnen leiden." },
          { q: "Moet ik afdingen op de Egyptische Bazaar?", a: "Prijzen liggen zelden vast, dus beleefd onderhandelen is normaal en wordt verwacht. Een lokale gids kent de eerlijke prijs voor saffraan, lokum en thee en onderhandelt voor je zodat je niet te veel betaalt." },
          { q: "Hoe verschilt hij van de Grote Bazaar?", a: "De Egyptische Bazaar is kleiner, geuriger en gericht op eten — kruiden, zoetigheid, thee en noten — terwijl de Grote Bazaar een enorm doolhof van sieraden, tapijten en ambacht is. Veel bezoekers doen beide op één dag." },
          { q: "Wanneer kun je er het best heen?", a: "Ochtenden zijn het rustigst, voor groepen en kopers de gangpaden vullen. Doordeweeks is het stiller dan in het weekend, en een lokale VibeGuide-gids kan je bezoek plannen voor de beste ervaring." },
        ],
        ctaTitle: "Bekijk de Egyptische Bazaar met een local",
        ...IST.nl,
      },
    },
  },
  {
    slug: "maidens-tower",
    city: "Istanbul",
    citySlug: "istanbul",
    emoji: "🗼",
    image:
      "https://images.unsplash.com/photo-1785323714172-8b9935a28236?q=80&w=1600",
    lat: 41.0211,
    lng: 29.0041,
    i18n: {
      en: {
        name: "Maiden's Tower",
        metaTitle: "Maiden's Tower (Kız Kulesi) Tours & Local Guides",
        metaDescription:
          "Visit the Maiden's Tower on its tiny Bosphorus islet with a verified Istanbul guide. Ancient legends, a short boat ride from Üsküdar and an unforgettable sunset skyline.",
        intro: [
          "The Maiden's Tower stands alone on a small islet in the Bosphorus, just off the Üsküdar shore on the Asian side, where the strait opens toward the Sea of Marmara. Small, white and impossibly photogenic, it has watched over the waterway for centuries as a lighthouse, a customs point and a quarantine station — and today, after a careful restoration, it welcomes visitors once more.",
          "What makes the tower unforgettable is not its size but its stories. Turkish legend tells of a princess locked here to escape a prophesied snakebite; the Greek tale of Hero and Leander places its tragedy on these same waters. With a VibeGuide local expert the legends, the history and the skyline all click into place, turning a short boat trip into one of Istanbul's most romantic outings.",
        ],
        highlights: [
          { title: "The islet and tower", desc: "A tiny rock in the middle of the Bosphorus crowned by a slender white tower — one of the most recognizable silhouettes in all of Istanbul." },
          { title: "Legends on the water", desc: "The Turkish princess and the prophesied snake, and the Greek story of Leander swimming the strait for love — two tales bound to this single spot." },
          { title: "Café and viewpoint", desc: "A café and viewing terrace let you linger with a 360-degree panorama of the old city, the Asian shore and passing ships." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Maiden's Tower sits on its own islet, so every visit begins with a short boat ride. The main departure point is the Üsküdar waterfront on the Asian side, with additional boats from Kabataş on the European side. Both are easy to reach by ferry, tram or the Marmaray line, and the crossing itself gives you the tower framed against the water from the moment you set off.",
          "The tower is open through the day and is at its most magical around sunset, when the light turns gold and the old city skyline glows behind it. Late spring and early autumn bring calm, mild weather ideal for the crossing; on windy or stormy days boat schedules can change, so it is worth keeping your plans flexible. Mornings tend to be the quietest for photographs on the islet.",
          "Both the boat transfer and entry to the tower are ticketed, and space on the small island is limited, so it is best to plan ahead. A licensed VibeGuide local guide can arrange the crossing, time your visit for the best light and bring the legends and Bosphorus history to life — while pointing out exactly where to stand for that classic skyline photo.",
        ],
        faqs: [
          { q: "How do I get to the Maiden's Tower?", a: "By a short boat ride from the Üsküdar waterfront on the Asian side, or from Kabataş on the European side. There is no bridge — the boat is part of the experience, and both piers are easy to reach by ferry, tram or Marmaray." },
          { q: "What are the legends of the tower?", a: "A Turkish legend tells of a princess placed here to escape a prophecy that she would die of a snakebite, and the Greek tale of Hero and Leander sets its love tragedy on these waters. A local guide can tell both, and explain how the tower earned its name." },
          { q: "Is the tower worth visiting after its restoration?", a: "Yes. After a recent careful restoration the tower reopened to visitors, with a café and viewing terrace, so you can now step inside and enjoy the panorama rather than only admiring it from shore." },
          { q: "When is the best time to go?", a: "Sunset is the most memorable, with the old city glowing behind the tower, while mornings are quietest for photos. Calm days in late spring or early autumn make the boat crossing especially pleasant." },
        ],
        ctaTitle: "See the Maiden's Tower with a local",
        ...IST.en,
      },
      de: {
        name: "Mädchenturm",
        metaTitle: "Mädchenturm (Kız Kulesi) Touren & lokale Guides",
        metaDescription:
          "Besuche den Mädchenturm auf seiner winzigen Bosporus-Insel mit einem geprüften Istanbul-Guide. Alte Legenden, eine kurze Bootsfahrt ab Üsküdar und ein unvergesslicher Sonnenuntergang.",
        intro: [
          "Der Mädchenturm steht allein auf einer kleinen Insel im Bosporus, direkt vor der Küste von Üsküdar auf der asiatischen Seite, dort wo sich die Meerenge zum Marmarameer öffnet. Klein, weiß und unglaublich fotogen, wacht er seit Jahrhunderten über die Wasserstraße — als Leuchtturm, Zollstation und Quarantänestation — und heute, nach einer sorgfältigen Restaurierung, empfängt er wieder Besucher.",
          "Unvergesslich macht den Turm nicht seine Größe, sondern seine Geschichten. Eine türkische Legende erzählt von einer Prinzessin, die hier eingesperrt wurde, um einem prophezeiten Schlangenbiss zu entgehen; die griechische Sage von Hero und Leander verortet ihre Tragödie auf denselben Gewässern. Mit einem lokalen VibeGuide-Experten fügen sich Legenden, Geschichte und Skyline zusammen und machen aus einer kurzen Bootsfahrt einen der romantischsten Ausflüge Istanbuls.",
        ],
        highlights: [
          { title: "Die Insel und der Turm", desc: "Ein winziger Felsen mitten im Bosporus, gekrönt von einem schlanken weißen Turm — eine der bekanntesten Silhouetten ganz Istanbuls." },
          { title: "Legenden auf dem Wasser", desc: "Die türkische Prinzessin und die prophezeite Schlange sowie die griechische Geschichte von Leander, der aus Liebe die Meerenge durchschwamm — zwei Erzählungen, die diesen einen Ort verbinden." },
          { title: "Café und Aussichtspunkt", desc: "Ein Café und eine Aussichtsterrasse laden zum Verweilen ein, mit 360-Grad-Panorama auf die Altstadt, das asiatische Ufer und vorbeiziehende Schiffe." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Mädchenturm liegt auf einer eigenen Insel, jeder Besuch beginnt also mit einer kurzen Bootsfahrt. Der Hauptabfahrtsort ist die Uferpromenade von Üsküdar auf der asiatischen Seite, zusätzliche Boote fahren von Kabataş auf der europäischen Seite. Beide sind bequem mit Fähre, Straßenbahn oder der Marmaray-Linie zu erreichen, und schon die Überfahrt zeigt dir den Turm vor dem Wasser vom Moment des Ablegens an.",
          "Der Turm ist tagsüber geöffnet und am zauberhaftesten um den Sonnenuntergang, wenn das Licht golden wird und die Altstadt-Silhouette dahinter leuchtet. Der späte Frühling und der frühe Herbst bringen ruhiges, mildes Wetter, ideal für die Überfahrt; an windigen oder stürmischen Tagen können sich die Bootszeiten ändern, plane also flexibel. Am Morgen ist es auf der Insel meist am ruhigsten für Fotos.",
          "Sowohl die Bootsüberfahrt als auch der Eintritt in den Turm sind kostenpflichtig, und der Platz auf der kleinen Insel ist begrenzt, daher lohnt sich eine gute Planung. Ein lizenzierter VibeGuide vor Ort organisiert die Überfahrt, wählt die beste Lichtstimmung für deinen Besuch und lässt die Legenden und die Bosporus-Geschichte lebendig werden — und zeigt dir genau, wo du für das klassische Skyline-Foto stehen musst.",
        ],
        faqs: [
          { q: "Wie komme ich zum Mädchenturm?", a: "Mit einer kurzen Bootsfahrt von der Uferpromenade in Üsküdar auf der asiatischen Seite oder von Kabataş auf der europäischen Seite. Es gibt keine Brücke — das Boot gehört zum Erlebnis, und beide Anleger sind bequem mit Fähre, Straßenbahn oder Marmaray erreichbar." },
          { q: "Welche Legenden ranken sich um den Turm?", a: "Eine türkische Legende erzählt von einer Prinzessin, die hier untergebracht wurde, um einer Prophezeiung über einen tödlichen Schlangenbiss zu entgehen, und die griechische Sage von Hero und Leander verlegt ihre Liebestragödie auf diese Gewässer. Ein lokaler Guide erzählt beide und erklärt, wie der Turm zu seinem Namen kam." },
          { q: "Lohnt sich der Turm nach der Restaurierung?", a: "Ja. Nach einer sorgfältigen Restaurierung hat der Turm wieder für Besucher geöffnet, mit einem Café und einer Aussichtsterrasse, sodass du nun hineingehen und das Panorama genießen kannst, statt ihn nur vom Ufer aus zu bewundern." },
          { q: "Wann ist die beste Zeit für einen Besuch?", a: "Der Sonnenuntergang ist am eindrucksvollsten, wenn die Altstadt hinter dem Turm leuchtet, während der Morgen am ruhigsten für Fotos ist. Ruhige Tage im späten Frühling oder frühen Herbst machen die Bootsfahrt besonders angenehm." },
        ],
        ctaTitle: "Erlebe den Mädchenturm mit einem Local",
        ...IST.de,
      },
      ru: {
        name: "Девичья башня",
        metaTitle: "Девичья башня (Кыз Кулеси): экскурсии с местными гидами",
        metaDescription:
          "Посетите Девичью башню на крошечном островке Босфора с проверенным гидом в Стамбуле. Древние легенды, короткая переправа из Ускюдара и незабываемый закат над старым городом.",
        intro: [
          "Девичья башня стоит одиноко на маленьком островке в Босфоре, у самого берега Ускюдара на азиатской стороне, там, где пролив открывается к Мраморному морю. Небольшая, белая и невероятно фотогеничная, она веками охраняла водный путь — как маяк, таможенный пост и карантинная станция, — а сегодня, после бережной реставрации, снова принимает гостей.",
          "Незабываемой башню делает не её размер, а её истории. Турецкая легенда рассказывает о принцессе, запертой здесь, чтобы избежать предсказанного укуса змеи; греческое сказание о Геро и Леандре разворачивает свою трагедию на этих же водах. С местным экспертом VibeGuide легенды, история и панорама складываются воедино, превращая короткую прогулку на лодке в одно из самых романтичных путешествий Стамбула.",
        ],
        highlights: [
          { title: "Островок и башня", desc: "Крошечная скала посреди Босфора, увенчанная стройной белой башней — один из самых узнаваемых силуэтов всего Стамбула." },
          { title: "Легенды на воде", desc: "Турецкая принцесса и предсказанная змея, а также греческая история о Леандре, переплывавшем пролив ради любви — два предания, связанные с этим единственным местом." },
          { title: "Кафе и смотровая площадка", desc: "Кафе и обзорная терраса позволяют задержаться здесь, любуясь панорамой на 360 градусов: старый город, азиатский берег и проходящие суда." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Девичья башня расположена на собственном островке, поэтому любое посещение начинается с короткой переправы на лодке. Главная точка отправления — набережная Ускюдара на азиатской стороне, дополнительные лодки идут из Кабаташа на европейской стороне. До обоих легко добраться на пароме, трамвае или линии Marmaray, а сама переправа с первых минут показывает башню на фоне воды.",
          "Башня открыта в течение дня и особенно волшебна на закате, когда свет становится золотым, а силуэт старого города сияет за ней. Поздняя весна и ранняя осень дарят спокойную мягкую погоду, идеальную для переправы; в ветреные или штормовые дни расписание лодок может меняться, поэтому планы лучше держать гибкими. Утро обычно самое тихое время для фотографий на островке.",
          "И переправа на лодке, и вход в башню платные, а место на маленьком острове ограничено, поэтому лучше планировать заранее. Лицензированный местный гид VibeGuide организует переправу, подберёт время визита для лучшего света и оживит легенды и историю Босфора — а заодно подскажет, где именно встать для того самого классического кадра с панорамой.",
        ],
        faqs: [
          { q: "Как добраться до Девичьей башни?", a: "Короткой переправой на лодке от набережной Ускюдара на азиатской стороне или из Кабаташа на европейской. Моста нет — лодка часть впечатления, а до обоих причалов легко доехать на пароме, трамвае или Marmaray." },
          { q: "Какие легенды связаны с башней?", a: "Турецкая легенда рассказывает о принцессе, помещённой сюда, чтобы избежать предсказания о смертельном укусе змеи, а греческое сказание о Геро и Леандре переносит свою любовную трагедию на эти воды. Местный гид расскажет обе и объяснит, откуда у башни такое название." },
          { q: "Стоит ли посещать башню после реставрации?", a: "Да. После недавней бережной реставрации башня вновь открылась для гостей, с кафе и обзорной террасой, так что теперь можно зайти внутрь и насладиться панорамой, а не только любоваться башней с берега." },
          { q: "Когда лучше всего идти?", a: "Закат самый запоминающийся, когда старый город сияет за башней, а утро самое тихое для фотографий. Спокойные дни поздней весны или ранней осени делают переправу особенно приятной." },
        ],
        ctaTitle: "Увидеть Девичью башню с местным гидом",
        ...IST.ru,
      },
      ar: {
        name: "برج الفتاة",
        metaTitle: "جولات برج الفتاة (قيز كولسي) مع مرشدين محليين",
        metaDescription:
          "زر برج الفتاة على جزيرته الصغيرة في البوسفور مع مرشد موثّق في إسطنبول. أساطير قديمة، ورحلة قارب قصيرة من أسكودار، وغروب لا يُنسى خلف المدينة القديمة.",
        intro: [
          "يقف برج الفتاة وحيدًا على جزيرة صغيرة في البوسفور، قبالة ساحل أسكودار على الجانب الآسيوي مباشرةً، حيث ينفتح المضيق نحو بحر مرمرة. صغير وأبيض وشديد الجاذبية للتصوير، ظل قرونًا يحرس الممر المائي — منارةً ونقطة جمارك ومحطة حجر صحي — واليوم، بعد ترميم دقيق، يستقبل الزوار من جديد.",
          "ما يجعل البرج لا يُنسى ليس حجمه بل حكاياته. تروي أسطورة تركية عن أميرة حُبست هنا لتنجو من نبوءة بلدغة أفعى؛ أما الحكاية اليونانية عن هيرو وليندر فتضع مأساتها على المياه نفسها. مع خبير محلي من VibeGuide تتضافر الأساطير والتاريخ والأفق معًا، فتتحول رحلة قارب قصيرة إلى واحدة من أكثر نزهات إسطنبول رومانسية.",
        ],
        highlights: [
          { title: "الجزيرة والبرج", desc: "صخرة صغيرة في وسط البوسفور يتوّجها برج أبيض نحيل — واحد من أشهر الظلال الظلّية في إسطنبول كلها." },
          { title: "أساطير على الماء", desc: "الأميرة التركية والأفعى المتنبأ بها، والحكاية اليونانية عن ليندر الذي عبر المضيق سباحةً من أجل الحب — حكايتان تربطهما هذه البقعة الواحدة." },
          { title: "مقهى وإطلالة", desc: "يتيح لك مقهى وشرفة مطلة أن تمكث وتستمتع بمنظر بانورامي بزاوية 360 درجة للمدينة القديمة والساحل الآسيوي والسفن العابرة." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع برج الفتاة على جزيرته الخاصة، لذا تبدأ كل زيارة برحلة قارب قصيرة. نقطة الانطلاق الرئيسية هي واجهة أسكودار البحرية على الجانب الآسيوي، مع قوارب إضافية من كاباتاش على الجانب الأوروبي. يسهل الوصول إلى كليهما بالعبّارة أو الترام أو خط مرمراي، والعبور نفسه يمنحك البرج مؤطّرًا أمام الماء منذ لحظة الانطلاق.",
          "البرج مفتوح طوال النهار وأكثر سحرًا عند الغروب، حين يتحول الضوء إلى ذهبي ويتوهّج أفق المدينة القديمة خلفه. يجلب أواخر الربيع وأوائل الخريف طقسًا هادئًا معتدلًا مثاليًا للعبور؛ وفي الأيام العاصفة قد تتغير مواعيد القوارب، لذا من الأفضل إبقاء خططك مرنة. الصباح عادةً هو الأهدأ لالتقاط الصور على الجزيرة.",
          "كل من رحلة القارب ودخول البرج مقابل تذكرة، والمساحة على الجزيرة الصغيرة محدودة، لذا يُستحسن التخطيط مسبقًا. يستطيع مرشد VibeGuide المحلي المرخّص أن ينظّم العبور، ويختار توقيت زيارتك لأفضل إضاءة، ويُحيي الأساطير وتاريخ البوسفور — بينما يدلّك على المكان الأمثل للوقوف لالتقاط تلك الصورة الكلاسيكية للأفق.",
        ],
        faqs: [
          { q: "كيف أصل إلى برج الفتاة؟", a: "برحلة قارب قصيرة من واجهة أسكودار البحرية على الجانب الآسيوي، أو من كاباتاش على الجانب الأوروبي. لا يوجد جسر — القارب جزء من التجربة، ويسهل الوصول إلى كلا الرصيفين بالعبّارة أو الترام أو مرمراي." },
          { q: "ما هي أساطير البرج؟", a: "تروي أسطورة تركية عن أميرة وُضعت هنا لتنجو من نبوءة بموتها بلدغة أفعى، وتنقل الحكاية اليونانية عن هيرو وليندر مأساتها العاطفية إلى هذه المياه. يستطيع مرشد محلي أن يروي الحكايتين ويشرح كيف نال البرج اسمه." },
          { q: "هل يستحق البرج الزيارة بعد ترميمه؟", a: "نعم. بعد ترميم دقيق حديث أعيد فتح البرج للزوار، مع مقهى وشرفة مطلة، فصار بإمكانك الدخول والاستمتاع بالمنظر البانورامي بدلًا من الاكتفاء بمشاهدته من الشاطئ." },
          { q: "ما هو أفضل وقت للزيارة؟", a: "الغروب هو الأكثر إثارة للذكرى، حين تتوهّج المدينة القديمة خلف البرج، بينما الصباح هو الأهدأ للصور. الأيام الهادئة في أواخر الربيع أو أوائل الخريف تجعل عبور القارب ممتعًا بشكل خاص." },
        ],
        ctaTitle: "زر برج الفتاة مع مرشد محلي",
        ...IST.ar,
      },
      es: {
        name: "Torre de la Doncella",
        metaTitle: "Tours de la Torre de la Doncella (Kız Kulesi) con guías locales",
        metaDescription:
          "Visita la Torre de la Doncella en su diminuto islote del Bósforo con un guía verificado de Estambul. Leyendas antiguas, un corto trayecto en barco desde Üsküdar y un atardecer inolvidable.",
        intro: [
          "La Torre de la Doncella se alza solitaria sobre un pequeño islote en el Bósforo, frente a la orilla de Üsküdar en el lado asiático, donde el estrecho se abre hacia el mar de Mármara. Pequeña, blanca e increíblemente fotogénica, ha velado durante siglos por esta vía de agua como faro, punto de aduanas y estación de cuarentena — y hoy, tras una cuidadosa restauración, vuelve a recibir visitantes.",
          "Lo que hace inolvidable la torre no es su tamaño, sino sus historias. Una leyenda turca habla de una princesa encerrada aquí para escapar de una mordedura de serpiente profetizada; el relato griego de Hero y Leandro sitúa su tragedia en estas mismas aguas. Con un experto local de VibeGuide, las leyendas, la historia y el horizonte encajan, convirtiendo un breve paseo en barco en una de las salidas más románticas de Estambul.",
        ],
        highlights: [
          { title: "El islote y la torre", desc: "Una diminuta roca en medio del Bósforo coronada por una esbelta torre blanca — una de las siluetas más reconocibles de todo Estambul." },
          { title: "Leyendas sobre el agua", desc: "La princesa turca y la serpiente profetizada, y la historia griega de Leandro cruzando el estrecho a nado por amor — dos relatos unidos a este único lugar." },
          { title: "Café y mirador", desc: "Un café y una terraza panorámica invitan a quedarse, con vistas de 360 grados a la ciudad vieja, la orilla asiática y los barcos que pasan." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "La Torre de la Doncella está en su propio islote, así que toda visita empieza con un corto trayecto en barco. El principal punto de salida es el paseo marítimo de Üsküdar, en el lado asiático, con barcos adicionales desde Kabataş, en el lado europeo. Ambos son fáciles de alcanzar en ferri, tranvía o la línea Marmaray, y la propia travesía te muestra la torre recortada sobre el agua desde el momento de zarpar.",
          "La torre abre durante el día y resulta más mágica al atardecer, cuando la luz se vuelve dorada y el horizonte de la ciudad vieja brilla detrás. El final de la primavera y el principio del otoño traen un tiempo tranquilo y templado, ideal para la travesía; en días de viento o tormenta los horarios de los barcos pueden cambiar, así que conviene mantener los planes flexibles. Las mañanas suelen ser lo más tranquilo para las fotos en el islote.",
          "Tanto el traslado en barco como la entrada a la torre requieren ticket, y el espacio en la pequeña isla es limitado, así que lo mejor es planificar con antelación. Un guía local titulado de VibeGuide puede organizar la travesía, ajustar el momento de tu visita para la mejor luz y dar vida a las leyendas y a la historia del Bósforo — señalándote además el punto exacto para esa foto clásica del horizonte.",
        ],
        faqs: [
          { q: "¿Cómo llego a la Torre de la Doncella?", a: "Con un corto trayecto en barco desde el paseo marítimo de Üsküdar, en el lado asiático, o desde Kabataş, en el lado europeo. No hay puente — el barco forma parte de la experiencia, y a ambos embarcaderos se llega fácil en ferri, tranvía o Marmaray." },
          { q: "¿Cuáles son las leyendas de la torre?", a: "Una leyenda turca cuenta la de una princesa encerrada aquí para escapar de una profecía sobre una mordedura mortal de serpiente, y el relato griego de Hero y Leandro sitúa su tragedia amorosa en estas aguas. Un guía local puede contarte ambas y explicar cómo la torre recibió su nombre." },
          { q: "¿Merece la pena la torre tras su restauración?", a: "Sí. Tras una cuidadosa restauración reciente, la torre reabrió al público, con café y terraza panorámica, de modo que ahora puedes entrar y disfrutar del panorama en lugar de admirarla solo desde la orilla." },
          { q: "¿Cuándo es el mejor momento para ir?", a: "El atardecer es el más memorable, con la ciudad vieja brillando tras la torre, mientras que las mañanas son lo más tranquilo para las fotos. Los días en calma de finales de primavera o principios de otoño hacen la travesía especialmente agradable." },
        ],
        ctaTitle: "Visita la Torre de la Doncella con un local",
        ...IST.es,
      },
      fr: {
        name: "Tour de Léandre",
        metaTitle: "Visites de la Tour de Léandre (Kız Kulesi) avec guides locaux",
        metaDescription:
          "Visitez la Tour de Léandre sur son minuscule îlot du Bosphore avec un guide vérifié d'Istanbul. Légendes anciennes, une courte traversée en bateau depuis Üsküdar et un coucher de soleil inoubliable.",
        intro: [
          "La Tour de Léandre se dresse seule sur un petit îlot du Bosphore, juste au large d'Üsküdar sur la rive asiatique, là où le détroit s'ouvre vers la mer de Marmara. Petite, blanche et incroyablement photogénique, elle veille depuis des siècles sur cette voie d'eau — phare, poste de douane et station de quarantaine — et aujourd'hui, après une restauration minutieuse, elle accueille de nouveau les visiteurs.",
          "Ce qui rend la tour inoubliable, ce n'est pas sa taille mais ses histoires. Une légende turque évoque une princesse enfermée ici pour échapper à une morsure de serpent prophétisée ; le récit grec de Héro et Léandre situe sa tragédie sur ces mêmes eaux. Avec un expert local VibeGuide, les légendes, l'histoire et l'horizon s'assemblent, transformant une courte traversée en bateau en l'une des sorties les plus romantiques d'Istanbul.",
        ],
        highlights: [
          { title: "L'îlot et la tour", desc: "Un minuscule rocher au milieu du Bosphore couronné d'une fine tour blanche — l'une des silhouettes les plus reconnaissables de tout Istanbul." },
          { title: "Des légendes sur l'eau", desc: "La princesse turque et le serpent prophétisé, et l'histoire grecque de Léandre traversant le détroit à la nage par amour — deux récits liés à ce seul lieu." },
          { title: "Café et point de vue", desc: "Un café et une terrasse panoramique invitent à s'attarder, avec une vue à 360 degrés sur la vieille ville, la rive asiatique et les navires qui passent." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "La Tour de Léandre se trouve sur son propre îlot, chaque visite commence donc par une courte traversée en bateau. Le principal point de départ est le front de mer d'Üsküdar, sur la rive asiatique, avec des bateaux supplémentaires depuis Kabataş, sur la rive européenne. Tous deux sont faciles d'accès en ferry, tramway ou par la ligne Marmaray, et la traversée elle-même vous offre la tour cadrée sur l'eau dès le départ.",
          "La tour est ouverte dans la journée et se révèle la plus magique au coucher du soleil, quand la lumière devient dorée et que l'horizon de la vieille ville s'illumine derrière elle. La fin du printemps et le début de l'automne apportent un temps calme et doux, idéal pour la traversée ; par temps venteux ou orageux, les horaires des bateaux peuvent changer, mieux vaut donc rester flexible. Le matin est en général le plus tranquille pour les photos sur l'îlot.",
          "La traversée en bateau comme l'entrée de la tour sont payantes, et la place sur la petite île est limitée, il est donc préférable de planifier à l'avance. Un guide local agréé VibeGuide peut organiser la traversée, choisir le moment de votre visite pour la meilleure lumière et faire vivre les légendes et l'histoire du Bosphore — tout en vous indiquant l'endroit exact où vous placer pour cette photo classique de l'horizon.",
        ],
        faqs: [
          { q: "Comment se rend-on à la Tour de Léandre ?", a: "Par une courte traversée en bateau depuis le front de mer d'Üsküdar, sur la rive asiatique, ou depuis Kabataş, sur la rive européenne. Il n'y a pas de pont — le bateau fait partie de l'expérience, et les deux embarcadères sont faciles d'accès en ferry, tramway ou Marmaray." },
          { q: "Quelles sont les légendes de la tour ?", a: "Une légende turque raconte l'histoire d'une princesse placée ici pour échapper à une prophétie annonçant une morsure de serpent mortelle, et le récit grec de Héro et Léandre situe sa tragédie amoureuse sur ces eaux. Un guide local peut vous conter les deux et expliquer comment la tour a reçu son nom." },
          { q: "La tour vaut-elle la visite après sa restauration ?", a: "Oui. Après une restauration soignée récente, la tour a rouvert au public, avec un café et une terrasse panoramique, si bien que vous pouvez désormais entrer et profiter du panorama plutôt que de l'admirer seulement depuis la rive." },
          { q: "Quel est le meilleur moment pour y aller ?", a: "Le coucher du soleil est le plus mémorable, avec la vieille ville qui brille derrière la tour, tandis que le matin est le plus calme pour les photos. Les journées paisibles de fin de printemps ou de début d'automne rendent la traversée particulièrement agréable." },
        ],
        ctaTitle: "Visitez la Tour de Léandre avec un local",
        ...IST.fr,
      },
      el: {
        name: "Πύργος του Λέανδρου",
        metaTitle: "Ξεναγήσεις στον Πύργο του Λέανδρου (Kız Kulesi) με ντόπιους ξεναγούς",
        metaDescription:
          "Επισκέψου τον Πύργο του Λέανδρου στο μικροσκοπικό νησάκι του στον Βόσπορο με πιστοποιημένο ξεναγό στην Κωνσταντινούπολη. Αρχαίοι θρύλοι, μια σύντομη βαρκάδα από το Ουσκουντάρ και ένα αξέχαστο ηλιοβασίλεμα.",
        intro: [
          "Ο Πύργος του Λέανδρου στέκει μόνος του σε ένα μικρό νησάκι στον Βόσπορο, ακριβώς μπροστά από την ακτή του Ουσκουντάρ στην ασιατική πλευρά, εκεί όπου το στενό ανοίγει προς τη Θάλασσα του Μαρμαρά. Μικρός, λευκός και απίστευτα φωτογενής, φυλάει επί αιώνες αυτόν τον υδάτινο δρόμο — ως φάρος, τελωνειακό σημείο και σταθμός καραντίνας — και σήμερα, ύστερα από μια προσεκτική αποκατάσταση, υποδέχεται ξανά επισκέπτες.",
          "Αυτό που κάνει τον πύργο αξέχαστο δεν είναι το μέγεθός του αλλά οι ιστορίες του. Ένας τουρκικός θρύλος μιλά για μια πριγκίπισσα που κλείστηκε εδώ για να γλιτώσει από ένα προφητευμένο δάγκωμα φιδιού· ο ελληνικός μύθος της Ηρώς και του Λέανδρου τοποθετεί την τραγωδία του στα ίδια νερά. Με έναν ντόπιο ειδικό της VibeGuide, οι θρύλοι, η ιστορία και ο ορίζοντας δένουν μεταξύ τους, μετατρέποντας μια σύντομη βαρκάδα σε μία από τις πιο ρομαντικές εξορμήσεις της Κωνσταντινούπολης.",
        ],
        highlights: [
          { title: "Το νησάκι και ο πύργος", desc: "Ένας μικροσκοπικός βράχος στη μέση του Βοσπόρου στεφανωμένος με έναν λεπτό λευκό πύργο — μία από τις πιο αναγνωρίσιμες σιλουέτες όλης της Κωνσταντινούπολης." },
          { title: "Θρύλοι πάνω στο νερό", desc: "Η τουρκική πριγκίπισσα και το προφητευμένο φίδι, καθώς και η ελληνική ιστορία του Λέανδρου που διέσχιζε κολυμπώντας το στενό για την αγάπη — δύο αφηγήσεις δεμένες με αυτό το μοναδικό σημείο." },
          { title: "Καφέ και θέα", desc: "Ένα καφέ και μια βεράντα θέασης σε προσκαλούν να μείνεις, με πανόραμα 360 μοιρών στην παλιά πόλη, την ασιατική ακτή και τα πλοία που περνούν." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Ο Πύργος του Λέανδρου βρίσκεται στο δικό του νησάκι, οπότε κάθε επίσκεψη ξεκινά με μια σύντομη βαρκάδα. Το κύριο σημείο αναχώρησης είναι η παραλιακή του Ουσκουντάρ στην ασιατική πλευρά, με επιπλέον βάρκες από το Καμπατάς στην ευρωπαϊκή πλευρά. Και στα δύο φτάνεις εύκολα με φέρι, τραμ ή τη γραμμή Marmaray, ενώ το ίδιο το πέρασμα σου δίνει τον πύργο κορνιζαρισμένο πάνω στο νερό από τη στιγμή που ξεκινάς.",
          "Ο πύργος είναι ανοιχτός κατά τη διάρκεια της ημέρας και είναι πιο μαγικός γύρω στο ηλιοβασίλεμα, όταν το φως γίνεται χρυσό και η σιλουέτα της παλιάς πόλης λάμπει πίσω του. Το τέλος της άνοιξης και η αρχή του φθινοπώρου φέρνουν ήρεμο, ήπιο καιρό ιδανικό για το πέρασμα· σε μέρες με άνεμο ή θαλασσοταραχή τα δρομολόγια των βαρκών μπορεί να αλλάξουν, γι' αυτό αξίζει να κρατάς ευέλικτο πρόγραμμα. Τα πρωινά είναι συνήθως τα πιο ήσυχα για φωτογραφίες στο νησάκι.",
          "Τόσο η μεταφορά με τη βάρκα όσο και η είσοδος στον πύργο απαιτούν εισιτήριο, και ο χώρος στο μικρό νησί είναι περιορισμένος, οπότε είναι καλύτερα να προγραμματίσεις εκ των προτέρων. Ένας αδειούχος τοπικός ξεναγός της VibeGuide μπορεί να κανονίσει το πέρασμα, να επιλέξει την ώρα της επίσκεψής σου για το καλύτερο φως και να ζωντανέψει τους θρύλους και την ιστορία του Βοσπόρου — δείχνοντάς σου παράλληλα ακριβώς πού να σταθείς για εκείνη την κλασική φωτογραφία με τον ορίζοντα.",
        ],
        faqs: [
          { q: "Πώς φτάνω στον Πύργο του Λέανδρου;", a: "Με μια σύντομη βαρκάδα από την παραλιακή του Ουσκουντάρ στην ασιατική πλευρά, ή από το Καμπατάς στην ευρωπαϊκή πλευρά. Δεν υπάρχει γέφυρα — η βάρκα είναι μέρος της εμπειρίας, και στις δύο αποβάθρες φτάνεις εύκολα με φέρι, τραμ ή Marmaray." },
          { q: "Ποιοι είναι οι θρύλοι του πύργου;", a: "Ένας τουρκικός θρύλος αφηγείται μια πριγκίπισσα που τοποθετήθηκε εδώ για να γλιτώσει από μια προφητεία περί θανατηφόρου δαγκώματος φιδιού, ενώ ο ελληνικός μύθος της Ηρώς και του Λέανδρου μεταφέρει την ερωτική του τραγωδία σε αυτά τα νερά. Ένας ντόπιος ξεναγός μπορεί να σου πει και τους δύο και να εξηγήσει πώς πήρε το όνομά του ο πύργος." },
          { q: "Αξίζει ο πύργος μετά την αποκατάστασή του;", a: "Ναι. Ύστερα από μια πρόσφατη προσεκτική αποκατάσταση, ο πύργος άνοιξε ξανά για τους επισκέπτες, με καφέ και βεράντα θέασης, ώστε τώρα μπορείς να μπεις μέσα και να απολαύσεις το πανόραμα αντί απλώς να τον θαυμάζεις από την ακτή." },
          { q: "Πότε είναι η καλύτερη ώρα να πας;", a: "Το ηλιοβασίλεμα είναι το πιο αξιομνημόνευτο, με την παλιά πόλη να λάμπει πίσω από τον πύργο, ενώ τα πρωινά είναι τα πιο ήσυχα για φωτογραφίες. Οι ήρεμες μέρες στο τέλος της άνοιξης ή στην αρχή του φθινοπώρου κάνουν το πέρασμα ιδιαίτερα ευχάριστο." },
        ],
        ctaTitle: "Δες τον Πύργο του Λέανδρου με έναν ντόπιο",
        ...IST.el,
      },
      tr: {
        name: "Kız Kulesi",
        metaTitle: "Kız Kulesi Turları & Yerel Rehberler",
        metaDescription:
          "Kız Kulesi'ni Boğaz'ın küçücük adacığında doğrulanmış bir İstanbul rehberiyle gez. Eski efsaneler, Üsküdar'dan kısa bir tekne yolculuğu ve unutulmaz bir gün batımı.",
        intro: [
          "Kız Kulesi, Boğaz'ın ortasında küçük bir adacıkta tek başına yükselir; Asya yakasında Üsküdar kıyısının hemen açığında, boğazın Marmara Denizi'ne açıldığı yerdedir. Küçük, beyaz ve inanılmaz fotojenik bu kule, yüzyıllardır bu su yolunu bir deniz feneri, gümrük noktası ve karantina istasyonu olarak beklemiş — bugün ise özenli bir restorasyonun ardından yeniden ziyaretçilerini ağırlıyor.",
          "Kuleyi unutulmaz kılan boyutu değil hikâyeleridir. Bir Türk efsanesi, kehanetteki yılan sokmasından kurtulsun diye buraya kapatılan bir prensesi anlatır; Hero ile Leandros'un Yunan hikâyesi ise trajedisini aynı sularda kurar. VibeGuide yerel uzmanıyla efsaneler, tarih ve silüet yerli yerine oturur; kısa bir tekne yolculuğu İstanbul'un en romantik gezilerinden birine dönüşür.",
        ],
        highlights: [
          { title: "Adacık ve kule", desc: "Boğaz'ın tam ortasında küçücük bir kayalık ve onu taçlandıran zarif beyaz bir kule — tüm İstanbul'un en tanınabilir silüetlerinden biri." },
          { title: "Su üstünde efsaneler", desc: "Türk prensesi ve kehanetteki yılan ile aşk uğruna boğazı yüzerek geçen Leandros'un Yunan hikâyesi — bu tek noktaya bağlanan iki anlatı." },
          { title: "Kafe ve seyir noktası", desc: "Bir kafe ve seyir terası oyalanmanız için davet çıkarır; tarihi yarımadaya, Asya kıyısına ve geçen gemilere 360 derecelik bir manzara sunar." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Kız Kulesi kendi adacığında yer alır, bu yüzden her ziyaret kısa bir tekne yolculuğuyla başlar. Ana kalkış noktası Asya yakasındaki Üsküdar sahilidir; Avrupa yakasında Kabataş'tan da ek seferler yapılır. İkisine de vapur, tramvay ya da Marmaray hattıyla kolayca ulaşılır ve geçişin kendisi, yola çıktığınız andan itibaren kuleyi suyun önünde çerçeveler.",
          "Kule gün boyunca açıktır ve en büyülü hali gün batımına yakın olandır; ışık altın rengine döner ve tarihi yarımadanın silüeti arkasında parlar. İlkbahar sonu ve sonbahar başı, geçiş için ideal sakin ve ılıman bir hava getirir; rüzgârlı veya fırtınalı günlerde tekne saatleri değişebilir, bu yüzden planınızı esnek tutmakta fayda var. Sabahlar adacıkta fotoğraf çekmek için genellikle en sakin zamandır.",
          "Hem tekne geçişi hem de kuleye giriş biletlidir ve küçük adadaki yer sınırlıdır, bu yüzden önceden planlamak en iyisidir. Lisanslı bir VibeGuide yerel rehberi geçişi ayarlayabilir, ziyaretinizi en iyi ışığa göre zamanlayabilir ve efsaneleri ile Boğaz tarihini canlandırabilir — o klasik silüet fotoğrafı için tam olarak nerede duracağınızı da gösterir.",
        ],
        faqs: [
          { q: "Kız Kulesi'ne nasıl giderim?", a: "Asya yakasında Üsküdar sahilinden ya da Avrupa yakasında Kabataş'tan kısa bir tekne yolculuğuyla. Köprü yoktur — tekne deneyimin bir parçasıdır ve her iki iskeleye de vapur, tramvay veya Marmaray ile kolayca ulaşılır." },
          { q: "Kulenin efsaneleri nelerdir?", a: "Bir Türk efsanesi, yılan sokmasıyla öleceği kehanetinden kurtulsun diye buraya yerleştirilen bir prensesi anlatır; Hero ile Leandros'un Yunan hikâyesi ise aşk trajedisini bu sulara taşır. Yerel bir rehber ikisini de anlatabilir ve kulenin adını nasıl aldığını açıklayabilir." },
          { q: "Kule restorasyonundan sonra gezmeye değer mi?", a: "Evet. Yakın zamandaki özenli restorasyonun ardından kule ziyarete yeniden açıldı; bir kafe ve seyir terasıyla artık içeri girip manzaranın tadını çıkarabilir, sadece kıyıdan seyretmekle kalmazsınız." },
          { q: "Gitmek için en iyi zaman ne zaman?", a: "Gün batımı en akılda kalıcı olandır; tarihi yarımada kulenin arkasında parlar, sabahlar ise fotoğraf için en sakin zamandır. İlkbahar sonu veya sonbahar başındaki durgun günler tekne geçişini özellikle keyifli kılar." },
        ],
        ctaTitle: "Kız Kulesi'ni bir yerelle gez",
        ...IST.tr,
      },
      it: {
        name: "Torre della Fanciulla",
        metaTitle: "Tour della Torre della Fanciulla (Kız Kulesi) con guide locali",
        metaDescription:
          "Visita la Torre della Fanciulla sul suo minuscolo isolotto del Bosforo con una guida verificata di Istanbul. Leggende antiche, una breve traversata in barca da Üsküdar e un tramonto indimenticabile.",
        intro: [
          "La Torre della Fanciulla si erge solitaria su un piccolo isolotto nel Bosforo, appena al largo della riva di Üsküdar sul lato asiatico, dove lo stretto si apre verso il Mar di Marmara. Piccola, bianca e incredibilmente fotogenica, ha vegliato per secoli su questa via d'acqua come faro, dogana e stazione di quarantena — e oggi, dopo un attento restauro, accoglie di nuovo i visitatori.",
          "Ciò che rende la torre indimenticabile non è la sua dimensione ma le sue storie. Una leggenda turca racconta di una principessa rinchiusa qui per sfuggire a un morso di serpente profetizzato; il racconto greco di Ero e Leandro colloca la sua tragedia su queste stesse acque. Con un esperto locale di VibeGuide, leggende, storia e skyline si incastrano, trasformando una breve gita in barca in una delle uscite più romantiche di Istanbul.",
        ],
        highlights: [
          { title: "L'isolotto e la torre", desc: "Un minuscolo scoglio in mezzo al Bosforo coronato da una snella torre bianca — una delle sagome più riconoscibili di tutta Istanbul." },
          { title: "Leggende sull'acqua", desc: "La principessa turca e il serpente profetizzato, e la storia greca di Leandro che attraversa a nuoto lo stretto per amore — due racconti legati a questo unico luogo." },
          { title: "Caffè e punto panoramico", desc: "Un caffè e una terrazza panoramica invitano a trattenersi, con una vista a 360 gradi sulla città vecchia, la sponda asiatica e le navi di passaggio." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "La Torre della Fanciulla si trova sul suo isolotto, quindi ogni visita inizia con una breve traversata in barca. Il principale punto di partenza è il lungomare di Üsküdar, sul lato asiatico, con barche aggiuntive da Kabataş, sul lato europeo. Entrambi sono facili da raggiungere in traghetto, tram o con la linea Marmaray, e la traversata stessa ti regala la torre incorniciata sull'acqua fin dal momento della partenza.",
          "La torre è aperta durante il giorno ed è più magica intorno al tramonto, quando la luce si fa dorata e lo skyline della città vecchia risplende dietro di essa. La tarda primavera e l'inizio dell'autunno portano un tempo calmo e mite, ideale per la traversata; nelle giornate ventose o di mare mosso gli orari delle barche possono cambiare, perciò conviene tenere i piani flessibili. Le mattine sono di solito il momento più tranquillo per le foto sull'isolotto.",
          "Sia il trasferimento in barca sia l'ingresso alla torre sono a pagamento, e lo spazio sulla piccola isola è limitato, quindi è meglio pianificare in anticipo. Una guida locale abilitata di VibeGuide può organizzare la traversata, calibrare il momento della visita per la luce migliore e dare vita alle leggende e alla storia del Bosforo — indicandoti inoltre il punto esatto in cui metterti per quella classica foto dello skyline.",
        ],
        faqs: [
          { q: "Come si raggiunge la Torre della Fanciulla?", a: "Con una breve traversata in barca dal lungomare di Üsküdar, sul lato asiatico, o da Kabataş, sul lato europeo. Non c'è un ponte — la barca fa parte dell'esperienza, ed entrambi gli imbarcaderi sono facili da raggiungere in traghetto, tram o Marmaray." },
          { q: "Quali sono le leggende della torre?", a: "Una leggenda turca narra di una principessa messa qui per sfuggire a una profezia su un morso mortale di serpente, mentre il racconto greco di Ero e Leandro trasporta la sua tragedia d'amore su queste acque. Una guida locale può raccontarti entrambe e spiegare come la torre abbia preso il suo nome." },
          { q: "Vale la pena visitare la torre dopo il restauro?", a: "Sì. Dopo un recente e attento restauro la torre ha riaperto ai visitatori, con un caffè e una terrazza panoramica, così ora puoi entrare e goderti il panorama invece di ammirarla solo dalla riva." },
          { q: "Qual è il momento migliore per andare?", a: "Il tramonto è il più memorabile, con la città vecchia che brilla dietro la torre, mentre le mattine sono le più tranquille per le foto. Le giornate calme di fine primavera o inizio autunno rendono la traversata particolarmente piacevole." },
        ],
        ctaTitle: "Visita la Torre della Fanciulla con un locale",
        ...IST.it,
      },
      pl: {
        name: "Wieża Leandra",
        metaTitle: "Wieża Leandra (Kız Kulesi) — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Wieżę Leandra na jej maleńkiej wysepce na Bosforze z zweryfikowanym przewodnikiem w Stambule. Dawne legendy, krótki rejs z Üsküdaru i niezapomniany zachód słońca.",
        intro: [
          "Wieża Leandra stoi samotnie na małej wysepce na Bosforze, tuż przy brzegu Üsküdaru po azjatyckiej stronie, tam gdzie cieśnina otwiera się w stronę Morza Marmara. Niewielka, biała i niezwykle fotogeniczna, przez wieki strzegła tego szlaku wodnego jako latarnia morska, punkt celny i stacja kwarantanny — a dziś, po starannej renowacji, znów wita zwiedzających.",
          "To, co czyni wieżę niezapomnianą, to nie jej rozmiar, lecz jej historie. Turecka legenda opowiada o księżniczce zamkniętej tutaj, by uniknęła przepowiedzianego ukąszenia węża; grecki mit o Hero i Leandrze osadza swoją tragedię na tych samych wodach. Z lokalnym ekspertem VibeGuide legendy, historia i panorama układają się w całość, zmieniając krótki rejs w jedną z najbardziej romantycznych wypraw Stambułu.",
        ],
        highlights: [
          { title: "Wysepka i wieża", desc: "Maleńka skała pośrodku Bosforu zwieńczona smukłą białą wieżą — jedna z najbardziej rozpoznawalnych sylwetek całego Stambułu." },
          { title: "Legendy na wodzie", desc: "Turecka księżniczka i przepowiedziany wąż oraz grecka opowieść o Leandrze przepływającym cieśninę dla miłości — dwie historie związane z tym jednym miejscem." },
          { title: "Kawiarnia i punkt widokowy", desc: "Kawiarnia i taras widokowy zachęcają, by zostać dłużej, z panoramą 360 stopni na stare miasto, azjatycki brzeg i przepływające statki." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Wieża Leandra leży na własnej wysepce, więc każda wizyta zaczyna się od krótkiego rejsu. Głównym punktem odpływu jest nabrzeże Üsküdaru po azjatyckiej stronie, a dodatkowe łodzie kursują z Kabataş po europejskiej stronie. Do obu łatwo dotrzeć promem, tramwajem lub linią Marmaray, a sama przeprawa pokazuje wieżę na tle wody od chwili wypłynięcia.",
          "Wieża jest otwarta w ciągu dnia i najbardziej magiczna około zachodu słońca, gdy światło staje się złote, a sylwetka starego miasta lśni za nią. Późna wiosna i wczesna jesień przynoszą spokojną, łagodną pogodę idealną na przeprawę; w wietrzne lub sztormowe dni rozkłady łodzi mogą się zmieniać, więc warto zachować elastyczność planów. Poranki są zwykle najspokojniejsze na zdjęcia na wysepce.",
          "Zarówno rejs łodzią, jak i wstęp do wieży są biletowane, a miejsca na małej wyspie jest niewiele, więc najlepiej planować z wyprzedzeniem. Licencjonowany lokalny przewodnik VibeGuide może zorganizować przeprawę, dobrać porę wizyty pod najlepsze światło i ożywić legendy oraz historię Bosforu — a przy tym wskazać dokładnie miejsce, z którego zrobisz klasyczne zdjęcie panoramy.",
        ],
        faqs: [
          { q: "Jak dotrzeć do Wieży Leandra?", a: "Krótkim rejsem z nabrzeża Üsküdaru po azjatyckiej stronie lub z Kabataş po europejskiej stronie. Nie ma mostu — łódź jest częścią przeżycia, a do obu przystani łatwo dojechać promem, tramwajem lub Marmarayem." },
          { q: "Jakie są legendy wieży?", a: "Turecka legenda opowiada o księżniczce umieszczonej tutaj, by uniknęła przepowiedni o śmiertelnym ukąszeniu węża, a grecki mit o Hero i Leandrze przenosi swoją miłosną tragedię na te wody. Lokalny przewodnik opowie obie i wyjaśni, skąd wieża wzięła swoją nazwę." },
          { q: "Czy warto odwiedzić wieżę po renowacji?", a: "Tak. Po niedawnej starannej renowacji wieża znów otwarła się dla zwiedzających, z kawiarnią i tarasem widokowym, więc teraz można wejść do środka i cieszyć się panoramą, zamiast podziwiać ją jedynie z brzegu." },
          { q: "Kiedy najlepiej się wybrać?", a: "Zachód słońca jest najbardziej zapadający w pamięć, gdy stare miasto lśni za wieżą, a poranki są najspokojniejsze na zdjęcia. Spokojne dni późnej wiosny lub wczesnej jesieni sprawiają, że przeprawa jest szczególnie przyjemna." },
        ],
        ctaTitle: "Zobacz Wieżę Leandra z lokalnym przewodnikiem",
        ...IST.pl,
      },
      nl: {
        name: "Meisjestoren",
        metaTitle: "Meisjestoren (Kız Kulesi) tours & lokale gidsen",
        metaDescription:
          "Bezoek de Meisjestoren op haar piepkleine eilandje in de Bosporus met een geverifieerde gids in Istanbul. Oude legenden, een korte boottocht vanaf Üsküdar en een onvergetelijke zonsondergang.",
        intro: [
          "De Meisjestoren staat alleen op een klein eilandje in de Bosporus, vlak voor de kust van Üsküdar aan de Aziatische kant, waar de zeestraat zich opent naar de Zee van Marmara. Klein, wit en ongelooflijk fotogeniek, waakt hij al eeuwen over deze waterweg — als vuurtoren, douanepost en quarantainestation — en vandaag, na een zorgvuldige restauratie, verwelkomt hij opnieuw bezoekers.",
          "Wat de toren onvergetelijk maakt, is niet zijn omvang maar zijn verhalen. Een Turkse legende vertelt over een prinses die hier werd opgesloten om aan een voorspelde slangenbeet te ontkomen; het Griekse verhaal van Hero en Leander plaatst zijn tragedie op ditzelfde water. Met een lokale VibeGuide-expert vallen de legenden, de geschiedenis en de skyline op hun plaats, en verandert een korte boottocht in een van de meest romantische uitstapjes van Istanbul.",
        ],
        highlights: [
          { title: "Het eilandje en de toren", desc: "Een piepkleine rots midden in de Bosporus, gekroond door een slanke witte toren — een van de meest herkenbare silhouetten van heel Istanbul." },
          { title: "Legenden op het water", desc: "De Turkse prinses en de voorspelde slang, en het Griekse verhaal van Leander die uit liefde de zeestraat overzwom — twee vertellingen verbonden met deze ene plek." },
          { title: "Café en uitzichtpunt", desc: "Een café en een uitkijkterras nodigen uit om te blijven, met een panorama van 360 graden over de oude stad, de Aziatische oever en voorbijvarende schepen." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Meisjestoren ligt op een eigen eilandje, dus elk bezoek begint met een korte boottocht. Het belangrijkste vertrekpunt is de boulevard van Üsküdar aan de Aziatische kant, met extra boten vanaf Kabataş aan de Europese kant. Beide zijn eenvoudig te bereiken met de veerboot, tram of de Marmaray-lijn, en de overtocht zelf laat je de toren al vanaf het vertrek tegen het water zien.",
          "De toren is overdag geopend en op zijn mooist rond zonsondergang, wanneer het licht goudkleurig wordt en de skyline van de oude stad erachter oplicht. Het late voorjaar en het vroege najaar brengen kalm, mild weer dat ideaal is voor de overtocht; op winderige of stormachtige dagen kunnen de bootschema's veranderen, dus houd je plannen flexibel. De ochtenden zijn meestal het rustigst voor foto's op het eilandje.",
          "Zowel de boottransfer als de toegang tot de toren zijn met kaartje, en de ruimte op het kleine eiland is beperkt, dus plan het liefst vooruit. Een erkende lokale VibeGuide-gids kan de overtocht regelen, je bezoek afstemmen op het beste licht en de legenden en de geschiedenis van de Bosporus tot leven brengen — en je precies aanwijzen waar je moet gaan staan voor die klassieke skylinefoto.",
        ],
        faqs: [
          { q: "Hoe kom ik bij de Meisjestoren?", a: "Met een korte boottocht vanaf de boulevard van Üsküdar aan de Aziatische kant, of vanaf Kabataş aan de Europese kant. Er is geen brug — de boot hoort bij de ervaring, en beide steigers zijn eenvoudig te bereiken met veerboot, tram of Marmaray." },
          { q: "Wat zijn de legenden van de toren?", a: "Een Turkse legende vertelt over een prinses die hier werd geplaatst om aan een voorspelling over een dodelijke slangenbeet te ontkomen, en het Griekse verhaal van Hero en Leander verplaatst zijn liefdesdrama naar dit water. Een lokale gids kan ze allebei vertellen en uitleggen hoe de toren aan zijn naam kwam." },
          { q: "Is de toren de moeite waard na de restauratie?", a: "Ja. Na een recente zorgvuldige restauratie heropende de toren voor bezoekers, met een café en een uitkijkterras, zodat je nu naar binnen kunt en van het panorama kunt genieten in plaats van hem alleen vanaf de wal te bewonderen." },
          { q: "Wanneer kun je het beste gaan?", a: "De zonsondergang is het meest memorabel, met de oude stad die achter de toren oplicht, terwijl de ochtenden het rustigst zijn voor foto's. Kalme dagen in het late voorjaar of vroege najaar maken de overtocht bijzonder aangenaam." },
        ],
        ctaTitle: "Bekijk de Meisjestoren met een local",
        ...IST.nl,
      },
    },
  },
  {
    slug: "temple-of-artemis",
    city: "Selçuk",
    citySlug: "ephesus",
    emoji: "🏛️",
    image:
      "https://images.unsplash.com/photo-1547126627-af8df614498c?q=80&w=1600",
    lat: 37.9497,
    lng: 27.3639,
    i18n: {
      en: {
        name: "Temple of Artemis",
        metaTitle: "Temple of Artemis at Ephesus Tours & Local Guides",
        metaDescription:
          "Visit the Temple of Artemis at Selçuk with a verified local guide. One of the Seven Wonders of the Ancient World, now a single column rising from storks and marsh beside Ephesus.",
        intro: [
          "The Temple of Artemis at Selçuk, just minutes from Ephesus, was once one of the Seven Wonders of the Ancient World — a marble temple so vast it stood four times larger than the Parthenon in Athens. Ancient travellers wrote that they had seen many wonders, but nothing to rival the house of Artemis reaching to the clouds.",
          "Today the site is humble: a single re-erected column rises from the marshy foundations, often with a stork's nest perched on top and the birds wading in the reeds below. Yet standing here, where kings once competed to raise the grandest sanctuary in the ancient world, is one of history's quietest and most moving lessons. A VibeGuide local expert restores the temple in your imagination, columns and crowds and all.",
        ],
        highlights: [
          { title: "A vanished Wonder", desc: "One of the Seven Wonders of the Ancient World, once four times the size of the Parthenon, reduced now to foundations and a single standing column." },
          { title: "The lone column and its storks", desc: "A solitary re-erected marble column rises from the marsh, often crowned by a stork's nest — an unforgettable image of grandeur returned to nature." },
          { title: "The Selçuk hill cluster", desc: "The temple pairs naturally with the Basilica of St John and the İsa Bey Mosque crowning the hill just above it, and with Ephesus close by." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "The Temple of Artemis lies on the edge of Selçuk town, only a few minutes by car or a pleasant walk from the main Ephesus entrance, so the two are almost always visited together. Selçuk sits on the İzmir–Aydın rail line and is easy to reach by train, bus or a short drive from İzmir and the coastal resorts, and the site itself is right beside the road below the castle hill.",
          "The temple is an open, low-lying site and usually free to enter, best appreciated in the softer light of morning or late afternoon when the lone column catches the sun and the storks are active. Spring and autumn are the most comfortable seasons; summer around Ephesus can be very hot, so bring water and sun protection whatever the time of year.",
          "Because so little stands today, the Temple of Artemis rewards imagination more than sightseeing, and this is exactly where a licensed VibeGuide local guide makes the difference. A guide can weave the temple, Ephesus, the Basilica of St John and the İsa Bey Mosque into one Selçuk itinerary, and rebuild the vanished Wonder in your mind so a single column becomes the greatest temple of the ancient world.",
        ],
        faqs: [
          { q: "Is there much left of the Temple of Artemis?", a: "Very little stands today — mainly the marshy foundations and one re-erected column, often topped by a stork's nest. Its power lies in what it once was: a guide brings the vanished Wonder back to life where the ruins alone cannot." },
          { q: "How does it relate to Ephesus?", a: "The temple is at Selçuk, only minutes from the main Ephesus site, and the two are naturally visited together along with the Basilica of St John and the İsa Bey Mosque on the hill just above." },
          { q: "Do I need a ticket for the Temple of Artemis?", a: "The temple is an open site and is usually free to enter, unlike the ticketed Ephesus ruins nearby. A local guide can arrange a combined Selçuk itinerary that flows smoothly between the sites." },
          { q: "When is the best time to visit?", a: "Morning or late afternoon light suits the lone column best, and spring and autumn are the most comfortable seasons. Summers here are hot, so carry water and sun protection." },
        ],
        ctaTitle: "See the Temple of Artemis with a local",
        ...EPH.en,
      },
      de: {
        name: "Artemis-Tempel",
        metaTitle: "Artemis-Tempel bei Ephesos Touren & lokale Guides",
        metaDescription:
          "Besuche den Artemis-Tempel bei Selçuk mit einem geprüften lokalen Guide. Eines der Sieben Weltwunder der Antike — heute eine einzelne Säule zwischen Störchen und Marschland neben Ephesos.",
        intro: [
          "Der Artemis-Tempel bei Selçuk, nur wenige Minuten von Ephesos entfernt, war einst eines der Sieben Weltwunder der Antike — ein Marmortempel so gewaltig, dass er viermal größer war als der Parthenon in Athen. Antike Reisende schrieben, sie hätten viele Wunder gesehen, doch nichts, das sich mit dem in die Wolken ragenden Haus der Artemis messen konnte.",
          "Heute ist die Stätte bescheiden: Eine einzige wieder aufgerichtete Säule erhebt sich aus den sumpfigen Fundamenten, oft mit einem Storchennest auf der Spitze und Vögeln, die im Schilf darunter waten. Doch hier zu stehen, wo einst Könige wetteiferten, das prächtigste Heiligtum der antiken Welt zu errichten, ist eine der leisesten und ergreifendsten Lektionen der Geschichte. Ein lokaler VibeGuide-Experte lässt den Tempel in deiner Vorstellung wiedererstehen — Säulen, Menschenmengen und alles.",
        ],
        highlights: [
          { title: "Ein verschwundenes Weltwunder", desc: "Eines der Sieben Weltwunder der Antike, einst viermal so groß wie der Parthenon, heute auf Fundamente und eine einzige stehende Säule reduziert." },
          { title: "Die einsame Säule und ihre Störche", desc: "Eine einzelne wieder aufgerichtete Marmorsäule ragt aus dem Sumpf, oft von einem Storchennest gekrönt — ein unvergessliches Bild von Größe, die an die Natur zurückfiel." },
          { title: "Der Hügel von Selçuk", desc: "Der Tempel verbindet sich ganz natürlich mit der Johannesbasilika und der İsa-Bey-Moschee auf dem Hügel direkt darüber sowie mit dem nahen Ephesos." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Der Artemis-Tempel liegt am Rand der Stadt Selçuk, nur wenige Minuten mit dem Auto oder ein angenehmer Spaziergang vom Haupteingang von Ephesos entfernt, sodass beide fast immer zusammen besucht werden. Selçuk liegt an der Bahnlinie İzmir–Aydın und ist bequem mit Zug, Bus oder einer kurzen Fahrt von İzmir und den Küstenorten zu erreichen; die Stätte selbst liegt direkt an der Straße unterhalb des Burgbergs.",
          "Der Tempel ist eine offene, tief gelegene Stätte und in der Regel kostenlos zugänglich, am schönsten im weicheren Licht des Morgens oder späten Nachmittags, wenn die einsame Säule die Sonne einfängt und die Störche aktiv sind. Frühling und Herbst sind die angenehmsten Jahreszeiten; der Sommer um Ephesos kann sehr heiß werden, nimm also zu jeder Jahreszeit Wasser und Sonnenschutz mit.",
          "Da heute so wenig steht, belohnt der Artemis-Tempel eher die Vorstellungskraft als das bloße Besichtigen — und genau hier macht ein lizenzierter VibeGuide vor Ort den Unterschied. Ein Guide verwebt Tempel, Ephesos, Johannesbasilika und İsa-Bey-Moschee zu einer Selçuk-Route und baut das verschwundene Weltwunder in deinem Kopf wieder auf, sodass aus einer einzigen Säule der größte Tempel der antiken Welt wird.",
        ],
        faqs: [
          { q: "Ist vom Artemis-Tempel noch viel übrig?", a: "Heute steht nur sehr wenig — vor allem die sumpfigen Fundamente und eine wieder aufgerichtete Säule, oft von einem Storchennest gekrönt. Seine Kraft liegt in dem, was er einst war: Ein Guide erweckt das verschwundene Weltwunder zum Leben, wo die Ruinen allein es nicht können." },
          { q: "Wie hängt er mit Ephesos zusammen?", a: "Der Tempel liegt in Selçuk, nur wenige Minuten von der Hauptstätte Ephesos entfernt, und beide werden natürlich zusammen mit der Johannesbasilika und der İsa-Bey-Moschee auf dem Hügel darüber besucht." },
          { q: "Brauche ich ein Ticket für den Artemis-Tempel?", a: "Der Tempel ist eine offene Stätte und in der Regel kostenlos zugänglich, anders als die nahen, ticketpflichtigen Ruinen von Ephesos. Ein lokaler Guide kann eine kombinierte Selçuk-Route zusammenstellen, die reibungslos zwischen den Orten verläuft." },
          { q: "Wann ist die beste Besuchszeit?", a: "Das Licht am Morgen oder späten Nachmittag passt am besten zur einsamen Säule, und Frühling und Herbst sind die angenehmsten Jahreszeiten. Die Sommer sind hier heiß, nimm also Wasser und Sonnenschutz mit." },
        ],
        ctaTitle: "Erlebe den Artemis-Tempel mit einem Local",
        ...EPH.de,
      },
      ru: {
        name: "Храм Артемиды",
        metaTitle: "Храм Артемиды в Эфесе: экскурсии с местными гидами",
        metaDescription:
          "Посетите храм Артемиды в Сельчуке с проверенным местным гидом. Одно из семи чудес древнего мира, ныне единственная колонна среди аистов и болота рядом с Эфесом.",
        intro: [
          "Храм Артемиды в Сельчуке, всего в нескольких минутах от Эфеса, некогда был одним из семи чудес древнего мира — мраморный храм столь огромный, что вчетверо превосходил афинский Парфенон. Древние путешественники писали, что видели много чудес, но ничего, что могло бы сравниться с домом Артемиды, вздымавшимся к облакам.",
          "Сегодня место скромно: единственная вновь поднятая колонна возвышается над заболоченными фундаментами, часто с гнездом аиста на вершине и птицами, бродящими в тростнике внизу. И всё же стоять здесь, где когда-то цари соперничали, возводя величайшее святилище древнего мира, — один из самых тихих и трогательных уроков истории. Местный эксперт VibeGuide восстанавливает храм в вашем воображении — с колоннами, толпами и всем прочим.",
        ],
        highlights: [
          { title: "Исчезнувшее чудо", desc: "Одно из семи чудес древнего мира, некогда вчетверо больше Парфенона, ныне сведённое к фундаментам и единственной стоящей колонне." },
          { title: "Одинокая колонна и её аисты", desc: "Одинокая вновь поднятая мраморная колонна вздымается над болотом, часто увенчанная гнездом аиста — незабываемый образ величия, вернувшегося к природе." },
          { title: "Холм Сельчука", desc: "Храм естественно сочетается с базиликой Святого Иоанна и мечетью Иса-бей, венчающими холм прямо над ним, а также с близким Эфесом." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Храм Артемиды находится на краю городка Сельчук, всего в нескольких минутах на машине или приятной прогулке от главного входа в Эфес, поэтому эти два места почти всегда посещают вместе. Сельчук стоит на железнодорожной линии Измир–Айдын, до него легко добраться поездом, автобусом или на короткой машине из Измира и прибрежных курортов, а сам объект расположен прямо у дороги под замковым холмом.",
          "Храм — открытая, низинная площадка, вход обычно свободный, и он лучше всего смотрится в мягком свете утра или позднего дня, когда одинокая колонна ловит солнце, а аисты оживают. Весна и осень — самые комфортные сезоны; лето вокруг Эфеса бывает очень жарким, так что берите воду и защиту от солнца в любое время года.",
          "Поскольку сегодня стоит так мало, храм Артемиды вознаграждает воображение больше, чем осмотр, и именно здесь лицензированный местный гид VibeGuide меняет всё. Гид может связать храм, Эфес, базилику Святого Иоанна и мечеть Иса-бей в единый маршрут по Сельчуку и заново возвести исчезнувшее чудо в вашем воображении, так что одна колонна становится величайшим храмом древнего мира.",
        ],
        faqs: [
          { q: "Много ли осталось от храма Артемиды?", a: "Сегодня стоит очень мало — в основном заболоченные фундаменты и одна вновь поднятая колонна, часто увенчанная гнездом аиста. Его сила в том, чем он был когда-то: гид возвращает исчезнувшее чудо к жизни там, где одни руины бессильны." },
          { q: "Как он связан с Эфесом?", a: "Храм находится в Сельчуке, всего в нескольких минутах от главного объекта Эфеса, и оба естественно посещают вместе с базиликой Святого Иоанна и мечетью Иса-бей на холме прямо над ним." },
          { q: "Нужен ли билет в храм Артемиды?", a: "Храм — открытая площадка, вход обычно свободный, в отличие от платных руин Эфеса неподалёку. Местный гид может составить объединённый маршрут по Сельчуку, плавно связывающий эти места." },
          { q: "Когда лучше всего посещать?", a: "Свет утра или позднего дня подходит одинокой колонне лучше всего, а весна и осень — самые комфортные сезоны. Лето здесь жаркое, так что берите воду и защиту от солнца." },
        ],
        ctaTitle: "Увидеть храм Артемиды с местным гидом",
        ...EPH.ru,
      },
      ar: {
        name: "معبد أرتميس",
        metaTitle: "جولات معبد أرتميس في أفسس مع مرشدين محليين",
        metaDescription:
          "زر معبد أرتميس في سلجوق مع مرشد محلي موثّق. أحد عجائب الدنيا السبع في العالم القديم، واليوم عمود واحد يرتفع بين اللقالق والمستنقع قرب أفسس.",
        intro: [
          "كان معبد أرتميس في سلجوق، على بُعد دقائق من أفسس، ذات يوم أحد عجائب الدنيا السبع في العالم القديم — معبد رخامي بلغ من الضخامة أن حجمه كان أربعة أضعاف معبد البارثينون في أثينا. كتب الرحّالة القدماء أنهم رأوا عجائب كثيرة، لكن لا شيء يضاهي بيت أرتميس الممتد نحو الغيوم.",
          "أما اليوم فالموقع متواضع: عمود واحد أُعيد نصبه يرتفع من الأساسات المستنقعية، وغالبًا يعلوه عش لقلق فيما تخوض الطيور في القصب أسفله. ومع ذلك، الوقوف هنا حيث تنافس الملوك يومًا على تشييد أعظم معبد في العالم القديم هو أحد أهدأ دروس التاريخ وأكثرها تأثيرًا. يعيد خبير محلي من VibeGuide بناء المعبد في مخيلتك — بأعمدته وحشوده وكل شيء.",
        ],
        highlights: [
          { title: "أعجوبة زائلة", desc: "أحد عجائب الدنيا السبع في العالم القديم، وكان يومًا أربعة أضعاف البارثينون، وقد اختُزل الآن إلى أساسات وعمود واحد قائم." },
          { title: "العمود المنفرد ولقالقه", desc: "عمود رخامي وحيد أُعيد نصبه يرتفع من المستنقع، وكثيرًا ما يتوّجه عش لقلق — صورة لا تُنسى للعظمة وقد عادت إلى الطبيعة." },
          { title: "تلة سلجوق", desc: "يتكامل المعبد بشكل طبيعي مع كنيسة القديس يوحنا ومسجد عيسى بك اللذين يتوّجان التلة فوقه مباشرة، ومع أفسس القريبة." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع معبد أرتميس على أطراف بلدة سلجوق، على بُعد دقائق قليلة بالسيارة أو مسيرًا لطيفًا من المدخل الرئيسي لأفسس، لذا يُزاران معًا في الغالب. تقع سلجوق على خط سكة حديد إزمير–أيدين ويسهل الوصول إليها بالقطار أو الحافلة أو بمشوار قصير من إزمير والمنتجعات الساحلية، والموقع نفسه بمحاذاة الطريق تحت تلة القلعة مباشرة.",
          "المعبد موقع مفتوح منخفض والدخول إليه مجاني عادةً، وأجمل ما يكون في ضوء الصباح الناعم أو أصيل العصر حين يلتقط العمود الوحيد الشمس وتنشط اللقالق. الربيع والخريف أكثر المواسم راحةً؛ أما الصيف حول أفسس فقد يكون شديد الحر، لذا احمل الماء وواقي الشمس في أي وقت من السنة.",
          "ولأن ما تبقّى قائمًا اليوم قليل جدًا، فإن معبد أرتميس يكافئ الخيال أكثر مما يكافئ مجرد المشاهدة، وهنا بالضبط يصنع مرشد VibeGuide المحلي المرخّص الفارق. يستطيع المرشد أن ينسج المعبد وأفسس وكنيسة القديس يوحنا ومسجد عيسى بك في مسار واحد لسلجوق، وأن يعيد بناء الأعجوبة الزائلة في ذهنك فيتحول عمود واحد إلى أعظم معبد في العالم القديم.",
        ],
        faqs: [
          { q: "هل بقي الكثير من معبد أرتميس؟", a: "لم يبقَ قائمًا اليوم إلا القليل جدًا — أساسات مستنقعية وعمود واحد أُعيد نصبه، غالبًا يعلوه عش لقلق. قوته في ما كان عليه يومًا: يُعيد المرشد الأعجوبة الزائلة إلى الحياة حيث تعجز الأطلال وحدها." },
          { q: "ما علاقته بأفسس؟", a: "المعبد في سلجوق، على بُعد دقائق فقط من موقع أفسس الرئيسي، ويُزاران معًا بطبيعة الحال مع كنيسة القديس يوحنا ومسجد عيسى بك على التلة فوقه مباشرة." },
          { q: "هل أحتاج إلى تذكرة لمعبد أرتميس؟", a: "المعبد موقع مفتوح ودخوله مجاني عادةً، بخلاف أطلال أفسس المجاورة التي تتطلب تذكرة. يستطيع مرشد محلي أن يعدّ مسارًا موحدًا لسلجوق ينساب بسلاسة بين المواقع." },
          { q: "ما هو أفضل وقت للزيارة؟", a: "ضوء الصباح أو أصيل العصر يليق بالعمود الوحيد أكثر من غيره، والربيع والخريف أكثر المواسم راحةً. الصيف هنا حار، لذا احمل الماء وواقي الشمس." },
        ],
        ctaTitle: "زر معبد أرتميس مع مرشد محلي",
        ...EPH.ar,
      },
      es: {
        name: "Templo de Artemisa",
        metaTitle: "Tours del Templo de Artemisa en Éfeso con guías locales",
        metaDescription:
          "Visita el Templo de Artemisa en Selçuk con un guía local verificado. Una de las Siete Maravillas del Mundo Antiguo, hoy una sola columna que se alza entre cigüeñas y marisma junto a Éfeso.",
        intro: [
          "El Templo de Artemisa en Selçuk, a solo unos minutos de Éfeso, fue en su día una de las Siete Maravillas del Mundo Antiguo — un templo de mármol tan colosal que era cuatro veces mayor que el Partenón de Atenas. Los viajeros antiguos escribieron que habían visto muchas maravillas, pero nada que rivalizara con la casa de Artemisa alzándose hacia las nubes.",
          "Hoy el lugar es humilde: una única columna vuelta a erigir se alza sobre los cimientos pantanosos, a menudo con un nido de cigüeña en lo alto y las aves vadeando entre los juncos abajo. Y sin embargo, estar aquí, donde antaño los reyes competían por levantar el santuario más grandioso del mundo antiguo, es una de las lecciones más silenciosas y conmovedoras de la historia. Un experto local de VibeGuide reconstruye el templo en tu imaginación — columnas, multitudes y todo lo demás.",
        ],
        highlights: [
          { title: "Una Maravilla desaparecida", desc: "Una de las Siete Maravillas del Mundo Antiguo, en su día cuatro veces el tamaño del Partenón, reducida hoy a cimientos y una sola columna en pie." },
          { title: "La columna solitaria y sus cigüeñas", desc: "Una solitaria columna de mármol vuelta a erigir se alza desde la marisma, a menudo coronada por un nido de cigüeña — una imagen inolvidable de la grandeza devuelta a la naturaleza." },
          { title: "El conjunto de la colina de Selçuk", desc: "El templo se combina de forma natural con la Basílica de San Juan y la Mezquita de İsa Bey que coronan la colina justo por encima, y con la cercana Éfeso." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "El Templo de Artemisa se encuentra a las afueras del pueblo de Selçuk, a solo unos minutos en coche o un agradable paseo desde la entrada principal de Éfeso, así que ambos se visitan casi siempre juntos. Selçuk está en la línea ferroviaria İzmir–Aydın y es fácil de alcanzar en tren, autobús o con un corto trayecto desde İzmir y las localidades costeras, y el propio recinto está justo al borde de la carretera, bajo la colina del castillo.",
          "El templo es un recinto abierto y de tierras bajas, normalmente de entrada gratuita, y se aprecia mejor con la luz más suave de la mañana o el atardecer, cuando la columna solitaria atrapa el sol y las cigüeñas están activas. La primavera y el otoño son las estaciones más cómodas; el verano en torno a Éfeso puede ser muy caluroso, así que lleva agua y protección solar en cualquier época del año.",
          "Como hoy queda tan poco en pie, el Templo de Artemisa premia la imaginación más que la simple visita, y es justo aquí donde un guía local titulado de VibeGuide marca la diferencia. Un guía puede entrelazar el templo, Éfeso, la Basílica de San Juan y la Mezquita de İsa Bey en un solo itinerario por Selçuk, y reconstruir la Maravilla desaparecida en tu mente para que una sola columna se convierta en el mayor templo del mundo antiguo.",
        ],
        faqs: [
          { q: "¿Queda mucho del Templo de Artemisa?", a: "Hoy queda muy poco en pie — sobre todo los cimientos pantanosos y una columna vuelta a erigir, a menudo rematada por un nido de cigüeña. Su fuerza está en lo que fue: un guía devuelve a la vida la Maravilla desaparecida allí donde las ruinas por sí solas no pueden." },
          { q: "¿Qué relación tiene con Éfeso?", a: "El templo está en Selçuk, a solo unos minutos del recinto principal de Éfeso, y ambos se visitan de forma natural junto con la Basílica de San Juan y la Mezquita de İsa Bey en la colina justo por encima." },
          { q: "¿Necesito entrada para el Templo de Artemisa?", a: "El templo es un recinto abierto y normalmente de entrada gratuita, a diferencia de las ruinas de Éfeso, cercanas y con entrada. Un guía local puede organizar un itinerario combinado por Selçuk que enlace con fluidez los distintos lugares." },
          { q: "¿Cuándo es el mejor momento para visitarlo?", a: "La luz de la mañana o del atardecer sienta mejor a la columna solitaria, y la primavera y el otoño son las estaciones más cómodas. Los veranos aquí son calurosos, así que lleva agua y protección solar." },
        ],
        ctaTitle: "Visita el Templo de Artemisa con un local",
        ...EPH.es,
      },
      fr: {
        name: "Temple d'Artémis",
        metaTitle: "Visites du Temple d'Artémis à Éphèse avec guides locaux",
        metaDescription:
          "Visitez le Temple d'Artémis à Selçuk avec un guide local vérifié. L'une des Sept Merveilles du monde antique, aujourd'hui une seule colonne dressée parmi les cigognes et le marais près d'Éphèse.",
        intro: [
          "Le Temple d'Artémis à Selçuk, à quelques minutes seulement d'Éphèse, fut jadis l'une des Sept Merveilles du monde antique — un temple de marbre si vaste qu'il était quatre fois plus grand que le Parthénon d'Athènes. Les voyageurs de l'Antiquité écrivaient avoir vu bien des merveilles, mais rien qui rivalisât avec la demeure d'Artémis s'élevant jusqu'aux nuages.",
          "Aujourd'hui le site est modeste : une unique colonne relevée s'élève des fondations marécageuses, souvent surmontée d'un nid de cigogne, tandis que les oiseaux pataugent dans les roseaux en contrebas. Et pourtant, se tenir ici, là où des rois rivalisèrent jadis pour ériger le plus grandiose sanctuaire du monde antique, est l'une des leçons les plus silencieuses et les plus émouvantes de l'histoire. Un expert local VibeGuide reconstruit le temple dans votre imagination — colonnes, foules et tout le reste.",
        ],
        highlights: [
          { title: "Une Merveille disparue", desc: "L'une des Sept Merveilles du monde antique, jadis quatre fois la taille du Parthénon, réduite aujourd'hui à des fondations et une seule colonne debout." },
          { title: "La colonne solitaire et ses cigognes", desc: "Une unique colonne de marbre relevée s'élève du marais, souvent couronnée d'un nid de cigogne — une image inoubliable de la grandeur rendue à la nature." },
          { title: "L'ensemble de la colline de Selçuk", desc: "Le temple s'associe naturellement à la Basilique Saint-Jean et à la Mosquée d'İsa Bey qui couronnent la colline juste au-dessus, ainsi qu'à Éphèse toute proche." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Le Temple d'Artémis se trouve en bordure de la ville de Selçuk, à quelques minutes seulement en voiture ou par une agréable marche depuis l'entrée principale d'Éphèse, de sorte que les deux se visitent presque toujours ensemble. Selçuk est sur la ligne ferroviaire İzmir–Aydın et se rejoint facilement en train, en bus ou par un court trajet depuis İzmir et les stations balnéaires, et le site lui-même borde la route, sous la colline du château.",
          "Le temple est un site ouvert, en contrebas, dont l'entrée est généralement gratuite, et qu'on apprécie le mieux dans la lumière plus douce du matin ou de la fin d'après-midi, quand la colonne solitaire capte le soleil et que les cigognes s'animent. Le printemps et l'automne sont les saisons les plus agréables ; l'été autour d'Éphèse peut être très chaud, alors emportez de l'eau et une protection solaire quelle que soit la période.",
          "Comme il reste si peu debout aujourd'hui, le Temple d'Artémis récompense l'imagination plus que la simple visite, et c'est précisément là qu'un guide local agréé VibeGuide fait la différence. Un guide peut relier le temple, Éphèse, la Basilique Saint-Jean et la Mosquée d'İsa Bey en un seul itinéraire à Selçuk, et rebâtir la Merveille disparue dans votre esprit pour qu'une seule colonne redevienne le plus grand temple du monde antique.",
        ],
        faqs: [
          { q: "Reste-t-il beaucoup du Temple d'Artémis ?", a: "Il reste très peu de choses debout aujourd'hui — surtout les fondations marécageuses et une colonne relevée, souvent surmontée d'un nid de cigogne. Sa force tient à ce qu'il fut : un guide ramène à la vie la Merveille disparue là où les ruines seules ne le peuvent pas." },
          { q: "Quel est son lien avec Éphèse ?", a: "Le temple est à Selçuk, à quelques minutes seulement du site principal d'Éphèse, et les deux se visitent naturellement avec la Basilique Saint-Jean et la Mosquée d'İsa Bey sur la colline juste au-dessus." },
          { q: "Faut-il un billet pour le Temple d'Artémis ?", a: "Le temple est un site ouvert dont l'entrée est généralement gratuite, contrairement aux ruines payantes d'Éphèse toutes proches. Un guide local peut organiser un itinéraire combiné à Selçuk qui relie les sites en douceur." },
          { q: "Quel est le meilleur moment pour visiter ?", a: "La lumière du matin ou de la fin d'après-midi met le mieux en valeur la colonne solitaire, et le printemps et l'automne sont les saisons les plus agréables. Les étés sont chauds ici, alors emportez de l'eau et une protection solaire." },
        ],
        ctaTitle: "Visitez le Temple d'Artémis avec un local",
        ...EPH.fr,
      },
      el: {
        name: "Ναός της Αρτέμιδος",
        metaTitle: "Ξεναγήσεις στον Ναό της Αρτέμιδος στην Έφεσο με ντόπιους ξεναγούς",
        metaDescription:
          "Επισκέψου τον Ναό της Αρτέμιδος στο Σελτσούκ με πιστοποιημένο ντόπιο ξεναγό. Ένα από τα Επτά Θαύματα του αρχαίου κόσμου, σήμερα μια μόνη κολόνα ανάμεσα σε πελαργούς και βάλτο δίπλα στην Έφεσο.",
        intro: [
          "Ο Ναός της Αρτέμιδος στο Σελτσούκ, μόλις λίγα λεπτά από την Έφεσο, ήταν κάποτε ένα από τα Επτά Θαύματα του αρχαίου κόσμου — ένας μαρμάρινος ναός τόσο τεράστιος που ήταν τέσσερις φορές μεγαλύτερος από τον Παρθενώνα της Αθήνας. Οι αρχαίοι ταξιδιώτες έγραφαν πως είχαν δει πολλά θαύματα, μα τίποτα που να συναγωνίζεται τον οίκο της Αρτέμιδος που έφτανε ως τα σύννεφα.",
          "Σήμερα ο χώρος είναι ταπεινός: μία μόνη ανεγερμένη ξανά κολόνα υψώνεται από τα ελώδη θεμέλια, συχνά με μια φωλιά πελαργού στην κορυφή και τα πουλιά να τσαλαβουτούν στα καλάμια από κάτω. Κι όμως, το να στέκεσαι εδώ, όπου κάποτε βασιλιάδες συναγωνίζονταν να υψώσουν το μεγαλοπρεπέστερο ιερό του αρχαίου κόσμου, είναι ένα από τα πιο σιωπηλά και συγκινητικά μαθήματα της ιστορίας. Ένας ντόπιος ειδικός της VibeGuide ανασυγκροτεί τον ναό στη φαντασία σου — με κολόνες, πλήθη και όλα.",
        ],
        highlights: [
          { title: "Ένα χαμένο Θαύμα", desc: "Ένα από τα Επτά Θαύματα του αρχαίου κόσμου, κάποτε τέσσερις φορές το μέγεθος του Παρθενώνα, που έχει μείνει σήμερα σε θεμέλια και μία μόνη όρθια κολόνα." },
          { title: "Η μοναχική κολόνα και οι πελαργοί της", desc: "Μια μοναχική μαρμάρινη κολόνα, ανεγερμένη ξανά, υψώνεται από τον βάλτο, συχνά στεφανωμένη με μια φωλιά πελαργού — μια αξέχαστη εικόνα του μεγαλείου που επέστρεψε στη φύση." },
          { title: "Το σύμπλεγμα του λόφου του Σελτσούκ", desc: "Ο ναός συνδυάζεται φυσικά με τη Βασιλική του Αγίου Ιωάννη και το Τζαμί İsa Bey που στεφανώνουν τον λόφο ακριβώς από πάνω, καθώς και με τη γειτονική Έφεσο." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Ο Ναός της Αρτέμιδος βρίσκεται στην άκρη της πόλης του Σελτσούκ, μόλις λίγα λεπτά με το αυτοκίνητο ή ένα ευχάριστο περπάτημα από την κύρια είσοδο της Εφέσου, γι' αυτό και τα δύο επισκέπτονται σχεδόν πάντα μαζί. Το Σελτσούκ βρίσκεται στη σιδηροδρομική γραμμή Ιζμίρ–Αϊδίν και φτάνεις εύκολα με τρένο, λεωφορείο ή μια σύντομη διαδρομή από το Ιζμίρ και τα παραθαλάσσια θέρετρα, ενώ ο ίδιος ο χώρος είναι ακριβώς δίπλα στον δρόμο, κάτω από τον λόφο του κάστρου.",
          "Ο ναός είναι ένας ανοιχτός, χαμηλός χώρος με είσοδο συνήθως ελεύθερη, και εκτιμάται καλύτερα στο πιο απαλό φως του πρωινού ή του απογεύματος, όταν η μοναχική κολόνα πιάνει τον ήλιο και οι πελαργοί δραστηριοποιούνται. Η άνοιξη και το φθινόπωρο είναι οι πιο άνετες εποχές· το καλοκαίρι γύρω από την Έφεσο μπορεί να είναι πολύ ζεστό, γι' αυτό να έχεις νερό και αντηλιακή προστασία όποια εποχή κι αν πας.",
          "Επειδή τόσο λίγα στέκουν σήμερα, ο Ναός της Αρτέμιδος ανταμείβει τη φαντασία περισσότερο από την απλή περιήγηση, κι εδώ ακριβώς κάνει τη διαφορά ένας αδειούχος ντόπιος ξεναγός της VibeGuide. Ένας ξεναγός μπορεί να πλέξει τον ναό, την Έφεσο, τη Βασιλική του Αγίου Ιωάννη και το Τζαμί İsa Bey σε ένα ενιαίο δρομολόγιο στο Σελτσούκ, και να ξαναχτίσει το χαμένο Θαύμα στο μυαλό σου, ώστε μια μόνη κολόνα να γίνει ο μεγαλύτερος ναός του αρχαίου κόσμου.",
        ],
        faqs: [
          { q: "Έχει μείνει πολύ από τον Ναό της Αρτέμιδος;", a: "Σήμερα στέκουν πολύ λίγα — κυρίως τα ελώδη θεμέλια και μία ανεγερμένη ξανά κολόνα, συχνά με μια φωλιά πελαργού στην κορυφή. Η δύναμή του κρύβεται σε αυτό που κάποτε ήταν: ένας ξεναγός ζωντανεύει το χαμένο Θαύμα εκεί όπου τα ερείπια από μόνα τους δεν μπορούν." },
          { q: "Πώς σχετίζεται με την Έφεσο;", a: "Ο ναός βρίσκεται στο Σελτσούκ, μόλις λίγα λεπτά από τον κύριο χώρο της Εφέσου, και τα δύο επισκέπτονται φυσικά μαζί με τη Βασιλική του Αγίου Ιωάννη και το Τζαμί İsa Bey στον λόφο ακριβώς από πάνω." },
          { q: "Χρειάζομαι εισιτήριο για τον Ναό της Αρτέμιδος;", a: "Ο ναός είναι ανοιχτός χώρος με είσοδο συνήθως ελεύθερη, σε αντίθεση με τα εισιτηριακά ερείπια της γειτονικής Εφέσου. Ένας ντόπιος ξεναγός μπορεί να οργανώσει ένα ενιαίο δρομολόγιο στο Σελτσούκ που κυλά ομαλά ανάμεσα στους χώρους." },
          { q: "Πότε είναι η καλύτερη ώρα για επίσκεψη;", a: "Το φως του πρωινού ή του απογεύματος ταιριάζει καλύτερα στη μοναχική κολόνα, και η άνοιξη και το φθινόπωρο είναι οι πιο άνετες εποχές. Τα καλοκαίρια εδώ είναι ζεστά, γι' αυτό να έχεις νερό και αντηλιακή προστασία." },
        ],
        ctaTitle: "Δες τον Ναό της Αρτέμιδος με έναν ντόπιο",
        ...EPH.el,
      },
      tr: {
        name: "Artemis Tapınağı",
        metaTitle: "Efes Artemis Tapınağı Turları & Yerel Rehberler",
        metaDescription:
          "Selçuk'taki Artemis Tapınağı'nı doğrulanmış bir yerel rehberle gez. Antik Dünyanın Yedi Harikasından biri, bugün Efes'in yanında leylekler ve bataklık arasında yükselen tek bir sütun.",
        intro: [
          "Efes'e yalnızca birkaç dakika mesafedeki Selçuk'ta bulunan Artemis Tapınağı, bir zamanlar Antik Dünyanın Yedi Harikasından biriydi — Atina'daki Parthenon'un dört katı büyüklükte, devasa bir mermer tapınak. Antik gezginler pek çok harika gördüklerini, ama bulutlara uzanan Artemis'in evine denk hiçbir şey görmediklerini yazmışlardı.",
          "Bugün ise alan alçakgönüllüdür: bataklık temellerden yeniden dikilmiş tek bir sütun yükselir; çoğu zaman tepesinde bir leylek yuvası, aşağıda sazlıkta dolaşan kuşlarla. Yine de bir zamanlar kralların antik dünyanın en görkemli tapınağını dikmek için yarıştığı bu yerde durmak, tarihin en sessiz ve en dokunaklı derslerinden biridir. VibeGuide yerel uzmanı, tapınağı sütunları, kalabalıkları ve her şeyiyle hayalinizde yeniden kurar.",
        ],
        highlights: [
          { title: "Kaybolmuş bir Harika", desc: "Antik Dünyanın Yedi Harikasından biri, bir zamanlar Parthenon'un dört katı büyüklüğündeyken bugün temellere ve ayakta kalan tek bir sütuna indirgenmiş." },
          { title: "Yalnız sütun ve leylekleri", desc: "Yeniden dikilmiş yalnız bir mermer sütun bataklıktan yükselir, çoğu zaman tepesinde bir leylek yuvasıyla — doğaya dönmüş bir ihtişamın unutulmaz görüntüsü." },
          { title: "Selçuk tepesi topluluğu", desc: "Tapınak, hemen yukarıdaki tepeyi taçlandıran St. Jean Bazilikası ve İsa Bey Camii ile ve yakındaki Efes'le doğal biçimde bütünleşir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Artemis Tapınağı, Selçuk ilçesinin kenarında; ana Efes girişinden yalnızca birkaç dakika arabayla ya da keyifli bir yürüyüş mesafesindedir, bu yüzden ikisi neredeyse her zaman birlikte gezilir. Selçuk, İzmir–Aydın demiryolu hattı üzerindedir ve trenle, otobüsle ya da İzmir ve kıyı tatil yerlerinden kısa bir sürüşle kolayca ulaşılır; alanın kendisi ise kale tepesinin altında, yolun hemen kenarındadır.",
          "Tapınak, girişi genellikle ücretsiz, açık ve alçak bir alandır; en güzel hâli, yalnız sütunun güneşi yakaladığı ve leyleklerin canlandığı sabahın ya da ikindinin daha yumuşak ışığındadır. İlkbahar ve sonbahar en rahat mevsimlerdir; Efes çevresinde yaz çok sıcak olabilir, bu yüzden yılın hangi zamanı olursa olsun su ve güneş koruması getirin.",
          "Bugün ayakta çok az şey kaldığından, Artemis Tapınağı gezmekten çok hayal gücünü ödüllendirir; farkı tam da burada lisanslı bir VibeGuide yerel rehberi yaratır. Bir rehber; tapınağı, Efes'i, St. Jean Bazilikası'nı ve İsa Bey Camii'ni tek bir Selçuk rotasında örebilir ve kaybolmuş Harikayı zihninizde yeniden inşa ederek tek bir sütunu antik dünyanın en büyük tapınağına dönüştürebilir.",
        ],
        faqs: [
          { q: "Artemis Tapınağı'ndan geriye çok şey kaldı mı?", a: "Bugün ayakta çok az şey kaldı — çoğunlukla bataklık temeller ve yeniden dikilmiş, tepesinde sıklıkla bir leylek yuvası bulunan tek bir sütun. Gücü, bir zamanlar ne olduğunda gizli: bir rehber, yalnızca kalıntıların yapamadığını yaparak kaybolmuş Harikayı yeniden canlandırır." },
          { q: "Efes ile ilişkisi nedir?", a: "Tapınak Selçuk'ta, ana Efes alanına yalnızca birkaç dakika mesafededir ve ikisi, hemen yukarıdaki tepede yer alan St. Jean Bazilikası ve İsa Bey Camii ile birlikte doğal olarak gezilir." },
          { q: "Artemis Tapınağı için bilet gerekiyor mu?", a: "Tapınak açık bir alandır ve girişi genellikle ücretsizdir; yakındaki biletli Efes kalıntılarından farklı olarak. Yerel bir rehber, alanlar arasında akıcı biçimde ilerleyen birleşik bir Selçuk rotası düzenleyebilir." },
          { q: "Ziyaret için en iyi zaman ne zaman?", a: "Sabah ya da ikindi ışığı yalnız sütuna en çok yakışan zamandır; ilkbahar ve sonbahar da en rahat mevsimlerdir. Buradaki yazlar sıcaktır, bu yüzden su ve güneş koruması taşıyın." },
        ],
        ctaTitle: "Artemis Tapınağı'nı bir yerelle gez",
        ...EPH.tr,
      },
      it: {
        name: "Tempio di Artemide",
        metaTitle: "Tour del Tempio di Artemide a Efeso con guide locali",
        metaDescription:
          "Visita il Tempio di Artemide a Selçuk con una guida locale verificata. Una delle Sette Meraviglie del mondo antico, oggi una sola colonna che si erge tra cicogne e palude accanto a Efeso.",
        intro: [
          "Il Tempio di Artemide a Selçuk, a pochi minuti da Efeso, fu un tempo una delle Sette Meraviglie del mondo antico — un tempio di marmo così vasto da essere quattro volte più grande del Partenone di Atene. I viaggiatori antichi scrivevano di aver visto molte meraviglie, ma nulla che rivaleggiasse con la dimora di Artemide che si ergeva verso le nuvole.",
          "Oggi il sito è umile: un'unica colonna rieretta si leva dalle fondamenta paludose, spesso con un nido di cicogna in cima e gli uccelli che guadano tra i canneti in basso. Eppure trovarsi qui, dove un tempo i re gareggiavano per innalzare il santuario più grandioso del mondo antico, è una delle lezioni più silenziose e commoventi della storia. Un esperto locale di VibeGuide ricostruisce il tempio nella tua immaginazione — colonne, folle e tutto il resto.",
        ],
        highlights: [
          { title: "Una Meraviglia scomparsa", desc: "Una delle Sette Meraviglie del mondo antico, un tempo quattro volte il Partenone, ridotta oggi a fondamenta e a una sola colonna in piedi." },
          { title: "La colonna solitaria e le sue cicogne", desc: "Una solitaria colonna di marmo rieretta si erge dalla palude, spesso coronata da un nido di cicogna — un'immagine indimenticabile della grandezza restituita alla natura." },
          { title: "Il complesso della collina di Selçuk", desc: "Il tempio si abbina naturalmente alla Basilica di San Giovanni e alla Moschea di İsa Bey che coronano la collina proprio al di sopra, e alla vicina Efeso." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Il Tempio di Artemide si trova ai margini della cittadina di Selçuk, a pochi minuti in auto o a una piacevole passeggiata dall'ingresso principale di Efeso, così che i due si visitano quasi sempre insieme. Selçuk è sulla linea ferroviaria İzmir–Aydın ed è facile da raggiungere in treno, autobus o con un breve tragitto da İzmir e dalle località costiere, e il sito stesso è proprio a bordo strada, sotto la collina del castello.",
          "Il tempio è un sito aperto e in pianura, di solito a ingresso gratuito, e si apprezza al meglio nella luce più morbida del mattino o del tardo pomeriggio, quando la colonna solitaria cattura il sole e le cicogne sono attive. La primavera e l'autunno sono le stagioni più confortevoli; l'estate intorno a Efeso può essere molto calda, quindi porta acqua e protezione solare in qualsiasi periodo dell'anno.",
          "Poiché oggi resta in piedi così poco, il Tempio di Artemide premia l'immaginazione più della semplice visita, ed è proprio qui che una guida locale abilitata di VibeGuide fa la differenza. Una guida può intrecciare il tempio, Efeso, la Basilica di San Giovanni e la Moschea di İsa Bey in un unico itinerario a Selçuk, e ricostruire la Meraviglia scomparsa nella tua mente, così che una sola colonna diventi il più grande tempio del mondo antico.",
        ],
        faqs: [
          { q: "È rimasto molto del Tempio di Artemide?", a: "Oggi resta in piedi molto poco — soprattutto le fondamenta paludose e una colonna rieretta, spesso sormontata da un nido di cicogna. La sua forza sta in ciò che fu: una guida riporta in vita la Meraviglia scomparsa là dove le rovine da sole non possono." },
          { q: "Che rapporto ha con Efeso?", a: "Il tempio è a Selçuk, a pochi minuti dal sito principale di Efeso, e i due si visitano naturalmente insieme alla Basilica di San Giovanni e alla Moschea di İsa Bey sulla collina appena sopra." },
          { q: "Serve un biglietto per il Tempio di Artemide?", a: "Il tempio è un sito aperto e di solito a ingresso gratuito, a differenza delle vicine rovine di Efeso a pagamento. Una guida locale può organizzare un itinerario combinato a Selçuk che scorre agevolmente tra i siti." },
          { q: "Qual è il momento migliore per visitarlo?", a: "La luce del mattino o del tardo pomeriggio valorizza al meglio la colonna solitaria, e la primavera e l'autunno sono le stagioni più confortevoli. Le estati qui sono calde, quindi porta acqua e protezione solare." },
        ],
        ctaTitle: "Visita il Tempio di Artemide con un locale",
        ...EPH.it,
      },
      pl: {
        name: "Świątynia Artemidy",
        metaTitle: "Świątynia Artemidy w Efezie — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Świątynię Artemidy w Selçuku ze zweryfikowanym lokalnym przewodnikiem. Jeden z siedmiu cudów świata starożytnego, dziś pojedyncza kolumna wznosząca się wśród bocianów i bagien obok Efezu.",
        intro: [
          "Świątynia Artemidy w Selçuku, zaledwie kilka minut od Efezu, była niegdyś jednym z siedmiu cudów świata starożytnego — marmurową świątynią tak ogromną, że była czterokrotnie większa od ateńskiego Partenonu. Starożytni podróżnicy pisali, że widzieli wiele cudów, lecz nic, co dorównywałoby domowi Artemidy sięgającemu chmur.",
          "Dziś miejsce jest skromne: pojedyncza ponownie wzniesiona kolumna wyrasta z bagnistych fundamentów, często z bocianim gniazdem na szczycie i ptakami brodzącymi w trzcinach poniżej. A jednak stanie tutaj, gdzie niegdyś królowie rywalizowali o wzniesienie najwspanialszej świątyni świata starożytnego, to jedna z najcichszych i najbardziej wzruszających lekcji historii. Lokalny ekspert VibeGuide odbudowuje świątynię w twojej wyobraźni — z kolumnami, tłumami i wszystkim innym.",
        ],
        highlights: [
          { title: "Zaginiony cud", desc: "Jeden z siedmiu cudów świata starożytnego, niegdyś czterokrotnie większy od Partenonu, dziś sprowadzony do fundamentów i jednej stojącej kolumny." },
          { title: "Samotna kolumna i jej bociany", desc: "Samotna, ponownie wzniesiona marmurowa kolumna wyrasta z bagna, często zwieńczona bocianim gniazdem — niezapomniany obraz wielkości oddanej naturze." },
          { title: "Zespół wzgórza w Selçuku", desc: "Świątynia naturalnie łączy się z Bazyliką św. Jana i Meczetem İsa Bey wieńczącymi wzgórze tuż nad nią oraz z pobliskim Efezem." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Świątynia Artemidy leży na skraju miasteczka Selçuk, zaledwie kilka minut samochodem lub przyjemny spacer od głównego wejścia do Efezu, więc te dwa miejsca zwiedza się niemal zawsze razem. Selçuk leży na linii kolejowej İzmir–Aydın i łatwo tu dojechać pociągiem, autobusem lub krótkim przejazdem z İzmiru i nadmorskich kurortów, a samo stanowisko znajduje się tuż przy drodze, pod wzgórzem zamkowym.",
          "Świątynia to otwarte, nisko położone stanowisko, zwykle z bezpłatnym wstępem, najlepiej podziwiane w łagodniejszym świetle poranka lub późnego popołudnia, gdy samotna kolumna chwyta słońce, a bociany są aktywne. Wiosna i jesień to najprzyjemniejsze pory roku; lato w okolicach Efezu bywa bardzo upalne, więc niezależnie od pory roku zabierz wodę i ochronę przeciwsłoneczną.",
          "Ponieważ dziś tak niewiele stoi, Świątynia Artemidy nagradza wyobraźnię bardziej niż samo zwiedzanie, i właśnie tu licencjonowany lokalny przewodnik VibeGuide robi różnicę. Przewodnik potrafi połączyć świątynię, Efez, Bazylikę św. Jana i Meczet İsa Bey w jedną trasę po Selçuku i odbudować zaginiony cud w twojej wyobraźni, tak że pojedyncza kolumna staje się największą świątynią świata starożytnego.",
        ],
        faqs: [
          { q: "Czy dużo zostało ze Świątyni Artemidy?", a: "Dziś stoi bardzo niewiele — głównie bagniste fundamenty i jedna ponownie wzniesiona kolumna, często zwieńczona bocianim gniazdem. Jej siła tkwi w tym, czym była: przewodnik przywraca zaginiony cud do życia tam, gdzie same ruiny tego nie potrafią." },
          { q: "Jak wiąże się z Efezem?", a: "Świątynia jest w Selçuku, zaledwie kilka minut od głównego stanowiska Efezu, i oba miejsca zwiedza się naturalnie razem z Bazyliką św. Jana i Meczetem İsa Bey na wzgórzu tuż powyżej." },
          { q: "Czy potrzebuję biletu do Świątyni Artemidy?", a: "Świątynia to otwarte stanowisko, zwykle z bezpłatnym wstępem, w przeciwieństwie do pobliskich, biletowanych ruin Efezu. Lokalny przewodnik może ułożyć łączoną trasę po Selçuku, która płynnie prowadzi między stanowiskami." },
          { q: "Kiedy najlepiej odwiedzić to miejsce?", a: "Światło poranka lub późnego popołudnia najlepiej pasuje do samotnej kolumny, a wiosna i jesień to najprzyjemniejsze pory roku. Lata są tu upalne, więc zabierz wodę i ochronę przeciwsłoneczną." },
        ],
        ctaTitle: "Zobacz Świątynię Artemidy z lokalnym przewodnikiem",
        ...EPH.pl,
      },
      nl: {
        name: "Tempel van Artemis",
        metaTitle: "Tempel van Artemis bij Efeze tours & lokale gidsen",
        metaDescription:
          "Bezoek de Tempel van Artemis in Selçuk met een geverifieerde lokale gids. Een van de Zeven Wereldwonderen van de oudheid, nu een enkele zuil te midden van ooievaars en moeras naast Efeze.",
        intro: [
          "De Tempel van Artemis in Selçuk, op slechts enkele minuten van Efeze, was ooit een van de Zeven Wereldwonderen van de oudheid — een marmeren tempel zo enorm dat hij vier keer groter was dan het Parthenon in Athene. Reizigers uit de oudheid schreven dat ze veel wonderen hadden gezien, maar niets dat kon wedijveren met het huis van Artemis dat tot de wolken reikte.",
          "Vandaag is de plek bescheiden: een enkele opnieuw opgerichte zuil rijst op uit de moerassige fundamenten, vaak met een ooievaarsnest bovenop en de vogels wadend in het riet eronder. En toch is hier staan, waar ooit koningen wedijverden om het grootste heiligdom van de antieke wereld op te richten, een van de stilste en meest ontroerende lessen uit de geschiedenis. Een lokale VibeGuide-expert bouwt de tempel weer op in je verbeelding — zuilen, menigten en al het andere.",
        ],
        highlights: [
          { title: "Een verdwenen Wereldwonder", desc: "Een van de Zeven Wereldwonderen van de oudheid, ooit vier keer zo groot als het Parthenon, nu teruggebracht tot fundamenten en een enkele staande zuil." },
          { title: "De eenzame zuil en zijn ooievaars", desc: "Een eenzame, opnieuw opgerichte marmeren zuil rijst op uit het moeras, vaak bekroond door een ooievaarsnest — een onvergetelijk beeld van grootsheid die aan de natuur is teruggegeven." },
          { title: "Het heuvelcluster van Selçuk", desc: "De tempel combineert vanzelf met de Basiliek van Sint-Jan en de İsa Bey-moskee die de heuvel er vlak boven bekronen, en met het nabije Efeze." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "De Tempel van Artemis ligt aan de rand van het stadje Selçuk, op slechts enkele minuten met de auto of een aangename wandeling van de hoofdingang van Efeze, zodat de twee vrijwel altijd samen worden bezocht. Selçuk ligt aan de spoorlijn İzmir–Aydın en is eenvoudig te bereiken met de trein, de bus of een korte rit vanuit İzmir en de kustplaatsen, en de plek zelf ligt pal langs de weg onder de kasteelheuvel.",
          "De tempel is een open, laaggelegen terrein met doorgaans gratis toegang, en komt het best tot zijn recht in het zachtere licht van de ochtend of de late namiddag, wanneer de eenzame zuil de zon vangt en de ooievaars actief zijn. Lente en herfst zijn de aangenaamste seizoenen; de zomer rond Efeze kan erg heet zijn, dus neem het hele jaar door water en zonbescherming mee.",
          "Omdat er vandaag zo weinig overeind staat, beloont de Tempel van Artemis de verbeelding meer dan het gewone rondkijken, en juist hier maakt een erkende lokale VibeGuide-gids het verschil. Een gids kan de tempel, Efeze, de Basiliek van Sint-Jan en de İsa Bey-moskee tot één Selçuk-route verweven, en het verdwenen Wereldwonder in je hoofd herbouwen, zodat een enkele zuil de grootste tempel van de antieke wereld wordt.",
        ],
        faqs: [
          { q: "Is er veel over van de Tempel van Artemis?", a: "Vandaag staat er heel weinig overeind — vooral de moerassige fundamenten en een opnieuw opgerichte zuil, vaak bekroond door een ooievaarsnest. Zijn kracht schuilt in wat hij ooit was: een gids brengt het verdwenen Wereldwonder tot leven waar de ruïnes alleen dat niet kunnen." },
          { q: "Wat is de relatie met Efeze?", a: "De tempel ligt in Selçuk, op slechts enkele minuten van de hoofdsite van Efeze, en de twee worden vanzelf samen bezocht met de Basiliek van Sint-Jan en de İsa Bey-moskee op de heuvel er vlak boven." },
          { q: "Heb ik een ticket nodig voor de Tempel van Artemis?", a: "De tempel is een open terrein en meestal gratis toegankelijk, anders dan de nabije ruïnes van Efeze waarvoor een ticket nodig is. Een lokale gids kan een gecombineerde Selçuk-route samenstellen die soepel tussen de locaties doorloopt." },
          { q: "Wanneer kun je het best gaan?", a: "Het licht van de ochtend of de late namiddag past het best bij de eenzame zuil, en lente en herfst zijn de aangenaamste seizoenen. De zomers zijn hier heet, dus neem water en zonbescherming mee." },
        ],
        ctaTitle: "Bekijk de Tempel van Artemis met een local",
        ...EPH.nl,
      },
    },
  },
  {
    slug: "bodrum-castle",
    city: "Bodrum",
    citySlug: "bodrum",
    emoji: "🏰",
    image:
      "https://images.unsplash.com/photo-1760197045829-221c11482607?q=80&w=1600",
    lat: 37.0322,
    lng: 27.4289,
    i18n: {
      en: {
        name: "Bodrum Castle",
        metaTitle: "Bodrum Castle & Underwater Museum Tours with Local Guides",
        metaDescription:
          "Explore Bodrum Castle, the Knights Hospitaller fortress above the harbour, with a licensed local guide. Crusader towers, the Museum of Underwater Archaeology and the Uluburun shipwreck.",
        intro: [
          "Bodrum Castle, the Castle of St Peter, stands guard over the town's turquoise harbour like a stone crown. The Knights Hospitaller began raising it in the early 15th century, hauling up blocks from the ruined Mausoleum at Halicarnassus — one of the Seven Wonders of the Ancient World — so that fragments of an ancient king's tomb are woven into the walls of a Crusader fortress.",
          "Its towers still carry the names of the nations that built them — English, French, Italian, German and the Snake Tower — and each rises over the marina with sweeping Aegean views. Inside, the castle houses the celebrated Museum of Underwater Archaeology, where ancient shipwrecks, amphorae and the treasures of the Bronze Age Uluburun wreck tell the story of the sea. With a VibeGuide local expert, the layers of Crusader, Ottoman and ancient history fall into place.",
        ],
        highlights: [
          { title: "The Knights' Towers", desc: "The English, French, Italian, German and Snake towers each rise over the harbour, built by the different tongues of the Hospitaller order in the 15th century." },
          { title: "Museum of Underwater Archaeology", desc: "One of the finest of its kind, displaying ancient shipwrecks, amphorae and glass recovered from the floor of the Aegean." },
          { title: "The Uluburun Wreck", desc: "Finds from a 14th-century BC merchant ship — copper, ingots, gold and exotic cargo — reveal Bronze Age trade across the whole eastern Mediterranean." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Bodrum Castle sits right on the peninsula between the town's two bays, so from almost anywhere in the centre it is a short, scenic walk along the marina. Most visitors arrive at Bodrum by road from Milas–Bodrum Airport, or by ferry from the surrounding coast and the nearby Greek islands, and the castle is impossible to miss on the skyline above the harbour.",
          "Summer on the Aegean is hot and busy, so the mildest, quietest times to climb the ramparts are late spring and early autumn. Mornings bring the softest light for photographs over the marina, and the sea breezes make the open terraces pleasant even in high season. Wear sturdy shoes — the castle is built on rock, with steps, ramps and uneven ground throughout.",
          "Entry to the castle and its Museum of Underwater Archaeology is ticketed, and the site combines a fortress, several towers and museum halls in one visit. A licensed VibeGuide local guide can help you make sense of it all — connecting the Crusader towers to the sunken cargoes below, and adding the short uphill walk to the remains of the Mausoleum at Halicarnassus, the ancient wonder whose stones helped build the walls.",
        ],
        faqs: [
          { q: "Is Bodrum Castle worth visiting?", a: "Very much so. It is one of the best-preserved Crusader castles in the Mediterranean and also home to a world-class Museum of Underwater Archaeology, all wrapped in some of the finest harbour views on the Aegean coast." },
          { q: "What is inside Bodrum Castle?", a: "The castle holds the Museum of Underwater Archaeology, with ancient shipwrecks, thousands of amphorae, glass and the treasures of the Bronze Age Uluburun wreck, alongside the historic English, French, Italian, German and Snake towers." },
          { q: "Is Bodrum Castle connected to the Mausoleum at Halicarnassus?", a: "Yes. The Knights Hospitaller reused stones from the ruined Mausoleum — one of the Seven Wonders of the Ancient World — to build the castle. The Mausoleum site itself lies a short walk uphill in town and pairs perfectly with a castle visit." },
          { q: "Do I need a guide for Bodrum Castle?", a: "You can wander alone, but the castle blends Crusader, Ottoman and ancient maritime history that is easy to miss. A licensed VibeGuide local guide ties the towers, the shipwrecks and the Mausoleum into one clear story." },
        ],
        ctaTitle: "See Bodrum Castle with a local",
        ...BOD.en,
      },
      de: {
        name: "Burg von Bodrum",
        metaTitle: "Burg von Bodrum & Unterwassermuseum: Touren mit lokalen Guides",
        metaDescription:
          "Entdecke die Burg von Bodrum, die Festung der Johanniter über dem Hafen, mit einem lizenzierten lokalen Guide. Kreuzfahrertürme, das Museum für Unterwasserarchäologie und das Uluburun-Wrack.",
        intro: [
          "Die Burg von Bodrum, die Burg des heiligen Petrus, wacht wie eine steinerne Krone über dem türkisfarbenen Hafen der Stadt. Die Johanniter begannen im frühen 15. Jahrhundert mit dem Bau und schleppten Blöcke vom zerstörten Mausoleum von Halikarnassos herauf — einem der Sieben Weltwunder der Antike —, sodass Bruchstücke des Grabmals eines antiken Königs in den Mauern einer Kreuzfahrerfestung stecken.",
          "Ihre Türme tragen bis heute die Namen der Nationen, die sie errichteten — der englische, der französische, der italienische, der deutsche und der Schlangenturm — und jeder erhebt sich über dem Yachthafen mit weitem Blick über die Ägäis. Im Inneren beherbergt die Burg das berühmte Museum für Unterwasserarchäologie, in dem antike Schiffswracks, Amphoren und die Schätze des bronzezeitlichen Uluburun-Wracks die Geschichte des Meeres erzählen. Mit einem lokalen VibeGuide-Experten fügen sich die Schichten aus Kreuzfahrer-, osmanischer und antiker Geschichte zusammen.",
        ],
        highlights: [
          { title: "Die Türme der Ritter", desc: "Der englische, französische, italienische, deutsche und der Schlangenturm erheben sich über dem Hafen, im 15. Jahrhundert von den verschiedenen Zungen des Johanniterordens erbaut." },
          { title: "Museum für Unterwasserarchäologie", desc: "Eines der bedeutendsten seiner Art, mit antiken Schiffswracks, Amphoren und Glas, geborgen vom Grund der Ägäis." },
          { title: "Das Uluburun-Wrack", desc: "Funde eines Handelsschiffs aus dem 14. Jahrhundert v. Chr. — Kupfer, Barren, Gold und exotische Fracht — offenbaren den bronzezeitlichen Handel über das gesamte östliche Mittelmeer." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Die Burg von Bodrum liegt direkt auf der Halbinsel zwischen den beiden Buchten der Stadt, sodass sie von fast überall im Zentrum nur einen kurzen, malerischen Spaziergang am Yachthafen entfernt ist. Die meisten Besucher erreichen Bodrum auf der Straße vom Flughafen Milas–Bodrum oder per Fähre von der umliegenden Küste und den nahen griechischen Inseln — die Burg ist über dem Hafen nicht zu übersehen.",
          "Der Sommer an der Ägäis ist heiß und voll, daher sind das späte Frühjahr und der frühe Herbst die mildesten und ruhigsten Zeiten, um die Wehrgänge zu erklimmen. Morgens fällt das weichste Licht für Fotos über dem Yachthafen, und die Meeresbrise macht die offenen Terrassen selbst in der Hochsaison angenehm. Trage festes Schuhwerk — die Burg steht auf Fels, mit Stufen, Rampen und unebenem Boden überall.",
          "Der Eintritt in die Burg und ihr Museum für Unterwasserarchäologie ist kostenpflichtig, und die Anlage vereint Festung, mehrere Türme und Museumssäle in einem Besuch. Ein lizenzierter lokaler VibeGuide-Guide hilft dir, das Ganze zu verstehen — er verbindet die Kreuzfahrertürme mit den versunkenen Frachten darunter und ergänzt den kurzen Aufstieg zu den Resten des Mausoleums von Halikarnassos, jenes antiken Weltwunders, dessen Steine die Mauern mit erbauten.",
        ],
        faqs: [
          { q: "Lohnt sich ein Besuch der Burg von Bodrum?", a: "Auf jeden Fall. Sie ist eine der am besten erhaltenen Kreuzfahrerburgen im Mittelmeer und zugleich Heimat eines weltberühmten Museums für Unterwasserarchäologie — umrahmt von einigen der schönsten Hafenblicke der Ägäisküste." },
          { q: "Was gibt es in der Burg von Bodrum zu sehen?", a: "Die Burg beherbergt das Museum für Unterwasserarchäologie mit antiken Schiffswracks, Tausenden von Amphoren, Glas und den Schätzen des bronzezeitlichen Uluburun-Wracks sowie die historischen Türme England, Frankreich, Italien, Deutschland und den Schlangenturm." },
          { q: "Steht die Burg von Bodrum mit dem Mausoleum von Halikarnassos in Verbindung?", a: "Ja. Die Johanniter verwendeten Steine des zerstörten Mausoleums — eines der Sieben Weltwunder der Antike — für den Bau der Burg. Die Stätte des Mausoleums liegt einen kurzen Fußweg bergauf in der Stadt und lässt sich ideal mit einem Burgbesuch verbinden." },
          { q: "Brauche ich einen Guide für die Burg von Bodrum?", a: "Du kannst allein umhergehen, aber die Burg vereint Kreuzfahrer-, osmanische und antike Seefahrtsgeschichte, die man leicht übersieht. Ein lizenzierter lokaler VibeGuide-Guide verbindet Türme, Schiffswracks und Mausoleum zu einer klaren Erzählung." },
        ],
        ctaTitle: "Erlebe die Burg von Bodrum mit einem Local",
        ...BOD.de,
      },
      ru: {
        name: "Замок Бодрум",
        metaTitle: "Замок Бодрум и Музей подводной археологии: экскурсии с местными гидами",
        metaDescription:
          "Исследуйте замок Бодрум, крепость госпитальеров над гаванью, с лицензированным местным гидом. Башни крестоносцев, Музей подводной археологии и корабль Улубурун.",
        intro: [
          "Замок Бодрум, замок Святого Петра, стоит над бирюзовой гаванью города словно каменная корона. Госпитальеры начали возводить его в начале XV века, поднимая наверх блоки от разрушенного Мавзолея в Галикарнасе — одного из семи чудес света древности, — так что фрагменты гробницы античного царя вплетены в стены крепости крестоносцев.",
          "Его башни до сих пор носят имена народов, которые их построили — Английская, Французская, Итальянская, Немецкая и Змеиная, — и каждая возвышается над мариной с широким видом на Эгейское море. Внутри замок хранит знаменитый Музей подводной археологии, где древние кораблекрушения, амфоры и сокровища бронзового века с корабля Улубурун рассказывают историю моря. С местным экспертом VibeGuide слои истории крестоносцев, османов и античности складываются в единую картину.",
        ],
        highlights: [
          { title: "Башни рыцарей", desc: "Английская, Французская, Итальянская, Немецкая и Змеиная башни возвышаются над гаванью, построенные в XV веке разными языками ордена госпитальеров." },
          { title: "Музей подводной археологии", desc: "Один из лучших в своём роде — здесь выставлены древние кораблекрушения, амфоры и стекло, поднятые со дна Эгейского моря." },
          { title: "Корабль Улубурун", desc: "Находки с торгового судна XIV века до н. э. — медь, слитки, золото и экзотический груз — раскрывают торговлю бронзового века по всему восточному Средиземноморью." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Замок Бодрум расположен прямо на полуострове между двумя бухтами города, так что почти из любой точки центра до него ведёт короткая живописная прогулка вдоль марины. Большинство гостей приезжают в Бодрум по дороге из аэропорта Милас–Бодрум или на пароме с окрестного побережья и ближайших греческих островов, и замок невозможно не заметить на фоне гавани.",
          "Лето на Эгейском море жаркое и людное, поэтому самое мягкое и спокойное время подниматься на стены — поздняя весна и ранняя осень. Утром свет самый мягкий для снимков над мариной, а морской бриз делает открытые террасы приятными даже в разгар сезона. Наденьте прочную обувь — замок стоит на скале, повсюду ступени, пандусы и неровная поверхность.",
          "Вход в замок и его Музей подводной археологии платный, и осмотр объединяет крепость, несколько башен и музейные залы в одно посещение. Лицензированный местный гид VibeGuide поможет во всём разобраться — свяжет башни крестоносцев с затонувшими грузами внизу и добавит короткий подъём к руинам Мавзолея в Галикарнасе, того самого чуда света, чьи камни легли в стены замка.",
        ],
        faqs: [
          { q: "Стоит ли посещать замок Бодрум?", a: "Безусловно. Это одна из наиболее сохранившихся крепостей крестоносцев в Средиземноморье и одновременно дом для Музея подводной археологии мирового уровня — и всё это в обрамлении одних из красивейших видов на гавань Эгейского побережья." },
          { q: "Что находится внутри замка Бодрум?", a: "В замке размещён Музей подводной археологии с древними кораблекрушениями, тысячами амфор, стеклом и сокровищами корабля Улубурун бронзового века, а также исторические Английская, Французская, Итальянская, Немецкая и Змеиная башни." },
          { q: "Связан ли замок Бодрум с Мавзолеем в Галикарнасе?", a: "Да. Госпитальеры использовали камни разрушенного Мавзолея — одного из семи чудес света древности — для постройки замка. Сам участок Мавзолея находится в коротком подъёме в городе и прекрасно сочетается с визитом в замок." },
          { q: "Нужен ли гид для замка Бодрум?", a: "Можно гулять и самостоятельно, но замок соединяет историю крестоносцев, османов и античного мореплавания, которую легко упустить. Лицензированный местный гид VibeGuide связывает башни, кораблекрушения и Мавзолей в одну ясную историю." },
        ],
        ctaTitle: "Увидеть замок Бодрум с местным гидом",
        ...BOD.ru,
      },
      ar: {
        name: "قلعة بودروم",
        metaTitle: "قلعة بودروم ومتحف الآثار تحت الماء: جولات مع مرشدين محليين",
        metaDescription:
          "استكشف قلعة بودروم، حصن فرسان الإسبتارية فوق الميناء، مع مرشد محلي مرخّص. أبراج الصليبيين، ومتحف الآثار تحت الماء، وحطام سفينة أولوبورون.",
        intro: [
          "تقف قلعة بودروم، قلعة القديس بطرس، حارسةً فوق الميناء الفيروزي للمدينة كأنها تاج من حجر. بدأ فرسان الإسبتارية ببنائها في أوائل القرن الخامس عشر، ناقلين إليها كتلًا من ضريح هاليكارناسوس المدمّر — أحد عجائب الدنيا السبع في العالم القديم — حتى إن شظايا من قبر ملك قديم صارت جزءًا من جدران حصن صليبي.",
          "لا تزال أبراجها تحمل أسماء الأمم التي شيّدتها — البرج الإنجليزي والفرنسي والإيطالي والألماني وبرج الأفعى — ويرتفع كل منها فوق المرسى بإطلالات واسعة على بحر إيجه. وفي داخلها تضم القلعة متحف الآثار تحت الماء الشهير، حيث تروي حطام السفن القديمة والجرار والكنوز المنتشلة من سفينة أولوبورون من العصر البرونزي حكاية البحر. ومع خبير محلي من VibeGuide تتضح طبقات التاريخ الصليبي والعثماني والقديم." ,
        ],
        highlights: [
          { title: "أبراج الفرسان", desc: "يرتفع كل من البرج الإنجليزي والفرنسي والإيطالي والألماني وبرج الأفعى فوق الميناء، شيّدها في القرن الخامس عشر مختلف ألسنة رهبانية الإسبتارية." },
          { title: "متحف الآثار تحت الماء", desc: "من أرقى المتاحف من نوعه، يعرض حطام السفن القديمة والجرار والزجاج المنتشل من قاع بحر إيجه." },
          { title: "حطام أولوبورون", desc: "مكتشفات من سفينة تجارية تعود للقرن الرابع عشر قبل الميلاد — نحاس وسبائك وذهب وبضائع نادرة — تكشف عن تجارة العصر البرونزي عبر شرق المتوسط بأكمله." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "تقع قلعة بودروم مباشرة على شبه الجزيرة بين خليجي المدينة، فمن أي مكان تقريبًا في المركز تبعد مسيرًا قصيرًا وخلابًا بمحاذاة المرسى. يصل معظم الزوار إلى بودروم برًا من مطار ميلاس–بودروم، أو بالعبّارة من السواحل المجاورة والجزر اليونانية القريبة، ولا يمكن أن تفوتك القلعة على الأفق فوق الميناء.",
          "الصيف على بحر إيجه حار ومزدحم، لذا فإن أفضل الأوقات وأهدأها لصعود الأسوار هي أواخر الربيع وأوائل الخريف. يمنح الصباح أعذب ضوء للصور فوق المرسى، ويجعل نسيم البحر الشرفات المكشوفة لطيفة حتى في ذروة الموسم. انتعل حذاءً متينًا — فالقلعة مبنية على الصخر، وفيها درجات ومنحدرات وأرض غير مستوية في كل مكان.",
          "الدخول إلى القلعة ومتحف الآثار تحت الماء مقابل تذكرة، ويجمع الموقع بين حصن وعدة أبراج وقاعات متحف في زيارة واحدة. يستطيع مرشد VibeGuide المحلي المرخّص أن يساعدك على فهم كل ذلك — يربط أبراج الصليبيين بالحمولات الغارقة في الأسفل، ويضيف الصعود القصير إلى بقايا ضريح هاليكارناسوس، تلك الأعجوبة القديمة التي أسهمت حجارتها في بناء الأسوار.",
        ],
        faqs: [
          { q: "هل تستحق قلعة بودروم الزيارة؟", a: "بلا شك. فهي من أفضل القلاع الصليبية المحفوظة في المتوسط، وتضم في الوقت نفسه متحفًا عالميًا للآثار تحت الماء، وكل ذلك محاط بأجمل إطلالات الميناء على ساحل بحر إيجه." },
          { q: "ماذا يوجد داخل قلعة بودروم؟", a: "تضم القلعة متحف الآثار تحت الماء بما فيه من حطام سفن قديمة وآلاف الجرار والزجاج وكنوز سفينة أولوبورون من العصر البرونزي، إلى جانب الأبراج التاريخية: الإنجليزي والفرنسي والإيطالي والألماني وبرج الأفعى." },
          { q: "هل ترتبط قلعة بودروم بضريح هاليكارناسوس؟", a: "نعم. أعاد فرسان الإسبتارية استخدام حجارة الضريح المدمّر — أحد عجائب الدنيا السبع في العالم القديم — في بناء القلعة. ويقع موقع الضريح نفسه على مسيرة قصيرة صعودًا في المدينة ويتكامل تمامًا مع زيارة القلعة." },
          { q: "هل أحتاج إلى مرشد لزيارة قلعة بودروم؟", a: "يمكنك التجوّل وحدك، لكن القلعة تمزج تاريخ الصليبيين والعثمانيين والملاحة القديمة الذي يسهل تفويته. يربط مرشد VibeGuide المحلي المرخّص بين الأبراج وحطام السفن والضريح في حكاية واحدة واضحة." },
        ],
        ctaTitle: "زر قلعة بودروم مع مرشد محلي",
        ...BOD.ar,
      },
      es: {
        name: "Castillo de Bodrum",
        metaTitle: "Castillo de Bodrum y Museo de Arqueología Submarina con guías locales",
        metaDescription:
          "Explora el Castillo de Bodrum, la fortaleza de los Caballeros Hospitalarios sobre el puerto, con un guía local titulado. Torres cruzadas, el Museo de Arqueología Submarina y el pecio de Uluburun.",
        intro: [
          "El Castillo de Bodrum, el Castillo de San Pedro, vigila el puerto turquesa de la ciudad como una corona de piedra. Los Caballeros Hospitalarios empezaron a levantarlo a comienzos del siglo XV, subiendo bloques del arruinado Mausoleo de Halicarnaso — una de las Siete Maravillas del Mundo Antiguo —, de modo que fragmentos de la tumba de un rey antiguo quedaron entretejidos en los muros de una fortaleza cruzada.",
          "Sus torres aún llevan los nombres de las naciones que las construyeron — la inglesa, la francesa, la italiana, la alemana y la Torre de la Serpiente — y cada una se alza sobre el puerto deportivo con amplias vistas del Egeo. En su interior, el castillo alberga el célebre Museo de Arqueología Submarina, donde antiguos pecios, ánforas y los tesoros del naufragio de Uluburun de la Edad del Bronce cuentan la historia del mar. Con un experto local de VibeGuide, las capas cruzada, otomana y antigua encajan en su sitio.",
        ],
        highlights: [
          { title: "Las torres de los Caballeros", desc: "Las torres inglesa, francesa, italiana, alemana y de la Serpiente se alzan sobre el puerto, construidas en el siglo XV por las distintas lenguas de la orden Hospitalaria." },
          { title: "Museo de Arqueología Submarina", desc: "Uno de los mejores de su clase, con antiguos pecios, ánforas y vidrio rescatados del fondo del Egeo." },
          { title: "El pecio de Uluburun", desc: "Los hallazgos de un barco mercante del siglo XIV a. C. — cobre, lingotes, oro y cargamento exótico — revelan el comercio de la Edad del Bronce por todo el Mediterráneo oriental." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "El Castillo de Bodrum se asienta justo en la península entre las dos bahías de la ciudad, así que desde casi cualquier punto del centro es un paseo corto y pintoresco junto al puerto deportivo. La mayoría de los visitantes llegan a Bodrum por carretera desde el aeropuerto de Milas–Bodrum, o en ferry desde la costa cercana y las islas griegas próximas, y el castillo es imposible de perder en el perfil sobre el puerto.",
          "El verano en el Egeo es caluroso y concurrido, así que las épocas más suaves y tranquilas para subir a las murallas son finales de primavera y principios de otoño. Las mañanas ofrecen la luz más suave para fotografiar el puerto deportivo, y la brisa marina hace agradables las terrazas abiertas incluso en temporada alta. Lleva calzado resistente: el castillo se asienta sobre roca, con escalones, rampas y suelo irregular por todas partes.",
          "La entrada al castillo y a su Museo de Arqueología Submarina requiere ticket, y el recinto combina fortaleza, varias torres y salas de museo en una sola visita. Un guía local titulado de VibeGuide puede ayudarte a entenderlo todo — enlazando las torres cruzadas con los cargamentos hundidos abajo y añadiendo el corto ascenso hasta los restos del Mausoleo de Halicarnaso, la maravilla antigua cuyas piedras ayudaron a levantar los muros.",
        ],
        faqs: [
          { q: "¿Merece la pena visitar el Castillo de Bodrum?", a: "Sin duda. Es uno de los castillos cruzados mejor conservados del Mediterráneo y a la vez sede de un Museo de Arqueología Submarina de nivel mundial, todo ello enmarcado por algunas de las mejores vistas de puerto de la costa del Egeo." },
          { q: "¿Qué hay dentro del Castillo de Bodrum?", a: "El castillo guarda el Museo de Arqueología Submarina, con antiguos pecios, miles de ánforas, vidrio y los tesoros del naufragio de Uluburun de la Edad del Bronce, junto a las históricas torres inglesa, francesa, italiana, alemana y de la Serpiente." },
          { q: "¿Está el Castillo de Bodrum relacionado con el Mausoleo de Halicarnaso?", a: "Sí. Los Caballeros Hospitalarios reutilizaron piedras del arruinado Mausoleo — una de las Siete Maravillas del Mundo Antiguo — para construir el castillo. El propio yacimiento del Mausoleo queda a un corto paseo cuesta arriba en la ciudad y combina perfectamente con la visita al castillo." },
          { q: "¿Necesito un guía para el Castillo de Bodrum?", a: "Puedes recorrerlo por tu cuenta, pero el castillo mezcla historia cruzada, otomana y marítima antigua que es fácil pasar por alto. Un guía local titulado de VibeGuide une las torres, los pecios y el Mausoleo en un relato claro." },
        ],
        ctaTitle: "Visita el Castillo de Bodrum con un local",
        ...BOD.es,
      },
      fr: {
        name: "Château de Bodrum",
        metaTitle: "Château de Bodrum & Musée d'archéologie sous-marine avec guides locaux",
        metaDescription:
          "Explorez le Château de Bodrum, la forteresse des Hospitaliers au-dessus du port, avec un guide local agréé. Tours des croisés, Musée d'archéologie sous-marine et l'épave d'Uluburun.",
        intro: [
          "Le Château de Bodrum, le château Saint-Pierre, veille sur le port turquoise de la ville telle une couronne de pierre. Les Hospitaliers commencèrent à l'élever au début du XVe siècle, hissant des blocs du Mausolée d'Halicarnasse en ruine — l'une des Sept Merveilles du monde antique —, si bien que des fragments du tombeau d'un roi antique se retrouvent enchâssés dans les murs d'une forteresse de croisés.",
          "Ses tours portent encore les noms des nations qui les bâtirent — anglaise, française, italienne, allemande et la tour du Serpent — et chacune domine la marina avec de vastes vues sur la mer Égée. À l'intérieur, le château abrite le célèbre Musée d'archéologie sous-marine, où d'antiques épaves, des amphores et les trésors de l'épave d'Uluburun de l'âge du bronze racontent l'histoire de la mer. Avec un expert local VibeGuide, les strates croisée, ottomane et antique se mettent en place.",
        ],
        highlights: [
          { title: "Les tours des Chevaliers", desc: "Les tours anglaise, française, italienne, allemande et du Serpent dominent le port, bâties au XVe siècle par les différentes langues de l'ordre des Hospitaliers." },
          { title: "Musée d'archéologie sous-marine", desc: "L'un des plus beaux de son genre, présentant d'antiques épaves, des amphores et du verre remontés du fond de la mer Égée." },
          { title: "L'épave d'Uluburun", desc: "Les trouvailles d'un navire marchand du XIVe siècle av. J.-C. — cuivre, lingots, or et cargaison exotique — révèlent le commerce de l'âge du bronze à travers toute la Méditerranée orientale." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Le Château de Bodrum se dresse sur la presqu'île entre les deux baies de la ville, si bien que de presque partout dans le centre, il n'est qu'à une courte et jolie marche le long de la marina. La plupart des visiteurs arrivent à Bodrum par la route depuis l'aéroport de Milas–Bodrum, ou en ferry depuis la côte alentour et les îles grecques voisines, et le château est impossible à manquer sur la ligne d'horizon au-dessus du port.",
          "L'été sur l'Égée est chaud et animé : les moments les plus doux et les plus calmes pour gravir les remparts sont donc la fin du printemps et le début de l'automne. Le matin offre la lumière la plus douce pour photographier la marina, et la brise marine rend les terrasses ouvertes agréables même en haute saison. Portez de bonnes chaussures — le château est bâti sur le roc, avec marches, rampes et sols inégaux partout.",
          "L'entrée au château et à son Musée d'archéologie sous-marine est payante, et le site réunit une forteresse, plusieurs tours et des salles de musée en une seule visite. Un guide local agréé VibeGuide vous aide à tout comprendre — reliant les tours des croisés aux cargaisons englouties en contrebas, et ajoutant la courte montée jusqu'aux vestiges du Mausolée d'Halicarnasse, cette merveille antique dont les pierres ont contribué à bâtir les murs.",
        ],
        faqs: [
          { q: "Le Château de Bodrum vaut-il la visite ?", a: "Assurément. C'est l'un des châteaux de croisés les mieux conservés de Méditerranée et aussi le siège d'un Musée d'archéologie sous-marine de classe mondiale, le tout entouré de quelques-unes des plus belles vues de port de la côte égéenne." },
          { q: "Qu'y a-t-il à l'intérieur du Château de Bodrum ?", a: "Le château abrite le Musée d'archéologie sous-marine, avec d'antiques épaves, des milliers d'amphores, du verre et les trésors de l'épave d'Uluburun de l'âge du bronze, aux côtés des tours historiques anglaise, française, italienne, allemande et du Serpent." },
          { q: "Le Château de Bodrum est-il lié au Mausolée d'Halicarnasse ?", a: "Oui. Les Hospitaliers ont réemployé les pierres du Mausolée en ruine — l'une des Sept Merveilles du monde antique — pour bâtir le château. Le site du Mausolée se trouve à une courte montée dans la ville et se marie parfaitement avec la visite du château." },
          { q: "Ai-je besoin d'un guide pour le Château de Bodrum ?", a: "Vous pouvez flâner seul, mais le château mêle histoire croisée, ottomane et maritime antique qu'il est facile de manquer. Un guide local agréé VibeGuide relie les tours, les épaves et le Mausolée en un récit clair." },
        ],
        ctaTitle: "Visitez le Château de Bodrum avec un local",
        ...BOD.fr,
      },
      el: {
        name: "Κάστρο του Μπόντρουμ",
        metaTitle: "Κάστρο του Μπόντρουμ & Μουσείο Υποβρύχιας Αρχαιολογίας με ντόπιους ξεναγούς",
        metaDescription:
          "Εξερεύνησε το Κάστρο του Μπόντρουμ, το φρούριο των Ιπποτών του Αγίου Ιωάννη πάνω από το λιμάνι, με πιστοποιημένο ντόπιο ξεναγό. Πύργοι των σταυροφόρων, Μουσείο Υποβρύχιας Αρχαιολογίας και το ναυάγιο του Ουλουμπουρούν.",
        intro: [
          "Το Κάστρο του Μπόντρουμ, το Κάστρο του Αγίου Πέτρου, φρουρεί το τιρκουάζ λιμάνι της πόλης σαν πέτρινο στέμμα. Οι Ιππότες του Αγίου Ιωάννη άρχισαν να το χτίζουν στις αρχές του 15ου αιώνα, ανεβάζοντας ογκόλιθους από το ερειπωμένο Μαυσωλείο της Αλικαρνασσού — ένα από τα Επτά Θαύματα του αρχαίου κόσμου —, έτσι που θραύσματα του τάφου ενός αρχαίου βασιλιά είναι υφασμένα στα τείχη ενός σταυροφορικού φρουρίου.",
          "Οι πύργοι του φέρουν ακόμη τα ονόματα των εθνών που τους έχτισαν — ο Αγγλικός, ο Γαλλικός, ο Ιταλικός, ο Γερμανικός και ο Πύργος του Φιδιού — και ο καθένας υψώνεται πάνω από τη μαρίνα με πανοραμική θέα στο Αιγαίο. Στο εσωτερικό του, το κάστρο στεγάζει το φημισμένο Μουσείο Υποβρύχιας Αρχαιολογίας, όπου αρχαία ναυάγια, αμφορείς και οι θησαυροί του ναυαγίου του Ουλουμπουρούν της Εποχής του Χαλκού αφηγούνται την ιστορία της θάλασσας. Με έναν ντόπιο ειδικό του VibeGuide, τα στρώματα της σταυροφορικής, οθωμανικής και αρχαίας ιστορίας μπαίνουν στη θέση τους.",
        ],
        highlights: [
          { title: "Οι πύργοι των Ιπποτών", desc: "Ο Αγγλικός, ο Γαλλικός, ο Ιταλικός, ο Γερμανικός και ο Πύργος του Φιδιού υψώνονται πάνω από το λιμάνι, χτισμένοι τον 15ο αιώνα από τις διαφορετικές γλώσσες του Τάγματος του Αγίου Ιωάννη." },
          { title: "Μουσείο Υποβρύχιας Αρχαιολογίας", desc: "Ένα από τα καλύτερα του είδους του, με αρχαία ναυάγια, αμφορείς και γυαλί ανασυρμένα από τον βυθό του Αιγαίου." },
          { title: "Το ναυάγιο του Ουλουμπουρούν", desc: "Ευρήματα από ένα εμπορικό πλοίο του 14ου αιώνα π.Χ. — χαλκός, ράβδοι μετάλλου, χρυσός και εξωτικό φορτίο — αποκαλύπτουν το εμπόριο της Εποχής του Χαλκού σε όλη την ανατολική Μεσόγειο." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Κάστρο του Μπόντρουμ βρίσκεται ακριβώς στη χερσόνησο ανάμεσα στους δύο κόλπους της πόλης, οπότε από σχεδόν οποιοδήποτε σημείο του κέντρου απέχει μια σύντομη, γραφική βόλτα κατά μήκος της μαρίνας. Οι περισσότεροι επισκέπτες φτάνουν στο Μπόντρουμ οδικώς από το αεροδρόμιο Μιλάς–Μπόντρουμ ή με φέρι από τη γύρω ακτή και τα κοντινά ελληνικά νησιά, και το κάστρο είναι αδύνατον να το χάσετε στον ορίζοντα πάνω από το λιμάνι.",
          "Το καλοκαίρι στο Αιγαίο είναι ζεστό και πολυσύχναστο, γι' αυτό οι πιο ήπιες και ήσυχες εποχές για να ανεβείτε στις επάλξεις είναι το τέλος της άνοιξης και οι αρχές του φθινοπώρου. Το πρωί προσφέρει το πιο απαλό φως για φωτογραφίες πάνω από τη μαρίνα, και η θαλασσινή αύρα κάνει τις ανοιχτές βεράντες ευχάριστες ακόμη και στην αιχμή της σεζόν. Φορέστε γερά παπούτσια — το κάστρο είναι χτισμένο σε βράχο, με σκαλιά, ράμπες και ανώμαλο έδαφος παντού.",
          "Η είσοδος στο κάστρο και στο Μουσείο Υποβρύχιας Αρχαιολογίας απαιτεί εισιτήριο, και ο χώρος συνδυάζει ένα φρούριο, αρκετούς πύργους και αίθουσες μουσείου σε μία επίσκεψη. Ένας αδειούχος ντόπιος ξεναγός της VibeGuide μπορεί να σας βοηθήσει να τα βγάλετε νόημα όλα — συνδέοντας τους πύργους των σταυροφόρων με τα βυθισμένα φορτία από κάτω και προσθέτοντας τη σύντομη ανηφόρα ως τα ερείπια του Μαυσωλείου της Αλικαρνασσού, εκείνο το αρχαίο θαύμα του οποίου οι πέτρες βοήθησαν να χτιστούν τα τείχη.",
        ],
        faqs: [
          { q: "Αξίζει να επισκεφθείτε το Κάστρο του Μπόντρουμ;", a: "Απολύτως. Είναι ένα από τα καλύτερα διατηρημένα σταυροφορικά κάστρα της Μεσογείου και συνάμα στεγάζει ένα παγκόσμιας κλάσης Μουσείο Υποβρύχιας Αρχαιολογίας, όλα πλαισιωμένα από μερικές από τις ωραιότερες θέες λιμανιού στην ακτή του Αιγαίου." },
          { q: "Τι υπάρχει μέσα στο Κάστρο του Μπόντρουμ;", a: "Το κάστρο φιλοξενεί το Μουσείο Υποβρύχιας Αρχαιολογίας, με αρχαία ναυάγια, χιλιάδες αμφορείς, γυαλί και τους θησαυρούς του ναυαγίου του Ουλουμπουρούν της Εποχής του Χαλκού, μαζί με τους ιστορικούς πύργους: Αγγλικό, Γαλλικό, Ιταλικό, Γερμανικό και του Φιδιού." },
          { q: "Συνδέεται το Κάστρο του Μπόντρουμ με το Μαυσωλείο της Αλικαρνασσού;", a: "Ναι. Οι Ιππότες του Αγίου Ιωάννη ξαναχρησιμοποίησαν πέτρες από το ερειπωμένο Μαυσωλείο — ένα από τα Επτά Θαύματα του αρχαίου κόσμου — για να χτίσουν το κάστρο. Ο ίδιος ο χώρος του Μαυσωλείου βρίσκεται σε μια σύντομη ανηφόρα μέσα στην πόλη και ταιριάζει τέλεια με μια επίσκεψη στο κάστρο." },
          { q: "Χρειάζομαι ξεναγό για το Κάστρο του Μπόντρουμ;", a: "Μπορείτε να περιπλανηθείτε μόνοι, αλλά το κάστρο συνδυάζει σταυροφορική, οθωμανική και αρχαία ναυτική ιστορία που εύκολα σας ξεφεύγει. Ένας αδειούχος ντόπιος ξεναγός της VibeGuide συνδέει τους πύργους, τα ναυάγια και το Μαυσωλείο σε μία καθαρή αφήγηση." },
        ],
        ctaTitle: "Δες το Κάστρο του Μπόντρουμ με έναν ντόπιο",
        ...BOD.el,
      },
      tr: {
        name: "Bodrum Kalesi",
        metaTitle: "Bodrum Kalesi & Sualtı Arkeoloji Müzesi Turları | Yerel Rehberler",
        metaDescription:
          "Limanın üzerindeki St. Peter Şövalyeleri kalesini, lisanslı bir yerel rehberle keşfet. Haçlı kuleleri, Sualtı Arkeoloji Müzesi ve Uluburun batığı.",
        intro: [
          "Bodrum Kalesi, yani St. Peter Kalesi, kentin turkuaz limanını taştan bir taç gibi korur. Rodos (St. Jean) Şövalyeleri 15. yüzyılın başlarında inşasına başladı ve yıkık Halikarnas Mozolesi'nden — antik dünyanın Yedi Harikası'ndan biri — bloklar taşıdı; öyle ki antik bir kralın mezarından kalan parçalar bir Haçlı kalesinin duvarlarına işlendi.",
          "Kuleleri hâlâ onları yapan ulusların adını taşır — İngiliz, Fransız, İtalyan, Alman ve Yılanlı Kule — ve her biri marina üzerinde Ege'ye açılan geniş manzaralarla yükselir. İçeride kale, ünlü Sualtı Arkeoloji Müzesi'ne ev sahipliği yapar; burada antik batıklar, amphoralar ve Tunç Çağı'na ait Uluburun batığının hazineleri denizin hikâyesini anlatır. Bir VibeGuide yerel uzmanıyla Haçlı, Osmanlı ve antik katmanlar yerli yerine oturur.",
        ],
        highlights: [
          { title: "Şövalye Kuleleri", desc: "İngiliz, Fransız, İtalyan, Alman ve Yılanlı Kule limanın üzerinde yükselir; 15. yüzyılda Şövalye tarikatının farklı dilleri tarafından inşa edildi." },
          { title: "Sualtı Arkeoloji Müzesi", desc: "Türünün en iyilerinden biri; Ege'nin dibinden çıkarılan antik batıkları, amphoraları ve cam eserleri sergiler." },
          { title: "Uluburun Batığı", desc: "MÖ 14. yüzyıla ait bir ticaret gemisinin buluntuları — bakır, külçe, altın ve egzotik yük — Tunç Çağı'nda tüm Doğu Akdeniz ticaretini gözler önüne serer." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Bodrum Kalesi, kentin iki koyu arasındaki yarımadanın tam üzerinde yer alır; bu yüzden merkezdeki hemen her noktadan marina boyunca kısa ve keyifli bir yürüyüşle ulaşılır. Ziyaretçilerin çoğu Bodrum'a Milas–Bodrum Havalimanı'ndan karayoluyla ya da çevre kıyılardan ve yakın Yunan adalarından feribotla gelir; kale, limanın üzerindeki siluette gözden kaçırılamaz.",
          "Ege'de yaz sıcak ve kalabalıktır; bu nedenle surlara çıkmak için en ılıman ve sakin zamanlar ilkbahar sonu ile sonbahar başıdır. Sabahlar, marina üzerindeki fotoğraflar için en yumuşak ışığı verir ve deniz meltemi açık terasları yüksek sezonda bile ferah kılar. Sağlam ayakkabı giyin — kale kayalık üzerine kuruludur; her yerde basamak, rampa ve engebeli zemin vardır.",
          "Kaleye ve Sualtı Arkeoloji Müzesi'ne giriş biletlidir; alan tek bir ziyarette bir kaleyi, birkaç kuleyi ve müze salonlarını bir araya getirir. Lisanslı bir VibeGuide yerel rehberi her şeyi anlamlandırmanıza yardımcı olur — Haçlı kulelerini aşağıdaki batık yüklerle ilişkilendirir ve kentin yokuş yukarısındaki Halikarnas Mozolesi kalıntılarına yapılacak kısa yürüyüşü ekler; duvarların yapımına taşları katkı sunan o antik harikaya.",
        ],
        faqs: [
          { q: "Bodrum Kalesi görülmeye değer mi?", a: "Kesinlikle. Akdeniz'in en iyi korunmuş Haçlı kalelerinden biri olmasının yanı sıra dünya çapında bir Sualtı Arkeoloji Müzesi'ne ev sahipliği yapar; hepsi Ege kıyısının en güzel liman manzaralarıyla çevrilidir." },
          { q: "Bodrum Kalesi'nin içinde ne var?", a: "Kalede, antik batıklar, binlerce amphora, cam eserler ve Tunç Çağı Uluburun batığının hazineleriyle Sualtı Arkeoloji Müzesi bulunur; ayrıca tarihi İngiliz, Fransız, İtalyan, Alman ve Yılanlı kuleler yer alır." },
          { q: "Bodrum Kalesi'nin Halikarnas Mozolesi ile bağlantısı var mı?", a: "Evet. Şövalyeler kaleyi inşa ederken yıkık Mozole'nin — antik dünyanın Yedi Harikası'ndan biri — taşlarını yeniden kullandı. Mozole alanının kendisi kentte kısa bir yokuş yürüyüşü mesafesindedir ve kale ziyaretiyle mükemmel bütünleşir." },
          { q: "Bodrum Kalesi için rehbere ihtiyacım var mı?", a: "Tek başınıza gezebilirsiniz, ama kale kolayca gözden kaçan Haçlı, Osmanlı ve antik denizcilik tarihini bir araya getirir. Lisanslı bir VibeGuide yerel rehberi kuleleri, batıkları ve Mozole'yi tek ve net bir hikâyede birleştirir." },
        ],
        ctaTitle: "Bodrum Kalesi'ni bir yerelle gez",
        ...BOD.tr,
      },
      it: {
        name: "Castello di Bodrum",
        metaTitle: "Castello di Bodrum e Museo di Archeologia Subacquea con guide locali",
        metaDescription:
          "Esplora il Castello di Bodrum, la fortezza dei Cavalieri Ospitalieri sopra il porto, con una guida locale abilitata. Torri crociate, il Museo di Archeologia Subacquea e il relitto di Uluburun.",
        intro: [
          "Il Castello di Bodrum, il Castello di San Pietro, veglia sul porto turchese della città come una corona di pietra. I Cavalieri Ospitalieri cominciarono a innalzarlo agli inizi del XV secolo, trascinando in alto blocchi dal Mausoleo di Alicarnasso in rovina — una delle Sette Meraviglie del mondo antico —, così che frammenti della tomba di un re antico sono intessuti nelle mura di una fortezza crociata.",
          "Le sue torri portano ancora i nomi delle nazioni che le costruirono — inglese, francese, italiana, tedesca e la Torre del Serpente — e ciascuna si erge sul porticciolo con ampie vedute sull'Egeo. All'interno, il castello ospita il celebre Museo di Archeologia Subacquea, dove antichi relitti, anfore e i tesori del relitto di Uluburun dell'età del bronzo raccontano la storia del mare. Con un esperto locale VibeGuide, gli strati crociato, ottomano e antico trovano il loro posto.",
        ],
        highlights: [
          { title: "Le torri dei Cavalieri", desc: "Le torri inglese, francese, italiana, tedesca e del Serpente si ergono sul porto, costruite nel XV secolo dalle diverse lingue dell'ordine Ospitaliero." },
          { title: "Museo di Archeologia Subacquea", desc: "Uno dei migliori nel suo genere, espone antichi relitti, anfore e vetri recuperati dal fondo dell'Egeo." },
          { title: "Il relitto di Uluburun", desc: "I reperti di una nave mercantile del XIV secolo a.C. — rame, lingotti, oro e carico esotico — rivelano il commercio dell'età del bronzo in tutto il Mediterraneo orientale." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Il Castello di Bodrum sorge proprio sulla penisola tra le due baie della città, così da quasi ogni punto del centro è una breve e panoramica passeggiata lungo il porticciolo. La maggior parte dei visitatori arriva a Bodrum su strada dall'aeroporto di Milas–Bodrum, o in traghetto dalla costa circostante e dalle vicine isole greche, e il castello è impossibile da non notare nel profilo sopra il porto.",
          "L'estate sull'Egeo è calda e affollata, perciò i periodi più miti e tranquilli per salire sui bastioni sono la tarda primavera e l'inizio dell'autunno. Le mattine offrono la luce più morbida per fotografare il porticciolo, e la brezza marina rende gradevoli le terrazze aperte anche in alta stagione. Indossa scarpe robuste — il castello è costruito sulla roccia, con gradini, rampe e terreno irregolare ovunque.",
          "L'ingresso al castello e al suo Museo di Archeologia Subacquea è a pagamento, e il sito unisce una fortezza, diverse torri e sale museali in un'unica visita. Una guida locale abilitata di VibeGuide può aiutarti a dare senso a tutto — collegando le torri crociate ai carichi affondati sottostanti e aggiungendo la breve salita ai resti del Mausoleo di Alicarnasso, l'antica meraviglia le cui pietre contribuirono a costruire le mura.",
        ],
        faqs: [
          { q: "Vale la pena visitare il Castello di Bodrum?", a: "Assolutamente sì. È uno dei castelli crociati meglio conservati del Mediterraneo e insieme sede di un Museo di Archeologia Subacquea di livello mondiale, il tutto incorniciato da alcune delle più belle vedute di porto della costa egea." },
          { q: "Cosa c'è dentro il Castello di Bodrum?", a: "Il castello custodisce il Museo di Archeologia Subacquea, con antichi relitti, migliaia di anfore, vetri e i tesori del relitto di Uluburun dell'età del bronzo, accanto alle storiche torri inglese, francese, italiana, tedesca e del Serpente." },
          { q: "Il Castello di Bodrum è legato al Mausoleo di Alicarnasso?", a: "Sì. I Cavalieri Ospitalieri riutilizzarono le pietre del Mausoleo in rovina — una delle Sette Meraviglie del mondo antico — per costruire il castello. Il sito del Mausoleo si trova a una breve salita in città e si abbina alla perfezione con la visita al castello." },
          { q: "Serve una guida per il Castello di Bodrum?", a: "Puoi girarlo da solo, ma il castello intreccia storia crociata, ottomana e marittima antica che è facile lasciarsi sfuggire. Una guida locale abilitata di VibeGuide lega le torri, i relitti e il Mausoleo in un racconto chiaro." },
        ],
        ctaTitle: "Visita il Castello di Bodrum con un locale",
        ...BOD.it,
      },
      pl: {
        name: "Zamek w Bodrum",
        metaTitle: "Zamek w Bodrum i Muzeum Archeologii Podwodnej z lokalnymi przewodnikami",
        metaDescription:
          "Odkryj Zamek w Bodrum, twierdzę joannitów nad portem, z licencjonowanym lokalnym przewodnikiem. Wieże krzyżowców, Muzeum Archeologii Podwodnej i wrak z Uluburun.",
        intro: [
          "Zamek w Bodrum, Zamek Świętego Piotra, strzeże turkusowego portu miasta niczym kamienna korona. Joannici zaczęli go wznosić na początku XV wieku, wciągając bloki z ruin Mauzoleum w Halikarnasie — jednego z siedmiu cudów świata starożytnego — tak że fragmenty grobowca starożytnego króla wplecione są w mury krzyżowej twierdzy.",
          "Jego wieże wciąż noszą imiona narodów, które je zbudowały — Angielska, Francuska, Włoska, Niemiecka i Wieża Węża — a każda wznosi się nad mariną z rozległym widokiem na Morze Egejskie. Wewnątrz zamek mieści słynne Muzeum Archeologii Podwodnej, gdzie starożytne wraki, amfory i skarby z wraku z Uluburun z epoki brązu opowiadają historię morza. Z lokalnym ekspertem VibeGuide warstwy krzyżowa, osmańska i antyczna układają się w całość.",
        ],
        highlights: [
          { title: "Wieże Rycerzy", desc: "Wieża Angielska, Francuska, Włoska, Niemiecka i Wieża Węża wznoszą się nad portem, zbudowane w XV wieku przez różne języki zakonu joannitów." },
          { title: "Muzeum Archeologii Podwodnej", desc: "Jedno z najlepszych tego rodzaju, prezentuje starożytne wraki, amfory i szkło wydobyte z dna Morza Egejskiego." },
          { title: "Wrak z Uluburun", desc: "Znaleziska ze statku handlowego z XIV wieku p.n.e. — miedź, sztaby, złoto i egzotyczny ładunek — odsłaniają handel epoki brązu w całej wschodniej części Morza Śródziemnego." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Zamek w Bodrum stoi na półwyspie między dwiema zatokami miasta, więc z niemal każdego miejsca w centrum dzieli go krótki, malowniczy spacer wzdłuż mariny. Większość odwiedzających dociera do Bodrum drogą z lotniska Milas–Bodrum albo promem z okolicznego wybrzeża i pobliskich greckich wysp, a zamku nie sposób przeoczyć w panoramie nad portem.",
          "Lato nad Morzem Egejskim jest gorące i tłoczne, więc najłagodniejsze i najspokojniejsze pory na wejście na mury to późna wiosna i wczesna jesień. Poranki dają najmiększe światło do zdjęć nad mariną, a morska bryza sprawia, że otwarte tarasy są przyjemne nawet w szczycie sezonu. Załóż solidne buty — zamek stoi na skale, wszędzie są schody, podjazdy i nierówny grunt.",
          "Wstęp do zamku i jego Muzeum Archeologii Podwodnej jest biletowany, a teren łączy twierdzę, kilka wież i sale muzealne w jednej wizycie. Licencjonowany lokalny przewodnik VibeGuide pomoże to wszystko zrozumieć — łącząc wieże krzyżowców z zatopionymi ładunkami poniżej i dodając krótkie podejście do pozostałości Mauzoleum w Halikarnasie, tego antycznego cudu, którego kamienie pomogły wznieść mury.",
        ],
        faqs: [
          { q: "Czy warto zwiedzić Zamek w Bodrum?", a: "Zdecydowanie tak. To jeden z najlepiej zachowanych zamków krzyżowców nad Morzem Śródziemnym, a zarazem siedziba światowej klasy Muzeum Archeologii Podwodnej, wszystko w otoczeniu jednych z najpiękniejszych widoków na port na wybrzeżu egejskim." },
          { q: "Co znajduje się wewnątrz Zamku w Bodrum?", a: "Zamek mieści Muzeum Archeologii Podwodnej ze starożytnymi wrakami, tysiącami amfor, szkłem i skarbami z wraku z Uluburun z epoki brązu, obok historycznych wież: Angielskiej, Francuskiej, Włoskiej, Niemieckiej i Wieży Węża." },
          { q: "Czy Zamek w Bodrum jest powiązany z Mauzoleum w Halikarnasie?", a: "Tak. Joannici wykorzystali kamienie z ruin Mauzoleum — jednego z siedmiu cudów świata starożytnego — do budowy zamku. Samo stanowisko Mauzoleum leży o krótkie podejście w mieście i doskonale łączy się ze zwiedzaniem zamku." },
          { q: "Czy potrzebuję przewodnika w Zamku w Bodrum?", a: "Możesz zwiedzać samodzielnie, ale zamek splata historię krzyżowców, osmańską i antyczną historię morską, którą łatwo przeoczyć. Licencjonowany lokalny przewodnik VibeGuide wiąże wieże, wraki i Mauzoleum w jedną klarowną opowieść." },
        ],
        ctaTitle: "Zobacz Zamek w Bodrum z lokalnym przewodnikiem",
        ...BOD.pl,
      },
      nl: {
        name: "Kasteel van Bodrum",
        metaTitle: "Kasteel van Bodrum & Museum voor Onderwaterarcheologie met lokale gidsen",
        metaDescription:
          "Ontdek het Kasteel van Bodrum, de burcht van de Hospitaalridders boven de haven, met een erkende lokale gids. Kruisvaarderstorens, het Museum voor Onderwaterarcheologie en het Uluburun-wrak.",
        intro: [
          "Het Kasteel van Bodrum, het Kasteel van Sint-Pieter, waakt over de turkooizen haven van de stad als een stenen kroon. De Hospitaalridders begonnen het in het begin van de 15e eeuw op te trekken en sleepten blokken omhoog van het verwoeste Mausoleum van Halicarnassus — een van de Zeven Wereldwonderen van de oudheid — zodat fragmenten van het graf van een oude koning verweven zitten in de muren van een kruisvaardersburcht.",
          "De torens dragen nog altijd de namen van de naties die ze bouwden — de Engelse, Franse, Italiaanse, Duitse en de Slangentoren — en elk rijst boven de jachthaven op met weidse uitzichten over de Egeïsche Zee. Binnenin herbergt het kasteel het beroemde Museum voor Onderwaterarcheologie, waar oude scheepswrakken, amforen en de schatten van het Uluburun-wrak uit de bronstijd het verhaal van de zee vertellen. Met een lokale VibeGuide-expert vallen de kruisvaarders-, Ottomaanse en antieke lagen op hun plaats.",
        ],
        highlights: [
          { title: "De torens van de Ridders", desc: "De Engelse, Franse, Italiaanse, Duitse en de Slangentoren rijzen op boven de haven, in de 15e eeuw gebouwd door de verschillende talen van de Hospitaalorde." },
          { title: "Museum voor Onderwaterarcheologie", desc: "Een van de beste in zijn soort, met oude scheepswrakken, amforen en glas geborgen van de bodem van de Egeïsche Zee." },
          { title: "Het Uluburun-wrak", desc: "Vondsten van een koopvaardijschip uit de 14e eeuw v.Chr. — koper, baren, goud en exotische lading — onthullen de handel uit de bronstijd over de hele oostelijke Middellandse Zee." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Het Kasteel van Bodrum ligt pal op het schiereiland tussen de twee baaien van de stad, dus vanaf vrijwel elk punt in het centrum is het een korte, schilderachtige wandeling langs de jachthaven. De meeste bezoekers komen over de weg naar Bodrum vanaf de luchthaven Milas–Bodrum, of met de veerboot vanaf de omliggende kust en de nabije Griekse eilanden, en het kasteel is onmogelijk te missen in de skyline boven de haven.",
          "De zomer aan de Egeïsche Zee is heet en druk, dus de mildste en rustigste tijden om de wallen te beklimmen zijn het late voorjaar en het vroege najaar. De ochtenden geven het zachtste licht voor foto's boven de jachthaven, en de zeebries maakt de open terrassen aangenaam, zelfs in het hoogseizoen. Draag stevige schoenen — het kasteel is op de rots gebouwd, met overal trappen, hellingen en ongelijke grond.",
          "De toegang tot het kasteel en zijn Museum voor Onderwaterarcheologie is met kaartje, en het terrein verenigt een burcht, meerdere torens en museumzalen in één bezoek. Een erkende lokale VibeGuide-gids helpt je er wijs uit te worden — hij verbindt de kruisvaarderstorens met de gezonken ladingen eronder en voegt de korte klim toe naar de resten van het Mausoleum van Halicarnassus, dat antieke wonder waarvan de stenen mee de muren bouwden.",
        ],
        faqs: [
          { q: "Is het Kasteel van Bodrum een bezoek waard?", a: "Absoluut. Het is een van de best bewaarde kruisvaardersburchten van de Middellandse Zee en tegelijk de thuisbasis van een Museum voor Onderwaterarcheologie van wereldklasse, alles omlijst door enkele van de mooiste havenuitzichten van de Egeïsche kust." },
          { q: "Wat is er binnen het Kasteel van Bodrum te zien?", a: "Het kasteel bewaart het Museum voor Onderwaterarcheologie, met oude scheepswrakken, duizenden amforen, glas en de schatten van het Uluburun-wrak uit de bronstijd, naast de historische Engelse, Franse, Italiaanse, Duitse en Slangentoren." },
          { q: "Heeft het Kasteel van Bodrum een band met het Mausoleum van Halicarnassus?", a: "Ja. De Hospitaalridders hergebruikten stenen van het verwoeste Mausoleum — een van de Zeven Wereldwonderen van de oudheid — om het kasteel te bouwen. De site van het Mausoleum ligt op een korte klim in de stad en combineert perfect met een kasteelbezoek." },
          { q: "Heb ik een gids nodig voor het Kasteel van Bodrum?", a: "Je kunt er alleen rondlopen, maar het kasteel verweeft kruisvaarders-, Ottomaanse en antieke maritieme geschiedenis die je makkelijk mist. Een erkende lokale VibeGuide-gids bindt de torens, de wrakken en het Mausoleum tot één helder verhaal." },
        ],
        ctaTitle: "Bekijk het Kasteel van Bodrum met een local",
        ...BOD.nl,
      },
    },
  },
  {
    slug: "gobeklitepe",
    city: "Şanlıurfa",
    citySlug: "sanliurfa",
    emoji: "🗿",
    image:
      "https://images.unsplash.com/photo-1763388061716-ead75bde1d5a?q=80&w=1600",
    lat: 37.2231,
    lng: 38.9224,
    i18n: {
      en: {
        name: "Göbeklitepe",
        metaTitle: "Göbeklitepe Tours (World's Oldest Temple) with Local Guides",
        metaDescription:
          "Visit Göbeklitepe near Şanlıurfa with a licensed local guide — the world's oldest known temple, built around 9600 BC, 6,000 years before Stonehenge. A UNESCO World Heritage Site.",
        intro: [
          "Göbeklitepe is the oldest known monumental sanctuary on Earth, raised around 9600 BC — roughly 6,000 years before Stonehenge and the pyramids of Giza. On a bare hilltop near Şanlıurfa in southeastern Turkey, hunter-gatherers who had not yet invented pottery, writing or farming somehow quarried, carved and raised great rings of T-shaped limestone pillars. It is a discovery that rewrote the story of civilisation: here the temple may have come before the town.",
          "The pillars stand up to several metres tall and are carved in relief with foxes, boars, snakes, scorpions and cranes — a stone bestiary from the dawn of belief. Today a modern covered walkway shelters the enclosures and lets you look down into them without touching this fragile place. Because so much is invisible to the untrained eye, a licensed VibeGuide local guide is essential to read the symbols and explain why Göbeklitepe changed everything.",
        ],
        highlights: [
          { title: "The world's first temple", desc: "Built around 9600 BC by pre-pottery Neolithic people — about 6,000 years older than Stonehenge — and inscribed as a UNESCO World Heritage Site." },
          { title: "The carved T-pillars", desc: "Great limestone pillars arranged in rings, carved in relief with foxes, boars, snakes, scorpions and cranes from the dawn of religion." },
          { title: "Urfa Man in Şanlıurfa", desc: "Pair the site with the Şanlıurfa Archaeology Museum, home to original pillars and the 11,000-year-old Urfa Man, the oldest life-size human statue known." },
        ],
        planningHeading: "Planning your visit",
        planningParagraphs: [
          "Göbeklitepe lies about 20 km from the centre of Şanlıurfa, the nearest city and the natural base for a visit. Most travellers fly into Şanlıurfa and reach the site by car, taxi or organised tour along a short, well-signed road that ends at the visitor centre, from where a shuttle and walkway lead to the enclosures. There is little else nearby, so it is best combined with the city itself.",
          "The hilltop is open and exposed, with almost no shade, so the summer sun of southeastern Turkey can be fierce. Aim for early morning or late afternoon, and bring water, a hat and sun protection; spring and autumn are the most comfortable seasons overall. The covered walkway keeps you above the enclosures, so wear comfortable shoes for the gentle walk.",
          "Entry is ticketed, and what makes Göbeklitepe unforgettable is understanding what you are seeing — otherwise the pillars can look like plain stones on a hill. A licensed VibeGuide local guide brings the enclosures to life, decodes the animal reliefs, and links the site to the Şanlıurfa Archaeology Museum, where the original pillars and the astonishing Urfa Man complete the story.",
        ],
        faqs: [
          { q: "How old is Göbeklitepe?", a: "Göbeklitepe was built around 9600 BC, making it roughly 11,000 years old — about 6,000 years older than Stonehenge and the Egyptian pyramids, and the oldest known monumental temple in the world." },
          { q: "Why is Göbeklitepe so important?", a: "It was raised by hunter-gatherers before pottery, writing or farming, which suggests that organised religion and monumental building may have come before settled village life — overturning the old idea that farming came first. It is a UNESCO World Heritage Site." },
          { q: "How do I get to Göbeklitepe?", a: "The site is about 20 km from Şanlıurfa in southeastern Turkey. Most visitors fly into Şanlıurfa and reach Göbeklitepe by car, taxi or organised tour, with a visitor centre, shuttle and covered walkway at the site." },
          { q: "Do I need a guide for Göbeklitepe?", a: "Strongly recommended. Much of the site's meaning is invisible without context, and a licensed VibeGuide local guide explains the T-pillars, the animal carvings and why the discovery rewrote human history — then links it to the Urfa Man in the city museum." },
        ],
        ctaTitle: "See Göbeklitepe with a local",
        ...SAN.en,
      },
      de: {
        name: "Göbeklitepe",
        metaTitle: "Göbeklitepe-Touren (ältester Tempel der Welt) mit lokalen Guides",
        metaDescription:
          "Besuche Göbeklitepe bei Şanlıurfa mit einem lizenzierten lokalen Guide — der älteste bekannte Tempel der Welt, um 9600 v. Chr. erbaut, 6.000 Jahre vor Stonehenge. UNESCO-Welterbe.",
        intro: [
          "Göbeklitepe ist das älteste bekannte monumentale Heiligtum der Erde, um 9600 v. Chr. errichtet — etwa 6.000 Jahre vor Stonehenge und den Pyramiden von Gizeh. Auf einem kahlen Hügel bei Şanlıurfa im Südosten der Türkei brachen, behauten und errichteten Jäger und Sammler, die noch weder Töpferei noch Schrift noch Ackerbau kannten, große Ringe aus T-förmigen Kalksteinpfeilern. Eine Entdeckung, die die Geschichte der Zivilisation neu schrieb: Hier stand der Tempel womöglich vor der Stadt.",
          "Die Pfeiler ragen mehrere Meter hoch auf und sind mit Reliefs von Füchsen, Wildschweinen, Schlangen, Skorpionen und Kranichen verziert — ein steinernes Bestiarium aus der Morgendämmerung des Glaubens. Heute schützt ein moderner überdachter Steg die Anlagen und lässt dich in sie hineinblicken, ohne diesen fragilen Ort zu berühren. Weil dem ungeschulten Auge so vieles verborgen bleibt, ist ein lizenzierter lokaler VibeGuide-Guide unverzichtbar, um die Symbole zu deuten und zu erklären, warum Göbeklitepe alles veränderte.",
        ],
        highlights: [
          { title: "Der erste Tempel der Welt", desc: "Um 9600 v. Chr. von Menschen der vorkeramischen Jungsteinzeit erbaut — etwa 6.000 Jahre älter als Stonehenge — und als UNESCO-Welterbe eingetragen." },
          { title: "Die behauenen T-Pfeiler", desc: "Große Kalksteinpfeiler in Ringen angeordnet, mit Reliefs von Füchsen, Wildschweinen, Schlangen, Skorpionen und Kranichen aus der Frühzeit der Religion." },
          { title: "Der Urfa-Mann in Şanlıurfa", desc: "Verbinde die Stätte mit dem Archäologiemuseum von Şanlıurfa, Heimat originaler Pfeiler und des 11.000 Jahre alten Urfa-Manns, der ältesten bekannten lebensgroßen Menschenstatue." },
        ],
        planningHeading: "Deine Besuchsplanung",
        planningParagraphs: [
          "Göbeklitepe liegt etwa 20 km vom Zentrum Şanlıurfas entfernt, der nächstgelegenen Stadt und dem natürlichen Ausgangspunkt für einen Besuch. Die meisten Reisenden fliegen nach Şanlıurfa und erreichen die Stätte mit Auto, Taxi oder organisierter Tour über eine kurze, gut ausgeschilderte Straße, die am Besucherzentrum endet; von dort führen Shuttle und Steg zu den Anlagen. In der Umgebung gibt es kaum etwas anderes, daher verbindet man den Besuch am besten mit der Stadt selbst.",
          "Der Hügel liegt offen und ungeschützt, fast ohne Schatten, sodass die Sommersonne im Südosten der Türkei erbarmungslos sein kann. Ziele auf den frühen Morgen oder den späten Nachmittag und nimm Wasser, Hut und Sonnenschutz mit; Frühling und Herbst sind insgesamt die angenehmsten Jahreszeiten. Der überdachte Steg hält dich über den Anlagen, trage also bequeme Schuhe für den leichten Rundgang.",
          "Der Eintritt ist kostenpflichtig, und was Göbeklitepe unvergesslich macht, ist das Verständnis dessen, was man sieht — sonst wirken die Pfeiler wie schlichte Steine auf einem Hügel. Ein lizenzierter lokaler VibeGuide-Guide erweckt die Anlagen zum Leben, entschlüsselt die Tierreliefs und verknüpft die Stätte mit dem Archäologiemuseum von Şanlıurfa, wo die originalen Pfeiler und der erstaunliche Urfa-Mann die Geschichte vollenden.",
        ],
        faqs: [
          { q: "Wie alt ist Göbeklitepe?", a: "Göbeklitepe wurde um 9600 v. Chr. erbaut und ist damit rund 11.000 Jahre alt — etwa 6.000 Jahre älter als Stonehenge und die ägyptischen Pyramiden und der älteste bekannte monumentale Tempel der Welt." },
          { q: "Warum ist Göbeklitepe so bedeutend?", a: "Es wurde von Jägern und Sammlern vor Töpferei, Schrift und Ackerbau errichtet, was nahelegt, dass organisierte Religion und monumentales Bauen dem sesshaften Dorfleben vorausgingen — und die alte Vorstellung umstürzt, der Ackerbau sei zuerst gekommen. Es ist UNESCO-Welterbe." },
          { q: "Wie komme ich nach Göbeklitepe?", a: "Die Stätte liegt etwa 20 km von Şanlıurfa im Südosten der Türkei. Die meisten Besucher fliegen nach Şanlıurfa und erreichen Göbeklitepe mit Auto, Taxi oder organisierter Tour; vor Ort gibt es ein Besucherzentrum, einen Shuttle und einen überdachten Steg." },
          { q: "Brauche ich einen Guide für Göbeklitepe?", a: "Dringend zu empfehlen. Ein Großteil der Bedeutung bleibt ohne Kontext unsichtbar, und ein lizenzierter lokaler VibeGuide-Guide erklärt die T-Pfeiler, die Tierreliefs und warum die Entdeckung die Menschheitsgeschichte neu schrieb — und verknüpft sie mit dem Urfa-Mann im Stadtmuseum." },
        ],
        ctaTitle: "Erlebe Göbeklitepe mit einem Local",
        ...SAN.de,
      },
      ru: {
        name: "Гёбекли-Тепе",
        metaTitle: "Экскурсии в Гёбекли-Тепе (древнейший храм мира) с местными гидами",
        metaDescription:
          "Посетите Гёбекли-Тепе близ Шанлыурфы с лицензированным местным гидом — древнейший известный храм мира, построенный около 9600 г. до н. э., за 6000 лет до Стоунхенджа. Объект ЮНЕСКО.",
        intro: [
          "Гёбекли-Тепе — древнейшее известное монументальное святилище на Земле, возведённое около 9600 года до н. э., примерно за 6000 лет до Стоунхенджа и пирамид Гизы. На голом холме близ Шанлыурфы на юго-востоке Турции охотники-собиратели, ещё не знавшие ни керамики, ни письма, ни земледелия, каким-то образом вырубили, вырезали и подняли огромные круги из T-образных известняковых столбов. Это открытие переписало историю цивилизации: здесь храм, возможно, появился раньше поселения.",
          "Столбы достигают нескольких метров в высоту и покрыты рельефами лисиц, кабанов, змей, скорпионов и журавлей — каменный бестиарий на заре веры. Сегодня современный крытый настил укрывает ограды и позволяет заглянуть в них, не касаясь этого хрупкого места. Поскольку столь многое незаметно неопытному глазу, лицензированный местный гид VibeGuide необходим, чтобы прочесть символы и объяснить, почему Гёбекли-Тепе изменил всё.",
        ],
        highlights: [
          { title: "Первый храм в мире", desc: "Возведён около 9600 г. до н. э. людьми докерамического неолита — примерно на 6000 лет старше Стоунхенджа — и внесён в список Всемирного наследия ЮНЕСКО." },
          { title: "Резные T-образные столбы", desc: "Огромные известняковые столбы, расставленные кругами, с рельефами лисиц, кабанов, змей, скорпионов и журавлей на заре религии." },
          { title: "Человек из Урфы в Шанлыурфе", desc: "Совместите объект с Археологическим музеем Шанлыурфы, где хранятся оригинальные столбы и 11 000-летний Человек из Урфы — древнейшая известная статуя человека в натуральную величину." },
        ],
        planningHeading: "Планирование визита",
        planningParagraphs: [
          "Гёбекли-Тепе находится примерно в 20 км от центра Шанлыурфы — ближайшего города и естественной базы для поездки. Большинство путешественников прилетают в Шанлыурфу и добираются до объекта на автомобиле, такси или в составе организованного тура по короткой, хорошо обозначенной дороге, ведущей к центру для посетителей, откуда шаттл и настил ведут к оградам. Поблизости почти ничего больше нет, поэтому лучше сочетать визит с самим городом.",
          "Вершина холма открыта и незащищена, тени почти нет, так что летнее солнце юго-востока Турции бывает беспощадным. Планируйте раннее утро или поздний день и берите воду, головной убор и защиту от солнца; весна и осень в целом самые комфортные сезоны. Крытый настил держит вас над оградами, так что наденьте удобную обувь для лёгкой прогулки.",
          "Вход платный, а незабываемым Гёбекли-Тепе делает понимание того, что вы видите, — иначе столбы могут выглядеть как обычные камни на холме. Лицензированный местный гид VibeGuide оживляет ограды, расшифровывает рельефы животных и связывает объект с Археологическим музеем Шанлыурфы, где оригинальные столбы и поразительный Человек из Урфы завершают рассказ.",
        ],
        faqs: [
          { q: "Сколько лет Гёбекли-Тепе?", a: "Гёбекли-Тепе построен около 9600 года до н. э., то есть ему примерно 11 000 лет — почти на 6000 лет старше Стоунхенджа и египетских пирамид, и это древнейший известный монументальный храм в мире." },
          { q: "Почему Гёбекли-Тепе так важен?", a: "Его возвели охотники-собиратели до появления керамики, письма и земледелия, что позволяет предположить, что организованная религия и монументальное строительство могли предшествовать оседлой деревенской жизни — опровергая старую идею, что земледелие было первым. Это объект Всемирного наследия ЮНЕСКО." },
          { q: "Как добраться до Гёбекли-Тепе?", a: "Объект находится примерно в 20 км от Шанлыурфы на юго-востоке Турции. Большинство гостей прилетают в Шанлыурфу и добираются до Гёбекли-Тепе на автомобиле, такси или с организованным туром; на месте есть центр для посетителей, шаттл и крытый настил." },
          { q: "Нужен ли гид для Гёбекли-Тепе?", a: "Крайне рекомендуется. Многое в смысле объекта незаметно без контекста, а лицензированный местный гид VibeGuide объясняет T-образные столбы, изображения животных и то, почему открытие переписало историю человечества, а затем связывает его с Человеком из Урфы в городском музее." },
        ],
        ctaTitle: "Увидеть Гёбекли-Тепе с местным гидом",
        ...SAN.ru,
      },
      ar: {
        name: "غوبكلي تبه",
        metaTitle: "جولات غوبكلي تبه (أقدم معبد في العالم) مع مرشدين محليين",
        metaDescription:
          "زر غوبكلي تبه قرب شانلي أورفا مع مرشد محلي مرخّص — أقدم معبد معروف في العالم، شُيّد نحو 9600 قبل الميلاد، قبل ستونهنج بـ6000 عام. موقع تراث عالمي لليونسكو.",
        intro: [
          "غوبكلي تبه هو أقدم مَعبد أثري معروف على وجه الأرض، شُيّد نحو عام 9600 قبل الميلاد — أي قبل ستونهنج وأهرامات الجيزة بنحو 6000 عام. فوق تلة جرداء قرب شانلي أورفا في جنوب شرق تركيا، قام صيادون جامعون لم يعرفوا بعد الفخار ولا الكتابة ولا الزراعة، بطريقة ما، بقطع ونحت ورفع حلقات ضخمة من أعمدة حجرية جيرية على شكل حرف T. إنه اكتشاف أعاد كتابة قصة الحضارة: فهنا ربما جاء المعبد قبل المدينة.",
          "ترتفع الأعمدة عدة أمتار وقد نُقشت عليها بارزةً صور ثعالب وخنازير برية وأفاعٍ وعقارب وطيور كركي — سِفر حجري للكائنات من فجر الإيمان. واليوم يحمي ممشى مسقوف حديث المحيطات ويتيح لك النظر إليها دون لمس هذا المكان الهش. ولأن الكثير خفيّ عن العين غير المدربة، فإن مرشد VibeGuide المحلي المرخّص لا غنى عنه لقراءة الرموز وشرح لماذا غيّر غوبكلي تبه كل شيء.",
        ],
        highlights: [
          { title: "أول معبد في العالم", desc: "شُيّد نحو 9600 قبل الميلاد على يد إنسان العصر الحجري الحديث قبل اختراع الفخار — أي أقدم من ستونهنج بنحو 6000 عام — ومُدرج على قائمة التراث العالمي لليونسكو." },
          { title: "أعمدة T المنقوشة", desc: "أعمدة حجرية جيرية ضخمة مرتبة في حلقات، منقوش عليها بارزةً ثعالب وخنازير وأفاعٍ وعقارب وطيور كركي من فجر الأديان." },
          { title: "رجل أورفا في شانلي أورفا", desc: "اقرن الموقع بمتحف شانلي أورفا للآثار، الذي يضم الأعمدة الأصلية ورجل أورفا الذي يعود عمره إلى 11000 عام، أقدم تمثال بشري بالحجم الطبيعي معروف." },
        ],
        planningHeading: "التخطيط لزيارتك",
        planningParagraphs: [
          "يقع غوبكلي تبه على نحو 20 كم من مركز شانلي أورفا، أقرب مدينة وقاعدة الانطلاق الطبيعية للزيارة. يصل معظم المسافرين جوًا إلى شانلي أورفا ثم يبلغون الموقع بالسيارة أو التاكسي أو ضمن جولة منظّمة عبر طريق قصير جيد الإشارات ينتهي عند مركز الزوار، ومنه تقود حافلة نقل وممشى إلى المحيطات. لا يوجد الكثير غير ذلك في الجوار، فالأفضل الجمع بينه وبين المدينة نفسها.",
          "قمة التل مكشوفة وبلا ظل تقريبًا، لذا قد تكون شمس الصيف في جنوب شرق تركيا حارقة. استهدف الصباح الباكر أو ما بعد الظهيرة، واصطحب الماء وقبعة وواقيًا من الشمس؛ والربيع والخريف هما الأكثر راحةً على العموم. يبقيك الممشى المسقوف فوق المحيطات، فانتعل حذاءً مريحًا للسير الخفيف.",
          "الدخول مقابل تذكرة، وما يجعل غوبكلي تبه لا يُنسى هو فهم ما تراه — وإلا فقد تبدو الأعمدة مجرد حجارة على تلة. يبعث مرشد VibeGuide المحلي المرخّص الحياة في المحيطات، ويفك رموز نقوش الحيوانات، ويربط الموقع بمتحف شانلي أورفا للآثار، حيث تُكمل الأعمدة الأصلية ورجل أورفا المذهل القصة." ,
        ],
        faqs: [
          { q: "كم يبلغ عمر غوبكلي تبه؟", a: "شُيّد غوبكلي تبه نحو عام 9600 قبل الميلاد، أي إن عمره نحو 11000 عام — أقدم من ستونهنج والأهرامات المصرية بنحو 6000 عام، وهو أقدم معبد أثري معروف في العالم." },
          { q: "لماذا يُعد غوبكلي تبه بهذه الأهمية؟", a: "شيّده صيادون جامعون قبل الفخار والكتابة والزراعة، ما يوحي بأن الدين المنظّم والبناء الضخم ربما سبقا حياة القرى المستقرة — على عكس الفكرة القديمة بأن الزراعة جاءت أولًا. وهو موقع تراث عالمي لليونسكو." },
          { q: "كيف أصل إلى غوبكلي تبه؟", a: "يقع الموقع على نحو 20 كم من شانلي أورفا في جنوب شرق تركيا. يصل معظم الزوار جوًا إلى شانلي أورفا ثم يبلغون غوبكلي تبه بالسيارة أو التاكسي أو ضمن جولة منظّمة، ويوجد في الموقع مركز زوار وحافلة نقل وممشى مسقوف." },
          { q: "هل أحتاج إلى مرشد لزيارة غوبكلي تبه؟", a: "يُنصح بذلك بشدة. الكثير من معنى الموقع خفيّ دون سياق، ويشرح مرشد VibeGuide المحلي المرخّص أعمدة T ونقوش الحيوانات ولماذا أعاد الاكتشاف كتابة تاريخ البشرية — ثم يربطه برجل أورفا في متحف المدينة." },
        ],
        ctaTitle: "زر غوبكلي تبه مع مرشد محلي",
        ...SAN.ar,
      },
      es: {
        name: "Göbeklitepe",
        metaTitle: "Tours a Göbeklitepe (el templo más antiguo del mundo) con guías locales",
        metaDescription:
          "Visita Göbeklitepe cerca de Şanlıurfa con un guía local titulado — el templo conocido más antiguo del mundo, construido hacia el 9600 a. C., 6.000 años antes de Stonehenge. Patrimonio de la Humanidad de la UNESCO.",
        intro: [
          "Göbeklitepe es el santuario monumental más antiguo que se conoce en la Tierra, levantado hacia el 9600 a. C. — unos 6.000 años antes que Stonehenge y las pirámides de Guiza. En una colina desnuda cerca de Şanlıurfa, en el sureste de Turquía, cazadores-recolectores que aún no habían inventado la cerámica, la escritura ni la agricultura extrajeron, tallaron y erigieron de algún modo grandes círculos de pilares de piedra caliza en forma de T. Es un hallazgo que reescribió la historia de la civilización: aquí el templo pudo llegar antes que el pueblo.",
          "Los pilares se alzan varios metros y están tallados en relieve con zorros, jabalíes, serpientes, escorpiones y grullas — un bestiario de piedra del amanecer de la fe. Hoy una moderna pasarela cubierta protege los recintos y permite asomarse a ellos sin tocar este lugar frágil. Como tanto resulta invisible para el ojo no entrenado, un guía local titulado de VibeGuide es esencial para leer los símbolos y explicar por qué Göbeklitepe lo cambió todo.",
        ],
        highlights: [
          { title: "El primer templo del mundo", desc: "Construido hacia el 9600 a. C. por gentes del Neolítico precerámico — unos 6.000 años más antiguo que Stonehenge — e inscrito como Patrimonio de la Humanidad de la UNESCO." },
          { title: "Los pilares en T tallados", desc: "Grandes pilares de piedra caliza dispuestos en círculos, tallados en relieve con zorros, jabalíes, serpientes, escorpiones y grullas del amanecer de la religión." },
          { title: "El Hombre de Urfa en Şanlıurfa", desc: "Combina el sitio con el Museo Arqueológico de Şanlıurfa, hogar de pilares originales y del Hombre de Urfa de 11.000 años, la estatua humana de tamaño natural más antigua que se conoce." },
        ],
        planningHeading: "Planifica tu visita",
        planningParagraphs: [
          "Göbeklitepe se encuentra a unos 20 km del centro de Şanlıurfa, la ciudad más cercana y la base natural para la visita. La mayoría de los viajeros vuela a Şanlıurfa y llega al sitio en coche, taxi o tour organizado por una carretera corta y bien señalizada que termina en el centro de visitantes, desde donde una lanzadera y una pasarela conducen a los recintos. Hay poco más en los alrededores, así que conviene combinarlo con la propia ciudad.",
          "La cima de la colina es abierta y expuesta, casi sin sombra, así que el sol de verano del sureste de Turquía puede ser feroz. Apunta a primera hora de la mañana o al final de la tarde, y lleva agua, sombrero y protección solar; la primavera y el otoño son, en conjunto, las estaciones más cómodas. La pasarela cubierta te mantiene por encima de los recintos, así que usa calzado cómodo para el paseo suave.",
          "La entrada requiere ticket, y lo que hace inolvidable Göbeklitepe es entender lo que estás viendo — de lo contrario, los pilares pueden parecer simples piedras en una colina. Un guía local titulado de VibeGuide da vida a los recintos, descifra los relieves de animales y enlaza el sitio con el Museo Arqueológico de Şanlıurfa, donde los pilares originales y el asombroso Hombre de Urfa completan la historia.",
        ],
        faqs: [
          { q: "¿Qué antigüedad tiene Göbeklitepe?", a: "Göbeklitepe se construyó hacia el 9600 a. C., por lo que tiene unos 11.000 años — cerca de 6.000 años más que Stonehenge y las pirámides egipcias, y es el templo monumental más antiguo que se conoce en el mundo." },
          { q: "¿Por qué es tan importante Göbeklitepe?", a: "Lo levantaron cazadores-recolectores antes de la cerámica, la escritura o la agricultura, lo que sugiere que la religión organizada y la construcción monumental pudieron preceder a la vida sedentaria en aldeas — dando la vuelta a la vieja idea de que la agricultura fue lo primero. Es Patrimonio de la Humanidad de la UNESCO." },
          { q: "¿Cómo llego a Göbeklitepe?", a: "El sitio está a unos 20 km de Şanlıurfa, en el sureste de Turquía. La mayoría de los visitantes vuela a Şanlıurfa y llega a Göbeklitepe en coche, taxi o tour organizado, con centro de visitantes, lanzadera y pasarela cubierta en el lugar." },
          { q: "¿Necesito un guía para Göbeklitepe?", a: "Muy recomendable. Gran parte del significado del sitio es invisible sin contexto, y un guía local titulado de VibeGuide explica los pilares en T, los grabados de animales y por qué el hallazgo reescribió la historia humana — para luego enlazarlo con el Hombre de Urfa en el museo de la ciudad." },
        ],
        ctaTitle: "Visita Göbeklitepe con un local",
        ...SAN.es,
      },
      fr: {
        name: "Göbeklitepe",
        metaTitle: "Visites de Göbeklitepe (plus ancien temple du monde) avec guides locaux",
        metaDescription:
          "Visitez Göbeklitepe près de Şanlıurfa avec un guide local agréé — le plus ancien temple connu au monde, bâti vers 9600 av. J.-C., 6 000 ans avant Stonehenge. Site du patrimoine mondial de l'UNESCO.",
        intro: [
          "Göbeklitepe est le plus ancien sanctuaire monumental connu sur Terre, élevé vers 9600 av. J.-C. — environ 6 000 ans avant Stonehenge et les pyramides de Gizeh. Sur une colline nue près de Şanlıurfa, dans le sud-est de la Turquie, des chasseurs-cueilleurs qui n'avaient encore inventé ni la poterie, ni l'écriture, ni l'agriculture ont pourtant extrait, sculpté et dressé de grands cercles de piliers de calcaire en forme de T. Une découverte qui a réécrit l'histoire de la civilisation : ici, le temple a peut-être précédé la ville.",
          "Les piliers s'élèvent sur plusieurs mètres et sont sculptés en relief de renards, sangliers, serpents, scorpions et grues — un bestiaire de pierre à l'aube de la croyance. Aujourd'hui, une passerelle couverte moderne abrite les enceintes et permet de les contempler d'en haut sans toucher ce lieu fragile. Comme tant de choses échappent à l'œil non averti, un guide local agréé VibeGuide est essentiel pour lire les symboles et expliquer pourquoi Göbeklitepe a tout changé.",
        ],
        highlights: [
          { title: "Le premier temple du monde", desc: "Bâti vers 9600 av. J.-C. par des peuples du Néolithique précéramique — environ 6 000 ans plus ancien que Stonehenge — et inscrit au patrimoine mondial de l'UNESCO." },
          { title: "Les piliers en T sculptés", desc: "De grands piliers de calcaire disposés en cercles, sculptés en relief de renards, sangliers, serpents, scorpions et grues à l'aube de la religion." },
          { title: "L'Homme d'Urfa à Şanlıurfa", desc: "Associez le site au Musée archéologique de Şanlıurfa, qui abrite des piliers originaux et l'Homme d'Urfa vieux de 11 000 ans, la plus ancienne statue humaine grandeur nature connue." },
        ],
        planningHeading: "Préparer votre visite",
        planningParagraphs: [
          "Göbeklitepe se trouve à environ 20 km du centre de Şanlıurfa, la ville la plus proche et la base naturelle d'une visite. La plupart des voyageurs prennent l'avion jusqu'à Şanlıurfa et rejoignent le site en voiture, en taxi ou en visite organisée, par une route courte et bien signalée qui se termine au centre des visiteurs, d'où une navette et une passerelle mènent aux enceintes. Il y a peu d'autre chose à proximité, mieux vaut donc l'associer à la ville elle-même.",
          "Le sommet de la colline est ouvert et exposé, presque sans ombre, si bien que le soleil d'été du sud-est de la Turquie peut être brûlant. Visez tôt le matin ou en fin d'après-midi, et emportez de l'eau, un chapeau et une protection solaire ; le printemps et l'automne sont globalement les saisons les plus agréables. La passerelle couverte vous maintient au-dessus des enceintes, portez donc de bonnes chaussures pour cette promenade facile.",
          "L'entrée est payante, et ce qui rend Göbeklitepe inoubliable, c'est de comprendre ce que l'on voit — sinon les piliers peuvent ressembler à de simples pierres sur une colline. Un guide local agréé VibeGuide fait vivre les enceintes, décrypte les reliefs animaliers et relie le site au Musée archéologique de Şanlıurfa, où les piliers d'origine et l'étonnant Homme d'Urfa complètent l'histoire.",
        ],
        faqs: [
          { q: "Quel âge a Göbeklitepe ?", a: "Göbeklitepe a été bâti vers 9600 av. J.-C., ce qui lui donne environ 11 000 ans — quelque 6 000 ans de plus que Stonehenge et les pyramides d'Égypte, et c'est le plus ancien temple monumental connu au monde." },
          { q: "Pourquoi Göbeklitepe est-il si important ?", a: "Il a été élevé par des chasseurs-cueilleurs avant la poterie, l'écriture ou l'agriculture, ce qui suggère que la religion organisée et la construction monumentale ont pu précéder la vie villageoise sédentaire — renversant la vieille idée selon laquelle l'agriculture serait venue en premier. C'est un site du patrimoine mondial de l'UNESCO." },
          { q: "Comment se rendre à Göbeklitepe ?", a: "Le site est à environ 20 km de Şanlıurfa, dans le sud-est de la Turquie. La plupart des visiteurs prennent l'avion jusqu'à Şanlıurfa et rejoignent Göbeklitepe en voiture, en taxi ou en visite organisée ; on trouve sur place un centre des visiteurs, une navette et une passerelle couverte." },
          { q: "Ai-je besoin d'un guide pour Göbeklitepe ?", a: "Vivement recommandé. Une grande part du sens du site est invisible sans contexte, et un guide local agréé VibeGuide explique les piliers en T, les gravures animales et pourquoi la découverte a réécrit l'histoire humaine — avant de la relier à l'Homme d'Urfa au musée de la ville." },
        ],
        ctaTitle: "Visitez Göbeklitepe avec un local",
        ...SAN.fr,
      },
      el: {
        name: "Γκιομπεκλί Τεπέ",
        metaTitle: "Ξεναγήσεις στο Γκιομπεκλί Τεπέ (ο αρχαιότερος ναός του κόσμου) με ντόπιους ξεναγούς",
        metaDescription:
          "Επισκέψου το Γκιομπεκλί Τεπέ κοντά στη Σανλιούρφα με πιστοποιημένο ντόπιο ξεναγό — τον αρχαιότερο γνωστό ναό του κόσμου, χτισμένο γύρω στο 9600 π.Χ., 6.000 χρόνια πριν από το Στόουνχεντζ. Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO.",
        intro: [
          "Το Γκιομπεκλί Τεπέ είναι το αρχαιότερο γνωστό μνημειακό ιερό στη Γη, υψωμένο γύρω στο 9600 π.Χ. — περίπου 6.000 χρόνια πριν από το Στόουνχεντζ και τις πυραμίδες της Γκίζας. Πάνω σε έναν γυμνό λόφο κοντά στη Σανλιούρφα, στη νοτιοανατολική Τουρκία, κυνηγοί-τροφοσυλλέκτες που δεν είχαν ακόμη εφεύρει την κεραμική, τη γραφή ή τη γεωργία, κατάφεραν να λατομήσουν, να σκαλίσουν και να ανεγείρουν μεγάλους κύκλους από ασβεστολιθικούς πυλώνες σχήματος Τ. Μια ανακάλυψη που ξαναέγραψε την ιστορία του πολιτισμού: εδώ ο ναός ίσως προηγήθηκε της πόλης.",
          "Οι πυλώνες υψώνονται αρκετά μέτρα και είναι σκαλισμένοι ανάγλυφα με αλεπούδες, αγριογούρουνα, φίδια, σκορπιούς και γερανούς — ένα πέτρινο ζωολόγιο από την αυγή της πίστης. Σήμερα ένας σύγχρονος στεγασμένος διάδρομος προστατεύει τους περιβόλους και σου επιτρέπει να τους κοιτάξεις από ψηλά χωρίς να αγγίξεις αυτόν τον εύθραυστο τόπο. Επειδή τόσα πολλά είναι αόρατα στο ανεκπαίδευτο μάτι, ένας πιστοποιημένος ντόπιος ξεναγός της VibeGuide είναι απαραίτητος για να διαβάσει τα σύμβολα και να εξηγήσει γιατί το Γκιομπεκλί Τεπέ τα άλλαξε όλα.",
        ],
        highlights: [
          { title: "Ο πρώτος ναός του κόσμου", desc: "Χτισμένος γύρω στο 9600 π.Χ. από ανθρώπους της Νεολιθικής προκεραμικής εποχής — περίπου 6.000 χρόνια αρχαιότερος από το Στόουνχεντζ — και εγγεγραμμένος ως Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO." },
          { title: "Οι σκαλισμένοι πυλώνες Τ", desc: "Μεγάλοι ασβεστολιθικοί πυλώνες διατεταγμένοι σε κύκλους, σκαλισμένοι ανάγλυφα με αλεπούδες, αγριογούρουνα, φίδια, σκορπιούς και γερανούς από την αυγή της θρησκείας." },
          { title: "Ο Άνθρωπος της Ούρφα στη Σανλιούρφα", desc: "Συνδύασε τον χώρο με το Αρχαιολογικό Μουσείο της Σανλιούρφα, όπου φυλάσσονται αυθεντικοί πυλώνες και ο Άνθρωπος της Ούρφα ηλικίας 11.000 ετών, το αρχαιότερο γνωστό ανθρώπινο άγαλμα σε φυσικό μέγεθος." },
        ],
        planningHeading: "Οργανώστε την επίσκεψή σας",
        planningParagraphs: [
          "Το Γκιομπεκλί Τεπέ βρίσκεται περίπου 20 χλμ. από το κέντρο της Σανλιούρφα, της πλησιέστερης πόλης και της φυσικής βάσης για μια επίσκεψη. Οι περισσότεροι ταξιδιώτες πετούν ως τη Σανλιούρφα και φτάνουν στον χώρο με αυτοκίνητο, ταξί ή οργανωμένη ξενάγηση μέσω ενός σύντομου, καλά σηματοδοτημένου δρόμου που καταλήγει στο κέντρο επισκεπτών, από όπου ένα λεωφορείο μεταφοράς και ένας διάδρομος οδηγούν στους περιβόλους. Δεν υπάρχουν πολλά άλλα εκεί κοντά, οπότε είναι καλύτερο να συνδυαστεί με την ίδια την πόλη.",
          "Η κορυφή του λόφου είναι ανοιχτή και εκτεθειμένη, σχεδόν χωρίς σκιά, οπότε ο καλοκαιρινός ήλιος της νοτιοανατολικής Τουρκίας μπορεί να είναι αμείλικτος. Στοχεύστε νωρίς το πρωί ή αργά το απόγευμα και πάρτε μαζί νερό, καπέλο και αντηλιακή προστασία· η άνοιξη και το φθινόπωρο είναι συνολικά οι πιο άνετες εποχές. Ο στεγασμένος διάδρομος σας κρατά πάνω από τους περιβόλους, φορέστε λοιπόν άνετα παπούτσια για το ήπιο περπάτημα.",
          "Η είσοδος απαιτεί εισιτήριο, και αυτό που κάνει το Γκιομπεκλί Τεπέ αξέχαστο είναι να καταλάβεις τι βλέπεις — αλλιώς οι πυλώνες μπορεί να μοιάζουν με απλές πέτρες σε έναν λόφο. Ένας αδειούχος ντόπιος ξεναγός της VibeGuide ζωντανεύει τους περιβόλους, αποκρυπτογραφεί τα ανάγλυφα των ζώων και συνδέει τον χώρο με το Αρχαιολογικό Μουσείο της Σανλιούρφα, όπου οι αυθεντικοί πυλώνες και ο εκπληκτικός Άνθρωπος της Ούρφα ολοκληρώνουν την ιστορία.",
        ],
        faqs: [
          { q: "Πόσο παλιό είναι το Γκιομπεκλί Τεπέ;", a: "Το Γκιομπεκλί Τεπέ χτίστηκε γύρω στο 9600 π.Χ., επομένως είναι περίπου 11.000 ετών — κάπου 6.000 χρόνια αρχαιότερο από το Στόουνχεντζ και τις αιγυπτιακές πυραμίδες, και ο αρχαιότερος γνωστός μνημειακός ναός στον κόσμο." },
          { q: "Γιατί είναι τόσο σημαντικό το Γκιομπεκλί Τεπέ;", a: "Υψώθηκε από κυνηγούς-τροφοσυλλέκτες πριν από την κεραμική, τη γραφή ή τη γεωργία, κάτι που υποδηλώνει ότι η οργανωμένη θρησκεία και η μνημειακή δόμηση ίσως προηγήθηκαν της μόνιμης ζωής στα χωριά — ανατρέποντας την παλιά ιδέα ότι η γεωργία ήρθε πρώτη. Είναι Μνημείο Παγκόσμιας Κληρονομιάς της UNESCO." },
          { q: "Πώς φτάνω στο Γκιομπεκλί Τεπέ;", a: "Ο χώρος βρίσκεται περίπου 20 χλμ. από τη Σανλιούρφα, στη νοτιοανατολική Τουρκία. Οι περισσότεροι επισκέπτες πετούν ως τη Σανλιούρφα και φτάνουν στο Γκιομπεκλί Τεπέ με αυτοκίνητο, ταξί ή οργανωμένη ξενάγηση, με κέντρο επισκεπτών, λεωφορείο μεταφοράς και στεγασμένο διάδρομο στον χώρο." },
          { q: "Χρειάζομαι ξεναγό για το Γκιομπεκλί Τεπέ;", a: "Συνιστάται ανεπιφύλακτα. Μεγάλο μέρος του νοήματος του χώρου είναι αόρατο χωρίς πλαίσιο, και ένας αδειούχος ντόπιος ξεναγός της VibeGuide εξηγεί τους πυλώνες Τ, τα σκαλίσματα των ζώων και γιατί η ανακάλυψη ξαναέγραψε την ανθρώπινη ιστορία — και έπειτα το συνδέει με τον Άνθρωπο της Ούρφα στο μουσείο της πόλης." },
        ],
        ctaTitle: "Δες το Γκιομπεκλί Τεπέ με έναν ντόπιο",
        ...SAN.el,
      },
      tr: {
        name: "Göbeklitepe",
        metaTitle: "Göbeklitepe Turları (Dünyanın En Eski Tapınağı) | Yerel Rehberler",
        metaDescription:
          "Şanlıurfa yakınındaki Göbeklitepe'yi lisanslı bir yerel rehberle gez — dünyanın bilinen en eski tapınağı, MÖ 9600 civarında inşa edildi, Stonehenge'den 6.000 yıl önce. UNESCO Dünya Mirası.",
        intro: [
          "Göbeklitepe, yeryüzünün bilinen en eski anıtsal tapınağıdır; MÖ 9600 civarında yükseltilmiştir — Stonehenge ve Giza piramitlerinden yaklaşık 6.000 yıl önce. Güneydoğu Türkiye'de, Şanlıurfa yakınlarındaki çıplak bir tepede, henüz çömlekçiliği, yazıyı ve tarımı bilmeyen avcı-toplayıcılar, bir şekilde T biçimli kireç taşı dikilitaşlardan büyük halkalar oydu, işledi ve dikti. Bu, uygarlık tarihini yeniden yazan bir keşiftir: burada tapınak, kentten önce gelmiş olabilir.",
          "Dikilitaşlar birkaç metre yüksekliğe ulaşır ve üzerlerinde tilkiler, yaban domuzları, yılanlar, akrepler ve turnalar kabartma olarak işlenmiştir — inancın şafağından taştan bir hayvanlar kitabı. Bugün modern bir üstü kapalı gezi yolu çevrimleri korur ve bu kırılgan yere dokunmadan içlerine bakmanı sağlar. Eğitimsiz göze pek çok şey görünmez olduğundan, sembolleri okumak ve Göbeklitepe'nin neden her şeyi değiştirdiğini anlatmak için lisanslı bir VibeGuide yerel rehberi vazgeçilmezdir.",
        ],
        highlights: [
          { title: "Dünyanın ilk tapınağı", desc: "MÖ 9600 civarında çanak çömlek öncesi Neolitik insanlarca inşa edildi — Stonehenge'den yaklaşık 6.000 yıl daha eski — ve UNESCO Dünya Mirası Listesi'ne alındı." },
          { title: "İşlenmiş T dikilitaşlar", desc: "Halkalar hâlinde dizilmiş büyük kireç taşı dikilitaşlar; dinin şafağından tilkiler, yaban domuzları, yılanlar, akrepler ve turnalarla kabartma olarak bezenmiş." },
          { title: "Şanlıurfa'da Urfa Adamı", desc: "Alanı, özgün dikilitaşların ve bilinen en eski gerçek boyutlu insan heykeli olan 11.000 yıllık Urfa Adamı'nın bulunduğu Şanlıurfa Arkeoloji Müzesi ile birleştir." },
        ],
        planningHeading: "Ziyaretinizi planlayın",
        planningParagraphs: [
          "Göbeklitepe, en yakın kent ve ziyaret için doğal üs olan Şanlıurfa merkezinden yaklaşık 20 km uzaktadır. Çoğu gezgin uçakla Şanlıurfa'ya gelir ve alana; ziyaretçi merkezinde son bulan kısa, işaretleri iyi bir yolla otomobil, taksi ya da organize turla ulaşır; oradan bir servis ve gezi yolu çevrimlere götürür. Yakında başka pek bir şey olmadığından, en iyisi kentin kendisiyle birlikte gezmektir.",
          "Tepe açık ve korunaksızdır, neredeyse hiç gölge yoktur; bu yüzden güneydoğu Türkiye'nin yaz güneşi sert olabilir. Sabahın erken saatlerini ya da öğleden sonranın geç saatlerini hedefleyin; yanınıza su, şapka ve güneş koruması alın; genel olarak en konforlu mevsimler ilkbahar ve sonbahardır. Üstü kapalı gezi yolu sizi çevrimlerin üzerinde tutar, bu yüzden hafif yürüyüş için rahat ayakkabı giyin.",
          "Giriş biletlidir ve Göbeklitepe'yi unutulmaz kılan şey, gördüğünüzü anlamaktır — yoksa dikilitaşlar bir tepedeki sıradan taşlar gibi görünebilir. Lisanslı bir VibeGuide yerel rehberi çevrimleri canlandırır, hayvan kabartmalarını çözer ve alanı; özgün dikilitaşların ve şaşırtıcı Urfa Adamı'nın hikâyeyi tamamladığı Şanlıurfa Arkeoloji Müzesi ile ilişkilendirir.",
        ],
        faqs: [
          { q: "Göbeklitepe kaç yaşında?", a: "Göbeklitepe MÖ 9600 civarında inşa edildi; yani yaklaşık 11.000 yaşında — Stonehenge ve Mısır piramitlerinden yaklaşık 6.000 yıl daha eski ve dünyanın bilinen en eski anıtsal tapınağı." },
          { q: "Göbeklitepe neden bu kadar önemli?", a: "Çömlekçilik, yazı ve tarımdan önce avcı-toplayıcılarca yükseltildi; bu da örgütlü dinin ve anıtsal yapının yerleşik köy yaşamından önce gelmiş olabileceğini düşündürür — tarımın önce geldiği eski görüşü tersine çevirir. UNESCO Dünya Mirası alanıdır." },
          { q: "Göbeklitepe'ye nasıl giderim?", a: "Alan, güneydoğu Türkiye'de Şanlıurfa'ya yaklaşık 20 km uzaktadır. Çoğu ziyaretçi uçakla Şanlıurfa'ya gelir ve Göbeklitepe'ye otomobil, taksi veya organize turla ulaşır; alanda ziyaretçi merkezi, servis ve üstü kapalı gezi yolu vardır." },
          { q: "Göbeklitepe için rehbere ihtiyacım var mı?", a: "Kesinlikle önerilir. Alanın anlamının çoğu bağlam olmadan görünmez; lisanslı bir VibeGuide yerel rehberi T dikilitaşları, hayvan işlemelerini ve keşfin insanlık tarihini neden yeniden yazdığını anlatır — sonra kent müzesindeki Urfa Adamı ile ilişkilendirir." },
        ],
        ctaTitle: "Göbeklitepe'yi bir yerelle gez",
        ...SAN.tr,
      },
      it: {
        name: "Göbeklitepe",
        metaTitle: "Tour di Göbeklitepe (il tempio più antico del mondo) con guide locali",
        metaDescription:
          "Visita Göbeklitepe vicino a Şanlıurfa con una guida locale abilitata — il più antico tempio conosciuto al mondo, costruito verso il 9600 a.C., 6.000 anni prima di Stonehenge. Patrimonio dell'Umanità UNESCO.",
        intro: [
          "Göbeklitepe è il più antico santuario monumentale conosciuto sulla Terra, innalzato verso il 9600 a.C. — circa 6.000 anni prima di Stonehenge e delle piramidi di Giza. Su una collina spoglia vicino a Şanlıurfa, nel sud-est della Turchia, cacciatori-raccoglitori che non avevano ancora inventato la ceramica, la scrittura o l'agricoltura riuscirono in qualche modo a estrarre, scolpire ed erigere grandi cerchi di pilastri di calcare a forma di T. È una scoperta che ha riscritto la storia della civiltà: qui il tempio potrebbe aver preceduto la città.",
          "I pilastri si innalzano per diversi metri e sono scolpiti a rilievo con volpi, cinghiali, serpenti, scorpioni e gru — un bestiario di pietra dall'alba della fede. Oggi una moderna passerella coperta protegge i recinti e permette di affacciarsi su di essi senza toccare questo luogo fragile. Poiché tanto risulta invisibile all'occhio inesperto, una guida locale abilitata di VibeGuide è essenziale per leggere i simboli e spiegare perché Göbeklitepe abbia cambiato tutto.",
        ],
        highlights: [
          { title: "Il primo tempio del mondo", desc: "Costruito verso il 9600 a.C. da popoli del Neolitico preceramico — circa 6.000 anni più antico di Stonehenge — e iscritto come Patrimonio dell'Umanità UNESCO." },
          { title: "I pilastri a T scolpiti", desc: "Grandi pilastri di calcare disposti in cerchi, scolpiti a rilievo con volpi, cinghiali, serpenti, scorpioni e gru dall'alba della religione." },
          { title: "L'Uomo di Urfa a Şanlıurfa", desc: "Abbina il sito al Museo archeologico di Şanlıurfa, che custodisce pilastri originali e l'Uomo di Urfa di 11.000 anni, la più antica statua umana a grandezza naturale conosciuta." },
        ],
        planningHeading: "Pianifica la tua visita",
        planningParagraphs: [
          "Göbeklitepe si trova a circa 20 km dal centro di Şanlıurfa, la città più vicina e la base naturale per una visita. La maggior parte dei viaggiatori vola a Şanlıurfa e raggiunge il sito in auto, taxi o tour organizzato lungo una strada breve e ben segnalata che termina al centro visitatori, da cui una navetta e una passerella conducono ai recinti. Nei dintorni c'è poco altro, quindi conviene abbinarlo alla città stessa.",
          "La cima della collina è aperta ed esposta, quasi priva di ombra, così il sole estivo del sud-est della Turchia può essere spietato. Punta al mattino presto o al tardo pomeriggio e porta acqua, cappello e protezione solare; primavera e autunno sono nel complesso le stagioni più comode. La passerella coperta ti tiene al di sopra dei recinti, quindi indossa scarpe comode per la breve camminata.",
          "L'ingresso è a pagamento, e ciò che rende Göbeklitepe indimenticabile è capire ciò che si sta vedendo — altrimenti i pilastri possono sembrare semplici pietre su una collina. Una guida locale abilitata di VibeGuide dà vita ai recinti, decifra i rilievi degli animali e collega il sito al Museo archeologico di Şanlıurfa, dove i pilastri originali e lo straordinario Uomo di Urfa completano la storia.",
        ],
        faqs: [
          { q: "Quanto è antico Göbeklitepe?", a: "Göbeklitepe fu costruito verso il 9600 a.C., il che lo rende vecchio di circa 11.000 anni — circa 6.000 anni più di Stonehenge e delle piramidi egizie, ed è il più antico tempio monumentale conosciuto al mondo." },
          { q: "Perché Göbeklitepe è così importante?", a: "Fu innalzato da cacciatori-raccoglitori prima della ceramica, della scrittura o dell'agricoltura, il che suggerisce che la religione organizzata e la costruzione monumentale possano aver preceduto la vita stanziale nei villaggi — ribaltando la vecchia idea che l'agricoltura fosse venuta prima. È Patrimonio dell'Umanità UNESCO." },
          { q: "Come si arriva a Göbeklitepe?", a: "Il sito è a circa 20 km da Şanlıurfa, nel sud-est della Turchia. La maggior parte dei visitatori vola a Şanlıurfa e raggiunge Göbeklitepe in auto, taxi o tour organizzato; sul posto ci sono centro visitatori, navetta e passerella coperta." },
          { q: "Serve una guida per Göbeklitepe?", a: "Vivamente consigliata. Gran parte del significato del sito è invisibile senza contesto, e una guida locale abilitata di VibeGuide spiega i pilastri a T, gli intagli di animali e perché la scoperta abbia riscritto la storia umana — per poi collegarla all'Uomo di Urfa nel museo cittadino." },
        ],
        ctaTitle: "Visita Göbeklitepe con un locale",
        ...SAN.it,
      },
      pl: {
        name: "Göbeklitepe",
        metaTitle: "Göbeklitepe (najstarsza świątynia świata) — wycieczki z lokalnymi przewodnikami",
        metaDescription:
          "Zwiedź Göbeklitepe koło Şanlıurfy z licencjonowanym lokalnym przewodnikiem — najstarszą znaną świątynię świata, wzniesioną około 9600 r. p.n.e., 6000 lat przed Stonehenge. Obiekt UNESCO.",
        intro: [
          "Göbeklitepe to najstarsze znane monumentalne sanktuarium na Ziemi, wzniesione około 9600 r. p.n.e. — mniej więcej 6000 lat przed Stonehenge i piramidami w Gizie. Na nagim wzgórzu koło Şanlıurfy na południowym wschodzie Turcji łowcy-zbieracze, którzy nie wynaleźli jeszcze ceramiki, pisma ani rolnictwa, w jakiś sposób wydobyli, wyrzeźbili i wznieśli wielkie kręgi wapiennych filarów w kształcie litery T. To odkrycie, które przepisało historię cywilizacji: tutaj świątynia mogła powstać przed miastem.",
          "Filary sięgają kilku metrów wysokości i pokryte są reliefami lisów, dzików, węży, skorpionów i żurawi — kamienny bestiariusz z zarania wiary. Dziś nowoczesna zadaszona kładka chroni kręgi i pozwala zajrzeć w nie z góry, nie dotykając tego kruchego miejsca. Ponieważ tak wiele jest niewidoczne dla niewprawnego oka, licencjonowany lokalny przewodnik VibeGuide jest niezbędny, by odczytać symbole i wyjaśnić, dlaczego Göbeklitepe zmieniło wszystko.",
        ],
        highlights: [
          { title: "Pierwsza świątynia świata", desc: "Wzniesiona około 9600 r. p.n.e. przez ludzi neolitu przedceramicznego — około 6000 lat starsza od Stonehenge — i wpisana na Listę światowego dziedzictwa UNESCO." },
          { title: "Rzeźbione filary T", desc: "Wielkie wapienne filary ustawione w kręgi, pokryte reliefami lisów, dzików, węży, skorpionów i żurawi z zarania religii." },
          { title: "Człowiek z Urfy w Şanlıurfie", desc: "Połącz to miejsce z Muzeum Archeologicznym w Şanlıurfie, gdzie znajdują się oryginalne filary i liczący 11 000 lat Człowiek z Urfy, najstarszy znany posąg człowieka naturalnej wielkości." },
        ],
        planningHeading: "Zaplanuj wizytę",
        planningParagraphs: [
          "Göbeklitepe leży około 20 km od centrum Şanlıurfy, najbliższego miasta i naturalnej bazy wypadowej. Większość podróżnych przylatuje do Şanlıurfy i dociera na miejsce samochodem, taksówką lub z zorganizowaną wycieczką krótką, dobrze oznakowaną drogą kończącą się przy centrum dla zwiedzających, skąd bus i kładka prowadzą do kręgów. W pobliżu jest niewiele innych atrakcji, więc najlepiej połączyć to z samym miastem.",
          "Szczyt wzgórza jest otwarty i wystawiony na słońce, niemal bez cienia, więc letnie słońce południowo-wschodniej Turcji potrafi być bezlitosne. Celuj we wczesny ranek lub późne popołudnie i weź wodę, kapelusz oraz ochronę przeciwsłoneczną; wiosna i jesień to ogólnie najwygodniejsze pory roku. Zadaszona kładka utrzymuje cię ponad kręgami, więc załóż wygodne buty na łagodny spacer.",
          "Wstęp jest biletowany, a tym, co czyni Göbeklitepe niezapomnianym, jest zrozumienie tego, co się widzi — inaczej filary mogą wyglądać jak zwykłe kamienie na wzgórzu. Licencjonowany lokalny przewodnik VibeGuide ożywia kręgi, odczytuje reliefy zwierząt i łączy to miejsce z Muzeum Archeologicznym w Şanlıurfie, gdzie oryginalne filary i zdumiewający Człowiek z Urfy dopełniają opowieści.",
        ],
        faqs: [
          { q: "Ile lat ma Göbeklitepe?", a: "Göbeklitepe zbudowano około 9600 r. p.n.e., co daje mu około 11 000 lat — mniej więcej 6000 lat więcej niż Stonehenge i piramidy egipskie, i jest najstarszą znaną monumentalną świątynią na świecie." },
          { q: "Dlaczego Göbeklitepe jest tak ważne?", a: "Wznieśli je łowcy-zbieracze przed ceramiką, pismem i rolnictwem, co sugeruje, że zorganizowana religia i monumentalne budownictwo mogły poprzedzić osiadłe życie w wioskach — obalając dawną ideę, że rolnictwo było pierwsze. To obiekt światowego dziedzictwa UNESCO." },
          { q: "Jak dojechać do Göbeklitepe?", a: "Miejsce leży około 20 km od Şanlıurfy na południowym wschodzie Turcji. Większość odwiedzających przylatuje do Şanlıurfy i dociera do Göbeklitepe samochodem, taksówką lub z zorganizowaną wycieczką; na miejscu jest centrum dla zwiedzających, bus i zadaszona kładka." },
          { q: "Czy potrzebuję przewodnika w Göbeklitepe?", a: "Zdecydowanie zalecany. Znaczna część sensu tego miejsca jest niewidoczna bez kontekstu, a licencjonowany lokalny przewodnik VibeGuide objaśnia filary T, rzeźby zwierząt i to, dlaczego odkrycie przepisało historię ludzkości — a potem łączy je z Człowiekiem z Urfy w muzeum miejskim." },
        ],
        ctaTitle: "Zobacz Göbeklitepe z lokalnym przewodnikiem",
        ...SAN.pl,
      },
      nl: {
        name: "Göbeklitepe",
        metaTitle: "Göbeklitepe-tours (oudste tempel ter wereld) met lokale gidsen",
        metaDescription:
          "Bezoek Göbeklitepe bij Şanlıurfa met een erkende lokale gids — de oudste bekende tempel ter wereld, gebouwd rond 9600 v.Chr., 6.000 jaar vóór Stonehenge. UNESCO-werelderfgoed.",
        intro: [
          "Göbeklitepe is het oudste bekende monumentale heiligdom op aarde, opgericht rond 9600 v.Chr. — zo'n 6.000 jaar vóór Stonehenge en de piramides van Gizeh. Op een kale heuveltop bij Şanlıurfa in het zuidoosten van Turkije wisten jager-verzamelaars die nog geen aardewerk, schrift of landbouw hadden uitgevonden op de een of andere manier grote ringen van T-vormige kalkstenen pilaren te houwen, te bewerken en op te richten. Het is een ontdekking die het verhaal van de beschaving herschreef: hier kwam de tempel misschien vóór de stad.",
          "De pilaren rijzen meerdere meters hoog op en zijn in reliëf bewerkt met vossen, everzwijnen, slangen, schorpioenen en kraanvogels — een stenen bestiarium uit de dageraad van het geloof. Vandaag beschermt een moderne overdekte loopbrug de omheiningen en laat je erin kijken zonder deze kwetsbare plek aan te raken. Omdat zoveel onzichtbaar is voor het ongeoefende oog, is een erkende lokale VibeGuide-gids onmisbaar om de symbolen te lezen en uit te leggen waarom Göbeklitepe alles veranderde.",
        ],
        highlights: [
          { title: "De eerste tempel ter wereld", desc: "Gebouwd rond 9600 v.Chr. door mensen uit het prekeramische neolithicum — zo'n 6.000 jaar ouder dan Stonehenge — en ingeschreven als UNESCO-werelderfgoed." },
          { title: "De bewerkte T-pilaren", desc: "Grote kalkstenen pilaren in ringen gerangschikt, in reliëf bewerkt met vossen, everzwijnen, slangen, schorpioenen en kraanvogels uit de dageraad van de religie." },
          { title: "De Urfa-man in Şanlıurfa", desc: "Combineer de site met het Archeologisch Museum van Şanlıurfa, met originele pilaren en de 11.000 jaar oude Urfa-man, het oudst bekende mensbeeld op ware grootte." },
        ],
        planningHeading: "Plan je bezoek",
        planningParagraphs: [
          "Göbeklitepe ligt zo'n 20 km van het centrum van Şanlıurfa, de dichtstbijzijnde stad en de natuurlijke uitvalsbasis voor een bezoek. De meeste reizigers vliegen naar Şanlıurfa en bereiken de site met de auto, taxi of georganiseerde tour via een korte, goed bewegwijzerde weg die eindigt bij het bezoekerscentrum, van waaruit een pendelbus en loopbrug naar de omheiningen leiden. Er is verder weinig in de buurt, dus combineer het bij voorkeur met de stad zelf.",
          "De heuveltop is open en onbeschut, met vrijwel geen schaduw, dus de zomerzon van zuidoostelijk Turkije kan meedogenloos zijn. Mik op de vroege ochtend of de late namiddag en neem water, een hoed en zonbescherming mee; het voorjaar en het najaar zijn al met al de aangenaamste seizoenen. De overdekte loopbrug houdt je boven de omheiningen, dus draag comfortabele schoenen voor de rustige wandeling.",
          "De toegang is met kaartje, en wat Göbeklitepe onvergetelijk maakt, is begrijpen wat je ziet — anders kunnen de pilaren lijken op gewone stenen op een heuvel. Een erkende lokale VibeGuide-gids brengt de omheiningen tot leven, ontcijfert de dierenreliëfs en verbindt de site met het Archeologisch Museum van Şanlıurfa, waar de originele pilaren en de verbluffende Urfa-man het verhaal compleet maken.",
        ],
        faqs: [
          { q: "Hoe oud is Göbeklitepe?", a: "Göbeklitepe werd gebouwd rond 9600 v.Chr., wat het ongeveer 11.000 jaar oud maakt — zo'n 6.000 jaar ouder dan Stonehenge en de Egyptische piramides, en de oudste bekende monumentale tempel ter wereld." },
          { q: "Waarom is Göbeklitepe zo belangrijk?", a: "Het werd opgericht door jager-verzamelaars vóór aardewerk, schrift of landbouw, wat suggereert dat georganiseerde religie en monumentale bouw mogelijk vooraf gingen aan het gevestigde dorpsleven — waarmee het oude idee dat landbouw eerst kwam wordt omgekeerd. Het is UNESCO-werelderfgoed." },
          { q: "Hoe kom ik bij Göbeklitepe?", a: "De site ligt zo'n 20 km van Şanlıurfa in het zuidoosten van Turkije. De meeste bezoekers vliegen naar Şanlıurfa en bereiken Göbeklitepe met de auto, taxi of georganiseerde tour; ter plaatse zijn een bezoekerscentrum, pendelbus en overdekte loopbrug." },
          { q: "Heb ik een gids nodig voor Göbeklitepe?", a: "Sterk aanbevolen. Veel van de betekenis van de site is onzichtbaar zonder context, en een erkende lokale VibeGuide-gids legt de T-pilaren uit, de dierensneden en waarom de ontdekking de menselijke geschiedenis herschreef — en verbindt het dan met de Urfa-man in het stadsmuseum." },
        ],
        ctaTitle: "Bekijk Göbeklitepe met een local",
        ...SAN.nl,
      },
    },
  },
];

const BY_SLUG = new Map(ATTRACTIONS.map((a) => [a.slug, a]));

export function getAttraction(slug: string): Attraction | undefined {
  return BY_SLUG.get(slug);
}

export function isAttractionLang(lang: string): lang is AttractionLang {
  return (ATTRACTION_LANGS as readonly string[]).includes(lang);
}

/** generateStaticParams için tüm (lang, slug) kombinasyonları. */
export function allAttractionParams(): { lang: AttractionLang; slug: string }[] {
  return ATTRACTIONS.flatMap((a) =>
    ATTRACTION_LANGS.map((lang) => ({ lang, slug: a.slug }))
  );
}
