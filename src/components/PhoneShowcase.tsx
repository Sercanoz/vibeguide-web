"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Hero telefon — gerçek uygulama ekran görüntülerini kendi kendine, yumuşak
 * crossfade + hafif "ken burns" zoom ile döndürür. Apple/Linear tarzı, pro.
 * `shots` boşsa hiçbir şey render etmez (çağıran mevcut mockup'a düşer).
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
      <div className="absolute -inset-8 bg-[#6C4CF1]/20 blur-3xl rounded-full" />

      {/* phone bezel */}
      <div className="relative w-[280px] aspect-[9/19.3] rounded-[3rem] bg-gradient-to-b from-[#2a2a2a] to-[#000] p-[5px] shadow-[0_40px_80px_-10px_rgba(108,76,241,0.5)]">
        {/* side buttons */}
        <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-md bg-[#2a2a2a]" />
        <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l-md bg-[#2a2a2a]" />
        <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r-md bg-[#2a2a2a]" />

        {/* screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] bg-black">
          {shots.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="VibeGuide app"
              fill
              sizes="280px"
              priority={i === 0}
              className={`object-cover transition-all duration-[900ms] ease-in-out ${
                i === active
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))}

          {/* notch */}
          <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black/90 z-10" />

          {/* progress dots */}
          {shots.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
              {shots.map((s, i) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
