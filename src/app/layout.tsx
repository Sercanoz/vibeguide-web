import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { LanguageProvider } from "@/components/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vibeguideapp.com"),
  title: {
    default: "VibeGuide — Don't Just Visit Istanbul. Enter It.",
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
  alternates: {
    canonical: "https://www.vibeguideapp.com",
  },
  openGraph: {
    title: "VibeGuide — Don't Just Visit Istanbul. Enter It.",
    description:
      "Verified local guides, instant matching, group experiences and private tours in Istanbul, Cappadocia and Ephesus. Real local connection, no tourist traps.",
    url: "https://www.vibeguideapp.com",
    siteName: "VibeGuide",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeGuide — Don't Just Visit Istanbul. Enter It.",
    description:
      "Verified local guides for Istanbul, Cappadocia and Ephesus. Instant, group or private tours in Turkey.",
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
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <JsonLd />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-vg-ink">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
