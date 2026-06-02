import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

export const metadata: Metadata = {
  title: "About Us | VibeGuide",
  description: "VibeGuide is a digital tourism platform connecting travelers with verified, licensed local guides across Turkey.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-6">About VibeGuide</h1>

        <p className="text-lg text-neutral-600 leading-8 mb-6">
          VibeGuide is a digital tourism platform that connects travelers with verified local expertise across Türkiye. Founded by licensed professional tourist guides with years of experience serving international visitors, VibeGuide combines modern technology with authentic human connection to create more meaningful travel experiences.
        </p>
        <p className="text-neutral-600 leading-8 mb-8">
          Rather than relying on crowded buses, scripted audio guides, or generic tourism products, VibeGuide enables travelers to explore destinations through real local knowledge, professional guidance, and carefully designed experiences.
        </p>

        <h2 className="text-xl font-black mb-4">What We Do</h2>
        <p className="text-neutral-600 leading-7 mb-4">VibeGuide offers three ways to discover a destination:</p>
        <p className="text-neutral-600 leading-7 mb-3">
          <strong>VibeNow</strong> — Instant matching with available local guides for spontaneous experiences and last-minute exploration.
        </p>
        <p className="text-neutral-600 leading-7 mb-3">
          <strong>VibeSquad</strong> — Shared group experiences that bring travelers together while making guided experiences more accessible and social.
        </p>
        <p className="text-neutral-600 leading-7 mb-6">
          <strong>Private Tours</strong> — Personalized and privately guided experiences tailored to individual interests, travel styles, and schedules.
        </p>
        <p className="text-neutral-600 leading-7 mb-8">
          Every experience is built around predefined scopes, transparent pricing, published cancellation policies, and a guide verification process designed to provide clarity, reliability, and peace of mind for travelers.
        </p>

        <h2 className="text-xl font-black mb-4">Our Mission</h2>
        <p className="text-neutral-600 leading-7 mb-4">
          Our mission is to replace impersonal tourism with authentic local experiences led by real people who know their cities from the inside.
        </p>
        <p className="text-neutral-600 leading-7 mb-8">
          We believe travelers deserve more than following umbrellas through crowded streets or listening to prerecorded information. By connecting visitors directly with knowledgeable local professionals, we help create memorable experiences based on genuine cultural exchange, local insight, and human connection.
        </p>

        <h2 className="text-xl font-black mb-4">Professional Standards &amp; Compliance</h2>
        <p className="text-neutral-600 leading-7 mb-4">
          VibeGuide was founded and is operated by licensed professional tourist guides authorized by the Turkish Ministry of Culture and Tourism. Our team&apos;s extensive field experience helps ensure that experiences offered through the platform reflect professional guiding standards, cultural accuracy, guest safety, and high-quality service.
        </p>
        <p className="text-neutral-600 leading-7 mb-4">
          Where required under applicable regulations, tourism services available through the platform may be operated directly by, or in cooperation with, licensed travel agency partners authorized under Turkish tourism legislation and registered with the Association of Turkish Travel Agencies (TÜRSAB).
        </p>
        <p className="text-neutral-600 leading-7 mb-8">
          We are committed to working with verified tourism professionals and maintaining compliance with relevant tourism, consumer protection, privacy, and digital service regulations applicable in Türkiye.
        </p>

        <h2 className="text-xl font-black mb-4">Company Information</h2>
        <div className="bg-neutral-50 rounded-2xl p-6 text-sm text-neutral-600 space-y-2">
          <p className="font-semibold text-neutral-900">VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
          <p>Tax Number: 9251328389 · Tax Office: Marmaris Tax Office</p>
          <p>Trade Registry Number: 12686</p>
          <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4, Marmaris / Muğla, Türkiye</p>
          <p>Email: <a href="mailto:support@vibeguideapp.com" className="underline">support@vibeguideapp.com</a></p>
          <p>Business Hours: Monday – Friday, 09:00 – 18:00 (UTC+3)</p>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}
