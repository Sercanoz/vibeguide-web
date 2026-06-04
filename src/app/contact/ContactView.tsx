"use client";

import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { useT } from "@/components/LanguageProvider";

export default function ContactView() {
  const { locale } = useT();
  const tr = locale === "tr";

  const t = {
    title: tr ? "Bize Ulaşın" : "Contact Us",
    intro: tr
      ? "Rezervasyon, müşteri desteği, iptal, iade, iş birliği fırsatları, medya talepleri veya rehber başvuruları için buradayız."
      : "For reservations, customer support, cancellations, refunds, partnership opportunities, media inquiries, or guide applications, we're here to help.",
    email: tr ? "E-posta" : "Email",
    emailNote: tr
      ? "Çoğu talep en geç 1 iş günü içinde incelenip yanıtlanır."
      : "Most inquiries are reviewed and answered within 1 business day.",
    phone: tr ? "Telefon" : "Phone",
    hoursShort: tr ? "Pazartesi–Cuma, 09:00–18:00 (UTC+3)" : "Monday–Friday, 09:00–18:00 (UTC+3)",
    hoursTitle: tr ? "Çalışma Saatleri" : "Business Hours",
    hoursLine: tr ? "Pazartesi–Cuma, 09:00–18:00" : "Monday–Friday, 09:00–18:00",
    hoursTz: tr ? "Türkiye Saati (UTC+3)" : "Türkiye Time (UTC+3)",
    companyTitle: tr ? "Şirket Bilgileri" : "Company Information",
    taxOffice: tr ? "Vergi Dairesi: Marmaris Vergi Dairesi" : "Tax Office: Marmaris Tax Office",
    taxNo: tr ? "Vergi Numarası: 9251328389" : "Tax Number: 9251328389",
    registry: tr ? "Ticaret Sicil Numarası: 12686" : "Trade Registry Number: 12686",
    closing: tr
      ? "VibeGuide, platformunu kullanan gezginler ve rehberler için şeffaf iletişim, güvenilir destek ve zamanında yardım sunmaya kararlıdır."
      : "VibeGuide is committed to providing transparent communication, reliable support, and timely assistance for travelers and guides using our platform.",
  };

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-4">{t.title}</h1>
        <p className="text-lg text-neutral-700 mb-12">{t.intro}</p>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="bg-neutral-50 rounded-2xl p-6">
            <p className="text-sm font-black mb-3">📧 {t.email}</p>
            <a href="mailto:support@vibeguideapp.com" className="text-[#6C4CF1] font-semibold hover:underline">
              support@vibeguideapp.com
            </a>
            <p className="text-xs text-neutral-800 mt-2">{t.emailNote}</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-6">
            <p className="text-sm font-black mb-3">📞 {t.phone}</p>
            <a href="tel:+905308287696" className="text-[#6C4CF1] font-semibold hover:underline">
              +90 530 828 76 96
            </a>
            <p className="text-xs text-neutral-800 mt-2">{t.hoursShort}</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-6">
            <p className="text-sm font-black mb-3">🕐 {t.hoursTitle}</p>
            <p className="font-semibold">{t.hoursLine}</p>
            <p className="text-xs text-neutral-800 mt-2">{t.hoursTz}</p>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-2xl p-6 text-sm text-neutral-800 space-y-2">
          <p className="font-black text-neutral-900 mb-3">{t.companyTitle}</p>
          <p className="font-semibold text-neutral-800">VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
          <p>{t.taxOffice}</p>
          <p>{t.taxNo}</p>
          <p>{t.registry}</p>
          <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4, Marmaris / Muğla / Türkiye</p>
          <p>
            <a href="mailto:support@vibeguideapp.com" className="text-[#6C4CF1] font-semibold hover:underline">
              support@vibeguideapp.com
            </a>
          </p>
        </div>

        <p className="text-sm text-neutral-700 mt-8 leading-7">{t.closing}</p>
      </div>

      <MainFooter />
    </main>
  );
}
