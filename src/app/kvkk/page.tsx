import type { Metadata } from "next";
import KvkkView from "./KvkkView";

export const metadata: Metadata = {
  alternates: { canonical: "/kvkk" },
  title: "KVKK Aydınlatma Metni | VibeGuide",
  description: "VibeGuide kişisel verilerin korunması (KVKK 6698) aydınlatma metni.",
};

export default function KvkkPage() {
  return <KvkkView />;
}
