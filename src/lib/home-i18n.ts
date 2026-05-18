import type { Locale } from "./i18n";

type Dict = {
  nav: { vibenow: string; vibesquad: string; private: string; destinations: string; guides: string; cta: string };
  hero: {
    badge: string;
    titleA: string; titleAccent: string;
    sub: string;
    b1: string; b2: string; b3: string;
    ctaPrimary: string; ctaSecondary: string;
  };
  phone: { live: string; greet: string };
  phoneCards: {
    vibenow: string;
    vibesquad: string;
    private: string;
  };
  energy: {
    eyebrow: string; titleA: string; titleB: string; sub: string;
    s1: string; s2: string; s3: string; s4: string;
  };
  modesIntro: { eyebrow: string; title: string; sub: string };
  modes: {
    vibenow: { tag: string; title: string; text: string; points: string[]; cta: string };
    vibesquad: { tag: string; title: string; text: string; points: string[]; cta: string };
    private: { tag: string; title: string; text: string; points: string[]; cta: string };
  };
  manifesto: { eyebrow: string; titleA: string; titleB: string; sub: string };
  vibe: { title: string; sub: string; items: string[] };
  explore: { title: string; sub: string;
    istanbul: { title: string; text: string };
    cappadocia: { title: string; text: string };
    ephesus: { title: string; text: string };
  };
  trust: { title: string; items: { title: string; text: string }[]; cta: string };
  testimonials: { eyebrow: string; title: string; sub: string; quotes: { quote: string; name: string }[] };
  download: { title: string; sub: string };
  footer: { tagline: string; product: string; destinations: string; support: string; copyright: string };
};

const en: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Private Tours", destinations: "Destinations", guides: "For Guides", cta: "Get the App" },
  hero: {
    badge: "◆ Now live in Istanbul + Cappadocia & Ephesus coming soon",
    titleA: "Don't just visit Istanbul.", titleAccent: "Enter it.",
    sub: "Forget the audio guides and crowded buses. VibeGuide drops you next to a verified local who actually lives the city — in 60 seconds with VibeNow, with travelers like you through VibeSquad, or as a polished day out with a Private Tour. One app. Three ways. Zero tourist traps.",
    b1: "Licensed local guides", b2: "Instant or planned", b3: "Real local connection",
    ctaPrimary: "Find a Guide in Istanbul", ctaSecondary: "Explore Turkey Tours",
  },
  phone: { live: "Live", greet: "Good evening" },
  phoneCards: {
    vibenow: "Tap. Match. Walk out the door in 60 seconds.",
    vibesquad: "Join travelers heading the same way. Split the price.",
    private: "Hand-pick your guide. Plan the perfect day.",
  },
  energy: {
    eyebrow: "Live City Energy",
    titleA: "Istanbul never stops.", titleB: "Catch it while it's alive.",
    sub: "Real-time pulse from the streets. While you read this, travelers and guides are matching, walking and discovering.",
    s1: "Travelers exploring Sultanahmet",
    s2: "VibeSquads forming daily",
    s3: "Sunset Bosphorus routes trending",
    s4: "Old City guides ready to meet",
  },
  modesIntro: {
    eyebrow: "Three ways. One promise.",
    title: "Pick how you want to meet your city.",
    sub: "Last-minute and curious? Social and budget-aware? Or planning the day of your life? VibeGuide has a mode for every traveler — built around real local guides, not scripts.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · INSTANT", title: "Tap. Match. Go.",
      text: "Open the app and a verified local is on the way in under a minute. Perfect when you've just landed, just woke up, or just decided \"let's do something today.\"",
      points: ["⚡ 60-second matching", "📍 Real guides near you, right now", "🏛️ Museums, food walks, hidden streets"],
      cta: "Find Now" },
    vibesquad: { tag: "VIBESQUAD · SOCIAL", title: "Travel together. Pay less.",
      text: "Start a squad or jump into one. As more travelers join the same route, the price per person drops. Same guide, same city, half the cost, ten times the stories.",
      points: ["💸 Smarter group pricing", "🌍 Meet travelers from everywhere", "🤝 Solo? Couple? Best with friends"],
      cta: "Create or Join" },
    private: { tag: "PRIVATE TOURS · PLANNED", title: "Your day, perfectly tailored.",
      text: "Pick your guide, your language, your pace. Licensed tourist guides craft a route just for you — Hagia Sophia at sunrise, Bosphorus by boat, food crawl by night. You decide, they deliver.",
      points: ["🎓 Licensed tourist guides", "🗣️ 9+ language options", "🗺️ Custom routes, zero surprises"],
      cta: "Reserve Now" },
  },
  manifesto: {
    eyebrow: "Why VibeGuide Exists",
    titleA: "Tourism became too robotic.", titleB: "We're making it human again.",
    sub: "Bus tours read the same script in every city. QR codes replaced real conversations. Travelers spend more time queuing than discovering. VibeGuide flips it. One tap, one local, one real day. Whether you go solo with VibeNow, join a squad with VibeSquad, or plan it all with Private Tours — there's always a real human on the other side. No scripts. No traps. Just the city, told by someone who lives it.",
  },
  vibe: {
    title: "Explore by vibe",
    sub: "Choose the feeling — we'll match the place and the guide.",
    items: ["History", "Food & Drink", "Nightlife", "Bosphorus", "Hidden Cafés", "Local Markets", "Photo Spots", "Cultural Gems"],
  },
  explore: {
    title: "Explore Turkey", sub: "The places travelers search for most.",
    istanbul: { title: "Istanbul Tours", text: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus, Balat, Galata and Old Istanbul with local experts." },
    cappadocia: { title: "Cappadocia Tours", text: "Fairy chimneys, cave churches, valleys, sunrise viewpoints and hidden local stories with Cappadocia guides." },
    ephesus: { title: "Ephesus Tours", text: "Ancient streets, Roman theaters, temples and the Library of Celsus with licensed tourist guides." },
  },
  trust: {
    title: "Trust & Safety",
    items: [
      { title: "Licensed Tourist Guides", text: "Travel with professionals who know Turkey's culture, history and local rules." },
      { title: "Verified Local Experts", text: "Profiles are reviewed so travelers can feel safe before meeting their guide." },
      { title: "Clear Experience Details", text: "Know the route, duration, language, meeting point and expectations." },
      { title: "No Tourist Trap Feeling", text: "Designed for authentic moments, local stories and real connections." },
    ],
    cta: "See all safety standards →",
  },
  testimonials: {
    eyebrow: "Traveler feeling",
    title: "The city feels different with the right guide.",
    sub: "Loved by travelers around the world.",
    quotes: [
      { quote: "It felt less like a tour and more like discovering Istanbul with a local friend.", name: "— Sarah, USA" },
      { quote: "Perfect for a last-minute plan. We found a guide and explored without stress.", name: "— Marco, Italy" },
      { quote: "VibeSquad made the experience social, affordable and way more fun.", name: "— Lina, Germany" },
    ],
  },
  download: {
    title: "Download VibeGuide",
    sub: "Instant local guides, private tours, walking tours, group experiences and authentic city discovery in Turkey.",
  },
  footer: {
    tagline: "Instant local guides, private tours, walking tours, group tours and authentic city experiences in Turkey.",
    product: "Product", destinations: "Destinations", support: "Support",
    copyright: "© 2026 VibeGuide. All rights reserved.",
  },
};

