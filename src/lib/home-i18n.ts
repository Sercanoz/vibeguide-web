import type { Locale } from "./i18n";

type Dict = {
  nav: { vibenow: string; vibesquad: string; private: string; destinations: string; guides: string; about: string; cta: string };
  hero: {
    live: string; coming: string;
    titleA: string; titleB: string; sub: string;
    b1: string; b2: string; b3: string;
    ctaPrimary: string; ctaSecondary: string;
  };
  phone: {
    greet: string; live: string;
    vibenowSub: string; vibenowText: string;
    squadSub: string; squadText: string;
    privateTitle: string; privateSub: string; privateText: string;
  };
  how: { eyebrow: string; title: string; s1Title: string; s1Text: string; s2Title: string; s2Text: string; s3Title: string; s3Text: string };
  modes: {
    vibenow: { title: string; text: string; cta: string; points: string[] };
    vibesquad: { title: string; text: string; cta: string; points: string[] };
    private: { title: string; text: string; cta: string; points: string[] };
  };
  dest: {
    eyebrow: string; title: string;
    istanbul: { title: string; text: string };
    cappadocia: { title: string; text: string };
    ephesus: { title: string; text: string };
  };
  why: { eyebrow: string; items: [string, string][] };
  cta: { titleA: string; titleB: string; appstore: string; googleplay: string };
  footer: { tagline: string; cols: [string, string[]][]; copyright: string };
};

const en: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Private Tours", destinations: "Destinations", guides: "For Guides", about: "About Us", cta: "Get the App" },
  hero: {
    live: "Now live in Istanbul",
    coming: "Cappadocia & Ephesus coming soon",
    titleA: "Not a tour.", titleB: "A real local experience.",
    sub: "Discover Istanbul, Old Istanbul, Cappadocia and Ephesus with verified local guides. Choose an instant guide, join a group experience or book a private tour in Turkey.",
    b1: "Verified local guides", b2: "Instant or planned", b3: "No tourist-trap feeling",
    ctaPrimary: "Find a Guide in Istanbul", ctaSecondary: "Explore Turkey Tours",
  },
  phone: {
    greet: "Good evening", live: "Live",
    vibenowSub: "Instant Guide", vibenowText: "Find a local guide near you and go.",
    squadSub: "Group Experience", squadText: "Travel together. Pay less.",
    privateTitle: "Private Tours", privateSub: "Planned Experience", privateText: "Your trip, your pace.",
  },
  how: {
    eyebrow: "How it works", title: "Three simple ways to explore better.",
    s1Title: "Choose your experience", s1Text: "Pick VibeNow for instant guide matching, VibeSquad for group travel or Private Tours for planned experiences.",
    s2Title: "Meet a local expert", s2Text: "Connect with guides who know the city, the culture, the history and the routes travelers actually want.",
    s3Title: "Explore without stress", s3Text: "Enjoy Istanbul tours, private walks and Turkey experiences without confusion, pressure or tourist traps.",
  },
  modes: {
    vibenow: { title: "Instant Guide", text: "Find a verified local guide near you for today's plans.", cta: "Find Now",
      points: ["Instant matching", "Perfect for today", "Museums, food walks, city routes & more"] },
    vibesquad: { title: "Group Experience", text: "Join other travelers, share the guide cost and explore Turkey together.", cta: "Create or Join",
      points: ["Shared guide cost", "Social travel experience", "Great for solo travelers, couples & friends"] },
    private: { title: "Planned Experience", text: "Reserve a private guide for your perfect day.", cta: "Reserve Now",
      points: ["Private walking tours", "Flexible language options", "Clear routes and expectations"] },
  },
  dest: {
    eyebrow: "Explore Turkey", title: "The places travelers search for most.",
    istanbul: { title: "Istanbul Tours", text: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus, Balat, Galata and Old Istanbul with local experts." },
    cappadocia: { title: "Cappadocia Tours", text: "Fairy chimneys, cave churches, valleys, sunrise viewpoints and hidden local stories with Cappadocia guides." },
    ephesus: { title: "Ephesus Tours", text: "Ancient streets, Roman theaters, temples and the Library of Celsus with licensed tourist guides." },
  },
  why: {
    eyebrow: "Why choose VibeGuide?",
    items: [
      ["Verified Local Guides", "Travel with trusted local experts who know Turkey inside out."],
      ["Your Language Matters", "Find guides in many languages for a comfortable and natural experience."],
      ["Curated City Routes", "Explore must-see places with real stories and hidden gems."],
      ["Transparent Experiences", "Instant tours, private tours or group experiences with clear details."],
      ["No Tourist Trap", "Designed for authentic moments and meaningful connections."],
      ["For Every Traveler", "Solo, couple, family, group or business — we've got you covered."],
    ],
  },
  cta: { titleA: "Your next city has a story.", titleB: "Meet the local who knows it.", appstore: "Download on the App Store", googleplay: "Get it on Google Play" },
  footer: {
    tagline: "Instant local guides, private tours, walking tours, group tours and authentic city experiences in Turkey.",
    cols: [
      ["Product", ["VibeNow", "VibeSquad", "Private Tours", "How It Works"]],
      ["Destinations", ["Istanbul Tours", "Cappadocia Tours", "Ephesus Tours", "Turkey Tours"]],
      ["Company", ["About Us", "For Guides", "Contact Us", "Blog"]],
      ["Support", ["Help Center", "Terms of Service", "Privacy Policy", "Cancellation Policy"]],
    ],
    copyright: "© 2026 VibeGuide. All rights reserved.",
  },
};

