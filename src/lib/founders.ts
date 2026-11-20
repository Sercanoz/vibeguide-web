// Hakkımızda > "Kurucular" bölümünün verisi.
//
// Liste BOŞKEN bölüm sitede hiç görünmez. Doldurmak için aşağıya kurucu başına
// bir nesne ekle. Fotoğrafı public/founders/ altına koy (ör. public/founders/ad.jpg)
// ve photo alanına "/founders/ad.jpg" yaz. Fotoğraf yoksa baş harfler gösterilir.
//
// Uydurma bilgi YAZMA: belge numarası ve hikâye kurucunun kendi onayladığı metin olmalı.

export interface Founder {
  name: string;
  /** Kokart/rehber belge numarası, ör. "12345". Boşsa gösterilmez. */
  licenseNo?: string;
  /** Rehberlik yaptığı diller, ör. ["EN", "DE"]. */
  languages?: string[];
  /** Rehberlik başlangıç yılı — "X yıldır rehber" metni buradan hesaplanır. */
  guidingSince?: number;
  photo?: string;
  role: { tr: string; en: string };
  bio: { tr: string; en: string };
}

export const FOUNDERS: Founder[] = [
  // {
  //   name: "Ad Soyad",
  //   licenseNo: "00000",
  //   languages: ["EN", "TR"],
  //   guidingSince: 2008,
  //   photo: "/founders/ad-soyad.jpg",
  //   role: { tr: "Kurucu · Profesyonel Turist Rehberi", en: "Co-founder · Licensed Tourist Guide" },
  //   bio: { tr: "Kısa hikâye…", en: "Short story…" },
  // },
];
