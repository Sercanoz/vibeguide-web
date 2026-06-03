import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | VibeGuide",
  description: "Create your VibeGuide account — explore tours or become a verified local guide.",
  alternates: { canonical: "/register" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