const tr: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Özel Turlar", destinations: "Destinasyonlar", guides: "Rehberler için", about: "Hakkımızda", cta: "Uygulamayı Al" },
  hero: {
    live: "İstanbul'da canlı",
    coming: "Kapadokya & Efes yakında",
    titleA: "Tur değil.", titleB: "Gerçek bir yerel deneyim.",
    sub: "İstanbul, Eski İstanbul, Kapadokya ve Efes'i doğrulanmış yerel rehberlerle keşfedin. Anlık rehber bulun, grup deneyimine katılın veya Türkiye'de özel tur ayırtın.",
    b1: "Doğrulanmış yerel rehberler", b2: "Anlık veya planlı", b3: "Turist tuzağı hissi yok",
    ctaPrimary: "İstanbul'da Rehber Bul", ctaSecondary: "Türkiye Turlarını Keşfet",
  },
  phone: {
    greet: "İyi akşamlar", live: "Canlı",
    vibenowSub: "Anlık Rehber", vibenowText: "Yakınınızdaki bir yerel rehberi bulun ve yola çıkın.",
    squadSub: "Grup Deneyimi", squadText: "Birlikte gezin. Daha az ödeyin.",
    privateTitle: "Özel Turlar", privateSub: "Planlı Deneyim", privateText: "Sizin programınız, sizin temponuz.",
  },
  how: {
    eyebrow: "Nasıl çalışır", title: "Şehri keşfetmenin üç basit yolu.",
    s1Title: "Deneyiminizi seçin", s1Text: "Anlık rehber için VibeNow, grup yolculuğu için VibeSquad veya planlı deneyim için Özel Turlar.",
    s2Title: "Yerel uzmanla tanışın", s2Text: "Şehri, kültürü, tarihi ve rotaları gerçekten bilen rehberlerle bağlantı kurun.",
    s3Title: "Stressiz keşfedin", s3Text: "İstanbul turlarını, özel yürüyüşleri ve Türkiye deneyimlerini kafanız karışmadan yaşayın.",
  },
  modes: {
    vibenow: { title: "Anlık Rehber", text: "Bugünkü planlarınız için yakınınızdaki doğrulanmış yerel rehberi bulun.", cta: "Şimdi Bul",
      points: ["Anlık eşleşme", "Bugün için ideal", "Müzeler, yemek turları, şehir rotaları & daha fazlası"] },
    vibesquad: { title: "Grup Deneyimi", text: "Diğer gezginlere katılın, rehber masrafını paylaşın ve Türkiye'yi birlikte keşfedin.", cta: "Oluştur veya Katıl",
      points: ["Paylaşılan rehber masrafı", "Sosyal seyahat deneyimi", "Solo, çift veya arkadaş grupları için harika"] },
    private: { title: "Planlı Deneyim", text: "Mükemmel gününüz için özel rehber ayırtın.", cta: "Rezervasyon",
      points: ["Özel yürüyüş turları", "Esnek dil seçenekleri", "Net rotalar ve beklentiler"] },
  },
  dest: {
    eyebrow: "Türkiye'yi Keşfet", title: "Gezginlerin en çok aradığı yerler.",
    istanbul: { title: "İstanbul Turları", text: "Ayasofya, Sultanahmet, Topkapı Sarayı, Kapalıçarşı, Boğaz, Balat, Galata ve Eski İstanbul'u yerel uzmanlarla gezin." },
    cappadocia: { title: "Kapadokya Turları", text: "Peri bacaları, kaya kiliseleri, vadiler, gün doğumu manzaraları ve gizli yerel hikayeler Kapadokya rehberleriyle." },
    ephesus: { title: "Efes Turları", text: "Antik sokaklar, Roma tiyatroları, tapınaklar ve Celsus Kütüphanesi ruhsatlı turist rehberleriyle." },
  },
  why: {
    eyebrow: "Neden VibeGuide?",
    items: [
      ["Doğrulanmış Yerel Rehberler", "Türkiye'yi iyi bilen güvenilir yerel uzmanlarla seyahat edin."],
      ["Dilinizin Önemi Var", "Rahat ve doğal bir deneyim için pek çok dilde rehber bulun."],
      ["Özenle Seçilmiş Rotalar", "Görülmesi gereken yerleri gerçek hikayeler ve gizli köşelerle keşfedin."],
      ["Şeffaf Deneyimler", "Anlık turlar, özel turlar veya grup deneyimleri — net detaylarla."],
      ["Turist Tuzağı Yok", "Otantik anlar ve anlamlı bağlantılar için tasarlandı."],
      ["Her Gezgine Uygun", "Solo, çift, aile, grup veya iş — hepsi için uygun."],
    ],
  },
  cta: { titleA: "Bir sonraki şehrinizin bir hikayesi var.", titleB: "Hikayeyi bilen yerelle tanışın.", appstore: "App Store'dan İndir", googleplay: "Google Play'den Al" },
  footer: {
    tagline: "Türkiye'de anlık yerel rehberler, özel turlar, yürüyüş turları, grup turları ve otantik şehir deneyimleri.",
    cols: [
      ["Ürün", ["VibeNow", "VibeSquad", "Özel Turlar", "Nasıl Çalışır"]],
      ["Destinasyonlar", ["İstanbul Turları", "Kapadokya Turları", "Efes Turları", "Türkiye Turları"]],
      ["Şirket", ["Hakkımızda", "Rehberler için", "İletişim", "Blog"]],
      ["Destek", ["Yardım Merkezi", "Kullanım Şartları", "Gizlilik Politikası", "İptal Politikası"]],
    ],
    copyright: "© 2026 VibeGuide. Tüm hakları saklıdır.",
  },
};

