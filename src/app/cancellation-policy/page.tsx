import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | VibeGuide",
  description: "VibeGuide's cancellation and refund terms for all experience types — VibeNow, VibeSquad and Private Tours.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-black text-[#6C4CF1] mb-3 tracking-widest">CANCELLATION & REFUND POLICY</p>
        <h1 className="text-4xl font-black mb-4">Cancellation & Refund Terms</h1>
        <p className="text-sm text-neutral-400 mb-10">Last updated: January 2026</p>

        <div className="prose prose-neutral max-w-none space-y-10">

          <section>
            <h2 className="text-xl font-black mb-4">1. Standard cancellation terms</h2>
            <div className="space-y-3 text-neutral-600 leading-7 text-sm">
              <p>Cancellation and refund conditions depend on the type of experience selected, the time remaining until the start of the experience, and the service preparation status.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>More than 24 hours before experience start:</strong> Free cancellation. Full refund issued.</li>
                <li><strong>Less than 24 hours before experience start:</strong> Cancellation may not be eligible for a refund. No-show without cancellation is not refundable.</li>
                <li><strong>Guide no-show:</strong> If the assigned guide does not arrive, the traveler receives a full refund or an alternative experience option.</li>
                <li><strong>Force majeure (weather, natural events, official restrictions):</strong> Traveler will be offered an alternative date/time or a full refund.</li>
                <li><strong>Traveler late arrival:</strong> If the traveler arrives late, the experience duration may be reduced. No refund is issued for time lost due to late arrival.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black mb-4">2. VibeSquad group experiences</h2>
            <div className="space-y-3 text-neutral-600 leading-7 text-sm">
              <ul className="list-disc pl-5 space-y-2">
                <li>Pool owner can cancel more than 24 hours before the scheduled time — all participants receive a full refund.</li>
                <li>Cancellations within 24 hours of the scheduled time may not be eligible for a refund.</li>
                <li>If the minimum group size is not reached by lock time, participants receive a full refund or are offered a VibeNow alternative.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black mb-4">3. Third-party services</h2>
            <p className="text-neutral-600 leading-7 text-sm">
              Museum entrance fees, transportation, food and beverages, or any other third-party services purchased separately are subject to that provider's own cancellation and refund terms. VibeGuide is not responsible for third-party service refunds.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black mb-4">4. Refund processing</h2>
            <p className="text-neutral-600 leading-7 text-sm">
              Approved refunds are returned to the original payment method within 5–10 business days, depending on the payment provider. VibeGuide will notify you by email once the refund has been processed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black mb-4">5. How to cancel</h2>
            <p className="text-neutral-600 leading-7 text-sm">
              Cancellations can be made through the VibeGuide app or by contacting our support team at <a href="mailto:support@vibeguideapp.com" className="underline text-[#6C4CF1]">support@vibeguideapp.com</a> at least 24 hours before the experience start time.
            </p>
          </section>

          <div className="p-5 bg-neutral-50 rounded-xl text-sm text-neutral-500">
            <p><strong>Contact:</strong> support@vibeguideapp.com · Mon–Fri 09:00–18:00 (UTC+3)</p>
            <p className="mt-1"><strong>Company:</strong> VibeCore Turizm Seyahat Acentası ve Dijital Hizmetler Ticaret Ltd. Şti. · Vergi No: 9251328389</p>
          </div>
        </div>
      </div>
    </main>
  );
}
