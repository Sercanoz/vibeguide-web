"use client";

import LegalMarkdown from "@/components/LegalMarkdown";
import { useT } from "@/components/LanguageProvider";

const BODY_TR = `
VibeGuide, gezginleri Türkiye genelindeki doğrulanmış yerel rehberler ve turizm profesyonelleriyle buluşturan dijital bir turizm platformudur.

Uzun yıllardır uluslararası ziyaretçilere hizmet veren lisanslı profesyonel turist rehberleri tarafından kurulan VibeGuide, modern teknolojiyi gerçek yerel uzmanlıkla birleştirerek daha anlamlı, esnek ve unutulmaz seyahat deneyimleri sunmayı amaçlamaktadır.

Kalabalık otobüs turlarına, ezbere anlatılan standart rotalara veya herkese aynı deneyimi sunan turizm ürünlerine bağlı kalmak yerine, VibeGuide gezginlerin destinasyonları gerçek yerel bilgi, profesyonel rehberlik ve yaşadıkları şehri gerçekten tanıyan insanlar tarafından tasarlanmış deneyimler aracılığıyla keşfetmesine yardımcı olur.

## Ne Yapıyoruz?

VibeGuide bir destinasyonu keşfetmenin üç farklı yolunu sunar:

### VibeNow

Anlık rehber eşleşmesi.

Müsait yerel rehberlerle dakikalar içerisinde eşleşerek spontane keşifler yapabilir, son dakika planlarını değerlendirebilir ve bulunduğunuz şehri gerçek zamanlı olarak keşfetmeye başlayabilirsiniz.

### VibeSquad

Paylaşımlı grup deneyimleri.

Gezginleri bir araya getirirken rehberli deneyimleri daha sosyal, daha erişilebilir ve daha ekonomik hale getirir.

### Özel Turlar (Private Tours)

Kişisel ilgi alanlarına, seyahat tarzına, programınıza ve önceliklerinize göre tasarlanan özel deneyimlerdir.

Sunulan tüm deneyimler; açıkça tanımlanmış hizmet kapsamları, şeffaf fiyatlandırma, yayınlanmış iptal koşulları ve gezginlere güven vermek amacıyla uygulanan rehber doğrulama süreçleri üzerine kuruludur.

## Misyonumuz

Misyonumuz, kişisellikten uzak turizm anlayışını; destinasyonlarını içeriden tanıyan gerçek insanlar tarafından sunulan otantik yerel deneyimlerle değiştirmektir.

Bizce gezginler, kalabalık gruplar halinde bir şemsiyeyi takip etmekten veya önceden kaydedilmiş sesli anlatımları dinlemekten çok daha fazlasını hak ediyor.

Ziyaretçileri bilgili yerel profesyonellerle doğrudan buluşturarak gerçek kültürel etkileşimler, anlamlı sohbetler ve klasik turistik gezi anlayışının ötesine geçen unutulmaz deneyimler yaratıyoruz.

## Profesyonel Standartlar ve Mevzuata Uyum

VibeGuide, Türkiye Cumhuriyeti mevzuatı kapsamında yetkilendirilmiş lisanslı profesyonel turist rehberleri tarafından kurulmuş ve işletilmektedir.

Platformun temeli, Türkiye'nin en çok ziyaret edilen destinasyonlarında uluslararası misafirlerle yıllar boyunca sahada çalışılarak kazanılan gerçek rehberlik deneyimine dayanmaktadır.

Bu sektörel birikim, platform üzerinden sunulan deneyimlerin profesyonel rehberlik standartlarına, kültürel doğruluğa, misafir güvenliğine, operasyonel güvenilirliğe ve yüksek hizmet kalitesine uygun şekilde tasarlanmasına yardımcı olmaktadır.

Mevzuatın gerekli gördüğü durumlarda, platform üzerinden sunulan bazı turizm hizmetleri Türk turizm mevzuatı kapsamında yetkilendirilmiş ve Türkiye Seyahat Acentaları Birliği (TÜRSAB) üyesi seyahat acenteleri tarafından veya bu acentelerle iş birliği içerisinde gerçekleştirilebilir.

VibeGuide olarak doğrulanmış turizm profesyonelleriyle çalışmaya ve turizm, tüketici hakları, kişisel verilerin korunması ve dijital hizmetlere ilişkin yürürlükteki mevzuata uyum sağlamaya önem veriyoruz.

## Neden VibeGuide?

* Lisanslı ve doğrulanmış turizm profesyonelleri
* Şeffaf fiyatlandırma ve yayınlanmış politikalar
* Destinasyonları keşfetmenin esnek yolları
* Gerçek yerel bilgi ve kültürel içgörüler
* Güvenli rezervasyon altyapısı ve müşteri desteği
* Profesyonel rehberler tarafından tasarlanmış deneyimler
* Her deneyimin merkezinde insan ilişkileri ve gerçek etkileşim

## Şirket Bilgileri

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

Vergi Numarası: 9251328389

Vergi Dairesi: Marmaris Vergi Dairesi

Ticaret Sicil Numarası: 12686

Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4, Marmaris / Muğla / Türkiye

E-posta: [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

Çalışma Saatleri: Pazartesi – Cuma, 09:00 – 18:00 (UTC+3)

---

İlgili Belgeler: [Rehber Doğrulama](/guide-verification) · [Güvenlik ve Ödemeler](/security) · [Yardım Merkezi](/help) · [İletişim](/contact)
`;