const de: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Private Touren", destinations: "Reiseziele", guides: "Für Guides", about: "Über uns", cta: "App holen" },
  hero: {
    live: "Jetzt live in Istanbul",
    coming: "Kappadokien & Ephesus bald",
    titleA: "Keine Tour.", titleB: "Ein echtes lokales Erlebnis.",
    sub: "Entdecken Sie Istanbul, Alt-Istanbul, Kappadokien und Ephesus mit verifizierten lokalen Guides. Wählen Sie einen Sofort-Guide, treten Sie einer Gruppe bei oder buchen Sie eine private Tour in der Türkei.",
    b1: "Verifizierte lokale Guides", b2: "Sofort oder geplant", b3: "Keine Touristenfallen",
    ctaPrimary: "Guide in Istanbul finden", ctaSecondary: "Türkei-Touren entdecken",
  },
  phone: {
    greet: "Guten Abend", live: "Live",
    vibenowSub: "Sofort-Guide", vibenowText: "Finden Sie einen lokalen Guide in Ihrer Nähe und los geht's.",
    squadSub: "Gruppenerlebnis", squadText: "Gemeinsam reisen. Weniger zahlen.",
    privateTitle: "Private Touren", privateSub: "Geplantes Erlebnis", privateText: "Ihre Reise, Ihr Tempo.",
  },
  how: {
    eyebrow: "So funktioniert's", title: "Drei einfache Wege, besser zu entdecken.",
    s1Title: "Wählen Sie Ihr Erlebnis", s1Text: "VibeNow für Sofort-Matching, VibeSquad für Gruppenreisen oder Private Touren für geplante Erlebnisse.",
    s2Title: "Treffen Sie einen lokalen Experten", s2Text: "Verbinden Sie sich mit Guides, die Stadt, Kultur, Geschichte und die wirklich interessanten Routen kennen.",
    s3Title: "Stressfrei entdecken", s3Text: "Genießen Sie Istanbul-Touren, private Spaziergänge und Türkei-Erlebnisse ohne Verwirrung oder Touristenfallen.",
  },
  modes: {
    vibenow: { title: "Sofort-Guide", text: "Finden Sie einen verifizierten lokalen Guide in Ihrer Nähe für die Pläne von heute.", cta: "Jetzt finden",
      points: ["Sofortiges Matching", "Perfekt für heute", "Museen, Food Walks, Stadtrouten & mehr"] },
    vibesquad: { title: "Gruppenerlebnis", text: "Schließen Sie sich anderen Reisenden an, teilen Sie die Guide-Kosten und entdecken Sie die Türkei zusammen.", cta: "Erstellen oder beitreten",
      points: ["Geteilte Guide-Kosten", "Soziales Reiseerlebnis", "Ideal für Solo-Reisende, Paare & Freunde"] },
    private: { title: "Geplantes Erlebnis", text: "Reservieren Sie einen privaten Guide für Ihren perfekten Tag.", cta: "Jetzt reservieren",
      points: ["Private Wandertouren", "Flexible Sprachoptionen", "Klare Routen und Erwartungen"] },
  },
  dest: {
    eyebrow: "Türkei entdecken", title: "Die meistgesuchten Orte für Reisende.",
    istanbul: { title: "Istanbul-Touren", text: "Hagia Sophia, Blaue Moschee, Topkapı-Palast, Großer Basar, Bosporus, Balat, Galata und Alt-Istanbul mit lokalen Experten." },
    cappadocia: { title: "Kappadokien-Touren", text: "Feenkamine, Höhlenkirchen, Täler, Sonnenaufgangspunkte und versteckte lokale Geschichten mit Kappadokien-Guides." },
    ephesus: { title: "Ephesus-Touren", text: "Antike Straßen, römische Theater, Tempel und die Celsus-Bibliothek mit lizenzierten Touristenführern." },
  },
  why: {
    eyebrow: "Warum VibeGuide?",
    items: [
      ["Verifizierte lokale Guides", "Reisen Sie mit vertrauenswürdigen lokalen Experten, die die Türkei in- und auswendig kennen."],
      ["Ihre Sprache zählt", "Finden Sie Guides in vielen Sprachen für ein angenehmes und natürliches Erlebnis."],
      ["Kuratierte Stadtrouten", "Erkunden Sie Sehenswürdigkeiten mit echten Geschichten und versteckten Schätzen."],
      ["Transparente Erlebnisse", "Sofort-Touren, Privattouren oder Gruppenerlebnisse — mit klaren Details."],
      ["Keine Touristenfalle", "Konzipiert für authentische Momente und bedeutungsvolle Verbindungen."],
      ["Für jeden Reisenden", "Solo, Paar, Familie, Gruppe oder Geschäft — für alle geeignet."],
    ],
  },
  cta: { titleA: "Ihre nächste Stadt hat eine Geschichte.", titleB: "Treffen Sie die Einheimische, die sie kennt.", appstore: "Im App Store laden", googleplay: "Bei Google Play holen" },
  footer: {
    tagline: "Sofortige lokale Guides, private Touren, Wandertouren, Gruppentouren und authentische Stadterlebnisse in der Türkei.",
    cols: [
      ["Produkt", ["VibeNow", "VibeSquad", "Private Touren", "So funktioniert's"]],
      ["Reiseziele", ["Istanbul-Touren", "Kappadokien-Touren", "Ephesus-Touren", "Türkei-Touren"]],
      ["Unternehmen", ["Über uns", "Für Guides", "Kontakt", "Blog"]],
      ["Support", ["Hilfe", "Nutzungsbedingungen", "Datenschutz", "Stornierung"]],
    ],
    copyright: "© 2026 VibeGuide. Alle Rechte vorbehalten.",
  },
};

