import type { Metadata } from "next";
import MesafeliSatisView from "./MesafeliSatisView";

export const metadata: Metadata = {
  alternates: { canonical: "/mesafeli-satis" },
  title: "Mesafeli Satış Sözleşmesi",
  description: "VibeGuide mesafeli satış sözleşmesi — 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında.",
};

export default function MesafeliSatisPage() {
  return <MesafeliSatisView />;
}
