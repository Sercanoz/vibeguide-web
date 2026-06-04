"use client";

import LegalMarkdown from "@/components/LegalMarkdown";
import { useT } from "@/components/LanguageProvider";

const SUBTITLE_TR = "Son Güncelleme: 04.06.2026";
const SUBTITLE_EN = "Last updated: 04.06.2026";

const BODY_TR = `
Bu Çerez Politikası, VibeGuide web sitesi ve ilgili dijital hizmetlerde kullanılan çerezler hakkında bilgi vermek amacıyla hazırlanmıştır.

## 1. Çerez Nedir?

Çerezler (cookies), bir web sitesini ziyaret ettiğinizde cihazınıza veya tarayıcınıza kaydedilen küçük metin dosyalarıdır. Çerezler sayesinde web sitesi daha verimli çalışabilir, kullanıcı tercihleri hatırlanabilir ve hizmetler geliştirilebilir.

## 2. Kullandığımız Çerez Türleri

### A. Zorunlu Çerezler (Her Zaman Aktif)

Bu çerezler web sitesinin güvenli ve düzgün şekilde çalışabilmesi için gereklidir.

Örnek kullanım alanları:

* Dil tercihlerinin saklanması (vg_locale)
* Çerez tercihinin hatırlanması (vg_cookie_consent)
* Oturum ve güvenlik işlemleri
* Form ve sistem işlevlerinin çalıştırılması

Bu çerezler devre dışı bırakılamaz.

### B. Analitik Çerezler (İsteğe Bağlı)

Bu çerezler ziyaretçilerin web sitesini nasıl kullandığını anlamamıza yardımcı olur.

Örnek olarak:

* Hangi sayfaların ziyaret edildiği
* Ziyaret süresi
* Kullanıcıların hangi ülkelerden erişim sağladığı
* Site performansının ölçülmesi

Analitik çerezler yalnızca açık kullanıcı onayı alınması halinde etkinleştirilir.

## 3. Çerez Tercihleriniz

Web sitemizi ilk ziyaret ettiğinizde görüntülenen çerez bildirimi üzerinden analitik çerezleri kabul edebilir veya reddedebilirsiniz.

Onay vermemeniz durumunda yalnızca zorunlu çerezler kullanılacaktır.

Tercihlerinizi daha sonra tarayıcı ayarlarınızdan veya web sitemizde sunulan çerez yönetim araçlarından değiştirebilirsiniz.

## 4. Üçüncü Taraf Hizmetler

Web sitemizde aşağıdaki üçüncü taraf hizmet sağlayıcıları kullanılabilir:

* Google Analytics (analitik ölçümleme)
* Google Tag Manager (etiket yönetimi)
* Lisanslı ödeme kuruluşları (ödeme işlemlerinin gerçekleştirilmesi sırasında)

Bu hizmet sağlayıcılar kendi çerezlerini kullanabilir ve kendi gizlilik politikalarına tabi olabilirler.

Google'ın veri işleme uygulamaları hakkında daha fazla bilgi için Google Gizlilik Politikası incelenebilir.

## 5. Çerezlerin Saklanma Süresi

Kullandığımız çerezler kullanım amaçlarına göre farklı sürelerle saklanabilir.

* **Oturum çerezleri:** Tarayıcı kapatıldığında silinir.
* **Kalıcı çerezler:** Belirlenen süre boyunca cihazınızda saklanır veya siz tarafından silinene kadar kalabilir.

## 6. Kişisel Verilerin Korunması

Çerezler aracılığıyla elde edilen veriler, yürürlükteki KVKK (6698 Sayılı Kişisel Verilerin Korunması Kanunu) ve ilgili mevzuata uygun şekilde işlenir.

Detaylı bilgi için Gizlilik Politikamızı ve KVKK Aydınlatma Metnimizi inceleyebilirsiniz.

## 7. İletişim

Çerez Politikamız hakkında sorularınız için:

E-posta: [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

---

İlgili Belgeler: [Gizlilik Politikası](/privacy) · [KVKK Aydınlatma Metni](/kvkk) · [Kullanım Şartları](/terms)
`;

const BODY_EN = `
This Cookie Policy has been prepared to provide information about the cookies used on the VibeGuide website and related digital services.

## 1. What Is a Cookie?

Cookies are small text files saved to your device or browser when you visit a website. Cookies help the website work more efficiently, remember user preferences, and improve services.

## 2. Types of Cookies We Use

### A. Essential Cookies (Always Active)

These cookies are necessary for the website to work securely and properly.

Example uses:

* Storing language preferences (vg_locale)
* Remembering the cookie preference (vg_cookie_consent)
* Session and security operations
* Running form and system functions

These cookies cannot be disabled.

### B. Analytics Cookies (Optional)

These cookies help us understand how visitors use the website.

For example:

* Which pages are visited
* Visit duration
* Which countries users access from
* Measuring site performance

Analytics cookies are enabled only if explicit user consent is given.

## 3. Your Cookie Preferences

You can accept or decline analytics cookies via the cookie notice displayed when you first visit our website.

If you do not give consent, only essential cookies will be used.

You can change your preferences later through your browser settings or the cookie-management tools offered on our website.

## 4. Third-Party Services

The following third-party service providers may be used on our website:

* Google Analytics (analytics measurement)
* Google Tag Manager (tag management)
* Licensed payment institutions (during the processing of payment transactions)

These service providers may use their own cookies and may be subject to their own privacy policies.

For more information about Google's data-processing practices, you can review the Google Privacy Policy.

## 5. Cookie Retention Period

The cookies we use may be stored for different periods depending on their purpose.

* **Session cookies:** Deleted when the browser is closed.
* **Persistent cookies:** Stored on your device for a set period or until you delete them.

## 6. Protection of Personal Data

Data obtained through cookies is processed in accordance with the applicable KVKK (Law No. 6698 on the Protection of Personal Data) and the relevant legislation.

For details, please review our Privacy Policy and Data Protection Notice (KVKK).

## 7. Contact

For questions about our Cookie Policy:

Email: [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

---

Related Documents: [Privacy Policy](/privacy) · [Data Protection Notice (KVKK)](/kvkk) · [Terms of Service](/terms)
`;

export default function CerezView() {
  const { locale } = useT();
  const tr = locale === "tr";
  return (
    <LegalMarkdown
      title={tr ? "Çerez Politikası" : "Cookie Policy"}
      subtitle={tr ? SUBTITLE_TR : SUBTITLE_EN}
      body={tr ? BODY_TR : BODY_EN}
    />
  );
}
