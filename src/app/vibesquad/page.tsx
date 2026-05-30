import type { Metadata } from "next";
import ModePageView from "@/components/ModePageView";
import { getMode } from "@/lib/modes";

const mode = getMode("vibesquad")!;
const URL = "https://www.vibeguideapp.com/vibesquad";

export const metadata: Metadata = {
  title: mode.metaTitle,
  description: mode.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: mode.metaTitle,
    description: mode.metaDescription,
    url: URL,
    siteName: "VibeGuide",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: mode.metaTitle, description: mode.metaDescription },
};

export default function Page() {
  return <ModePageView mode={mode} />;
}
