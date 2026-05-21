import type { Metadata } from "next";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export const metadata: Metadata = {
  title: "Admin · VibeGuide",
  description: "Internal admin tools — translation editor, content management.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthGuard>{children}</AdminAuthGuard>;
}
