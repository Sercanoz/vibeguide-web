import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Güvenlik ve Ödemeler | VibeGuide",
  description: "VibeGuide; SSL korumalı platform, kayıtlı Türk şirketi, lisanslı turizm operasyonları, güvenli ödeme altyapısı ve şeffaf fiyatlandırma sunar.",
};

const BODY = `
**Güvenli rezervasyon. Şeffaf fiyatlandırma. Güvenilir turizm operasyonları.**

VibeGuide, Türkiye'de kayıtlı bir turizm şirketi tarafından işletilmektedir ve gezginleri doğrulanmış yerel rehberler ile buluşturan güvenli bir rezervasyon platformu sunmaktadır.

Rehber doğrulama süreçleri, rezervasyon yönetimi, ödeme işlemleri, iptal ve iade süreçleri, müşteri desteği ve uyuşmazlık çözümü VibeGuide tarafından koordine edilmektedir.

## 🔒 SSL Korumalı Platform

Cihazınız ile platformumuz arasında aktarılan tüm bilgiler, sektör standardı SSL/TLS şifreleme teknolojileri ile korunmaktadır.

Bu sayede kişisel bilgileriniz ve ödeme işlemleriniz güvenli bağlantılar üzerinden gerçekleştirilir.

## 🏢 Kayıtlı Türk Şirketi

VibeGuide aşağıdaki şirket tarafından işletilmektedir:

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

Türkiye'de yasal olarak kurulmuş ve faaliyet gösteren kayıtlı bir şirkettir.

**Vergi Dairesi:** Marmaris Vergi Dairesi

**Vergi Numarası:** 9251328389

**Ticaret Sicil Numarası:** 12686

## 🪪 Lisanslı Turizm Operasyonları

VibeGuide, lisanslı turist rehberleri ve doğrulanmış hizmet sağlayıcılarla çalışmaktadır.

Rehberlerin platform üzerinden rezervasyon kabul edebilmesi için gerekli doğrulama ve kontrol süreçleri tamamlanmaktadır.

Turizm faaliyetleri, yürürlükteki Türkiye Cumhuriyeti turizm mevzuatına uygun şekilde yürütülmektedir.

## 💳 Güvenli Ödeme Altyapısı

Ödemeler, lisanslı ödeme kuruluşları ve sertifikalı ödeme hizmet sağlayıcıları aracılığıyla gerçekleştirilmektedir.

VibeGuide aşağıdaki bilgileri sunucularında saklamaz:

* Kart numarasının tamamı
* CVV / güvenlik kodu
* Hassas kart güvenlik bilgileri

Ödeme işlemleri güvenli ve sektör standartlarına uygun ödeme altyapıları üzerinden gerçekleştirilir.

## 📋 Şeffaf Fiyatlandırma

Her deneyimin toplam fiyatı rezervasyon tamamlanmadan önce kullanıcıya gösterilir.

Ödeme sonrasında gizli ücret veya sürpriz ek masraf uygulanmaz.

Fiyata dahil olmayan hizmetler rezervasyon öncesinde açıkça belirtilir.

## ✅ Açık ve Net Hizmet Kapsamı

Rezervasyon tamamlanmadan önce kullanıcılar aşağıdaki bilgileri görüntüleyebilir:

* Fiyata dahil olan hizmetler
* Fiyata dahil olmayan hizmetler
* Buluşma noktası
* Deneyim süresi
* Rehber dili
* Katılım koşulları
* İptal ve iade şartları

Bu sayede rezervasyon öncesinde tüm detaylar şeffaf şekilde sunulur.

## ↩️ İptal ve İade Güvencesi

Tüm rezervasyonlar yayınlanmış iptal ve iade koşullarına tabidir.

Geçerli iptal süreleri ve iade şartları ödeme öncesinde kullanıcıya gösterilir ve [İptal ve İade Politikamızda](/cancellation-policy) detaylı olarak açıklanır.

Duruma bağlı olarak kullanıcılara aşağıdaki seçeneklerden biri sunulabilir:

* Tam iade
* Alternatif tarih
* Alternatif rehber
* Eşdeğer deneyim

## 🎧 Müşteri Desteği

Destek ekibimiz rezervasyonlar, ödemeler, iptaller, hesap işlemleri ve operasyonel konularda yardımcı olmak için hizmet vermektedir.

**Pazartesi – Cuma · 09:00 – 18:00 (UTC+3)**

📧 [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

📞 +90 530 828 76 96

## Şirket Bilgileri

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4, Marmaris / Muğla / Türkiye

**Vergi Dairesi:** Marmaris Vergi Dairesi

**Vergi Numarası:** 9251328389

**Ticaret Sicil Numarası:** 12686

📧 [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

📞 +90 530 828 76 96

---

VibeGuide üzerinden rezervasyon yapan kullanıcılar; güvenli ödeme altyapısı, şeffaf fiyatlandırma, doğrulanmış turizm operasyonları, yayınlanmış iptal politikaları ve özel müşteri desteği güvencesinden yararlanır.
`;

export default function SecurityPage() {
  return (
    <LegalMarkdown
      title="Güvenlik ve Ödemeler"
      body={BODY}
    />
  );
}
