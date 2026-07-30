// ───────────────────────────────────────────────────────────────────────────
// City tour-guide landing pages — SEO content, localized.
//
// EN lives at the root URL (/istanbul-tour-guide) and stays indexed.
// Other languages live at /[lang]/istanbul-tour-guide.
// Add a language by extending CITY_GUIDE_LANGS and filling each city's i18n[lang].
// ───────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

const SITE = "https://www.vibeguideapp.com";

export const CITY_GUIDE_LANGS = ["en", "de", "es", "fr", "it", "ar", "ru", "tr", "pl", "nl"] as const;
export type CityGuideLang = (typeof CITY_GUIDE_LANGS)[number];

export const RTL_CITY_LANGS = new Set<CityGuideLang>(["ar"]);

export function isCityGuideLang(v: string): v is CityGuideLang {
  return (CITY_GUIDE_LANGS as readonly string[]).includes(v);
}

export type Highlight = { icon: string; name: string; desc: string };
export type Faq = { q: string; a: string };
export type Mode = { tag: string; color: string; title: string; text: string };
export type LinkCard = { href: string; icon: string; name: string; desc: string };

export type CityGuideContent = {
  metaTitle: string;
  metaDescription: string;
  ogDescription: string;
  keywords: string[];
  region: string; // "Istanbul · Turkey"
  h1: string;
  h1Accent: string;
  heroLead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  highlightsKicker: string;
  highlightsHeading: string;
  highlights: Highlight[];
  seoHeading: string;
  seoParagraphs: string[]; // may contain <strong> tags
  modesKicker: string;
  modesHeading: string;
  modes: Mode[];
  trustHeading: string;
  trustText: string;
  trustBadges: string[];
  faqHeading?: string;
  faqs?: Faq[];
  landmarksHeading?: string;
  landmarksSub?: string;
  landmarks?: LinkCard[];
  otherHeading: string;
  otherCities: LinkCard[];
  ctaTitle: string;
  ctaSub: string;
  ctaAvailability: string;
};

export type CityGuide = {
  slug: string; // "istanbul-tour-guide"
  citySlug: string; // backend city slug for tours
  cityName: string;
  heroImage: string;
  i18n: Record<CityGuideLang, CityGuideContent>;
};

// Shared mode accent colors (language-independent).
const C = { now: "bg-[#6C4CF1]", squad: "bg-[#059669]", private: "bg-[#D97706]" };

