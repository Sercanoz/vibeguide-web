import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/guide-verification" },
  title: "Rehber Doğrulama | VibeGuide",
  description: "VibeGuide'da her rehber, platforma katılmadan önce kimlik doğrulaması, mesleki doğrulama ve platform kalite standartlarından geçer.",
};

const BODY = `
## Platforma katılmadan önce her rehber değerlendirilir

VibeGuide, doğrulanmamış rehberlerin platform üzerinden hizmet sunmasına izin vermez.

Lisanslı profesyonel turist rehberleri tarafından kurulan VibeGuide, hizmet kalitesini, gezgin güvenini ve operasyonel güvenilirliği korumak amacıyla yapılandırılmış bir doğrulama süreci uygular.

Her rehber, platform üzerinden rezervasyon kabul etmeye başlamadan önce ilgili doğrulama ve inceleme süreçlerini tamamlamak zorundadır.

## 🪪 Kimlik Doğrulaması

Platforma kabul edilmeden önce rehberin kimliği doğrulanır.

Gerekli durumlarda ek doğrulama belgeleri talep edilebilir ve güvenlik kontrolleri gerçekleştirilebilir.

Bu süreç, platform güvenliğini korumaya ve sahte hesapların önlenmesine yardımcı olur.

## 🎓 Mesleki Doğrulama

Rehberler; mesleki geçmişleri, destinasyon bilgileri, rehberlik deneyimleri ve ilgili turizm mevzuatına uygunlukları açısından incelenebilir.

Yasal olarak gerekli olduğu durumlarda;

* Profesyonel turist rehberi kokartı
* Resmi rehberlik yetkileri
* Mesleki lisanslar
* İlgili belgeler ve sertifikalar

doğrulanabilir.

## 🗣️ Dil Yetkilendirmesi

VibeGuide'da hizmet veren profesyonel turist rehberleri, yalnızca resmi turist rehberi kokartlarında yer alan dillerde rehberlik hizmeti sunabilir.

Bu dil yetkilendirmeleri, Türkiye Cumhuriyeti mevzuatı kapsamında gerçekleştirilen resmi yeterlilik süreçleri ve ilgili kurumlar tarafından yapılan değerlendirmeler sonucunda belirlenmektedir.

VibeGuide, rehberlerin resmi turist rehberi belgelerinde ve kokartlarında yer alan dil yetkilerini doğrulayabilir.

Bu uygulama, gezginlerin rezervasyon sırasında seçtikleri dilde hizmet alabilmelerine yardımcı olur.

## 🗺️ Rota ve Deneyim Uygunluğu

Rehberler, uzmanlık alanları, destinasyon bilgileri, dil yetkileri ve operasyonel uygunlukları doğrultusunda deneyimlerle eşleştirilebilir.

Bu sayede gezginlerin, ziyaret ettikleri bölgeyi iyi tanıyan rehberlerle buluşması amaçlanır.

## 📋 Platform Standartları

Her rehber aşağıdaki politika ve kuralları inceleyerek kabul etmek zorundadır:

* Hizmet kalite standartları
* Gezginlere yönelik davranış kuralları
* İptal ve rezervasyon kuralları
* İletişim standartları
* Platform kullanım kuralları
* Operasyonel prosedürler

Bu standartlara uyulmaması durumunda hesaplara kısıtlama uygulanabilir, hesaplar askıya alınabilir veya platform erişimi sonlandırılabilir.

## 🛡️ Güvenlik ve Güven Standartları

Gezgin güvenliği ve profesyonel davranış, platformun temel öncelikleri arasındadır.

Rehberlerden;

* Yürürlükteki mevzuata uygun davranmaları,
* Platform kurallarına uymaları,
* Profesyonel hizmet standartlarını korumaları,
* Gezginlere saygılı ve güvenli bir deneyim sunmaları

beklenmektedir.

## Sürekli Değerlendirme

Doğrulama süreci yalnızca platforma katılım aşamasında sona ermez.

Rehber hesapları aşağıdaki kriterler doğrultusunda düzenli olarak gözden geçirilebilir:

* Tamamlama oranları
* Zamanında katılım performansı
* Kullanıcı geri bildirimleri
* Operasyonel güvenilirlik göstergeleri
* Politika uyumluluğu

Platform standartlarını karşılamayan rehberlerin hesapları kısıtlanabilir, askıya alınabilir veya platformdan kaldırılabilir.

## Güven, Daha Rehberinizle Tanışmadan Başlar

Rehber doğrulama sürecimiz, gezginlerin daha rezervasyon yapmadan önce güven duymalarına yardımcı olmak amacıyla tasarlanmıştır.

Kimlik doğrulaması, mesleki doğrulama, resmi dil yetkilendirmeleri, operasyonel denetimler ve sürekli kalite kontrollerini bir araya getirerek VibeGuide, gezginlerin daha güvenli, daha şeffaf ve daha kaliteli deneyimler rezervasyon yapabilmesine yardımcı olur.

---

İlgili Belgeler: [Yardım Merkezi](/help) · [Güvenlik ve Ödemeler](/security) · [Kullanım Koşulları](/terms) · [Gizlilik Politikası](/privacy)
`;

export default function GuideVerificationPage() {
  return (
    <LegalMarkdown
      title="Rehber Doğrulama"
      body={BODY}
    />
  );
}
