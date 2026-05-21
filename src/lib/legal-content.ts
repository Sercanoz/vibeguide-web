import type { Locale } from "./i18n";

export type LegalLocale = "en" | "tr";

export function legalLocale(l: Locale): LegalLocale {
  return l === "tr" ? "tr" : "en";
}

export const APP_NAME = "VibeGuide";
export const APP_DOMAIN = "www.vibeguideapp.com";
export const SUPPORT_EMAIL = "support@vibeguideapp.com";
export const KVKK_EMAIL = "kvkk@vibeguideapp.com";
export const COMPANY_LEGAL = "VibeGuide Teknoloji A.Ş."; // güncellenecek
export const LAST_UPDATED = "2026-05-21";

/* ════════ PRIVACY POLICY ════════ */
type PrivacySection = { h: string; p?: string; list?: string[] };
type PrivacyDict = {
  pageTitle: string;
  intro: string;
  lastUpdatedLabel: string;
  sections: PrivacySection[];
};

export const privacy: Record<LegalLocale, PrivacyDict> = {
  en: {
    pageTitle: "Privacy Policy",
    lastUpdatedLabel: "Last updated",
    intro:
      "This Privacy Policy explains how VibeGuide collects, uses, stores, shares and protects personal information. By using VibeGuide, you agree to the practices described in this Policy. We comply with the EU General Data Protection Regulation (GDPR) and the Turkish Personal Data Protection Law No. 6698 (\"KVKK\").",
    sections: [
      {
        h: "1. Company information",
        p: `VibeGuide is operated by ${COMPANY_LEGAL}, based in Istanbul, Türkiye. The data controller (in Türkiye: "veri sorumlusu") for the personal data described below is the company above, operating through the mobile app and ${APP_DOMAIN}. For privacy questions: ${SUPPORT_EMAIL}. For KVKK-specific matters: ${KVKK_EMAIL}.`,
      },
      {
        h: "2. Information we collect",
        list: [
          "Account information: full name, email, phone number, password/login credentials (hashed by Firebase), profile photo, preferred language, country or city, role (tourist/guide).",
          "Authentication data: Firebase Authentication identifiers (UID, email-verified flag, OAuth tokens for Google/Apple sign-in).",
          "Booking information: tour or experience selected, date and time, number of participants, meeting location, guide assignment, booking history, special requests.",
          "Guide KYC data: government-issued ID document image, official tourist guide license card image (\"kokart\"), selfie, and a holding-license photo. Used solely for identity verification by our admin team.",
          "Tour preference notes: optional preferences you attach to a tour request (e.g. \"vegetarian\", \"wheelchair access\", \"kid-friendly\", \"photography route\"). Where such preferences may reveal a health, dietary, religious or accessibility need, they are treated as special-category personal data under GDPR Art. 9 and KVKK Art. 6. We process them only on the basis of your explicit consent at the moment you submit the preference, and only share them with the matched guide.",
          "Guide payout data: full name on the bank account, IBAN, and bank country — collected only from guides for the purpose of receiving weekly payouts of their earned tour income. Treated as financial data and accessible only to the payout/finance team.",
          "Group experience (VibeSquad) data: when you create or join a VibeSquad pool, your first name and profile photo become visible to other participants of that specific pool. Cost-sharing computations are logged at participant level.",
          "Shared trip links: if you use \"Share my trip\", a token is generated so the recipient sees the guide's first name and live location while the tour is in progress. The link expires automatically when the tour ends. You can revoke a share link at any time.",
          "Payment information: limited payment-related metadata (payment status, transaction ID, last digits of payment card where available, refund status, billing information where required, commission split). VibeGuide does not store full credit card numbers directly — card details are processed by our payment provider (iyzico).",
          "Location information: with your permission, precise device location is collected during a tour and sent in real time to the matched counter-party. Background location is only collected for active guides who are explicitly online. Used to show nearby guides, enable instant experiences, improve matching and support safety operations. You may disable location permissions through your device settings.",
          "Device and technical information: device type, operating system, IP address, app version, browser type, language settings, crash logs, usage data, FCM push token, cookies or similar identifiers.",
          "Communication information: in-app chat messages with guides, support requests, emails, complaints, reviews and other communications sent through the platform.",
          "Usage data: tour requests, ratings, in-app messages, cancellation history, and behavioural metrics used by our matching algorithm (e.g. on-time rate, completion rate, penalty counters).",
        ],
      },
      {
        h: "3. How we use information",
        list: [
          "Create and manage accounts",
          "Process bookings and match travellers with guides",
          "Process payments, authorisations and refunds",
          "Provide customer support and resolve disputes",
          "Improve platform performance and user experience",
          "Prevent fraud and abuse",
          "Verify guides and users (KYC, kokart check)",
          "Send service notifications (offer received, tour started, payment confirmed)",
          "Personalise the user experience (locale, suggestions)",
          "Pay guides their weekly earnings via bank transfer (payout)",
          "Score guide reliability and rank guides in instant matching",
          "Enable trip sharing with third parties at your request",
          "Send marketing emails or push notifications where you have given consent",
          "Comply with legal obligations (tax, consumer protection, accounting)",
          "Maintain safety and trust on the platform",
        ],
      },
      {
        h: "4. Legal basis for processing",
        list: [
          "Performance of a contract — provide the service, run live tours, process payments (GDPR Art. 6(1)(b); KVKK Art. 5(2)(c)).",
          "User explicit consent — special-category data such as tour preferences related to health/accessibility (GDPR Art. 9(2)(a); KVKK Art. 6/3); marketing communications.",
          "Legal obligation — KYC checks under the Turkish Tourism Act; tax and accounting retention (GDPR Art. 6(1)(c); KVKK Art. 5(2)(ç)).",
          "Legitimate business interests — fraud prevention, guide reliability scoring (penalty/cancellation counters), marketplace integrity (GDPR Art. 6(1)(f); KVKK Art. 5(2)(f)). You may object — see Section 10.",
          "Protection of users, guides and platform safety — safety incidents and emergency response (GDPR Art. 6(1)(d) where applicable).",
        ],
      },
      {
        h: "5. Sharing of information",
        list: [
          "Guides and service providers — to deliver booked experiences, we share necessary booking details (your first name, profile photo, location during the tour, chat messages, tour preferences) with the assigned guide only for the active booking.",
          "Other VibeSquad participants — within the same pool, your first name and profile photo are visible to other travellers who joined that pool. Outside of the pool, your identity is not exposed.",
          "Recipients of your share link — anyone you send a \"Share my trip\" URL to can see your guide's first name and live location while the tour is in progress, until the link expires or you revoke it.",
          "Payment providers (iyzico) — to process payments, authorisations, refunds and fraud checks. Bound by their own GDPR/KVKK terms.",
          "Banks and payout intermediaries — for guides only, IBAN and account holder name are transmitted to the guide's bank to settle weekly payouts.",
          "Technology providers — hosting (Firebase, Railway, Cloudflare), analytics (Firebase Analytics — anonymised), crash reporting (Sentry — anonymised), notifications, customer support, security, platform operations.",
          "Legal authorities — when required by law, court order, regulatory request, or to protect rights, safety and security.",
          "Business transfers — if VibeGuide is involved in a merger, acquisition, investment, restructuring or sale of assets, personal data may be transferred as part of that transaction. The acquirer will be bound by privacy commitments at least as protective as those in this Policy. We will notify you at least 14 days before such transfer takes effect.",
          "We do not sell personal data.",
        ],
      },
      {
        h: "6. Cookies and analytics",
        list: [
          "VibeGuide may use cookies, pixels, SDKs and similar technologies to:",
          "Keep users logged in",
          "Improve website performance",
          "Analyse traffic and aggregated usage",
          "Understand user behaviour",
          "Improve marketing where consented",
          "Detect fraud",
          "Remember preferences (locale, theme)",
          "The mobile app uses SDKs from Firebase (auth, push, storage), Sentry (crash reporting) and iyzico (payments). These do not include behavioural advertising trackers.",
          "Users may control cookies through browser settings. Some features may not work properly without certain cookies.",
        ],
      },
      {
        h: "7. Marketing communications",
        p: "We may send marketing messages where permitted by law or with your prior consent. You may opt out of marketing communications at any time from app Settings or via the unsubscribe link in any marketing email. Service-related messages — booking confirmations, payment receipts, tour notifications, safety alerts, support replies, and security notices — will still be sent, as they are necessary to perform the service and cannot be opted out of.",
      },
      {
        h: "8. Data retention",
        list: [
          "We keep personal information only as long as necessary for platform operations, booking records, legal obligations, tax and accounting requirements, fraud prevention, dispute resolution, and safety/security. Retention periods may vary depending on the type of data and applicable law.",
          "Account profile: while your account is active, plus 30 days after deletion request (grace period for chargebacks).",
          "Booking records, commission ledger and payout history: 10 years from the booking date — required by Turkish tax law (VUK).",
          "Guide KYC documents: while the guide account is active, then deleted within 90 days of permanent deactivation.",
          "Guide payout / IBAN data: while the guide account is active; the IBAN is retained for the legally required period to evidence outgoing transfers (10 years from each payout), then deleted.",
          "Tour preference notes (incl. special-category data): tied to the related booking and retained for the same 10-year tax period in pseudonymised form (linked to booking ID, not searchable by name). You can request deletion of the preference text at any time.",
          "VibeSquad participation records: 10 years (booking record), but visibility of your name/photo to co-participants stops as soon as the pool ends.",
          "Share trip tokens: stored only while the related tour is active; revoked tokens are deleted within 7 days. Token recipients are not stored as users.",
          "Push tokens: until you uninstall the app or revoke consent.",
          "Marketing consent records: until you withdraw, plus 3 years for evidentiary purposes.",
        ],
      },
      {
        h: "9. Account deletion",
        list: [
          `You may request account deletion through the in-app delete button, by submitting the form at /account-deletion, or by contacting ${SUPPORT_EMAIL}.`,
          "After deletion, some information may be retained where required for:",
          "Legal compliance",
          "Tax records (10 years — VUK)",
          "Fraud prevention",
          "Payment disputes and chargeback handling",
          "Safety investigations",
          "Accounting obligations",
        ],
      },
      {
        h: "10. Your privacy rights",
        p: "Depending on your location and applicable law, you may have the following rights:",
        list: [
          "Access — request a copy of the personal data we hold about you.",
          "Correct — fix inaccurate or incomplete data.",
          "Request deletion — of your account and personal data (see Section 9 / /account-deletion).",
          "Restrict processing — temporarily restrict while we investigate a complaint.",
          "Object — to processing based on legitimate interest, including direct marketing and guide-reliability scoring.",
          "Request data portability — receive your data in a machine-readable format.",
          "Withdraw consent — at any time, with no effect on processing already done.",
          `File a complaint — with your local data protection authority. For Türkiye: KVKB (kvkk.gov.tr). To exercise any of these rights, email ${KVKK_EMAIL} from your registered address — we will respond within 30 days.`,
        ],
      },
      {
        h: "11. KVKK and GDPR notice",
        p: "VibeGuide respects applicable privacy and data protection laws, including Türkiye's KVKK (Law No. 6698) and, where applicable, the EU General Data Protection Regulation (GDPR). The legal references in Sections 4 and 10 implement the specific articles of these laws. Users may contact us regarding privacy rights, data processing, correction, deletion and consent withdrawal at any time.",
      },
      {
        h: "12. International data transfers",
        p: "Your information may be processed or stored in countries outside your country of residence. Some processors (Google Firebase, Sentry, Cloudflare) operate in the United States and the EU. Transfers are protected by the EU Standard Contractual Clauses and, where applicable, KVKB Board-approved commitments. VibeGuide takes reasonable steps to protect personal information during international transfers.",
      },
      {
        h: "13. Data security",
        p: "We use reasonable technical and organisational safeguards to protect personal information. All traffic is encrypted in transit (HTTPS/TLS 1.2+). Authentication uses Firebase ID tokens; payment data is tokenised by iyzico and never stored on our servers. We use App Check to verify that requests come from a genuine app installation. Despite these safeguards, no digital system is 100% secure — you are responsible for keeping your account credentials confidential and we recommend a strong password and two-factor authentication where available.",
      },
      {
        h: "14. Children's privacy",
        p: "VibeGuide is not intended for independent use by children under 18. Travellers under 18 may participate only under the supervision and responsibility of a parent or legal guardian, who is responsible for the booking and consents to this Policy on the minor's behalf. We do not knowingly collect personal data from children without appropriate parental or guardian involvement. If you believe a minor has registered without supervision, contact us and we will delete the account.",
      },
      {
        h: "15. Third-party links",
        p: "VibeGuide may contain links to third-party websites or services (e.g. Google Maps, payment provider pages, tour partner websites). We are not responsible for the privacy practices, content, security or terms of those third-party services. Please review their own privacy policies before sharing information with them.",
      },
      {
        h: "16. Changes to this Privacy Policy",
        p: "We may update this Privacy Policy from time to time. The updated version will be posted with a new \"Last Updated\" date. Material changes will be notified in-app and by email at least 14 days before they take effect. Continued use of VibeGuide after the effective date constitutes acceptance of the updated Policy.",
      },
      {
        h: "17. Contact",
        p: `For privacy questions or data requests: ${SUPPORT_EMAIL}. For KVKK-specific matters: ${KVKK_EMAIL}.`,
      },
    ],
  },
  tr: {
    pageTitle: "Gizlilik Politikası",
    lastUpdatedLabel: "Son güncelleme",
    intro:
      "Bu Gizlilik Politikası; VibeGuide'ın kişisel bilgileri nasıl topladığını, kullandığını, sakladığını, paylaştığını ve koruduğunu açıklar. VibeGuide'ı kullanarak bu Politikada açıklanan uygulamaları kabul etmiş olursunuz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") ve uygulandığı yerlerde AB Genel Veri Koruma Tüzüğü (GDPR) ile uyumluyuz.",
    sections: [
      {
        h: "1. Şirket bilgileri",
        p: `VibeGuide; İstanbul, Türkiye merkezli ${COMPANY_LEGAL} tarafından işletilmektedir. Aşağıda açıklanan kişisel veriler için veri sorumlusu, mobil uygulama ve ${APP_DOMAIN} adresi üzerinden işleten yukarıdaki şirkettir. Gizlilik soruları için: ${SUPPORT_EMAIL}. KVKK özelinde: ${KVKK_EMAIL}.`,
      },
      {
        h: "2. Toplanan bilgiler",
        list: [
          "Hesap bilgileri: ad-soyad, e-posta, telefon numarası, parola/giriş bilgileri (Firebase tarafından hash'lenir), profil fotoğrafı, dil tercihi, ülke veya şehir, rol (turist/rehber).",
          "Kimlik doğrulama verileri: Firebase Authentication tanımlayıcıları (UID, e-posta doğrulama durumu, Google/Apple giriş için OAuth token'ları).",
          "Rezervasyon bilgileri: seçilen tur veya deneyim, tarih ve saat, katılımcı sayısı, buluşma noktası, rehber ataması, rezervasyon geçmişi, özel istekler.",
          "Rehber KYC verileri: nüfus cüzdanı, kokart fotoğrafı, selfie ve elinde kokart tutulan fotoğraf. Yalnızca admin ekibi tarafından kimlik doğrulama amacıyla kullanılır.",
          "Tur tercih notları: bir tur talebine eklediğiniz isteğe bağlı tercihler (örn. \"vejetaryen\", \"tekerlekli sandalye erişimi\", \"çocuklu aile dostu\", \"fotoğraf rotası\"). Bu tercihler sağlık, beslenme, inanç veya engellilik durumunu açığa çıkarabileceği için GDPR m.9 ve KVKK m.6 anlamında özel nitelikli kişisel veridir. Yalnızca tercihi gönderdiğiniz anda verdiğiniz açık rızaya dayanarak işlenir ve yalnızca eşleşilen rehberle paylaşılır.",
          "Rehber ödeme/IBAN verisi: yalnızca rehberlerden, haftalık tur gelirlerinin transferi amacıyla alınan hesap sahibi adı, IBAN ve banka ülkesi. Finansal veri olarak ele alınır ve yalnızca ödeme/finans ekibi erişebilir.",
          "Grup deneyimi (VibeSquad) verisi: bir VibeSquad havuzu oluşturduğunuzda veya katıldığınızda; adınız ve profil fotoğrafınız o havuzdaki diğer katılımcılara görünür hale gelir. Maliyet paylaşımı hesaplamaları katılımcı düzeyinde kaydedilir.",
          "Paylaşılan tur linkleri: \"Tripini paylaş\" özelliğini kullanırsanız, alıcının tur devam ederken rehberinizin adını ve canlı konumunu görmesini sağlayan bir token üretilir. Link, tur biter bitmez otomatik geçersiz hale gelir. Paylaşımı istediğiniz zaman iptal edebilirsiniz.",
          "Ödeme bilgileri: sınırlı ödeme meta-verisi (ödeme durumu, işlem ID'si, kullanılabildiği yerde kart son hanesi, iade durumu, gerektiğinde fatura bilgisi, komisyon kırılımı). Tam kart numaranızı doğrudan saklamayız — kart bilgileri ödeme sağlayıcımız iyzico tarafından işlenir.",
          "Konum bilgisi: izninizle, tur sırasında hassas cihaz konumu toplanır ve eşleşilen karşı tarafa anlık olarak gönderilir. Arka plan konumu yalnızca \"online\" durumdaki rehberler için toplanır. Yakındaki rehberleri göstermek, anlık deneyimleri etkinleştirmek, eşleşmeyi iyileştirmek ve güvenlik operasyonlarını desteklemek için kullanılır. Konum izinlerini cihaz ayarlarınızdan kapatabilirsiniz.",
          "Cihaz ve teknik bilgiler: cihaz türü, işletim sistemi, IP adresi, uygulama sürümü, tarayıcı türü, dil ayarları, çökme kayıtları, kullanım verisi, FCM bildirim token'ı, çerezler veya benzeri tanımlayıcılar.",
          "İletişim bilgileri: rehberlerle uygulama içi mesajlar, destek talepleri, e-postalar, şikayetler, yorumlar ve platform üzerinden gönderilen diğer iletişimler.",
          "Kullanım verisi: tur talepleri, puanlar, mesajlar, iptal geçmişi ve eşleştirme algoritmamızın kullandığı davranışsal metrikler (zamanında olma oranı, tamamlama oranı, penalty sayaçları).",
        ],
      },
      {
        h: "3. Bilgileri nasıl kullanıyoruz",
        list: [
          "Hesap oluşturmak ve yönetmek",
          "Rezervasyonları işlemek ve gezginleri rehberlerle eşleştirmek",
          "Ödeme, otorizasyon ve iadeleri işlemek",
          "Müşteri desteği sağlamak ve uyuşmazlıkları çözmek",
          "Platform performansını ve kullanıcı deneyimini iyileştirmek",
          "Dolandırıcılığı ve kötüye kullanımı önlemek",
          "Rehberleri ve kullanıcıları doğrulamak (KYC, kokart kontrolü)",
          "Hizmet bildirimleri göndermek (teklif geldi, tur başladı, ödeme alındı)",
          "Kullanıcı deneyimini kişiselleştirmek (dil, öneriler)",
          "Rehberlere haftalık kazançlarını banka transferiyle ödemek",
          "Rehber güvenilirlik puanlamasını ve anlık eşleşmede sıralamayı yapmak",
          "Talebiniz üzerine üçüncü kişilerle tur paylaşımını etkinleştirmek",
          "Rıza verdiğiniz durumlarda pazarlama e-postası veya bildirim göndermek",
          "Yasal yükümlülüklere uymak (vergi, tüketici koruma, muhasebe)",
          "Platformda güvenlik ve güveni korumak",
        ],
      },
      {
        h: "4. İşleme hukuki sebepleri",
        list: [
          "Sözleşmenin ifası — hizmeti sunmak, canlı turları yürütmek, ödemeyi işlemek (KVKK m.5/2-c; GDPR m.6/1-b).",
          "Açık rıza — sağlık/erişebilirlikle ilgili tur tercihleri gibi özel nitelikli veriler (KVKK m.6/3; GDPR m.9/2-a); pazarlama iletişimi.",
          "Yasal yükümlülük — 6326 sayılı Turist Rehberliği Meslek Kanunu kapsamında KYC; vergi ve muhasebe saklama (KVKK m.5/2-ç; GDPR m.6/1-c).",
          "Meşru menfaat — dolandırıcılık önleme, rehber güvenilirlik puanlaması (penalty/iptal sayaçları), pazaryeri kalitesi (KVKK m.5/2-f; GDPR m.6/1-f). Bu işlemeye Bölüm 10 kapsamında itiraz edebilirsiniz.",
          "Kullanıcı, rehber ve platform güvenliği — güvenlik olayları ve acil müdahale (uygulandığı yerde GDPR m.6/1-d).",
        ],
      },
      {
        h: "5. Bilgi paylaşımı",
        list: [
          "Rehberler ve hizmet sağlayıcılar — rezerve edilen deneyimleri sunmak için gerekli rezervasyon bilgilerini (adınız, profil fotoğrafı, tur sırasında konum, mesajlar, tur tercihleri) atanmış rehberle yalnızca aktif rezervasyon için paylaşırız.",
          "Diğer VibeSquad katılımcıları — aynı havuz içinde, adınız ve profil fotoğrafınız o havuza katılan diğer gezginlere görünür. Havuz dışında kimliğiniz açığa çıkarılmaz.",
          "Paylaştığınız linki alanlar — \"Share my trip\" linkini gönderdiğiniz kişi, tur devam ettiği sürece (link iptal edilene veya geçersiz hale gelene kadar) rehberinizin adını ve canlı konumunu görür.",
          "Ödeme sağlayıcıları (iyzico) — ödemeleri, otorizasyonları, iadeleri ve dolandırıcılık kontrollerini işlemek için. Kendi KVKK/GDPR şartlarına tabidir.",
          "Bankalar ve ödeme aracıları — yalnızca rehberler için, haftalık ödemenin gerçekleşmesi amacıyla IBAN ve hesap sahibi adı rehberin bankasına iletilir.",
          "Teknoloji sağlayıcıları — barındırma (Firebase, Railway, Cloudflare), analitik (Firebase Analytics — anonimleştirilmiş), hata raporu (Sentry — anonimleştirilmiş), bildirim, müşteri desteği, güvenlik, platform operasyonları.",
          "Yetkili kamu kurumları — yasa, mahkeme kararı, düzenleyici talep veya hakları, güvenliği ve emniyeti korumak için gerektiğinde.",
          "Şirket değişiklikleri — VibeGuide birleşme, satın alma, yatırım, yeniden yapılanma veya varlık satışı süreçlerine taraf olursa kişisel veriler bu işlemin parçası olarak aktarılabilir. Devralan en az bu Politika kadar koruyucu yükümlülüklere bağlı kalır. Bu tür bir aktarım yürürlüğe girmeden en az 14 gün önce bildirim yaparız.",
          "Kişisel verilerinizi satmıyoruz.",
        ],
      },
      {
        h: "6. Çerezler ve analitik",
        list: [
          "VibeGuide şu amaçlarla çerezler, pikseller, SDK'lar ve benzeri teknolojiler kullanabilir:",
          "Kullanıcıları oturumda tutmak",
          "Web sitesi performansını iyileştirmek",
          "Trafiği ve toplu kullanımı analiz etmek",
          "Kullanıcı davranışını anlamak",
          "Rıza verildiği yerde pazarlamayı iyileştirmek",
          "Dolandırıcılığı tespit etmek",
          "Tercihleri (dil, tema) hatırlamak",
          "Mobil uygulama Firebase (kimlik, push, depolama), Sentry (hata raporu) ve iyzico (ödeme) SDK'larını kullanır. Davranışsal reklam takipçisi içermez.",
          "Çerezleri tarayıcı ayarlarınızdan kontrol edebilirsiniz. Bazı çerezler olmadan bazı özellikler düzgün çalışmayabilir.",
        ],
      },
      {
        h: "7. Pazarlama iletişimi",
        p: "Yasaların izin verdiği veya önceden açık rıza verdiğiniz hallerde pazarlama mesajları gönderebiliriz. Uygulama Ayarlar'dan veya pazarlama e-postalarındaki abonelikten çıkma linkinden istediğiniz zaman vazgeçebilirsiniz. Hizmet mesajları — rezervasyon onayı, ödeme dekontu, tur bildirimi, güvenlik uyarısı, destek yanıtı ve güvenlik bildirimleri — hizmetin ifası için gerekli olduğundan vazgeçilemez ve gönderilmeye devam eder.",
      },
      {
        h: "8. Veri saklama",
        list: [
          "Kişisel bilgileri yalnızca platform operasyonları, rezervasyon kayıtları, yasal yükümlülükler, vergi ve muhasebe gereklilikleri, dolandırıcılık önleme, uyuşmazlık çözümü ve güvenlik amaçlarıyla gerektiği kadar saklarız. Saklama süreleri veri türüne ve yürürlükteki mevzuata göre değişebilir.",
          "Hesap profili: hesabınız aktifken + silme talebinizden sonra 30 gün (chargeback koruma süresi).",
          "Rezervasyon kayıtları, komisyon defteri ve ödeme geçmişi: rezervasyon tarihinden itibaren 10 yıl — VUK gereği.",
          "Rehber KYC belgeleri: hesap aktifken; kalıcı kapatmadan sonra en geç 90 gün içinde silinir.",
          "Rehber ödeme/IBAN verisi: hesap aktifken; her ödeme için yapılan banka transferinin yasal ispat süresi boyunca (ödemeden 10 yıl) saklanır, ardından silinir.",
          "Tur tercih notları (özel nitelikli veriler dahil): ilgili rezervasyonla ilişkili olarak 10 yıllık vergi süresi boyunca pseudonimleştirilmiş halde tutulur (booking ID ile bağlı, adla aranamaz). Tercih metninin silinmesini her zaman talep edebilirsiniz.",
          "VibeSquad katılım kayıtları: 10 yıl (booking kaydı); ancak ad/foto'nun havuz katılımcılarına görünürlüğü havuz bitince sona erer.",
          "Share trip token'ları: yalnızca ilgili tur aktifken saklanır; iptal edilen token'lar 7 gün içinde silinir. Link alıcıları kullanıcı olarak kaydedilmez.",
          "Bildirim token'ları: uygulamayı silene veya rızanızı geri alana kadar.",
          "Pazarlama rıza kayıtları: rıza geri alınana kadar + ispat amaçlı 3 yıl.",
        ],
      },
      {
        h: "9. Hesap silme",
        list: [
          `Uygulama içindeki silme butonu, /account-deletion sayfasındaki form veya ${SUPPORT_EMAIL} adresi üzerinden hesap silme talebinde bulunabilirsiniz.`,
          "Silme sonrası bazı bilgiler şu amaçlarla saklanmaya devam edebilir:",
          "Yasal uyum",
          "Vergi kayıtları (10 yıl — VUK)",
          "Dolandırıcılık önleme",
          "Ödeme uyuşmazlıkları ve chargeback işlemleri",
          "Güvenlik soruşturmaları",
          "Muhasebe yükümlülükleri",
        ],
      },
      {
        h: "10. Gizlilik haklarınız",
        p: "Bulunduğunuz konuma ve yürürlükteki mevzuata göre aşağıdaki haklara sahip olabilirsiniz:",
        list: [
          "Bilgi edinme — sizinle ilgili tuttuğumuz kişisel verilerin kopyasını talep etmek.",
          "Düzeltme — eksik veya yanlış verilerin düzeltilmesini istemek.",
          "Silme talebi — hesabınızın ve kişisel verilerinizin silinmesini istemek (bkz. Bölüm 9 / /account-deletion).",
          "İşlemeyi kısıtlama — şikayet incelemesi sırasında geçici olarak.",
          "İtiraz — meşru menfaate dayalı işlemeye, doğrudan pazarlama ve rehber-güvenilirlik puanlaması dahil.",
          "Taşınabilirlik — verilerinizi makine-okur formatta almak.",
          "Rızayı geri çekme — daha önceki işlemelerin geçerliliğini etkilemeden.",
          `Şikâyet — Kişisel Verileri Koruma Kurulu'na (kvkk.gov.tr). Bu hakları kullanmak için kayıtlı adresinizden ${KVKK_EMAIL} adresine yazın — 30 gün içinde yanıt veririz.`,
        ],
      },
      {
        h: "11. KVKK ve GDPR bildirimi",
        p: "VibeGuide; 6698 sayılı KVKK ve uygulandığı yerlerde AB Genel Veri Koruma Tüzüğü (GDPR) dahil olmak üzere yürürlükteki gizlilik ve veri koruma mevzuatına uyar. Bölüm 4 ve 10'daki yasal referanslar bu mevzuatın ilgili maddelerini uygular. Gizlilik hakları, veri işleme, düzeltme, silme ve rıza geri çekme konularında bizimle her zaman iletişime geçebilirsiniz.",
      },
      {
        h: "12. Uluslararası veri aktarımları",
        p: "Bilgileriniz ikamet ettiğiniz ülke dışındaki ülkelerde işlenebilir veya saklanabilir. Bazı işleyiciler (Google Firebase, Sentry, Cloudflare) ABD ve AB'de faaliyet gösterir. Aktarımlar AB Standart Sözleşme Hükümleri ve uygun olduğunda KVKB onaylı taahhütler ile korunur. VibeGuide uluslararası aktarımlar sırasında kişisel bilgileri korumak için makul önlemleri alır.",
      },
      {
        h: "13. Veri güvenliği",
        p: "Kişisel bilgileri korumak için makul teknik ve idari önlemler alırız. Tüm trafik şifreli iletilir (HTTPS/TLS 1.2+). Kimlik doğrulama Firebase ID token'larıyla yapılır; ödeme verisi iyzico tarafından tokenize edilir ve sunucularımızda saklanmaz. Yalnızca gerçek bir uygulama yüklemesinden gelen isteklerin kabul edilmesi için App Check kullanırız. Bu önlemlere rağmen hiçbir dijital sistem %100 güvenli değildir — hesap bilgilerinizin gizliliğinden siz sorumlusunuz ve güçlü parola ile mümkün olduğunda iki adımlı doğrulamayı öneririz.",
      },
      {
        h: "14. Çocukların gizliliği",
        p: "VibeGuide 18 yaş altı çocukların bağımsız kullanımı için tasarlanmamıştır. 18 yaş altı katılımcılar yalnızca veli/yasal vasinin gözetim ve sorumluluğunda yer alabilir; rezervasyondan veli sorumludur ve bu Politikayı çocuk adına kabul etmiş sayılır. Uygun veli/vasi katılımı olmaksızın çocuklardan bilerek kişisel veri toplamayız. Vasi gözetimi olmadan kayıt yapan bir çocuk fark ederseniz bize bildirin, hesabı sileriz.",
      },
      {
        h: "15. Üçüncü taraf linkleri",
        p: "VibeGuide üçüncü taraf web sitelerine veya hizmetlere (örn. Google Maps, ödeme sağlayıcı sayfaları, tur partner web siteleri) link içerebilir. Bu üçüncü taraf hizmetlerin gizlilik uygulamaları, içerikleri veya güvenliğinden sorumlu değiliz. Bilgilerinizi paylaşmadan önce ilgili gizlilik politikalarını inceleyin.",
      },
      {
        h: "16. Bu Gizlilik Politikasındaki değişiklikler",
        p: "Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Güncellenmiş versiyon yeni \"Son güncelleme\" tarihi ile yayınlanır. Esaslı değişiklikler en az 14 gün önceden uygulama içi ve e-posta ile bildirilir. Yürürlük tarihinden sonra VibeGuide kullanımı güncellenmiş Politikanın kabulü anlamına gelir.",
      },
      {
        h: "17. İletişim",
        p: `Gizlilik soruları veya veri talepleri için: ${SUPPORT_EMAIL}. KVKK özelinde: ${KVKK_EMAIL}.`,
      },
    ],
  },
};

