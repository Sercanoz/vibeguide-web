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
          VibeGuide is a digital tourism platform that connects travelers with verified local expertise across Türkiye.
        </p>
        <p className="text-neutral-600 leading-8 mb-6">
          Founded by licensed professional tourist guides with years of experience serving international visitors, VibeGuide combines modern technology with authentic human connection to create more meaningful, flexible, and memorable travel experiences.
        </p>
        <p className="text-neutral-600 leading-8 mb-8">
          Rather than relying on crowded buses, scripted audio guides, or one-size-fits-all tourism products, VibeGuide helps travelers discover destinations through real local knowledge, professional guidance, and carefully designed experiences led by people who genuinely know their cities.
        </p>

        <h2 className="text-xl font-black mb-4">What We Do</h2>
        <p className="text-neutral-600 leading-7 mb-4">VibeGuide offers three ways to discover a destination:</p>
        <h3 className="font-bold text-base mb-1">VibeNow</h3>
        <p className="text-neutral-600 leading-7 mb-4">
          Instant matching with available local guides for spontaneous experiences, last-minute exploration, and real-time local discovery.
        </p>
        <h3 className="font-bold text-base mb-1">VibeSquad</h3>
        <p className="text-neutral-600 leading-7 mb-4">
          Shared group experiences that bring travelers together while making guided experiences more social, accessible, and affordable.
        </p>
        <h3 className="font-bold text-base mb-1">Private Tours</h3>
        <p className="text-neutral-600 leading-7 mb-6">
          Personalized experiences designed around individual interests, travel styles, schedules, and priorities.
        </p>
        <p className="text-neutral-600 leading-7 mb-8">
          Every experience is built around clearly defined service scopes, transparent pricing, published cancellation terms, and a guide verification process designed to provide clarity, reliability, and peace of mind.
        </p>

        <h2 className="text-xl font-black mb-4">Our Mission</h2>
        <p className="text-neutral-600 leading-7 mb-4">
          Our mission is to replace impersonal tourism with authentic local experiences led by real people who know their destinations from the inside.
        </p>
        <p className="text-neutral-600 leading-7 mb-4">
          We believe travelers deserve more than following umbrellas through crowded streets or listening to prerecorded information.
        </p>
        <p className="text-neutral-600 leading-7 mb-8">
          By connecting visitors directly with knowledgeable local professionals, we create opportunities for genuine cultural exchange, meaningful conversations, and memorable experiences that go beyond traditional sightseeing.
        </p>

        <h2 className="text-xl font-black mb-4">Professional Standards &amp; Compliance</h2>
        <p className="text-neutral-600 leading-7 mb-4">
          VibeGuide was founded and is operated by licensed professional tourist guides authorized under the regulations of the Republic of Türkiye.
        </p>
        <p className="text-neutral-600 leading-7 mb-4">
          Our team&apos;s extensive field experience helps ensure that experiences offered through the platform reflect professional guiding standards, cultural accuracy, guest safety, operational reliability, and high-quality service.
        </p>
        <p className="text-neutral-600 leading-7 mb-4">
          Where required by applicable regulations, tourism services available through the platform may be operated directly by, or in cooperation with, licensed travel agency partners authorized under Turkish tourism legislation and registered with the Association of Turkish Travel Agencies (TÜRSAB).
        </p>
        <p className="text-neutral-600 leading-7 mb-8">
          We are committed to working with verified tourism professionals and maintaining compliance with applicable tourism, consumer protection, privacy, and digital service regulations.
        </p>

        <h2 className="text-xl font-black mb-4">Why VibeGuide</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 leading-7 mb-8">
          <li>Verified tourism professionals</li>
          <li>Transparent pricing and published policies</li>
          <li>Flexible ways to explore destinations</li>
          <li>Local knowledge and authentic experiences</li>
          <li>Secure booking and customer support</li>
          <li>Human connection at the center of every experience</li>
        </ul>

        <h2 className="text-xl font-black mb-4">Company Information</h2>
        <div className="bg-neutral-50 rounded-2xl p-6 text-sm text-neutral-600 space-y-2">
          <p className="font-semibold text-neutral-900">VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
          <p>Tax Number: 9251328389</p>
          <p>Tax Office: Marmaris Tax Office</p>
          <p>Trade Registry Number: 12686</p>
          <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4, Marmaris / Muğla / Türkiye</p>
          <p>Email: <a href="mailto:support@vibeguideapp.com" className="underline">support@vibeguideapp.com</a></p>
          <p>Business Hours: Monday–Friday, 09:00–18:00 (UTC+3)</p>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}
