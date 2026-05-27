"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fbAuth, onIdTokenChanged, signOut, type User } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

type AuthState = "loading" | "unauthenticated" | "unauthorized" | User;

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onIdTokenChanged(fbAuth(), async (u) => {
      if (!u) {
        setAuthState("unauthenticated");
        return;
      }
      try {
        const token = await u.getIdToken();
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) { setAuthState("unauthorized"); return; }
        const me = await res.json();
        const isAdmin = me.role === "Admin";
        setAuthState(isAdmin ? u : "unauthorized");
      } catch {
        setAuthState("unauthorized");
      }
    });
    return () => unsub();
  }, []);

  const user = authState instanceof Object && authState !== null && typeof authState !== "string"
    ? (authState as User)
    : null;

  useEffect(() => {
    if (authState === "loading") return;
    if (authState === "unauthenticated" && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else if (authState === "unauthorized" && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else if (user && pathname === "/admin/login") {
      router.replace("/admin");
    }
  }, [authState, pathname, router, user]);

  if (authState === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vg-bg-soft">
        <div className="text-vg-muted text-sm">Loading…</div>
      </div>
    );
  }

  // login route is public
  if (pathname === "/admin/login") return <>{children}</>;

  // unauthorized: signed in but not admin
  if (authState === "unauthorized") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-vg-bg-soft">
        <div className="text-center">
          <p className="text-vg-ink font-bold text-lg">Access denied</p>
          <p className="text-vg-muted text-sm mt-1">Your account does not have admin privileges.</p>
          <button
            onClick={() => signOut()}
            className="mt-4 text-sm font-bold text-vg-flame hover:underline"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // every other route requires a signed-in admin
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
            <Link
              href="/admin/disputes"
              className={`text-sm font-bold ${
                pathname?.startsWith("/admin/disputes")
                  ? "text-vg-primary"
                  : "text-vg-muted hover:text-vg-ink"
              }`}
            >
              Disputes
            </Link>
            <Link
              href="/admin/analytics"
              className={`text-sm font-bold ${
                pathname?.startsWith("/admin/analytics")
                  ? "text-vg-primary"
                  : "text-vg-muted hover:text-vg-ink"
              }`}
            >
              Analytics
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