const ru: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Частные туры", destinations: "Направления", guides: "Для гидов", about: "О нас", cta: "Скачать приложение" },
  hero: {
    live: "Уже в Стамбуле",
    coming: "Каппадокия и Эфес скоро",
    titleA: "Не тур.", titleB: "Настоящий местный опыт.",
    sub: "Откройте Стамбул, Старый Стамбул, Каппадокию и Эфес с проверенными местными гидами. Найдите гида мгновенно, присоединитесь к группе или закажите частный тур в Турции.",
    b1: "Проверенные местные гиды", b2: "Мгновенно или по плану", b3: "Никаких туристических ловушек",
    ctaPrimary: "Найти гида в Стамбуле", ctaSecondary: "Туры по Турции",
  },
  phone: {
    greet: "Добрый вечер", live: "В сети",
    vibenowSub: "Мгновенный гид", vibenowText: "Найдите местного гида рядом и отправляйтесь.",
    squadSub: "Групповой опыт", squadText: "Путешествуйте вместе. Платите меньше.",
    privateTitle: "Частные туры", privateSub: "Запланированный опыт", privateText: "Ваше путешествие, ваш темп.",
  },
  how: {
    eyebrow: "Как это работает", title: "Три простых способа исследовать лучше.",
    s1Title: "Выберите свой опыт", s1Text: "VibeNow для мгновенного подбора, VibeSquad для группы или Частные туры для запланированного опыта.",
    s2Title: "Встретьте местного эксперта", s2Text: "Свяжитесь с гидами, которые знают город, культуру, историю и настоящие маршруты.",
    s3Title: "Исследуйте без стресса", s3Text: "Наслаждайтесь Стамбулом, частными прогулками и Турцией без путаницы и ловушек.",
  },
  modes: {
    vibenow: { title: "Мгновенный гид", text: "Найдите проверенного местного гида рядом для планов на сегодня.", cta: "Найти сейчас",
      points: ["Мгновенный подбор", "Идеально на сегодня", "Музеи, гастротуры, маршруты и многое другое"] },
    vibesquad: { title: "Групповой опыт", text: "Присоединяйтесь к другим путешественникам, делите расходы на гида и исследуйте Турцию вместе.", cta: "Создать или присоединиться",
      points: ["Общие расходы на гида", "Социальный опыт путешествий", "Идеально для соло, пар и друзей"] },
    private: { title: "Запланированный опыт", text: "Закажите частного гида для идеального дня.", cta: "Забронировать",
      points: ["Частные пешие туры", "Гибкий выбор языка", "Чёткие маршруты и ожидания"] },
  },
  dest: {
    eyebrow: "Исследовать Турцию", title: "Места, которые ищут путешественники.",
    istanbul: { title: "Туры по Стамбулу", text: "Айя-София, Голубая мечеть, дворец Топкапы, Гранд-базар, Босфор, Балат, Галата и Старый Стамбул с местными экспертами." },
    cappadocia: { title: "Туры по Каппадокии", text: "Дымоходы фей, пещерные церкви, долины, точки рассвета и местные истории с гидами Каппадокии." },
    ephesus: { title: "Туры по Эфесу", text: "Древние улицы, римские театры, храмы и Библиотека Цельса с лицензированными гидами." },
  },
  why: {
    eyebrow: "Почему VibeGuide?",
    items: [
      ["Проверенные местные гиды", "Путешествуйте с доверенными экспертами, которые знают Турцию."],
      ["Ваш язык важен", "Гиды на многих языках для комфортного и естественного опыта."],
      ["Тщательно отобранные маршруты", "Изучите главные места с настоящими историями и секретами."],
      ["Прозрачные впечатления", "Мгновенные, частные или групповые туры — с чёткими деталями."],
      ["Без туристических ловушек", "Создано для подлинных моментов и значимых связей."],
      ["Для каждого путешественника", "Соло, пара, семья, группа или бизнес — для всех."],
    ],
  },
  cta: { titleA: "У вашего следующего города есть история.", titleB: "Познакомьтесь с местным, который её знает.", appstore: "Скачать в App Store", googleplay: "Доступно в Google Play" },
  footer: {
    tagline: "Мгновенные местные гиды, частные туры, пешие туры, групповые туры и аутентичный городской опыт в Турции.",
    cols: [
      ["Продукт", ["VibeNow", "VibeSquad", "Частные туры", "Как это работает"]],
      ["Направления", ["Туры по Стамбулу", "Туры по Каппадокии", "Туры по Эфесу", "Туры по Турции"]],
      ["Компания", ["О нас", "Для гидов", "Контакты", "Блог"]],
      ["Поддержка", ["Помощь", "Условия использования", "Конфиденциальность", "Отмена"]],
    ],
    copyright: "© 2026 VibeGuide. Все права защищены.",
  },
};

// Diğer locale'ler EN'e fallback yapar
export const homeTranslations: Record<Locale, Dict> = {
  en, tr, de, ru,
  fr: en, hr: en, ro: en, zh: en, es: en, ko: en, el: en,
};
