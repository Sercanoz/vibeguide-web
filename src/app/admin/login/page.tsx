"use client";

import { useState } from "react";
import { signInWithGoogle, signInWithEmail } from "@/lib/firebase-client";
import Image from "next/image";

export default function AdminLogin() {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setErr(null);
    try {
      await fn();
      // AdminAuthGuard will redirect
    } catch (e: unknown) {
      const msg = (e as { message?: string })?.message ?? "Sign in failed";
      setErr(msg.replace("Firebase: ", "").replace(/ \(auth\/.*\)\.?/, ""));
    } finally {
      setBusy(false);
    }
  };

  const onEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    handle(() => signInWithEmail(email.trim(), password));
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

        {/* Email / password form */}
        <form onSubmit={onEmailSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
          />
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-vibe-gradient text-white font-black py-3 rounded-2xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-vg-border" />
          <span className="text-xs text-vg-muted">or</span>
          <div className="flex-1 h-px bg-vg-border" />
        </div>

        {/* Google */}
        <button
          onClick={() => handle(signInWithGoogle)}
          disabled={busy}
          className="w-full flex items-center justify-center gap-2 bg-white border border-vg-border text-vg-ink font-bold py-3 rounded-2xl hover:bg-vg-bg-soft transition-colors disabled:opacity-50"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.9 6.1C12.8 13.1 17.9 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17z" />
            <path fill="#FBBC05" d="M10.9 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6L2.4 13.3A24 24 0 0 0 0 24c0 3.8.9 7.4 2.4 10.7l8.5-6.1z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.1 0-11.2-3.6-13.1-9l-7.9 6.1C6.9 42.6 14.8 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        {err && (
          <p className="mt-4 text-sm text-vg-flame text-center">{err}</p>
        )}
      </div>
    </div>
  );
}
