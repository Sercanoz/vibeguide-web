// "Why VibeGuide Exists" manifesto — ana sayfa bölümü, tüm diller.
import type { Locale } from "@/lib/i18n";

export type WhyExists = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  body: string;
  closing: string;
};

const data: Record<Locale, WhyExists> = {
  en: {
    eyebrow: "Why VibeGuide Exists",
    titleA: "Tourism got too robotic.",
    titleB: "We're making it human again.",
    body: "Bus tours read the same script in every city. QR codes replaced real conversation. Travellers spend more time queuing than discovering. VibeGuide flips that. One tap, one local, one real day. Solo with VibeNow, in a group with VibeSquad, or planned with Private Tours — there's always a real human on the other side.",
    closing: "No script. No trap. Just the city, in the words of someone who lives it.",
  },
  tr: {
    eyebrow: "VibeGuide Neden Var",
    titleA: "Turizm fazla robotlaştı.",
    titleB: "Biz tekrar insanlaştırıyoruz.",
    body: "Otobüs turları her şehirde aynı senaryoyu okuyor. QR kodlar gerçek sohbetin yerini aldı. Gezginler keşfetmekten çok sıra bekliyor. VibeGuide bunu tersine çevirir. Bir dokunuş, bir yerel, bir gerçek gün. VibeNow ile yalnız, VibeSquad ile grupla ya da Özel Turlar ile planlı — diğer tarafta hep gerçek bir insan var.",
    closing: "Senaryo yok. Tuzak yok. Sadece şehir, onu yaşayan birinin ağzından.",
  },
  de: {
    eyebrow: "Warum es VibeGuide gibt",
    titleA: "Tourismus wurde zu roboterhaft.",
    titleB: "Wir machen ihn wieder menschlich.",
    body: "Bustouren lesen in jeder Stadt dasselbe Skript. QR-Codes haben echte Gespräche ersetzt. Reisende verbringen mehr Zeit in Warteschlangen als beim Entdecken. VibeGuide dreht das um. Ein Tipp, ein Local, ein echter Tag. Solo mit VibeNow, in der Gruppe mit VibeSquad oder geplant mit Private Tours — auf der anderen Seite ist immer ein echter Mensch.",
    closing: "Kein Skript. Keine Falle. Nur die Stadt, in den Worten von jemandem, der sie lebt.",
  },
  fr: {
    eyebrow: "Pourquoi VibeGuide existe",
    titleA: "Le tourisme est devenu trop robotique.",
    titleB: "Nous le rendons à nouveau humain.",
    body: "Les visites en bus récitent le même script dans chaque ville. Les QR codes ont remplacé les vraies conversations. Les voyageurs passent plus de temps à faire la queue qu'à découvrir. VibeGuide inverse la tendance. Un geste, un local, une vraie journée. En solo avec VibeNow, en groupe avec VibeSquad ou planifié avec les Visites Privées — il y a toujours une vraie personne en face.",
    closing: "Pas de script. Pas de piège. Juste la ville, racontée par quelqu'un qui la vit.",
  },
  hr: {
    eyebrow: "Zašto VibeGuide postoji",
    titleA: "Turizam je postao previše robotski.",
    titleB: "Mi ga ponovno činimo ljudskim.",
    body: "Autobusne ture čitaju isti scenarij u svakom gradu. QR kodovi zamijenili su pravi razgovor. Putnici provode više vremena u redovima nego u otkrivanju. VibeGuide to preokreće. Jedan dodir, jedan mještanin, jedan pravi dan. Sami uz VibeNow, u grupi uz VibeSquad ili planirano uz Privatne ture — s druge strane uvijek je pravi čovjek.",
    closing: "Bez scenarija. Bez zamke. Samo grad, riječima onoga tko ga živi.",
  },
  ro: {
    eyebrow: "De ce există VibeGuide",
    titleA: "Turismul a devenit prea robotizat.",
    titleB: "Îl facem din nou uman.",
    body: "Tururile cu autobuzul citesc același scenariu în fiecare oraș. Codurile QR au înlocuit conversația reală. Călătorii petrec mai mult timp la coadă decât descoperind. VibeGuide schimbă asta. O atingere, un localnic, o zi adevărată. Solo cu VibeNow, în grup cu VibeSquad sau planificat cu Tururile Private — de cealaltă parte este mereu un om adevărat.",
    closing: "Fără scenariu. Fără capcană. Doar orașul, în cuvintele cuiva care îl trăiește.",
  },
  zh: {
    eyebrow: "VibeGuide 为何存在",
    titleA: "旅游变得太机械化了。",
    titleB: "我们让它重新有温度。",
    body: "巴士团在每座城市念着相同的台词。二维码取代了真实的交流。旅行者排队的时间比探索的时间还多。VibeGuide 扭转了这一切。轻轻一点，一位当地人，一段真实的旅程。用 VibeNow 独自出行、用 VibeSquad 结伴、或用私人导览精心规划——另一端永远是真实的人。",
    closing: "没有剧本，没有陷阱。只有这座城市，由生活在其中的人讲述。",
  },
  ru: {
    eyebrow: "Зачем существует VibeGuide",
    titleA: "Туризм стал слишком механическим.",
    titleB: "Мы снова делаем его человечным.",
    body: "Автобусные туры читают один и тот же сценарий в каждом городе. QR-коды заменили живое общение. Путешественники проводят больше времени в очередях, чем в открытиях. VibeGuide меняет это. Одно касание, один местный, один настоящий день. В одиночку с VibeNow, в группе с VibeSquad или по плану с частными турами — на другой стороне всегда живой человек.",
    closing: "Без сценария. Без ловушек. Только город — словами того, кто им живёт.",
  },
  es: {
    eyebrow: "Por qué existe VibeGuide",
    titleA: "El turismo se volvió demasiado robótico.",
    titleB: "Lo hacemos humano de nuevo.",
    body: "Los tours en autobús recitan el mismo guion en cada ciudad. Los códigos QR reemplazaron la conversación real. Los viajeros pasan más tiempo haciendo cola que descubriendo. VibeGuide le da la vuelta. Un toque, un local, un día real. Solo con VibeNow, en grupo con VibeSquad o planificado con los Tours Privados — siempre hay una persona real al otro lado.",
    closing: "Sin guion. Sin trampa. Solo la ciudad, en palabras de quien la vive.",
  },
  ko: {
    eyebrow: "VibeGuide가 존재하는 이유",
    titleA: "관광이 너무 기계적으로 변했습니다.",
    titleB: "우리는 다시 사람답게 만듭니다.",
    body: "버스 투어는 어느 도시에서나 똑같은 대본을 읽습니다. QR 코드가 진짜 대화를 대체했습니다. 여행자는 발견보다 줄 서는 데 더 많은 시간을 씁니다. VibeGuide는 이를 뒤집습니다. 한 번의 탭, 한 명의 현지인, 진짜 하루. VibeNow로 혼자, VibeSquad로 함께, 또는 프라이빗 투어로 계획적으로 — 반대편에는 늘 진짜 사람이 있습니다.",
    closing: "대본도, 함정도 없습니다. 오직 그 도시를, 그곳을 사는 사람의 말로.",
  },
  el: {
    eyebrow: "Γιατί υπάρχει το VibeGuide",
    titleA: "Ο τουρισμός έγινε υπερβολικά ρομποτικός.",
    titleB: "Τον κάνουμε ξανά ανθρώπινο.",
    body: "Οι περιηγήσεις με λεωφορείο διαβάζουν το ίδιο σενάριο σε κάθε πόλη. Τα QR κωδικά αντικατέστησαν την πραγματική συνομιλία. Οι ταξιδιώτες περνούν περισσότερο χρόνο στην ουρά παρά εξερευνώντας. Το VibeGuide το αντιστρέφει. Ένα άγγιγμα, ένας ντόπιος, μια πραγματική μέρα. Μόνοι με το VibeNow, σε ομάδα με το VibeSquad ή προγραμματισμένα με τις Ιδιωτικές Ξεναγήσεις — απέναντι υπάρχει πάντα ένας πραγματικός άνθρωπος.",
    closing: "Χωρίς σενάριο. Χωρίς παγίδα. Μόνο η πόλη, με τα λόγια κάποιου που τη ζει.",
  },
  ja: {
    eyebrow: "VibeGuide が存在する理由",
    titleA: "観光は機械的になりすぎました。",
    titleB: "私たちは再び人間らしくします。",
    body: "バスツアーはどの街でも同じ台本を読みます。QRコードが本物の会話に取って代わりました。旅行者は発見よりも行列に多くの時間を費やします。VibeGuide はそれを覆します。ひとつのタップ、ひとりの地元の人、ひとつの本物の一日。VibeNow で一人で、VibeSquad でグループで、またはプライベートツアーで計画的に——向こう側にはいつも本物の人がいます。",
    closing: "台本なし。罠なし。ただその街を、そこに生きる人の言葉で。",
  },
  bg: {
    eyebrow: "Защо съществува VibeGuide",
    titleA: "Туризмът стана прекалено роботизиран.",
    titleB: "Ние го правим отново човешки.",
    body: "Автобусните обиколки четат един и същ сценарий във всеки град. QR кодовете замениха истинския разговор. Пътниците прекарват повече време в опашки, отколкото в откриване. VibeGuide обръща това. Едно докосване, един местен, един истински ден. Сами с VibeNow, в група с VibeSquad или планирано с частните обиколки — от другата страна винаги има истински човек.",
    closing: "Без сценарий. Без капан. Само градът, с думите на някой, който го живее.",
  },
  sr: {
    eyebrow: "Zašto VibeGuide postoji",
    titleA: "Turizam je postao previše robotski.",
    titleB: "Mi ga ponovo činimo ljudskim.",
    body: "Autobuske ture čitaju isti scenario u svakom gradu. QR kodovi su zamenili pravi razgovor. Putnici provode više vremena u redovima nego u otkrivanju. VibeGuide to preokreće. Jedan dodir, jedan meštanin, jedan pravi dan. Sami uz VibeNow, u grupi uz VibeSquad ili planirano uz Privatne ture — sa druge strane je uvek pravi čovek.",
    closing: "Bez scenarija. Bez zamke. Samo grad, rečima onoga ko ga živi.",
  },
  it: {
    eyebrow: "Perché esiste VibeGuide",
    titleA: "Il turismo è diventato troppo robotico.",
    titleB: "Lo rendiamo di nuovo umano.",
    body: "I tour in autobus recitano lo stesso copione in ogni città. I codici QR hanno sostituito la conversazione vera. I viaggiatori passano più tempo in fila che a scoprire. VibeGuide ribalta tutto. Un tocco, un local, una giornata vera. Da soli con VibeNow, in gruppo con VibeSquad o pianificati con i Tour Privati — dall'altra parte c'è sempre una persona vera.",
    closing: "Niente copione. Nessuna trappola. Solo la città, nelle parole di chi la vive.",
  },
  ar: {
    eyebrow: "لماذا وُجد VibeGuide",
    titleA: "أصبحت السياحة آلية أكثر من اللازم.",
    titleB: "نحن نعيد إليها إنسانيتها.",
    body: "جولات الحافلات تقرأ النص نفسه في كل مدينة. حلّت رموز QR محل المحادثة الحقيقية. يقضي المسافرون وقتاً في الطوابير أكثر من الاكتشاف. VibeGuide يقلب ذلك. لمسة واحدة، شخص محلي واحد، يوم حقيقي واحد. بمفردك مع VibeNow، أو في مجموعة مع VibeSquad، أو مخططاً مع الجولات الخاصة — هناك دائماً إنسان حقيقي على الطرف الآخر.",
    closing: "لا نص. لا فخ. فقط المدينة، بكلمات من يعيشها.",
  },
  nl: {
    eyebrow: "Waarom VibeGuide bestaat",
    titleA: "Toerisme werd te robotachtig.",
    titleB: "Wij maken het weer menselijk.",
    body: "Bustours lezen in elke stad hetzelfde script. QR-codes vervingen echte gesprekken. Reizigers staan meer in de rij dan dat ze ontdekken. VibeGuide draait dat om. Eén tik, één local, één echte dag. Solo met VibeNow, in een groep met VibeSquad of gepland met Privétours — aan de andere kant staat altijd een echt mens.",
    closing: "Geen script. Geen val. Alleen de stad, in de woorden van iemand die er leeft.",
  },
  pl: {
    eyebrow: "Dlaczego istnieje VibeGuide",
    titleA: "Turystyka stała się zbyt zrobotyzowana.",
    titleB: "Znów czynimy ją ludzką.",
    body: "Wycieczki autokarowe czytają ten sam scenariusz w każdym mieście. Kody QR zastąpiły prawdziwą rozmowę. Podróżni spędzają więcej czasu w kolejkach niż na odkrywaniu. VibeGuide to odwraca. Jedno dotknięcie, jeden mieszkaniec, jeden prawdziwy dzień. Solo z VibeNow, w grupie z VibeSquad lub zaplanowane z Wycieczkami Prywatnymi — po drugiej stronie zawsze jest prawdziwy człowiek.",
    closing: "Bez scenariusza. Bez pułapki. Tylko miasto, słowami kogoś, kto nim żyje.",
  },
  uk: {
    eyebrow: "Чому існує VibeGuide",
    titleA: "Туризм став надто механічним.",
    titleB: "Ми знову робимо його людяним.",
    body: "Автобусні тури читають один і той самий сценарій у кожному місті. QR-коди замінили справжнє спілкування. Мандрівники проводять більше часу в чергах, ніж у відкриттях. VibeGuide змінює це. Один дотик, один місцевий, один справжній день. Самостійно з VibeNow, у групі з VibeSquad або заплановано з приватними турами — на іншому боці завжди справжня людина.",
    closing: "Без сценарію. Без пастки. Лише місто — словами того, хто ним живе.",
  },
  id: {
    eyebrow: "Mengapa VibeGuide Ada",
    titleA: "Pariwisata jadi terlalu kaku.",
    titleB: "Kami membuatnya manusiawi lagi.",
    body: "Tur bus membacakan naskah yang sama di setiap kota. Kode QR menggantikan percakapan nyata. Pelancong menghabiskan lebih banyak waktu mengantre daripada menjelajah. VibeGuide membalikkannya. Satu ketukan, satu warga lokal, satu hari yang nyata. Sendiri dengan VibeNow, berkelompok dengan VibeSquad, atau terencana dengan Tur Privat — selalu ada manusia nyata di sisi lain.",
    closing: "Tanpa naskah. Tanpa jebakan. Hanya kota, dalam kata-kata orang yang menjalaninya.",
  },
  pt: {
    eyebrow: "Por que o VibeGuide existe",
    titleA: "O turismo ficou robótico demais.",
    titleB: "Estamos a torná-lo humano outra vez.",
    body: "As excursões de autocarro leem o mesmo guião em cada cidade. Os códigos QR substituíram a conversa real. Os viajantes passam mais tempo em filas do que a descobrir. O VibeGuide inverte isso. Um toque, um local, um dia real. Sozinho com o VibeNow, em grupo com o VibeSquad ou planeado com os Tours Privados — há sempre uma pessoa real do outro lado.",
    closing: "Sem guião. Sem armadilha. Apenas a cidade, nas palavras de quem a vive.",
  },
};

export function getWhyExists(locale: string): WhyExists {
  return data[locale as Locale] ?? data.en;
}
