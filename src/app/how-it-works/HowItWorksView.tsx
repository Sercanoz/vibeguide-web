"use client";

import LegalMarkdown from "@/components/LegalMarkdown";
import { useT } from "@/components/LanguageProvider";

// "Nasıl çalışır" — gerçek rezervasyon akışını anlatır (kod ile birebir):
// tur + tarih + kişi → müsait rehber seçimi → talep (sözleşme onayı) → rehber kabulü
// → 3D Secure ödeme → onay. Rehber kabul etmeden ücret alınmaz.
// Diğer diller EN'e düşer.

const BODY: Record<"en" | "tr", { title: string; body: string }> = {
  en: {
    title: "How It Works",
    body: `
## Booking a tour, step by step

VibeGuide connects you with licensed, verified local guides in Turkey. The tour page shows which dates have guides available, and you choose your own guide.

## 1. Choose a tour and a date

Browse [tours](/tours) by destination, duration, price or language. Each tour page shows what's included, the route, the meeting point, the languages and the price per person.

Pick an available date in the calendar and the number of travelers — the total for your group is shown before you continue.

## 2. Choose your guide

You'll see the licensed guides who are available on that date, with their languages, experience and reviews. Open a guide's profile to learn more, then select the one you like.

## 3. Reserve your guide

Review your booking summary and accept the Distance Sales Contract and Pre-Information Form. Your guide is reserved for your date right away.

## 4. Pay securely

Pay by card on the same page. Payments are processed by a licensed payment institution with 3D Secure verification. Your card details are not stored by VibeGuide.

If you leave before paying, we email you a link to finish — your reservation is held for up to 24 hours (and until 2 hours before the tour). You can also find it under **My reservations** in your profile.

If your guide ever has to cancel, you get a full refund.

## 5. Meet your guide

You receive your confirmation with the meeting point and time. Meet your guide and explore the city with someone who knows it inside out.

---

## Other ways to explore

**VibeNow (in the app):** request a guide for right now. A verified guide nearby can accept your request and come to meet you — how quickly depends on how many guides are available around you.

**VibeSquad:** join or start a group on the same route. The more people join, the lower the price per person. Once the group is locked, everyone has a payment window to confirm their place.

## How guides are verified

Every guide uploads their official tourist-guide badge (kokart) and identity documents. Our team reviews each application before the guide can accept bookings. Travelers rate their guide after every tour.

## If something goes wrong

If a guide doesn't show up, a tour is cancelled or there's an operational problem, contact our [support team](/contact). Depending on the situation we offer an alternative guide, an alternative date or a refund under the [Cancellation & Refund Policy](/cancellation-policy).

---

Related: [Guide Verification](/guide-verification) · [Safety & Payments](/security) · [Help Center](/help) · [Cancellation & Refund Policy](/cancellation-policy)
`,
  },
  tr: {
    title: "Nasıl Çalışır",
    body: `
## Adım adım tur rezervasyonu

VibeGuide sizi Türkiye'deki lisanslı ve doğrulanmış yerel rehberlerle buluşturur. Tur sayfasında hangi tarihlerde müsait rehber olduğunu görür, rehberinizi kendiniz seçersiniz.

## 1. Tur ve tarih seçin

[Turları](/tours) destinasyona, süreye, fiyata ya da dile göre inceleyin. Her tur sayfasında neyin dahil olduğu, rota, buluşma noktası, diller ve kişi başı fiyat yer alır.

Takvimden müsait bir tarih ve kişi sayısını seçin — devam etmeden önce grubunuzun toplam tutarı gösterilir.

## 2. Rehberinizi seçin

O tarihte müsait olan lisanslı rehberleri dilleri, deneyimleri ve değerlendirmeleriyle görürsünüz. Rehberin profiline göz atıp beğendiğinizi seçin.

## 3. Rehberinizi ayırın

Rezervasyon özetini kontrol edin; Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu'nu onaylayın. Rehberiniz o tarih için hemen size ayrılır.

## 4. Güvenle ödeyin

Aynı sayfada kartla ödersiniz. Ödemeler lisanslı bir ödeme kuruluşu üzerinden 3D Secure doğrulamasıyla alınır. Kart bilgileriniz VibeGuide tarafından saklanmaz.

Ödemeden çıkarsanız tamamlamanız için size e-postayla bir bağlantı göndeririz — rezervasyonunuz en fazla 24 saat (ve tura 2 saat kalana kadar) tutulur. Profilinizdeki **Rezervasyonlarım** bölümünde de bulabilirsiniz.

Rehberiniz iptal etmek zorunda kalırsa ücretin tamamı iade edilir.

## 5. Rehberinizle buluşun

Buluşma noktası ve saatini içeren onayınız size iletilir. Rehberinizle buluşun ve şehri onu en iyi bilen biriyle keşfedin.

---

## Keşfetmenin diğer yolları

**VibeNow (uygulamada):** hemen şimdi için rehber talep edin. Yakındaki doğrulanmış bir rehber talebinizi kabul edip yanınıza gelebilir — ne kadar hızlı olacağı çevrenizdeki müsait rehber sayısına bağlıdır.

**VibeSquad:** aynı rotadaki bir gruba katılın ya da yeni bir grup başlatın. Katılan kişi arttıkça kişi başı fiyat düşer. Grup kilitlendiğinde herkesin yerini onaylamak için bir ödeme süresi olur.

## Rehberler nasıl doğrulanır?

Her rehber resmi turist rehberi kokartını ve kimlik belgelerini yükler. Ekibimiz her başvuruyu inceler; rehber ancak onaydan sonra rezervasyon kabul edebilir. Gezginler her turdan sonra rehberlerini değerlendirir.

## Bir sorun olursa

Rehber gelmezse, tur iptal olursa ya da operasyonel bir sorun yaşanırsa [destek ekibimize](/contact) ulaşın. Duruma göre alternatif rehber, alternatif tarih veya [İptal ve İade Politikası](/cancellation-policy) kapsamında iade sunarız.

---

İlgili: [Rehber Doğrulama](/guide-verification) · [Güvenlik ve Ödemeler](/security) · [Yardım Merkezi](/help) · [İptal ve İade Politikası](/cancellation-policy)
`,
  },
};

export default function HowItWorksView() {
  const { locale } = useT();
  const c = locale === "tr" ? BODY.tr : BODY.en;
  return <LegalMarkdown title={c.title} body={c.body} />;
}
