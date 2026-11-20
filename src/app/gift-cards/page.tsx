import type { Metadata } from "next";
import GiftCardsView from "./GiftCardsView";

export const metadata: Metadata = {
  alternates: { canonical: "/gift-cards" },
  title: "Gift Cards — Give a Private Tour in Türkiye",
  description:
    "Give a VibeGuide gift card: a private tour with a licensed local guide in Türkiye. Valid for 24 months, delivered instantly by email.",
};

export default function GiftCardsPage() {
  return <GiftCardsView />;
}
