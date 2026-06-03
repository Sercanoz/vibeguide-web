import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  title: "Çerez Politikası | VibeGuide",
  description: "VibeGuide web sitesinde kullanılan çerezler ve çerez tercihleri hakkında bilgilendirme.",
};

const BODY = `
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

export default function CookiePolicyPage() {
  return (
    <LegalMarkdown
      title="Çerez Politikası"
      subtitle="Son Güncelleme: Ocak 2026"
      body={BODY}
    />
  );
}
