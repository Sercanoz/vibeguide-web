/**
 * Structured data — JSON-LD for Google rich results.
 * Three schemas in one bundle: Organization, WebSite, MobileApplication.
 */
import { jsonLdScript } from "@/lib/jsonld";

export default function JsonLd({ nonce }: { nonce?: string }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.vibeguideapp.com/#org",
        name: "VibeGuide",
        url: "https://www.vibeguideapp.com",
        // Google logo rich result ≥112×112 ister — 32px favicon değil.
        logo: "https://www.vibeguideapp.com/vibeguide-icon.png",
        // sameAs: sosyal hesaplar açılınca eklenecek (boş array göndermek yerine
        // alanı tamamen kaldırdık).
        description:
          "VibeGuide connects travelers with verified local guides for instant tours, group experiences and private tours across Turkey — Istanbul, Cappadocia, Ephesus, Antalya, İzmir, Bodrum, Kuşadası and Marmaris.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@vibeguideapp.com",
          telephone: "+905308287696",
          availableLanguage: ["en", "tr"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4",
          addressLocality: "Marmaris",
          addressRegion: "Muğla",
          addressCountry: "TR",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.vibeguideapp.com/#website",
        url: "https://www.vibeguideapp.com",
        name: "VibeGuide",
        publisher: { "@id": "https://www.vibeguideapp.com/#org" },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://www.vibeguideapp.com/tours?city={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
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
          priceCurrency: "TRY",
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
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
