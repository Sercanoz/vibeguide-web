import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Deletion",
  description: "Request deletion of your VibeGuide account and personal data.",
  alternates: { canonical: "/account-deletion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
