import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { IMAGE_CREDITS } from "@/lib/image-credits";

export const metadata: Metadata = {
  title: "Image credits",
  description: "Photographers and licenses for the Creative Commons images used on VibeGuide.",
  alternates: { canonical: "/image-credits" },
  robots: { index: false, follow: true },
};

// CC BY / CC BY-SA atıf yükümlülüğü: sitede kullanılan tüm Commons görselleri
// fotoğrafçı, lisans ve kaynak bağlantısıyla burada listelenir.
export default function ImageCreditsPage() {
  const items = Object.entries(IMAGE_CREDITS);
  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 md:px-6">
        <h1 className="font-display text-4xl font-normal tracking-[-0.01em] md:text-5xl">Image credits</h1>
        <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
          Some photos on VibeGuide come from Wikimedia Commons and are used under Creative Commons licenses.
          Each image is credited to its author below, with a link to the original and its license. Images may be resized or cropped.
        </p>
        <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map(([src, c]) => (
            <li key={src} className="flex items-center gap-4 py-4">
              <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <div className="min-w-0 text-sm">
                <a href={c.source} target="_blank" rel="noopener noreferrer nofollow" className="block truncate font-medium text-neutral-900 hover:underline">
                  {decodeURIComponent(c.source.split("File:")[1] ?? c.source).replace(/_/g, " ")}
                </a>
                <p className="mt-0.5 text-neutral-600">
                  {c.author} ·{" "}
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer nofollow license" className="underline underline-offset-2 hover:text-neutral-900">
                    {c.license}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <MainFooter />
    </main>
  );
}
