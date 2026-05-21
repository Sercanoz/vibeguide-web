"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/firebase-client";
import Image from "next/image";

export default function AdminLogin() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onGoogle = async () => {
    setBusy(true);
    setErr(null);
    try {
      await signInWithGoogle();
      // AdminAuthGuard will redirect
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-vg-bg-soft px-5">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl border border-vg-border p-8">
        <div className="flex items-center gap-2.5">
          <Image
            src="/app-icon.png"
            alt="VibeGuide"
            width={36}
            height={36}
            className="rounded-xl shadow-md shadow-purple-500/20"
          />
          <span className="font-black text-xl text-vibe-gradient">VibeGuide</span>
          <span className="text-vg-muted font-normal">/ admin</span>
        </div>
        <h1 className="mt-6 text-2xl font-black text-vg-ink">Sign in</h1>
        <p className="mt-1 text-sm text-vg-muted">
          Internal admin tools. Your account must have admin role.
        </p>

        <button
          onClick={onGoogle}
          disabled={busy}
          className="mt-6 w-full bg-vibe-gradient text-white font-black py-3 rounded-2xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Continue with Google"}
        </button>

        {err && (
          <p className="mt-4 text-sm text-vg-flame text-center">{err}</p>
        )}
      </div>
    </div>
  );
}