// ─── ISTANBUL ────────────────────────────────────────────────────────────────
const ISTANBUL: CityGuide = {
  slug: "istanbul-tour-guide",
  citySlug: "istanbul",
  cityName: "Istanbul",
  heroImage:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1600",
  i18n: {
    en: {
      metaTitle: "Istanbul Tour Guide — Book a Local Expert",
      metaDescription:
        "Find a verified local tour guide in Istanbul. Explore Hagia Sophia, Topkapi Palace, Grand Bazaar, Balat and the Bosphorus with a real local — instantly or planned.",
      ogDescription:
        "Verified local guides for Istanbul. Instant matching, group tours, or private full-day experiences. No tourist traps.",
      keywords: [
        "Istanbul tour guide", "local guide Istanbul", "private tour Istanbul",
        "Istanbul walking tour", "Hagia Sophia tour", "Grand Bazaar guide",
        "Topkapi Palace tour", "Bosphorus tour", "Sultanahmet tour guide", "Balat tour",
      ],
      region: "Istanbul · Turkey",
      h1: "Istanbul Tour Guide",
      h1Accent: "Find Your Local Expert",
      heroLead:
        "Skip the tourist traps. Explore Istanbul with a verified local guide who knows the hidden streets, real stories, and best food — from Sultanahmet to Balat.",
      ctaPrimary: "Book a Guide Now →",
      ctaSecondary: "See Tour Options",
      highlightsKicker: "Top Destinations",
      highlightsHeading: "What your guide will show you",
      highlights: [
        { icon: "🕌", name: "Hagia Sophia", desc: "1,500 years of history — Byzantine cathedral turned Ottoman mosque." },
        { icon: "🏰", name: "Topkapi Palace", desc: "The heart of the Ottoman Empire, overlooking the Bosphorus." },
        { icon: "🛍️", name: "Grand Bazaar", desc: "4,000+ shops in the world's oldest covered market — navigate it like a local." },
        { icon: "🎨", name: "Balat & Fener", desc: "Colourful streets, Greek Orthodox history, and hidden cafes." },
        { icon: "⛵", name: "Bosphorus", desc: "Where Europe meets Asia — a strait that has shaped civilisations." },
        { icon: "🕌", name: "Blue Mosque", desc: "Six minarets, 20,000 Iznik tiles, and one of Istanbul's most iconic skylines." },
      ],
      seoHeading: "Why explore Istanbul with a local guide?",
      seoParagraphs: [
        "Istanbul is a city of layers — Roman, Byzantine and Ottoman empires all left their mark on the same streets. Two continents, three names (Byzantium, Constantinople, Istanbul), and more than 2,500 years of history are packed into one extraordinary skyline. For a first-time visitor, the sheer scale can be overwhelming, and the most rewarding corners are rarely the ones in the guidebooks.",
        "That's where a <strong>licensed Istanbul tour guide</strong> changes everything. Instead of queuing blindly at <strong>Hagia Sophia</strong> or getting lost in the 4,000 shops of the <strong>Grand Bazaar</strong>, you walk with someone who knows which entrance is fastest, which carpet seller is honest, and which tiny lokanta serves the best İskender kebab. A good guide doesn't just show you the <strong>Blue Mosque</strong> and <strong>Topkapi Palace</strong> — they tell you the stories that make them come alive.",
        "VibeGuide connects you with verified local guides across Istanbul's most iconic districts. Explore the historic peninsula of <strong>Sultanahmet</strong>, wander the colourful streets of <strong>Balat and Fener</strong>, climb to <strong>Galata Tower</strong> for the best view of the Golden Horn, or cruise the <strong>Bosphorus</strong> where Europe meets Asia. Whether you have two hours or two days, your guide builds the route around you.",
        "Every guide on our platform is licensed by the Turkish Ministry of Culture and Tourism, identity-verified, and reviewed after each tour — so you can explore with total confidence. No tourist traps, no scripted speeches, no pressure. Just a real local showing you their city.",
      ],
      modesKicker: "How it works",
      modesHeading: "Three ways to explore Istanbul",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Match in 60 seconds", text: "Open the app, tap VibeNow, and a verified local guide meets you at your location in minutes. No booking, no waiting." },
        { tag: "VibeSquad", color: C.squad, title: "Join a group tour", text: "Affordable, social, fun. Join an existing group exploring Istanbul right now — meet fellow travellers along the way." },
        { tag: "Private Tour", color: C.private, title: "Plan your perfect day", text: "Schedule a private guide for a half-day or full-day experience, fully tailored to your interests and pace." },
      ],
      trustHeading: "Every guide is verified",
      trustText: "All VibeGuide tour guides in Istanbul hold official Turkish Ministry of Culture licences, pass identity verification, and are reviewed after every tour.",
      trustBadges: ["🪪 Licensed by Ministry of Culture", "✅ Identity verified", "⭐ 4.9 avg rating", "🚫 Zero-tolerance policy"],
      faqHeading: "Frequently asked questions",
      faqs: [
        { q: "How much does a tour guide in Istanbul cost?", a: "Prices vary by tour type and duration. With VibeGuide you can see the exact price before you book — most half-day private tours in Istanbul start from a fixed per-person rate, with no hidden fees. Group tours (VibeSquad) are the most affordable option." },
        { q: "Are VibeGuide's Istanbul guides licensed?", a: "Yes. Every guide on VibeGuide holds an official licence from the Turkish Ministry of Culture and Tourism, passes identity verification, and is reviewed after every tour. We have a zero-tolerance policy for unlicensed guiding." },
        { q: "What's the best area to start an Istanbul tour?", a: "Most first-time visitors start in Sultanahmet (the historic peninsula), home to Hagia Sophia, the Blue Mosque, Topkapi Palace and the Grand Bazaar — all within walking distance. Your guide can also build a route around Balat, Galata, Karaköy or the Bosphorus depending on your interests." },
        { q: "Can I book a guide for the same day?", a: "Yes. With VibeNow you can match with an available local guide in about 60 seconds and meet them at your location within minutes — no advance booking required. You can also schedule a private tour in advance." },
        { q: "Do guides speak English?", a: "Yes. Most Istanbul guides on VibeGuide speak English, and many also offer tours in German, Russian, French, Spanish, Arabic and other languages. You can filter by language when choosing a tour." },
        { q: "Is it better to explore Istanbul with a guide or alone?", a: "Istanbul rewards local knowledge. A licensed guide helps you skip queues, avoid tourist-trap restaurants, understand the real history behind each site, and discover neighbourhoods most visitors never reach — turning a checklist into a genuine experience." },
        { q: "How many days do you need in Istanbul?", a: "Two to three days covers the highlights — Sultanahmet (Hagia Sophia, Blue Mosque, Topkapi), the Grand Bazaar and a Bosphorus cruise. With four or more days you can add Balat, the Asian side (Kadıköy), and day trips. A local guide helps you make the most of however long you have." },
        { q: "What is the best time to visit Istanbul?", a: "April–May and September–October offer mild weather and thinner crowds. Summer is hot and busy; winter is cooler but atmospheric and cheaper. Whatever the season, a local guide knows the quietest hours to visit major sites." },
        { q: "How do I get a private tour guide in Istanbul?", a: "Open the VibeGuide app, choose Private Tour, pick a verified local guide and your date, and you're set. You'll see the price up front and can message your guide before the day. For something spontaneous, VibeNow matches you with an available guide in about 60 seconds." },
        { q: "Are Istanbul tours suitable for families and kids?", a: "Yes. Private guides tailor the pace and content for children, seniors and mixed groups — shorter routes, snack stops, and stories kids actually enjoy. Just tell your guide who's coming." },
        { q: "Do I need to tip my Istanbul guide?", a: "Tipping isn't required — the price you see covers the tour. If you had a great time, a tip is appreciated but always optional, and never expected." },
      ],
      landmarksHeading: "Top Istanbul landmarks",
      landmarksSub: "Explore each with a verified local guide.",
      landmarks: [
        { href: "/attractions/en/hagia-sophia", icon: "🕌", name: "Hagia Sophia", desc: "Byzantine cathedral turned Ottoman mosque" },
        { href: "/attractions/en/blue-mosque", icon: "🕌", name: "Blue Mosque", desc: "Six minarets & 20,000 İznik tiles" },
        { href: "/attractions/en/topkapi-palace", icon: "🏰", name: "Topkapi Palace", desc: "Heart of the Ottoman Empire" },
        { href: "/attractions/en/basilica-cistern", icon: "🏛️", name: "Basilica Cistern", desc: "Underground palace of water" },
      ],
      otherHeading: "Explore more of Turkey",
      otherCities: [
        { href: "/cappadocia-tour-guide", icon: "🎈", name: "Cappadocia Tour Guide", desc: "Hot air balloons, fairy chimneys & cave churches" },
        { href: "/ephesus-tour-guide", icon: "🏛️", name: "Ephesus Tour Guide", desc: "Ancient Roman ruins near Selçuk, İzmir" },
      ],
      ctaTitle: "Ready to explore Istanbul?",
      ctaSub: "Download VibeGuide free. Find a local guide in 60 seconds.",
      ctaAvailability: "Free · No subscription · Istanbul available now",
    },
    ru: {
      metaTitle: "Гид по Стамбулу — закажите местного эксперта",
      metaDescription:
        "Найдите проверенного местного гида в Стамбуле. Осмотрите Айя-Софию, дворец Топкапы, Гранд-базар, Балат и Босфор с настоящим местным жителем — мгновенно или по плану.",
      ogDescription:
        "Проверенные местные гиды в Стамбуле. Мгновенный подбор, групповые экскурсии или частные туры на целый день. Никаких туристических ловушек.",
      keywords: [
        "гид по Стамбулу", "местный гид Стамбул", "частный гид Стамбул",
        "экскурсия по Стамбулу", "экскурсия Айя-София", "гид Гранд-базар",
        "экскурсия дворец Топкапы", "экскурсия по Босфору", "гид Султанахмет", "экскурсия Балат",
      ],
      region: "Стамбул · Турция",
      h1: "Гид по Стамбулу",
      h1Accent: "Найдите своего местного эксперта",
      heroLead:
        "Обойдите туристические ловушки. Откройте Стамбул с проверенным местным гидом, который знает скрытые улочки, настоящие истории и лучшую еду — от Султанахмета до Балата.",
      ctaPrimary: "Заказать гида →",
      ctaSecondary: "Смотреть варианты экскурсий",
      highlightsKicker: "Главные места",
      highlightsHeading: "Что покажет вам гид",
      highlights: [
        { icon: "🕌", name: "Айя-София", desc: "1500 лет истории — византийский собор, ставший османской мечетью." },
        { icon: "🏰", name: "Дворец Топкапы", desc: "Сердце Османской империи с видом на Босфор." },
        { icon: "🛍️", name: "Гранд-базар", desc: "Более 4000 лавок в старейшем крытом рынке мира — ориентируйтесь как местный." },
        { icon: "🎨", name: "Балат и Фенер", desc: "Разноцветные улицы, история греческого православия и укромные кафе." },
        { icon: "⛵", name: "Босфор", desc: "Там, где Европа встречается с Азией — пролив, сформировавший цивилизации." },
        { icon: "🕌", name: "Голубая мечеть", desc: "Шесть минаретов, 20 000 изникских изразцов и один из самых узнаваемых силуэтов Стамбула." },
      ],
      seoHeading: "Зачем открывать Стамбул с местным гидом?",
      seoParagraphs: [
        "Стамбул — город слоёв: римская, византийская и османская империи оставили свой след на одних и тех же улицах. Два континента, три имени (Византий, Константинополь, Стамбул) и более 2500 лет истории собраны в одном поразительном силуэте. Тому, кто приезжает впервые, сам масштаб может показаться ошеломляющим, а самые интересные уголки редко попадают в путеводители.",
        "Именно здесь <strong>лицензированный гид по Стамбулу</strong> меняет всё. Вместо того чтобы вслепую стоять в очереди у <strong>Айя-Софии</strong> или теряться среди 4000 лавок <strong>Гранд-базара</strong>, вы идёте с тем, кто знает, какой вход самый быстрый, какой продавец ковров честен и в какой крошечной локанте подают лучший искендер-кебаб. Хороший гид не просто показывает вам <strong>Голубую мечеть</strong> и <strong>дворец Топкапы</strong> — он рассказывает истории, которые их оживляют.",
        "VibeGuide связывает вас с проверенными местными гидами в самых знаменитых районах Стамбула. Исследуйте исторический полуостров <strong>Султанахмет</strong>, побродите по разноцветным улицам <strong>Балата и Фенера</strong>, поднимитесь на <strong>Галатскую башню</strong> ради лучшего вида на Золотой Рог или прокатитесь по <strong>Босфору</strong>, где Европа встречается с Азией. Есть у вас два часа или два дня — гид выстроит маршрут вокруг вас.",
        "Каждый гид на нашей платформе лицензирован Министерством культуры и туризма Турции, прошёл проверку личности и получает оценку после каждой экскурсии — так что вы можете исследовать город с полной уверенностью. Никаких туристических ловушек, никаких заученных речей, никакого давления. Просто настоящий местный, показывающий вам свой город.",
      ],
      modesKicker: "Как это работает",
      modesHeading: "Три способа открыть Стамбул",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Подбор за 60 секунд", text: "Откройте приложение, нажмите VibeNow — и проверенный местный гид встретит вас на месте уже через несколько минут. Без брони, без ожидания." },
        { tag: "VibeSquad", color: C.squad, title: "Присоединиться к группе", text: "Доступно, живо и весело. Присоединяйтесь к группе, которая исследует Стамбул прямо сейчас, — и знакомьтесь с попутчиками по дороге." },
        { tag: "Private Tour", color: C.private, title: "Спланируйте идеальный день", text: "Закажите частного гида на полдня или целый день — полностью под ваши интересы и темп." },
      ],
      trustHeading: "Каждый гид проверен",
      trustText: "Все гиды VibeGuide в Стамбуле имеют официальные лицензии Министерства культуры Турции, проходят проверку личности и получают оценку после каждой экскурсии.",
      trustBadges: ["🪪 Лицензия Министерства культуры", "✅ Личность подтверждена", "⭐ Средний рейтинг 4,9", "🚫 Политика нулевой терпимости"],
      faqHeading: "Часто задаваемые вопросы",
      faqs: [
        { q: "Сколько стоит гид в Стамбуле?", a: "Цена зависит от типа и длительности экскурсии. С VibeGuide вы видите точную стоимость ещё до бронирования — большинство частных экскурсий на полдня в Стамбуле начинаются с фиксированной цены за человека, без скрытых доплат. Групповые экскурсии (VibeSquad) — самый доступный вариант." },
        { q: "Лицензированы ли гиды VibeGuide в Стамбуле?", a: "Да. Каждый гид VibeGuide имеет официальную лицензию Министерства культуры и туризма Турции, проходит проверку личности и получает оценку после каждой экскурсии. У нас действует политика нулевой терпимости к нелицензированным гидам." },
        { q: "С какого района лучше начать знакомство со Стамбулом?", a: "Большинство приезжающих впервые начинают с Султанахмета (исторического полуострова), где находятся Айя-София, Голубая мечеть, дворец Топкапы и Гранд-базар — всё в пешей доступности. Гид также может выстроить маршрут вокруг Балата, Галаты, Каракёя или Босфора в зависимости от ваших интересов." },
        { q: "Можно ли заказать гида на тот же день?", a: "Да. С VibeNow вы находите свободного местного гида примерно за 60 секунд, и он встречает вас на месте уже через несколько минут — без предварительной брони. Частную экскурсию также можно запланировать заранее." },
        { q: "Говорят ли гиды по-английски?", a: "Да. Большинство гидов по Стамбулу в VibeGuide говорят по-английски, а многие проводят экскурсии также на русском, немецком, французском, испанском, арабском и других языках. При выборе экскурсии можно фильтровать по языку." },
        { q: "Что лучше — осматривать Стамбул с гидом или самостоятельно?", a: "Стамбул вознаграждает знание местных. Лицензированный гид помогает обойти очереди, избежать ресторанов-ловушек для туристов, понять настоящую историю каждого места и открыть районы, до которых большинство гостей так и не добирается, — превращая список галочек в подлинное впечатление." },
        { q: "Сколько дней нужно на Стамбул?", a: "Двух-трёх дней хватает на главное — Султанахмет (Айя-София, Голубая мечеть, Топкапы), Гранд-базар и прогулку по Босфору. За четыре дня и больше можно добавить Балат, азиатскую сторону (Кадыкёй) и поездки за город. Местный гид поможет извлечь максимум из любого времени." },
        { q: "Когда лучше всего ехать в Стамбул?", a: "Апрель–май и сентябрь–октябрь дарят мягкую погоду и меньше толп. Лето жаркое и людное; зима прохладнее, но атмосфернее и дешевле. В любой сезон местный гид знает самые тихие часы для посещения главных достопримечательностей." },
        { q: "Как заказать частного гида в Стамбуле?", a: "Откройте приложение VibeGuide, выберите Private Tour, укажите проверенного местного гида и дату — готово. Вы увидите цену заранее и сможете написать гиду ещё до дня экскурсии. Для чего-то спонтанного VibeNow подберёт свободного гида примерно за 60 секунд." },
        { q: "Подходят ли экскурсии по Стамбулу для семей с детьми?", a: "Да. Частные гиды подстраивают темп и содержание под детей, пожилых и смешанные группы — более короткие маршруты, остановки на перекус и истории, которые детям действительно интересны. Просто скажите гиду, кто идёт с вами." },
        { q: "Нужно ли давать чаевые гиду в Стамбуле?", a: "Чаевые не обязательны — указанная цена покрывает экскурсию. Если вам понравилось, чаевые будут приятны, но всегда остаются на ваше усмотрение и никогда не ожидаются." },
      ],
      landmarksHeading: "Главные достопримечательности Стамбула",
      landmarksSub: "Осмотрите каждую с проверенным местным гидом.",
      landmarks: [
        { href: "/attractions/ru/hagia-sophia", icon: "🕌", name: "Айя-София", desc: "Византийский собор, ставший османской мечетью" },
        { href: "/attractions/ru/blue-mosque", icon: "🕌", name: "Голубая мечеть", desc: "Шесть минаретов и 20 000 изникских изразцов" },
        { href: "/attractions/ru/topkapi-palace", icon: "🏰", name: "Дворец Топкапы", desc: "Сердце Османской империи" },
        { href: "/attractions/ru/basilica-cistern", icon: "🏛️", name: "Цистерна Базилика", desc: "Подземный дворец воды" },
      ],
      otherHeading: "Откройте больше Турции",
      otherCities: [
        { href: "/ru/cappadocia-tour-guide", icon: "🎈", name: "Гид по Каппадокии", desc: "Воздушные шары, дымоходы фей и пещерные церкви" },
        { href: "/ru/ephesus-tour-guide", icon: "🏛️", name: "Гид по Эфесу", desc: "Древнеримские руины близ Сельчука, Измир" },
      ],
      ctaTitle: "Готовы открыть Стамбул?",
      ctaSub: "Скачайте VibeGuide бесплатно. Найдите местного гида за 60 секунд.",
      ctaAvailability: "Бесплатно · Без подписки · Стамбул доступен сейчас",
    },
    tr: {
      metaTitle: "İstanbul Tur Rehberi — Yerel Uzmanınızı Bulun",
      metaDescription:
        "İstanbul'da onaylı yerel tur rehberi bulun. Ayasofya, Topkapı Sarayı, Kapalıçarşı, Balat ve Boğaz'ı gerçek bir yerliyle keşfedin — anında ya da planlı.",
      ogDescription:
        "İstanbul için onaylı yerel rehberler. Anında eşleşme, grup turları veya tam günlük özel deneyimler. Turist tuzağı yok.",
      keywords: [
        "İstanbul tur rehberi", "İstanbul yerel rehber", "İstanbul özel rehber",
        "İstanbul özel tur", "profesyonel turist rehberi İstanbul", "Ayasofya turu",
        "Kapalıçarşı rehber", "Topkapı Sarayı turu", "Boğaz turu", "Sultanahmet rehber",
      ],
      region: "İstanbul · Türkiye",
      h1: "İstanbul Tur Rehberi",
      h1Accent: "Yerel Uzmanınızı Bulun",
      heroLead:
        "Turist tuzaklarını atlayın. İstanbul'u; gizli sokakları, gerçek hikâyeleri ve en iyi lezzetleri bilen onaylı bir yerel rehberle keşfedin — Sultanahmet'ten Balat'a.",
      ctaPrimary: "Hemen Rehber Bul →",
      ctaSecondary: "Tur Seçeneklerini Gör",
      highlightsKicker: "Öne Çıkan Yerler",
      highlightsHeading: "Rehberiniz size neleri gösterecek",
      highlights: [
        { icon: "🕌", name: "Ayasofya", desc: "1.500 yıllık tarih — Bizans katedralinden Osmanlı camisine dönüşen yapı." },
        { icon: "🏰", name: "Topkapı Sarayı", desc: "Boğaz'a tepeden bakan, Osmanlı İmparatorluğu'nun kalbi." },
        { icon: "🛍️", name: "Kapalıçarşı", desc: "Dünyanın en eski kapalı çarşısında 4.000'den fazla dükkân — burayı bir yerli gibi gezin." },
        { icon: "🎨", name: "Balat & Fener", desc: "Rengârenk sokaklar, Rum Ortodoks tarihi ve saklı kafeler." },
        { icon: "⛵", name: "Boğaz", desc: "Avrupa'nın Asya ile buluştuğu yer — medeniyetlere yön veren bir boğaz." },
        { icon: "🕌", name: "Sultanahmet Camii", desc: "Altı minare, 20.000 İznik çinisi ve İstanbul'un en ikonik siluetlerinden biri." },
      ],
      seoHeading: "İstanbul'u neden yerel bir rehberle keşfetmeli?",
      seoParagraphs: [
        "İstanbul katman katman bir şehir — Roma, Bizans ve Osmanlı imparatorlukları aynı sokaklara izini bıraktı. İki kıta, üç isim (Bizantion, Konstantinopolis, İstanbul) ve 2.500 yılı aşkın tarih tek bir olağanüstü siluete sığmış durumda. Şehre ilk kez gelen biri için bu ölçek bunaltıcı olabilir; en keyifli köşeler ise nadiren rehber kitaplarında yer alanlardır.",
        "İşte tam da burada <strong>lisanslı bir İstanbul tur rehberi</strong> her şeyi değiştirir. <strong>Ayasofya</strong> önünde gözü kapalı sırada beklemek ya da <strong>Kapalıçarşı</strong>'nın 4.000 dükkânı arasında kaybolmak yerine; en hızlı girişin hangisi olduğunu, hangi halıcının dürüst çalıştığını ve hangi küçük lokantanın en iyi İskender'i yaptığını bilen biriyle yürürsünüz. İyi bir rehber size sadece <strong>Sultanahmet Camii</strong>'ni ve <strong>Topkapı Sarayı</strong>'nı göstermez — onları canlandıran hikâyeleri de anlatır.",
        "VibeGuide sizi İstanbul'un en ikonik semtlerindeki onaylı yerel rehberlerle buluşturur. Tarihi yarımada <strong>Sultanahmet</strong>'i gezin, <strong>Balat ve Fener</strong>'in rengârenk sokaklarında dolaşın, Haliç'in en güzel manzarası için <strong>Galata Kulesi</strong>'ne çıkın ya da Avrupa'nın Asya'yla buluştuğu <strong>Boğaz</strong>'da bir tur yapın. İster iki saatiniz olsun ister iki gününüz, rehberiniz rotayı size göre kurar.",
        "Platformumuzdaki her rehber T.C. Kültür ve Turizm Bakanlığı tarafından lisanslıdır, kimliği doğrulanmıştır ve her turdan sonra değerlendirilir — böylece tam bir güvenle gezersiniz. Turist tuzağı yok, ezbere konuşmalar yok, baskı yok. Sadece size şehrini gösteren gerçek bir yerli.",
      ],
      modesKicker: "Nasıl çalışır",
      modesHeading: "İstanbul'u keşfetmenin üç yolu",
      modes: [
        { tag: "VibeNow", color: C.now, title: "60 saniyede eşleş", text: "Uygulamayı açın, VibeNow'a dokunun ve onaylı bir yerel rehber dakikalar içinde bulunduğunuz yere gelsin. Rezervasyon yok, bekleme yok." },
        { tag: "VibeSquad", color: C.squad, title: "Bir grup turuna katıl", text: "Uygun fiyatlı, sosyal, eğlenceli. Şu anda İstanbul'u gezen bir gruba katılın — yol boyunca yeni gezginlerle tanışın." },
        { tag: "Private Tour", color: C.private, title: "Kusursuz gününüzü planlayın", text: "İlgi alanlarınıza ve temponuza tümüyle uyarlanmış yarım günlük ya da tam günlük bir deneyim için özel rehber ayırtın." },
      ],
      trustHeading: "Her rehber onaylıdır",
      trustText: "İstanbul'daki tüm VibeGuide tur rehberleri T.C. Kültür ve Turizm Bakanlığı'nın resmî lisansına sahiptir, kimlik doğrulamasından geçer ve her turdan sonra değerlendirilir.",
      trustBadges: ["🪪 Kültür Bakanlığı lisanslı", "✅ Kimlik doğrulandı", "⭐ 4,9 ortalama puan", "🚫 Sıfır tolerans politikası"],
      faqHeading: "Sıkça sorulan sorular",
      faqs: [
        { q: "İstanbul'da bir tur rehberi ne kadar tutar?", a: "Fiyatlar tur türüne ve süresine göre değişir. VibeGuide ile rezervasyondan önce tam fiyatı görürsünüz — İstanbul'daki çoğu yarım günlük özel tur, gizli ücret olmadan kişi başı sabit bir fiyatla başlar. Grup turları (VibeSquad) en uygun seçenektir." },
        { q: "VibeGuide'ın İstanbul rehberleri lisanslı mı?", a: "Evet. VibeGuide'daki her rehber T.C. Kültür ve Turizm Bakanlığı'nın resmî lisansına sahiptir, kimlik doğrulamasından geçer ve her turdan sonra değerlendirilir. Lisanssız rehberliğe karşı sıfır tolerans politikamız vardır." },
        { q: "İstanbul turuna başlamak için en iyi bölge neresi?", a: "İlk kez gelenlerin çoğu, hepsi yürüme mesafesindeki Ayasofya, Sultanahmet Camii, Topkapı Sarayı ve Kapalıçarşı'ya ev sahipliği yapan tarihi yarımada Sultanahmet'ten başlar. Rehberiniz ilgi alanlarınıza göre Balat, Galata, Karaköy ya da Boğaz çevresinde de bir rota kurabilir." },
        { q: "Aynı gün için rehber ayırtabilir miyim?", a: "Evet. VibeNow ile yaklaşık 60 saniyede müsait bir yerel rehberle eşleşir ve dakikalar içinde bulunduğunuz yerde buluşabilirsiniz — önceden rezervasyon gerekmez. Dilerseniz özel bir turu önceden de planlayabilirsiniz." },
        { q: "Rehberler İngilizce konuşuyor mu?", a: "Evet. VibeGuide'daki çoğu İstanbul rehberi İngilizce konuşur; birçoğu ayrıca Almanca, Rusça, Fransızca, İspanyolca, Arapça ve başka dillerde de tur yapar. Tur seçerken dile göre filtreleyebilirsiniz." },
        { q: "İstanbul'u rehberle mi yoksa yalnız mı gezmek daha iyi?", a: "İstanbul yerel bilgiyi ödüllendirir. Lisanslı bir rehber sıraları atlamanıza, turist tuzağı restoranlardan kaçınmanıza, her yerin gerçek tarihini anlamanıza ve çoğu ziyaretçinin hiç ulaşamadığı semtleri keşfetmenize yardımcı olur — böylece bir yapılacaklar listesi gerçek bir deneyime dönüşür." },
        { q: "İstanbul için kaç gün gerekir?", a: "İki-üç gün öne çıkanları kapsar — Sultanahmet (Ayasofya, Sultanahmet Camii, Topkapı), Kapalıçarşı ve bir Boğaz turu. Dört ya da daha fazla günde Balat'ı, Anadolu yakasını (Kadıköy) ve günübirlik gezileri ekleyebilirsiniz. Yerel bir rehber, elinizdeki süreyi en verimli şekilde değerlendirmenize yardımcı olur." },
        { q: "İstanbul'u ziyaret etmek için en iyi zaman ne?", a: "Nisan–Mayıs ile Eylül–Ekim ılıman hava ve daha az kalabalık sunar. Yaz sıcak ve yoğundur; kış daha serin ama atmosferik ve daha ekonomiktir. Mevsim ne olursa olsun, yerel bir rehber büyük noktaları gezmek için en sakin saatleri bilir." },
        { q: "İstanbul'da özel tur rehberini nasıl bulurum?", a: "VibeGuide uygulamasını açın, Özel Tur'u seçin, onaylı bir yerel rehber ile tarihinizi belirleyin, hazırsınız. Fiyatı önceden görür ve gün gelmeden rehberinizle mesajlaşabilirsiniz. Anlık bir şey isterseniz VibeNow sizi yaklaşık 60 saniyede müsait bir rehberle eşleştirir." },
        { q: "İstanbul turları aileler ve çocuklar için uygun mu?", a: "Evet. Özel rehberler tempo ve içeriği çocuklara, yaşlılara ve karma gruplara göre uyarlar — daha kısa rotalar, atıştırma molaları ve çocukların gerçekten keyif aldığı hikâyeler. Kimlerin geleceğini rehberinize söylemeniz yeterli." },
        { q: "İstanbul rehberime bahşiş vermem gerekir mi?", a: "Bahşiş zorunlu değildir — gördüğünüz fiyat turu kapsar. Çok keyif aldıysanız bir bahşiş memnuniyetle karşılanır, ancak her zaman isteğe bağlıdır ve asla beklenmez." },
      ],
      landmarksHeading: "İstanbul'un başlıca simgeleri",
      landmarksSub: "Her birini onaylı bir yerel rehberle keşfedin.",
      landmarks: [
        { href: "/attractions/tr/hagia-sophia", icon: "🕌", name: "Ayasofya", desc: "Bizans katedralinden Osmanlı camisine" },
        { href: "/attractions/tr/blue-mosque", icon: "🕌", name: "Sultanahmet Camii", desc: "Altı minare ve 20.000 İznik çinisi" },
        { href: "/attractions/tr/topkapi-palace", icon: "🏰", name: "Topkapı Sarayı", desc: "Osmanlı İmparatorluğu'nun kalbi" },
        { href: "/attractions/tr/basilica-cistern", icon: "🏛️", name: "Yerebatan Sarnıcı", desc: "Yer altındaki su sarayı" },
      ],
      otherHeading: "Türkiye'yi keşfetmeye devam edin",
      otherCities: [
        { href: "/tr/cappadocia-tour-guide", icon: "🎈", name: "Kapadokya Tur Rehberi", desc: "Sıcak hava balonları, peri bacaları ve kaya kiliseleri" },
        { href: "/tr/ephesus-tour-guide", icon: "🏛️", name: "Efes Tur Rehberi", desc: "Selçuk, İzmir yakınlarındaki antik Roma kalıntıları" },
      ],
      ctaTitle: "İstanbul'u keşfetmeye hazır mısınız?",
      ctaSub: "VibeGuide'ı ücretsiz indirin. 60 saniyede yerel bir rehber bulun.",
      ctaAvailability: "Ücretsiz · Abonelik yok · İstanbul şimdi müsait",
    },
    pl: {
      metaTitle: "Przewodnik po Stambule — Zarezerwuj Lokalnego Eksperta",
      metaDescription:
        "Znajdź zweryfikowanego lokalnego przewodnika w Stambule. Zwiedzaj Hagia Sophia, Pałac Topkapı, Wielki Bazar, Balat i Bosfor z prawdziwym mieszkańcem — od ręki lub z wyprzedzeniem.",
      ogDescription:
        "Zweryfikowani lokalni przewodnicy po Stambule. Błyskawiczne dopasowanie, wycieczki grupowe lub prywatne całodniowe doświadczenia. Żadnych pułapek na turystów.",
      keywords: [
        "przewodnik Stambuł", "lokalny przewodnik Stambuł", "prywatny przewodnik Stambuł",
        "wycieczka po Stambule", "zwiedzanie Stambułu z przewodnikiem", "przewodnik Hagia Sophia",
        "przewodnik Wielki Bazar", "wycieczka Pałac Topkapı", "rejs po Bosforze", "przewodnik Sułtanahmet",
      ],
      region: "Stambuł · Turcja",
      h1: "Przewodnik po Stambule",
      h1Accent: "Znajdź Swojego Lokalnego Eksperta",
      heroLead:
        "Omiń pułapki na turystów. Zwiedzaj Stambuł ze zweryfikowanym lokalnym przewodnikiem, który zna ukryte uliczki, prawdziwe historie i najlepsze jedzenie — od Sułtanahmet po Balat.",
      ctaPrimary: "Zarezerwuj Przewodnika →",
      ctaSecondary: "Zobacz Opcje Wycieczek",
      highlightsKicker: "Najważniejsze Miejsca",
      highlightsHeading: "Co pokaże Ci Twój przewodnik",
      highlights: [
        { icon: "🕌", name: "Hagia Sophia", desc: "1500 lat historii — bizantyjska katedra przekształcona w osmański meczet." },
        { icon: "🏰", name: "Pałac Topkapı", desc: "Serce Imperium Osmańskiego, z widokiem na Bosfor." },
        { icon: "🛍️", name: "Wielki Bazar", desc: "Ponad 4000 sklepów w najstarszym krytym targu świata — poruszaj się po nim jak miejscowy." },
        { icon: "🎨", name: "Balat i Fener", desc: "Kolorowe uliczki, grecka prawosławna historia i ukryte kawiarnie." },
        { icon: "⛵", name: "Bosfor", desc: "Tam, gdzie Europa spotyka Azję — cieśnina, która ukształtowała cywilizacje." },
        { icon: "🕌", name: "Błękitny Meczet", desc: "Sześć minaretów, 20 000 płytek z İzniku i jedna z najbardziej ikonicznych panoram Stambułu." },
      ],
      seoHeading: "Dlaczego warto zwiedzać Stambuł z lokalnym przewodnikiem?",
      seoParagraphs: [
        "Stambuł to miasto warstw — imperia rzymskie, bizantyjskie i osmańskie odcisnęły swój ślad na tych samych ulicach. Dwa kontynenty, trzy nazwy (Bizancjum, Konstantynopol, Stambuł) i ponad 2500 lat historii skupionych w jednej niezwykłej panoramie. Dla kogoś, kto przyjeżdża po raz pierwszy, sama skala miasta bywa przytłaczająca, a najbardziej urzekające zakątki rzadko są tymi z przewodników.",
        "I tu wszystko zmienia <strong>licencjonowany przewodnik po Stambule</strong>. Zamiast stać na ślepo w kolejce do <strong>Hagia Sophia</strong> albo gubić się wśród 4000 sklepów <strong>Wielkiego Bazaru</strong>, idziesz z kimś, kto wie, które wejście jest najszybsze, który sprzedawca dywanów jest uczciwy i która mała lokanta serwuje najlepszy kebab İskender. Dobry przewodnik nie tylko pokaże Ci <strong>Błękitny Meczet</strong> i <strong>Pałac Topkapı</strong> — opowie historie, które ożywiają te miejsca.",
        "VibeGuide łączy Cię ze zweryfikowanymi lokalnymi przewodnikami w najbardziej kultowych dzielnicach Stambułu. Zwiedź historyczny półwysep <strong>Sułtanahmet</strong>, przespaceruj się kolorowymi uliczkami <strong>Balatu i Feneru</strong>, wejdź na <strong>Wieżę Galata</strong>, by podziwiać najlepszy widok na Złoty Róg, albo popłyń po <strong>Bosforze</strong>, gdzie Europa spotyka Azję. Niezależnie od tego, czy masz dwie godziny, czy dwa dni — przewodnik ułoży trasę wokół Ciebie.",
        "Każdy przewodnik na naszej platformie posiada licencję tureckiego Ministerstwa Kultury i Turystyki, ma zweryfikowaną tożsamość i jest oceniany po każdej wycieczce — możesz więc zwiedzać z pełnym spokojem. Żadnych pułapek na turystów, żadnych wyuczonych formułek, żadnej presji. Po prostu prawdziwy mieszkaniec, który pokazuje Ci swoje miasto.",
      ],
      modesKicker: "Jak to działa",
      modesHeading: "Trzy sposoby na zwiedzanie Stambułu",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Dopasowanie w 60 sekund", text: "Otwórz aplikację, dotknij VibeNow, a zweryfikowany lokalny przewodnik spotka się z Tobą w Twoim miejscu w kilka minut. Bez rezerwacji, bez czekania." },
        { tag: "VibeSquad", color: C.squad, title: "Dołącz do grupy", text: "Tanio, towarzysko, na luzie. Dołącz do grupy, która właśnie teraz zwiedza Stambuł — poznaj po drodze innych podróżników." },
        { tag: "Private Tour", color: C.private, title: "Zaplanuj swój idealny dzień", text: "Zarezerwuj prywatnego przewodnika na pół dnia lub cały dzień, w pełni dopasowanego do Twoich zainteresowań i tempa." },
      ],
      trustHeading: "Każdy przewodnik jest zweryfikowany",
      trustText: "Wszyscy przewodnicy VibeGuide w Stambule posiadają oficjalne licencje tureckiego Ministerstwa Kultury, przechodzą weryfikację tożsamości i są oceniani po każdej wycieczce.",
      trustBadges: ["🪪 Licencja Ministerstwa Kultury", "✅ Zweryfikowana tożsamość", "⭐ Śr. ocena 4,9", "🚫 Polityka zero tolerancji"],
      faqHeading: "Najczęściej zadawane pytania",
      faqs: [
        { q: "Ile kosztuje przewodnik w Stambule?", a: "Ceny zależą od rodzaju i długości wycieczki. Dzięki VibeGuide widzisz dokładną cenę jeszcze przed rezerwacją — większość prywatnych półdniowych wycieczek po Stambule zaczyna się od stałej stawki za osobę, bez ukrytych opłat. Wycieczki grupowe (VibeSquad) to najtańsza opcja." },
        { q: "Czy przewodnicy VibeGuide w Stambule są licencjonowani?", a: "Tak. Każdy przewodnik w VibeGuide posiada oficjalną licencję tureckiego Ministerstwa Kultury i Turystyki, przechodzi weryfikację tożsamości i jest oceniany po każdej wycieczce. Stosujemy politykę zero tolerancji wobec nielicencjonowanego przewodnictwa." },
        { q: "Od której dzielnicy najlepiej zacząć zwiedzanie Stambułu?", a: "Większość osób odwiedzających miasto po raz pierwszy zaczyna od Sułtanahmet (historycznego półwyspu), gdzie znajdują się Hagia Sophia, Błękitny Meczet, Pałac Topkapı i Wielki Bazar — wszystko w zasięgu spaceru. Przewodnik może też ułożyć trasę wokół Balatu, Galaty, Karaköy lub Bosforu, zależnie od Twoich zainteresowań." },
        { q: "Czy mogę zarezerwować przewodnika na ten sam dzień?", a: "Tak. Dzięki VibeNow dopasujesz się do dostępnego lokalnego przewodnika w około 60 sekund i spotkasz się z nim w swoim miejscu w kilka minut — bez wcześniejszej rezerwacji. Możesz też zaplanować prywatną wycieczkę z wyprzedzeniem." },
        { q: "Czy przewodnicy mówią po angielsku?", a: "Tak. Większość przewodników w Stambule w VibeGuide mówi po angielsku, a wielu oferuje też wycieczki po niemiecku, rosyjsku, francusku, hiszpańsku, arabsku i w innych językach. Wybierając wycieczkę, możesz filtrować według języka." },
        { q: "Czy lepiej zwiedzać Stambuł z przewodnikiem, czy samodzielnie?", a: "Stambuł nagradza lokalną wiedzę. Licencjonowany przewodnik pomaga ominąć kolejki, uniknąć restauracji będących pułapkami na turystów, zrozumieć prawdziwą historię każdego miejsca i odkryć dzielnice, do których większość odwiedzających nigdy nie dociera — zamieniając listę atrakcji do odhaczenia w prawdziwe przeżycie." },
        { q: "Ile dni potrzeba na Stambuł?", a: "Dwa–trzy dni wystarczą na największe atrakcje — Sułtanahmet (Hagia Sophia, Błękitny Meczet, Topkapı), Wielki Bazar i rejs po Bosforze. Przy czterech lub więcej dniach możesz dodać Balat, azjatycką stronę (Kadıköy) i wycieczki jednodniowe. Lokalny przewodnik pomoże Ci maksymalnie wykorzystać każdy dzień." },
        { q: "Jaka jest najlepsza pora na wizytę w Stambule?", a: "Kwiecień–maj oraz wrzesień–październik oferują łagodną pogodę i mniejsze tłumy. Lato jest gorące i zatłoczone; zima chłodniejsza, ale klimatyczna i tańsza. Bez względu na porę roku lokalny przewodnik zna najspokojniejsze godziny na zwiedzanie najważniejszych zabytków." },
        { q: "Jak zdobyć prywatnego przewodnika w Stambule?", a: "Otwórz aplikację VibeGuide, wybierz Prywatną Wycieczkę, wskaż zweryfikowanego lokalnego przewodnika i datę — gotowe. Cenę zobaczysz z góry, a z przewodnikiem możesz napisać jeszcze przed wyznaczonym dniem. Jeśli szukasz czegoś spontanicznego, VibeNow dopasuje Ci dostępnego przewodnika w około 60 sekund." },
        { q: "Czy wycieczki po Stambule są odpowiednie dla rodzin z dziećmi?", a: "Tak. Prywatni przewodnicy dostosowują tempo i treść do dzieci, seniorów i mieszanych grup — krótsze trasy, przystanki na przekąskę i historie, które naprawdę bawią dzieci. Wystarczy powiedzieć przewodnikowi, kto bierze udział." },
        { q: "Czy muszę dawać napiwek przewodnikowi w Stambule?", a: "Napiwek nie jest wymagany — cena, którą widzisz, obejmuje całą wycieczkę. Jeśli świetnie się bawiłeś, napiwek będzie mile widziany, ale zawsze pozostaje dobrowolny i nigdy nie jest oczekiwany." },
      ],
      otherHeading: "Odkryj więcej Turcji",
      otherCities: [
        { href: "/pl/cappadocia-tour-guide", icon: "🎈", name: "Przewodnik po Kapadocji", desc: "Balony na ogrzane powietrze, kominy wróżek i kościoły w skałach" },
        { href: "/pl/ephesus-tour-guide", icon: "🏛️", name: "Przewodnik po Efezie", desc: "Starożytne rzymskie ruiny koło Selçuk, Izmir" },
      ],
      ctaTitle: "Gotów, by odkryć Stambuł?",
      ctaSub: "Pobierz VibeGuide za darmo. Znajdź lokalnego przewodnika w 60 sekund.",
      ctaAvailability: "Za darmo · Bez abonamentu · Stambuł dostępny już teraz",
    },
    nl: {
      metaTitle: "Reisgids Istanboel — Boek een Lokale Expert",
      metaDescription:
        "Vind een geverifieerde lokale gids in Istanboel. Ontdek de Hagia Sophia, het Topkapipaleis, de Grote Bazaar, Balat en de Bosporus met een echte local — direct of gepland.",
      ogDescription:
        "Geverifieerde lokale gidsen voor Istanboel. Directe matching, groepstours of privé-dagtochten. Geen toeristenvallen.",
      keywords: [
        "gids Istanboel", "lokale gids Istanboel", "privégids Istanboel",
        "rondleiding Istanboel", "wandeltour Istanboel", "Hagia Sophia rondleiding",
        "Grote Bazaar gids", "Topkapipaleis tour", "Bosporus tour", "Sultanahmet gids",
      ],
      region: "Istanboel · Turkije",
      h1: "Reisgids Istanboel",
      h1Accent: "Vind jouw lokale expert",
      heroLead:
        "Vermijd de toeristenvallen. Ontdek Istanboel met een geverifieerde lokale gids die de verborgen straatjes, de echte verhalen en het beste eten kent — van Sultanahmet tot Balat.",
      ctaPrimary: "Boek nu een gids →",
      ctaSecondary: "Bekijk de touropties",
      highlightsKicker: "Topbestemmingen",
      highlightsHeading: "Wat je gids je laat zien",
      highlights: [
        { icon: "🕌", name: "Hagia Sophia", desc: "1.500 jaar geschiedenis — een Byzantijnse kathedraal die een Ottomaanse moskee werd." },
        { icon: "🏰", name: "Topkapipaleis", desc: "Het hart van het Ottomaanse Rijk, met uitzicht over de Bosporus." },
        { icon: "🛍️", name: "Grote Bazaar", desc: "Meer dan 4.000 winkels in de oudste overdekte markt ter wereld — vind je weg als een local." },
        { icon: "🎨", name: "Balat & Fener", desc: "Kleurrijke straatjes, Grieks-orthodoxe geschiedenis en verborgen cafés." },
        { icon: "⛵", name: "Bosporus", desc: "Waar Europa Azië ontmoet — een zeestraat die beschavingen heeft gevormd." },
        { icon: "🕌", name: "Blauwe Moskee", desc: "Zes minaretten, 20.000 İznik-tegels en een van de meest iconische skylines van Istanboel." },
      ],
      seoHeading: "Waarom Istanboel ontdekken met een lokale gids?",
      seoParagraphs: [
        "Istanboel is een stad van lagen — het Romeinse, Byzantijnse en Ottomaanse rijk drukten allemaal hun stempel op dezelfde straten. Twee continenten, drie namen (Byzantium, Constantinopel, Istanboel) en ruim 2.500 jaar geschiedenis komen samen in één buitengewone skyline. Voor wie er voor het eerst komt, kan de pure omvang overweldigend zijn, en de mooiste plekjes staan zelden in de reisgidsen.",
        "Daar maakt een <strong>erkende gids in Istanboel</strong> het verschil. In plaats van blind in de rij te staan bij de <strong>Hagia Sophia</strong> of te verdwalen tussen de 4.000 winkels van de <strong>Grote Bazaar</strong>, loop je met iemand die weet welke ingang het snelst is, welke tapijtverkoper eerlijk is en welke kleine lokanta de beste İskender kebab serveert. Een goede gids laat je niet alleen de <strong>Blauwe Moskee</strong> en het <strong>Topkapipaleis</strong> zien — hij vertelt de verhalen die ze tot leven brengen.",
        "VibeGuide brengt je in contact met geverifieerde lokale gidsen in de meest iconische wijken van Istanboel. Verken het historische schiereiland <strong>Sultanahmet</strong>, dwaal door de kleurrijke straten van <strong>Balat en Fener</strong>, klim naar de <strong>Galatatoren</strong> voor het beste uitzicht op de Gouden Hoorn, of vaar over de <strong>Bosporus</strong> waar Europa Azië ontmoet. Of je nu twee uur of twee dagen hebt, je gids bouwt de route om jou heen.",
        "Elke gids op ons platform is erkend door het Turkse Ministerie van Cultuur en Toerisme, is geïdentificeerd en wordt na elke tour beoordeeld — zodat je met een volledig gerust hart op pad gaat. Geen toeristenvallen, geen ingestudeerde praatjes, geen druk. Gewoon een echte local die je zijn stad laat zien.",
      ],
      modesKicker: "Zo werkt het",
      modesHeading: "Drie manieren om Istanboel te ontdekken",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Match in 60 seconden", text: "Open de app, tik op VibeNow en een geverifieerde lokale gids ontmoet je binnen enkele minuten op je locatie. Geen boeking, geen wachten." },
        { tag: "VibeSquad", color: C.squad, title: "Sluit je aan bij een groep", text: "Betaalbaar, gezellig en leuk. Sluit je aan bij een groep die Istanboel nú ontdekt — en leer onderweg medereizigers kennen." },
        { tag: "Private Tour", color: C.private, title: "Plan jouw perfecte dag", text: "Boek een privégids voor een halve of hele dag, volledig afgestemd op jouw interesses en tempo." },
      ],
      trustHeading: "Elke gids is geverifieerd",
      trustText: "Alle VibeGuide-gidsen in Istanboel beschikken over een officiële licentie van het Turkse Ministerie van Cultuur, doorlopen een identiteitscontrole en worden na elke tour beoordeeld.",
      trustBadges: ["🪪 Erkend door het Ministerie van Cultuur", "✅ Identiteit geverifieerd", "⭐ 4,9 gemiddelde score", "🚫 Zerotolerancebeleid"],
      faqHeading: "Veelgestelde vragen",
      faqs: [
        { q: "Wat kost een gids in Istanboel?", a: "De prijzen verschillen per type tour en duur. Met VibeGuide zie je de exacte prijs vóór je boekt — de meeste privétours van een halve dag in Istanboel beginnen bij een vast tarief per persoon, zonder verborgen kosten. Groepstours (VibeSquad) zijn de voordeligste optie." },
        { q: "Zijn de gidsen van VibeGuide in Istanboel erkend?", a: "Ja. Elke gids op VibeGuide beschikt over een officiële licentie van het Turkse Ministerie van Cultuur en Toerisme, doorloopt een identiteitscontrole en wordt na elke tour beoordeeld. We hanteren een zerotolerancebeleid voor gidsen zonder licentie." },
        { q: "Wat is de beste plek om een tour door Istanboel te beginnen?", a: "De meeste eerste bezoekers starten in Sultanahmet (het historische schiereiland), met de Hagia Sophia, de Blauwe Moskee, het Topkapipaleis en de Grote Bazaar — allemaal op loopafstand. Je gids kan de route ook opbouwen rond Balat, Galata, Karaköy of de Bosporus, afhankelijk van je interesses." },
        { q: "Kan ik een gids voor dezelfde dag boeken?", a: "Ja. Met VibeNow vind je in ongeveer 60 seconden een beschikbare lokale gids die je binnen enkele minuten op je locatie ontmoet — zonder van tevoren te boeken. Je kunt een privétour ook vooraf inplannen." },
        { q: "Spreken de gidsen Engels?", a: "Ja. De meeste gidsen in Istanboel op VibeGuide spreken Engels, en velen bieden ook tours aan in het Duits, Russisch, Frans, Spaans, Arabisch en andere talen. Bij het kiezen van een tour kun je filteren op taal." },
        { q: "Is het beter om Istanboel met een gids of alleen te ontdekken?", a: "Istanboel beloont lokale kennis. Een erkende gids helpt je rijen te vermijden, om toeristenval-restaurants heen te navigeren, de echte geschiedenis achter elke plek te begrijpen en wijken te ontdekken die de meeste bezoekers nooit bereiken — zo wordt een afvinklijstje een echte ervaring." },
        { q: "Hoeveel dagen heb je nodig in Istanboel?", a: "Twee à drie dagen dekken de hoogtepunten — Sultanahmet (Hagia Sophia, Blauwe Moskee, Topkapı), de Grote Bazaar en een tocht over de Bosporus. Met vier dagen of meer kun je Balat, de Aziatische kant (Kadıköy) en dagtochten toevoegen. Een lokale gids helpt je het meeste uit je tijd te halen." },
        { q: "Wat is de beste tijd om Istanboel te bezoeken?", a: "April–mei en september–oktober bieden mild weer en minder drukte. De zomer is heet en druk; de winter is koeler, maar sfeervol en goedkoper. Welk seizoen het ook is, een lokale gids kent de rustigste uren om de grote bezienswaardigheden te bezoeken." },
        { q: "Hoe krijg ik een privégids in Istanboel?", a: "Open de VibeGuide-app, kies Private Tour, selecteer een geverifieerde lokale gids en je datum, en je bent klaar. Je ziet de prijs vooraf en kunt je gids vóór de dag zelf een bericht sturen. Voor iets spontaans matcht VibeNow je in ongeveer 60 seconden met een beschikbare gids." },
        { q: "Zijn tours in Istanboel geschikt voor gezinnen en kinderen?", a: "Ja. Privégidsen stemmen het tempo en de inhoud af op kinderen, senioren en gemengde groepen — kortere routes, tussenstops voor een hapje en verhalen waar kinderen echt van genieten. Vertel je gids gewoon wie er meekomt." },
        { q: "Moet ik mijn gids in Istanboel een fooi geven?", a: "Een fooi is niet verplicht — de prijs die je ziet, dekt de tour. Als je een geweldige tijd had, wordt een fooi gewaardeerd, maar die is altijd vrijblijvend en wordt nooit verwacht." },
      ],
      otherHeading: "Ontdek meer van Turkije",
      otherCities: [
        { href: "/nl/cappadocia-tour-guide", icon: "🎈", name: "Reisgids Cappadocië", desc: "Luchtballonnen, sprookjesschoorstenen & rotskerken" },
        { href: "/nl/ephesus-tour-guide", icon: "🏛️", name: "Reisgids Efeze", desc: "Antieke Romeinse ruïnes bij Selçuk, İzmir" },
      ],
      ctaTitle: "Klaar om Istanboel te ontdekken?",
      ctaSub: "Download VibeGuide gratis. Vind een lokale gids in 60 seconden.",
      ctaAvailability: "Gratis · Geen abonnement · Istanboel nu beschikbaar",
    },
    de: {
      metaTitle: "Istanbul Reiseführer — Lokalen Experten buchen",
      metaDescription:
        "Finde einen verifizierten lokalen Reiseführer in Istanbul. Entdecke Hagia Sophia, Topkapı-Palast, Großen Basar, Balat und den Bosporus mit einem echten Einheimischen — sofort oder geplant.",
      ogDescription:
        "Verifizierte lokale Guides für Istanbul. Sofortige Vermittlung, Gruppentouren oder private Ganztagestouren. Keine Touristenfallen.",
      keywords: [
        "Istanbul Reiseführer", "lokaler Guide Istanbul", "private Tour Istanbul",
        "Istanbul Stadtführung", "Hagia Sophia Tour", "Großer Basar Führung",
        "Topkapı Palast Tour", "Bosporus Tour", "Sultanahmet Reiseführer", "Balat Tour",
      ],
      region: "Istanbul · Türkei",
      h1: "Istanbul Reiseführer",
      h1Accent: "Finde deinen lokalen Experten",
      heroLead:
        "Umgehe die Touristenfallen. Entdecke Istanbul mit einem verifizierten lokalen Guide, der die versteckten Gassen, echten Geschichten und das beste Essen kennt — von Sultanahmet bis Balat.",
      ctaPrimary: "Jetzt Guide buchen →",
      ctaSecondary: "Touroptionen ansehen",
      highlightsKicker: "Top-Ziele",
      highlightsHeading: "Was dein Guide dir zeigt",
      highlights: [
        { icon: "🕌", name: "Hagia Sophia", desc: "1.500 Jahre Geschichte — von der byzantinischen Kathedrale zur osmanischen Moschee." },
        { icon: "🏰", name: "Topkapı-Palast", desc: "Das Herz des Osmanischen Reichs mit Blick auf den Bosporus." },
        { icon: "🛍️", name: "Großer Basar", desc: "Über 4.000 Geschäfte im ältesten überdachten Markt der Welt — navigiere wie ein Einheimischer." },
        { icon: "🎨", name: "Balat & Fener", desc: "Bunte Straßen, griechisch-orthodoxe Geschichte und versteckte Cafés." },
        { icon: "⛵", name: "Bosporus", desc: "Wo Europa auf Asien trifft — eine Meerenge, die Zivilisationen prägte." },
        { icon: "🕌", name: "Blaue Moschee", desc: "Sechs Minarette, 20.000 İznik-Fliesen und eine der ikonischsten Silhouetten Istanbuls." },
      ],
      seoHeading: "Warum Istanbul mit einem lokalen Guide entdecken?",
      seoParagraphs: [
        "Istanbul ist eine Stadt der Schichten — römische, byzantinische und osmanische Reiche hinterließen ihre Spuren in denselben Straßen. Zwei Kontinente, drei Namen (Byzanz, Konstantinopel, Istanbul) und mehr als 2.500 Jahre Geschichte verdichten sich zu einer außergewöhnlichen Skyline. Für Erstbesucher kann die schiere Größe überwältigend sein, und die lohnendsten Ecken stehen selten im Reiseführer.",
        "Genau hier macht ein <strong>lizenzierter Istanbul-Reiseführer</strong> den Unterschied. Statt blind an der <strong>Hagia Sophia</strong> anzustehen oder dich in den 4.000 Läden des <strong>Großen Basars</strong> zu verlieren, gehst du mit jemandem, der den schnellsten Eingang kennt, weiß welcher Teppichhändler ehrlich ist und welches kleine Lokanta das beste İskender-Kebab serviert. Ein guter Guide zeigt dir nicht nur die <strong>Blaue Moschee</strong> und den <strong>Topkapı-Palast</strong> — er erzählt die Geschichten, die sie lebendig machen.",
        "VibeGuide verbindet dich mit verifizierten lokalen Guides in den ikonischsten Vierteln Istanbuls. Erkunde die historische Halbinsel <strong>Sultanahmet</strong>, schlendere durch die bunten Straßen von <strong>Balat und Fener</strong>, steige zum <strong>Galata-Turm</strong> für den besten Blick aufs Goldene Horn oder fahre über den <strong>Bosporus</strong>, wo Europa auf Asien trifft. Ob zwei Stunden oder zwei Tage — dein Guide baut die Route um dich herum.",
        "Jeder Guide auf unserer Plattform ist vom türkischen Kultusministerium lizenziert, identitätsgeprüft und wird nach jeder Tour bewertet — damit du mit vollem Vertrauen unterwegs bist. Keine Touristenfallen, keine auswendig gelernten Reden, kein Druck. Nur ein echter Einheimischer, der dir seine Stadt zeigt.",
      ],
      modesKicker: "So funktioniert's",
      modesHeading: "Drei Wege, Istanbul zu entdecken",
      modes: [
        { tag: "VibeNow", color: C.now, title: "In 60 Sekunden vermittelt", text: "App öffnen, VibeNow tippen, und ein verifizierter lokaler Guide trifft dich in Minuten an deinem Standort. Keine Buchung, kein Warten." },
        { tag: "VibeSquad", color: C.squad, title: "Einer Gruppe beitreten", text: "Günstig, gesellig, unterhaltsam. Schließe dich einer Gruppe an, die Istanbul gerade jetzt erkundet — lerne andere Reisende kennen." },
        { tag: "Private Tour", color: C.private, title: "Plane deinen perfekten Tag", text: "Buche einen privaten Guide für eine halbtägige oder ganztägige Tour, voll auf deine Interessen und dein Tempo zugeschnitten." },
      ],
      trustHeading: "Jeder Guide ist verifiziert",
      trustText: "Alle VibeGuide-Reiseführer in Istanbul besitzen offizielle Lizenzen des türkischen Kultusministeriums, durchlaufen eine Identitätsprüfung und werden nach jeder Tour bewertet.",
      trustBadges: ["🪪 Lizenziert vom Kultusministerium", "✅ Identität geprüft", "⭐ 4,9 Ø-Bewertung", "🚫 Null-Toleranz-Politik"],
      faqHeading: "Häufig gestellte Fragen",
      faqs: [
        { q: "Wie viel kostet ein Reiseführer in Istanbul?", a: "Die Preise richten sich nach Tourart und Dauer. Mit VibeGuide siehst du den genauen Preis schon vor der Buchung — die meisten privaten Halbtagestouren in Istanbul beginnen bei einem festen Preis pro Person, ohne versteckte Gebühren. Gruppentouren (VibeSquad) sind die günstigste Option." },
        { q: "Sind die Istanbul-Guides von VibeGuide lizenziert?", a: "Ja. Jeder Guide bei VibeGuide besitzt eine offizielle Lizenz des türkischen Ministeriums für Kultur und Tourismus, durchläuft eine Identitätsprüfung und wird nach jeder Tour bewertet. Für unlizenzierte Führungen gilt bei uns eine Null-Toleranz-Politik." },
        { q: "Wo beginnt man eine Istanbul-Tour am besten?", a: "Die meisten Erstbesucher starten in Sultanahmet (der historischen Halbinsel) mit der Hagia Sophia, der Blauen Moschee, dem Topkapı-Palast und dem Großen Basar — alles fußläufig erreichbar. Dein Guide kann die Route je nach Interesse auch rund um Balat, Galata, Karaköy oder den Bosporus gestalten." },
        { q: "Kann ich einen Guide für denselben Tag buchen?", a: "Ja. Mit VibeNow findest du in etwa 60 Sekunden einen verfügbaren lokalen Guide, der dich innerhalb weniger Minuten an deinem Standort trifft — ganz ohne Vorausbuchung. Du kannst eine Privattour aber auch im Voraus planen." },
        { q: "Sprechen die Guides Englisch?", a: "Ja. Die meisten Istanbul-Guides bei VibeGuide sprechen Englisch, und viele bieten Touren auch auf Deutsch, Russisch, Französisch, Spanisch, Arabisch und in weiteren Sprachen an. Bei der Tourauswahl kannst du nach Sprache filtern." },
        { q: "Ist es besser, Istanbul mit einem Guide oder allein zu erkunden?", a: "Istanbul belohnt lokales Wissen. Ein lizenzierter Guide hilft dir, Warteschlangen zu umgehen, Touristenfallen zu meiden, die wahre Geschichte hinter jedem Ort zu verstehen und Viertel zu entdecken, die die meisten Besucher nie erreichen — so wird aus einer Checkliste ein echtes Erlebnis." },
        { q: "Wie viele Tage braucht man in Istanbul?", a: "Zwei bis drei Tage decken die Höhepunkte ab — Sultanahmet (Hagia Sophia, Blaue Moschee, Topkapı), den Großen Basar und eine Bosporus-Fahrt. Mit vier oder mehr Tagen kannst du Balat, die asiatische Seite (Kadıköy) und Tagesausflüge ergänzen. Ein lokaler Guide hilft dir, das Beste aus deiner Zeit zu machen." },
        { q: "Wann ist die beste Reisezeit für Istanbul?", a: "April–Mai und September–Oktober bieten mildes Wetter und weniger Andrang. Der Sommer ist heiß und belebt; der Winter ist kühler, aber stimmungsvoll und günstiger. Egal zu welcher Jahreszeit — ein lokaler Guide kennt die ruhigsten Stunden für den Besuch der wichtigsten Sehenswürdigkeiten." },
        { q: "Wie bekomme ich einen privaten Reiseführer in Istanbul?", a: "Öffne die VibeGuide-App, wähle Privattour, suche einen verifizierten lokalen Guide und dein Datum aus — fertig. Du siehst den Preis im Voraus und kannst deinem Guide schon vorher schreiben. Für etwas Spontanes findet VibeNow in etwa 60 Sekunden einen verfügbaren Guide." },
        { q: "Sind Istanbul-Touren für Familien und Kinder geeignet?", a: "Ja. Private Guides passen Tempo und Inhalte an Kinder, Senioren und gemischte Gruppen an — kürzere Routen, Snackpausen und Geschichten, die Kindern wirklich gefallen. Sag deinem Guide einfach, wer dabei ist." },
        { q: "Muss ich meinem Istanbul-Guide Trinkgeld geben?", a: "Trinkgeld ist nicht erforderlich — der angezeigte Preis deckt die Tour ab. Wenn es dir gefallen hat, ist ein Trinkgeld willkommen, aber immer freiwillig und nie erwartet." },
      ],
      landmarksHeading: "Top-Sehenswürdigkeiten in Istanbul",
      landmarksSub: "Entdecke jede mit einem verifizierten lokalen Guide.",
      landmarks: [
        { href: "/attractions/de/hagia-sophia", icon: "🕌", name: "Hagia Sophia", desc: "Byzantinische Kathedrale, dann osmanische Moschee" },
        { href: "/attractions/de/blue-mosque", icon: "🕌", name: "Blaue Moschee", desc: "Sechs Minarette & 20.000 İznik-Fliesen" },
        { href: "/attractions/de/topkapi-palace", icon: "🏰", name: "Topkapı-Palast", desc: "Herz des Osmanischen Reichs" },
        { href: "/attractions/de/basilica-cistern", icon: "🏛️", name: "Cisterna Basilica", desc: "Unterirdischer Wasserpalast" },
      ],
      otherHeading: "Mehr von der Türkei entdecken",
      otherCities: [
        { href: "/de/cappadocia-tour-guide", icon: "🎈", name: "Kappadokien Reiseführer", desc: "Heißluftballons, Feenkamine & Höhlenkirchen" },
        { href: "/de/ephesus-tour-guide", icon: "🏛️", name: "Ephesus Reiseführer", desc: "Antike römische Ruinen bei Selçuk, İzmir" },
      ],
      ctaTitle: "Bereit, Istanbul zu entdecken?",
      ctaSub: "Lade VibeGuide kostenlos. Finde einen lokalen Guide in 60 Sekunden.",
      ctaAvailability: "Kostenlos · Kein Abo · Istanbul jetzt verfügbar",
    },
    es: {
      metaTitle: "Guía Turístico de Estambul — Reserva un Experto Local",
      metaDescription:
        "Encuentra un guía turístico local verificado en Estambul. Explora Santa Sofía, el Palacio de Topkapi, el Gran Bazar, Balat y el Bósforo con un auténtico local — al instante o planificado.",
      ogDescription:
        "Guías locales verificados en Estambul. Conexión instantánea, tours en grupo o experiencias privadas de día completo. Sin trampas para turistas.",
      keywords: [
        "guía turístico Estambul", "guía local Estambul", "tour privado Estambul",
        "tour a pie Estambul", "tour Santa Sofía", "guía Gran Bazar",
        "tour Palacio Topkapi", "tour Bósforo", "guía Sultanahmet", "tour Balat",
      ],
      region: "Estambul · Turquía",
      h1: "Guía Turístico de Estambul",
      h1Accent: "Encuentra tu Experto Local",
      heroLead:
        "Evita las trampas para turistas. Explora Estambul con un guía local verificado que conoce las calles ocultas, las historias reales y la mejor comida — de Sultanahmet a Balat.",
      ctaPrimary: "Reservar un Guía →",
      ctaSecondary: "Ver Opciones de Tour",
      highlightsKicker: "Destinos Principales",
      highlightsHeading: "Lo que tu guía te mostrará",
      highlights: [
        { icon: "🕌", name: "Santa Sofía", desc: "1.500 años de historia — catedral bizantina convertida en mezquita otomana." },
        { icon: "🏰", name: "Palacio de Topkapi", desc: "El corazón del Imperio Otomano, con vistas al Bósforo." },
        { icon: "🛍️", name: "Gran Bazar", desc: "Más de 4.000 tiendas en el mercado cubierto más antiguo del mundo — recórrelo como un local." },
        { icon: "🎨", name: "Balat y Fener", desc: "Calles coloridas, historia ortodoxa griega y cafés escondidos." },
        { icon: "⛵", name: "Bósforo", desc: "Donde Europa se encuentra con Asia — un estrecho que ha moldeado civilizaciones." },
        { icon: "🕌", name: "Mezquita Azul", desc: "Seis minaretes, 20.000 azulejos de İznik y uno de los perfiles más icónicos de Estambul." },
      ],
      seoHeading: "¿Por qué explorar Estambul con un guía local?",
      seoParagraphs: [
        "Estambul es una ciudad de capas — los imperios romano, bizantino y otomano dejaron su huella en las mismas calles. Dos continentes, tres nombres (Bizancio, Constantinopla, Estambul) y más de 2.500 años de historia se concentran en un horizonte extraordinario. Para quien la visita por primera vez, su magnitud puede ser abrumadora, y los rincones más gratificantes rara vez están en las guías.",
        "Ahí es donde un <strong>guía turístico licenciado de Estambul</strong> lo cambia todo. En lugar de hacer cola a ciegas en <strong>Santa Sofía</strong> o perderte entre las 4.000 tiendas del <strong>Gran Bazar</strong>, caminas con alguien que sabe cuál es la entrada más rápida, qué vendedor de alfombras es honesto y qué pequeña lokanta sirve el mejor İskender kebab. Un buen guía no solo te enseña la <strong>Mezquita Azul</strong> y el <strong>Palacio de Topkapi</strong> — te cuenta las historias que los hacen cobrar vida.",
        "VibeGuide te conecta con guías locales verificados por los barrios más emblemáticos de Estambul. Explora la península histórica de <strong>Sultanahmet</strong>, pasea por las calles coloridas de <strong>Balat y Fener</strong>, sube a la <strong>Torre de Gálata</strong> para la mejor vista del Cuerno de Oro, o navega por el <strong>Bósforo</strong> donde Europa se encuentra con Asia. Tengas dos horas o dos días, tu guía construye la ruta a tu medida.",
        "Cada guía de nuestra plataforma está licenciado por el Ministerio de Cultura y Turismo de Turquía, tiene su identidad verificada y es evaluado tras cada tour — para que explores con total confianza. Sin trampas para turistas, sin discursos memorizados, sin presión. Solo un auténtico local mostrándote su ciudad.",
      ],
      modesKicker: "Cómo funciona",
      modesHeading: "Tres formas de explorar Estambul",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Conexión en 60 segundos", text: "Abre la app, toca VibeNow y un guía local verificado te encuentra en tu ubicación en minutos. Sin reservas, sin esperas." },
        { tag: "VibeSquad", color: C.squad, title: "Únete a un grupo", text: "Económico, social y divertido. Únete a un grupo que explora Estambul ahora mismo — conoce a otros viajeros por el camino." },
        { tag: "Tour Privado", color: C.private, title: "Planea tu día perfecto", text: "Reserva un guía privado para medio día o día completo, totalmente adaptado a tus intereses y tu ritmo." },
      ],
      trustHeading: "Cada guía está verificado",
      trustText: "Todos los guías de VibeGuide en Estambul tienen licencias oficiales del Ministerio de Cultura de Turquía, pasan verificación de identidad y son evaluados tras cada tour.",
      trustBadges: ["🪪 Licenciado por el Ministerio de Cultura", "✅ Identidad verificada", "⭐ 4,9 de valoración media", "🚫 Política de tolerancia cero"],
      faqHeading: "Preguntas frecuentes",
      faqs: [
        { q: "¿Cuánto cuesta un guía turístico en Estambul?", a: "Los precios varían según el tipo de tour y la duración. Con VibeGuide puedes ver el precio exacto antes de reservar: la mayoría de los tours privados de medio día en Estambul parten de una tarifa fija por persona, sin cargos ocultos. Los tours en grupo (VibeSquad) son la opción más económica." },
        { q: "¿Los guías de Estambul de VibeGuide están autorizados?", a: "Sí. Cada guía de VibeGuide cuenta con una licencia oficial del Ministerio de Cultura y Turismo de Turquía, supera una verificación de identidad y es evaluado tras cada tour. Tenemos una política de tolerancia cero con las guías sin licencia." },
        { q: "¿Cuál es la mejor zona para empezar un tour por Estambul?", a: "La mayoría de los visitantes primerizos empiezan en Sultanahmet (la península histórica), hogar de Santa Sofía, la Mezquita Azul, el Palacio de Topkapı y el Gran Bazar, todo a poca distancia a pie. Tu guía también puede diseñar una ruta por Balat, Galata, Karaköy o el Bósforo según tus intereses." },
        { q: "¿Puedo reservar un guía para el mismo día?", a: "Sí. Con VibeNow puedes encontrar un guía local disponible en unos 60 segundos y reunirte con él en tu ubicación en pocos minutos, sin reserva previa. También puedes programar un tour privado con antelación." },
        { q: "¿Los guías hablan inglés?", a: "Sí. La mayoría de los guías de Estambul en VibeGuide hablan inglés, y muchos también ofrecen tours en alemán, ruso, francés, español, árabe y otros idiomas. Puedes filtrar por idioma al elegir un tour." },
        { q: "¿Es mejor explorar Estambul con un guía o por libre?", a: "Estambul recompensa el conocimiento local. Un guía autorizado te ayuda a evitar colas, esquivar restaurantes trampa para turistas, entender la verdadera historia de cada lugar y descubrir barrios que la mayoría de los visitantes nunca alcanza, convirtiendo una lista de imprescindibles en una experiencia auténtica." },
        { q: "¿Cuántos días se necesitan en Estambul?", a: "De dos a tres días cubren lo esencial: Sultanahmet (Santa Sofía, Mezquita Azul, Topkapı), el Gran Bazar y un crucero por el Bósforo. Con cuatro o más días puedes añadir Balat, la parte asiática (Kadıköy) y excursiones de un día. Un guía local te ayuda a aprovechar al máximo el tiempo que tengas." },
        { q: "¿Cuál es la mejor época para visitar Estambul?", a: "Abril–mayo y septiembre–octubre ofrecen un clima templado y menos aglomeraciones. El verano es caluroso y concurrido; el invierno es más fresco, pero con encanto y más económico. Sea cual sea la temporada, un guía local conoce las horas más tranquilas para visitar los lugares principales." },
        { q: "¿Cómo consigo un guía privado en Estambul?", a: "Abre la app de VibeGuide, elige Tour Privado, selecciona un guía local verificado y tu fecha, y listo. Verás el precio por adelantado y podrás escribirle a tu guía antes del día. Para algo espontáneo, VibeNow te empareja con un guía disponible en unos 60 segundos." },
        { q: "¿Los tours por Estambul son adecuados para familias y niños?", a: "Sí. Los guías privados adaptan el ritmo y el contenido para niños, personas mayores y grupos variados: rutas más cortas, paradas para picar y relatos que los niños disfrutan de verdad. Solo dile a tu guía quién viene." },
        { q: "¿Debo dar propina a mi guía en Estambul?", a: "La propina no es obligatoria: el precio que ves cubre el tour. Si lo has pasado muy bien, se agradece una propina, pero siempre es opcional y nunca se espera." },
      ],
      landmarksHeading: "Principales monumentos de Estambul",
      landmarksSub: "Explora cada uno con un guía local verificado.",
      landmarks: [
        { href: "/attractions/es/hagia-sophia", icon: "🕌", name: "Santa Sofía", desc: "Catedral bizantina convertida en mezquita" },
        { href: "/attractions/es/blue-mosque", icon: "🕌", name: "Mezquita Azul", desc: "Seis minaretes y 20.000 azulejos de İznik" },
        { href: "/attractions/es/topkapi-palace", icon: "🏰", name: "Palacio de Topkapi", desc: "Corazón del Imperio Otomano" },
        { href: "/attractions/es/basilica-cistern", icon: "🏛️", name: "Cisterna Basílica", desc: "Palacio subterráneo de agua" },
      ],
      otherHeading: "Explora más de Turquía",
      otherCities: [
        { href: "/es/cappadocia-tour-guide", icon: "🎈", name: "Guía de Capadocia", desc: "Globos aerostáticos, chimeneas de hadas e iglesias rupestres" },
        { href: "/es/ephesus-tour-guide", icon: "🏛️", name: "Guía de Éfeso", desc: "Antiguas ruinas romanas cerca de Selçuk, İzmir" },
      ],
      ctaTitle: "¿Listo para explorar Estambul?",
      ctaSub: "Descarga VibeGuide gratis. Encuentra un guía local en 60 segundos.",
      ctaAvailability: "Gratis · Sin suscripción · Estambul disponible ahora",
    },
    fr: {
      metaTitle: "Guide Touristique d'Istanbul — Réservez un Expert Local",
      metaDescription:
        "Trouvez un guide touristique local vérifié à Istanbul. Explorez Sainte-Sophie, le palais de Topkapı, le Grand Bazar, Balat et le Bosphore avec un vrai local — instantanément ou planifié.",
      ogDescription:
        "Guides locaux vérifiés pour Istanbul. Mise en relation instantanée, visites en groupe ou expériences privées d'une journée. Pas de pièges à touristes.",
      keywords: [
        "guide touristique Istanbul", "guide local Istanbul", "visite privée Istanbul",
        "visite à pied Istanbul", "visite Sainte-Sophie", "guide Grand Bazar",
        "visite palais Topkapı", "croisière Bosphore", "guide Sultanahmet", "visite Balat",
      ],
      region: "Istanbul · Turquie",
      h1: "Guide Touristique d'Istanbul",
      h1Accent: "Trouvez votre Expert Local",
      heroLead:
        "Évitez les pièges à touristes. Explorez Istanbul avec un guide local vérifié qui connaît les ruelles cachées, les vraies histoires et la meilleure cuisine — de Sultanahmet à Balat.",
      ctaPrimary: "Réserver un Guide →",
      ctaSecondary: "Voir les Options",
      highlightsKicker: "Destinations Phares",
      highlightsHeading: "Ce que votre guide vous montrera",
      highlights: [
        { icon: "🕌", name: "Sainte-Sophie", desc: "1 500 ans d'histoire — cathédrale byzantine devenue mosquée ottomane." },
        { icon: "🏰", name: "Palais de Topkapı", desc: "Le cœur de l'Empire ottoman, surplombant le Bosphore." },
        { icon: "🛍️", name: "Grand Bazar", desc: "Plus de 4 000 boutiques dans le plus ancien marché couvert du monde — naviguez comme un local." },
        { icon: "🎨", name: "Balat et Fener", desc: "Rues colorées, histoire grecque orthodoxe et cafés cachés." },
        { icon: "⛵", name: "Bosphore", desc: "Là où l'Europe rencontre l'Asie — un détroit qui a façonné des civilisations." },
        { icon: "🕌", name: "Mosquée Bleue", desc: "Six minarets, 20 000 carreaux d'İznik et l'une des silhouettes les plus emblématiques d'Istanbul." },
      ],
      seoHeading: "Pourquoi explorer Istanbul avec un guide local ?",
      seoParagraphs: [
        "Istanbul est une ville en strates — les empires romain, byzantin et ottoman ont tous laissé leur empreinte sur les mêmes rues. Deux continents, trois noms (Byzance, Constantinople, Istanbul) et plus de 2 500 ans d'histoire concentrés dans une silhouette extraordinaire. Pour un premier visiteur, l'ampleur peut être déroutante, et les coins les plus gratifiants figurent rarement dans les guides.",
        "C'est là qu'un <strong>guide touristique licencié d'Istanbul</strong> change tout. Plutôt que de faire la queue à l'aveugle à <strong>Sainte-Sophie</strong> ou de vous perdre parmi les 4 000 boutiques du <strong>Grand Bazar</strong>, vous marchez avec quelqu'un qui connaît l'entrée la plus rapide, quel marchand de tapis est honnête et quelle petite lokanta sert le meilleur İskender kebab. Un bon guide ne se contente pas de vous montrer la <strong>Mosquée Bleue</strong> et le <strong>palais de Topkapı</strong> — il raconte les histoires qui les font vivre.",
        "VibeGuide vous met en relation avec des guides locaux vérifiés dans les quartiers les plus emblématiques d'Istanbul. Explorez la péninsule historique de <strong>Sultanahmet</strong>, flânez dans les rues colorées de <strong>Balat et Fener</strong>, montez à la <strong>tour de Galata</strong> pour la plus belle vue sur la Corne d'Or, ou naviguez sur le <strong>Bosphore</strong> où l'Europe rencontre l'Asie. Que vous ayez deux heures ou deux jours, votre guide construit l'itinéraire autour de vous.",
        "Chaque guide de notre plateforme est licencié par le ministère turc de la Culture et du Tourisme, vérifié quant à son identité et évalué après chaque visite — pour que vous exploriez en toute confiance. Pas de pièges à touristes, pas de discours appris par cœur, pas de pression. Juste un vrai local qui vous montre sa ville.",
      ],
      modesKicker: "Comment ça marche",
      modesHeading: "Trois façons d'explorer Istanbul",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Mise en relation en 60 s", text: "Ouvrez l'app, touchez VibeNow, et un guide local vérifié vous rejoint à votre position en quelques minutes. Sans réservation, sans attente." },
        { tag: "VibeSquad", color: C.squad, title: "Rejoindre un groupe", text: "Abordable, convivial, amusant. Rejoignez un groupe qui explore Istanbul en ce moment — rencontrez d'autres voyageurs en chemin." },
        { tag: "Visite Privée", color: C.private, title: "Planifiez votre journée idéale", text: "Réservez un guide privé pour une demi-journée ou une journée entière, entièrement adapté à vos centres d'intérêt et à votre rythme." },
      ],
      trustHeading: "Chaque guide est vérifié",
      trustText: "Tous les guides VibeGuide à Istanbul détiennent des licences officielles du ministère turc de la Culture, passent une vérification d'identité et sont évalués après chaque visite.",
      trustBadges: ["🪪 Licencié par le ministère de la Culture", "✅ Identité vérifiée", "⭐ 4,9 de note moyenne", "🚫 Politique de tolérance zéro"],
      faqHeading: "Questions fréquentes",
      faqs: [
        { q: "Combien coûte un guide touristique à Istanbul ?", a: "Les prix varient selon le type et la durée de la visite. Avec VibeGuide, vous voyez le prix exact avant de réserver — la plupart des visites privées d'une demi-journée à Istanbul démarrent à un tarif fixe par personne, sans frais cachés. Les visites en groupe (VibeSquad) sont l'option la plus économique." },
        { q: "Les guides d'Istanbul de VibeGuide sont-ils agréés ?", a: "Oui. Chaque guide de VibeGuide détient une licence officielle du ministère turc de la Culture et du Tourisme, passe une vérification d'identité et est évalué après chaque visite. Nous appliquons une politique de tolérance zéro envers les guides non agréés." },
        { q: "Quel est le meilleur quartier pour commencer une visite d'Istanbul ?", a: "La plupart des primo-visiteurs commencent à Sultanahmet (la péninsule historique), qui abrite Sainte-Sophie, la Mosquée Bleue, le palais de Topkapı et le Grand Bazar — le tout accessible à pied. Votre guide peut aussi concevoir un itinéraire autour de Balat, Galata, Karaköy ou du Bosphore selon vos centres d'intérêt." },
        { q: "Puis-je réserver un guide pour le jour même ?", a: "Oui. Avec VibeNow, vous trouvez un guide local disponible en environ 60 secondes et le rencontrez à votre emplacement en quelques minutes — sans réservation préalable. Vous pouvez aussi planifier une visite privée à l'avance." },
        { q: "Les guides parlent-ils anglais ?", a: "Oui. La plupart des guides d'Istanbul sur VibeGuide parlent anglais, et beaucoup proposent aussi des visites en allemand, russe, français, espagnol, arabe et d'autres langues. Vous pouvez filtrer par langue au moment de choisir une visite." },
        { q: "Vaut-il mieux explorer Istanbul avec un guide ou seul ?", a: "Istanbul récompense la connaissance locale. Un guide agréé vous aide à éviter les files d'attente, à fuir les restaurants pièges à touristes, à comprendre la véritable histoire de chaque site et à découvrir des quartiers que la plupart des visiteurs n'atteignent jamais — transformant une liste de cases à cocher en une expérience authentique." },
        { q: "Combien de jours faut-il à Istanbul ?", a: "Deux à trois jours suffisent pour les incontournables — Sultanahmet (Sainte-Sophie, Mosquée Bleue, Topkapı), le Grand Bazar et une croisière sur le Bosphore. Avec quatre jours ou plus, vous pouvez ajouter Balat, la rive asiatique (Kadıköy) et des excursions. Un guide local vous aide à tirer le meilleur du temps dont vous disposez." },
        { q: "Quelle est la meilleure période pour visiter Istanbul ?", a: "Avril–mai et septembre–octobre offrent un climat doux et moins de foule. L'été est chaud et animé ; l'hiver est plus frais, mais plein d'atmosphère et moins cher. Quelle que soit la saison, un guide local connaît les heures les plus calmes pour visiter les grands sites." },
        { q: "Comment obtenir un guide privé à Istanbul ?", a: "Ouvrez l'application VibeGuide, choisissez Visite privée, sélectionnez un guide local vérifié et votre date, et c'est réglé. Vous voyez le prix à l'avance et pouvez échanger avec votre guide avant le jour J. Pour quelque chose de spontané, VibeNow vous met en relation avec un guide disponible en environ 60 secondes." },
        { q: "Les visites d'Istanbul conviennent-elles aux familles et aux enfants ?", a: "Oui. Les guides privés adaptent le rythme et le contenu aux enfants, aux seniors et aux groupes mixtes — itinéraires plus courts, pauses goûter et histoires que les enfants apprécient vraiment. Indiquez simplement à votre guide qui vous accompagne." },
        { q: "Dois-je donner un pourboire à mon guide à Istanbul ?", a: "Le pourboire n'est pas obligatoire — le prix affiché couvre la visite. Si vous avez passé un excellent moment, un pourboire est apprécié, mais il reste toujours facultatif et n'est jamais attendu." },
      ],
      landmarksHeading: "Principaux monuments d'Istanbul",
      landmarksSub: "Explorez chacun avec un guide local vérifié.",
      landmarks: [
        { href: "/attractions/fr/hagia-sophia", icon: "🕌", name: "Sainte-Sophie", desc: "Cathédrale byzantine devenue mosquée" },
        { href: "/attractions/fr/blue-mosque", icon: "🕌", name: "Mosquée Bleue", desc: "Six minarets et 20 000 carreaux d'İznik" },
        { href: "/attractions/fr/topkapi-palace", icon: "🏰", name: "Palais de Topkapı", desc: "Cœur de l'Empire ottoman" },
        { href: "/attractions/fr/basilica-cistern", icon: "🏛️", name: "Citerne Basilique", desc: "Palais d'eau souterrain" },
      ],
      otherHeading: "Explorez plus de la Turquie",
      otherCities: [
        { href: "/fr/cappadocia-tour-guide", icon: "🎈", name: "Guide de Cappadoce", desc: "Montgolfières, cheminées de fées et églises rupestres" },
        { href: "/fr/ephesus-tour-guide", icon: "🏛️", name: "Guide d'Éphèse", desc: "Ruines romaines antiques près de Selçuk, İzmir" },
      ],
      ctaTitle: "Prêt à explorer Istanbul ?",
      ctaSub: "Téléchargez VibeGuide gratuitement. Trouvez un guide local en 60 secondes.",
      ctaAvailability: "Gratuit · Sans abonnement · Istanbul disponible maintenant",
    },
    it: {
      metaTitle: "Guida Turistica di Istanbul — Prenota un Esperto Locale",
      metaDescription:
        "Trova una guida turistica locale verificata a Istanbul. Esplora Santa Sofia, il Palazzo Topkapı, il Gran Bazar, Balat e il Bosforo con un vero local — subito o pianificato.",
      ogDescription:
        "Guide locali verificate per Istanbul. Abbinamento istantaneo, tour di gruppo o esperienze private di un'intera giornata. Niente trappole per turisti.",
      keywords: [
        "guida turistica Istanbul", "guida locale Istanbul", "tour privato Istanbul",
        "tour a piedi Istanbul", "tour Santa Sofia", "guida Gran Bazar",
        "tour Palazzo Topkapı", "tour Bosforo", "guida Sultanahmet", "tour Balat",
      ],
      region: "Istanbul · Turchia",
      h1: "Guida Turistica di Istanbul",
      h1Accent: "Trova il tuo Esperto Locale",
      heroLead:
        "Evita le trappole per turisti. Esplora Istanbul con una guida locale verificata che conosce le vie nascoste, le storie vere e il cibo migliore — da Sultanahmet a Balat.",
      ctaPrimary: "Prenota una Guida →",
      ctaSecondary: "Vedi le Opzioni",
      highlightsKicker: "Mete Principali",
      highlightsHeading: "Cosa ti mostrerà la tua guida",
      highlights: [
        { icon: "🕌", name: "Santa Sofia", desc: "1.500 anni di storia — cattedrale bizantina divenuta moschea ottomana." },
        { icon: "🏰", name: "Palazzo Topkapı", desc: "Il cuore dell'Impero Ottomano, affacciato sul Bosforo." },
        { icon: "🛍️", name: "Gran Bazar", desc: "Oltre 4.000 negozi nel più antico mercato coperto del mondo — muoviti come un local." },
        { icon: "🎨", name: "Balat e Fener", desc: "Strade colorate, storia greco-ortodossa e caffè nascosti." },
        { icon: "⛵", name: "Bosforo", desc: "Dove l'Europa incontra l'Asia — uno stretto che ha plasmato civiltà." },
        { icon: "🕌", name: "Moschea Blu", desc: "Sei minareti, 20.000 piastrelle di İznik e uno dei profili più iconici di Istanbul." },
      ],
      seoHeading: "Perché esplorare Istanbul con una guida locale?",
      seoParagraphs: [
        "Istanbul è una città a strati — gli imperi romano, bizantino e ottomano hanno lasciato la loro impronta sulle stesse strade. Due continenti, tre nomi (Bisanzio, Costantinopoli, Istanbul) e oltre 2.500 anni di storia concentrati in uno skyline straordinario. Per chi la visita per la prima volta, la sola scala può essere travolgente, e gli angoli più gratificanti raramente sono quelli delle guide cartacee.",
        "È qui che una <strong>guida turistica autorizzata di Istanbul</strong> cambia tutto. Invece di fare la fila alla cieca a <strong>Santa Sofia</strong> o perderti tra i 4.000 negozi del <strong>Gran Bazar</strong>, cammini con qualcuno che sa qual è l'ingresso più rapido, quale venditore di tappeti è onesto e quale piccola lokanta serve il miglior İskender kebab. Una buona guida non si limita a mostrarti la <strong>Moschea Blu</strong> e il <strong>Palazzo Topkapı</strong> — racconta le storie che li rendono vivi.",
        "VibeGuide ti mette in contatto con guide locali verificate nei quartieri più iconici di Istanbul. Esplora la penisola storica di <strong>Sultanahmet</strong>, passeggia tra le strade colorate di <strong>Balat e Fener</strong>, sali alla <strong>Torre di Galata</strong> per la vista migliore sul Corno d'Oro, o naviga il <strong>Bosforo</strong> dove l'Europa incontra l'Asia. Che tu abbia due ore o due giorni, la tua guida costruisce l'itinerario su misura.",
        "Ogni guida sulla nostra piattaforma è autorizzata dal Ministero della Cultura e del Turismo turco, verificata nell'identità e valutata dopo ogni tour — così esplori in totale tranquillità. Niente trappole per turisti, niente discorsi imparati a memoria, niente pressioni. Solo un vero local che ti mostra la sua città.",
      ],
      modesKicker: "Come funziona",
      modesHeading: "Tre modi per esplorare Istanbul",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Abbinamento in 60 secondi", text: "Apri l'app, tocca VibeNow e una guida locale verificata ti raggiunge in pochi minuti. Nessuna prenotazione, nessuna attesa." },
        { tag: "VibeSquad", color: C.squad, title: "Unisciti a un gruppo", text: "Economico, sociale, divertente. Unisciti a un gruppo che sta esplorando Istanbul proprio ora — conosci altri viaggiatori lungo il percorso." },
        { tag: "Tour Privato", color: C.private, title: "Pianifica la giornata perfetta", text: "Prenota una guida privata per mezza giornata o giornata intera, totalmente su misura per i tuoi interessi e ritmi." },
      ],
      trustHeading: "Ogni guida è verificata",
      trustText: "Tutte le guide VibeGuide a Istanbul possiedono licenze ufficiali del Ministero della Cultura turco, superano la verifica dell'identità e vengono valutate dopo ogni tour.",
      trustBadges: ["🪪 Autorizzata dal Ministero della Cultura", "✅ Identità verificata", "⭐ 4,9 valutazione media", "🚫 Politica di tolleranza zero"],
      faqHeading: "Domande frequenti",
      faqs: [
        { q: "Quanto costa una guida turistica a Istanbul?", a: "I prezzi variano in base al tipo di tour e alla durata. Con VibeGuide vedi il prezzo esatto prima di prenotare: la maggior parte dei tour privati di mezza giornata a Istanbul parte da una tariffa fissa a persona, senza costi nascosti. I tour di gruppo (VibeSquad) sono l'opzione più economica." },
        { q: "Le guide di Istanbul di VibeGuide sono abilitate?", a: "Sì. Ogni guida su VibeGuide possiede una licenza ufficiale del Ministero turco della Cultura e del Turismo, supera una verifica dell'identità e viene valutata dopo ogni tour. Applichiamo una politica di tolleranza zero verso le guide non abilitate." },
        { q: "Qual è la zona migliore da cui iniziare un tour di Istanbul?", a: "La maggior parte dei visitatori inizia da Sultanahmet (la penisola storica), che ospita Santa Sofia, la Moschea Blu, il Palazzo Topkapı e il Gran Bazar, tutto raggiungibile a piedi. La tua guida può anche creare un itinerario tra Balat, Galata, Karaköy o il Bosforo in base ai tuoi interessi." },
        { q: "Posso prenotare una guida per lo stesso giorno?", a: "Sì. Con VibeNow trovi una guida locale disponibile in circa 60 secondi e la incontri nella tua posizione in pochi minuti, senza prenotazione anticipata. Puoi anche programmare un tour privato in anticipo." },
        { q: "Le guide parlano inglese?", a: "Sì. La maggior parte delle guide di Istanbul su VibeGuide parla inglese, e molte offrono tour anche in tedesco, russo, francese, spagnolo, arabo e altre lingue. Puoi filtrare per lingua quando scegli un tour." },
        { q: "È meglio esplorare Istanbul con una guida o da soli?", a: "Istanbul premia la conoscenza locale. Una guida abilitata ti aiuta a saltare le code, evitare i ristoranti trappola per turisti, comprendere la vera storia di ogni luogo e scoprire quartieri che la maggior parte dei visitatori non raggiunge mai, trasformando una lista di cose da vedere in un'esperienza autentica." },
        { q: "Quanti giorni servono a Istanbul?", a: "Due o tre giorni coprono le attrazioni principali: Sultanahmet (Santa Sofia, Moschea Blu, Topkapı), il Gran Bazar e una crociera sul Bosforo. Con quattro o più giorni puoi aggiungere Balat, la sponda asiatica (Kadıköy) e gite di un giorno. Una guida locale ti aiuta a sfruttare al meglio il tempo che hai." },
        { q: "Qual è il periodo migliore per visitare Istanbul?", a: "Aprile–maggio e settembre–ottobre offrono un clima mite e meno folla. L'estate è calda e affollata; l'inverno è più fresco, ma suggestivo ed economico. In qualunque stagione, una guida locale conosce gli orari più tranquilli per visitare i siti principali." },
        { q: "Come ottengo una guida privata a Istanbul?", a: "Apri l'app VibeGuide, scegli Tour Privato, seleziona una guida locale verificata e la tua data, e il gioco è fatto. Vedi il prezzo in anticipo e puoi scrivere alla tua guida prima del giorno stabilito. Per qualcosa di spontaneo, VibeNow ti abbina a una guida disponibile in circa 60 secondi." },
        { q: "I tour di Istanbul sono adatti a famiglie e bambini?", a: "Sì. Le guide private adattano ritmo e contenuti a bambini, anziani e gruppi misti: percorsi più brevi, soste per uno spuntino e racconti che i bambini apprezzano davvero. Basta dire alla tua guida chi partecipa." },
        { q: "Devo lasciare la mancia alla mia guida a Istanbul?", a: "La mancia non è obbligatoria: il prezzo che vedi copre il tour. Se ti sei trovato benissimo, una mancia è gradita, ma è sempre facoltativa e mai attesa." },
      ],
      landmarksHeading: "Principali monumenti di Istanbul",
      landmarksSub: "Esplora ciascuno con una guida locale verificata.",
      landmarks: [
        { href: "/attractions/it/hagia-sophia", icon: "🕌", name: "Santa Sofia", desc: "Cattedrale bizantina divenuta moschea" },
        { href: "/attractions/it/blue-mosque", icon: "🕌", name: "Moschea Blu", desc: "Sei minareti e 20.000 piastrelle di İznik" },
        { href: "/attractions/it/topkapi-palace", icon: "🏰", name: "Palazzo Topkapı", desc: "Cuore dell'Impero Ottomano" },
        { href: "/attractions/it/basilica-cistern", icon: "🏛️", name: "Cisterna Basilica", desc: "Palazzo d'acqua sotterraneo" },
      ],
      otherHeading: "Esplora di più della Turchia",
      otherCities: [
        { href: "/it/cappadocia-tour-guide", icon: "🎈", name: "Guida della Cappadocia", desc: "Mongolfiere, camini delle fate e chiese rupestri" },
        { href: "/it/ephesus-tour-guide", icon: "🏛️", name: "Guida di Efeso", desc: "Antiche rovine romane vicino a Selçuk, İzmir" },
      ],
      ctaTitle: "Pronto a esplorare Istanbul?",
      ctaSub: "Scarica VibeGuide gratis. Trova una guida locale in 60 secondi.",
      ctaAvailability: "Gratis · Nessun abbonamento · Istanbul disponibile ora",
    },
    ar: {
      metaTitle: "دليل سياحي في إسطنبول — احجز خبيرًا محليًا",
      metaDescription:
        "اعثر على دليل سياحي محلي موثّق في إسطنبول. استكشف آيا صوفيا وقصر توبكابي والبازار الكبير وبالات ومضيق البوسفور مع محلي حقيقي — فورًا أو بحجز مسبق.",
      ogDescription:
        "أدلّاء محليون موثّقون في إسطنبول. مطابقة فورية، جولات جماعية، أو تجارب خاصة ليوم كامل. بلا فخاخ سياحية.",
      keywords: [
        "دليل سياحي إسطنبول", "مرشد محلي إسطنبول", "جولة خاصة إسطنبول",
        "جولة مشي إسطنبول", "جولة آيا صوفيا", "مرشد البازار الكبير",
        "جولة قصر توبكابي", "جولة البوسفور", "مرشد السلطان أحمد", "جولة بالات",
      ],
      region: "إسطنبول · تركيا",
      h1: "دليل سياحي في إسطنبول",
      h1Accent: "اعثر على خبيرك المحلي",
      heroLead:
        "تجنّب الفخاخ السياحية. استكشف إسطنبول مع دليل محلي موثّق يعرف الأزقّة الخفية والقصص الحقيقية وأفضل الأطعمة — من السلطان أحمد إلى بالات.",
      ctaPrimary: "احجز دليلًا الآن →",
      ctaSecondary: "اطّلع على خيارات الجولات",
      highlightsKicker: "أبرز الوجهات",
      highlightsHeading: "ما سيُريك إياه دليلك",
      highlights: [
        { icon: "🕌", name: "آيا صوفيا", desc: "1500 عام من التاريخ — كاتدرائية بيزنطية تحوّلت إلى مسجد عثماني." },
        { icon: "🏰", name: "قصر توبكابي", desc: "قلب الإمبراطورية العثمانية، يطلّ على البوسفور." },
        { icon: "🛍️", name: "البازار الكبير", desc: "أكثر من 4000 متجر في أقدم سوق مغطّى في العالم — تجوّل فيه كأهل البلد." },
        { icon: "🎨", name: "بالات وفنر", desc: "شوارع ملوّنة وتاريخ روم أرثوذكسي ومقاهٍ مخفية." },
        { icon: "⛵", name: "البوسفور", desc: "حيث تلتقي أوروبا بآسيا — مضيق صاغ الحضارات." },
        { icon: "🕌", name: "المسجد الأزرق", desc: "ستّ مآذن و20000 بلاطة إزنيك، وأحد أبرز معالم أفق إسطنبول." },
      ],
      seoHeading: "لماذا تستكشف إسطنبول مع دليل محلي؟",
      seoParagraphs: [
        "إسطنبول مدينة من طبقات — تركت الإمبراطوريات الرومانية والبيزنطية والعثمانية بصماتها على الشوارع نفسها. قارتان، وثلاثة أسماء (بيزنطة، القسطنطينية، إسطنبول)، وأكثر من 2500 عام من التاريخ في أفق واحد استثنائي. بالنسبة لزائر لأول مرة، قد يكون حجم المدينة مربكًا، ونادرًا ما تكون أجمل الزوايا هي تلك المذكورة في الكتيبات.",
        "هنا يُحدث <strong>الدليل السياحي المرخّص في إسطنبول</strong> الفارق كله. بدل الوقوف عشوائيًا في طابور <strong>آيا صوفيا</strong> أو التوهان بين 4000 متجر في <strong>البازار الكبير</strong>، تمشي مع من يعرف أسرع مدخل، وأيّ بائع سجّاد صادق، وأيّ مطعم صغير يقدّم أفضل كباب إسكندر. الدليل الجيد لا يكتفي بأن يُريك <strong>المسجد الأزرق</strong> و<strong>قصر توبكابي</strong> — بل يروي القصص التي تبثّ فيها الحياة.",
        "يربطك VibeGuide بأدلّاء محليين موثّقين في أكثر أحياء إسطنبول شهرة. استكشف شبه الجزيرة التاريخية <strong>السلطان أحمد</strong>، وتجوّل في شوارع <strong>بالات وفنر</strong> الملوّنة، واصعد إلى <strong>برج غلطة</strong> لأجمل إطلالة على القرن الذهبي، أو أبحر في <strong>البوسفور</strong> حيث تلتقي أوروبا بآسيا. سواء كان لديك ساعتان أو يومان، يصمّم دليلك المسار حولك.",
        "كل دليل على منصّتنا مرخّص من وزارة الثقافة والسياحة التركية، ومُتحقَّق من هويته، ويُقيَّم بعد كل جولة — لتستكشف بثقة تامة. بلا فخاخ سياحية، بلا خُطب محفوظة، بلا ضغط. مجرّد محلي حقيقي يُريك مدينته.",
      ],
      modesKicker: "كيف يعمل",
      modesHeading: "ثلاث طرق لاستكشاف إسطنبول",
      modes: [
        { tag: "VibeNow", color: C.now, title: "مطابقة خلال 60 ثانية", text: "افتح التطبيق، اضغط VibeNow، وسيلتقيك دليل محلي موثّق في موقعك خلال دقائق. بلا حجز ولا انتظار." },
        { tag: "VibeSquad", color: C.squad, title: "انضمّ إلى مجموعة", text: "اقتصادي واجتماعي وممتع. انضمّ إلى مجموعة تستكشف إسطنبول الآن — وتعرّف على مسافرين آخرين في الطريق." },
        { tag: "جولة خاصة", color: C.private, title: "خطّط ليومك المثالي", text: "احجز دليلًا خاصًا لنصف يوم أو يوم كامل، مصمَّمًا بالكامل حول اهتماماتك وإيقاعك." },
      ],
      trustHeading: "كل دليل موثّق",
      trustText: "جميع أدلّاء VibeGuide في إسطنبول يحملون تراخيص رسمية من وزارة الثقافة التركية، ويجتازون التحقق من الهوية، ويُقيَّمون بعد كل جولة.",
      trustBadges: ["🪪 مرخّص من وزارة الثقافة", "✅ هوية موثّقة", "⭐ تقييم 4.9 وسطيًا", "🚫 سياسة عدم تسامح"],
      faqHeading: "الأسئلة الشائعة",
      faqs: [
        { q: "كم تبلغ تكلفة مرشد سياحي في إسطنبول؟", a: "تختلف الأسعار حسب نوع الجولة ومدتها. مع VibeGuide يمكنك رؤية السعر الدقيق قبل الحجز — تبدأ معظم الجولات الخاصة لنصف يوم في إسطنبول من سعر ثابت للفرد، دون رسوم خفية. الجولات الجماعية (VibeSquad) هي الخيار الأكثر اقتصادًا." },
        { q: "هل مرشدو إسطنبول في VibeGuide مرخّصون؟", a: "نعم. يحمل كل مرشد في VibeGuide ترخيصًا رسميًا من وزارة الثقافة والسياحة التركية، ويجتاز التحقق من الهوية، ويُقيَّم بعد كل جولة. لدينا سياسة عدم تسامح مطلق تجاه الإرشاد غير المرخّص." },
        { q: "ما أفضل منطقة لبدء جولة في إسطنبول؟", a: "يبدأ معظم الزوار لأول مرة من السلطان أحمد (شبه الجزيرة التاريخية)، حيث آيا صوفيا والمسجد الأزرق وقصر توبكابي والبازار الكبير — وكلها على مسافة قريبة سيرًا على الأقدام. يمكن لمرشدك أيضًا تصميم مسار حول بالاط أو غلطة أو كاراكوي أو البوسفور حسب اهتماماتك." },
        { q: "هل يمكنني حجز مرشد في اليوم نفسه؟", a: "نعم. مع VibeNow يمكنك العثور على مرشد محلي متاح خلال نحو 60 ثانية ولقاؤه في موقعك خلال دقائق — دون حجز مسبق. يمكنك أيضًا جدولة جولة خاصة مسبقًا." },
        { q: "هل يتحدث المرشدون الإنجليزية؟", a: "نعم. يتحدث معظم مرشدي إسطنبول في VibeGuide الإنجليزية، ويقدّم كثيرون جولات أيضًا بالألمانية والروسية والفرنسية والإسبانية والعربية ولغات أخرى. يمكنك التصفية حسب اللغة عند اختيار جولة." },
        { q: "هل من الأفضل استكشاف إسطنبول مع مرشد أم بمفردي؟", a: "إسطنبول تكافئ المعرفة المحلية. يساعدك المرشد المرخّص على تجاوز الطوابير وتجنّب مطاعم فخاخ السياح وفهم التاريخ الحقيقي وراء كل موقع واكتشاف أحياء لا يصل إليها معظم الزوار — فيتحوّل الأمر من قائمة مهام إلى تجربة حقيقية." },
        { q: "كم يومًا تحتاج في إسطنبول؟", a: "يومان إلى ثلاثة أيام تغطي أبرز المعالم — السلطان أحمد (آيا صوفيا، المسجد الأزرق، توبكابي)، والبازار الكبير، ورحلة بحرية في البوسفور. مع أربعة أيام أو أكثر يمكنك إضافة بالاط والجانب الآسيوي (كاديكوي) ورحلات يومية. يساعدك مرشد محلي على الاستفادة القصوى من المدة المتاحة لك." },
        { q: "ما أفضل وقت لزيارة إسطنبول؟", a: "يوفّر أبريل–مايو وسبتمبر–أكتوبر طقسًا معتدلًا وازدحامًا أقل. الصيف حار ومزدحم؛ والشتاء أبرد لكنه أكثر سحرًا وأرخص. مهما كان الموسم، يعرف المرشد المحلي أهدأ الساعات لزيارة المواقع الكبرى." },
        { q: "كيف أحصل على مرشد خاص في إسطنبول؟", a: "افتح تطبيق VibeGuide، واختر جولة خاصة، وحدّد مرشدًا محليًا موثّقًا وتاريخك، وانتهى الأمر. سترى السعر مقدّمًا ويمكنك مراسلة مرشدك قبل الموعد. ولشيء عفوي، يربطك VibeNow بمرشد متاح خلال نحو 60 ثانية." },
        { q: "هل جولات إسطنبول مناسبة للعائلات والأطفال؟", a: "نعم. يكيّف المرشدون الخاصون الإيقاع والمحتوى للأطفال وكبار السن والمجموعات المختلطة — مسارات أقصر ومحطات للوجبات الخفيفة وقصص يستمتع بها الأطفال فعلًا. فقط أخبر مرشدك بمن سيرافقك." },
        { q: "هل يجب أن أعطي إكرامية لمرشدي في إسطنبول؟", a: "الإكرامية ليست إلزامية — فالسعر الذي تراه يغطي الجولة. إذا قضيت وقتًا رائعًا، فالإكرامية موضع تقدير لكنها دائمًا اختيارية وغير متوقَّعة أبدًا." },
      ],
      landmarksHeading: "أبرز معالم إسطنبول",
      landmarksSub: "استكشف كلًّا منها مع دليل محلي موثّق.",
      landmarks: [
        { href: "/attractions/ar/hagia-sophia", icon: "🕌", name: "آيا صوفيا", desc: "كاتدرائية بيزنطية صارت مسجدًا" },
        { href: "/attractions/ar/blue-mosque", icon: "🕌", name: "المسجد الأزرق", desc: "ستّ مآذن و20000 بلاطة إزنيك" },
        { href: "/attractions/ar/topkapi-palace", icon: "🏰", name: "قصر توبكابي", desc: "قلب الإمبراطورية العثمانية" },
        { href: "/attractions/ar/basilica-cistern", icon: "🏛️", name: "صهريج البازيليك", desc: "قصر الماء تحت الأرض" },
      ],
      otherHeading: "استكشف المزيد من تركيا",
      otherCities: [
        { href: "/ar/cappadocia-tour-guide", icon: "🎈", name: "دليل كابادوكيا", desc: "مناطيد هوائية ومداخن الجنّيات وكنائس الكهوف" },
        { href: "/ar/ephesus-tour-guide", icon: "🏛️", name: "دليل أفسس", desc: "آثار رومانية قديمة قرب سلجوق، إزمير" },
      ],
      ctaTitle: "مستعدّ لاستكشاف إسطنبول؟",
      ctaSub: "حمّل VibeGuide مجانًا. اعثر على دليل محلي خلال 60 ثانية.",
      ctaAvailability: "مجاني · بلا اشتراك · إسطنبول متاحة الآن",
    },
  },
};

