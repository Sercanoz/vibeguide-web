import type { Metadata } from "next";
import HowItWorksView from "./HowItWorksView";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  title: "How It Works",
  description:
    "How booking a VibeGuide tour works: choose a tour and date, pick a licensed guide, send your request and pay only after the guide accepts.",
};

// İçerik HowItWorksView içinde (EN + TR) — gerçek rezervasyon akışını anlatır.
export default function HowItWorksPage() {
  return <HowItWorksView />;
}