const BODY_EN = `
VibeGuide is a digital tourism platform that connects travellers with verified local guides and tourism professionals across Türkiye.

Founded by licensed professional tourist guides who have served international visitors for many years, VibeGuide combines modern technology with genuine local expertise to deliver more meaningful, flexible, and unforgettable travel experiences.

Instead of relying on crowded bus tours, scripted standard routes, or one-size-fits-all tourism products, VibeGuide helps travellers explore destinations through genuine local knowledge, professional guiding, and experiences designed by people who truly know the city they live in.

## What We Do

VibeGuide offers three different ways to explore a destination:

### VibeNow

Instant guide matching.

Match with available local guides within minutes for spontaneous discoveries, make the most of last-minute plans, and start exploring the city you're in, in real time.

### VibeSquad

Shared group experiences.

It brings travellers together while making guided experiences more social, more accessible, and more affordable.

### Private Tours

Private experiences designed around your personal interests, travel style, schedule, and priorities.

All experiences offered are built on clearly defined service scopes, transparent pricing, published cancellation conditions, and guide-verification processes applied to give travellers confidence.

## Our Mission

Our mission is to replace impersonal tourism with authentic local experiences delivered by real people who know their destinations from the inside.

We believe travellers deserve far more than following an umbrella in a crowded group or listening to pre-recorded audio narrations.

By connecting visitors directly with knowledgeable local professionals, we create genuine cultural interactions, meaningful conversations, and unforgettable experiences that go beyond the classic tourist-trip mindset.

## Professional Standards and Regulatory Compliance

VibeGuide is founded and operated by licensed professional tourist guides authorized under the legislation of the Republic of Türkiye.

The platform is built on real guiding experience gained over years of fieldwork with international guests at Türkiye's most-visited destinations.

This industry experience helps ensure that the experiences offered through the platform are designed in line with professional guiding standards, cultural accuracy, guest safety, operational reliability, and high service quality.

Where required by legislation, some tourism services offered through the platform may be carried out by, or in cooperation with, travel agencies authorized under Turkish tourism legislation and that are members of the Association of Turkish Travel Agencies (TÜRSAB).

At VibeGuide, we are committed to working with verified tourism professionals and to complying with applicable legislation on tourism, consumer rights, the protection of personal data, and digital services.

## Why VibeGuide?

* Licensed and verified tourism professionals
* Transparent pricing and published policies
* Flexible ways to explore destinations
* Genuine local knowledge and cultural insights
* Secure booking infrastructure and customer support
* Experiences designed by professional guides
* Human connection and genuine interaction at the heart of every experience

## Company Information

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

Tax Number: 9251328389

Tax Office: Marmaris Tax Office

Trade Registry Number: 12686

Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4, Marmaris / Muğla / Türkiye

Email: [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

Working Hours: Monday – Friday, 09:00 – 18:00 (UTC+3)

---

Related Documents: [Guide Verification](/guide-verification) · [Security & Payments](/security) · [Help Center](/help) · [Contact](/contact)
`;

export default function AboutView() {
  const { locale } = useT();
  const tr = locale === "tr";
  return (
    <LegalMarkdown
      title={tr ? "VibeGuide Hakkında" : "About VibeGuide"}
      body={tr ? BODY_TR : BODY_EN}
    />
  );
}
