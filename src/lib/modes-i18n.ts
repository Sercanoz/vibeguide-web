// Mod sayfaları (vibenow / vibesquad / private / vibeask) çok-dilli içerik.
// MODE_CONTENT_I18N[slug][locale] -> ModeContent (yoksa en fallback, modes.ts'te).
// MODE_UI[locale] -> sayfa statik etiketleri + telefon mockup etiketleri.
// UTF-8: bu dosyayı sadece Write/Edit ile düzenle (echo/sed mojibake yapar).

import type { Locale } from "./i18n";
import type { ModeContent } from "./modes";

type ModeUi = {
  exploreTours: string;
  howItWorks: string;
  questions: string;
  otherWays: string;
  seeInApp: string;
  nowLabel: string; // telefon mockup: "Istanbul · now"
  liveLabel: string; // telefon mockup rozet: "LIVE"
  ctaSub: string; // CTA alt metni
};

// ── Statik UI etiketleri (21 dil) ────────────────────────────────────────────
export const MODE_UI: Record<Locale, ModeUi> = {
  en: {
    exploreTours: "Explore tours →",
    howItWorks: "How it works",
    questions: "Questions",
    otherWays: "The other ways to explore",
    seeInApp: "See it in the app",
    nowLabel: "Istanbul · now",
    liveLabel: "LIVE",
    ctaSub: "Download VibeGuide free and start exploring.",
  },
  tr: {
    exploreTours: "Turları keşfet →",
    howItWorks: "Nasıl çalışır",
    questions: "Sorular",
    otherWays: "Keşfetmenin diğer yolları",
    seeInApp: "Uygulamada gör",
    nowLabel: "İstanbul · şimdi",
    liveLabel: "CANLI",
    ctaSub: "VibeGuide'ı ücretsiz indir ve keşfetmeye başla.",
  },
  zh: {
    exploreTours: "探索导览 →",
    howItWorks: "如何运作",
    questions: "常见问题",
    otherWays: "其他探索方式",
    seeInApp: "在应用中查看",
    nowLabel: "伊斯坦布尔 · 现在",
    liveLabel: "直播中",
    ctaSub: "免费下载 VibeGuide，开始探索吧。",
  },
  ja: {
    exploreTours: "ツアーを探す →",
    howItWorks: "使い方",
    questions: "よくある質問",
    otherWays: "ほかの探索方法",
    seeInApp: "アプリで見る",
    nowLabel: "イスタンブール · 現在",
    liveLabel: "ライブ",
    ctaSub: "VibeGuide を無料でダウンロードして、探索を始めましょう。",
  },
  ko: {
    exploreTours: "투어 둘러보기 →",
    howItWorks: "이용 방법",
    questions: "자주 묻는 질문",
    otherWays: "다른 탐험 방법",
    seeInApp: "앱에서 보기",
    nowLabel: "이스탄불 · 지금",
    liveLabel: "라이브",
    ctaSub: "VibeGuide를 무료로 다운로드하고 탐험을 시작하세요.",
  },
  ar: {
    exploreTours: "استكشف الجولات →",
    howItWorks: "كيف يعمل",
    questions: "الأسئلة الشائعة",
    otherWays: "الطرق الأخرى للاستكشاف",
    seeInApp: "شاهده في التطبيق",
    nowLabel: "إسطنبول · الآن",
    liveLabel: "مباشر",
    ctaSub: "نزّل VibeGuide مجانًا وابدأ الاستكشاف.",
  },
  hr: {
    exploreTours: "Istraži ture →",
    howItWorks: "Kako funkcionira",
    questions: "Pitanja",
    otherWays: "Drugi načini istraživanja",
    seeInApp: "Pogledaj u aplikaciji",
    nowLabel: "Istanbul · sada",
    liveLabel: "UŽIVO",
    ctaSub: "Preuzmi VibeGuide besplatno i počni istraživati.",
  },
  id: {
    exploreTours: "Jelajahi tur →",
    howItWorks: "Cara kerjanya",
    questions: "Pertanyaan",
    otherWays: "Cara lain untuk menjelajah",
    seeInApp: "Lihat di aplikasi",
    nowLabel: "Istanbul · sekarang",
    liveLabel: "LANGSUNG",
    ctaSub: "Unduh VibeGuide gratis dan mulai menjelajah.",
  },
  de: {
    exploreTours: "Touren entdecken →",
    howItWorks: "So funktioniert's",
    questions: "Fragen",
    otherWays: "Die anderen Wege zu entdecken",
    seeInApp: "In der App ansehen",
    nowLabel: "Istanbul · jetzt",
    liveLabel: "LIVE",
    ctaSub: "Lade VibeGuide kostenlos herunter und beginne zu entdecken.",
  },
  fr: {
    exploreTours: "Explorer les visites →",
    howItWorks: "Comment ça marche",
    questions: "Questions",
    otherWays: "Les autres façons d'explorer",
    seeInApp: "Voir dans l'application",
    nowLabel: "Istanbul · maintenant",
    liveLabel: "EN DIRECT",
    ctaSub: "Téléchargez VibeGuide gratuitement et commencez à explorer.",
  },
  es: {
    exploreTours: "Explorar tours →",
    howItWorks: "Cómo funciona",
    questions: "Preguntas",
    otherWays: "Las otras formas de explorar",
    seeInApp: "Verlo en la app",
    nowLabel: "Estambul · ahora",
    liveLabel: "EN VIVO",
    ctaSub: "Descarga VibeGuide gratis y empieza a explorar.",
  },
  it: {
    exploreTours: "Esplora i tour →",
    howItWorks: "Come funziona",
    questions: "Domande",
    otherWays: "Gli altri modi per esplorare",
    seeInApp: "Guarda nell'app",
    nowLabel: "Istanbul · ora",
    liveLabel: "LIVE",
    ctaSub: "Scarica VibeGuide gratis e inizia a esplorare.",
  },
  nl: {
    exploreTours: "Tours ontdekken →",
    howItWorks: "Hoe het werkt",
    questions: "Vragen",
    otherWays: "De andere manieren om te ontdekken",
    seeInApp: "Bekijk het in de app",
    nowLabel: "Istanbul · nu",
    liveLabel: "LIVE",
    ctaSub: "Download VibeGuide gratis en begin met ontdekken.",
  },
  pt: {
    exploreTours: "Explorar tours →",
    howItWorks: "Como funciona",
    questions: "Perguntas",
    otherWays: "As outras formas de explorar",
    seeInApp: "Ver na aplicação",
    nowLabel: "Istambul · agora",
    liveLabel: "AO VIVO",
    ctaSub: "Baixe o VibeGuide gratuitamente e comece a explorar.",
  },
  pl: {
    exploreTours: "Odkrywaj wycieczki →",
    howItWorks: "Jak to działa",
    questions: "Pytania",
    otherWays: "Inne sposoby na zwiedzanie",
    seeInApp: "Zobacz w aplikacji",
    nowLabel: "Stambuł · teraz",
    liveLabel: "NA ŻYWO",
    ctaSub: "Pobierz VibeGuide za darmo i zacznij zwiedzać.",
  },
  ru: {
    exploreTours: "Смотреть туры →",
    howItWorks: "Как это работает",
    questions: "Вопросы",
    otherWays: "Другие способы исследовать",
    seeInApp: "Посмотреть в приложении",
    nowLabel: "Стамбул · сейчас",
    liveLabel: "В ЭФИРЕ",
    ctaSub: "Скачайте VibeGuide бесплатно и начните исследовать.",
  },
  uk: {
    exploreTours: "Переглянути тури →",
    howItWorks: "Як це працює",
    questions: "Запитання",
    otherWays: "Інші способи досліджувати",
    seeInApp: "Подивитися в застосунку",
    nowLabel: "Стамбул · зараз",
    liveLabel: "НАЖИВО",
    ctaSub: "Завантажте VibeGuide безкоштовно та починайте досліджувати.",
  },
  bg: {
    exploreTours: "Разгледай турове →",
    howItWorks: "Как работи",
    questions: "Въпроси",
    otherWays: "Другите начини да изследваш",
    seeInApp: "Виж в приложението",
    nowLabel: "Истанбул · сега",
    liveLabel: "НА ЖИВО",
    ctaSub: "Изтегли VibeGuide безплатно и започни да изследваш.",
  },
  sr: {
    exploreTours: "Istraži ture →",
    howItWorks: "Kako funkcioniše",
    questions: "Pitanja",
    otherWays: "Drugi načini za istraživanje",
    seeInApp: "Pogledaj u aplikaciji",
    nowLabel: "Istanbul · sada",
    liveLabel: "UŽIVO",
    ctaSub: "Preuzmi VibeGuide besplatno i počni da istražuješ.",
  },
  el: {
    exploreTours: "Εξερεύνησε ξεναγήσεις →",
    howItWorks: "Πώς λειτουργεί",
    questions: "Ερωτήσεις",
    otherWays: "Οι άλλοι τρόποι εξερεύνησης",
    seeInApp: "Δες το στην εφαρμογή",
    nowLabel: "Κωνσταντινούπολη · τώρα",
    liveLabel: "ΖΩΝΤΑΝΑ",
    ctaSub: "Κατέβασε το VibeGuide δωρεάν και ξεκίνα την εξερεύνηση.",
  },
  ro: {
    exploreTours: "Explorează tururi →",
    howItWorks: "Cum funcționează",
    questions: "Întrebări",
    otherWays: "Celelalte moduri de a explora",
    seeInApp: "Vezi în aplicație",
    nowLabel: "Istanbul · acum",
    liveLabel: "ÎN DIRECT",
    ctaSub: "Descarcă VibeGuide gratuit și începe să explorezi.",
  },
};