const tr: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Özel Turlar", destinations: "Destinasyonlar", guides: "Rehberler için", cta: "Uygulamayı İndir" },
  hero: {
    badge: "◆ İstanbul'da canlı + Kapadokya & Efes yakında",
    titleA: "İstanbul'u sadece gezme.", titleAccent: "İçine gir.",
    sub: "Sesli rehberleri ve kalabalık otobüsleri unut. VibeGuide seni şehri gerçekten yaşayan doğrulanmış bir yerelin yanına bırakır — VibeNow ile 60 saniyede, VibeSquad ile senin gibi gezginlerle birlikte ya da Özel Tur olarak özenle planlanmış bir günle. Tek uygulama. Üç yol. Sıfır turist tuzağı.",
    b1: "Ruhsatlı yerel rehberler", b2: "Anlık ya da planlı", b3: "Gerçek yerel bağ",
    ctaPrimary: "İstanbul'da Rehber Bul", ctaSecondary: "Türkiye Turlarını Keşfet",
  },
  phone: { live: "Canlı", greet: "İyi akşamlar" },
  phoneCards: {
    vibenow: "Dokun. Eşleş. 60 saniyede kapıdan çık.",
    vibesquad: "Aynı yere giden gezginlere katıl. Ücreti paylaş.",
    private: "Rehberini sen seç. Mükemmel günü planla.",
  },
  energy: {
    eyebrow: "Canlı Şehir Enerjisi",
    titleA: "İstanbul hiç durmaz.", titleB: "Canlıyken yakala.",
    sub: "Sokaklardan gerçek zamanlı nabız. Sen bunu okurken gezginler ve rehberler eşleşiyor, yürüyor, keşfediyor.",
    s1: "Sultanahmet'i keşfeden gezgin",
    s2: "Her gün oluşan VibeSquad",
    s3: "Trend olan Boğaz gün batımı rotası",
    s4: "Tanışmaya hazır Eski Şehir rehberi",
  },
  modesIntro: {
    eyebrow: "Üç yol. Tek söz.",
    title: "Şehrinle nasıl tanışmak istediğine sen karar ver.",
    sub: "Son dakikacı ve meraklı mısın? Sosyal ve bütçeli mi? Yoksa hayatının gününü mü planlıyorsun? VibeGuide her gezgin için bir mod sunar — senaryolar değil, gerçek yerel rehberler üzerine kurulu.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · ANLIK", title: "Dokun. Eşleş. Çık.",
      text: "Uygulamayı aç, doğrulanmış bir yerel bir dakikadan kısa sürede yolda. Az önce indin, az önce uyandın ya da \"bugün bir şey yapalım\" dedin — VibeNow tam o an için.",
      points: ["⚡ 60 saniyede eşleşme", "📍 Tam şu an yanındaki gerçek rehberler", "🏛️ Müzeler, yemek turları, gizli sokaklar"],
      cta: "Hemen Bul" },
    vibesquad: { tag: "VIBESQUAD · SOSYAL", title: "Birlikte gez. Daha az öde.",
      text: "Bir grup başlat ya da varolan birine atla. Aynı rotaya katılan her yeni gezginle kişi başı fiyat düşer. Aynı rehber, aynı şehir, yarı fiyat, on kat hikaye.",
      points: ["💸 Akıllı grup fiyatlandırması", "🌍 Her yerden gezginlerle tanış", "🤝 Solo? Çift? Arkadaşlar arası en iyi"],
      cta: "Kur veya Katıl" },
    private: { tag: "ÖZEL TURLAR · PLANLI", title: "Günün, tam sana göre.",
      text: "Rehberini, dilini, hızını sen seç. Ruhsatlı turist rehberleri sana özel bir rota hazırlar — gün doğumunda Ayasofya, tekneyle Boğaz, gecede yemek turu. Sen söyle, onlar yapsın.",
      points: ["🎓 Ruhsatlı turist rehberleri", "🗣️ 9+ dil seçeneği", "🗺️ Özel rotalar, sıfır sürpriz"],
      cta: "Rezervasyon Yap" },
  },
  manifesto: {
    eyebrow: "VibeGuide Neden Var",
    titleA: "Turizm fazla robotlaştı.", titleB: "Biz tekrar insanlaştırıyoruz.",
    sub: "Otobüs turları her şehirde aynı senaryoyu okuyor. QR kodlar gerçek sohbetin yerini aldı. Gezginler keşfetmekten çok sıra bekliyor. VibeGuide bunu tersine çevirir. Bir dokunuş, bir yerel, bir gerçek gün. VibeNow ile yalnız, VibeSquad ile grupla ya da Özel Turlar ile planlı — diğer tarafta hep gerçek bir insan var. Senaryo yok. Tuzak yok. Sadece şehir, onu yaşayan birinin ağzından.",
  },
  vibe: {
    title: "Hisse göre keşfet",
    sub: "Sen hissi seç — biz mekânı ve rehberi eşleştirelim.",
    items: ["Tarih", "Yiyecek & İçecek", "Gece Hayatı", "Boğaz", "Gizli Kafeler", "Yerel Pazarlar", "Fotoğraf Yerleri", "Kültürel Mücevherler"],
  },
  explore: {
    title: "Türkiye'yi Keşfet", sub: "Gezginlerin en çok aradığı yerler.",
    istanbul: { title: "İstanbul Turları", text: "Ayasofya, Sultanahmet Camii, Topkapı Sarayı, Kapalıçarşı, Boğaz, Balat, Galata ve Eski İstanbul'u yerel uzmanlarla gezin." },
    cappadocia: { title: "Kapadokya Turları", text: "Peri bacaları, kaya kiliseleri, vadiler, gün doğumu manzaraları ve gizli yerel hikayeler Kapadokya rehberleriyle." },
    ephesus: { title: "Efes Turları", text: "Antik sokaklar, Roma tiyatroları, tapınaklar ve Celsus Kütüphanesi ruhsatlı turist rehberleriyle." },
  },
  trust: {
    title: "Güven & Güvenlik",
    items: [
      { title: "Ruhsatlı Turist Rehberleri", text: "Türkiye'nin kültürünü, tarihini ve yerel kurallarını bilen profesyonellerle seyahat et." },
      { title: "Doğrulanmış Yerel Uzmanlar", text: "Profiller incelenir, böylece rehberinle tanışmadan kendini güvende hissedersin." },
      { title: "Net Deneyim Detayları", text: "Rota, süre, dil, buluşma noktası ve beklentilerin önceden net." },
      { title: "Turist Tuzağı Yok", text: "Otantik anlar, yerel hikayeler ve gerçek bağlantılar için tasarlandı." },
    ],
    cta: "Tüm güvenlik standartlarını gör →",
  },
  testimonials: {
    eyebrow: "Gezgin hissi",
    title: "Şehir doğru rehberle bambaşka hissettirir.",
    sub: "Dünyanın dört bir yanından gezginler tarafından sevildi.",
    quotes: [
      { quote: "Tur gibi değil, yerel bir arkadaşla İstanbul'u keşfetmek gibiydi.", name: "— Sarah, ABD" },
      { quote: "Son dakika planı için mükemmel. Rehber bulduk ve stressiz gezdik.", name: "— Marco, İtalya" },
      { quote: "VibeSquad deneyimi sosyal, uygun fiyatlı ve çok daha eğlenceli yaptı.", name: "— Lina, Almanya" },
    ],
  },
  download: {
    title: "VibeGuide'ı İndir",
    sub: "Türkiye'de anlık yerel rehberler, özel turlar, yürüyüş turları, grup deneyimleri ve otantik şehir keşfi.",
  },
  footer: {
    tagline: "Türkiye'de anlık yerel rehberler, özel turlar, yürüyüş turları, grup turları ve otantik şehir deneyimleri.",
    product: "Ürün", destinations: "Destinasyonlar", support: "Destek",
    copyright: "© 2026 VibeGuide. Tüm hakları saklıdır.",
  },
};

