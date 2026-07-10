import type { Metadata } from "next";

// Checkout sayfası dizine eklenmesin (kullanıcıya özel akış).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
