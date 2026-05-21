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
      "VibeGuide (\"we\", \"us\", \"our\") respects your privacy. This Privacy Policy explains what personal data we collect, how we use it, and the rights you have under the EU General Data Protection Regulation (GDPR) and the Turkish Personal Data Protection Law No. 6698 (\"KVKK\").",
    sections: [
      {
        h: "1. Who we are (Data Controller)",
        p: `${COMPANY_LEGAL}, operating the VibeGuide marketplace through the mobile app and ${APP_DOMAIN}, is the data controller (in Türkiye: \"veri sorumlusu\") for the personal data described below. Contact: ${SUPPORT_EMAIL}.`,
      },
      {
        h: "2. Data we collect",
        list: [
          "Account data: full name, email, phone, profile photo, preferred language, role (tourist/guide).",
          "Authentication data: Firebase Authentication identifiers (UID, email-verified flag, OAuth tokens for Google/Apple sign-in).",
          "Guide KYC data: government-issued ID document image, official tourist guide license card image (\"kokart\"), selfie, and a holding-license photo. Used solely for identity verification by our admin team.",
          "Location data: precise device location while a tour is in progress, sent in real time to the matched counter-party. Background location is only collected for active guides who are explicitly online.",
          "Usage data: tour requests, bookings, ratings, reviews, in-app messages with guides, cancellation history, and behavioural metrics used by our matching algorithm (e.g. on-time rate, completion rate).",
          "Tour preference notes: optional preferences you attach to a tour request (e.g. \"vegetarian\", \"wheelchair access\", \"kid-friendly\", \"photography route\"). Where such preferences may reveal a health, dietary, religious or accessibility need, they are treated as special-category personal data under GDPR Art. 9 and KVKK Art. 6. We process them only on the basis of your explicit consent given at the moment you submit the preference, and only share them with the matched guide to enable the requested accommodation.",
          "Payment data: limited transaction metadata (amount, status, timestamp, commission split). Card details are processed by our payment provider (iyzico) and are never stored on our servers.",
          "Guide payout data: full name on the bank account, IBAN, and bank country, collected only from guides for the purpose of receiving weekly payouts of their earned tour income. Treated as financial data and accessible only to the payout/finance team.",
          "Group experience (VibeSquad) data: when you create or join a VibeSquad pool, your first name and profile photo become visible to the other participants of that specific pool. Cost-sharing computations are logged at participant level.",
          "Shared trip links: if you choose to share an active tour with friends or family via the \"Share my trip\" feature, the recipient of the share link will see your guide's first name and live location while the tour is in progress. The link expires automatically when the tour ends. You can revoke a share link at any time from the app.",
          "Device data: FCM push token, device model, OS version, app version, IP address, crash logs.",
        ],
      },
      {
        h: "3. Why we use it (Legal bases)",
        list: [
          "To provide the service — match tourists with guides, run live trips, process payments. Legal basis: contract performance (GDPR Art. 6(1)(b); KVKK Art. 5(2)(c)).",
          "To verify guide identities and prevent fraud. Legal basis: legal obligation under Turkish Tourism Act, and our legitimate interest in marketplace integrity (GDPR Art. 6(1)(c) & (f); KVKK Art. 5(2)(ç) & (f)).",
          "To send transactional notifications (offer received, tour started, payment confirmed). Legal basis: contract performance.",
          "To process tour preferences that may relate to health, accessibility, dietary or religious needs. Legal basis: your explicit consent (GDPR Art. 9(2)(a); KVKK Art. 6/3).",
          "To enable group experiences (VibeSquad) where participants can see each other's first name and profile photo within the same pool. Legal basis: contract performance and your decision to join a public pool.",
          "To pay guides their weekly earnings via bank transfer (payout). Legal basis: contract performance and compliance with tax / accounting law.",
          "To score guide reliability and rank guides in instant matching (penalty/cancellation counters, on-time scoring). Legal basis: legitimate interest in marketplace quality (GDPR Art. 6(1)(f); KVKK Art. 5/2-f). You may object — see Section 7.",
          "To enable trip sharing with third parties at your request. Legal basis: your action of generating a share link (Art. 6(1)(a)/(b)). You can revoke the link at any time.",
          "To send marketing emails or push notifications. Legal basis: explicit consent — you can withdraw at any time from app Settings.",
          "To comply with tax and accounting law (10-year retention of booking records, including commission and payout ledger). Legal basis: legal obligation.",
        ],
      },
      {
        h: "4. Who we share it with",
        list: [
          "The matched counter-party — guide ↔ tourist exchange first name, profile photo, and live location for the duration of the tour only. Any tour preference notes you attach are also shared with the guide so they can accommodate them.",
          "Other VibeSquad participants — within the same pool, your first name and profile photo are visible to other travellers who joined that pool. Outside of the pool, your identity is not exposed.",
          "Recipients of your share link — anyone you send a \"Share my trip\" URL to can see your guide's first name and live location while the tour is in progress, until the link expires or you revoke it.",
          "Payment provider (iyzico) — processes card payments. Bound by their own GDPR/KVKK terms.",
          "Banks and payout intermediaries — for guides only, IBAN and account holder name are transmitted to the guide's bank to settle weekly payouts.",
          "Cloud infrastructure (Google Firebase, Railway, Cloudflare) — hosts the app and back-end. Data may be processed in the EU and the United States under standard contractual clauses.",
          "Anti-fraud and analytics providers (Sentry, Firebase Analytics) — receive anonymised crash and usage data.",
          "Public authorities — only when required by a valid court order or by Turkish or EU law.",
          "We never sell your personal data.",
        ],
      },
      {
        h: "5. International transfers",
        p: "Some processors (Google, Sentry) operate in the United States. Transfers are protected by the EU Standard Contractual Clauses and, where applicable, KVKB Board-approved commitments.",
      },
      {
        h: "6. Retention",
        list: [
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
        h: "7. Your rights",
        p: "Under GDPR and KVKK, you can:",
        list: [
          "Access — request a copy of the personal data we hold about you.",
          "Rectify — correct inaccurate or incomplete data.",
          "Erase — request deletion of your account and personal data (see /account-deletion).",
          "Restrict — temporarily restrict processing while we investigate a complaint.",
          "Portability — receive your data in a machine-readable format.",
          "Object — to processing based on legitimate interest, including direct marketing.",
          "Withdraw consent — at any time, with no effect on processing already done.",
          `Lodge a complaint — with your local data protection authority. For Türkiye: KVKB (kvkk.gov.tr). To exercise any of these rights, email ${KVKK_EMAIL} from your registered address — we will respond within 30 days.`,
        ],
      },
      {
        h: "8. Cookies and analytics",
        p: "Our marketing website uses essential cookies only (locale preference). The mobile app does not use third-party advertising trackers. Anonymised analytics may be collected to improve the product.",
      },
      {
        h: "9. Children",
        p: "VibeGuide is not directed at children under 16. We do not knowingly collect data from minors. If you believe a child has registered, contact us and we will delete the account.",
      },
      {
        h: "10. Security",
        p: "All traffic is encrypted in transit (HTTPS/TLS 1.2+). Authentication uses Firebase ID tokens; payment data is tokenised by iyzico. Despite these safeguards, no system is 100% secure — please use a strong password and enable two-factor authentication where available.",
      },
      {
        h: "11. Changes",
        p: "If we make material changes to this Policy, we will notify you in-app and by email at least 14 days before they take effect. Continued use of the service after that date constitutes acceptance.",
      },
      {
        h: "12. Contact",
        p: `Questions, complaints, or privacy requests: ${SUPPORT_EMAIL} or, for KVKK-specific matters, ${KVKK_EMAIL}.`,
      },
    ],
  },
  tr: {
    pageTitle: "Gizlilik Politikası",
    lastUpdatedLabel: "Son güncelleme",
    intro:
      "VibeGuide (\"biz\") gizliliğinize saygı duyar. Bu Gizlilik Politikası; hangi kişisel verileri topladığımızı, neden işlediğimizi ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") ile AB Genel Veri Koruma Tüzüğü (GDPR) kapsamındaki haklarınızı açıklar.",
    sections: [
      {
        h: "1. Veri Sorumlusu",
        p: `${COMPANY_LEGAL}, mobil uygulama ve ${APP_DOMAIN} adresi üzerinden VibeGuide pazarını işleten veri sorumlusudur. İletişim: ${SUPPORT_EMAIL}.`,
      },
      {
        h: "2. İşlenen kişisel veriler",
        list: [
          "Hesap verileri: ad-soyad, e-posta, telefon, profil fotoğrafı, dil tercihi, rol (turist/rehber).",
          "Kimlik doğrulama verileri: Firebase Authentication tanımlayıcıları (UID, e-posta doğrulanma durumu, Google/Apple ile giriş için OAuth token'ları).",
          "Rehber KYC verileri: nüfus cüzdanı, kokart fotoğrafı, selfie ve elinde kokart tutulan fotoğraf. Yalnızca admin ekibi tarafından kimlik doğrulama amacıyla kullanılır.",
          "Konum verisi: tur sırasında, eşleşilen karşı tarafa anlık olarak gönderilen hassas cihaz konumu. Arka plan konumu yalnızca \"online\" durumdaki rehberler için toplanır.",
          "Kullanım verileri: tur talepleri, rezervasyonlar, puanlar, yorumlar, rehberlerle uygulama içi mesajlar, iptal geçmişi ve eşleştirme algoritmamızın kullandığı davranışsal metrikler (zamanında olma oranı, tur tamamlama oranı vb.).",
          "Tur tercih notları: bir tur talebine eklediğiniz isteğe bağlı tercihler (örn. \"vejetaryen\", \"tekerlekli sandalye erişimi\", \"çocuklu aile dostu\", \"fotoğraf rotası\"). Bu tercihler sağlık, beslenme, inanç veya engellilik durumunu açığa çıkarabileceği için GDPR m.9 ve KVKK m.6 anlamında özel nitelikli kişisel veri olarak kabul edilir. Yalnızca tercihi gönderdiğiniz anda verdiğiniz açık rızaya dayanarak işlenir ve istediğiniz uyumun sağlanması için yalnızca eşleşilen rehberle paylaşılır.",
          "Ödeme verileri: sınırlı işlem meta-verisi (tutar, durum, zaman damgası, komisyon kırılımı). Kart bilgileri ödeme sağlayıcımız iyzico tarafından işlenir, sunucularımızda saklanmaz.",
          "Rehber ödeme/IBAN verisi: yalnızca rehberlerden, haftalık tur gelirlerinin transferi amacıyla alınan hesap sahibi adı, IBAN ve banka ülkesi. Finansal veri olarak ele alınır ve yalnızca ödeme/finans ekibi erişebilir.",
          "Grup deneyimi (VibeSquad) verisi: bir VibeSquad havuzu oluşturduğunuzda veya katıldığınızda; adınız ve profil fotoğrafınız o havuzdaki diğer katılımcılara görünür hale gelir. Maliyet paylaşımı hesaplamaları katılımcı düzeyinde kaydedilir.",
          "Paylaşılan tur linkleri: aktif bir turu \"Tripini paylaş\" özelliğiyle arkadaş/aileyle paylaşmayı seçerseniz; linki alan kişi tur devam ederken rehberinizin adını ve canlı konumunu görür. Link, tur biter bitmez otomatik geçersiz hale gelir. Paylaşımı uygulama içinden istediğiniz zaman iptal edebilirsiniz.",
          "Cihaz verileri: FCM bildirim token'ı, cihaz modeli, OS sürümü, uygulama sürümü, IP adresi, çökme kayıtları.",
        ],
      },
      {
        h: "3. İşleme amaçları ve hukuki sebepler",
        list: [
          "Hizmeti sunmak — turistleri rehberlerle eşleştirmek, canlı turları yürütmek, ödemeyi işlemek. Hukuki sebep: sözleşmenin ifası (KVKK m.5/2-c; GDPR m.6/1-b).",
          "Rehber kimliklerini doğrulamak ve dolandırıcılığı önlemek. Hukuki sebep: 6326 sayılı Turist Rehberliği Meslek Kanunu kapsamındaki yasal yükümlülük ve meşru menfaat (KVKK m.5/2-ç ve f; GDPR m.6/1-c ve f).",
          "İşlemsel bildirimler (teklif geldi, tur başladı, ödeme alındı). Hukuki sebep: sözleşmenin ifası.",
          "Sağlık, erişebilirlik, beslenme veya inançla ilgili olabilecek tur tercihlerini işlemek. Hukuki sebep: açık rızanız (KVKK m.6/3; GDPR m.9/2-a).",
          "Aynı havuza katılan VibeSquad katılımcılarının birbirlerinin ad ve profil fotoğrafını görmesini sağlamak. Hukuki sebep: sözleşmenin ifası ve açık bir havuza katılma kararınız.",
          "Rehberlere haftalık tur kazançlarını banka transferiyle ödemek. Hukuki sebep: sözleşmenin ifası ve vergi/muhasebe yükümlülüğü.",
          "Rehber güvenilirlik puanlaması ve anlık eşleşmede rehber sıralaması (iptal/penalty sayaçları, zamanında olma puanı). Hukuki sebep: pazaryeri kalitesinde meşru menfaat (KVKK m.5/2-f; GDPR m.6/1-f). Bu işlemeye Bölüm 7 kapsamında itiraz edebilirsiniz.",
          "Talebiniz üzerine üçüncü kişilerle tur paylaşımı (Share my trip). Hukuki sebep: paylaşım linkini oluşturma eyleminiz (m.6/1-a/b). Linki istediğiniz zaman iptal edebilirsiniz.",
          "Pazarlama e-postası veya bildirim göndermek. Hukuki sebep: açık rıza — uygulama Ayarlar'dan istediğiniz zaman geri alabilirsiniz.",
          "Vergi ve muhasebe yükümlülükleri (rezervasyon kayıtları, komisyon ve ödeme defterinin 10 yıl saklanması). Hukuki sebep: yasal yükümlülük.",
        ],
      },
      {
        h: "4. Aktarılan taraflar",
        list: [
          "Eşleşilen karşı taraf — rehber ↔ turist; tur süresince adı, profil fotoğrafı ve canlı konumu paylaşılır. Eklediğiniz tur tercih notları da, talep edilen uyumun sağlanması için rehberle paylaşılır.",
          "Diğer VibeSquad katılımcıları — aynı havuz içinde, adınız ve profil fotoğrafınız o havuza katılan diğer gezginlere görünür. Havuz dışında kimliğiniz açığa çıkarılmaz.",
          "Paylaştığınız linki alanlar — \"Share my trip\" linkini gönderdiğiniz kişi, tur devam ettiği sürece (link iptal edilene veya geçersiz hale gelene kadar) rehberinizin adını ve canlı konumunu görür.",
          "Ödeme sağlayıcı (iyzico) — kart ödemelerini işler. Kendi KVKK/GDPR şartlarına tabidir.",
          "Bankalar ve ödeme aracıları — yalnızca rehberler için, haftalık ödemenin gerçekleşmesi amacıyla IBAN ve hesap sahibi adı rehberin bankasına iletilir.",
          "Bulut altyapısı (Google Firebase, Railway, Cloudflare) — uygulama ve sunucu barındırma. Veriler standart sözleşme hükümleri kapsamında AB ve ABD'de işlenebilir.",
          "Analitik ve hata izleme (Sentry, Firebase Analytics) — anonimleştirilmiş çökme ve kullanım verisi alır.",
          "Yetkili kamu kurumları — yalnızca geçerli mahkeme kararı veya Türk/AB mevzuatı gereği talep edildiğinde.",
          "Kişisel verilerinizi asla satmıyoruz.",
        ],
      },
      {
        h: "5. Yurt dışına aktarım",
        p: "Bazı işleyiciler (Google, Sentry) ABD'de faaliyet gösterir. Aktarımlar AB Standart Sözleşme Hükümleri ve uygun olduğunda KVKB onaylı taahhütler ile korunur.",
      },
      {
        h: "6. Saklama süreleri",
        list: [
          "Hesap profili: hesabınız aktifken + silme talebinizden sonra 30 gün (chargeback koruma süresi).",
          "Rezervasyon kayıtları, komisyon defteri ve ödeme (payout) geçmişi: rezervasyon tarihinden itibaren 10 yıl — VUK gereği.",
          "Rehber KYC belgeleri: hesap aktifken; kalıcı kapatmadan sonra en geç 90 gün içinde silinir.",
          "Rehber ödeme/IBAN verisi: hesap aktifken; her ödeme için yapılan banka transferinin yasal ispat süresi boyunca (ödemeden 10 yıl) saklanır, ardından silinir.",
          "Tur tercih notları (özel nitelikli veriler dahil): ilgili rezervasyonla ilişkili olarak aynı 10 yıllık vergi süresi boyunca pseudonimleştirilmiş halde tutulur (booking ID ile bağlı, adla aranamaz). Tercih metninin silinmesini her zaman talep edebilirsiniz.",
          "VibeSquad katılım kayıtları: 10 yıl (booking kaydı); ancak ad/foto'nun havuz katılımcılarına görünürlüğü havuz bitince sona erer.",
          "Share trip token'ları: yalnızca ilgili tur aktifken saklanır; iptal edilen token'lar 7 gün içinde silinir. Link alıcıları kullanıcı olarak kaydedilmez.",
          "Bildirim token'ları: uygulamayı silene veya rızanızı geri alana kadar.",
          "Pazarlama rıza kayıtları: rıza geri alınana kadar + ispat amaçlı 3 yıl.",
        ],
      },
      {
        h: "7. Haklarınız",
        p: "KVKK m.11 ve GDPR uyarınca:",
        list: [
          "Bilgi edinme — hangi verilerin işlendiğini öğrenmek.",
          "Düzeltme — eksik/yanlış verilerin düzeltilmesini istemek.",
          "Silme — hesabınızın ve kişisel verilerinizin silinmesini talep etmek (bkz. /account-deletion).",
          "Kısıtlama — şikayet incelemesi sırasında işlemenin kısıtlanması.",
          "Taşınabilirlik — verilerinizi makine-okur formatta almak.",
          "İtiraz — meşru menfaate dayalı işlemeye, doğrudan pazarlama dahil itiraz.",
          "Rızayı geri çekme — daha önceki işlemelerin geçerliliğini etkilemeden.",
          `Şikâyet — Kişisel Verileri Koruma Kurulu'na (kvkk.gov.tr). Bu hakları kullanmak için kayıtlı adresinizden ${KVKK_EMAIL} adresine yazın — 30 gün içinde yanıt veririz.`,
        ],
      },
      {
        h: "8. Çerezler ve analitik",
        p: "Pazarlama sitemiz yalnızca zorunlu çerez kullanır (dil tercihi). Mobil uygulama üçüncü taraf reklam izleyicisi içermez. Ürün iyileştirmek için anonim analitik toplanabilir.",
      },
      {
        h: "9. Çocuklar",
        p: "VibeGuide 16 yaş altına yönelik değildir. Reşit olmayanlardan bilerek veri toplamayız. Bir çocuğun kayıtlı olduğundan şüpheleniyorsanız bize bildirin, hesabı sileriz.",
      },
      {
        h: "10. Güvenlik",
        p: "Tüm trafik şifreli iletilir (HTTPS/TLS 1.2+). Kimlik doğrulama Firebase ID token'ı; ödeme verisi iyzico tarafından tokenize edilir. Yine de güçlü bir parola kullanmanızı ve mümkün olduğunda iki adımlı doğrulamayı açmanızı öneririz.",
      },
      {
        h: "11. Politika değişiklikleri",
        p: "Esaslı değişiklik olduğunda yürürlük tarihinden en az 14 gün önce uygulama içinden ve e-posta ile bildiririz. O tarihten sonra hizmet kullanımı kabul anlamına gelir.",
      },
      {
        h: "12. İletişim",
        p: `Soru, şikayet ve gizlilik talepleri: ${SUPPORT_EMAIL} veya KVKK özelinde ${KVKK_EMAIL}.`,
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
      "These Terms govern your use of the VibeGuide mobile app and website. By creating an account, you accept these Terms. If you do not accept them, do not use the service.",
    sections: [
      {
        h: "1. Who we are",
        p: `${COMPANY_LEGAL} (\"VibeGuide\", \"we\") operates a marketplace that connects travellers (\"tourists\") with licensed Turkish tour guides who hold an official kokart issued by the Ministry of Culture and Tourism. We are not a tour operator and do not employ guides — guides are independent service providers.`,
      },
      {
        h: "2. Eligibility",
        list: [
          "You must be at least 16 years old to use the service.",
          "Tourists must verify their email address before booking.",
          "Guides must complete identity verification, including upload of a valid kokart, before going live.",
          "We may refuse, suspend, or terminate any account at our discretion if these Terms are violated.",
        ],
      },
      {
        h: "3. The marketplace, payments, commission",
        list: [
          "Tours are bookable in two modes: VibeNow (instant 1-on-1 matchmaking) and VibeSquad (scheduled group tour).",
          "All payments are processed in advance through our payment provider (iyzico).",
          "VibeGuide charges a 15% commission on each completed tour. The remaining 85% is the guide's earnings.",
          "Guide payouts are processed weekly to the IBAN registered in the guide's profile, after completion of the tour and the rating window.",
          "Prices shown are inclusive of VAT where applicable.",
        ],
      },
      {
        h: "4. Cancellations and refunds",
        list: [
          "Tourist cancellation more than 24 hours before tour start: 100% refund.",
          "Tourist cancellation less than 24 hours before tour start: 50% refund. Less than 2 hours: no refund.",
          "Guide cancellation: full refund + an apology credit. Repeat cancellations may lead to suspension.",
          "VibeSquad that fails to reach minimum group size before lock: 100% refund automatically.",
          "No-show by either party can be reported and is reviewed by our admin team within 72 hours.",
        ],
      },
      {
        h: "5. Tourist obligations",
        list: [
          "Show up at the agreed meeting point on time.",
          "Behave respectfully toward your guide and the local community. Harassment, racism, or discrimination is prohibited.",
          "Follow lawful instructions of the guide regarding safety in protected sites and public spaces.",
          "Pay any third-party fees (museum tickets, public transport) as agreed in the tour description.",
        ],
      },
      {
        h: "6. Guide obligations",
        list: [
          "Hold a valid kokart at the time of every accepted tour. Provide it on request.",
          "Be physically present at the agreed meeting point and conduct the full tour as described.",
          "Carry your own professional liability insurance to the extent required by Turkish law.",
          "Issue a fatura/e-arşiv invoice to VibeGuide on a monthly basis for commission settlement, and to the tourist where required.",
          "Comply with tax obligations as a self-employed (serbest meslek erbabı) or limited company.",
        ],
      },
      {
        h: "7. Ratings, reviews, and content",
        list: [
          "Reviews must be honest and based on a real tour. Fake or retaliatory reviews are removed.",
          "By posting content on VibeGuide (review text, photos), you grant us a worldwide, royalty-free licence to display, store, and translate that content for the purpose of operating the service.",
          "We may remove content that breaches these Terms or applicable law.",
        ],
      },
      {
        h: "8. Off-platform transactions",
        list: [
          "Tourists and guides must not bypass VibeGuide. You agree NOT to:",
          "— Request or accept payments outside the platform.",
          "— Move a VibeGuide booking off-platform once a match has been made.",
          "— Exchange phone numbers, social media or contact details for the purpose of avoiding VibeGuide.",
          "— Re-book the same guide directly to avoid VibeGuide commissions, cancellation rules or refund policies.",
          "Detected violations may result in suspension, removal of the booking, forfeiture of pending payouts, or permanent termination.",
        ],
      },
      {
        h: "9. Community standards",
        p: "VibeGuide is a place to meet humans, not a place to hurt them. We have zero tolerance for: harassment, hate speech, racism, sexism, religious or LGBTQ+ discrimination, threats, violence, sexual misconduct, fraud, unsafe driving or guiding, exploitation of local communities, defacement of cultural/historical sites. Reports are investigated and may result in immediate suspension, regardless of party.",
      },
      {
        h: "10. Independent service providers",
        p: "Guides operate as independent service providers. Nothing in these Terms creates an employment, agency, partnership, franchise or joint-venture relationship between VibeGuide and any guide. Guides are responsible for their own taxes, professional permits (kokart, sigorta), invoicing and legal compliance.",
      },
      {
        h: "11. Payment authorization (VibeSquad)",
        p: "For VibeSquad group bookings, a temporary payment authorization may be placed on your card at the time you join the squad. If the squad confirms (minimum size reached, guide assigned), the authorization is captured. If the squad does not confirm, the authorization is released — release time depends on your bank and may take up to 7 business days.",
      },
      {
        h: "12. Disputes between users and guides",
        p: "VibeGuide may assist in resolving disputes but is not automatically responsible for the acts, omissions, delays or failures of independent guides or tourists. When evaluating a dispute we may review: booking timeline, in-app messages, payment status, location pings during the tour, no-show reports, and any evidence either party submits. Decisions are final once the admin review is communicated.",
      },
      {
        h: "13. Platform availability",
        p: "We aim for reliable service but do not guarantee uninterrupted access. The platform may be unavailable due to maintenance, updates, technical issues, payment-provider failures, security incidents or events outside our control.",
      },
      {
        h: "14. Force majeure",
        list: [
          "VibeGuide is not liable for delays, cancellations or failures caused by events outside reasonable control, including:",
          "Severe weather and natural disasters (earthquake, flood, storm)",
          "Political unrest, strikes, transportation disruption",
          "Pandemics and public-health restrictions",
          "Government action, site closures by authorities",
          "Safety threats, terrorism warnings",
          "Internet outages, payment-provider failures",
        ],
      },
      {
        h: "15. Liability",
        list: [
          "VibeGuide is a marketplace. We are not a party to the tour contract between tourist and guide and are not liable for the content or quality of the tour itself.",
          "Our maximum aggregate liability is limited to the amount you paid for the affected booking in the 12 months preceding the claim.",
          "We are not liable for indirect or consequential damages: lost profits, missed flights, lost connections, lost belongings, personal decisions made by users.",
          "Nothing in these Terms limits liability for gross negligence, wilful misconduct, or where Turkish consumer law forbids exclusion.",
        ],
      },
      {
        h: "16. Intellectual property",
        p: "The VibeGuide name, logo, app design, and source code are owned by us. You may not copy, decompile, or build a competing service from our materials without written permission.",
      },
      {
        h: "17. Account suspension and termination",
        list: [
          "We may suspend or terminate your account with notice for material breach of these Terms.",
          "We may suspend immediately and without prior notice for: fraud, harassment, identity falsification, off-platform transactions, or risk to other users.",
          "You may terminate your account at any time via the in-app delete button or by submitting the form at /account-deletion.",
          "Some data may be retained after account deletion where required for legal, tax, accounting, fraud-prevention, safety, or dispute-resolution purposes — see the Privacy Policy.",
        ],
      },
      {
        h: "18. Governing law and jurisdiction",
        p: "These Terms are governed by Turkish law. Disputes will be resolved in the courts and enforcement offices of Istanbul (Çağlayan), without prejudice to mandatory consumer protection rights you may have in your country of residence.",
      },
      {
        h: "19. Changes",
        p: "We may update these Terms. Material changes will be notified at least 14 days in advance. Continued use after the effective date constitutes acceptance.",
      },
      {
        h: "20. Contact",
        p: `Questions about these Terms: ${SUPPORT_EMAIL}.`,
      },
    ],
  },
  tr: {
    pageTitle: "Kullanım Koşulları",
    lastUpdatedLabel: "Son güncelleme",
    intro:
      "Bu Koşullar, VibeGuide mobil uygulaması ve web sitesinin kullanımını düzenler. Hesap oluşturarak bu Koşulları kabul etmiş sayılırsınız. Kabul etmiyorsanız hizmeti kullanmayın.",
    sections: [
      {
        h: "1. Biz kimiz",
        p: `${COMPANY_LEGAL} (\"VibeGuide\"), Kültür ve Turizm Bakanlığı tarafından düzenlenmiş kokarta sahip Türk turist rehberlerini gezginlerle (\"turist\") buluşturan bir pazar yeri işletir. Bir tur operatörü değiliz; rehberler bağımsız hizmet sağlayıcılarıdır, çalışanımız değildir.`,
      },
      {
        h: "2. Kullanım koşulları",
        list: [
          "Hizmeti kullanabilmek için en az 16 yaşında olmalısınız.",
          "Turistler rezervasyon yapmadan önce e-posta adreslerini doğrulamalıdır.",
          "Rehberler aktif olmadan önce kimlik doğrulamasını ve kokart yüklemesini tamamlamalıdır.",
          "Bu Koşulların ihlali halinde hesabı reddedebilir, askıya alabilir veya kapatabiliriz.",
        ],
      },
      {
        h: "3. Pazar yeri, ödemeler ve komisyon",
        list: [
          "Turlar iki şekilde rezerve edilir: VibeNow (anında 1-1 eşleşme) ve VibeSquad (planlı grup turu).",
          "Tüm ödemeler ödeme sağlayıcımız iyzico üzerinden peşin alınır.",
          "VibeGuide tamamlanan her turdan %15 komisyon alır. Kalan %85 rehberin kazancıdır.",
          "Rehber ödemeleri, tur tamamlanması ve değerlendirme penceresi sonrasında haftalık olarak rehber profilinde kayıtlı IBAN'a aktarılır.",
          "Gösterilen fiyatlar uygulanabilir KDV dahildir.",
        ],
      },
      {
        h: "4. İptal ve iade",
        list: [
          "Tur başlangıcına 24 saatten fazla varken turist iptali: %100 iade.",
          "24 saatten az: %50 iade. 2 saatten az: iade yok.",
          "Rehber iptali: tam iade + özür kredisi. Tekrarlanan iptaller askıya alma sebebidir.",
          "Minimum grup büyüklüğüne ulaşamayan VibeSquad otomatik %100 iade alır.",
          "Karşı tarafın gelmemesi (no-show) bildirilebilir ve admin ekibi 72 saat içinde inceler.",
        ],
      },
      {
        h: "5. Turistin yükümlülükleri",
        list: [
          "Anlaşılan buluşma noktasında zamanında bulunmak.",
          "Rehberinize ve yerel halka saygılı davranmak. Taciz, ırkçılık ve ayrımcılık yasaktır.",
          "Korunan alanlarda ve toplu mekânlarda rehberin yasalara uygun talimatlarına uymak.",
          "Tur açıklamasında belirtilen üçüncü taraf ücretlerini (müze, ulaşım) ödemek.",
        ],
      },
      {
        h: "6. Rehberin yükümlülükleri",
        list: [
          "Kabul edilen her turda geçerli kokarta sahip olmak; talep halinde göstermek.",
          "Anlaşılan buluşma noktasında fiziken hazır bulunmak ve turu açıklandığı şekilde tamamlamak.",
          "Türk mevzuatı kapsamında gerekli olduğu ölçüde mesleki sorumluluk sigortasına sahip olmak.",
          "Komisyon mahsubu için VibeGuide'a aylık fatura/e-arşiv kesmek; gerektiğinde turiste de fatura kesmek.",
          "Serbest meslek erbabı ya da limited şirket olarak vergi yükümlülüklerini yerine getirmek.",
        ],
      },
      {
        h: "7. Değerlendirme, yorum ve içerik",
        list: [
          "Yorumlar gerçek bir tura dayanmalı ve dürüst olmalıdır. Sahte veya intikam amaçlı yorumlar kaldırılır.",
          "VibeGuide'a içerik (yorum, fotoğraf) gönderdiğinizde, hizmeti yürütme amacıyla bu içeriği kullanma, depolama ve çevirme konusunda dünya çapında ücretsiz lisans vermiş olursunuz.",
          "Bu Koşulları veya yürürlükteki mevzuatı ihlal eden içeriği kaldırabiliriz.",
        ],
      },
      {
        h: "8. Platform dışı işlemler",
        list: [
          "Turist ve rehber VibeGuide'ı atlatamaz. Aşağıdakileri yapmamayı kabul edersiniz:",
          "— Platform dışında ödeme talep etmek veya almak.",
          "— Eşleşme sağlandıktan sonra rezervasyonu platform dışına taşımak.",
          "— Platform komisyonundan veya iptal politikalarından kaçınmak amacıyla telefon, sosyal medya veya iletişim bilgisi alışverişi yapmak.",
          "— Komisyondan kaçınmak için aynı rehberi doğrudan tekrar rezerve etmek.",
          "Tespit edilen ihlal askıya alma, rezervasyon iptali, bekleyen ödemenin geçersiz kılınması veya hesabın kalıcı kapatılmasına yol açabilir.",
        ],
      },
      {
        h: "9. Topluluk standartları",
        p: "VibeGuide insanların buluştuğu bir platformdur, zarar gördüğü bir yer değil. Şunlara sıfır toleransımız var: taciz, nefret söylemi, ırkçılık, cinsiyetçilik, dini veya LGBTQ+ ayrımcılığı, tehdit, şiddet, cinsel taciz, dolandırıcılık, tehlikeli sürüş veya rehberlik, yerel halkın sömürülmesi, kültürel/tarihi alanların tahrip edilmesi. Şikayetler incelenir ve taraf gözetmeksizin derhal askıya alma uygulanabilir.",
      },
      {
        h: "10. Bağımsız hizmet sağlayıcı statüsü",
        p: "Rehberler bağımsız hizmet sağlayıcı olarak çalışır. Bu Koşullardaki hiçbir hüküm VibeGuide ile rehber arasında işçi-işveren, acentelik, ortaklık, franchise veya joint-venture ilişkisi doğurmaz. Rehberler kendi vergi, kokart, sigorta, faturalama ve hukuki uyum yükümlülüklerinden sorumludur.",
      },
      {
        h: "11. Ödeme ön-otorizasyonu (VibeSquad)",
        p: "VibeSquad grup rezervasyonlarında, gruba katıldığınız anda kartınıza geçici bir ödeme ön-otorizasyonu uygulanabilir. Grup onaylanırsa (minimum sayıya ulaşılır, rehber atanır) tutar tahsil edilir. Grup onaylanmazsa otorizasyon serbest bırakılır — bırakma süresi bankanıza bağlı olup 7 iş gününe kadar sürebilir.",
      },
      {
        h: "12. Turist-rehber uyuşmazlıkları",
        p: "VibeGuide uyuşmazlık çözümünde yardımcı olabilir; ancak bağımsız rehberlerin veya turistlerin eylem, ihmal, gecikme veya başarısızlıklarından otomatik olarak sorumlu tutulmaz. Uyuşmazlık değerlendirmesinde şunları inceleyebiliriz: rezervasyon zaman çizgisi, uygulama içi mesajlar, ödeme durumu, tur sırasındaki konum verileri, no-show bildirimleri ve tarafların sunduğu deliller. Admin incelemesi sonucu bildirildiğinde karar kesindir.",
      },
      {
        h: "13. Platform erişilebilirliği",
        p: "Güvenilir hizmet sunmayı hedefleriz; ancak kesintisiz erişim garanti edilmez. Bakım, güncelleme, teknik sorun, ödeme sağlayıcısı arızası, güvenlik olayı veya kontrolümüz dışındaki olaylar nedeniyle platform erişilemez olabilir.",
      },
      {
        h: "14. Mücbir sebep",
        list: [
          "VibeGuide aşağıdaki gibi makul kontrol dışı olaylardan kaynaklanan gecikme, iptal veya başarısızlıktan sorumlu değildir:",
          "Ağır hava koşulları ve doğal afetler (deprem, sel, fırtına)",
          "Siyasi kargaşa, grev, ulaşım kesintisi",
          "Salgın hastalıklar ve halk sağlığı kısıtlamaları",
          "Kamu otoritesi kararları, alanların yetkililerce kapatılması",
          "Güvenlik tehditleri, terör uyarıları",
          "İnternet kesintisi, ödeme sağlayıcısı arızası",
        ],
      },
      {
        h: "15. Sorumluluk",
        list: [
          "VibeGuide bir pazar yeridir. Turist ile rehber arasındaki tur sözleşmesinin tarafı değildir; turun içeriği ve kalitesinden sorumlu tutulamaz.",
          "Toplam azami sorumluluğumuz, talep tarihinden geriye doğru 12 ay içinde ilgili rezervasyon için ödediğiniz tutarla sınırlıdır.",
          "Dolaylı veya doğrudan olmayan zararlardan (kâr kaybı, kaçırılan uçuş, kaçırılan aktarma, kayıp eşya, kişisel kararlar) sorumlu değiliz.",
          "Hiçbir madde; ağır ihmal, kasıtlı kötü niyet veya 6502 sayılı Tüketici Kanunu'nun emredici hükümleri kapsamındaki sorumluluğu sınırlamaz.",
        ],
      },
      {
        h: "16. Fikri mülkiyet",
        p: "VibeGuide ismi, logo, uygulama tasarımı ve kaynak kodu bize aittir. Yazılı izin olmaksızın kopyalanamaz, ters mühendislikle çözülemez veya rakip bir hizmet için kullanılamaz.",
      },
      {
        h: "17. Hesap askıya alma ve sonlandırma",
        list: [
          "Bu Koşulların esaslı ihlali halinde, bildirim ile hesabınızı askıya alabilir veya kapatabiliriz.",
          "Dolandırıcılık, taciz, kimlik sahteciliği, platform dışı işlem veya başka kullanıcılara risk hallerinde derhal ve önceden bildirim olmaksızın askıya alabiliriz.",
          "Hesabınızı uygulama içindeki silme butonu veya /account-deletion sayfasındaki form ile dilediğiniz an kapatabilirsiniz.",
          "Hesap silindikten sonra; yasal, vergi, muhasebe, dolandırıcılık önleme, güvenlik veya uyuşmazlık çözümü amaçlarıyla bazı veriler saklanabilir — Gizlilik Politikasına bakınız.",
        ],
      },
      {
        h: "18. Uygulanacak hukuk ve yetkili mahkeme",
        p: "Bu Koşullar Türk hukukuna tabidir. Uyuşmazlıklar, ikamet ettiğiniz ülkedeki tüketici koruma hakları saklı kalmak kaydıyla, İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri'nde çözülecektir.",
      },
      {
        h: "19. Değişiklikler",
        p: "Bu Koşulları güncelleyebiliriz. Esaslı değişiklikler en az 14 gün önceden bildirilir. Yürürlük tarihinden sonra kullanım kabul anlamına gelir.",
      },
      {
        h: "20. İletişim",
        p: `Bu Koşullar hakkında sorular: ${SUPPORT_EMAIL}.`,
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
