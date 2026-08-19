import type { Metadata } from "next";
import CerezView from "./CerezView";

export const metadata: Metadata = {
  alternates: { canonical: "/cerez-politikasi" },
  // İçerik İngilizce — başlık/description da İngilizce olmalı.
  title: "Cookie Policy",
  description:
    "Information about the cookies used on the VibeGuide website and how to manage your cookie preferences.",
};

export default function CookiePolicyPage() {
  return <CerezView />;
}