// ─── CAPPADOCIA ───────────────────────────────────────────────────────────────
const CAPPADOCIA: CityGuide = {
  slug: "cappadocia-tour-guide",
  citySlug: "nevsehir",
  cityName: "Cappadocia",
  heroImage:
    "https://images.unsplash.com/photo-1627933577672-d191b77baa9c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FwcGFkb2NpYXxlbnwwfHwwfHx8MA%3D%3D",
  i18n: {
    en: {
      metaTitle: "Cappadocia Tour Guide — Hot Air Balloon & Valley Tours",
      metaDescription:
        "Explore Cappadocia with a verified local guide. Hot air balloon tours, Göreme Valley, underground cities, fairy chimneys — book instantly with VibeGuide.",
      ogDescription:
        "Discover Cappadocia's fairy chimneys, underground cities and hot air balloons with a verified local guide. Instant booking via VibeGuide.",
      keywords: [
        "Cappadocia tour guide", "Cappadocia private tour", "hot air balloon Cappadocia",
        "Göreme tour guide", "Cappadocia valley tour", "underground city Cappadocia",
        "fairy chimneys tour", "Cappadocia local guide", "Uchisar tour", "Cappadocia travel guide",
      ],
      region: "Cappadocia · Turkey",
      h1: "Cappadocia Tour Guide",
      h1Accent: "Beyond the Balloon",
      heroLead:
        "Cappadocia is more than a balloon photo. Explore fairy chimneys, underground cities and ancient cave churches with a local who knows every valley.",
      ctaPrimary: "Book a Guide Now →",
      ctaSecondary: "See Tour Options",
      highlightsKicker: "Top Experiences",
      highlightsHeading: "What your guide will show you",
      highlights: [
        { icon: "🎈", name: "Hot Air Balloon", desc: "Sunrise over the valleys of Cappadocia — the world's most iconic balloon experience." },
        { icon: "🏔️", name: "Göreme Valley", desc: "Ancient cave churches with Byzantine frescoes, carved into volcanic rock." },
        { icon: "🏰", name: "Uchisar Castle", desc: "The highest point in Cappadocia — panoramic views across the entire region." },
        { icon: "🌋", name: "Derinkuyu Underground City", desc: "8 levels deep, housing 20,000 people. A labyrinth carved 2,000 years ago." },
        { icon: "🏜️", name: "Rose & Red Valley", desc: "Sunset hikes through pink and red rock formations — Cappadocia at its most cinematic." },
        { icon: "🐴", name: "Horseback Riding", desc: "Explore the valleys on horseback — a classic Cappadocia experience your guide can arrange." },
      ],
      seoHeading: "Why explore Cappadocia with a local guide?",
      seoParagraphs: [
        "Cappadocia is a landscape unlike anywhere else on Earth. Millions of years of volcanic eruptions laid down soft tuff rock, and wind and water carved it into the surreal <strong>fairy chimneys</strong>, ridges and valleys you see today. Early Christians then hollowed the rock into homes, churches and entire underground cities. For a first-time visitor the region can feel overwhelming — the sites are spread across a wide plateau, and the most magical corners are rarely the busy ones.",
        "That's where a <strong>licensed Cappadocia tour guide</strong> changes everything. The region's most famous sight is the dawn sky filled with colour: a <strong>hot air balloon</strong> ride at sunrise over the valleys is the experience most travellers come for. A good guide helps you plan around an early balloon launch, then builds the rest of your day around the light — golden-hour hikes through the Rose and Red valleys, and panoramic views from <strong>Uçhisar</strong> Castle, the highest point in the region.",
        "At the heart of it all is <strong>Göreme</strong> and its open-air museum, a UNESCO World Heritage site where cave churches carved into the rock still hold vivid Byzantine frescoes a thousand years old. Your guide reads the stories in the paintings, points out the monastic refectories, and explains how a community lived inside the stone. Nearby, the towns of <strong>Ürgüp</strong>, <strong>Avanos</strong> — famous for its riverside pottery — and the valleys around them reward anyone willing to step off the standard route.",
        "Then there is what lies beneath. Cappadocia's <strong>underground cities</strong> — <strong>Derinkuyu</strong> and <strong>Kaymaklı</strong> — descend many levels into the earth, complete with ventilation shafts, wells, stables and huge rolling stone doors that once sealed thousands of people safely inside. The narrow tunnels are far easier to understand and navigate with a guide who knows the history and the layout. Every guide on VibeGuide is licensed by the Turkish Ministry of Culture and Tourism, identity-verified, and reviewed after each tour — so you explore the fairy chimneys, churches and underground worlds of Cappadocia with total confidence.",
      ],
      modesKicker: "How it works",
      modesHeading: "Three ways to explore Cappadocia",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Instant local guide", text: "Arrived in Cappadocia without a plan? Match with a verified local guide in minutes and start exploring immediately." },
        { tag: "VibeSquad", color: C.squad, title: "Join a group", text: "Share the experience with other travellers. Join a small group tour of Göreme, the valleys or an underground city." },
        { tag: "Private Tour", color: C.private, title: "Plan your Cappadocia day", text: "Fully private guide for balloon day, valley hikes or a sunset dinner — designed entirely around your itinerary." },
      ],
      trustHeading: "Every guide is verified",
      trustText: "All VibeGuide tour guides in Cappadocia hold official Turkish Ministry of Culture licences, pass identity verification, and are reviewed after every tour.",
      trustBadges: ["🪪 Licensed by Ministry of Culture", "✅ Identity verified", "⭐ 4.9 avg rating", "🚫 Zero-tolerance policy"],
      faqHeading: "Frequently asked questions",
      faqs: [
        { q: "How much does a tour guide in Cappadocia cost?", a: "Prices depend on the tour type and length. With VibeGuide you see the exact price before you book — most half-day private tours of Göreme and the valleys start from a fixed per-person rate, with no hidden fees. Group tours (VibeSquad) are the most affordable way to explore Cappadocia." },
        { q: "Are VibeGuide's Cappadocia guides licensed?", a: "Yes. Every guide on VibeGuide holds an official licence from the Turkish Ministry of Culture and Tourism, passes identity verification, and is reviewed after every tour. We have a zero-tolerance policy for unlicensed guiding." },
        { q: "Can a guide arrange a hot air balloon tour in Cappadocia?", a: "Your VibeGuide local can help you plan around a sunrise hot air balloon flight and recommend reputable, licensed balloon operators — but the balloon ride itself is operated and ticketed separately. Balloons launch at dawn, so most guides build the rest of your day around an early start." },
        { q: "When is the best time to visit Cappadocia?", a: "Spring (April–June) and autumn (September–October) offer the mildest weather and the most reliable hot air balloon flights. Summer is hot but balloons still fly at dawn, and winter brings magical snow over the fairy chimneys. Your guide can tailor the route to the season." },
        { q: "Which areas of Cappadocia will a guide show me?", a: "Most tours centre on Göreme and its open-air museum, with stops in Ürgüp, Uçhisar Castle, Avanos pottery workshops, and the Rose, Red and Pigeon valleys. A licensed guide builds a route across these areas based on your time and interests." },
        { q: "Can I visit the underground cities with a guide?", a: "Yes. Cappadocia's underground cities — Derinkuyu and Kaymaklı — descend several levels into volcanic rock and once sheltered thousands of people. A guide explains the ventilation shafts, rolling stone doors and history, and makes the narrow tunnels far easier to navigate." },
      ],
      otherHeading: "Explore more of Turkey",
      otherCities: [
        { href: "/attractions/en/cappadocia", icon: "🎈", name: "Cappadocia Travel Guide", desc: "Fairy chimneys, valleys & balloon tips" },
        { href: "/istanbul-tour-guide", icon: "🕌", name: "Istanbul Tour Guide", desc: "Hagia Sophia, Grand Bazaar & the Bosphorus" },
        { href: "/ephesus-tour-guide", icon: "🏛️", name: "Ephesus Tour Guide", desc: "Ancient Roman ruins near Selçuk, İzmir" },
      ],
      ctaTitle: "Ready to explore Cappadocia?",
      ctaSub: "Download VibeGuide free. Find a local guide in 60 seconds.",
      ctaAvailability: "Free · No subscription · Cappadocia available now",
    },
    ru: {
      metaTitle: "Гид по Каппадокии — воздушные шары и туры по долинам",
      metaDescription:
        "Откройте Каппадокию с проверенным местным гидом. Полёты на воздушном шаре, долина Гёреме, подземные города, дымоходы фей — забронируйте мгновенно с VibeGuide.",
      ogDescription:
        "Откройте дымоходы фей, подземные города и воздушные шары Каппадокии с проверенным местным гидом. Мгновенное бронирование через VibeGuide.",
      keywords: [
        "гид по Каппадокии", "частный гид Каппадокия", "воздушный шар Каппадокия",
        "гид Гёреме", "тур по долинам Каппадокии", "подземный город Каппадокия",
        "экскурсия дымоходы фей", "местный гид Каппадокия", "экскурсия Учхисар", "путеводитель по Каппадокии",
      ],
      region: "Каппадокия · Турция",
      h1: "Гид по Каппадокии",
      h1Accent: "Больше, чем воздушный шар",
      heroLead:
        "Каппадокия — это гораздо больше, чем фото с воздушного шара. Откройте дымоходы фей, подземные города и древние пещерные церкви с местным жителем, который знает каждую долину.",
      ctaPrimary: "Заказать гида →",
      ctaSecondary: "Смотреть варианты экскурсий",
      highlightsKicker: "Главные впечатления",
      highlightsHeading: "Что покажет вам гид",
      highlights: [
        { icon: "🎈", name: "Воздушный шар", desc: "Рассвет над долинами Каппадокии — самое культовое приключение на воздушном шаре в мире." },
        { icon: "🏔️", name: "Долина Гёреме", desc: "Древние пещерные церкви с византийскими фресками, вырубленные в вулканической породе." },
        { icon: "🏰", name: "Крепость Учхисар", desc: "Высшая точка Каппадокии — панорамный вид на весь регион." },
        { icon: "🌋", name: "Подземный город Деринкую", desc: "Глубиной в 8 уровней, вмещал 20 000 человек. Лабиринт, высеченный 2000 лет назад." },
        { icon: "🏜️", name: "Розовая и Красная долина", desc: "Закатные прогулки среди розовых и красных скальных образований — самая киногеничная Каппадокия." },
        { icon: "🐴", name: "Верховая езда", desc: "Исследуйте долины верхом — классическое приключение Каппадокии, которое устроит ваш гид." },
      ],
      seoHeading: "Зачем открывать Каппадокию с местным гидом?",
      seoParagraphs: [
        "Каппадокия — пейзаж, которому нет равных на Земле. Миллионы лет вулканических извержений отложили мягкий туф, а ветер и вода выточили из него сюрреалистичные <strong>дымоходы фей</strong>, гребни и долины, которые вы видите сегодня. Позже ранние христиане выдолбили в породе жилища, церкви и целые подземные города. Приехавшему впервые регион может показаться необъятным — памятники разбросаны по обширному плато, а самые волшебные уголки редко бывают людными.",
        "Именно здесь <strong>лицензированный гид по Каппадокии</strong> меняет всё. Самое знаменитое зрелище региона — рассветное небо, наполненное красками: полёт на <strong>воздушном шаре</strong> на восходе над долинами — то, ради чего приезжает большинство путешественников. Хороший гид поможет спланировать день вокруг раннего старта шара, а затем выстроит остальную программу по свету — прогулки в золотой час по Розовой и Красной долинам и панорамные виды с крепости <strong>Учхисар</strong>, высшей точки региона.",
        "В сердце всего — <strong>Гёреме</strong> и его музей под открытым небом, объект Всемирного наследия ЮНЕСКО, где вырубленные в скале пещерные церкви до сих пор хранят яркие византийские фрески тысячелетней давности. Ваш гид читает истории в росписях, показывает монастырские трапезные и объясняет, как община жила внутри камня. Неподалёку городки <strong>Ургюп</strong>, <strong>Аванос</strong> — знаменитый гончарным ремеслом на берегу реки — и окрестные долины вознаграждают каждого, кто готов сойти со стандартного маршрута.",
        "А ещё есть то, что скрыто под землёй. <strong>Подземные города</strong> Каппадокии — <strong>Деринкую</strong> и <strong>Каймаклы</strong> — уходят на множество уровней вглубь земли: вентиляционные шахты, колодцы, стойла и огромные катящиеся каменные двери, которые когда-то надёжно запирали внутри тысячи людей. Узкие туннели гораздо легче понять и пройти с гидом, который знает историю и планировку. Каждый гид на VibeGuide лицензирован Министерством культуры и туризма Турции, прошёл проверку личности и получает оценку после каждой экскурсии — так что вы исследуете дымоходы фей, церкви и подземные миры Каппадокии с полной уверенностью.",
      ],
      modesKicker: "Как это работает",
      modesHeading: "Три способа открыть Каппадокию",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Местный гид мгновенно", text: "Приехали в Каппадокию без плана? Подберите проверенного местного гида за считаные минуты и начните исследовать сразу же." },
        { tag: "VibeSquad", color: C.squad, title: "Присоединиться к группе", text: "Разделите впечатление с другими путешественниками. Присоединяйтесь к небольшой групповой экскурсии по Гёреме, долинам или подземному городу." },
        { tag: "Private Tour", color: C.private, title: "Спланируйте свой день в Каппадокии", text: "Полностью частный гид на день с воздушным шаром, прогулки по долинам или ужин на закате — программа целиком под ваш маршрут." },
      ],
      trustHeading: "Каждый гид проверен",
      trustText: "Все гиды VibeGuide в Каппадокии имеют официальные лицензии Министерства культуры Турции, проходят проверку личности и получают оценку после каждой экскурсии.",
      trustBadges: ["🪪 Лицензия Министерства культуры", "✅ Личность подтверждена", "⭐ Средний рейтинг 4,9", "🚫 Политика нулевой терпимости"],
      faqHeading: "Часто задаваемые вопросы",
      faqs: [
        { q: "Сколько стоит гид в Каппадокии?", a: "Цена зависит от типа и длительности экскурсии. С VibeGuide вы видите точную стоимость ещё до бронирования — большинство частных экскурсий на полдня по Гёреме и долинам начинаются с фиксированной цены за человека, без скрытых доплат. Групповые экскурсии (VibeSquad) — самый доступный способ увидеть Каппадокию." },
        { q: "Лицензированы ли гиды VibeGuide в Каппадокии?", a: "Да. Каждый гид VibeGuide имеет официальную лицензию Министерства культуры и туризма Турции, проходит проверку личности и получает оценку после каждой экскурсии. У нас действует политика нулевой терпимости к нелицензированным гидам." },
        { q: "Может ли гид организовать полёт на воздушном шаре в Каппадокии?", a: "Местный гид VibeGuide поможет спланировать день вокруг рассветного полёта на воздушном шаре и порекомендует надёжных лицензированных операторов, но сам полёт организуется и оплачивается отдельно. Шары стартуют на рассвете, поэтому большинство гидов выстраивают остальную программу вокруг раннего начала." },
        { q: "Когда лучше всего ехать в Каппадокию?", a: "Весна (апрель–июнь) и осень (сентябрь–октябрь) дарят самую мягкую погоду и самые надёжные полёты на воздушном шаре. Лето жаркое, но шары всё равно летают на рассвете, а зима приносит волшебный снег на дымоходы фей. Гид может подстроить маршрут под сезон." },
        { q: "Какие районы Каппадокии покажет мне гид?", a: "Большинство экскурсий строится вокруг Гёреме и его музея под открытым небом, с остановками в Ургюпе, у крепости Учхисар, в гончарных мастерских Аваноса и в Розовой, Красной долинах и Долине голубей. Лицензированный гид составит маршрут по этим местам с учётом вашего времени и интересов." },
        { q: "Можно ли посетить подземные города с гидом?", a: "Да. Подземные города Каппадокии — Деринкую и Каймаклы — уходят на несколько уровней в вулканическую породу и когда-то укрывали тысячи людей. Гид объяснит вентиляционные шахты, катящиеся каменные двери и историю и сделает узкие туннели гораздо понятнее." },
      ],
      otherHeading: "Откройте больше Турции",
      otherCities: [
        { href: "/attractions/ru/cappadocia", icon: "🎈", name: "Путеводитель по Каппадокии", desc: "Дымоходы фей, долины и советы по воздушным шарам" },
        { href: "/ru/istanbul-tour-guide", icon: "🕌", name: "Гид по Стамбулу", desc: "Айя-София, Гранд-базар и Босфор" },
        { href: "/ru/ephesus-tour-guide", icon: "🏛️", name: "Гид по Эфесу", desc: "Древнеримские руины близ Сельчука, Измир" },
      ],
      ctaTitle: "Готовы открыть Каппадокию?",
      ctaSub: "Скачайте VibeGuide бесплатно. Найдите местного гида за 60 секунд.",
      ctaAvailability: "Бесплатно · Без подписки · Каппадокия доступна сейчас",
    },
    tr: {
      metaTitle: "Kapadokya Tur Rehberi — Balon ve Vadi Turları",
      metaDescription:
        "Kapadokya'yı onaylı bir yerel rehberle keşfedin. Sıcak hava balonu turları, Göreme Vadisi, yer altı şehirleri, peri bacaları — VibeGuide ile anında ayırtın.",
      ogDescription:
        "Kapadokya'nın peri bacalarını, yer altı şehirlerini ve sıcak hava balonlarını onaylı bir yerel rehberle keşfedin. VibeGuide ile anında rezervasyon.",
      keywords: [
        "Kapadokya tur rehberi", "Kapadokya özel tur", "Kapadokya balon turu",
        "Göreme rehber", "Kapadokya vadi turu", "Kapadokya yer altı şehri",
        "peri bacaları turu", "Kapadokya yerel rehber", "Uçhisar turu", "Kapadokya gezi rehberi",
      ],
      region: "Kapadokya · Türkiye",
      h1: "Kapadokya Tur Rehberi",
      h1Accent: "Balonun Ötesinde",
      heroLead:
        "Kapadokya bir balon fotoğrafından çok daha fazlasıdır. Peri bacalarını, yer altı şehirlerini ve antik kaya kiliselerini her vadiyi bilen bir yerliyle keşfedin.",
      ctaPrimary: "Hemen Rehber Bul →",
      ctaSecondary: "Tur Seçeneklerini Gör",
      highlightsKicker: "Öne Çıkan Deneyimler",
      highlightsHeading: "Rehberiniz size neleri gösterecek",
      highlights: [
        { icon: "🎈", name: "Sıcak Hava Balonu", desc: "Kapadokya vadileri üzerinde gün doğumu — dünyanın en ikonik balon deneyimi." },
        { icon: "🏔️", name: "Göreme Vadisi", desc: "Volkanik kayaya oyulmuş, Bizans fresklerini barındıran antik kaya kiliseleri." },
        { icon: "🏰", name: "Uçhisar Kalesi", desc: "Kapadokya'nın en yüksek noktası — tüm bölgeye panoramik manzara." },
        { icon: "🌋", name: "Derinkuyu Yer Altı Şehri", desc: "8 kat derinliğinde, 20.000 kişiyi barındıran, 2.000 yıl önce oyulmuş bir labirent." },
        { icon: "🏜️", name: "Güllüdere & Kızılçukur", desc: "Pembe ve kırmızı kaya oluşumları arasında gün batımı yürüyüşleri — Kapadokya'nın en sinematik hâli." },
        { icon: "🐴", name: "At Binme", desc: "Vadileri at sırtında keşfedin — rehberinizin ayarlayabileceği klasik bir Kapadokya deneyimi." },
      ],
      seoHeading: "Kapadokya'yı neden yerel bir rehberle keşfetmeli?",
      seoParagraphs: [
        "Kapadokya, dünyada eşi benzeri olmayan bir coğrafyadır. Milyonlarca yıllık volkanik patlamalar yumuşak tüf kayasını oluşturmuş, rüzgâr ve su da onu bugün gördüğünüz sürreal <strong>peri bacaları</strong>, sırtlar ve vadiler hâline oymuştur. İlk Hristiyanlar ise kayayı evlere, kiliselere ve koca yer altı şehirlerine dönüştürmüştür. Şehre ilk kez gelen biri için bölge bunaltıcı gelebilir — noktalar geniş bir platoya yayılmıştır ve en büyülü köşeler nadiren en kalabalık olanlardır.",
        "İşte tam da burada <strong>lisanslı bir Kapadokya tur rehberi</strong> her şeyi değiştirir. Bölgenin en ünlü manzarası, renklerle dolan şafak göküdür: gün doğumunda vadiler üzerinde bir <strong>sıcak hava balonu</strong> turu, çoğu gezginin buraya gelme sebebidir. İyi bir rehber gününüzü erken bir balon kalkışına göre planlamanıza yardımcı olur, sonra günün geri kalanını ışığa göre kurar — Güllüdere ve Kızılçukur'da altın saat yürüyüşleri ve bölgenin en yüksek noktası olan <strong>Uçhisar</strong> Kalesi'nden panoramik manzaralar.",
        "Her şeyin merkezinde <strong>Göreme</strong> ve açık hava müzesi yer alır; kayaya oyulmuş kilise kiliselerinin bin yıllık canlı Bizans fresklerini hâlâ koruduğu bir UNESCO Dünya Mirası alanıdır. Rehberiniz resimlerdeki hikâyeleri okur, manastır yemekhanelerini gösterir ve bir topluluğun taşın içinde nasıl yaşadığını anlatır. Yakınlarda; <strong>Ürgüp</strong>, çömlekçiliğiyle ünlü nehir kıyısı kasabası <strong>Avanos</strong> ve çevrelerindeki vadiler, standart rotanın dışına çıkmaya istekli herkesi ödüllendirir.",
        "Bir de yer altında olanlar var. Kapadokya'nın <strong>yer altı şehirleri</strong> — <strong>Derinkuyu</strong> ve <strong>Kaymaklı</strong> — havalandırma bacaları, kuyular, ahırlar ve bir zamanlar binlerce insanı güvenle içeride tutan devasa yuvarlanan taş kapılarıyla toprağın derinliklerine katlarca iner. Bu dar tünelleri, tarihi ve yerleşimi bilen bir rehberle anlamak ve gezmek çok daha kolaydır. VibeGuide'daki her rehber T.C. Kültür ve Turizm Bakanlığı tarafından lisanslıdır, kimliği doğrulanmıştır ve her turdan sonra değerlendirilir — böylece Kapadokya'nın peri bacalarını, kiliselerini ve yer altı dünyalarını tam bir güvenle keşfedersiniz.",
      ],
      modesKicker: "Nasıl çalışır",
      modesHeading: "Kapadokya'yı keşfetmenin üç yolu",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Anında yerel rehber", text: "Kapadokya'ya planınız olmadan mı geldiniz? Dakikalar içinde onaylı bir yerel rehberle eşleşin ve hemen keşfe başlayın." },
        { tag: "VibeSquad", color: C.squad, title: "Bir gruba katıl", text: "Deneyimi başka gezginlerle paylaşın. Göreme'yi, vadileri ya da bir yer altı şehrini gezen küçük bir grup turuna katılın." },
        { tag: "Private Tour", color: C.private, title: "Kapadokya gününüzü planlayın", text: "Balon günü, vadi yürüyüşleri ya da gün batımı yemeği için tümüyle programınıza göre tasarlanmış, tamamen özel bir rehber." },
      ],
      trustHeading: "Her rehber onaylıdır",
      trustText: "Kapadokya'daki tüm VibeGuide tur rehberleri T.C. Kültür ve Turizm Bakanlığı'nın resmî lisansına sahiptir, kimlik doğrulamasından geçer ve her turdan sonra değerlendirilir.",
      trustBadges: ["🪪 Kültür Bakanlığı lisanslı", "✅ Kimlik doğrulandı", "⭐ 4,9 ortalama puan", "🚫 Sıfır tolerans politikası"],
      faqHeading: "Sıkça sorulan sorular",
      faqs: [
        { q: "Kapadokya'da bir tur rehberi ne kadar tutar?", a: "Fiyatlar tur türüne ve uzunluğuna göre değişir. VibeGuide ile rezervasyondan önce tam fiyatı görürsünüz — Göreme ve vadilerdeki çoğu yarım günlük özel tur, gizli ücret olmadan kişi başı sabit bir fiyatla başlar. Grup turları (VibeSquad) Kapadokya'yı keşfetmenin en uygun yoludur." },
        { q: "VibeGuide'ın Kapadokya rehberleri lisanslı mı?", a: "Evet. VibeGuide'daki her rehber T.C. Kültür ve Turizm Bakanlığı'nın resmî lisansına sahiptir, kimlik doğrulamasından geçer ve her turdan sonra değerlendirilir. Lisanssız rehberliğe karşı sıfır tolerans politikamız vardır." },
        { q: "Rehber, Kapadokya'da sıcak hava balonu turu ayarlayabilir mi?", a: "VibeGuide yerel rehberiniz gününüzü gün doğumundaki bir sıcak hava balonu uçuşuna göre planlamanıza yardımcı olur ve güvenilir, lisanslı balon firmaları önerir — ancak balon turunun kendisi ayrı olarak işletilir ve biletlenir. Balonlar şafakta kalktığı için çoğu rehber günün geri kalanını erken bir başlangıca göre kurar." },
        { q: "Kapadokya'yı ziyaret etmek için en iyi zaman ne?", a: "İlkbahar (Nisan–Haziran) ve sonbahar (Eylül–Ekim) en ılıman havayı ve en güvenilir sıcak hava balonu uçuşlarını sunar. Yaz sıcaktır ama balonlar yine şafakta uçar; kış ise peri bacalarının üzerine büyülü bir kar getirir. Rehberiniz rotayı mevsime göre uyarlayabilir." },
        { q: "Rehber bana Kapadokya'nın hangi bölgelerini gösterir?", a: "Çoğu tur, Göreme ve açık hava müzesi çevresinde şekillenir; Ürgüp, Uçhisar Kalesi, Avanos çömlek atölyeleri ve Güllüdere, Kızılçukur ile Güvercinlik vadilerinde duraklar yapılır. Lisanslı bir rehber, süreniz ve ilgi alanlarınıza göre bu bölgeler arasında bir rota kurar." },
        { q: "Yer altı şehirlerini bir rehberle gezebilir miyim?", a: "Evet. Kapadokya'nın yer altı şehirleri — Derinkuyu ve Kaymaklı — volkanik kayanın içine katlarca iner ve bir zamanlar binlerce insanı barındırmıştır. Bir rehber havalandırma bacalarını, yuvarlanan taş kapıları ve tarihi anlatır, dar tünellerde gezmeyi çok daha kolay hâle getirir." },
      ],
      otherHeading: "Türkiye'yi keşfetmeye devam edin",
      otherCities: [
        { href: "/attractions/tr/cappadocia", icon: "🎈", name: "Kapadokya Gezi Rehberi", desc: "Peri bacaları, vadiler ve balon ipuçları" },
        { href: "/tr/istanbul-tour-guide", icon: "🕌", name: "İstanbul Tur Rehberi", desc: "Ayasofya, Kapalıçarşı ve Boğaz" },
        { href: "/tr/ephesus-tour-guide", icon: "🏛️", name: "Efes Tur Rehberi", desc: "Selçuk, İzmir yakınlarındaki antik Roma kalıntıları" },
      ],
      ctaTitle: "Kapadokya'yı keşfetmeye hazır mısınız?",
      ctaSub: "VibeGuide'ı ücretsiz indirin. 60 saniyede yerel bir rehber bulun.",
      ctaAvailability: "Ücretsiz · Abonelik yok · Kapadokya şimdi müsait",
    },
    pl: {
      metaTitle: "Przewodnik po Kapadocji — Balony i Wycieczki po Dolinach",
      metaDescription:
        "Zwiedzaj Kapadocję ze zweryfikowanym lokalnym przewodnikiem. Loty balonem, Dolina Göreme, podziemne miasta, kominy wróżek — zarezerwuj od ręki z VibeGuide.",
      ogDescription:
        "Odkryj kominy wróżek, podziemne miasta i balony Kapadocji ze zweryfikowanym lokalnym przewodnikiem. Błyskawiczna rezerwacja przez VibeGuide.",
      keywords: [
        "przewodnik Kapadocja", "prywatna wycieczka Kapadocja", "balon Kapadocja",
        "przewodnik Göreme", "wycieczka po dolinach Kapadocji", "podziemne miasto Kapadocja",
        "wycieczka kominy wróżek", "lokalny przewodnik Kapadocja", "wycieczka Uçhisar", "Kapadocja przewodnik turystyczny",
      ],
      region: "Kapadocja · Turcja",
      h1: "Przewodnik po Kapadocji",
      h1Accent: "Więcej niż Balon",
      heroLead:
        "Kapadocja to coś więcej niż zdjęcie z balonem. Odkryj kominy wróżek, podziemne miasta i starożytne kościoły w skałach z miejscowym, który zna każdą dolinę.",
      ctaPrimary: "Zarezerwuj Przewodnika →",
      ctaSecondary: "Zobacz Opcje Wycieczek",
      highlightsKicker: "Najlepsze Przeżycia",
      highlightsHeading: "Co pokaże Ci Twój przewodnik",
      highlights: [
        { icon: "🎈", name: "Balon na Ogrzane Powietrze", desc: "Wschód słońca nad dolinami Kapadocji — najbardziej kultowe przeżycie balonowe na świecie." },
        { icon: "🏔️", name: "Dolina Göreme", desc: "Starożytne kościoły w skałach z bizantyjskimi freskami, wykute w wulkanicznej skale." },
        { icon: "🏰", name: "Zamek Uçhisar", desc: "Najwyższy punkt Kapadocji — panoramiczne widoki na cały region." },
        { icon: "🌋", name: "Podziemne Miasto Derinkuyu", desc: "Osiem poziomów w głąb ziemi, mieszkało tu 20 000 osób. Labirynt wykuty 2000 lat temu." },
        { icon: "🏜️", name: "Dolina Różana i Czerwona", desc: "Wędrówki o zachodzie słońca wśród różowych i czerwonych formacji skalnych — Kapadocja jak z filmu." },
        { icon: "🐴", name: "Jazda Konna", desc: "Odkryj doliny na końskim grzbiecie — klasyczne przeżycie w Kapadocji, które przewodnik może zorganizować." },
      ],
      seoHeading: "Dlaczego warto zwiedzać Kapadocję z lokalnym przewodnikiem?",
      seoParagraphs: [
        "Kapadocja to krajobraz, jakiego nie znajdziesz nigdzie indziej na Ziemi. Miliony lat wybuchów wulkanów utworzyły miękki tuf, który wiatr i woda wyrzeźbiły w surrealistyczne <strong>kominy wróżek</strong>, granie i doliny, jakie widzisz dzisiaj. Później pierwsi chrześcijanie wydrążyli w skale domy, kościoły i całe podziemne miasta. Dla kogoś, kto przyjeżdża po raz pierwszy, region bywa przytłaczający — zabytki rozciągają się na rozległym płaskowyżu, a najbardziej magiczne zakątki rzadko są tymi zatłoczonymi.",
        "I tu wszystko zmienia <strong>licencjonowany przewodnik po Kapadocji</strong>. Najsłynniejszym widokiem regionu jest niebo o świcie pełne kolorów: lot <strong>balonem na ogrzane powietrze</strong> o wschodzie słońca nad dolinami to przeżycie, dla którego przyjeżdża większość podróżników. Dobry przewodnik pomoże Ci zaplanować dzień wokół wczesnego startu balonu, a resztę ułoży według światła — wędrówki w złotej godzinie przez Dolinę Różaną i Czerwoną oraz panoramiczne widoki z zamku w <strong>Uçhisar</strong>, najwyższego punktu regionu.",
        "W samym sercu tego wszystkiego leży <strong>Göreme</strong> i jego skansen pod gołym niebem, wpisany na listę światowego dziedzictwa UNESCO, gdzie wykute w skale kościoły wciąż przechowują żywe bizantyjskie freski sprzed tysiąca lat. Twój przewodnik odczytuje historie z malowideł, wskazuje klasztorne refektarze i wyjaśnia, jak wspólnota żyła wewnątrz kamienia. W pobliżu miasteczka <strong>Ürgüp</strong>, <strong>Avanos</strong> — słynące z nadrzecznej ceramiki — oraz otaczające je doliny wynagradzają każdego, kto zejdzie z utartego szlaku.",
        "A potem jest jeszcze to, co kryje się pod ziemią. Kapadockie <strong>podziemne miasta</strong> — <strong>Derinkuyu</strong> i <strong>Kaymaklı</strong> — schodzą wiele poziomów w głąb ziemi, z szybami wentylacyjnymi, studniami, stajniami i ogromnymi toczonymi kamiennymi drzwiami, które niegdyś bezpiecznie zamykały w środku tysiące ludzi. Wąskie tunele znacznie łatwiej zrozumieć i przejść z przewodnikiem, który zna historię i układ korytarzy. Każdy przewodnik w VibeGuide posiada licencję tureckiego Ministerstwa Kultury i Turystyki, ma zweryfikowaną tożsamość i jest oceniany po każdej wycieczce — dzięki temu odkrywasz kominy wróżek, kościoły i podziemne światy Kapadocji z pełnym spokojem.",
      ],
      modesKicker: "Jak to działa",
      modesHeading: "Trzy sposoby na zwiedzanie Kapadocji",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Lokalny przewodnik od ręki", text: "Dotarłeś do Kapadocji bez planu? Dopasuj się do zweryfikowanego lokalnego przewodnika w kilka minut i od razu ruszaj w drogę." },
        { tag: "VibeSquad", color: C.squad, title: "Dołącz do grupy", text: "Podziel się przeżyciem z innymi podróżnikami. Dołącz do niewielkiej grupowej wycieczki po Göreme, dolinach lub podziemnym mieście." },
        { tag: "Private Tour", color: C.private, title: "Zaplanuj swój dzień w Kapadocji", text: "W pełni prywatny przewodnik na dzień z balonem, wędrówki po dolinach lub kolację o zachodzie słońca — zaprojektowany całkowicie wokół Twojego planu." },
      ],
      trustHeading: "Każdy przewodnik jest zweryfikowany",
      trustText: "Wszyscy przewodnicy VibeGuide w Kapadocji posiadają oficjalne licencje tureckiego Ministerstwa Kultury, przechodzą weryfikację tożsamości i są oceniani po każdej wycieczce.",
      trustBadges: ["🪪 Licencja Ministerstwa Kultury", "✅ Zweryfikowana tożsamość", "⭐ Śr. ocena 4,9", "🚫 Polityka zero tolerancji"],
      faqHeading: "Najczęściej zadawane pytania",
      faqs: [
        { q: "Ile kosztuje przewodnik w Kapadocji?", a: "Ceny zależą od rodzaju i długości wycieczki. Dzięki VibeGuide widzisz dokładną cenę przed rezerwacją — większość prywatnych półdniowych wycieczek po Göreme i dolinach zaczyna się od stałej stawki za osobę, bez ukrytych opłat. Wycieczki grupowe (VibeSquad) to najtańszy sposób na poznanie Kapadocji." },
        { q: "Czy przewodnicy VibeGuide w Kapadocji są licencjonowani?", a: "Tak. Każdy przewodnik w VibeGuide posiada oficjalną licencję tureckiego Ministerstwa Kultury i Turystyki, przechodzi weryfikację tożsamości i jest oceniany po każdej wycieczce. Stosujemy politykę zero tolerancji wobec nielicencjonowanego przewodnictwa." },
        { q: "Czy przewodnik może zorganizować lot balonem w Kapadocji?", a: "Twój lokalny przewodnik VibeGuide pomoże Ci zaplanować dzień wokół porannego lotu balonem i poleci sprawdzonych, licencjonowanych operatorów balonów — sam lot jest jednak obsługiwany i biletowany osobno. Balony startują o świcie, dlatego większość przewodników układa resztę dnia wokół wczesnego początku." },
        { q: "Kiedy najlepiej odwiedzić Kapadocję?", a: "Wiosna (kwiecień–czerwiec) i jesień (wrzesień–październik) oferują najłagodniejszą pogodę i najpewniejsze loty balonem. Lato jest gorące, ale balony wciąż latają o świcie, a zima przynosi magiczny śnieg na kominach wróżek. Przewodnik dostosuje trasę do pory roku." },
        { q: "Które rejony Kapadocji pokaże mi przewodnik?", a: "Większość wycieczek skupia się wokół Göreme i jego skansenu pod gołym niebem, z przystankami w Ürgüp, przy zamku Uçhisar, w warsztatach ceramiki w Avanos oraz w Dolinie Różanej, Czerwonej i Gołębiej. Licencjonowany przewodnik ułoży trasę przez te miejsca zależnie od Twojego czasu i zainteresowań." },
        { q: "Czy mogę zwiedzić podziemne miasta z przewodnikiem?", a: "Tak. Kapadockie podziemne miasta — Derinkuyu i Kaymaklı — schodzą kilka poziomów w wulkaniczną skałę i niegdyś dawały schronienie tysiącom ludzi. Przewodnik wyjaśnia szyby wentylacyjne, toczone kamienne drzwi i historię, a także znacznie ułatwia poruszanie się po wąskich tunelach." },
      ],
      otherHeading: "Odkryj więcej Turcji",
      otherCities: [
        { href: "/pl/istanbul-tour-guide", icon: "🕌", name: "Przewodnik po Stambule", desc: "Hagia Sophia, Wielki Bazar i Bosfor" },
        { href: "/pl/ephesus-tour-guide", icon: "🏛️", name: "Przewodnik po Efezie", desc: "Starożytne rzymskie ruiny koło Selçuk, Izmir" },
      ],
      ctaTitle: "Gotów, by odkryć Kapadocję?",
      ctaSub: "Pobierz VibeGuide za darmo. Znajdź lokalnego przewodnika w 60 sekund.",
      ctaAvailability: "Za darmo · Bez abonamentu · Kapadocja dostępna już teraz",
    },
    nl: {
      metaTitle: "Reisgids Cappadocië — Luchtballon- & Valleitours",
      metaDescription:
        "Ontdek Cappadocië met een geverifieerde lokale gids. Luchtballontochten, de Görevallei, ondergrondse steden, sprookjesschoorstenen — boek direct met VibeGuide.",
      ogDescription:
        "Ontdek de sprookjesschoorstenen, ondergrondse steden en luchtballonnen van Cappadocië met een geverifieerde lokale gids. Direct boeken via VibeGuide.",
      keywords: [
        "gids Cappadocië", "privétour Cappadocië", "luchtballon Cappadocië",
        "gids Göreme", "valleitour Cappadocië", "ondergrondse stad Cappadocië",
        "sprookjesschoorstenen tour", "lokale gids Cappadocië", "Uçhisar tour", "reisgids Cappadocië",
      ],
      region: "Cappadocië · Turkije",
      h1: "Reisgids Cappadocië",
      h1Accent: "Meer dan de ballon",
      heroLead:
        "Cappadocië is meer dan een ballonfoto. Ontdek sprookjesschoorstenen, ondergrondse steden en eeuwenoude rotskerken met een local die elke vallei kent.",
      ctaPrimary: "Boek nu een gids →",
      ctaSecondary: "Bekijk de touropties",
      highlightsKicker: "Topervaringen",
      highlightsHeading: "Wat je gids je laat zien",
      highlights: [
        { icon: "🎈", name: "Luchtballon", desc: "Zonsopgang boven de valleien van Cappadocië — de meest iconische ballonervaring ter wereld." },
        { icon: "🏔️", name: "Görevallei", desc: "Eeuwenoude rotskerken met Byzantijnse fresco's, uitgehouwen in vulkanisch gesteente." },
        { icon: "🏰", name: "Kasteel van Uçhisar", desc: "Het hoogste punt van Cappadocië — panoramisch uitzicht over de hele regio." },
        { icon: "🌋", name: "Ondergrondse stad Derinkuyu", desc: "8 verdiepingen diep, ooit thuis voor 20.000 mensen. Een 2.000 jaar oud labyrint." },
        { icon: "🏜️", name: "Rode & Rozenvallei", desc: "Wandelingen bij zonsondergang door roze en rode rotsformaties — Cappadocië op zijn filmischst." },
        { icon: "🐴", name: "Paardrijden", desc: "Verken de valleien te paard — een klassieke Cappadocië-ervaring die je gids kan regelen." },
      ],
      seoHeading: "Waarom Cappadocië ontdekken met een lokale gids?",
      seoParagraphs: [
        "Cappadocië is een landschap dat nergens anders op aarde te vinden is. Miljoenen jaren vulkaanuitbarstingen legden zacht tufsteen neer, dat door wind en water is uitgesleten tot de surrealistische <strong>sprookjesschoorstenen</strong>, richels en valleien die je vandaag ziet. Vroege christenen holden het gesteente vervolgens uit tot huizen, kerken en hele ondergrondse steden. Voor wie er voor het eerst komt, kan de regio overweldigend aanvoelen — de bezienswaardigheden liggen verspreid over een uitgestrekt plateau, en de meest magische plekjes zijn zelden de drukste.",
        "Daar maakt een <strong>erkende gids in Cappadocië</strong> het verschil. De beroemdste aanblik van de regio is de dageraadhemel vol kleur: een tocht met een <strong>luchtballon</strong> bij zonsopgang boven de valleien is de ervaring waarvoor de meeste reizigers komen. Een goede gids helpt je je dag te plannen rond een vroege ballonvaart en bouwt de rest van de dag op rond het licht — wandelingen tijdens het gouden uur door de Rode en Rozenvallei, en panoramische uitzichten vanaf het kasteel van <strong>Uçhisar</strong>, het hoogste punt van de regio.",
        "In het hart van dit alles ligt <strong>Göreme</strong> met zijn openluchtmuseum, een UNESCO-werelderfgoed waar rotskerken uitgehouwen in de stenen nog altijd levendige Byzantijnse fresco's van duizend jaar oud bewaren. Je gids leest de verhalen in de schilderingen, wijst de monastieke refters aan en legt uit hoe een gemeenschap in de rots leefde. Vlakbij belonen de stadjes <strong>Ürgüp</strong>, <strong>Avanos</strong> — beroemd om zijn aardewerk langs de rivier — en de omliggende valleien iedereen die de standaardroute durft te verlaten.",
        "En dan is er wat zich onder de grond bevindt. De <strong>ondergrondse steden</strong> van Cappadocië — <strong>Derinkuyu</strong> en <strong>Kaymaklı</strong> — dalen vele verdiepingen de aarde in, compleet met ventilatieschachten, waterputten, stallen en enorme ronde steendeuren die ooit duizenden mensen veilig binnen opsloten. De smalle tunnels zijn veel makkelijker te begrijpen en te doorkruisen met een gids die de geschiedenis en de indeling kent. Elke gids op VibeGuide is erkend door het Turkse Ministerie van Cultuur en Toerisme, geïdentificeerd en na elke tour beoordeeld — zodat je de sprookjesschoorstenen, kerken en ondergrondse werelden van Cappadocië met een volledig gerust hart ontdekt.",
      ],
      modesKicker: "Zo werkt het",
      modesHeading: "Drie manieren om Cappadocië te ontdekken",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Direct een lokale gids", text: "Aangekomen in Cappadocië zonder plan? Match binnen enkele minuten met een geverifieerde lokale gids en begin meteen met ontdekken." },
        { tag: "VibeSquad", color: C.squad, title: "Sluit je aan bij een groep", text: "Deel de ervaring met andere reizigers. Sluit je aan bij een kleine groepstour door Göreme, de valleien of een ondergrondse stad." },
        { tag: "Private Tour", color: C.private, title: "Plan je dag in Cappadocië", text: "Volledig privégids voor de ballondag, valleiwandelingen of een diner bij zonsondergang — geheel opgebouwd rond jouw programma." },
      ],
      trustHeading: "Elke gids is geverifieerd",
      trustText: "Alle VibeGuide-gidsen in Cappadocië beschikken over een officiële licentie van het Turkse Ministerie van Cultuur, doorlopen een identiteitscontrole en worden na elke tour beoordeeld.",
      trustBadges: ["🪪 Erkend door het Ministerie van Cultuur", "✅ Identiteit geverifieerd", "⭐ 4,9 gemiddelde score", "🚫 Zerotolerancebeleid"],
      faqHeading: "Veelgestelde vragen",
      faqs: [
        { q: "Wat kost een gids in Cappadocië?", a: "De prijzen hangen af van het type tour en de duur. Met VibeGuide zie je de exacte prijs vóór je boekt — de meeste privétours van een halve dag door Göreme en de valleien beginnen bij een vast tarief per persoon, zonder verborgen kosten. Groepstours (VibeSquad) zijn de voordeligste manier om Cappadocië te ontdekken." },
        { q: "Zijn de gidsen van VibeGuide in Cappadocië erkend?", a: "Ja. Elke gids op VibeGuide beschikt over een officiële licentie van het Turkse Ministerie van Cultuur en Toerisme, doorloopt een identiteitscontrole en wordt na elke tour beoordeeld. We hanteren een zerotolerancebeleid voor gidsen zonder licentie." },
        { q: "Kan een gids een luchtballontocht in Cappadocië regelen?", a: "Je lokale VibeGuide-gids kan je helpen je dag te plannen rond een ballonvaart bij zonsopgang en betrouwbare, erkende ballonoperators aanbevelen — maar de ballonvaart zelf wordt apart uitgevoerd en geboekt. Ballonnen vertrekken bij dageraad, dus de meeste gidsen bouwen de rest van je dag op rond een vroege start." },
        { q: "Wat is de beste tijd om Cappadocië te bezoeken?", a: "De lente (april–juni) en de herfst (september–oktober) bieden het mildste weer en de meest betrouwbare ballonvaarten. De zomer is heet, maar de ballonnen vliegen nog steeds bij dageraad, en de winter brengt betoverende sneeuw over de sprookjesschoorstenen. Je gids kan de route aanpassen aan het seizoen." },
        { q: "Welke gebieden van Cappadocië laat een gids me zien?", a: "De meeste tours draaien om Göreme en zijn openluchtmuseum, met stops in Ürgüp, het kasteel van Uçhisar, de aardewerkwerkplaatsen van Avanos en de Rozen-, Rode en Duivenvallei. Een erkende gids stelt een route door deze gebieden samen op basis van je tijd en interesses." },
        { q: "Kan ik de ondergrondse steden met een gids bezoeken?", a: "Ja. De ondergrondse steden van Cappadocië — Derinkuyu en Kaymaklı — dalen meerdere verdiepingen de vulkanische rots in en boden ooit onderdak aan duizenden mensen. Een gids legt de ventilatieschachten, ronde steendeuren en geschiedenis uit, en maakt de smalle tunnels veel makkelijker te doorkruisen." },
      ],
      otherHeading: "Ontdek meer van Turkije",
      otherCities: [
        { href: "/nl/istanbul-tour-guide", icon: "🕌", name: "Reisgids Istanboel", desc: "Hagia Sophia, Grote Bazaar & de Bosporus" },
        { href: "/nl/ephesus-tour-guide", icon: "🏛️", name: "Reisgids Efeze", desc: "Antieke Romeinse ruïnes bij Selçuk, İzmir" },
      ],
      ctaTitle: "Klaar om Cappadocië te ontdekken?",
      ctaSub: "Download VibeGuide gratis. Vind een lokale gids in 60 seconden.",
      ctaAvailability: "Gratis · Geen abonnement · Cappadocië nu beschikbaar",
    },
    de: {
      metaTitle: "Kappadokien Reiseführer — Heißluftballon- & Tal-Touren",
      metaDescription:
        "Entdecke Kappadokien mit einem verifizierten lokalen Reiseführer. Heißluftballonfahrten, das Göreme-Tal, unterirdische Städte, Feenkamine — sofort buchbar mit VibeGuide.",
      ogDescription:
        "Entdecke Kappadokiens Feenkamine, unterirdische Städte und Heißluftballons mit einem verifizierten lokalen Guide. Sofortbuchung über VibeGuide.",
      keywords: [
        "Kappadokien Reiseführer", "Kappadokien private Tour", "Heißluftballon Kappadokien",
        "Göreme Reiseführer", "Kappadokien Tal Tour", "unterirdische Stadt Kappadokien",
        "Feenkamine Tour", "lokaler Guide Kappadokien", "Uçhisar Tour", "Kappadokien Reiseführer",
      ],
      region: "Kappadokien · Türkei",
      h1: "Kappadokien Reiseführer",
      h1Accent: "Mehr als der Ballon",
      heroLead:
        "Kappadokien ist mehr als ein Ballonfoto. Entdecke Feenkamine, unterirdische Städte und uralte Höhlenkirchen mit einem Einheimischen, der jedes Tal kennt.",
      ctaPrimary: "Jetzt Guide buchen →",
      ctaSecondary: "Touroptionen ansehen",
      highlightsKicker: "Top-Erlebnisse",
      highlightsHeading: "Was dein Guide dir zeigt",
      highlights: [
        { icon: "🎈", name: "Heißluftballon", desc: "Sonnenaufgang über den Tälern Kappadokiens — das ikonischste Ballonerlebnis der Welt." },
        { icon: "🏔️", name: "Göreme-Tal", desc: "Uralte Höhlenkirchen mit byzantinischen Fresken, in vulkanisches Gestein gehauen." },
        { icon: "🏰", name: "Burg Uçhisar", desc: "Der höchste Punkt Kappadokiens — Panoramablick über die gesamte Region." },
        { icon: "🌋", name: "Unterirdische Stadt Derinkuyu", desc: "8 Ebenen tief, einst Heimat für 20.000 Menschen. Ein vor 2.000 Jahren gehauenes Labyrinth." },
        { icon: "🏜️", name: "Rosen- & Rotes Tal", desc: "Wanderungen bei Sonnenuntergang durch rosa und rote Felsformationen — Kappadokien von seiner filmreifsten Seite." },
        { icon: "🐴", name: "Reiten", desc: "Erkunde die Täler zu Pferd — ein klassisches Kappadokien-Erlebnis, das dein Guide organisieren kann." },
      ],
      seoHeading: "Warum Kappadokien mit einem lokalen Guide entdecken?",
      seoParagraphs: [
        "Kappadokien ist eine Landschaft wie keine andere auf der Erde. Millionen Jahre vulkanischer Ausbrüche legten weiches Tuffgestein an, und Wind und Wasser formten daraus die surrealen <strong>Feenkamine</strong>, Grate und Täler, die du heute siehst. Frühe Christen höhlten das Gestein später zu Wohnungen, Kirchen und ganzen unterirdischen Städten aus. Für Erstbesucher kann die Region überwältigend wirken — die Stätten verteilen sich über ein weites Plateau, und die magischsten Ecken sind selten die belebten.",
        "Genau hier macht ein <strong>lizenzierter Kappadokien-Reiseführer</strong> den Unterschied. Die berühmteste Sehenswürdigkeit der Region ist der farbenfrohe Morgenhimmel: eine <strong>Heißluftballon</strong>fahrt bei Sonnenaufgang über den Tälern ist das Erlebnis, für das die meisten Reisenden kommen. Ein guter Guide hilft dir, rund um einen frühen Ballonstart zu planen, und gestaltet den Rest des Tages nach dem Licht — Wanderungen zur goldenen Stunde durch das Rosen- und Rote Tal sowie Panoramablicke von der Burg <strong>Uçhisar</strong>, dem höchsten Punkt der Region.",
        "Im Herzen von allem liegt <strong>Göreme</strong> mit seinem Freilichtmuseum, einem UNESCO-Welterbe, in dem in den Fels gehauene Höhlenkirchen noch immer lebendige, tausend Jahre alte byzantinische Fresken bewahren. Dein Guide liest die Geschichten in den Malereien, weist auf die Klosterrefektorien hin und erklärt, wie eine Gemeinschaft im Stein lebte. In der Nähe belohnen die Städte <strong>Ürgüp</strong>, <strong>Avanos</strong> — berühmt für seine Töpferei am Fluss — und die umliegenden Täler jeden, der die Standardroute verlässt.",
        "Und dann ist da noch, was darunter liegt. Kappadokiens <strong>unterirdische Städte</strong> — <strong>Derinkuyu</strong> und <strong>Kaymaklı</strong> — reichen viele Ebenen tief in die Erde, mit Belüftungsschächten, Brunnen, Ställen und riesigen rollenden Steintüren, die einst Tausende Menschen sicher im Inneren verschlossen. Die engen Tunnel lassen sich mit einem Guide, der Geschichte und Aufbau kennt, viel leichter verstehen und durchqueren. Jeder Guide bei VibeGuide ist vom türkischen Kultusministerium lizenziert, identitätsgeprüft und wird nach jeder Tour bewertet — damit du die Feenkamine, Kirchen und unterirdischen Welten Kappadokiens mit vollem Vertrauen erkundest.",
      ],
      modesKicker: "So funktioniert's",
      modesHeading: "Drei Wege, Kappadokien zu entdecken",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Sofort-Guide vor Ort", text: "Ohne Plan in Kappadokien angekommen? Lass dich in Minuten mit einem verifizierten lokalen Guide vermitteln und leg sofort los." },
        { tag: "VibeSquad", color: C.squad, title: "Einer Gruppe beitreten", text: "Teile das Erlebnis mit anderen Reisenden. Schließe dich einer kleinen Gruppentour durch Göreme, die Täler oder eine unterirdische Stadt an." },
        { tag: "Private Tour", color: C.private, title: "Plane deinen Kappadokien-Tag", text: "Voll privater Guide für den Ballontag, Talwanderungen oder ein Dinner bei Sonnenuntergang — ganz nach deinem Programm gestaltet." },
      ],
      trustHeading: "Jeder Guide ist verifiziert",
      trustText: "Alle VibeGuide-Reiseführer in Kappadokien besitzen offizielle Lizenzen des türkischen Kultusministeriums, durchlaufen eine Identitätsprüfung und werden nach jeder Tour bewertet.",
      trustBadges: ["🪪 Lizenziert vom Kultusministerium", "✅ Identität geprüft", "⭐ 4,9 Ø-Bewertung", "🚫 Null-Toleranz-Politik"],
      faqHeading: "Häufig gestellte Fragen",
      faqs: [
        { q: "Wie viel kostet ein Reiseführer in Kappadokien?", a: "Die Preise hängen von Tourart und Dauer ab. Mit VibeGuide siehst du den genauen Preis schon vor der Buchung — die meisten privaten Halbtagestouren durch Göreme und die Täler beginnen bei einem festen Preis pro Person, ohne versteckte Gebühren. Gruppentouren (VibeSquad) sind die günstigste Art, Kappadokien zu erkunden." },
        { q: "Sind die Kappadokien-Guides von VibeGuide lizenziert?", a: "Ja. Jeder Guide bei VibeGuide besitzt eine offizielle Lizenz des türkischen Ministeriums für Kultur und Tourismus, durchläuft eine Identitätsprüfung und wird nach jeder Tour bewertet. Für unlizenzierte Führungen gilt bei uns eine Null-Toleranz-Politik." },
        { q: "Kann ein Guide eine Heißluftballonfahrt in Kappadokien organisieren?", a: "Dein VibeGuide vor Ort hilft dir, deinen Tag rund um eine Heißluftballonfahrt im Morgengrauen zu planen, und empfiehlt seriöse, lizenzierte Ballonanbieter — die Ballonfahrt selbst wird jedoch separat durchgeführt und gebucht. Die Ballons starten im Morgengrauen, daher planen die meisten Guides den restlichen Tag um einen frühen Start herum." },
        { q: "Wann ist die beste Reisezeit für Kappadokien?", a: "Frühling (April–Juni) und Herbst (September–Oktober) bieten das mildeste Wetter und die zuverlässigsten Heißluftballonfahrten. Der Sommer ist heiß, aber die Ballons fliegen weiterhin im Morgengrauen, und der Winter bringt zauberhaften Schnee über die Feenkamine. Dein Guide kann die Route an die Jahreszeit anpassen." },
        { q: "Welche Gegenden Kappadokiens zeigt mir ein Guide?", a: "Die meisten Touren konzentrieren sich auf Göreme und sein Freilichtmuseum, mit Stopps in Ürgüp, der Burg von Uçhisar, den Töpferwerkstätten von Avanos sowie dem Rosen-, Rot- und Taubental. Ein lizenzierter Guide stellt eine Route durch diese Gebiete passend zu deiner Zeit und deinen Interessen zusammen." },
        { q: "Kann ich mit einem Guide die unterirdischen Städte besuchen?", a: "Ja. Kappadokiens unterirdische Städte — Derinkuyu und Kaymaklı — reichen mehrere Ebenen tief in den vulkanischen Fels und beherbergten einst Tausende von Menschen. Ein Guide erklärt die Lüftungsschächte, die rollenden Steintüren und die Geschichte und erleichtert die Orientierung in den engen Tunneln erheblich." },
      ],
      otherHeading: "Mehr von der Türkei entdecken",
      otherCities: [
        { href: "/attractions/de/cappadocia", icon: "🎈", name: "Kappadokien Reiseführer", desc: "Feenkamine, Täler & Ballon-Tipps" },
        { href: "/de/istanbul-tour-guide", icon: "🕌", name: "Istanbul Reiseführer", desc: "Hagia Sophia, Großer Basar & der Bosporus" },
        { href: "/de/ephesus-tour-guide", icon: "🏛️", name: "Ephesus Reiseführer", desc: "Antike römische Ruinen bei Selçuk, İzmir" },
      ],
      ctaTitle: "Bereit, Kappadokien zu entdecken?",
      ctaSub: "Lade VibeGuide kostenlos. Finde einen lokalen Guide in 60 Sekunden.",
      ctaAvailability: "Kostenlos · Kein Abo · Kappadokien jetzt verfügbar",
    },
    es: {
      metaTitle: "Guía Turístico de Capadocia — Globo Aerostático y Tours de Valles",
      metaDescription:
        "Explora Capadocia con un guía local verificado. Tours en globo aerostático, el Valle de Göreme, ciudades subterráneas, chimeneas de hadas — reserva al instante con VibeGuide.",
      ogDescription:
        "Descubre las chimeneas de hadas, las ciudades subterráneas y los globos aerostáticos de Capadocia con un guía local verificado. Reserva instantánea con VibeGuide.",
      keywords: [
        "guía turístico Capadocia", "tour privado Capadocia", "globo aerostático Capadocia",
        "guía Göreme", "tour de valles Capadocia", "ciudad subterránea Capadocia",
        "tour chimeneas de hadas", "guía local Capadocia", "tour Uçhisar", "guía de viaje Capadocia",
      ],
      region: "Capadocia · Turquía",
      h1: "Guía Turístico de Capadocia",
      h1Accent: "Más allá del Globo",
      heroLead:
        "Capadocia es mucho más que una foto en globo. Explora chimeneas de hadas, ciudades subterráneas y antiguas iglesias rupestres con un local que conoce cada valle.",
      ctaPrimary: "Reservar un Guía →",
      ctaSecondary: "Ver Opciones de Tour",
      highlightsKicker: "Experiencias Principales",
      highlightsHeading: "Lo que tu guía te mostrará",
      highlights: [
        { icon: "🎈", name: "Globo Aerostático", desc: "Amanecer sobre los valles de Capadocia — la experiencia en globo más icónica del mundo." },
        { icon: "🏔️", name: "Valle de Göreme", desc: "Antiguas iglesias rupestres con frescos bizantinos, talladas en roca volcánica." },
        { icon: "🏰", name: "Castillo de Uçhisar", desc: "El punto más alto de Capadocia — vistas panorámicas de toda la región." },
        { icon: "🌋", name: "Ciudad Subterránea de Derinkuyu", desc: "8 niveles de profundidad, albergaba a 20.000 personas. Un laberinto tallado hace 2.000 años." },
        { icon: "🏜️", name: "Valle Rosa y Rojo", desc: "Caminatas al atardecer entre formaciones rocosas rosas y rojas — la Capadocia más cinematográfica." },
        { icon: "🐴", name: "Paseos a Caballo", desc: "Explora los valles a caballo — una experiencia clásica de Capadocia que tu guía puede organizar." },
      ],
      seoHeading: "¿Por qué explorar Capadocia con un guía local?",
      seoParagraphs: [
        "Capadocia es un paisaje como ningún otro en la Tierra. Millones de años de erupciones volcánicas depositaron una roca de toba blanda, y el viento y el agua la esculpieron en las surrealistas <strong>chimeneas de hadas</strong>, crestas y valles que ves hoy. Más tarde, los primeros cristianos vaciaron la roca para crear viviendas, iglesias y ciudades subterráneas enteras. Para quien la visita por primera vez, la región puede resultar abrumadora — los sitios se extienden por una amplia meseta, y los rincones más mágicos rara vez son los concurridos.",
        "Ahí es donde un <strong>guía turístico licenciado de Capadocia</strong> lo cambia todo. La vista más famosa de la región es el cielo del amanecer lleno de color: un paseo en <strong>globo aerostático</strong> al amanecer sobre los valles es la experiencia por la que vienen la mayoría de los viajeros. Un buen guía te ayuda a planificar en torno a un despegue temprano del globo y luego organiza el resto del día según la luz — caminatas a la hora dorada por los valles Rosa y Rojo, y vistas panorámicas desde el Castillo de <strong>Uçhisar</strong>, el punto más alto de la región.",
        "En el corazón de todo está <strong>Göreme</strong> y su museo al aire libre, Patrimonio de la Humanidad de la UNESCO, donde las iglesias rupestres talladas en la roca aún conservan vívidos frescos bizantinos de mil años de antigüedad. Tu guía descifra las historias de las pinturas, señala los refectorios monásticos y explica cómo vivía una comunidad dentro de la piedra. Cerca, los pueblos de <strong>Ürgüp</strong>, <strong>Avanos</strong> — famoso por su alfarería junto al río — y los valles que los rodean recompensan a quien se atreve a salir de la ruta habitual.",
        "Y luego está lo que yace debajo. Las <strong>ciudades subterráneas</strong> de Capadocia — <strong>Derinkuyu</strong> y <strong>Kaymaklı</strong> — descienden muchos niveles bajo tierra, con pozos de ventilación, aljibes, establos y enormes puertas de piedra rodante que una vez sellaron a salvo a miles de personas en su interior. Los estrechos túneles son mucho más fáciles de entender y recorrer con un guía que conoce la historia y el trazado. Cada guía de VibeGuide está licenciado por el Ministerio de Cultura y Turismo de Turquía, tiene su identidad verificada y es evaluado tras cada tour — para que explores las chimeneas de hadas, las iglesias y los mundos subterráneos de Capadocia con total confianza.",
      ],
      modesKicker: "Cómo funciona",
      modesHeading: "Tres formas de explorar Capadocia",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Guía local al instante", text: "¿Llegaste a Capadocia sin un plan? Conéctate con un guía local verificado en minutos y empieza a explorar de inmediato." },
        { tag: "VibeSquad", color: C.squad, title: "Únete a un grupo", text: "Comparte la experiencia con otros viajeros. Únete a un tour en grupo reducido por Göreme, los valles o una ciudad subterránea." },
        { tag: "Tour Privado", color: C.private, title: "Planea tu día en Capadocia", text: "Guía totalmente privado para el día del globo, caminatas por los valles o una cena al atardecer — diseñado por completo en torno a tu itinerario." },
      ],
      trustHeading: "Cada guía está verificado",
      trustText: "Todos los guías de VibeGuide en Capadocia tienen licencias oficiales del Ministerio de Cultura de Turquía, pasan verificación de identidad y son evaluados tras cada tour.",
      trustBadges: ["🪪 Licenciado por el Ministerio de Cultura", "✅ Identidad verificada", "⭐ 4,9 de valoración media", "🚫 Política de tolerancia cero"],
      faqHeading: "Preguntas frecuentes",
      faqs: [
        { q: "¿Cuánto cuesta un guía turístico en Capadocia?", a: "Los precios dependen del tipo de tour y su duración. Con VibeGuide ves el precio exacto antes de reservar: la mayoría de los tours privados de medio día por Göreme y los valles parten de una tarifa fija por persona, sin cargos ocultos. Los tours en grupo (VibeSquad) son la forma más económica de explorar Capadocia." },
        { q: "¿Los guías de Capadocia de VibeGuide están autorizados?", a: "Sí. Cada guía de VibeGuide cuenta con una licencia oficial del Ministerio de Cultura y Turismo de Turquía, supera una verificación de identidad y es evaluado tras cada tour. Tenemos una política de tolerancia cero con las guías sin licencia." },
        { q: "¿Puede un guía organizar un tour en globo aerostático en Capadocia?", a: "Tu guía local de VibeGuide puede ayudarte a planificar el día en torno a un vuelo en globo al amanecer y recomendarte operadores de globos acreditados y autorizados, pero el paseo en globo se opera y se reserva por separado. Los globos despegan al amanecer, así que la mayoría de los guías organizan el resto del día en torno a un inicio temprano." },
        { q: "¿Cuál es la mejor época para visitar Capadocia?", a: "La primavera (abril–junio) y el otoño (septiembre–octubre) ofrecen el clima más templado y los vuelos en globo más fiables. El verano es caluroso, pero los globos siguen volando al amanecer, y el invierno trae una nieve mágica sobre las chimeneas de hadas. Tu guía puede adaptar la ruta a la temporada." },
        { q: "¿Qué zonas de Capadocia me mostrará un guía?", a: "La mayoría de los tours se centran en Göreme y su museo al aire libre, con paradas en Ürgüp, el castillo de Uçhisar, los talleres de cerámica de Avanos y los valles Rosa, Rojo y de las Palomas. Un guía autorizado crea una ruta por estas zonas según tu tiempo e intereses." },
        { q: "¿Puedo visitar las ciudades subterráneas con un guía?", a: "Sí. Las ciudades subterráneas de Capadocia —Derinkuyu y Kaymaklı— descienden varios niveles en la roca volcánica y en su día albergaron a miles de personas. Un guía explica los pozos de ventilación, las puertas de piedra rodante y la historia, y hace que recorrer los estrechos túneles resulte mucho más fácil." },
      ],
      otherHeading: "Explora más de Turquía",
      otherCities: [
        { href: "/attractions/es/cappadocia", icon: "🎈", name: "Guía de Viaje de Capadocia", desc: "Chimeneas de hadas, valles y consejos para el globo" },
        { href: "/es/istanbul-tour-guide", icon: "🕌", name: "Guía de Estambul", desc: "Santa Sofía, el Gran Bazar y el Bósforo" },
        { href: "/es/ephesus-tour-guide", icon: "🏛️", name: "Guía de Éfeso", desc: "Antiguas ruinas romanas cerca de Selçuk, İzmir" },
      ],
      ctaTitle: "¿Listo para explorar Capadocia?",
      ctaSub: "Descarga VibeGuide gratis. Encuentra un guía local en 60 segundos.",
      ctaAvailability: "Gratis · Sin suscripción · Capadocia disponible ahora",
    },
    fr: {
      metaTitle: "Guide Touristique de Cappadoce — Montgolfière & Visites des Vallées",
      metaDescription:
        "Explorez la Cappadoce avec un guide local vérifié. Vols en montgolfière, vallée de Göreme, villes souterraines, cheminées de fées — réservez instantanément avec VibeGuide.",
      ogDescription:
        "Découvrez les cheminées de fées, les villes souterraines et les montgolfières de Cappadoce avec un guide local vérifié. Réservation instantanée via VibeGuide.",
      keywords: [
        "guide touristique Cappadoce", "visite privée Cappadoce", "montgolfière Cappadoce",
        "guide Göreme", "visite des vallées Cappadoce", "ville souterraine Cappadoce",
        "visite cheminées de fées", "guide local Cappadoce", "visite Uçhisar", "guide de voyage Cappadoce",
      ],
      region: "Cappadoce · Turquie",
      h1: "Guide Touristique de Cappadoce",
      h1Accent: "Au-delà de la Montgolfière",
      heroLead:
        "La Cappadoce, c'est bien plus qu'une photo en montgolfière. Explorez les cheminées de fées, les villes souterraines et les anciennes églises rupestres avec un local qui connaît chaque vallée.",
      ctaPrimary: "Réserver un Guide →",
      ctaSecondary: "Voir les Options",
      highlightsKicker: "Expériences Phares",
      highlightsHeading: "Ce que votre guide vous montrera",
      highlights: [
        { icon: "🎈", name: "Montgolfière", desc: "Lever de soleil sur les vallées de Cappadoce — l'expérience en montgolfière la plus emblématique au monde." },
        { icon: "🏔️", name: "Vallée de Göreme", desc: "Anciennes églises rupestres aux fresques byzantines, taillées dans la roche volcanique." },
        { icon: "🏰", name: "Château d'Uçhisar", desc: "Le point culminant de la Cappadoce — une vue panoramique sur toute la région." },
        { icon: "🌋", name: "Ville Souterraine de Derinkuyu", desc: "8 niveaux de profondeur, abritant 20 000 personnes. Un labyrinthe creusé il y a 2 000 ans." },
        { icon: "🏜️", name: "Vallée Rose et Rouge", desc: "Randonnées au coucher du soleil parmi des formations rocheuses roses et rouges — la Cappadoce la plus cinématographique." },
        { icon: "🐴", name: "Équitation", desc: "Explorez les vallées à cheval — une expérience classique de Cappadoce que votre guide peut organiser." },
      ],
      seoHeading: "Pourquoi explorer la Cappadoce avec un guide local ?",
      seoParagraphs: [
        "La Cappadoce est un paysage sans équivalent sur Terre. Des millions d'années d'éruptions volcaniques ont déposé un tuf tendre, que le vent et l'eau ont sculpté en ces <strong>cheminées de fées</strong>, crêtes et vallées surréalistes que l'on voit aujourd'hui. Les premiers chrétiens ont ensuite creusé la roche pour y aménager des habitations, des églises et des villes souterraines entières. Pour un premier visiteur, la région peut sembler déroutante — les sites s'étendent sur un vaste plateau, et les coins les plus magiques sont rarement les plus fréquentés.",
        "C'est là qu'un <strong>guide touristique licencié de Cappadoce</strong> change tout. Le spectacle le plus célèbre de la région est le ciel de l'aube empli de couleurs : un vol en <strong>montgolfière</strong> au lever du soleil au-dessus des vallées est l'expérience pour laquelle la plupart des voyageurs viennent. Un bon guide vous aide à organiser votre journée autour d'un décollage matinal, puis l'agence selon la lumière — randonnées à l'heure dorée à travers les vallées Rose et Rouge, et vues panoramiques depuis le château d'<strong>Uçhisar</strong>, le point culminant de la région.",
        "Au cœur de tout cela se trouve <strong>Göreme</strong> et son musée en plein air, site du patrimoine mondial de l'UNESCO, où les églises rupestres taillées dans la roche conservent encore de vives fresques byzantines vieilles de mille ans. Votre guide déchiffre les récits des peintures, vous montre les réfectoires monastiques et explique comment une communauté vivait à l'intérieur de la pierre. À proximité, les villes d'<strong>Ürgüp</strong>, d'<strong>Avanos</strong> — célèbre pour sa poterie au bord de la rivière — et les vallées alentour récompensent quiconque ose quitter l'itinéraire classique.",
        "Et puis il y a ce qui se cache dessous. Les <strong>villes souterraines</strong> de Cappadoce — <strong>Derinkuyu</strong> et <strong>Kaymaklı</strong> — descendent sur de nombreux niveaux sous terre, avec puits d'aération, puits, écuries et énormes portes de pierre roulantes qui scellaient autrefois des milliers de personnes en sécurité à l'intérieur. Les tunnels étroits sont bien plus faciles à comprendre et à parcourir avec un guide qui connaît l'histoire et l'agencement. Chaque guide sur VibeGuide est licencié par le ministère turc de la Culture et du Tourisme, vérifié quant à son identité et évalué après chaque visite — pour que vous exploriez les cheminées de fées, les églises et les mondes souterrains de Cappadoce en toute confiance.",
      ],
      modesKicker: "Comment ça marche",
      modesHeading: "Trois façons d'explorer la Cappadoce",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Guide local instantané", text: "Arrivé en Cappadoce sans plan ? Mettez-vous en relation avec un guide local vérifié en quelques minutes et commencez à explorer aussitôt." },
        { tag: "VibeSquad", color: C.squad, title: "Rejoindre un groupe", text: "Partagez l'expérience avec d'autres voyageurs. Rejoignez une visite en petit groupe de Göreme, des vallées ou d'une ville souterraine." },
        { tag: "Visite Privée", color: C.private, title: "Planifiez votre journée en Cappadoce", text: "Guide entièrement privé pour la journée montgolfière, les randonnées dans les vallées ou un dîner au coucher du soleil — conçu intégralement autour de votre itinéraire." },
      ],
      trustHeading: "Chaque guide est vérifié",
      trustText: "Tous les guides VibeGuide en Cappadoce détiennent des licences officielles du ministère turc de la Culture, passent une vérification d'identité et sont évalués après chaque visite.",
      trustBadges: ["🪪 Licencié par le ministère de la Culture", "✅ Identité vérifiée", "⭐ 4,9 de note moyenne", "🚫 Politique de tolérance zéro"],
      faqHeading: "Questions fréquentes",
      faqs: [
        { q: "Combien coûte un guide touristique en Cappadoce ?", a: "Les prix dépendent du type et de la durée de la visite. Avec VibeGuide, vous voyez le prix exact avant de réserver — la plupart des visites privées d'une demi-journée de Göreme et des vallées démarrent à un tarif fixe par personne, sans frais cachés. Les visites en groupe (VibeSquad) sont le moyen le plus économique d'explorer la Cappadoce." },
        { q: "Les guides de Cappadoce de VibeGuide sont-ils agréés ?", a: "Oui. Chaque guide de VibeGuide détient une licence officielle du ministère turc de la Culture et du Tourisme, passe une vérification d'identité et est évalué après chaque visite. Nous appliquons une politique de tolérance zéro envers les guides non agréés." },
        { q: "Un guide peut-il organiser un tour en montgolfière en Cappadoce ?", a: "Votre guide local VibeGuide peut vous aider à organiser votre journée autour d'un vol en montgolfière au lever du soleil et vous recommander des opérateurs de montgolfières réputés et agréés — mais le vol lui-même est exploité et facturé séparément. Les montgolfières décollent à l'aube, c'est pourquoi la plupart des guides bâtissent le reste de la journée autour d'un départ matinal." },
        { q: "Quelle est la meilleure période pour visiter la Cappadoce ?", a: "Le printemps (avril–juin) et l'automne (septembre–octobre) offrent le climat le plus doux et les vols en montgolfière les plus fiables. L'été est chaud, mais les montgolfières volent toujours à l'aube, et l'hiver apporte une neige magique sur les cheminées de fées. Votre guide peut adapter l'itinéraire à la saison." },
        { q: "Quelles régions de Cappadoce un guide va-t-il me montrer ?", a: "La plupart des visites s'articulent autour de Göreme et de son musée en plein air, avec des arrêts à Ürgüp, au château d'Uçhisar, dans les ateliers de poterie d'Avanos et dans les vallées Rose, Rouge et des Pigeons. Un guide agréé conçoit un itinéraire à travers ces zones selon votre temps et vos centres d'intérêt." },
        { q: "Puis-je visiter les cités souterraines avec un guide ?", a: "Oui. Les cités souterraines de Cappadoce — Derinkuyu et Kaymaklı — s'enfoncent sur plusieurs niveaux dans la roche volcanique et abritaient autrefois des milliers de personnes. Un guide explique les puits d'aération, les portes en pierre roulante et l'histoire, et rend les tunnels étroits bien plus faciles à parcourir." },
      ],
      otherHeading: "Explorez plus de la Turquie",
      otherCities: [
        { href: "/attractions/fr/cappadocia", icon: "🎈", name: "Guide de Voyage de Cappadoce", desc: "Cheminées de fées, vallées et conseils montgolfière" },
        { href: "/fr/istanbul-tour-guide", icon: "🕌", name: "Guide d'Istanbul", desc: "Sainte-Sophie, le Grand Bazar et le Bosphore" },
        { href: "/fr/ephesus-tour-guide", icon: "🏛️", name: "Guide d'Éphèse", desc: "Ruines romaines antiques près de Selçuk, İzmir" },
      ],
      ctaTitle: "Prêt à explorer la Cappadoce ?",
      ctaSub: "Téléchargez VibeGuide gratuitement. Trouvez un guide local en 60 secondes.",
      ctaAvailability: "Gratuit · Sans abonnement · Cappadoce disponible maintenant",
    },
    it: {
      metaTitle: "Guida Turistica della Cappadocia — Mongolfiera & Tour delle Valli",
      metaDescription:
        "Esplora la Cappadocia con una guida locale verificata. Tour in mongolfiera, la Valle di Göreme, città sotterranee, camini delle fate — prenota subito con VibeGuide.",
      ogDescription:
        "Scopri i camini delle fate, le città sotterranee e le mongolfiere della Cappadocia con una guida locale verificata. Prenotazione istantanea con VibeGuide.",
      keywords: [
        "guida turistica Cappadocia", "tour privato Cappadocia", "mongolfiera Cappadocia",
        "guida Göreme", "tour delle valli Cappadocia", "città sotterranea Cappadocia",
        "tour camini delle fate", "guida locale Cappadocia", "tour Uçhisar", "guida di viaggio Cappadocia",
      ],
      region: "Cappadocia · Turchia",
      h1: "Guida Turistica della Cappadocia",
      h1Accent: "Oltre la Mongolfiera",
      heroLead:
        "La Cappadocia è molto più di una foto in mongolfiera. Esplora i camini delle fate, le città sotterranee e le antiche chiese rupestri con un local che conosce ogni valle.",
      ctaPrimary: "Prenota una Guida →",
      ctaSecondary: "Vedi le Opzioni",
      highlightsKicker: "Esperienze Principali",
      highlightsHeading: "Cosa ti mostrerà la tua guida",
      highlights: [
        { icon: "🎈", name: "Mongolfiera", desc: "Alba sulle valli della Cappadocia — l'esperienza in mongolfiera più iconica al mondo." },
        { icon: "🏔️", name: "Valle di Göreme", desc: "Antiche chiese rupestri con affreschi bizantini, scavate nella roccia vulcanica." },
        { icon: "🏰", name: "Castello di Uçhisar", desc: "Il punto più alto della Cappadocia — vista panoramica sull'intera regione." },
        { icon: "🌋", name: "Città Sotterranea di Derinkuyu", desc: "8 livelli di profondità, ospitava 20.000 persone. Un labirinto scavato 2.000 anni fa." },
        { icon: "🏜️", name: "Valle Rosa e Rossa", desc: "Escursioni al tramonto tra formazioni rocciose rosa e rosse — la Cappadocia più cinematografica." },
        { icon: "🐴", name: "Passeggiate a Cavallo", desc: "Esplora le valli a cavallo — un'esperienza classica della Cappadocia che la tua guida può organizzare." },
      ],
      seoHeading: "Perché esplorare la Cappadocia con una guida locale?",
      seoParagraphs: [
        "La Cappadocia è un paesaggio diverso da qualsiasi altro sulla Terra. Milioni di anni di eruzioni vulcaniche hanno depositato un morbido tufo, che il vento e l'acqua hanno scolpito nei surreali <strong>camini delle fate</strong>, creste e valli che vedi oggi. I primi cristiani scavarono poi la roccia per ricavarne abitazioni, chiese e intere città sotterranee. Per chi la visita per la prima volta, la regione può apparire travolgente — i siti si estendono su un ampio altopiano, e gli angoli più magici raramente sono quelli affollati.",
        "È qui che una <strong>guida turistica autorizzata della Cappadocia</strong> cambia tutto. Lo spettacolo più celebre della regione è il cielo dell'alba pieno di colore: un volo in <strong>mongolfiera</strong> all'alba sopra le valli è l'esperienza per cui la maggior parte dei viaggiatori arriva. Una buona guida ti aiuta a pianificare attorno a un decollo mattutino e poi costruisce il resto della giornata in base alla luce — escursioni all'ora d'oro tra le valli Rosa e Rossa e viste panoramiche dal Castello di <strong>Uçhisar</strong>, il punto più alto della regione.",
        "Al cuore di tutto c'è <strong>Göreme</strong> e il suo museo a cielo aperto, sito patrimonio mondiale dell'UNESCO, dove le chiese rupestri scavate nella roccia conservano ancora vividi affreschi bizantini vecchi di mille anni. La tua guida legge le storie nei dipinti, indica i refettori monastici e spiega come una comunità viveva dentro la pietra. Nelle vicinanze, le cittadine di <strong>Ürgüp</strong>, <strong>Avanos</strong> — famosa per la ceramica lungo il fiume — e le valli circostanti ricompensano chiunque sia disposto a uscire dal percorso consueto.",
        "E poi c'è ciò che giace al di sotto. Le <strong>città sotterranee</strong> della Cappadocia — <strong>Derinkuyu</strong> e <strong>Kaymaklı</strong> — scendono per molti livelli nella terra, complete di pozzi di ventilazione, cisterne, stalle ed enormi porte di pietra a rotella che un tempo sigillavano al sicuro migliaia di persone all'interno. Gli stretti tunnel sono molto più facili da comprendere e percorrere con una guida che conosce la storia e la planimetria. Ogni guida su VibeGuide è autorizzata dal Ministero della Cultura e del Turismo turco, verificata nell'identità e valutata dopo ogni tour — così esplori i camini delle fate, le chiese e i mondi sotterranei della Cappadocia in totale tranquillità.",
      ],
      modesKicker: "Come funziona",
      modesHeading: "Tre modi per esplorare la Cappadocia",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Guida locale istantanea", text: "Arrivato in Cappadocia senza un piano? Abbinati a una guida locale verificata in pochi minuti e inizia subito a esplorare." },
        { tag: "VibeSquad", color: C.squad, title: "Unisciti a un gruppo", text: "Condividi l'esperienza con altri viaggiatori. Unisciti a un tour in piccolo gruppo di Göreme, delle valli o di una città sotterranea." },
        { tag: "Tour Privato", color: C.private, title: "Pianifica la tua giornata in Cappadocia", text: "Guida totalmente privata per il giorno della mongolfiera, escursioni nelle valli o una cena al tramonto — progettata interamente sul tuo itinerario." },
      ],
      trustHeading: "Ogni guida è verificata",
      trustText: "Tutte le guide VibeGuide in Cappadocia possiedono licenze ufficiali del Ministero della Cultura turco, superano la verifica dell'identità e vengono valutate dopo ogni tour.",
      trustBadges: ["🪪 Autorizzata dal Ministero della Cultura", "✅ Identità verificata", "⭐ 4,9 valutazione media", "🚫 Politica di tolleranza zero"],
      faqHeading: "Domande frequenti",
      faqs: [
        { q: "Quanto costa una guida turistica in Cappadocia?", a: "I prezzi dipendono dal tipo di tour e dalla durata. Con VibeGuide vedi il prezzo esatto prima di prenotare: la maggior parte dei tour privati di mezza giornata di Göreme e delle valli parte da una tariffa fissa a persona, senza costi nascosti. I tour di gruppo (VibeSquad) sono il modo più economico per esplorare la Cappadocia." },
        { q: "Le guide della Cappadocia di VibeGuide sono abilitate?", a: "Sì. Ogni guida su VibeGuide possiede una licenza ufficiale del Ministero turco della Cultura e del Turismo, supera una verifica dell'identità e viene valutata dopo ogni tour. Applichiamo una politica di tolleranza zero verso le guide non abilitate." },
        { q: "Una guida può organizzare un tour in mongolfiera in Cappadocia?", a: "La tua guida locale VibeGuide può aiutarti a pianificare la giornata attorno a un volo in mongolfiera all'alba e consigliarti operatori di mongolfiere affidabili e autorizzati, ma il volo in mongolfiera è gestito e prenotato separatamente. Le mongolfiere decollano all'alba, perciò la maggior parte delle guide organizza il resto della giornata attorno a una partenza mattutina." },
        { q: "Qual è il periodo migliore per visitare la Cappadocia?", a: "La primavera (aprile–giugno) e l'autunno (settembre–ottobre) offrono il clima più mite e i voli in mongolfiera più affidabili. L'estate è calda, ma le mongolfiere volano comunque all'alba, e l'inverno porta una neve magica sui camini delle fate. La tua guida può adattare l'itinerario alla stagione." },
        { q: "Quali zone della Cappadocia mi mostrerà una guida?", a: "La maggior parte dei tour è incentrata su Göreme e il suo museo all'aperto, con soste a Ürgüp, al Castello di Uçhisar, alle botteghe di ceramica di Avanos e nelle valli Rosa, Rossa e dei Piccioni. Una guida abilitata costruisce un itinerario tra queste zone in base al tuo tempo e ai tuoi interessi." },
        { q: "Posso visitare le città sotterranee con una guida?", a: "Sì. Le città sotterranee della Cappadocia — Derinkuyu e Kaymaklı — scendono per diversi livelli nella roccia vulcanica e un tempo ospitavano migliaia di persone. Una guida spiega i pozzi di ventilazione, le porte di pietra rotanti e la storia, e rende molto più facile orientarsi nei tunnel stretti." },
      ],
      otherHeading: "Esplora di più della Turchia",
      otherCities: [
        { href: "/attractions/it/cappadocia", icon: "🎈", name: "Guida di Viaggio della Cappadocia", desc: "Camini delle fate, valli e consigli per la mongolfiera" },
        { href: "/it/istanbul-tour-guide", icon: "🕌", name: "Guida di Istanbul", desc: "Santa Sofia, il Gran Bazar e il Bosforo" },
        { href: "/it/ephesus-tour-guide", icon: "🏛️", name: "Guida di Efeso", desc: "Antiche rovine romane vicino a Selçuk, İzmir" },
      ],
      ctaTitle: "Pronto a esplorare la Cappadocia?",
      ctaSub: "Scarica VibeGuide gratis. Trova una guida locale in 60 secondi.",
      ctaAvailability: "Gratis · Nessun abbonamento · Cappadocia disponibile ora",
    },
    ar: {
      metaTitle: "دليل سياحي في كابادوكيا — مناطيد هوائية وجولات الوديان",
      metaDescription:
        "استكشف كابادوكيا مع دليل سياحي محلي موثّق. جولات بالمنطاد الهوائي، وادي غوريمه، المدن تحت الأرض، مداخن الجنّيات — احجز فورًا مع VibeGuide.",
      ogDescription:
        "اكتشف مداخن الجنّيات والمدن تحت الأرض والمناطيد الهوائية في كابادوكيا مع دليل محلي موثّق. حجز فوري عبر VibeGuide.",
      keywords: [
        "دليل سياحي كابادوكيا", "جولة خاصة كابادوكيا", "منطاد هوائي كابادوكيا",
        "مرشد غوريمه", "جولة وديان كابادوكيا", "مدينة تحت الأرض كابادوكيا",
        "جولة مداخن الجنّيات", "مرشد محلي كابادوكيا", "جولة أوتشيسار", "دليل سفر كابادوكيا",
      ],
      region: "كابادوكيا · تركيا",
      h1: "دليل سياحي في كابادوكيا",
      h1Accent: "أبعد من المنطاد",
      heroLead:
        "كابادوكيا أكثر من مجرّد صورة بالمنطاد. استكشف مداخن الجنّيات والمدن تحت الأرض وكنائس الكهوف القديمة مع محلي يعرف كل وادٍ.",
      ctaPrimary: "احجز دليلًا الآن →",
      ctaSecondary: "اطّلع على خيارات الجولات",
      highlightsKicker: "أبرز التجارب",
      highlightsHeading: "ما سيُريك إياه دليلك",
      highlights: [
        { icon: "🎈", name: "منطاد هوائي", desc: "شروق الشمس فوق وديان كابادوكيا — أشهر تجربة منطاد في العالم." },
        { icon: "🏔️", name: "وادي غوريمه", desc: "كنائس كهفية قديمة بجداريات بيزنطية، منحوتة في الصخر البركاني." },
        { icon: "🏰", name: "قلعة أوتشيسار", desc: "أعلى نقطة في كابادوكيا — إطلالات بانورامية على المنطقة بأكملها." },
        { icon: "🌋", name: "مدينة درينكويو تحت الأرض", desc: "بعمق 8 طبقات، كانت تؤوي 20000 شخص. متاهة نُحتت قبل 2000 عام." },
        { icon: "🏜️", name: "الوادي الوردي والأحمر", desc: "مسيرات عند الغروب بين تكوينات صخرية وردية وحمراء — كابادوكيا في أبهى صورها السينمائية." },
        { icon: "🐴", name: "ركوب الخيل", desc: "استكشف الوديان على ظهر الخيل — تجربة كابادوكية كلاسيكية يمكن لدليلك ترتيبها." },
      ],
      seoHeading: "لماذا تستكشف كابادوكيا مع دليل محلي؟",
      seoParagraphs: [
        "كابادوكيا منظر طبيعي لا مثيل له في أي مكان على الأرض. أرست ملايين السنين من الانفجارات البركانية صخر التوف الليّن، ونحته الرياح والمياه إلى <strong>مداخن الجنّيات</strong> والتلال والوديان السوريالية التي تراها اليوم. ثم حفر المسيحيون الأوائل الصخر ليصنعوا منازل وكنائس ومدنًا كاملة تحت الأرض. بالنسبة لزائر لأول مرة، قد تبدو المنطقة مربكة — فالمواقع منتشرة على هضبة واسعة، ونادرًا ما تكون أجمل الزوايا هي المزدحمة.",
        "هنا يُحدث <strong>الدليل السياحي المرخّص في كابادوكيا</strong> الفارق كله. أشهر مشاهد المنطقة هو سماء الفجر المفعمة بالألوان: رحلة <strong>منطاد هوائي</strong> عند الشروق فوق الوديان هي التجربة التي يأتي من أجلها معظم المسافرين. يساعدك الدليل الجيد على التخطيط حول إقلاع مبكر للمنطاد، ثم يبني بقية يومك وفق الضوء — مسيرات الساعة الذهبية عبر الوادي الوردي والأحمر، وإطلالات بانورامية من قلعة <strong>أوتشيسار</strong>، أعلى نقطة في المنطقة.",
        "في قلب كل ذلك تقع <strong>غوريمه</strong> ومتحفها المفتوح، أحد مواقع التراث العالمي لليونسكو، حيث ما تزال الكنائس الكهفية المنحوتة في الصخر تحتفظ بجداريات بيزنطية زاهية عمرها ألف عام. يقرأ دليلك القصص في الرسوم، ويشير إلى المطاعم الرهبانية، ويشرح كيف عاش مجتمع داخل الحجر. وعلى مقربة، تكافئ بلدات <strong>أُرغوب</strong> و<strong>أفانوس</strong> — الشهيرة بفخّارها على ضفة النهر — والوديان المحيطة بها كل من يجرؤ على مغادرة المسار المعتاد.",
        "ثم هناك ما يكمن في الأسفل. تنحدر <strong>المدن تحت الأرض</strong> في كابادوكيا — <strong>درينكويو</strong> و<strong>كايماكلي</strong> — طبقاتٍ عديدة في باطن الأرض، مكتملةً بفتحات تهوية وآبار وإسطبلات وأبواب حجرية ضخمة متدحرجة كانت تُغلق بأمان على آلاف الناس في الداخل. الأنفاق الضيقة أسهل بكثير للفهم والتنقّل مع دليل يعرف التاريخ والتخطيط. كل دليل على VibeGuide مرخّص من وزارة الثقافة والسياحة التركية، ومُتحقَّق من هويته، ويُقيَّم بعد كل جولة — لتستكشف مداخن الجنّيات والكنائس والعوالم تحت الأرض في كابادوكيا بثقة تامة.",
      ],
      modesKicker: "كيف يعمل",
      modesHeading: "ثلاث طرق لاستكشاف كابادوكيا",
      modes: [
        { tag: "VibeNow", color: C.now, title: "دليل محلي فوري", text: "وصلت إلى كابادوكيا بلا خطة؟ تواصَل مع دليل محلي موثّق خلال دقائق وابدأ الاستكشاف فورًا." },
        { tag: "VibeSquad", color: C.squad, title: "انضمّ إلى مجموعة", text: "شارك التجربة مع مسافرين آخرين. انضمّ إلى جولة جماعية صغيرة في غوريمه أو الوديان أو مدينة تحت الأرض." },
        { tag: "جولة خاصة", color: C.private, title: "خطّط ليومك في كابادوكيا", text: "دليل خاص بالكامل ليوم المنطاد أو مسيرات الوديان أو عشاء عند الغروب — مصمَّم بالكامل حول برنامجك." },
      ],
      trustHeading: "كل دليل موثّق",
      trustText: "جميع أدلّاء VibeGuide في كابادوكيا يحملون تراخيص رسمية من وزارة الثقافة التركية، ويجتازون التحقق من الهوية، ويُقيَّمون بعد كل جولة.",
      trustBadges: ["🪪 مرخّص من وزارة الثقافة", "✅ هوية موثّقة", "⭐ تقييم 4.9 وسطيًا", "🚫 سياسة عدم تسامح"],
      faqHeading: "الأسئلة الشائعة",
      faqs: [
        { q: "كم تبلغ تكلفة مرشد سياحي في كابادوكيا؟", a: "تعتمد الأسعار على نوع الجولة ومدتها. مع VibeGuide ترى السعر الدقيق قبل الحجز — تبدأ معظم الجولات الخاصة لنصف يوم في غوريمه والوديان من سعر ثابت للفرد، دون رسوم خفية. الجولات الجماعية (VibeSquad) هي الطريقة الأكثر اقتصادًا لاستكشاف كابادوكيا." },
        { q: "هل مرشدو كابادوكيا في VibeGuide مرخّصون؟", a: "نعم. يحمل كل مرشد في VibeGuide ترخيصًا رسميًا من وزارة الثقافة والسياحة التركية، ويجتاز التحقق من الهوية، ويُقيَّم بعد كل جولة. لدينا سياسة عدم تسامح مطلق تجاه الإرشاد غير المرخّص." },
        { q: "هل يمكن لمرشد ترتيب جولة بمنطاد الهواء الساخن في كابادوكيا؟", a: "يمكن لمرشدك المحلي في VibeGuide مساعدتك في تنظيم يومك حول رحلة منطاد عند الشروق والتوصية بمشغّلي مناطيد موثوقين ومرخّصين — لكن رحلة المنطاد نفسها تُدار وتُحجز بشكل منفصل. تنطلق المناطيد عند الفجر، لذا ينظّم معظم المرشدين بقية يومك حول بداية مبكرة." },
        { q: "ما أفضل وقت لزيارة كابادوكيا؟", a: "يقدّم الربيع (أبريل–يونيو) والخريف (سبتمبر–أكتوبر) أكثر الأجواء اعتدالًا وأكثر رحلات المناطيد موثوقية. الصيف حار لكن المناطيد لا تزال تطير عند الفجر، والشتاء يجلب ثلوجًا ساحرة فوق المداخن الجنية. يمكن لمرشدك تكييف المسار حسب الموسم." },
        { q: "ما المناطق التي سيُريني إياها المرشد في كابادوكيا؟", a: "تتمحور معظم الجولات حول غوريمه ومتحفها المفتوح، مع توقفات في أُورغوب وقلعة أوتشهيسار وورش الفخار في أفانوس ووديان الورد والأحمر والحمام. يبني المرشد المرخّص مسارًا عبر هذه المناطق بناءً على وقتك واهتماماتك." },
        { q: "هل يمكنني زيارة المدن الجوفية مع مرشد؟", a: "نعم. تنحدر المدن الجوفية في كابادوكيا — ديرينكويو وكايماكلي — عدة طبقات داخل الصخور البركانية وآوت في الماضي آلاف الناس. يشرح المرشد فتحات التهوية والأبواب الحجرية المتدحرجة والتاريخ، ويجعل التنقّل في الأنفاق الضيقة أسهل بكثير." },
      ],
      otherHeading: "استكشف المزيد من تركيا",
      otherCities: [
        { href: "/attractions/ar/cappadocia", icon: "🎈", name: "دليل سفر كابادوكيا", desc: "مداخن الجنّيات والوديان ونصائح المنطاد" },
        { href: "/ar/istanbul-tour-guide", icon: "🕌", name: "دليل إسطنبول", desc: "آيا صوفيا والبازار الكبير والبوسفور" },
        { href: "/ar/ephesus-tour-guide", icon: "🏛️", name: "دليل أفسس", desc: "آثار رومانية قديمة قرب سلجوق، إزمير" },
      ],
      ctaTitle: "مستعدّ لاستكشاف كابادوكيا؟",
      ctaSub: "حمّل VibeGuide مجانًا. اعثر على دليل محلي خلال 60 ثانية.",
      ctaAvailability: "مجاني · بلا اشتراك · كابادوكيا متاحة الآن",
    },
  },
};

