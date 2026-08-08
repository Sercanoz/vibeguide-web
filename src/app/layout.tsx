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
    "Book verified local guides in Turkey — Istanbul, Cappadocia, Ephesus and more. Instant matches, group experiences and private tours, without the tourist traps.",
  // Odaklı liste — hashtag/keyword-stuffing kaldırıldı (Google keywords meta'yı
  // yok sayar; spam sinyali olmasın). 8 şehir + öz niyetler.
  keywords: [
    "VibeGuide",
    "Turkey tour guide",
    "licensed local guide Turkey",
    "private tour Turkey",
    "Istanbul tour guide",
    "Cappadocia tour guide",
    "Ephesus tour guide",
    "Antalya tour guide",
    "İzmir tour guide",
    "Bodrum tour guide",
    "Kuşadası tour guide",
    "Marmaris tour guide",
    "Pamukkale tour",
    "day trip Turkey",
    "shore excursion Turkey",
    "book a local guide",
    "VibeNow",
    "VibeSquad",
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
  // SEO: layout artık headers() OKUMUYOR → tüm site statik/ISR render edilir
  // (CDN cache, hızlı crawl → indeksleme). Inline script'ler /vg-init.js'e taşındı
  // (CSP nonce'a gerek kalmadı). <html lang> statik "en"; dil hedeflemesi hreflang
  // ile yapılıyor (21 dil, her sayfada + sitemap'te) — Google için asıl sinyal o.
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <JsonLd />
        {/* gtag consent+init + auth-flash: statik dosya, script-src 'self' ile izinli.
            Blocking (head, async değil) → auth-flash paint öncesi çalışır. */}
        <script src="/vg-init.js" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SH98TTW4KS" />
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
