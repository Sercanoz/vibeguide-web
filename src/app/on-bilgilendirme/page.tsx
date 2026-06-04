import type { Metadata } from "next";
import OnBilgilendirmeView from "./OnBilgilendirmeView";

export const metadata: Metadata = {
  alternates: { canonical: "/on-bilgilendirme" },
  title: "Ön Bilgilendirme Formu | VibeGuide",
  description: "6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında ön bilgilendirme formu.",
};

export default function OnBilgilendirmePage() {
  return <OnBilgilendirmeView />;
}
