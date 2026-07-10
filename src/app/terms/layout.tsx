import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "VibeGuide terms of service governing use of the platform, bookings and payments.",
  alternates: { canonical: "/terms" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
