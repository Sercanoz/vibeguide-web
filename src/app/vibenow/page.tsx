import type { Metadata } from "next";
import { headers } from "next/headers";
import ModePageView from "@/components/ModePageView";
import { getMode } from "@/lib/modes";

const mode = getMode("vibenow")!;
const URL = "https://www.vibeguideapp.com/vibenow";

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

export default async function Page() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return <ModePageView mode={mode} nonce={nonce} />;
}
