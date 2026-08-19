import type { Metadata } from "next";
import OnBilgilendirmeView from "./OnBilgilendirmeView";

export const metadata: Metadata = {
  alternates: { canonical: "/on-bilgilendirme" },
  // İçerik İngilizce — başlık/description da İngilizce olmalı.
  title: "Pre-Information Form",
  description:
    "Pre-information form under Turkish Consumer Protection Law No. 6502 and the Distance Contracts Regulation.",
};

export default function OnBilgilendirmePage() {
  return <OnBilgilendirmeView />;
}
