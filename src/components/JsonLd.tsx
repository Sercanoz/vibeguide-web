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
        sameAs: [],
        description:
          "VibeGuide connects travelers with verified local guides for instant tours, group experiences and private tours in Istanbul, Cappadocia and Ephesus.",
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
        description:
          "Discover Istanbul, Cappadocia and Ephesus with verified local guides. VibeNow for instant matching, VibeSquad for group experiences, Private Tours for planned days.",
      },
      {
        "@type": "TouristTrip",
        "@id": "https://www.vibeguideapp.com/#istanbul-tours",
        name: "Istanbul Tours with Local Guides",
        description:
          "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus, Balat, Galata and Old Istanbul walking tours with verified local guides.",
        touristType: ["Solo travelers", "Couples", "Families", "Groups"],
        itinerary: {
          "@type": "ItemList",
          itemListElement: [
            { "@type": "City", name: "Istanbul" },
            { "@type": "City", name: "Cappadocia" },
            { "@type": "City", name: "Ephesus" },
          ],
        },
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
