import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "VibeGuide Hakkında | VibeGuide",
  description: "VibeGuide, gezginleri Türkiye genelindeki doğrulanmış yerel rehberler ve turizm profesyonelleriyle buluşturan dijital bir turizm platformudur.",
};

const BODY = `
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

export default function AboutPage() {
  return (
    <LegalMarkdown
      title="VibeGuide Hakkında"
      body={BODY}
    />
  );
}
