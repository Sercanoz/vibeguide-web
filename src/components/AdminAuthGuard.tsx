"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fbAuth, onIdTokenChanged, signOut, buildAuthHeaders, type User } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";

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
        // Email must be verified, and force-refresh the token so a revoked
        // session is caught immediately (backend also re-checks with checkRevoked).
        if (!u.emailVerified) { setAuthState("unauthorized"); return; }
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: await buildAuthHeaders({ forceRefresh: true }),
          cache: "no-store",
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

  return <>{children}</>;
}
