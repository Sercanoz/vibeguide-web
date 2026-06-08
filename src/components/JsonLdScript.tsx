import { headers } from "next/headers";
import { jsonLdScript } from "@/lib/jsonld";

/**
 * JSON-LD'yi güvenli (escape'li) ve CSP-nonce'lu olarak render eden server
 * component. Nonce'u middleware'in set ettiği `x-nonce` header'ından okur,
 * böylece CSP script-src nonce kuralını ihlal etmez.
 *
 * type="application/ld+json" script'leri tarayıcıda çalışmaz (sadece veridir),
 * ama <script> etiketi olduğu için CSP'ye tabidir → nonce gerekir.
 *
 * Client component'lerden (örn. "use client") headers() çağrılamaz; bu durumda
 * nonce'u server parent'tan `nonce` prop'u ile geçir.
 */
export default async function JsonLdScript({
  data,
  nonce: nonceProp,
}: {
  data: unknown;
  nonce?: string;
}) {
  const nonce = nonceProp ?? (await headers()).get("x-nonce") ?? undefined;
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}
