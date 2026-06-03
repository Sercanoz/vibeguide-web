import type { Metadata } from "next";

// /tours bir client component → kendi metadata'sı olamaz. Bu layout, /tours ve
// tüm filtre varyantlarını (?category=food, ?city=istanbul ...) TEK bir canonical'a
// (/tours) toplar → duplicate content önlenir, /tours doğru sayfa olarak değerlenir
// (yoksa kök layout'un canonical'ını = ana sayfayı miras alıyordu).
export const metadata: Metadata = {
  title: "All Tours & Experiences | VibeGuide",
  description:
    "Browse verified local guides and curated tours across Türkiye — Istanbul, Cappadocia, Ephesus and more. Filter by interest, city and language.",
  alternates: {
    canonical: "https://www.vibeguideapp.com/tours",
  },
};

export default function ToursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
