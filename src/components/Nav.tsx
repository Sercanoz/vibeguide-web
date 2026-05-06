"use client";

import Link from "next/link";
import { useState } from "react";
import { useT } from "./LanguageProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#vibenow", label: t.nav.vibenow },
    { href: "#vibesquad", label: t.nav.vibesquad },
    { href: "#how", label: t.nav.how },
    { href: "#guides", label: t.nav.guides },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-vg-border/60">
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">✨</span>
          <span className="font-black text-xl tracking-tight text-vibe-gradient">
            VibeGuide
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-vg-muted hover:text-vg-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="#download"
            className="bg-vibe-gradient text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
          >
            {t.nav.cta}
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 -mr-2"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d={open ? "M6 6L18 18M6 18L18 6" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-vg-border bg-white">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-vg-ink py-1"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="bg-vibe-gradient text-white text-center px-5 py-3 rounded-full text-sm font-bold mt-2"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
