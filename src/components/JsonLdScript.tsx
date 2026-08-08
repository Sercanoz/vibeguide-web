import { jsonLdScript } from "@/lib/jsonld";

/**
 * JSON-LD'yi güvenli (escape'li) render eden server component.
 *
 * type="application/ld+json" script'leri tarayıcıda ÇALIŞMAZ (sadece veridir),
 * bu yüzden CSP script-src'yi ihlal etmez → nonce GEREKMEZ.
 *
 * SEO: nonce için headers() okuması KALDIRILDI — o okuma, bu component'i kullanan
 * TÜM SEO sayfalarını (blog/attraction/city-guide) dinamik SSR'a zorluyordu.
 * Artık statik render ediliyorlar (CDN cache → hızlı crawl → indeksleme).
 */
export default function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
