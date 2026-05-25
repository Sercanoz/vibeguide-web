import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Payment | VibeGuide",
  description: "VibeGuide processes payments through a registered Turkish company with SSL protection, clear pricing and supported operations.",
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-black text-[#6C4CF1] mb-3 tracking-widest">SECURITY & PAYMENT</p>
        <h1 className="text-4xl font-black mb-4">Secure booking. Clear process. Supported operations.</h1>
        <p className="text-lg text-neutral-500 mb-12">
          VibeGuide payments are processed through our registered company. Guide verification, reservation management, cancellation terms and dispute resolution are all managed by VibeGuide.
        </p>

        <div className="space-y-4 mb-12">
          {[
            { icon: "🔒", title: "SSL-protected website", text: "All data transmitted between your browser and our platform is encrypted using SSL/TLS." },
            { icon: "🏢", title: "Registered company", text: "Payments are collected by VibeCore Turizm Seyahat Acentası ve Dijital Hizmetler Ticaret Ltd. Şti., a registered Turkish company (Tax No: 9251328389)." },
            { icon: "💳", title: "Secure payment infrastructure", text: "Payments are processed through certified payment providers. Card data is never stored on our servers." },
            { icon: "📋", title: "Clear pricing", text: "Every experience shows the full price before booking. No hidden fees." },
            { icon: "✅", title: "Predefined service scope", text: "What is and is not included in each experience is stated clearly before booking." },
            { icon: "↩️", title: "Cancellation & refund policy", text: "Clear cancellation windows and refund terms apply to every booking. See our Cancellation Policy for full details." },
            { icon: "🎧", title: "Support team", text: "Our support team is available Monday–Friday, 09:00–18:00 (UTC+3) at support@vibeguideapp.com." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 bg-neutral-50 rounded-xl">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-black mb-1">{item.title}</p>
                <p className="text-sm text-neutral-600 leading-6">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-neutral-50 rounded-2xl text-sm text-neutral-600 space-y-1">
          <p className="font-black text-neutral-900 mb-2">Company details</p>
          <p>VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
          <p>Vergi No: 9251328389 · Vergi Dairesi: Marmaris V.D.</p>
          <p>Ticaret Sicil No: 12686</p>
          <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, Türkiye</p>
          <p>📧 <a href="mailto:support@vibeguideapp.com" className="underline">support@vibeguideapp.com</a></p>
        </div>
      </div>
    </main>
  );
}
