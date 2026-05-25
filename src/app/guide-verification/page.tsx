import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guide Verification | VibeGuide",
  description: "Every guide on VibeGuide passes identity verification, professional assessment and platform quality standards before being approved.",
};

const checks = [
  { icon: "🪪", title: "Identity verification", text: "Government-issued ID is reviewed before any guide is approved on the platform." },
  { icon: "🎓", title: "Professional assessment", text: "Guides are evaluated for relevant experience, local expertise and service quality standards." },
  { icon: "🗣️", title: "Language proficiency", text: "Language skills are assessed to ensure travelers receive the experience they booked." },
  { icon: "🗺️", title: "Route & experience fit", text: "Guides are matched to tours that fit their knowledge area — no mismatches." },
  { icon: "📋", title: "Platform rules acceptance", text: "Every guide signs and accepts VibeGuide's conduct, cancellation and quality standards." },
  { icon: "🛡️", title: "User safety standards", text: "Behavioral standards and traveler safety policies are enforced throughout the guide's time on the platform." },
];

export default function GuideVerificationPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-black text-[#6C4CF1] mb-3 tracking-widest">GUIDE VERIFICATION</p>
        <h1 className="text-4xl font-black mb-4">Every guide is reviewed before joining the platform</h1>
        <p className="text-lg text-neutral-500 mb-12">
          VibeGuide does not allow unverified guides. Every local guide on our platform has passed a structured review process covering identity, expertise and platform conduct standards.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {checks.map((c) => (
            <div key={c.title} className="p-6 bg-neutral-50 rounded-2xl">
              <p className="text-2xl mb-3">{c.icon}</p>
              <h2 className="font-black mb-2">{c.title}</h2>
              <p className="text-sm text-neutral-600 leading-7">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-[#F5F3FF] rounded-2xl border border-[#DDD6FE]">
          <p className="font-black mb-2">Traveler confidence, built in</p>
          <p className="text-sm text-neutral-600 leading-7">
            Our verification process is designed to give travelers confidence before they ever meet their guide. If a guide does not meet our standards at any point, they are removed from the platform.
          </p>
        </div>
      </div>
    </main>
  );
}