const de: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Private Touren", destinations: "Reiseziele", guides: "Für Guides", cta: "App holen" },
  hero: {
    badge: "◆ Jetzt live in Istanbul + Kappadokien & Ephesus bald",
    titleA: "Istanbul nicht nur besuchen.", titleAccent: "Hineingehen.",
    sub: "Vergiss Audioguides und überfüllte Busse. VibeGuide bringt dich an die Seite eines verifizierten Einheimischen, der die Stadt wirklich lebt — in 60 Sekunden mit VibeNow, mit gleichgesinnten Reisenden über VibeSquad oder als perfekt geplanter Tag mit einer Privattour. Eine App. Drei Wege. Null Touristenfallen.",
    b1: "Lizenzierte lokale Guides", b2: "Sofort oder geplant", b3: "Echte lokale Verbindung",
    ctaPrimary: "Guide in Istanbul finden", ctaSecondary: "Türkei-Touren entdecken",
  },
  phone: { live: "Live", greet: "Guten Abend" },
  phoneCards: {
    vibenow: "Tippen. Matchen. In 60 Sekunden raus.",
    vibesquad: "Triff Reisende mit demselben Ziel. Teilt euch den Preis.",
    private: "Wähle deinen Guide. Plane den perfekten Tag.",
  },
  energy: {
    eyebrow: "Live City Energy",
    titleA: "Istanbul ruht nie.", titleB: "Erlebe es, solange es lebt.",
    sub: "Echtzeit-Puls von den Straßen. Während du das liest, matchen Reisende und Guides, laufen und entdecken.",
    s1: "Reisende entdecken Sultanahmet",
    s2: "Täglich neue VibeSquads",
    s3: "Bosporus-Sonnenuntergänge im Trend",
    s4: "Old City Guides bereit zum Treffen",
  },
  modesIntro: {
    eyebrow: "Drei Wege. Ein Versprechen.",
    title: "Wähle, wie du deine Stadt kennenlernst.",
    sub: "Spontan und neugierig? Sozial und budgetbewusst? Oder planst du den Tag deines Lebens? VibeGuide hat einen Modus für jeden Reisenden — gebaut auf echten lokalen Guides, nicht auf Skripten.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · SOFORT", title: "Tippen. Matchen. Los.",
      text: "App öffnen — ein verifizierter Einheimischer ist in unter einer Minute unterwegs. Perfekt, wenn du gerade gelandet bist, gerade aufgewacht bist oder einfach beschlossen hast: \"Lass uns heute was machen.\"",
      points: ["⚡ 60-Sekunden-Matching", "📍 Echte Guides in deiner Nähe, jetzt", "🏛️ Museen, Food Walks, versteckte Gassen"],
      cta: "Jetzt finden" },
    vibesquad: { tag: "VIBESQUAD · SOZIAL", title: "Zusammen reisen. Weniger zahlen.",
      text: "Starte einen Squad oder steig in einen ein. Je mehr Reisende dieselbe Route teilen, desto niedriger der Preis pro Person. Gleicher Guide, gleiche Stadt, halber Preis, zehnfache Geschichten.",
      points: ["💸 Smarte Gruppenpreise", "🌍 Reisende aus aller Welt", "🤝 Solo? Paar? Am besten mit Freunden"],
      cta: "Erstellen oder beitreten" },
    private: { tag: "PRIVATE TOUREN · GEPLANT", title: "Dein Tag, perfekt zugeschnitten.",
      text: "Wähle deinen Guide, deine Sprache, dein Tempo. Lizenzierte Guides erstellen eine Route nur für dich — Hagia Sophia bei Sonnenaufgang, Bosporus per Boot, Food Crawl bei Nacht. Du sagst, sie liefern.",
      points: ["🎓 Lizenzierte Touristenführer", "🗣️ 9+ Sprachoptionen", "🗺️ Maßgeschneiderte Routen, null Überraschungen"],
      cta: "Jetzt reservieren" },
  },
  manifesto: {
    eyebrow: "Warum VibeGuide existiert",
    titleA: "Tourismus wurde zu robotisch.", titleB: "Wir machen ihn wieder menschlich.",
    sub: "Bustouren lesen in jeder Stadt dasselbe Skript. QR-Codes ersetzten echte Gespräche. Reisende warten mehr, als sie entdecken. VibeGuide dreht das um. Ein Tipp, ein Einheimischer, ein echter Tag. Egal ob solo mit VibeNow, in der Gruppe mit VibeSquad oder geplant mit Private Tours — auf der anderen Seite ist immer ein echter Mensch. Keine Skripte. Keine Fallen. Nur die Stadt, erzählt von jemandem, der sie lebt.",
  },
  vibe: {
    title: "Nach Vibe entdecken",
    sub: "Wähle das Gefühl — wir bringen Ort und Guide.",
    items: ["Geschichte", "Essen & Trinken", "Nachtleben", "Bosporus", "Versteckte Cafés", "Lokale Märkte", "Foto-Spots", "Kulturschätze"],
  },
  explore: {
    title: "Türkei entdecken", sub: "Die meistgesuchten Orte für Reisende.",
    istanbul: { title: "Istanbul-Touren", text: "Hagia Sophia, Blaue Moschee, Topkapı-Palast, Großer Basar, Bosporus, Balat, Galata und Alt-Istanbul mit lokalen Experten." },
    cappadocia: { title: "Kappadokien-Touren", text: "Feenkamine, Höhlenkirchen, Täler, Sonnenaufgangspunkte und versteckte lokale Geschichten mit Kappadokien-Guides." },
    ephesus: { title: "Ephesus-Touren", text: "Antike Straßen, römische Theater, Tempel und die Celsus-Bibliothek mit lizenzierten Touristenführern." },
  },
  trust: {
    title: "Vertrauen & Sicherheit",
    items: [
      { title: "Lizenzierte Touristenführer", text: "Reise mit Profis, die Türkeis Kultur, Geschichte und lokale Regeln kennen." },
      { title: "Verifizierte lokale Experten", text: "Profile werden geprüft, damit Reisende sich vor dem Treffen sicher fühlen." },
      { title: "Klare Erlebnisdetails", text: "Kenne Route, Dauer, Sprache, Treffpunkt und Erwartungen im Voraus." },
      { title: "Keine Touristenfalle", text: "Entworfen für authentische Momente, lokale Geschichten und echte Verbindungen." },
    ],
    cta: "Alle Sicherheitsstandards ansehen →",
  },
  testimonials: {
    eyebrow: "Reisegefühl",
    title: "Die Stadt fühlt sich anders an mit dem richtigen Guide.",
    sub: "Geliebt von Reisenden weltweit.",
    quotes: [
      { quote: "Es fühlte sich weniger wie eine Tour an und mehr wie Istanbul mit einem Einheimischen entdecken.", name: "— Sarah, USA" },
      { quote: "Perfekt für spontane Pläne. Wir fanden einen Guide und entdeckten stressfrei.", name: "— Marco, Italien" },
      { quote: "VibeSquad machte es sozial, bezahlbar und viel lustiger.", name: "— Lina, Deutschland" },
    ],
  },
  download: {
    title: "VibeGuide herunterladen",
    sub: "Sofortige lokale Guides, private Touren, Wandertouren, Gruppenerlebnisse und authentische Stadterkundung in der Türkei.",
  },
  footer: {
    tagline: "Sofortige lokale Guides, private Touren, Wandertouren, Gruppentouren und authentische Stadterlebnisse in der Türkei.",
    product: "Produkt", destinations: "Reiseziele", support: "Support",
    copyright: "© 2026 VibeGuide. Alle Rechte vorbehalten.",
  },
};

