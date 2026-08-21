import type { Metadata } from "next";
import PoolDetailClient from "./PoolDetailClient";

// Havuzlar kısa ömürlü ve kişiye özel durum içeriyor — dizine ekleme.
export const metadata: Metadata = {
  title: "Group tour",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PoolDetailClient />;
}
