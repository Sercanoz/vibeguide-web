import type { Metadata } from "next";
import { serverFetch } from "@/lib/api";
import GuidesDirectoryClient, { type DirectoryGuide } from "./GuidesDirectoryClient";

// Halka açık rehber dizini. Veri: GET /api/guides/directory (AllowAnonymous,
// yalnız onaylı + aktif rehber, PII yok). Şehir/dil filtresi istemcide.
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/guides" },
  title: "Licensed Tour Guides in Türkiye",
  description:
    "Browse verified, licensed local tour guides in Istanbul, Cappadocia, Ephesus and across Türkiye. Filter by city and language, read reviews and book your guide.",
};

async function getGuides(): Promise<DirectoryGuide[]> {
  try {
    const res = await serverFetch(`/api/guides/directory?limit=200`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return (await res.json()) as DirectoryGuide[];
  } catch {
    return [];
  }
}

export default async function GuidesPage() {
  const guides = await getGuides();
  return <GuidesDirectoryClient guides={guides} />;
}