/* ════════ TERMS OF SERVICE ════════ */
type TermsSection = { h: string; p?: string; list?: string[] };
type TermsDict = {
  pageTitle: string;
  intro: string;
  lastUpdatedLabel: string;
  sections: TermsSection[];
};

export const terms: Record<LegalLocale, TermsDict> = {
  en: {
    pageTitle: "Terms of Service",
    lastUpdatedLabel: "Last updated",
    intro:
      "These Terms of Service govern your access to and use of VibeGuide, including our website, mobile application, services, booking tools, and related features. By using VibeGuide, you agree to these Terms. If you do not agree, please do not use the platform.",
    sections: [
      {
        h: "1. Company information",
        p: `VibeGuide is operated by ${COMPANY_LEGAL}, based in Istanbul, Türkiye. For legal questions: ${SUPPORT_EMAIL}.`,
      },
      {
        h: "2. Platform description",
        p: "VibeGuide is a digital travel platform that connects travellers with licensed local guides, travel experiences and related services in Türkiye. VibeGuide acts as a marketplace, technology provider, booking facilitator and intermediary platform. Unless clearly stated otherwise, VibeGuide does not directly provide guiding services — guides operate as independent service providers and must hold a valid kokart issued by the Ministry of Culture and Tourism where required by Turkish law.",
      },
      {
        h: "3. Eligibility",
        list: [
          "You must be at least 18 years old to create an account, make a booking, or use paid services.",
          "By using VibeGuide you confirm that: (a) you are legally able to enter into agreements, (b) the information you provide is accurate, (c) you will comply with applicable laws, (d) you will use the platform only for lawful purposes.",
          "Travellers under 18 may participate only under the supervision and responsibility of a parent or legal guardian, who is responsible for the booking and consents to these Terms on the minor's behalf.",
          "Guides must additionally complete identity verification, including upload of a valid kokart, before going live.",
        ],
      },
      {
        h: "4. User accounts",
        list: [
          "Some features require an account. You are responsible for: keeping your login details secure, providing accurate information, updating your account information when necessary, and all activity under your account.",
          "VibeGuide may suspend or terminate accounts that violate these Terms, create risk, abuse the platform, or engage in fraudulent behaviour.",
          "Tourists must verify their email address before booking.",
        ],
      },
      {
        h: "5. Bookings",
        list: [
          "When you make a booking, you agree to: provide accurate participant information, arrive on time, follow the stated meeting instructions, respect the guide and other travellers, and follow all applicable rules, laws and safety instructions.",
          "A booking is not guaranteed until confirmed through the platform (guide assigned and payment captured).",
        ],
      },
      {
        h: "6. Experience types",
        list: [
          "VibeNow (Instant) — instant experiences let you request available guides for selected experiences within a short timeframe. Confirmation depends on guide availability and operational conditions.",
          "VibeSquad (Group) — VibeSquad lets you join or create shared group experiences. A VibeSquad booking may depend on minimum participants, payment authorisation, guide availability and final confirmation.",
          "Private Tours (Planned) — private reservations let you book experiences for specific dates, times, languages and group sizes, subject to availability.",
        ],
      },
      {
        h: "7. Prices and payments",
        list: [
          "Prices shown on VibeGuide may include experience fees, platform fees, VAT where applicable and other charges shown before checkout.",
          "All payments are processed in advance through our third-party payment provider (iyzico). By making a payment, you agree to the payment provider's applicable terms.",
          "VibeGuide does not directly store full credit card details.",
          "VibeGuide charges a 15% commission on each completed tour. The remaining 85% is the guide's earnings, paid out weekly to the IBAN registered in the guide's profile.",
        ],
      },
      {
        h: "8. Payment authorisation",
        p: "For some booking types — especially VibeSquad — VibeGuide or its payment provider may place a temporary authorisation on your payment method. If the booking is confirmed, the authorised amount may be captured. If the booking is not confirmed, the authorisation will be released. The release time depends on your bank or payment provider and may take up to 7 business days.",
      },
      {
        h: "9. Cancellations and refunds",
        list: [
          "Cancellations and refunds are governed by the Cancellation Policy and any booking-specific terms shown before checkout.",
          "Tourist cancellation more than 24 hours before tour start: 100% refund. Less than 24 hours: 50%. Less than 2 hours: no refund.",
          "Guide cancellation: full refund + an apology credit. Repeat cancellations may lead to suspension.",
          "VibeSquad that fails to reach minimum group size before lock: 100% refund automatically.",
          "Refund eligibility may also depend on: time before the experience, experience type, guide assignment, group confirmation status, no-show behaviour, weather or force majeure events, and applicable law.",
        ],
      },
      {
        h: "10. No-show and late arrival",
        list: [
          "If you fail to attend a confirmed experience without cancellation, you may not be eligible for a refund.",
          "If you arrive late, the experience may be shortened, modified or cancelled depending on guide availability and operational conditions.",
          "No-show reports by either party are reviewed by our admin team within 72 hours.",
        ],
      },
      {
        h: "11. Off-platform transactions",
        list: [
          "Travellers and guides must not bypass VibeGuide. You agree NOT to:",
          "— Request or accept payments outside the platform.",
          "— Move a VibeGuide booking outside the platform once a match has been made.",
          "— Avoid platform fees or commissions.",
          "— Exchange contact details (phone, social media) for the purpose of bypassing VibeGuide.",
          "— Re-book the same guide directly to avoid VibeGuide policies.",
          "Detected violations may result in suspension, removal of the booking, forfeiture of pending payouts, or permanent termination.",
        ],
      },
      {
        h: "12. User conduct",
        list: [
          "Users must behave respectfully and lawfully. You agree NOT to:",
          "Harass, threaten or abuse others",
          "Discriminate against others",
          "Damage cultural, historical or natural sites",
          "Engage in illegal activity",
          "Use false identity or payment information",
          "Interfere with platform operations",
          "Misuse reviews, messages or booking tools",
          "Put guides, travellers or local communities at risk",
        ],
      },
      {
        h: "13. Community standards",
        list: [
          "VibeGuide expects all users and guides to treat each other with respect. We do not tolerate:",
          "Harassment",
          "Hate speech",
          "Discrimination (racism, sexism, religious or LGBTQ+ discrimination)",
          "Violence or threats",
          "Fraud",
          "Sexual misconduct",
          "Unsafe conduct",
          "Exploitation of local communities",
          "VibeGuide may investigate reports and take appropriate action regardless of party.",
        ],
      },
      {
        h: "14. Traveller responsibility",
        list: [
          "Travellers are responsible for:",
          "Arriving on time at the agreed meeting point",
          "Following local laws and regulations",
          "Respecting cultural and religious sites",
          "Managing their own belongings",
          "Ensuring they are physically able to participate",
          "Obtaining visas, travel documents and travel insurance where needed",
          "Informing the guide of relevant accessibility, dietary or medical needs in advance",
          "Paying any third-party fees (museum tickets, public transport) as stated in the tour description",
          "VibeGuide is not responsible for losses caused by traveller negligence, failure to follow instructions, or circumstances outside VibeGuide's reasonable control.",
        ],
      },
      {
        h: "15. Guide responsibility",
        list: [
          "Guides and service providers are responsible for:",
          "Providing accurate profile information",
          "Holding a valid kokart at the time of every accepted tour and providing it on request",
          "Delivering confirmed experiences professionally and being physically present at the meeting point on time",
          "Treating travellers respectfully",
          "Following local laws and regulations",
          "Carrying any required professional liability insurance",
          "Avoiding off-platform transactions",
          "Maintaining professional standards",
        ],
      },
      {
        h: "16. Independent service providers",
        p: "Guides operate as independent service providers. Nothing in these Terms creates an employment, agency, partnership, franchise or joint-venture relationship between VibeGuide and any guide. Guides are responsible for their own taxes, professional permits, invoicing and legal compliance.",
      },
      {
        h: "17. Taxes and invoices",
        list: [
          "Prices may include applicable taxes (VAT) where required.",
          "VibeGuide, guides and service providers are each responsible for complying with applicable tax, invoice and reporting obligations according to their role and local law.",
          "Guides operating as self-employed (serbest meslek erbabı) or as a limited company must issue a fatura / e-arşiv invoice to VibeGuide on a monthly basis for commission settlement, and to the traveller where required by Turkish tax law.",
        ],
      },
      {
        h: "18. Disputes between travellers and guides",
        p: "VibeGuide may assist in resolving disputes between travellers and guides but is not automatically responsible for the acts, omissions, delays or failures of independent guides or travellers. When evaluating a dispute we may review: booking timeline, in-app messages, payment status, location pings during the tour, no-show reports and any evidence either party submits. Decisions communicated by the admin review are final.",
      },
      {
        h: "19. Reviews, ratings and content",
        list: [
          "Users may submit reviews, photos, comments or other content based on a real tour. Fake or retaliatory reviews are removed.",
          "By submitting content to VibeGuide, you grant VibeGuide a worldwide, non-exclusive, royalty-free licence to use, display, reproduce, adapt, translate and distribute such content for platform operations, marketing, safety, trust and promotional purposes.",
          "You must not upload content that is false, illegal, offensive, infringing, misleading or harmful.",
        ],
      },
      {
        h: "20. Intellectual property",
        p: "The VibeGuide name, logo, design, software, platform content, branding and related materials belong to VibeGuide or its licensors. You may not copy, reproduce, modify, decompile, distribute or misuse VibeGuide intellectual property, or build a competing service from our materials, without written permission.",
      },
      {
        h: "21. Platform availability",
        list: [
          "VibeGuide aims to provide reliable service but does not guarantee uninterrupted access. The platform may be unavailable due to:",
          "Maintenance",
          "Updates",
          "Technical issues",
          "Third-party service failures",
          "Security reasons",
          "Events outside our control",
        ],
      },
      {
        h: "22. Force majeure",
        list: [
          "VibeGuide is not liable for delays, cancellations, interruptions or failures caused by circumstances beyond reasonable control, including:",
          "Severe weather and natural disasters (earthquake, flood, storm)",
          "Political unrest, strikes, transportation disruption",
          "Pandemics and public-health restrictions",
          "Government action, site closures by authorities",
          "Safety threats, terrorism warnings",
          "Internet outages, payment-provider failures",
        ],
      },
      {
        h: "23. Limitation of liability",
        list: [
          "To the maximum extent permitted by law, VibeGuide is not liable for:",
          "Indirect or consequential damages",
          "Lost profits",
          "Travel delays",
          "Missed flights or connections",
          "Lost personal belongings",
          "Personal decisions made by users",
          "Acts or omissions of independent guides or third parties",
          "Events outside VibeGuide's reasonable control",
          "Our maximum aggregate liability is limited to the amount you paid for the affected booking in the 12 months preceding the claim.",
          "Nothing in these Terms limits liability where it cannot legally be limited, including for gross negligence, wilful misconduct, or under Turkish Consumer Protection Law No. 6502.",
        ],
      },
      {
        h: "24. Suspension and termination",
        list: [
          "VibeGuide may suspend or terminate access if a user:",
          "Violates these Terms",
          "Creates safety risks",
          "Engages in fraud",
          "Attempts off-platform transactions",
          "Abuses refund systems",
          "Harasses others",
          "Violates applicable law",
          "Material breaches receive notice where reasonably possible; serious breaches (fraud, harassment, identity falsification, off-platform transactions, risk to other users) may lead to immediate suspension without prior notice.",
        ],
      },
      {
        h: "25. Account deletion",
        p: `You may request account deletion through the in-app delete button, by submitting the form at /account-deletion, or by contacting ${SUPPORT_EMAIL}. After deletion, some data may be retained where required for legal, tax, accounting, fraud-prevention, safety or dispute-resolution purposes — see the Privacy Policy for details.`,
      },
      {
        h: "26. Changes to these Terms",
        p: "VibeGuide may update these Terms from time to time. The updated version will be posted with a new \"Last Updated\" date. Material changes will be notified in-app and by email at least 14 days in advance. Continued use of the platform after the effective date constitutes acceptance.",
      },
      {
        h: "27. Governing law and jurisdiction",
        p: "These Terms are governed by the laws of the Republic of Türkiye, unless mandatory consumer-protection laws in another jurisdiction apply. Disputes will be resolved in the courts and enforcement offices of Istanbul (Çağlayan), without prejudice to mandatory consumer protection rights you may have in your country of residence.",
      },
      {
        h: "28. Contact",
        p: `For questions about these Terms: ${SUPPORT_EMAIL}.`,
      },
    ],
  },
  tr: {
    pageTitle: "Kullanım Koşulları",
    lastUpdatedLabel: "Son güncelleme",
    intro:
      "Bu Kullanım Koşulları, web sitemiz, mobil uygulamamız, hizmetlerimiz, rezervasyon araçlarımız ve ilgili özellikler dahil olmak üzere VibeGuide'a erişiminizi ve kullanımınızı düzenler. VibeGuide'ı kullanarak bu Koşulları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen platformu kullanmayın.",
    sections: [
      {
        h: "1. Şirket bilgileri",
        p: `VibeGuide; İstanbul, Türkiye merkezli ${COMPANY_LEGAL} tarafından işletilmektedir. Hukuki sorular için: ${SUPPORT_EMAIL}.`,
      },
      {
        h: "2. Platform tanımı",
        p: "VibeGuide; Türkiye'de gezginleri ruhsatlı yerel rehberler, seyahat deneyimleri ve ilgili hizmetlerle buluşturan dijital bir seyahat platformudur. VibeGuide; pazar yeri, teknoloji sağlayıcı, rezervasyon kolaylaştırıcı ve aracı platform rolü üstlenir. Aksi açıkça belirtilmedikçe VibeGuide doğrudan rehberlik hizmeti sağlamaz — rehberler bağımsız hizmet sağlayıcı olarak çalışır ve Türk hukukunun gerektirdiği yerlerde Kültür ve Turizm Bakanlığı tarafından düzenlenmiş geçerli bir kokarta sahip olmalıdır.",
      },
      {
        h: "3. Uygunluk",
        list: [
          "Hesap oluşturmak, rezervasyon yapmak veya ücretli hizmet kullanmak için en az 18 yaşında olmalısınız.",
          "VibeGuide'ı kullanarak şunları onaylarsınız: (a) yasal olarak sözleşme yapma ehliyetine sahip olduğunuzu, (b) verdiğiniz bilgilerin doğru olduğunu, (c) yürürlükteki yasalara uyacağınızı, (d) platformu yalnızca yasal amaçlarla kullanacağınızı.",
          "18 yaş altı katılımcılar yalnızca veli/yasal vasinin gözetim ve sorumluluğunda yer alabilir; veli rezervasyondan sorumludur ve bu Koşulları çocuk adına kabul etmiş sayılır.",
          "Rehberler aktif olmadan önce ayrıca kimlik doğrulamasını ve geçerli kokart yüklemesini tamamlamalıdır.",
        ],
      },
      {
        h: "4. Kullanıcı hesapları",
        list: [
          "Bazı özellikler hesap gerektirir. Şunlardan sorumlusunuz: giriş bilgilerinizin güvenliği, doğru bilgi vermek, gerektiğinde hesap bilgilerinizi güncellemek ve hesabınız altında gerçekleşen tüm aktiviteler.",
          "VibeGuide; bu Koşulları ihlal eden, risk oluşturan, platformu kötüye kullanan veya dolandırıcılık yapan hesapları askıya alabilir veya kapatabilir.",
          "Turistler rezervasyon yapmadan önce e-posta adreslerini doğrulamalıdır.",
        ],
      },
      {
        h: "5. Rezervasyonlar",
        list: [
          "Bir rezervasyon yaptığınızda şunları kabul edersiniz: doğru katılımcı bilgisi vermek, zamanında varmak, buluşma talimatlarına uymak, rehbere ve diğer gezginlere saygı göstermek, yürürlükteki tüm kural, yasa ve güvenlik talimatlarına uymak.",
          "Bir rezervasyon, platform üzerinden onaylanana kadar (rehber atanmış ve ödeme tahsil edilmiş) kesinleşmez.",
        ],
      },
      {
        h: "6. Deneyim türleri",
        list: [
          "VibeNow (Anlık) — Anlık deneyimler, seçili deneyimler için müsait rehberleri kısa süre içinde talep etmenizi sağlar. Onay rehber müsaitliğine ve operasyonel koşullara bağlıdır.",
          "VibeSquad (Grup) — VibeSquad, paylaşımlı grup deneyimlerine katılmanızı veya bunları başlatmanızı sağlar. Bir VibeSquad rezervasyonu; minimum katılımcı sayısı, ödeme otorizasyonu, rehber müsaitliği ve nihai onaya bağlı olabilir.",
          "Özel Turlar (Planlı) — Özel rezervasyonlar, müsaitliğe bağlı olarak belirli tarih, saat, dil ve grup büyüklüğü için deneyim rezerve etmenize olanak tanır.",
        ],
      },
      {
        h: "7. Fiyatlar ve ödemeler",
        list: [
          "VibeGuide'da gösterilen fiyatlar; deneyim ücreti, platform ücreti, uygulanan KDV ve checkout öncesi gösterilen diğer ücretleri içerebilir.",
          "Tüm ödemeler peşin olarak üçüncü taraf ödeme sağlayıcımız (iyzico) üzerinden işlenir. Ödeme yaparak sağlayıcının geçerli koşullarını kabul etmiş olursunuz.",
          "VibeGuide tam kart numaranızı doğrudan saklamaz.",
          "VibeGuide tamamlanan her turdan %15 komisyon alır. Kalan %85 rehberin kazancıdır ve rehber profilinde kayıtlı IBAN'a haftalık olarak aktarılır.",
        ],
      },
      {
        h: "8. Ödeme ön-otorizasyonu",
        p: "Bazı rezervasyon türleri için — özellikle VibeSquad — VibeGuide veya ödeme sağlayıcımız kartınıza geçici bir ön-otorizasyon uygulayabilir. Rezervasyon onaylanırsa otorize tutar tahsil edilir. Rezervasyon onaylanmazsa otorizasyon serbest bırakılır. Serbest bırakma süresi bankanıza veya ödeme sağlayıcınıza bağlıdır ve 7 iş gününe kadar sürebilir.",
      },
      {
        h: "9. İptal ve iade",
        list: [
          "İptal ve iadeler İptal Politikası ve checkout öncesi gösterilen rezervasyon-spesifik koşullarla düzenlenir.",
          "Tur başlangıcına 24 saatten fazla varken turist iptali: %100 iade. 24 saatten az: %50. 2 saatten az: iade yok.",
          "Rehber iptali: tam iade + özür kredisi. Tekrarlanan iptaller askıya alma sebebidir.",
          "Minimum grup büyüklüğüne ulaşamayan VibeSquad otomatik %100 iade alır.",
          "İade uygunluğu ayrıca şunlara bağlı olabilir: deneyim öncesi süre, deneyim türü, rehber atama durumu, grup onay durumu, no-show davranışı, hava koşulları veya mücbir sebep, yürürlükteki mevzuat.",
        ],
      },
      {
        h: "10. No-show ve geç varış",
        list: [
          "İptal etmeden onaylı bir deneyime katılmazsanız iade hakkınız olmayabilir.",
          "Geç varırsanız deneyim; rehber müsaitliği ve operasyonel koşullara bağlı olarak kısaltılabilir, değiştirilebilir veya iptal edilebilir.",
          "Karşı tarafın no-show bildirimleri admin ekibi tarafından 72 saat içinde incelenir.",
        ],
      },
      {
        h: "11. Platform dışı işlemler",
        list: [
          "Gezginler ve rehberler VibeGuide'ı atlatamaz. Aşağıdakileri yapmamayı kabul edersiniz:",
          "— Platform dışında ödeme talep etmek veya almak.",
          "— Eşleşme sağlandıktan sonra rezervasyonu platform dışına taşımak.",
          "— Platform ücretlerinden veya komisyondan kaçınmak.",
          "— VibeGuide'ı atlatmak amacıyla iletişim bilgisi (telefon, sosyal medya) alışverişi yapmak.",
          "— VibeGuide politikalarından kaçınmak için aynı rehberi doğrudan tekrar rezerve etmek.",
          "Tespit edilen ihlal askıya alma, rezervasyon iptali, bekleyen ödemenin geçersiz kılınması veya hesabın kalıcı kapatılmasına yol açabilir.",
        ],
      },
      {
        h: "12. Kullanıcı davranışı",
        list: [
          "Kullanıcılar saygılı ve yasalara uygun davranmalıdır. Aşağıdakileri YAPMAMAYI kabul edersiniz:",
          "Başkalarını taciz etmek, tehdit etmek veya istismar etmek",
          "Başkalarına ayrımcılık yapmak",
          "Kültürel, tarihi veya doğal alanlara zarar vermek",
          "Yasadışı faaliyetlerde bulunmak",
          "Sahte kimlik veya ödeme bilgisi kullanmak",
          "Platform operasyonlarına müdahale etmek",
          "Yorum, mesaj veya rezervasyon araçlarını kötüye kullanmak",
          "Rehberleri, gezginleri veya yerel halkı riske atmak",
        ],
      },
      {
        h: "13. Topluluk standartları",
        list: [
          "VibeGuide tüm kullanıcı ve rehberlerin birbirine saygılı davranmasını bekler. Şunlara tahammül etmiyoruz:",
          "Taciz",
          "Nefret söylemi",
          "Ayrımcılık (ırkçılık, cinsiyetçilik, dini veya LGBTQ+ ayrımcılığı)",
          "Şiddet veya tehdit",
          "Dolandırıcılık",
          "Cinsel taciz",
          "Tehlikeli davranış",
          "Yerel halkın sömürülmesi",
          "VibeGuide şikayetleri inceleyebilir ve taraf gözetmeksizin gerekli işlemi yapabilir.",
        ],
      },
      {
        h: "14. Gezgin sorumluluğu",
        list: [
          "Gezginler şunlardan sorumludur:",
          "Anlaşılan buluşma noktasına zamanında varmak",
          "Yerel yasa ve yönetmeliklere uymak",
          "Kültürel ve dini alanlara saygı göstermek",
          "Kendi eşyalarını yönetmek",
          "Katılım için fiziksel olarak hazır olmak",
          "Gerekli vize, seyahat belgeleri ve seyahat sigortasını edinmek",
          "Rehbere ilgili erişebilirlik, beslenme veya tıbbi ihtiyaçları önceden bildirmek",
          "Tur açıklamasında belirtilen üçüncü taraf ücretlerini (müze, ulaşım) ödemek",
          "VibeGuide, gezgin ihmali, talimatlara uyulmaması veya VibeGuide'ın makul kontrolü dışındaki koşullardan kaynaklanan kayıplardan sorumlu değildir.",
        ],
      },
      {
        h: "15. Rehber sorumluluğu",
        list: [
          "Rehberler ve hizmet sağlayıcılar şunlardan sorumludur:",
          "Doğru profil bilgisi vermek",
          "Kabul edilen her turda geçerli kokarta sahip olmak ve talep halinde göstermek",
          "Onaylı deneyimleri profesyonelce sunmak ve buluşma noktasında zamanında fiziken hazır bulunmak",
          "Gezginlere saygılı davranmak",
          "Yerel yasa ve yönetmeliklere uymak",
          "Gerekli mesleki sorumluluk sigortasını bulundurmak",
          "Platform dışı işlemlerden kaçınmak",
          "Profesyonel standartları korumak",
        ],
      },
      {
        h: "16. Bağımsız hizmet sağlayıcı statüsü",
        p: "Rehberler bağımsız hizmet sağlayıcı olarak çalışır. Bu Koşullardaki hiçbir hüküm VibeGuide ile rehber arasında işçi-işveren, acentelik, ortaklık, franchise veya joint-venture ilişkisi doğurmaz. Rehberler kendi vergi, mesleki ruhsat, faturalama ve hukuki uyum yükümlülüklerinden sorumludur.",
      },
      {
        h: "17. Vergi ve faturalar",
        list: [
          "Fiyatlar gerektiğinde uygulanan vergileri (KDV) içerebilir.",
          "VibeGuide, rehberler ve hizmet sağlayıcılar her biri kendi rol ve yerel mevzuatına göre uygulanan vergi, fatura ve raporlama yükümlülüklerine uymakla yükümlüdür.",
          "Serbest meslek erbabı veya limited şirket olarak çalışan rehberler; komisyon mahsubu için VibeGuide'a aylık fatura/e-arşiv kesmek ve Türk vergi mevzuatının gerektirdiği hallerde gezgine de fatura kesmek zorundadır.",
        ],
      },
      {
        h: "18. Gezgin-rehber uyuşmazlıkları",
        p: "VibeGuide uyuşmazlık çözümünde yardımcı olabilir; ancak bağımsız rehberlerin veya gezginlerin eylem, ihmal, gecikme veya başarısızlıklarından otomatik olarak sorumlu tutulmaz. Uyuşmazlık değerlendirmesinde şunları inceleyebiliriz: rezervasyon zaman çizgisi, uygulama içi mesajlar, ödeme durumu, tur sırasındaki konum verileri, no-show bildirimleri ve tarafların sunduğu deliller. Admin incelemesi sonucu bildirildiğinde karar kesindir.",
      },
      {
        h: "19. Değerlendirme, yorum ve içerik",
        list: [
          "Kullanıcılar gerçek bir tura dayalı yorum, fotoğraf, görüş veya başka içerik gönderebilir. Sahte veya intikam amaçlı yorumlar kaldırılır.",
          "VibeGuide'a içerik gönderdiğinizde; platform operasyonları, pazarlama, güvenlik, güven ve tanıtım amacıyla bu içeriği kullanma, gösterme, çoğaltma, uyarlama, çevirme ve dağıtma konusunda VibeGuide'a dünya çapında, münhasır olmayan, ücretsiz bir lisans vermiş olursunuz.",
          "Yanlış, yasadışı, saldırgan, ihlal edici, yanıltıcı veya zararlı içerik yükleyemezsiniz.",
        ],
      },
      {
        h: "20. Fikri mülkiyet",
        p: "VibeGuide ismi, logo, tasarım, yazılım, platform içeriği, marka ve ilgili materyaller VibeGuide'a veya lisans verenlerine aittir. Yazılı izin olmaksızın bunları kopyalayamaz, çoğaltamaz, değiştiremez, ters mühendislikle çözemez, dağıtamaz veya kötüye kullanamaz; materyallerimizden rakip bir hizmet üretemezsiniz.",
      },
      {
        h: "21. Platform erişilebilirliği",
        list: [
          "VibeGuide güvenilir hizmet sunmayı hedefler; ancak kesintisiz erişim garanti edilmez. Platform şu nedenlerle erişilemez olabilir:",
          "Bakım",
          "Güncellemeler",
          "Teknik sorunlar",
          "Üçüncü taraf hizmet arızaları",
          "Güvenlik nedenleri",
          "Kontrolümüz dışındaki olaylar",
        ],
      },
      {
        h: "22. Mücbir sebep",
        list: [
          "VibeGuide aşağıdaki gibi makul kontrol dışı durumlardan kaynaklanan gecikme, iptal, kesinti veya başarısızlıktan sorumlu değildir:",
          "Ağır hava koşulları ve doğal afetler (deprem, sel, fırtına)",
          "Siyasi kargaşa, grev, ulaşım kesintisi",
          "Salgın hastalıklar ve halk sağlığı kısıtlamaları",
          "Kamu otoritesi kararları, alanların yetkililerce kapatılması",
          "Güvenlik tehditleri, terör uyarıları",
          "İnternet kesintisi, ödeme sağlayıcısı arızası",
        ],
      },
      {
        h: "23. Sorumluluğun sınırlandırılması",
        list: [
          "Yasaların izin verdiği azami ölçüde, VibeGuide şunlardan sorumlu değildir:",
          "Dolaylı veya sonuçsal zararlar",
          "Kâr kaybı",
          "Seyahat gecikmeleri",
          "Kaçırılan uçuş veya aktarmalar",
          "Kayıp kişisel eşyalar",
          "Kullanıcıların kişisel kararları",
          "Bağımsız rehberler veya üçüncü tarafların eylem veya ihmalleri",
          "VibeGuide'ın makul kontrolü dışındaki olaylar",
          "Toplam azami sorumluluğumuz, talep tarihinden geriye doğru 12 ay içinde ilgili rezervasyon için ödediğiniz tutarla sınırlıdır.",
          "Hiçbir madde; ağır ihmal, kasıtlı kötü niyet veya 6502 sayılı Tüketici Kanunu'nun emredici hükümleri kapsamındaki yasal olarak sınırlanamayan sorumluluğu sınırlamaz.",
        ],
      },
      {
        h: "24. Hesap askıya alma ve sonlandırma",
        list: [
          "VibeGuide aşağıdaki durumlarda kullanıcı erişimini askıya alabilir veya sonlandırabilir:",
          "Bu Koşulları ihlal etmek",
          "Güvenlik riski oluşturmak",
          "Dolandırıcılık yapmak",
          "Platform dışı işlem girişiminde bulunmak",
          "İade sistemini kötüye kullanmak",
          "Başkalarını taciz etmek",
          "Yürürlükteki yasaları ihlal etmek",
          "Esaslı ihlallerde makul olduğu ölçüde önceden bildirim yapılır; ciddi ihlaller (dolandırıcılık, taciz, kimlik sahteciliği, platform dışı işlem, diğer kullanıcılara risk) önceden bildirim olmaksızın derhal askıya almaya yol açabilir.",
        ],
      },
      {
        h: "25. Hesap silme",
        p: `Uygulama içindeki silme butonu, /account-deletion sayfasındaki form veya ${SUPPORT_EMAIL} adresi üzerinden hesap silme talebinde bulunabilirsiniz. Silme sonrası; yasal, vergi, muhasebe, dolandırıcılık önleme, güvenlik veya uyuşmazlık çözümü amaçlarıyla bazı veriler saklanabilir — ayrıntılar için Gizlilik Politikasına bakınız.`,
      },
      {
        h: "26. Koşullardaki değişiklikler",
        p: "VibeGuide bu Koşulları zaman zaman güncelleyebilir. Güncellenmiş versiyon yeni \"Son güncelleme\" tarihi ile yayınlanır. Esaslı değişiklikler en az 14 gün önceden uygulama içi ve e-posta ile bildirilir. Yürürlük tarihinden sonra platform kullanımı kabul anlamına gelir.",
      },
      {
        h: "27. Uygulanacak hukuk ve yetkili mahkeme",
        p: "Bu Koşullar; ikamet ettiğiniz başka bir ülkedeki emredici tüketici koruma yasaları saklı kalmak kaydıyla, Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıklar, ikamet ettiğiniz ülkedeki tüketici koruma hakları saklı kalmak kaydıyla İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri'nde çözülecektir.",
      },
      {
        h: "28. İletişim",
        p: `Bu Koşullar hakkında hukuki sorular için: ${SUPPORT_EMAIL}.`,
      },
    ],
  },
};

