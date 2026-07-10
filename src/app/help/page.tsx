import type { Metadata } from "next";
import JsonLdScript from "@/components/JsonLdScript";
import HelpView from "./HelpView";

export const metadata: Metadata = {
  alternates: { canonical: "/help" },
  title: "Help Center",
  description: "VibeGuide Help Center — frequently asked questions about bookings, payments, guides, cancellations, account management and safety.",
};

// FAQPage rich result — sayfadaki EN içerikten derlenmiş özet Q&A seti.
// (Mode/city/attraction sayfalarında FAQPage zaten var; help eksikti.)
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is VibeGuide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VibeGuide is a digital tourism platform that connects travelers with verified local guides in Turkey. It offers VibeNow for instant guide matching, VibeSquad for shared group experiences, and Private Tours for planned days.",
      },
    },
    {
      "@type": "Question",
      name: "How does VibeNow work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open the app, select a nearby experience and send a request. The system instantly notifies available verified guides; when one accepts, you receive the guide's details and the meeting point, then meet your guide and start the experience.",
      },
    },
    {
      "@type": "Question",
      name: "Are VibeGuide guides verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. VibeGuide works with verified local guides and, where required by Turkish legislation, licensed tourist guides. Verification may include official identity verification, license and badge checks, selfie verification, language-proficiency review and experience assessment.",
      },
    },
    {
      "@type": "Question",
      name: "How do payments work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All payments are processed securely through the platform via licensed payment institutions. Direct payments between travelers and guides outside the platform are not allowed.",
      },
    },
    {
      "@type": "Question",
      name: "Can I cancel my booking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, bookings can be cancelled subject to the published Cancellation & Refund Policy. Refund eligibility depends on the experience type and how far in advance you cancel.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if my guide cancels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If a guide cancels, VibeGuide's support process steps in. Depending on the situation you may be offered an alternative guide, an alternative date, an alternative experience or a refund.",
      },
    },
    {
      "@type": "Question",
      name: "Is my personal information safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VibeGuide processes personal data in accordance with its Privacy Policy and applicable data protection legislation, including KVKK and GDPR. Payment card details are handled by licensed payment institutions, not stored by VibeGuide.",
      },
    },
    {
      "@type": "Question",
      name: "Can I delete my account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can permanently delete your VibeGuide account from within the app or by contacting support at support@vibeguideapp.com.",
      },
    },
  ],
};

export default function HelpPage() {
  return (
    <>
      <JsonLdScript data={FAQ_JSON_LD} />
      <HelpView />
    </>
  );
}
