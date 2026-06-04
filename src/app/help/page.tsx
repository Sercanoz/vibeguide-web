import type { Metadata } from "next";
import HelpView from "./HelpView";

export const metadata: Metadata = {
  alternates: { canonical: "/help" },
  title: "Yardım Merkezi | VibeGuide",
  description: "VibeGuide Yardım Merkezi — rezervasyonlar, ödemeler, rehberler, iptaller, hesap yönetimi ve güvenlik hakkında sık sorulan sorular.",
};

export default function HelpPage() {
  return <HelpView />;
}