/* ════════ ACCOUNT DELETION ════════ */
type AccountDeletionDict = {
  pageTitle: string;
  intro: string;
  inAppHeading: string;
  inAppSteps: string[];
  inAppNote: string;
  webHeading: string;
  webBody: string;
  formEmailLabel: string;
  formEmailPh: string;
  formReasonLabel: string;
  formReasonPh: string;
  formSubmit: string;
  whatHappensHeading: string;
  whatHappensList: string[];
  retentionHeading: string;
  retentionBody: string;
  contactBody: string;
};

export const accountDeletion: Record<LegalLocale, AccountDeletionDict> = {
  en: {
    pageTitle: "Delete your VibeGuide account",
    intro:
      "You can permanently delete your VibeGuide account at any time. We meet the Google Play and Apple App Store account-deletion requirements through both an in-app option and the email request below.",
    inAppHeading: "Option 1 — Delete from inside the app (recommended)",
    inAppSteps: [
      "Open the VibeGuide app and sign in.",
      "Tap the Profile tab (bottom right).",
      "Scroll down and tap Delete my account.",
      "Confirm the action. Your account is anonymised within seconds.",
    ],
    inAppNote:
      "If you used Google or Apple sign-in and the app asks you to re-authenticate, follow the prompt. This is a Firebase security requirement.",
    webHeading: "Option 2 — Request deletion by email",
    webBody:
      "If you no longer have the app installed, send an email from the address registered on your account. We will verify the request and complete the deletion within 30 days.",
    formEmailLabel: "Send from your registered email to:",
    formEmailPh: "",
    formReasonLabel: "Suggested subject:",
    formReasonPh: "",
    formSubmit: "Open mail app",
    whatHappensHeading: "What gets deleted",
    whatHappensList: [
      "Your name, profile photo, phone number — replaced with anonymised values.",
      "Your Firebase Authentication account.",
      "Your push notification tokens.",
      "Your guide-specific KYC documents (if applicable) — within 90 days.",
    ],
    retentionHeading: "What we are required to keep",
    retentionBody:
      "Booking and payment records are retained for 10 years to comply with Turkish tax law (VUK). They are linked to a non-identifying anonymised user record and cannot be used to contact you.",
    contactBody: `Questions: ${SUPPORT_EMAIL}.`,
  },
  tr: {
    pageTitle: "VibeGuide hesabınızı silin",
    intro:
      "VibeGuide hesabınızı dilediğiniz zaman kalıcı olarak silebilirsiniz. Google Play ve Apple App Store'un hesap silme şartlarını hem uygulama içi hem de aşağıdaki e-posta yöntemi ile karşılıyoruz.",
    inAppHeading: "Yöntem 1 — Uygulama içinden silme (önerilen)",
    inAppSteps: [
      "VibeGuide uygulamasını açın ve giriş yapın.",
      "Profil sekmesine dokunun (sağ alt köşe).",
      "Aşağı kaydırıp Hesabımı sil seçeneğine dokunun.",
      "Onaylayın. Hesabınız saniyeler içinde anonimleştirilir.",
    ],
    inAppNote:
      "Google veya Apple ile giriş yaptıysanız ve uygulama yeniden kimlik doğrulaması isterse uyarıyı takip edin. Bu bir Firebase güvenlik gereksinimidir.",
    webHeading: "Yöntem 2 — E-posta ile silme talebi",
    webBody:
      "Uygulama artık yüklü değilse, hesabınıza kayıtlı adresinizden bize e-posta gönderin. Talebi doğrular ve 30 gün içinde silmeyi tamamlarız.",
    formEmailLabel: "Kayıtlı e-posta adresinizden gönderin:",
    formEmailPh: "",
    formReasonLabel: "Önerilen konu:",
    formReasonPh: "",
    formSubmit: "Posta uygulamasını aç",
    whatHappensHeading: "Neler silinir",
    whatHappensList: [
      "Adınız, profil fotoğrafınız, telefon numaranız — anonim değerlerle değiştirilir.",
      "Firebase Authentication hesabınız.",
      "Bildirim token'larınız.",
      "Rehberseniz KYC belgeleriniz — en geç 90 gün içinde.",
    ],
    retentionHeading: "Yasal nedenle saklananlar",
    retentionBody:
      "Rezervasyon ve ödeme kayıtları, Vergi Usul Kanunu (VUK) uyarınca 10 yıl boyunca saklanır. Bu kayıtlar tanımlayıcı olmayan bir anonim kullanıcıya bağlıdır ve sizinle iletişime geçmek için kullanılamaz.",
    contactBody: `Sorular: ${SUPPORT_EMAIL}.`,
  },
};

