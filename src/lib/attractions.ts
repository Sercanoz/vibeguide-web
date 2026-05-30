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
] as const;
export type AttractionLang = (typeof ATTRACTION_LANGS)[number];

export const RTL_LANGS: ReadonlySet<AttractionLang> = new Set(["ar"]);

export type AttractionContent = {
  name: string; // landmark adı, o dilde (H1 + başlıkta)
  metaTitle: string;
  metaDescription: string;
  intro: string[]; // 1-2 kısa paragraf
  highlights: { title: string; desc: string }[];
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
        metaTitle: "Hagia Sophia Tours & Local Guides | VibeGuide",
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
        metaTitle: "Hagia Sophia Touren & lokale Guides | VibeGuide",
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
        metaTitle: "Айя-София: экскурсии с местными гидами | VibeGuide",
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
        metaTitle: "جولات آيا صوفيا مع مرشدين محليين | VibeGuide",
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
        metaTitle: "Tours de Santa Sofía con guías locales | VibeGuide",
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
        metaTitle: "Visites de Sainte-Sophie avec guides locaux | VibeGuide",
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
        metaTitle: "Ξεναγήσεις στην Αγία Σοφία με ντόπιους ξεναγούς | VibeGuide",
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
        metaTitle: "Ayasofya Turları & Yerel Rehberler | VibeGuide",
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
        metaTitle: "Topkapi Palace Tours & Local Guides | VibeGuide",
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
        metaTitle: "Topkapı-Palast Touren & lokale Guides | VibeGuide",
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
        metaTitle: "Дворец Топкапы: экскурсии с местными гидами | VibeGuide",
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
        metaTitle: "جولات قصر توبكابي مع مرشدين محليين | VibeGuide",
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
        metaTitle: "Tours del Palacio de Topkapi con guías locales | VibeGuide",
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
        metaTitle: "Visites du Palais de Topkapı avec guides locaux | VibeGuide",
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
        metaTitle: "Ξεναγήσεις στο Ανάκτορο Τοπκαπί με ντόπιους ξεναγούς | VibeGuide",
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
        metaTitle: "Topkapı Sarayı Turları & Yerel Rehberler | VibeGuide",
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
        metaTitle: "Basilica Cistern (Yerebatan) Tours & Local Guides | VibeGuide",
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
        metaTitle: "Cisterna Basilica (Yerebatan) Touren & lokale Guides | VibeGuide",
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
        metaTitle: "Цистерна Базилика (Йеребатан): экскурсии с гидами | VibeGuide",
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
        metaTitle: "جولات صهريج البازيليك (يره باطان) مع مرشدين | VibeGuide",
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
        metaTitle: "Tours de la Cisterna Basílica (Yerebatan) con guías | VibeGuide",
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
        metaTitle: "Visites de la Citerne Basilique (Yerebatan) avec guides | VibeGuide",
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
        metaTitle: "Ξεναγήσεις στη Βασιλική Κινστέρνα (Γερεμπατάν) | VibeGuide",
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
        metaTitle: "Yerebatan Sarnıcı Turları & Yerel Rehberler | VibeGuide",
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
        metaTitle: "Blue Mosque (Sultanahmet) Tours & Local Guides | VibeGuide",
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
        metaTitle: "Blaue Moschee (Sultanahmet) Touren & lokale Guides | VibeGuide",
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
        metaTitle: "Голубая мечеть (Султанахмет): экскурсии с гидами | VibeGuide",
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
        metaTitle: "جولات المسجد الأزرق (السلطان أحمد) مع مرشدين | VibeGuide",
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
        metaTitle: "Tours de la Mezquita Azul (Sultanahmet) con guías | VibeGuide",
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
        metaTitle: "Visites de la Mosquée Bleue (Sultanahmet) avec guides | VibeGuide",
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
        metaTitle: "Ξεναγήσεις στο Μπλε Τζαμί (Σουλταναχμέτ) | VibeGuide",
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
        metaTitle: "Sultanahmet Camii Turları & Yerel Rehberler | VibeGuide",
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
        metaTitle: "Ephesus Tours & Local Guides | VibeGuide",
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
        metaTitle: "Ephesos Touren & lokale Guides | VibeGuide",
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
        metaTitle: "Эфес: экскурсии с местными гидами | VibeGuide",
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
        metaTitle: "جولات أفسس مع مرشدين محليين | VibeGuide",
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
        metaTitle: "Tours de Éfeso con guías locales | VibeGuide",
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
        metaTitle: "Visites d'Éphèse avec guides locaux | VibeGuide",
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
        metaTitle: "Ξεναγήσεις στην Έφεσο με ντόπιους ξεναγούς | VibeGuide",
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
        metaTitle: "Efes Turları & Yerel Rehberler | VibeGuide",
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
        metaTitle: "Cappadocia Tours & Local Guides | VibeGuide",
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
        metaTitle: "Kappadokien Touren & lokale Guides | VibeGuide",
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
        metaTitle: "Каппадокия: экскурсии с местными гидами | VibeGuide",
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
        metaTitle: "جولات كابادوكيا مع مرشدين محليين | VibeGuide",
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
        metaTitle: "Tours de Capadocia con guías locales | VibeGuide",
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
        metaTitle: "Visites de Cappadoce avec guides locaux | VibeGuide",
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
        metaTitle: "Ξεναγήσεις στην Καππαδοκία με ντόπιους ξεναγούς | VibeGuide",
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
        metaTitle: "Kapadokya Turları & Yerel Rehberler | VibeGuide",
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