const ru: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Частные туры", destinations: "Направления", guides: "Для гидов", cta: "Скачать приложение" },
  hero: {
    badge: "◆ Уже в Стамбуле + Каппадокия и Эфес скоро",
    titleA: "Не просто посетите Стамбул.", titleAccent: "Войдите в него.",
    sub: "Забудьте про аудиогиды и переполненные автобусы. VibeGuide ставит вас рядом с проверенным местным, который действительно живёт городом — за 60 секунд через VibeNow, с такими же путешественниками через VibeSquad или как идеально спланированный день с Частным туром. Одно приложение. Три пути. Ноль туристических ловушек.",
    b1: "Лицензированные местные гиды", b2: "Мгновенно или по плану", b3: "Настоящая местная связь",
    ctaPrimary: "Найти гида в Стамбуле", ctaSecondary: "Туры по Турции",
  },
  phone: { live: "В сети", greet: "Добрый вечер" },
  phoneCards: {
    vibenow: "Тап. Матч. Через 60 секунд вы на улице.",
    vibesquad: "Присоединитесь к путешественникам с тем же маршрутом. Поделите цену.",
    private: "Сами выбирайте гида. Спланируйте идеальный день.",
  },
  energy: {
    eyebrow: "Живая энергия города",
    titleA: "Стамбул не останавливается.", titleB: "Ловите его, пока он жив.",
    sub: "Реальный пульс улиц. Пока вы это читаете, путешественники и гиды соединяются, идут и открывают новое.",
    s1: "Путешественников исследуют Султанахмет",
    s2: "VibeSquad'а формируется ежедневно",
    s3: "Маршрутов закатного Босфора в тренде",
    s4: "Гидов Старого города готовы к встрече",
  },
  modesIntro: {
    eyebrow: "Три пути. Одно обещание.",
    title: "Выберите, как познакомиться с городом.",
    sub: "Спонтанно и с любопытством? Социально и с учётом бюджета? Или планируете день мечты? VibeGuide подходит каждому — на основе настоящих местных гидов, а не сценариев.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · МГНОВЕННО", title: "Тап. Матч. Вперёд.",
      text: "Откройте приложение — проверенный местный уже в пути меньше чем за минуту. Идеально, когда вы только приземлились, только проснулись или решили: \"давайте сделаем что-то сегодня\".",
      points: ["⚡ Подбор за 60 секунд", "📍 Реальные гиды рядом, прямо сейчас", "🏛️ Музеи, гастротуры, скрытые улицы"],
      cta: "Найти сейчас" },
    vibesquad: { tag: "VIBESQUAD · СОЦИАЛЬНО", title: "Путешествуйте вместе. Платите меньше.",
      text: "Создайте отряд или присоединяйтесь. Чем больше людей на маршруте, тем ниже цена. Тот же гид, тот же город, половина цены, в десять раз больше историй.",
      points: ["💸 Умные групповые цены", "🌍 Встречайте путешественников со всего мира", "🤝 Соло? Пара? Лучше всего с друзьями"],
      cta: "Создать или присоединиться" },
    private: { tag: "ЧАСТНЫЕ ТУРЫ · ПЛАНОВО", title: "Ваш день, идеально для вас.",
      text: "Выберите гида, язык, темп. Лицензированные гиды создают маршрут под вас — Айя-София на рассвете, Босфор на лодке, гастротур ночью. Вы говорите — они делают.",
      points: ["🎓 Лицензированные гиды", "🗣️ 9+ языков", "🗺️ Индивидуальные маршруты, без сюрпризов"],
      cta: "Забронировать" },
  },
  manifesto: {
    eyebrow: "Зачем существует VibeGuide",
    titleA: "Туризм стал слишком роботизированным.", titleB: "Мы возвращаем человечность.",
    sub: "Автобусные туры читают один и тот же сценарий в каждом городе. QR-коды заменили настоящие разговоры. Путешественники больше стоят в очередях, чем открывают что-то новое. VibeGuide переворачивает это. Один тап, один местный, один настоящий день. С VibeNow в одиночку, с VibeSquad в группе или с Частными турами по плану — на другом конце всегда живой человек. Никаких сценариев. Никаких ловушек. Только город — глазами того, кто в нём живёт.",
  },
  vibe: {
    title: "Исследуйте по настроению",
    sub: "Выбирайте чувство — мы подберём место и гида.",
    items: ["История", "Еда и напитки", "Ночная жизнь", "Босфор", "Скрытые кафе", "Местные рынки", "Фото-точки", "Культурные сокровища"],
  },
  explore: {
    title: "Исследовать Турцию", sub: "Места, которые ищут путешественники.",
    istanbul: { title: "Туры по Стамбулу", text: "Айя-София, Голубая мечеть, дворец Топкапы, Гранд-базар, Босфор, Балат, Галата и Старый Стамбул с местными экспертами." },
    cappadocia: { title: "Туры по Каппадокии", text: "Дымоходы фей, пещерные церкви, долины, точки рассвета и местные истории с гидами Каппадокии." },
    ephesus: { title: "Туры по Эфесу", text: "Древние улицы, римские театры, храмы и Библиотека Цельса с лицензированными гидами." },
  },
  trust: {
    title: "Доверие и безопасность",
    items: [
      { title: "Лицензированные гиды", text: "Путешествуйте с профессионалами, знающими культуру и историю Турции." },
      { title: "Проверенные местные эксперты", text: "Профили проверены, чтобы вы чувствовали себя безопасно до встречи." },
      { title: "Чёткие детали опыта", text: "Знайте маршрут, длительность, язык, место встречи и ожидания." },
      { title: "Без туристических ловушек", text: "Для подлинных моментов, местных историй и настоящих связей." },
    ],
    cta: "Все стандарты безопасности →",
  },
  testimonials: {
    eyebrow: "Чувство путешественника",
    title: "Город ощущается иначе с правильным гидом.",
    sub: "Любимы путешественниками по всему миру.",
    quotes: [
      { quote: "Это было не как тур, а как открытие Стамбула с местным другом.", name: "— Сара, США" },
      { quote: "Идеально для последнего момента. Нашли гида и исследовали без стресса.", name: "— Марко, Италия" },
      { quote: "VibeSquad сделал опыт социальным, доступным и намного веселее.", name: "— Лина, Германия" },
    ],
  },
  download: {
    title: "Скачать VibeGuide",
    sub: "Мгновенные местные гиды, частные туры, пешие туры, групповые впечатления и аутентичное открытие городов Турции.",
  },
  footer: {
    tagline: "Мгновенные местные гиды, частные туры, пешие туры, групповые туры и аутентичный городской опыт в Турции.",
    product: "Продукт", destinations: "Направления", support: "Поддержка",
    copyright: "© 2026 VibeGuide. Все права защищены.",
  },
};

