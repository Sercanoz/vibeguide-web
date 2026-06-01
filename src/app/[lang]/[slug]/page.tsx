import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CityGuideView from "@/components/CityGuideView";
import {
  getCityGuide,
  buildCityGuideMetadata,
  isCityGuideLang,
  allCityGuideParams,
} from "@/lib/cityGuides";

type Props = { params: Promise<{ lang: string; slug: string }> };

// Pre-render only known lang×city combos; anything else 404s.
export function generateStaticParams() {
  return allCityGuideParams();
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = getCityGuide(slug);
  if (!guide || !isCityGuideLang(lang) || lang === "en") return {};
  return buildCityGuideMetadata(guide, lang);
}

export default async function LocalizedCityGuidePage({ params }: Props) {
  const { lang, slug } = await params;
  const guide = getCityGuide(slug);
  // en is served by the root static pages — never here.
  if (!guide || !isCityGuideLang(lang) || lang === "en") notFound();
  return <CityGuideView guide={guide} lang={lang} />;
}
