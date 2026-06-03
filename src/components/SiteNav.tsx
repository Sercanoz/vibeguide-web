"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/LanguageProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { homeTranslations } from "@/lib/home-i18n";

export default function SiteNav() {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const navLinks = [
    { href: "/#how", label: t.nav2.howItWorks },
    { href: "/#modes", label: t.nav.vibenow },
    { href: "/#destinations", label: t.nav.destinations },
    { href: "/#guides", label: t.nav.guides },
  ];

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-black/[0.06] shadow-sm shadow-black/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
        <a href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#0A0A0F]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
          VibeGuide
        </a>

        <div className="hidden gap-8 text-sm font-medium md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-neutral-600 hover:text-black transition-colors">{l.label}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <a href="/#download" className="hidden md:block rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3dd4] transition-colors shadow-sm">
            {t.nav.cta}
          </a>
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      <div ref={menuRef} className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 pb-5 pt-2 border-t border-black/5 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center py-3 text-sm font-semibold text-neutral-700 hover:text-black border-b border-black/5 last:border-0 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#download"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex items-center justify-center rounded-full bg-[#6C4CF1] px-5 py-3 text-sm font-bold text-white"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}
