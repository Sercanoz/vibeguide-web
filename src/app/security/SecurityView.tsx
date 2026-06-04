"use client";

import LegalMarkdown from "@/components/LegalMarkdown";
import { useT } from "@/components/LanguageProvider";

const BODY_TR = `
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

const BODY_EN = `
**Secure booking. Transparent pricing. Reliable tourism operations.**

VibeGuide is operated by a registered tourism company in Türkiye and offers a secure booking platform that connects travellers with verified local guides.

Guide-verification processes, booking management, payment processes, cancellation and refund processes, customer support, and dispute resolution are coordinated by VibeGuide.

## 🔒 SSL-Protected Platform

All information transmitted between your device and our platform is protected with industry-standard SSL/TLS encryption technologies.

This means your personal information and payment transactions are carried out over secure connections.

## 🏢 Registered Turkish Company

VibeGuide is operated by the following company:

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

It is a registered company legally established and operating in Türkiye.

**Tax Office:** Marmaris Tax Office

**Tax Number:** 9251328389

**Trade Registry Number:** 12686

## 🪪 Licensed Tourism Operations

VibeGuide works with licensed tourist guides and verified service providers.

The necessary verification and control processes are completed for guides to be able to accept bookings through the platform.

Tourism activities are carried out in accordance with the applicable tourism legislation of the Republic of Türkiye.

## 💳 Secure Payment Infrastructure

Payments are processed through licensed payment institutions and certified payment service providers.

VibeGuide does not store the following information on its servers:

* The full card number
* CVV / security code
* Sensitive card security details

Payment transactions are carried out over secure payment infrastructures that comply with industry standards.

## 📋 Transparent Pricing

The total price of each experience is shown to the user before the booking is completed.

No hidden fees or surprise additional costs are applied after payment.

Services not included in the price are clearly stated before booking.

## ✅ Clear Service Scope

Before completing the booking, users can view the following information:

* Services included in the price
* Services not included in the price
* Meeting point
* Experience duration
* Guide language
* Participation conditions
* Cancellation and refund terms

This way, all details are presented transparently before booking.

## ↩️ Cancellation and Refund Assurance

All bookings are subject to the published cancellation and refund conditions.

The applicable cancellation windows and refund terms are shown to the user before payment and explained in detail in our [Cancellation & Refund Policy](/cancellation-policy).

Depending on the situation, users may be offered one of the following options:

* Full refund
* Alternative date
* Alternative guide
* Equivalent experience

## 🎧 Customer Support

Our support team is available to help with bookings, payments, cancellations, account operations, and operational matters.

**Monday – Friday · 09:00 – 18:00 (UTC+3)**

📧 [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

📞 +90 530 828 76 96

## Company Information

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4, Marmaris / Muğla / Türkiye

**Tax Office:** Marmaris Tax Office

**Tax Number:** 9251328389

**Trade Registry Number:** 12686

📧 [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

📞 +90 530 828 76 96

---

Users who book through VibeGuide benefit from secure payment infrastructure, transparent pricing, verified tourism operations, published cancellation policies, and dedicated customer support.
`;

export default function SecurityView() {
  const { locale } = useT();
  const tr = locale === "tr";
  return (
    <LegalMarkdown
      title={tr ? "Güvenlik ve Ödemeler" : "Security & Payments"}
      body={tr ? BODY_TR : BODY_EN}
    />
  );
}