// ── Mod içerikleri (slug -> locale -> ModeContent) ───────────────────────────
export const MODE_CONTENT_I18N: Record<string, Partial<Record<Locale, ModeContent>>> = {
  vibenow: {
    en: {
      tagline: "Tap. Match. Go.",
      heroSub:
        "The fastest way to explore. Open the app, choose where you are, and match with a verified local guide nearby — usually in under a minute.",
      steps: [
        { title: "Open the app", desc: "Choose VibeNow and share where you'd like to explore." },
        { title: "Match in ~60s", desc: "A verified guide nearby accepts your request in real time." },
        { title: "Meet your local", desc: "See their location live and meet within minutes." },
        { title: "Explore & pay in-app", desc: "Walk the city with a real local. Pay securely, no cash." },
      ],
      benefits: [
        { title: "No planning needed", desc: "Spontaneous? Just open and go — made for travellers who hate rigid schedules." },
        { title: "Real-time location", desc: "Watch your guide approach on the map, like a ride app for local experts." },
        { title: "Transparent price", desc: "See the price before you confirm. No tourist-trap surprises." },
      ],
      faqs: [
        { q: "How fast is VibeNow really?", a: "Most matches happen in under a minute when guides are online nearby. The app shows who's available before you request." },
        { q: "What if no guide is available?", a: "If nobody's free right now, the app tells you immediately and suggests a VibeSquad group or a Private tour instead." },
        { q: "How do I pay?", a: "Securely in the app — no cash needed, and you see the price up front." },
      ],
      ctaTitle: "Ready to explore right now?",
    },
    tr: {
      tagline: "Dokun. Eşleş. Keşfet.",
      heroSub:
        "Keşfetmenin en hızlı yolu. Uygulamayı aç, nerede olduğunu seç ve yakınındaki doğrulanmış bir yerel rehberle eşleş — genellikle bir dakikadan kısa sürede.",
      steps: [
        { title: "Uygulamayı aç", desc: "VibeNow'u seç ve nerede keşfetmek istediğini paylaş." },
        { title: "~60 sn'de eşleş", desc: "Yakınındaki doğrulanmış bir rehber talebini anında kabul eder." },
        { title: "Yerelinle buluş", desc: "Konumunu canlı gör ve dakikalar içinde buluş." },
        { title: "Keşfet, uygulamadan öde", desc: "Şehri gerçek bir yerelle gez. Güvenle öde, nakit yok." },
      ],
      benefits: [
        { title: "Plan gerekmez", desc: "Spontane misin? Aç ve git — katı programlardan hoşlanmayan gezginler için." },
        { title: "Canlı konum", desc: "Rehberinin haritada yaklaştığını izle — yerel uzmanlar için çağrı uygulaması gibi." },
        { title: "Şeffaf fiyat", desc: "Onaylamadan önce fiyatı gör. Turist tuzağı sürprizi yok." },
      ],
      faqs: [
        { q: "VibeNow gerçekten ne kadar hızlı?", a: "Yakında çevrimiçi rehber varsa çoğu eşleşme bir dakikadan kısa sürede olur. Uygulama, talep etmeden önce kimin müsait olduğunu gösterir." },
        { q: "Hiç rehber müsait değilse?", a: "Şu an kimse boş değilse uygulama bunu anında söyler ve yerine VibeSquad grubu veya Özel tur önerir." },
        { q: "Nasıl öderim?", a: "Uygulamadan güvenle — nakit gerekmez ve fiyatı önceden görürsün." },
      ],
      ctaTitle: "Hemen keşfetmeye hazır mısın?",
    },
    zh: {
      tagline: "轻点。匹配。出发。",
      heroSub:
        "最快的探索方式。打开应用，选择你所在的位置，立即与附近经过验证的当地向导匹配——通常不到一分钟。",
      steps: [
        { title: "打开应用", desc: "选择 VibeNow，分享你想探索的地点。" },
        { title: "约 60 秒内匹配", desc: "附近经过验证的向导会实时接受你的请求。" },
        { title: "与当地人见面", desc: "实时查看他们的位置，几分钟内即可见面。" },
        { title: "边探索边在应用内付款", desc: "和真正的当地人漫步城市。安全付款，无需现金。" },
      ],
      benefits: [
        { title: "无需规划", desc: "想说走就走？打开就出发——专为讨厌死板行程的旅行者打造。" },
        { title: "实时定位", desc: "在地图上看着向导靠近，就像本地专家的打车应用。" },
        { title: "价格透明", desc: "确认前先看价格。没有旅游陷阱的意外。" },
      ],
      faqs: [
        { q: "VibeNow 到底有多快？", a: "当附近有在线向导时，大多数匹配不到一分钟即可完成。应用会在你发起请求前显示谁有空。" },
        { q: "如果没有向导有空怎么办？", a: "如果此刻没人有空，应用会立即告诉你，并改为推荐 VibeSquad 团队或私人导览。" },
        { q: "我如何付款？", a: "在应用内安全付款——无需现金，而且价格一目了然。" },
      ],
      ctaTitle: "准备好现在就去探索了吗？",
    },
    ja: {
      tagline: "タップ。マッチ。出発。",
      heroSub:
        "もっとも速い探索方法。アプリを開いて、今いる場所を選べば、近くの認証済み地元ガイドとマッチ——たいてい1分以内に。",
      steps: [
        { title: "アプリを開く", desc: "VibeNow を選び、探索したい場所を共有しましょう。" },
        { title: "約60秒でマッチ", desc: "近くの認証済みガイドがリアルタイムであなたのリクエストを承認します。" },
        { title: "地元ガイドと会う", desc: "位置情報をライブで確認し、数分以内に合流できます。" },
        { title: "探索してアプリ内で支払い", desc: "本物の地元の人と街を歩こう。安全に支払い、現金不要。" },
      ],
      benefits: [
        { title: "計画不要", desc: "思いつき派？開いてすぐ出発——きっちりした予定が苦手な旅行者のために。" },
        { title: "リアルタイム位置情報", desc: "地図上でガイドが近づく様子を確認——地元の専門家版の配車アプリのように。" },
        { title: "透明な料金", desc: "確定前に料金を確認。観光客向けの不意な追加料金はありません。" },
      ],
      faqs: [
        { q: "VibeNow は実際どれくらい速いの？", a: "近くにオンラインのガイドがいれば、ほとんどのマッチは1分以内に成立します。リクエスト前に誰が対応可能かをアプリが表示します。" },
        { q: "対応できるガイドがいなかったら？", a: "今すぐ空いている人がいない場合、アプリがすぐに知らせ、代わりに VibeSquad グループやプライベートツアーを提案します。" },
        { q: "支払いはどうするの？", a: "アプリ内で安全に——現金不要で、料金は前もって確認できます。" },
      ],
      ctaTitle: "今すぐ探索する準備はできましたか？",
    },
    ko: {
      tagline: "탭. 매칭. 출발.",
      heroSub:
        "가장 빠른 탐험 방법. 앱을 열고, 지금 위치를 선택하면 근처의 인증된 현지 가이드와 매칭됩니다 — 보통 1분 이내에.",
      steps: [
        { title: "앱 열기", desc: "VibeNow를 선택하고 탐험하고 싶은 곳을 공유하세요." },
        { title: "약 60초 내 매칭", desc: "근처의 인증된 가이드가 실시간으로 요청을 수락합니다." },
        { title: "현지인 만나기", desc: "위치를 실시간으로 확인하고 몇 분 안에 만나세요." },
        { title: "탐험하고 앱에서 결제", desc: "진짜 현지인과 도시를 거닐어 보세요. 현금 없이 안전하게 결제." },
      ],
      benefits: [
        { title: "계획 불필요", desc: "즉흥적인가요? 그냥 열고 출발하세요 — 빡빡한 일정이 싫은 여행자를 위해." },
        { title: "실시간 위치", desc: "지도에서 가이드가 다가오는 모습을 확인하세요. 현지 전문가용 차량 호출 앱처럼." },
        { title: "투명한 가격", desc: "확정 전에 가격을 확인하세요. 관광객 바가지 같은 깜짝 비용은 없습니다." },
      ],
      faqs: [
        { q: "VibeNow는 실제로 얼마나 빠른가요?", a: "근처에 온라인 가이드가 있으면 대부분의 매칭이 1분 이내에 이루어집니다. 요청 전에 누가 가능한지 앱에서 보여줍니다." },
        { q: "가능한 가이드가 없으면 어떡하죠?", a: "지금 당장 가능한 사람이 없으면 앱이 즉시 알려주고, 대신 VibeSquad 그룹이나 프라이빗 투어를 추천합니다." },
        { q: "결제는 어떻게 하나요?", a: "앱에서 안전하게 — 현금이 필요 없고 가격을 미리 확인할 수 있습니다." },
      ],
      ctaTitle: "지금 바로 탐험할 준비가 되셨나요?",
    },
    ar: {
      tagline: "انقر. طابِق. انطلق.",
      heroSub:
        "أسرع طريقة للاستكشاف. افتح التطبيق، اختر مكانك، وطابِق مع مرشد محلي موثوق قريب منك — عادةً في أقل من دقيقة.",
      steps: [
        { title: "افتح التطبيق", desc: "اختر VibeNow وشارك المكان الذي تريد استكشافه." },
        { title: "طابِق خلال ~60 ثانية", desc: "يقبل مرشد موثوق قريب طلبك في الوقت الفعلي." },
        { title: "قابِل مرشدك المحلي", desc: "شاهد موقعه مباشرةً وقابله خلال دقائق." },
        { title: "استكشف وادفع داخل التطبيق", desc: "تجوّل في المدينة مع شخص محلي حقيقي. ادفع بأمان دون نقود." },
      ],
      benefits: [
        { title: "لا حاجة للتخطيط", desc: "عفوي؟ ما عليك سوى الفتح والانطلاق — مصمم للمسافرين الذين يكرهون الجداول الصارمة." },
        { title: "موقع في الوقت الفعلي", desc: "راقب مرشدك يقترب على الخريطة، مثل تطبيق توصيل لخبراء محليين." },
        { title: "سعر شفّاف", desc: "شاهد السعر قبل أن تؤكد. لا مفاجآت تتعلق بفخاخ السياح." },
      ],
      faqs: [
        { q: "ما مدى سرعة VibeNow فعلاً؟", a: "تتم معظم المطابقات في أقل من دقيقة عندما يكون هناك مرشدون متصلون قريبون. يعرض لك التطبيق من المتاح قبل أن تطلب." },
        { q: "ماذا لو لم يتوفر أي مرشد؟", a: "إذا لم يكن أحد متاحًا الآن، يخبرك التطبيق فورًا ويقترح بدلاً من ذلك مجموعة VibeSquad أو جولة خاصة." },
        { q: "كيف أدفع؟", a: "بأمان داخل التطبيق — دون حاجة إلى نقود، وترى السعر مسبقًا." },
      ],
      ctaTitle: "هل أنت مستعد للاستكشاف الآن؟",
    },
    hr: {
      tagline: "Dodirni. Spoji se. Kreni.",
      heroSub:
        "Najbrži način za istraživanje. Otvori aplikaciju, odaberi gdje se nalaziš i spoji se s provjerenim lokalnim vodičem u blizini — obično za manje od minute.",
      steps: [
        { title: "Otvori aplikaciju", desc: "Odaberi VibeNow i podijeli gdje želiš istraživati." },
        { title: "Spajanje za ~60 s", desc: "Provjereni vodič u blizini prihvaća tvoj zahtjev u stvarnom vremenu." },
        { title: "Upoznaj svog lokalca", desc: "Vidi njegovu lokaciju uživo i nađite se za nekoliko minuta." },
        { title: "Istraži i plati u aplikaciji", desc: "Prošeći gradom s pravim lokalcem. Plati sigurno, bez gotovine." },
      ],
      benefits: [
        { title: "Bez planiranja", desc: "Spontan? Samo otvori i kreni — stvoreno za putnike koji mrze krute rasporede." },
        { title: "Lokacija u stvarnom vremenu", desc: "Gledaj kako ti se vodič približava na karti, poput aplikacije za prijevoz za lokalne stručnjake." },
        { title: "Transparentna cijena", desc: "Vidi cijenu prije nego potvrdiš. Bez iznenađenja iz turističkih zamki." },
      ],
      faqs: [
        { q: "Koliko je VibeNow zaista brz?", a: "Većina spajanja dogodi se za manje od minute kad su vodiči online u blizini. Aplikacija prikazuje tko je dostupan prije nego zatražiš." },
        { q: "Što ako nijedan vodič nije dostupan?", a: "Ako trenutno nitko nije slobodan, aplikacija ti to odmah javlja i umjesto toga predlaže VibeSquad grupu ili Privatnu turu." },
        { q: "Kako plaćam?", a: "Sigurno u aplikaciji — bez gotovine, a cijenu vidiš unaprijed." },
      ],
      ctaTitle: "Spreman za istraživanje odmah?",
    },
    id: {
      tagline: "Ketuk. Cocokkan. Berangkat.",
      heroSub:
        "Cara tercepat untuk menjelajah. Buka aplikasi, pilih lokasimu, dan cocokkan dengan pemandu lokal terverifikasi di dekatmu — biasanya dalam waktu kurang dari satu menit.",
      steps: [
        { title: "Buka aplikasi", desc: "Pilih VibeNow dan bagikan tempat yang ingin kamu jelajahi." },
        { title: "Cocok dalam ~60 detik", desc: "Pemandu terverifikasi di dekatmu menerima permintaanmu secara langsung." },
        { title: "Temui pemandu lokalmu", desc: "Lihat lokasinya secara langsung dan bertemu dalam hitungan menit." },
        { title: "Jelajahi & bayar di aplikasi", desc: "Susuri kota dengan orang lokal sungguhan. Bayar dengan aman, tanpa tunai." },
      ],
      benefits: [
        { title: "Tanpa perlu rencana", desc: "Spontan? Cukup buka dan berangkat — dibuat untuk pelancong yang benci jadwal kaku." },
        { title: "Lokasi waktu nyata", desc: "Lihat pemandumu mendekat di peta, seperti aplikasi transportasi untuk pakar lokal." },
        { title: "Harga transparan", desc: "Lihat harga sebelum kamu konfirmasi. Tanpa kejutan jebakan turis." },
      ],
      faqs: [
        { q: "Seberapa cepat VibeNow sebenarnya?", a: "Sebagian besar kecocokan terjadi dalam waktu kurang dari satu menit saat ada pemandu online di dekatmu. Aplikasi menampilkan siapa yang tersedia sebelum kamu meminta." },
        { q: "Bagaimana jika tidak ada pemandu yang tersedia?", a: "Jika tidak ada yang luang saat ini, aplikasi langsung memberitahumu dan menyarankan grup VibeSquad atau Tur Pribadi sebagai gantinya." },
        { q: "Bagaimana cara saya membayar?", a: "Dengan aman di aplikasi — tanpa tunai, dan kamu melihat harganya di awal." },
      ],
      ctaTitle: "Siap menjelajah sekarang juga?",
    },
    ru: {
      tagline: "Нажми. Найди. Иди.",
      heroSub:
        "Самый быстрый способ исследовать. Откройте приложение, выберите, где вы находитесь, и найдите проверенного местного гида поблизости — обычно меньше чем за минуту.",
      steps: [
        { title: "Откройте приложение", desc: "Выберите VibeNow и укажите, где хотите исследовать." },
        { title: "Совпадение за ~60 с", desc: "Проверенный гид поблизости принимает ваш запрос в реальном времени." },
        { title: "Встретьте своего местного", desc: "Смотрите его местоположение в реальном времени и встретьтесь за считаные минуты." },
        { title: "Исследуйте и платите в приложении", desc: "Гуляйте по городу с настоящим местным. Платите безопасно, без наличных." },
      ],
      benefits: [
        { title: "Без планирования", desc: "Спонтанно? Просто откройте и идите — для путешественников, которые не любят жёсткие графики." },
        { title: "Местоположение в реальном времени", desc: "Следите, как гид приближается на карте, словно приложение для вызова местных экспертов." },
        { title: "Прозрачная цена", desc: "Видите цену до подтверждения. Без сюрпризов туристических ловушек." },
      ],
      faqs: [
        { q: "Насколько быстр VibeNow на самом деле?", a: "Большинство совпадений происходит меньше чем за минуту, когда поблизости есть гиды онлайн. Приложение показывает, кто доступен, ещё до запроса." },
        { q: "Что если нет доступного гида?", a: "Если сейчас никто не свободен, приложение сразу сообщит об этом и предложит вместо этого группу VibeSquad или частный тур." },
        { q: "Как я плачу?", a: "Безопасно в приложении — наличные не нужны, и вы видите цену заранее." },
      ],
      ctaTitle: "Готовы исследовать прямо сейчас?",
    },
    uk: {
      tagline: "Торкнись. Знайди. Іди.",
      heroSub:
        "Найшвидший спосіб досліджувати. Відкрийте застосунок, виберіть, де ви перебуваєте, і знайдіть перевіреного місцевого гіда поблизу — зазвичай менш ніж за хвилину.",
      steps: [
        { title: "Відкрийте застосунок", desc: "Виберіть VibeNow і вкажіть, де хочете досліджувати." },
        { title: "Збіг за ~60 с", desc: "Перевірений гід поблизу приймає ваш запит у реальному часі." },
        { title: "Зустріньте свого місцевого", desc: "Дивіться його місцезнаходження наживо й зустріньтеся за лічені хвилини." },
        { title: "Досліджуйте та платіть у застосунку", desc: "Гуляйте містом зі справжнім місцевим. Платіть безпечно, без готівки." },
      ],
      benefits: [
        { title: "Без планування", desc: "Спонтанно? Просто відкрийте та йдіть — для мандрівників, які не люблять жорсткі графіки." },
        { title: "Місцезнаходження в реальному часі", desc: "Стежте, як гід наближається на карті, наче застосунок виклику місцевих експертів." },
        { title: "Прозора ціна", desc: "Бачите ціну до підтвердження. Без сюрпризів туристичних пасток." },
      ],
      faqs: [
        { q: "Наскільки швидкий VibeNow насправді?", a: "Більшість збігів відбувається менш ніж за хвилину, коли поблизу є гіди онлайн. Застосунок показує, хто доступний, ще до запиту." },
        { q: "Що, якщо немає доступного гіда?", a: "Якщо зараз ніхто не вільний, застосунок одразу повідомить про це й запропонує натомість групу VibeSquad або приватний тур." },
        { q: "Як я плачу?", a: "Безпечно в застосунку — готівка не потрібна, і ви бачите ціну заздалегідь." },
      ],
      ctaTitle: "Готові досліджувати просто зараз?",
    },
    bg: {
      tagline: "Докосни. Свържи се. Тръгвай.",
      heroSub:
        "Най-бързият начин да изследваш. Отвори приложението, избери къде се намираш и се свържи с проверен местен гид наблизо — обикновено за по-малко от минута.",
      steps: [
        { title: "Отвори приложението", desc: "Избери VibeNow и сподели къде искаш да изследваш." },
        { title: "Свързване за ~60 сек", desc: "Проверен гид наблизо приема заявката ти в реално време." },
        { title: "Срещни своя местен", desc: "Виж местоположението му на живо и се срещнете за минути." },
        { title: "Изследвай и плати в приложението", desc: "Разходи се из града с истински местен. Плати сигурно, без пари в брой." },
      ],
      benefits: [
        { title: "Без нужда от планиране", desc: "Спонтанен? Просто отвори и тръгвай — създадено за пътешественици, които мразят твърди графици." },
        { title: "Местоположение в реално време", desc: "Наблюдавай как гидът ти приближава на картата, като приложение за повикване на местни експерти." },
        { title: "Прозрачна цена", desc: "Виж цената преди да потвърдиш. Без изненади от туристически капани." },
      ],
      faqs: [
        { q: "Колко бърз е VibeNow всъщност?", a: "Повечето свързвания стават за по-малко от минута, когато наблизо има гидове онлайн. Приложението показва кой е свободен още преди да поискаш." },
        { q: "Какво, ако няма свободен гид?", a: "Ако в момента никой не е свободен, приложението веднага ти казва и предлага вместо това група VibeSquad или частен тур." },
        { q: "Как плащам?", a: "Сигурно в приложението — без нужда от пари в брой и виждаш цената предварително." },
      ],
      ctaTitle: "Готов ли си да изследваш точно сега?",
    },
    sr: {
      tagline: "Dodirni. Spoji se. Kreni.",
      heroSub:
        "Najbrži način za istraživanje. Otvori aplikaciju, izaberi gde se nalaziš i spoji se sa proverenim lokalnim vodičem u blizini — obično za manje od minuta.",
      steps: [
        { title: "Otvori aplikaciju", desc: "Izaberi VibeNow i podeli gde želiš da istražuješ." },
        { title: "Spajanje za ~60 s", desc: "Provereni vodič u blizini prihvata tvoj zahtev u realnom vremenu." },
        { title: "Upoznaj svog lokalca", desc: "Vidi njegovu lokaciju uživo i nađite se za nekoliko minuta." },
        { title: "Istraži i plati u aplikaciji", desc: "Prošetaj gradom sa pravim lokalcem. Plati bezbedno, bez gotovine." },
      ],
      benefits: [
        { title: "Bez planiranja", desc: "Spontan? Samo otvori i kreni — stvoreno za putnike koji mrze krute rasporede." },
        { title: "Lokacija u realnom vremenu", desc: "Gledaj kako ti se vodič približava na mapi, poput aplikacije za prevoz za lokalne stručnjake." },
        { title: "Transparentna cena", desc: "Vidi cenu pre nego što potvrdiš. Bez iznenađenja iz turističkih zamki." },
      ],
      faqs: [
        { q: "Koliko je VibeNow zaista brz?", a: "Većina spajanja se dogodi za manje od minuta kada su vodiči onlajn u blizini. Aplikacija prikazuje ko je dostupan pre nego što zatražiš." },
        { q: "Šta ako nijedan vodič nije dostupan?", a: "Ako trenutno niko nije slobodan, aplikacija ti to odmah javlja i umesto toga predlaže VibeSquad grupu ili Privatnu turu." },
        { q: "Kako plaćam?", a: "Bezbedno u aplikaciji — bez gotovine, a cenu vidiš unapred." },
      ],
      ctaTitle: "Spreman za istraživanje odmah?",
    },
    el: {
      tagline: "Πάτα. Ταίριαξε. Φύγαμε.",
      heroSub:
        "Ο πιο γρήγορος τρόπος εξερεύνησης. Άνοιξε την εφαρμογή, διάλεξε πού βρίσκεσαι και ταίριαξε με έναν επαληθευμένο ντόπιο ξεναγό κοντά σου — συνήθως σε λιγότερο από ένα λεπτό.",
      steps: [
        { title: "Άνοιξε την εφαρμογή", desc: "Διάλεξε το VibeNow και μοιράσου πού θέλεις να εξερευνήσεις." },
        { title: "Ταίριασμα σε ~60 δλ", desc: "Ένας επαληθευμένος ξεναγός κοντά σου αποδέχεται το αίτημά σου σε πραγματικό χρόνο." },
        { title: "Συνάντησε τον ντόπιο σου", desc: "Δες την τοποθεσία του ζωντανά και συναντηθείτε μέσα σε λίγα λεπτά." },
        { title: "Εξερεύνησε & πλήρωσε στην εφαρμογή", desc: "Περπάτησε την πόλη με έναν πραγματικό ντόπιο. Πλήρωσε με ασφάλεια, χωρίς μετρητά." },
      ],
      benefits: [
        { title: "Χωρίς προγραμματισμό", desc: "Αυθόρμητος; Απλώς άνοιξε και φύγε — φτιαγμένο για ταξιδιώτες που μισούν τα άκαμπτα προγράμματα." },
        { title: "Τοποθεσία σε πραγματικό χρόνο", desc: "Δες τον ξεναγό σου να πλησιάζει στον χάρτη, σαν εφαρμογή μεταφοράς για ντόπιους ειδικούς." },
        { title: "Διαφανής τιμή", desc: "Δες την τιμή πριν επιβεβαιώσεις. Χωρίς εκπλήξεις από τουριστικές παγίδες." },
      ],
      faqs: [
        { q: "Πόσο γρήγορο είναι πραγματικά το VibeNow;", a: "Τα περισσότερα ταιριάσματα γίνονται σε λιγότερο από ένα λεπτό όταν υπάρχουν ξεναγοί online κοντά. Η εφαρμογή δείχνει ποιος είναι διαθέσιμος πριν καν ζητήσεις." },
        { q: "Τι γίνεται αν δεν υπάρχει διαθέσιμος ξεναγός;", a: "Αν κανείς δεν είναι ελεύθερος αυτή τη στιγμή, η εφαρμογή σου το λέει αμέσως και προτείνει αντ' αυτού μια ομάδα VibeSquad ή μια Ιδιωτική ξενάγηση." },
        { q: "Πώς πληρώνω;", a: "Με ασφάλεια μέσα στην εφαρμογή — χωρίς μετρητά, και βλέπεις την τιμή εκ των προτέρων." },
      ],
      ctaTitle: "Έτοιμος να εξερευνήσεις τώρα αμέσως;",
    },
    ro: {
      tagline: "Atinge. Conectează-te. Pornește.",
      heroSub:
        "Cel mai rapid mod de a explora. Deschide aplicația, alege unde te afli și conectează-te cu un ghid local verificat din apropiere — de obicei în mai puțin de un minut.",
      steps: [
        { title: "Deschide aplicația", desc: "Alege VibeNow și spune unde vrei să explorezi." },
        { title: "Potrivire în ~60 s", desc: "Un ghid verificat din apropiere îți acceptă cererea în timp real." },
        { title: "Întâlnește-ți localnicul", desc: "Vezi-i locația în timp real și întâlniți-vă în câteva minute." },
        { title: "Explorează și plătește în aplicație", desc: "Plimbă-te prin oraș cu un localnic adevărat. Plătește în siguranță, fără numerar." },
      ],
      benefits: [
        { title: "Fără planificare", desc: "Spontan? Doar deschide și pornește — făcut pentru călătorii care urăsc programele rigide." },
        { title: "Locație în timp real", desc: "Urmărește cum ghidul tău se apropie pe hartă, ca o aplicație de transport pentru experți locali." },
        { title: "Preț transparent", desc: "Vezi prețul înainte să confirmi. Fără surprize din capcanele pentru turiști." },
      ],
      faqs: [
        { q: "Cât de rapid este VibeNow cu adevărat?", a: "Majoritatea potrivirilor se fac în mai puțin de un minut când există ghizi online în apropiere. Aplicația îți arată cine este disponibil înainte să ceri." },
        { q: "Ce se întâmplă dacă niciun ghid nu este disponibil?", a: "Dacă nimeni nu este liber acum, aplicația îți spune imediat și îți sugerează în schimb un grup VibeSquad sau un tur privat." },
        { q: "Cum plătesc?", a: "În siguranță în aplicație — fără numerar, iar prețul îl vezi din start." },
      ],
      ctaTitle: "Gata să explorezi chiar acum?",
    },
    de: {
      tagline: "Tippen. Matchen. Los.",
      heroSub:
        "Der schnellste Weg zu entdecken. Öffne die App, wähle, wo du bist, und matche mit einem verifizierten lokalen Guide in der Nähe — meist in unter einer Minute.",
      steps: [
        { title: "Öffne die App", desc: "Wähle VibeNow und teile mit, wo du erkunden möchtest." },
        { title: "Match in ~60 Sek.", desc: "Ein verifizierter Guide in der Nähe nimmt deine Anfrage in Echtzeit an." },
        { title: "Triff deinen Local", desc: "Sieh seinen Standort live und triff ihn in wenigen Minuten." },
        { title: "Entdecken & in der App zahlen", desc: "Erkunde die Stadt mit einem echten Local. Zahle sicher, kein Bargeld." },
      ],
      benefits: [
        { title: "Keine Planung nötig", desc: "Spontan? Einfach öffnen und los — gemacht für Reisende, die starre Zeitpläne hassen." },
        { title: "Echtzeit-Standort", desc: "Beobachte, wie dein Guide auf der Karte näher kommt, wie eine Fahrdienst-App für lokale Experten." },
        { title: "Transparenter Preis", desc: "Sieh den Preis, bevor du bestätigst. Keine Touristenfallen-Überraschungen." },
      ],
      faqs: [
        { q: "Wie schnell ist VibeNow wirklich?", a: "Die meisten Matches passieren in unter einer Minute, wenn Guides in der Nähe online sind. Die App zeigt, wer verfügbar ist, bevor du anfragst." },
        { q: "Was, wenn kein Guide verfügbar ist?", a: "Wenn gerade niemand frei ist, sagt dir die App das sofort und schlägt stattdessen eine VibeSquad-Gruppe oder eine private Tour vor." },
        { q: "Wie bezahle ich?", a: "Sicher in der App — kein Bargeld nötig, und du siehst den Preis im Voraus." },
      ],
      ctaTitle: "Bereit, jetzt sofort zu entdecken?",
    },
    fr: {
      tagline: "Touchez. Matchez. Partez.",
      heroSub:
        "Le moyen le plus rapide d'explorer. Ouvrez l'application, choisissez où vous êtes et matchez avec un guide local vérifié à proximité — généralement en moins d'une minute.",
      steps: [
        { title: "Ouvrez l'application", desc: "Choisissez VibeNow et indiquez où vous souhaitez explorer." },
        { title: "Match en ~60 s", desc: "Un guide vérifié à proximité accepte votre demande en temps réel." },
        { title: "Rencontrez votre local", desc: "Voyez sa position en direct et rencontrez-le en quelques minutes." },
        { title: "Explorez et payez dans l'app", desc: "Parcourez la ville avec un vrai local. Payez en toute sécurité, sans espèces." },
      ],
      benefits: [
        { title: "Aucune planification", desc: "Spontané ? Ouvrez et partez — conçu pour les voyageurs qui détestent les horaires rigides." },
        { title: "Position en temps réel", desc: "Regardez votre guide approcher sur la carte, comme une app de VTC pour les experts locaux." },
        { title: "Prix transparent", desc: "Voyez le prix avant de confirmer. Aucune surprise de piège à touristes." },
      ],
      faqs: [
        { q: "VibeNow est-il vraiment si rapide ?", a: "La plupart des matchs se font en moins d'une minute quand des guides sont en ligne à proximité. L'application montre qui est disponible avant que vous ne fassiez votre demande." },
        { q: "Et si aucun guide n'est disponible ?", a: "Si personne n'est libre pour le moment, l'application vous le dit immédiatement et propose plutôt un groupe VibeSquad ou une visite privée." },
        { q: "Comment payer ?", a: "En toute sécurité dans l'application — pas d'espèces nécessaires, et vous voyez le prix à l'avance." },
      ],
      ctaTitle: "Prêt à explorer dès maintenant ?",
    },
    es: {
      tagline: "Toca. Conecta. Vamos.",
      heroSub:
        "La forma más rápida de explorar. Abre la app, elige dónde estás y conecta con un guía local verificado cerca — normalmente en menos de un minuto.",
      steps: [
        { title: "Abre la app", desc: "Elige VibeNow y comparte dónde quieres explorar." },
        { title: "Conecta en ~60 s", desc: "Un guía verificado cerca acepta tu solicitud en tiempo real." },
        { title: "Conoce a tu local", desc: "Ve su ubicación en vivo y reúnete en minutos." },
        { title: "Explora y paga en la app", desc: "Recorre la ciudad con un local real. Paga de forma segura, sin efectivo." },
      ],
      benefits: [
        { title: "Sin planificación", desc: "¿Espontáneo? Solo abre y ve — hecho para viajeros que odian los horarios rígidos." },
        { title: "Ubicación en tiempo real", desc: "Observa cómo tu guía se acerca en el mapa, como una app de transporte para expertos locales." },
        { title: "Precio transparente", desc: "Ve el precio antes de confirmar. Sin sorpresas de trampas para turistas." },
      ],
      faqs: [
        { q: "¿Qué tan rápido es VibeNow de verdad?", a: "La mayoría de las conexiones ocurren en menos de un minuto cuando hay guías en línea cerca. La app muestra quién está disponible antes de que lo solicites." },
        { q: "¿Y si no hay ningún guía disponible?", a: "Si nadie está libre ahora mismo, la app te lo dice de inmediato y sugiere un grupo VibeSquad o un tour privado en su lugar." },
        { q: "¿Cómo pago?", a: "De forma segura en la app — sin efectivo, y ves el precio por adelantado." },
      ],
      ctaTitle: "¿Listo para explorar ahora mismo?",
    },
    it: {
      tagline: "Tocca. Abbina. Vai.",
      heroSub:
        "Il modo più veloce per esplorare. Apri l'app, scegli dove ti trovi e abbinati a una guida locale verificata nelle vicinanze — di solito in meno di un minuto.",
      steps: [
        { title: "Apri l'app", desc: "Scegli VibeNow e indica dove vorresti esplorare." },
        { title: "Abbinati in ~60 s", desc: "Una guida verificata nelle vicinanze accetta la tua richiesta in tempo reale." },
        { title: "Incontra il tuo local", desc: "Vedi la sua posizione in tempo reale e incontralo in pochi minuti." },
        { title: "Esplora e paga nell'app", desc: "Gira la città con un vero local. Paga in sicurezza, senza contanti." },
      ],
      benefits: [
        { title: "Nessuna pianificazione", desc: "Spontaneo? Apri e vai — fatto per i viaggiatori che odiano gli orari rigidi." },
        { title: "Posizione in tempo reale", desc: "Guarda la tua guida avvicinarsi sulla mappa, come un'app di trasporto per esperti locali." },
        { title: "Prezzo trasparente", desc: "Vedi il prezzo prima di confermare. Nessuna sorpresa da trappola per turisti." },
      ],
      faqs: [
        { q: "Quanto è veloce VibeNow davvero?", a: "La maggior parte degli abbinamenti avviene in meno di un minuto quando ci sono guide online nelle vicinanze. L'app mostra chi è disponibile prima che tu faccia richiesta." },
        { q: "E se nessuna guida è disponibile?", a: "Se al momento nessuno è libero, l'app te lo dice subito e suggerisce invece un gruppo VibeSquad o un tour privato." },
        { q: "Come pago?", a: "In sicurezza nell'app — niente contanti, e vedi il prezzo in anticipo." },
      ],
      ctaTitle: "Pronto a esplorare proprio ora?",
    },
    nl: {
      tagline: "Tik. Match. Ga.",
      heroSub:
        "De snelste manier om te ontdekken. Open de app, kies waar je bent en match met een geverifieerde lokale gids in de buurt — meestal binnen een minuut.",
      steps: [
        { title: "Open de app", desc: "Kies VibeNow en deel waar je wilt ontdekken." },
        { title: "Match in ~60 sec", desc: "Een geverifieerde gids in de buurt accepteert je verzoek in realtime." },
        { title: "Ontmoet je local", desc: "Zie zijn locatie live en ontmoet hem binnen enkele minuten." },
        { title: "Ontdek & betaal in de app", desc: "Verken de stad met een echte local. Betaal veilig, geen contant geld." },
      ],
      benefits: [
        { title: "Geen planning nodig", desc: "Spontaan? Gewoon openen en gaan — gemaakt voor reizigers die strakke schema's haten." },
        { title: "Realtime locatie", desc: "Kijk hoe je gids op de kaart dichterbij komt, als een rit-app voor lokale experts." },
        { title: "Transparante prijs", desc: "Zie de prijs voordat je bevestigt. Geen toeristenval-verrassingen." },
      ],
      faqs: [
        { q: "Hoe snel is VibeNow echt?", a: "De meeste matches gebeuren binnen een minuut als er gidsen online zijn in de buurt. De app laat zien wie beschikbaar is voordat je een verzoek doet." },
        { q: "Wat als er geen gids beschikbaar is?", a: "Als er nu niemand vrij is, vertelt de app je dat meteen en stelt in plaats daarvan een VibeSquad-groep of een privétour voor." },
        { q: "Hoe betaal ik?", a: "Veilig in de app — geen contant geld nodig, en je ziet de prijs vooraf." },
      ],
      ctaTitle: "Klaar om nu meteen te ontdekken?",
    },
    pt: {
      tagline: "Toque. Combine. Vá.",
      heroSub:
        "A forma mais rápida de explorar. Abra a aplicação, escolha onde está e combine com um guia local verificado por perto — normalmente em menos de um minuto.",
      steps: [
        { title: "Abra a aplicação", desc: "Escolha o VibeNow e indique onde quer explorar." },
        { title: "Combine em ~60 s", desc: "Um guia verificado por perto aceita o seu pedido em tempo real." },
        { title: "Conheça o seu local", desc: "Veja a localização dele ao vivo e encontre-o em minutos." },
        { title: "Explore e pague na app", desc: "Percorra a cidade com um local de verdade. Pague com segurança, sem dinheiro." },
      ],
      benefits: [
        { title: "Sem planeamento", desc: "Espontâneo? Basta abrir e ir — feito para viajantes que detestam horários rígidos." },
        { title: "Localização em tempo real", desc: "Veja o seu guia aproximar-se no mapa, como uma app de transporte para especialistas locais." },
        { title: "Preço transparente", desc: "Veja o preço antes de confirmar. Sem surpresas de armadilhas para turistas." },
      ],
      faqs: [
        { q: "Quão rápido é o VibeNow na verdade?", a: "A maioria das combinações acontece em menos de um minuto quando há guias online por perto. A app mostra quem está disponível antes de fazer o pedido." },
        { q: "E se nenhum guia estiver disponível?", a: "Se ninguém estiver livre neste momento, a app avisa-o imediatamente e sugere antes um grupo VibeSquad ou um tour privado." },
        { q: "Como pago?", a: "Com segurança na app — sem dinheiro, e vê o preço antecipadamente." },
      ],
      ctaTitle: "Pronto para explorar agora mesmo?",
    },
    pl: {
      tagline: "Dotknij. Dopasuj. Ruszaj.",
      heroSub:
        "Najszybszy sposób na zwiedzanie. Otwórz aplikację, wybierz, gdzie jesteś, i dopasuj się do zweryfikowanego lokalnego przewodnika w pobliżu — zwykle w niecałą minutę.",
      steps: [
        { title: "Otwórz aplikację", desc: "Wybierz VibeNow i wskaż, gdzie chcesz zwiedzać." },
        { title: "Dopasowanie w ~60 s", desc: "Zweryfikowany przewodnik w pobliżu akceptuje Twoją prośbę w czasie rzeczywistym." },
        { title: "Spotkaj swojego przewodnika", desc: "Zobacz jego lokalizację na żywo i spotkaj się w ciągu kilku minut." },
        { title: "Zwiedzaj i płać w aplikacji", desc: "Zwiedzaj miasto z prawdziwym mieszkańcem. Płać bezpiecznie, bez gotówki." },
      ],
      benefits: [
        { title: "Bez planowania", desc: "Spontanicznie? Po prostu otwórz i ruszaj — stworzone dla podróżnych, którzy nie znoszą sztywnych planów." },
        { title: "Lokalizacja na żywo", desc: "Obserwuj na mapie, jak Twój przewodnik się zbliża, jak w aplikacji przewozowej dla lokalnych ekspertów." },
        { title: "Przejrzysta cena", desc: "Zobacz cenę przed potwierdzeniem. Żadnych niespodzianek z pułapek na turystów." },
      ],
      faqs: [
        { q: "Jak szybki naprawdę jest VibeNow?", a: "Większość dopasowań następuje w niecałą minutę, gdy w pobliżu są przewodnicy online. Aplikacja pokazuje, kto jest dostępny, zanim wyślesz prośbę." },
        { q: "Co, jeśli żaden przewodnik nie jest dostępny?", a: "Jeśli nikt nie jest teraz wolny, aplikacja od razu Cię o tym poinformuje i zaproponuje zamiast tego grupę VibeSquad lub prywatną wycieczkę." },
        { q: "Jak płacę?", a: "Bezpiecznie w aplikacji — bez gotówki, a cenę widzisz z góry." },
      ],
      ctaTitle: "Gotowy, by zwiedzać już teraz?",
    },
  },
  vibesquad: {
    en: {
      tagline: "Join the squad. Split the cost.",
      heroSub:
        "Travelling on a budget or love meeting people? Join a small group on the same route, share one local guide, and split the cost.",
      steps: [
        { title: "Pick a squad", desc: "Browse open groups by city and time, or start your own." },
        { title: "Join & split", desc: "A verified local guide leads the group; the cost is shared." },
        { title: "Meet up", desc: "Gather at the meeting point and set off together." },
        { title: "Explore together", desc: "See the city with a real local and fellow travellers." },
      ],
      benefits: [
        { title: "Most affordable", desc: "Sharing one guide makes VibeSquad the cheapest way to explore with a local." },
        { title: "Meet travellers", desc: "Social by design — explore alongside people on the same route." },
        { title: "Still a real local", desc: "No scripted bus tour. A verified local leads every squad." },
      ],
      faqs: [
        { q: "How big is a squad?", a: "Small groups, so the guide can still give everyone attention — not a 50-person bus tour." },
        { q: "Can I start my own squad?", a: "Yes — create a group for a route and time, and other travellers can join you." },
        { q: "Why is it cheaper?", a: "Because the cost of one local guide is shared across the group." },
      ],
      ctaTitle: "Find your squad",
    },
    tr: {
      tagline: "Gruba katıl. Masrafı paylaş.",
      heroSub:
        "Bütçeli mi geziyorsun yoksa insanlarla tanışmayı mı seviyorsun? Aynı rotadaki küçük bir gruba katıl, tek bir yerel rehberi paylaş ve masrafı bölüş.",
      steps: [
        { title: "Bir grup seç", desc: "Şehre ve saate göre açık grupları gör ya da kendininkini başlat." },
        { title: "Katıl ve paylaş", desc: "Doğrulanmış bir yerel rehber gruba liderlik eder; masraf paylaşılır." },
        { title: "Buluş", desc: "Buluşma noktasında toplanın ve birlikte yola çıkın." },
        { title: "Birlikte keşfet", desc: "Şehri gerçek bir yerel ve diğer gezginlerle gör." },
      ],
      benefits: [
        { title: "En uygun fiyat", desc: "Tek rehberi paylaşmak, VibeSquad'ı bir yerelle keşfetmenin en ucuz yolu yapar." },
        { title: "Gezginlerle tanış", desc: "Tasarımı sosyal — aynı rotadaki insanlarla birlikte keşfet." },
        { title: "Yine de gerçek yerel", desc: "Ezbere otobüs turu yok. Her grubu doğrulanmış bir yerel yönetir." },
      ],
      faqs: [
        { q: "Bir grup ne kadar büyük?", a: "Küçük gruplar — böylece rehber herkese ilgi gösterebilir, 50 kişilik otobüs turu değil." },
        { q: "Kendi grubumu başlatabilir miyim?", a: "Evet — bir rota ve saat için grup oluştur, diğer gezginler sana katılabilir." },
        { q: "Neden daha ucuz?", a: "Çünkü tek bir yerel rehberin maliyeti grup arasında paylaşılır." },
      ],
      ctaTitle: "Grubunu bul",
    },
    zh: {
      tagline: "加入小队。分摊费用。",
      heroSub:
        "预算有限，还是喜欢结交新朋友？加入同一路线上的小团队，共享一位当地向导，分摊费用。",
      steps: [
        { title: "选择小队", desc: "按城市和时间浏览开放的团队，或发起自己的团队。" },
        { title: "加入并分摊", desc: "由一位经过验证的当地向导带队；费用由大家分摊。" },
        { title: "集合", desc: "在集合点会合，然后一起出发。" },
        { title: "一起探索", desc: "和真正的当地人以及同行的旅伴一起游览城市。" },
      ],
      benefits: [
        { title: "最实惠", desc: "共享一位向导让 VibeSquad 成为与当地人探索最便宜的方式。" },
        { title: "结识旅伴", desc: "天生爱社交——与同路线上的人一起探索。" },
        { title: "依然是真正的当地人", desc: "没有照本宣科的大巴团。每个小队都由经过验证的当地人带队。" },
      ],
      faqs: [
        { q: "一个小队有多大？", a: "小团队，所以向导仍能照顾到每个人——不是 50 人的大巴团。" },
        { q: "我可以发起自己的小队吗？", a: "可以——为某条路线和时间创建团队，其他旅行者就可以加入你。" },
        { q: "为什么更便宜？", a: "因为一位当地向导的费用由整个团队分摊。" },
      ],
      ctaTitle: "找到你的小队",
    },
    ja: {
      tagline: "スクワッドに参加。費用をシェア。",
      heroSub:
        "予算を抑えて旅したい？それとも人との出会いが好き？同じルートの少人数グループに参加し、一人の地元ガイドを共有して費用を分け合いましょう。",
      steps: [
        { title: "スクワッドを選ぶ", desc: "都市と時間で公開グループを探すか、自分で立ち上げましょう。" },
        { title: "参加して分担", desc: "認証済みの地元ガイドがグループを案内し、費用はシェアされます。" },
        { title: "集合", desc: "集合場所に集まって、一緒に出発しましょう。" },
        { title: "一緒に探索", desc: "本物の地元の人と旅仲間と一緒に街を巡ろう。" },
      ],
      benefits: [
        { title: "もっともお得", desc: "一人のガイドを共有することで、VibeSquad は地元の人と探索する最も安い方法になります。" },
        { title: "旅仲間に出会う", desc: "もともと社交的——同じルートの人たちと一緒に探索できます。" },
        { title: "それでも本物の地元", desc: "台本どおりのバスツアーではありません。認証済みの地元の人がすべてのスクワッドを案内します。" },
      ],
      faqs: [
        { q: "スクワッドの規模は？", a: "少人数なので、ガイドが全員に目を配れます——50人のバスツアーではありません。" },
        { q: "自分でスクワッドを立ち上げられますか？", a: "はい——ルートと時間を決めてグループを作れば、ほかの旅行者が参加できます。" },
        { q: "なぜ安いの？", a: "一人の地元ガイドの費用がグループで分担されるからです。" },
      ],
      ctaTitle: "あなたのスクワッドを見つけよう",
    },
    ko: {
      tagline: "스쿼드에 합류하세요. 비용을 나누세요.",
      heroSub:
        "예산을 아끼며 여행하나요, 아니면 사람들과 어울리는 걸 좋아하나요? 같은 코스의 소규모 그룹에 합류해 한 명의 현지 가이드를 함께 쓰고 비용을 나누세요.",
      steps: [
        { title: "스쿼드 고르기", desc: "도시와 시간별로 열린 그룹을 둘러보거나 직접 만들어 보세요." },
        { title: "합류하고 나누기", desc: "인증된 현지 가이드가 그룹을 이끌고, 비용은 함께 분담합니다." },
        { title: "모이기", desc: "집합 장소에 모여 함께 출발하세요." },
        { title: "함께 탐험", desc: "진짜 현지인과 동료 여행자들과 함께 도시를 둘러보세요." },
      ],
      benefits: [
        { title: "가장 저렴", desc: "한 명의 가이드를 함께 쓰기에 VibeSquad는 현지인과 탐험하는 가장 저렴한 방법입니다." },
        { title: "여행자들과 만나기", desc: "본래 사교적인 설계 — 같은 코스의 사람들과 함께 탐험하세요." },
        { title: "그래도 진짜 현지인", desc: "짜인 버스 투어가 아닙니다. 인증된 현지인이 모든 스쿼드를 이끕니다." },
      ],
      faqs: [
        { q: "스쿼드 규모는 얼마나 되나요?", a: "소규모라서 가이드가 모두에게 신경 쓸 수 있습니다 — 50명짜리 버스 투어가 아닙니다." },
        { q: "직접 스쿼드를 만들 수 있나요?", a: "네 — 코스와 시간으로 그룹을 만들면 다른 여행자들이 합류할 수 있습니다." },
        { q: "왜 더 저렴한가요?", a: "한 명의 현지 가이드 비용을 그룹이 함께 나누기 때문입니다." },
      ],
      ctaTitle: "당신의 스쿼드를 찾으세요",
    },
    ar: {
      tagline: "انضم إلى المجموعة. اقتسم التكلفة.",
      heroSub:
        "تسافر بميزانية محدودة أو تحب لقاء الناس؟ انضم إلى مجموعة صغيرة على المسار نفسه، وشارك مرشدًا محليًا واحدًا، واقتسم التكلفة.",
      steps: [
        { title: "اختر مجموعة", desc: "تصفّح المجموعات المفتوحة حسب المدينة والوقت، أو ابدأ مجموعتك الخاصة." },
        { title: "انضم واقتسم", desc: "يقود مرشد محلي موثوق المجموعة؛ وتُقتسم التكلفة." },
        { title: "التقوا", desc: "اجتمعوا عند نقطة اللقاء وانطلقوا معًا." },
        { title: "استكشفوا معًا", desc: "شاهد المدينة مع شخص محلي حقيقي ورفاق سفر آخرين." },
      ],
      benefits: [
        { title: "الأكثر توفيرًا", desc: "مشاركة مرشد واحد تجعل VibeSquad أرخص طريقة للاستكشاف مع شخص محلي." },
        { title: "تعرّف على مسافرين", desc: "اجتماعي بطبيعته — استكشف إلى جانب أشخاص على المسار نفسه." },
        { title: "ومع ذلك محلي حقيقي", desc: "ليست جولة حافلة مكتوبة مسبقًا. يقود كل مجموعة شخص محلي موثوق." },
      ],
      faqs: [
        { q: "ما حجم المجموعة؟", a: "مجموعات صغيرة، حتى يتمكن المرشد من إيلاء الاهتمام للجميع — وليست جولة حافلة من 50 شخصًا." },
        { q: "هل يمكنني بدء مجموعتي الخاصة؟", a: "نعم — أنشئ مجموعة لمسار ووقت معيّن، ويمكن لمسافرين آخرين الانضمام إليك." },
        { q: "لماذا هي أرخص؟", a: "لأن تكلفة مرشد محلي واحد تُقتسم بين أفراد المجموعة." },
      ],
      ctaTitle: "اعثر على مجموعتك",
    },
    hr: {
      tagline: "Pridruži se ekipi. Podijeli trošak.",
      heroSub:
        "Putuješ s ograničenim budžetom ili voliš upoznavati ljude? Pridruži se maloj grupi na istoj ruti, podijelite jednog lokalnog vodiča i podijelite trošak.",
      steps: [
        { title: "Odaberi ekipu", desc: "Pregledaj otvorene grupe po gradu i vremenu ili pokreni vlastitu." },
        { title: "Pridruži se i podijeli", desc: "Provjereni lokalni vodič vodi grupu; trošak se dijeli." },
        { title: "Nađite se", desc: "Okupite se na mjestu sastanka i krenite zajedno." },
        { title: "Istražujte zajedno", desc: "Razgledaj grad s pravim lokalcem i suputnicima." },
      ],
      benefits: [
        { title: "Najpovoljnije", desc: "Dijeljenje jednog vodiča čini VibeSquad najjeftinijim načinom istraživanja s lokalcem." },
        { title: "Upoznaj putnike", desc: "Društven po dizajnu — istražuj uz ljude na istoj ruti." },
        { title: "I dalje pravi lokalac", desc: "Nema unaprijed napisane autobusne ture. Provjereni lokalac vodi svaku ekipu." },
      ],
      faqs: [
        { q: "Koliko je velika ekipa?", a: "Male grupe, tako da vodič i dalje može posvetiti pažnju svima — nije autobusna tura od 50 ljudi." },
        { q: "Mogu li pokrenuti vlastitu ekipu?", a: "Da — stvori grupu za rutu i vrijeme, a drugi putnici mogu ti se pridružiti." },
        { q: "Zašto je jeftinije?", a: "Jer se trošak jednog lokalnog vodiča dijeli na cijelu grupu." },
      ],
      ctaTitle: "Pronađi svoju ekipu",
    },
    id: {
      tagline: "Gabung tim. Bagi biayanya.",
      heroSub:
        "Bepergian dengan budget terbatas atau suka bertemu orang baru? Gabung grup kecil di rute yang sama, berbagi satu pemandu lokal, dan bagi biayanya.",
      steps: [
        { title: "Pilih tim", desc: "Telusuri grup terbuka berdasarkan kota dan waktu, atau buat sendiri." },
        { title: "Gabung & bagi", desc: "Pemandu lokal terverifikasi memimpin grup; biaya dibagi bersama." },
        { title: "Berkumpul", desc: "Berkumpul di titik temu lalu berangkat bersama." },
        { title: "Jelajah bersama", desc: "Lihat kota bersama orang lokal sungguhan dan sesama pelancong." },
      ],
      benefits: [
        { title: "Paling hemat", desc: "Berbagi satu pemandu menjadikan VibeSquad cara termurah untuk menjelajah bersama orang lokal." },
        { title: "Bertemu pelancong", desc: "Sosial sejak awal — menjelajah bersama orang-orang di rute yang sama." },
        { title: "Tetap orang lokal sungguhan", desc: "Bukan tur bus yang berskenario. Orang lokal terverifikasi memimpin setiap tim." },
      ],
      faqs: [
        { q: "Seberapa besar satu tim?", a: "Grup kecil, jadi pemandu tetap bisa memperhatikan semua orang — bukan tur bus berisi 50 orang." },
        { q: "Bisakah saya membuat tim sendiri?", a: "Bisa — buat grup untuk rute dan waktu tertentu, dan pelancong lain bisa bergabung denganmu." },
        { q: "Kenapa lebih murah?", a: "Karena biaya satu pemandu lokal dibagi ke seluruh anggota grup." },
      ],
      ctaTitle: "Temukan timmu",
    },
    ru: {
      tagline: "Присоединяйся к команде. Дели расходы.",
      heroSub:
        "Путешествуешь с ограниченным бюджетом или любишь знакомиться с людьми? Присоединяйся к небольшой группе на том же маршруте, дели одного местного гида и расходы.",
      steps: [
        { title: "Выбери команду", desc: "Просматривай открытые группы по городу и времени или создай свою." },
        { title: "Присоединяйся и дели", desc: "Проверенный местный гид ведёт группу; расходы делятся." },
        { title: "Встреча", desc: "Соберитесь в точке встречи и отправляйтесь вместе." },
        { title: "Исследуйте вместе", desc: "Посмотрите город с настоящим местным и попутчиками." },
      ],
      benefits: [
        { title: "Самый доступный", desc: "Деля одного гида, VibeSquad становится самым дешёвым способом исследовать с местным." },
        { title: "Знакомься с путешественниками", desc: "Социальный по своей сути — исследуй рядом с людьми на том же маршруте." },
        { title: "И всё же настоящий местный", desc: "Никаких заученных автобусных туров. Каждую команду ведёт проверенный местный." },
      ],
      faqs: [
        { q: "Насколько велика команда?", a: "Небольшие группы, чтобы гид мог уделить внимание каждому — это не автобусный тур на 50 человек." },
        { q: "Могу ли я создать свою команду?", a: "Да — создай группу для маршрута и времени, и другие путешественники смогут к тебе присоединиться." },
        { q: "Почему дешевле?", a: "Потому что стоимость одного местного гида делится на всю группу." },
      ],
      ctaTitle: "Найди свою команду",
    },
    uk: {
      tagline: "Приєднуйся до команди. Діли витрати.",
      heroSub:
        "Подорожуєш з обмеженим бюджетом чи любиш знайомитися з людьми? Приєднуйся до невеликої групи на тому ж маршруті, діли одного місцевого гіда й витрати.",
      steps: [
        { title: "Обери команду", desc: "Переглядай відкриті групи за містом і часом або створи свою." },
        { title: "Приєднуйся й діли", desc: "Перевірений місцевий гід веде групу; витрати діляться." },
        { title: "Зустріч", desc: "Зберіться в точці зустрічі та вирушайте разом." },
        { title: "Досліджуйте разом", desc: "Подивіться місто зі справжнім місцевим і попутниками." },
      ],
      benefits: [
        { title: "Найдоступніший", desc: "Ділячи одного гіда, VibeSquad стає найдешевшим способом досліджувати з місцевим." },
        { title: "Знайомся з мандрівниками", desc: "Соціальний за своєю суттю — досліджуй поруч із людьми на тому ж маршруті." },
        { title: "І все ж справжній місцевий", desc: "Жодних завчених автобусних турів. Кожну команду веде перевірений місцевий." },
      ],
      faqs: [
        { q: "Наскільки велика команда?", a: "Невеликі групи, щоб гід міг приділити увагу кожному — це не автобусний тур на 50 осіб." },
        { q: "Чи можу я створити свою команду?", a: "Так — створи групу для маршруту й часу, і інші мандрівники зможуть до тебе приєднатися." },
        { q: "Чому дешевше?", a: "Тому що вартість одного місцевого гіда ділиться на всю групу." },
      ],
      ctaTitle: "Знайди свою команду",
    },
    bg: {
      tagline: "Присъедини се към отбора. Раздели разхода.",
      heroSub:
        "Пътуваш с ограничен бюджет или обичаш да се запознаваш с хора? Присъедини се към малка група по същия маршрут, споделете един местен гид и разделете разхода.",
      steps: [
        { title: "Избери отбор", desc: "Разгледай отворените групи по град и час или започни своя собствена." },
        { title: "Присъедини се и раздели", desc: "Проверен местен гид води групата; разходът се споделя." },
        { title: "Срещнете се", desc: "Съберете се на мястото на срещата и тръгнете заедно." },
        { title: "Изследвайте заедно", desc: "Разгледайте града с истински местен и спътници." },
      ],
      benefits: [
        { title: "Най-достъпно", desc: "Споделянето на един гид прави VibeSquad най-евтиния начин да изследваш с местен." },
        { title: "Запознай се с пътешественици", desc: "Социален по замисъл — изследвай редом с хора по същия маршрут." },
        { title: "Все пак истински местен", desc: "Никакви заучени автобусни обиколки. Всеки отбор се води от проверен местен." },
      ],
      faqs: [
        { q: "Колко голям е един отбор?", a: "Малки групи, така че гидът да може да обърне внимание на всеки — а не автобусна обиколка от 50 души." },
        { q: "Мога ли да започна свой собствен отбор?", a: "Да — създай група за маршрут и час, и други пътешественици могат да се присъединят към теб." },
        { q: "Защо е по-евтино?", a: "Защото разходът за един местен гид се разделя между цялата група." },
      ],
      ctaTitle: "Намери своя отбор",
    },
    sr: {
      tagline: "Pridruži se ekipi. Podeli trošak.",
      heroSub:
        "Putuješ sa ograničenim budžetom ili voliš da upoznaješ ljude? Pridruži se maloj grupi na istoj ruti, podelite jednog lokalnog vodiča i podelite trošak.",
      steps: [
        { title: "Izaberi ekipu", desc: "Pregledaj otvorene grupe po gradu i vremenu ili pokreni sopstvenu." },
        { title: "Pridruži se i podeli", desc: "Provereni lokalni vodič vodi grupu; trošak se deli." },
        { title: "Nađite se", desc: "Okupite se na mestu sastanka i krenite zajedno." },
        { title: "Istražujte zajedno", desc: "Razgledajte grad sa pravim lokalcem i saputnicima." },
      ],
      benefits: [
        { title: "Najpovoljnije", desc: "Deljenje jednog vodiča čini VibeSquad najjeftinijim načinom za istraživanje sa lokalcem." },
        { title: "Upoznaj putnike", desc: "Društven po dizajnu — istražuj uz ljude na istoj ruti." },
        { title: "I dalje pravi lokalac", desc: "Nema unapred napisane autobuske ture. Svaku ekipu vodi provereni lokalac." },
      ],
      faqs: [
        { q: "Kolika je ekipa?", a: "Male grupe, tako da vodič i dalje može da posveti pažnju svima — nije autobuska tura od 50 ljudi." },
        { q: "Mogu li da pokrenem sopstvenu ekipu?", a: "Da — napravi grupu za rutu i vreme, a drugi putnici mogu da ti se pridruže." },
        { q: "Zašto je jeftinije?", a: "Jer se trošak jednog lokalnog vodiča deli na celu grupu." },
      ],
      ctaTitle: "Pronađi svoju ekipu",
    },
    el: {
      tagline: "Μπες στην ομάδα. Μοίρασε το κόστος.",
      heroSub:
        "Ταξιδεύεις με περιορισμένο προϋπολογισμό ή λατρεύεις να γνωρίζεις κόσμο; Μπες σε μια μικρή ομάδα στην ίδια διαδρομή, μοιραστείτε έναν ντόπιο ξεναγό και μοιράστε το κόστος.",
      steps: [
        { title: "Διάλεξε ομάδα", desc: "Περιήγησε σε ανοιχτές ομάδες ανά πόλη και ώρα, ή ξεκίνα τη δική σου." },
        { title: "Μπες & μοίρασε", desc: "Ένας επαληθευμένος ντόπιος ξεναγός καθοδηγεί την ομάδα· το κόστος μοιράζεται." },
        { title: "Συναντηθείτε", desc: "Μαζευτείτε στο σημείο συνάντησης και ξεκινήστε μαζί." },
        { title: "Εξερευνήστε μαζί", desc: "Δείτε την πόλη με έναν πραγματικό ντόπιο και συνταξιδιώτες." },
      ],
      benefits: [
        { title: "Πιο οικονομικό", desc: "Μοιράζοντας έναν ξεναγό, το VibeSquad γίνεται ο φθηνότερος τρόπος εξερεύνησης με ντόπιο." },
        { title: "Γνώρισε ταξιδιώτες", desc: "Κοινωνικό από τη φύση του — εξερεύνησε δίπλα σε ανθρώπους στην ίδια διαδρομή." },
        { title: "Και πάλι πραγματικός ντόπιος", desc: "Όχι σεναριακή εκδρομή με λεωφορείο. Κάθε ομάδα καθοδηγείται από έναν επαληθευμένο ντόπιο." },
      ],
      faqs: [
        { q: "Πόσο μεγάλη είναι μια ομάδα;", a: "Μικρές ομάδες, ώστε ο ξεναγός να μπορεί να δώσει προσοχή σε όλους — όχι εκδρομή λεωφορείου 50 ατόμων." },
        { q: "Μπορώ να ξεκινήσω τη δική μου ομάδα;", a: "Ναι — δημιούργησε μια ομάδα για μια διαδρομή και ώρα, και άλλοι ταξιδιώτες μπορούν να σου ενωθούν." },
        { q: "Γιατί είναι φθηνότερο;", a: "Επειδή το κόστος ενός ντόπιου ξεναγού μοιράζεται σε όλη την ομάδα." },
      ],
      ctaTitle: "Βρες την ομάδα σου",
    },
    ro: {
      tagline: "Alătură-te echipei. Împarte costul.",
      heroSub:
        "Călătorești cu buget redus sau îți place să cunoști oameni? Alătură-te unui grup mic pe același traseu, împărțiți un ghid local și împărțiți costul.",
      steps: [
        { title: "Alege o echipă", desc: "Răsfoiește grupurile deschise după oraș și oră, sau pornește-l pe al tău." },
        { title: "Alătură-te și împarte", desc: "Un ghid local verificat conduce grupul; costul este împărțit." },
        { title: "Întâlniți-vă", desc: "Adunați-vă la punctul de întâlnire și porniți împreună." },
        { title: "Explorați împreună", desc: "Vedeți orașul cu un localnic adevărat și cu alți călători." },
      ],
      benefits: [
        { title: "Cel mai accesibil", desc: "Împărțirea unui ghid face din VibeSquad cel mai ieftin mod de a explora cu un localnic." },
        { title: "Cunoaște călători", desc: "Social prin concepție — explorează alături de oameni pe același traseu." },
        { title: "Totuși un localnic adevărat", desc: "Niciun tur cu autocarul după scenariu. Un localnic verificat conduce fiecare echipă." },
      ],
      faqs: [
        { q: "Cât de mare este o echipă?", a: "Grupuri mici, ca ghidul să poată acorda atenție tuturor — nu un tur cu autocarul de 50 de persoane." },
        { q: "Pot să-mi pornesc propria echipă?", a: "Da — creează un grup pentru un traseu și o oră, iar alți călători ți se pot alătura." },
        { q: "De ce este mai ieftin?", a: "Pentru că costul unui singur ghid local este împărțit la întregul grup." },
      ],
      ctaTitle: "Găsește-ți echipa",
    },
    de: {
      tagline: "Schließ dich dem Squad an. Teilt die Kosten.",
      heroSub:
        "Mit kleinem Budget unterwegs oder lernst du gern Leute kennen? Schließ dich einer kleinen Gruppe auf derselben Route an, teilt euch einen lokalen Guide und die Kosten.",
      steps: [
        { title: "Wähle einen Squad", desc: "Durchstöbere offene Gruppen nach Stadt und Zeit oder starte deinen eigenen." },
        { title: "Beitreten & teilen", desc: "Ein verifizierter lokaler Guide führt die Gruppe; die Kosten werden geteilt." },
        { title: "Trefft euch", desc: "Versammelt euch am Treffpunkt und macht euch gemeinsam auf den Weg." },
        { title: "Entdeckt gemeinsam", desc: "Erlebt die Stadt mit einem echten Local und Mitreisenden." },
      ],
      benefits: [
        { title: "Am günstigsten", desc: "Sich einen Guide zu teilen macht VibeSquad zum günstigsten Weg, mit einem Local zu entdecken." },
        { title: "Triff Reisende", desc: "Sozial gedacht — entdecke gemeinsam mit Leuten auf derselben Route." },
        { title: "Trotzdem ein echter Local", desc: "Keine vorgefertigte Bustour. Ein verifizierter Local führt jeden Squad." },
      ],
      faqs: [
        { q: "Wie groß ist ein Squad?", a: "Kleine Gruppen, damit der Guide jedem Aufmerksamkeit schenken kann — keine 50-Personen-Bustour." },
        { q: "Kann ich meinen eigenen Squad starten?", a: "Ja — erstelle eine Gruppe für eine Route und Zeit, und andere Reisende können sich dir anschließen." },
        { q: "Warum ist es günstiger?", a: "Weil die Kosten für einen lokalen Guide auf die Gruppe verteilt werden." },
      ],
      ctaTitle: "Finde deinen Squad",
    },
    fr: {
      tagline: "Rejoignez le squad. Partagez les frais.",
      heroSub:
        "Vous voyagez avec un petit budget ou vous adorez rencontrer du monde ? Rejoignez un petit groupe sur le même itinéraire, partagez un guide local et partagez les frais.",
      steps: [
        { title: "Choisissez un squad", desc: "Parcourez les groupes ouverts par ville et horaire, ou créez le vôtre." },
        { title: "Rejoignez et partagez", desc: "Un guide local vérifié mène le groupe ; les frais sont partagés." },
        { title: "Retrouvez-vous", desc: "Rassemblez-vous au point de rendez-vous et partez ensemble." },
        { title: "Explorez ensemble", desc: "Découvrez la ville avec un vrai local et d'autres voyageurs." },
      ],
      benefits: [
        { title: "Le plus abordable", desc: "Partager un guide fait de VibeSquad le moyen le moins cher d'explorer avec un local." },
        { title: "Rencontrez des voyageurs", desc: "Social par nature — explorez aux côtés de gens sur le même itinéraire." },
        { title: "Toujours un vrai local", desc: "Pas de tour en bus scénarisé. Un local vérifié mène chaque squad." },
      ],
      faqs: [
        { q: "Quelle est la taille d'un squad ?", a: "Petits groupes, pour que le guide puisse donner de l'attention à chacun — pas un tour en bus de 50 personnes." },
        { q: "Puis-je créer mon propre squad ?", a: "Oui — créez un groupe pour un itinéraire et un horaire, et d'autres voyageurs pourront vous rejoindre." },
        { q: "Pourquoi est-ce moins cher ?", a: "Parce que le coût d'un seul guide local est partagé au sein du groupe." },
      ],
      ctaTitle: "Trouvez votre squad",
    },
    es: {
      tagline: "Únete al grupo. Comparte el coste.",
      heroSub:
        "¿Viajas con poco presupuesto o te encanta conocer gente? Únete a un grupo pequeño en la misma ruta, comparte un guía local y reparte el coste.",
      steps: [
        { title: "Elige un grupo", desc: "Explora grupos abiertos por ciudad y hora, o crea el tuyo." },
        { title: "Únete y comparte", desc: "Un guía local verificado lidera el grupo; el coste se reparte." },
        { title: "Quedad", desc: "Reuníos en el punto de encuentro y salid juntos." },
        { title: "Explorad juntos", desc: "Conoce la ciudad con un local real y otros viajeros." },
      ],
      benefits: [
        { title: "Lo más económico", desc: "Compartir un guía hace de VibeSquad la forma más barata de explorar con un local." },
        { title: "Conoce viajeros", desc: "Social por diseño — explora junto a personas en la misma ruta." },
        { title: "Aun así un local real", desc: "Nada de tours en autobús con guion. Un local verificado lidera cada grupo." },
      ],
      faqs: [
        { q: "¿Cómo de grande es un grupo?", a: "Grupos pequeños, para que el guía pueda prestar atención a todos — no un tour en autobús de 50 personas." },
        { q: "¿Puedo crear mi propio grupo?", a: "Sí — crea un grupo para una ruta y hora, y otros viajeros podrán unirse a ti." },
        { q: "¿Por qué es más barato?", a: "Porque el coste de un único guía local se reparte entre el grupo." },
      ],
      ctaTitle: "Encuentra tu grupo",
    },
    it: {
      tagline: "Unisciti allo squad. Dividi i costi.",
      heroSub:
        "Viaggi con un budget ridotto o ami conoscere gente? Unisciti a un piccolo gruppo sullo stesso percorso, condividi una guida locale e dividi i costi.",
      steps: [
        { title: "Scegli uno squad", desc: "Sfoglia i gruppi aperti per città e orario, o crea il tuo." },
        { title: "Unisciti e dividi", desc: "Una guida locale verificata guida il gruppo; il costo è condiviso." },
        { title: "Incontratevi", desc: "Ritrovatevi al punto d'incontro e partite insieme." },
        { title: "Esplorate insieme", desc: "Scopri la città con un vero local e altri viaggiatori." },
      ],
      benefits: [
        { title: "Il più conveniente", desc: "Condividere una guida rende VibeSquad il modo più economico per esplorare con un local." },
        { title: "Conosci viaggiatori", desc: "Sociale per natura — esplora insieme a persone sullo stesso percorso." },
        { title: "Sempre un vero local", desc: "Niente tour in bus preconfezionato. Un local verificato guida ogni squad." },
      ],
      faqs: [
        { q: "Quanto è grande uno squad?", a: "Gruppi piccoli, così la guida può dare attenzione a tutti — non un tour in bus da 50 persone." },
        { q: "Posso creare il mio squad?", a: "Sì — crea un gruppo per un percorso e un orario, e altri viaggiatori potranno unirsi a te." },
        { q: "Perché costa meno?", a: "Perché il costo di un'unica guida locale è condiviso da tutto il gruppo." },
      ],
      ctaTitle: "Trova il tuo squad",
    },
    nl: {
      tagline: "Sluit je aan bij de squad. Deel de kosten.",
      heroSub:
        "Reis je met een klein budget of ontmoet je graag mensen? Sluit je aan bij een kleine groep op dezelfde route, deel één lokale gids en deel de kosten.",
      steps: [
        { title: "Kies een squad", desc: "Blader door open groepen op stad en tijd, of start je eigen groep." },
        { title: "Doe mee & deel", desc: "Een geverifieerde lokale gids leidt de groep; de kosten worden gedeeld." },
        { title: "Kom samen", desc: "Verzamel bij het ontmoetingspunt en vertrek samen." },
        { title: "Ontdek samen", desc: "Bekijk de stad met een echte local en medereizigers." },
      ],
      benefits: [
        { title: "Het voordeligst", desc: "Eén gids delen maakt VibeSquad de goedkoopste manier om met een local te ontdekken." },
        { title: "Ontmoet reizigers", desc: "Sociaal van opzet — ontdek samen met mensen op dezelfde route." },
        { title: "Toch een echte local", desc: "Geen ingestudeerde bustour. Een geverifieerde local leidt elke squad." },
      ],
      faqs: [
        { q: "Hoe groot is een squad?", a: "Kleine groepen, zodat de gids iedereen aandacht kan geven — geen bustour met 50 mensen." },
        { q: "Kan ik mijn eigen squad starten?", a: "Ja — maak een groep voor een route en tijd, en andere reizigers kunnen zich bij je aansluiten." },
        { q: "Waarom is het goedkoper?", a: "Omdat de kosten van één lokale gids over de groep worden verdeeld." },
      ],
      ctaTitle: "Vind je squad",
    },
    pt: {
      tagline: "Junte-se ao squad. Divida o custo.",
      heroSub:
        "Viaja com pouco orçamento ou adora conhecer pessoas? Junte-se a um pequeno grupo no mesmo percurso, partilhem um guia local e dividam o custo.",
      steps: [
        { title: "Escolha um squad", desc: "Explore grupos abertos por cidade e hora, ou crie o seu." },
        { title: "Junte-se e divida", desc: "Um guia local verificado lidera o grupo; o custo é partilhado." },
        { title: "Encontrem-se", desc: "Reúnam-se no ponto de encontro e partam juntos." },
        { title: "Explorem juntos", desc: "Conheça a cidade com um local de verdade e outros viajantes." },
      ],
      benefits: [
        { title: "O mais acessível", desc: "Partilhar um guia torna o VibeSquad a forma mais barata de explorar com um local." },
        { title: "Conheça viajantes", desc: "Social por natureza — explore ao lado de pessoas no mesmo percurso." },
        { title: "Ainda assim um local de verdade", desc: "Nada de tour de autocarro com guião. Um local verificado lidera cada squad." },
      ],
      faqs: [
        { q: "Qual o tamanho de um squad?", a: "Grupos pequenos, para que o guia consiga dar atenção a todos — não um tour de autocarro de 50 pessoas." },
        { q: "Posso criar o meu próprio squad?", a: "Sim — crie um grupo para um percurso e hora, e outros viajantes poderão juntar-se a si." },
        { q: "Porque é mais barato?", a: "Porque o custo de um único guia local é dividido por todo o grupo." },
      ],
      ctaTitle: "Encontre o seu squad",
    },
    pl: {
      tagline: "Dołącz do ekipy. Podziel koszt.",
      heroSub:
        "Podróżujesz z małym budżetem albo lubisz poznawać ludzi? Dołącz do małej grupy na tej samej trasie, dzielcie jednego lokalnego przewodnika i podzielcie koszt.",
      steps: [
        { title: "Wybierz ekipę", desc: "Przeglądaj otwarte grupy według miasta i godziny lub stwórz własną." },
        { title: "Dołącz i podziel", desc: "Zweryfikowany lokalny przewodnik prowadzi grupę; koszt jest dzielony." },
        { title: "Spotkajcie się", desc: "Zbierzcie się w punkcie spotkań i ruszcie razem." },
        { title: "Zwiedzajcie razem", desc: "Poznaj miasto z prawdziwym mieszkańcem i innymi podróżnymi." },
      ],
      benefits: [
        { title: "Najbardziej przystępne", desc: "Dzielenie jednego przewodnika czyni VibeSquad najtańszym sposobem na zwiedzanie z miejscowym." },
        { title: "Poznaj podróżnych", desc: "Społecznościowe z założenia — zwiedzaj u boku osób na tej samej trasie." },
        { title: "Wciąż prawdziwy miejscowy", desc: "Żadnych wyreżyserowanych wycieczek autokarowych. Każdą ekipę prowadzi zweryfikowany miejscowy." },
      ],
      faqs: [
        { q: "Jak duża jest ekipa?", a: "Małe grupy, aby przewodnik mógł poświęcić uwagę każdemu — to nie wycieczka autokarowa dla 50 osób." },
        { q: "Czy mogę założyć własną ekipę?", a: "Tak — stwórz grupę na trasę i godzinę, a inni podróżni będą mogli do Ciebie dołączyć." },
        { q: "Dlaczego jest taniej?", a: "Ponieważ koszt jednego lokalnego przewodnika jest dzielony na całą grupę." },
      ],
      ctaTitle: "Znajdź swoją ekipę",
    },
  },
  private: {
    en: {
      tagline: "Your local. Your day.",
      heroSub:
        "Want it all to yourself? Book a verified local guide for a full day, tailored to exactly what you want to see.",
      steps: [
        { title: "Choose your guide", desc: "Browse verified local guides and pick the right fit." },
        { title: "Plan the day", desc: "Tell them your interests; they craft a personalised route." },
        { title: "Meet & explore", desc: "A full day in the city, just for you or your group." },
        { title: "Pay securely in-app", desc: "One price, agreed up front. No cash, no surprises." },
      ],
      benefits: [
        { title: "Fully personalised", desc: "The day is built around your interests and pace — nobody else's." },
        { title: "Just your group", desc: "Private means private — only you and your guide." },
        { title: "Deepest experience", desc: "More time, more stories, more of the city only locals know." },
      ],
      faqs: [
        { q: "Can I customise the route?", a: "Yes — that's the point. Tell your guide your interests and they plan around them." },
        { q: "Is it good for families?", a: "Ideal — a private guide adapts the pace and content for kids, seniors, anyone." },
        { q: "How far ahead should I book?", a: "Private tours are planned, so book ahead to secure your preferred guide and day." },
      ],
      ctaTitle: "Plan your private day",
    },
    tr: {
      tagline: "Senin yerelin. Senin günün.",
      heroSub:
        "Her şey sana mı kalsın? Tam bir gün için doğrulanmış bir yerel rehber ayırt — tam olarak görmek istediklerine göre tasarlanmış.",
      steps: [
        { title: "Rehberini seç", desc: "Doğrulanmış yerel rehberlere göz at ve sana en uygun olanı seç." },
        { title: "Günü planla", desc: "İlgi alanlarını söyle; sana özel bir rota hazırlasınlar." },
        { title: "Buluş ve keşfet", desc: "Şehirde tam bir gün, yalnızca sana veya grubuna özel." },
        { title: "Uygulamadan güvenle öde", desc: "Önceden anlaşılan tek fiyat. Nakit yok, sürpriz yok." },
      ],
      benefits: [
        { title: "Tamamen kişisel", desc: "Gün senin ilgi alanların ve temponla kurulur — başkasının değil." },
        { title: "Sadece senin grubun", desc: "Özel, özeldir — yalnızca sen ve rehberin." },
        { title: "En derin deneyim", desc: "Daha çok zaman, daha çok hikâye, şehrin yalnızca yerellerin bildiği yanları." },
      ],
      faqs: [
        { q: "Rotayı özelleştirebilir miyim?", a: "Evet — zaten amaç bu. İlgi alanlarını söyle, rehberin ona göre planlar." },
        { q: "Aileler için uygun mu?", a: "İdeal — özel rehber tempoyu ve içeriği çocuklar, yaşlılar, herkes için uyarlar." },
        { q: "Ne kadar önceden rezerve etmeliyim?", a: "Özel turlar planlıdır, bu yüzden tercih ettiğin rehberi ve günü garanti etmek için önceden rezerve et." },
      ],
      ctaTitle: "Özel gününü planla",
    },
    zh: {
      tagline: "你的当地人。你的一天。",
      heroSub:
        "想独享一切？预订一位经过验证的当地向导，为你安排一整天，完全按你想看的内容量身定制。",
      steps: [
        { title: "选择你的向导", desc: "浏览经过验证的当地向导，挑选最合适的那一位。" },
        { title: "规划这一天", desc: "告诉他们你的兴趣，他们会为你定制专属路线。" },
        { title: "见面并探索", desc: "在城市里度过一整天，只属于你或你的团队。" },
        { title: "在应用内安全付款", desc: "一口价，事先约定。无需现金，没有意外。" },
      ],
      benefits: [
        { title: "完全个性化", desc: "这一天围绕你的兴趣和节奏安排——只属于你。" },
        { title: "只有你的团队", desc: "私人就是私人——只有你和你的向导。" },
        { title: "最深入的体验", desc: "更多时间、更多故事、更多只有当地人才知道的城市角落。" },
      ],
      faqs: [
        { q: "我可以自定义路线吗？", a: "可以——这正是重点。告诉向导你的兴趣，他们会据此规划。" },
        { q: "适合家庭吗？", a: "再理想不过——私人向导会为孩子、长者、任何人调整节奏和内容。" },
        { q: "我应该提前多久预订？", a: "私人导览需要提前规划，所以请提前预订，以确保你心仪的向导和日期。" },
      ],
      ctaTitle: "规划你的私人一天",
    },
    ja: {
      tagline: "あなたの地元。あなたの一日。",
      heroSub:
        "すべてを独り占めしたい？認証済みの地元ガイドを丸一日予約して、見たいものに合わせて完全にカスタマイズしましょう。",
      steps: [
        { title: "ガイドを選ぶ", desc: "認証済みの地元ガイドを見て、ぴったりの人を選びましょう。" },
        { title: "一日を計画する", desc: "興味を伝えれば、あなただけのルートを組んでくれます。" },
        { title: "会って探索", desc: "街での丸一日を、あなたやグループだけのために。" },
        { title: "アプリ内で安全に支払い", desc: "事前に合意した一律料金。現金不要、サプライズなし。" },
      ],
      benefits: [
        { title: "完全カスタマイズ", desc: "一日はあなたの興味とペースで組み立てられます——ほかの誰のものでもありません。" },
        { title: "あなたのグループだけ", desc: "プライベートはプライベート——あなたとガイドだけ。" },
        { title: "もっとも深い体験", desc: "より多くの時間、より多くの物語、地元の人しか知らない街の姿を。" },
      ],
      faqs: [
        { q: "ルートをカスタマイズできますか？", a: "はい——それがポイントです。興味をガイドに伝えれば、それに合わせて計画します。" },
        { q: "家族向きですか？", a: "理想的です——プライベートガイドは子ども、年配の方、誰にでもペースと内容を合わせます。" },
        { q: "どれくらい前に予約すべき？", a: "プライベートツアーは計画型なので、希望のガイドと日程を確保するために早めに予約しましょう。" },
      ],
      ctaTitle: "プライベートな一日を計画しよう",
    },
    ko: {
      tagline: "당신의 현지인. 당신의 하루.",
      heroSub:
        "모든 걸 독차지하고 싶나요? 인증된 현지 가이드를 하루 종일 예약해, 보고 싶은 것에 딱 맞춰 꾸며 보세요.",
      steps: [
        { title: "가이드 고르기", desc: "인증된 현지 가이드를 둘러보고 가장 잘 맞는 사람을 고르세요." },
        { title: "하루 계획하기", desc: "관심사를 말해 주면 당신만을 위한 맞춤 코스를 짜 드립니다." },
        { title: "만나서 탐험", desc: "도시에서의 하루 종일, 오직 당신 또는 당신의 그룹만을 위해." },
        { title: "앱에서 안전하게 결제", desc: "미리 합의된 단일 가격. 현금도, 깜짝 비용도 없습니다." },
      ],
      benefits: [
        { title: "완전 맞춤형", desc: "하루가 당신의 관심사와 속도에 맞춰 구성됩니다 — 다른 누구도 아닌." },
        { title: "오직 당신의 그룹만", desc: "프라이빗은 프라이빗 — 오직 당신과 가이드뿐." },
        { title: "가장 깊은 경험", desc: "더 많은 시간, 더 많은 이야기, 현지인만 아는 도시의 모습을." },
      ],
      faqs: [
        { q: "코스를 맞춤 설정할 수 있나요?", a: "네 — 그게 바로 핵심입니다. 관심사를 가이드에게 말하면 그에 맞춰 계획합니다." },
        { q: "가족에게 좋은가요?", a: "이상적입니다 — 프라이빗 가이드는 아이, 어르신, 누구에게나 속도와 내용을 맞춥니다." },
        { q: "얼마나 미리 예약해야 하나요?", a: "프라이빗 투어는 계획형이라, 원하는 가이드와 날짜를 확보하려면 미리 예약하세요." },
      ],
      ctaTitle: "당신만의 프라이빗 하루를 계획하세요",
    },
    ar: {
      tagline: "مرشدك المحلي. يومك أنت.",
      heroSub:
        "تريد كل ذلك لنفسك وحدك؟ احجز مرشدًا محليًا موثوقًا ليوم كامل، مصمَّمًا تمامًا وفق ما تريد رؤيته.",
      steps: [
        { title: "اختر مرشدك", desc: "تصفّح المرشدين المحليين الموثوقين واختر الأنسب لك." },
        { title: "خطّط لليوم", desc: "أخبرهم باهتماماتك؛ فيصممون لك مسارًا شخصيًا." },
        { title: "التقِ واستكشف", desc: "يوم كامل في المدينة، لك أنت أو لمجموعتك فقط." },
        { title: "ادفع بأمان داخل التطبيق", desc: "سعر واحد متفق عليه مسبقًا. لا نقود ولا مفاجآت." },
      ],
      benefits: [
        { title: "مخصص بالكامل", desc: "يُبنى اليوم حول اهتماماتك وإيقاعك أنت — لا أحد غيرك." },
        { title: "مجموعتك وحدها", desc: "الخاص يعني الخاص — أنت ومرشدك فقط." },
        { title: "أعمق تجربة", desc: "وقت أكثر، حكايات أكثر، والمزيد من المدينة التي لا يعرفها سوى السكان المحليين." },
      ],
      faqs: [
        { q: "هل يمكنني تخصيص المسار؟", a: "نعم — هذا هو بيت القصيد. أخبر مرشدك باهتماماتك فيخطط على أساسها." },
        { q: "هل هي مناسبة للعائلات؟", a: "مثالية — يكيّف المرشد الخاص الإيقاع والمحتوى للأطفال وكبار السن والجميع." },
        { q: "كم يجب أن أحجز مسبقًا؟", a: "الجولات الخاصة مخطط لها، لذا احجز مبكرًا لتضمن مرشدك المفضّل واليوم الذي تريده." },
      ],
      ctaTitle: "خطّط ليومك الخاص",
    },
    hr: {
      tagline: "Tvoj lokalac. Tvoj dan.",
      heroSub:
        "Želiš sve samo za sebe? Rezerviraj provjerenog lokalnog vodiča za cijeli dan, prilagođenog točno onomu što želiš vidjeti.",
      steps: [
        { title: "Odaberi vodiča", desc: "Pregledaj provjerene lokalne vodiče i odaberi onog pravog." },
        { title: "Isplaniraj dan", desc: "Reci im svoje interese; oni će osmisliti personaliziranu rutu." },
        { title: "Nađite se i istražujte", desc: "Cijeli dan u gradu, samo za tebe ili tvoju grupu." },
        { title: "Plati sigurno u aplikaciji", desc: "Jedna cijena, dogovorena unaprijed. Bez gotovine, bez iznenađenja." },
      ],
      benefits: [
        { title: "Potpuno personalizirano", desc: "Dan je izgrađen oko tvojih interesa i tempa — ničijih drugih." },
        { title: "Samo tvoja grupa", desc: "Privatno znači privatno — samo ti i tvoj vodič." },
        { title: "Najdublji doživljaj", desc: "Više vremena, više priča, više grada koji poznaju samo lokalci." },
      ],
      faqs: [
        { q: "Mogu li prilagoditi rutu?", a: "Da — u tome je poanta. Reci vodiču svoje interese i on planira oko njih." },
        { q: "Je li to dobro za obitelji?", a: "Idealno — privatni vodič prilagođava tempo i sadržaj djeci, starijima, svima." },
        { q: "Koliko unaprijed trebam rezervirati?", a: "Privatne ture se planiraju, pa rezerviraj unaprijed kako bi osigurao željenog vodiča i dan." },
      ],
      ctaTitle: "Isplaniraj svoj privatni dan",
    },
    id: {
      tagline: "Orang lokalmu. Harimu.",
      heroSub:
        "Ingin semuanya untukmu sendiri? Pesan pemandu lokal terverifikasi untuk sehari penuh, disesuaikan persis dengan apa yang ingin kamu lihat.",
      steps: [
        { title: "Pilih pemandumu", desc: "Telusuri pemandu lokal terverifikasi dan pilih yang paling cocok." },
        { title: "Rencanakan harinya", desc: "Beri tahu minatmu; mereka menyusun rute yang dipersonalisasi." },
        { title: "Bertemu & jelajah", desc: "Sehari penuh di kota, hanya untukmu atau grupmu." },
        { title: "Bayar aman di aplikasi", desc: "Satu harga, disepakati di awal. Tanpa tunai, tanpa kejutan." },
      ],
      benefits: [
        { title: "Sepenuhnya dipersonalisasi", desc: "Hari itu dibangun di sekitar minat dan ritmemu — bukan orang lain." },
        { title: "Hanya grupmu", desc: "Pribadi berarti pribadi — hanya kamu dan pemandumu." },
        { title: "Pengalaman terdalam", desc: "Lebih banyak waktu, lebih banyak cerita, lebih banyak sisi kota yang hanya diketahui orang lokal." },
      ],
      faqs: [
        { q: "Bisakah saya menyesuaikan rutenya?", a: "Bisa — itulah intinya. Beri tahu pemandumu minatmu dan mereka merencanakannya di sekitar itu." },
        { q: "Apakah cocok untuk keluarga?", a: "Ideal — pemandu pribadi menyesuaikan ritme dan konten untuk anak-anak, lansia, siapa saja." },
        { q: "Berapa jauh hari saya harus memesan?", a: "Tur pribadi direncanakan, jadi pesan lebih awal untuk mengamankan pemandu dan hari pilihanmu." },
      ],
      ctaTitle: "Rencanakan hari pribadimu",
    },
    ru: {
      tagline: "Твой местный. Твой день.",
      heroSub:
        "Хочешь всё только для себя? Закажи проверенного местного гида на целый день, точно под то, что ты хочешь увидеть.",
      steps: [
        { title: "Выбери своего гида", desc: "Просматривай проверенных местных гидов и выбери подходящего." },
        { title: "Спланируй день", desc: "Расскажи о своих интересах; они составят персональный маршрут." },
        { title: "Встреться и исследуй", desc: "Целый день в городе, только для тебя или твоей группы." },
        { title: "Плати безопасно в приложении", desc: "Одна цена, согласованная заранее. Без наличных, без сюрпризов." },
      ],
      benefits: [
        { title: "Полностью персонально", desc: "День строится вокруг твоих интересов и темпа — ничьих больше." },
        { title: "Только твоя группа", desc: "Частное значит частное — только ты и твой гид." },
        { title: "Самый глубокий опыт", desc: "Больше времени, больше историй, больше города, который знают только местные." },
      ],
      faqs: [
        { q: "Могу ли я настроить маршрут?", a: "Да — в этом и смысл. Расскажи гиду о своих интересах, и он спланирует вокруг них." },
        { q: "Подходит ли это для семей?", a: "Идеально — частный гид подстраивает темп и содержание под детей, пожилых, кого угодно." },
        { q: "За сколько заранее стоит бронировать?", a: "Частные туры планируются, поэтому бронируй заранее, чтобы закрепить желаемого гида и день." },
      ],
      ctaTitle: "Спланируй свой частный день",
    },
    uk: {
      tagline: "Твій місцевий. Твій день.",
      heroSub:
        "Хочеш усе тільки для себе? Замов перевіреного місцевого гіда на цілий день, точно під те, що ти хочеш побачити.",
      steps: [
        { title: "Обери свого гіда", desc: "Переглядай перевірених місцевих гідів і обери відповідного." },
        { title: "Сплануй день", desc: "Розкажи про свої інтереси; вони складуть персональний маршрут." },
        { title: "Зустрінься та досліджуй", desc: "Цілий день у місті, тільки для тебе чи твоєї групи." },
        { title: "Плати безпечно в застосунку", desc: "Одна ціна, узгоджена заздалегідь. Без готівки, без сюрпризів." },
      ],
      benefits: [
        { title: "Повністю персонально", desc: "День будується навколо твоїх інтересів і темпу — нічиїх більше." },
        { title: "Тільки твоя група", desc: "Приватне означає приватне — тільки ти і твій гід." },
        { title: "Найглибший досвід", desc: "Більше часу, більше історій, більше міста, яке знають лише місцеві." },
      ],
      faqs: [
        { q: "Чи можу я налаштувати маршрут?", a: "Так — у цьому й суть. Розкажи гіду про свої інтереси, і він спланує навколо них." },
        { q: "Чи підходить це для родин?", a: "Ідеально — приватний гід підлаштовує темп і зміст під дітей, літніх людей, будь-кого." },
        { q: "За скільки заздалегідь варто бронювати?", a: "Приватні тури плануються, тому бронюй заздалегідь, щоб закріпити бажаного гіда та день." },
      ],
      ctaTitle: "Сплануй свій приватний день",
    },
    bg: {
      tagline: "Твоят местен. Твоят ден.",
      heroSub:
        "Искаш всичко само за себе си? Резервирай проверен местен гид за цял ден, съобразен точно с това, което искаш да видиш.",
      steps: [
        { title: "Избери своя гид", desc: "Разгледай проверени местни гидове и избери най-подходящия." },
        { title: "Планирай деня", desc: "Кажи им интересите си; те създават персонализиран маршрут." },
        { title: "Срещни се и изследвай", desc: "Цял ден в града, само за теб или твоята група." },
        { title: "Плати сигурно в приложението", desc: "Една цена, договорена предварително. Без пари в брой, без изненади." },
      ],
      benefits: [
        { title: "Напълно персонализирано", desc: "Денят се изгражда около твоите интереси и темпо — на никой друг." },
        { title: "Само твоята група", desc: "Частно значи частно — само ти и твоят гид." },
        { title: "Най-дълбоко преживяване", desc: "Повече време, повече истории, повече от града, който само местните познават." },
      ],
      faqs: [
        { q: "Мога ли да персонализирам маршрута?", a: "Да — точно това е смисълът. Кажи на гида интересите си и той планира около тях." },
        { q: "Подходящо ли е за семейства?", a: "Идеално — частният гид адаптира темпото и съдържанието за деца, възрастни, всеки." },
        { q: "Колко предварително трябва да резервирам?", a: "Частните турове са планирани, затова резервирай предварително, за да си осигуриш предпочитания гид и ден." },
      ],
      ctaTitle: "Планирай своя частен ден",
    },
    sr: {
      tagline: "Tvoj lokalac. Tvoj dan.",
      heroSub:
        "Želiš sve samo za sebe? Rezerviši proverenog lokalnog vodiča za ceo dan, prilagođenog tačno onome što želiš da vidiš.",
      steps: [
        { title: "Izaberi svog vodiča", desc: "Pregledaj proverene lokalne vodiče i izaberi onog pravog." },
        { title: "Isplaniraj dan", desc: "Reci im svoja interesovanja; oni osmišljavaju personalizovanu rutu." },
        { title: "Nađite se i istražujte", desc: "Ceo dan u gradu, samo za tebe ili tvoju grupu." },
        { title: "Plati bezbedno u aplikaciji", desc: "Jedna cena, dogovorena unapred. Bez gotovine, bez iznenađenja." },
      ],
      benefits: [
        { title: "Potpuno personalizovano", desc: "Dan je izgrađen oko tvojih interesovanja i tempa — ničijih drugih." },
        { title: "Samo tvoja grupa", desc: "Privatno znači privatno — samo ti i tvoj vodič." },
        { title: "Najdublji doživljaj", desc: "Više vremena, više priča, više grada koji poznaju samo lokalci." },
      ],
      faqs: [
        { q: "Mogu li da prilagodim rutu?", a: "Da — u tome je poenta. Reci vodiču svoja interesovanja i on planira oko njih." },
        { q: "Da li je dobro za porodice?", a: "Idealno — privatni vodič prilagođava tempo i sadržaj deci, starijima, svima." },
        { q: "Koliko unapred treba da rezervišem?", a: "Privatne ture se planiraju, pa rezerviši unapred kako bi osigurao željenog vodiča i dan." },
      ],
      ctaTitle: "Isplaniraj svoj privatni dan",
    },
    el: {
      tagline: "Ο ντόπιος σου. Η μέρα σου.",
      heroSub:
        "Τα θέλεις όλα δικά σου; Κλείσε έναν επαληθευμένο ντόπιο ξεναγό για μια ολόκληρη μέρα, φτιαγμένη ακριβώς για ό,τι θέλεις να δεις.",
      steps: [
        { title: "Διάλεξε τον ξεναγό σου", desc: "Περιήγησε σε επαληθευμένους ντόπιους ξεναγούς και διάλεξε τον κατάλληλο." },
        { title: "Σχεδίασε τη μέρα", desc: "Πες τους τα ενδιαφέροντά σου· φτιάχνουν μια εξατομικευμένη διαδρομή." },
        { title: "Συνάντηση & εξερεύνηση", desc: "Μια ολόκληρη μέρα στην πόλη, μόνο για σένα ή την ομάδα σου." },
        { title: "Πλήρωσε με ασφάλεια στην εφαρμογή", desc: "Μία τιμή, συμφωνημένη εκ των προτέρων. Χωρίς μετρητά, χωρίς εκπλήξεις." },
      ],
      benefits: [
        { title: "Πλήρως εξατομικευμένο", desc: "Η μέρα χτίζεται γύρω από τα ενδιαφέροντα και τον ρυθμό σου — κανενός άλλου." },
        { title: "Μόνο η ομάδα σου", desc: "Ιδιωτικό σημαίνει ιδιωτικό — μόνο εσύ και ο ξεναγός σου." },
        { title: "Η πιο βαθιά εμπειρία", desc: "Περισσότερος χρόνος, περισσότερες ιστορίες, περισσότερη πόλη που μόνο οι ντόπιοι ξέρουν." },
      ],
      faqs: [
        { q: "Μπορώ να προσαρμόσω τη διαδρομή;", a: "Ναι — αυτό είναι το νόημα. Πες στον ξεναγό σου τα ενδιαφέροντά σου και σχεδιάζει γύρω από αυτά." },
        { q: "Είναι καλό για οικογένειες;", a: "Ιδανικό — ένας ιδιωτικός ξεναγός προσαρμόζει τον ρυθμό και το περιεχόμενο για παιδιά, ηλικιωμένους, οποιονδήποτε." },
        { q: "Πόσο νωρίτερα πρέπει να κλείσω;", a: "Οι ιδιωτικές ξεναγήσεις σχεδιάζονται, οπότε κλείσε νωρίς για να εξασφαλίσεις τον ξεναγό και τη μέρα που προτιμάς." },
      ],
      ctaTitle: "Σχεδίασε την ιδιωτική σου μέρα",
    },
    ro: {
      tagline: "Localnicul tău. Ziua ta.",
      heroSub:
        "Vrei totul doar pentru tine? Rezervă un ghid local verificat pentru o zi întreagă, croit exact pe ceea ce vrei să vezi.",
      steps: [
        { title: "Alege-ți ghidul", desc: "Răsfoiește ghizi locali verificați și alege-l pe cel potrivit." },
        { title: "Planifică ziua", desc: "Spune-le interesele tale; ei creează un traseu personalizat." },
        { title: "Întâlnește-te și explorează", desc: "O zi întreagă în oraș, doar pentru tine sau grupul tău." },
        { title: "Plătește în siguranță în aplicație", desc: "Un preț, agreat din start. Fără numerar, fără surprize." },
      ],
      benefits: [
        { title: "Complet personalizat", desc: "Ziua este construită în jurul intereselor și ritmului tău — al nimănui altcuiva." },
        { title: "Doar grupul tău", desc: "Privat înseamnă privat — doar tu și ghidul tău." },
        { title: "Cea mai profundă experiență", desc: "Mai mult timp, mai multe povești, mai mult din orașul pe care doar localnicii îl știu." },
      ],
      faqs: [
        { q: "Pot personaliza traseul?", a: "Da — exact asta e ideea. Spune-i ghidului interesele tale și planifică în jurul lor." },
        { q: "Este bun pentru familii?", a: "Ideal — un ghid privat adaptează ritmul și conținutul pentru copii, vârstnici, oricine." },
        { q: "Cu cât timp înainte ar trebui să rezerv?", a: "Tururile private se planifică, așa că rezervă din timp pentru a-ți asigura ghidul și ziua preferată." },
      ],
      ctaTitle: "Planifică-ți ziua privată",
    },
    de: {
      tagline: "Dein Local. Dein Tag.",
      heroSub:
        "Willst du alles für dich allein? Buche einen verifizierten lokalen Guide für einen ganzen Tag, zugeschnitten auf genau das, was du sehen möchtest.",
      steps: [
        { title: "Wähle deinen Guide", desc: "Durchstöbere verifizierte lokale Guides und finde den passenden." },
        { title: "Plant den Tag", desc: "Nenne deine Interessen; sie gestalten eine persönliche Route." },
        { title: "Treffen & entdecken", desc: "Ein ganzer Tag in der Stadt, nur für dich oder deine Gruppe." },
        { title: "Sicher in der App zahlen", desc: "Ein Preis, vorab vereinbart. Kein Bargeld, keine Überraschungen." },
      ],
      benefits: [
        { title: "Voll personalisiert", desc: "Der Tag ist um deine Interessen und dein Tempo herum gebaut — um niemanden sonst." },
        { title: "Nur deine Gruppe", desc: "Privat heißt privat — nur du und dein Guide." },
        { title: "Tiefstes Erlebnis", desc: "Mehr Zeit, mehr Geschichten, mehr von der Stadt, die nur Locals kennen." },
      ],
      faqs: [
        { q: "Kann ich die Route anpassen?", a: "Ja — genau darum geht es. Nenne deinem Guide deine Interessen und er plant darum herum." },
        { q: "Ist es gut für Familien?", a: "Ideal — ein privater Guide passt Tempo und Inhalt für Kinder, Senioren, jeden an." },
        { q: "Wie weit im Voraus sollte ich buchen?", a: "Private Touren werden geplant, also buche im Voraus, um deinen Wunsch-Guide und -Tag zu sichern." },
      ],
      ctaTitle: "Plane deinen privaten Tag",
    },
    fr: {
      tagline: "Votre local. Votre journée.",
      heroSub:
        "Vous voulez tout pour vous ? Réservez un guide local vérifié pour une journée entière, adaptée exactement à ce que vous voulez voir.",
      steps: [
        { title: "Choisissez votre guide", desc: "Parcourez les guides locaux vérifiés et choisissez celui qui convient." },
        { title: "Planifiez la journée", desc: "Indiquez vos centres d'intérêt ; ils élaborent un itinéraire personnalisé." },
        { title: "Rencontrez et explorez", desc: "Une journée entière en ville, rien que pour vous ou votre groupe." },
        { title: "Payez en sécurité dans l'app", desc: "Un prix, convenu à l'avance. Pas d'espèces, pas de surprises." },
      ],
      benefits: [
        { title: "Entièrement personnalisé", desc: "La journée est construite autour de vos centres d'intérêt et de votre rythme — pas ceux d'un autre." },
        { title: "Rien que votre groupe", desc: "Privé veut dire privé — seulement vous et votre guide." },
        { title: "L'expérience la plus profonde", desc: "Plus de temps, plus d'histoires, plus de la ville que seuls les locaux connaissent." },
      ],
      faqs: [
        { q: "Puis-je personnaliser l'itinéraire ?", a: "Oui — c'est tout l'intérêt. Indiquez vos centres d'intérêt à votre guide et il planifie autour." },
        { q: "Est-ce adapté aux familles ?", a: "Idéal — un guide privé adapte le rythme et le contenu pour les enfants, les seniors, tout le monde." },
        { q: "Combien de temps à l'avance dois-je réserver ?", a: "Les visites privées se planifient, alors réservez à l'avance pour garantir le guide et le jour souhaités." },
      ],
      ctaTitle: "Planifiez votre journée privée",
    },
    es: {
      tagline: "Tu local. Tu día.",
      heroSub:
        "¿Lo quieres todo para ti? Reserva un guía local verificado para un día entero, adaptado a exactamente lo que quieres ver.",
      steps: [
        { title: "Elige tu guía", desc: "Explora guías locales verificados y elige el más adecuado." },
        { title: "Planifica el día", desc: "Cuéntales tus intereses; crean una ruta personalizada." },
        { title: "Reúnete y explora", desc: "Un día entero en la ciudad, solo para ti o tu grupo." },
        { title: "Paga seguro en la app", desc: "Un precio, acordado de antemano. Sin efectivo, sin sorpresas." },
      ],
      benefits: [
        { title: "Totalmente personalizado", desc: "El día se construye en torno a tus intereses y tu ritmo — no los de nadie más." },
        { title: "Solo tu grupo", desc: "Privado significa privado — solo tú y tu guía." },
        { title: "La experiencia más profunda", desc: "Más tiempo, más historias, más de la ciudad que solo los locales conocen." },
      ],
      faqs: [
        { q: "¿Puedo personalizar la ruta?", a: "Sí — de eso se trata. Cuéntale a tu guía tus intereses y planifica en torno a ellos." },
        { q: "¿Es bueno para familias?", a: "Ideal — un guía privado adapta el ritmo y el contenido para niños, mayores, cualquiera." },
        { q: "¿Con cuánta antelación debo reservar?", a: "Los tours privados se planifican, así que reserva con antelación para asegurar tu guía y día preferidos." },
      ],
      ctaTitle: "Planifica tu día privado",
    },
    it: {
      tagline: "Il tuo local. La tua giornata.",
      heroSub:
        "Vuoi tutto per te? Prenota una guida locale verificata per un'intera giornata, su misura esattamente per ciò che vuoi vedere.",
      steps: [
        { title: "Scegli la tua guida", desc: "Sfoglia le guide locali verificate e scegli quella giusta." },
        { title: "Pianifica la giornata", desc: "Raccontale i tuoi interessi; creerà un itinerario personalizzato." },
        { title: "Incontra ed esplora", desc: "Un'intera giornata in città, solo per te o il tuo gruppo." },
        { title: "Paga in sicurezza nell'app", desc: "Un prezzo, concordato in anticipo. Niente contanti, niente sorprese." },
      ],
      benefits: [
        { title: "Completamente personalizzato", desc: "La giornata è costruita attorno ai tuoi interessi e al tuo ritmo — di nessun altro." },
        { title: "Solo il tuo gruppo", desc: "Privato significa privato — solo tu e la tua guida." },
        { title: "L'esperienza più profonda", desc: "Più tempo, più storie, più della città che solo i local conoscono." },
      ],
      faqs: [
        { q: "Posso personalizzare l'itinerario?", a: "Sì — è proprio il punto. Racconta alla tua guida i tuoi interessi e pianifica attorno a quelli." },
        { q: "È adatto alle famiglie?", a: "Ideale — una guida privata adatta ritmo e contenuti per bambini, anziani, chiunque." },
        { q: "Con quanto anticipo devo prenotare?", a: "I tour privati si pianificano, quindi prenota in anticipo per assicurarti la guida e il giorno preferiti." },
      ],
      ctaTitle: "Pianifica la tua giornata privata",
    },
    nl: {
      tagline: "Jouw local. Jouw dag.",
      heroSub:
        "Wil je het helemaal voor jezelf? Boek een geverifieerde lokale gids voor een hele dag, afgestemd op precies wat jij wilt zien.",
      steps: [
        { title: "Kies je gids", desc: "Blader door geverifieerde lokale gidsen en kies de juiste." },
        { title: "Plan de dag", desc: "Vertel je interesses; zij stellen een persoonlijke route samen." },
        { title: "Ontmoet & ontdek", desc: "Een hele dag in de stad, alleen voor jou of je groep." },
        { title: "Betaal veilig in de app", desc: "Eén prijs, vooraf afgesproken. Geen contant geld, geen verrassingen." },
      ],
      benefits: [
        { title: "Volledig persoonlijk", desc: "De dag is opgebouwd rond jouw interesses en tempo — van niemand anders." },
        { title: "Alleen jouw groep", desc: "Privé betekent privé — alleen jij en je gids." },
        { title: "De diepste ervaring", desc: "Meer tijd, meer verhalen, meer van de stad die alleen locals kennen." },
      ],
      faqs: [
        { q: "Kan ik de route aanpassen?", a: "Ja — daar gaat het om. Vertel je gids je interesses en hij plant daaromheen." },
        { q: "Is het goed voor gezinnen?", a: "Ideaal — een privégids past tempo en inhoud aan voor kinderen, senioren, iedereen." },
        { q: "Hoe ver van tevoren moet ik boeken?", a: "Privétours worden gepland, dus boek op tijd om je gewenste gids en dag veilig te stellen." },
      ],
      ctaTitle: "Plan je privédag",
    },
    pt: {
      tagline: "O seu local. O seu dia.",
      heroSub:
        "Quer tudo só para si? Reserve um guia local verificado para um dia inteiro, feito à medida exatamente do que quer ver.",
      steps: [
        { title: "Escolha o seu guia", desc: "Explore guias locais verificados e escolha o mais adequado." },
        { title: "Planeie o dia", desc: "Diga-lhes os seus interesses; eles criam um percurso personalizado." },
        { title: "Encontre-se e explore", desc: "Um dia inteiro na cidade, só para si ou para o seu grupo." },
        { title: "Pague com segurança na app", desc: "Um preço, acordado à partida. Sem dinheiro, sem surpresas." },
      ],
      benefits: [
        { title: "Totalmente personalizado", desc: "O dia é construído em torno dos seus interesses e do seu ritmo — de mais ninguém." },
        { title: "Só o seu grupo", desc: "Privado significa privado — apenas você e o seu guia." },
        { title: "A experiência mais profunda", desc: "Mais tempo, mais histórias, mais da cidade que só os locais conhecem." },
      ],
      faqs: [
        { q: "Posso personalizar o percurso?", a: "Sim — é mesmo esse o objetivo. Diga ao seu guia os seus interesses e ele planeia em torno deles." },
        { q: "É bom para famílias?", a: "Ideal — um guia privado adapta o ritmo e o conteúdo para crianças, idosos, qualquer pessoa." },
        { q: "Com quanta antecedência devo reservar?", a: "Os tours privados são planeados, por isso reserve com antecedência para garantir o guia e o dia preferidos." },
      ],
      ctaTitle: "Planeie o seu dia privado",
    },
    pl: {
      tagline: "Twój miejscowy. Twój dzień.",
      heroSub:
        "Chcesz mieć wszystko tylko dla siebie? Zarezerwuj zweryfikowanego lokalnego przewodnika na cały dzień, dopasowanego dokładnie do tego, co chcesz zobaczyć.",
      steps: [
        { title: "Wybierz przewodnika", desc: "Przeglądaj zweryfikowanych lokalnych przewodników i wybierz odpowiedniego." },
        { title: "Zaplanuj dzień", desc: "Powiedz im o swoich zainteresowaniach; ułożą spersonalizowaną trasę." },
        { title: "Spotkaj się i zwiedzaj", desc: "Cały dzień w mieście, tylko dla Ciebie lub Twojej grupy." },
        { title: "Zapłać bezpiecznie w aplikacji", desc: "Jedna cena, ustalona z góry. Bez gotówki, bez niespodzianek." },
      ],
      benefits: [
        { title: "W pełni spersonalizowany", desc: "Dzień jest zbudowany wokół Twoich zainteresowań i tempa — niczyich innych." },
        { title: "Tylko Twoja grupa", desc: "Prywatny znaczy prywatny — tylko Ty i Twój przewodnik." },
        { title: "Najgłębsze doświadczenie", desc: "Więcej czasu, więcej historii, więcej miasta, które znają tylko miejscowi." },
      ],
      faqs: [
        { q: "Czy mogę dostosować trasę?", a: "Tak — o to właśnie chodzi. Powiedz przewodnikowi o swoich zainteresowaniach, a zaplanuje wokół nich." },
        { q: "Czy to dobre dla rodzin?", a: "Idealne — prywatny przewodnik dostosowuje tempo i treść do dzieci, seniorów, każdego." },
        { q: "Z jakim wyprzedzeniem powinienem rezerwować?", a: "Prywatne wycieczki się planuje, więc rezerwuj z wyprzedzeniem, aby zapewnić sobie wybranego przewodnika i dzień." },
      ],
      ctaTitle: "Zaplanuj swój prywatny dzień",
    },
  },
  vibeask: {
    en: {
      tagline: "A local in your pocket. Free.",
      heroSub:
        "You don't always need a tour — sometimes you just need a local who actually knows. Ask anything, get a real answer in minutes. Completely free.",
      steps: [
        { title: "Tap VibeAsk", desc: "Right from the home screen — no booking, no commitment." },
        { title: "Ask anything", desc: "“What can I eat nearby?” “How do I get to Topkapı?” “Is this place worth it?” Type it, send a photo, or voice note." },
        { title: "A real local replies", desc: "A verified local guide answers you personally — usually within minutes." },
        { title: "Explore with confidence", desc: "No tourist traps, no guessing. And if you want more, your local can show you in person." },
      ],
      benefits: [
        { title: "Actually free", desc: "No fee, no catch. Ask before you ever book anything. This is how you meet your city." },
        { title: "A real human, not AI", desc: "Not a chatbot. A licensed local who lives there and knows what tourists never find." },
        { title: "Beat the tourist traps", desc: "Check a price, dodge a scam, find the real spot — a local in your corner, instantly." },
      ],
      faqs: [
        { q: "Is VibeAsk really free?", a: "Yes. Ask a local guide anything at no cost — it's our way of welcoming you to the city." },
        { q: "Who answers my questions?", a: "A real, verified local guide — not a bot. Someone who actually lives there and knows it inside out." },
        { q: "What can I ask?", a: "Anything travel-related: food spots, fair prices, directions, what's worth it, what's open, hidden gems — whatever's on your mind." },
        { q: "Do I have to book a tour?", a: "Never. VibeAsk is free help with no strings attached. If you love it, you can always book a tour later — but you don't have to." },
      ],
      ctaTitle: "Ask a local. Free, right now.",
    },
    tr: {
      tagline: "Cebinde bir yerel. Ücretsiz.",
      heroSub:
        "Her zaman bir tura ihtiyacın yok — bazen sadece gerçekten bilen bir yerele ihtiyacın var. Ne istersen sor, dakikalar içinde gerçek bir cevap al. Tamamen ücretsiz.",
      steps: [
        { title: "VibeAsk'a dokun", desc: "Doğrudan ana ekrandan — rezervasyon yok, taahhüt yok." },
        { title: "Ne istersen sor", desc: "\"Yakında ne yiyebilirim?\" \"Topkapı'ya nasıl giderim?\" \"Burası değer mi?\" Yaz, fotoğraf gönder ya da sesli not bırak." },
        { title: "Gerçek bir yerel yanıtlar", desc: "Doğrulanmış bir yerel rehber sana bizzat cevap verir — genellikle dakikalar içinde." },
        { title: "Güvenle keşfet", desc: "Turist tuzağı yok, tahmin yok. Daha fazlasını istersen yerelin sana bizzat gösterebilir." },
      ],
      benefits: [
        { title: "Gerçekten ücretsiz", desc: "Ücret yok, gizli koşul yok. Bir şey rezerve etmeden önce sor. Şehrinle böyle tanışırsın." },
        { title: "Gerçek insan, yapay zekâ değil", desc: "Bir chatbot değil. Orada yaşayan ve turistlerin asla bulamadığını bilen lisanslı bir yerel." },
        { title: "Turist tuzaklarını aş", desc: "Fiyat kontrol et, dolandırılma, gerçek mekânı bul — anında yanında bir yerel." },
      ],
      faqs: [
        { q: "VibeAsk gerçekten ücretsiz mi?", a: "Evet. Bir yerel rehbere ne istersen ücretsiz sor — bu bizim şehre hoş geldin deyişimiz." },
        { q: "Sorularımı kim yanıtlıyor?", a: "Gerçek, doğrulanmış bir yerel rehber — bot değil. Orada yaşayan ve şehri çok iyi bilen biri." },
        { q: "Ne sorabilirim?", a: "Seyahatle ilgili her şey: yemek mekânları, makul fiyatlar, yol tarifi, neyin değer olduğu, neyin açık olduğu, gizli yerler — aklındaki her şey." },
        { q: "Tur rezerve etmek zorunda mıyım?", a: "Asla. VibeAsk koşulsuz, ücretsiz yardımdır. Beğenirsen daha sonra tur rezerve edebilirsin — ama zorunda değilsin." },
      ],
      ctaTitle: "Bir yerele sor. Şimdi, ücretsiz.",
    },
    zh: {
      tagline: "口袋里的当地人。免费。",
      heroSub:
        "你并不总是需要一场导览——有时你只需要一个真正了解情况的当地人。问什么都行，几分钟内得到真实答案。完全免费。",
      steps: [
        { title: "轻点 VibeAsk", desc: "就在主屏幕上——无需预订，无需承诺。" },
        { title: "问什么都行", desc: "“附近有什么可以吃的？”“怎么去托普卡帕？”“这地方值得去吗？”打字、发照片，或留语音。" },
        { title: "真正的当地人回复", desc: "经过验证的当地向导亲自回答你——通常在几分钟内。" },
        { title: "自信地探索", desc: "没有旅游陷阱，无需猜测。如果你想了解更多，你的当地人还能当面带你看。" },
      ],
      benefits: [
        { title: "真正免费", desc: "不收费，没有套路。在预订任何东西之前先问。这就是你认识城市的方式。" },
        { title: "真人，不是 AI", desc: "不是聊天机器人。一位住在当地、知道游客永远找不到之处的持证当地人。" },
        { title: "避开旅游陷阱", desc: "核对价格、躲开骗局、找到真正的好地方——一位当地人即刻站在你这边。" },
      ],
      faqs: [
        { q: "VibeAsk 真的免费吗？", a: "是的。免费向当地向导提问任何事——这是我们欢迎你来到这座城市的方式。" },
        { q: "谁来回答我的问题？", a: "一位真实的、经过验证的当地向导——不是机器人。一个真正住在那里、了如指掌的人。" },
        { q: "我可以问什么？", a: "任何与旅行有关的事：美食地点、公道价格、路线指引、哪些值得、哪些营业、隐藏宝藏——你想到的任何事。" },
        { q: "我必须预订导览吗？", a: "从不。VibeAsk 是无附加条件的免费帮助。如果你喜欢，以后随时可以预订导览——但你不是必须的。" },
      ],
      ctaTitle: "问问当地人。免费，就现在。",
    },
    ja: {
      tagline: "ポケットの中の地元の人。無料。",
      heroSub:
        "いつもツアーが必要なわけではありません——本当に詳しい地元の人がほしいときがあるだけ。何でも聞いて、数分で本物の答えを。完全無料。",
      steps: [
        { title: "VibeAsk をタップ", desc: "ホーム画面からすぐに——予約不要、約束も不要。" },
        { title: "何でも聞いて", desc: "「近くで何が食べられる？」「トプカプへはどう行く？」「ここは行く価値ある？」入力しても、写真を送っても、ボイスメモでも。" },
        { title: "本物の地元の人が返信", desc: "認証済みの地元ガイドが直接答えてくれます——たいてい数分以内に。" },
        { title: "自信を持って探索", desc: "観光客向けの罠も、当て推量もなし。もっと知りたければ、地元の人が直接案内してくれます。" },
      ],
      benefits: [
        { title: "本当に無料", desc: "料金なし、裏もなし。何かを予約する前に聞いてみて。これが街と出会う方法です。" },
        { title: "AIではなく本物の人間", desc: "チャットボットではありません。そこに住み、観光客が決して見つけられないことを知る公認の地元の人。" },
        { title: "観光客向けの罠を回避", desc: "価格を確認し、詐欺をかわし、本物の店を見つける——地元の味方が即座にそばに。" },
      ],
      faqs: [
        { q: "VibeAsk は本当に無料？", a: "はい。地元ガイドに何でも無料で聞けます——街へようこそ、という私たちの気持ちです。" },
        { q: "誰が質問に答えるの？", a: "本物の、認証済みの地元ガイドです——ボットではありません。実際にそこに住み、隅々まで知る人です。" },
        { q: "何を聞ける？", a: "旅に関することなら何でも：食事処、適正価格、道案内、行く価値があるか、開いているか、隠れた名所——思いつくこと何でも。" },
        { q: "ツアーを予約しなきゃいけない？", a: "決して。VibeAsk は条件なしの無料サポートです。気に入ったら後でツアーを予約できます——でも必須ではありません。" },
      ],
      ctaTitle: "地元の人に聞こう。無料、今すぐ。",
    },
    ko: {
      tagline: "주머니 속 현지인. 무료.",
      heroSub:
        "항상 투어가 필요한 건 아닙니다 — 때로는 진짜 잘 아는 현지인이 필요할 뿐이죠. 무엇이든 물어보고, 몇 분 안에 진짜 답을 받으세요. 완전 무료.",
      steps: [
        { title: "VibeAsk 탭하기", desc: "홈 화면에서 바로 — 예약도, 약속도 없이." },
        { title: "무엇이든 물어보기", desc: "“근처에서 뭘 먹을 수 있나요?” “토프카프에 어떻게 가나요?” “이곳 갈 만한가요?” 입력하거나 사진을 보내거나 음성 메모를 남기세요." },
        { title: "진짜 현지인이 답변", desc: "인증된 현지 가이드가 직접 답해 줍니다 — 보통 몇 분 안에." },
        { title: "자신 있게 탐험", desc: "관광객 함정도, 추측도 없이. 더 알고 싶다면 현지인이 직접 보여 줄 수도 있어요." },
      ],
      benefits: [
        { title: "진짜 무료", desc: "요금도, 함정도 없습니다. 무언가 예약하기 전에 먼저 물어보세요. 이렇게 당신의 도시를 만나는 거예요." },
        { title: "AI가 아닌 진짜 사람", desc: "챗봇이 아닙니다. 그곳에 살며 관광객은 절대 못 찾는 것을 아는 면허 보유 현지인입니다." },
        { title: "관광객 함정 피하기", desc: "가격을 확인하고, 사기를 피하고, 진짜 명소를 찾으세요 — 현지인이 즉시 당신 편에." },
      ],
      faqs: [
        { q: "VibeAsk는 정말 무료인가요?", a: "네. 현지 가이드에게 무엇이든 무료로 물어보세요 — 도시에 온 당신을 환영하는 우리의 방식입니다." },
        { q: "누가 제 질문에 답하나요?", a: "진짜, 인증된 현지 가이드입니다 — 봇이 아닙니다. 실제로 그곳에 살며 속속들이 아는 사람이에요." },
        { q: "무엇을 물어볼 수 있나요?", a: "여행 관련이라면 무엇이든: 맛집, 적정 가격, 길 안내, 갈 만한 곳, 여는 곳, 숨은 명소 — 마음에 떠오르는 무엇이든." },
        { q: "투어를 예약해야 하나요?", a: "전혀요. VibeAsk는 조건 없는 무료 도움입니다. 마음에 들면 나중에 투어를 예약할 수 있어요 — 하지만 의무는 아닙니다." },
      ],
      ctaTitle: "현지인에게 물어보세요. 무료로, 지금 바로.",
    },
    ar: {
      tagline: "شخص محلي في جيبك. مجانًا.",
      heroSub:
        "لست بحاجة دائمًا إلى جولة — أحيانًا تحتاج فقط إلى شخص محلي يعرف حقًا. اسأل أي شيء، واحصل على إجابة حقيقية خلال دقائق. مجانًا تمامًا.",
      steps: [
        { title: "انقر على VibeAsk", desc: "مباشرةً من الشاشة الرئيسية — دون حجز ودون التزام." },
        { title: "اسأل أي شيء", desc: "“ماذا يمكنني أن آكل في الجوار؟” “كيف أصل إلى توبكابي؟” “هل يستحق هذا المكان؟” اكتب، أرسل صورة، أو سجّل ملاحظة صوتية." },
        { title: "يرد شخص محلي حقيقي", desc: "يجيبك مرشد محلي موثوق شخصيًا — عادةً خلال دقائق." },
        { title: "استكشف بثقة", desc: "لا فخاخ سياحية ولا تخمين. وإذا أردت المزيد، يمكن لمرشدك المحلي أن يريك ذلك شخصيًا." },
      ],
      benefits: [
        { title: "مجاني فعلاً", desc: "لا رسوم ولا خدع. اسأل قبل أن تحجز أي شيء. هكذا تتعرّف على مدينتك." },
        { title: "إنسان حقيقي، لا ذكاء اصطناعي", desc: "ليس روبوت محادثة. شخص محلي مرخّص يعيش هناك ويعرف ما لا يجده السياح أبدًا." },
        { title: "تجاوز فخاخ السياح", desc: "تحقق من سعر، تجنّب عملية احتيال، اعثر على المكان الحقيقي — شخص محلي إلى جانبك فورًا." },
      ],
      faqs: [
        { q: "هل VibeAsk مجاني حقًا؟", a: "نعم. اسأل مرشدًا محليًا أي شيء دون مقابل — إنها طريقتنا في الترحيب بك في المدينة." },
        { q: "من يجيب على أسئلتي؟", a: "مرشد محلي حقيقي وموثوق — وليس روبوتًا. شخص يعيش هناك فعلاً ويعرف المكان عن ظهر قلب." },
        { q: "ماذا يمكنني أن أسأل؟", a: "أي شيء متعلق بالسفر: أماكن الطعام، الأسعار العادلة، الاتجاهات، ما يستحق، ما هو مفتوح، الأماكن المخفية — أي شيء يدور في ذهنك." },
        { q: "هل يجب أن أحجز جولة؟", a: "أبدًا. VibeAsk مساعدة مجانية دون أي شروط. إذا أعجبك، يمكنك دائمًا حجز جولة لاحقًا — لكنك لست مضطرًا." },
      ],
      ctaTitle: "اسأل شخصًا محليًا. مجانًا، الآن.",
    },
    hr: {
      tagline: "Lokalac u tvom džepu. Besplatno.",
      heroSub:
        "Ne treba ti uvijek tura — ponekad ti samo treba lokalac koji stvarno zna. Pitaj bilo što, dobij pravi odgovor u nekoliko minuta. Potpuno besplatno.",
      steps: [
        { title: "Dodirni VibeAsk", desc: "Odmah s početnog zaslona — bez rezervacije, bez obaveze." },
        { title: "Pitaj bilo što", desc: "“Što mogu pojesti u blizini?” “Kako doći do Topkapıja?” “Isplati li se ovo mjesto?” Upiši, pošalji fotografiju ili glasovnu poruku." },
        { title: "Odgovara pravi lokalac", desc: "Provjereni lokalni vodič odgovara ti osobno — obično u nekoliko minuta." },
        { title: "Istražuj s povjerenjem", desc: "Bez turističkih zamki, bez nagađanja. A ako želiš više, tvoj ti lokalac može pokazati uživo." },
      ],
      benefits: [
        { title: "Stvarno besplatno", desc: "Bez naknade, bez kvake. Pitaj prije nego išta rezerviraš. Tako upoznaješ svoj grad." },
        { title: "Pravi čovjek, ne AI", desc: "Nije chatbot. Licencirani lokalac koji ondje živi i zna ono što turisti nikad ne pronađu." },
        { title: "Nadmudri turističke zamke", desc: "Provjeri cijenu, izbjegni prijevaru, pronađi pravo mjesto — lokalac na tvojoj strani, odmah." },
      ],
      faqs: [
        { q: "Je li VibeAsk stvarno besplatan?", a: "Da. Pitaj lokalnog vodiča bilo što bez troška — to je naš način da ti poželimo dobrodošlicu u grad." },
        { q: "Tko odgovara na moja pitanja?", a: "Pravi, provjereni lokalni vodič — ne bot. Netko tko ondje stvarno živi i poznaje ga u dušu." },
        { q: "Što mogu pitati?", a: "Bilo što vezano uz putovanje: mjesta za jelo, poštene cijene, upute, što se isplati, što je otvoreno, skrivene dragulje — što god ti je na umu." },
        { q: "Moram li rezervirati turu?", a: "Nikad. VibeAsk je besplatna pomoć bez ikakvih obaveza. Ako ti se svidi, uvijek možeš kasnije rezervirati turu — ali ne moraš." },
      ],
      ctaTitle: "Pitaj lokalca. Besplatno, odmah.",
    },
    id: {
      tagline: "Orang lokal di sakumu. Gratis.",
      heroSub:
        "Kamu tidak selalu butuh tur — kadang kamu hanya butuh orang lokal yang benar-benar tahu. Tanya apa saja, dapat jawaban nyata dalam hitungan menit. Sepenuhnya gratis.",
      steps: [
        { title: "Ketuk VibeAsk", desc: "Langsung dari layar utama — tanpa pemesanan, tanpa komitmen." },
        { title: "Tanya apa saja", desc: "“Apa yang bisa saya makan di dekat sini?” “Bagaimana cara ke Topkapı?” “Apakah tempat ini sepadan?” Ketik, kirim foto, atau pesan suara." },
        { title: "Orang lokal sungguhan menjawab", desc: "Pemandu lokal terverifikasi menjawabmu secara pribadi — biasanya dalam beberapa menit." },
        { title: "Jelajah dengan percaya diri", desc: "Tanpa jebakan turis, tanpa menebak-nebak. Dan jika ingin lebih, orang lokalmu bisa menunjukkannya langsung." },
      ],
      benefits: [
        { title: "Benar-benar gratis", desc: "Tanpa biaya, tanpa jebakan. Tanya sebelum kamu memesan apa pun. Begini caramu mengenal kotamu." },
        { title: "Manusia sungguhan, bukan AI", desc: "Bukan chatbot. Orang lokal bersertifikat yang tinggal di sana dan tahu hal yang tak pernah ditemukan turis." },
        { title: "Hindari jebakan turis", desc: "Cek harga, hindari penipuan, temukan tempat yang sebenarnya — orang lokal di pihakmu, seketika." },
      ],
      faqs: [
        { q: "Apakah VibeAsk benar-benar gratis?", a: "Ya. Tanya pemandu lokal apa saja tanpa biaya — ini cara kami menyambutmu di kota." },
        { q: "Siapa yang menjawab pertanyaan saya?", a: "Pemandu lokal sungguhan dan terverifikasi — bukan bot. Seseorang yang benar-benar tinggal di sana dan paham luar dalam." },
        { q: "Apa yang bisa saya tanyakan?", a: "Apa saja seputar perjalanan: tempat makan, harga yang wajar, petunjuk arah, apa yang sepadan, apa yang buka, permata tersembunyi — apa pun yang ada di benakmu." },
        { q: "Apakah saya harus memesan tur?", a: "Tidak pernah. VibeAsk adalah bantuan gratis tanpa syarat. Jika kamu suka, kamu selalu bisa memesan tur nanti — tapi tidak wajib." },
      ],
      ctaTitle: "Tanya orang lokal. Gratis, sekarang juga.",
    },
    ru: {
      tagline: "Местный в твоём кармане. Бесплатно.",
      heroSub:
        "Тур нужен не всегда — иногда нужен просто местный, который действительно знает. Спрашивай о чём угодно, получай настоящий ответ за минуты. Совершенно бесплатно.",
      steps: [
        { title: "Нажми VibeAsk", desc: "Прямо с главного экрана — без бронирования, без обязательств." },
        { title: "Спрашивай о чём угодно", desc: "«Что поесть поблизости?» «Как добраться до Topkapı?» «Стоит ли это место того?» Напиши, отправь фото или голосовое сообщение." },
        { title: "Отвечает настоящий местный", desc: "Проверенный местный гид отвечает тебе лично — обычно за считаные минуты." },
        { title: "Исследуй уверенно", desc: "Без туристических ловушек, без догадок. А если захочешь большего, местный покажет тебе всё лично." },
      ],
      benefits: [
        { title: "Действительно бесплатно", desc: "Без платы, без подвоха. Спроси ещё до того, как что-то бронировать. Так ты знакомишься со своим городом." },
        { title: "Настоящий человек, не ИИ", desc: "Не чат-бот. Лицензированный местный, который там живёт и знает то, чего туристы никогда не найдут." },
        { title: "Обойди туристические ловушки", desc: "Проверь цену, избеги обмана, найди настоящее место — местный на твоей стороне, мгновенно." },
      ],
      faqs: [
        { q: "VibeAsk правда бесплатный?", a: "Да. Спрашивай местного гида о чём угодно бесплатно — это наш способ поприветствовать тебя в городе." },
        { q: "Кто отвечает на мои вопросы?", a: "Настоящий проверенный местный гид — не бот. Тот, кто действительно там живёт и знает всё досконально." },
        { q: "О чём я могу спросить?", a: "О чём угодно, связанном с путешествием: места для еды, честные цены, маршруты, что стоит того, что открыто, скрытые жемчужины — о чём угодно." },
        { q: "Обязательно ли бронировать тур?", a: "Никогда. VibeAsk — это бесплатная помощь без обязательств. Если понравится, всегда можешь забронировать тур позже — но не обязан." },
      ],
      ctaTitle: "Спроси местного. Бесплатно, прямо сейчас.",
    },
    uk: {
      tagline: "Місцевий у твоїй кишені. Безкоштовно.",
      heroSub:
        "Тур потрібен не завжди — іноді потрібен просто місцевий, який справді знає. Запитуй про що завгодно, отримуй справжню відповідь за хвилини. Цілком безкоштовно.",
      steps: [
        { title: "Натисни VibeAsk", desc: "Прямо з головного екрана — без бронювання, без зобов'язань." },
        { title: "Запитуй про що завгодно", desc: "«Що поїсти поблизу?» «Як дістатися до Topkapı?» «Чи варте це місце того?» Напиши, надішли фото або голосове повідомлення." },
        { title: "Відповідає справжній місцевий", desc: "Перевірений місцевий гід відповідає тобі особисто — зазвичай за лічені хвилини." },
        { title: "Досліджуй упевнено", desc: "Без туристичних пасток, без здогадок. А якщо захочеш більшого, місцевий покаже тобі все особисто." },
      ],
      benefits: [
        { title: "Справді безкоштовно", desc: "Без плати, без підступу. Запитай ще до того, як щось бронювати. Так ти знайомишся зі своїм містом." },
        { title: "Справжня людина, не ШІ", desc: "Не чат-бот. Ліцензований місцевий, який там живе і знає те, чого туристи ніколи не знайдуть." },
        { title: "Обійди туристичні пастки", desc: "Перевір ціну, уникни обману, знайди справжнє місце — місцевий на твоєму боці, миттєво." },
      ],
      faqs: [
        { q: "VibeAsk справді безкоштовний?", a: "Так. Запитуй місцевого гіда про що завгодно безкоштовно — це наш спосіб привітати тебе в місті." },
        { q: "Хто відповідає на мої запитання?", a: "Справжній перевірений місцевий гід — не бот. Той, хто справді там живе і знає все досконало." },
        { q: "Про що я можу запитати?", a: "Про що завгодно, пов'язане з подорожжю: місця для їжі, чесні ціни, маршрути, що варте того, що відкрито, приховані перлини — про що завгодно." },
        { q: "Чи обов'язково бронювати тур?", a: "Ніколи. VibeAsk — це безкоштовна допомога без зобов'язань. Якщо сподобається, завжди можеш забронювати тур пізніше — але не зобов'язаний." },
      ],
      ctaTitle: "Запитай місцевого. Безкоштовно, просто зараз.",
    },
    bg: {
      tagline: "Местен в джоба ти. Безплатно.",
      heroSub:
        "Не винаги ти трябва тур — понякога ти трябва просто местен, който наистина знае. Питай каквото и да е, получи истински отговор за минути. Напълно безплатно.",
      steps: [
        { title: "Докосни VibeAsk", desc: "Направо от началния екран — без резервация, без ангажимент." },
        { title: "Питай каквото и да е", desc: "„Какво да хапна наблизо?“ „Как да стигна до Topkapı?“ „Струва ли си това място?“ Напиши, изпрати снимка или гласово съобщение." },
        { title: "Отговаря истински местен", desc: "Проверен местен гид ти отговаря лично — обикновено за минути." },
        { title: "Изследвай уверено", desc: "Без туристически капани, без гадаене. А ако искаш повече, местният ти може да ти покаже на живо." },
      ],
      benefits: [
        { title: "Наистина безплатно", desc: "Без такса, без уловка. Питай още преди да резервираш каквото и да е. Така се запознаваш с града си." },
        { title: "Истински човек, не ИИ", desc: "Не чатбот. Лицензиран местен, който живее там и знае това, което туристите никога не намират." },
        { title: "Надхитри туристическите капани", desc: "Провери цена, избегни измама, намери истинското място — местен на твоя страна, мигновено." },
      ],
      faqs: [
        { q: "VibeAsk наистина ли е безплатен?", a: "Да. Питай местен гид каквото и да е безплатно — това е нашият начин да те посрещнем в града." },
        { q: "Кой отговаря на въпросите ми?", a: "Истински проверен местен гид — не бот. Някой, който наистина живее там и го познава до съвършенство." },
        { q: "Какво мога да попитам?", a: "Всичко, свързано с пътуването: места за храна, честни цени, упътвания, какво си струва, какво е отворено, скрити бижута — каквото ти е на ум." },
        { q: "Трябва ли да резервирам тур?", a: "Никога. VibeAsk е безплатна помощ без условия. Ако ти хареса, винаги можеш да резервираш тур по-късно — но не си длъжен." },
      ],
      ctaTitle: "Питай местен. Безплатно, точно сега.",
    },
    sr: {
      tagline: "Lokalac u tvom džepu. Besplatno.",
      heroSub:
        "Ne treba ti uvek tura — ponekad ti treba samo lokalac koji zaista zna. Pitaj bilo šta, dobij pravi odgovor za nekoliko minuta. Potpuno besplatno.",
      steps: [
        { title: "Dodirni VibeAsk", desc: "Direktno sa početnog ekrana — bez rezervacije, bez obaveze." },
        { title: "Pitaj bilo šta", desc: "„Šta mogu da pojedem u blizini?“ „Kako da stignem do Topkapı?“ „Da li se ovo mesto isplati?“ Otkucaj, pošalji fotografiju ili glasovnu poruku." },
        { title: "Odgovara pravi lokalac", desc: "Provereni lokalni vodič ti odgovara lično — obično za nekoliko minuta." },
        { title: "Istražuj sa samopouzdanjem", desc: "Bez turističkih zamki, bez nagađanja. A ako želiš više, tvoj lokalac može da ti pokaže uživo." },
      ],
      benefits: [
        { title: "Stvarno besplatno", desc: "Bez naknade, bez kvake. Pitaj pre nego što išta rezervišeš. Tako upoznaješ svoj grad." },
        { title: "Pravi čovek, ne veštačka inteligencija", desc: "Nije čet-bot. Licencirani lokalac koji tu živi i zna ono što turisti nikada ne nađu." },
        { title: "Nadmudri turističke zamke", desc: "Proveri cenu, izbegni prevaru, nađi pravo mesto — lokalac na tvojoj strani, istog trena." },
      ],
      faqs: [
        { q: "Da li je VibeAsk zaista besplatan?", a: "Da. Pitaj lokalnog vodiča bilo šta besplatno — to je naš način da te dočekamo u gradu." },
        { q: "Ko odgovara na moja pitanja?", a: "Pravi, provereni lokalni vodič — ne bot. Neko ko zaista tu živi i poznaje grad do detalja." },
        { q: "Šta mogu da pitam?", a: "Bilo šta vezano za putovanje: mesta za jelo, poštene cene, uputstva, šta se isplati, šta je otvoreno, skriveni biseri — šta god ti je na umu." },
        { q: "Moram li da rezervišem turu?", a: "Nikada. VibeAsk je besplatna pomoć bez ikakvih uslova. Ako ti se svidi, uvek možeš da rezervišeš turu kasnije — ali ne moraš." },
      ],
      ctaTitle: "Pitaj lokalca. Besplatno, odmah sada.",
    },
    el: {
      tagline: "Ένας ντόπιος στην τσέπη σου. Δωρεάν.",
      heroSub:
        "Δεν χρειάζεσαι πάντα ξενάγηση — μερικές φορές θέλεις απλώς έναν ντόπιο που πραγματικά ξέρει. Ρώτα οτιδήποτε, πάρε μια αληθινή απάντηση σε λεπτά. Εντελώς δωρεάν.",
      steps: [
        { title: "Πάτα το VibeAsk", desc: "Κατευθείαν από την αρχική οθόνη — χωρίς κράτηση, χωρίς δέσμευση." },
        { title: "Ρώτα οτιδήποτε", desc: "“Τι μπορώ να φάω εδώ κοντά;” “Πώς πάω στο Topkapı;” “Αξίζει αυτό το μέρος;” Γράψ' το, στείλε φωτογραφία ή φωνητικό μήνυμα." },
        { title: "Απαντά ένας πραγματικός ντόπιος", desc: "Ένας επαληθευμένος ντόπιος ξεναγός σου απαντά προσωπικά — συνήθως μέσα σε λεπτά." },
        { title: "Εξερεύνησε με αυτοπεποίθηση", desc: "Χωρίς τουριστικές παγίδες, χωρίς μαντεψιές. Κι αν θέλεις περισσότερα, ο ντόπιος σου μπορεί να σου τα δείξει από κοντά." },
      ],
      benefits: [
        { title: "Πραγματικά δωρεάν", desc: "Χωρίς χρέωση, χωρίς παγίδα. Ρώτα προτού κλείσεις οτιδήποτε. Έτσι γνωρίζεις την πόλη σου." },
        { title: "Πραγματικός άνθρωπος, όχι ΤΝ", desc: "Όχι chatbot. Ένας αδειοδοτημένος ντόπιος που ζει εκεί και ξέρει αυτά που οι τουρίστες δεν βρίσκουν ποτέ." },
        { title: "Νίκησε τις τουριστικές παγίδες", desc: "Έλεγξε μια τιμή, απόφυγε μια απάτη, βρες το αληθινό μέρος — ένας ντόπιος στο πλευρό σου, αμέσως." },
      ],
      faqs: [
        { q: "Είναι πραγματικά δωρεάν το VibeAsk;", a: "Ναι. Ρώτα έναν ντόπιο ξεναγό οτιδήποτε χωρίς κόστος — είναι ο τρόπος μας να σε καλωσορίσουμε στην πόλη." },
        { q: "Ποιος απαντά στις ερωτήσεις μου;", a: "Ένας πραγματικός, επαληθευμένος ντόπιος ξεναγός — όχι bot. Κάποιος που πράγματι ζει εκεί και την ξέρει απ' έξω κι ανακατωτά." },
        { q: "Τι μπορώ να ρωτήσω;", a: "Οτιδήποτε σχετικό με ταξίδι: μέρη για φαγητό, δίκαιες τιμές, οδηγίες, τι αξίζει, τι είναι ανοιχτό, κρυμμένα διαμάντια — ό,τι έχεις στο μυαλό σου." },
        { q: "Πρέπει να κλείσω ξενάγηση;", a: "Ποτέ. Το VibeAsk είναι δωρεάν βοήθεια χωρίς δεσμεύσεις. Αν το λατρέψεις, μπορείς πάντα να κλείσεις ξενάγηση αργότερα — αλλά δεν είσαι υποχρεωμένος." },
      ],
      ctaTitle: "Ρώτα έναν ντόπιο. Δωρεάν, τώρα αμέσως.",
    },
    ro: {
      tagline: "Un localnic în buzunarul tău. Gratuit.",
      heroSub:
        "Nu ai nevoie mereu de un tur — uneori ai nevoie doar de un localnic care chiar știe. Întreabă orice, primește un răspuns real în câteva minute. Complet gratuit.",
      steps: [
        { title: "Apasă VibeAsk", desc: "Direct de pe ecranul principal — fără rezervare, fără angajament." },
        { title: "Întreabă orice", desc: "„Ce pot mânca prin apropiere?” „Cum ajung la Topkapı?” „Merită locul ăsta?” Scrie, trimite o poză sau o notă vocală." },
        { title: "Răspunde un localnic adevărat", desc: "Un ghid local verificat îți răspunde personal — de obicei în câteva minute." },
        { title: "Explorează cu încredere", desc: "Fără capcane pentru turiști, fără presupuneri. Iar dacă vrei mai mult, localnicul tău îți poate arăta personal." },
      ],
      benefits: [
        { title: "Cu adevărat gratuit", desc: "Fără taxă, fără cârlig. Întreabă înainte să rezervi ceva. Așa îți cunoști orașul." },
        { title: "Un om real, nu IA", desc: "Nu un chatbot. Un localnic autorizat care locuiește acolo și știe ce turiștii nu găsesc niciodată." },
        { title: "Învinge capcanele pentru turiști", desc: "Verifică un preț, evită o țeapă, găsește locul adevărat — un localnic de partea ta, instantaneu." },
      ],
      faqs: [
        { q: "Este VibeAsk chiar gratuit?", a: "Da. Întreabă un ghid local orice fără cost — este modul nostru de a-ți ura bun venit în oraș." },
        { q: "Cine răspunde la întrebările mele?", a: "Un ghid local real, verificat — nu un bot. Cineva care chiar locuiește acolo și îl cunoaște în detaliu." },
        { q: "Ce pot întreba?", a: "Orice legat de călătorie: locuri de mâncare, prețuri corecte, indicații, ce merită, ce este deschis, comori ascunse — orice îți trece prin minte." },
        { q: "Trebuie să rezerv un tur?", a: "Niciodată. VibeAsk este ajutor gratuit, fără obligații. Dacă îți place, poți rezerva oricând un tur mai târziu — dar nu ești obligat." },
      ],
      ctaTitle: "Întreabă un localnic. Gratuit, chiar acum.",
    },
    de: {
      tagline: "Ein Local in deiner Tasche. Kostenlos.",
      heroSub:
        "Du brauchst nicht immer eine Tour — manchmal brauchst du einfach einen Local, der sich wirklich auskennt. Frag alles, bekomm in Minuten eine echte Antwort. Völlig kostenlos.",
      steps: [
        { title: "Tippe auf VibeAsk", desc: "Direkt vom Startbildschirm — keine Buchung, keine Verpflichtung." },
        { title: "Frag alles", desc: "„Was kann ich in der Nähe essen?“ „Wie komme ich zum Topkapı?“ „Lohnt sich dieser Ort?“ Tippe es, sende ein Foto oder eine Sprachnachricht." },
        { title: "Ein echter Local antwortet", desc: "Ein verifizierter lokaler Guide antwortet dir persönlich — meist innerhalb von Minuten." },
        { title: "Entdecke mit Sicherheit", desc: "Keine Touristenfallen, kein Raten. Und wenn du mehr willst, kann dir dein Local alles persönlich zeigen." },
      ],
      benefits: [
        { title: "Wirklich kostenlos", desc: "Keine Gebühr, kein Haken. Frag, bevor du überhaupt etwas buchst. So lernst du deine Stadt kennen." },
        { title: "Ein echter Mensch, keine KI", desc: "Kein Chatbot. Ein lizenzierter Local, der dort lebt und weiß, was Touristen nie finden." },
        { title: "Umgeh die Touristenfallen", desc: "Prüf einen Preis, vermeide einen Betrug, finde den echten Spot — sofort ein Local an deiner Seite." },
      ],
      faqs: [
        { q: "Ist VibeAsk wirklich kostenlos?", a: "Ja. Frag einen lokalen Guide alles kostenlos — so heißen wir dich in der Stadt willkommen." },
        { q: "Wer beantwortet meine Fragen?", a: "Ein echter, verifizierter lokaler Guide — kein Bot. Jemand, der wirklich dort lebt und sich bestens auskennt." },
        { q: "Was kann ich fragen?", a: "Alles rund ums Reisen: Essensspots, faire Preise, Wegbeschreibungen, was sich lohnt, was geöffnet ist, versteckte Schätze — was immer dir einfällt." },
        { q: "Muss ich eine Tour buchen?", a: "Niemals. VibeAsk ist kostenlose Hilfe ohne Verpflichtungen. Wenn es dir gefällt, kannst du später eine Tour buchen — musst du aber nicht." },
      ],
      ctaTitle: "Frag einen Local. Kostenlos, jetzt sofort.",
    },
    fr: {
      tagline: "Un local dans votre poche. Gratuit.",
      heroSub:
        "Vous n'avez pas toujours besoin d'une visite — parfois il vous faut juste un local qui s'y connaît vraiment. Demandez n'importe quoi, obtenez une vraie réponse en minutes. Entièrement gratuit.",
      steps: [
        { title: "Touchez VibeAsk", desc: "Directement depuis l'écran d'accueil — aucune réservation, aucun engagement." },
        { title: "Demandez n'importe quoi", desc: "« Que puis-je manger à proximité ? » « Comment aller à Topkapı ? » « Cet endroit vaut-il le coup ? » Tapez-le, envoyez une photo ou une note vocale." },
        { title: "Un vrai local répond", desc: "Un guide local vérifié vous répond personnellement — généralement en quelques minutes." },
        { title: "Explorez en confiance", desc: "Pas de pièges à touristes, pas de devinettes. Et si vous voulez plus, votre local peut vous montrer en personne." },
      ],
      benefits: [
        { title: "Vraiment gratuit", desc: "Pas de frais, pas de piège. Demandez avant même de réserver quoi que ce soit. C'est ainsi que vous découvrez votre ville." },
        { title: "Un vrai humain, pas une IA", desc: "Pas un chatbot. Un local agréé qui vit là et sait ce que les touristes ne trouvent jamais." },
        { title: "Évitez les pièges à touristes", desc: "Vérifiez un prix, déjouez une arnaque, trouvez le vrai spot — un local dans votre camp, instantanément." },
      ],
      faqs: [
        { q: "VibeAsk est-il vraiment gratuit ?", a: "Oui. Demandez tout ce que vous voulez à un guide local sans frais — c'est notre façon de vous accueillir dans la ville." },
        { q: "Qui répond à mes questions ?", a: "Un vrai guide local vérifié — pas un bot. Quelqu'un qui vit réellement là et connaît tout sur le bout des doigts." },
        { q: "Que puis-je demander ?", a: "Tout ce qui touche au voyage : bonnes adresses, prix justes, itinéraires, ce qui vaut le coup, ce qui est ouvert, les trésors cachés — tout ce qui vous passe par la tête." },
        { q: "Dois-je réserver une visite ?", a: "Jamais. VibeAsk est une aide gratuite sans conditions. Si vous adorez, vous pourrez toujours réserver une visite plus tard — mais ce n'est pas obligatoire." },
      ],
      ctaTitle: "Demandez à un local. Gratuit, dès maintenant.",
    },
    es: {
      tagline: "Un local en tu bolsillo. Gratis.",
      heroSub:
        "No siempre necesitas un tour — a veces solo necesitas un local que de verdad sabe. Pregunta lo que sea, recibe una respuesta real en minutos. Completamente gratis.",
      steps: [
        { title: "Toca VibeAsk", desc: "Directo desde la pantalla de inicio — sin reservas, sin compromiso." },
        { title: "Pregunta lo que sea", desc: "«¿Qué puedo comer cerca?» «¿Cómo llego a Topkapı?» «¿Vale la pena este sitio?» Escríbelo, envía una foto o una nota de voz." },
        { title: "Un local real responde", desc: "Un guía local verificado te responde en persona — normalmente en minutos." },
        { title: "Explora con confianza", desc: "Sin trampas para turistas, sin adivinanzas. Y si quieres más, tu local puede mostrártelo en persona." },
      ],
      benefits: [
        { title: "De verdad gratis", desc: "Sin tarifa, sin trampa. Pregunta antes de reservar nada. Así es como conoces tu ciudad." },
        { title: "Un humano real, no IA", desc: "No es un chatbot. Un local con licencia que vive allí y sabe lo que los turistas nunca encuentran." },
        { title: "Vence las trampas para turistas", desc: "Comprueba un precio, esquiva una estafa, encuentra el sitio auténtico — un local de tu lado, al instante." },
      ],
      faqs: [
        { q: "¿VibeAsk es realmente gratis?", a: "Sí. Pregunta lo que sea a un guía local sin coste — es nuestra forma de darte la bienvenida a la ciudad." },
        { q: "¿Quién responde mis preguntas?", a: "Un guía local real y verificado — no un bot. Alguien que de verdad vive allí y la conoce a fondo." },
        { q: "¿Qué puedo preguntar?", a: "Cualquier cosa de viajes: sitios para comer, precios justos, cómo llegar, qué vale la pena, qué está abierto, joyas ocultas — lo que tengas en mente." },
        { q: "¿Tengo que reservar un tour?", a: "Nunca. VibeAsk es ayuda gratuita sin compromiso. Si te encanta, siempre puedes reservar un tour más tarde — pero no es obligatorio." },
      ],
      ctaTitle: "Pregunta a un local. Gratis, ahora mismo.",
    },
    it: {
      tagline: "Un local in tasca. Gratis.",
      heroSub:
        "Non sempre serve un tour — a volte ti serve solo un local che sa davvero. Chiedi qualsiasi cosa, ottieni una risposta vera in pochi minuti. Completamente gratis.",
      steps: [
        { title: "Tocca VibeAsk", desc: "Direttamente dalla schermata principale — nessuna prenotazione, nessun impegno." },
        { title: "Chiedi qualsiasi cosa", desc: "«Cosa posso mangiare qui vicino?» «Come arrivo a Topkapı?» «Ne vale la pena questo posto?» Scrivilo, invia una foto o una nota vocale." },
        { title: "Un vero local risponde", desc: "Una guida locale verificata ti risponde di persona — di solito in pochi minuti." },
        { title: "Esplora in tutta tranquillità", desc: "Niente trappole per turisti, niente indovinelli. E se vuoi di più, il tuo local può mostrartelo di persona." },
      ],
      benefits: [
        { title: "Davvero gratis", desc: "Nessuna tariffa, nessun trucco. Chiedi prima ancora di prenotare qualsiasi cosa. È così che conosci la tua città." },
        { title: "Un vero umano, non un'IA", desc: "Non un chatbot. Un local autorizzato che vive lì e sa ciò che i turisti non trovano mai." },
        { title: "Batti le trappole per turisti", desc: "Controlla un prezzo, schiva una truffa, trova il posto vero — un local dalla tua parte, all'istante." },
      ],
      faqs: [
        { q: "VibeAsk è davvero gratis?", a: "Sì. Chiedi qualsiasi cosa a una guida locale senza costi — è il nostro modo di darti il benvenuto in città." },
        { q: "Chi risponde alle mie domande?", a: "Una vera guida locale verificata — non un bot. Qualcuno che vive davvero lì e la conosce a fondo." },
        { q: "Cosa posso chiedere?", a: "Qualsiasi cosa di viaggio: posti dove mangiare, prezzi giusti, indicazioni, cosa vale la pena, cosa è aperto, gemme nascoste — qualunque cosa ti passi per la mente." },
        { q: "Devo prenotare un tour?", a: "Mai. VibeAsk è un aiuto gratuito senza vincoli. Se ti piace, puoi sempre prenotare un tour più tardi — ma non sei obbligato." },
      ],
      ctaTitle: "Chiedi a un local. Gratis, proprio ora.",
    },
    nl: {
      tagline: "Een local in je zak. Gratis.",
      heroSub:
        "Je hebt niet altijd een tour nodig — soms heb je gewoon een local nodig die het echt weet. Vraag van alles, krijg binnen minuten een echt antwoord. Helemaal gratis.",
      steps: [
        { title: "Tik op VibeAsk", desc: "Direct vanaf het startscherm — geen boeking, geen verplichting." },
        { title: "Vraag van alles", desc: "„Wat kan ik in de buurt eten?” „Hoe kom ik bij Topkapı?” „Is deze plek de moeite waard?” Typ het, stuur een foto of een spraakbericht." },
        { title: "Een echte local antwoordt", desc: "Een geverifieerde lokale gids beantwoordt je persoonlijk — meestal binnen enkele minuten." },
        { title: "Ontdek met vertrouwen", desc: "Geen toeristenvallen, geen giswerk. En als je meer wilt, kan je local het je persoonlijk laten zien." },
      ],
      benefits: [
        { title: "Echt gratis", desc: "Geen kosten, geen addertje. Vraag voordat je iets boekt. Zo leer je je stad kennen." },
        { title: "Een echt mens, geen AI", desc: "Geen chatbot. Een erkende local die er woont en weet wat toeristen nooit vinden." },
        { title: "Versla de toeristenvallen", desc: "Check een prijs, ontwijk oplichting, vind de echte plek — direct een local aan je zijde." },
      ],
      faqs: [
        { q: "Is VibeAsk echt gratis?", a: "Ja. Vraag een lokale gids van alles, gratis — zo heten we je welkom in de stad." },
        { q: "Wie beantwoordt mijn vragen?", a: "Een echte, geverifieerde lokale gids — geen bot. Iemand die er echt woont en de stad door en door kent." },
        { q: "Wat kan ik vragen?", a: "Alles wat met reizen te maken heeft: eetplekken, eerlijke prijzen, routes, wat de moeite waard is, wat open is, verborgen pareltjes — wat je maar bezighoudt." },
        { q: "Moet ik een tour boeken?", a: "Nooit. VibeAsk is gratis hulp zonder verplichtingen. Als je het geweldig vindt, kun je later altijd een tour boeken — maar het hoeft niet." },
      ],
      ctaTitle: "Vraag het een local. Gratis, nu meteen.",
    },
    pt: {
      tagline: "Um local no seu bolso. Grátis.",
      heroSub:
        "Nem sempre precisa de um tour — às vezes só precisa de um local que realmente sabe. Pergunte o que quiser, receba uma resposta real em minutos. Totalmente grátis.",
      steps: [
        { title: "Toque no VibeAsk", desc: "Diretamente do ecrã inicial — sem reservas, sem compromisso." },
        { title: "Pergunte o que quiser", desc: "«O que posso comer por perto?» «Como chego a Topkapı?» «Este sítio vale a pena?» Escreva, envie uma foto ou uma nota de voz." },
        { title: "Um local de verdade responde", desc: "Um guia local verificado responde-lhe pessoalmente — normalmente em minutos." },
        { title: "Explore com confiança", desc: "Sem armadilhas para turistas, sem adivinhações. E se quiser mais, o seu local pode mostrar-lhe pessoalmente." },
      ],
      benefits: [
        { title: "Realmente grátis", desc: "Sem taxa, sem truque. Pergunte antes de reservar seja o que for. É assim que conhece a sua cidade." },
        { title: "Um humano real, não IA", desc: "Não é um chatbot. Um local licenciado que vive lá e sabe o que os turistas nunca encontram." },
        { title: "Vença as armadilhas para turistas", desc: "Verifique um preço, evite uma fraude, encontre o sítio autêntico — um local do seu lado, num instante." },
      ],
      faqs: [
        { q: "O VibeAsk é mesmo grátis?", a: "Sim. Pergunte o que quiser a um guia local sem custos — é a nossa forma de lhe dar as boas-vindas à cidade." },
        { q: "Quem responde às minhas perguntas?", a: "Um guia local real e verificado — não um bot. Alguém que vive mesmo lá e a conhece de cor." },
        { q: "O que posso perguntar?", a: "Tudo relacionado com viagens: sítios para comer, preços justos, direções, o que vale a pena, o que está aberto, joias escondidas — o que lhe vier à cabeça." },
        { q: "Tenho de reservar um tour?", a: "Nunca. O VibeAsk é ajuda gratuita sem compromissos. Se adorar, pode sempre reservar um tour mais tarde — mas não é obrigatório." },
      ],
      ctaTitle: "Pergunte a um local. Grátis, agora mesmo.",
    },
    pl: {
      tagline: "Lokalny mieszkaniec w kieszeni. Za darmo.",
      heroSub:
        "Nie zawsze potrzebujesz wycieczki — czasem wystarczy ktoś miejscowy, kto naprawdę się zna. Zapytaj o cokolwiek, otrzymaj prawdziwą odpowiedź w kilka minut. Całkowicie za darmo.",
      steps: [
        { title: "Dotknij VibeAsk", desc: "Prosto z ekranu głównego — bez rezerwacji, bez zobowiązań." },
        { title: "Zapytaj o cokolwiek", desc: "„Co mogę zjeść w pobliżu?” „Jak dotrzeć do Topkapı?” „Czy to miejsce jest tego warte?” Napisz, wyślij zdjęcie lub wiadomość głosową." },
        { title: "Odpowiada prawdziwy mieszkaniec", desc: "Zweryfikowany lokalny przewodnik odpowiada Ci osobiście — zwykle w ciągu kilku minut." },
        { title: "Zwiedzaj z pewnością", desc: "Żadnych pułapek na turystów, żadnego zgadywania. A jeśli chcesz więcej, Twój przewodnik może pokazać Ci to osobiście." },
      ],
      benefits: [
        { title: "Naprawdę za darmo", desc: "Bez opłat, bez haczyka. Zapytaj, zanim cokolwiek zarezerwujesz. Tak poznajesz swoje miasto." },
        { title: "Prawdziwy człowiek, nie AI", desc: "To nie chatbot. Licencjonowany mieszkaniec, który tu mieszka i wie to, czego turyści nigdy nie znajdą." },
        { title: "Pokonaj pułapki na turystów", desc: "Sprawdź cenę, unikaj oszustwa, znajdź prawdziwe miejsce — miejscowy po Twojej stronie, od razu." },
      ],
      faqs: [
        { q: "Czy VibeAsk jest naprawdę darmowy?", a: "Tak. Zapytaj lokalnego przewodnika o cokolwiek bez opłat — tak witamy Cię w mieście." },
        { q: "Kto odpowiada na moje pytania?", a: "Prawdziwy, zweryfikowany lokalny przewodnik — nie bot. Ktoś, kto naprawdę tu mieszka i zna miasto na wylot." },
        { q: "O co mogę zapytać?", a: "O wszystko związane z podróżą: miejsca na jedzenie, uczciwe ceny, dojazd, co warto, co jest otwarte, ukryte perełki — cokolwiek masz na myśli." },
        { q: "Czy muszę zarezerwować wycieczkę?", a: "Nigdy. VibeAsk to darmowa pomoc bez żadnych zobowiązań. Jeśli Ci się spodoba, zawsze możesz później zarezerwować wycieczkę — ale nie musisz." },
      ],
      ctaTitle: "Zapytaj miejscowego. Za darmo, już teraz.",
    },
  },
};
