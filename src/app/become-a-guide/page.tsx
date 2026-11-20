import type { Metadata } from "next";
import BecomeGuideView from "./BecomeGuideView";

export const metadata: Metadata = {
  alternates: { canonical: "/become-a-guide" },
  title: "Become a Guide — Guide with VibeGuide",
  description:
    "Licensed tourist guide in Türkiye? Keep 85% of every booking, get paid weekly and choose your own days. Apply with your official guide badge.",
};

export default function BecomeGuidePage() {
  return <BecomeGuideView />;
}