// ─── EPHESUS ─────────────────────────────────────────────────────────────────
const EPHESUS: CityGuide = {
  slug: "ephesus-tour-guide",
  citySlug: "izmir",
  cityName: "Ephesus",
  heroImage:
    "https://plus.unsplash.com/premium_photo-1661963222829-cf9572881843?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXBoZXN1cyUyMHR1cmtleXxlbnwwfHwwfHx8MA%3D%3D",
  i18n: {
    en: {
      metaTitle: "Ephesus Tour Guide — Private & Group Tours",
      metaDescription:
        "Explore ancient Ephesus with a verified local guide. Library of Celsus, Temple of Artemis, the Roman agora — private or group tours, instantly booked with VibeGuide.",
      ogDescription:
        "Walk through one of the world's best-preserved ancient cities with a licensed local guide. Instant booking via VibeGuide.",
      keywords: [
        "Ephesus tour guide", "Ephesus private tour", "Ephesus local guide",
        "Library of Celsus tour", "Temple of Artemis tour", "Ephesus walking tour",
        "ancient ruins Turkey", "Selcuk guide", "Kusadasi tour guide", "Ephesus group tour",
      ],
      region: "Ephesus · Turkey",
      h1: "Ephesus Tour Guide",
      h1Accent: "Walk Through History",
      heroLead:
        "Ephesus is one of the best-preserved ancient cities on Earth. A local guide turns ruins into stories — emperors, gladiators, philosophers, and saints walked these same streets.",
      ctaPrimary: "Book a Guide Now →",
      ctaSecondary: "See Tour Options",
      highlightsKicker: "Top Sites",
      highlightsHeading: "What your guide will show you",
      highlights: [
        { icon: "📚", name: "Library of Celsus", desc: "One of antiquity's greatest libraries — a 2nd-century Roman masterpiece still standing." },
        { icon: "🏛️", name: "Temple of Artemis", desc: "One of the Seven Wonders of the Ancient World, just minutes from the main site." },
        { icon: "🎭", name: "Great Theatre", desc: "A 25,000-seat Roman theatre where St Paul once preached. Acoustics still astonishing." },
        { icon: "🛕", name: "House of the Virgin Mary", desc: "Sacred to Christians and Muslims alike — a pilgrimage site high in the hills above Ephesus." },
        { icon: "🏺", name: "Terrace Houses", desc: "Mosaic-floored Roman villas preserved under climate-controlled shelters — astonishing detail." },
        { icon: "⛩️", name: "Temple of Hadrian", desc: "Intricate Corinthian facade carved in the 2nd century, dedicated to the emperor who visited Ephesus." },
      ],
      seoHeading: "Why explore Ephesus with a local guide?",
      seoParagraphs: [
        "<strong>Ephesus</strong> is one of the best-preserved ancient cities in the world — a Greek and later Roman metropolis that was once home to a quarter of a million people. Walking its marble streets, you pass temples, baths, fountains and grand civic buildings exactly where they stood two thousand years ago. But ruins are silent on their own. Without context, a column is just a column; with a knowledgeable <strong>Ephesus tour guide</strong>, the same stones become the story of emperors, merchants, philosophers and saints who shaped the ancient Mediterranean.",
        "The undisputed icon of the site is the <strong>Library of Celsus</strong>, a soaring 2nd-century Roman façade that once held thousands of scrolls. A few steps away, the vast <strong>Great Theatre</strong> seated some 25,000 spectators and is where, according to tradition, St Paul preached to the Ephesians. A guide explains the engineering, the acoustics, and the daily life that filled these spaces — turning a quick photo stop into a genuine understanding of how the city worked.",
        "Just minutes from the main entrance, near Selçuk, stands what remains of the <strong>Temple of Artemis</strong> — once one of the <strong>Seven Wonders of the Ancient World</strong>, now reduced to a single reconstructed column, yet still powerful when its history is told well. Many tours also climb into the hills to the <strong>House of the Virgin Mary</strong>, a pilgrimage site revered by Christians and Muslims alike, and pause at the extraordinary <strong>Terrace Houses</strong>, where mosaic floors and painted walls of wealthy Roman villas survive under climate-controlled shelters.",
        "Ephesus sits near the town of <strong>Selçuk</strong> in <strong>İzmir</strong> province, on Turkey's Aegean coast and close to Kuşadası, making it easy to combine with the wine village of Şirince. Because so much of Ephesus is interpretation — reading inscriptions, picturing vanished roofs, understanding Roman politics — a licensed, archaeology-savvy guide makes all the difference. Every guide on VibeGuide is licensed by the Turkish Ministry of Culture and Tourism, identity-verified, and reviewed after each tour, so you can walk through history with someone who truly knows it.",
      ],
      modesKicker: "How it works",
      modesHeading: "Three ways to explore Ephesus",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Instant local guide", text: "Arrived at Ephesus without a guide? Match with a verified local expert in minutes and get the most out of your visit." },
        { tag: "VibeSquad", color: C.squad, title: "Join a small group", text: "Join other travellers for a guided walk through Ephesus — affordable, social, and led by a licensed archaeologist guide." },
        { tag: "Private Tour", color: C.private, title: "Your private day at Ephesus", text: "Full-day private experience including Ephesus, the Terrace Houses, Temple of Artemis, and the House of the Virgin Mary." },
      ],
      trustHeading: "Every guide is verified",
      trustText: "All VibeGuide tour guides in Ephesus hold official Turkish Ministry of Culture licences, pass identity verification, and are reviewed after every tour.",
      trustBadges: ["🪪 Licensed by Ministry of Culture", "✅ Identity verified", "⭐ 4.9 avg rating", "🚫 Zero-tolerance policy"],
      faqHeading: "Frequently asked questions",
      faqs: [
        { q: "How much does a tour guide at Ephesus cost?", a: "Prices depend on the tour type and duration. With VibeGuide you see the exact price before you book — most half-day private tours of Ephesus start from a fixed per-person rate, with no hidden fees. Group tours (VibeSquad) are the most affordable way to explore the ancient city." },
        { q: "Are VibeGuide's Ephesus guides licensed?", a: "Yes. Every guide on VibeGuide holds an official licence from the Turkish Ministry of Culture and Tourism, passes identity verification, and is reviewed after every tour. Many Ephesus guides are also trained in archaeology and ancient history. We have a zero-tolerance policy for unlicensed guiding." },
        { q: "Will I see the Library of Celsus on the tour?", a: "Yes. The Library of Celsus is the iconic centrepiece of Ephesus, and every guided route includes it. Your guide explains its 2nd-century Roman architecture, the statues representing wisdom and virtue, and how it once held thousands of scrolls." },
        { q: "Can I visit the Temple of Artemis with a guide?", a: "Yes. The Temple of Artemis — one of the Seven Wonders of the Ancient World — sits just minutes from the main site near Selçuk. Only a single column remains standing today, and a guide brings its scale and history to life in a way the ruins alone cannot." },
        { q: "Is the House of the Virgin Mary included?", a: "It can be. The House of the Virgin Mary, in the hills above Ephesus, is a pilgrimage site sacred to both Christians and Muslims. Many private and full-day tours combine it with Ephesus and the Temple of Artemis — just let your guide know you'd like to include it." },
        { q: "Where is Ephesus and can I combine it with Şirince village?", a: "Ephesus is near the town of Selçuk in İzmir province, on Turkey's Aegean coast, close to Kuşadası. The charming hillside village of Şirince, famous for its fruit wines and Ottoman houses, is just a short drive away — guides often combine the two into one relaxed day." },
      ],
      otherHeading: "Explore more of Turkey",
      otherCities: [
        { href: "/attractions/en/ephesus", icon: "🏛️", name: "Ephesus Travel Guide", desc: "Library of Celsus, Great Theatre & more" },
        { href: "/istanbul-tour-guide", icon: "🕌", name: "Istanbul Tour Guide", desc: "Hagia Sophia, Grand Bazaar & the Bosphorus" },
        { href: "/cappadocia-tour-guide", icon: "🎈", name: "Cappadocia Tour Guide", desc: "Hot air balloons, fairy chimneys & cave churches" },
      ],
      ctaTitle: "Ready to explore Ephesus?",
      ctaSub: "Download VibeGuide free. Find a local guide in 60 seconds.",
      ctaAvailability: "Free · No subscription · Ephesus available now",
    },
    ru: {
      metaTitle: "Гид по Эфесу — частные и групповые экскурсии",
      metaDescription:
        "Откройте древний Эфес с проверенным местным гидом. Библиотека Цельса, Храм Артемиды, римская агора — частные или групповые экскурсии, мгновенное бронирование с VibeGuide.",
      ogDescription:
        "Пройдите по одному из лучше всего сохранившихся античных городов мира с лицензированным местным гидом. Мгновенное бронирование через VibeGuide.",
      keywords: [
        "гид по Эфесу", "частная экскурсия Эфес", "местный гид Эфес",
        "экскурсия Библиотека Цельса", "экскурсия Храм Артемиды", "пешая экскурсия Эфес",
        "античные руины Турция", "гид Сельчук", "гид Кушадасы", "групповая экскурсия Эфес",
      ],
      region: "Эфес · Турция",
      h1: "Гид по Эфесу",
      h1Accent: "Прогулка сквозь историю",
      heroLead:
        "Эфес — один из лучше всего сохранившихся античных городов на Земле. Местный гид превращает руины в истории — по этим же улицам ходили императоры, гладиаторы, философы и святые.",
      ctaPrimary: "Заказать гида →",
      ctaSecondary: "Смотреть варианты экскурсий",
      highlightsKicker: "Главные объекты",
      highlightsHeading: "Что покажет вам гид",
      highlights: [
        { icon: "📚", name: "Библиотека Цельса", desc: "Одна из величайших библиотек античности — римский шедевр II века, стоящий по сей день." },
        { icon: "🏛️", name: "Храм Артемиды", desc: "Одно из Семи чудес света, всего в нескольких минутах от главного комплекса." },
        { icon: "🎭", name: "Большой театр", desc: "Римский театр на 25 000 мест, где некогда проповедовал апостол Павел. Акустика поражает до сих пор." },
        { icon: "🛕", name: "Дом Девы Марии", desc: "Святыня и для христиан, и для мусульман — место паломничества высоко в холмах над Эфесом." },
        { icon: "🏺", name: "Террасные дома", desc: "Римские виллы с мозаичными полами под климатическими навесами — поразительная детализация." },
        { icon: "⛩️", name: "Храм Адриана", desc: "Изящный коринфский фасад, высеченный во II веке и посвящённый императору, посетившему Эфес." },
      ],
      seoHeading: "Зачем открывать Эфес с местным гидом?",
      seoParagraphs: [
        "<strong>Эфес</strong> — один из лучше всего сохранившихся античных городов мира, греческая, а затем римская метрополия, где некогда жила четверть миллиона человек. Идя по его мраморным улицам, вы проходите мимо храмов, бань, фонтанов и величественных общественных зданий ровно там, где они стояли две тысячи лет назад. Но руины сами по себе безмолвны. Без контекста колонна — просто колонна; со знающим <strong>гидом по Эфесу</strong> те же камни становятся историей императоров, торговцев, философов и святых, что формировали античное Средиземноморье.",
        "Бесспорный символ комплекса — <strong>Библиотека Цельса</strong>, устремлённый ввысь римский фасад II века, некогда хранивший тысячи свитков. В нескольких шагах огромный <strong>Большой театр</strong> вмещал около 25 000 зрителей; по преданию, именно здесь апостол Павел обращался к эфесянам. Гид объясняет инженерное устройство, акустику и повседневную жизнь, наполнявшую эти пространства, — превращая быструю остановку для фото в настоящее понимание того, как жил город.",
        "Всего в нескольких минутах от главного входа, близ Сельчука, стоит то, что осталось от <strong>Храма Артемиды</strong> — некогда одного из <strong>Семи чудес света</strong>, а теперь всего одной восстановленной колонны, но всё же впечатляющего, когда его историю рассказывают хорошо. Многие экскурсии также поднимаются в холмы к <strong>Дому Девы Марии</strong>, месту паломничества, почитаемому и христианами, и мусульманами, и делают остановку у необыкновенных <strong>Террасных домов</strong>, где мозаичные полы и расписные стены богатых римских вилл сохранились под климатическими навесами.",
        "Эфес расположен близ городка <strong>Сельчук</strong> в провинции <strong>Измир</strong>, на Эгейском побережье Турции и недалеко от Кушадасы, что позволяет легко совместить его с винной деревней Шириндже. Поскольку столь многое в Эфесе — это истолкование: чтение надписей, воображение исчезнувших крыш, понимание римской политики, — лицензированный, разбирающийся в археологии гид решает всё. Каждый гид на VibeGuide лицензирован Министерством культуры и туризма Турции, прошёл проверку личности и получает оценку после каждой экскурсии, так что вы пройдёте сквозь историю с тем, кто действительно её знает.",
      ],
      modesKicker: "Как это работает",
      modesHeading: "Три способа открыть Эфес",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Местный гид мгновенно", text: "Приехали в Эфес без гида? Подберите проверенного местного эксперта за считаные минуты и возьмите максимум от визита." },
        { tag: "VibeSquad", color: C.squad, title: "Присоединиться к малой группе", text: "Присоединяйтесь к другим путешественникам на экскурсию по Эфесу — доступно, живо и под руководством лицензированного гида-археолога." },
        { tag: "Private Tour", color: C.private, title: "Ваш частный день в Эфесе", text: "Частный тур на целый день, включая Эфес, Террасные дома, Храм Артемиды и Дом Девы Марии." },
      ],
      trustHeading: "Каждый гид проверен",
      trustText: "Все гиды VibeGuide в Эфесе имеют официальные лицензии Министерства культуры Турции, проходят проверку личности и получают оценку после каждой экскурсии.",
      trustBadges: ["🪪 Лицензия Министерства культуры", "✅ Личность подтверждена", "⭐ Средний рейтинг 4,9", "🚫 Политика нулевой терпимости"],
      faqHeading: "Часто задаваемые вопросы",
      faqs: [
        { q: "Сколько стоит гид в Эфесе?", a: "Цена зависит от типа и длительности экскурсии. С VibeGuide вы видите точную стоимость ещё до бронирования — большинство частных экскурсий на полдня по Эфесу начинаются с фиксированной цены за человека, без скрытых доплат. Групповые экскурсии (VibeSquad) — самый доступный способ осмотреть античный город." },
        { q: "Лицензированы ли гиды VibeGuide в Эфесе?", a: "Да. Каждый гид VibeGuide имеет официальную лицензию Министерства культуры и туризма Турции, проходит проверку личности и получает оценку после каждой экскурсии. Многие гиды по Эфесу также имеют подготовку в области археологии и античной истории. У нас действует политика нулевой терпимости к нелицензированным гидам." },
        { q: "Увижу ли я Библиотеку Цельса на экскурсии?", a: "Да. Библиотека Цельса — знаковый центр Эфеса, и она входит в каждый экскурсионный маршрут. Гид расскажет о её римской архитектуре II века, о статуях, воплощающих мудрость и добродетель, и о том, как она некогда хранила тысячи свитков." },
        { q: "Можно ли посетить Храм Артемиды с гидом?", a: "Да. Храм Артемиды — одно из Семи чудес света — находится всего в нескольких минутах от главного комплекса близ Сельчука. Сегодня стоит лишь одна колонна, и гид оживляет его масштаб и историю так, как одни руины не могут." },
        { q: "Входит ли в программу Дом Девы Марии?", a: "Может входить. Дом Девы Марии в холмах над Эфесом — место паломничества, священное и для христиан, и для мусульман. Многие частные экскурсии и туры на целый день объединяют его с Эфесом и Храмом Артемиды — просто скажите гиду, что хотите его включить." },
        { q: "Где находится Эфес и можно ли совместить его с деревней Шириндже?", a: "Эфес расположен близ городка Сельчук в провинции Измир, на Эгейском побережье Турции, недалеко от Кушадасы. Очаровательная горная деревня Шириндже, знаменитая фруктовыми винами и османскими домами, всего в короткой поездке — гиды часто объединяют их в один неспешный день." },
      ],
      otherHeading: "Откройте больше Турции",
      otherCities: [
        { href: "/attractions/ru/ephesus", icon: "🏛️", name: "Путеводитель по Эфесу", desc: "Библиотека Цельса, Большой театр и не только" },
        { href: "/ru/istanbul-tour-guide", icon: "🕌", name: "Гид по Стамбулу", desc: "Айя-София, Гранд-базар и Босфор" },
        { href: "/ru/cappadocia-tour-guide", icon: "🎈", name: "Гид по Каппадокии", desc: "Воздушные шары, дымоходы фей и пещерные церкви" },
      ],
      ctaTitle: "Готовы открыть Эфес?",
      ctaSub: "Скачайте VibeGuide бесплатно. Найдите местного гида за 60 секунд.",
      ctaAvailability: "Бесплатно · Без подписки · Эфес доступен сейчас",
    },
    tr: {
      metaTitle: "Efes Tur Rehberi — Özel ve Grup Turları",
      metaDescription:
        "Antik Efes'i onaylı bir yerel rehberle keşfedin. Celsus Kütüphanesi, Artemis Tapınağı, Roma agorası — VibeGuide ile anında ayırtılan özel ya da grup turları.",
      ogDescription:
        "Dünyanın en iyi korunmuş antik kentlerinden birini lisanslı bir yerel rehberle gezin. VibeGuide ile anında rezervasyon.",
      keywords: [
        "Efes tur rehberi", "Efes özel tur", "Efes yerel rehber",
        "Celsus Kütüphanesi turu", "Artemis Tapınağı turu", "Efes gezisi rehber",
        "Türkiye antik kalıntılar", "Selçuk rehber", "Kuşadası tur rehberi", "Efes grup turu",
      ],
      region: "Efes · Türkiye",
      h1: "Efes Tur Rehberi",
      h1Accent: "Tarihin İçinde Yürüyün",
      heroLead:
        "Efes, dünyanın en iyi korunmuş antik kentlerinden biridir. Yerel bir rehber kalıntıları hikâyeye dönüştürür — imparatorlar, gladyatörler, filozoflar ve azizler aynı sokaklarda yürüdü.",
      ctaPrimary: "Hemen Rehber Bul →",
      ctaSecondary: "Tur Seçeneklerini Gör",
      highlightsKicker: "Öne Çıkan Noktalar",
      highlightsHeading: "Rehberiniz size neleri gösterecek",
      highlights: [
        { icon: "📚", name: "Celsus Kütüphanesi", desc: "Antik çağın en büyük kütüphanelerinden biri — hâlâ ayakta duran 2. yüzyıl Roma başyapıtı." },
        { icon: "🏛️", name: "Artemis Tapınağı", desc: "Dünyanın Yedi Harikası'ndan biri, ana alana yalnızca birkaç dakika uzaklıkta." },
        { icon: "🎭", name: "Büyük Tiyatro", desc: "Aziz Pavlus'un vaaz verdiği 25.000 kişilik Roma tiyatrosu. Akustiği hâlâ şaşırtıcı." },
        { icon: "🛕", name: "Meryem Ana Evi", desc: "Hem Hristiyanlar hem Müslümanlar için kutsal — Efes'in yukarısındaki tepelerde bir hac yeri." },
        { icon: "🏺", name: "Yamaç Evleri", desc: "İklim kontrollü çatılar altında korunan, mozaik zeminli Roma villaları — olağanüstü detay." },
        { icon: "⛩️", name: "Hadrian Tapınağı", desc: "Efes'i ziyaret eden imparatora adanmış, 2. yüzyılda işlenen zarif Korint cephesi." },
      ],
      seoHeading: "Efes'i neden yerel bir rehberle keşfetmeli?",
      seoParagraphs: [
        "<strong>Efes</strong>, dünyanın en iyi korunmuş antik kentlerinden biridir — bir zamanlar çeyrek milyon insana ev sahipliği yapmış Yunan ve sonrasında Roma metropolüdür. Mermer sokaklarında yürürken, iki bin yıl önce durdukları yerde duran tapınakların, hamamların, çeşmelerin ve görkemli kamu yapılarının arasından geçersiniz. Ama kalıntılar tek başına sessizdir. Bağlam olmadan bir sütun sadece bir sütundur; bilgili bir <strong>Efes tur rehberiyle</strong> aynı taşlar, antik Akdeniz'e yön veren imparatorların, tüccarların, filozofların ve azizlerin hikâyesine dönüşür.",
        "Alanın tartışmasız simgesi, bir zamanlar binlerce parşömen tomarını barındıran, göğe yükselen 2. yüzyıl Roma cephesi <strong>Celsus Kütüphanesi</strong>'dir. Birkaç adım ötede, yaklaşık 25.000 seyirci alan devasa <strong>Büyük Tiyatro</strong> yer alır; rivayete göre Aziz Pavlus burada Efeslilere vaaz vermiştir. Rehberiniz mühendisliği, akustiği ve bu mekânları dolduran gündelik yaşamı anlatır — hızlı bir fotoğraf durağını, kentin nasıl işlediğine dair gerçek bir kavrayışa dönüştürür.",
        "Ana girişe yalnızca birkaç dakika uzaklıkta, Selçuk yakınlarında, bir zamanlar <strong>Dünyanın Yedi Harikası</strong>'ndan biri olan <strong>Artemis Tapınağı</strong>'ndan geriye kalanlar bulunur — bugün yeniden dikilmiş tek bir sütuna inmiş olsa da, tarihi iyi anlatıldığında hâlâ etkileyicidir. Birçok tur ayrıca tepelere, hem Hristiyanların hem Müslümanların saygı gösterdiği bir hac yeri olan <strong>Meryem Ana Evi</strong>'ne çıkar ve varlıklı Roma villalarının mozaik zeminlerinin ve boyalı duvarlarının iklim kontrollü çatılar altında hayatta kaldığı olağanüstü <strong>Yamaç Evleri</strong>'nde durur.",
        "Efes, Türkiye'nin Ege kıyısında, Kuşadası'na yakın konumda, <strong>İzmir</strong> ilinin <strong>Selçuk</strong> ilçesinin yanı başındadır; bu da onu şarabıyla ünlü Şirince köyüyle birleştirmeyi kolaylaştırır. Efes'in büyük bölümü yorum gerektirdiği için — yazıtları okumak, kaybolmuş çatıları canlandırmak, Roma siyasetini anlamak — lisanslı, arkeolojiye hâkim bir rehber tüm farkı yaratır. VibeGuide'daki her rehber T.C. Kültür ve Turizm Bakanlığı tarafından lisanslıdır, kimliği doğrulanmıştır ve her turdan sonra değerlendirilir; böylece tarihin içinde onu gerçekten bilen biriyle yürürsünüz.",
      ],
      modesKicker: "Nasıl çalışır",
      modesHeading: "Efes'i keşfetmenin üç yolu",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Anında yerel rehber", text: "Efes'e rehbersiz mi geldiniz? Dakikalar içinde onaylı bir yerel uzmanla eşleşin ve ziyaretinizden en iyi şekilde yararlanın." },
        { tag: "VibeSquad", color: C.squad, title: "Küçük bir gruba katıl", text: "Efes'te rehberli bir yürüyüş için başka gezginlere katılın — uygun fiyatlı, sosyal ve lisanslı bir arkeolog rehber eşliğinde." },
        { tag: "Private Tour", color: C.private, title: "Efes'te özel gününüz", text: "Efes, Yamaç Evleri, Artemis Tapınağı ve Meryem Ana Evi'ni kapsayan tam günlük özel bir deneyim." },
      ],
      trustHeading: "Her rehber onaylıdır",
      trustText: "Efes'teki tüm VibeGuide tur rehberleri T.C. Kültür ve Turizm Bakanlığı'nın resmî lisansına sahiptir, kimlik doğrulamasından geçer ve her turdan sonra değerlendirilir.",
      trustBadges: ["🪪 Kültür Bakanlığı lisanslı", "✅ Kimlik doğrulandı", "⭐ 4,9 ortalama puan", "🚫 Sıfır tolerans politikası"],
      faqHeading: "Sıkça sorulan sorular",
      faqs: [
        { q: "Efes'te bir tur rehberi ne kadar tutar?", a: "Fiyatlar tur türüne ve süresine göre değişir. VibeGuide ile rezervasyondan önce tam fiyatı görürsünüz — Efes'teki çoğu yarım günlük özel tur, gizli ücret olmadan kişi başı sabit bir fiyatla başlar. Grup turları (VibeSquad) antik kenti keşfetmenin en uygun yoludur." },
        { q: "VibeGuide'ın Efes rehberleri lisanslı mı?", a: "Evet. VibeGuide'daki her rehber T.C. Kültür ve Turizm Bakanlığı'nın resmî lisansına sahiptir, kimlik doğrulamasından geçer ve her turdan sonra değerlendirilir. Efes rehberlerinin çoğu ayrıca arkeoloji ve antik tarih eğitimi almıştır. Lisanssız rehberliğe karşı sıfır tolerans politikamız vardır." },
        { q: "Turda Celsus Kütüphanesi'ni görecek miyim?", a: "Evet. Celsus Kütüphanesi, Efes'in ikonik merkez yapısıdır ve her rehberli rota onu kapsar. Rehberiniz 2. yüzyıl Roma mimarisini, bilgeliği ve erdemi temsil eden heykelleri ve bir zamanlar binlerce parşömeni nasıl barındırdığını anlatır." },
        { q: "Artemis Tapınağı'nı bir rehberle gezebilir miyim?", a: "Evet. Dünyanın Yedi Harikası'ndan biri olan Artemis Tapınağı, Selçuk yakınlarında ana alana yalnızca birkaç dakika uzaklıktadır. Bugün ayakta yalnızca tek bir sütun kalmıştır ve bir rehber onun ölçeğini ve tarihini, kalıntıların tek başına yapamayacağı şekilde canlandırır." },
        { q: "Meryem Ana Evi dâhil mi?", a: "Dâhil olabilir. Efes'in yukarısındaki tepelerde yer alan Meryem Ana Evi, hem Hristiyanlar hem Müslümanlar için kutsal bir hac yeridir. Birçok özel ve tam günlük tur onu Efes ve Artemis Tapınağı ile birleştirir — dâhil etmek istediğinizi rehberinize söylemeniz yeterli." },
        { q: "Efes nerede ve Şirince köyüyle birleştirebilir miyim?", a: "Efes, Türkiye'nin Ege kıyısında, Kuşadası'na yakın konumda, İzmir ilinin Selçuk ilçesinin yanındadır. Meyve şaraplarıyla ve Osmanlı evleriyle ünlü şirin yamaç köyü Şirince, kısa bir araç yolculuğu uzaklıktadır — rehberler çoğu zaman ikisini keyifli tek bir günde birleştirir." },
      ],
      otherHeading: "Türkiye'yi keşfetmeye devam edin",
      otherCities: [
        { href: "/attractions/tr/ephesus", icon: "🏛️", name: "Efes Gezi Rehberi", desc: "Celsus Kütüphanesi, Büyük Tiyatro ve daha fazlası" },
        { href: "/tr/istanbul-tour-guide", icon: "🕌", name: "İstanbul Tur Rehberi", desc: "Ayasofya, Kapalıçarşı ve Boğaz" },
        { href: "/tr/cappadocia-tour-guide", icon: "🎈", name: "Kapadokya Tur Rehberi", desc: "Sıcak hava balonları, peri bacaları ve kaya kiliseleri" },
      ],
      ctaTitle: "Efes'i keşfetmeye hazır mısınız?",
      ctaSub: "VibeGuide'ı ücretsiz indirin. 60 saniyede yerel bir rehber bulun.",
      ctaAvailability: "Ücretsiz · Abonelik yok · Efes şimdi müsait",
    },
    pl: {
      metaTitle: "Przewodnik po Efezie — Wycieczki Prywatne i Grupowe",
      metaDescription:
        "Zwiedzaj starożytny Efez ze zweryfikowanym lokalnym przewodnikiem. Biblioteka Celsusa, Świątynia Artemidy, rzymska agora — wycieczki prywatne lub grupowe, rezerwacja od ręki z VibeGuide.",
      ogDescription:
        "Przejdź przez jedno z najlepiej zachowanych starożytnych miast świata z licencjonowanym lokalnym przewodnikiem. Błyskawiczna rezerwacja przez VibeGuide.",
      keywords: [
        "przewodnik Efez", "prywatna wycieczka Efez", "lokalny przewodnik Efez",
        "wycieczka Biblioteka Celsusa", "wycieczka Świątynia Artemidy", "zwiedzanie Efezu",
        "starożytne ruiny Turcja", "przewodnik Selçuk", "przewodnik Kuşadası", "wycieczka grupowa Efez",
      ],
      region: "Efez · Turcja",
      h1: "Przewodnik po Efezie",
      h1Accent: "Przejdź przez Historię",
      heroLead:
        "Efez to jedno z najlepiej zachowanych starożytnych miast na Ziemi. Lokalny przewodnik zamienia ruiny w opowieści — po tych samych ulicach chodzili cesarze, gladiatorzy, filozofowie i święci.",
      ctaPrimary: "Zarezerwuj Przewodnika →",
      ctaSecondary: "Zobacz Opcje Wycieczek",
      highlightsKicker: "Najważniejsze Miejsca",
      highlightsHeading: "Co pokaże Ci Twój przewodnik",
      highlights: [
        { icon: "📚", name: "Biblioteka Celsusa", desc: "Jedna z największych bibliotek starożytności — rzymskie arcydzieło z II wieku, wciąż stojące." },
        { icon: "🏛️", name: "Świątynia Artemidy", desc: "Jeden z siedmiu cudów starożytnego świata, kilka minut od głównego stanowiska." },
        { icon: "🎭", name: "Wielki Teatr", desc: "Rzymski teatr na 25 000 widzów, w którym nauczał niegdyś św. Paweł. Akustyka wciąż zdumiewa." },
        { icon: "🛕", name: "Dom Marii Panny", desc: "Święty dla chrześcijan i muzułmanów — miejsce pielgrzymek wysoko w górach nad Efezem." },
        { icon: "🏺", name: "Domy Tarasowe", desc: "Rzymskie wille z mozaikowymi posadzkami, zachowane pod klimatyzowanymi wiatami — zdumiewające detale." },
        { icon: "⛩️", name: "Świątynia Hadriana", desc: "Misterna koryncka fasada wykuta w II wieku, poświęcona cesarzowi, który odwiedził Efez." },
      ],
      seoHeading: "Dlaczego warto zwiedzać Efez z lokalnym przewodnikiem?",
      seoParagraphs: [
        "<strong>Efez</strong> to jedno z najlepiej zachowanych starożytnych miast na świecie — grecka, a później rzymska metropolia, w której mieszkało niegdyś ćwierć miliona ludzi. Idąc jego marmurowymi ulicami, mijasz świątynie, łaźnie, fontanny i okazałe budowle publiczne dokładnie tam, gdzie stały dwa tysiące lat temu. Same ruiny milczą jednak. Bez kontekstu kolumna jest tylko kolumną; z dobrze zorientowanym <strong>przewodnikiem po Efezie</strong> te same kamienie stają się opowieścią o cesarzach, kupcach, filozofach i świętych, którzy kształtowali starożytne śródziemnomorze.",
        "Niekwestionowaną ikoną stanowiska jest <strong>Biblioteka Celsusa</strong>, strzelista rzymska fasada z II wieku, która mieściła niegdyś tysiące zwojów. Kilka kroków dalej ogromny <strong>Wielki Teatr</strong> pomieścił około 25 000 widzów i to właśnie tam, wedle tradycji, św. Paweł nauczał Efezjan. Przewodnik wyjaśnia inżynierię, akustykę i codzienne życie, które wypełniało te przestrzenie — zamieniając szybki przystanek na zdjęcie w prawdziwe zrozumienie, jak funkcjonowało miasto.",
        "Zaledwie kilka minut od głównego wejścia, koło Selçuk, stoi to, co pozostało ze <strong>Świątyni Artemidy</strong> — niegdyś jednego z <strong>siedmiu cudów starożytnego świata</strong>, dziś sprowadzonego do jednej odtworzonej kolumny, a mimo to wciąż robiącego wrażenie, gdy dobrze opowie się jej historię. Wiele wycieczek wspina się też w góry do <strong>Domu Marii Panny</strong>, miejsca pielgrzymek czczonego zarówno przez chrześcijan, jak i muzułmanów, i zatrzymuje się przy niezwykłych <strong>Domach Tarasowych</strong>, gdzie mozaikowe posadzki i malowane ściany bogatych rzymskich willi przetrwały pod klimatyzowanymi wiatami.",
        "Efez leży w pobliżu miasteczka <strong>Selçuk</strong> w prowincji <strong>Izmir</strong>, na tureckim wybrzeżu Morza Egejskiego, blisko Kuşadası, dzięki czemu łatwo połączyć go z winiarską wioską Şirince. Ponieważ tak wiele w Efezie zależy od interpretacji — odczytywania inskrypcji, wyobrażania sobie nieistniejących już dachów, rozumienia rzymskiej polityki — licencjonowany przewodnik znający archeologię robi całą różnicę. Każdy przewodnik w VibeGuide posiada licencję tureckiego Ministerstwa Kultury i Turystyki, ma zweryfikowaną tożsamość i jest oceniany po każdej wycieczce, więc możesz przejść przez historię z kimś, kto naprawdę ją zna.",
      ],
      modesKicker: "Jak to działa",
      modesHeading: "Trzy sposoby na zwiedzanie Efezu",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Lokalny przewodnik od ręki", text: "Dotarłeś do Efezu bez przewodnika? Dopasuj się do zweryfikowanego lokalnego eksperta w kilka minut i wykorzystaj wizytę w pełni." },
        { tag: "VibeSquad", color: C.squad, title: "Dołącz do małej grupy", text: "Dołącz do innych podróżników na wycieczkę z przewodnikiem po Efezie — tanio, towarzysko i pod opieką licencjonowanego przewodnika archeologa." },
        { tag: "Private Tour", color: C.private, title: "Twój prywatny dzień w Efezie", text: "Całodniowe prywatne doświadczenie obejmujące Efez, Domy Tarasowe, Świątynię Artemidy i Dom Marii Panny." },
      ],
      trustHeading: "Każdy przewodnik jest zweryfikowany",
      trustText: "Wszyscy przewodnicy VibeGuide w Efezie posiadają oficjalne licencje tureckiego Ministerstwa Kultury, przechodzą weryfikację tożsamości i są oceniani po każdej wycieczce.",
      trustBadges: ["🪪 Licencja Ministerstwa Kultury", "✅ Zweryfikowana tożsamość", "⭐ Śr. ocena 4,9", "🚫 Polityka zero tolerancji"],
      faqHeading: "Najczęściej zadawane pytania",
      faqs: [
        { q: "Ile kosztuje przewodnik w Efezie?", a: "Ceny zależą od rodzaju i długości wycieczki. Dzięki VibeGuide widzisz dokładną cenę przed rezerwacją — większość prywatnych półdniowych wycieczek po Efezie zaczyna się od stałej stawki za osobę, bez ukrytych opłat. Wycieczki grupowe (VibeSquad) to najtańszy sposób na poznanie starożytnego miasta." },
        { q: "Czy przewodnicy VibeGuide w Efezie są licencjonowani?", a: "Tak. Każdy przewodnik w VibeGuide posiada oficjalną licencję tureckiego Ministerstwa Kultury i Turystyki, przechodzi weryfikację tożsamości i jest oceniany po każdej wycieczce. Wielu przewodników po Efezie ma też wykształcenie w zakresie archeologii i historii starożytnej. Stosujemy politykę zero tolerancji wobec nielicencjonowanego przewodnictwa." },
        { q: "Czy podczas wycieczki zobaczę Bibliotekę Celsusa?", a: "Tak. Biblioteka Celsusa to kultowy element Efezu i każda trasa z przewodnikiem ją obejmuje. Przewodnik wyjaśnia jej rzymską architekturę z II wieku, posągi symbolizujące mądrość i cnotę oraz to, jak niegdyś mieściła tysiące zwojów." },
        { q: "Czy mogę zwiedzić Świątynię Artemidy z przewodnikiem?", a: "Tak. Świątynia Artemidy — jeden z siedmiu cudów starożytnego świata — znajduje się zaledwie kilka minut od głównego stanowiska koło Selçuk. Dziś stoi tylko jedna kolumna, a przewodnik ożywia jej skalę i historię w sposób, jakiego same ruiny nie oddadzą." },
        { q: "Czy Dom Marii Panny jest wliczony?", a: "Może być. Dom Marii Panny, w górach nad Efezem, to miejsce pielgrzymek święte zarówno dla chrześcijan, jak i muzułmanów. Wiele wycieczek prywatnych i całodniowych łączy go z Efezem i Świątynią Artemidy — wystarczy powiedzieć przewodnikowi, że chcesz go uwzględnić." },
        { q: "Gdzie leży Efez i czy mogę połączyć go z wioską Şirince?", a: "Efez znajduje się koło miasteczka Selçuk w prowincji Izmir, na tureckim wybrzeżu Morza Egejskiego, blisko Kuşadası. Urokliwa górska wioska Şirince, słynąca z win owocowych i osmańskich domów, leży zaledwie kilka minut jazdy dalej — przewodnicy często łączą oba miejsca w jeden spokojny dzień." },
      ],
      otherHeading: "Odkryj więcej Turcji",
      otherCities: [
        { href: "/pl/istanbul-tour-guide", icon: "🕌", name: "Przewodnik po Stambule", desc: "Hagia Sophia, Wielki Bazar i Bosfor" },
        { href: "/pl/cappadocia-tour-guide", icon: "🎈", name: "Przewodnik po Kapadocji", desc: "Balony na ogrzane powietrze, kominy wróżek i kościoły w skałach" },
      ],
      ctaTitle: "Gotów, by odkryć Efez?",
      ctaSub: "Pobierz VibeGuide za darmo. Znajdź lokalnego przewodnika w 60 sekund.",
      ctaAvailability: "Za darmo · Bez abonamentu · Efez dostępny już teraz",
    },
    nl: {
      metaTitle: "Reisgids Efeze — Privé- & Groepstours",
      metaDescription:
        "Ontdek het antieke Efeze met een geverifieerde lokale gids. De Bibliotheek van Celsus, de Tempel van Artemis, de Romeinse agora — privé- of groepstours, direct geboekt met VibeGuide.",
      ogDescription:
        "Wandel door een van de best bewaarde antieke steden ter wereld met een erkende lokale gids. Direct boeken via VibeGuide.",
      keywords: [
        "gids Efeze", "privétour Efeze", "lokale gids Efeze",
        "Bibliotheek van Celsus tour", "Tempel van Artemis tour", "wandeltour Efeze",
        "antieke ruïnes Turkije", "gids Selçuk", "gids Kuşadası", "groepstour Efeze",
      ],
      region: "Efeze · Turkije",
      h1: "Reisgids Efeze",
      h1Accent: "Wandel door de geschiedenis",
      heroLead:
        "Efeze is een van de best bewaarde antieke steden ter wereld. Een lokale gids verandert ruïnes in verhalen — keizers, gladiatoren, filosofen en heiligen bewandelden diezelfde straten.",
      ctaPrimary: "Boek nu een gids →",
      ctaSecondary: "Bekijk de touropties",
      highlightsKicker: "Topbezienswaardigheden",
      highlightsHeading: "Wat je gids je laat zien",
      highlights: [
        { icon: "📚", name: "Bibliotheek van Celsus", desc: "Een van de grootste bibliotheken uit de oudheid — een 2e-eeuws Romeins meesterwerk dat nog altijd overeind staat." },
        { icon: "🏛️", name: "Tempel van Artemis", desc: "Een van de zeven wereldwonderen van de oudheid, op slechts enkele minuten van het hoofdterrein." },
        { icon: "🎭", name: "Groot Theater", desc: "Een Romeins theater met 25.000 zitplaatsen waar de apostel Paulus ooit predikte. De akoestiek is nog steeds verbluffend." },
        { icon: "🛕", name: "Huis van de Maagd Maria", desc: "Heilig voor zowel christenen als moslims — een bedevaartsoord hoog in de heuvels boven Efeze." },
        { icon: "🏺", name: "Terrashuizen", desc: "Romeinse villa's met mozaïekvloeren, bewaard onder klimaatgeregelde overkappingen — verbluffend gedetailleerd." },
        { icon: "⛩️", name: "Tempel van Hadrianus", desc: "Fijn bewerkte Korinthische gevel uit de 2e eeuw, gewijd aan de keizer die Efeze bezocht." },
      ],
      seoHeading: "Waarom Efeze ontdekken met een lokale gids?",
      seoParagraphs: [
        "<strong>Efeze</strong> is een van de best bewaarde antieke steden ter wereld — een Griekse en later Romeinse metropool die ooit een kwart miljoen inwoners telde. Terwijl je over de marmeren straten loopt, passeer je tempels, badhuizen, fonteinen en imposante openbare gebouwen precies waar ze tweeduizend jaar geleden stonden. Maar ruïnes zwijgen op zichzelf. Zonder context is een zuil slechts een zuil; met een deskundige <strong>gids in Efeze</strong> worden diezelfde stenen het verhaal van keizers, kooplieden, filosofen en heiligen die de antieke Middellandse Zee vormgaven.",
        "Het onbetwiste icoon van de site is de <strong>Bibliotheek van Celsus</strong>, een oprijzende 2e-eeuwse Romeinse gevel die ooit duizenden boekrollen bevatte. Een paar stappen verderop bood het enorme <strong>Groot Theater</strong> plaats aan zo'n 25.000 toeschouwers en is het de plek waar volgens de overlevering de apostel Paulus tot de Efeziërs predikte. Een gids legt de bouwkunst, de akoestiek en het dagelijkse leven uit dat deze ruimtes vulde — zo wordt een snelle fotostop een echt begrip van hoe de stad functioneerde.",
        "Op slechts enkele minuten van de hoofdingang, bij Selçuk, staat wat rest van de <strong>Tempel van Artemis</strong> — ooit een van de <strong>zeven wereldwonderen van de oudheid</strong>, nu teruggebracht tot één gereconstrueerde zuil, maar nog altijd indrukwekkend als het verhaal goed wordt verteld. Veel tours klimmen ook de heuvels in naar het <strong>Huis van de Maagd Maria</strong>, een bedevaartsoord dat door zowel christenen als moslims wordt vereerd, en pauzeren bij de buitengewone <strong>Terrashuizen</strong>, waar de mozaïekvloeren en beschilderde muren van rijke Romeinse villa's bewaard zijn onder klimaatgeregelde overkappingen.",
        "Efeze ligt bij het stadje <strong>Selçuk</strong> in de provincie <strong>İzmir</strong>, aan de Egeïsche kust van Turkije en dicht bij Kuşadası, waardoor het eenvoudig te combineren is met het wijndorpje Şirince. Omdat zo veel van Efeze om interpretatie draait — inscripties lezen, verdwenen daken voor je zien, de Romeinse politiek begrijpen — maakt een erkende, in archeologie onderlegde gids het verschil. Elke gids op VibeGuide is erkend door het Turkse Ministerie van Cultuur en Toerisme, geïdentificeerd en na elke tour beoordeeld, zodat je door de geschiedenis kunt wandelen met iemand die haar echt kent.",
      ],
      modesKicker: "Zo werkt het",
      modesHeading: "Drie manieren om Efeze te ontdekken",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Direct een lokale gids", text: "Aangekomen bij Efeze zonder gids? Match binnen enkele minuten met een geverifieerde lokale expert en haal het meeste uit je bezoek." },
        { tag: "VibeSquad", color: C.squad, title: "Sluit je aan bij een kleine groep", text: "Sluit je aan bij andere reizigers voor een begeleide wandeling door Efeze — betaalbaar, gezellig en geleid door een erkende archeoloog-gids." },
        { tag: "Private Tour", color: C.private, title: "Jouw privédag bij Efeze", text: "Privé-ervaring van een hele dag met Efeze, de Terrashuizen, de Tempel van Artemis en het Huis van de Maagd Maria." },
      ],
      trustHeading: "Elke gids is geverifieerd",
      trustText: "Alle VibeGuide-gidsen in Efeze beschikken over een officiële licentie van het Turkse Ministerie van Cultuur, doorlopen een identiteitscontrole en worden na elke tour beoordeeld.",
      trustBadges: ["🪪 Erkend door het Ministerie van Cultuur", "✅ Identiteit geverifieerd", "⭐ 4,9 gemiddelde score", "🚫 Zerotolerancebeleid"],
      faqHeading: "Veelgestelde vragen",
      faqs: [
        { q: "Wat kost een gids bij Efeze?", a: "De prijzen hangen af van het type tour en de duur. Met VibeGuide zie je de exacte prijs vóór je boekt — de meeste privétours van een halve dag door Efeze beginnen bij een vast tarief per persoon, zonder verborgen kosten. Groepstours (VibeSquad) zijn de voordeligste manier om de antieke stad te ontdekken." },
        { q: "Zijn de gidsen van VibeGuide in Efeze erkend?", a: "Ja. Elke gids op VibeGuide beschikt over een officiële licentie van het Turkse Ministerie van Cultuur en Toerisme, doorloopt een identiteitscontrole en wordt na elke tour beoordeeld. Veel gidsen in Efeze zijn bovendien opgeleid in archeologie en oude geschiedenis. We hanteren een zerotolerancebeleid voor gidsen zonder licentie." },
        { q: "Zie ik de Bibliotheek van Celsus tijdens de tour?", a: "Ja. De Bibliotheek van Celsus is het iconische middelpunt van Efeze, en elke begeleide route bevat haar. Je gids legt de 2e-eeuwse Romeinse bouwkunst uit, de beelden die wijsheid en deugd verbeelden, en hoe zij ooit duizenden boekrollen bevatte." },
        { q: "Kan ik de Tempel van Artemis met een gids bezoeken?", a: "Ja. De Tempel van Artemis — een van de zeven wereldwonderen van de oudheid — ligt op slechts enkele minuten van het hoofdterrein bij Selçuk. Vandaag staat er nog maar één zuil overeind, en een gids brengt de schaal en geschiedenis ervan tot leven op een manier die de ruïnes alleen niet kunnen." },
        { q: "Is het Huis van de Maagd Maria inbegrepen?", a: "Dat kan. Het Huis van de Maagd Maria, in de heuvels boven Efeze, is een bedevaartsoord dat heilig is voor zowel christenen als moslims. Veel privé- en dagtours combineren het met Efeze en de Tempel van Artemis — laat je gids gewoon weten dat je het wilt opnemen." },
        { q: "Waar ligt Efeze en kan ik het combineren met het dorpje Şirince?", a: "Efeze ligt bij het stadje Selçuk in de provincie İzmir, aan de Egeïsche kust van Turkije, dicht bij Kuşadası. Het charmante heuveldorpje Şirince, beroemd om zijn vruchtenwijnen en Ottomaanse huizen, ligt op korte rijafstand — gidsen combineren de twee vaak tot één ontspannen dag." },
      ],
      otherHeading: "Ontdek meer van Turkije",
      otherCities: [
        { href: "/nl/istanbul-tour-guide", icon: "🕌", name: "Reisgids Istanboel", desc: "Hagia Sophia, Grote Bazaar & de Bosporus" },
        { href: "/nl/cappadocia-tour-guide", icon: "🎈", name: "Reisgids Cappadocië", desc: "Luchtballonnen, sprookjesschoorstenen & rotskerken" },
      ],
      ctaTitle: "Klaar om Efeze te ontdekken?",
      ctaSub: "Download VibeGuide gratis. Vind een lokale gids in 60 seconden.",
      ctaAvailability: "Gratis · Geen abonnement · Efeze nu beschikbaar",
    },
    de: {
      metaTitle: "Ephesus Reiseführer — Private & Gruppentouren",
      metaDescription:
        "Entdecke das antike Ephesus mit einem verifizierten lokalen Reiseführer. Celsus-Bibliothek, Artemis-Tempel, die römische Agora — private oder Gruppentouren, sofort buchbar mit VibeGuide.",
      ogDescription:
        "Erkunde eine der besterhaltenen antiken Städte der Welt mit einem lizenzierten lokalen Guide. Sofortbuchung über VibeGuide.",
      keywords: [
        "Ephesus Reiseführer", "Ephesus Privattour", "Ephesus lokaler Guide",
        "Celsus-Bibliothek Tour", "Artemis-Tempel Tour", "Ephesus Wandertour",
        "antike Ruinen Türkei", "Selçuk Guide", "Kuşadası Reiseführer", "Ephesus Gruppentour",
      ],
      region: "Ephesus · Türkei",
      h1: "Ephesus Reiseführer",
      h1Accent: "Wandle durch die Geschichte",
      heroLead:
        "Ephesus ist eine der besterhaltenen antiken Städte der Welt. Ein lokaler Guide verwandelt Ruinen in Geschichten — Kaiser, Gladiatoren, Philosophen und Heilige gingen durch dieselben Straßen.",
      ctaPrimary: "Jetzt Guide buchen →",
      ctaSecondary: "Touroptionen ansehen",
      highlightsKicker: "Top-Stätten",
      highlightsHeading: "Was dein Guide dir zeigt",
      highlights: [
        { icon: "📚", name: "Celsus-Bibliothek", desc: "Eine der größten Bibliotheken der Antike — ein römisches Meisterwerk aus dem 2. Jahrhundert, das noch steht." },
        { icon: "🏛️", name: "Artemis-Tempel", desc: "Eines der Sieben Weltwunder der Antike, nur wenige Minuten von der Hauptstätte entfernt." },
        { icon: "🎭", name: "Großes Theater", desc: "Ein römisches Theater mit 25.000 Plätzen, in dem einst der Apostel Paulus predigte. Die Akustik verblüfft bis heute." },
        { icon: "🛕", name: "Haus der Jungfrau Maria", desc: "Christen wie Muslimen heilig — ein Pilgerort hoch in den Hügeln über Ephesus." },
        { icon: "🏺", name: "Hanghäuser", desc: "Römische Villen mit Mosaikböden, unter klimatisierten Schutzdächern bewahrt — von verblüffendem Detailreichtum." },
        { icon: "⛩️", name: "Hadrian-Tempel", desc: "Filigrane korinthische Fassade aus dem 2. Jahrhundert, dem Kaiser gewidmet, der Ephesus besuchte." },
      ],
      seoHeading: "Warum Ephesus mit einem lokalen Guide entdecken?",
      seoParagraphs: [
        "<strong>Ephesus</strong> ist eine der besterhaltenen antiken Städte der Welt — eine griechische und später römische Metropole, in der einst eine Viertelmillion Menschen lebten. Auf den Marmorstraßen kommst du an Tempeln, Bädern, Brunnen und prächtigen öffentlichen Bauten vorbei, genau dort, wo sie vor zweitausend Jahren standen. Doch Ruinen schweigen für sich allein. Ohne Kontext ist eine Säule nur eine Säule; mit einem kundigen <strong>Ephesus-Reiseführer</strong> werden dieselben Steine zur Geschichte von Kaisern, Kaufleuten, Philosophen und Heiligen, die das antike Mittelmeer prägten.",
        "Das unbestrittene Wahrzeichen der Stätte ist die <strong>Celsus-Bibliothek</strong>, eine emporragende römische Fassade aus dem 2. Jahrhundert, die einst Tausende von Schriftrollen beherbergte. Nur wenige Schritte entfernt bot das gewaltige <strong>Große Theater</strong> rund 25.000 Zuschauern Platz und ist der Ort, an dem der Überlieferung nach der Apostel Paulus zu den Ephesern predigte. Ein Guide erklärt die Bautechnik, die Akustik und das Alltagsleben, das diese Räume erfüllte — und macht aus einem kurzen Fotostopp ein echtes Verständnis dafür, wie die Stadt funktionierte.",
        "Nur wenige Minuten vom Haupteingang entfernt, bei Selçuk, steht der Rest des <strong>Artemis-Tempels</strong> — einst eines der <strong>Sieben Weltwunder der Antike</strong>, heute auf eine einzige rekonstruierte Säule reduziert, doch noch immer eindrucksvoll, wenn seine Geschichte gut erzählt wird. Viele Touren steigen auch in die Hügel zum <strong>Haus der Jungfrau Maria</strong>, einem von Christen und Muslimen gleichermaßen verehrten Pilgerort, und halten an den außergewöhnlichen <strong>Hanghäusern</strong>, wo Mosaikböden und bemalte Wände wohlhabender römischer Villen unter klimatisierten Schutzdächern erhalten sind.",
        "Ephesus liegt nahe der Stadt <strong>Selçuk</strong> in der Provinz <strong>İzmir</strong>, an der türkischen Ägäisküste und nahe Kuşadası, und lässt sich gut mit dem Weindorf Şirince verbinden. Da so vieles an Ephesus von der Deutung lebt — Inschriften lesen, verschwundene Dächer sich vorstellen, römische Politik verstehen — macht ein lizenzierter, archäologisch versierter Guide den ganzen Unterschied. Jeder Guide bei VibeGuide ist vom türkischen Kultusministerium lizenziert, identitätsgeprüft und wird nach jeder Tour bewertet, damit du mit jemandem durch die Geschichte gehst, der sie wirklich kennt.",
      ],
      modesKicker: "So funktioniert's",
      modesHeading: "Drei Wege, Ephesus zu entdecken",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Sofort ein lokaler Guide", text: "Ohne Guide in Ephesus angekommen? Lass dich in Minuten mit einem verifizierten lokalen Experten vermitteln und hol das Beste aus deinem Besuch heraus." },
        { tag: "VibeSquad", color: C.squad, title: "Einer kleinen Gruppe beitreten", text: "Schließe dich anderen Reisenden für einen geführten Rundgang durch Ephesus an — günstig, gesellig und geleitet von einem lizenzierten Archäologen-Guide." },
        { tag: "Private Tour", color: C.private, title: "Dein privater Tag in Ephesus", text: "Privates Ganztageserlebnis inklusive Ephesus, den Hanghäusern, dem Artemis-Tempel und dem Haus der Jungfrau Maria." },
      ],
      trustHeading: "Jeder Guide ist verifiziert",
      trustText: "Alle VibeGuide-Reiseführer in Ephesus besitzen offizielle Lizenzen des türkischen Kultusministeriums, durchlaufen eine Identitätsprüfung und werden nach jeder Tour bewertet.",
      trustBadges: ["🪪 Lizenziert vom Kultusministerium", "✅ Identität geprüft", "⭐ 4,9 Ø-Bewertung", "🚫 Null-Toleranz-Politik"],
      faqHeading: "Häufig gestellte Fragen",
      faqs: [
        { q: "Wie viel kostet ein Reiseführer in Ephesus?", a: "Die Preise hängen von Tourart und Dauer ab. Mit VibeGuide siehst du den genauen Preis schon vor der Buchung — die meisten privaten Halbtagestouren durch Ephesus beginnen bei einem festen Preis pro Person, ohne versteckte Gebühren. Gruppentouren (VibeSquad) sind die günstigste Art, die antike Stadt zu erkunden." },
        { q: "Sind die Ephesus-Guides von VibeGuide lizenziert?", a: "Ja. Jeder Guide bei VibeGuide besitzt eine offizielle Lizenz des türkischen Ministeriums für Kultur und Tourismus, durchläuft eine Identitätsprüfung und wird nach jeder Tour bewertet. Viele Ephesus-Guides sind zudem in Archäologie und antiker Geschichte ausgebildet. Für unlizenzierte Führungen gilt bei uns eine Null-Toleranz-Politik." },
        { q: "Sehe ich auf der Tour die Celsus-Bibliothek?", a: "Ja. Die Celsus-Bibliothek ist das ikonische Herzstück von Ephesus, und jede geführte Route schließt sie ein. Dein Guide erklärt ihre römische Architektur aus dem 2. Jahrhundert, die Statuen, die Weisheit und Tugend verkörpern, und wie sie einst Tausende von Schriftrollen beherbergte." },
        { q: "Kann ich den Tempel der Artemis mit einem Guide besuchen?", a: "Ja. Der Tempel der Artemis — eines der Sieben Weltwunder der Antike — liegt nur wenige Minuten vom Hauptgelände bei Selçuk entfernt. Heute steht nur noch eine einzige Säule, und ein Guide lässt seine einstige Größe und Geschichte auf eine Weise lebendig werden, wie es die Ruinen allein nicht können." },
        { q: "Ist das Haus der Jungfrau Maria inbegriffen?", a: "Es kann sein. Das Haus der Jungfrau Maria in den Hügeln oberhalb von Ephesus ist ein Pilgerort, der sowohl Christen als auch Muslimen heilig ist. Viele private und Ganztagestouren verbinden es mit Ephesus und dem Tempel der Artemis — sag deinem Guide einfach, dass du es einbeziehen möchtest." },
        { q: "Wo liegt Ephesus und kann ich es mit dem Dorf Şirince verbinden?", a: "Ephesus liegt nahe der Stadt Selçuk in der Provinz İzmir an der türkischen Ägäisküste, unweit von Kuşadası. Das charmante Bergdorf Şirince, bekannt für seine Fruchtweine und osmanischen Häuser, ist nur eine kurze Fahrt entfernt — Guides verbinden beide oft zu einem entspannten Tag." },
      ],
      otherHeading: "Mehr von der Türkei entdecken",
      otherCities: [
        { href: "/attractions/de/ephesus", icon: "🏛️", name: "Ephesus Reiseführer", desc: "Celsus-Bibliothek, Großes Theater & mehr" },
        { href: "/de/istanbul-tour-guide", icon: "🕌", name: "Istanbul Reiseführer", desc: "Hagia Sophia, Großer Basar & der Bosporus" },
        { href: "/de/cappadocia-tour-guide", icon: "🎈", name: "Kappadokien Reiseführer", desc: "Heißluftballons, Feenkamine & Höhlenkirchen" },
      ],
      ctaTitle: "Bereit, Ephesus zu entdecken?",
      ctaSub: "Lade VibeGuide kostenlos. Finde einen lokalen Guide in 60 Sekunden.",
      ctaAvailability: "Kostenlos · Kein Abo · Ephesus jetzt verfügbar",
    },
    es: {
      metaTitle: "Guía Turístico de Éfeso — Tours Privados y en Grupo",
      metaDescription:
        "Explora la antigua Éfeso con un guía local verificado. Biblioteca de Celso, Templo de Artemisa, el ágora romana — tours privados o en grupo, reservados al instante con VibeGuide.",
      ogDescription:
        "Recorre una de las ciudades antiguas mejor conservadas del mundo con un guía local licenciado. Reserva instantánea con VibeGuide.",
      keywords: [
        "guía turístico Éfeso", "tour privado Éfeso", "guía local Éfeso",
        "tour Biblioteca de Celso", "tour Templo de Artemisa", "tour a pie Éfeso",
        "ruinas antiguas Turquía", "guía Selçuk", "guía Kuşadası", "tour en grupo Éfeso",
      ],
      region: "Éfeso · Turquía",
      h1: "Guía Turístico de Éfeso",
      h1Accent: "Recorre la Historia",
      heroLead:
        "Éfeso es una de las ciudades antiguas mejor conservadas del mundo. Un guía local convierte las ruinas en historias — emperadores, gladiadores, filósofos y santos caminaron estas mismas calles.",
      ctaPrimary: "Reservar un Guía →",
      ctaSecondary: "Ver Opciones de Tour",
      highlightsKicker: "Sitios Principales",
      highlightsHeading: "Lo que tu guía te mostrará",
      highlights: [
        { icon: "📚", name: "Biblioteca de Celso", desc: "Una de las mayores bibliotecas de la antigüedad — una obra maestra romana del siglo II que aún sigue en pie." },
        { icon: "🏛️", name: "Templo de Artemisa", desc: "Una de las Siete Maravillas del Mundo Antiguo, a pocos minutos del sitio principal." },
        { icon: "🎭", name: "Gran Teatro", desc: "Un teatro romano de 25.000 asientos donde predicó San Pablo. Su acústica sigue asombrando." },
        { icon: "🛕", name: "Casa de la Virgen María", desc: "Sagrada por igual para cristianos y musulmanes — un lugar de peregrinación en lo alto de las colinas sobre Éfeso." },
        { icon: "🏺", name: "Casas en Terraza", desc: "Villas romanas con suelos de mosaico conservadas bajo cubiertas climatizadas — un detalle asombroso." },
        { icon: "⛩️", name: "Templo de Adriano", desc: "Una intrincada fachada corintia tallada en el siglo II, dedicada al emperador que visitó Éfeso." },
      ],
      seoHeading: "¿Por qué explorar Éfeso con un guía local?",
      seoParagraphs: [
        "<strong>Éfeso</strong> es una de las ciudades antiguas mejor conservadas del mundo — una metrópoli griega y más tarde romana que llegó a albergar a un cuarto de millón de personas. Al caminar por sus calles de mármol, pasas junto a templos, termas, fuentes y grandes edificios cívicos exactamente donde se alzaban hace dos mil años. Pero las ruinas callan por sí solas. Sin contexto, una columna es solo una columna; con un <strong>guía turístico de Éfeso</strong> bien informado, esas mismas piedras se convierten en la historia de emperadores, mercaderes, filósofos y santos que dieron forma al Mediterráneo antiguo.",
        "El icono indiscutible del sitio es la <strong>Biblioteca de Celso</strong>, una imponente fachada romana del siglo II que llegó a custodiar miles de rollos. A pocos pasos, el vasto <strong>Gran Teatro</strong> daba cabida a unos 25.000 espectadores y es, según la tradición, donde San Pablo predicó a los efesios. Un guía explica la ingeniería, la acústica y la vida cotidiana que llenaba estos espacios — convirtiendo una rápida parada para fotos en una comprensión genuina de cómo funcionaba la ciudad.",
        "A pocos minutos de la entrada principal, cerca de Selçuk, se alza lo que queda del <strong>Templo de Artemisa</strong> — en su día una de las <strong>Siete Maravillas del Mundo Antiguo</strong>, hoy reducido a una sola columna reconstruida, pero aún poderoso cuando su historia se cuenta bien. Muchos tours suben también a las colinas hasta la <strong>Casa de la Virgen María</strong>, lugar de peregrinación venerado por cristianos y musulmanes por igual, y se detienen en las extraordinarias <strong>Casas en Terraza</strong>, donde sobreviven suelos de mosaico y paredes pintadas de ricas villas romanas bajo cubiertas climatizadas.",
        "Éfeso se encuentra cerca de la localidad de <strong>Selçuk</strong>, en la provincia de <strong>İzmir</strong>, en la costa egea de Turquía y cerca de Kuşadası, lo que facilita combinarlo con el pueblo vinícola de Şirince. Como buena parte de Éfeso es interpretación — leer inscripciones, imaginar techos desaparecidos, entender la política romana — un guía licenciado y experto en arqueología marca toda la diferencia. Cada guía de VibeGuide está licenciado por el Ministerio de Cultura y Turismo de Turquía, tiene su identidad verificada y es evaluado tras cada tour, para que recorras la historia con alguien que de verdad la conoce.",
      ],
      modesKicker: "Cómo funciona",
      modesHeading: "Tres formas de explorar Éfeso",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Guía local al instante", text: "¿Llegaste a Éfeso sin guía? Conéctate con un experto local verificado en minutos y aprovecha al máximo tu visita." },
        { tag: "VibeSquad", color: C.squad, title: "Únete a un grupo pequeño", text: "Únete a otros viajeros en un recorrido guiado por Éfeso — económico, social y dirigido por un guía arqueólogo licenciado." },
        { tag: "Tour Privado", color: C.private, title: "Tu día privado en Éfeso", text: "Experiencia privada de día completo que incluye Éfeso, las Casas en Terraza, el Templo de Artemisa y la Casa de la Virgen María." },
      ],
      trustHeading: "Cada guía está verificado",
      trustText: "Todos los guías de VibeGuide en Éfeso tienen licencias oficiales del Ministerio de Cultura de Turquía, pasan verificación de identidad y son evaluados tras cada tour.",
      trustBadges: ["🪪 Licenciado por el Ministerio de Cultura", "✅ Identidad verificada", "⭐ 4,9 de valoración media", "🚫 Política de tolerancia cero"],
      faqHeading: "Preguntas frecuentes",
      faqs: [
        { q: "¿Cuánto cuesta un guía turístico en Éfeso?", a: "Los precios dependen del tipo de tour y su duración. Con VibeGuide ves el precio exacto antes de reservar: la mayoría de los tours privados de medio día por Éfeso parten de una tarifa fija por persona, sin cargos ocultos. Los tours en grupo (VibeSquad) son la forma más económica de explorar la ciudad antigua." },
        { q: "¿Los guías de Éfeso de VibeGuide están autorizados?", a: "Sí. Cada guía de VibeGuide cuenta con una licencia oficial del Ministerio de Cultura y Turismo de Turquía, supera una verificación de identidad y es evaluado tras cada tour. Muchos guías de Éfeso también tienen formación en arqueología e historia antigua. Tenemos una política de tolerancia cero con las guías sin licencia." },
        { q: "¿Veré la Biblioteca de Celso en el tour?", a: "Sí. La Biblioteca de Celso es la pieza central e icónica de Éfeso, y toda ruta guiada la incluye. Tu guía explica su arquitectura romana del siglo II, las estatuas que representan la sabiduría y la virtud, y cómo llegó a albergar miles de rollos." },
        { q: "¿Puedo visitar el Templo de Artemisa con un guía?", a: "Sí. El Templo de Artemisa —una de las Siete Maravillas del Mundo Antiguo— se encuentra a solo unos minutos del recinto principal, cerca de Selçuk. Hoy solo queda en pie una única columna, y un guía da vida a su escala e historia de un modo que las ruinas por sí solas no pueden." },
        { q: "¿Se incluye la Casa de la Virgen María?", a: "Puede incluirse. La Casa de la Virgen María, en las colinas sobre Éfeso, es un lugar de peregrinación sagrado tanto para cristianos como para musulmanes. Muchos tours privados y de día completo la combinan con Éfeso y el Templo de Artemisa: solo dile a tu guía que te gustaría incluirla." },
        { q: "¿Dónde está Éfeso y puedo combinarlo con el pueblo de Şirince?", a: "Éfeso está cerca de la localidad de Selçuk, en la provincia de İzmir, en la costa egea de Turquía, junto a Kuşadası. El encantador pueblo de montaña de Şirince, famoso por sus vinos de fruta y sus casas otomanas, queda a poca distancia en coche: los guías suelen combinar ambos en un día relajado." },
      ],
      otherHeading: "Explora más de Turquía",
      otherCities: [
        { href: "/attractions/es/ephesus", icon: "🏛️", name: "Guía de Viaje de Éfeso", desc: "Biblioteca de Celso, Gran Teatro y más" },
        { href: "/es/istanbul-tour-guide", icon: "🕌", name: "Guía Turístico de Estambul", desc: "Santa Sofía, Gran Bazar y el Bósforo" },
        { href: "/es/cappadocia-tour-guide", icon: "🎈", name: "Guía de Capadocia", desc: "Globos aerostáticos, chimeneas de hadas e iglesias rupestres" },
      ],
      ctaTitle: "¿Listo para explorar Éfeso?",
      ctaSub: "Descarga VibeGuide gratis. Encuentra un guía local en 60 segundos.",
      ctaAvailability: "Gratis · Sin suscripción · Éfeso disponible ahora",
    },
    fr: {
      metaTitle: "Guide Touristique d'Éphèse — Visites Privées et en Groupe",
      metaDescription:
        "Explorez l'antique Éphèse avec un guide local vérifié. Bibliothèque de Celsus, temple d'Artémis, l'agora romaine — visites privées ou en groupe, réservées instantanément avec VibeGuide.",
      ogDescription:
        "Parcourez l'une des cités antiques les mieux préservées au monde avec un guide local licencié. Réservation instantanée via VibeGuide.",
      keywords: [
        "guide touristique Éphèse", "visite privée Éphèse", "guide local Éphèse",
        "visite bibliothèque de Celsus", "visite temple d'Artémis", "visite à pied Éphèse",
        "ruines antiques Turquie", "guide Selçuk", "guide Kuşadası", "visite en groupe Éphèse",
      ],
      region: "Éphèse · Turquie",
      h1: "Guide Touristique d'Éphèse",
      h1Accent: "Traversez l'Histoire",
      heroLead:
        "Éphèse est l'une des cités antiques les mieux préservées au monde. Un guide local transforme les ruines en récits — empereurs, gladiateurs, philosophes et saints ont arpenté ces mêmes rues.",
      ctaPrimary: "Réserver un Guide →",
      ctaSecondary: "Voir les Options",
      highlightsKicker: "Sites Phares",
      highlightsHeading: "Ce que votre guide vous montrera",
      highlights: [
        { icon: "📚", name: "Bibliothèque de Celsus", desc: "L'une des plus grandes bibliothèques de l'Antiquité — un chef-d'œuvre romain du IIe siècle toujours debout." },
        { icon: "🏛️", name: "Temple d'Artémis", desc: "L'une des Sept Merveilles du monde antique, à quelques minutes du site principal." },
        { icon: "🎭", name: "Grand Théâtre", desc: "Un théâtre romain de 25 000 places où saint Paul aurait prêché. L'acoustique étonne encore." },
        { icon: "🛕", name: "Maison de la Vierge Marie", desc: "Sacrée pour les chrétiens comme pour les musulmans — un lieu de pèlerinage haut dans les collines au-dessus d'Éphèse." },
        { icon: "🏺", name: "Maisons en Terrasse", desc: "Villas romaines aux sols de mosaïque préservées sous des abris climatisés — un détail saisissant." },
        { icon: "⛩️", name: "Temple d'Hadrien", desc: "Une façade corinthienne ouvragée sculptée au IIe siècle, dédiée à l'empereur qui visita Éphèse." },
      ],
      seoHeading: "Pourquoi explorer Éphèse avec un guide local ?",
      seoParagraphs: [
        "<strong>Éphèse</strong> est l'une des cités antiques les mieux préservées au monde — une métropole grecque puis romaine qui compta jadis un quart de million d'habitants. En arpentant ses rues de marbre, vous passez devant des temples, des thermes, des fontaines et de grands édifices publics, exactement là où ils se dressaient il y a deux mille ans. Mais les ruines sont muettes par elles-mêmes. Sans contexte, une colonne n'est qu'une colonne ; avec un <strong>guide touristique d'Éphèse</strong> érudit, ces mêmes pierres deviennent l'histoire des empereurs, marchands, philosophes et saints qui façonnèrent la Méditerranée antique.",
        "L'icône incontestée du site est la <strong>bibliothèque de Celsus</strong>, une façade romaine élancée du IIe siècle qui abrita jadis des milliers de rouleaux. À quelques pas, le vaste <strong>Grand Théâtre</strong> accueillait quelque 25 000 spectateurs et c'est là que, selon la tradition, saint Paul prêcha aux Éphésiens. Un guide explique l'ingénierie, l'acoustique et la vie quotidienne qui emplissait ces lieux — transformant un bref arrêt photo en une véritable compréhension du fonctionnement de la cité.",
        "À quelques minutes de l'entrée principale, près de Selçuk, se dresse ce qui subsiste du <strong>temple d'Artémis</strong> — jadis l'une des <strong>Sept Merveilles du monde antique</strong>, aujourd'hui réduit à une unique colonne reconstituée, mais toujours saisissant lorsque son histoire est bien racontée. Beaucoup de visites montent aussi dans les collines jusqu'à la <strong>Maison de la Vierge Marie</strong>, lieu de pèlerinage vénéré par les chrétiens comme par les musulmans, et s'arrêtent aux extraordinaires <strong>Maisons en Terrasse</strong>, où survivent sols de mosaïque et murs peints de riches villas romaines sous des abris climatisés.",
        "Éphèse se situe près de la ville de <strong>Selçuk</strong>, dans la province d'<strong>İzmir</strong>, sur la côte égéenne de la Turquie et près de Kuşadası, ce qui permet de la combiner facilement avec le village viticole de Şirince. Comme une grande part d'Éphèse relève de l'interprétation — lire les inscriptions, imaginer les toitures disparues, comprendre la politique romaine — un guide licencié et féru d'archéologie fait toute la différence. Chaque guide sur VibeGuide est licencié par le ministère turc de la Culture et du Tourisme, vérifié quant à son identité et évalué après chaque visite, pour que vous traversiez l'histoire avec quelqu'un qui la connaît vraiment.",
      ],
      modesKicker: "Comment ça marche",
      modesHeading: "Trois façons d'explorer Éphèse",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Guide local instantané", text: "Arrivé à Éphèse sans guide ? Mettez-vous en relation avec un expert local vérifié en quelques minutes et tirez le meilleur de votre visite." },
        { tag: "VibeSquad", color: C.squad, title: "Rejoindre un petit groupe", text: "Rejoignez d'autres voyageurs pour une promenade guidée à travers Éphèse — abordable, conviviale et menée par un guide archéologue licencié." },
        { tag: "Visite Privée", color: C.private, title: "Votre journée privée à Éphèse", text: "Expérience privée d'une journée entière incluant Éphèse, les Maisons en Terrasse, le temple d'Artémis et la Maison de la Vierge Marie." },
      ],
      trustHeading: "Chaque guide est vérifié",
      trustText: "Tous les guides VibeGuide à Éphèse détiennent des licences officielles du ministère turc de la Culture, passent une vérification d'identité et sont évalués après chaque visite.",
      trustBadges: ["🪪 Licencié par le ministère de la Culture", "✅ Identité vérifiée", "⭐ 4,9 de note moyenne", "🚫 Politique de tolérance zéro"],
      faqHeading: "Questions fréquentes",
      faqs: [
        { q: "Combien coûte un guide touristique à Éphèse ?", a: "Les prix dépendent du type et de la durée de la visite. Avec VibeGuide, vous voyez le prix exact avant de réserver — la plupart des visites privées d'une demi-journée d'Éphèse démarrent à un tarif fixe par personne, sans frais cachés. Les visites en groupe (VibeSquad) sont le moyen le plus économique d'explorer la cité antique." },
        { q: "Les guides d'Éphèse de VibeGuide sont-ils agréés ?", a: "Oui. Chaque guide de VibeGuide détient une licence officielle du ministère turc de la Culture et du Tourisme, passe une vérification d'identité et est évalué après chaque visite. De nombreux guides d'Éphèse sont également formés en archéologie et en histoire antique. Nous appliquons une politique de tolérance zéro envers les guides non agréés." },
        { q: "Verrai-je la bibliothèque de Celsus pendant la visite ?", a: "Oui. La bibliothèque de Celsus est la pièce maîtresse emblématique d'Éphèse, et chaque itinéraire guidé l'inclut. Votre guide explique son architecture romaine du IIe siècle, les statues représentant la sagesse et la vertu, et comment elle abritait autrefois des milliers de rouleaux." },
        { q: "Puis-je visiter le temple d'Artémis avec un guide ?", a: "Oui. Le temple d'Artémis — l'une des Sept Merveilles du monde antique — se trouve à quelques minutes du site principal, près de Selçuk. Une seule colonne tient encore debout aujourd'hui, et un guide redonne vie à son ampleur et à son histoire d'une manière que les ruines seules ne permettent pas." },
        { q: "La Maison de la Vierge Marie est-elle incluse ?", a: "Elle peut l'être. La Maison de la Vierge Marie, dans les collines au-dessus d'Éphèse, est un lieu de pèlerinage sacré pour les chrétiens comme pour les musulmans. De nombreuses visites privées et d'une journée complète la combinent avec Éphèse et le temple d'Artémis — indiquez simplement à votre guide que vous souhaitez l'inclure." },
        { q: "Où se trouve Éphèse et puis-je la combiner avec le village de Şirince ?", a: "Éphèse se situe près de la ville de Selçuk, dans la province d'İzmir, sur la côte égéenne de la Turquie, à proximité de Kuşadası. Le charmant village de montagne de Şirince, réputé pour ses vins de fruits et ses maisons ottomanes, est à quelques minutes en voiture — les guides combinent souvent les deux en une journée détendue." },
      ],
      otherHeading: "Explorez plus de la Turquie",
      otherCities: [
        { href: "/attractions/fr/ephesus", icon: "🏛️", name: "Guide de Voyage d'Éphèse", desc: "Bibliothèque de Celsus, Grand Théâtre & plus" },
        { href: "/fr/istanbul-tour-guide", icon: "🕌", name: "Guide Touristique d'Istanbul", desc: "Sainte-Sophie, Grand Bazar & le Bosphore" },
        { href: "/fr/cappadocia-tour-guide", icon: "🎈", name: "Guide de Cappadoce", desc: "Montgolfières, cheminées de fées & églises rupestres" },
      ],
      ctaTitle: "Prêt à explorer Éphèse ?",
      ctaSub: "Téléchargez VibeGuide gratuitement. Trouvez un guide local en 60 secondes.",
      ctaAvailability: "Gratuit · Sans abonnement · Éphèse disponible maintenant",
    },
    it: {
      metaTitle: "Guida Turistica di Efeso — Tour Privati e di Gruppo",
      metaDescription:
        "Esplora l'antica Efeso con una guida locale verificata. Biblioteca di Celso, Tempio di Artemide, l'agorà romana — tour privati o di gruppo, prenotati all'istante con VibeGuide.",
      ogDescription:
        "Cammina in una delle città antiche meglio conservate al mondo con una guida locale autorizzata. Prenotazione istantanea con VibeGuide.",
      keywords: [
        "guida turistica Efeso", "tour privato Efeso", "guida locale Efeso",
        "tour Biblioteca di Celso", "tour Tempio di Artemide", "tour a piedi Efeso",
        "rovine antiche Turchia", "guida Selçuk", "guida Kuşadası", "tour di gruppo Efeso",
      ],
      region: "Efeso · Turchia",
      h1: "Guida Turistica di Efeso",
      h1Accent: "Cammina nella Storia",
      heroLead:
        "Efeso è una delle città antiche meglio conservate al mondo. Una guida locale trasforma le rovine in storie — imperatori, gladiatori, filosofi e santi hanno percorso queste stesse strade.",
      ctaPrimary: "Prenota una Guida →",
      ctaSecondary: "Vedi le Opzioni",
      highlightsKicker: "Siti Principali",
      highlightsHeading: "Cosa ti mostrerà la tua guida",
      highlights: [
        { icon: "📚", name: "Biblioteca di Celso", desc: "Una delle più grandi biblioteche dell'antichità — un capolavoro romano del II secolo ancora in piedi." },
        { icon: "🏛️", name: "Tempio di Artemide", desc: "Una delle Sette Meraviglie del mondo antico, a pochi minuti dal sito principale." },
        { icon: "🎭", name: "Grande Teatro", desc: "Un teatro romano da 25.000 posti dove predicò San Paolo. L'acustica stupisce ancora." },
        { icon: "🛕", name: "Casa della Vergine Maria", desc: "Sacra a cristiani e musulmani allo stesso modo — un luogo di pellegrinaggio in alto sulle colline sopra Efeso." },
        { icon: "🏺", name: "Case a Terrazza", desc: "Ville romane dai pavimenti a mosaico conservate sotto coperture climatizzate — dettagli sorprendenti." },
        { icon: "⛩️", name: "Tempio di Adriano", desc: "Un'intricata facciata corinzia scolpita nel II secolo, dedicata all'imperatore che visitò Efeso." },
      ],
      seoHeading: "Perché esplorare Efeso con una guida locale?",
      seoParagraphs: [
        "<strong>Efeso</strong> è una delle città antiche meglio conservate al mondo — una metropoli greca e poi romana che ospitò un tempo un quarto di milione di persone. Percorrendo le sue strade di marmo, passi accanto a templi, terme, fontane e grandi edifici civici esattamente dove sorgevano duemila anni fa. Ma le rovine, da sole, tacciono. Senza contesto, una colonna è solo una colonna; con una <strong>guida turistica di Efeso</strong> esperta, quelle stesse pietre diventano la storia di imperatori, mercanti, filosofi e santi che plasmarono il Mediterraneo antico.",
        "L'icona indiscussa del sito è la <strong>Biblioteca di Celso</strong>, un'imponente facciata romana del II secolo che custodì un tempo migliaia di rotoli. A pochi passi, il vasto <strong>Grande Teatro</strong> ospitava circa 25.000 spettatori ed è il luogo dove, secondo la tradizione, San Paolo predicò agli Efesini. Una guida spiega l'ingegneria, l'acustica e la vita quotidiana che riempiva questi spazi — trasformando una rapida sosta fotografica in una genuina comprensione di come funzionava la città.",
        "A pochi minuti dall'ingresso principale, vicino a Selçuk, sorge ciò che resta del <strong>Tempio di Artemide</strong> — un tempo una delle <strong>Sette Meraviglie del mondo antico</strong>, oggi ridotto a un'unica colonna ricostruita, eppure ancora potente quando la sua storia viene raccontata bene. Molti tour salgono anche sulle colline fino alla <strong>Casa della Vergine Maria</strong>, luogo di pellegrinaggio venerato da cristiani e musulmani, e si fermano alle straordinarie <strong>Case a Terrazza</strong>, dove sopravvivono pavimenti a mosaico e pareti dipinte di ricche ville romane sotto coperture climatizzate.",
        "Efeso si trova vicino alla cittadina di <strong>Selçuk</strong>, nella provincia di <strong>İzmir</strong>, sulla costa egea della Turchia e vicino a Kuşadası, il che la rende facile da abbinare al borgo vinicolo di Şirince. Poiché gran parte di Efeso è interpretazione — leggere le iscrizioni, immaginare i tetti scomparsi, comprendere la politica romana — una guida autorizzata ed esperta di archeologia fa tutta la differenza. Ogni guida su VibeGuide è autorizzata dal Ministero della Cultura e del Turismo turco, verificata nell'identità e valutata dopo ogni tour, così cammini nella storia con qualcuno che la conosce davvero.",
      ],
      modesKicker: "Come funziona",
      modesHeading: "Tre modi per esplorare Efeso",
      modes: [
        { tag: "VibeNow", color: C.now, title: "Guida locale all'istante", text: "Arrivato a Efeso senza guida? Mettiti in contatto con un esperto locale verificato in pochi minuti e sfrutta al meglio la tua visita." },
        { tag: "VibeSquad", color: C.squad, title: "Unisciti a un piccolo gruppo", text: "Unisciti ad altri viaggiatori per una passeggiata guidata attraverso Efeso — economica, sociale e condotta da una guida archeologa autorizzata." },
        { tag: "Tour Privato", color: C.private, title: "La tua giornata privata a Efeso", text: "Esperienza privata di un'intera giornata che include Efeso, le Case a Terrazza, il Tempio di Artemide e la Casa della Vergine Maria." },
      ],
      trustHeading: "Ogni guida è verificata",
      trustText: "Tutte le guide VibeGuide a Efeso possiedono licenze ufficiali del Ministero della Cultura turco, superano la verifica dell'identità e vengono valutate dopo ogni tour.",
      trustBadges: ["🪪 Autorizzata dal Ministero della Cultura", "✅ Identità verificata", "⭐ 4,9 valutazione media", "🚫 Politica di tolleranza zero"],
      faqHeading: "Domande frequenti",
      faqs: [
        { q: "Quanto costa una guida turistica a Efeso?", a: "I prezzi dipendono dal tipo di tour e dalla durata. Con VibeGuide vedi il prezzo esatto prima di prenotare: la maggior parte dei tour privati di mezza giornata di Efeso parte da una tariffa fissa a persona, senza costi nascosti. I tour di gruppo (VibeSquad) sono il modo più economico per esplorare la città antica." },
        { q: "Le guide di Efeso di VibeGuide sono abilitate?", a: "Sì. Ogni guida su VibeGuide possiede una licenza ufficiale del Ministero turco della Cultura e del Turismo, supera una verifica dell'identità e viene valutata dopo ogni tour. Molte guide di Efeso hanno anche una formazione in archeologia e storia antica. Applichiamo una politica di tolleranza zero verso le guide non abilitate." },
        { q: "Vedrò la Biblioteca di Celso durante il tour?", a: "Sì. La Biblioteca di Celso è l'iconico cuore di Efeso, e ogni itinerario guidato la include. La tua guida spiega la sua architettura romana del II secolo, le statue che rappresentano la saggezza e la virtù e come un tempo custodisse migliaia di rotoli." },
        { q: "Posso visitare il Tempio di Artemide con una guida?", a: "Sì. Il Tempio di Artemide — una delle Sette Meraviglie del Mondo Antico — si trova a pochi minuti dal sito principale, vicino a Selçuk. Oggi resta in piedi una sola colonna, e una guida fa rivivere la sua imponenza e la sua storia in un modo che le sole rovine non possono." },
        { q: "La Casa della Vergine Maria è inclusa?", a: "Può esserlo. La Casa della Vergine Maria, sulle colline sopra Efeso, è un luogo di pellegrinaggio sacro sia per i cristiani sia per i musulmani. Molti tour privati e di un'intera giornata la abbinano a Efeso e al Tempio di Artemide: basta dire alla tua guida che desideri includerla." },
        { q: "Dove si trova Efeso e posso abbinarlo al villaggio di Şirince?", a: "Efeso si trova vicino alla cittadina di Selçuk, nella provincia di İzmir, sulla costa egea della Turchia, vicino a Kuşadası. L'incantevole villaggio collinare di Şirince, famoso per i suoi vini di frutta e le case ottomane, è a breve distanza in auto: le guide spesso abbinano i due luoghi in una giornata rilassata." },
      ],
      otherHeading: "Esplora di più della Turchia",
      otherCities: [
        { href: "/attractions/it/ephesus", icon: "🏛️", name: "Guida di Viaggio di Efeso", desc: "Biblioteca di Celso, Grande Teatro e altro" },
        { href: "/it/istanbul-tour-guide", icon: "🕌", name: "Guida Turistica di Istanbul", desc: "Santa Sofia, Gran Bazar e il Bosforo" },
        { href: "/it/cappadocia-tour-guide", icon: "🎈", name: "Guida della Cappadocia", desc: "Mongolfiere, camini delle fate e chiese rupestri" },
      ],
      ctaTitle: "Pronto a esplorare Efeso?",
      ctaSub: "Scarica VibeGuide gratis. Trova una guida locale in 60 secondi.",
      ctaAvailability: "Gratis · Nessun abbonamento · Efeso disponibile ora",
    },
    ar: {
      metaTitle: "دليل سياحي في أفسس — جولات خاصة وجماعية",
      metaDescription:
        "استكشف أفسس القديمة مع دليل محلي موثّق. مكتبة كلسوس ومعبد أرتميس والأغورا الرومانية — جولات خاصة أو جماعية، تُحجز فورًا عبر VibeGuide.",
      ogDescription:
        "تجوّل في واحدة من أفضل المدن القديمة حفظًا في العالم مع دليل محلي مرخّص. حجز فوري عبر VibeGuide.",
      keywords: [
        "دليل سياحي أفسس", "جولة خاصة أفسس", "مرشد محلي أفسس",
        "جولة مكتبة كلسوس", "جولة معبد أرتميس", "جولة مشي أفسس",
        "آثار قديمة تركيا", "مرشد سلجوق", "مرشد كوشاداسي", "جولة جماعية أفسس",
      ],
      region: "أفسس · تركيا",
      h1: "دليل سياحي في أفسس",
      h1Accent: "تجوّل عبر التاريخ",
      heroLead:
        "أفسس واحدة من أفضل المدن القديمة حفظًا على وجه الأرض. يحوّل الدليل المحلي الأطلال إلى قصص — مشى في هذه الشوارع نفسها أباطرة ومصارعون وفلاسفة وقدّيسون.",
      ctaPrimary: "احجز دليلًا الآن →",
      ctaSecondary: "اطّلع على خيارات الجولات",
      highlightsKicker: "أبرز المواقع",
      highlightsHeading: "ما سيُريك إياه دليلك",
      highlights: [
        { icon: "📚", name: "مكتبة كلسوس", desc: "إحدى أعظم مكتبات العصور القديمة — تحفة رومانية من القرن الثاني لا تزال قائمة." },
        { icon: "🏛️", name: "معبد أرتميس", desc: "إحدى عجائب الدنيا السبع في العالم القديم، على بُعد دقائق من الموقع الرئيسي." },
        { icon: "🎭", name: "المسرح الكبير", desc: "مسرح روماني يتّسع لـ25000 متفرّج خطب فيه القدّيس بولس. ولا تزال صوتياته مذهلة." },
        { icon: "🛕", name: "بيت السيدة مريم العذراء", desc: "مقدّس لدى المسيحيين والمسلمين معًا — موقع حجّ عالٍ في التلال فوق أفسس." },
        { icon: "🏺", name: "بيوت المدرّجات", desc: "فيلات رومانية بأرضيات فسيفسائية محفوظة تحت مظلّات مكيّفة — تفاصيل مذهلة." },
        { icon: "⛩️", name: "معبد هادريان", desc: "واجهة كورنثية دقيقة منحوتة في القرن الثاني، مُهداة للإمبراطور الذي زار أفسس." },
      ],
      seoHeading: "لماذا تستكشف أفسس مع دليل محلي؟",
      seoParagraphs: [
        "<strong>أفسس</strong> واحدة من أفضل المدن القديمة حفظًا في العالم — حاضرة يونانية ثم رومانية سكنها ذات يوم ربع مليون إنسان. وأنت تمشي في شوارعها الرخامية، تمرّ بمعابد وحمّامات ونوافير ومبانٍ مدنية فخمة حيث كانت قائمة قبل ألفي عام تمامًا. لكن الأطلال صامتة بذاتها. فبلا سياق، العمود مجرّد عمود؛ ومع <strong>دليل سياحي عارف في أفسس</strong>، تتحوّل الحجارة نفسها إلى قصة أباطرة وتجّار وفلاسفة وقدّيسين صاغوا المتوسّط القديم.",
        "أيقونة الموقع بلا منازع هي <strong>مكتبة كلسوس</strong>، واجهة رومانية شامخة من القرن الثاني احتوت ذات يوم آلاف اللفائف. وعلى بُعد خطوات، اتّسع <strong>المسرح الكبير</strong> الشاسع لنحو 25000 متفرّج، وفيه — وفق التقليد — خطب القدّيس بولس في أهل أفسس. يشرح الدليل الهندسة والصوتيات والحياة اليومية التي ملأت هذه الأماكن — محوّلًا وقفة تصوير سريعة إلى فهم حقيقي لكيفية عمل المدينة.",
        "على بُعد دقائق من المدخل الرئيسي، قرب سلجوق، يقف ما تبقّى من <strong>معبد أرتميس</strong> — الذي كان ذات يوم إحدى <strong>عجائب الدنيا السبع في العالم القديم</strong>، واختُزل اليوم إلى عمود واحد مُعاد بناؤه، لكنه يبقى مؤثّرًا حين تُروى قصّته جيدًا. كثير من الجولات تصعد أيضًا إلى التلال نحو <strong>بيت السيدة مريم العذراء</strong>، موقع الحجّ الذي يبجّله المسيحيون والمسلمون على حدّ سواء، وتتوقّف عند <strong>بيوت المدرّجات</strong> المذهلة، حيث تبقى أرضيات الفسيفساء والجدران المرسومة لفيلات رومانية ثرية تحت مظلّات مكيّفة.",
        "تقع أفسس قرب بلدة <strong>سلجوق</strong> في محافظة <strong>إزمير</strong>، على ساحل بحر إيجة التركي وقرب كوشاداسي، ما يسهّل دمجها مع قرية شيرينجة الشهيرة بنبيذ الفاكهة. ولأن كثيرًا من أفسس تأويل — قراءة النقوش، وتخيّل الأسقف الزائلة، وفهم السياسة الرومانية — فإن دليلًا مرخّصًا ضليعًا في الآثار يصنع كل الفارق. كل دليل على VibeGuide مرخّص من وزارة الثقافة والسياحة التركية، ومُتحقَّق من هويته، ويُقيَّم بعد كل جولة، لتتجوّل عبر التاريخ مع من يعرفه حقًّا.",
      ],
      modesKicker: "كيف يعمل",
      modesHeading: "ثلاث طرق لاستكشاف أفسس",
      modes: [
        { tag: "VibeNow", color: C.now, title: "دليل محلي فورًا", text: "وصلت إلى أفسس بلا دليل؟ تواصل مع خبير محلي موثّق خلال دقائق واستفد من زيارتك إلى أقصى حدّ." },
        { tag: "VibeSquad", color: C.squad, title: "انضمّ إلى مجموعة صغيرة", text: "انضمّ إلى مسافرين آخرين في جولة سير مُرشَدة عبر أفسس — اقتصادية واجتماعية يقودها دليل عالِم آثار مرخّص." },
        { tag: "جولة خاصة", color: C.private, title: "يومك الخاص في أفسس", text: "تجربة خاصة ليوم كامل تشمل أفسس وبيوت المدرّجات ومعبد أرتميس وبيت السيدة مريم العذراء." },
      ],
      trustHeading: "كل دليل موثّق",
      trustText: "جميع أدلّاء VibeGuide في أفسس يحملون تراخيص رسمية من وزارة الثقافة التركية، ويجتازون التحقق من الهوية، ويُقيَّمون بعد كل جولة.",
      trustBadges: ["🪪 مرخّص من وزارة الثقافة", "✅ هوية موثّقة", "⭐ تقييم 4.9 وسطيًا", "🚫 سياسة عدم تسامح"],
      faqHeading: "الأسئلة الشائعة",
      faqs: [
        { q: "كم تبلغ تكلفة مرشد سياحي في أفسس؟", a: "تعتمد الأسعار على نوع الجولة ومدتها. مع VibeGuide ترى السعر الدقيق قبل الحجز — تبدأ معظم الجولات الخاصة لنصف يوم في أفسس من سعر ثابت للفرد، دون رسوم خفية. الجولات الجماعية (VibeSquad) هي الطريقة الأكثر اقتصادًا لاستكشاف المدينة القديمة." },
        { q: "هل مرشدو أفسس في VibeGuide مرخّصون؟", a: "نعم. يحمل كل مرشد في VibeGuide ترخيصًا رسميًا من وزارة الثقافة والسياحة التركية، ويجتاز التحقق من الهوية، ويُقيَّم بعد كل جولة. كما أن كثيرًا من مرشدي أفسس مدرَّبون في علم الآثار والتاريخ القديم. لدينا سياسة عدم تسامح مطلق تجاه الإرشاد غير المرخّص." },
        { q: "هل سأرى مكتبة سيلسوس في الجولة؟", a: "نعم. مكتبة سيلسوس هي القطعة المركزية الأيقونية في أفسس، وكل مسار مُرشَد يشملها. يشرح مرشدك عمارتها الرومانية من القرن الثاني، والتماثيل التي تمثّل الحكمة والفضيلة، وكيف ضمّت ذات يوم آلاف اللفائف." },
        { q: "هل يمكنني زيارة معبد أرتميس مع مرشد؟", a: "نعم. يقع معبد أرتميس — إحدى عجائب الدنيا السبع في العالم القديم — على بُعد دقائق فقط من الموقع الرئيسي قرب سلجوق. لم يبقَ قائمًا اليوم سوى عمود واحد، ويُحيي المرشد ضخامته وتاريخه بطريقة لا تستطيعها الأطلال وحدها." },
        { q: "هل بيت السيدة مريم العذراء مُدرَج؟", a: "يمكن أن يكون كذلك. بيت السيدة مريم العذراء، في التلال المطلّة على أفسس، موقع حج مقدّس لدى المسيحيين والمسلمين معًا. تجمع كثير من الجولات الخاصة وجولات اليوم الكامل بينه وبين أفسس ومعبد أرتميس — فقط أخبر مرشدك بأنك تودّ إدراجه." },
        { q: "أين تقع أفسس وهل يمكنني دمجها مع قرية شيرينجة؟", a: "تقع أفسس قرب بلدة سلجوق في محافظة إزمير، على ساحل بحر إيجة في تركيا، بالقرب من كوش أداسي. أما قرية شيرينجة الجبلية الساحرة، الشهيرة بنبيذ الفواكه والبيوت العثمانية، فتبعد مسافة قصيرة بالسيارة — وكثيرًا ما يدمج المرشدون بينهما في يوم واحد هادئ." },
      ],
      otherHeading: "استكشف المزيد من تركيا",
      otherCities: [
        { href: "/attractions/ar/ephesus", icon: "🏛️", name: "دليل السفر إلى أفسس", desc: "مكتبة كلسوس والمسرح الكبير والمزيد" },
        { href: "/ar/istanbul-tour-guide", icon: "🕌", name: "دليل سياحي في إسطنبول", desc: "آيا صوفيا والبازار الكبير والبوسفور" },
        { href: "/ar/cappadocia-tour-guide", icon: "🎈", name: "دليل كابادوكيا", desc: "مناطيد هوائية ومداخن الجنّيات وكنائس الكهوف" },
      ],
      ctaTitle: "مستعدّ لاستكشاف أفسس؟",
      ctaSub: "حمّل VibeGuide مجانًا. اعثر على دليل محلي خلال 60 ثانية.",
      ctaAvailability: "مجاني · بلا اشتراك · أفسس متاحة الآن",
    },
  },
};

