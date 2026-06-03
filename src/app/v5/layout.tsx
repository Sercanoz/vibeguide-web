import type { Metadata } from "next";

// Bu sayfa Google'da dizine eklenmesin (auth / ozel / test sayfasi).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
