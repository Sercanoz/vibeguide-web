import type { Metadata } from "next";
import CancellationView from "./CancellationView";

export const metadata: Metadata = {
  alternates: { canonical: "/cancellation-policy" },
  title: "Cancellation & Refund Policy",
  description: "VibeGuide cancellation and refund terms — for VibeNow, VibeSquad and Private Tours.",
};

export default function CancellationPolicyPage() {
  return <CancellationView />;
}