const es: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Tours Privados", destinations: "Destinos", guides: "Para Guías", cta: "Descargar app" },
  hero: {
    badge: "◆ Ya en Estambul + Capadocia y Éfeso pronto",
    titleA: "No solo visites Estambul.", titleAccent: "Adéntrate en ella.",
    sub: "Olvida las audioguías y los autobuses llenos. VibeGuide te coloca junto a un local verificado que realmente vive la ciudad — en 60 segundos con VibeNow, con viajeros como tú vía VibeSquad o como un día perfecto con un Tour Privado. Una app. Tres formas. Cero trampas turísticas.",
    b1: "Guías locales licenciados", b2: "Instantáneo o planeado", b3: "Conexión local real",
    ctaPrimary: "Encuentra un guía en Estambul", ctaSecondary: "Explora Turquía",
  },
  phone: { live: "En vivo", greet: "Buenas tardes" },
  phoneCards: {
    vibenow: "Toca. Empareja. Sal por la puerta en 60 segundos.",
    vibesquad: "Únete a viajeros con la misma ruta. Comparte el precio.",
    private: "Elige tu guía. Diseña el día perfecto.",
  },
  energy: {
    eyebrow: "Energía viva de la ciudad",
    titleA: "Estambul nunca se detiene.", titleB: "Atrápala mientras está viva.",
    sub: "Pulso en tiempo real desde las calles. Mientras lees esto, viajeros y guías se conectan, caminan y descubren.",
    s1: "Viajeros explorando Sultanahmet",
    s2: "VibeSquads formándose a diario",
    s3: "Rutas del Bósforo al atardecer en tendencia",
    s4: "Guías del Casco Viejo listos para conocer",
  },
  modesIntro: {
    eyebrow: "Tres caminos. Una promesa.",
    title: "Elige cómo quieres conocer tu ciudad.",
    sub: "¿De último minuto y curioso? ¿Social y con presupuesto? ¿O planeando el día de tu vida? VibeGuide tiene un modo para cada viajero — construido sobre guías locales reales, no guiones.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · INSTANTÁNEO", title: "Toca. Empareja. Vamos.",
      text: "Abre la app y un local verificado está en camino en menos de un minuto. Perfecto si acabas de aterrizar, despertarte o decidir \"hagamos algo hoy\".",
      points: ["⚡ Emparejamiento en 60 segundos", "📍 Guías reales cerca de ti, ahora", "🏛️ Museos, recorridos gastro, calles ocultas"],
      cta: "Encontrar ahora" },
    vibesquad: { tag: "VIBESQUAD · SOCIAL", title: "Viajen juntos. Paguen menos.",
      text: "Crea un grupo o únete a uno. Cuanta más gente se sume a la misma ruta, menor el precio por persona. El mismo guía, la misma ciudad, la mitad del costo, diez veces las historias.",
      points: ["💸 Precios de grupo inteligentes", "🌍 Conoce viajeros de todo el mundo", "🤝 ¿Solo? ¿Pareja? Mejor con amigos"],
      cta: "Crear o unirse" },
    private: { tag: "TOURS PRIVADOS · PLANIFICADO", title: "Tu día, hecho a tu medida.",
      text: "Elige tu guía, tu idioma, tu ritmo. Guías licenciados diseñan una ruta solo para ti — Santa Sofía al amanecer, Bósforo en barco, ruta gastro de noche. Tú decides, ellos cumplen.",
      points: ["🎓 Guías turísticos licenciados", "🗣️ 9+ idiomas", "🗺️ Rutas personalizadas, cero sorpresas"],
      cta: "Reservar ahora" },
  },
  manifesto: {
    eyebrow: "Por qué existe VibeGuide",
    titleA: "El turismo se volvió demasiado robótico.", titleB: "Lo estamos haciendo humano otra vez.",
    sub: "Los tours en autobús leen el mismo guion en cada ciudad. Los códigos QR reemplazaron las conversaciones reales. Los viajeros pasan más tiempo en colas que descubriendo. VibeGuide le da vuelta. Un toque, un local, un día real. Solo con VibeNow, en grupo con VibeSquad o planeado con Tours Privados — siempre hay un humano real al otro lado. Sin guiones. Sin trampas. Solo la ciudad, contada por quien la vive.",
  },
  vibe: {
    title: "Explora por vibe",
    sub: "Elige la sensación — nosotros emparejamos lugar y guía.",
    items: ["Historia", "Comida y Bebida", "Vida nocturna", "Bósforo", "Cafés ocultos", "Mercados locales", "Lugares fotogénicos", "Joyas culturales"],
  },
  explore: {
    title: "Explora Turquía", sub: "Los lugares que más buscan los viajeros.",
    istanbul: { title: "Tours de Estambul", text: "Santa Sofía, Mezquita Azul, Palacio Topkapi, Gran Bazar, Bósforo, Balat, Gálata y el Casco Viejo con expertos locales." },
    cappadocia: { title: "Tours de Capadocia", text: "Chimeneas de hadas, iglesias rupestres, valles, miradores al amanecer e historias locales con guías de Capadocia." },
    ephesus: { title: "Tours de Éfeso", text: "Calles antiguas, teatros romanos, templos y la Biblioteca de Celso con guías turísticos licenciados." },
  },
  trust: {
    title: "Confianza y Seguridad",
    items: [
      { title: "Guías turísticos licenciados", text: "Viaja con profesionales que conocen la cultura, la historia y las reglas locales de Turquía." },
      { title: "Expertos locales verificados", text: "Los perfiles se revisan para que te sientas seguro antes de conocer a tu guía." },
      { title: "Detalles claros", text: "Conoce la ruta, duración, idioma, punto de encuentro y expectativas con antelación." },
      { title: "Sin trampa turística", text: "Diseñado para momentos auténticos, historias locales y conexiones reales." },
    ],
    cta: "Ver todos los estándares de seguridad →",
  },
  testimonials: {
    eyebrow: "Sentir del viajero",
    title: "La ciudad se siente diferente con el guía correcto.",
    sub: "Amada por viajeros de todo el mundo.",
    quotes: [
      { quote: "Se sintió menos como un tour y más como descubrir Estambul con un amigo local.", name: "— Sarah, EE.UU." },
      { quote: "Perfecto para un plan de último minuto. Encontramos guía y exploramos sin estrés.", name: "— Marco, Italia" },
      { quote: "VibeSquad hizo la experiencia social, asequible y mucho más divertida.", name: "— Lina, Alemania" },
    ],
  },
  download: {
    title: "Descargar VibeGuide",
    sub: "Guías locales instantáneos, tours privados, recorridos a pie, experiencias grupales y descubrimiento auténtico de ciudades en Turquía.",
  },
  footer: {
    tagline: "Guías locales instantáneos, tours privados, recorridos a pie, tours grupales y experiencias urbanas auténticas en Turquía.",
    product: "Producto", destinations: "Destinos", support: "Soporte",
    copyright: "© 2026 VibeGuide. Todos los derechos reservados.",
  },
};

