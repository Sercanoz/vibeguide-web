import type { Metadata } from "next";
import CityGuideView from "@/components/CityGuideView";
import { getCityGuide, buildCityGuideMetadata } from "@/lib/cityGuides";

const guide = getCityGuide("istanbul-tour-guide")!;

export const metadata: Metadata = buildCityGuideMetadata(guide, "en");

export default function IstanbulTourGuidePage() {
  return <CityGuideView guide={guide} lang="en" />;
}
