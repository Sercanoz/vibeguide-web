import type { Metadata } from "next";
import AboutView from "./AboutView";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "VibeGuide Hakkında | VibeGuide",
  description: "VibeGuide, gezginleri Türkiye genelindeki doğrulanmış yerel rehberler ve turizm profesyonelleriyle buluşturan dijital bir turizm platformudur.",
};

export default function AboutPage() {
  return <AboutView />;
}
