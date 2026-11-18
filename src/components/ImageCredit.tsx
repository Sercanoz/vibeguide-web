import { IMAGE_CREDITS } from "@/lib/image-credits";

// CC BY / CC BY-SA görseller için atıf satırı: "Fotoğraf: Yazar · CC BY-SA 4.0".
// Görselin atıf kaydı yoksa (Unsplash vb.) hiçbir şey çizmez.
// `onDark`: koyu foto üstünde beyaz metin; aksi halde gri.
export default function ImageCredit({ src, onDark = false, className = "" }: { src: string; onDark?: boolean; className?: string }) {
  const c = IMAGE_CREDITS[src];
  if (!c) return null;
  const tone = onDark ? "text-white/70 [&_a]:text-white/85 hover:[&_a]:text-white" : "text-neutral-500 [&_a]:text-neutral-600 hover:[&_a]:text-neutral-900";
  return (
    <p className={`text-[11px] leading-4 ${tone} ${className}`}>
      <a href={c.source} target="_blank" rel="noopener noreferrer nofollow" className="underline-offset-2 hover:underline">
        Photo: {c.author}
      </a>
      {" · "}
      <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer nofollow license" className="underline-offset-2 hover:underline">
        {c.license}
      </a>
    </p>
  );
}
