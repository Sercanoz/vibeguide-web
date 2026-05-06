export const locales = ["en", "zh", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "EN" },
  zh: { flag: "🇨🇳", label: "中文" },
  ru: { flag: "🇷🇺", label: "RU" },
};

type Dict = {
  nav: { vibenow: string; vibesquad: string; how: string; guides: string; cta: string };
  hero: {
    badge: string;
    titleA: string; titleB: string;
    sub: string;
    ctaPrimary: string; ctaSecondary: string;
    ratingNote: string;
    matchedIn: string; saved: string;
    phoneGreet: string; phoneCity: string;
    phoneVibeNowSub: string;
    phoneSquadTitle: string; phoneSquadSub: string;
    phoneSquadPerk: string; phoneSquadCrew: string;
    phoneTourTitle: string; phoneTourSub: string;
  };
  ticker: string[];
  stats: { travelers: string; guides: string; cities: string; rating: string };
  duo: {
    eyebrow: string;
    h2A: string; h2B: string;
    nowTagline: string;
    nowBody: string;
    nowList: string[];
    nowCta: string;
    squadTagline: string;
    squadBody: string;
    squadList: string[];
    squadCta: string;
  };
  how: {
    eyebrow: string; h2A: string; h2B: string;
    steps: { t: string; d: string }[];
  };
  features: {
    eyebrow: string; h2A: string; h2B: string;
    items: { t: string; d: string }[];
  };
  testimonials: {
    eyebrow: string; h2A: string; h2B: string;
    quotes: { q: string; n: string; l: string }[];
  };
  guides: {
    eyebrow: string;
    h2A: string; h2B: string;
    body: string;
    benefits: string[];
    cta: string;
    stats: { v: string; l: string }[];
  };
  finalCta: {
    eyebrow: string;
    h2A: string; h2B: string;
    sub: string;
    note: string;
    appStore: string; appStoreSmall: string;
    playStore: string; playStoreSmall: string;
  };
  footer: {
    intro: string;
    product: string; company: string;
    about: string; contact: string; privacy: string; terms: string;
    copyright: string;
    madeWith: string;
  };
};

