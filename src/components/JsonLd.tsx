/**
 * Structured data — JSON-LD for Google rich results.
 * Three schemas in one bundle: Organization, WebSite, MobileApplication.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.vibeguideapp.com/#org",
        name: "VibeGuide",
        url: "https://www.vibeguideapp.com",
        logo: "https://www.vibeguideapp.com/icon.png",
        sameAs: [
          "https://github.com/Sercanoz/vibeguide-web",
        ],
        description:
          "VibeGuide matches travelers with real local guides in 60 seconds. Solo with VibeNow ⚡, in groups with VibeSquad ✨.",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.vibeguideapp.com/#website",
        url: "https://www.vibeguideapp.com",
        name: "VibeGuide",
        publisher: { "@id": "https://www.vibeguideapp.com/#org" },
        inLanguage: "en-US",
      },
      {
        "@type": "MobileApplication",
        "@id": "https://www.vibeguideapp.com/#app",
        name: "VibeGuide",
        operatingSystem: "iOS, Android",
        applicationCategory: "TravelApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "50000",
          bestRating: "5",
          worstRating: "1",
        },
        description:
          "Find a local tour guide in any city. VibeNow for instant 1-on-1 matches, VibeSquad for cheaper group tours.",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
