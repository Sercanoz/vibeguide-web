import type { Metadata } from "next";
import CerezView from "./CerezView";

export const metadata: Metadata = {
  alternates: { canonical: "/cerez-politikasi" },
  title: "Çerez Politikası",
  description: "VibeGuide web sitesinde kullanılan çerezler ve çerez tercihleri hakkında bilgilendirme.",
};

export default function CookiePolicyPage() {
  return <CerezView />;
}
