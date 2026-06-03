import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  title: "Nasıl Çalışır? | VibeGuide",
  description: "VibeGuide rezervasyon süreci adım adım — deneyim seçiminden doğrulanmış rehberinizle buluşmaya kadar.",
};

const BODY = `
## Rezervasyon süreci, adım adım

VibeGuide; doğrulanmış rehberler, önceden tanımlanmış deneyimler, güvenli ödeme altyapısı ve desteklenen operasyon süreçleri ile çalışan dijital bir turizm rezervasyon platformudur.

## 1. Deneyiminizi Seçin

Şehir turları, kültürel yürüyüşler, müze deneyimleri, gastronomi rotaları ve özel turlar arasından size uygun deneyimi seçin.

Her deneyim için aşağıdaki bilgiler rezervasyon öncesinde açıkça sunulur:

* Deneyim kapsamı
* Süre
* Rehber dili
* Buluşma noktası
* Katılım koşulları
* Fiyatlandırma bilgileri

## 2. Rezervasyonunuzu Oluşturun

Tarih, saat, dil ve katılımcı sayısını seçerek rezervasyonunuzu oluşturun.

Ödeme işlemleri güvenli ve lisanslı ödeme kuruluşları aracılığıyla gerçekleştirilir.

Rezervasyonunuz tamamlandıktan sonra onay bilgileri size iletilir.

## 3. Rehber Eşleşmesi ve Doğrulama

Platformda görev alan tüm rehberler VibeGuide doğrulama süreçlerinden geçmektedir.

Doğrulama süreci gerektiğinde aşağıdaki unsurları içerebilir:

* Kimlik doğrulaması
* Mesleki doğrulama
* Profesyonel turist rehberi kokartı kontrolü
* Dil yetkilendirmelerinin doğrulanması
* Platform standartlarının kabulü

Rehberler yalnızca uzmanlık alanlarına ve uygun oldukları deneyimlere atanır veya eşleştirilir.

## 4. Buluşma Bilgilerini Alın

Rezervasyon onaylandıktan sonra aşağıdaki bilgiler sizinle paylaşılır:

* Buluşma noktası
* Başlangıç saati
* Deneyim detayları
* Rehber bilgileri (uygulanabildiği durumlarda)

Böylece deneyim başlamadan önce gerekli tüm bilgilere sahip olursunuz.

## 5. Şehri Yerel Bir Uzmanla Keşfedin

Rehberinizle buluşun ve deneyiminize başlayın.

VibeGuide deneyimleri, destinasyonu yakından tanıyan yerel uzmanlar ve profesyonel turist rehberleri tarafından sunulan gerçek yerel bilgiye dayanır.

Amaç; standart turistik anlatımların ötesine geçerek daha anlamlı, daha kişisel ve daha otantik deneyimler sunmaktır.

## 6. Destek ve Çözüm Süreci

Bir gecikme, iptal veya operasyonel sorun yaşanması halinde VibeGuide destek süreci devreye girer.

Duruma bağlı olarak aşağıdaki seçeneklerden biri sunulabilir:

* Alternatif rehber
* Alternatif tarih
* Alternatif deneyim
* İade süreci

Tüm rezervasyonlar yayınlanmış [İptal ve İade Politikası](/cancellation-policy) hükümlerine tabidir.

## 🔒 Güvenli ve Desteklenen Bir Deneyim

VibeGuide üzerinden yapılan rezervasyonlar;

* Güvenli ödeme altyapıları
* Doğrulanmış rehberler
* Şeffaf fiyatlandırma
* Yayınlanmış politikalar
* Müşteri desteği
* Uyuşmazlık çözüm süreçleri

ile desteklenmektedir.

Ödeme işlemleri lisanslı ödeme kuruluşları aracılığıyla gerçekleştirilir.

Rehber doğrulama süreçleri, rezervasyon yönetimi, müşteri desteği ve operasyonel koordinasyon VibeGuide tarafından yürütülmektedir.

---

İlgili Belgeler: [Rehber Doğrulama](/guide-verification) · [Güvenlik ve Ödemeler](/security) · [Yardım Merkezi](/help) · [İptal ve İade Politikası](/cancellation-policy)
`;

export default function HowItWorksPage() {
  return (
    <LegalMarkdown
      title="Nasıl Çalışır?"
      body={BODY}
    />
  );
}
