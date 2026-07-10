import type { Metadata } from "next";
import SecurityView from "./SecurityView";

export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Safety & Payments",
  description: "VibeGuide offers an SSL-protected platform, a registered Turkish company, licensed tourism operations, secure payment infrastructure and transparent pricing.",
};

export default function SecurityPage() {
  return <SecurityView />;
}