const ja: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "プライベートツアー", destinations: "目的地", guides: "ガイドの方へ", cta: "アプリを入手" },
  hero: {
    badge: "◆ イスタンブールで提供中 + カッパドキア・エフェソス近日対応",
    titleA: "イスタンブールをただ訪れるな。", titleAccent: "中に入れ。",
    sub: "音声ガイドや混雑したバスは忘れてください。VibeGuideは、街を本当に生きる認証済みの地元ガイドの隣にあなたを連れて行きます — VibeNowなら60秒、VibeSquadなら同じ旅人と一緒に、プライベートツアーなら計画された一日として。1つのアプリ、3つの方法、観光客向けの罠はゼロ。",
    b1: "公認地元ガイド", b2: "即時または計画", b3: "本物の地元との繋がり",
    ctaPrimary: "イスタンブールでガイドを探す", ctaSecondary: "トルコツアーを見る",
  },
  phone: { live: "ライブ", greet: "こんばんは" },
  phoneCards: {
    vibenow: "タップ。マッチ。60秒でドアの外へ。",
    vibesquad: "同じルートを行く旅人と合流。費用を分担。",
    private: "ガイドを指名。完璧な一日を設計。",
  },
  energy: {
    eyebrow: "ライブシティエナジー",
    titleA: "イスタンブールは止まらない。", titleB: "生きているうちに掴め。",
    sub: "街からのリアルタイムの鼓動。あなたがこれを読んでいる間にも、旅人とガイドはマッチし、歩き、発見しています。",
    s1: "スルタンアフメットを探索中の旅行者",
    s2: "毎日結成されるVibeSquad",
    s3: "トレンドのボスポラス夕日ルート",
    s4: "出会いを待つ旧市街ガイド",
  },
  modesIntro: {
    eyebrow: "3つの方法。1つの約束。",
    title: "あなたの街との出会い方を選ぼう。",
    sub: "土壇場で好奇心旺盛？社交的で予算重視？それとも一生の一日を計画中？VibeGuideはあらゆる旅人にモードを提供します — スクリプトではなく、本物の地元ガイドに基づいて。",
  },
  modes: {
    vibenow: { tag: "VIBENOW · 即時", title: "タップ。マッチ。出発。",
      text: "アプリを開けば、認証済みの地元ガイドが1分以内に向かいます。到着したばかり、起きたばかり、「今日何かしよう」と決めた瞬間に最適。",
      points: ["⚡ 60秒マッチング", "📍 今すぐ近くの本物のガイド", "🏛️ 美術館、フードツアー、隠れた路地"],
      cta: "今すぐ探す" },
    vibesquad: { tag: "VIBESQUAD · ソーシャル", title: "一緒に旅。安く済ます。",
      text: "スクワッドを作るか、既存のものに参加。同じルートに人が増えるほど、一人当たりの料金が下がります。同じガイド、同じ街、半額、10倍の物語。",
      points: ["💸 賢いグループ料金", "🌍 世界中の旅人と出会う", "🤝 ソロ？カップル？友達と最高"],
      cta: "作るか参加" },
    private: { tag: "プライベートツアー · 計画", title: "あなたの一日、完璧に仕立てる。",
      text: "ガイド、言語、ペースをあなたが選ぶ。公認ガイドがあなたのためだけにルートを設計します — 夜明けのハギア・ソフィア、船でボスポラス、夜のフードクロール。あなたが決め、彼らが届ける。",
      points: ["🎓 公認観光ガイド", "🗣️ 9以上の言語", "🗺️ カスタムルート、サプライズなし"],
      cta: "今予約する" },
  },
  manifesto: {
    eyebrow: "なぜVibeGuideは存在するのか",
    titleA: "観光はあまりにも機械的になった。", titleB: "私たちはそれを再び人間らしくする。",
    sub: "バスツアーはどの街でも同じスクリプトを読み上げます。QRコードは本物の会話を置き換えました。旅人は発見するよりも列に並ぶ時間が長い。VibeGuideはそれを反転させます。一つのタップ、一人の地元、一つの本物の日。VibeNowで一人でも、VibeSquadで仲間と、Privateで計画しても — 反対側にはいつも本物の人間がいる。スクリプトなし。罠なし。ただ街、それを生きる人の言葉で。",
  },
  vibe: {
    title: "ヴァイブで探す",
    sub: "気分を選んでください — 場所とガイドはこちらでマッチします。",
    items: ["歴史", "食と飲み物", "ナイトライフ", "ボスポラス", "隠れカフェ", "地元市場", "撮影スポット", "文化の宝"],
  },
  explore: {
    title: "トルコを探検", sub: "旅行者が最もよく検索する場所。",
    istanbul: { title: "イスタンブールツアー", text: "ハギア・ソフィア、ブルーモスク、トプカプ宮殿、グランドバザール、ボスポラス、バラット、ガラタ、旧市街を地元の専門家と。" },
    cappadocia: { title: "カッパドキアツアー", text: "妖精の煙突、洞窟教会、谷、日の出スポット、地元の隠れた物語をカッパドキアのガイドと。" },
    ephesus: { title: "エフェソスツアー", text: "古代の街路、ローマ劇場、神殿、ケルスス図書館を公認ガイドと。" },
  },
  trust: {
    title: "信頼と安全",
    items: [
      { title: "公認観光ガイド", text: "トルコの文化、歴史、地元のルールを知るプロと旅をする。" },
      { title: "認証済みの地元エキスパート", text: "プロフィールが審査されているので、ガイドに会う前から安心。" },
      { title: "明確な体験の詳細", text: "ルート、時間、言語、集合場所、期待することを事前に把握。" },
      { title: "観光客向けの罠なし", text: "本物の瞬間、地元の物語、本物の繋がりのために設計。" },
    ],
    cta: "すべての安全基準を見る →",
  },
  testimonials: {
    eyebrow: "旅人の声",
    title: "正しいガイドがいれば、街は違って見える。",
    sub: "世界中の旅人に愛されています。",
    quotes: [
      { quote: "ツアーというより、地元の友人とイスタンブールを発見する感じでした。", name: "— サラ、アメリカ" },
      { quote: "土壇場の計画に最適。ガイドを見つけてストレスなしで探検できました。", name: "— マルコ、イタリア" },
      { quote: "VibeSquadのおかげで、社交的で手頃で、ずっと楽しい体験になりました。", name: "— リナ、ドイツ" },
    ],
  },
  download: {
    title: "VibeGuideをダウンロード",
    sub: "トルコでの即時ローカルガイド、プライベートツアー、ウォーキングツアー、グループ体験、本物の街の発見。",
  },
  footer: {
    tagline: "トルコでの即時ローカルガイド、プライベートツアー、ウォーキングツアー、グループツアー、本物の街体験。",
    product: "プロダクト", destinations: "目的地", support: "サポート",
    copyright: "© 2026 VibeGuide. 無断複写・転載を禁じます。",
  },
};

