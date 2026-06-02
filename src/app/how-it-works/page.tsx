import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

export const metadata: Metadata = {
  title: "How It Works | VibeGuide",
  description: "Learn how VibeGuide's secure booking process works — from choosing your experience to meeting your verified guide.",
};

const steps = [
  {
    n: "1",
    title: "Choose your experience",
    text: "Browse predefined city tours, cultural walks, museum experiences and custom routes. Each experience has a clear scope, duration, language, meeting point and price.",
  },
  {
    n: "2",
    title: "Make a reservation",
    text: "Select your date, time, language and number of participants. Complete your secure booking — payment is processed through our registered company.",
  },
  {
    n: "3",
    title: "Guide is verified and assigned",
    text: "All experiences are conducted exclusively with VibeGuide-verified local guides who have passed identity checks, language assessments and platform standards.",
  },
  {
    n: "4",
    title: "Meeting point is shared",
    text: "After confirmation, you receive the meeting point, time and full experience details. No surprises.",
  },
  {
    n: "5",
    title: "Experience the city",
    text: "Meet your guide and explore safely, with a planned route and a real local who knows the city from the inside.",
  },
  {
    n: "6",
    title: "Support & resolution",
    text: "In case of cancellation, delay or guide no-show, VibeGuide's support process steps in. Clear cancellation terms and refund policies apply in every case.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <p className="text-sm font-black text-[#6C4CF1] mb-3 tracking-widest">HOW IT WORKS</p>
        <h1 className="text-4xl font-black mb-4">The booking process, step by step</h1>
        <p className="text-lg text-neutral-500 mb-12">
          VibeGuide is a controlled digital tourism reservation platform — verified guides, predefined routes, secure payments and supported operations.
        </p>

        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5 p-6 bg-neutral-50 rounded-2xl">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#6C4CF1] text-white flex items-center justify-center font-black text-lg">
                {s.n}
              </div>
              <div>
                <h2 className="font-black text-lg mb-1">{s.title}</h2>
                <p className="text-neutral-600 text-sm leading-7">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#F5F3FF] rounded-2xl border border-[#DDD6FE]">
          <p className="font-black mb-2">🔒 Secure & supported</p>
          <p className="text-sm text-neutral-600 leading-7">
            All payments are processed through VibeCore Turizm Seyahat Acentası ve Dijital Hizmetler Ticaret Ltd. Şti., our registered Turkish company. Guide verification, cancellation terms and dispute resolution are managed by VibeGuide.
          </p>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}
