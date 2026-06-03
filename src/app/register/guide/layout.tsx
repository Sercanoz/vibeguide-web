import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Guide | VibeGuide",
  description: "Apply to become a verified local guide on VibeGuide.",
  alternates: { canonical: "/register/guide" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
