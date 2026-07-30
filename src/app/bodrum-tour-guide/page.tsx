import type { Metadata } from "next";
import CityGuideView from "@/components/CityGuideView";
import { getCityGuide, buildCityGuideMetadata } from "@/lib/cityGuides";

const guide = getCityGuide("bodrum-tour-guide")!;

export const metadata: Metadata = buildCityGuideMetadata(guide, "en");

export default function BodrumTourGuidePage() {
  return <CityGuideView guide={guide} lang="en" />;
}
