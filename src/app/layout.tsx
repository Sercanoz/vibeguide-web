import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import CookieBanner from "@/components/CookieBanner";
import EmailCaptureGate from "@/components/EmailCaptureGate";
import { CITY_GUIDE_LANGS } from "@/lib/cityGuides";
import { ATTRACTION_LANGS } from "@/lib/attractions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Pathname'den <html lang> türet — dilli sayfalar (/de/istanbul-tour-guide,
// /attractions/ru/hagia-sophia, Türkçe yasal sayfalar) doğru dil sinyali
// versin. Middleware x-pathname header'ını sağlar.
// Kaynak dizilerden türet — elle liste tutma, drift etmesin. EN kökte sunulur,
// diğer tüm şehir-guide dilleri /<lang>/ prefix'idir; mekan dilleri (el dâhil) 11.
const CITY_LANG_PREFIXES = new Set<string>(
  CITY_GUIDE_LANGS.filter((l) => l !== "en"),
);
const ATTRACTION_LANG_CODES = new Set<string>(ATTRACTION_LANGS);
const TURKISH_ROOT_PAGES = new Set([
  "kvkk", "cerez-politikasi", "mesafeli-satis", "on-bilgilendirme",
]);

function langFromPathname(pathname: string): string {
  const seg = pathname.split("/").filter(Boolean);
  if (seg[0] === "attractions" && seg[1] && ATTRACTION_LANG_CODES.has(seg[1])) {
    return seg[1];
  }
  if (seg[0] && CITY_LANG_PREFIXES.has(seg[0])) return seg[0];
  if (seg[0] && TURKISH_ROOT_PAGES.has(seg[0])) return "tr";
  return "en";
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vibeguideapp.com"),
  title: {
    default: "VibeGuide — Find your vibe. Live the city.",
    template: "%s · VibeGuide",
  },
  description:
    "Discover Istanbul, Cappadocia and Ephesus with verified local guides. Instant guides, social group experiences and private tours in Turkey — without tourist traps, confusion or boring scripts.",
  keywords: [
    "VibeGuide",
    "Istanbul tours",
    "Istanbul private tour",
    "Istanbul walking tour",
    "guide in Istanbul",
    "local guide Istanbul",
    "Istanbul tour guide",
    "private guide Istanbul",
    "instant guide Istanbul",
    "Old Istanbul tour",
    "Hagia Sophia tour",
    "Topkapi Palace tour",
    "Blue Mosque tour",
    "Grand Bazaar tour",
    "Bosphorus tour",
    "Galata tour",
    "Balat tour",
    "Sultanahmet tour",
    "Cappadocia tours",
    "Cappadocia guide",
    "Cappadocia private tour",
    "Cappadocia hot air balloon tour",
    "Ephesus tours",
    "Ephesus guide",
    "Ephesus private tour",
    "Pamukkale tour",
    "Antalya tours",
    "Turkey tours",
    "Turkey travel guide",
    "licensed tourist guide Turkey",
    "Turkey private tour",
    "Turkey walking tour",
    "city tours Turkey",
    "private tours",
    "group tours",
    "walking tour",
    "instant guide booking",
    "local tour guide",
    "local guide app",
    "book a tour guide",
    "find a guide nearby",
    "travel app Turkey",
    "VibeNow",
    "VibeSquad",
    "#istanbultours",
    "#guideinistanbul",
    "#turkeytour",
    "#oldistanbultour",
    "#privatetour",
    "#cappadociatours",
    "#ephesustours",
  ],
  // Canonical = "/" (ana sayfa). Alt sayfalar kendi alternates.canonical'ını
  // metadata/layout'ta tanımlar → Next.js en yakın canonical'ı kullanır, bunu override eder.
  // Eskiden burada absolute ana-sayfa canonical'ı + languages vardı → her sayfa onu miras
  // alıp "ana sayfanın kopyası" görünüyordu (Google dizine eklemiyordu). Düzeltildi.
  alternates: { canonical: "/" },
  openGraph: {
    title: "VibeGuide — Find your vibe. Live the city.",
    description:
      "Verified local guides, instant matching, group experiences and private tours in Istanbul, Cappadocia and Ephesus. Real local connection, no tourist traps.",
    url: "https://www.vibeguideapp.com",
    siteName: "VibeGuide",
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VibeGuide — Local tour guides in Turkey" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeGuide — Find your vibe. Live the city.",
    description:
      "Verified local guides for Istanbul, Cappadocia and Ephesus. Instant, group or private tours in Turkey.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#6c4cf1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // CSP nonce — middleware'in ürettiği nonce'u inline script'lere geçir.
  const h = await headers();
  const nonce = h.get("x-nonce") ?? undefined;
  const lang = langFromPathname(h.get("x-pathname") ?? "/");
  // Not: dir attribute'u bilinçli olarak html'e konmadı — Arapça sayfalarda
  // RTL yönü CityGuideView/attraction sayfaları kendi <main>'inde yönetiyor;
  // html'e koymak Navbar/footer'ı da çevirirdi.
  return (
    <html lang={lang} className={`${inter.variable} h-full antialiased`}>
      <head>
        <JsonLd nonce={nonce} />
        <script async nonce={nonce} src="https://www.googletagmanager.com/gtag/js?id=G-SH98TTW4KS" />
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
          gtag('js', new Date());
          gtag('config', 'G-SH98TTW4KS');
          var c = localStorage.getItem('vg_cookie_consent');
          if (c === 'accepted') gtag('consent', 'update', { analytics_storage: 'granted' });
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-vg-ink">
        <LanguageProvider>
          <CurrencyProvider>
            {children}
            <CookieBanner />
            <EmailCaptureGate />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
