import type { Metadata } from "next";
import SecurityView from "./SecurityView";

export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Güvenlik ve Ödemeler | VibeGuide",
  description: "VibeGuide; SSL korumalı platform, kayıtlı Türk şirketi, lisanslı turizm operasyonları, güvenli ödeme altyapısı ve şeffaf fiyatlandırma sunar.",
};

export default function SecurityPage() {
  return <SecurityView />;
}
