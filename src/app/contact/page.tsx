import type { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: "Contact VibeGuide for reservations, support, cancellations, refunds or guide applications.",
};

export default function ContactPage() {
  return <ContactView />;
}
