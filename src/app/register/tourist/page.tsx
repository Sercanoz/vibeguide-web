"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerWithEmail, signInWithGoogle, fbAuth } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { useRedirectIfAuthed } from "@/hooks/useRedirectIfAuthed";

export default function RegisterTouristPage() {
  const router = useRouter();
  const checking = useRedirectIfAuthed();

  const [step, setStep] = useState<"form" | "verify">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function registerOnBackend() {
    const user = fbAuth().currentUser;
    if (!user) throw new Error("No Firebase user");
    await user.reload();
    const token = await user.getIdToken(true);
    const res = await fetch(`${API_BASE_URL}/api/auth/register-tourist`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        fullName: fullName.trim(),
      }),
    });
    if (res.status === 409) {
      const d = await res.json();
      if (d.error === "already_registered") {
        router.push("/");
        return;
      }
      throw new Error(d.message ?? "Already registered.");
    }
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.message ?? "Registration failed.");
    }
    router.push("/");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== password2) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      const user = fbAuth().currentUser;
      if (user) {
        const token = await user.getIdToken();
        await fetch(`${API_BASE_URL}/api/auth/send-verification`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setStep("verify");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/email-already-in-use") setError("This email is already registered. Sign in instead.");
      else if (code === "auth/invalid-email") setError("Invalid email address.");
      else if (code === "auth/weak-password") setError("Password is too weak.");
      else setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function onVerifyDone() {
    setError(null);
    setLoading(true);
    try {
      await registerOnBackend();
    } catch (err: unknown) {
      const msg = (err as Error).message ?? "";
      if (msg.includes("email_not_verified") || msg.includes("not verified")) {
        setError("Please verify your email first — check your inbox.");
      } else {
        setError(msg || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      await registerOnBackend();
    } catch (err: unknown) {
      setError((err as Error).message || "Google sign-up failed.");
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

  if (step === "verify") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#6C4CF1]/6 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="relative w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[#6C4CF1]/10 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-[#0A0A0F]">Check your email</h1>
          <p className="mt-2 text-sm text-neutral-700 max-w-xs mx-auto leading-6">
            We sent a verification link to <strong className="text-[#0A0A0F]">{email}</strong>. Click the link then come back here.
          </p>
          {error && (
            <div className="mt-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-medium">
              {error}
            </div>
          )}
          <button
            onClick={onVerifyDone}
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
            style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}
          >
            {loading ? "Checking…" : "I verified my email →"}
          </button>
          <p className="mt-3 text-xs text-neutral-700">Didn&apos;t receive it? Check spam or <button className="text-[#6C4CF1] font-semibold hover:underline" onClick={() => fbAuth().currentUser?.reload()}>resend</button></p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#6C4CF1]/6 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2.5 text-xl font-black text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
          <p className="mt-6 text-3xl font-black text-[#0A0A0F]">Join as a tourist</p>
          <p className="mt-1 text-sm text-neutral-700">Start exploring with local guides</p>
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
            <span className="text-xs text-neutral-700 font-medium">or sign up with email</span>
            <div className="flex-1 h-px bg-black/[0.06]" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Full name *</label>
              <input
                type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Email *</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Password *</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                placeholder="Min. 6 characters"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-600 mb-1.5 block">Confirm password *</label>
              <input
                type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)}
                className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                placeholder="Repeat password"
              />
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
              style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}
            >
              {loading ? "Creating account…" : "Create account →"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-neutral-700">
          Already have an account?{" "}
          <a href="/login" className="text-[#6C4CF1] font-bold hover:underline">Sign in</a>
        </p>
      </div>
    </main>
  );
}
