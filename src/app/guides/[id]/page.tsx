import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/api";
import GuideProfileClient, { type GuideProfile } from "./GuideProfileClient";

// Halka açık rehber profili. Veri: GET /api/guides/{id}/profile (AllowAnonymous, PII yok).
// Backend yalnız onaylı+aktif rehberi döndürür (onay bekleyen → 404), turist adları maskeli.
// Site haritasında: sitemap.ts → /api/guides/directory.
export const revalidate = 600;

async function getProfile(id: string): Promise<GuideProfile | null> {
  if (!/^\d+$/.test(id)) return null;
  try {
    const res = await serverFetch(`/api/guides/${id}/profile?locale=en`, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    return (await res.json()) as GuideProfile;
  } catch {
    return null;
  }
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const g = await getProfile(id);
  if (!g) return { robots: { index: false } };
  const title = `${g.fullName} — Licensed tour guide${g.city ? ` in ${g.city}` : ""}`;
  const description = g.bio ? (g.bio.length > 155 ? `${g.bio.slice(0, 155)}…` : g.bio) : `Meet ${g.fullName}, a licensed local guide on VibeGuide.`;
  return {
    title,
    description,
    openGraph: { title, description, images: g.photoUrl ? [{ url: g.photoUrl }] : undefined },
  };
}

export default async function GuideProfilePage({ params }: Props) {
  const { id } = await params;
  const profile = await getProfile(id);
  if (!profile) notFound();
  return <GuideProfileClient id={id} initial={profile} />;
}
