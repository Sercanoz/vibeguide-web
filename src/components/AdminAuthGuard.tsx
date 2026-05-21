"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fbAuth, onIdTokenChanged, signOut, type User } from "@/lib/firebase-client";
import Link from "next/link";
import Image from "next/image";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null | "loading">("loading");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onIdTokenChanged(fbAuth(), (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user === "loading") return;
    if (!user && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else if (user && pathname === "/admin/login") {
      router.replace("/admin");
    }
  }, [user, pathname, router]);

  if (user === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vg-bg-soft">
        <div className="text-vg-muted text-sm">Loading…</div>
      </div>
    );
  }

  // login route is public
  if (pathname === "/admin/login") return <>{children}</>;

  // every other route requires a signed-in user
  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-vg-bg-soft">
      <header className="sticky top-0 z-40 bg-white border-b border-vg-border">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Image
              src="/app-icon.png"
              alt="VibeGuide"
              width={28}
              height={28}
              className="rounded-lg shadow"
            />
            <span className="font-black text-base text-vg-ink">
              VibeGuide <span className="text-vg-muted font-normal">/ admin</span>
            </span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link
              href="/admin/tours"
              className={`text-sm font-bold ${
                pathname?.startsWith("/admin/tours")
                  ? "text-vg-primary"
                  : "text-vg-muted hover:text-vg-ink"
              }`}
            >
              Tours
            </Link>
            <Link
              href="/admin/guides"
              className={`text-sm font-bold ${
                pathname?.startsWith("/admin/guides")
                  ? "text-vg-primary"
                  : "text-vg-muted hover:text-vg-ink"
              }`}
            >
              Guides
            </Link>
            <span className="text-xs text-vg-muted hidden md:inline">
              {user.email}
            </span>
            <button
              onClick={async () => {
                await signOut();
              }}
              className="text-xs font-bold text-vg-flame hover:underline"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
