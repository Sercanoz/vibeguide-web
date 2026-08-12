import type { Metadata } from "next";

// Firebase auth action handler (sifre sifirlama / e-posta dogrulama).
// Tek kullanimlik oobCode ile calisir — dizine eklenmemeli, cache'lenmemeli.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
