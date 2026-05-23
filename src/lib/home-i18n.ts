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
  howItWorks: {
    eyebrow: string; titleA: string; titleB: string;
    steps: { title: string; text: string }[];
  };
  turkey: {
    badge: string; titleA: string; titleB: string; body: string;
    cities: string[]; more: string; liveNow: string;
  };
  nav2: { howItWorks: string };
  footerLinks: { helpCenter: string; terms: string; privacy: string; accountDeletion: string };
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
  howItWorks: {
    eyebrow: "Simple as it gets",
    titleA: "Guide in your pocket,",
    titleB: "city in your hands.",
    steps: [
      { title: "Open the app", text: "Choose VibeNow for instant, VibeSquad for group, or Private for a full day." },
      { title: "Match with a guide", text: "Verified local guides near you. Real people, real expertise, real passion for their city." },
      { title: "Walk out the door", text: "In 60 seconds with VibeNow. No planning, no waiting, no tourist traps." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Currently available in Turkey",
    titleA: "Starting in Turkey,",
    titleB: "going global soon.",
    body: "VibeGuide is live across Turkey — Istanbul, Cappadocia and Ephesus coming next. We're growing fast. Your city is on the map.",
    cities: ["🏙️ Istanbul", "🎈 Cappadocia", "🏛️ Ephesus"],
    more: "+ more coming",
    liveNow: "Live now",
  },
  nav2: { howItWorks: "How it works" },
  footerLinks: { helpCenter: "Help Center", terms: "Terms of Service", privacy: "Privacy", accountDeletion: "Account Deletion" },
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
  howItWorks: {
    eyebrow: "Bu kadar basit",
    titleA: "Rehber cebinde,",
    titleB: "şehir elinde.",
    steps: [
      { title: "Uygulamayı aç", text: "Anlık için VibeNow, grup için VibeSquad veya tam gün için Özel'i seç." },
      { title: "Rehberle eşleş", text: "Yakınındaki doğrulanmış yerel rehberler. Gerçek insanlar, gerçek uzmanlık, gerçek tutku." },
      { title: "Kapıdan çık", text: "VibeNow ile 60 saniyede. Planlama yok, bekleme yok, turist tuzağı yok." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Şu anda yalnızca Türkiye'de mevcut",
    titleA: "Türkiye'de başladık,",
    titleB: "yakında dünyaya yayılıyoruz.",
    body: "VibeGuide Türkiye genelinde canlı — İstanbul, Kapadokya ve Efes sırada. Hızla büyüyoruz. Şehrin haritada.",
    cities: ["🏙️ İstanbul", "🎈 Kapadokya", "🏛️ Efes"],
    more: "+ daha fazlası geliyor",
    liveNow: "Şu an canlı",
  },
  nav2: { howItWorks: "Nasıl çalışır" },
  footerLinks: { helpCenter: "Yardım Merkezi", terms: "Kullanım Şartları", privacy: "Gizlilik", accountDeletion: "Hesap Silme" },
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
  howItWorks: {
    eyebrow: "So einfach geht's",
    titleA: "Guide in der Tasche,",
    titleB: "Stadt in deinen Händen.",
    steps: [
      { title: "App öffnen", text: "VibeNow für sofort, VibeSquad für Gruppen oder Privat für einen ganzen Tag." },
      { title: "Guide matchen", text: "Verifizierte lokale Guides in deiner Nähe. Echte Menschen, echte Expertise, echte Leidenschaft." },
      { title: "Rausgehen", text: "In 60 Sekunden mit VibeNow. Kein Planen, kein Warten, keine Touristenfallen." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Aktuell nur in der Türkei verfügbar",
    titleA: "Beginn in der Türkei,",
    titleB: "bald global.",
    body: "VibeGuide ist in der ganzen Türkei live — Istanbul, Kappadokien und Ephesus kommen als nächstes. Wir wachsen schnell. Deine Stadt ist auf der Karte.",
    cities: ["🏙️ Istanbul", "🎈 Kappadokien", "🏛️ Ephesus"],
    more: "+ mehr kommt",
    liveNow: "Jetzt live",
  },
  nav2: { howItWorks: "So funktioniert's" },
  footerLinks: { helpCenter: "Hilfe-Center", terms: "Nutzungsbedingungen", privacy: "Datenschutz", accountDeletion: "Konto löschen" },
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
  howItWorks: {
    eyebrow: "Всё просто",
    titleA: "Гид в кармане,",
    titleB: "город в руках.",
    steps: [
      { title: "Открой приложение", text: "VibeNow — мгновенно, VibeSquad — для группы, Приватный — на полный день." },
      { title: "Найди гида", text: "Проверенные местные гиды рядом. Живые люди, настоящая экспертиза, искренняя любовь к городу." },
      { title: "Выходи на улицу", text: "За 60 секунд с VibeNow. Никаких планов, никакого ожидания, никаких туристических ловушек." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Сейчас только в Турции",
    titleA: "Начинаем в Турции,",
    titleB: "скоро весь мир.",
    body: "VibeGuide работает по всей Турции — Стамбул, Каппадокия и Эфес следующие. Мы быстро растём. Твой город уже на карте.",
    cities: ["🏙️ Стамбул", "🎈 Каппадокия", "🏛️ Эфес"],
    more: "+ скоро больше",
    liveNow: "Уже доступно",
  },
  nav2: { howItWorks: "Как это работает" },
  footerLinks: { helpCenter: "Центр помощи", terms: "Условия использования", privacy: "Конфиденциальность", accountDeletion: "Удаление аккаунта" },
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
  howItWorks: {
    eyebrow: "Tan simple como puede ser",
    titleA: "El guía en tu bolsillo,",
    titleB: "la ciudad en tus manos.",
    steps: [
      { title: "Abre la app", text: "Elige VibeNow para algo instantáneo, VibeSquad para grupo o Privado para todo el día." },
      { title: "Conecta con un guía", text: "Guías locales verificados cerca de ti. Personas reales, experiencia real, pasión real." },
      { title: "Sal por la puerta", text: "En 60 segundos con VibeNow. Sin planeación, sin esperas, sin trampas turísticas." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Actualmente disponible en Turquía",
    titleA: "Comenzando en Turquía,",
    titleB: "pronto global.",
    body: "VibeGuide está activo en toda Turquía — Istanbul, Capadocia y Éfeso son los próximos. Crecemos rápido. Tu ciudad está en el mapa.",
    cities: ["🏙️ Estambul", "🎈 Capadocia", "🏛️ Éfeso"],
    more: "+ más próximamente",
    liveNow: "Disponible ahora",
  },
  nav2: { howItWorks: "Cómo funciona" },
  footerLinks: { helpCenter: "Centro de ayuda", terms: "Términos de servicio", privacy: "Privacidad", accountDeletion: "Eliminar cuenta" },
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
  howItWorks: {
    eyebrow: "シンプルそのもの",
    titleA: "ガイドはポケットに、",
    titleB: "街は手の中に。",
    steps: [
      { title: "アプリを開く", text: "即時はVibeNow、グループはVibeSquad、終日はプライベートを選択。" },
      { title: "ガイドとマッチ", text: "近くの認証済み地元ガイド。本物の人、本物の知識、本物の情熱。" },
      { title: "ドアを出る", text: "VibeNowなら60秒。計画不要、待ち時間なし、観光トラップなし。" },
    ],
  },
  turkey: {
    badge: "🇹🇷 現在トルコのみ対応",
    titleA: "トルコからスタート、",
    titleB: "まもなく世界へ。",
    body: "VibeGuideはトルコ全土で稼働中 — イスタンブール、カッパドキア、エフェソスが次に。急成長中。あなたの街も地図に載ります。",
    cities: ["🏙️ イスタンブール", "🎈 カッパドキア", "🏛️ エフェソス"],
    more: "+ さらに追加予定",
    liveNow: "現在利用可能",
  },
  nav2: { howItWorks: "使い方" },
  footerLinks: { helpCenter: "ヘルプセンター", terms: "利用規約", privacy: "プライバシー", accountDeletion: "アカウント削除" },
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
  howItWorks: {
    eyebrow: "简单至极",
    titleA: "向导在口袋，",
    titleB: "城市在手中。",
    steps: [
      { title: "打开应用", text: "即时选VibeNow，组团选VibeSquad，全天选私人导览。" },
      { title: "匹配向导", text: "附近认证当地向导。真实的人，真实的专业，真实的热情。" },
      { title: "走出门去", text: "VibeNow 60秒出发。无需计划，无需等待，无旅游陷阱。" },
    ],
  },
  turkey: {
    badge: "🇹🇷 目前仅在土耳其可用",
    titleA: "从土耳其出发，",
    titleB: "即将走向全球。",
    body: "VibeGuide已在土耳其全境上线 — 伊斯坦布尔、卡帕多奇亚和以弗所即将推出。我们快速成长。你的城市已在地图上。",
    cities: ["🏙️ 伊斯坦布尔", "🎈 卡帕多奇亚", "🏛️ 以弗所"],
    more: "+ 更多即将上线",
    liveNow: "现已上线",
  },
  nav2: { howItWorks: "使用方法" },
  footerLinks: { helpCenter: "帮助中心", terms: "服务条款", privacy: "隐私政策", accountDeletion: "注销账号" },
  footer: {
    tagline: "在土耳其即时找到本地向导、私人导览、徒步导览、群体导览和真实的城市体验。",
    product: "产品", destinations: "目的地", support: "支持",
    copyright: "© 2026 VibeGuide. 保留所有权利。",
  },
};

const el: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Ιδιωτικές Ξεναγήσεις", destinations: "Προορισμοί", guides: "Για Ξεναγούς", cta: "Κατέβασε την εφαρμογή" },
  hero: {
    badge: "◆ Διαθέσιμο στην Κωνσταντινούπολη + Καππαδοκία & Έφεσος σύντομα",
    titleA: "Μην επισκεφθείς απλώς την Κωνσταντινούπολη.", titleAccent: "Μπες μέσα της.",
    sub: "Ξέχνα τους ηχητικούς οδηγούς και τα γεμάτα λεωφορεία. Το VibeGuide σε φέρνει δίπλα σε έναν επιβεβαιωμένο ντόπιο που ζει πραγματικά την πόλη — σε 60 δευτερόλεπτα με VibeNow, με ταξιδιώτες σαν εσένα μέσω VibeSquad ή ως μια καλά σχεδιασμένη μέρα με Ιδιωτική Ξενάγηση. Μία εφαρμογή. Τρεις τρόποι. Καμία τουριστική παγίδα.",
    b1: "Αδειούχοι ντόπιοι ξεναγοί", b2: "Άμεσα ή προγραμματισμένα", b3: "Αληθινή τοπική σύνδεση",
    ctaPrimary: "Βρες ξεναγό στην Κωνσταντινούπολη", ctaSecondary: "Εξερεύνησε την Τουρκία",
  },
  phone: { live: "Ζωντανά", greet: "Καλησπέρα" },
  phoneCards: {
    vibenow: "Πάτα. Σύνδεσε. Βγες από την πόρτα σε 60 δευτερόλεπτα.",
    vibesquad: "Έλα μαζί με ταξιδιώτες στην ίδια διαδρομή. Μοιραστείτε το κόστος.",
    private: "Διάλεξε τον ξεναγό σου. Σχεδίασε την τέλεια μέρα.",
  },
  energy: {
    eyebrow: "Ζωντανή ενέργεια πόλης",
    titleA: "Η Κωνσταντινούπολη δεν σταματά ποτέ.", titleB: "Πιάσ' την όσο είναι ζωντανή.",
    sub: "Παλμός σε πραγματικό χρόνο από τους δρόμους. Ενώ διαβάζεις, ταξιδιώτες και ξεναγοί συνδέονται, περπατούν, ανακαλύπτουν.",
    s1: "Ταξιδιώτες εξερευνούν το Σουλταναχμέτ",
    s2: "VibeSquad σχηματίζονται καθημερινά",
    s3: "Διαδρομές ηλιοβασιλέματος στον Βόσπορο σε άνοδο",
    s4: "Ξεναγοί Παλιάς Πόλης έτοιμοι να συναντηθούν",
  },
  modesIntro: {
    eyebrow: "Τρεις τρόποι. Μία υπόσχεση.",
    title: "Διάλεξε πώς θέλεις να γνωρίσεις την πόλη σου.",
    sub: "Τελευταία στιγμή και περίεργος; Κοινωνικός και με προϋπολογισμό; Ή σχεδιάζεις τη μέρα της ζωής σου; Το VibeGuide έχει έναν τρόπο για κάθε ταξιδιώτη — χτισμένο πάνω σε πραγματικούς τοπικούς ξεναγούς, όχι σε σενάρια.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · ΑΜΕΣΟ", title: "Πάτα. Σύνδεσε. Πάμε.",
      text: "Άνοιξε την εφαρμογή και ένας επιβεβαιωμένος ντόπιος είναι καθ' οδόν σε λιγότερο από ένα λεπτό. Τέλειο όταν μόλις προσγειώθηκες, μόλις ξύπνησες ή απλώς αποφάσισες \"ας κάνουμε κάτι σήμερα\".",
      points: ["⚡ Σύνδεση σε 60 δευτερόλεπτα", "📍 Αληθινοί ξεναγοί κοντά σου, τώρα", "🏛️ Μουσεία, γαστρονομικές βόλτες, κρυφοί δρόμοι"],
      cta: "Βρες τώρα" },
    vibesquad: { tag: "VIBESQUAD · ΚΟΙΝΩΝΙΚΟ", title: "Ταξιδέψτε μαζί. Πληρώστε λιγότερα.",
      text: "Ξεκίνα μια ομάδα ή μπες σε μία. Όσο περισσότεροι ταξιδιώτες ενώνονται στην ίδια διαδρομή, τόσο πέφτει η τιμή. Ίδιος ξεναγός, ίδια πόλη, μισή τιμή, δέκα φορές περισσότερες ιστορίες.",
      points: ["💸 Έξυπνες τιμές ομάδας", "🌍 Γνώρισε ταξιδιώτες από παντού", "🤝 Μόνος; Ζευγάρι; Καλύτερα με φίλους"],
      cta: "Δημιούργησε ή μπες" },
    private: { tag: "ΙΔΙΩΤΙΚΕΣ · ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΟ", title: "Η μέρα σου, τέλεια προσαρμοσμένη.",
      text: "Διάλεξε ξεναγό, γλώσσα, ρυθμό. Αδειούχοι ξεναγοί σχεδιάζουν διαδρομή μόνο για σένα — Αγία Σοφία στην ανατολή, Βόσπορος με βάρκα, γαστρονομική βόλτα τη νύχτα.",
      points: ["🎓 Αδειούχοι τουριστικοί ξεναγοί", "🗣️ 9+ γλώσσες", "🗺️ Προσαρμοσμένες διαδρομές, μηδέν εκπλήξεις"],
      cta: "Κράτηση τώρα" },
  },
  manifesto: {
    eyebrow: "Γιατί υπάρχει το VibeGuide",
    titleA: "Ο τουρισμός έγινε πολύ ρομποτικός.", titleB: "Τον κάνουμε ξανά ανθρώπινο.",
    sub: "Τα τουριστικά λεωφορεία διαβάζουν το ίδιο σενάριο σε κάθε πόλη. Τα QR codes αντικατέστησαν τις πραγματικές κουβέντες. Οι ταξιδιώτες περνούν περισσότερο χρόνο σε ουρές παρά ανακαλύπτοντας. Το VibeGuide το αντιστρέφει. Ένα πάτημα, ένας ντόπιος, μια αληθινή μέρα. Στην άλλη άκρη υπάρχει πάντα ένας πραγματικός άνθρωπος. Όχι σενάρια. Όχι παγίδες. Μόνο η πόλη, ειπωμένη από κάποιον που τη ζει.",
  },
  vibe: {
    title: "Εξερεύνηση κατά διάθεση",
    sub: "Διάλεξε το συναίσθημα — εμείς ταιριάζουμε τον τόπο και τον ξεναγό.",
    items: ["Ιστορία", "Φαγητό & Ποτό", "Νυχτερινή ζωή", "Βόσπορος", "Κρυφά Καφέ", "Τοπικές Αγορές", "Σημεία Φωτογραφίας", "Πολιτιστικά Στολίδια"],
  },
  explore: {
    title: "Εξερεύνηση Τουρκίας", sub: "Τα μέρη που αναζητούν περισσότερο οι ταξιδιώτες.",
    istanbul: { title: "Ξεναγήσεις Κωνσταντινούπολης", text: "Αγία Σοφία, Μπλε Τζαμί, Παλάτι Τοπκαπί, Μεγάλη Αγορά, Βόσπορος, Μπαλάτ, Γαλατάς και Παλιά Πόλη με ντόπιους ειδικούς." },
    cappadocia: { title: "Ξεναγήσεις Καππαδοκίας", text: "Νεραϊδοκαμινάδες, βραχώδεις εκκλησίες, κοιλάδες και κρυφές ιστορίες με ξεναγούς της Καππαδοκίας." },
    ephesus: { title: "Ξεναγήσεις Εφέσου", text: "Αρχαίοι δρόμοι, ρωμαϊκά θέατρα, ναοί και η Βιβλιοθήκη του Κέλσου με αδειούχους ξεναγούς." },
  },
  trust: {
    title: "Εμπιστοσύνη & Ασφάλεια",
    items: [
      { title: "Αδειούχοι ξεναγοί", text: "Ταξίδεψε με επαγγελματίες που γνωρίζουν τον τουρκικό πολιτισμό και τους τοπικούς κανόνες." },
      { title: "Επιβεβαιωμένοι ντόπιοι", text: "Τα προφίλ ελέγχονται ώστε να αισθάνεσαι ασφαλής πριν τη συνάντηση." },
      { title: "Σαφείς λεπτομέρειες", text: "Γνώριζε διαδρομή, διάρκεια, γλώσσα, σημείο συνάντησης και προσδοκίες." },
      { title: "Καμία τουριστική παγίδα", text: "Σχεδιασμένο για αυθεντικές στιγμές και πραγματικές συνδέσεις." },
    ],
    cta: "Δες όλα τα πρότυπα ασφαλείας →",
  },
  testimonials: {
    eyebrow: "Συναίσθημα ταξιδιώτη",
    title: "Η πόλη φαίνεται διαφορετική με τον σωστό ξεναγό.",
    sub: "Αγαπημένο από ταξιδιώτες σε όλο τον κόσμο.",
    quotes: [
      { quote: "Έμοιαζε λιγότερο με ξενάγηση και περισσότερο με ανακάλυψη μαζί με ντόπιο φίλο.", name: "— Sarah, ΗΠΑ" },
      { quote: "Τέλειο για σχέδιο τελευταίας στιγμής. Βρήκαμε ξεναγό και εξερευνήσαμε χωρίς άγχος.", name: "— Marco, Ιταλία" },
      { quote: "Το VibeSquad έκανε την εμπειρία κοινωνική, προσιτή και πολύ πιο διασκεδαστική.", name: "— Lina, Γερμανία" },
    ],
  },
  download: { title: "Κατέβασε το VibeGuide", sub: "Άμεσοι ντόπιοι ξεναγοί, ιδιωτικές ξεναγήσεις και αυθεντική ανακάλυψη πόλεων στην Τουρκία." },
  howItWorks: {
    eyebrow: "Τόσο απλό",
    titleA: "Ο ξεναγός στην τσέπη σου,",
    titleB: "η πόλη στα χέρια σου.",
    steps: [
      { title: "Άνοιξε την εφαρμογή", text: "Επίλεξε VibeNow για άμεσο, VibeSquad για ομάδα ή Ιδιωτικό για ολόκληρη μέρα." },
      { title: "Βρες ξεναγό", text: "Επιβεβαιωμένοι ντόπιοι ξεναγοί κοντά σου. Πραγματικοί άνθρωποι, πραγματική εμπειρία." },
      { title: "Βγες έξω", text: "Σε 60 δευτερόλεπτα με VibeNow. Χωρίς σχεδιασμό, χωρίς αναμονή, χωρίς τουριστικές παγίδες." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Διαθέσιμο αυτή τη στιγμή μόνο στην Τουρκία",
    titleA: "Ξεκινάμε από την Τουρκία,",
    titleB: "σύντομα παντού.",
    body: "Το VibeGuide είναι ζωντανό σε όλη την Τουρκία — Κωνσταντινούπολη, Καππαδοκία και Έφεσος είναι τα επόμενα. Μεγαλώνουμε γρήγορα. Η πόλη σου είναι στον χάρτη.",
    cities: ["🏙️ Κωνσταντινούπολη", "🎈 Καππαδοκία", "🏛️ Έφεσος"],
    more: "+ περισσότερα σύντομα",
    liveNow: "Διαθέσιμο τώρα",
  },
  nav2: { howItWorks: "Πώς λειτουργεί" },
  footerLinks: { helpCenter: "Κέντρο βοήθειας", terms: "Όροι χρήσης", privacy: "Απόρρητο", accountDeletion: "Διαγραφή λογαριασμού" },
  footer: { tagline: "Άμεσοι ντόπιοι ξεναγοί, ιδιωτικές ξεναγήσεις, ομαδικές ξεναγήσεις και αυθεντικές εμπειρίες πόλης στην Τουρκία.", product: "Προϊόν", destinations: "Προορισμοί", support: "Υποστήριξη", copyright: "© 2026 VibeGuide. Όλα τα δικαιώματα διατηρούνται." },
};

const bg: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Частни турове", destinations: "Дестинации", guides: "За екскурзоводи", cta: "Изтегли приложението" },
  hero: {
    badge: "◆ Вече в Истанбул + Кападокия и Ефес скоро",
    titleA: "Не просто посети Истанбул.", titleAccent: "Влез в него.",
    sub: "Забрави аудио водачите и пълните автобуси. VibeGuide те поставя до проверен местен жител, който наистина живее в града — за 60 секунди с VibeNow, със същите пътешественици чрез VibeSquad или като перфектно планиран ден с Частен тур. Едно приложение. Три начина. Нула туристически капани.",
    b1: "Лицензирани местни водачи", b2: "Незабавно или планирано", b3: "Истинска местна връзка",
    ctaPrimary: "Намери водач в Истанбул", ctaSecondary: "Разгледай Турция",
  },
  phone: { live: "На живо", greet: "Добър вечер" },
  phoneCards: {
    vibenow: "Докосни. Свържи. Излез през вратата за 60 секунди.",
    vibesquad: "Присъедини се към пътешественици по същия маршрут. Разделете цената.",
    private: "Избери своя водач. Планирай идеалния ден.",
  },
  energy: {
    eyebrow: "Жива градска енергия",
    titleA: "Истанбул никога не спира.", titleB: "Хвани го, докато е жив.",
    sub: "Пулс на улиците в реално време. Докато четеш това, пътешественици и водачи се свързват, вървят и откриват.",
    s1: "Пътешественици в Султанахмет", s2: "VibeSquad се образуват дневно", s3: "Маршрути на залез на Босфора са в тренд", s4: "Водачи в Стария град готови за среща",
  },
  modesIntro: {
    eyebrow: "Три начина. Едно обещание.",
    title: "Избери как искаш да опознаеш града си.",
    sub: "Спонтанен и любопитен? Социален и с бюджет? Или планираш деня на живота си? VibeGuide има режим за всеки пътешественик — изграден върху истински местни водачи, не сценарии.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · НЕЗАБАВНО", title: "Докосни. Свържи. Тръгвай.",
      text: "Отвори приложението — проверен местен е на път за по-малко от минута. Идеално когато току-що си кацнал, току-що си се събудил или просто си решил \"да направим нещо днес\".",
      points: ["⚡ 60-секундно свързване", "📍 Истински водачи близо до теб, сега", "🏛️ Музеи, гастро разходки, скрити улици"],
      cta: "Намери сега" },
    vibesquad: { tag: "VIBESQUAD · СОЦИАЛНО", title: "Пътувайте заедно. Платете по-малко.",
      text: "Започни отряд или се присъедини към такъв. Колкото повече хора по същия маршрут, толкова по-ниска е цената на човек. Същият водач, същият град, наполовина цена, десетократно повече истории.",
      points: ["💸 Интелигентни групови цени", "🌍 Срещай пътешественици отвсякъде", "🤝 Сам? Двойка? Най-добре с приятели"],
      cta: "Създай или присъедини" },
    private: { tag: "ЧАСТНИ · ПЛАНИРАНИ", title: "Твоят ден, перфектно изработен.",
      text: "Избери водача, езика, темпото. Лицензирани водачи създават маршрут само за теб — Света София на изгрев, Босфор с лодка, нощна гастро обиколка.",
      points: ["🎓 Лицензирани водачи", "🗣️ 9+ езика", "🗺️ Персонализирани маршрути, нула изненади"],
      cta: "Резервирай сега" },
  },
  manifesto: {
    eyebrow: "Защо съществува VibeGuide",
    titleA: "Туризмът стана твърде роботизиран.", titleB: "Правим го отново човешки.",
    sub: "Автобусните турове четат същия сценарий във всеки град. QR кодовете замениха истинските разговори. Пътешествениците стоят повече на опашки, отколкото откриват. VibeGuide обръща това. Едно докосване, един местен, един истински ден. Без сценарии. Без капани. Само градът, разказан от някой, който го живее.",
  },
  vibe: {
    title: "Изследвай по настроение",
    sub: "Избери усещането — ние свързваме мястото и водача.",
    items: ["История", "Храна и напитки", "Нощен живот", "Босфор", "Скрити кафенета", "Местни пазари", "Фото места", "Културни съкровища"],
  },
  explore: {
    title: "Разгледай Турция", sub: "Местата, които пътешествениците търсят най-много.",
    istanbul: { title: "Истанбул турове", text: "Света София, Синя джамия, Топкапъ, Голям базар, Босфор, Балат, Галата и Стария Истанбул с местни експерти." },
    cappadocia: { title: "Кападокия турове", text: "Феини комини, пещерни църкви, долини, изгреви и скрити местни истории с водачи в Кападокия." },
    ephesus: { title: "Ефес турове", text: "Древни улици, римски театри, храмове и Библиотеката на Целс с лицензирани водачи." },
  },
  trust: {
    title: "Доверие и сигурност",
    items: [
      { title: "Лицензирани водачи", text: "Пътувай с професионалисти, които познават културата и правилата на Турция." },
      { title: "Проверени местни експерти", text: "Профилите се преглеждат — чувствай се сигурно преди срещата." },
      { title: "Ясни детайли", text: "Знай маршрута, продължителността, езика, мястото на среща и очакванията." },
      { title: "Без туристически капани", text: "Създадено за автентични моменти и истински връзки." },
    ],
    cta: "Виж всички стандарти за сигурност →",
  },
  testimonials: {
    eyebrow: "Усещане на пътешественика",
    title: "Градът се усеща различно с правилния водач.",
    sub: "Обичан от пътешественици по целия свят.",
    quotes: [
      { quote: "Не приличаше на тур, а на откриване на Истанбул с местен приятел.", name: "— Sarah, САЩ" },
      { quote: "Идеално за план в последния момент. Намерихме водач и разгледахме без стрес.", name: "— Marco, Италия" },
      { quote: "VibeSquad направи преживяването социално, достъпно и много по-забавно.", name: "— Lina, Германия" },
    ],
  },
  download: { title: "Изтегли VibeGuide", sub: "Незабавни местни водачи, частни турове и автентично откриване на градове в Турция." },
  howItWorks: {
    eyebrow: "Толкова просто",
    titleA: "Водачът в джоба ти,",
    titleB: "градът в ръцете ти.",
    steps: [
      { title: "Отвори приложението", text: "Избери VibeNow за незабавно, VibeSquad за група или Частно за цял ден." },
      { title: "Свържи се с водач", text: "Проверени местни водачи наблизо. Истински хора, истинска експертиза." },
      { title: "Излез навън", text: "За 60 секунди с VibeNow. Без планиране, без чакане, без туристически капани." },
    ],
  },
  turkey: {
    badge: "🇹🇷 В момента само в Турция",
    titleA: "Започваме в Турция,",
    titleB: "скоро навсякъде.",
    body: "VibeGuide е активен в цяла Турция — Истанбул, Кападокия и Ефес са следващи. Растем бързо. Твоят град е на картата.",
    cities: ["🏙️ Истанбул", "🎈 Кападокия", "🏛️ Ефес"],
    more: "+ още предстои",
    liveNow: "Активно сега",
  },
  nav2: { howItWorks: "Как работи" },
  footerLinks: { helpCenter: "Помощен център", terms: "Условия за ползване", privacy: "Поверителност", accountDeletion: "Изтриване на акаунт" },
  footer: { tagline: "Незабавни местни водачи, частни турове, пешеходни турове, групови турове и автентични градски преживявания в Турция.", product: "Продукт", destinations: "Дестинации", support: "Поддръжка", copyright: "© 2026 VibeGuide. Всички права запазени." },
};

const sr: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Privatne ture", destinations: "Destinacije", guides: "Za vodiče", cta: "Preuzmi aplikaciju" },
  hero: {
    badge: "◆ Već u Istanbulu + Kapadokija i Efes uskoro",
    titleA: "Ne samo da posetiš Istanbul.", titleAccent: "Uđi u njega.",
    sub: "Zaboravi audio vodiče i krcate autobuse. VibeGuide te postavlja pored proveravanog lokalca koji zapravo živi grad — za 60 sekundi sa VibeNow, sa putnicima poput tebe preko VibeSquad ili kao savršeno isplaniran dan sa Privatnom turom. Jedna aplikacija. Tri načina. Nula turističkih zamki.",
    b1: "Licencirani lokalni vodiči", b2: "Trenutno ili planirano", b3: "Prava lokalna veza",
    ctaPrimary: "Pronađi vodiča u Istanbulu", ctaSecondary: "Istraži Tursku",
  },
  phone: { live: "Uživo", greet: "Dobro veče" },
  phoneCards: {
    vibenow: "Dodirni. Spoji. Izađi na vrata za 60 sekundi.",
    vibesquad: "Pridruži se putnicima istim putem. Podelite cenu.",
    private: "Sam biraj vodiča. Planiraj savršen dan.",
  },
  energy: {
    eyebrow: "Živa energija grada",
    titleA: "Istanbul nikad ne staje.", titleB: "Uhvati ga dok je živ.",
    sub: "Puls ulica u realnom vremenu. Dok ovo čitaš, putnici i vodiči se spajaju, hodaju i otkrivaju.",
    s1: "Putnika istražuje Sultanahmet", s2: "VibeSquad nastaju svakodnevno", s3: "Bosforski zalazak ruta u trendu", s4: "Vodiča Starog grada spremno za susret",
  },
  modesIntro: {
    eyebrow: "Tri načina. Jedno obećanje.",
    title: "Izaberi kako želiš da upoznaš svoj grad.",
    sub: "U poslednjem trenutku i radoznao? Društven i sa budžetom? Ili planiraš dan svog života? VibeGuide ima režim za svakog putnika — izgrađen na pravim lokalnim vodičima, ne skriptama.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · TRENUTNO", title: "Dodirni. Spoji. Kreni.",
      text: "Otvori aplikaciju i proveravan lokalac je na putu za manje od minuta. Savršeno kada si tek sleteo, tek se probudio ili odlučio \"hajde da uradimo nešto danas\".",
      points: ["⚡ Spajanje za 60 sekundi", "📍 Pravi vodiči blizu tebe, odmah", "🏛️ Muzeji, gastro ture, skrivene ulice"],
      cta: "Pronađi sada" },
    vibesquad: { tag: "VIBESQUAD · DRUŠTVENO", title: "Putujte zajedno. Plaćajte manje.",
      text: "Pokreni grupu ili se pridruži. Što više ljudi na istoj ruti, niža cena po osobi. Isti vodič, isti grad, polovina cene, deset puta više priča.",
      points: ["💸 Pametne grupne cene", "🌍 Upoznaj putnike iz celog sveta", "🤝 Sam? Par? Najbolje sa prijateljima"],
      cta: "Kreiraj ili se pridruži" },
    private: { tag: "PRIVATNE · PLANIRANE", title: "Tvoj dan, savršeno skrojen.",
      text: "Biraj vodiča, jezik, tempo. Licencirani vodiči prave rutu samo za tebe — Aja Sofija u zoru, Bosfor čamcem, gastro tura noću.",
      points: ["🎓 Licencirani turistički vodiči", "🗣️ 9+ jezika", "🗺️ Prilagođene rute, nula iznenađenja"],
      cta: "Rezerviši sada" },
  },
  manifesto: {
    eyebrow: "Zašto postoji VibeGuide",
    titleA: "Turizam je postao previše robotizovan.", titleB: "Vraćamo mu ljudski osećaj.",
    sub: "Autobuske ture čitaju isti scenario u svakom gradu. QR kodovi su zamenili prave razgovore. Putnici provode više vremena u redovima nego otkrivajući. VibeGuide to preokreće. Jedan dodir, jedan lokalac, jedan pravi dan. Bez skripti. Bez zamki. Samo grad, ispričan od onoga ko ga živi.",
  },
  vibe: {
    title: "Istraži po raspoloženju",
    sub: "Izaberi osećaj — mi ćemo spojiti mesto i vodiča.",
    items: ["Istorija", "Hrana i piće", "Noćni život", "Bosfor", "Skriveni kafići", "Lokalne pijace", "Foto lokacije", "Kulturna blaga"],
  },
  explore: {
    title: "Istraži Tursku", sub: "Mesta koja putnici najviše traže.",
    istanbul: { title: "Istanbul ture", text: "Aja Sofija, Plava džamija, Topkapi palata, Veliki bazar, Bosfor, Balat, Galata i Stari Istanbul sa lokalnim ekspertima." },
    cappadocia: { title: "Kapadokija ture", text: "Vilini dimnjaci, pećinske crkve, doline i skrivene lokalne priče sa vodičima u Kapadokiji." },
    ephesus: { title: "Efes ture", text: "Antičke ulice, rimska pozorišta, hramovi i Biblioteka Celsusa sa licenciranim vodičima." },
  },
  trust: {
    title: "Poverenje i bezbednost",
    items: [
      { title: "Licencirani vodiči", text: "Putuj sa profesionalcima koji poznaju tursku kulturu, istoriju i lokalna pravila." },
      { title: "Provereni lokalni eksperti", text: "Profili se proveravaju — osećaj se sigurno pre susreta." },
      { title: "Jasne detalje iskustva", text: "Znaj rutu, trajanje, jezik, mesto sastanka i očekivanja." },
      { title: "Bez turističkih zamki", text: "Dizajnirano za autentične trenutke i prave veze." },
    ],
    cta: "Vidi sve standarde bezbednosti →",
  },
  testimonials: {
    eyebrow: "Osećaj putnika",
    title: "Grad se oseća drugačije sa pravim vodičem.",
    sub: "Voljen od putnika širom sveta.",
    quotes: [
      { quote: "Nije izgledalo kao tura, već kao otkrivanje Istanbula sa lokalnim prijateljem.", name: "— Sarah, SAD" },
      { quote: "Savršeno za plan u poslednjem trenutku. Našli smo vodiča i istražili bez stresa.", name: "— Marco, Italija" },
      { quote: "VibeSquad je iskustvo učinio društvenim, pristupačnim i mnogo zabavnijim.", name: "— Lina, Nemačka" },
    ],
  },
  download: { title: "Preuzmi VibeGuide", sub: "Trenutni lokalni vodiči, privatne ture i autentično otkrivanje gradova u Turskoj." },
  howItWorks: {
    eyebrow: "Tako jednostavno",
    titleA: "Vodič u džepu,",
    titleB: "grad u rukama.",
    steps: [
      { title: "Otvori aplikaciju", text: "Izaberi VibeNow za instant, VibeSquad za grupu ili Privatno za ceo dan." },
      { title: "Poveži se sa vodičem", text: "Provereni lokalni vodiči u blizini. Pravi ljudi, prava ekspertiza." },
      { title: "Izađi napolje", text: "Za 60 sekundi sa VibeNow. Bez planiranja, čekanja, bez turističkih zamki." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Trenutno samo u Turskoj",
    titleA: "Počinjemo u Turskoj,",
    titleB: "uskoro globalno.",
    body: "VibeGuide je aktivan širom Turske — Istanbul, Kapadokija i Efes su sledeći. Brzo rastemo. Tvoj grad je na mapi.",
    cities: ["🏙️ Istanbul", "🎈 Kapadokija", "🏛️ Efes"],
    more: "+ još dolazi",
    liveNow: "Aktivno sada",
  },
  nav2: { howItWorks: "Kako funkcioniše" },
  footerLinks: { helpCenter: "Centar za pomoć", terms: "Uslovi korišćenja", privacy: "Privatnost", accountDeletion: "Brisanje naloga" },
  footer: { tagline: "Trenutni lokalni vodiči, privatne ture, pešačke ture, grupne ture i autentična gradska iskustva u Turskoj.", product: "Proizvod", destinations: "Destinacije", support: "Podrška", copyright: "© 2026 VibeGuide. Sva prava zadržana." },
};

const ko: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "프라이빗 투어", destinations: "여행지", guides: "가이드 신청", cta: "앱 다운로드" },
  hero: {
    badge: "◆ 이스탄불에서 이용 가능 + 카파도키아 및 에페소스 출시 예정",
    titleA: "이스탄불을 그저 방문하지 마세요.", titleAccent: "그 안으로 들어가세요.",
    sub: "오디오 가이드와 붐비는 버스는 잊으세요. VibeGuide는 도시를 진짜로 살고 있는 인증된 현지인 옆에 당신을 데려다 놓습니다 — VibeNow로 60초 만에, VibeSquad로 비슷한 여행자들과 함께, 또는 잘 짜인 하루를 위한 프라이빗 투어로. 하나의 앱. 세 가지 방법. 관광객 함정은 제로.",
    b1: "공인 현지 가이드", b2: "즉시 또는 계획", b3: "진짜 현지인과의 연결",
    ctaPrimary: "이스탄불에서 가이드 찾기", ctaSecondary: "터키 투어 둘러보기",
  },
  phone: { live: "라이브", greet: "좋은 저녁입니다" },
  phoneCards: {
    vibenow: "탭. 매칭. 60초 안에 문 밖으로.",
    vibesquad: "같은 길로 가는 여행자들과 합류. 비용 분담.",
    private: "가이드를 직접 선택. 완벽한 하루를 계획.",
  },
  energy: {
    eyebrow: "도시의 라이브 에너지",
    titleA: "이스탄불은 멈추지 않습니다.", titleB: "살아있을 때 잡으세요.",
    sub: "거리에서 실시간 맥박. 당신이 읽는 동안에도 여행자와 가이드가 매칭되고 걷고 발견하고 있습니다.",
    s1: "명의 여행자가 술탄아흐멧을 탐험 중", s2: "개의 VibeSquad가 매일 결성", s3: "개의 보스포루스 일몰 코스가 인기", s4: "명의 올드시티 가이드가 만남을 기다림",
  },
  modesIntro: {
    eyebrow: "세 가지 방법. 하나의 약속.",
    title: "당신의 도시를 어떻게 만나고 싶은지 선택하세요.",
    sub: "즉흥적이고 호기심 많으세요? 사교적이고 예산을 의식하세요? 아니면 인생 최고의 하루를 계획 중? VibeGuide는 모든 여행자를 위한 모드가 있습니다 — 스크립트가 아닌 진짜 현지 가이드를 기반으로.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · 즉시", title: "탭. 매칭. 출발.",
      text: "앱을 열면 인증된 현지인이 1분 이내에 오고 있습니다. 막 도착했을 때, 막 일어났을 때, \"오늘 뭔가 하자\"라고 결정한 순간에 완벽.",
      points: ["⚡ 60초 매칭", "📍 지금 당신 근처의 실제 가이드", "🏛️ 박물관, 푸드 워크, 숨겨진 거리"],
      cta: "지금 찾기" },
    vibesquad: { tag: "VIBESQUAD · 소셜", title: "함께 여행. 적게 지불.",
      text: "그룹을 만들거나 참여하세요. 같은 코스에 더 많은 여행자가 모일수록 1인당 가격이 떨어집니다. 같은 가이드, 같은 도시, 절반 가격, 열 배의 이야기.",
      points: ["💸 스마트한 그룹 가격", "🌍 전 세계 여행자들과 만남", "🤝 솔로? 커플? 친구와 함께가 최고"],
      cta: "만들기 또는 참여" },
    private: { tag: "프라이빗 · 계획", title: "당신의 하루, 완벽한 맞춤.",
      text: "가이드, 언어, 페이스를 직접 선택. 공인 가이드가 당신만을 위한 코스를 만듭니다 — 일출의 아야 소피아, 보트로 보스포루스, 밤의 푸드 크롤.",
      points: ["🎓 공인 관광 가이드", "🗣️ 9개 이상 언어", "🗺️ 맞춤 코스, 놀라움 없음"],
      cta: "지금 예약" },
  },
  manifesto: {
    eyebrow: "VibeGuide가 존재하는 이유",
    titleA: "관광은 너무 기계적이 되었습니다.", titleB: "우리는 다시 인간적으로 만들고 있습니다.",
    sub: "버스 투어는 모든 도시에서 같은 대본을 읽습니다. QR 코드가 진짜 대화를 대체했습니다. 여행자들은 발견하는 시간보다 줄 서는 시간이 더 많습니다. VibeGuide는 이를 뒤집습니다. 한 번의 탭, 한 명의 현지인, 하루의 진짜. 스크립트 없음. 함정 없음. 그저 도시 — 그곳에서 사는 사람의 입을 통해.",
  },
  vibe: {
    title: "바이브로 탐험",
    sub: "느낌을 선택하세요 — 우리가 장소와 가이드를 연결해 드립니다.",
    items: ["역사", "음식 & 음료", "나이트라이프", "보스포루스", "숨은 카페", "현지 시장", "포토 스팟", "문화 보석"],
  },
  explore: {
    title: "터키 탐험", sub: "여행자들이 가장 많이 검색하는 장소들.",
    istanbul: { title: "이스탄불 투어", text: "아야 소피아, 블루 모스크, 톱카프 궁전, 그랜드 바자르, 보스포루스, 발라트, 갈라타 및 올드 이스탄불을 현지 전문가와 함께." },
    cappadocia: { title: "카파도키아 투어", text: "요정의 굴뚝, 동굴 교회, 계곡, 일출 전망대 및 숨겨진 현지 이야기를 카파도키아 가이드와." },
    ephesus: { title: "에페소스 투어", text: "고대 거리, 로마 극장, 신전 및 셀수스 도서관을 공인 가이드와." },
  },
  trust: {
    title: "신뢰 & 안전",
    items: [
      { title: "공인 관광 가이드", text: "터키의 문화, 역사 및 현지 규칙을 아는 전문가와 함께 여행하세요." },
      { title: "인증된 현지 전문가", text: "프로필이 검토되어 만나기 전부터 안심할 수 있습니다." },
      { title: "명확한 체험 세부 정보", text: "코스, 기간, 언어, 만남 장소 및 기대치를 미리 알 수 있습니다." },
      { title: "관광객 함정 없음", text: "진정한 순간과 진짜 연결을 위해 설계되었습니다." },
    ],
    cta: "모든 안전 기준 보기 →",
  },
  testimonials: {
    eyebrow: "여행자의 느낌",
    title: "올바른 가이드와 함께라면 도시는 다르게 느껴집니다.",
    sub: "전 세계 여행자들에게 사랑받습니다.",
    quotes: [
      { quote: "투어라기보다는 현지 친구와 이스탄불을 발견하는 느낌이었어요.", name: "— Sarah, 미국" },
      { quote: "막판 계획에 완벽. 가이드를 찾고 스트레스 없이 탐험했어요.", name: "— Marco, 이탈리아" },
      { quote: "VibeSquad는 경험을 사교적이고 저렴하며 훨씬 재미있게 만들었어요.", name: "— Lina, 독일" },
    ],
  },
  download: { title: "VibeGuide 다운로드", sub: "터키에서 즉시 현지 가이드, 프라이빗 투어 및 진정한 도시 발견." },
  howItWorks: {
    eyebrow: "이보다 쉬울 수 없어요",
    titleA: "가이드는 주머니 속에,",
    titleB: "도시는 손안에.",
    steps: [
      { title: "앱 열기", text: "즉시는 VibeNow, 그룹은 VibeSquad, 하루 종일은 프라이빗을 선택하세요." },
      { title: "가이드 매칭", text: "근처의 인증된 현지 가이드. 진짜 사람, 진짜 전문성, 진짜 열정." },
      { title: "문 밖으로", text: "VibeNow로 60초 안에. 계획 없이, 기다림 없이, 관광 함정 없이." },
    ],
  },
  turkey: {
    badge: "🇹🇷 현재 터키에서만 이용 가능",
    titleA: "터키에서 시작해서,",
    titleB: "곧 전 세계로.",
    body: "VibeGuide는 터키 전역에서 서비스 중 — 이스탄불, 카파도키아, 에페소스가 다음 순서입니다. 빠르게 성장 중입니다. 당신의 도시도 지도 위에 올라올 거예요.",
    cities: ["🏙️ 이스탄불", "🎈 카파도키아", "🏛️ 에페소스"],
    more: "+ 더 많은 곳 예정",
    liveNow: "지금 이용 가능",
  },
  nav2: { howItWorks: "이용 방법" },
  footerLinks: { helpCenter: "고객센터", terms: "이용약관", privacy: "개인정보처리방침", accountDeletion: "계정 삭제" },
  footer: { tagline: "터키에서 즉시 현지 가이드, 프라이빗 투어, 워킹 투어, 그룹 투어 및 진정한 도시 경험.", product: "제품", destinations: "여행지", support: "지원", copyright: "© 2026 VibeGuide. 모든 권리 보유." },
};

const it: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Tour Privati", destinations: "Destinazioni", guides: "Per Guide", cta: "Scarica l'app" },
  hero: {
    badge: "◆ Già attivo a Istanbul + Cappadocia ed Efeso in arrivo",
    titleA: "Non visitare solo Istanbul.", titleAccent: "Entraci dentro.",
    sub: "Dimentica le audio guide e i bus affollati. VibeGuide ti porta accanto a un locale verificato che vive davvero la città — in 60 secondi con VibeNow, con viaggiatori come te tramite VibeSquad, o come una giornata perfettamente pianificata con un Tour Privato. Una app. Tre modi. Zero trappole per turisti.",
    b1: "Guide locali abilitate", b2: "Istantaneo o pianificato", b3: "Connessione locale vera",
    ctaPrimary: "Trova una guida a Istanbul", ctaSecondary: "Esplora la Turchia",
  },
  phone: { live: "Live", greet: "Buonasera" },
  phoneCards: {
    vibenow: "Tocca. Abbina. Esci di casa in 60 secondi.",
    vibesquad: "Unisciti a viaggiatori sulla stessa rotta. Dividete il prezzo.",
    private: "Scegli la tua guida. Pianifica la giornata perfetta.",
  },
  energy: {
    eyebrow: "Energia viva della città",
    titleA: "Istanbul non si ferma mai.", titleB: "Coglila mentre è viva.",
    sub: "Pulsazione in tempo reale dalle strade. Mentre leggi, viaggiatori e guide si stanno collegando, camminando, scoprendo.",
    s1: "Viaggiatori esplorano Sultanahmet", s2: "VibeSquad si formano ogni giorno", s3: "Rotte del Bosforo al tramonto in trend", s4: "Guide della Città Vecchia pronte all'incontro",
  },
  modesIntro: {
    eyebrow: "Tre vie. Una promessa.",
    title: "Scegli come vuoi incontrare la tua città.",
    sub: "All'ultimo minuto e curioso? Sociale e attento al budget? O stai pianificando la giornata della tua vita? VibeGuide ha una modalità per ogni viaggiatore — costruita su vere guide locali, non copioni.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · ISTANTANEO", title: "Tocca. Abbina. Vai.",
      text: "Apri l'app e un locale verificato è in arrivo in meno di un minuto. Perfetto quando sei appena atterrato, appena sveglio o hai deciso \"facciamo qualcosa oggi\".",
      points: ["⚡ Abbinamento in 60 secondi", "📍 Guide reali vicino a te, ora", "🏛️ Musei, gastro-tour, vie nascoste"],
      cta: "Trova ora" },
    vibesquad: { tag: "VIBESQUAD · SOCIALE", title: "Viaggiate insieme. Pagate meno.",
      text: "Avvia una squad o uniscitene a una. Più viaggiatori sulla stessa rotta, più basso il prezzo a testa. Stessa guida, stessa città, metà prezzo, dieci volte le storie.",
      points: ["💸 Prezzi di gruppo intelligenti", "🌍 Incontra viaggiatori da ovunque", "🤝 Solo? Coppia? Meglio con amici"],
      cta: "Crea o unisciti" },
    private: { tag: "TOUR PRIVATI · PIANIFICATO", title: "La tua giornata, su misura.",
      text: "Scegli guida, lingua, ritmo. Guide turistiche abilitate creano un itinerario solo per te — Hagia Sophia all'alba, Bosforo in barca, tour gastronomico di notte.",
      points: ["🎓 Guide turistiche abilitate", "🗣️ 9+ lingue", "🗺️ Percorsi su misura, zero sorprese"],
      cta: "Prenota ora" },
  },
  manifesto: {
    eyebrow: "Perché esiste VibeGuide",
    titleA: "Il turismo è diventato troppo robotico.", titleB: "Lo rendiamo di nuovo umano.",
    sub: "I tour in bus leggono lo stesso copione in ogni città. I QR code hanno sostituito le conversazioni vere. I viaggiatori passano più tempo in coda che a scoprire. VibeGuide capovolge tutto. Un tocco, un locale, un giorno vero. Senza copioni. Senza trappole. Solo la città, raccontata da chi la vive.",
  },
  vibe: {
    title: "Esplora per vibe",
    sub: "Scegli la sensazione — noi abbiniamo luogo e guida.",
    items: ["Storia", "Cibo & Bevande", "Vita notturna", "Bosforo", "Caffè nascosti", "Mercati locali", "Spot fotografici", "Gemme culturali"],
  },
  explore: {
    title: "Esplora la Turchia", sub: "I luoghi più cercati dai viaggiatori.",
    istanbul: { title: "Tour Istanbul", text: "Hagia Sophia, Moschea Blu, Palazzo Topkapi, Gran Bazar, Bosforo, Balat, Galata e la Vecchia Istanbul con esperti locali." },
    cappadocia: { title: "Tour Cappadocia", text: "Camini delle fate, chiese rupestri, valli, punti panoramici all'alba e storie locali nascoste con guide della Cappadocia." },
    ephesus: { title: "Tour Efeso", text: "Vie antiche, teatri romani, templi e la Biblioteca di Celso con guide turistiche abilitate." },
  },
  trust: {
    title: "Fiducia e Sicurezza",
    items: [
      { title: "Guide turistiche abilitate", text: "Viaggia con professionisti che conoscono la cultura, la storia e le regole locali della Turchia." },
      { title: "Esperti locali verificati", text: "I profili sono controllati — sentiti sicuro prima di incontrare la guida." },
      { title: "Dettagli chiari", text: "Conosci percorso, durata, lingua, punto d'incontro e aspettative in anticipo." },
      { title: "Niente trappole turistiche", text: "Pensato per momenti autentici e connessioni reali." },
    ],
    cta: "Vedi tutti gli standard di sicurezza →",
  },
  testimonials: {
    eyebrow: "Sensazione del viaggiatore",
    title: "La città è diversa con la guida giusta.",
    sub: "Amato da viaggiatori in tutto il mondo.",
    quotes: [
      { quote: "Sembrava più scoprire Istanbul con un amico locale che un tour.", name: "— Sarah, USA" },
      { quote: "Perfetto per un piano all'ultimo minuto. Trovato guida ed esplorato senza stress.", name: "— Marco, Italia" },
      { quote: "VibeSquad ha reso l'esperienza sociale, economica e molto più divertente.", name: "— Lina, Germania" },
    ],
  },
  download: { title: "Scarica VibeGuide", sub: "Guide locali istantanee, tour privati e scoperta autentica delle città in Turchia." },
  howItWorks: {
    eyebrow: "Semplice come non mai",
    titleA: "La guida in tasca,",
    titleB: "la città nelle tue mani.",
    steps: [
      { title: "Apri l'app", text: "Scegli VibeNow per l'immediato, VibeSquad per il gruppo o Privato per un'intera giornata." },
      { title: "Abbina una guida", text: "Guide locali verificate vicino a te. Persone reali, vera esperienza, vera passione." },
      { title: "Esci di casa", text: "In 60 secondi con VibeNow. Zero pianificazione, zero attesa, zero trappole turistiche." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Attualmente disponibile solo in Turchia",
    titleA: "Partiamo dalla Turchia,",
    titleB: "presto globale.",
    body: "VibeGuide è attivo in tutta la Turchia — Istanbul, Cappadocia ed Efeso sono i prossimi. Stiamo crescendo velocemente. La tua città è sulla mappa.",
    cities: ["🏙️ Istanbul", "🎈 Cappadocia", "🏛️ Efeso"],
    more: "+ altro in arrivo",
    liveNow: "Disponibile ora",
  },
  nav2: { howItWorks: "Come funziona" },
  footerLinks: { helpCenter: "Centro assistenza", terms: "Termini di servizio", privacy: "Privacy", accountDeletion: "Elimina account" },
  footer: { tagline: "Guide locali istantanee, tour privati, tour a piedi, tour di gruppo ed esperienze urbane autentiche in Turchia.", product: "Prodotto", destinations: "Destinazioni", support: "Supporto", copyright: "© 2026 VibeGuide. Tutti i diritti riservati." },
};

const hr: Dict = {
  nav: { vibenow: "VibeNow", vibesquad: "VibeSquad", private: "Privatne ture", destinations: "Destinacije", guides: "Za vodiče", cta: "Preuzmi aplikaciju" },
  hero: {
    badge: "◆ Već u Istanbulu + Kapadokija i Efez uskoro",
    titleA: "Ne samo posjeti Istanbul.", titleAccent: "Uđi u njega.",
    sub: "Zaboravi audio vodiče i pretrpane autobuse. VibeGuide te postavlja uz provjerenog lokalca koji zaista živi grad — za 60 sekundi s VibeNow, s putnicima poput tebe putem VibeSquad ili kao savršeno isplaniran dan s Privatnom turom. Jedna aplikacija. Tri načina. Nula turističkih zamki.",
    b1: "Licencirani lokalni vodiči", b2: "Odmah ili planirano", b3: "Prava lokalna veza",
    ctaPrimary: "Pronađi vodiča u Istanbulu", ctaSecondary: "Istraži Tursku",
  },
  phone: { live: "Uživo", greet: "Dobra večer" },
  phoneCards: {
    vibenow: "Dodirni. Spoji. Izađi na vrata za 60 sekundi.",
    vibesquad: "Pridruži se putnicima istim putem. Podijelite cijenu.",
    private: "Sam biraj vodiča. Planiraj savršen dan.",
  },
  energy: {
    eyebrow: "Živa energija grada",
    titleA: "Istanbul nikad ne staje.", titleB: "Uhvati ga dok je živ.",
    sub: "Puls ulica u stvarnom vremenu. Dok ovo čitaš, putnici i vodiči se spajaju, hodaju i otkrivaju.",
    s1: "Putnika istražuje Sultanahmet", s2: "VibeSquadova nastaje dnevno", s3: "Bosforska zalazna ruta u trendu", s4: "Vodiča Starog grada spremno za susret",
  },
  modesIntro: {
    eyebrow: "Tri načina. Jedno obećanje.",
    title: "Izaberi kako želiš upoznati svoj grad.",
    sub: "U zadnji čas i znatiželjan? Društven i s budžetom? Ili planiraš dan svog života? VibeGuide ima način za svakog putnika — izgrađen na pravim lokalnim vodičima, ne skriptama.",
  },
  modes: {
    vibenow: { tag: "VIBENOW · ODMAH", title: "Dodirni. Spoji. Kreni.",
      text: "Otvori aplikaciju i provjereni lokalac je na putu za manje od minute. Savršeno kada si tek sletio, tek se probudio ili odlučio \"hajde da radimo nešto danas\".",
      points: ["⚡ Spajanje u 60 sekundi", "📍 Pravi vodiči blizu tebe, sada", "🏛️ Muzeji, gastro ture, skrivene ulice"],
      cta: "Pronađi sada" },
    vibesquad: { tag: "VIBESQUAD · DRUŠTVENO", title: "Putujte zajedno. Plaćajte manje.",
      text: "Pokreni grupu ili se pridruži. Što više ljudi na istoj ruti, niža cijena po osobi. Isti vodič, isti grad, polovica cijene, deset puta više priča.",
      points: ["💸 Pametne grupne cijene", "🌍 Upoznaj putnike iz cijelog svijeta", "🤝 Sam? Par? Najbolje s prijateljima"],
      cta: "Stvori ili se pridruži" },
    private: { tag: "PRIVATNE · PLANIRANE", title: "Tvoj dan, savršeno skrojen.",
      text: "Biraj vodiča, jezik, tempo. Licencirani vodiči prave rutu samo za tebe — Aja Sofija u zoru, Bosfor čamcem, gastro tura noću.",
      points: ["🎓 Licencirani turistički vodiči", "🗣️ 9+ jezika", "🗺️ Prilagođene rute, nula iznenađenja"],
      cta: "Rezerviraj sada" },
  },
  manifesto: {
    eyebrow: "Zašto postoji VibeGuide",
    titleA: "Turizam je postao previše robotiziran.", titleB: "Vraćamo mu ljudski osjećaj.",
    sub: "Autobusne ture čitaju isti scenarij u svakom gradu. QR kodovi zamijenili su prave razgovore. Putnici provode više vremena u redovima nego otkrivajući. VibeGuide to preokreće. Jedan dodir, jedan lokalac, jedan pravi dan. Bez skripti. Bez zamki. Samo grad, ispričan od onoga tko ga živi.",
  },
  vibe: {
    title: "Istraži po raspoloženju",
    sub: "Izaberi osjećaj — mi ćemo spojiti mjesto i vodiča.",
    items: ["Povijest", "Hrana i piće", "Noćni život", "Bosfor", "Skriveni kafići", "Lokalne tržnice", "Foto lokacije", "Kulturna blaga"],
  },
  explore: {
    title: "Istraži Tursku", sub: "Mjesta koja putnici najviše traže.",
    istanbul: { title: "Istanbul ture", text: "Aja Sofija, Plava džamija, Topkapi palača, Veliki bazar, Bosfor, Balat, Galata i Stari Istanbul s lokalnim stručnjacima." },
    cappadocia: { title: "Kapadokija ture", text: "Vilini dimnjaci, špiljske crkve, doline i skrivene lokalne priče s vodičima u Kapadokiji." },
    ephesus: { title: "Efez ture", text: "Antičke ulice, rimska kazališta, hramovi i Knjižnica Celsa s licenciranim vodičima." },
  },
  trust: {
    title: "Povjerenje i sigurnost",
    items: [
      { title: "Licencirani vodiči", text: "Putuj s profesionalcima koji poznaju tursku kulturu, povijest i lokalna pravila." },
      { title: "Provjereni lokalni stručnjaci", text: "Profili se provjeravaju — osjećaj se sigurno prije susreta." },
      { title: "Jasni detalji iskustva", text: "Znaj rutu, trajanje, jezik, mjesto sastanka i očekivanja." },
      { title: "Bez turističkih zamki", text: "Dizajnirano za autentične trenutke i prave veze." },
    ],
    cta: "Vidi sve standarde sigurnosti →",
  },
  testimonials: {
    eyebrow: "Osjećaj putnika",
    title: "Grad se osjeća drugačije s pravim vodičem.",
    sub: "Voljen od putnika diljem svijeta.",
    quotes: [
      { quote: "Nije izgledalo kao tura, već kao otkrivanje Istanbula s lokalnim prijateljem.", name: "— Sarah, SAD" },
      { quote: "Savršeno za plan u zadnji čas. Našli smo vodiča i istražili bez stresa.", name: "— Marco, Italija" },
      { quote: "VibeSquad je iskustvo učinio društvenim, pristupačnim i puno zabavnijim.", name: "— Lina, Njemačka" },
    ],
  },
  download: { title: "Preuzmi VibeGuide", sub: "Trenutni lokalni vodiči, privatne ture i autentično otkrivanje gradova u Turskoj." },
  howItWorks: {
    eyebrow: "Jednostavno kao što može biti",
    titleA: "Vodič u džepu,",
    titleB: "grad u rukama.",
    steps: [
      { title: "Otvori aplikaciju", text: "Izaberi VibeNow za odmah, VibeSquad za grupu ili Privatno za cijeli dan." },
      { title: "Poveži se s vodičem", text: "Provjereni lokalni vodiči u blizini. Pravi ljudi, prava stručnost." },
      { title: "Izađi vani", text: "Za 60 sekundi s VibeNow. Bez planiranja, čekanja, turističkih zamki." },
    ],
  },
  turkey: {
    badge: "🇹🇷 Trenutno dostupno samo u Turskoj",
    titleA: "Počinjemo u Turskoj,",
    titleB: "uskoro globalno.",
    body: "VibeGuide je aktivan diljem Turske — Istanbul, Kapadokija i Efez su sljedeći. Brzo rastemo. Tvoj grad je na karti.",
    cities: ["🏙️ Istanbul", "🎈 Kapadokija", "🏛️ Efez"],
    more: "+ više uskoro",
    liveNow: "Aktivno sada",
  },
  nav2: { howItWorks: "Kako funkcionira" },
  footerLinks: { helpCenter: "Centar za pomoć", terms: "Uvjeti korištenja", privacy: "Privatnost", accountDeletion: "Brisanje računa" },
  footer: { tagline: "Trenutni lokalni vodiči, privatne ture, pješačke ture, grupne ture i autentična gradska iskustva u Turskoj.", product: "Proizvod", destinations: "Destinacije", support: "Podrška", copyright: "© 2026 VibeGuide. Sva prava pridržana." },
};

export const homeTranslations: Record<Locale, Dict> = {
  en, tr, de, ru, es, ja, zh, el, bg, sr, ko, it, hr,
  fr: en, ro: en,
};
