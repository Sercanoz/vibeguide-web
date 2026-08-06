"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle, fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { useRedirectIfAuthed } from "@/hooks/useRedirectIfAuthed";

export default function LoginPage() {
  const router = useRouter();
  const checking = useRedirectIfAuthed();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);

  async function onForgotPassword() {
    setError(null);
    setResetMsg(null);
    if (!email.trim()) {
      setError("Enter your email above first, then tap Forgot password.");
      return;
    }
    try {
      const { sendPasswordResetEmail } = await import("firebase/auth");
      await sendPasswordResetEmail(fbAuth(), email.trim());
      // Kullanıcı numaralandırmasını önlemek için hesap var/yok ayrımı yapma.
      setResetMsg("If an account exists for that email, a reset link is on its way.");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/invalid-email") setError("That doesn't look like a valid email.");
      else if (code === "auth/too-many-requests") setError("Too many attempts. Please try again later.");
      else setResetMsg("If an account exists for that email, a reset link is on its way.");
    }
  }

  async function handleAfterLogin() {
    const user = fbAuth().currentUser;
    if (!user) return;
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: await buildAuthHeaders(),
    });
    if (res.status === 404) {
      // Firebase'de var ama DB'de yok → kayıt seçimine yönlendir
      router.push("/register");
      return;
    }
    if (res.ok) {
      const me = await res.json();
      if (me.role === "Admin") router.push("/admin/tours");
      else if (me.role === "PendingGuide") router.push("/guide/pending");
      else router.push("/");
      return;
    }
    router.push("/");
  }

  async function onEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      await handleAfterLogin();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found")
        setError("Incorrect email or password.");
      else if (code === "auth/too-many-requests")
        setError("Too many attempts. Please try again later.");
      else
        setError("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      await handleAfterLogin();
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#6C4CF1] border-t-transparent animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#6C4CF1]/6 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2.5 text-xl font-black text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
          <p className="mt-6 text-3xl font-black text-[#0A0A0F]">Welcome back</p>
          <p className="mt-1 text-sm text-neutral-800">Sign in to continue your adventure</p>
        </div>

        <div className="bg-white border border-black/[0.06] rounded-3xl p-8 shadow-sm">
          {/* Google */}
          <button
            onClick={onGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-black/10 rounded-2xl px-5 py-3 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-black/[0.06]" />
            <span className="text-xs text-neutral-800 font-medium">or</span>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>

          {/* Email form */}
          <form onSubmit={onEmailLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-700 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-700 mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
              style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-neutral-800">
            <button type="button" onClick={onForgotPassword} className="text-[#6C4CF1] font-semibold hover:underline">Forgot password?</button>
          </p>
          {resetMsg && (
            <p className="mt-2 text-center text-xs text-emerald-700">{resetMsg}</p>
          )}
        </div>

        <p className="mt-5 text-center text-sm text-neutral-800">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-[#6C4CF1] font-bold hover:underline">Create account</a>
        </p>
      </div>
    </main>
  );
}
