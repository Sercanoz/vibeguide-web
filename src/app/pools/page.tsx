import type { Metadata } from "next";
import PoolsClient from "./PoolsClient";

const URL = "https://www.vibeguideapp.com/pools";

export const metadata: Metadata = {
  title: "Group Tours — Join a VibeSquad",
  description:
    "Join an open group tour in Türkiye and pay less per person. The more travellers join, the lower the price.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Group Tours — Join a VibeSquad",
    description:
      "Join an open group tour in Türkiye and pay less per person.",
    url: URL,
    siteName: "VibeGuide",
    type: "website",
  },
};

export default function Page() {
  return <PoolsClient />;
}
