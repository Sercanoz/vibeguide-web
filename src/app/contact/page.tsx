import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

export const metadata: Metadata = {
  title: "Contact | VibeGuide",
  description: "Contact VibeGuide for reservations, support, cancellations, refunds or guide applications.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-4">Contact Us</h1>
        <p className="text-lg text-neutral-500 mb-12">
          For reservations, support, cancellations, refunds, partnership or guide applications — reach out any time.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="bg-neutral-50 rounded-2xl p-6">
            <p className="text-sm font-black mb-3">📧 Email</p>
            <a href="mailto:support@vibeguideapp.com" className="text-[#6C4CF1] font-semibold hover:underline">
              support@vibeguideapp.com
            </a>
            <p className="text-xs text-neutral-400 mt-2">We respond within 24 hours on business days.</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-6">
            <p className="text-sm font-black mb-3">📞 Phone</p>
            <a href="tel:+905308287696" className="text-[#6C4CF1] font-semibold hover:underline">
              +90 530 828 76 96
            </a>
            <p className="text-xs text-neutral-400 mt-2">Mon–Fri, 09:00–18:00 (UTC+3)</p>
          </div>
          <div className="bg-neutral-50 rounded-2xl p-6">
            <p className="text-sm font-black mb-3">🕐 Working hours</p>
            <p className="font-semibold">Mon–Fri, 09:00–18:00</p>
            <p className="text-xs text-neutral-400 mt-2">Turkey time (UTC+3)</p>
          </div>
        </div>

        <div className="bg-neutral-50 rounded-2xl p-6 text-sm text-neutral-600 space-y-2">
          <p className="font-black text-neutral-900 mb-3">Company details</p>
          <p className="font-semibold text-neutral-800">VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
          <p>Vergi No: 9251328389 · Vergi Dairesi: Marmaris V.D.</p>
          <p>Ticaret Sicil No: 12686</p>
          <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, Türkiye</p>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}
