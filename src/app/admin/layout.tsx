import type { Metadata } from "next";
import AdminAuthGuard from "@/components/AdminAuthGuard";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · VibeGuide",
  description: "Internal admin tools — translation editor, content management.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-[#F7F7FB]">
        <AdminSidebar />
        <main className="flex-1 ml-56 min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminAuthGuard>
  );
}
