import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up as Traveler",
  description: "Create a traveler account on VibeGuide and start discovering Türkiye with verified local guides.",
  alternates: { canonical: "/register/tourist" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
