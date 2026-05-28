"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LanguageProvider";
import { homeTranslations } from "@/lib/home-i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthModal from "./AuthModal";
import { fbAuth, signOut, type User } from "@/lib/firebase-client";

export default function Navbar({ activePage }: { activePage?: "tours" | "home" }) {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<"signin" | "register" | null>(null);
  const [user, setUser] = useState<User | null | "loading">("loading");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const navLinks = [
    { href: "/#how", label: t.nav2.howItWorks },
    { href: "/#modes", label: t.nav.vibenow },
    { href: "/tours", label: "Tours", key: "tours" },
    { href: "/#destinations", label: t.nav.destinations },
    { href: "/#guides", label: t.nav.guides },
  ];

  const initials = user && user !== "loading" && user.displayName
    ? user.displayName.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase()
    : user && user !== "loading" && user.email
    ? user.email.slice(0, 2).toUpperCase()
    : "?";

  const isLoggedIn = user !== "loading" && user !== null;

  return (
    <>
      {authModal && (
        <AuthModal initialMode={authModal} onClose={() => setAuthModal(null)} />
      )}

      <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-white via-white/95 to-white/80 backdrop-blur-xl border-b border-black/[0.05]" style={{ boxShadow: "0 1px 0 0 rgba(0,0,0,0.04), 0 4px 24px -4px rgba(108,76,241,0.06)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <a href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>

          <div className="hidden gap-8 text-sm font-medium md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                className={`transition-colors font-medium ${activePage === "tours" && l.key === "tours" ? "text-[#6C4CF1] font-semibold" : "text-neutral-400 hover:text-[#0A0A0F]"}`}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {user === "loading" ? (
              <div className="w-9 h-9 rounded-full bg-neutral-100 animate-pulse" />
            ) : isLoggedIn ? (
              /* ── Logged in — avatar + dropdown ── */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 rounded-full border border-black/10 pl-1 pr-3 py-1 hover:border-[#6C4CF1]/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-[11px] font-black text-white">
                    {initials}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-black/[0.06] shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-black/[0.06]">
                      <p className="text-xs font-black text-[#0A0A0F] truncate">{(user as User).displayName ?? (user as User).email}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{(user as User).email}</p>
                    </div>
                    <a href="/profile" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#0A0A0F] hover:bg-neutral-50 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      My profile
                    </a>
                    <a href="/tours" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#0A0A0F] hover:bg-neutral-50 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      Browse tours
                    </a>
                    <div className="border-t border-black/[0.06]">
                      <button
                        onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                          <polyline points="16 17 21 12 16 7"/>
                          <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Not logged in ── */
              <>
                <button onClick={() => setAuthModal("signin")}
                  className="hidden md:block text-sm font-semibold text-neutral-500 hover:text-[#0A0A0F] transition-colors">
                  Sign in
                </button>
                <button onClick={() => setAuthModal("register")}
                  className="hidden md:block rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3dd4] transition-colors"
                  style={{ boxShadow: "0 2px 12px rgba(108,76,241,0.25)" }}>
                  Register
                </button>
              </>
            )}

            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu">
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div ref={menuRef} className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[32rem]" : "max-h-0"}`}>
          <div className="px-6 pb-5 pt-2 border-t border-black/5 space-y-1 bg-white">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="flex items-center py-3 text-sm font-semibold text-neutral-500 hover:text-black border-b border-black/5 last:border-0 transition-colors">
                {l.label}
              </a>
            ))}
            {isLoggedIn ? (
              <>
                <a href="/profile" onClick={() => setMenuOpen(false)}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-bold text-[#0A0A0F]">
                  My profile
                </a>
                <button onClick={() => { signOut(); setMenuOpen(false); }}
                  className="w-full flex items-center justify-center rounded-full border border-red-200 text-red-500 px-5 py-3 text-sm font-bold">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setMenuOpen(false); setAuthModal("signin"); }}
                  className="mt-3 w-full flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-bold text-[#0A0A0F]">
                  Sign in
                </button>
                <button onClick={() => { setMenuOpen(false); setAuthModal("register"); }}
                  className="mt-2 w-full flex items-center justify-center rounded-full bg-[#6C4CF1] px-5 py-3 text-sm font-bold text-white">
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