export const i18n: Record<Locale, Dict> = {
  en: {
    nav: { vibenow: "VibeNow ⚡", vibesquad: "VibeSquad ✨", how: "How it works", guides: "For Guides", cta: "Get the app" },
    hero: {
      badge: "Live in 12+ cities",
      titleA: "Skip the tour bus.",
      titleB: "Catch a vibe instead.",
      sub: "One tap matches you with a real local in under 60 seconds. **VibeNow ⚡** for solo adventures right now. **VibeSquad ✨** for rolling deep with the crew at half the price. No scripts. No queues. No cringe.",
      ctaPrimary: "📱 Get the app — Free",
      ctaSecondary: "See how it works →",
      ratingNote: "Loved by 50,000+ travelers",
      matchedIn: "Matched in",
      saved: "Saved",
      phoneGreet: "Good evening 👋",
      phoneCity: "Istanbul",
      phoneVibeNowSub: "Tap. Match. Go.",
      phoneSquadTitle: "Start a VibeSquad ✨",
      phoneSquadSub: "Roll deep, pay less",
      phoneSquadPerk: "🎁 15% host perk",
      phoneSquadCrew: "👥 Bring crew",
      phoneTourTitle: "Hagia Sophia",
      phoneTourSub: "Editor's Pick · 12 guides online",
    },
    ticker: [
      "⚡ 60-second match",
      "💸 Up to 50% off with a squad",
      "🌍 23 languages, native speakers",
      "🛡️ 100% refund if your squad doesn't form",
      "📍 Live in 12 cities, 4 more next month",
      "❤️ 4.9★ from 50K+ travelers",
    ],
    stats: { travelers: "Happy travelers", guides: "Verified guides", cities: "Cities live", rating: "Average rating" },
    duo: {
      eyebrow: "Two ways to vibe",
      h2A: "Solo? Or squad?",
      h2B: "Same app. Different vibe.",
      nowTagline: "Tap. Match. Go.",
      nowBody: "Just landed. Hotel checked. Nothing planned. Open the app, tap once — a real local is heading your way before you finish your coffee. That's the move.",
      nowList: ["60-second match guarantee", "Personal, private, fully you", "Pay only when matched"],
      nowCta: "Tour in a Flash ⚡ →",
      squadTagline: "Roll deep. Pay less. Live the vibe.",
      squadBody: "Open a squad. Drop the link in your group chat. The crew rolls in, the price drops, the host pockets a 15% perk. It's like splitting an Uber, except the Uber is a sunset on the Bosphorus.",
      squadList: ["Up to 50% cheaper as group fills", "15% host discount, every time", "Cancel-free if squad doesn't form"],
      squadCta: "Start a VibeSquad ✨ →",
    },
    how: {
      eyebrow: "How it works",
      h2A: "Three taps.",
      h2B: "One real day. Zero tour-bus regret.",
      steps: [
        { t: "Pick your vibe", d: "Solo right now? VibeNow ⚡. Got plans next week? VibeSquad ✨. Either way, two taps." },
        { t: "Match a local", d: "Real guides. Verified. Rated. Speaking your language — even the rare ones." },
        { t: "Live the city", d: "Walk. Eat. Laugh. See the side of town that doesn't make the brochures." },
      ],
    },
    features: {
      eyebrow: "Why VibeGuide",
      h2A: "Built different.",
      h2B: "For travelers who know better.",
      items: [
        { t: "Speaks your language", d: "From English to Japanese to Arabic — match a guide who actually gets you. Rare languages? We've got premium specialists." },
        { t: "Anchor pricing", d: "See the real price next to the squad price. No bait. No surprise fees. The number you see is the number you pay." },
        { t: "Verified guides only", d: "Every guide is KYC-checked, ID-verified, and rated by real travelers. No randoms. No catfish." },
        { t: "Save your favorites", d: "Spotted a tour you love? Heart it. Build a wishlist. Sync across all your devices." },
        { t: "Curated collections", d: "Editor-picked bundles like \"Sultanahmet in 3 hours\" — the route a local would actually take." },
        { t: "Safe & refundable", d: "Squad doesn't form? Full refund. Match doesn't show? Full refund. Your money is safer than the airport ATM." },
      ],
    },
    testimonials: {
      eyebrow: "Real travelers. Real cities. Real receipts.",
      h2A: "The kind of trip you",
      h2B: "brag about.",
      quotes: [
        { q: "Walked into Istanbul knowing nothing. Walked out with a story I keep telling. My guide knew the spots TikTok hasn't ruined yet.", n: "Mia", l: "Brooklyn → Istanbul" },
        { q: "Opened a squad with two friends, woke up to four strangers in the chat. We didn't know each other before sunrise. We didn't shut up by sunset.", n: "Lukas", l: "Berlin → Lisbon" },
        { q: "I'm Japanese and I always get the worst guides who just speak English. Found one who actually grew up in Kanagawa. Felt like home, in another country.", n: "Yui", l: "Tokyo → Cappadocia" },
      ],
    },
    guides: {
      eyebrow: "For guides",
      h2A: "Your city.",
      h2B: "Your hours. Your rate.",
      body: "No agency cut. No middleman ghosting. No 9-to-5 with a clipboard. Just you, your city, your rate. Travelers pick YOU — not a brand, not a desk, not a script. Show up, walk 'em around, get paid Friday.",
      benefits: [
        "💰 Keep up to 90% — lowest commission in the game",
        "🌍 Premium pay for rare languages, automatic uplift",
        "📅 Pick your days off, set your zones, done",
        "⭐ Build a rep that follows you, not your boss",
      ],
      cta: "Become a Guide →",
      stats: [
        { v: "$3.2K", l: "Avg monthly earnings" },
        { v: "8 min", l: "Avg match time" },
        { v: "90%", l: "Guide payout" },
        { v: "4.9★", l: "Guide satisfaction" },
      ],
    },
    finalCta: {
      eyebrow: "One app. Whole world.",
      h2A: "Your next city is",
      h2B: "calling.",
      sub: "The next 60 seconds decide the next 6 hours. Download. Tap. Live the city like you live somewhere.",
      note: "Free to download. No subscription. Pay only for what you tour.",
      appStoreSmall: "Download on the",
      appStore: "App Store",
      playStoreSmall: "Get it on",
      playStore: "Google Play",
    },
    footer: {
      intro: "The world's most chill way to tour a city with a real local. Instant 1-on-1 matches. Group tours that bring the price down. Real moments, never templated.",
      product: "Product",
      company: "Company",
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
      copyright: "© {year} VibeGuide. Crafted for travelers, by travelers.",
      madeWith: "Made with ♥ on the road.",
    },
  },
  zh: {
    nav: { vibenow: "VibeNow ⚡", vibesquad: "VibeSquad ✨", how: "玩法流程", guides: "成为向导", cta: "下载App" },
    hero: {
      badge: "已上线12+城市",
      titleA: "拒绝旅游大巴。",
      titleB: "选择真实氛围。",
      sub: "一键60秒内匹配真实本地向导。**VibeNow ⚡** 个人即时探索。**VibeSquad ✨** 组团出行,半价享受。无剧本。无排队。无尴尬。",
      ctaPrimary: "📱 免费下载App",
      ctaSecondary: "了解流程 →",
      ratingNote: "5万+ 旅行者的选择",
      matchedIn: "匹配用时",
      saved: "节省",
      phoneGreet: "晚上好 👋",
      phoneCity: "伊斯坦布尔",
      phoneVibeNowSub: "点击 · 匹配 · 出发",
      phoneSquadTitle: "发起VibeSquad ✨",
      phoneSquadSub: "组团省钱",
      phoneSquadPerk: "🎁 主理人享15%",
      phoneSquadCrew: "👥 邀请朋友",
      phoneTourTitle: "圣索菲亚大教堂",
      phoneTourSub: "编辑精选 · 12位向导在线",
    },
    ticker: [
      "⚡ 60秒匹配",
      "💸 组团最高省50%",
      "🌍 23种语言,母语向导",
      "🛡️ 组团未满全额退款",
      "📍 12个城市已上线,下月再开4城",
      "❤️ 5万+旅行者打出4.9★",
    ],
    stats: { travelers: "满意旅行者", guides: "认证向导", cities: "上线城市", rating: "平均评分" },
    duo: {
      eyebrow: "两种玩法",
      h2A: "独行?组团?",
      h2B: "同一App。两种节奏。",
      nowTagline: "点击 · 匹配 · 出发。",
      nowBody: "刚下飞机。酒店入住。没有计划。打开App,点一下 — 一位真实本地人正在朝你走来,还没喝完咖啡就到。这就是玩法。",
      nowList: ["60秒匹配保证", "私人订制,完全属于你", "匹配成功后才付款"],
      nowCta: "立即出发 ⚡ →",
      squadTagline: "组团出行。省钱享受。",
      squadBody: "发起一个squad。把链接丢进群聊。朋友加入,价格下降,主理人额外享15%优惠。就像拼Uber,只不过这次的Uber是博斯普鲁斯海峡的日落。",
      squadList: ["人数越多最高便宜50%", "主理人每次享15%折扣", "组团未满免费取消"],
      squadCta: "发起VibeSquad ✨ →",
    },
    how: {
      eyebrow: "玩法流程",
      h2A: "三步操作。",
      h2B: "一天真实体验。零旅游大巴遗憾。",
      steps: [
        { t: "选择你的方式", d: "现在独行?VibeNow ⚡。下周有计划?VibeSquad ✨。两步搞定。" },
        { t: "匹配本地向导", d: "真实向导。已认证。已评分。说你的语言 — 包括小语种。" },
        { t: "体验真实城市", d: "走路。吃喝。欢笑。看那些不会出现在旅游手册上的角落。" },
      ],
    },
    features: {
      eyebrow: "为什么选VibeGuide",
      h2A: "不一样的体验。",
      h2B: "为懂行的旅行者。",
      items: [
        { t: "说你的语言", d: "从英语到日语到阿拉伯语 — 匹配真正懂你的向导。小语种?我们有专业人选。" },
        { t: "锚定价格", d: "真实价格与组团价并列展示。无诱饵。无隐藏费用。所见即所得。" },
        { t: "仅认证向导", d: "每位向导都通过KYC验证、身份核实,并由真实旅行者评分。无虚假账号。" },
        { t: "收藏喜好", d: "看到喜欢的tour?点心。建立心愿单。跨设备同步。" },
        { t: "精选合集", d: "编辑精选组合,如\"3小时苏丹艾哈迈德\" — 当地人会走的路线。" },
        { t: "安全可退款", d: "组团未满?全额退款。向导未到?全额退款。比机场ATM还安全。" },
      ],
    },
    testimonials: {
      eyebrow: "真实旅行者。真实城市。真实证据。",
      h2A: "这种旅行你会",
      h2B: "向所有人吹嘘。",
      quotes: [
        { q: "去伊斯坦布尔时一无所知。回来后有了一个反复讲述的故事。我的向导知道TikTok还没毁掉的好地方。", n: "Mia", l: "布鲁克林 → 伊斯坦布尔" },
        { q: "和两个朋友发起squad,醒来发现群里多了四个陌生人。日出前我们互不相识。日落时还在不停聊天。", n: "Lukas", l: "柏林 → 里斯本" },
        { q: "我是日本人,总是被分配到只会说英语的烂向导。这次找到一位在神奈川长大的向导。在异国他乡找到家的感觉。", n: "Yui", l: "东京 → 卡帕多奇亚" },
      ],
    },
    guides: {
      eyebrow: "成为向导",
      h2A: "你的城市。",
      h2B: "你的时间。你的价格。",
      body: "无中介抽成。无中间人忽悠。无朝九晚五打卡。只有你、你的城市、你定的价。旅行者选择你 — 不是品牌,不是公司,不是剧本。带他们逛逛,周五拿钱。",
      benefits: [
        "💰 最高保留90% — 行业最低抽成",
        "🌍 小语种自动溢价",
        "📅 自定休息日和服务区域",
        "⭐ 积累跟随你的口碑,而非老板的",
      ],
      cta: "成为向导 →",
      stats: [
        { v: "$3.2K", l: "月均收入" },
        { v: "8分钟", l: "平均匹配时间" },
        { v: "90%", l: "向导收益占比" },
        { v: "4.9★", l: "向导满意度" },
      ],
    },
    finalCta: {
      eyebrow: "一个App。整个世界。",
      h2A: "你的下个城市",
      h2B: "正在召唤。",
      sub: "接下来的60秒决定接下来的6小时。下载。点击。像本地人一样体验城市。",
      note: "免费下载。无订阅。仅按使用付费。",
      appStoreSmall: "下载于",
      appStore: "App Store",
      playStoreSmall: "下载",
      playStore: "Google Play",
    },
    footer: {
      intro: "全世界最佛系的本地向导旅行方式。即时1对1匹配。组团tour让价格下降。真实瞬间,绝无套路。",
      product: "产品",
      company: "公司",
      about: "关于",
      contact: "联系",
      privacy: "隐私",
      terms: "条款",
      copyright: "© {year} VibeGuide。为旅行者打造,由旅行者打造。",
      madeWith: "在路上,用心制作 ♥",
    },
  },
  ru: {
    nav: { vibenow: "VibeNow ⚡", vibesquad: "VibeSquad ✨", how: "Как это работает", guides: "Для гидов", cta: "Скачать app" },
    hero: {
      badge: "Уже в 12+ городах",
      titleA: "Забудь про туристические автобусы.",
      titleB: "Лови настоящий вайб.",
      sub: "Одно касание — и через 60 секунд ты с настоящим местным гидом. **VibeNow ⚡** для личных приключений прямо сейчас. **VibeSquad ✨** для группы со скидкой 50%. Без скриптов. Без очередей. Без неловкости.",
      ctaPrimary: "📱 Скачать app — бесплатно",
      ctaSecondary: "Как это работает →",
      ratingNote: "Любят 50 000+ путешественников",
      matchedIn: "Матч за",
      saved: "Сэкономили",
      phoneGreet: "Добрый вечер 👋",
      phoneCity: "Стамбул",
      phoneVibeNowSub: "Тапни · Найди · Иди.",
      phoneSquadTitle: "Создай VibeSquad ✨",
      phoneSquadSub: "Команда — меньше платишь",
      phoneSquadPerk: "🎁 15% хосту",
      phoneSquadCrew: "👥 Зови своих",
      phoneTourTitle: "Айя-София",
      phoneTourSub: "Выбор редакции · 12 гидов онлайн",
    },
    ticker: [
      "⚡ Матч за 60 секунд",
      "💸 До 50% скидки в составе squad",
      "🌍 23 языка, носители",
      "🛡️ 100% возврат, если squad не собрался",
      "📍 12 городов сейчас, +4 в следующем месяце",
      "❤️ 4.9★ от 50K+ путешественников",
    ],
    stats: { travelers: "Довольных путешественников", guides: "Проверенных гидов", cities: "Городов запущено", rating: "Средний рейтинг" },
    duo: {
      eyebrow: "Два способа поймать вайб",
      h2A: "Один? Или с командой?",
      h2B: "Одно приложение. Две вибы.",
      nowTagline: "Тапни · Найди · Иди.",
      nowBody: "Только приземлился. Заехал в отель. Ничего не запланировано. Открой app, тапни раз — настоящий местный уже идёт к тебе, ты ещё кофе не допил. Вот это движ.",
      nowList: ["Гарантия матча за 60 секунд", "Личный, приватный, под тебя", "Платишь только при матче"],
      nowCta: "В путь как молния ⚡ →",
      squadTagline: "Команда — больше. Цена — меньше.",
      squadBody: "Создай squad. Кинь ссылку в чат с друзьями. Команда подтягивается, цена падает, хост получает 15% бонусом. Это как делить Uber, только Uber — закат на Босфоре.",
      squadList: ["До 50% дешевле, чем больше людей", "15% скидка хосту каждый раз", "Без штрафа, если squad не сформировался"],
      squadCta: "Создать VibeSquad ✨ →",
    },
    how: {
      eyebrow: "Как это работает",
      h2A: "Три тапа.",
      h2B: "Один настоящий день. Ноль автобусной скуки.",
      steps: [
        { t: "Выбери вайб", d: "Один прямо сейчас? VibeNow ⚡. На следующей неделе? VibeSquad ✨. В обе стороны два тапа." },
        { t: "Найди местного", d: "Настоящие гиды. Проверенные. С рейтингом. На твоём языке — даже редком." },
        { t: "Живи городом", d: "Гуляй. Ешь. Смейся. Смотри ту часть города, что не попадает в брошюры." },
      ],
    },
    features: {
      eyebrow: "Почему VibeGuide",
      h2A: "Сделано иначе.",
      h2B: "Для тех, кто знает толк в путешествиях.",
      items: [
        { t: "На твоём языке", d: "От английского до японского и арабского — гид, который тебя понимает. Редкие языки? У нас есть премиум-специалисты." },
        { t: "Якорная цена", d: "Реальная цена рядом с ценой squad. Без приманок. Без скрытых платежей. Что видишь — то и платишь." },
        { t: "Только проверенные гиды", d: "Каждый гид прошёл KYC, ID-верификацию и оценён реальными путешественниками. Без рандомов." },
        { t: "Сохраняй любимое", d: "Понравился tour? Лайкни. Собери wishlist. Синхронизация на всех устройствах." },
        { t: "Кураторские подборки", d: "Подборки от редакции вроде \"Султанахмет за 3 часа\" — маршрут, по которому ходит местный." },
        { t: "Безопасно и с возвратом", d: "Squad не собрался? Полный возврат. Гид не пришёл? Полный возврат. Твои деньги в безопасности." },
      ],
    },
    testimonials: {
      eyebrow: "Реальные путешественники. Реальные города. Реальные доказательства.",
      h2A: "Такая поездка, о которой",
      h2B: "хочется хвастаться.",
      quotes: [
        { q: "Приехала в Стамбул, ничего не зная. Уехала с историей, которую теперь рассказываю всем. Мой гид знал места, которые TikTok ещё не убил.", n: "Mia", l: "Бруклин → Стамбул" },
        { q: "Создал squad с двумя друзьями, проснулся — в чате четыре незнакомца. До рассвета мы не знали друг друга. К закату не могли заткнуться.", n: "Lukas", l: "Берлин → Лиссабон" },
        { q: "Я японка, и мне всегда попадались гиды, которые говорят только по-английски. Нашла гида, выросшего в Канагаве. Будто дома, но в другой стране.", n: "Yui", l: "Токио → Каппадокия" },
      ],
    },
    guides: {
      eyebrow: "Для гидов",
      h2A: "Твой город.",
      h2B: "Твой график. Твоя цена.",
      body: "Без агентских комиссий. Без посредников. Без офиса с 9 до 18. Только ты, твой город, твоя цена. Путешественники выбирают ТЕБЯ — не бренд, не контору, не скрипт. Покажи им город, в пятницу получи деньги.",
      benefits: [
        "💰 Оставляй до 90% — самая низкая комиссия на рынке",
        "🌍 Премиум-оплата за редкие языки автоматически",
        "📅 Сам выбираешь выходные и зоны работы",
        "⭐ Репутация, которая идёт за тобой, а не за компанией",
      ],
      cta: "Стать гидом →",
      stats: [
        { v: "$3.2K", l: "Средний доход в месяц" },
        { v: "8 мин", l: "Среднее время матча" },
        { v: "90%", l: "Доля гида" },
        { v: "4.9★", l: "Удовлетворённость гидов" },
      ],
    },
    finalCta: {
      eyebrow: "Одно приложение. Целый мир.",
      h2A: "Твой следующий город",
      h2B: "уже зовёт.",
      sub: "Следующие 60 секунд решают следующие 6 часов. Скачай. Тапни. Живи городом, как будто ты там живёшь.",
      note: "Бесплатное скачивание. Без подписки. Платишь только за то, что увидел.",
      appStoreSmall: "Скачать в",
      appStore: "App Store",
      playStoreSmall: "Установить из",
      playStore: "Google Play",
    },
    footer: {
      intro: "Самый расслабленный способ исследовать город с настоящим местным. Мгновенные 1-на-1 матчи. Групповые туры, которые сбивают цену. Настоящие моменты, без шаблонов.",
      product: "Продукт",
      company: "Компания",
      about: "О нас",
      contact: "Контакты",
      privacy: "Приватность",
      terms: "Условия",
      copyright: "© {year} VibeGuide. Сделано путешественниками для путешественников.",
      madeWith: "Сделано с ♥ в дороге.",
    },
  },
};
