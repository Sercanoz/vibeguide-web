import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | VibeGuide",
  description: "VibeGuide help center — how VibeNow, VibeSquad and private tours work, payments, cancellations and safety.",
  alternates: { canonical: "/help" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