export const CITY_GUIDES: CityGuide[] = [ISTANBUL, CAPPADOCIA, EPHESUS];

export function getCityGuide(slug: string): CityGuide | undefined {
  return CITY_GUIDES.find((c) => c.slug === slug);
}

// EN at root (/slug); other langs under /<lang>/slug.
function cityGuideUrl(slug: string, lang: CityGuideLang) {
  return lang === "en" ? `${SITE}/${slug}` : `${SITE}/${lang}/${slug}`;
}

// Canonical = self; hreflang links every language + x-default (en).
function buildCityGuideAlternates(slug: string, lang: CityGuideLang) {
  const languages: Record<string, string> = {};
  for (const l of CITY_GUIDE_LANGS) languages[l] = cityGuideUrl(slug, l);
  languages["x-default"] = cityGuideUrl(slug, "en");
  return { canonical: cityGuideUrl(slug, lang), languages };
}

export function buildCityGuideMetadata(
  guide: CityGuide,
  lang: CityGuideLang
): Metadata {
  const c = guide.i18n[lang];
  const url = cityGuideUrl(guide.slug, lang);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: buildCityGuideAlternates(guide.slug, lang),
    openGraph: {
      title: c.metaTitle,
      description: c.ogDescription,
      url,
      siteName: "VibeGuide",
      type: "website",
      locale: lang,
      images: [{ url: guide.heroImage, width: 1200, height: 630, alt: c.h1 }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.ogDescription,
      images: [guide.heroImage],
    },
  };
}

// All non-en params for the localized dynamic route's generateStaticParams.
export function allCityGuideParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const g of CITY_GUIDES) {
    for (const l of CITY_GUIDE_LANGS) {
      if (l === "en") continue; // en is served by the root static pages
      params.push({ lang: l, slug: g.slug });
    }
  }
  return params;
}
