"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmail, signInWithGoogle, registerWithEmail, fbAuth
} from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";

type Mode = "signin" | "register";
type Role = "tourist" | "guide";
type Step = "form" | "role" | "verify";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

interface Props {
  initialMode?: Mode;
  onClose: () => void;
}

export default function AuthModal({ initialMode = "signin", onClose }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>(initialMode === "register" ? "role" : "form");
  const [role, setRole] = useState<Role | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function switchMode(m: Mode) {
    setMode(m);
    setStep(m === "register" ? "role" : "form");
    setRole(null);
    setError(null);
  }

  async function handleAfterLogin() {
    const user = fbAuth().currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 404) { onClose(); router.push("/register"); return; }
    if (res.ok) {
      const me = await res.json();
      onClose();
      if (me.role === "Admin") router.push("/admin");
      else if (me.role === "PendingGuide") router.push("/guide/pending");
      else router.refresh();
    } else { onClose(); }
  }

  async function registerTouristOnBackend() {
    const user = fbAuth().currentUser;
    if (!user) throw new Error("No user");
    await user.reload();
    const token = await user.getIdToken(true);
    const res = await fetch(`${API_BASE_URL}/api/auth/register-tourist`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ fullName: fullName.trim() }),
    });
    if (res.status === 409) { onClose(); return; }
    if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.message ?? "Registration failed."); }
    onClose();
    router.refresh();
  }

  async function onGoogleSignIn() {
    setError(null); setLoading(true);
    try {
      await signInWithGoogle();
      if (mode === "register" && role === "tourist") {
        await registerTouristOnBackend();
      } else if (mode === "register" && role === "guide") {
        onClose();
        router.push("/register/guide");
      } else {
        await handleAfterLogin();
      }
    } catch { setError("Google sign-in failed. Please try again."); }
    finally { setLoading(false); }
  }

  async function onEmailSignIn(e: React.FormEvent) {
    e.preventDefault(); setError(null); setLoading(true);
    try {
      await signInWithEmail(email, password);
      await handleAfterLogin();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found")
        setError("Incorrect email or password.");
      else if (code === "auth/too-many-requests")
        setError("Too many attempts. Try again later.");
      else setError("Sign in failed. Please try again.");
    } finally { setLoading(false); }
  }

  async function onEmailRegister(e: React.FormEvent) {
    e.preventDefault(); setError(null);
    if (password !== password2) { setError("Passwords do not match."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (role === "guide") {
      // Guide kayıt sayfasına yönlendir — KYC foto gerekli
      onClose();
      router.push("/register/guide");
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      setStep("verify");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/email-already-in-use") setError("This email is already registered.");
      else if (code === "auth/weak-password") setError("Password is too weak.");
      else setError("Registration failed. Please try again.");
    } finally { setLoading(false); }
  }

  async function onVerifyDone() {
    setError(null); setLoading(true);
    try { await registerTouristOnBackend(); }
    catch (err: unknown) {
      const msg = (err as Error).message ?? "";
      if (msg.includes("not_verified") || msg.includes("not verified"))
        setError("Please verify your email first — check your inbox.");
      else setError(msg || "Something went wrong.");
    } finally { setLoading(false); }
  }

  const inputCls = "w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/10 transition-all placeholder:text-neutral-300";

  /* ── Verify email ── */
  if (step === "verify") {
    return (
      <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-neutral-200 transition-colors text-sm">✕</button>
          <div className="w-14 h-14 rounded-full bg-[#6C4CF1]/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 className="text-xl font-black text-[#0A0A0F]">Check your email</h2>
          <p className="mt-2 text-sm text-neutral-400 leading-6">
            We sent a verification link to <strong className="text-[#0A0A0F]">{email}</strong>. Click it then come back.
          </p>
          {error && <div className="mt-3 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
          <button onClick={onVerifyDone} disabled={loading}
            className="mt-6 w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
            style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
            {loading ? "Checking…" : "I verified my email →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899]" />

        <div className="p-7">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 hover:bg-neutral-200 transition-colors text-sm">✕</button>

          {/* Logo + title */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vibeguide-icon.png" alt="VibeGuide" width={28} height={28} style={{ mixBlendMode: "multiply" }} />
              <span className="text-sm font-black text-[#0A0A0F]">VibeGuide</span>
            </div>
            <h2 className="text-2xl font-black text-[#0A0A0F]">
              {mode === "signin" ? "Welcome back" : step === "role" ? "Who are you?" : role === "guide" ? "Apply as guide" : "Create account"}
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              {mode === "signin" ? "Sign in to continue your adventure" : step === "role" ? "Tell us how you'll use VibeGuide" : role === "guide" ? "Join our verified guide network" : "Start exploring with local guides"}
            </p>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 p-1 bg-neutral-100 rounded-2xl mb-5">
            {(["signin", "register"] as Mode[]).map((m) => (
              <button key={m} onClick={() => switchMode(m)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${mode === m ? "bg-white text-[#0A0A0F] shadow-sm" : "text-neutral-400 hover:text-neutral-600"}`}>
                {m === "signin" ? "Sign in" : "Register"}
              </button>
            ))}
          </div>

          {/* ── ROLE SELECTION ── */}
          {mode === "register" && step === "role" && (
            <div className="space-y-3">
              <button
                onClick={() => { setRole("tourist"); setStep("form"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-black/[0.06] hover:border-[#6C4CF1]/40 hover:bg-[#6C4CF1]/[0.02] transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#6C4CF1]/8 flex items-center justify-center shrink-0 text-[#6C4CF1] group-hover:bg-[#6C4CF1]/15 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-black text-[#0A0A0F]">I&apos;m a tourist</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Discover cities with verified local guides</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M9 18l6-6-6-6"/></svg>
              </button>

              <button
                onClick={() => { setRole("guide"); setStep("form"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-black/[0.06] hover:border-emerald-400/60 hover:bg-emerald-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="1"/><path d="M9 20l1-5 2 2 1-5"/><path d="M6 11l2-4h8l1 4"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-black text-[#0A0A0F]">I&apos;m a guide</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Share your city · earn doing what you love</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === "register" && step === "form" && (
            <>
              {/* Role badge + back */}
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => { setStep("role"); setError(null); }} className="text-neutral-400 hover:text-[#0A0A0F] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                </button>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${role === "guide" ? "bg-emerald-50 text-emerald-700" : "bg-[#6C4CF1]/8 text-[#6C4CF1]"}`}>
                  {role === "guide" ? "🎤 Guide application" : "✈️ Tourist"}
                </span>
              </div>

              {role === "guide" ? (
                /* Guide — KYC gerektiğinden tam sayfaya yönlendir */
                <div className="text-center py-4">
                  <p className="text-sm text-neutral-500 leading-6 mb-4">
                    Guide registration requires uploading your official badge photos for verification. We&apos;ll take you to the full application form.
                  </p>
                  <a href="/register/guide"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 text-white font-bold px-6 py-3 text-sm hover:bg-emerald-600 transition-colors">
                    Continue to guide application →
                  </a>
                  <p className="mt-3 text-xs text-neutral-400">Takes about 2 minutes · Admin reviews within 1–2 days</p>
                </div>
              ) : (
                /* Tourist form */
                <>
                  <button onClick={onGoogleSignIn} disabled={loading}
                    className="w-full flex items-center justify-center gap-3 border border-black/10 rounded-2xl px-5 py-3 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors disabled:opacity-50 mb-4">
                    <GoogleIcon /> Continue with Google
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-black/[0.06]" />
                    <span className="text-xs text-neutral-300 font-medium">or</span>
                    <div className="flex-1 h-px bg-black/[0.06]" />
                  </div>
                  <form onSubmit={onEmailRegister} className="space-y-3">
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} placeholder="Full name" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="Email address" />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="Password (min. 6 chars)" />
                    <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} className={inputCls} placeholder="Confirm password" />
                    {error && <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
                    <button type="submit" disabled={loading}
                      className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                      style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                      {loading ? "Please wait…" : "Create account →"}
                    </button>
                  </form>
                </>
              )}
            </>
          )}

          {/* ── SIGN IN FORM ── */}
          {mode === "signin" && (
            <>
              <button onClick={onGoogleSignIn} disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-black/10 rounded-2xl px-5 py-3 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors disabled:opacity-50 mb-4">
                <GoogleIcon /> Continue with Google
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-black/[0.06]" />
                <span className="text-xs text-neutral-300 font-medium">or</span>
                <div className="flex-1 h-px bg-black/[0.06]" />
              </div>
              <form onSubmit={onEmailSignIn} className="space-y-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="Email address" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="Password" />
                {error && <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                  style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                  {loading ? "Signing in…" : "Sign in →"}
                </button>
              </form>
              <p className="mt-3 text-center text-xs text-neutral-400">
                <button className="text-[#6C4CF1] font-semibold hover:underline">Forgot password?</button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
