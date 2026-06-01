"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Hero telefon — gerçekçi modern telefon (Dynamic Island, metalik çerçeve, yan
 * tuşlar, cam parlaması). İçinde gerçek uygulama ekranları yumuşak crossfade +
 * hafif zoom ile kendi kendine döner. `shots` boşsa null döner (mockup'a düşer).
 */
export default function PhoneShowcase({
  shots,
  interval = 2800,
}: {
  shots: string[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (shots.length < 2) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % shots.length),
      interval
    );
    return () => clearInterval(id);
  }, [shots.length, interval]);

  if (shots.length === 0) return null;

  return (
    <div className="relative">
      {/* ambient glow */}
      <div className="absolute -inset-10 bg-[#6C4CF1]/25 blur-[70px] rounded-[50%] pointer-events-none" />

      {/* ── Outer metallic rail (siyah titanyum) ── */}
      <div
        className="relative w-[260px] aspect-[9/19] rounded-[3rem] p-[3px]"
        style={{
          background:
            "linear-gradient(145deg, #4a4a4f 0%, #18181b 14%, #2b2b2f 48%, #0a0a0c 86%, #3a3a3f 100%)",
          boxShadow:
            "0 55px 100px -20px rgba(76,29,149,0.40), 0 20px 44px -12px rgba(0,0,0,0.55)",
        }}
      >
        {/* ── Side buttons (siyah) ── */}
        {/* left: action + volume up/down */}
        <div className="absolute -left-[2px] top-[100px] h-8 w-[3px] rounded-l-md bg-gradient-to-r from-[#0c0c0e] to-[#3a3a3f]" />
        <div className="absolute -left-[2px] top-[148px] h-14 w-[3px] rounded-l-md bg-gradient-to-r from-[#0c0c0e] to-[#3a3a3f]" />
        <div className="absolute -left-[2px] top-[214px] h-14 w-[3px] rounded-l-md bg-gradient-to-r from-[#0c0c0e] to-[#3a3a3f]" />
        {/* right: power */}
        <div className="absolute -right-[2px] top-[164px] h-24 w-[3px] rounded-r-md bg-gradient-to-l from-[#0c0c0e] to-[#3a3a3f]" />

        {/* ── Black bezel ── */}
        <div className="relative h-full w-full rounded-[3.35rem] bg-black p-[11px]">
          {/* ── Screen ── */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-black">
            {shots.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt="VibeGuide app"
                fill
                sizes="260px"
                priority={i === 0}
                className={`object-cover transition-all duration-[1000ms] ease-in-out ${
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.06]"
                }`}
              />
            ))}

            {/* glass gloss — diagonal highlight */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 22%, transparent 42%, transparent 100%)",
              }}
            />

            {/* progress dots */}
            {shots.length > 1 && (
              <div className="absolute bottom-3.5 left-0 right-0 z-20 flex justify-center gap-1.5">
                {shots.map((s, i) => (
                  <span
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-5 bg-white" : "w-1.5 bg-white/55"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
