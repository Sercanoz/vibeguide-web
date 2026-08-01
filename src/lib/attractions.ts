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
        ctaTitle: "Bezoek Pamukkale met een local",
        ...PAM.nl,
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
