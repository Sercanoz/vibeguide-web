import type { Metadata } from "next";
import MesafeliSatisView from "./MesafeliSatisView";

export const metadata: Metadata = {
  alternates: { canonical: "/mesafeli-satis" },
  // Sayfa içeriği İngilizce; başlık/description da İngilizce olmalı
  // (tarayıcı sekmesi ve arama sonucu Türkçe görünüyordu).
  title: "Distance Sales Agreement",
  description:
    "VibeGuide distance sales agreement, prepared under Turkish Consumer Protection Law No. 6502.",
};

export default function MesafeliSatisPage() {
  return <MesafeliSatisView />;
}
