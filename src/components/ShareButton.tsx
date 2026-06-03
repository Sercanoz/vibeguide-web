"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  url?: string;        // defaults to current page
  title: string;       // share text / title
  variant?: "button" | "icon";
}

export default function ShareButton({ url, title, variant = "button" }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url ?? "");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!url && typeof window !== "undefined") setShareUrl(window.location.href);
  }, [url]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const enc = encodeURIComponent;
  const text = `${title} — VibeGuide`;

  async function nativeOrToggle() {
    // Use the OS share sheet on mobile if available
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch { /* user cancelled → fall through to menu */ }
    }
    setOpen((v) => !v);
  }

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const links = [
    {
      name: "WhatsApp", color: "#25D366",
      href: `https://wa.me/?text=${enc(text + " " + shareUrl)}`,
      icon: <path d="M17.6 6.32A8.07 8.07 0 0 0 12 4a8 8 0 0 0-6.9 12l-1.1 4 4.1-1.07A8 8 0 1 0 17.6 6.32zM12 18.5a6.5 6.5 0 0 1-3.3-.9l-.24-.14-2.43.64.65-2.37-.16-.25A6.5 6.5 0 1 1 12 18.5zm3.6-4.87c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.64-.62.77-.23.15-.43.05a5.3 5.3 0 0 1-1.56-.96 5.9 5.9 0 0 1-1.08-1.35c-.11-.2 0-.3.09-.4l.3-.35c.1-.12.13-.2.2-.34s0-.25 0-.35-.44-1.06-.6-1.45-.32-.33-.44-.34h-.38a.73.73 0 0 0-.53.25 2.2 2.2 0 0 0-.69 1.64 3.83 3.83 0 0 0 .8 2.03 8.76 8.76 0 0 0 3.35 2.96c.47.2.83.32 1.11.42a2.69 2.69 0 0 0 1.23.08 2 2 0 0 0 1.32-.93 1.65 1.65 0 0 0 .11-.93c-.05-.08-.18-.13-.38-.23z"/> },
    {
      name: "X", color: "#0A0A0F",
      href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(shareUrl)}`,
      icon: <path d="M18.9 2h3.3l-7.2 8.3L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.8L1.5 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.8L7.1 3.8H5.2L17.7 20z"/> },
    {
      name: "Facebook", color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
      icon: <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/> },
  ];

  const trigger = variant === "icon" ? (
    <button onClick={nativeOrToggle} aria-label="Share"
      className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:border-[#6C4CF1] hover:text-[#6C4CF1] transition-colors">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>
      </svg>
    </button>
  ) : (
    <button onClick={nativeOrToggle}
      className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-neutral-800 hover:border-[#6C4CF1] hover:text-[#6C4CF1] transition-colors">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5"/><line x1="15.4" y1="6.5" x2="8.6" y2="10.5"/>
      </svg>
      Share
    </button>
  );

  return (
    <div className="relative inline-block" ref={ref}>
      {trigger}
      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-48 bg-white rounded-2xl border border-black/[0.06] shadow-xl p-2 animate-[fadeSlideUp_0.15s_ease_both]">
          {links.map((l) => (
            <a key={l.name} href={l.href} target="_blank" rel="noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm font-semibold text-[#0A0A0F]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill={l.color}>{l.icon}</svg>
              {l.name}
            </a>
          ))}
          <button onClick={() => { copyLink(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-sm font-semibold text-[#0A0A0F]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>
            </svg>
            {copied ? "Copied ✓" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