const zh: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "私人导览", destinations: "目的地", guides: "向导申请", cta: "下载应用" },
  hero: {
    badge: "◆ 已在伊斯坦布尔上线 + 卡帕多奇亚和以弗所即将推出",
    titleA: "不要只是参观伊斯坦布尔。", titleAccent: "走进它。",
    sub: "忘掉那些语音导览和拥挤的大巴。VibeGuide让你与真正生活在这座城市的认证当地向导并肩 — 通过VibeNow 60秒匹配,通过VibeSquad与同路旅人,或作为一次完美策划的私人导览。一个应用。三种方式。零旅游陷阱。",
    b1: "持牌当地向导", b2: "即时或计划", b3: "真实的本地连接",
    ctaPrimary: "在伊斯坦布尔找向导", ctaSecondary: "探索土耳其",
  },
  phone: { live: "在线", greet: "晚上好" },
  phoneCards: {
    vibenow: "点击。匹配。60秒后出门。",
    vibesquad: "加入同路旅人。分摊费用。",
    private: "亲选向导。规划完美一天。",
  },
  energy: {
    eyebrow: "城市实时脉动",
    titleA: "伊斯坦布尔从不停歇。", titleB: "趁它鲜活时抓住它。",
    sub: "来自街头的实时脉搏。当你阅读时,旅行者和向导正在匹配、行走、发现。",
    s1: "位旅人正在探索苏丹艾哈迈德",
    s2: "个VibeSquad每日组建",
    s3: "条博斯普鲁斯日落路线热门",
    s4: "位老城向导待命",
  },
  modesIntro: {
    eyebrow: "三种方式。一个承诺。",
    title: "选择你想如何遇见这座城市。",
    sub: "临时起意又充满好奇?喜欢社交又精打细算?还是在策划人生最美一天?VibeGuide为每种旅人提供模式 — 建立在真实的本地向导之上,不是脚本。",
  },
  modes: {
    vibenow: { tag: "VIBENOW · 即时", title: "点击。匹配。出发。",
      text: "打开应用,认证当地人将在一分钟内出发。刚降落、刚起床、或刚刚决定\"今天搞点什么\"时最适合。",
      points: ["⚡ 60秒匹配", "📍 此时此地的真实向导", "🏛️ 博物馆、美食、隐秘街道"],
      cta: "立即寻找" },
    vibesquad: { tag: "VIBESQUAD · 社交", title: "一起旅行。少付费用。",
      text: "创建小队或加入。同一路线上人越多,人均价格越低。同一向导,同一座城,半价,十倍故事。",
      points: ["💸 智能群组定价", "🌍 邂逅来自各地的旅人", "🤝 单人?情侣?朋友最棒"],
      cta: "创建或加入" },
    private: { tag: "私人导览 · 计划", title: "你的一天,量身定制。",
      text: "你来选向导、语言和节奏。持牌导游为你量身设计路线 — 日出时的圣索菲亚、乘船游博斯普鲁斯、夜晚美食探索。你说,他们做。",
      points: ["🎓 持牌导游", "🗣️ 9种以上语言", "🗺️ 定制路线,零意外"],
      cta: "立即预订" },
  },
  manifesto: {
    eyebrow: "为什么VibeGuide存在",
    titleA: "旅游变得太机械化。", titleB: "我们正让它重新变得有温度。",
    sub: "大巴团在每座城市念同样的稿子。二维码取代了真实对话。旅行者排队时间比探索时间还长。VibeGuide把它颠覆。一次点击、一个本地人、一个真实的一天。VibeNow独行、VibeSquad组队,或Private Tours精心策划 — 另一端始终是真人。无脚本。无陷阱。只有这座城,由生活在其中的人讲述。",
  },
  vibe: {
    title: "按氛围探索",
    sub: "选感觉 — 我们匹配地点和向导。",
    items: ["历史", "美食与饮品", "夜生活", "博斯普鲁斯", "隐秘咖啡馆", "本地市场", "拍照地点", "文化珍宝"],
  },
  explore: {
    title: "探索土耳其", sub: "旅人搜索最多的地方。",
    istanbul: { title: "伊斯坦布尔导览", text: "圣索菲亚、蓝色清真寺、托普卡帕宫、大巴扎、博斯普鲁斯、巴拉特、加拉塔和老城,由本地专家带领。" },
    cappadocia: { title: "卡帕多奇亚导览", text: "精灵烟囱、洞穴教堂、山谷、日出观景点和当地隐藏故事,由卡帕多奇亚向导讲述。" },
    ephesus: { title: "以弗所导览", text: "古老街道、罗马剧场、神庙和塞尔苏斯图书馆,由持牌导游带领。" },
  },
  trust: {
    title: "信任与安全",
    items: [
      { title: "持牌导游", text: "与了解土耳其文化、历史和本地规则的专业人士同行。" },
      { title: "认证本地专家", text: "档案经过审核,让旅人在见面前就感到安心。" },
      { title: "清晰的体验细节", text: "预先了解路线、时长、语言、集合点和期望。" },
      { title: "无旅游陷阱感", text: "为真实瞬间、本地故事和真实连接而设计。" },
    ],
    cta: "查看所有安全标准 →",
  },
  testimonials: {
    eyebrow: "旅人感受",
    title: "有了对的向导,城市感觉就不同。",
    sub: "深受世界各地旅行者喜爱。",
    quotes: [
      { quote: "感觉不像导览,更像和本地朋友一起发现伊斯坦布尔。", name: "— Sarah, 美国" },
      { quote: "适合临时计划。我们找到向导,毫无压力地探索。", name: "— Marco, 意大利" },
      { quote: "VibeSquad让体验更社交、更实惠、更有趣。", name: "— Lina, 德国" },
    ],
  },
  download: {
    title: "下载VibeGuide",
    sub: "在土耳其即时找到本地向导、私人导览、徒步导览、群体体验和真实的城市探索。",
  },
  footer: {
    tagline: "在土耳其即时找到本地向导、私人导览、徒步导览、群体导览和真实的城市体验。",
    product: "产品", destinations: "目的地", support: "支持",
    copyright: "© 2026 VibeGuide. 保留所有权利。",
  },
};

// Diğer locale'ler EN'e fallback yapar
export const homeTranslations: Record<Locale, Dict> = {
  en, tr, de, ru, es, ja, zh,
  fr: en, hr: en, ro: en, ko: en, el: en,
};
