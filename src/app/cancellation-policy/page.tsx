import type { Metadata } from "next";
import CancellationView from "./CancellationView";

export const metadata: Metadata = {
  alternates: { canonical: "/cancellation-policy" },
  title: "İptal ve İade Politikası | VibeGuide",
  description: "VibeGuide iptal ve iade koşulları — VibeNow, VibeSquad ve Özel Turlar için.",
};

export default function CancellationPolicyPage() {
  return <CancellationView />;
}
