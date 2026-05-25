import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | VibeGuide",
  description: "VibeGuide is a digital tourism platform connecting travelers with verified, licensed local guides across Turkey.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-black mb-6">About VibeGuide</h1>

        <p className="text-lg text-neutral-600 leading-8 mb-8">
          VibeGuide is a digital tourism platform that enables travelers to discover cities in Turkey through verified, licensed local guides — with secure reservations, predefined routes, and supported operations.
        </p>

        <h2 className="text-xl font-black mb-4">What we do</h2>
        <p className="text-neutral-600 leading-7 mb-6">
          Our platform offers three ways to explore: <strong>VibeNow</strong> for on-demand guide matching, <strong>VibeSquad</strong> for shared group experiences with fellow travelers, and <strong>Private Tours</strong> for fully customized itineraries.
        </p>
        <p className="text-neutral-600 leading-7 mb-8">
          Every experience is built on predefined scopes, clear pricing, transparent cancellation terms, and a guide verification process — replacing the uncertainty of generic tourism with genuine human connection and professional local expertise.
        </p>

        <h2 className="text-xl font-black mb-4">Our mission</h2>
        <p className="text-neutral-600 leading-7 mb-8">
          To replace crowded buses and scripted audio guides with authentic, personalized city experiences — guided by real locals who know their city from the inside.
        </p>

        <h2 className="text-xl font-black mb-4">Company information</h2>
        <div className="bg-neutral-50 rounded-2xl p-6 text-sm text-neutral-600 space-y-2">
          <p className="font-semibold text-neutral-900">VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
          <p>Vergi No: 9251328389 · Vergi Dairesi: Marmaris V.D.</p>
          <p>Ticaret Sicil No: 12686</p>
          <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, Türkiye</p>
          <p>E-posta: <a href="mailto:support@vibeguideapp.com" className="underline">support@vibeguideapp.com</a></p>
          <p>Çalışma saatleri: Hafta içi 09:00 – 18:00 (UTC+3)</p>
        </div>
      </div>
    </main>
  );
}
