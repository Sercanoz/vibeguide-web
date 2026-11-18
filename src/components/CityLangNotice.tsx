"use client";

import Link from "next/link";
import { useT } from "@/components/LanguageProvider";
import { languageByCode } from "@/lib/languages";

// Şehir rehberi içeriği URL diline bağlı (SEO: /istanbul-tour-guide = EN,
// /tr/istanbul-tour-guide = TR). Kullanıcının arayüz dili farklıysa ve o dilde
// sürüm varsa ince bir şeritle o sürüme yönlendir. Otomatik yönlendirme YOK
// (Google'ın EN sayfayı tarayabilmesi ve kullanıcının seçimi için).

const MSG: Record<string, (name: string) => string> = {
  en: () => "This page is available in English",
  tr: () => "Bu sayfanın Türkçesi var",
  de: () => "Diese Seite gibt es auch auf Deutsch",
  es: () => "Esta página está disponible en español",
  fr: () => "Cette page est disponible en français",
  it: () => "Questa pagina è disponibile in italiano",
  ru: () => "Эта страница доступна на русском",
};

export default function CityLangNotice({ pageLang, available, slug }: { pageLang: string; available: string[]; slug: string }) {
  const { locale } = useT();
  if (locale === pageLang || !available.includes(locale)) return null;
  const name = languageByCode(locale).name;
  const text = (MSG[locale] ?? ((n: string) => `${n} →`))(name);
  const href = `${locale === "en" ? "" : `/${locale}`}/${slug}`;
  return (
    <div lang={locale} className="border-b border-neutral-200 bg-neutral-50 pt-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 text-sm md:px-6">
        <span className="text-neutral-700">{text}</span>
        <Link href={href} className="shrink-0 font-semibold text-neutral-900 underline underline-offset-4 hover:text-[#5B3FD9]">
          {name}
        </Link>
      </div>
    </div>
  );
}