/* ════════ TRIP VIEWER ════════ */
type TripDict = {
  pageTitle: string;
  loadingLabel: string;
  errorTitle: string;
  errorBody: string;
  expiredTitle: string;
  expiredBody: string;
  notStartedTitle: string;
  notStartedBody: string;
  liveBadge: string;
  liveTitle: string;
  liveSubtitle: string;
  guideLabel: string;
  meetingLabel: string;
  startedLabel: string;
  refreshLabel: string;
  completedTitle: string;
  completedBody: string;
  reassureFooter: string;
  ctaInstall: string;
  ctaInstallSub: string;
};

export const trip: Record<LegalLocale, TripDict> = {
  en: {
    pageTitle: "Live trip",
    loadingLabel: "Loading…",
    errorTitle: "Trip not found",
    errorBody:
      "This share link is invalid or has been revoked by the traveller.",
    expiredTitle: "Link expired",
    expiredBody:
      "For privacy reasons, share links are valid only while the trip is active.",
    notStartedTitle: "Trip starts soon",
    notStartedBody: "The traveller hasn't started this tour yet. Check back later.",
    liveBadge: "LIVE",
    liveTitle: "Trip in progress",
    liveSubtitle: "Live location updates every 10 seconds",
    guideLabel: "Guide",
    meetingLabel: "Meeting point",
    startedLabel: "Started at",
    refreshLabel: "Refresh",
    completedTitle: "Trip completed safely",
    completedBody: "The traveller has finished the tour.",
    reassureFooter:
      "VibeGuide guides are licensed by the Turkish Ministry of Culture and Tourism.",
    ctaInstall: "Get VibeGuide",
    ctaInstallSub: "Tour any city with a real local guide.",
  },
  tr: {
    pageTitle: "Canlı tur",
    loadingLabel: "Yükleniyor…",
    errorTitle: "Tur bulunamadı",
    errorBody: "Bu paylaşım linki geçersiz veya gezgin tarafından iptal edildi.",
    expiredTitle: "Linkin süresi doldu",
    expiredBody:
      "Gizlilik nedeniyle paylaşım linkleri yalnızca tur aktifken geçerlidir.",
    notStartedTitle: "Tur birazdan başlıyor",
    notStartedBody: "Gezgin henüz tura başlamadı. Birazdan tekrar deneyin.",
    liveBadge: "CANLI",
    liveTitle: "Tur devam ediyor",
    liveSubtitle: "Canlı konum 10 saniyede bir güncellenir",
    guideLabel: "Rehber",
    meetingLabel: "Buluşma noktası",
    startedLabel: "Başlama",
    refreshLabel: "Yenile",
    completedTitle: "Tur güvenli şekilde tamamlandı",
    completedBody: "Gezgin tura sağ salim devam etti.",
    reassureFooter:
      "VibeGuide rehberleri T.C. Kültür ve Turizm Bakanlığı tarafından lisanslıdır.",
    ctaInstall: "VibeGuide'ı indir",
    ctaInstallSub: "Her şehri gerçek bir yerel rehberle gez.",
  },
};
