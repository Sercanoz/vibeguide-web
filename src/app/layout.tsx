import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vibeguideapp.com"),
  title: {
    default: "VibeGuide — Find Your Local Guide. In Minutes.",
    template: "%s · VibeGuide",
  },
  description:
    "Tour any city with a real local guide — instantly, or with your crew. VibeNow ⚡ matches you 1-on-1 in seconds. VibeSquad ✨ groups travelers for the best price.",
  keywords: [
    "local tour guide",
    "private tours",
    "instant guide booking",
    "group tours",
    "travel app",
    "Istanbul tours",
    "city tours",
    "VibeGuide",
  ],
  openGraph: {
    title: "VibeGuide — Tour the world, with a local.",
    description:
      "Tap. Match. Go. Or roll deep with a squad and pay less. Real guides. Real moments. One app.",
    url: "https://www.vibeguideapp.com",
    siteName: "VibeGuide",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeGuide — Tour the world, with a local.",
    description:
      "Tap. Match. Go. Or roll deep with a squad and pay less. Real guides. Real moments.",
  },
  robots: { index: true, follow: true },
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
      <body className="min-h-full flex flex-col bg-white text-vg-ink">
        {children}
      </body>
    </html>
  );
}
