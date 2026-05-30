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
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"tours" | "destinations" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged((u) => {
      // Treat unverified email as logged-out — show Sign in / Register, not avatar
      setUser(u && u.emailVerified ? u : null);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { href: "/tours", label: "Tours", key: "tours" },
    { href: "/guides", label: "Guides" },
    { href: "/istanbul-tour-guide", label: "Istanbul" },
    { href: "/cappadocia-tour-guide", label: "Cappadocia" },
    { href: "/ephesus-tour-guide", label: "Ephesus" },
    { href: "/#how", label: t.nav2.howItWorks },
    { href: "/register/guide", label: "Become a guide" },
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

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.07] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-gradient-to-b from-white via-white/95 to-white/80 backdrop-blur-xl border-b border-black/[0.04]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">

          {/* Logo */}
          <a href="/" className="group flex items-center gap-2.5 text-xl font-black tracking-tight text-[#0A0A0F] hover:text-[#6C4CF1] transition-colors duration-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32}
              className="transition-transform duration-200 group-hover:scale-110"
              style={{ mixBlendMode: "multiply" }} />
            <span className="transition-colors duration-200">VibeGuide</span>
          </a>

          {/* Desktop links + mega menus */}
          <div className="hidden md:flex items-center gap-1 text-sm font-medium"
            onMouseLeave={() => setOpenMenu(null)}>

            {/* Tours — mega menu */}
            <div className="relative" onMouseEnter={() => setOpenMenu("tours")}>
              <a href="/tours"
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl font-medium transition-all ${activePage === "tours" ? "text-[#6C4CF1] bg-[#6C4CF1]/8 font-semibold" : "text-neutral-400 hover:text-[#0A0A0F] hover:bg-black/[0.04]"}`}>
                Tours
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${openMenu === "tours" ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6"/></svg>
              </a>
              {openMenu === "tours" && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-[420px] bg-white rounded-2xl border border-black/[0.06] shadow-xl p-5 animate-[fadeSlideUp_0.15s_ease_both]">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2">Browse by interest</p>
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { key: "history", label: "History", icon: "🏛️" },
                        { key: "food", label: "Food & Drink", icon: "🍽️" },
                        { key: "nature", label: "Nature", icon: "🌿" },
                        { key: "culture", label: "Culture", icon: "🎭" },
                        { key: "adventure", label: "Adventure", icon: "⛰️" },
                        { key: "art", label: "Art", icon: "🎨" },
                      ].map((c) => (
                        <a key={c.key} href={`/tours?category=${c.key}`}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#F7F7FB] transition-colors text-sm font-semibold text-[#0A0A0F]">
                          <span className="text-base">{c.icon}</span>{c.label}
                        </a>
                      ))}
                    </div>
                    <a href="/tours" className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-[#6C4CF1] text-white text-sm font-bold py-2.5 hover:bg-[#5a3dd4] transition-colors">
                      See all tours →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Destinations — dropdown */}
            <div className="relative" onMouseEnter={() => setOpenMenu("destinations")}>
              <button
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl font-medium transition-all ${openMenu === "destinations" ? "text-[#0A0A0F] bg-black/[0.04]" : "text-neutral-400 hover:text-[#0A0A0F] hover:bg-black/[0.04]"}`}>
                Destinations
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${openMenu === "destinations" ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {openMenu === "destinations" && (
                <div className="absolute left-0 top-full pt-2">
                  <div className="w-72 bg-white rounded-2xl border border-black/[0.06] shadow-xl p-2 animate-[fadeSlideUp_0.15s_ease_both]">
                    {[
                      { href: "/istanbul-tour-guide", icon: "🕌", name: "Istanbul", desc: "Hagia Sophia · Bosphorus" },
                      { href: "/cappadocia-tour-guide", icon: "🎈", name: "Cappadocia", desc: "Balloons · Fairy chimneys" },
                      { href: "/ephesus-tour-guide", icon: "🏛️", name: "Ephesus", desc: "Ancient ruins · Selçuk" },
                    ].map((d) => (
                      <a key={d.href} href={d.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F7F7FB] transition-colors">
                        <span className="text-2xl">{d.icon}</span>
                        <div>
                          <p className="text-sm font-bold text-[#0A0A0F]">{d.name}</p>
                          <p className="text-xs text-neutral-400">{d.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Guides */}
            <a href="/guides" className="px-3.5 py-2 rounded-xl font-medium text-neutral-400 hover:text-[#0A0A0F] hover:bg-black/[0.04] transition-all">
              Guides
            </a>

            {/* How it works */}
            <a href="/#how" className="px-3.5 py-2 rounded-xl font-medium text-neutral-400 hover:text-[#0A0A0F] hover:bg-black/[0.04] transition-all">
              {t.nav2.howItWorks}
            </a>

            {/* Become a guide */}
            <a href="/register/guide" className="px-3.5 py-2 rounded-xl font-medium text-emerald-600 hover:bg-emerald-50 transition-all">
              Become a guide
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {user === "loading" ? (
              <div className="w-9 h-9 rounded-full bg-neutral-100 animate-pulse" />
            ) : isLoggedIn ? (
              /* Avatar dropdown */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(v => !v)}
                  className="flex items-center gap-2 rounded-full border border-black/10 pl-1 pr-3 py-1 hover:border-[#6C4CF1]/30 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-[11px] font-black text-white">
                    {initials}
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    className={`text-neutral-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-black/[0.06] shadow-xl overflow-hidden z-50 animate-[fadeSlideUp_0.15s_ease_both]">
                    <div className="px-4 py-3 border-b border-black/[0.06] bg-neutral-50/50">
                      <p className="text-xs font-black text-[#0A0A0F] truncate">{(user as User).displayName ?? (user as User).email}</p>
                      <p className="text-[10px] text-neutral-400 truncate mt-0.5">{(user as User).email}</p>
                    </div>
                    {[
                      { href: "/profile", label: "My profile", icon: <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>, icon2: <circle cx="12" cy="7" r="4"/> },
                      { href: "/tours", label: "Browse tours", icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>, icon2: <circle cx="12" cy="10" r="3"/> },
                    ].map(({ href, label, icon, icon2 }) => (
                      <a key={href} href={href} onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#0A0A0F] hover:bg-neutral-50 transition-colors">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                          {icon}{icon2 && icon2}
                        </svg>
                        {label}
                      </a>
                    ))}
                    <div className="border-t border-black/[0.06]">
                      <button onClick={() => { signOut(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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
              <>
                <button onClick={() => setAuthModal("signin")}
                  className="hidden md:block text-sm font-semibold text-neutral-500 hover:text-[#0A0A0F] px-3 py-2 rounded-xl hover:bg-black/[0.04] transition-all duration-150">
                  Sign in
                </button>
                <button onClick={() => setAuthModal("register")}
                  className="hidden md:flex items-center gap-1.5 rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3dd4] transition-all duration-150 hover:scale-[1.03]"
                  style={{ boxShadow: "0 2px 12px rgba(108,76,241,0.3)" }}>
                  Start exploring
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden relative flex flex-col justify-center items-center w-9 h-9 rounded-xl hover:bg-black/[0.04] transition-colors gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu">
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer — bottom sheet style */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
          <div className="mx-4 mb-4 bg-white rounded-3xl border border-black/[0.06] shadow-xl overflow-hidden">
            <div className="px-2 py-2 space-y-0.5">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                    activePage === "tours" && l.key === "tours"
                      ? "bg-[#6C4CF1]/8 text-[#6C4CF1]"
                      : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                  }`}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="border-t border-black/[0.06] px-3 py-3 space-y-2">
              {isLoggedIn ? (
                <>
                  <a href="/profile" onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-neutral-50 border border-black/10 px-5 py-3 text-sm font-bold text-[#0A0A0F]">
                    My profile
                  </a>
                  <button onClick={() => { signOut(); setMenuOpen(false); }}
                    className="w-full flex items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-500 px-5 py-3 text-sm font-bold">
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setMenuOpen(false); setAuthModal("signin"); }}
                    className="w-full flex items-center justify-center rounded-2xl border border-black/10 px-5 py-3 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors">
                    Sign in
                  </button>
                  <button onClick={() => { setMenuOpen(false); setAuthModal("register"); }}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#6C4CF1] px-5 py-3 text-sm font-bold text-white"
                    style={{ boxShadow: "0 4px 12px rgba(108,76,241,0.3)" }}>
                    Start exploring
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
