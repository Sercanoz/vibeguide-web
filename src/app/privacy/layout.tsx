import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VibeGuide",
  description: "How VibeGuide collects, uses and protects your personal data. KVKK & GDPR compliant.",
  alternates: { canonical: "/privacy" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
