import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import CookieBanner from "@/components/CookieBanner";
import EmailCaptureGate from "@/components/EmailCaptureGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // lang sabit "en": middleware'e (headers) bağımlılık kalkınca tüm statik sayfalar
  // tekrar statik + cache'lenebilir olur → Google rahat tarar, site hızlanır.
  // Çok dilli /[lang]/ sayfaları içeriği + hreflang ile dil sinyalini zaten veriyor.
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <JsonLd />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SH98TTW4KS" />
        <script dangerouslySetInnerHTML={{ __html: `
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
