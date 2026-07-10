import type { Metadata } from "next";
import AboutView from "./AboutView";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About VibeGuide",
  description: "VibeGuide is a digital tourism platform connecting travelers with verified local guides and tourism professionals across Turkey.",
};

export default function AboutPage() {
  return <AboutView />;
}
